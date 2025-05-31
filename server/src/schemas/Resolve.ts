import BudgetItem from '../models/BudgetItem.js';
import Project from '../models/Projects.js';
import Material from '../models/Material.js';
import Task from '../models/Task.js';
import User from '../models/User.js';
import Authentication from '../utils/auth.js';

interface User {
    _id: string;
    avatar?: string;
    username: string;
    email: string;
    password: string;
    skills?: string[];
}

interface BudgetItem {
   _id: string;
    projectId: string;
    name: string;
    estimatedCost: number;
    actualCost?: number;
    quantity: number;
}

interface Dimensions {
    length: number;
    width: number;
    height: number;
}

interface Project {
    _id: string;
    title: string;
    description?: string;
    type: string;
    dimensions: Dimensions;
    estimatedBudget: number;
    actualBudget?: number;
    userId: string;
    createdAt: Date;
    dueDate?: Date;
    materialIds?: string[];
}

interface UnitCoverage {
    length_ft: number;
    width_ft: number;
    height_ft: number;
    width_in: number;
    length_in: number;
    thickness_in: number;
    weight_lb: number;
    weight_ton: number;
    sqft: number;
}

interface Material {
    _id: string;
    name: string;
    category: string;
    unit: string;
    unitCoverage: UnitCoverage;
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
        getUserById: async (_: any, { id }: { id: string }) => {
            const user = await User.findById(id);
            if (!user) {
                throw new Error('User not found');
            }
            console.log(user);
            return user;
        },
        currentUser: async (_parent: any, _args: any, context: { req: any }) => {
            try {
                const decoded = Authentication.verifyToken(context.req);
                if (decoded && typeof decoded === 'object' && 'data' in decoded) {
                    const userId = (decoded as any).data._id;
                    const user = await User.findById(userId);
                    if (!user) {
                        throw new Error('User not found');
                    }
                    return user;
                }
                return null;
            } catch (error) {
                console.error(error instanceof Error ? error.message : error);
                throw new Error('Authentication failed');
            }
        },

        getAllBudgetItems: async () => BudgetItem.find(),
        getBudgetItemById: async (_: any, { id }: { id: string }) => BudgetItem.findById(id),

        getAllProjects: async () => Project.find(),
        getProjectById: async (_: any, { id }: { id: string }) => {
            const project = await Project.findById(id).populate('materialIds');
            if (!project) {
                throw new Error('Project not found');
            }
            console.log(project)
            return project;
        },

        getAllMaterials: async () => Material.find(),
        getMaterialById: async (_: any, { id }: { id: string }) => {
            const material = await Material.findById(id);
            if (!material) {
                throw new Error('Material not found');
            }
            console.log(material)
            return material;
        },

        getAllTasks: async () => Task.find(),
        getTaskById: async (_: any, { id }: { id: string }) => Task.findById(id)
    },

    Mutation: {
        createUser: async (
            _: any,
            args: { email: string; password: string; username: string, skills?: string[] }
        ) => {
            const newUser = new User(args);
            await newUser.save();
            const token = Authentication.signToken(newUser.username, newUser.email, newUser._id);

            console.log(token)
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
            const token = Authentication.signToken(user.username, user.email, user._id);
            return { user, token };
        },
        updateUser: async (_: any, args: { id: string; avatar: string; username: string; email: string; password: string, skills: string[] }) => 
            await User.findByIdAndUpdate(
                args.id,
                {
                    avatar: args.avatar,
                    username: args.username,
                    email: args.email,
                    password: args.password,
                    skills: args.skills
                },
                { new: true
                }
            ),        
        deleteUser: async (_: any, { id }: { id: string }) => User.findByIdAndDelete(id),

        createBudgetItem: async (_: any, args:
            { 
                name: string; 
                estimatedCost: number; 
                quantity: number;
                projectId: string 
            }
        ) => {
            const newBudgetItem = new BudgetItem(args);
            return await newBudgetItem.save();
        },
        updateBudgetItem: async (_: any, args
            : { 
                id: string; 
                name?: string; 
                estimatedCost?: number;
                actualCost?: number;
                quantity?: number; 
            }) => BudgetItem.findByIdAndUpdate(args.id,
            {
                    name: args.name,
                    estimatedCost: args.estimatedCost,
                    actualCost: args.actualCost,
                    quantity: args.quantity
                    
                },
                { new: true }
            ),
        deleteBudgetItem: async (_: any, { id }: { id: string }) => BudgetItem.findByIdAndDelete(id),

        createProject: async (_: any, args: 
            { 
                title: string;
                description: string, 
                userId: string, 
                dimensions: Dimensions, 
                estimatedBudget: number,
                dueDate: string,
                type: string,
                materialIds?: string[]
            }) => {
            const newProject = new Project(args);
            await newProject.save();
            return newProject;
        },
        updateProject: async (_: any, args: 
            { 
                id: string, 
                title: string, 
                description: string, 
                type: string, 
                materialIds?: string[], 
                actualBudget?: number,
                dimensions: Dimensions, 
                dueDate: string
            }) => Project.findByIdAndUpdate(
            args.id,
            {
                title: args.title,
                description: args.description,
                type: args.type,
                dimensions: args.dimensions,
                actualBudget: args.actualBudget,
                dueDate: args.dueDate,
                materialIds: args.materialIds
            },
            { new: true } 
        ),
        deleteProject: async (_: any, { id }: { id: string }) => Project.findByIdAndDelete(id),

        createMaterial: async ( _: any, args: 
            { 
                name: string; 
                category: string; 
                unit: string,
                unitCoverage: UnitCoverage,
                quantity: number;
                priceUSD: number;
                vendor?: string;
            }) => {
            const newMaterial = new Material(args);
            await newMaterial.save();
            return newMaterial;
        },
        updateMaterial: async (_: any, args: 
            {
                id: string;
                name?: string;
                quantity?: number;
                category?: string;
                unit?: string;
                unitCoverage?: UnitCoverage;
                priceUSD?: number;
                vendor?: string;
            }) => {
            const { id, ...updateFields } = args;
            const updatedMaterial = await Material.findByIdAndUpdate(
                id,
                updateFields,
                { new: true }
            );
            if (!updatedMaterial) {
                throw new Error('Material not found');  
            }
            return updatedMaterial;
        },
        deleteMaterial: async (_: any, { id }: { id: string }) => Material.findByIdAndDelete(id),

        createTask: async (_: any, args: { title: string; dueDate?: Date; notes?: string; projectId: string }) => {
            const newTask = new Task(args);
            await newTask.save();
            return newTask;
        },
        updateTask: async (
            _: any,
            args: { id: string; title?: string; dueDate?: Date; completed?: boolean; notes?: string; projectId?: string }
        ) => {
            const { id, title, dueDate, completed, notes, projectId } = args;
            const updatedTask = await Task.findByIdAndUpdate(
                id,
                { title, dueDate, completed, notes, projectId },
                { new: true }
            );
            if (!updatedTask) throw new Error('Task not found');
            return updatedTask;
        },
        deleteTask: async (_: any, { id }: { id: string }) => Task.findByIdAndDelete(id)
    }
};

export default resolvers;
