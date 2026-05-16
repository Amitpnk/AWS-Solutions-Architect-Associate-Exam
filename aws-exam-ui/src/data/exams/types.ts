export interface ExamQuestion {
    id: string;
    prompt: string;
    options: string[];
    correctOptionIndex?: number;
    correctOptionIndexes?: number[];
    type?: string;
    explanation?: string;
}

export interface ExamDefinition {
    id: string;
    title: string;
    description: string;
    durationSeconds?: number;
    questions: ExamQuestion[];
}

