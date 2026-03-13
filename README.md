# LKK Web Frontend

A modern React application built with Vite, Tailwind CSS, and best practices for scalable frontend development.

## Features

- **React 19** - Latest version of React for building user interfaces
- **Vite** - Fast build tool with Hot Module Replacement (HMR)
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **Path Aliases** - Clean imports using `@` prefix for better code organization
- **ESLint** - Code quality and consistency checking
- **Prettier** - Automatic code formatting
- **Husky + lint-staged** - Pre-commit hooks for code quality
- **Component Library** - Pre-built UI components (Button, Card, Input, etc.)
- **Responsive Layouts** - Mobile-first responsive design system

## Project Structure

```
src/
├── components/
│   ├── ui/           # Reusable UI components
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Input.jsx
│   │   └── index.js
│   └── common/       # Common components
│       ├── Header.jsx
│       ├── Footer.jsx
│       └── index.js
├── layouts/          # Layout components
│   ├── MainLayout.jsx
│   ├── Container.jsx
│   └── index.js
├── pages/            # Page components
│   ├── Home.jsx
│   ├── About.jsx
│   ├── Contact.jsx
│   └── index.js
├── hooks/            # Custom React hooks
├── utils/            # Utility functions
│   ├── cn.js
│   ├── constants.js
│   └── index.js
├── services/         # API services
├── assets/           # Static assets
│   ├── images/
│   └── icons/
├── App.jsx           # Root component
├── main.jsx          # Application entry point
└── index.css         # Global styles with Tailwind directives
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm, yarn, or pnpm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/ThaoNguyen151/LKK_Web_FE.git
cd LKK_Web_FE
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality
- `npm run lint:fix` - Fix ESLint errors automatically
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check if code is formatted correctly

## Path Aliases

The project is configured with path aliases for cleaner imports:

```javascript
// Instead of this:
import { Button } from '../../../components/ui/Button'

// You can use this:
import { Button } from '@components/ui'
```

Available aliases:

- `@/` → `src/`
- `@components/` → `src/components/`
- `@pages/` → `src/pages/`
- `@layouts/` → `src/layouts/`
- `@hooks/` → `src/hooks/`
- `@utils/` → `src/utils/`
- `@assets/` → `src/assets/`
- `@services/` → `src/services/`

## UI Components

The project includes a set of reusable UI components styled with Tailwind CSS:

### Button

```jsx
import { Button } from '@components/ui'

<Button variant="primary" size="md">Click me</Button>
<Button variant="outline">Outlined</Button>
<Button variant="ghost">Ghost</Button>
```

### Card

```jsx
import { Card, CardHeader, CardTitle, CardContent } from '@components/ui'
;<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>Card content goes here</CardContent>
</Card>
```

### Input

```jsx
import { FormField, Input } from '@components/ui'
;<FormField label="Email" error={errors.email}>
  <Input type="email" placeholder="your@email.com" />
</FormField>
```

## Code Quality

### Pre-commit Hooks

This project uses Husky and lint-staged to run code quality checks before commits:

- ESLint checks and auto-fixes JavaScript/JSX files
- Prettier formats all supported files
- Only staged files are checked (fast!)

### ESLint Rules

The project uses a custom ESLint configuration with:

- React recommended rules
- React Hooks rules
- React Refresh for Vite HMR
- Custom rules for code quality

### Prettier Configuration

Code formatting is enforced with Prettier:

- Single quotes for JavaScript
- No semicolons
- 2 space indentation
- 80 character line width

## Tailwind CSS

Tailwind CSS is configured with:

- Custom color palette (primary colors)
- Custom font family (Inter)
- Dark mode support (via class strategy)
- Responsive breakpoints

To customize Tailwind, edit `tailwind.config.js`.

## Environment Variables

Create a `.env` file in the root directory for environment-specific variables:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

Access them in your code:

```javascript
const apiUrl = import.meta.env.VITE_API_BASE_URL
```

## Building for Production

1. Create a production build:

```bash
npm run build
```

2. Preview the production build:

```bash
npm run preview
```

The build output will be in the `dist/` directory.

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Ensure all tests pass and code is formatted
4. Submit a pull request

## License

This project is private and proprietary.

## Support

For issues and questions, please open an issue on the GitHub repository.
