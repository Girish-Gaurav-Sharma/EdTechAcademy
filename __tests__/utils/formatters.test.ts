// __tests__/utils/formatters.test.ts
import { formatActivityTypeLabel } from '../../src/utils/formatters'; // Adjust path

// describe groups tests together
describe('formatActivityTypeLabel', () => {

    // 'test' or 'it' defines a single test casenpm install @types/jest --save-dev
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