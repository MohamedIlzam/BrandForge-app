# BrandForge 2.0 - Generative Brand Strategy Workspace

BrandForge 2.0 is a Swiss Functional-Modernist web application built with React, TypeScript, Vite, and custom CSS design tokens. It empowers brand strategists, designers, and marketers to transform brand vision into deterministic slogans, typography pairings, and generative collateral.

## 🚀 Key Features
- **AI Generation Workspace**: 2-pane interactive studio featuring live concept canvas preview and real-time generation.
- **ChatGPT & Claude Style Chat Space**: Conversational AI assistant supporting custom prompts, preset vision chips, tone alignment pills, and interactive copy cards.
- **Horizontal Split-Pane Resizer**: Dynamic draggable divider handle for customizing left preview vs right chat panel widths.
- **Brand Identity Controls**: Core identity parameter manager and brand logo asset library.

## 🏗 Architecture & Design System
- **Swiss Functional Modernism**: High contrast typography, strict alignment rules, and functional teal accents (`#14b89c`).
- **Context API**: Single-source `BrandContext` state managing global brand kits, vision prompts, and active logo selections.
- **Responsive Layout**: Fluid flex-split container with desktop horizontal resizer and mobile adaptive stacking.

## ⚡ Getting Started

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build production bundle
npm run build
```

## 🛠 Tech Stack
- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Swiss/Functional Modernist Vanilla CSS Theme System (`theme.css`)
- **Icons**: Lucide React
