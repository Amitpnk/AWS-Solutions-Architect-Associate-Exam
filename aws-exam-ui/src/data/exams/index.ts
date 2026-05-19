import { exam1 } from './exam1';
//import { exam2 } from './exam2';
import { exam3 } from './exam3';
import { examEC2 } from './examEC2';
import { examHA } from './examHA';
import { examRDS } from './examRDS';
import { examRoute53 } from './examRoute53';
import { examCloudFront } from './examCloudFront';
import { examAppIntegration } from './examAppIntegration';
import { examDatabase } from './examDatabase';
import { examStorage } from './examStorage';
import { examCostManagement } from './examCostManagement';
import { examSecurity } from './examSecurity';
import { examML } from './examML';
import { examSecureApps } from './examSecureApps';
export type { ExamQuestion, ExamDefinition } from './types';

export const exams = [ examSecureApps, examEC2, examHA, examRDS, examRoute53,
    examCloudFront, examAppIntegration, examDatabase, examStorage,
     examCostManagement, examSecurity, examML, exam1, exam3];
