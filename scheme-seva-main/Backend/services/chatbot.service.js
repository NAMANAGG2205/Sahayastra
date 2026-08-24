import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateSchemeResponse = async (scheme, question, language = 'en') => {
    try {
        if (process.env.GEMINI_API_KEY === 'mock_key' || !process.env.GEMINI_API_KEY) {
            return "This is a simulated response for the scheme '" + scheme.schemeName + "'. In a real environment, I would provide a helpful answer based on your question: '" + question + "'.";
        }

        const model = genAI.getGenerativeModel({ model: "gemini-3.6-flash" });
        
        // Create a context-aware prompt with language instruction
        const prompt = `
        Given this government scheme:
        
        Basic Information:
        - Name: ${scheme.schemeName}
        - Short Title: ${scheme.schemeShortTitle}
        - Level: ${scheme.level}
        - State: ${scheme.state || 'Not specified'}
        - Ministry: ${scheme.nodalMinistryName?.label || 'Not specified'}
        
        Timeline:
        - Open Date: ${scheme.openDate ? new Date(scheme.openDate).toLocaleDateString() : 'Not specified'}
        - Close Date: ${scheme.closeDate ? new Date(scheme.closeDate).toLocaleDateString() : 'Not specified'}
        
        Categories and Tags:
        - Categories: ${scheme.schemeCategory?.join(', ')}
        - Tags: ${scheme.tags?.join(', ')}
        
        Detailed Information:
        - Description: ${scheme.detailedDescription_md}
        - Eligibility Criteria: ${scheme.eligibilityDescription_md}
        
        Application Process:
        ${scheme.applicationProcess?.map(process => `
            Mode: ${process.mode}
            Process: ${JSON.stringify(process.process)}
        `).join('\n')}
        
        Required Documents:
        ${scheme.documents_required?.map(doc => JSON.stringify(doc)).join('\n')}
        
        Benefits:
        ${scheme.benefits?.map(benefit => JSON.stringify(benefit)).join('\n')}
        
        References:
        ${scheme.references?.map(ref => `- ${ref.title}: ${ref.url}`).join('\n')}
        
        FAQs:
        ${scheme.faqs?.map(faq => `Q: ${faq.question}\nA: ${faq.answer}`).join('\n')}

        User Question: ${question}

        Please provide a clear, concise, and helpful response about this scheme.
        If the question is about eligibility, reference the specific criteria.
        If the question is about application process, provide step-by-step guidance.
        If the question is about documents, list the specific requirements.
        If the question is about benefits, explain them clearly.
        If the question is about deadlines, mention both open and close dates if available.

        Important: 
        1. Respond in ${language === 'hi' ? 'Hindi' : language === 'pa' ? 'Punjabi' : 'English'} language
        2. Keep the response focused and relevant to the question
        3. If information is not available, clearly state that
        4. For dates, mention if they are current or past
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error('Error generating chatbot response:', error);
        return "I apologize, but I'm having trouble processing your question. Please try asking in a different way or contact support for assistance.";
    }
};

export const generateGeneralResponse = async (question, language = 'en') => {
    try {
        if (process.env.GEMINI_API_KEY === 'mock_key' || !process.env.GEMINI_API_KEY) {
            const q = question.toLowerCase();
            if (q.includes('pm kisan') || q.includes('kisan')) {
                return "**PM Kisan Samman Nidhi (PM-KISAN)**\n\nUnder this scheme, all landholding farmer families are provided with a financial benefit of Rs. 6000 per annum per family, payable in three equal installments of Rs. 2000 each, every four months. You can apply via the PM-Kisan portal or your local CSC.";
            } else if (q.includes('digital') || q.includes('digital india')) {
                return "**Digital India**\n\nDigital India is a flagship programme of the Government of India with a vision to transform India into a digitally empowered society and knowledge economy. It provides access to various government services online.";
            }
            return "Hello! I am currently running in offline/demo mode since the AI API key was forbidden. Try asking me about the 'PM Kisan' scheme!";
        }

        const model = genAI.getGenerativeModel({ model: "gemini-3.6-flash" });
        
        const prompt = `
        You are an AI assistant for "Sahayastra", a portal for Indian government schemes.
        Your goal is to answer general queries about government schemes in India.

        User Question: ${question}

        Please provide a clear, concise, and helpful response. If the user asks about specific types of schemes (e.g., for farmers, students, women), provide general guidance and suggest they browse the relevant categories on the portal.

        Important: 
        1. Respond in ${language === 'hi' ? 'Hindi' : language === 'pa' ? 'Punjabi' : 'English'} language
        2. Keep the response focused, polite, and relevant
        3. Do not invent non-existent government schemes; stick to well-known central or state schemes in India if you must give examples.
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error('Error generating general chatbot response:', error);
        return "I apologize, but I'm having trouble processing your question right now. Please try again later.";
    }
};
