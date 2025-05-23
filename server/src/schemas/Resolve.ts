import BudgetItem from '../models/BudgetItem.js';
import User from '../models/User.js';
import Project from '../models/Projects.js';
import Task from '../models/Task.js';
import Material from '../models/Material.js';
import ChatLog from '../models/Message.js';
import { signToken, AuthenticationError } from '../utils/auth.js';

interface AddUser {
    input: {
        name: string;
        email: string;
        password: string;
    }
}

interface UserArgs {
    name: string;
}


interface LoginUser {
    name: string;
    password: string;
}

interface BudgetItemArgs {
    name: string
}

interface AddBudgetItem {
    input: {
        name: string;
        amount: number;
        projectId: typeof Project;
    }
}

interface MaterialArgs {
    name: string
}

interface AddMaterial {
    input: {
        name: string;
        category: 'fencing' | 'paint' | 'drywall' | 'lumber' | 'concrete' | 'roofing' | 'plumbing' | 'electrical' | 'flooring' | 'insulation' | 'decking' | 'stain' | 'landscaping' | 'hardware' | 'tools' | 'HVAC' | 'siding' | 'masonry';
        unit: string;  
        unitCoverage: Array<{ 
            length_ft: number;
            width_ft: number;
            height_ft: number;
            width_in: number;
            length_in: number;
            thickness_in: number;
            weight_lb: number;
            weight_ton: number;
            sqft: number;
            quantity: number;
        }>;
        priceUSD: number;
        vendor?: string;
        lastUpdated: Date;
        projectId?: Number;
    }
}

interface AddTask {
    input: {
        ProjectId: typeof Project;
        title: string;
        dueDate?: Date;
        completed: boolean;
        notes?: string;
    }
}

interface TaskArgs {
    title: string
}

interface AddProject {
    input : {
        title: string;
        description?: string;
        type: string;
        dimensions?: {
            length?: number;
            width?: number;
            height?: number;
        };
        createdBy: typeof User;
        materials: typeof Material[];
        checklist: typeof Task[];
        budget: typeof BudgetItem[];
        createdAt: Date;
        dueDate?: Date;
    }
}

interface ProjectArgs {
    title: string
}

interface AddChatLog {
    input: {
        projectId: typeof Project;
        messages: Array<{
            sender: string;
            content: string;
            timestamp: Date;
        }>;
        createdAt: Date;
        updatedAt: Date;
    }
}

interface ChatLogArgs {
    projectId: typeof Project;
}


const Resolvers = {
    Query: {
        // Get all users
        users: async () => {
            return await User.find();
        },
        // Get a user by ID
        user: async (_parent: any, { name }: UserArgs) => {
            return User.findOne({ name });
        },
        // authentication check
        me: async (_: any, __: any, context: any) => {
            if (context.user) {
                return await User.findById(context.user._id);
            }
            throw new AuthenticationError('Not logged in');
        },
        // Get all projects
        projects: async () => {
            return await Project.find();
        },
        // Get a project by ID
        project: async (_parent: any, { title }: ProjectArgs) => {
            return User.findOne({ title });
        },
        // Get all tasks
        tasks: async () => {
            return await Task.find();
        },
        // Get a task by ID
        task: async (_parent: any, { title }: TaskArgs) => {
            return User.findOne({ title });
        },
        budgetItems: async () => {
            return await BudgetItem.find();
        },
        // Get a budget item by ID
        budgetItem: async (_parent: any, { name }: BudgetItemArgs) => {
            return User.findOne({ name });
        },
        // Get all materials
        materials: async () => {
            return await Material.find();
        },
        // Get a material by ID
        material: async (_parent: any, { name }: MaterialArgs) => {
            return User.findOne({ name });
        },
        // Get all chat logs
        chatLogs: async () => {
            return await ChatLog.find();
        },
        // Get a chat log by ID
        chatLog: async (_parent: any, { projectId }: ChatLogArgs) => {
            return User.findOne({ projectId });
        },
    },
    
    Mutations: {
        // Create a new user
        createUser: async (_parent: any, { input }: AddUser) => {
            const user = await User.create({ ...input });
            const token = signToken(user.name, user.email, user._id);
            return { token, user };
        },
    //Login a user
        login: async (_parent: any, { name, password }: LoginUser) => {
            const user = await User.findOne({ name });
            if (!user) {
                throw new AuthenticationError('Could not authenticate user.');
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Could not authenticate user.');
            }
            const token = signToken(user.name, user.email, user._id);
            return { token, user };
        },
        // Update a user
        updateUser: async (_parent: any, { input }: AddUser) => {
            return await User.findOneAndUpdate(
                { name: input.name },
                { $set: { ...input } },
                { new: true }
            );
        },
        // Delete a user
        deleteUser: async (_parent: any, { name }: UserArgs) => {
            return await User.findOneAndDelete({ name });
        }
        // Create a new project
        , createProject: async (_parent: any, { input }: AddProject) => {
            return await Project.create({ ...input });
        },
        // Update a project
        updateProject: async (_parent: any, { input }: AddProject) => {
            return await Project.findOneAndUpdate(
                { title: input.title },
                { $set: { ...input } },
                { new: true }
            );
        },
        // Delete a project
        deleteProject: async (_parent: any, { title }: ProjectArgs) => {
            return await Project.findOneAndDelete({ title });
        },
        // Create a new task
        createTask: async (_parent: any, { input }: AddTask) => {
            return await Task.create({ ...input });
        },
        // Update a task
        updateTask: async (_parent: any, { input }: AddTask) => {
            return await Task.findOneAndUpdate(
                { title: input.title },
                { $set: { ...input } },
                { new: true }
            );
        },
        // Delete a task
        deleteTask: async (_parent: any, { title }: TaskArgs) => {
            return await Task.findOneAndDelete({ title });
        },
        // Create a new budget item
        createBudgetItem: async (_parent: any, { input }: AddBudgetItem) => {
            return await BudgetItem.create({ ...input });
        },
        // Update a budget item
        updateBudgetItem: async (_parent: any, { input }: AddBudgetItem) => {
            return await BudgetItem.findOneAndUpdate
                ({ name: input.name },
                { $set: { ...input } },
                { new: true }
            );
        },
        // Delete a budget item
        deleteBudgetItem: async (_parent: any, { name }: BudgetItemArgs) => {
            return await BudgetItem.findOneAndDelete({ name });
        },
        // Create a new material
        createMaterial: async (_parent: any, { input }: AddMaterial) => {
            return await Material.create({ ...input });
        },
        // Update a material
        updateMaterial: async (_parent: any, { input }: AddMaterial) => {
            return await Material.findOneAndUpdate(
                { name: input.name },
                { $set: { ...input } },
                { new: true }
            );
        },
        // Delete a material
        deleteMaterial: async (_parent: any, { name }: MaterialArgs) => {
            return await Material.findOneAndDelete({ name });
        },
        // Create a new chat log
        createChatLog: async (_parent: any, { input }: AddChatLog) => {
            return await ChatLog.create({ ...input });
        },
        // Update a chat log
        updateChatLog: async (_parent: any, { input }: AddChatLog) => {
            return await ChatLog.findOneAndUpdate(
                { projectId: input.projectId },
                { $set: { ...input } },
                { new: true }
            );
        },
        // Delete a chat log
        deleteChatLog: async (_parent: any, { projectId }: ChatLogArgs) => {
            return await ChatLog.findOneAndDelete({ projectId });
        }
    },
};

export default Resolvers;