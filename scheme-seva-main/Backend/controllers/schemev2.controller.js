import { readAllSchemes, readSchemeById, searchSchemes, paginateArray } from "../db/excelDb.js";
import User from "../models/user.model.js";

const getAllSchemes = async (req, res) => {
    try {
        const { page = 1, limit = 9 } = req.query;
        const schemes = await readAllSchemes();
        const result = paginateArray(schemes, parseInt(page), parseInt(limit));
        res.status(200).json({
            schemes: result.docs,
            totalPages: result.totalPages,
            currentPage: result.page,
            totalSchemes: result.totalDocs
        });
    } catch (error) {
        console.error("getAllSchemes error:", error);
        res.status(500).json({ message: "Error fetching schemes" });
    }
};

const getSchemeById = async (req, res) => {
    const { id } = req.params;
    console.log('Fetching scheme with ID:', id);
    try {
        const scheme = await readSchemeById(id);
        console.log('Found scheme:', scheme ? scheme._id : 'Not found');
        if (!scheme) {
            return res.status(404).json({ message: "Scheme not found" });
        }
        res.status(200).json(scheme);
    } catch (error) {
        console.error("getSchemeById error:", error);
        res.status(404).json({ message: "Scheme not found" });
    }
};

const getSchemeByCategory = async (req, res) => {
    try {
        const { page = 1, limit = 9 } = req.query;
        const { category } = req.params;
        const schemes = await readAllSchemes();
        const filtered = schemes.filter(s =>
            s.schemeCategory && s.schemeCategory.some(c =>
                c.toLowerCase().includes(category.toLowerCase())
            )
        );
        const result = paginateArray(filtered, parseInt(page), parseInt(limit));
        res.status(200).json({
            schemes: result.docs,
            totalPages: result.totalPages,
            currentPage: result.page,
            totalSchemes: result.totalDocs
        });
    } catch (error) {
        console.error("getSchemeByCategory error:", error);
        res.status(404).json({ message: "Category not found" });
    }
};

const getFilteredSchemes = async (req, res) => {
    try {
        const { page = 1, limit = 9 } = req.query;
        const { search, state, level, category, tags, schemeName } = req.query;

        let schemes = await readAllSchemes();

        // Apply filters
        if (search) {
            const q = search.toLowerCase();
            schemes = schemes.filter(s => {
                const searchStr = (
                    (s.schemeName?.label || s.schemeName || '') + ' ' +
                    (s.schemeShortTitle || '') + ' ' +
                    (s.detailedDescription_md || '') + ' ' +
                    (s.tags || []).map(t => t?.label || t).join(' ') + ' ' +
                    (s.schemeCategory || []).join(' ') + ' ' +
                    (s.Category || []).join(' ') + ' ' +
                    (s.state || '') + ' ' +
                    (s.nodalMinistryName?.label || s.nodalMinistryName || '')
                ).toLowerCase();
                return searchStr.includes(q);
            });
        }

        if (state) {
            const sLower = state.toLowerCase();
            schemes = schemes.filter(s => {
                const stateStr = (s.state?.label || s.state || '').toLowerCase();
                const levelStr = (s.level?.label || s.level || '').toLowerCase();
                return stateStr === sLower || stateStr === "all india" || levelStr === "central";
            });
        }

        if (level) {
            const lLower = level.toLowerCase();
            schemes = schemes.filter(s => {
                const levelStr = (s.level?.label || s.level || '').toLowerCase();
                return levelStr === lLower;
            });
        }

        if (category) {
            const categoriesArray = category.split(',').map(c => c.trim().toLowerCase());
            schemes = schemes.filter(s => {
                const cats = [...(s.schemeCategory || []), ...(s.Category || []), ...(s.tags || [])].map(c => (c?.label || c).toLowerCase());
                return categoriesArray.some(ca => cats.some(c => c.includes(ca) || ca.includes(c)));
            });
        }

        if (tags) {
            const tagsArray = tags.split(',').map(t => t.trim().toLowerCase());
            schemes = schemes.filter(s => {
                const stags = (s.tags || []).map(t => (t?.label || t).toLowerCase());
                return tagsArray.some(ta => stags.some(t => t.includes(ta)));
            });
        }

        if (schemeName) {
            const q = schemeName.toLowerCase();
            schemes = schemes.filter(s =>
                (s.schemeName?.label || s.schemeName || '').toLowerCase().includes(q) ||
                (s.schemeShortTitle || '').toLowerCase().includes(q)
            );
        }

        // Additional filters from frontend Search Component
        const { gender, incomeGroup, nodalMinistryName } = req.query;

        if (gender) {
            const gLower = gender.toLowerCase();
            schemes = schemes.filter(s => {
                const desc = ((s.detailedDescription_md || '') + ' ' + (s.eligibilityDescription_md || '') + ' ' + (s.schemeName?.label || s.schemeName || '')).toLowerCase();
                if (gLower === 'female') return desc.includes('women') || desc.includes('girl') || desc.includes('mahila') || desc.includes('female');
                if (gLower === 'male') return desc.includes('men ') || desc.includes('boy');
                return true; // if 'all' or 'other', don't filter out
            });
        }

        if (incomeGroup) {
            const incLower = incomeGroup.toLowerCase();
            schemes = schemes.filter(s => {
                const desc = ((s.detailedDescription_md || '') + ' ' + (s.eligibilityDescription_md || '')).toLowerCase();
                if (incLower === 'ews') return desc.includes('economically weaker') || desc.includes('ews');
                if (incLower === 'bpl') return desc.includes('below poverty line') || desc.includes('bpl');
                if (incLower === 'sc' || incLower === 'st' || incLower === 'obc') return desc.includes(incLower);
                return true;
            });
        }

        if (nodalMinistryName) {
            const nLower = nodalMinistryName.toLowerCase();
            schemes = schemes.filter(s => (s.nodalMinistryName?.label || s.nodalMinistryName || '').toLowerCase().includes(nLower));
        }

        const result = paginateArray(schemes, parseInt(page), parseInt(limit));
        res.status(200).json({
            schemes: result.docs,
            totalPages: result.totalPages,
            currentPage: result.page,
            totalSchemes: result.totalDocs
        });
    } catch (err) {
        console.error("getFilteredSchemes error:", err);
        res.status(500).json({ message: "Error filtering schemes" });
    }
};

// save favorite schemes
const saveFavoriteSchemes = async (req, res) => {
    try {
        const userId = req.user._id;
        const schemeId = req.body.schemeId;
        await User.findByIdAndUpdate(userId, { $push: { favorites: schemeId } }, { new: true });
        res.status(200).json({ message: "Favorite schemes saved successfully" });
    } catch (error) {
        console.error("Error saving favorite schemes:", error);
        res.status(500).json({ message: "Error saving favorite schemes" });
    }
};

const removeFavoriteSchemes = async (req, res) => {
    try {
        const userId = req.user._id;
        const { id } = req.params;
        const user = await User.findByIdAndUpdate(userId, { $pull: { favorites: id } }, { new: true });
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json({ success: true, message: "Scheme removed from favorites" });
    } catch (error) {
        console.error("Error removing favorite scheme:", error);
        res.status(500).json({ success: false, message: "Error removing favorite scheme" });
    }
};

const getFavoriteSchemes = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);
        res.status(200).json(user.favorites);
    } catch (error) {
        console.error("Error retrieving favorite schemes:", error);
        res.status(500).json({ message: "Error retrieving favorite schemes" });
    }
};

export { getAllSchemes, getSchemeById, getSchemeByCategory, getFilteredSchemes, saveFavoriteSchemes, removeFavoriteSchemes, getFavoriteSchemes };