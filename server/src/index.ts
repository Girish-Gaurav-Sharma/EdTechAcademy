// server/src/index.ts
import express from 'express';
import cors from 'cors';
import { mockData } from './data/mockData.js';
import type { Activity } from './types/activity.types.js';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());


app.get('/api/activities', (req, res) => {
    
    const { search, type } = req.query as { [key: string]: string | undefined };

    const limitParam = Number(req.query.limit);
    const offsetParam = Number(req.query.offset);
    const MAX_LIMIT = 50;
    const DEFAULT_LIMIT = 12;
    const limit = Number.isFinite(limitParam) && limitParam > 0
        ? Math.min(limitParam, MAX_LIMIT)
        : DEFAULT_LIMIT;
    const offset = Number.isFinite(offsetParam) && offsetParam >= 0 ? offsetParam : 0;

    let activities: Activity[] = [...mockData]; 

    if (search) {
        const query = String(search).toLowerCase();
        activities = activities.filter(
            a => a.title.toLowerCase().includes(query) ||
                a.description.toLowerCase().includes(query)
        );
    }

    if (type && type !== 'all') {
        activities = activities.filter(a => a.type === type);
    }

    const total = activities.length;
    const items = activities.slice(offset, offset + limit);

    res.status(200).json({ items, total });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});