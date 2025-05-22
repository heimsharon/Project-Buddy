import express, { Request, Response } from 'express';
import OpenAI from 'openai';
import Material from '../../models/Material.js'; //Mongoose model

const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY as string });

// regex for intent and material extraction
const materialRegex = /\b(price|cost|how much|material|worth)\b/i;

router.post('/', async (req: Request, res: Response) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Message is required.' });
    }

    if (materialRegex.test(message)) {
        // material extraction
        const materialMatch = message.match(
            /\b(?:price of|cost of|how much is|what is the price of|how much for)\s+([\w\s]+)/i
        );
        console.log('Material match:', materialMatch?.[1]);
        if (!materialMatch) {
            return res.json({
                reply: "I couldn't identify the material you're asking about. Can you rephrase or specify it?",
            });
        }
        const materialName = materialMatch[1].trim();
        const material = await Material.findOne({
            name: new RegExp(materialName, 'i'),
        }).lean();
        if (material) {
            return res.json({
                reply: `The price of ${material.name} is $${material.priceUSD} per ${material.unit}.`,
            });
        }
    }

    // Fallback to OpenAI for general questions
    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [{ role: 'user', content: message }],
        });
        const reply =
            completion.choices[0]?.message?.content ||
            "Sorry, I couldn't find an answer.";
        res.json({ reply });
    } catch (error) {
        res.status(500).json({ error: 'Failed to process chatbot request.' });
    }
});

export default router;
