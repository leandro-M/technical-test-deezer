# Technical Test - Deezer

Welcome to the **Technical Test - Deezer** project. This application is designed as part of a technical evaluation process, showcasing advanced skills in frontend development, clean architecture, and software engineering best practices. The project leverages modern tools and frameworks to provide a robust and scalable solution.

---

## **Table of Contents**

1. [Overview](#overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Setup Instructions](#setup-instructions)
5. [Scripts](#scripts)
6. [GitHub Actions Workflow](#github-actions-workflow)
7. [Testing and Coverage](#testing-and-coverage)
8. [Environment Variables](#environment-variables)
9. [Contact](#contact)

---

## **Overview**

The **Technical Test - Deezer** application interacts with the Deezer API to showcase:

- Listing music data with filters and pagination.
- Managing favorites via context and hooks.
- Routing for different pages and components with `react-router-dom`.
- Implementation of clean architecture principles for scalability and maintainability.

The project is built with **TypeScript** to ensure type safety and **React** for dynamic UI rendering, and it demonstrates an understanding of best practices such as testing, linting, and deployment automation.

---

## **Tech Stack**

The following technologies and tools are used in this project:

### **Frontend**

- **React**: Component-based UI library.
- **Chakra UI**: For accessible and customizable UI components.
- **TypeScript**: Static typing for JavaScript.
- **Vite**: Modern, fast build tool for development and production builds.
- **Axios**: Promise-based HTTP client for API integration.
- **Framer Motion**: Animation library for React.

### **Testing**

- **Jest**: Unit testing framework.
- **@testing-library/react**: Testing utilities for React components.
- **@testing-library/user-event**: Simulates user interactions.

### **Code Quality**

- **ESLint**: Enforces consistent code standards.
- **Prettier**: Ensures code formatting consistency.
- **Husky**: Manages Git hooks for pre-commit checks.
- **Lint-staged**: Runs linters on staged Git files.

### **CI/CD**

- **GitHub Actions**: Automated testing and deployment.
- **Peaceiris GitHub Pages Action**: Deploys the application to GitHub Pages.

---

## **Project Structure**

The project follows a modular and scalable structure with clean separation of concerns:

```
technical-test-deezer/
├── src/
│   ├── application/        # UI and routing
│   │   ├── components/     # Reusable UI components
│   │   ├── layout/         # Application layout components
│   │   ├── pages/          # Individual pages (e.g., Home, Favorites)
│   │   └── routes/         # Routing logic
│   ├── domain/             # Core business logic
│   │   ├── entities/       # Domain entities
│   │   ├── repositories/   # Interfaces for data sources
│   │   └── usecases/       # Business use cases
│   ├── infra/              # Infrastructure implementations
│   │   └── services/       # API service implementations
│   ├── shared/             # Shared utilities and hooks
│   │   ├── context/        # React contexts
│   │   └── hooks/          # Custom React hooks
│   ├── main.tsx            # Entry point
│   └── setupTests.ts       # Jest configuration
├── public/                 # Static assets
├── .env                    # Environment variables
├── index.html              # HTML entry point
├── package.json            # Project metadata and dependencies
└── README.md               # Project documentation
```

---

## **Setup Instructions**

### **Prerequisites**

- Node.js (v18 or higher)
- npm (v8 or higher)

### **Installation**

1. Clone the repository:

   ```bash
   git clone https://github.com/leandro-M/technical-test-deezer.git
   cd technical-test-deezer
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the project root and add the following variables:

   ```env
   VITE_API_BASE_URL="/api"
   VITE_APP_BASE_NAME="/"
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Build the production version:
   ```bash
   npm run build
   ```

---

## **Scripts**

The following npm scripts are available:

| Script                  | Description                                                      |
| ----------------------- | ---------------------------------------------------------------- |
| `npm run dev`           | Starts the development server.                                   |
| `npm run build`         | Builds the application for production.                           |
| `npm run build:ghpages` | Builds the application specifically for GitHub Pages deployment. |
| `npm run preview`       | Previews the production build locally.                           |
| `npm run lint`          | Runs ESLint to check for code quality issues.                    |
| `npm run lint:fix`      | Automatically fixes ESLint issues where possible.                |
| `npm run test`          | Runs all unit tests.                                             |
| `npm run test:watch`    | Runs tests in watch mode.                                        |
| `npm run test:coverage` | Generates a test coverage report.                                |

---

## **GitHub Actions Workflow**

The CI/CD pipeline is defined in `.github/workflows/test-and-deploy.yml`. It automates the following tasks:

1. **Run tests** to ensure functionality and maintain code coverage above 90%.
2. **Lint the code** for quality assurance.
3. **Build the application** for production.
4. **Deploy the application** to GitHub Pages if all checks pass.

---

## **Testing and Coverage**

### **Run Tests**

```bash
npm run test
```

### **View Coverage Report**

Run the following command to generate the coverage report:

```bash
npm run test:coverage
```

The report is generated in the `coverage` directory. Ensure overall coverage is above 90%.

---

## **Environment Variables**

All environment-specific variables are stored in `.env` files and should follow the `VITE_` prefix for accessibility within the Vite project. Example:

```env
VITE_API_BASE_URL="/api"
VITE_APP_BASE_NAME="/"
```

**Note:** Sensitive keys should be managed using GitHub Actions secrets in CI/CD workflows.

---

## **Deployment**

The project is deployed to GitHub Pages. After the successful completion of tests and build in the GitHub Actions pipeline, the application is published to:

```
https://leandro-M.github.io/technical-test-deezer/
```

---

## **Contact**

For any questions or feedback, feel free to contact:

- **Author:** Leandro Medeiros
- **Email:** dev.leandromedeiros@gmail.com
- **GitHub:** [https://github.com/leandro-M](https://github.com/leandro-M)
