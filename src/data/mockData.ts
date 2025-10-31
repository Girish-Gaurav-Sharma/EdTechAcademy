// src/data/mockData.ts
import { Activity } from '../types/activity.types';

// Helper for dates
const now = new Date();
const tomorrow = new Date(now);
tomorrow.setDate(now.getDate() + 1);
const yesterday = new Date(now);
yesterday.setDate(now.getDate() - 1);
const nextWeek = new Date(now);
nextWeek.setDate(now.getDate() + 7);
const lastWeek = new Date(now);
lastWeek.setDate(now.getDate() - 7);

export const mockData: Activity[] = [
    // 1. Online Class (In Progress, Live)
    {
        id: '1',
        title: 'Live Session: Intro to Neural Networks',
        description: 'Join the live class to understand the fundamentals of neural networks.',
        type: 'online-class',
        program: 'AI',
        status: 'in-progress',
        priority: 'high',
        tags: ['Live', 'Core Concept'],
        createdAt: yesterday.toISOString(),
        scheduledAt: now.toISOString(),
        durationMinutes: 90,
        instructor: 'Dr. Angela Yu',
        meetingLink: 'https://zoom.us/j/123456789',
        isLive: true,
        progressPercent: 10, // Just started
        lastAccessedAt: now.toISOString(),
    },
    // 2. Assignment (Not Started)
    {
        id: '2',
        title: 'Assignment 1: Data Preprocessing',
        description: 'Clean and preprocess the provided housing dataset.',
        type: 'assignment',
        program: 'Machine Learning',
        status: 'not-started',
        priority: 'medium',
        tags: ['Python', 'Pandas'],
        createdAt: lastWeek.toISOString(),
        dueDate: nextWeek.toISOString(),
        maxScore: 100,
    },
    // 3. Quiz (Completed)
    {
        id: '3',
        title: 'Quiz: Python Basics',
        description: 'Test your foundational knowledge of Python.',
        type: 'quiz',
        program: 'AI',
        status: 'completed',
        priority: 'low',
        tags: ['Python', 'Basics'],
        createdAt: lastWeek.toISOString(),
        dueDate: yesterday.toISOString(),
        durationMinutes: 30,
        questionCount: 20,
        attemptsAllowed: 1,
        maxScore: 100,
        submittedAt: yesterday.toISOString(),
        earnedScore: 90,
        attemptsUsed: 1,
    },
    // 4. Discussion (Overdue)
    {
        id: '4',
        title: 'Discussion: Ethics in AI',
        description: 'Share your thoughts on the ethical implications of AI in society.',
        type: 'discussion',
        program: 'AI',
        status: 'overdue',
        priority: 'medium',
        tags: ['Ethics', 'Reading'],
        createdAt: lastWeek.toISOString(),
        lastActivityAt: lastWeek.toISOString(),
        replyCount: 5,
        isParticipated: false,
        minimumReplies: 1,
    },
    // 5. Online Class (Completed)
    {
        id: '5',
        title: 'Lecture: Cloud Storage Options',
        description: 'An overview of S3, Blob Storage, and Google Cloud Storage.',
        type: 'online-class',
        program: 'Cloud Computing',
        status: 'completed',
        priority: 'low',
        tags: ['AWS', 'Azure', 'GCP'],
        createdAt: lastWeek.toISOString(),
        scheduledAt: lastWeek.toISOString(),
        durationMinutes: 60,
        instructor: 'A. Cloud Guru',
        recordingUrl: 'https://youtube.com/watch?v=example',
        isLive: false,
    },
    // 6. Quiz (In Progress)
    {
        id: '6',
        title: 'Quiz: AWS Core Services',
        description: 'A quiz on EC2, S3, and VPC.',
        type: 'quiz',
        program: 'Cloud Computing',
        status: 'in-progress',
        priority: 'high',
        tags: ['AWS', 'Certification'],
        createdAt: yesterday.toISOString(),
        dueDate: tomorrow.toISOString(),
        durationMinutes: 45,
        questionCount: 30,
        attemptsAllowed: 2,
        maxScore: 100,
        attemptsUsed: 0,
        progressPercent: 50, // Halfway through
        lastAccessedAt: now.toISOString(),
    },
    // 7. Assignment (Completed)
    {
        id: '7',
        title: 'Assignment 2: Build a Recommender System',
        description: 'Implement a basic collaborative filtering model.',
        type: 'assignment',
        program: 'Machine Learning',
        status: 'completed',
        priority: 'high',
        tags: ['Python', 'SciKit-Learn'],
        createdAt: lastWeek.toISOString(),
        dueDate: yesterday.toISOString(),
        maxScore: 100,
        submittedAt: yesterday.toISOString(),
        earnedScore: 95,
    },
    // 8. Discussion (Not Started)
    {
        id: '8',
        title: 'Discussion: Your Favorite ML Model',
        description: 'Post about your favorite model and why you like it.',
        type: 'discussion',
        program: 'Machine Learning',
        status: 'not-started',
        priority: 'low',
        tags: ['Community'],
        createdAt: yesterday.toISOString(),
        lastActivityAt: yesterday.toISOString(),
        replyCount: 0,
        isParticipated: false,
    },
];