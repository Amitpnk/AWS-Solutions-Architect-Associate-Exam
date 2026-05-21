export interface ExamQuestion {
    id: string;
    prompt: string;
    options: string[];
    correctOptionIndex?: number;
    correctOptionIndexes?: number[];
    type?: string;
    explanation?: string;
    /** Maps each incorrect option index to an explanation of why that option is wrong. */
    incorrectOptionExplanations?: Record<number, string>;
    /** List of AWS documentation references supporting the correct answer. */
    references?: string[];
}

export interface ExamDefinition {
    id: string;
    title: string;
    description: string;
    durationSeconds?: number;
    questions: ExamQuestion[];
}

