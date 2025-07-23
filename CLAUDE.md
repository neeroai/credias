# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Project Name**: CrediAS Website  
**Purpose**: Landing page for CrediAS credit platform, built following the B-MAD Method (Build, Measure, Analyze, Deploy)  
**Target Audience**: End users seeking credit services and developers maintaining the platform

---

## To-Do Conventions

- **SEQUENTIAL**: true  
- **AUTOMARK**: false  

---

## Mandatory Workflow Requirements (MUST)

1. **ALWAYS create ACTION_PLAN.md before coding complex tasks**
2. **Get human approval before implementation**
3. **Break large tasks into checkboxes in the plan file**
4. **Update progress in the plan file as you work**
5. **Use TodoWrite tool to track task progress**

---

## Standard Workflow

1. **Planning Phase**: 
   - Think through the problem thoroughly
   - Read the codebase for relevant files and patterns
   - Write a detailed plan to ACTION_PLAN.md with checkboxes
   
2. **Approval Phase**: 
   - Present the plan to the human
   - Wait for explicit approval before proceeding
   - Clarify any questions or concerns
   
3. **Implementation Phase**: 
   - Work on todo items sequentially
   - Mark tasks as complete only when fully done
   - Provide high-level explanations of changes made
   
4. **Quality Assurance**: 
   - Keep every change as simple as possible
   - Minimize code impact - prefer small, focused changes
   - Run tests and linting after each change
   
5. **Documentation**: 
   - Add a review section to ACTION_PLAN.md
   - Summarize changes made and lessons learned

### B-MAD Method Integration

The project follows the B-MAD Method within the standard workflow:
- **BUILD**: Setup and configuration (Planning Phase)
- **MEASURE**: Design extraction from Figma (Planning/Approval Phase)
- **ANALYZE**: Component implementation (Implementation Phase)
- **DEPLOY**: Production deployment (Quality Assurance Phase)

---

## Testing Standards (MUST)

- **Write failing tests first (TDD)**
- **Confirm test failures before implementation**
- **Implement only to make tests pass**
- **Never modify test files during implementation**
- **Run tests after each change**

---

## Technology Stack

**Framework**: React 18.3.1  
**Language**: TypeScript 5.x  
**Database**: N/A (Landing page only)  
**Styling**: Tailwind CSS v3 with PostCSS + shadcn/ui  
**UI Library**: shadcn/ui (New York style)  
**Testing**: Vitest + Testing Library  
**Build Tools**: Vite  
**Validation**: Zod + React Hook Form

---

## Project Structure

```
credias-website/
├── src/
│   ├── components/     # Reusable UI components
│   │   ├── ui/        # shadcn/ui base components (Button, Card, Input, etc.)
│   │   ├── layout/    # Layout and navigation components
│   │   └── sections/  # Page sections (Hero, Features, etc.)
│   ├── lib/           # Utility functions (cn helper, etc.)
│   ├── hooks/         # Custom React hooks
│   ├── styles/        # Global styles and CSS variables
│   ├── utils/         # General utility functions
│   ├── types/         # TypeScript type definitions
│   ├── App.tsx        # Main app component
│   └── main.tsx       # Application entry point
├── public/            # Static assets
├── components.json    # shadcn/ui configuration
├── tailwind.config.js # Tailwind + shadcn/ui configuration
├── postcss.config.js  # PostCSS configuration
├── package.json       # Dependencies and scripts
├── tsconfig.json      # TypeScript configuration with path aliases
└── vite.config.ts     # Vite configuration
```

---

## shadcn/ui Standards

### Component Architecture
- **Base Components**: Use shadcn/ui components from `@/components/ui/`
- **Composition Pattern**: Build complex components by composing shadcn/ui primitives
- **Customization**: Extend via className prop, avoid modifying source files
- **Accessibility**: All shadcn/ui components include WCAG 2.1 AA compliance

### Component Usage Guidelines

#### Preferred Components for Common Use Cases
```typescript
// Buttons
import { Button } from "@/components/ui/button"
<Button variant="default" size="lg">Primary Action</Button>
<Button variant="outline" size="md">Secondary</Button>
<Button variant="ghost" size="sm">Tertiary</Button>

// Cards & Layout
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
<Card>
  <CardHeader>
    <CardTitle>Section Title</CardTitle>
  </CardHeader>
  <CardContent>Content here</CardContent>
</Card>

// Forms
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" placeholder="Enter email" />
  <Button type="submit">Submit</Button>
</div>

// Navigation
import { NavigationMenu } from "@/components/ui/navigation-menu"
// Use for main navigation and complex menus

// Dialogs & Modals
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
```

