# AWS SAA-C03 Exam Practice UI

A React-based application for practicing AWS Solutions Architect Associate (SAA-C03) certification exams. Features multiple exam sets, optional timers, question navigation, and detailed result reviews.

## Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)

## Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd aws-exam-ui
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the App

To start the development server:

```bash
npm start
```

This will open the app in your browser at [http://localhost:3000](http://localhost:3000). The page will reload automatically when you make changes.

## Building for Production

To build the app for production:

```bash
npm run build
```

This creates an optimized build in the `build` folder, ready for deployment.

## Deploying to GitHub Pages

1. Ensure your repository is set up on GitHub.

2. Update the `homepage` field in `package.json` to match your GitHub repository:
   ```json
   "homepage": "https://<your-username>.github.io/<your-repo-name>"
   ```

3. Deploy to GitHub Pages:
   ```bash
   npm run deploy
   ```

   This will build the app and push the `build` folder to the `gh-pages` branch of your repository. Your app will be available at the URL specified in the `homepage` field.

## Features

- Multiple exam sets (e.g., SAA-C03 Practice Set 1, Set 2)
- Optional time limits for exams
- Question navigation (next/previous)
- End exam early or automatically on completion
- Result review with correct answers and explanations
- Responsive design

## Built With

- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [Create React App](https://create-react-app.dev/) - Build setup
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- [gh-pages](https://www.npmjs.com/package/gh-pages) - Deployment to GitHub Pages

## License

This project is licensed under the MIT License.
