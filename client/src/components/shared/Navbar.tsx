import '../../assets/styles/navbar.css';
import React from 'react';
import { NavLink } from 'react-router-dom';
import SingleLevelDropdownMenu from './SingleLevelDropdownMenu';
import {
    FaTasks,
    FaProjectDiagram,
    FaCalculator,
    FaComments,
    FaBoxes,
    FaMoneyBillWave,
    FaUser,
    FaLifeRing,
} from 'react-icons/fa';

export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="nav-menus">
                <NavLink to="/" className="nav-home">
                    Home
                </NavLink>
                <SingleLevelDropdownMenu
                    buttonLabel="Projects"
                    items={[
                        {
                            title: 'Create Project',
                            url: '/createprojectpage',
                            icon: <FaProjectDiagram />,
                        },
                        {
                            title: 'Projects List',
                            url: '/listprojectspage',
                            icon: <FaProjectDiagram />,
                        },
                    ]}
                />
                <SingleLevelDropdownMenu
                    buttonLabel="Tasks"
                    items={[
                        {
                            title: 'Create Tasks',
                            url: '/createtaskspage',
                            icon: <FaTasks />,
                        },
                        {
                            title: 'List Tasks',
                            url: '/listtaskspage',
                            icon: <FaTasks />,
                        },
                    ]}
                />
                <SingleLevelDropdownMenu
                    buttonLabel="Budget"
                    items={[
                        {
                            title: 'View Budget',
                            url: '/budgetpage',
                            icon: <FaMoneyBillWave />,
                        },
                        {
                            title: 'List Materials',
                            url: '/listmaterialspage',
                            icon: <FaBoxes />,
                        },
                    ]}
                />
                <SingleLevelDropdownMenu
                    buttonLabel="Tools"
                    items={[
                        {
                            title: 'Calculator',
                            url: '/calculatorpage',
                            icon: <FaCalculator />,
                        },
                        {
                            title: 'Project Buddy AI',
                            url: '/chatbotpage',
                            icon: <FaComments />,
                        },
                    ]}
                />

                <SingleLevelDropdownMenu
                    buttonLabel="Account"
                    items={[
                        {
                            title: 'Profile',
                            url: '/accountpage',
                            icon: <FaUser />,
                        },
                        {
                            title: 'Support',
                            url: '/supportpage',
                            icon: <FaLifeRing />,
                        },

                    ]}
                />




            </div>
        </nav>
    );
}
