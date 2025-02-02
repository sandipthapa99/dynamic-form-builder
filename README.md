# Dynamic Form Builder

A React-based dynamic form builder powered by Vite, ShadCN, Tailwind CSS, and Clerk authentication. The app also includes a mock backend using JSON Server for local data persistence.

## 📌 Features

- **Fast Development** with Vite
- **Beautiful UI Components** using ShadCN and Radix UI
- **Styled with Tailwind CSS**
- **Authentication** via Clerk
- **Form Handling** using `react-hook-form` and Zod validation
- **Mock API** with JSON Server for local development

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/sandipthapa99/dynamic-form-builder.git
cd dynamic-form-builder
```

### 2️⃣ Install Dependencies

```sh
npm install
```

### 3️⃣ Start JSON Server

```sh
npx json-server --watch db.json --port 3000
```

Your mock API will be available at:

```
http://localhost:3000
```

---

### 4️⃣ Add essential credentials

Create a copy of .env.example as .env and add the required credentials.

## 🏃 Running the Project

### Start Development Server

```sh
npm run dev
```

This will start the Vite development server. By default, it runs at:

```
http://localhost:5173
```

---

## 📂 Project Structure

```
dynamic-form-builder/
│── public/             # Static assets
│── src/                # Application source code
│   ├── components/     # UI Components
│   ├── actions/        # Functions for form actions
│   ├── context/        # Cotext provider to store design elemets in form
│   ├── fields/         # Form fields and elements
│   ├── pages/          # App pages
│   ├── hooks/          # Custom hooks
│   ├── layout/         # Layout wrapper for pages
│   ├── lib/            # Utility functions
│   ├── routes/         # Application routes
│   ├── types/          # Types and interfaces
│   ├── main.tsx        # Application entry point
│   ├── App.tsx         # Main application component
│── postcss.config.mjs   # PostCSS configuration
│── tailwind.config.mjs  # Tailwind CSS configuration
│── tsconfig.json       # TypeScript configuration
│── vite.config.ts      # Vite configuration
│── db.json             # Mock database for JSON Server
│── package.json        # Project dependencies
│── README.md           # Project documentation
```

---

## 🏗 Building for Production

```sh
npm run build
```

This will generate the production build inside the `dist/` folder.

---

## 🔥 Preview Production Build

```sh
npm run preview
```

---

## 🛠 Technologies Used

- **Frontend**: React, Vite, ShadCN, Tailwind CSS
- **State Management**: React Hooks, React Context
- **Forms & Validation**: react-hook-form, Zod
- **Authentication**: Clerk
- **Icons**: Lucide React
- **Mock API**: JSON Server
