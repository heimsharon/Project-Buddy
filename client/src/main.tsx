import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './assets/styles/index.css';

import App from './App';
import HomePage from './pages/Homepage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import AccountPage from './pages/AccountManagementPage';
import ErrorPage from './pages/ErrorPage';
import CalculatorPage from './pages/CalculatorPage';
import CreateProjectPage from './pages/CreateProjectPage';
import BudgetPage from './pages/BudgetPage';
import ListProjectsPage from './pages/ListProjectsPage';
import CreateTasksPage from './pages/CreateTasksPage';
import ListTasksPage from './pages/ListTasksPage';
import ListMaterialsPage from './pages/ListMaterialsPage';
import ChatbotPage from './pages/ChatbotPage';
import React from 'react';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <HomePage /> },
            { path: '/login', element: <Login /> },
            { path: '/signup', element: <Signup /> },
            { path: '/accountpage', element: <AccountPage /> },
            { path: '/calculatorpage', element: <CalculatorPage /> },
            { path: '/createprojectpage', element: <CreateProjectPage /> },
            { path: '/budgetpage', element: <BudgetPage /> },
            { path: '/listprojectspage', element: <ListProjectsPage /> },
            { path: '/createtaskspage', element: <CreateTasksPage /> },
            { path: '/listtaskspage', element: <ListTasksPage /> },
            { path: '/listmaterialspage', element: <ListMaterialsPage /> },
            { path: '/chatbotpage', element: <ChatbotPage /> },
        ],
    },
]);

const rootElement = document.getElementById('root');
if (rootElement) {
    ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
