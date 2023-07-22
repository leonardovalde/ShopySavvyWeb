# Cronoplanner 3 - Frontend
This project has a template for a Next.js project with Typescript, React-Query, I18n and Css Modules.

Functionality as internationalization and samples of how to use React-Query are included.

## Tech Stack
- Next.js 13
- Typescript 5
- React-Query 4
- I18n
- Css Modules

## Project setup
```
npm install
```

#### Note: If you are using VSCode, you can install the recommended extensions for this project.
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

#### Note: If you are using JetBrains IDEs, you can activate the recommended plugins for this project.
`Settings -> Languages & Frameworks -> JavaScript -> Code Quality Tools -> ESLint -> Automatic ESLint configuration
`

`Settings -> Languages & Frameworks -> JavaScript -> Prettier -> Run on save -> Automatic Prettier configuration
`
#### Note: change the name of .env.example to .env.local and add the environment variables.

## Project scripts

### Compiles and hot-reloads for development
```
npm run dev
```

### Compiles and minifies for production
```
npm run build
```

## Project structure
```
├── public
├── src
│    ├── app
│    │   └── [locale]
│    │       ├── components
│    │       │   └── Component # Component Folder
│    │       │       ├── HTodos.tsx # Hydrated component
│    │       │       ├── Todos.tsx # Component
│    │       │       └── style.module.css # Component styles
│    │       ├── layout.tsx
│    │       ├── page.tsx
│    │       └── style.module.css
│    ├── components # Global Components
│    │   └── Component # Component Folder
│    │       ├── Component.tsx
│    │       └── style.module.css
│    ├── dictionaries # Dictionaries for i18n
│    │   ├── en.json
│    │   └── es.json
│    ├── helpers # Helpers functions
│    ├── services # Services for api calls
│    │   └── todo.ts
│    ├── i18n.ts # i18n config
│    ├── i18n-config.ts # i18n config
│    └── middleware.ts # i18n middleware
├── .env # Environment variables (local -> .env.local) (production -> .env)
├── .eslintrc
├── .gitignore
├── .prettierrc
├── next-env.d.ts
├── next.config.js
├── package.json
├── README.md
└── tsconfig.json
```



