// src/utils/formatters.ts
export const formatActivityTypeLabel = (label: string) => {
    if (label === 'all') return 'All';
    if (label === 'online-class') return 'Class';
    return label.charAt(0).toUpperCase() + label.slice(1);
};