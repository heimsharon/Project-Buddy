import express, { Request, Response } from 'express';
import Project from '../models/Projects';
import Material from '../models/Material';


const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    try {
        const {
            name,
            description,
            plannedBudget,
            dueDate,
            dimensions,
            materials,
            userId, // You may want to get this from auth/session instead
        } = req.body;

        // Parse dimensions string (e.g., "10x20x8 ft" or "10x20 ft")
        let length = null,
            width = null,
            height = null;
        if (dimensions) {
            const dims = dimensions.match(/([\d.]+)/g);
            if (dims && dims.length >= 2) {
                length = parseFloat(dims[0]);
                width = parseFloat(dims[1]);
                if (dims[2]) height = parseFloat(dims[2]);
            }
        }

        // Map material names to IDs
        let materialIds: any[] = [];
        if (materials && materials.length > 0) {
            for (const mat of materials) {
                const found = await Material.findOne({ name: mat.name });
                if (found) materialIds.push(found._id);
            }
        }

        const project = new Project({
            title: name,
            description,
            type: '', // You can add a type field in your frontend if needed
            dimensions: { length, width, height },
            estimatedBudget: plannedBudget,
            userId, // Make sure to provide this
            materialIds,
            dueDate: dueDate ? new Date(dueDate) : null,
        });

        await project.save();
        res.status(201).json({ message: 'Project saved!', project });
    } catch (error) {
        console.error('Error saving project:', error);
        res.status(500).json({ error: 'Failed to save project.' });
    }
});

export default router;
