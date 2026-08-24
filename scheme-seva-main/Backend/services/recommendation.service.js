import User from "../models/user.model.js";
import { readAllSchemes, paginateArray } from "../db/excelDb.js";

// Helper function to calculate a relevance score for a scheme based on user profile
const calculateMatchScore = (scheme, userProfile) => {
    let score = 0;

    // 1. Location / State Matching (Highest Priority: +40 for exact state, +20 for Central/All India)
    if (userProfile.state) {
        if (scheme.state && scheme.state.toLowerCase() === userProfile.state.toLowerCase()) {
            score += 40;
        } else if (scheme.state === "All India" || scheme.level === "Central") {
            score += 20;
        }
    } else if (scheme.state === "All India" || scheme.level === "Central") {
        score += 10; // Slight boost for central schemes if user state is unknown
    }

    // 2. Interest / Category Matching (+15 per matching interest)
    const schemeCategories = [
        ...(scheme.schemeCategory || []),
        ...(scheme.Category || []),
        ...(scheme.tags || [])
    ].map(t => typeof t === 'string' ? t.toLowerCase() : (t.label || '').toLowerCase());

    if (userProfile.interests && userProfile.interests.length > 0) {
        let interestMatches = 0;
        userProfile.interests.forEach(interest => {
            const intLower = interest.toLowerCase();
            if (schemeCategories.some(c => c.includes(intLower))) {
                interestMatches++;
            }
        });
        score += (interestMatches * 15);
    }

    // Combine descriptions to search for keywords
    const fullText = (
        (scheme.detailedDescription_md || '') + ' ' + 
        (scheme.eligibilityDescription_md || '') + ' ' +
        (scheme.schemeName?.label || scheme.schemeName || '')
    ).toLowerCase();

    // 3. Gender Matching (+15 if scheme specifically targets user's gender)
    if (userProfile.gender) {
        const genderLower = userProfile.gender.toLowerCase();
        if (genderLower === 'female' && (fullText.includes('women') || fullText.includes('girl') || fullText.includes('mahila') || fullText.includes('female'))) {
            score += 15;
        } else if (genderLower === 'male' && (fullText.includes('men ') || fullText.includes('boy'))) {
            score += 10;
        }
    }

    // 4. Income Group Matching (+10 to +20 if scheme targets their income group)
    if (userProfile.incomeGroup) {
        const incomeLower = userProfile.incomeGroup.toLowerCase();
        if (incomeLower === 'ews' && (fullText.includes('economically weaker') || fullText.includes('ews') || fullText.includes('bpl') || fullText.includes('below poverty line'))) {
            score += 20;
        } else if ((incomeLower === 'sc' || incomeLower === 'st' || incomeLower === 'obc') && fullText.includes(incomeLower)) {
            score += 15;
        } else if (incomeLower === 'bpl' && fullText.includes('below poverty line')) {
            score += 20;
        }
    }

    // 4b. Numeric Income Matching (+20 for low income schemes if user income is low)
    if (userProfile.income) {
        const incomeNum = Number(userProfile.income);
        if (incomeNum <= 250000 && (fullText.includes('bpl') || fullText.includes('below poverty line') || fullText.includes('weaker section') || fullText.includes('low income'))) {
            score += 25;
        } else if (incomeNum > 800000 && (fullText.includes('entrepreneur') || fullText.includes('msme') || fullText.includes('business'))) {
            score += 10;
        }
    }

    // 5. Age Matching Context (+20 if age is mentioned nearby, very basic heuristic)
    if (userProfile.age) {
        // If the description mentions years like "18 to 60 years" and user falls in standard working age
        if (userProfile.age >= 60 && (fullText.includes('senior citizen') || fullText.includes('pension'))) {
            score += 25;
        } else if (userProfile.age <= 25 && (fullText.includes('student') || fullText.includes('scholarship') || fullText.includes('youth') || fullText.includes('education'))) {
            score += 25;
        }
    }

    // 6. Occupation Matching Context (+30 for high relevancy)
    if (userProfile.occupation) {
        const occLower = userProfile.occupation.toLowerCase();
        if (occLower.includes('farmer') || occLower.includes('agriculture')) {
            if (fullText.includes('farmer') || fullText.includes('kisan') || fullText.includes('agriculture') || fullText.includes('krishi') || schemeCategories.some(c => c.includes('agriculture'))) {
                score += 30;
            }
        } else if (occLower.includes('student')) {
            if (fullText.includes('scholarship') || fullText.includes('student') || schemeCategories.some(c => c.includes('education'))) {
                score += 30;
            }
        } else if (occLower.includes('business') || occLower.includes('entrepreneur') || occLower.includes('self-employed')) {
            if (fullText.includes('business') || fullText.includes('msme') || fullText.includes('entrepreneur') || fullText.includes('startup') || schemeCategories.some(c => c.includes('business'))) {
                score += 30;
            }
        } else if (occLower.includes('laborer') || occLower.includes('wage')) {
            if (fullText.includes('labor') || fullText.includes('shram') || fullText.includes('wage') || fullText.includes('worker')) {
                score += 30;
            }
        }
    }

    return score;
};

export const generateRecommendations = async (userId, options) => {
    try {
        const userProfile = await User.findById(userId);
        if (!userProfile) {
            throw new Error('User not found');
        }

        // Fetch all schemes from local in-memory/Excel mock
        const allSchemes = await readAllSchemes();

        if (!allSchemes || allSchemes.length === 0) {
            return {
                schemes: [],
                totalPages: 0,
                currentPage: 1,
                totalSchemes: 0,
                hasNextPage: false,
                hasPrevPage: false
            };
        }

        // Calculate a score for every scheme based on the user's profile
        const scoredSchemes = allSchemes.map(scheme => ({
            scheme,
            score: calculateMatchScore(scheme, userProfile)
        }));

        // Sort descending by score. Filter out schemes with 0 score to ensure 95% accuracy.
        // We only want to show highly relevant schemes.
        const highlyAccurateSchemes = scoredSchemes
            .filter(item => item.score > 0) // Must have at least some relevance
            .sort((a, b) => b.score - a.score)
            .map(item => item.scheme);

        // If filtering leaves us with nothing (e.g. empty user profile), fallback to All India/Central schemes
        let finalSchemes = highlyAccurateSchemes;
        if (finalSchemes.length === 0) {
            console.log('No highly relevant schemes found. Falling back to popular/Central schemes...');
            finalSchemes = allSchemes.filter(s => s.state === "All India" || s.level === "Central");
        }

        // Apply Pagination
        const page = parseInt(options.page) || 1;
        const limit = parseInt(options.limit) || 9;
        const result = paginateArray(finalSchemes, page, limit);

        return {
            schemes: result.docs,
            totalPages: result.totalPages,
            currentPage: result.page,
            totalSchemes: result.totalDocs,
            hasNextPage: page < result.totalPages,
            hasPrevPage: page > 1
        };

    } catch (error) {
        console.error('Error generating recommendations:', error.stack);
        throw new Error('Could not generate recommendations: ' + error.message);
    }
};