### Installation Commands
```bash
# Install new components as needed
npx shadcn@latest add [component-name]

# Example installations
npx shadcn@latest add badge
npx shadcn@latest add alert
npx shadcn@latest add table
npx shadcn@latest add tabs
npx shadcn@latest add toast
```

### Color System Integration
- **Primary**: Uses brand purple (`--primary: 235 48% 37%`)
- **Secondary**: Uses brand pink (`--secondary: 342 82% 44%`)
- **Accent**: Uses brand yellow (`--accent: 48 100% 60%`)
- **Brand Colors**: Available as `brand-purple-500`, `brand-pink-500`, `brand-yellow-500`

### Component Composition Patterns
```typescript
// DO: Compose components using shadcn/ui primitives
const FeatureCard = ({ title, description }: Props) => (
  <Card className="h-full">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Icon className="h-5 w-5 text-primary" />
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
)

// DON'T: Create custom components from scratch when shadcn/ui exists
```

---

## Development Commands

```bash
# Installation
npm install              # Install dependencies

# Development
npm run dev              # Start development server (port 5173)
npm run build            # Build for production
npm run preview          # Preview production build

# Quality Assurance
npm run test             # Run all tests with Vitest
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Run tests with coverage report
npm run lint             # Run ESLint
npm run lint:fix         # Run ESLint with auto-fix
npm run typecheck        # Run TypeScript compiler check
npm run format           # Format code with Prettier
npm run format:check     # Check code formatting

# shadcn/ui Components
npx shadcn@latest add [component]  # Add new shadcn/ui components
npx shadcn@latest add button card input  # Add multiple components
```

---

## Productivity Shortcuts

### QNEW
When I type "qnew", this means:
```
Understand all BEST PRACTICES listed in CLAUDE.md.
Your code SHOULD ALWAYS follow these best practices.
Review the project structure, coding standards, and quality requirements.
```

### QPLAN
When I type "qplan", this means:
```
Analyze similar parts of the codebase and determine whether your plan:
- Is consistent with rest of codebase
- Introduces minimal changes
- Reuses existing code and patterns
- Follows established architectural decisions
```

### QCODE
When I type "qcode", this means:
```
Implement your plan and make sure your new tests pass.
Always run tests to make sure you didn't break anything else.
Always run prettier/linting on newly created files.
Follow TDD: write failing tests first, then implement.
```

### QCHECK
When I type "qcheck", this means:
```
You are a SKEPTICAL senior software engineer.
Perform code quality analysis for every MAJOR change:
1. Function Quality Checklist
2. Testing Best Practices Checklist  
3. Implementation Best Practices
Look for potential issues, edge cases, and improvements.
```

### QGIT
When I type "qgit", this means:
```
Add all changes to staging, create a commit, and push to remote.
Use conventional commits format.
Never refer to Claude or Anthropic in commit messages.
Follow this pattern: <type>[scope]: <description>
```

---

## Code Quality Standards

### Function Quality Checklist

1. **Readability**: Can you HONESTLY easily follow what it's doing?
2. **Complexity**: Does it have high cyclomatic complexity (many nested if-else)?
3. **Data Structures**: Are there better algorithms/data structures available?
4. **Parameters**: Any unused parameters or unnecessary type casts?
5. **Testability**: Is it easily testable without heavy mocking?
6. **Dependencies**: Any hidden dependencies that could be arguments?
7. **Naming**: Is the name consistent with codebase vocabulary?
8. **Reuse**: Should this be extracted only if reused or improves testability significantly?

### Testing Best Practices Checklist

1. **Parameterize inputs** - never embed unexplained literals
2. **Real defects** - test must be able to fail for actual bugs
3. **Clear descriptions** - test name states exactly what the final expect verifies
4. **Independent expectations** - compare to pre-computed values, not function output
5. **Strong assertions** - use `toBe(1)` instead of `toBeGreaterThanOrEqual(1)`
6. **Edge cases** - test boundaries, realistic input, unexpected input
7. **Type safety** - don't test conditions caught by type checker
8. **Structure testing** - test entire structure in one assertion when possible

### Implementation Best Practices

