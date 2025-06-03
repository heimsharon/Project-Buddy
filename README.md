# Project-Buddy 🛠️

_A full-stack project management app for DIY and construction projects, featuring a chatbot assistant, budgeting, material tracking, and more._

![Apache License](https://img.shields.io/badge/license-Apache_2.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-18%2B-brightgreen)
![React](https://img.shields.io/badge/React-18+-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)
![Student Project](https://img.shields.io/badge/student_project-group_2-yellow)

---

> **This project was developed as a group assignment for a school course.**

---

## 📚 Table of Contents

- [Project-Buddy 🛠️](#project-buddy-️)
  - [📚 Table of Contents](#-table-of-contents)
  - [📝 Description](#-description)
  - [✨ Features](#-features)
  - [🖼️ Media](#️-media)
  - [🧰 Technologies Used](#-technologies-used)
  - [⚙️ Prerequisites](#️-prerequisites)
  - [⚡ Quick Start](#-quick-start)
  - [📦 Installation](#-installation)
  - [📡 API Documentation](#-api-documentation)
  - [💡 Usage](#-usage)
  - [📄 License](#-license)
  - [📝 Notes](#-notes)
  - [🤝 Contributing, Support, and FAQ](#-contributing-support-and-faq)
  - [🛠️ How to Contribute](#️-how-to-contribute)
  - [🙏 Acknowledgments](#-acknowledgments)
  - [👥 Team](#-team)

---

## 📝 Description

**Project-Buddy** is a full-stack application designed to help users plan, budget, and manage DIY or construction projects.
It features a chatbot assistant powered by OpenAI, material and budget tracking, project checklists, and more.
Built with a TypeScript/React frontend and a Node/Express/MongoDB backend.

---

## ✨ Features

- 💬 Chatbot assistant for project questions and material pricing
- 🔑 User authentication with JWT
- 🗂️ Project creation and management
- 💰 Budget and material tracking
- ✅ Task and checklist management
- 📱 Responsive design for desktop and mobile

---

## 🖼️ Media

- **🖼️ Screenshots:**

    ![Project-Buddy Homepage](./images/homepage.png)

---

## 🧰 Technologies Used

**Frontend:**

- ⚛️ [React](https://reactjs.org/)
- 🛣️ [React Router](https://reactrouter.com/)
- ⚡ [Vite](https://vitejs.dev/)
- 🟦 [TypeScript](https://www.typescriptlang.org/)

**Backend:**

- 🟩 [Node.js](https://nodejs.org/)
- 🚂 [Express.js](https://expressjs.com/)
- 🚀 [Apollo Server](https://www.apollographql.com/docs/apollo-server/)
- 🍃 [MongoDB](https://www.mongodb.com/)
- 🧬 [Mongoose](https://mongoosejs.com/)
- 🤖 [OpenAI API](https://platform.openai.com/docs/api-reference)
- 🌱 [dotenv](https://github.com/motdotla/dotenv)
- 🔐 [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
- 🧂 [bcrypt](https://github.com/kelektiv/node.bcrypt.js)

---

## ⚙️ Prerequisites

- 🟩 [Node.js](https://nodejs.org/) (v18 or higher)
- 📦 [npm](https://www.npmjs.com/) (comes with Node.js)
- 🍃 [MongoDB](https://www.mongodb.com/) (local or cloud)
- 🐙 A GitHub account (for cloning and contributing)

---

## ⚡ Quick Start

You can get the code by either cloning this repository using Git, or downloading it as a ZIP file from GitHub (click the green "Code" button, then "Download ZIP").
On GitHub, you can also browse the code, view commit history, open issues, and submit pull requests.

---

## 📦 Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/project-buddy.git
    cd project-buddy
    ```

2. **Install dependencies for both client and server:**

    - This command will install dependencies for both the 📁 `client` and 📁 `server` folders at once.

    ```bash
    npm run install
    ```

    - Alternatively, you can install them separately:

    ```bash
    # First
    cd client
    npm install

    # Second
    cd ../server
    npm install
    ```

3. **Set up environment variables:**

    - Create a 🔐 `.env` file in the server directory;
      Be sure to use the appropriate values for your environment:

        - _**For development (local):**_

            ```env
            MONGODB_URI=your_mongodb_connection_string
            JWT_SECRET_KEY=your_development_secret
            OPENAI_API_KEY=your_openai_api_key
            NODE_ENV=development
            ```

        - _**For production (deployed):**_

            ```env
            MONGODB_URI=your_production_mongodb_connection_string
            JWT_SECRET_KEY=your_production_secret
            OPENAI_API_KEY=your_openai_api_key
            NODE_ENV=production
            ```

    > **Note:** Never commit your real 🔐`.env` file to version control. Only commit `.env.example` with placeholder values.

4. **Build the project:**

    - **For development:**
      You typically do not need to build the project; use the dev servers instead.
      Start the backend and frontend in development mode (see step 6).

    - **For production:**
      Build the frontend for production and ensure the backend is ready to serve static files.

        ```bash
        cd client
        npm run build
        cd ../server
        npm run build
        ```

5. **Seed the database (optional for local dev):**

    ```bash
    cd server
    npm run seed
    ```

6. **Start the server(s):**

    - **For development:**
      Start both the backend and frontend dev servers:

        ```bash
        # In one terminal (backend)
        cd server
        npm run dev
        ```

        ```bash
        # In another terminal (frontend)
        cd client
        npm run dev
        ```

        - The frontend will run at [http://localhost:3000](http://localhost:3000)
        - The backend will run at [http://localhost:3001](http://localhost:3001)

    - **For production:**
      Start only the backend server (it will serve the built frontend):

        ```bash
        cd server
        npm start
        ```

        - The app will be available at your production URL (e.g., `https://your-production-site.com`)

7. **Open your browser:**

    - **For development:**
      Visit [http://localhost:3000](http://localhost:3000)

    - **For production:**
      Visit your deployed site URL (e.g., `https://your-production-site.com`)

---

## 📡 API Documentation

See [API.md](./API.md) for a full list of available endpoints and usage examples.

---

## 💡 Usage

1. **Login or Sign Up:**
   Use the demo credentials (`DemoUser` / `password123`) or create a new account to log in.

2. **Create a Project:**
   Click "New Project" and enter your project details to start tracking your DIY or construction project.

3. **Add Materials and Budget Items:**
   Within your project, add materials and set budget items to keep track of costs.

4. **Manage Tasks and Checklists:**
   Add, edit, or check off tasks and checklist items to organize your workflow and monitor progress.

5. **Chatbot Assistance:**
   Use the built-in chatbot to ask questions about materials, pricing, or project planning.

6. **Edit or Delete Items:**
   Edit or remove projects, tasks, or materials as your project evolves.

7. **Logout:**
   Click the logout button in the navigation to securely end your session.

---

## 📄 License

This project is licensed under the Apache 2.0 License.

---

## 📝 Notes

- The codebase is commented for educational purposes and future reference.
- Please open issues or pull requests for improvements or bug fixes.

---

## 🤝 Contributing, Support, and FAQ

- **Contributions:** Pull requests are welcome! Please open an issue or submit a pull request for improvements or bug fixes.
- **Support:** If you encounter any issues or have suggestions, please open an issue on GitHub.
- **FAQ:**

  - _How do I run the program?_
        See the Installation and Usage sections above.
  - _Can I use this for my own project?_
        Yes, this project is Apache 2.0 licensed. See the License section.
  - _I'm having trouble connecting to the database or running the app!_

    - Double-check your `.env` file values.
    - Make sure 🍃 MongoDB is running and accessible.
    - Try running `npm install` in both 📁 [client](http://_vscodecontentref_/0) and 📁 [server](http://_vscodecontentref_/1) if you see missing module errors.
    - If you need to reset the database, you can re-run the seed command:

            ```bash
              cd server
              npm run seed
            ```

---

## 🛠️ How to Contribute

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 🙏 Acknowledgments

Portions of this project were developed using starter code provided by [edX Boot Camps LLC](https://bootcamp.edx.org/) for educational purposes.

---

## 👥 Team

Created by:

- **Anthony Langdon** — Frontend
    GitHub: [TonesTheDude](https://github.com/TonesTheDude)
- **Mark Osgood** — Frontend
    GitHub: [Osgravy](https://github.com/Osgravy)
- **Shane Anderson** — Backend
    GitHub: [Hiemdier](https://github.com/Hiemdier)
- **Leland Mitchell** — Backend/Frontend Pairing
    GitHub: [LealandMitchell](https://github.com/LealandMitchell)
- **Sharon Heim** — AI Bot/Frontend/CSS
    GitHub: [heimsharon](https://github.com/heimsharon)

---

© 2025 Project-Buddy Group
