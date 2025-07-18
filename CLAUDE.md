# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Project Name**: CrediAS (Credit Assessment System)  
**Purpose**: A comprehensive credit assessment platform leveraging AI-driven development methodologies and BMad Method framework for robust, scalable credit evaluation and risk management solutions.  
**Target Audience**: Financial institutions, credit agencies, fintech companies, and developers building credit assessment tools.

---

## To-Do Conventions

- **SEQUENTIAL**: true  
  <!-- Tasks must be completed in order - next task begins only after previous one is explicitly marked complete -->

- **AUTOMARK**: false  
  <!-- Tasks are marked complete only when explicitly instructed by user -->

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
   - Use BMad agents for specialized planning (`/analyst`, `/pm`, `/architect`)
   - Read codebase for relevant patterns and existing implementations
   - Create detailed ACTION_PLAN.md with checkboxes for complex tasks
   
2. **Approval Phase**: 
   - Present plan to human for review
   - Wait for explicit approval before proceeding
   - Address any questions or concerns
   
3. **Implementation Phase**: 
   - Work on todo items sequentially using BMad Method
   - Use `/dev` agent for TDD-based implementation
   - Use `/qa` agent for code review and quality assurance
   - Mark tasks complete only when fully done
   
4. **Quality Assurance**: 
   - Run tests after each change
   - Use linting and type checking
   - Follow BMad quality standards
   
5. **Documentation**: 
   - Update stories and documentation
   - Add review section to ACTION_PLAN.md
   - Use `/sm` agent for story management

---

## Testing Standards (MUST)

- **Write failing tests first (TDD)** - BMad Method core principle
- **Confirm test failures before implementation**
- **Implement only to make tests pass**
- **Never modify test files during implementation**
- **Run tests after each change**
- **Use `/qa` agent for comprehensive testing validation**

---

## Technology Stack