**MUST Rules**:
- Follow TDD: scaffold stub → write failing test → implement
- Name functions with existing domain vocabulary
- Colocate unit tests in `*.spec.ts` files
- Ensure linting and type checking pass
- Use shadcn/ui components instead of custom UI components
- Import from `@/components/ui/` for all base components

**SHOULD Rules**:
- Prefer simple, composable, testable functions
- Use shadcn/ui + Tailwind CSS utilities, avoid custom CSS
- Follow React best practices with TypeScript
- Maintain component reusability
- Use `cn()` utility for conditional classes
- Leverage Zod + React Hook Form for form validation

**shadcn/ui Specific Rules**:
- Always use shadcn/ui components as building blocks
- Extend components via `className` prop, never modify source
- Use semantic color tokens (`primary`, `secondary`, `muted`, etc.)
- Follow shadcn/ui composition patterns for complex components

---

## Figma Design Integration

**Design URL**: https://www.figma.com/design/AWFBI9O2rG27A5Cr6qSHKu/CrediAS?node-id=2274-12564&m=dev
- **File Key**: AWFBI9O2rG27A5Cr6qSHKu
- **FIGMA_ACCESS_TOKEN**: [Configure with your Figma token]

### Design Extraction Process
1. Analyze Figma design for components and sections
2. Extract design tokens (colors, spacing, typography)
3. Map components to React component structure
4. Implement with Tailwind CSS utilities matching design

---

## Project-Specific Requirements

### Current State Awareness
The project is currently in a **reset state**. All implementation files have been deleted. Only documentation remains:
- README.md - Project documentation
- CLAUDE-ref.md - CLAUDE.md reference template
- CrediAS.fig - Figma design file
- This CLAUDE.md file

### Performance Requirements
- **Lighthouse Score**: > 90 for all metrics
- **Load Time**: < 3 seconds on 3G connections
- **First Contentful Paint**: < 1.5 seconds
- **Time to Interactive**: < 3.5 seconds

### Accessibility Requirements
- **WCAG 2.1 AA** compliance mandatory
- All interactive elements must be keyboard accessible
- Proper ARIA labels for screen readers
- Color contrast ratios must meet AA standards

### SEO Requirements
- Proper meta tags for all pages
- Schema markup for business information
- Open Graph tags for social sharing
- Semantic HTML structure

### Browser Support
- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Android)

---

## Do NOT (Firm Guardrails)

### Code Safety
- **Never commit secrets or keys to repository**
- **Never use `any` type in TypeScript - all types must be explicit**
- **Never modify test files during implementation phase**
- **Never skip TDD process - tests first, always**
- **Never assume libraries are available - check package.json first**

### Development Practices  
- **Never create files unless absolutely necessary**
- **Never add comments unless explicitly requested**
- **Never break existing functionality without discussion**
- **Never introduce new dependencies without approval**
- **Never commit directly to main branch**

### React/TypeScript Specific
- **Never use class components - functional components only**
- **Never use inline styles - shadcn/ui + Tailwind utilities only**
- **Never ignore TypeScript errors**
- **Never use document/window without proper checks**
- **Never create components without proper TypeScript interfaces**

### shadcn/ui Specific
- **Never modify shadcn/ui component source files directly**
- **Never create custom UI components when shadcn/ui equivalents exist**
- **Never use hardcoded colors - use semantic tokens or brand classes**
- **Never skip accessibility features provided by shadcn/ui**
- **Never import components without using proper path aliases (@/components/ui/)**

---

## Context Management Guidelines

### Token Economy
- Keep CLAUDE.md additions minimal and high-value
- Use bullet points for efficiency
- Reference external docs for detailed information
- Focus on CrediAS-specific requirements

### Memory Management
- Use ACTION_PLAN.md as persistent memory
- Document important decisions in appropriate files
- Keep conversation focused on single features

---

## Version Control Standards

### Commit Message Format
```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Types**: feat, fix, docs, style, refactor, test, chore

**Examples**:
- `feat(components): add Hero section with CTA`
- `fix(tailwind): resolve responsive breakpoint issue`
- `docs(readme): update development setup instructions`

---

## Notes and References

### Node Requirements
- Node.js v20.17.0+
- npm v10.8.2+

### Important Links
- [Figma Design](https://www.figma.com/design/AWFBI9O2rG27A5Cr6qSHKu/CrediAS?node-id=2274-12564&m=dev)
- [B-MAD Method Documentation](implementation-plan.md)
- [Project README](README.md)

Last updated: 2025-07-23 (Added shadcn/ui integration)