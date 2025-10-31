// server/src/index.ts
import express from 'express';
import cors from 'cors';
import { mockData } from './data/mockData.js';
import type { Activity } from './types/activity.types.js'; // Make sure this path is correct

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors()); // Allow requests from your frontend
app.use(express.json());

// --- THE "SMART" ENDPOINT ---
app.get('/api/activities', (req, res) => {
    // Get query params from the request URL
    const { search, type } = req.query;

    let activities: Activity[] = [...mockData]; // Start with the full list

    // 1. Apply Search Filter
    if (search) {
        const query = String(search).toLowerCase();
        activities = activities.filter(
            a => a.title.toLowerCase().includes(query) ||
                a.description.toLowerCase().includes(query)
        );
    }

    // 2. Apply Type Filter
    if (type && type !== 'all') {
        activities = activities.filter(a => a.type === type);
    }

    // Future: you could add a status filter here
    // if (status && status !== 'all') { ... }

    // Return the filtered results
    res.status(200).json(activities);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});