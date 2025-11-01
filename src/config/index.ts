// src/config/index.ts

// Get the local API URL from the environment variable
const DEV_API_URL = process.env.EXPO_PUBLIC_API_URL;

const PROD_API_URL = 'https://edtechacademy-xzrs.onrender.com/api';

export const API_URL = __DEV__ ? DEV_API_URL : PROD_API_URL;

