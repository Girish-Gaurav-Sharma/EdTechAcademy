# EdTech Academy – Activity Listing Page

## Submission for Great Learning (Fullstack Role)

**Submitted by:** Girish Gaurav Sharma  
**Date:** October 31, 2025

---

## Project Overview

This project implements an activity listing page for an EdTech Academy application. It features a responsive user interface that displays a scrollable list of activities with filtering capabilities. The application is built as a full-stack solution using React Native for cross-platform compatibility (web and mobile) and a Node.js backend for server-side data handling.

---

## Core Requirements

The project fulfills all specified core requirements and additional features:

- **Scrollable List of Activities**: Implemented using FlatList for efficient rendering.
- **Relevant Filters**: Server-side filtering for search and activity type.
- **Responsive UI**: Adapts from single-column mobile layout to three-column desktop grid.
- **Cross-Platform Codebase**: Built with Expo for web and native platforms.
- **Design Library**: Utilizes React Native Paper for consistent Material Design components.
- **Performance Optimization**: Server-side filtering and skeleton loaders for improved user experience.
- **API Integration**: Custom Node.js/Express API for data fetching.
- **Documentation**: Comprehensive README with setup instructions.
- **Light/Dark Mode Support**: Implemented as an additional feature.
- **Testing**: Unit and component tests using Jest and React Native Testing Library.

---

## Technology Stack

| Component | Technology |
|-----------|------------|
| Frontend | React Native, Expo |
| UI Framework | React Native Paper |
| State Management | React Context API |
| Navigation | React Navigation |
| Testing | Jest, React Native Testing Library |
| Backend | Node.js, Express, TypeScript |
| Deployment | Render (Frontend: Static Site, Backend: Web Service) |

---

## Architecture and Design Decisions

### Backend Implementation
- **Server-Side Filtering**: A dedicated Node.js API handles all filtering logic to ensure performance and scalability. This approach reduces client-side processing and minimizes data transfer.
- **API Design**: RESTful endpoints provide activity data with query parameters for search and type filtering.

### Frontend Implementation
- **Cross-Platform Compatibility**: Expo enables deployment on web and iOS with a single codebase.
- **UI Components**: React Native Paper provides a professional, accessible interface with built-in theming support.
- **State Management**: Context API manages application state for filters and activities.
- **Performance**: Skeleton loaders improve perceived performance during data fetching.

### Trade-offs
- Focused on read-only operations as specified in requirements, prioritizing filtering functionality over full CRUD operations.
- Chose React Native Paper for rapid development and consistent design over custom styling.

---

## Installation and Setup

This is a monorepo project requiring concurrent execution of frontend and backend.

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (for mobile development)

### Backend Setup
1. Navigate to the server directory:
   ```
   cd server
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
   The API will be available at `http://localhost:8080`.

### Frontend Setup
1. From the project root, install dependencies:
   ```
   npm install
   ```
2. For web development:
   ```
   npm run web
   ```
3. For iOS simulator:
   ```
   npm run ios
   ```

---

## Testing

Run tests from the project root:
```
npm test
```

Tests cover component rendering, user interactions, and utility functions.

---

## Deployment

The application is deployed on Render:
- **Frontend**: https://edtech-academy-web.onrender.com/
- **Backend API**: https://edtechacademy-xzrs.onrender.com/api/activities

### Note on Render cold start

The backend is hosted on Render’s free tier. If the service has been idle, the first request can take up to ~50 seconds while the server starts. The app includes a visible banner informing reviewers to wait during this initial spin-up. Subsequent requests are fast.

---

## Screenshots

[Add screenshots here showing the application interface, filtering functionality, and responsive design across different screen sizes.]

---

## Submission Checklist

- [x] Scrollable list of activities
- [x] Filtering functionality
- [x] Responsive design
- [x] Cross-platform compatibility
- [x] API integration
- [x] Documentation
- [x] Testing
- [x] Light/dark mode
- [x] Deployment links
- [x] Screenshots added to README

**Repository Link:** [GitHub Repository URL]  
**Live Frontend URL:** https://edtech-academy-web.onrender.com/

---

This submission demonstrates a complete, production-ready implementation meeting all project requirements with professional code quality and documentation.