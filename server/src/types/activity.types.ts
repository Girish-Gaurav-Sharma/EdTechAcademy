// src/types/activity.types.ts

export type ActivityType = 'online-class' | 'assignment' | 'quiz' | 'discussion';
export type ActivityStatus = 'not-started' | 'in-progress' | 'completed' | 'overdue';
export type ProgramType = 'AI' | 'Machine Learning' | 'Cloud Computing';
export type Priority = 'high' | 'medium' | 'low';
export interface BaseActivity {
    id: string;
    title: string;
    description: string;
    type: ActivityType;
    program: ProgramType;
    status: ActivityStatus;
    priority: Priority;
    tags: string[];
    createdAt: string;
}

export interface OnlineClassFields {
    scheduledAt: string;
    durationMinutes: number; 
    instructor: string;
    meetingLink?: string;
    recordingUrl?: string;
    isLive?: boolean;
}

export interface AssignmentFields {
    dueDate: string;
    maxScore: number;
    submittedAt?: string;
    earnedScore?: number;
}

export interface QuizFields {
    dueDate: string;
    durationMinutes: number;
    questionCount: number;
    attemptsAllowed: number;
    maxScore: number;
    submittedAt?: string;
    earnedScore?: number;
    attemptsUsed?: number;
}

export interface DiscussionFields {
    lastActivityAt: string;
    replyCount: number;
    isParticipated: boolean;
    minimumReplies?: number;
}
export interface ProgressInfo {
    progressPercent: number; 
    lastAccessedAt: string;
}

export type Activity = BaseActivity & (
    | ({ type: 'online-class' } & OnlineClassFields)
    | ({ type: 'assignment' } & AssignmentFields)
    | ({ type: 'quiz' } & QuizFields)
    | ({ type: 'discussion' } & DiscussionFields)
) & Partial<ProgressInfo>; 