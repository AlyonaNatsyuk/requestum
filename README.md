# Requestum E2E

This is a test project for demonstration purposes.

## Installation and Setup

### 1. Clone Repository

```bash
git clone git@github.com:AlyonaNatsyuk/requestum.git
cd requestum
```

### 2. Install Dependencies

Install the required packages in the following order:

#### Core testing dependencies:
```bash
npm install @playwright/test
```

#### TypeScript types:
```bash
npm install --save-dev @types/axios
npm install --save-dev @types/node
```

#### Playwright and additional tools:
```bash
npm install --save-dev playwright
npm install --save-dev ts-node
npm install --save-dev typescript
```

### 3. Alternative Installation Method

You can also install all dependencies at once:

```bash
npm install
```

This will install all packages listed in `package.json`:

```json
“devDependencies”: {
    "@playwright/test": "^1.54.2",
    "@types/axios": "^0.9.36",
    "@types/node": "^24.2.1",
    "playwright": "^1.54.2",
    "ts-node": "^10.9.2",
    "typescript": "^5.9.2"
}
```

### 4. Playwright Setup

After installation, run the command to install browsers:

```bash
npx playwright install
```

### 5. Verify Installation

Check if everything is installed correctly:

```bash
npm test
```

## System Requirements

- Node.js version 16 or higher
- npm or yarn
- Git

## Project Structure

```
requestum/
├── node_modules/
├── playwright-report/
├── test-results/
├── tests/
│   ├── blogPage.test.ts
│   ├── casesPage.test.ts
│   ├── homePage.test.ts
│   └── technologiesPage.test.ts
├── utils/
│   └── data/
│       └── constants.ts
├── .gitignore
├── config.
├── LICENSE
├── package-lock.json
├── package.json
├── playwright.config.ts
├── README.md
└── tsconfig.json
```

## Running Tests

```bash
# Run all tests
npm test

# Run in UI mode
npx playwright test --ui

# Run specific test
npx playwright test example.spec.ts
```

## Useful Commands

```bash
# Generate report
npx playwright show-report

# IDE setup
npx playwright codegen
```