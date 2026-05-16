export type { ExamQuestion, ExamDefinition } from './types';
import { exam1 } from './exam1';
import { exam2 } from './exam2';
import { exam3 } from './exam3';
import { examEC2 } from './examEC2';
import { examHA } from './examHA';
import { examRDS } from './examRDS';
import { examRoute53 } from './examRoute53';
import { examCloudFront } from './examCloudFront';
import { examAppIntegration } from './examAppIntegration';
import { examDatabase } from './examDatabase';
import { examStorage } from './examStorage';

export const exams = [exam1, exam2, exam3, examEC2, examHA, examRDS, examRoute53, examCloudFront, examAppIntegration, examDatabase, examStorage];
