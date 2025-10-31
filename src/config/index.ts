// src/config/index.ts

// Get the local API URL from the environment variable
const DEV_API_URL = process.env.EXPO_PUBLIC_API_URL;

// We will fill this in later when we deploy our backend
const PROD_API_URL = 'https://edtechacademy-xzrs.onrender.com/api';

// __DEV__ is a global variable provided by React Native/Expo.
// It's true when running in development (e.g., 'npm run web')
export const API_URL = __DEV__ ? DEV_API_URL : PROD_API_URL;

