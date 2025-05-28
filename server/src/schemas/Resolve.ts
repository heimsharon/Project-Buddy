import BudgetItem from '../models/BudgetItem.js';
import Project from '../models/Projects.js';
import Material from '../models/Material.js';
import Task from '../models/Task.js';
import User from '../models/User.js';
import { signToken } from '../utils/auth.js';

interface User {
    _id: string;
    username: string;
    email: string;
    password: string;
    skills?: string[];
}

interface BudgetItem {
   _id: string;
    projectId: string;
    name: string;
    cost: number;
    quantity: number;
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
    userId: string;
    materialId: string[];
    createdAt: Date;
    dueDate?: Date;
}

interface Material {
    _id: string;
    name: string;
    category: string;
    unit: string;
    unitCoverage: {
        length_ft: number;
        width_ft: number;
        height_ft: number;
        width_in: number;
        length_in: number;
        thickness_in: number;
        weight_lb: number;
        weight_ton: number;
        sqft: number;
    };
    quantity: number;
    priceUSD: number;
    vendor?: string;
    lastUpdated: Date;
}

interface Task {
    _id: string;
    projectId: string;
    title: string;
    dueDate?: Date;
    completed: boolean;
    notes?: string;
}

const resolvers = {
    Query: {
        getAllUsers: async () => User.find(),
        getUserById: async (_: any, { id }: { id: string }) =>
            User.findById(id),
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
            Task.findById(id)
    },

    Mutation: {
        createUser: async (
            _: any,
            args: { email: string; password: string; username: string }
        ) => {
            const newUser = new User(args);
            await newUser.save();
            const token = signToken(newUser.username, newUser.email, newUser._id);
            return { user: newUser, token };
        },
        login: async (
            _: any,
            { email, password }: { email: string; password: string }
        ) => {
            const user = await User.findOne({ email });
            await user?.isCorrectPassword(password);
            if (!user) {
                throw new Error('Invalid credentials');
            }
            const token = signToken(user.username, user.email, user._id);
            return { user, token };
        },
        updateUser: async (_: any, { id, User: userInput }: { id: string; User: User }) =>
            User.findByIdAndUpdate(id, userInput, { new: true }),
        deleteUser: async (_: any, { id }: { id: string }) =>
            User.findByIdAndDelete(id),
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
        createProject: async (_: any, args: { title: string; description: string, userId: string }) => {
            const newProject = new Project(args);
            await newProject.save();
            return newProject;
        },
        updateProject: async (
            _: any,
            { id, project }: { id: string; project: Project }
        ) => Project.findByIdAndUpdate(id, project, { new: true }),
        deleteProject: async (_: any, { id }: { id: string }) =>
            Project.findByIdAndDelete(id),
        createMaterial: async ( _: any,
            args: { name: string; category: string; unit: string }
        ) => {
            const newMaterial = new Material(args);
            await newMaterial.save();
            return newMaterial;
        },
        updateMaterial: async (
            _: any,
            { id, material }: { id: string; material: Material }
        ) => Material.findByIdAndUpdate(id, material, { new: true }),
        deleteMaterial: async (_: any, { id }: { id: string }) =>
            Material.findByIdAndDelete(id),
        createTask: async (_: any, args: { title: string; dueDate?: Date; notes?: string; projectId: string }) => {
            const newTask = new Task(args);
            await newTask.save();
            return newTask;
        },
        updateTask: async (_: any, { id, task }: { id: string; task: Task }) =>
            Task.findByIdAndUpdate(id, task, { new: true }),
        deleteTask: async (_: any, { id }: { id: string }) =>
            Task.findByIdAndDelete(id)
    }
};

export default resolvers;
