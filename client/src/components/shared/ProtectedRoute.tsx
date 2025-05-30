import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
// import AuthService from '../../utils/auth'; //

// Utility function to check for a valid JWT token in localStorage
function isAuthenticated(): boolean {
    const token = localStorage.getItem('id_token');
    // If using AuthService, use: return AuthService.loggedIn();
    return !!token;
}

/**
 * ProtectedRoute
 *
 * Wrap this component around any routes to protect in router config.

 * If the user is not authenticated, they will be redirected to the login page.

 * Example if want to use:
 *
 * import ProtectedRoute from './components/shared/ProtectedRoute';
 *
 * const router = createBrowserRouter([
 *
 *      Some of the routes/pages that would be open to everyone:
 *    {
 *      path: '/',
 *      element: <App />,
 *      children: [
 *
 *       { index: true, element: <HomePage /> },
 *       { path: '/login', element: <Login /> },
 *       { path: '/signup', element: <Signup /> },
 *
 *        These would be some of the protected routes, requiring    authentication:
*
 *    {
 *      element: <ProtectedRoute />,
 *      children:[
 *
 *       { path: '/profile', element: <Profile /> },
 *       { path: '/projects', element: <Projects /> },
 *       { path: '/tasks', element: <Tasks /> },
 *       { path: '/budget', element: <BudgetPage /> },
 *       { path: '/materials', element: <MaterialsPage /> }, *
 *         ],
 *      },
 *     ],
 *   },
 * ]);
 */

const ProtectedRoute: React.FC = () => {
    return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