**Framework**: Next.js 15 with App Router
**Language**: TypeScript
**Styling**: Tailwind CSS 4
**UI Components**: shadcn/ui
**Icons**: Lucide React
**Utilities**: clsx, tailwind-merge
**Font**: Inter (Google Fonts)
**Deployment**: AWS (S3 + CloudFront)
**AI Framework**: BMad Method v4.30.2 with specialized agents  
**Design System**: Figma - [CrediAS Design System](https://www.figma.com/design/lXKZe15q21LAnhgKfvO4uN/CrediAS?node-id=2002-6913&t=JUxpHNQAbfawUrZr-1)  
**Testing**: TDD approach with agent-driven validation

---

## BMad Method Integration

### Available Agents
- `/analyst` - **Mary** 📊 - Market research, competitive analysis, requirements gathering
- `/pm` - **John** 📋 - Product management, PRD creation, strategy planning
- `/architect` - **Winston** 🏗️ - System architecture, technical design, scalability planning
- `/dev` - **James** 💻 - Full-stack development, TDD implementation, debugging
- `/qa` - **Quinn** 🧪 - Code review, testing validation, quality assurance
- `/sm` - **Bob** 🏃 - Story creation, epic management, agile processes
- `/ux-expert` - **Sally** 🎨 - UI/UX design, user experience optimization
- `/po` - **Sarah** 📝 - Product ownership, backlog management, acceptance criteria
- `/bmad-orchestrator` - **Team Coordinator** 🎭 - Multi-agent workflows, coordination
- `/bmad-master` - **Universal Expert** 🧙 - Comprehensive expertise across domains

### BMad Workflow Integration
1. **Planning Phase**: Use `/analyst` → `/pm` → `/architect` → `/ux-expert`
2. **Development Phase**: Use `/sm` → `/dev` → `/qa` → `/po`
3. **Management Phase**: Use `/bmad-orchestrator` for complex multi-agent tasks

---

## Project Structure

```
├── .bmad-core/              # BMad Method framework
│   ├── agents/             # AI agent definitions
│   ├── workflows/          # Development workflows
│   ├── tasks/              # Reusable task definitions
│   ├── templates/          # Document templates
│   └── checklists/         # Quality checklists
├── .claude/commands/BMad/   # Claude Code agent commands
├── stories/                # Development stories
├── docs/                   # Project documentation
├── src/                    # Source code (to be created)
├── tests/                  # Test files (to be created)
├── .bmad-config.yaml       # BMad configuration
└── package.json            # Project configuration
```

---

## Development Commands

### BMad Method Commands
```bash
# Install BMad Method (for new installations or upgrades)
npx bmad-method install

# Build the entire project
npm run build

# Build only agents
npm run build:agents

# Build only teams
npm run build:teams

# List available agents
npm run list:agents

# Validate configuration
npm run validate

# Format markdown files
npm run format
```

### Core Development Commands
```bash
# Installation
npm install              # Install dependencies

# Development (to be configured)
npm run dev              # Start development server
npm run build            # Build for production
npm run preview          # Preview production build

# Quality Assurance (to be configured)
npm run test             # Run all tests
npm run test:watch       # Run tests in watch mode
npm run lint             # Run linting
npm run typecheck        # Run type checking
npm run format           # Format code
```

---

## Productivity Shortcuts

### QNEW
When I type "qnew", this means:
```
Understand all BMad Method best practices and agent capabilities.
Review project structure, coding standards, and quality requirements.
Prepare to use appropriate BMad agents for the task.
```

### QPLAN
When I type "qplan", this means:
```
Use BMad agents to analyze the codebase and determine:
- Consistency with existing patterns
- Minimal changes approach
- Reuse of existing code and BMad templates
- Alignment with architectural decisions
```

### QCODE
When I type "qcode", this means:
```
Use /dev agent to implement with TDD approach.
Use /qa agent to validate tests and quality.
Follow BMad Method development standards.
Run tests to ensure nothing breaks.
```

### QCHECK
When I type "qcheck", this means:
```
Use /qa agent as skeptical senior engineer.
Perform comprehensive code quality analysis.
Review against BMad quality checklists.
Identify potential issues and improvements.
```

### QBMAD
When I type "qbmad", this means:
```
Use /bmad-orchestrator to coordinate multiple agents.
Apply BMad Method workflow for complex tasks.
Ensure proper agent collaboration and handoffs.
```

### QGIT
When I type "qgit", this means:
```
Add changes to staging, create commit, and push.
Use conventional commits format.
Follow BMad Method git conventions.
Never refer to Claude or Anthropic in commits.
```

---

## Code Quality Standards

### Function Quality Checklist
1. **Readability**: Can you easily follow the logic?
2. **Complexity**: Avoid high cyclomatic complexity
3. **Data Structures**: Use optimal algorithms and structures
4. **Parameters**: No unused parameters or unnecessary casts
5. **Testability**: Easy to test without heavy mocking
6. **Dependencies**: Minimize hidden dependencies
7. **Naming**: Consistent with BMad and project vocabulary
8. **Reuse**: Extract only when reused or improves testability

### Testing Best Practices Checklist
1. **Parameterize inputs** - no unexplained literals
2. **Real defects** - tests must fail for actual bugs
3. **Clear descriptions** - test name states what it verifies
4. **Independent expectations** - compare to pre-computed values
5. **Strong assertions** - use specific assertions
6. **Edge cases** - test boundaries and unexpected input
7. **Type safety** - don't test type checker conditions
8. **Structure testing** - test entire structure when possible
9. **Domain properties** - test invariants and business rules
10. **Grouped tests** - organize under describe blocks
11. **Realistic scenarios** - prefer integration over heavy mocking

---

## Do NOT (Firm Guardrails)

### Code Safety
- **Never commit secrets or keys to repository**
- **Never skip TDD process - always test first**
- **Never modify test files during implementation**
- **Never assume libraries are available - check first**
- **Never ignore BMad Method agent recommendations**

### Development Practices  
- **Never create files unless absolutely necessary**
- **Never add comments unless explicitly requested**
- **Never break existing functionality without discussion**
- **Never introduce dependencies without approval**
- **Never bypass BMad Method workflow for complex tasks**

### BMad Method Violations
- **Never ignore agent specialization - use appropriate agent**
- **Never skip story creation for feature development**
- **Never bypass quality checklists and validation**
- **Never modify BMad core files without understanding**
- **Never use generic approaches when BMad templates exist**

---

## BMad Method Workflow

### Phase 1: Planning (Web UI or IDE)
1. **Market Research**: Use `/analyst` for competitive analysis
2. **Product Planning**: Use `/pm` to create comprehensive PRD
3. **Architecture Design**: Use `/architect` for system architecture
4. **UX Design**: Use `/ux-expert` for user interface design

### Phase 2: Development (IDE)
1. **Story Creation**: Use `/sm` to create detailed development stories
2. **Implementation**: Use `/dev` for TDD-based feature development
3. **Quality Assurance**: Use `/qa` for comprehensive code review
4. **Story Management**: Use `/po` for backlog refinement

### Phase 3: Coordination
1. **Multi-Agent Tasks**: Use `/bmad-orchestrator` for complex workflows
2. **Universal Support**: Use `/bmad-master` for comprehensive assistance
3. **Story Validation**: Ensure all acceptance criteria are met

---

## Context Management Guidelines

### Token Economy
- Keep CLAUDE.md focused on essential project information
- Use bullet points for efficiency
- Delegate detailed docs to separate files
- Reference BMad Method docs for framework details

### BMad Method Context
- BMad agents have built-in context and specialization
- Use appropriate agent for task type
- Leverage BMad templates and checklists
- Maintain story files for development context

### Memory Management
- Use `/memory` to inspect loaded context
- Use ACTION_PLAN.md for persistent memory
- Document decisions in BMad story files
- Use BMad knowledge base for reference

---

## Project-Specific Customization

### Credit Assessment Domain Rules
- All financial calculations must use decimal precision for accuracy
- Credit scores must follow industry standards (FICO, VantageScore)
- All financial data must be encrypted at rest and in transit
- Audit trails required for all credit decisions
- Compliance with financial regulations (GDPR, CCPA, etc.)

### BMad Method Customization
- Use fullstack workflow for comprehensive development
- Integrate Figma design system with UX agent
- Apply TDD principles with financial accuracy requirements
- Use BMad templates for financial documentation

---

## Architecture Overview

### BMad Method Architecture
BMAD-METHOD uses a two-phase approach:

1. **Agentic Planning**: Dedicated agents (Analyst, PM, Architect) collaborate to create detailed PRDs and Architecture documents
2. **Context-Engineered Development**: Scrum Master agent transforms plans into hyper-detailed development stories for Dev agents

### Key Components
- **`.bmad-core/`**: Core framework with agents, tasks, templates, and workflows
- **`.claude/commands/BMad/`**: Claude Code integration for agent commands
- **`stories/`**: Development stories following BMad methodology
- **`docs/`**: Project documentation and BMad artifacts

### Available Workflows
- `greenfield-fullstack`: Complete new application development
- `brownfield-fullstack`: Enhancement of existing applications
- `greenfield-ui`: Frontend-focused development
- `brownfield-ui`: UI improvements and modifications

---

## Version Control Standards

### Branch Strategy
- `main` - production-ready code
- `develop` - integration branch for features
- `feature/*` - individual feature branches following BMad stories
- `hotfix/*` - urgent production fixes

### Commit Message Format
Follow conventional commits with BMad context:
```
<type>[optional scope]: <description>

[optional body including BMad story reference]

[optional footer]
```

**Types**: feat, fix, docs, style, refactor, test, chore  
**Examples**:
- `feat(auth): add OAuth integration - Story #SM-001`
- `fix(api): resolve credit calculation precision - Story #SM-002`
- `docs(readme): update BMad agent usage instructions`

---

## Notes and References

- [BMad Method Documentation](https://github.com/bmadcode/bmad-method)
- [CrediAS Figma Design System](https://www.figma.com/design/lXKZe15q21LAnhgKfvO4uN/CrediAS?node-id=2002-6913&t=JUxpHNQAbfawUrZr-1)
- [Claude Code Best Practices](https://docs.anthropic.com/en/docs/claude-code)
- [Conventional Commits](https://www.conventionalcommits.org/)

<!-- Last updated: 2025-01-18 -->
<!-- BMad Method version: 4.30.2 -->
<!-- Template version: 1.0 -->