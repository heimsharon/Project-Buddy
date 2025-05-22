import { BudgetItem, Material, ChatLog, Project, User, Task } from '../models/index.js';
import { signToken, AuthenticationError } from '../utils/auth.js';

const Resolvers = {
    Query: {
        // Get all users
        users: async () => {
            return await User.find();
        },
        // Get a user by ID
        user: async (_: any, { _id }: any) => {
            return await User.findById(_id);
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
        project: async (_: any, { _id }: any) => {
            return await Project.findById(_id);
        },
        // Get all tasks
        tasks: async () => {
            return await Task.find();
        },
        // Get a task by ID
        task: async (_: any, { _id }: any) => {
            return await Task.findById(_id);
        },
        budgetItems: async () => {
            return await BudgetItem.find();
        },
        // Get a budget item by ID
        budgetItem: async (_: any, { _id }: any) => {
            return await BudgetItem.findById(_id);
        },
        // Get all materials
        materials: async () => {
            return await Material.find();
        },
        // Get a material by ID
        material: async (_: any, { _id }: any) => {
            return await Material.findById(_id);
        },
        // Get all chat logs
        chatLogs: async () => {
            return await ChatLog.find();
        },
        // Get a chat log by ID
        chatLog: async (_: any, { _id }: any) => {
            return await ChatLog.findById(_id);
        },
    },
    
    Mutations: {
        // Create a new user
        createUser: async (_: any, { name, email, password }: any) => {
            const user = await User.create({ name, email, password });
            const token = signToken(user.name, user.email, user._id);
            return { token, user };
        },
        // Login a user
        login: async (_: any, { name, password }: any) => {
            const user = await User.findOne({ name });
            if (!user) {
                throw new AuthenticationError('No user found');
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Incorrect password');
            }
            const token = signToken(user.name, user.email, user._id);
            return { token, user };
        },
        // Update a user
        updateUser: async (_: any, { _id, name, email, password }: any) => {
            const user = await User.findByIdAndUpdate(
                _id,
                { name, email, password },
                { new: true }
            );
            return user;
        },
        // Delete a user
        deleteUser: async (_: any, { _id }: any) => {
            const user = await User.findByIdAndDelete(_id);
            return user;
        },
        // Create a new project
        createProject: async (_: any, { name, description, startDate, endDate }: any) => {
            const project = await Project.create({ name, description, startDate, endDate });
            return project;
        },
        // Update a project
        updateProject: async (_: any, { _id, name, description, startDate, endDate }: any) => {
            const project = await Project.findByIdAndUpdate(
                _id,
                { name, description, startDate, endDate },
                { new: true }
            );
            return project;
        },
        // Delete a project
        deleteProject: async (_: any, { _id }: any) => {
            const project = await Project.findByIdAndDelete(_id);
            return project;
        },
        // Create a new task
        createTask: async (_: any, { name, description, dueDate, projectId }: any) => {
            const task = await Task.create({ name, description, dueDate, projectId });
            return task;
        },
        // Update a task
        updateTask: async (_: any, { _id, name, description, dueDate, projectId }: any) => {
            const task = await Task.findByIdAndUpdate(_id,{ name, description, dueDate, projectId },{ new: true });
            return task;
        },
        // Delete a task
        deleteTask: async (_: any, { _id }: any) => {
            const task = await Task.findByIdAndDelete(_id);
            return task;
        },
        // Create a new budget item
        createBudgetItem: async (_: any, { name, amount, projectId }: any) => {
            const budgetItem = await BudgetItem.create({ name, amount, projectId });
            return budgetItem;
        },
        // Update a budget item
        updateBudgetItem: async (_: any, { _id, name, amount, projectId }: any) => {
            const budgetItem = await BudgetItem.findByIdAndUpdate(_id,{ name, amount, projectId },{ new: true });
            return budgetItem;
        },
        // Delete a budget item
        deleteBudgetItem: async (_: any, { _id }: any) => {
            const budgetItem = await BudgetItem.findByIdAndDelete(_id);
            return budgetItem;
        },
        // Create a new material
        createMaterial: async (_: any, { name, quantity, unit, projectId }: any) => {
            const material = await Material.create({ name, quantity, unit, projectId });
            return material;
        },
        // Update a material
        updateMaterial: async (_: any, { _id, name, quantity, unit, projectId }: any) => {
            const material = await Material.findByIdAndUpdate(_id,{ name, quantity, unit, projectId },{ new: true });
            return material;
        },
        // Delete a material
        deleteMaterial: async (_: any, { _id }: any) => {
            const material = await Material.findByIdAndDelete(_id);
            return material;
        },
        // Create a new chat log
        createChatLog: async (_: any, { message, senderId, receiverId }: any) => {
            const chatLog = await ChatLog.create({ message, senderId, receiverId });
            return chatLog;
        },
        // Update a chat log
        updateChatLog: async (_: any, { _id, message, senderId, receiverId }: any) => {
            const chatLog = await ChatLog.findByIdAndUpdate(_id,{ message, senderId, receiverId },{ new: true });
            return chatLog;
        },
        // Delete a chat log
        deleteChatLog: async (_: any, { _id }: any) => {
            const chatLog = await ChatLog.findByIdAndDelete(_id);
            return chatLog;
        },
    },
};

export default Resolvers;