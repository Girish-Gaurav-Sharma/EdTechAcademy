// src/utils/formatters.ts
export const formatActivityTypeLabel = (label: string) => {
    if (label === 'all') return 'All';
    if (label === 'online-class') return 'Class';
    return label.charAt(0).toUpperCase() + label.slice(1);
};

// Format an ISO date string into a short local date, e.g. Nov 2, 2025
export const formatDate = (iso: string) => {
    try {
        const d = new Date(iso);
        return d.toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    } catch {
        return iso;
    }
};

// Format an ISO date string into a short local date time, e.g. Nov 2, 2025, 10:30 AM
export const formatDateTime = (iso: string) => {
    try {
        const d = new Date(iso);
        return d.toLocaleString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
        });
    } catch {
        return iso;
    }
};

// Convert minutes to a compact duration string like 1h 30m or 45m
export const formatDuration = (minutes: number) => {
    if (typeof minutes !== 'number' || isNaN(minutes) || minutes < 0) return '';
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    if (h && m) return `${h}h ${m}m`;
    if (h) return `${h}h`;
    return `${m}m`;
};

export const formatScore = (earned?: number, max?: number) => {
    if (typeof earned === 'number' && typeof max === 'number') return `${earned}/${max}`;
    if (typeof max === 'number') return `${max} pts`;
    return '';
};