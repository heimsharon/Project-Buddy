import React from 'react';
import { useRouteError, useNavigate } from 'react-router-dom';
import '../assets/styles/errorpage.css';

// Interface for route error object
interface RouteError {
    status?: number;
    statusText?: string;
    message?: string;
}

// Map of error codes to their display info
const errorInfo: Record<number,

    {
        title: string;
        message: string;
        emoji: string
    }

> = {
    400: {
        title: '400 - Bad Request',
        message: 'The server could not understand your request.',
        emoji: '❌',
    },
    401: {
        title: '401 - Unauthorized',
        message: 'You are not authorized to view this page.',
        emoji: '🔒',
    },
    403: {
        title: '403 - Forbidden',
        message: 'Access to this page is forbidden.',
        emoji: '⛔',
    },
    404: {
        title: '404 - Page Not Found',
        message: 'Sorry, the page you are looking for does not exist.',
        emoji: '🔍',
    },
    408: {
        title: '408 - Request Timeout',
        message: 'The request timed out. Please try again.',
        emoji: '⌛',
    },
    409: {
        title: '409 - Conflict',
        message: 'There was a conflict with your request.',
        emoji: '⚠️',
    },
    410: {
        title: '410 - Gone',
        message: 'The resource you are looking for is no longer available.',
        emoji: '🗑️',
    },
    413: {
        title: '413 - Payload Too Large',
        message: 'The request is too large for the server to process.',
        emoji: '📦',
    },
    415: {
        title: '415 - Unsupported Media Type',
        message: 'The server cannot process the media type of the request.',
        emoji: '🗂️',
    },
    422: {
        title: '422 - Unprocessable Entity',
        message: 'The request was well-formed but could not be processed.',
        emoji: '❓',
    },
    429: {
        title: '429 - Too Many Requests',
        message: 'You have made too many requests. Please slow down.',
        emoji: '🚦',
    },
    500: {
        title: '500 - Internal Server Error',
        message: 'A server error occurred. Please try again later.',
        emoji: '💥',
    },
    503: {
        title: '503 - Service Unavailable',
        message: 'The server is currently unavailable. Please try again later.',
        emoji: '🛠️',
    },
    504: {
        title: '504 - Gateway Timeout',
        message: 'The server did not respond in time. Please try again.',
        emoji: '⏳',
    },
    511: {
        title: '511 - Network Authentication Required',
        message: 'Network authentication is required to access this resource.',
        emoji: '🌐',
    },
};

// ErrorPage component: handles all route and rendering errors in the application
export default function ErrorPage() {
    // Use useRouteError to get the error object from the current route
    const error = useRouteError() as RouteError;
    // Use useNavigate to programmatically navigate within the app
    const navigate = useNavigate();

    // Get error info from the map, or use a default
    const info =
        error?.status && errorInfo[error.status]
            ? errorInfo[error.status] :

            {
                title: 'Oops! Something went wrong.',
                message: 'Sorry, an unexpected error has occurred.',
                emoji: '😕',
            };

    return (
        // Render the error page with appropriate messages and a button to navigate back home
        <div id="error-page">

            {/*Display error emoji, title, and message */}
            <span className="error-emoji"
                role="img"
                aria-label="error emoji">
                {info.emoji}
            </span>

            <h1>{info.title}</h1>
            <p>{info.message}</p>

            {/* Display error details if available */}
            <div className="error-details">
                <i>{error?.statusText || error?.message || 'Unknown error'}</i>
            </div>
            {/* Button to navigate back to the home page */}
            <button className="back-home-btn" onClick={() => navigate('/')}>
                Back to Home
            </button>
        </div>
    );
}
