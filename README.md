# Next.js E-commerce Platform

A high-performance e-commerce platform built with Next.js, supporting Server-Side Rendering (SSR) and Static Site Generation (SSG). The platform includes a custom shopping cart with real-time updates, advanced search functionality with faceted filtering, and is styled using Tailwind CSS. The interface is fully responsive and mobile-optimized.

## Installation

Make sure you have Node.js and npm installed before getting started.

To install the project dependencies, run the following command:

```bash
npm install
```

## Usage

To start the project, use the following command:

```bash
npm run dev
```

The application will be accessible at [http://localhost:3000](http://localhost:3000) in your web browser.

## Features

- **Real-time Shopping Cart:** Add to cart functionality with real-time updates using Redux.
- **Advanced Search:** Server-side search with suggestions, debouncing, and faceted filtering.
- **Responsive Design:** Fully responsive and mobile-optimized UI using Tailwind CSS.
- **State Management:** Global state management with Redux Toolkit.
- **Data Persistence:** Redux state persistence using localStorage.

## Repository Information

- **Repository URL:** [E-commerce Platform](https://github.com/abheyygupta396/ecommerce-platform)
- **Branch:** `main`

### Important Points about the Application

- **Entry Point:** `layout.js` is the entry point for the application, located inside the `src/app` folder.
- **Folder Structure:**
  - `src/app` (root folder)
  - `src/app/components`: Holds components being used in other files.
- **API Source:** The application uses the [DummyJSON API](https://dummyjson.com/docs/products) for product data.
- **Configuration:** The application uses Tailwind CSS for styling and `next.config.js` for configuration.

## Build Command

To create the project build, run the following command:

```bash
npm run build
```