import { exam1 } from './exam1';
import { examDump1 } from './examDump1';
import { examDumpSecurity66To130 } from './examDump2';
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

export type { ExamQuestion, ExamDefinition } from './types';

export const exams = [ examDump1, examDumpSecurity66To130, examEC2, examHA, examRDS, examRoute53,
    examCloudFront, examAppIntegration, examDatabase, examStorage,
    examCostManagement, examSecurity, examML, exam1];
