import BudgetItem from '../models/BudgetItem.js';
import Project from '../models/Projects.js';
import Material from '../models/Material.js';
import Task from '../models/Task.js';
import UserModel from '../models/User.js';
import ChatLog from '../models/Message.js';
import { signToken } from '../utils/auth.js';

interface User {
    _id: string;
    name: string;
    email: string;
    password: string;
}

interface BudgetItem {
    _id: string;
    name: string;
    cost: number;
    quantity: number;
    projectId: string;
    materialId?: string;
    notes?: string;
}

interface Project {
    _id: string;
    title: string;
    description?: string;
    type: string;
    dimensions?: {
        length?: number;
        width?: number;
        height?: number;
    };
    createdBy: string;
    materials: string[];
    checklist: string[];
    budget: string[];
    createdAt: Date;
    dueDate?: Date;
}

interface Material {
    _id: string;
    name: string;
    category:
        | 'fencing'
        | 'paint'
        | 'drywall'
        | 'lumber'
        | 'concrete'
        | 'roofing'
        | 'plumbing'
        | 'electrical'
        | 'flooring'
        | 'insulation'
        | 'decking'
        | 'stain'
        | 'landscaping'
        | 'hardware'
        | 'tools'
        | 'HVAC'
        | 'siding'
        | 'masonry';
    unit: string;
    unitCoverage: {
        length_ft?: number;
        width_ft?: number;
        height_ft?: number;
        width_in?: number;
        length_in?: number;
        thickness_in?: number;
        weight_lb?: number;
        weight_ton?: number;
        sqft?: number;
        quantity?: number;
    };
    priceUSD: number;
    vendor?: string;
    lastUpdated: Date;
    projectId?: string;
}

interface Task {
    _id: string;
    projectId: string;
    title: string;
    dueDate?: Date;
    completed: boolean;
    notes?: string;
}

interface ChatLog {
    _id: string;
    projectId: string;
    messages: {
        sender: 'user' | 'bot';
        message: string;
        timestamp: Date;
    }[];
    createdAt: Date;
    updatedAt: Date;
}

const resolvers = {
    Query: {
        getAllUsers: async () => UserModel.find(),
        getUserById: async (_: any, { id }: { id: string }) =>
            UserModel.findById(id),
        getAllBudgetItems: async () => BudgetItem.find(),
        getBudgetItemById: async (_: any, { id }: { id: string }) =>
            BudgetItem.findById(id),
        getAllProjects: async () => Project.find(),
        getProjectById: async (_: any, { id }: { id: string }) =>
            Project.findById(id),
        getAllMaterials: async () => Material.find(),
        getMaterialById: async (_: any, { id }: { id: string }) =>
            Material.findById(id),
        getAllTasks: async () => Task.find(),
        getTaskById: async (_: any, { id }: { id: string }) =>
            Task.findById(id),
        getChatLogById: async (_: any, { id }: { id: string }) =>
            ChatLog.findById(id),
        getChatLogsByProjectId: async (
            _: any,
            { projectId }: { projectId: string }
        ) => ChatLog.find({ projectId }),
        getChatLogs: async () => ChatLog.find(),
    },
    Mutation: {

        createUser: async (
            _: any,
            args: { email: string; password: string; name: string }
        ) => {
            const newUser = new UserModel(args);
            await newUser.save();
            const token = signToken(newUser.username, newUser.email, newUser._id);

       
            return { user: newUser, token };
        },
        updateUser: async (_: any, { id, User }: { id: string; User: User }) =>
            UserModel.findByIdAndUpdate(id, User, { new: true }),
        deleteUser: async (_: any, { id }: { id: string }) =>
            UserModel.findByIdAndDelete(id),
        createBudgetItem: async (
            _: any,
            { budgetItem }: { budgetItem: BudgetItem }
        ) => {
            const newBudgetItem = new BudgetItem(budgetItem);
            return await newBudgetItem.save();
        },
        updateBudgetItem: async (
            _: any,
            { id, budgetItem }: { id: string; budgetItem: BudgetItem }
        ) => BudgetItem.findByIdAndUpdate(id, budgetItem, { new: true }),
        deleteBudgetItem: async (_: any, { id }: { id: string }) =>
            BudgetItem.findByIdAndDelete(id),
        createProject: async (_: any, { project }: { project: Project }) => {
            const newProject = new Project(project);
            return await newProject.save();
        },
        updateProject: async (
            _: any,
            { id, project }: { id: string; project: Project }
        ) => Project.findByIdAndUpdate(id, project, { new: true }),
        deleteProject: async (_: any, { id }: { id: string }) =>
            Project.findByIdAndDelete(id),
        createMaterial: async (
            _: any,
            { material }: { material: Material }
        ) => {
            const newMaterial = new Material(material);
            return await newMaterial.save();
        },
        updateMaterial: async (
            _: any,
            { id, material }: { id: string; material: Material }
        ) => Material.findByIdAndUpdate(id, material, { new: true }),
        deleteMaterial: async (_: any, { id }: { id: string }) =>
            Material.findByIdAndDelete(id),
        createTask: async (_: any, { task }: { task: Task }) => {
            const newTask = new Task(task);
            return await newTask.save();
        },
        updateTask: async (_: any, { id, task }: { id: string; task: Task }) =>
            Task.findByIdAndUpdate(id, task, { new: true }),
        deleteTask: async (_: any, { id }: { id: string }) =>
            Task.findByIdAndDelete(id),
        createChatLog: async (_: any, { chatLog }: { chatLog: ChatLog }) => {
            const newChatLog = new ChatLog(chatLog);
            return await newChatLog.save();
        },
        updateChatLog: async (
            _: any,
            { id, chatLog }: { id: string; chatLog: ChatLog }
        ) => ChatLog.findByIdAndUpdate(id, chatLog, { new: true }),
        deleteChatLog: async (_: any, { id }: { id: string }) =>
            ChatLog.findByIdAndDelete(id),
    },
};

export default resolvers;
