// __tests__/utils/formatters.test.ts
import { formatActivityTypeLabel, formatDuration, formatDate } from '../../src/utils/formatters';

describe('formatActivityTypeLabel', () => {

    test('should format "all"', () => {
        expect(formatActivityTypeLabel('all')).toBe('All');
    });

    test('should format "online-class"', () => {
        expect(formatActivityTypeLabel('online-class')).toBe('Class');
    });

    test('should format "assignment"', () => {
        expect(formatActivityTypeLabel('assignment')).toBe('Assignment');
    });

    test('should format "quiz"', () => {
        expect(formatActivityTypeLabel('quiz')).toBe('Quiz');
    });
});

describe('formatDuration', () => {
    test('formats minutes under an hour', () => {
        expect(formatDuration(45)).toBe('45m');
    });
    test('formats hours exact', () => {
        expect(formatDuration(120)).toBe('2h');
    });
    test('formats mixed hours and minutes', () => {
        expect(formatDuration(95)).toBe('1h 35m');
    });
});

describe('formatDate', () => {
    test('returns a readable date', () => {
        const out = formatDate('2025-11-02T10:00:00.000Z');
        expect(typeof out).toBe('string');
        expect(out).toContain('2025');
    });
});