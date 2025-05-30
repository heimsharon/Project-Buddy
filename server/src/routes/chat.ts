import express, { Request, Response } from 'express';
import OpenAI from 'openai';
import Material from '../models/Material.js';
import dotenv from 'dotenv';
dotenv.config();

// Load the assistant ID from environment variables
console.log(process.env.OPENAI_ASSISTANT_ID);  
const assistantId = process.env.OPENAI_ASSISTANT_ID || '';

//if (!assistantId) {
  //  throw new Error('OPENAI_ASSISTANT_ID is not set in environment variables!');
//}

const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY as string });

// Regex to detect price/cost questions
const priceRegex =
    /\b(price|cost|how much is|what is the price of|how much does)\s+([\w\s]+)\b/i;

router.post('/', async (req: Request, res: Response) => {
    const { message } = req.body;
    console.log('Received message:', message);

    if (!message) {
        return res.status(400).json({ error: 'Message is required.' });
    }

    // Check if the user is asking for the price/cost of a material
    const priceMatch = message.match(priceRegex);
    if (priceMatch) {
        // Try to extract the material name
        const materialName = priceMatch[2].trim();
        const material = await Material.findOne({
            name: new RegExp(materialName, 'i'),
        }).lean();

        if (material) {
            return res.json({
                reply: `The price of ${material.name} is $${material.priceUSD} per ${material.unit}.`,
            });
        } else {
            return res.json({
                reply: `Sorry, I couldn't find information about "${materialName}" in the database. Please check with a local supplier.`,
            });
        }
    }

    // Fallback: Use OpenAI Assistant for all other questions
    try {
        // 1. Create a thread (or reuse an existing one for context)
        const thread = await openai.beta.threads.create();

        // 2. Add the user's message to the thread
        await openai.beta.threads.messages.create(thread.id, {
            role: 'user',
            content: message,
        });

        // 3. Run the assistant on the thread
        const run = await openai.beta.threads.runs.create(thread.id, {
            assistant_id: assistantId,
        });

        // 4. Wait for the run to complete and get the response
        let runStatus;
        do {
            runStatus = await openai.beta.threads.runs.retrieve(
                thread.id,
                run.id
            );
            if (runStatus.status !== 'completed') {
                await new Promise((resolve) => setTimeout(resolve, 1000));
            }
        } while (runStatus.status !== 'completed');

        // 5. Get the assistant's reply
        const messages = await openai.beta.threads.messages.list(thread.id);
        const assistantReply = messages.data
            .filter((msg) => msg.role === 'assistant')
            .map((msg) =>
                msg.content
                    .filter((block: any) => block.type === 'text')
                    .map((block: any) => block.text.value)
                    .join('\n')
            )
            .join('\n');

        return res.json({ reply: assistantReply });
    } catch (error) {
        console.error('OpenAI error:', error);
        return res
            .status(500)
            .json({ error: 'Failed to process chatbot request.' });
    }
});

export default router;
