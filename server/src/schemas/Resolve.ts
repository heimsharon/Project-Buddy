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
    amount: number;
    projectId: string;
}

interface Project {
    _id: string;
    title: string;
    description: string;
    type: string;
    dimensions?: {
        length?: number;
        width?: number;
        height?: number;
    };
    createdBy: string;
    checklist: string[];
    budget: string[];
    createdAt: Date;
}

interface Material {
    _id: string;
    name: string;
    category: 'fencing' | 'paint' | 'drywall' | 'hardware' | 'flooring' | 'tools';
    unit: string;
    unitCoverage: {
        length_ft: number;
        width_ft: number;
        height_ft: number;
        sqft: number;
        quantity: number;
    };
    priceUSD: number;
    vendor?: string;
    lastUpdated: Date;
    projectId?: Number;
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
}

const resolvers = {
    Query: {
        getAllUsers: async () => {
            return await UserModel.find();
        },
        getUserById: async (_: any, { id }: { id: string }) => {
            return await UserModel.findById(id);
        },
        getAllBudgetItems: async () => {
            return await BudgetItem.find();
        },
        getBudgetItemById: async (_: any, { id }: { id: string }) => {
            return await BudgetItem.findById(id);
        },
        getAllProjects: async () => {
            return await Project.find();
        },
        getProjectById: async (_: any, { id }: { id: string }) => {
            return await Project.findById(id);
        },
        getAllMaterials: async () => {
            return await Material.find();
        },
        getMaterialById: async (_: any, { id }: { id: string }) => {
            return await Material.findById(id);
        },
        getAllTasks: async () => {
            return await Task.find();
        },
        getTaskById: async (_: any, { id }: { id: string }) => {
            return await Task.findById(id);
        },
        getChatLogById: async (_: any, { id }: { id: string }) => {
            return await ChatLog.findById(id);
        },
        getChatLogsByProjectId: async (_: any, { projectId }: { projectId: string }) => {
            return await ChatLog.findOne({ projectId });
        },
        getChatLogs: async () => {
            return await ChatLog.find();
        }
    },
    Mutation: {
        createUser: async (_: any, args : { email: string, password: string, username: string }) => {
            const newUser = new UserModel(args);
            newUser.save();
            const token = signToken(newUser.name, newUser.email, newUser._id);
            return { user: newUser, token };
        },
        updateUser: async (_: any, { id, User }: { id: string; User: User }) => {
            return await UserModel.findByIdAndUpdate(id, User, { new: true });
        },
        deleteUser: async (_: any, { id }: { id: string }) => {
            return await UserModel.findByIdAndDelete(id);
        },
        createBudgetItem: async (_: any, { budgetItem }: { budgetItem: BudgetItem }) => {
            const newBudgetItem = new BudgetItem(budgetItem);
            return await newBudgetItem.save();
        },
        updateBudgetItem: async (_: any, { id, budgetItem }: { id: string; budgetItem: BudgetItem }) => {
            return await BudgetItem.findByIdAndUpdate(id, budgetItem, { new: true });
        },
        deleteBudgetItem: async (_: any, { id }: { id: string }) => {
            return await BudgetItem.findByIdAndDelete(id);
        },
        createProject: async (_: any, { project }: { project: Project }) => {
            const newProject = new Project(project);
            return await newProject.save();
        },
        updateProject: async (_: any, { id, project }: { id: string; project: Project }) => {
            return await Project.findByIdAndUpdate(id
                , project, { new: true });
        },
        deleteProject: async (_: any, { id }: { id: string }) => {
            return await Project.findByIdAndDelete(id);
        },
        createMaterial: async (_: any, { material }: { material: Material }) => {
            const newMaterial = new Material(material);
            return await newMaterial.save();
        },
        updateMaterial: async (_: any, { id, material }: { id: string; material: Material }) => {
            return await Material.findByIdAndUpdate(id, material, { new: true });
        },
        deleteMaterial: async (_: any, { id }: { id: string }) => {
            return await Material.findByIdAndDelete(id);
        },
        createTask: async (_: any, { task }: { task: Task }) => {
            const newTask = new Task(task);
            return await newTask.save();
        },
        updateTask: async (_: any, { id, task }: { id: string; task: Task }) => {
            return await Task.findByIdAndUpdate(id, task, { new: true });
        },
        deleteTask: async (_: any, { id }: { id: string }) => {
            return await Task.findByIdAndDelete(id);
        },
        createChatLog: async (_: any, { chatLog }: { chatLog: ChatLog }) => {
            const newChatLog = new ChatLog(chatLog);
            return await newChatLog.save();
        },
        updateChatLog: async (_: any, { id, chatLog }: { id: string; chatLog: ChatLog }) => {
            return await ChatLog.findByIdAndUpdate(id, chatLog, { new: true });
        },
        deleteChatLog: async (_: any, { id }: { id: string }) => {
            return await ChatLog.findByIdAndDelete(id);
        }
    },
};

export default resolvers;