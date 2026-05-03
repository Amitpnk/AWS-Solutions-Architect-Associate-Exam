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

export const exams: ExamDefinition[] = [
    {
        id: 'exam1',
        title: 'SAA-C03 Practice Set 1 (Easy)',
        description: 'Sample AWS Solutions Architect Associate practice exam with timed option.',
        durationSeconds: 7800,
        questions: [
            {
                "id": "q1",
                "prompt": "Which AWS service provides object storage with high durability?",
                "options": ["Amazon EC2", "Amazon S3", "Amazon EBS", "Amazon RDS"],
                "correctOptionIndex": 1,
                "explanation": "Amazon S3 provides highly durable object storage with 99.999999999% durability."
            },
            {
                "id": "q2",
                "prompt": "Which service is used to run containers without managing servers?",
                "options": ["Amazon EC2", "AWS Lambda", "AWS Fargate", "Amazon ECS on EC2"],
                "correctOptionIndex": 2,
                "explanation": "AWS Fargate allows running containers without managing underlying infrastructure."
            },
            {
                "id": "q3",
                "prompt": "What is the best service for key-value NoSQL workloads?",
                "options": ["Amazon RDS", "Amazon DynamoDB", "Amazon Aurora", "Amazon Redshift"],
                "correctOptionIndex": 1,
                "explanation": "DynamoDB is a fully managed NoSQL key-value and document database."
            },
            {
                "id": "q4",
                "prompt": "Which service distributes traffic across multiple targets?",
                "options": ["Amazon Route 53", "AWS CloudFormation", "Elastic Load Balancer", "AWS IAM"],
                "correctOptionIndex": 2,
                "explanation": "Elastic Load Balancer distributes incoming traffic across multiple targets."
            },
            {
                "id": "q5",
                "prompt": "Which storage is block-level and attached to EC2?",
                "options": ["Amazon S3", "Amazon EBS", "Amazon EFS", "Amazon Glacier"],
                "correctOptionIndex": 1,
                "explanation": "EBS provides persistent block storage for EC2 instances."
            },

            {
                "id": "q6",
                "prompt": "Which AWS service provides DNS routing?",
                "options": ["CloudFront", "Route 53", "API Gateway", "ELB"],
                "correctOptionIndex": 1,
                "explanation": "Route 53 is AWS's scalable DNS service."
            },
            {
                "id": "q7",
                "prompt": "Which service helps with infrastructure as code?",
                "options": ["AWS Config", "CloudFormation", "CloudTrail", "CloudWatch"],
                "correctOptionIndex": 1,
                "explanation": "CloudFormation allows provisioning resources using templates."
            },
            {
                "id": "q8",
                "prompt": "Which service is used for monitoring AWS resources?",
                "options": ["CloudTrail", "CloudWatch", "Inspector", "GuardDuty"],
                "correctOptionIndex": 1,
                "explanation": "CloudWatch provides monitoring and observability."
            },
            {
                "id": "q9",
                "prompt": "Which service provides CDN functionality?",
                "options": ["CloudFront", "S3", "EC2", "Route 53"],
                "correctOptionIndex": 0,
                "explanation": "CloudFront is AWS's content delivery network."
            },
            {
                "id": "q10",
                "prompt": "Which database is optimized for data warehousing?",
                "options": ["RDS", "DynamoDB", "Redshift", "Aurora"],
                "correctOptionIndex": 2,
                "explanation": "Redshift is optimized for analytics and data warehousing."
            },

            {
                "id": "q11",
                "prompt": "Which service provides shared file storage?",
                "options": ["EBS", "EFS", "S3", "Glacier"],
                "correctOptionIndex": 1,
                "explanation": "EFS provides scalable shared file storage."
            },
            {
                "id": "q12",
                "prompt": "Which AWS service helps with DDoS protection?",
                "options": ["WAF", "Shield", "Inspector", "Macie"],
                "correctOptionIndex": 1,
                "explanation": "AWS Shield provides DDoS protection."
            },
            {
                "id": "q13",
                "prompt": "Which service manages user access and permissions?",
                "options": ["IAM", "Cognito", "Directory Service", "Organizations"],
                "correctOptionIndex": 0,
                "explanation": "IAM controls access to AWS resources."
            },
            {
                "id": "q14",
                "prompt": "Which service is used for serverless compute?",
                "options": ["EC2", "Lambda", "ECS", "Batch"],
                "correctOptionIndex": 1,
                "explanation": "Lambda runs code without managing servers."
            },
            {
                "id": "q15",
                "prompt": "Which service allows you to create VPCs?",
                "options": ["EC2", "VPC", "Route 53", "CloudFront"],
                "correctOptionIndex": 1,
                "explanation": "VPC allows creating isolated networks."
            },
            {
                "id": "q16",
                "prompt": "A company wants to ensure EC2 instances are not publicly accessible. What is the BEST solution?",
                "options": [
                    "Use Security Groups only",
                    "Place instances in private subnets",
                    "Use IAM roles",
                    "Enable CloudTrail"
                ],
                "correctOptionIndex": 1,
                "explanation": "Placing instances in private subnets prevents direct internet access."
            },
            {
                "id": "q17",
                "prompt": "A company needs to store frequently accessed data with low latency and automatic scaling. Which service should be used?",
                "options": [
                    "S3 Standard",
                    "DynamoDB",
                    "EBS",
                    "Glacier"
                ],
                "correctOptionIndex": 1,
                "explanation": "DynamoDB offers low latency and automatic scaling."
            },
            {
                "id": "q18",
                "prompt": "A company wants to cache database query results. Which service is best?",
                "options": [
                    "CloudFront",
                    "ElastiCache",
                    "DynamoDB",
                    "S3"
                ],
                "correctOptionIndex": 1,
                "explanation": "ElastiCache provides in-memory caching."
            },
            {
                "id": "q19",
                "prompt": "A company wants to decouple application components. Which service should be used?",
                "options": [
                    "SNS",
                    "SQS",
                    "Lambda",
                    "Step Functions"
                ],
                "correctOptionIndex": 1,
                "explanation": "SQS enables decoupling with message queues."
            },
            {
                "id": "q20",
                "prompt": "A company wants to run batch jobs at scale. Which service should be used?",
                "options": [
                    "Lambda",
                    "Batch",
                    "ECS",
                    "EC2"
                ],
                "correctOptionIndex": 1,
                "explanation": "AWS Batch is designed for batch processing."
            },

            {
                "id": "q21",
                "prompt": "A company needs centralized logging across accounts. Which service should be used?",
                "options": [
                    "CloudWatch Logs",
                    "CloudTrail",
                    "S3",
                    "All of the above"
                ],
                "correctOptionIndex": 3,
                "explanation": "Combining services enables centralized logging."
            },
            {
                "id": "q22",
                "prompt": "A company needs encryption at rest for S3. What should be used?",
                "options": [
                    "SSL",
                    "KMS",
                    "IAM",
                    "VPC"
                ],
                "correctOptionIndex": 1,
                "explanation": "KMS provides encryption keys for S3."
            },
            {
                "id": "q23",
                "prompt": "A company wants to audit API activity. Which service is used?",
                "options": [
                    "CloudWatch",
                    "CloudTrail",
                    "Config",
                    "Inspector"
                ],
                "correctOptionIndex": 1,
                "explanation": "CloudTrail records API activity."
            },
            {
                "id": "q24",
                "prompt": "A company needs global traffic routing with latency-based routing. Which service?",
                "options": [
                    "CloudFront",
                    "Route 53",
                    "ELB",
                    "API Gateway"
                ],
                "correctOptionIndex": 1,
                "explanation": "Route 53 supports latency-based routing."
            },
            {
                "id": "q25",
                "prompt": "A company needs to orchestrate workflows. Which service?",
                "options": [
                    "Lambda",
                    "Step Functions",
                    "SNS",
                    "SQS"
                ],
                "correctOptionIndex": 1,
                "explanation": "Step Functions orchestrate workflows."
            },

            {
                "id": "q26",
                "prompt": "A company needs hybrid connectivity between on-prem and AWS. Which service?",
                "options": [
                    "VPN",
                    "Direct Connect",
                    "Both",
                    "CloudFront"
                ],
                "correctOptionIndex": 2,
                "explanation": "Both VPN and Direct Connect provide hybrid connectivity."
            },
            {
                "id": "q27",
                "prompt": "A company wants to scan S3 for sensitive data. Which service?",
                "options": [
                    "GuardDuty",
                    "Macie",
                    "Inspector",
                    "Config"
                ],
                "correctOptionIndex": 1,
                "explanation": "Macie identifies sensitive data in S3."
            },
            {
                "id": "q28",
                "prompt": "A company needs vulnerability scanning for EC2. Which service?",
                "options": [
                    "Inspector",
                    "Shield",
                    "Macie",
                    "Config"
                ],
                "correctOptionIndex": 0,
                "explanation": "Inspector scans for vulnerabilities."
            },
            {
                "id": "q29",
                "prompt": "A company wants serverless APIs. Which service?",
                "options": [
                    "API Gateway + Lambda",
                    "EC2",
                    "ECS",
                    "ELB"
                ],
                "correctOptionIndex": 0,
                "explanation": "API Gateway + Lambda enables serverless APIs."
            },
            {
                "id": "q30",
                "prompt": "A company needs distributed tracing. Which service?",
                "options": [
                    "CloudWatch",
                    "X-Ray",
                    "CloudTrail",
                    "Config"
                ],
                "correctOptionIndex": 1,
                "explanation": "X-Ray provides tracing."
            },

            {
                "id": "q31",
                "prompt": "A company needs long-term backup with lifecycle policies. Which service?",
                "options": [
                    "S3 Lifecycle",
                    "EBS",
                    "EFS",
                    "DynamoDB"
                ],
                "correctOptionIndex": 0,
                "explanation": "S3 lifecycle manages backups."
            },
            {
                "id": "q32",
                "prompt": "A company needs shared storage across AZs. Which service?",
                "options": [
                    "EBS",
                    "EFS",
                    "Instance Store",
                    "Glacier"
                ],
                "correctOptionIndex": 1,
                "explanation": "EFS is multi-AZ."
            },
            {
                "id": "q33",
                "prompt": "A company wants to detect threats. Which service?",
                "options": [
                    "GuardDuty",
                    "Macie",
                    "Inspector",
                    "Shield"
                ],
                "correctOptionIndex": 0,
                "explanation": "GuardDuty detects threats."
            },
            {
                "id": "q34",
                "prompt": "A company wants firewall rules at edge. Which service?",
                "options": [
                    "WAF",
                    "Shield",
                    "IAM",
                    "NACL"
                ],
                "correctOptionIndex": 0,
                "explanation": "WAF provides web filtering."
            },
            {
                "id": "q35",
                "prompt": "A company needs real-time notifications. Which service?",
                "options": [
                    "SNS",
                    "SQS",
                    "Lambda",
                    "Batch"
                ],
                "correctOptionIndex": 0,
                "explanation": "SNS provides pub/sub messaging."
            },

            {
                "id": "q36",
                "prompt": "A company wants event-driven architecture. Which service?",
                "options": [
                    "EventBridge",
                    "S3",
                    "EC2",
                    "EBS"
                ],
                "correctOptionIndex": 0,
                "explanation": "EventBridge enables event-driven apps."
            },
            {
                "id": "q37",
                "prompt": "A company needs ETL pipelines. Which service?",
                "options": [
                    "Glue",
                    "Athena",
                    "Redshift",
                    "EMR"
                ],
                "correctOptionIndex": 0,
                "explanation": "Glue is for ETL."
            },
            {
                "id": "q38",
                "prompt": "A company needs big data processing. Which service?",
                "options": [
                    "EMR",
                    "Lambda",
                    "EC2",
                    "EFS"
                ],
                "correctOptionIndex": 0,
                "explanation": "EMR handles big data."
            },
            {
                "id": "q39",
                "prompt": "A company needs fully managed PostgreSQL. Which service?",
                "options": [
                    "RDS",
                    "EC2",
                    "DynamoDB",
                    "Redshift"
                ],
                "correctOptionIndex": 0,
                "explanation": "RDS supports PostgreSQL."
            },
            {
                "id": "q40",
                "prompt": "A company needs serverless data warehouse. Which service?",
                "options": [
                    "Redshift Serverless",
                    "RDS",
                    "DynamoDB",
                    "Athena"
                ],
                "correctOptionIndex": 0,
                "explanation": "Redshift Serverless provides analytics."
            },

            {
                "id": "q41",
                "prompt": "A company wants to restrict IP access. Which service?",
                "options": [
                    "Security Groups",
                    "IAM",
                    "S3",
                    "Lambda"
                ],
                "correctOptionIndex": 0,
                "explanation": "Security Groups restrict IPs."
            },
            {
                "id": "q42",
                "prompt": "A company needs multi-region failover. Which service?",
                "options": [
                    "Route 53",
                    "CloudFront",
                    "ELB",
                    "EC2"
                ],
                "correctOptionIndex": 0,
                "explanation": "Route 53 handles failover."
            },
            {
                "id": "q43",
                "prompt": "A company wants to analyze logs. Which service?",
                "options": [
                    "CloudWatch Logs Insights",
                    "CloudTrail",
                    "Config",
                    "IAM"
                ],
                "correctOptionIndex": 0,
                "explanation": "Logs Insights enables querying logs."
            },
            {
                "id": "q44",
                "prompt": "A company needs scheduled tasks. Which service?",
                "options": [
                    "EventBridge",
                    "Lambda",
                    "EC2",
                    "Batch"
                ],
                "correctOptionIndex": 0,
                "explanation": "EventBridge supports cron schedules."
            },
            {
                "id": "q45",
                "prompt": "A company needs secrets encryption. Which service?",
                "options": [
                    "KMS",
                    "IAM",
                    "S3",
                    "CloudTrail"
                ],
                "correctOptionIndex": 0,
                "explanation": "KMS manages encryption keys."
            },

            {
                "id": "q46",
                "prompt": "A company needs high throughput streaming. Which service?",
                "options": [
                    "Kinesis",
                    "SNS",
                    "SQS",
                    "Lambda"
                ],
                "correctOptionIndex": 0,
                "explanation": "Kinesis handles streaming data."
            },
            {
                "id": "q47",
                "prompt": "A company wants ML model hosting. Which service?",
                "options": [
                    "SageMaker",
                    "Lambda",
                    "EC2",
                    "ECS"
                ],
                "correctOptionIndex": 0,
                "explanation": "SageMaker is for ML."
            },
            {
                "id": "q48",
                "prompt": "A company needs image recognition. Which service?",
                "options": [
                    "Rekognition",
                    "Polly",
                    "Lex",
                    "Translate"
                ],
                "correctOptionIndex": 0,
                "explanation": "Rekognition analyzes images."
            },
            {
                "id": "q49",
                "prompt": "A company needs speech-to-text. Which service?",
                "options": [
                    "Transcribe",
                    "Polly",
                    "Lex",
                    "Comprehend"
                ],
                "correctOptionIndex": 0,
                "explanation": "Transcribe converts speech to text."
            },
            {
                "id": "q50",
                "prompt": "A company needs text analysis. Which service?",
                "options": [
                    "Comprehend",
                    "Lex",
                    "Polly",
                    "Translate"
                ],
                "correctOptionIndex": 0,
                "explanation": "Comprehend analyzes text."
            },

            {
                "id": "q51",
                "prompt": "A company needs chatbot service. Which service?",
                "options": [
                    "Lex",
                    "Polly",
                    "Rekognition",
                    "Comprehend"
                ],
                "correctOptionIndex": 0,
                "explanation": "Lex builds chatbots."
            },
            {
                "id": "q52",
                "prompt": "A company needs text-to-speech. Which service?",
                "options": [
                    "Polly",
                    "Lex",
                    "Transcribe",
                    "Rekognition"
                ],
                "correctOptionIndex": 0,
                "explanation": "Polly converts text to speech."
            },
            {
                "id": "q53",
                "prompt": "A company needs translation. Which service?",
                "options": [
                    "Translate",
                    "Comprehend",
                    "Polly",
                    "Lex"
                ],
                "correctOptionIndex": 0,
                "explanation": "Translate converts languages."
            },
            {
                "id": "q54",
                "prompt": "A company wants infrastructure compliance. Which service?",
                "options": [
                    "Config",
                    "CloudTrail",
                    "CloudWatch",
                    "IAM"
                ],
                "correctOptionIndex": 0,
                "explanation": "Config ensures compliance."
            },
            {
                "id": "q55",
                "prompt": "A company wants automated deployments. Which service?",
                "options": [
                    "CodeDeploy",
                    "CloudTrail",
                    "Config",
                    "IAM"
                ],
                "correctOptionIndex": 0,
                "explanation": "CodeDeploy automates deployments."
            },

            {
                "id": "q56",
                "prompt": "A company wants CI/CD pipelines. Which service?",
                "options": [
                    "CodePipeline",
                    "CloudFormation",
                    "CloudTrail",
                    "IAM"
                ],
                "correctOptionIndex": 0,
                "explanation": "CodePipeline manages CI/CD."
            },
            {
                "id": "q57",
                "prompt": "A company wants source control. Which service?",
                "options": [
                    "CodeCommit",
                    "S3",
                    "EBS",
                    "IAM"
                ],
                "correctOptionIndex": 0,
                "explanation": "CodeCommit provides Git repos."
            },
            {
                "id": "q58",
                "prompt": "A company wants artifact storage. Which service?",
                "options": [
                    "CodeArtifact",
                    "S3",
                    "EBS",
                    "IAM"
                ],
                "correctOptionIndex": 0,
                "explanation": "CodeArtifact manages packages."
            },
            {
                "id": "q59",
                "prompt": "A company wants blue/green deployments. Which service?",
                "options": [
                    "CodeDeploy",
                    "Lambda",
                    "EC2",
                    "S3"
                ],
                "correctOptionIndex": 0,
                "explanation": "CodeDeploy supports blue/green."
            },
            {
                "id": "q60",
                "prompt": "A company wants monitoring dashboards. Which service?",
                "options": [
                    "CloudWatch",
                    "CloudTrail",
                    "Config",
                    "IAM"
                ],
                "correctOptionIndex": 0,
                "explanation": "CloudWatch provides dashboards."
            },

            {
                "id": "q61",
                "prompt": "A company needs cost optimization insights. Which service?",
                "options": [
                    "Cost Explorer",
                    "CloudWatch",
                    "CloudTrail",
                    "Config"
                ],
                "correctOptionIndex": 0,
                "explanation": "Cost Explorer analyzes costs."
            },
            {
                "id": "q62",
                "prompt": "A company wants budgeting alerts. Which service?",
                "options": [
                    "AWS Budgets",
                    "CloudWatch",
                    "IAM",
                    "Config"
                ],
                "correctOptionIndex": 0,
                "explanation": "AWS Budgets sends alerts."
            },
            {
                "id": "q63",
                "prompt": "A company wants trusted recommendations. Which service?",
                "options": [
                    "Trusted Advisor",
                    "CloudWatch",
                    "Config",
                    "IAM"
                ],
                "correctOptionIndex": 0,
                "explanation": "Trusted Advisor provides recommendations."
            },
            {
                "id": "q64",
                "prompt": "A company needs service health monitoring. Which service?",
                "options": [
                    "AWS Health Dashboard",
                    "CloudWatch",
                    "CloudTrail",
                    "Config"
                ],
                "correctOptionIndex": 0,
                "explanation": "Health Dashboard shows service status."
            },
            {
                "id": "q65",
                "prompt": "A company needs global failover with DNS. Which solution?",
                "options": [
                    "Route 53 health checks",
                    "CloudFront",
                    "ELB",
                    "EC2"
                ],
                "correctOptionIndex": 0,
                "explanation": "Route 53 supports DNS failover."
            }
        ],
    },
    {
        id: 'exam2',
        title: 'SAA-C03 Practice Set 2 (Easy Single Choice)',
        description: 'Additional SAA-C03 simulation to expand your readiness with another question set.',
        durationSeconds: 7800,
        questions: [
            {
                "id": "q1",
                "prompt": "A company runs a web application on EC2 instances behind an ALB. Traffic spikes unpredictably. What is the MOST cost-effective solution to handle scaling?",
                "options": [
                    "Use EC2 Reserved Instances",
                    "Use Auto Scaling with On-Demand instances",
                    "Use Auto Scaling with Spot Instances",
                    "Use AWS Lambda instead"
                ],
                "correctOptionIndex": 2,
                "explanation": "Spot Instances reduce cost significantly for scalable workloads with Auto Scaling."
            },
            {
                "id": "q2",
                "prompt": "A company needs a highly available database with automatic failover and minimal admin overhead. Which solution should be used?",
                "options": [
                    "EC2 with MySQL installed",
                    "Amazon RDS Multi-AZ",
                    "Amazon DynamoDB",
                    "Amazon Aurora Serverless"
                ],
                "correctOptionIndex": 1,
                "explanation": "RDS Multi-AZ provides automatic failover and high availability."
            },
            {
                "id": "q3",
                "prompt": "A company stores logs that must be retained for 7 years at the lowest cost. Retrieval is rare but must happen within minutes. What should be used?",
                "options": [
                    "S3 Standard",
                    "S3 Glacier Instant Retrieval",
                    "S3 Glacier Deep Archive",
                    "EFS"
                ],
                "correctOptionIndex": 1,
                "explanation": "Glacier Instant Retrieval offers low cost with millisecond access."
            },
            {
                "id": "q4",
                "prompt": "An application needs to process thousands of messages per second with guaranteed ordering. Which service should be used?",
                "options": [
                    "Amazon SNS",
                    "Amazon SQS Standard",
                    "Amazon SQS FIFO",
                    "Amazon EventBridge"
                ],
                "correctOptionIndex": 2,
                "explanation": "SQS FIFO guarantees ordering and exactly-once processing."
            },
            {
                "id": "q5",
                "prompt": "A company wants to serve static content globally with low latency. Which solution is best?",
                "options": [
                    "EC2 in multiple regions",
                    "Amazon CloudFront with S3",
                    "API Gateway",
                    "Elastic Load Balancer"
                ],
                "correctOptionIndex": 1,
                "explanation": "CloudFront caches content globally for low latency."
            },

            {
                "id": "q6",
                "prompt": "A company wants to restrict access to S3 buckets only from specific VPC endpoints. What should be used?",
                "options": [
                    "Security Groups",
                    "Bucket Policy with VPC endpoint condition",
                    "IAM Role",
                    "NACL"
                ],
                "correctOptionIndex": 1,
                "explanation": "S3 bucket policies can restrict access using VPC endpoint conditions."
            },
            {
                "id": "q7",
                "prompt": "A company needs to run code in response to S3 uploads without managing servers. What should be used?",
                "options": [
                    "EC2",
                    "Lambda",
                    "ECS",
                    "Batch"
                ],
                "correctOptionIndex": 1,
                "explanation": "Lambda integrates with S3 events for serverless processing."
            },
            {
                "id": "q8",
                "prompt": "A company wants to securely store database credentials and rotate them automatically. Which service is best?",
                "options": [
                    "IAM",
                    "Secrets Manager",
                    "Parameter Store (Standard)",
                    "KMS"
                ],
                "correctOptionIndex": 1,
                "explanation": "Secrets Manager supports automatic rotation."
            },
            {
                "id": "q9",
                "prompt": "An application requires sub-millisecond latency for read-heavy workloads. Which database should be used?",
                "options": [
                    "RDS MySQL",
                    "Aurora",
                    "DynamoDB with DAX",
                    "Redshift"
                ],
                "correctOptionIndex": 2,
                "explanation": "DAX provides in-memory caching for DynamoDB."
            },
            {
                "id": "q10",
                "prompt": "A company needs to migrate large datasets (100TB) securely to AWS. Which service is best?",
                "options": [
                    "S3 Transfer Acceleration",
                    "AWS Snowball",
                    "AWS DataSync",
                    "AWS DMS"
                ],
                "correctOptionIndex": 1,
                "explanation": "Snowball is best for large offline data transfers."
            },

            {
                "id": "q11",
                "prompt": "A company wants to enforce tagging policies across multiple AWS accounts. What should be used?",
                "options": [
                    "IAM Policies",
                    "AWS Organizations Tag Policies",
                    "AWS Config",
                    "CloudTrail"
                ],
                "correctOptionIndex": 1,
                "explanation": "Organizations Tag Policies enforce tagging rules."
            },
            {
                "id": "q12",
                "prompt": "A company needs to analyze streaming data in real time. Which service should be used?",
                "options": [
                    "S3",
                    "Kinesis Data Streams",
                    "Redshift",
                    "Athena"
                ],
                "correctOptionIndex": 1,
                "explanation": "Kinesis processes real-time streaming data."
            },
            {
                "id": "q13",
                "prompt": "A company needs to allow users to sign in using Google or Facebook. Which service should be used?",
                "options": [
                    "IAM",
                    "Cognito",
                    "Directory Service",
                    "Secrets Manager"
                ],
                "correctOptionIndex": 1,
                "explanation": "Cognito supports federated identities."
            },
            {
                "id": "q14",
                "prompt": "A company needs to query data directly from S3 using SQL. Which service should be used?",
                "options": [
                    "Redshift",
                    "Athena",
                    "Glue",
                    "EMR"
                ],
                "correctOptionIndex": 1,
                "explanation": "Athena allows SQL queries on S3."
            },
            {
                "id": "q15",
                "prompt": "A company wants to monitor configuration changes and compliance. Which service should be used?",
                "options": [
                    "CloudTrail",
                    "Config",
                    "CloudWatch",
                    "GuardDuty"
                ],
                "correctOptionIndex": 1,
                "explanation": "AWS Config tracks configuration changes."
            },
            {
                "id": "q16",
                "prompt": "A company runs EC2 instances in a public subnet but wants to prevent direct internet access while still allowing outbound traffic for updates. What is the BEST solution?",
                "options": [
                    "Attach a NAT Gateway and move instances to private subnet",
                    "Use Security Groups to block inbound traffic",
                    "Use NACL to block inbound traffic",
                    "Detach Internet Gateway"
                ],
                "correctOptionIndex": 0,
                "explanation": "Moving instances to private subnets with a NAT Gateway allows outbound internet access without inbound exposure."
            },
            {
                "id": "q17",
                "prompt": "A high-traffic application requires consistent low latency reads globally. Data is mostly read-heavy. Which solution is BEST?",
                "options": [
                    "RDS Multi-AZ",
                    "DynamoDB with Global Tables",
                    "Aurora Multi-AZ",
                    "ElastiCache only"
                ],
                "correctOptionIndex": 1,
                "explanation": "DynamoDB Global Tables provide low-latency global reads with multi-region replication."
            },
            {
                "id": "q18",
                "prompt": "A company experiences database bottlenecks due to repeated read queries. The solution must minimize changes to application code. What should be used?",
                "options": [
                    "Add read replicas",
                    "Use DynamoDB",
                    "Add ElastiCache",
                    "Use Redshift"
                ],
                "correctOptionIndex": 2,
                "explanation": "ElastiCache reduces database load with minimal code changes."
            },
            {
                "id": "q19",
                "prompt": "A microservices architecture needs to decouple services and handle traffic spikes reliably. Which solution is BEST?",
                "options": [
                    "SNS only",
                    "SQS with Auto Scaling consumers",
                    "Lambda only",
                    "Step Functions"
                ],
                "correctOptionIndex": 1,
                "explanation": "SQS buffers traffic and allows scalable consumers."
            },
            {
                "id": "q20",
                "prompt": "A company runs nightly batch jobs requiring thousands of vCPUs for a short time. What is the MOST cost-effective solution?",
                "options": [
                    "On-Demand EC2",
                    "Reserved Instances",
                    "Spot Instances with AWS Batch",
                    "Lambda"
                ],
                "correctOptionIndex": 2,
                "explanation": "Spot instances with AWS Batch are ideal for cost-effective batch workloads."
            },

            {
                "id": "q21",
                "prompt": "A company wants centralized logging across multiple AWS accounts with long-term storage and analytics. What is the BEST approach?",
                "options": [
                    "CloudWatch Logs only",
                    "CloudTrail only",
                    "CloudWatch + S3 + Athena",
                    "EC2 logging server"
                ],
                "correctOptionIndex": 2,
                "explanation": "Centralized logging with S3 and querying via Athena is scalable and cost-effective."
            },
            {
                "id": "q22",
                "prompt": "Sensitive data must be encrypted at rest in S3 and access must be audited. What combination should be used?",
                "options": [
                    "S3 + IAM",
                    "S3 + KMS + CloudTrail",
                    "S3 + Security Groups",
                    "S3 + NACL"
                ],
                "correctOptionIndex": 1,
                "explanation": "KMS encrypts data and CloudTrail audits access."
            },
            {
                "id": "q23",
                "prompt": "A company wants to track all API activity across accounts for compliance. Which service is BEST?",
                "options": [
                    "CloudWatch",
                    "CloudTrail",
                    "Config",
                    "Inspector"
                ],
                "correctOptionIndex": 1,
                "explanation": "CloudTrail logs all API activity."
            },
            {
                "id": "q24",
                "prompt": "Users globally access an application and require lowest latency routing. Which routing policy should be used?",
                "options": [
                    "Simple routing",
                    "Weighted routing",
                    "Latency-based routing",
                    "Failover routing"
                ],
                "correctOptionIndex": 2,
                "explanation": "Latency-based routing directs users to the closest region."
            },
            {
                "id": "q25",
                "prompt": "A company needs to coordinate multiple AWS services in a defined workflow with retries and error handling. What should be used?",
                "options": [
                    "Lambda chaining",
                    "Step Functions",
                    "SNS",
                    "SQS"
                ],
                "correctOptionIndex": 1,
                "explanation": "Step Functions manage workflows with built-in retry and error handling."
            },

            {
                "id": "q26",
                "prompt": "A company requires private, dedicated connectivity between on-premises and AWS with consistent performance. What should be used?",
                "options": [
                    "VPN",
                    "Direct Connect",
                    "Internet Gateway",
                    "NAT Gateway"
                ],
                "correctOptionIndex": 1,
                "explanation": "Direct Connect provides dedicated, consistent network performance."
            },
            {
                "id": "q27",
                "prompt": "A company needs to detect sensitive data like PII in S3 automatically. Which service is BEST?",
                "options": [
                    "GuardDuty",
                    "Macie",
                    "Inspector",
                    "Config"
                ],
                "correctOptionIndex": 1,
                "explanation": "Macie identifies sensitive data using ML."
            },
            {
                "id": "q28",
                "prompt": "A company must identify vulnerabilities in EC2 instances regularly. Which solution should be used?",
                "options": [
                    "Inspector",
                    "Shield",
                    "Macie",
                    "WAF"
                ],
                "correctOptionIndex": 0,
                "explanation": "Inspector performs vulnerability assessments."
            },
            {
                "id": "q29",
                "prompt": "A company is building a serverless REST API with minimal operational overhead. Which solution is BEST?",
                "options": [
                    "EC2 + ALB",
                    "API Gateway + Lambda",
                    "ECS",
                    "Elastic Beanstalk"
                ],
                "correctOptionIndex": 1,
                "explanation": "API Gateway + Lambda provides fully serverless APIs."
            },
            {
                "id": "q30",
                "prompt": "A distributed application needs request tracing across services. Which service should be used?",
                "options": [
                    "CloudWatch",
                    "X-Ray",
                    "CloudTrail",
                    "Config"
                ],
                "correctOptionIndex": 1,
                "explanation": "X-Ray provides distributed tracing."
            },

            {
                "id": "q31",
                "prompt": "A company wants to automatically transition S3 objects to cheaper storage over time. What should be used?",
                "options": [
                    "Versioning",
                    "Lifecycle policies",
                    "Replication",
                    "Bucket policies"
                ],
                "correctOptionIndex": 1,
                "explanation": "Lifecycle policies automate storage class transitions."
            },
            {
                "id": "q32",
                "prompt": "An application requires shared file storage across multiple EC2 instances in different AZs. Which service is BEST?",
                "options": [
                    "EBS",
                    "EFS",
                    "Instance Store",
                    "S3"
                ],
                "correctOptionIndex": 1,
                "explanation": "EFS provides shared storage across AZs."
            },
            {
                "id": "q33",
                "prompt": "A company wants continuous threat detection for AWS accounts. Which service should be used?",
                "options": [
                    "GuardDuty",
                    "Macie",
                    "Inspector",
                    "Shield"
                ],
                "correctOptionIndex": 0,
                "explanation": "GuardDuty detects threats using ML."
            },
            {
                "id": "q34",
                "prompt": "A company needs protection from common web exploits like SQL injection. Which service is BEST?",
                "options": [
                    "Shield",
                    "WAF",
                    "IAM",
                    "NACL"
                ],
                "correctOptionIndex": 1,
                "explanation": "WAF protects against web attacks."
            },
            {
                "id": "q35",
                "prompt": "A company needs real-time push notifications to millions of users. Which service should be used?",
                "options": [
                    "SNS",
                    "SQS",
                    "Lambda",
                    "Step Functions"
                ],
                "correctOptionIndex": 0,
                "explanation": "SNS supports pub/sub messaging at scale."
            },

            {
                "id": "q36",
                "prompt": "A company wants to build an event-driven architecture reacting to changes in AWS services. Which service is BEST?",
                "options": [
                    "EventBridge",
                    "CloudWatch",
                    "S3",
                    "Lambda"
                ],
                "correctOptionIndex": 0,
                "explanation": "EventBridge enables event-driven integration."
            },
            {
                "id": "q37",
                "prompt": "A company needs a fully managed ETL service for data lakes. Which service is BEST?",
                "options": [
                    "Glue",
                    "Athena",
                    "Redshift",
                    "EMR"
                ],
                "correctOptionIndex": 0,
                "explanation": "Glue is AWS’s ETL service."
            },
            {
                "id": "q38",
                "prompt": "A company processes petabytes of data using Hadoop/Spark. Which service is BEST?",
                "options": [
                    "EMR",
                    "Lambda",
                    "EC2",
                    "ECS"
                ],
                "correctOptionIndex": 0,
                "explanation": "EMR supports big data frameworks."
            },
            {
                "id": "q39",
                "prompt": "A company wants PostgreSQL with automatic backups and patching. Which service?",
                "options": [
                    "RDS",
                    "EC2",
                    "DynamoDB",
                    "Redshift"
                ],
                "correctOptionIndex": 0,
                "explanation": "RDS manages PostgreSQL."
            },
            {
                "id": "q40",
                "prompt": "A company wants analytics without managing infrastructure. Which service is BEST?",
                "options": [
                    "Redshift Serverless",
                    "RDS",
                    "EC2",
                    "EBS"
                ],
                "correctOptionIndex": 0,
                "explanation": "Redshift Serverless removes infrastructure management."
            },

            {
                "id": "q41",
                "prompt": "A company wants to restrict traffic to specific IP ranges for EC2. Which is BEST?",
                "options": [
                    "Security Groups",
                    "IAM",
                    "CloudTrail",
                    "S3 policies"
                ],
                "correctOptionIndex": 0,
                "explanation": "Security Groups control inbound/outbound IP traffic."
            },
            {
                "id": "q42",
                "prompt": "A company needs disaster recovery across regions with automatic failover. Which is BEST?",
                "options": [
                    "Route 53 health checks",
                    "CloudFront",
                    "Single-region Auto Scaling",
                    "ELB only"
                ],
                "correctOptionIndex": 0,
                "explanation": "Route 53 enables DNS failover."
            },
            {
                "id": "q43",
                "prompt": "A company needs to query application logs using SQL. Which solution is BEST?",
                "options": [
                    "CloudWatch Logs Insights",
                    "CloudTrail",
                    "Config",
                    "Inspector"
                ],
                "correctOptionIndex": 0,
                "explanation": "Logs Insights supports querying logs."
            },
            {
                "id": "q44",
                "prompt": "A company needs scheduled serverless jobs. Which solution?",
                "options": [
                    "EventBridge + Lambda",
                    "EC2 cron jobs",
                    "SQS",
                    "SNS"
                ],
                "correctOptionIndex": 0,
                "explanation": "EventBridge schedules Lambda jobs."
            },
            {
                "id": "q45",
                "prompt": "A company needs encryption keys with fine-grained control and rotation. Which service?",
                "options": [
                    "KMS",
                    "IAM",
                    "S3",
                    "CloudTrail"
                ],
                "correctOptionIndex": 0,
                "explanation": "KMS manages encryption keys securely."
            },

            {
                "id": "q46",
                "prompt": "A company processes high-throughput streaming data for analytics. Which service is BEST?",
                "options": [
                    "Kinesis",
                    "SNS",
                    "SQS",
                    "Lambda"
                ],
                "correctOptionIndex": 0,
                "explanation": "Kinesis handles real-time streaming."
            },
            {
                "id": "q47",
                "prompt": "A company needs to build, train, and deploy ML models. Which service?",
                "options": [
                    "SageMaker",
                    "Lambda",
                    "EC2",
                    "ECS"
                ],
                "correctOptionIndex": 0,
                "explanation": "SageMaker is AWS ML platform."
            },
            {
                "id": "q48",
                "prompt": "A company needs to detect objects in images. Which service?",
                "options": [
                    "Rekognition",
                    "Polly",
                    "Lex",
                    "Translate"
                ],
                "correctOptionIndex": 0,
                "explanation": "Rekognition analyzes images."
            },
            {
                "id": "q49",
                "prompt": "A company needs to convert audio to text. Which service?",
                "options": [
                    "Transcribe",
                    "Polly",
                    "Lex",
                    "Comprehend"
                ],
                "correctOptionIndex": 0,
                "explanation": "Transcribe converts speech to text."
            },
            {
                "id": "q50",
                "prompt": "A company needs sentiment analysis on customer feedback. Which service?",
                "options": [
                    "Comprehend",
                    "Lex",
                    "Polly",
                    "Translate"
                ],
                "correctOptionIndex": 0,
                "explanation": "Comprehend analyzes text sentiment."
            },

            {
                "id": "q51",
                "prompt": "A company wants to build conversational chatbots. Which service?",
                "options": [
                    "Lex",
                    "Polly",
                    "Rekognition",
                    "Comprehend"
                ],
                "correctOptionIndex": 0,
                "explanation": "Lex builds conversational bots."
            },
            {
                "id": "q52",
                "prompt": "A company wants to convert text to speech. Which service?",
                "options": [
                    "Polly",
                    "Lex",
                    "Transcribe",
                    "Rekognition"
                ],
                "correctOptionIndex": 0,
                "explanation": "Polly converts text to speech."
            },
            {
                "id": "q53",
                "prompt": "A company needs real-time language translation. Which service?",
                "options": [
                    "Translate",
                    "Comprehend",
                    "Polly",
                    "Lex"
                ],
                "correctOptionIndex": 0,
                "explanation": "Translate provides language translation."
            },
            {
                "id": "q54",
                "prompt": "A company needs to enforce configuration compliance rules. Which service?",
                "options": [
                    "Config",
                    "CloudTrail",
                    "CloudWatch",
                    "IAM"
                ],
                "correctOptionIndex": 0,
                "explanation": "AWS Config evaluates compliance."
            },
            {
                "id": "q55",
                "prompt": "A company wants automated application deployments with rollback. Which service?",
                "options": [
                    "CodeDeploy",
                    "CloudTrail",
                    "Config",
                    "IAM"
                ],
                "correctOptionIndex": 0,
                "explanation": "CodeDeploy supports automated deployments."
            },

            {
                "id": "q56",
                "prompt": "A company wants a managed CI/CD pipeline. Which service?",
                "options": [
                    "CodePipeline",
                    "CloudFormation",
                    "IAM",
                    "Config"
                ],
                "correctOptionIndex": 0,
                "explanation": "CodePipeline manages CI/CD workflows."
            },
            {
                "id": "q57",
                "prompt": "A company wants Git-based source control in AWS. Which service?",
                "options": [
                    "CodeCommit",
                    "S3",
                    "EBS",
                    "IAM"
                ],
                "correctOptionIndex": 0,
                "explanation": "CodeCommit provides Git repositories."
            },
            {
                "id": "q58",
                "prompt": "A company needs a managed artifact repository. Which service?",
                "options": [
                    "CodeArtifact",
                    "S3",
                    "EBS",
                    "IAM"
                ],
                "correctOptionIndex": 0,
                "explanation": "CodeArtifact manages dependencies."
            },
            {
                "id": "q59",
                "prompt": "A company wants zero-downtime deployments. Which strategy/service?",
                "options": [
                    "Blue/Green with CodeDeploy",
                    "Stop/start EC2",
                    "Manual deployment",
                    "S3 upload"
                ],
                "correctOptionIndex": 0,
                "explanation": "Blue/green enables zero downtime."
            },
            {
                "id": "q60",
                "prompt": "A company wants dashboards for metrics and logs. Which service?",
                "options": [
                    "CloudWatch",
                    "CloudTrail",
                    "Config",
                    "IAM"
                ],
                "correctOptionIndex": 0,
                "explanation": "CloudWatch provides dashboards."
            },

            {
                "id": "q61",
                "prompt": "A company wants to analyze AWS costs and usage trends. Which service?",
                "options": [
                    "Cost Explorer",
                    "CloudWatch",
                    "CloudTrail",
                    "Config"
                ],
                "correctOptionIndex": 0,
                "explanation": "Cost Explorer provides insights into costs."
            },
            {
                "id": "q62",
                "prompt": "A company needs alerts when budgets exceed thresholds. Which service?",
                "options": [
                    "AWS Budgets",
                    "CloudWatch",
                    "IAM",
                    "Config"
                ],
                "correctOptionIndex": 0,
                "explanation": "AWS Budgets provides alerts."
            },
            {
                "id": "q63",
                "prompt": "A company wants recommendations for cost optimization and security. Which service?",
                "options": [
                    "Trusted Advisor",
                    "CloudWatch",
                    "Config",
                    "IAM"
                ],
                "correctOptionIndex": 0,
                "explanation": "Trusted Advisor provides best practices."
            },
            {
                "id": "q64",
                "prompt": "A company wants visibility into AWS service outages affecting their resources. Which service?",
                "options": [
                    "AWS Health Dashboard",
                    "CloudWatch",
                    "CloudTrail",
                    "Config"
                ],
                "correctOptionIndex": 0,
                "explanation": "AWS Health provides service status and impact."
            },
            {
                "id": "q65",
                "prompt": "A company needs a globally resilient architecture with automatic failover across regions. Which solution is BEST?",
                "options": [
                    "Route 53 + multi-region deployment",
                    "Single region Auto Scaling",
                    "CloudFront only",
                    "ELB only"
                ],
                "correctOptionIndex": 0,
                "explanation": "Route 53 with multi-region ensures global failover."
            }
        ],
    },
    {
        id: 'exam3',
        title: 'SAA-C03 Scenario-Based Practice Set 3',
        description: 'Scenario-driven practice with multi-select questions to reflect real SAA-C03 decisions.',
        durationSeconds: 7800,
        questions: [
            {
                id: 'q1',
                prompt: 'A media company needs to store raw video uploads, transcode to multiple formats, and deliver outputs globally. Which services should be used? (Choose two.)',
                options: [
                    'Amazon S3 for storage',
                    'AWS Elemental MediaConvert for transcoding',
                    'Amazon RDS for metadata',
                    'AWS Lambda for video delivery'
                ],
                correctOptionIndexes: [0, 1],
                explanation: 'S3 stores media assets and MediaConvert handles video transcoding; the other options are not core to the media workflow.'
            },
            {
                id: 'q2',
                prompt: 'A retail application requires a highly available relational database with automatic failover and read replicas for reporting. Which services should be used? (Choose two.)',
                options: [
                    'Amazon RDS Multi-AZ',
                    'Amazon DynamoDB',
                    'Amazon Aurora read replicas',
                    'Amazon S3'
                ],
                correctOptionIndexes: [0, 2],
                explanation: 'RDS Multi-AZ provides failover and Aurora read replicas support reporting workloads.'
            },
            {
                id: 'q3',
                prompt: 'A company needs secure global content delivery for a customer portal and application-layer protection. Which services should be used? (Choose two.)',
                options: [
                    'Amazon CloudFront',
                    'AWS WAF',
                    'Amazon RDS',
                    'AWS Shield'
                ],
                correctOptionIndexes: [0, 1],
                explanation: 'CloudFront delivers content globally and WAF protects against application-layer attacks.'
            },
            {
                id: 'q4',
                prompt: 'A serverless API backend requires authorization for mobile users and automatic scaling. Which solution is best?',
                options: [
                    'API Gateway + EC2 + IAM',
                    'API Gateway + Lambda + Cognito',
                    'Application Load Balancer + Lambda',
                    'Lambda only with manual keys'
                ],
                correctOptionIndex: 1,
                explanation: 'API Gateway with Lambda and Cognito provides serverless authorization and scaling.'
            },
            {
                id: 'q5',
                prompt: 'A financial services workload requires encryption at rest, centralized auditing, and secure key management. Which services should be used? (Choose two.)',
                options: [
                    'AWS KMS',
                    'Amazon S3',
                    'AWS CloudTrail',
                    'Amazon CloudWatch'
                ],
                correctOptionIndexes: [0, 2],
                explanation: 'KMS provides key management and CloudTrail records audit logs.'
            },
            {
                id: 'q6',
                prompt: 'A logistics company needs a globally distributed key-value data store with low-latency reads and automatic replication. Which AWS service should be used?',
                options: [
                    'Amazon RDS',
                    'Amazon ElastiCache',
                    'Amazon DynamoDB Global Tables',
                    'Amazon S3'
                ],
                correctOptionIndex: 2,
                explanation: 'DynamoDB Global Tables provide low-latency, globally distributed key-value storage.'
            },
            {
                id: 'q7',
                prompt: 'A company runs a web application with unpredictable spikes in traffic. The team wants to decouple the frontend from backend processing to prevent overload. Which solution is most appropriate?',
                options: [
                    'Use Amazon SQS to buffer requests between the frontend and backend',
                    'Use Amazon RDS with read replicas to distribute load',
                    'Use AWS Direct Connect for dedicated bandwidth',
                    'Use Amazon CloudFront with Lambda@Edge'
                ],
                correctOptionIndex: 0,
                explanation: 'Amazon SQS decouples producers from consumers, allowing the backend to process at its own rate and preventing overload during traffic spikes.'
            },
            {
                id: 'q8',
                prompt: 'An e-commerce platform needs to send order confirmation emails and push notifications simultaneously after a purchase. Which architecture is best?',
                options: [
                    'Use Amazon SQS with multiple consumers polling the same queue',
                    'Use Amazon SNS to fan out messages to an SQS email queue and a mobile push endpoint',
                    'Use AWS Step Functions to chain Lambda functions sequentially',
                    'Use Amazon EventBridge with a single target Lambda'
                ],
                correctOptionIndex: 1,
                explanation: 'SNS fan-out publishes a single message to multiple subscribers (SQS queues, HTTP endpoints, mobile push) simultaneously, which is ideal for this scenario.'
            },
            {
                id: 'q9',
                prompt: 'A startup needs to host a static website with global low-latency access and minimal operational overhead. Which combination should be used? (Choose two.)',
                options: [
                    'Amazon S3 static website hosting',
                    'Amazon CloudFront distribution',
                    'Amazon EC2 with Apache',
                    'AWS Elastic Beanstalk'
                ],
                correctOptionIndexes: [0, 1],
                explanation: 'S3 static hosting stores and serves the website files, and CloudFront distributes content globally via edge locations for low latency.'
            },
            {
                id: 'q10',
                prompt: 'A company wants to migrate an on-premises Oracle database to AWS with minimal downtime and no application changes. Which service should be used?',
                options: [
                    'AWS Snowball Edge',
                    'AWS Database Migration Service (DMS)',
                    'AWS DataSync',
                    'Amazon S3 Transfer Acceleration'
                ],
                correctOptionIndex: 1,
                explanation: 'AWS DMS migrates databases to AWS with minimal downtime, supporting homogeneous and heterogeneous migrations including Oracle.'
            },
            {
                id: 'q11',
                prompt: 'A photo-sharing application stores images in S3. Images older than 30 days are rarely accessed, and images older than 1 year should be archived. Which S3 feature handles this automatically?',
                options: [
                    'S3 Versioning',
                    'S3 Replication',
                    'S3 Lifecycle policies',
                    'S3 Inventory'
                ],
                correctOptionIndex: 2,
                explanation: 'S3 Lifecycle policies automate transitioning objects between storage classes (e.g., Standard → Standard-IA → Glacier) based on age.'
            },
            {
                id: 'q12',
                prompt: 'A financial application requires that all data in transit between microservices within a VPC is encrypted. Which approach should be used?',
                options: [
                    'Enable VPC Flow Logs',
                    'Use TLS/SSL for service-to-service communication and AWS Certificate Manager for certificates',
                    'Use AWS Shield Advanced',
                    'Enable S3 server-side encryption'
                ],
                correctOptionIndex: 1,
                explanation: 'TLS/SSL encrypts data in transit between services. ACM provides free managed TLS certificates that can be deployed on load balancers and API Gateway.'
            },
            {
                id: 'q13',
                prompt: 'A company needs to restrict S3 bucket access so that only EC2 instances in a specific VPC can read objects, with no public access. Which solution achieves this?',
                options: [
                    'S3 bucket ACL set to private',
                    'S3 bucket policy using aws:SourceVpc condition key with a VPC endpoint',
                    'IAM user policy attached to EC2',
                    'S3 CORS configuration'
                ],
                correctOptionIndex: 1,
                explanation: 'A bucket policy with the aws:SourceVpc condition restricts access to requests originating from the specified VPC, used together with a VPC gateway endpoint for S3.'
            },
            {
                id: 'q14',
                prompt: 'A team needs to run containerized microservices without managing the underlying EC2 instances. Which AWS service should be used?',
                options: [
                    'Amazon ECS with EC2 launch type',
                    'Amazon ECS with Fargate launch type',
                    'AWS Elastic Beanstalk',
                    'Amazon EC2 Auto Scaling'
                ],
                correctOptionIndex: 1,
                explanation: 'ECS with Fargate is a serverless compute engine for containers — you define CPU and memory requirements and AWS manages the underlying infrastructure.'
            },
            {
                id: 'q15',
                prompt: 'A company requires a disaster recovery strategy with an RTO of less than 15 minutes and an RPO of near zero for a critical database. Which DR pattern should be implemented?',
                options: [
                    'Backup and Restore',
                    'Pilot Light',
                    'Warm Standby',
                    'Multi-Site Active/Active'
                ],
                correctOptionIndex: 3,
                explanation: 'Multi-Site Active/Active runs full workloads in multiple regions simultaneously, providing near-zero RPO and sub-minute RTO, meeting the strict requirements.'
            },
            {
                id: 'q16',
                prompt: 'A company wants to allow users to sign in with their Google or Facebook credentials to access an AWS-backed mobile application. Which service handles this?',
                options: [
                    'AWS IAM with SAML federation',
                    'Amazon Cognito User Pools with identity federation',
                    'AWS Directory Service',
                    'AWS SSO'
                ],
                correctOptionIndex: 1,
                explanation: 'Amazon Cognito User Pools support federated sign-in with social identity providers like Google and Facebook, issuing JWTs for application access.'
            },
            {
                id: 'q17',
                prompt: 'An application processes IoT sensor data arriving at 50,000 records/second and needs real-time analytics. Which service ingests this data stream?',
                options: [
                    'Amazon SQS FIFO queue',
                    'Amazon Kinesis Data Streams',
                    'Amazon SNS',
                    'Amazon MQ'
                ],
                correctOptionIndex: 1,
                explanation: 'Amazon Kinesis Data Streams is designed for real-time ingestion and processing of large-scale streaming data, such as IoT sensor streams.'
            },
            {
                id: 'q18',
                prompt: 'A solutions architect must design a VPC architecture where multiple accounts share a central network. Which AWS service enables this?',
                options: [
                    'VPC Peering',
                    'AWS Transit Gateway',
                    'AWS Direct Connect',
                    'VPN CloudHub'
                ],
                correctOptionIndex: 1,
                explanation: 'AWS Transit Gateway acts as a central hub connecting multiple VPCs and on-premises networks, simplifying large-scale network architectures across accounts.'
            },
            {
                id: 'q19',
                prompt: 'A company needs to store application secrets such as database passwords and rotate them automatically every 30 days. Which service is most appropriate?',
                options: [
                    'AWS Systems Manager Parameter Store (Standard)',
                    'AWS Secrets Manager',
                    'AWS KMS',
                    'Amazon S3 with SSE-KMS'
                ],
                correctOptionIndex: 1,
                explanation: 'AWS Secrets Manager stores secrets securely and supports automatic rotation using Lambda, making it the best choice for rotating database credentials.'
            },
            {
                id: 'q20',
                prompt: 'A web application needs to authenticate API calls and enforce throttling per client. Which AWS service combination should be used? (Choose two.)',
                options: [
                    'Amazon API Gateway with usage plans and API keys',
                    'AWS WAF rate-based rules',
                    'Amazon CloudFront with signed URLs',
                    'Application Load Balancer with sticky sessions'
                ],
                correctOptionIndexes: [0, 1],
                explanation: 'API Gateway usage plans enforce per-client throttling and quotas via API keys, while WAF rate-based rules add an additional layer of rate limiting at the edge.'
            },
            {
                id: 'q21',
                prompt: 'A company has a legacy monolithic application on-premises. They want to gradually migrate to microservices on AWS with no downtime. Which pattern is recommended?',
                options: [
                    'Lift and shift to a single large EC2 instance',
                    'Strangler Fig pattern using API Gateway to route traffic to old and new services',
                    'Rewrite the entire application before migrating',
                    'Use AWS Snowball to physically transfer the application'
                ],
                correctOptionIndex: 1,
                explanation: 'The Strangler Fig pattern incrementally replaces parts of the monolith by routing specific endpoints to new microservices via API Gateway, enabling zero-downtime migration.'
            },
            {
                id: 'q22',
                prompt: 'A company needs to analyze petabytes of data stored in S3 using standard SQL without loading it into a database. Which service should be used?',
                options: [
                    'Amazon RDS',
                    'Amazon Redshift',
                    'Amazon Athena',
                    'AWS Glue'
                ],
                correctOptionIndex: 2,
                explanation: 'Amazon Athena is a serverless query service that runs SQL directly on data stored in S3 without requiring a database setup or data loading.'
            },
            {
                id: 'q23',
                prompt: 'A company runs workloads in eu-west-1 and needs to replicate S3 objects to us-east-1 for compliance. Which feature enables this?',
                options: [
                    'S3 Multi-Region Access Points',
                    'S3 Cross-Region Replication (CRR)',
                    'S3 Transfer Acceleration',
                    'AWS DataSync'
                ],
                correctOptionIndex: 1,
                explanation: 'S3 Cross-Region Replication automatically replicates objects from a source bucket in one region to a destination bucket in a different region.'
            },
            {
                id: 'q24',
                prompt: 'An application experiences predictable daily traffic peaks between 9 AM and 6 PM. What is the most cost-effective EC2 scaling strategy?',
                options: [
                    'Always run maximum capacity instances',
                    'Use Scheduled Scaling in Auto Scaling Groups',
                    'Use Spot Instances with On-Demand fallback',
                    'Manually add instances each morning'
                ],
                correctOptionIndex: 1,
                explanation: 'Scheduled Scaling pre-emptively adds capacity before known traffic peaks, avoiding both under-provisioning and the cost of running excess instances outside peak hours.'
            },
            {
                id: 'q25',
                prompt: 'A company needs dedicated physical servers for compliance reasons but wants AWS-managed infrastructure. Which offering satisfies this?',
                options: [
                    'EC2 Dedicated Instances',
                    'EC2 Dedicated Hosts',
                    'EC2 Reserved Instances',
                    'AWS Outposts'
                ],
                correctOptionIndex: 1,
                explanation: 'EC2 Dedicated Hosts provide physical servers dedicated to a single customer, offering visibility into host hardware and supporting BYOL (Bring Your Own License) compliance requirements.'
            },
            {
                id: 'q26',
                prompt: 'A microservices application needs service discovery so services can find each other dynamically as containers scale. Which AWS service provides this?',
                options: [
                    'Amazon Route 53 Resolver',
                    'AWS Cloud Map',
                    'Amazon CloudFront',
                    'AWS Direct Connect'
                ],
                correctOptionIndex: 1,
                explanation: 'AWS Cloud Map provides service discovery for cloud resources, allowing microservices to register themselves and be discovered dynamically by other services.'
            },
            {
                id: 'q27',
                prompt: 'A data warehouse solution needs to run complex analytical queries on structured data with columnar storage. Which AWS service is best suited?',
                options: [
                    'Amazon RDS PostgreSQL',
                    'Amazon DynamoDB',
                    'Amazon Redshift',
                    'Amazon Aurora'
                ],
                correctOptionIndex: 2,
                explanation: 'Amazon Redshift is a columnar data warehouse optimized for complex analytical queries (OLAP) on large structured datasets.'
            },
            {
                id: 'q28',
                prompt: 'A company needs to enforce multi-factor authentication (MFA) for all IAM users accessing the AWS Management Console. Which mechanism enforces this?',
                options: [
                    'AWS Config rule',
                    'IAM policy with Condition: aws:MultiFactorAuthPresent: true',
                    'S3 bucket policy',
                    'CloudWatch alarm'
                ],
                correctOptionIndex: 1,
                explanation: 'An IAM policy with the condition aws:MultiFactorAuthPresent: "true" denies actions unless the user has authenticated with MFA, enforcing MFA for console access.'
            },
            {
                id: 'q29',
                prompt: 'A company wants to monitor and alert when AWS resource configurations deviate from approved baselines. Which service should be used?',
                options: [
                    'Amazon CloudWatch',
                    'AWS CloudTrail',
                    'AWS Config with Config Rules',
                    'AWS Trusted Advisor'
                ],
                correctOptionIndex: 2,
                explanation: 'AWS Config continuously monitors resource configurations and uses Config Rules to evaluate compliance against defined baselines, triggering alerts on deviations.'
            },
            {
                id: 'q30',
                prompt: 'An application needs to process messages exactly once and in strict FIFO order. Which SQS queue type should be used?',
                options: [
                    'SQS Standard Queue',
                    'SQS FIFO Queue with content-based deduplication',
                    'Amazon SNS FIFO topic',
                    'Amazon Kinesis Data Streams'
                ],
                correctOptionIndex: 1,
                explanation: 'SQS FIFO queues guarantee message ordering and exactly-once processing through deduplication IDs or content-based deduplication.'
            },
            {
                id: 'q31',
                prompt: 'A company needs to give a third-party vendor temporary access to specific AWS resources without creating IAM users. Which approach should be used?',
                options: [
                    'Create an IAM user with a time-limited password',
                    'Use IAM roles with cross-account trust and STS AssumeRole',
                    'Share root account credentials temporarily',
                    'Use AWS Organizations service control policies'
                ],
                correctOptionIndex: 1,
                explanation: 'IAM roles with cross-account trust allow third parties to assume a role in your account using STS AssumeRole, providing temporary credentials without permanent IAM users.'
            },
            {
                id: 'q32',
                prompt: 'A manufacturing company needs to run AWS services on-premises due to data residency requirements. Which solution enables this?',
                options: [
                    'AWS Local Zones',
                    'AWS Wavelength',
                    'AWS Outposts',
                    'AWS Direct Connect'
                ],
                correctOptionIndex: 2,
                explanation: 'AWS Outposts brings native AWS infrastructure, services, and tools to virtually any on-premises facility, meeting data residency requirements.'
            },
            {
                id: 'q33',
                prompt: 'A company needs to run batch processing jobs that can be interrupted and resumed, processing millions of records nightly at the lowest cost. Which EC2 purchasing option is best?',
                options: [
                    'On-Demand Instances',
                    'Reserved Instances',
                    'Spot Instances',
                    'Dedicated Hosts'
                ],
                correctOptionIndex: 2,
                explanation: 'Spot Instances offer up to 90% discount over On-Demand pricing and are ideal for interruptible batch workloads that can checkpoint and resume.'
            },
            {
                id: 'q34',
                prompt: 'A company needs to connect its on-premises data center to AWS with consistent, low-latency network performance and does not want traffic traversing the public internet. Which service should be used?',
                options: [
                    'AWS Site-to-Site VPN',
                    'AWS Direct Connect',
                    'AWS Transit Gateway',
                    'Amazon CloudFront'
                ],
                correctOptionIndex: 1,
                explanation: 'AWS Direct Connect establishes a dedicated private network connection between on-premises and AWS, bypassing the public internet for consistent low latency.'
            },
            {
                id: 'q35',
                prompt: 'A mobile application needs to cache database query results to reduce latency. The cache should automatically expire entries and support sub-millisecond reads. Which service should be used?',
                options: [
                    'Amazon RDS Read Replica',
                    'Amazon ElastiCache for Redis',
                    'Amazon S3',
                    'AWS Glue'
                ],
                correctOptionIndex: 1,
                explanation: 'ElastiCache for Redis is an in-memory cache with sub-millisecond latency, TTL-based expiration, and data structures well-suited for application caching.'
            },
            {
                id: 'q36',
                prompt: 'A company needs to build a data lake on AWS to store structured, semi-structured, and unstructured data from multiple sources. Which services should be used? (Choose two.)',
                options: [
                    'Amazon S3 as the storage layer',
                    'AWS Glue for data cataloging and ETL',
                    'Amazon RDS as the primary store',
                    'Amazon EC2 for all data processing'
                ],
                correctOptionIndexes: [0, 1],
                explanation: 'S3 is the foundation of AWS data lakes for cost-effective storage of any format, and AWS Glue provides ETL and the Data Catalog to make data discoverable and queryable.'
            },
            {
                id: 'q37',
                prompt: 'An application requires a shared file system accessible by multiple EC2 instances across Availability Zones simultaneously with POSIX compliance. Which service should be used?',
                options: [
                    'Amazon EBS Multi-Attach',
                    'Amazon S3',
                    'Amazon EFS',
                    'Amazon FSx for Windows'
                ],
                correctOptionIndex: 2,
                explanation: 'Amazon EFS is a managed NFS file system providing POSIX-compliant shared access across multiple EC2 instances in different AZs simultaneously.'
            },
            {
                id: 'q38',
                prompt: 'A solutions architect needs to ensure that an Auto Scaling group always has at least 2 instances running across 3 Availability Zones. What is the correct minimum configuration?',
                options: [
                    'Min: 1, Max: 3, Desired: 2',
                    'Min: 2, Max: 6, Desired: 3 with instances spread across 3 AZs',
                    'Min: 3, Max: 3, Desired: 3',
                    'Min: 2, Max: 2, Desired: 2 in a single AZ'
                ],
                correctOptionIndex: 1,
                explanation: 'Setting min=2 ensures at least 2 instances always run. Desired=3 spread across 3 AZs means even if one AZ fails, 2 instances remain in the other two AZs.'
            },
            {
                id: 'q39',
                prompt: 'A company needs a managed message broker that supports multiple messaging protocols including AMQP and MQTT for migrating an on-premises ActiveMQ deployment. Which service should be used?',
                options: [
                    'Amazon SQS',
                    'Amazon SNS',
                    'Amazon MQ',
                    'Amazon Kinesis'
                ],
                correctOptionIndex: 2,
                explanation: 'Amazon MQ is a managed message broker for ActiveMQ and RabbitMQ, supporting standard messaging protocols like AMQP, MQTT, and STOMP for lift-and-shift migrations.'
            },
            {
                id: 'q40',
                prompt: 'A company wants to implement a blue/green deployment for a Lambda function to gradually shift traffic and enable instant rollback. Which feature should be used?',
                options: [
                    'Lambda layers',
                    'Lambda aliases with weighted routing',
                    'Lambda reserved concurrency',
                    'Lambda environment variables'
                ],
                correctOptionIndex: 1,
                explanation: 'Lambda aliases support weighted routing, allowing traffic to be gradually shifted between function versions (e.g., 90% to v1, 10% to v2) enabling blue/green deployments with instant rollback.'
            },
            {
                id: 'q41',
                prompt: 'A company has S3 objects that must be retained for 7 years and cannot be deleted or overwritten by anyone, including the root user. Which feature enforces this?',
                options: [
                    'S3 Versioning with MFA Delete',
                    'S3 Object Lock in Compliance mode',
                    'S3 bucket policy with Deny Delete',
                    'S3 Replication with delete marker replication disabled'
                ],
                correctOptionIndex: 1,
                explanation: "S3 Object Lock in Compliance mode prevents objects from being deleted or overwritten by any user, including root, for the duration of the retention period — meeting regulatory requirements."
            },
            {
                id: 'q42',
                prompt: 'A company needs to orchestrate a multi-step order processing workflow involving Lambda functions, human approval steps, and error handling with retries. Which service should be used?',
                options: [
                    'Amazon SQS',
                    'Amazon EventBridge',
                    'AWS Step Functions',
                    'Amazon SNS'
                ],
                correctOptionIndex: 2,
                explanation: 'AWS Step Functions orchestrates multi-step workflows with built-in state management, error handling, retries, and support for human approval tasks (using a task token).'
            },
            {
                id: 'q43',
                prompt: 'A company needs to detect and remediate security threats in real time across multiple AWS accounts. Which services should be used? (Choose two.)',
                options: [
                    'Amazon GuardDuty for threat detection',
                    'AWS Security Hub for centralized findings',
                    'Amazon Inspector for network scanning only',
                    'Amazon Macie for EC2 monitoring'
                ],
                correctOptionIndexes: [0, 1],
                explanation: 'GuardDuty uses ML to detect threats from CloudTrail, VPC Flow Logs, and DNS logs. Security Hub aggregates findings from multiple security services into a centralized dashboard.'
            },
            {
                id: 'q44',
                prompt: 'A company stores sensitive PII data in S3 and needs to automatically discover, classify, and alert on it. Which service should be used?',
                options: [
                    'AWS Config',
                    'Amazon Macie',
                    'Amazon GuardDuty',
                    'AWS Shield'
                ],
                correctOptionIndex: 1,
                explanation: 'Amazon Macie uses ML to automatically discover and classify sensitive data (PII, financial data) stored in S3 and generates findings for remediation.'
            },
            {
                id: 'q45',
                prompt: 'A company needs to route traffic based on geographic location so EU users go to eu-west-1 and US users go to us-east-1. Which Route 53 routing policy should be used?',
                options: [
                    'Latency-based routing',
                    'Geolocation routing',
                    'Weighted routing',
                    'Failover routing'
                ],
                correctOptionIndex: 1,
                explanation: 'Route 53 Geolocation routing directs traffic based on the geographic location of the user, allowing region-specific routing (e.g., EU users to eu-west-1).'
            },
            {
                id: 'q46',
                prompt: 'A company needs to distribute incoming HTTP/HTTPS traffic across EC2 instances and wants path-based routing (e.g., /api to one group, /web to another). Which load balancer should be used?',
                options: [
                    'Classic Load Balancer',
                    'Network Load Balancer',
                    'Application Load Balancer',
                    'Gateway Load Balancer'
                ],
                correctOptionIndex: 2,
                explanation: 'Application Load Balancer (ALB) operates at Layer 7 and supports content-based routing including path-based, host-based, and header-based rules.'
            },
            {
                id: 'q47',
                prompt: 'A company needs to inspect and filter all traffic entering a VPC from the internet, including third-party virtual firewall appliances. Which service should be used?',
                options: [
                    'Application Load Balancer',
                    'AWS Network Firewall',
                    'AWS Gateway Load Balancer',
                    'VPC Security Groups'
                ],
                correctOptionIndex: 2,
                explanation: 'AWS Gateway Load Balancer transparently inserts third-party virtual network appliances (firewalls, IDS/IPS) into the network path for traffic inspection and filtering.'
            },
            {
                id: 'q48',
                prompt: 'A company needs a fully managed graph database to store and query relationships between millions of entities (e.g., social networks, fraud detection). Which AWS service should be used?',
                options: [
                    'Amazon DynamoDB',
                    'Amazon Neptune',
                    'Amazon RDS',
                    'Amazon DocumentDB'
                ],
                correctOptionIndex: 1,
                explanation: 'Amazon Neptune is a purpose-built managed graph database supporting Property Graph (Gremlin) and RDF (SPARQL), ideal for relationship-heavy use cases like social graphs and fraud detection.'
            },
            {
                id: 'q49',
                prompt: 'A company is migrating 200 TB of data from on-premises to S3 with a 100 Mbps internet connection. The migration must complete within 2 weeks. What is the best approach?',
                options: [
                    'Use S3 Transfer Acceleration over the existing internet connection',
                    'Use AWS Snowball Edge to physically ship data to AWS',
                    'Use AWS DataSync over Direct Connect',
                    'Upload directly using the AWS CLI multipart upload'
                ],
                correctOptionIndex: 1,
                explanation: 'At 100 Mbps, uploading 200 TB would take ~185 days. AWS Snowball Edge ships petabyte-scale data physically, completing the migration within the 2-week window.'
            },
            {
                id: 'q50',
                prompt: 'A company needs to centrally manage patching, configuration compliance, and run commands across a fleet of EC2 instances and on-premises servers. Which service should be used?',
                options: [
                    'AWS CloudFormation',
                    'AWS Systems Manager',
                    'AWS Config',
                    'Amazon Inspector'
                ],
                correctOptionIndex: 1,
                explanation: 'AWS Systems Manager provides Patch Manager, Run Command, and State Manager to centrally manage configuration and patching for EC2 and on-premises servers.'
            },
            {
                id: 'q51',
                prompt: 'An application needs a caching layer that supports complex data structures like sorted sets and pub/sub messaging in addition to key-value caching. Which ElastiCache engine should be used?',
                options: [
                    'ElastiCache for Memcached',
                    'ElastiCache for Redis',
                    'Amazon DynamoDB Accelerator (DAX)',
                    'Amazon RDS with query cache'
                ],
                correctOptionIndex: 1,
                explanation: 'ElastiCache for Redis supports rich data structures (sorted sets, hashes, lists), pub/sub messaging, persistence, and replication — features not available in Memcached.'
            },
            {
                id: 'q52',
                prompt: 'A company needs to track all API calls made to AWS services for security auditing and compliance. Which service provides this?',
                options: [
                    'Amazon CloudWatch Logs',
                    'AWS CloudTrail',
                    'VPC Flow Logs',
                    'AWS Config'
                ],
                correctOptionIndex: 1,
                explanation: 'AWS CloudTrail records all API calls made to AWS services, capturing who did what, when, and from where — essential for security auditing and compliance.'
            },
            {
                id: 'q53',
                prompt: 'A company needs to run a stateful containerized application that requires persistent storage and predictable network identities. Which Kubernetes workload type on Amazon EKS is appropriate?',
                options: [
                    'Deployment with HPA',
                    'DaemonSet',
                    'StatefulSet with EBS persistent volumes',
                    'CronJob'
                ],
                correctOptionIndex: 2,
                explanation: 'Kubernetes StatefulSets provide stable network identities and ordered pod management. Combined with EBS-backed PersistentVolumes, they support stateful containerized applications.'
            },
            {
                id: 'q54',
                prompt: 'A company wants to implement infrastructure as code to provision and manage AWS resources consistently across environments. Which AWS service should be used?',
                options: [
                    'AWS Systems Manager',
                    'AWS CloudFormation',
                    'AWS Config',
                    'Amazon EC2 Image Builder'
                ],
                correctOptionIndex: 1,
                explanation: 'AWS CloudFormation enables infrastructure as code using JSON/YAML templates to provision and manage AWS resources consistently across dev, staging, and production environments.'
            },
            {
                id: 'q55',
                prompt: 'A company needs to send application logs from EC2 instances to a centralized logging service for long-term retention and analysis. Which combination should be used? (Choose two.)',
                options: [
                    'CloudWatch Agent on EC2 instances to send logs to CloudWatch Logs',
                    'Amazon CloudWatch Logs subscription filter to stream to Amazon OpenSearch Service',
                    'VPC Flow Logs for application-level logging',
                    'AWS Config for log collection'
                ],
                correctOptionIndexes: [0, 1],
                explanation: 'The CloudWatch Agent collects and sends application logs from EC2 to CloudWatch Logs. A subscription filter then streams those logs to Amazon OpenSearch for search and visualization.'
            },
            {
                id: 'q56',
                prompt: 'A company needs to protect its web application from SQL injection and XSS attacks while also blocking traffic from specific geographic regions. Which services should be used? (Choose two.)',
                options: [
                    'AWS WAF with managed rules for SQLi and XSS',
                    'AWS WAF geographic match conditions to block countries',
                    'AWS Shield Standard',
                    'Amazon GuardDuty'
                ],
                correctOptionIndexes: [0, 1],
                explanation: 'AWS WAF managed rules protect against common web exploits like SQLi and XSS. Geographic match conditions in WAF allow blocking traffic from specific countries.'
            },
            {
                id: 'q57',
                prompt: 'A company runs an Aurora MySQL cluster. They need to scale reads for a read-heavy reporting workload without impacting the primary instance. Which feature should be used?',
                options: [
                    'Aurora Multi-Master',
                    'Aurora Auto Scaling with read replicas',
                    'RDS Proxy',
                    'DynamoDB Streams'
                ],
                correctOptionIndex: 1,
                explanation: 'Aurora supports up to 15 read replicas that share the same storage. Aurora Auto Scaling automatically adjusts the number of read replicas based on load, handling read-heavy workloads.'
            },
            {
                id: 'q58',
                prompt: 'A company needs to migrate large amounts of data continuously from on-premises NFS storage to Amazon EFS. Which service should be used?',
                options: [
                    'AWS Snowball',
                    'AWS DataSync',
                    'AWS DMS',
                    'S3 Transfer Acceleration'
                ],
                correctOptionIndex: 1,
                explanation: 'AWS DataSync automates and accelerates data transfer between on-premises storage (NFS, SMB) and AWS storage services like EFS and S3, supporting ongoing incremental transfers.'
            },
            {
                id: 'q59',
                prompt: 'A company wants to use a single domain name to route requests to the nearest AWS region for global users. Which Route 53 feature should be used?',
                options: [
                    'Geolocation routing',
                    'Latency-based routing',
                    'Geoproximity routing with Route 53 Traffic Flow',
                    'Multivalue answer routing'
                ],
                correctOptionIndex: 1,
                explanation: 'Latency-based routing directs users to the AWS region that provides the lowest network latency, delivering the best performance for globally distributed users.'
            },
            {
                id: 'q60',
                prompt: 'An event-driven application needs to trigger different Lambda functions when specific AWS service events occur (e.g., EC2 instance state changes, S3 object creation). Which service should be used?',
                options: [
                    'Amazon SQS',
                    'Amazon SNS',
                    'Amazon EventBridge',
                    'AWS Step Functions'
                ],
                correctOptionIndex: 2,
                explanation: 'Amazon EventBridge is a serverless event bus that routes events from AWS services, custom applications, and SaaS providers to Lambda and other targets based on rules.'
            },
            {
                id: 'q61',
                prompt: 'A company needs to reduce Lambda cold start latency for a latency-sensitive application. Which feature should be used?',
                options: [
                    'Lambda Layers',
                    'Lambda Provisioned Concurrency',
                    'Lambda Reserved Concurrency',
                    'Lambda@Edge'
                ],
                correctOptionIndex: 1,
                explanation: 'Lambda Provisioned Concurrency pre-initializes execution environments, eliminating cold starts and ensuring consistent low-latency responses for latency-sensitive workloads.'
            },
            {
                id: 'q62',
                prompt: 'A company needs to implement a multi-account AWS strategy with centralized governance, billing, and policy enforcement. Which AWS service provides this? (Choose two.)',
                options: [
                    'AWS Organizations',
                    'AWS Control Tower',
                    'AWS IAM Identity Center',
                    'AWS Config'
                ],
                correctOptionIndexes: [0, 1],
                explanation: 'AWS Organizations provides centralized management and policy enforcement (SCPs) across accounts. AWS Control Tower automates multi-account setup with guardrails and a landing zone.'
            },
            {
                id: 'q63',
                prompt: 'A company wants to run machine learning inference at the edge on IoT devices with intermittent connectivity. Which AWS service should be used?',
                options: [
                    'Amazon SageMaker Studio',
                    'AWS Greengrass',
                    'Amazon Rekognition',
                    'AWS IoT Core'
                ],
                correctOptionIndex: 1,
                explanation: 'AWS IoT Greengrass extends AWS to edge devices, enabling ML inference locally on devices even without cloud connectivity, using models trained in SageMaker.'
            },
            {
                id: 'q64',
                prompt: 'A company needs to implement cross-region failover for a web application. The primary region should serve traffic normally and the secondary region should only receive traffic if the primary fails. Which Route 53 routing policy should be used?',
                options: [
                    'Weighted routing with 100/0 split',
                    'Latency-based routing',
                    'Failover routing with health checks',
                    'Multivalue answer routing'
                ],
                correctOptionIndex: 2,
                explanation: 'Route 53 Failover routing uses health checks to monitor the primary endpoint and automatically routes traffic to the secondary region if the primary becomes unhealthy.'
            },
            {
                id: 'q65',
                prompt: 'A company needs to scan EC2 instances and container images for software vulnerabilities and unintended network exposure automatically. Which service should be used?',
                options: [
                    'Amazon GuardDuty',
                    'Amazon Macie',
                    'Amazon Inspector',
                    'AWS Security Hub'
                ],
                correctOptionIndex: 2,
                explanation: 'Amazon Inspector automatically scans EC2 instances and ECR container images for software vulnerabilities (CVEs) and unintended network exposure, providing risk scores and remediation guidance.'
            }
        ],
    },
    {
        "id": "exam_ec2_saa_c03",
        "title": "SAA-C03 Practice Set on EC2",
        "description": "Comprehensive EC2 exam questions covering EC2 basics, security groups, purchasing options, networking, EBS, storage, and advanced scenarios",
        "durationSeconds": 4800,
        "questions": [
            {
                "id": "q1",
                "type": "multiple",
                "prompt": "A company needs to run a high-performance computing cluster with ultra-low latency communication between instances and wants to deploy a distributed database system. Which of the following should be implemented? (Choose two.)",
                "options": [
                    "Use Cluster Placement Group to place instances in the same AZ with 10 Gbps network performance",
                    "Use Spread Placement Group to distribute instances across different hardware",
                    "Use io2 EBS volumes for database storage with multi-attach for shared access",
                    "Use Amazon EFS for shared file storage accessible from multiple AZs"
                ],
                "correctOptionIndexes": [0, 2],
                "explanation": "Cluster Placement Groups provide ultra-low latency communication (10 Gbps) needed for HPC. io2 EBS volumes with multi-attach support high-performance database clustering in the same AZ. Spread Placement Group reduces latency benefits, and EFS works across AZs but may not provide required IOPS for database workloads."
            },
            {
                "id": "q2",
                "type": "single",
                "prompt": "You are launching an EC2 instance that needs to automatically install a web server and create a custom configuration file during startup. Which of the following statements about EC2 User Data is CORRECT?",
                "options": [
                    "User Data scripts run as the ec2-user and execute only on the first boot",
                    "User Data scripts run with root privileges and execute only on the first boot",
                    "User Data scripts run with root privileges and execute every time the instance starts",
                    "User Data scripts cannot access IAM role permissions"
                ],
                "correctOptionIndex": 1,
                "explanation": "User Data scripts execute with root/administrator privileges only on the first boot of an instance. They do not run on subsequent starts unless the instance is terminated and relaunched. User Data can invoke IAM role permissions through the instance metadata service."
            },
            {
                "id": "q3",
                "type": "multiple",
                "prompt": "A development team needs to optimize costs for their testing environment while maintaining flexibility to scale when needed. Which of the following strategies should be implemented? (Choose two.)",
                "options": [
                    "Use Reserved Instances with 3-year All Upfront payment for predictable baseline load",
                    "Use Spot Instances for non-critical workloads with fault tolerance",
                    "Use On-Demand Instances for all production testing",
                    "Use Compute Savings Plans for flexible hourly cost reduction"
                ],
                "correctOptionIndexes": [1, 3],
                "explanation": "Spot Instances provide up to 90% discount for non-critical testing workloads that can handle interruptions. Compute Savings Plans offer flexible hourly discounts across instance families. Reserved Instances and On-Demand are less cost-effective for development/testing environments."
            },
            {
                "id": "q4",
                "type": "single",
                "prompt": "An EC2 instance is unable to connect to another instance on port 3306 (MySQL) in a different security group. Which security group configuration is required to allow this traffic?",
                "options": [
                    "Allow outbound traffic from the source instance's security group on port 3306",
                    "Allow inbound traffic from the source instance's security group on port 3306",
                    "Allow inbound traffic from 0.0.0.0/0 on port 3306",
                    "Allow inbound traffic from the source instance's private IP on port 3306"
                ],
                "correctOptionIndex": 1,
                "explanation": "The destination instance (MySQL server) requires an inbound rule allowing traffic from the source instance's security group on port 3306. Using a security group as the source is more flexible and maintainable than hardcoding IP addresses. Using 0.0.0.0/0 would expose the database to the internet unnecessarily."
            },
            {
                "id": "q5",
                "type": "multiple",
                "prompt": "A company experiences SSH connection timeouts when trying to access an EC2 instance. The instance has a public IP and the developer has the correct private key. Which of the following are likely causes? (Choose two.)",
                "options": [
                    "The security group doesn't allow inbound traffic on port 22 (SSH)",
                    "The private key file has incorrect permissions (not 400 or 600)",
                    "The EC2 instance is using the wrong AMI",
                    "The Network ACL blocks inbound traffic on port 22"
                ],
                "correctOptionIndexes": [0, 3],
                "explanation": "Connection timeout indicates network-level blocking: security group rules or Network ACLs blocking port 22. Private key permission errors would cause 'Permission denied' messages, not timeouts. AMI type doesn't affect SSH connectivity."
            },
            {
                "id": "q6",
                "type": "single",
                "prompt": "You need to store static website assets globally with fast delivery to users worldwide. The assets must be served directly from EC2 instances in different regions. What is the most appropriate architecture?",
                "options": [
                    "Deploy EC2 instances in each region with EBS volumes storing assets",
                    "Use Route 53 with geolocation routing to direct traffic to regional EC2 instances",
                    "Store assets in Amazon S3 with CloudFront distribution and reference from EC2 instances",
                    "Deploy a single t2.micro instance with Instance Store for global access"
                ],
                "correctOptionIndex": 2,
                "explanation": "While S3 and CloudFront are optimal, this question focuses on EC2. Route 53 geolocation routing directs traffic to EC2 instances by region, providing fast local access. EBS volumes are regional, and Instance Store doesn't provide persistence for global distribution."
            },
            {
                "id": "q7",
                "type": "multiple",
                "prompt": "Your organization requires instances optimized for different workload characteristics. Which instance types should be selected for the following scenarios? (Choose two.)",
                "options": [
                    "Use C5 instances for high-performance data processing with CPU-intensive workloads",
                    "Use R5 instances for web applications with balanced compute and networking",
                    "Use T3 instances for variable workload applications with burstable CPU",
                    "Use I3 instances for real-time analytics on large datasets"
                ],
                "correctOptionIndexes": [0, 2],
                "explanation": "C5 instances are compute-optimized for CPU-intensive tasks. T3 instances provide burstable performance for variable workloads at lower cost. R5 is memory-optimized (not general purpose), and I3 is storage-optimized (not for analytics on datasets)."
            },
            {
                "id": "q8",
                "type": "single",
                "prompt": "You need to associate a static public IP address with an EC2 instance that will be replaced in the future. What AWS resource provides this capability?",
                "options": [
                    "Public IP Address (automatically assigned)",
                    "Elastic IP Address (statically allocated)",
                    "Private IP Address (internal to VPC)",
                    "Network Interface (manages IPs)"
                ],
                "correctOptionIndex": 1,
                "explanation": "Elastic IP (EIP) is a static public IP that persists across instance replacements and can be reassociated. Public IPs change when instances stop/start. Private IPs are internal only. Network Interfaces don't directly provide this capability."
            },
            {
                "id": "q9",
                "type": "multiple",
                "prompt": "A database team needs to meet IOPS and throughput requirements for a production database. Which EBS volume types should they evaluate? (Choose two.)",
                "options": [
                    "io2 volumes for consistent high IOPS (up to 64,000) with low latency",
                    "gp3 volumes for general purpose workloads up to 16,000 IOPS",
                    "st1 volumes for high throughput optimization with up to 500 IOPS",
                    "sc1 volumes for cost-effective archival storage"
                ],
                "correctOptionIndexes": [0, 1],
                "explanation": "io2 provides highest IOPS for database workloads, gp3 offers balanced performance for general use. st1 is throughput-optimized (not IOPS), and sc1 is for cold storage archives. Database workloads require io2 or gp3."
            },
            {
                "id": "q10",
                "type": "single",
                "prompt": "You have an unencrypted EBS volume attached to a running EC2 instance. You need to encrypt this volume. What is the correct procedure?",
                "options": [
                    "Enable encryption on the volume directly using the modify command",
                    "Detach the volume and use the encrypt option to encrypt it in place",
                    "Create a snapshot of the volume, restore it as encrypted, and attach the new volume",
                    "Use AWS DataSync to migrate data to an encrypted volume"
                ],
                "correctOptionIndex": 2,
                "explanation": "EBS encryption cannot be enabled on existing volumes. The correct process: create snapshot → restore snapshot as new encrypted volume → detach original → attach new encrypted volume. Direct encryption or DataSync are not viable options for this scenario."
            },
            {
                "id": "q11",
                "type": "multiple",
                "prompt": "A company needs shared file storage accessible by multiple EC2 instances across different Availability Zones with automatic scaling. Which solutions meet these requirements? (Choose two.)",
                "options": [
                    "Use Amazon EFS (Elastic File System) with NFS protocol",
                    "Use EBS volumes with multi-attach capability across AZs",
                    "Use EBS snapshots replicated across regions",
                    "Use Amazon S3 with EC2 mounting through FUSE"
                ],
                "correctOptionIndexes": [0, 3],
                "explanation": "EFS supports multi-AZ access, automatic scaling, and NFS protocol. S3 can be mounted on EC2 using FUSE tools like s3fs. EBS multi-attach is limited to same AZ only. EBS snapshots don't provide shared storage access."
            },
            {
                "id": "q12",
                "type": "single",
                "prompt": "You have multiple applications requiring access to a shared EFS file system with different permissions and root directories. What is the best approach?",
                "options": [
                    "Create multiple IAM policies for each application user",
                    "Use EFS Access Points to enforce user identity and root directories per application",
                    "Create separate EFS volumes for each application",
                    "Use security groups to segregate application access"
                ],
                "correctOptionIndex": 1,
                "explanation": "EFS Access Points provide simplified access management with enforced user identity (UID/GID), root directory isolation, and POSIX permissions per application. This is more scalable than multiple IAM policies, separate EFS volumes, or security groups."
            },
            {
                "id": "q13",
                "type": "multiple",
                "prompt": "A company is designing storage for instances and needs to choose between persistent and ephemeral options. Which statements about storage options are correct? (Choose two.)",
                "options": [
                    "Instance Store provides ephemeral storage that is lost when the instance stops",
                    "EBS volumes persist when instances stop and restart",
                    "Instance Store is cost-effective because it's included in instance pricing",
                    "Instance Store data persists when instances are rebooted"
                ],
                "correctOptionIndexes": [0, 1],
                "explanation": "Instance Store is ephemeral—lost on stop/terminate but persists on reboot. EBS persists across stop/start cycles. Instance Store is included in pricing. Only statements about Instance Store ephemeral nature and EBS persistence are correct."
            },
            {
                "id": "q14",
                "type": "single",
                "prompt": "You have configured an EC2 instance with specific software and settings needed to support multiple identical deployments. What is the correct approach to replicate this configuration?",
                "options": [
                    "Copy the public IP address and share it with other teams",
                    "Use EC2 User Data to replicate settings on each new instance",
                    "Create an AMI (Amazon Machine Image) from the instance and launch new instances from it",
                    "Attach the root volume to multiple instances simultaneously"
                ],
                "correctOptionIndex": 2,
                "explanation": "AMI creation captures the complete instance configuration (root volume snapshot, block device mappings, settings) for consistent replication. Sharing IP addresses, User Data, or volume attachment don't provide the same consistency and management capabilities."
            },
            {
                "id": "q15",
                "type": "multiple",
                "prompt": "A company is launching a production application with 24/7 uptime requirements and predictable baseline load plus variable peak traffic. Which purchasing strategy should they implement? (Choose two.)",
                "options": [
                    "Use Reserved Instances (1-year or 3-year) for baseline capacity",
                    "Use On-Demand Instances for peak traffic",
                    "Use Spot Instances for all capacity to minimize costs",
                    "Use Spot Fleet with fallback to On-Demand for peak capacity"
                ],
                "correctOptionIndexes": [0, 3],
                "explanation": "Reserved Instances provide reliable, discounted baseline capacity. Spot Fleet with On-Demand fallback manages peak load cost-effectively. Pure Spot isn't suitable for critical production due to interruption risk. On-Demand alone for peak is expensive."
            },
            {
                "id": "q16",
                "type": "single",
                "prompt": "Which EC2 purchasing option provides the LOWEST hourly cost for a 3-year workload with consistent 24/7 capacity requirements?",
                "options": [
                    "On-Demand Instances",
                    "1-Year Reserved Instances with Partial Upfront payment",
                    "3-Year Reserved Instances with All Upfront payment",
                    "Spot Instances with diversified instance types"
                ],
                "correctOptionIndex": 2,
                "explanation": "3-Year Reserved Instances with All Upfront payment provide approximately 60-70% discount compared to On-Demand. Longer commitment and full upfront payment maximize savings. Spot instances aren't suitable for guaranteed 24/7 critical workloads."
            },
            {
                "id": "q17",
                "type": "multiple",
                "prompt": "An EC2 instance needs to securely access AWS services (S3, DynamoDB, CloudWatch). Which approaches are best practices? (Choose two.)",
                "options": [
                    "Create EC2 Instance Role with IAM policy and attach instance profile",
                    "Embed AWS Access Keys in EC2 User Data or environment variables",
                    "Use IAM user credentials stored in AWS Secrets Manager on the instance",
                    "Configure credentials through EC2 metadata service via instance role"
                ],
                "correctOptionIndexes": [0, 3],
                "explanation": "Instance roles with IAM policies are the best practice—credentials are automatically managed and rotated by AWS. Metadata service provides automatic credential delivery. Embedding keys in User Data or storing in Secrets Manager are less secure and add operational overhead."
            },
            {
                "id": "q18",
                "type": "single",
                "prompt": "You attempt to launch an EC2 instance and receive 'InsufficientInstanceCapacity' error. Which action would most likely resolve this issue?",
                "options": [
                    "Change the instance type to a larger size",
                    "Retry the launch after waiting a few minutes",
                    "Reduce the number of EBS volumes attached",
                    "All of the above are valid approaches"
                ],
                "correctOptionIndex": 3,
                "explanation": "InsufficientInstanceCapacity can be resolved by: retrying later (temporary capacity shortage), using a different instance type (may have available capacity), or changing regions/AZs. All three are valid troubleshooting approaches."
            },
            {
                "id": "q19",
                "type": "multiple",
                "prompt": "A company is designing a disaster recovery solution for EC2-based applications. Which EBS backup strategies are appropriate? (Choose two.)",
                "options": [
                    "Create an initial full EBS snapshot and then incremental snapshots for changes",
                    "Copy snapshots to another region for cross-region disaster recovery",
                    "Create a new full snapshot every hour to ensure point-in-time recovery",
                    "Use AWS Backup service with scheduled automated snapshots"
                ],
                "correctOptionIndexes": [0, 1],
                "explanation": "Incremental snapshots are cost-effective and provide point-in-time recovery. Cross-region snapshot copies enable disaster recovery. Hourly full snapshots are inefficient and expensive. AWS Backup is good but the question asks about specific EBS snapshot practices."
            },
            {
                "id": "q20",
                "type": "single",
                "prompt": "Which EBS volume configuration is required for a database that demands consistent high IOPS, multi-attach capability, and cluster failover support?",
                "options": [
                    "gp3 volume with multi-attach enabled across multiple AZs",
                    "io1 volume with multi-attach enabled in the same AZ",
                    "io2 volume with multi-attach enabled in the same AZ",
                    "st1 volume with single attachment for maximum throughput"
                ],
                "correctOptionIndex": 2,
                "explanation": "io2 volumes support up to 64,000 IOPS and multi-attach to 16 instances in the same AZ. io1 is legacy (being replaced by io2). gp3 doesn't support multi-attach. st1 isn't suitable for IOPS-intensive workloads. Same AZ requirement is critical for multi-attach."
            },
            {
                "id": "q21",
                "type": "multiple",
                "prompt": "For an EC2 cluster deployment with strict performance and availability requirements, which configurations should be implemented? (Choose two.)",
                "options": [
                    "Use Cluster Placement Group for ultra-low latency (10 Gbps) within the same AZ",
                    "Use Partition Placement Group for distributed workloads with replication",
                    "Use io2 EBS volumes with multi-attach for shared database storage",
                    "Use Spread Placement Group to minimize correlated failures"
                ],
                "correctOptionIndexes": [0, 2],
                "explanation": "Cluster Placement Groups provide ultra-low latency necessary for HPC and database clusters. io2 multi-attach enables shared database storage. Partition Placement Group is for distributed systems like Kafka/HDFS. Spread Placement Group sacrifices latency for availability."
            },
            {
                "id": "q22",
                "type": "single",
                "prompt": "A developer has a long-running initialization process on an EC2 instance that takes 2 hours to complete. To save costs, they want to pause this instance and resume later without losing the initialization state. Which feature should they use?",
                "options": [
                    "EBS snapshots to backup state periodically",
                    "EC2 hibernation to preserve RAM state on EBS",
                    "Auto Scaling scheduled actions to stop and start instances",
                    "CloudWatch alarms to trigger instance suspension"
                ],
                "correctOptionIndex": 1,
                "explanation": "EC2 Hibernation persists RAM contents to the EBS root volume, allowing instances to resume from the exact state. EBS snapshots don't preserve application state. Auto Scaling and CloudWatch can trigger stops but don't preserve state. Hibernation is purpose-built for this use case."
            },
            {
                "id": "q23",
                "type": "multiple",
                "prompt": "When comparing storage options for different EC2 workloads, which statements are accurate? (Choose two.)",
                "options": [
                    "EBS volumes provide persistent block storage with snapshot capability across AZs",
                    "Instance Store provides better durability guarantees than EBS volumes",
                    "Amazon EFS provides shared NFS access across multiple AZs simultaneously",
                    "Instance Store data is lost only on instance termination, not on reboot"
                ],
                "correctOptionIndexes": [0, 2],
                "explanation": "EBS snapshots enable cross-region/AZ replication. EFS provides multi-AZ NFS access. Instance Store durability is lower than EBS (lost on stop/terminate). Instance Store data persists on reboot but not on stop/terminate."
            },
            {
                "id": "q24",
                "type": "single",
                "prompt": "An EC2 instance needs to communicate securely with resources in another VPC. Network ACLs are set to allow traffic, but the connection still fails. What is the most likely cause?",
                "options": [
                    "The security group on the destination instance doesn't allow the traffic",
                    "The Network ACL on the source instance blocks outbound traffic",
                    "The instance doesn't have a route to the destination VPC",
                    "The destination instance has hibernation enabled"
                ],
                "correctOptionIndex": 0,
                "explanation": "Security groups are the primary filtering mechanism for instance-to-instance communication. Network ACLs are permissive in this scenario. Without a route, the connection wouldn't attempt at all. Hibernation doesn't affect connectivity. Security group rules on the destination are the likely culprit."
            },
            {
                "id": "q25",
                "type": "multiple",
                "prompt": "A company has allocated 10 Elastic IPs but only 5 are associated with running instances. Which billing and optimization strategies are correct? (Choose two.)",
                "options": [
                    "You are charged for the 5 unassociated Elastic IPs",
                    "Release unused Elastic IPs to avoid charges",
                    "Associated Elastic IPs are always charged regardless of instance state",
                    "Elastic IPs associated with stopped instances incur charges"
                ],
                "correctOptionIndexes": [0, 3],
                "explanation": "Unassociated Elastic IPs are charged (significant hourly rate). Elastic IPs associated with stopped instances are also charged. Best practice: release unused EIPs and reassociate before stopping instances. Only EIPs associated with running instances are free."
            },
            {
                "id": "q26",
                "type": "single",
                "prompt": "You need to attach a network interface from a failed EC2 instance to a healthy instance for failover. Which requirement must be met?",
                "options": [
                    "Both instances must be in the same region",
                    "Both instances must be in the same Availability Zone",
                    "Both instances must be in the same VPC and subnet",
                    "Both instances must have the same security group"
                ],
                "correctOptionIndex": 2,
                "explanation": "ENIs can only be attached to instances in the same VPC and subnet. Since subnets map to AZs, same-subnet implies same-AZ. Region is broader; security group doesn't need to match. The VPC and subnet requirement is fundamental for ENI attachment."
            },
            {
                "id": "q27",
                "type": "multiple",
                "prompt": "A security audit reveals that EC2 instances need enhanced monitoring for compliance. Which monitoring and logging solutions should be implemented? (Choose two.)",
                "options": [
                    "CloudWatch Detailed Monitoring for enhanced metrics at 1-minute intervals",
                    "VPC Flow Logs to capture network traffic information",
                    "EC2 Instance Connect for direct terminal access logging",
                    "AWS Systems Manager Session Manager for audit trail logging"
                ],
                "correctOptionIndexes": [0, 1],
                "explanation": "CloudWatch Detailed Monitoring provides granular metrics. VPC Flow Logs capture network-level data for compliance. Instance Connect and Session Manager are access tools but not primary monitoring solutions. For compliance auditing, monitoring and logging are essential."
            },
            {
                "id": "q28",
                "type": "single",
                "prompt": "You have a security group rule that explicitly denies TCP port 443 from 10.0.0.0/8, but another rule allows TCP port 443 from 0.0.0.0/0. What happens to traffic from 10.0.0.1 on port 443?",
                "options": [
                    "Traffic is denied (deny rules take precedence)",
                    "Traffic is allowed (allow rules take precedence)",
                    "Traffic is blocked (deny rules are evaluated first)",
                    "Traffic is allowed (deny rules don't exist in security groups)"
                ],
                "correctOptionIndex": 3,
                "explanation": "Security groups don't support explicit deny rules—they are whitelist-based (allow-only). All traffic is implicitly denied unless explicitly allowed. The mentioned 'deny' rule would not function. For explicit deny, use Network ACLs. Traffic would be allowed by the 0.0.0.0/0 rule."
            },
            {
                "id": "q29",
                "type": "multiple",
                "prompt": "When designing a resilient EC2 deployment across multiple Availability Zones, which strategies should be employed? (Choose two.)",
                "options": [
                    "Use Auto Scaling Groups spanning multiple AZs with a desired capacity of 3+",
                    "Use Cluster Placement Groups to ensure instances stay in the same AZ",
                    "Use Network Load Balancer with health checks to distribute traffic",
                    "Use Spread Placement Group with maximum of 7 instances per AZ"
                ],
                "correctOptionIndexes": [0, 2],
                "explanation": "Auto Scaling Groups across multiple AZs provide automatic failover and instance replacement. NLB with health checks distributes traffic and detects failures. Cluster Placement Groups constrain to single AZ (reduces availability). Spread Placement Group limits scale."
            },
            {
                "id": "q30",
                "type": "single",
                "prompt": "A newly created AWS account launches its first EC2 instance. In which network environment will it be placed by default?",
                "options": [
                    "EC2-Classic (legacy shared environment)",
                    "Default VPC (Virtual Private Cloud)",
                    "Custom VPC (must be created first)",
                    "No network (standalone instance)"
                ],
                "correctOptionIndex": 1,
                "explanation": "All new AWS accounts default to VPC (Virtual Private Cloud) with a default VPC pre-created. EC2-Classic is legacy and no longer available for new accounts. A custom VPC is optional. Every instance requires a VPC and subnet."
            },
            {
                "id": "q31",
                "type": "multiple",
                "prompt": "A company requires EC2 instances for variable workloads with burstable performance and cost optimization. Which instance type characteristics should be selected? (Choose two.)",
                "options": [
                    "T3/T3a instances with accumulating CPU credits during idle periods",
                    "Use 'Unlimited' mode to allow sustained high performance beyond baseline",
                    "M5 instances for consistent general-purpose performance",
                    "Monitor CPU credit balance to understand burst capacity availability"
                ],
                "correctOptionIndexes": [0, 3],
                "explanation": "T3/T3a are burstable instances accumulating credits during idle periods for future burst usage. Monitoring credit balance is essential for capacity planning. Unlimited mode allows better performance but at higher cost. M5 is consistent, not burstable—doesn't match variable workload requirement."
            },
            {
                "id": "q32",
                "type": "single",
                "prompt": "Which EFS performance mode should be selected for a highly parallelized big data workload requiring high levels of aggregate throughput with acceptable latency trade-offs?",
                "options": [
                    "General Purpose mode (default, lowest latency)",
                    "Max IO mode (higher aggregate throughput)",
                    "Provisioned Throughput mode (fixed performance)",
                    "Bursting Throughput mode (variable performance)"
                ],
                "correctOptionIndex": 1,
                "explanation": "Max IO performance mode is optimized for highly parallelized workloads requiring high aggregate throughput, accepting slightly higher latencies. General Purpose is for most workloads with lower latency. Throughput modes (Provisioned/Bursting) are separate from performance modes."
            },
            {
                "id": "q33",
                "type": "multiple",
                "prompt": "A production application requires highly available EC2 instances with automatic recovery from failures. Which AWS services and configurations should be implemented? (Choose two.)",
                "options": [
                    "EC2 Auto Recovery to restart failed instances automatically",
                    "CloudWatch alarms triggering EC2 Instance Recovery actions",
                    "Auto Scaling Groups with minimum 1 instance for automatic replacement",
                    "EBS Snapshots for automatic recovery on instance failure"
                ],
                "correctOptionIndexes": [0, 1],
                "explanation": "EC2 Instance Recovery restarts failed instances on the same hardware. CloudWatch alarms can trigger recovery actions. Auto Scaling with minimum 1 replaces instances in different hardware (better for AZ failures). EBS snapshots enable manual recovery, not automatic."
            },
            {
                "id": "q34",
                "type": "single",
                "prompt": "You need to create a custom Linux AMI for organization-wide deployments. Which approach ensures the AMI remains up-to-date and follows security best practices?",
                "options": [
                    "Manually configure an instance, create an AMI once, and use it for all deployments",
                    "Use EC2 Image Builder to automate AMI creation with automated testing and patching",
                    "Create an AMI with hardcoded IAM credentials for convenience",
                    "Use the most recent Amazon Linux AMI without customization"
                ],
                "correctOptionIndex": 1,
                "explanation": "EC2 Image Builder automates AMI creation with version control, testing, and compliance scanning. Manual creation is error-prone and outdated quickly. Hardcoding credentials is a security risk. Unmodified AMIs don't meet custom requirements."
            },
            {
                "id": "q35",
                "type": "multiple",
                "prompt": "When managing costs for variable EC2 workloads across different instance families, which strategies reduce expenses? (Choose two.)",
                "options": [
                    "Use Compute Savings Plans for flexible discounts across instance families and regions",
                    "Use Convertible Reserved Instances to switch instance families within commitment",
                    "Use Scheduled Actions to stop all instances during off-peak hours",
                    "Use Spot Instances with Spot Fleet for automatic fallback to On-Demand"
                ],
                "correctOptionIndexes": [0, 1],
                "explanation": "Compute Savings Plans offer flexibility across instance types/families (~20-25% discount). Convertible RIs allow changing instance families (25-35% discount). Scheduled Actions waste capacity. Spot Fleet provides cost savings with availability fallback."
            },
            {
                "id": "q36",
                "type": "single",
                "prompt": "An EC2 instance requires multiple network interfaces with different MAC addresses for licensing compliance. How many network interfaces can a typical m5.large instance support?",
                "options": [
                    "1 (primary only)",
                    "4 (primary plus 3 secondary)",
                    "8 (primary plus 7 secondary)",
                    "12 (primary plus 11 secondary)"
                ],
                "correctOptionIndex": 3,
                "explanation": "m5.large instances support 12 Elastic Network Interfaces total. Each ENI has a unique MAC address, meeting licensing compliance requirements. ENI count varies by instance type; larger instances support more ENIs."
            },
            {
                "id": "q37",
                "type": "multiple",
                "prompt": "A disaster recovery plan requires RTO (Recovery Time Objective) of 5 minutes and RPO (Recovery Point Objective) of 1 hour. Which backup and recovery strategies meet these requirements? (Choose two.)",
                "options": [
                    "Use EBS Snapshots every 1 hour with EC2 Instance Recovery for automatic restart",
                    "Use AWS Backup with hourly snapshots and AMI backup for quick launch",
                    "Use EC2 Hibernation with EBS snapshots captured hourly",
                    "Keep warm standby instances in different AZ with synchronized data"
                ],
                "correctOptionIndexes": [0, 3],
                "explanation": "Hourly EBS snapshots meet RPO of 1 hour; Instance Recovery achieves RTO of 5 minutes. Warm standby instances with data replication provide fastest recovery (RTO minutes, RPO seconds). AWS Backup and Hibernation don't meet the tight RTO/RPO requirements."
            },
            {
                "id": "q38",
                "type": "single",
                "prompt": "You need to migrate an EC2 instance from us-east-1 to eu-west-1 region while preserving configurations, data, and security settings. What is the recommended approach?",
                "options": [
                    "Manually recreate the instance in the new region using documentation",
                    "Use AWS Database Migration Service (DMS) for instance migration",
                    "Create an AMI from the source instance and copy it to the target region",
                    "Use AWS Snowball to transfer instance data to the new region"
                ],
                "correctOptionIndex": 2,
                "explanation": "Creating an AMI and copying it to the target region preserves all configurations, block device mappings, and settings. DMS is for databases. Manual recreation is error-prone. Snowball is for large-scale data transfer, not instance migration."
            },
            {
                "id": "q39",
                "type": "multiple",
                "prompt": "A financial institution requires audit trails for all EC2 access and modifications. Which logging and monitoring solutions should be enabled? (Choose two.)",
                "options": [
                    "AWS CloudTrail to log all EC2 API calls and modifications",
                    "VPC Flow Logs to capture network traffic for each instance",
                    "CloudWatch Logs for application-level logging within instances",
                    "SSH session recording to capture terminal commands"
                ],
                "correctOptionIndexes": [0, 1],
                "explanation": "CloudTrail logs all API actions (start, stop, terminate, modify). VPC Flow Logs capture network-level data. CloudWatch Logs are for application data. SSH session recording isn't built-in (requires additional tools like Session Manager)."
            },
            {
                "id": "q40",
                "type": "single",
                "prompt": "You need to allocate 1000 IOPS for an EBS volume. Which volume type provides this IOPS at the lowest cost?",
                "options": [
                    "io2 volume (64,000 IOPS maximum)",
                    "io1 volume (64,000 IOPS maximum)",
                    "gp3 volume (16,000 IOPS maximum)",
                    "st1 volume (500 IOPS maximum)"
                ],
                "correctOptionIndex": 2,
                "explanation": "gp3 provides up to 16,000 IOPS at lower cost than io1/io2. Since 1000 IOPS < 16,000, gp3 is both capable and cost-effective. io1/io2 are more expensive for lower IOPS requirements. st1 doesn't provide sufficient IOPS."
            }
        ]
    },
    {
        "id": "exam_ha_scalability_saa_c03",
        "title": "SAA-C03 Practice Set on High Availability and Scalability",
        "description": "Comprehensive exam questions covering Elastic Load Balancing (ALB, NLB, GWLB), Auto Scaling Groups, SSL/TLS, sticky sessions, cross-zone load balancing, and connection draining",
        "durationSeconds": 4800,
        "questions": [
            {
                "id": "q1",
                "type": "multiple",
                "prompt": "A company needs to distribute traffic across EC2 instances for a web application that uses WebSocket connections requiring long-lived TCP connections. Which load balancer type(s) should be considered? (Choose two.)",
                "options": [
                    "Application Load Balancer (ALB) with WebSocket support",
                    "Network Load Balancer (NLB) for ultra-high performance TCP connections",
                    "Classic Load Balancer (ELB) for backward compatibility",
                    "Gateway Load Balancer (GWLB) for appliance traffic"
                ],
                "correctOptionIndexes": [0, 1],
                "explanation": "ALB supports WebSocket and long-lived connections with application-layer routing. NLB handles extreme performance and low latency for long-lived TCP connections. Classic ELB is legacy and shouldn't be chosen for new deployments. GWLB is for 3rd-party appliances, not web traffic distribution."
            },
            {
                "id": "q2",
                "type": "single",
                "prompt": "You have an Application Load Balancer distributing traffic to EC2 instances in multiple Availability Zones. Which type of routing would you use to direct requests to a microservice based on the URL path?",
                "options": [
                    "Host-based routing to different target groups",
                    "Path-based routing to different target groups",
                    "Port-based routing to different target groups",
                    "IP-based routing to different instances"
                ],
                "correctOptionIndex": 1,
                "explanation": "Path-based routing allows ALB to direct requests to different target groups based on URL path patterns (e.g., /api/* to API servers, /images/* to image servers). Host-based routing uses domain names, port-based uses TCP ports, and IP-based isn't a native ALB feature."
            },
            {
                "id": "q3",
                "type": "multiple",
                "prompt": "A financial services company requires ultra-low latency and extreme throughput for real-time trading applications. Which load balancer configuration should be implemented? (Choose two.)",
                "options": [
                    "Network Load Balancer (NLB) operating at Layer 4",
                    "NLB with ultra-high performance (up to 100 Gbps throughput)",
                    "Application Load Balancer for content-based routing",
                    "NLB with enabled cross-zone load balancing for AZ distribution"
                ],
                "correctOptionIndexes": [0, 1],
                "explanation": "NLB at Layer 4 provides extreme performance with millions of requests per second and sub-millisecond latency, supporting up to 100 Gbps throughput. ALB operates at Layer 7 and has higher latency. Cross-zone adds latency for this use case (better to stay in single AZ for true ultra-low latency)."
            },
            {
                "id": "q4",
                "type": "single",
                "prompt": "Your e-commerce application uses an Application Load Balancer with sticky sessions enabled. A user fills their shopping cart and then their request is routed to a different EC2 instance. What is the likely cause?",
                "options": [
                    "Sticky sessions are misconfigured",
                    "The target instance was deregistered from the target group",
                    "Cross-zone load balancing is enabled",
                    "The duration cookie expired"
                ],
                "correctOptionIndex": 3,
                "explanation": "Sticky sessions use duration-based cookies that expire. When a cookie expires, the next request routes to any available target. Deregistration would show health check failures. Cross-zone doesn't override sticky sessions. Misconfiguration would prevent sticky sessions entirely."
            },
            {
                "id": "q5",
                "type": "multiple",
                "prompt": "A company wants to minimize latency for users in specific AWS regions while distributing load within each region. Which load balancing strategies should be implemented? (Choose two.)",
                "options": [
                    "Enable cross-zone load balancing on ALB for even distribution across AZs",
                    "Disable cross-zone load balancing to keep traffic in the primary AZ",
                    "Use Route 53 with geolocation routing to direct users to regional load balancers",
                    "Use a single NLB across multiple regions for centralized management"
                ],
                "correctOptionIndexes": [1, 2],
                "explanation": "Disabling cross-zone load balancing keeps traffic local to the primary AZ, reducing latency. Route 53 geolocation routing directs users to regional load balancers based on geography. Enabling cross-zone adds inter-AZ latency. Single NLB across regions adds significant latency."
            },
            {
                "id": "q6",
                "type": "single",
                "prompt": "You need to implement SSL/TLS termination on an Application Load Balancer for HTTPS traffic. Where should the SSL certificate be stored?",
                "options": [
                    "Stored on each EC2 instance backend",
                    "Stored in AWS Certificate Manager (ACM) and referenced by the ALB",
                    "Embedded in the ALB configuration file",
                    "Stored in an S3 bucket and referenced by the ALB"
                ],
                "correctOptionIndex": 1,
                "explanation": "AWS Certificate Manager (ACM) is the recommended way to store SSL certificates for load balancers. ACM handles certificate renewal automatically and integrates natively with ALB/NLB. Storing certificates on instances bypasses the LB encryption benefits. S3 and configuration files are insecure."
            },
            {
                "id": "q7",
                "type": "multiple",
                "prompt": "An Application Load Balancer is receiving HTTPS traffic on port 443 and needs to terminate SSL/TLS connections. Which configurations are required? (Choose two.)",
                "options": [
                    "Create a listener on port 443 with HTTPS protocol",
                    "Associate an SSL certificate from AWS Certificate Manager (ACM)",
                    "Configure each backend EC2 instance with identical SSL certificates",
                    "Add security group rule allowing inbound on port 443"
                ],
                "correctOptionIndexes": [0, 1],
                "explanation": "ALB listener on port 443 with HTTPS and ACM certificate enables SSL termination. Backend instances don't need SSL certificates (traffic from ALB to backends can be HTTP). Security group rules are needed but don't configure SSL itself."
            },
            {
                "id": "q8",
                "type": "single",
                "prompt": "You're configuring connection draining on a load balancer before performing maintenance on EC2 instances. What does connection draining accomplish?",
                "options": [
                    "It closes all existing connections immediately",
                    "It allows existing connections to complete while preventing new connections",
                    "It stops the load balancer from accepting any traffic",
                    "It removes the instance from the target group permanently"
                ],
                "correctOptionIndex": 1,
                "explanation": "Connection draining (also called deregistration delay) allows existing connections to complete gracefully while the load balancer stops routing new requests to the draining instance. It doesn't close connections immediately, stop the LB entirely, or permanently deregister the instance."
            },
            {
                "id": "q9",
                "type": "multiple",
                "prompt": "A company's Auto Scaling Group needs to scale based on application demand while maintaining cost efficiency. Which scaling policies should be configured? (Choose two.)",
                "options": [
                    "Target Tracking Scaling Policy to maintain a specific CloudWatch metric (e.g., CPU at 70%)",
                    "Step Scaling Policy with different actions for different metric ranges",
                    "Scheduled Scaling to scale instances at fixed times regardless of demand",
                    "Predictive Scaling using machine learning to forecast demand"
                ],
                "correctOptionIndexes": [0, 1],
                "explanation": "Target Tracking automatically scales to maintain a target metric value (simplest method). Step Scaling provides fine-grained control with different actions per metric threshold. Scheduled Scaling is for known patterns (not dynamic demand). Predictive Scaling uses ML but requires historical data."
            },
            {
                "id": "q10",
                "type": "single",
                "prompt": "You have an Auto Scaling Group with 2 instances in us-east-1a and 3 instances in us-east-1b. A scale-down event occurs. Which AZ will have an instance terminated?",
                "options": [
                    "us-east-1a (to rebalance toward equal distribution)",
                    "us-east-1b (to terminate from the largest AZ)",
                    "The AZ with the newest instances will have one terminated",
                    "The termination policy determines which AZ, but typically the one with most instances"
                ],
                "correctOptionIndex": 3,
                "explanation": "Auto Scaling Group termination policies determine which instance to terminate. Default policy terminates from the AZ with the most instances (us-east-1b with 3). This helps maintain balanced distribution across AZs while scaling down."
            },
            {
                "id": "q11",
                "type": "multiple",
                "prompt": "An Application Load Balancer needs to distribute traffic based on multiple criteria (path, hostname, and HTTP headers). Which routing methods support this? (Choose two.)",
                "options": [
                    "Host-based routing using different domain names",
                    "Path-based routing using URL patterns",
                    "Header-based routing using HTTP header values",
                    "Session-based routing using sticky sessions only"
                ],
                "correctOptionIndexes": [0, 1],
                "explanation": "ALB supports host-based (domain name) and path-based (URL) routing natively. Header-based and query parameter-based routing are also supported but not both mentioned. Session-based (sticky) is for maintaining affinity, not initial routing."
            },
            {
                "id": "q12",
                "type": "single",
                "prompt": "You need to monitor the health of targets in an Application Load Balancer. An instance fails the health check. What happens to traffic destined for that instance?",
                "options": [
                    "Traffic is still routed to the unhealthy instance",
                    "The load balancer stops routing new requests and drains connections",
                    "The load balancer immediately terminates all connections",
                    "The instance is automatically removed from the target group"
                ],
                "correctOptionIndex": 1,
                "explanation": "When an instance fails a health check, the load balancer marks it as unhealthy and stops routing NEW requests to it. Existing connections may continue briefly (depending on draining settings). The instance isn't automatically removed, and existing connections are drained gracefully."
            },
            {
                "id": "q13",
                "type": "multiple",
                "prompt": "A company is deploying a multi-tier application with different load balancing requirements per tier. Which load balancer types are best suited for different scenarios? (Choose two.)",
                "options": [
                    "Network Load Balancer (NLB) for web tier with extreme performance requirements",
                    "Application Load Balancer (ALB) for API tier with path-based routing to microservices",
                    "Gateway Load Balancer (GWLB) for database tier traffic distribution",
                    "Classic Load Balancer (CLB) for legacy application compatibility"
                ],
                "correctOptionIndexes": [0, 1],
                "explanation": "NLB is ideal for web tier needing extreme performance. ALB is perfect for API tier with content-based routing. GWLB is for 3rd-party appliances (security, analytics), not database traffic. CLB is legacy and shouldn't be chosen for new deployments."
            },
            {
                "id": "q14",
                "type": "single",
                "prompt": "An Application Load Balancer has cross-zone load balancing enabled and 2 AZs with different numbers of instances (AZ1: 5 instances, AZ2: 1 instance). How is traffic distributed?",
                "options": [
                    "80% to AZ1, 20% to AZ2 (proportional to instance count)",
                    "50% to AZ1, 50% to AZ2 (equal per AZ)",
                    "100% to AZ1 (concentrates on largest AZ)",
                    "Traffic is distributed only within each AZ separately"
                ],
                "correctOptionIndex": 1,
                "explanation": "With cross-zone load balancing enabled, the load balancer distributes traffic equally across AZs (50/50), not proportional to instance count. Within each AZ, traffic is then distributed to targets. This ensures even load distribution regardless of capacity differences."
            },
            {
                "id": "q15",
                "type": "multiple",
                "prompt": "A company wants to implement high availability for a stateless web application across multiple AZs. Which components should be configured together? (Choose two.)",
                "options": [
                    "Application Load Balancer with listeners and target groups across multiple AZs",
                    "Auto Scaling Group with minimum size of at least 2 instances in different AZs",
                    "Network Load Balancer instead of ALB for better availability",
                    "Multi-AZ RDS database to persist session data"
                ],
                "correctOptionIndexes": [0, 1],
                "explanation": "ALB across AZs with ASG spanning multiple AZs provides high availability for stateless applications. NLB isn't better than ALB for this purpose. Multi-AZ RDS is for database HA, not application HA (and the app is stateless)."
            },
            {
                "id": "q16",
                "type": "single",
                "prompt": "You configure sticky sessions on an Application Load Balancer with a duration of 1 day. After 12 hours, a user gets routed to a different instance. Why?",
                "options": [
                    "The sticky session duration expired",
                    "The target instance was deregistered",
                    "The user's browser cleared cookies",
                    "ALB lost the session mapping"
                ],
                "correctOptionIndex": 2,
                "explanation": "A 1-day duration cookie would persist, but if the user's browser clears cookies (or uses incognito/private mode), the sticky session cookie is lost. The next request routes to any available target. Cookie expiration wouldn't occur at 12 hours with a 1-day duration."
            },
            {
                "id": "q17",
                "type": "multiple",
                "prompt": "An organization needs to protect backend servers from direct internet access while using a load balancer. Which security configurations should be implemented? (Choose two.)",
                "options": [
                    "Create security group for load balancer allowing inbound on port 80/443",
                    "Create security group for backend instances allowing inbound from load balancer's security group",
                    "Configure backend instances with public IP addresses for direct access",
                    "Use security group rules referencing the load balancer security group in the backend rules"
                ],
                "correctOptionIndexes": [0, 3],
                "explanation": "LB security group allows internet traffic on 80/443. Backend security group allows inbound only from LB security group (using SG reference, not IP). Backend instances shouldn't have public IPs if LB is the only entry point. This is the standard architecture for security."
            },
            {
                "id": "q18",
                "type": "single",
                "prompt": "You need to scale an Auto Scaling Group based on a custom CloudWatch metric (requests per second) instead of built-in metrics. Which scaling policy type should be used?",
                "options": [
                    "Simple Scaling Policy",
                    "Step Scaling Policy with custom CloudWatch alarms",
                    "Target Tracking Scaling Policy with a custom metric",
                    "Scheduled Scaling Policy"
                ],
                "correctOptionIndex": 2,
                "explanation": "Target Tracking Scaling Policy supports custom CloudWatch metrics in addition to built-in metrics (CPU, ALB request count). It automatically creates CloudWatch alarms and scales to maintain the target value. Simple/Step require manual alarm setup. Scheduled is time-based, not metric-based."
            },
            {
                "id": "q19",
                "type": "multiple",
                "prompt": "An Application Load Balancer is deployed across 3 AZs with instances in each AZ. Which high availability benefits are realized? (Choose two.)",
                "options": [
                    "If one AZ becomes unavailable, traffic is automatically routed to instances in remaining AZs",
                    "The load balancer itself is highly available and resilient to AZ failures",
                    "Instances in the failed AZ are automatically replaced by the load balancer",
                    "Traffic is distributed within each AZ even if instances fail health checks"
                ],
                "correctOptionIndexes": [0, 1],
                "explanation": "Multi-AZ ALB provides: automatic failover to remaining AZs, and the ALB service itself is managed and HA by AWS. Auto Scaling Groups (not LB) replace failed instances. Health checks already exclude unhealthy instances regardless of AZ."
            },
            {
                "id": "q20",
                "type": "single",
                "prompt": "A Gateway Load Balancer (GWLB) is deployed to distribute traffic through third-party virtual appliances. What is the primary use case?",
                "options": [
                    "Distributing web application traffic across EC2 instances",
                    "Load balancing database traffic for high performance",
                    "Distributing traffic through security appliances (firewalls, IDS/IPS) for inspection",
                    "Scaling microservices based on HTTP routes"
                ],
                "correctOptionIndex": 2,
                "explanation": "GWLB is designed to distribute traffic through chains of 3rd-party virtual appliances (firewalls, DPI, analytics) using the GENEVE protocol. It's for appliance traffic distribution, not web/database/microservice scenarios."
            },
            {
                "id": "q21",
                "type": "multiple",
                "prompt": "A company is configuring Auto Scaling Groups for both peak and off-peak capacity planning. Which strategies should be implemented? (Choose two.)",
                "options": [
                    "Scheduled Scaling to increase capacity before peak hours and decrease after peak",
                    "Target Tracking Scaling to automatically adjust capacity based on demand metrics",
                    "Step Scaling to handle sudden traffic spikes with quick response",
                    "Manual Scaling to give operators full control over capacity"
                ],
                "correctOptionIndexes": [0, 1],
                "explanation": "Scheduled Scaling handles known patterns (peak/off-peak times). Target Tracking provides automatic adjustment based on metrics. Step Scaling is good for handling sudden spikes with graduated responses. Manual scaling is operator-dependent and not suitable for automated planning."
            },
            {
                "id": "q22",
                "type": "single",
                "prompt": "An Auto Scaling Group has a desired capacity of 5, minimum of 2, and maximum of 10. A scale-out event tries to launch 8 instances. How many instances will be launched?",
                "options": [
                    "8 instances (requested amount)",
                    "5 instances (to reach desired capacity)",
                    "3 instances (to reach maximum of 10)",
                    "0 instances (already at desired capacity)"
                ],
                "correctOptionIndex": 2,
                "explanation": "ASG will launch only 5 instances (from current desired of 5 to maximum of 10), not 8. The maximum capacity limit acts as a hard cap. The ASG already has 5 instances at desired capacity, so only 5 more can be added to reach the max of 10."
            },
            {
                "id": "q23",
                "type": "multiple",
                "prompt": "A company needs SSL/TLS encryption between the load balancer and backend EC2 instances. Which configurations are required? (Choose two.)",
                "options": [
                    "Configure ALB listener with HTTPS and install certificate on ALB",
                    "Configure target group with HTTPS protocol for backend communication",
                    "Install SSL certificate on each backend EC2 instance",
                    "Use ALB with HTTPS listener and configure security groups for port 443"
                ],
                "correctOptionIndexes": [0, 2],
                "explanation": "ALB needs HTTPS listener with certificate for client-facing encryption. Each backend instance needs SSL certificate for end-to-end encryption (optional but recommended). Target group protocol would be HTTPS if you want encrypted backend traffic. Security groups allow the traffic."
            },
            {
                "id": "q24",
                "type": "single",
                "prompt": "Your Application Load Balancer is showing increased latency when distributed across multiple AZs with cross-zone load balancing enabled. What optimization should be considered?",
                "options": [
                    "Disable cross-zone load balancing to keep traffic in primary AZ",
                    "Increase the number of instances in secondary AZs",
                    "Switch to Network Load Balancer for lower latency",
                    "Enable sticky sessions to reduce routing overhead"
                ],
                "correctOptionIndex": 0,
                "explanation": "Cross-zone load balancing adds inter-AZ latency. Disabling it keeps traffic within the primary AZ for lowest latency. Increasing instances doesn't reduce latency. NLB doesn't inherently have lower latency for ALB-type workloads. Sticky sessions don't reduce baseline latency."
            },
            {
                "id": "q25",
                "type": "multiple",
                "prompt": "An organization is implementing a blue-green deployment strategy with load balancers. Which features support this approach? (Choose two.)",
                "options": [
                    "ALB can route traffic between two different target groups (blue and green environments)",
                    "Connection draining allows graceful traffic shift from old to new environments",
                    "Sticky sessions ensure users stay on their original environment during transition",
                    "Auto Scaling Groups can create parallel capacity for both environments"
                ],
                "correctOptionIndexes": [0, 1],
                "explanation": "ALB routing can direct traffic to different target groups (blue/green). Connection draining gracefully shifts existing connections during switchover. Sticky sessions aren't necessary (could even hinder the strategy). ASG can support both environments but isn't specific to blue-green."
            },
            {
                "id": "q26",
                "type": "single",
                "prompt": "You need to ensure that a user's requests always go to the same EC2 instance for session continuity. Which load balancer feature enables this?",
                "options": [
                    "Health check configuration",
                    "Sticky sessions (session affinity)",
                    "Cross-zone load balancing",
                    "Connection draining"
                ],
                "correctOptionIndex": 1,
                "explanation": "Sticky sessions use cookies to ensure requests from the same user route to the same target. Health checks determine instance availability. Cross-zone affects traffic distribution across AZs. Connection draining handles graceful shutdown."
            },
            {
                "id": "q27",
                "type": "multiple",
                "prompt": "An Auto Scaling Group needs to replace instances that fail health checks automatically. Which components should be configured? (Choose two.)",
                "options": [
                    "Configure health check type (EC2 or ELB) in the ASG",
                    "Set health check grace period to allow instances time to initialize",
                    "Configure load balancer health checks with appropriate interval and threshold",
                    "Manually trigger instance replacement when health checks fail"
                ],
                "correctOptionIndexes": [0, 1],
                "explanation": "ASG health check type determines if it uses EC2 health checks or ELB health checks. Health check grace period prevents premature replacement of initializing instances. LB health checks are also important. Manual intervention defeats automation."
            },
            {
                "id": "q28",
                "type": "single",
                "prompt": "Your Application Load Balancer is receiving traffic from users in different geographic regions. To optimize for latency, what should be implemented?",
                "options": [
                    "Enable cross-zone load balancing to distribute load evenly",
                    "Use Route 53 with geolocation routing to direct users to regional load balancers",
                    "Add more EC2 instances to the current load balancer",
                    "Increase the target tracking metric threshold"
                ],
                "correctOptionIndex": 1,
                "explanation": "Route 53 geolocation routing directs users to the nearest regional load balancer, minimizing latency. Cross-zone increases latency by routing across AZs. More instances don't improve geographic latency. Metric threshold adjustment is for scaling, not latency."
            },
            {
                "id": "q29",
                "type": "multiple",
                "prompt": "A company needs to implement both horizontal and vertical scaling for their application. Which services/configurations enable this? (Choose two.)",
                "options": [
                    "Auto Scaling Groups for horizontal scaling (adding/removing instances)",
                    "Switching to larger instance types for vertical scaling (requires manual configuration)",
                    "Network Load Balancer for increasing throughput capacity",
                    "Increasing EC2 instance vCPU/memory by modifying the instance type"
                ],
                "correctOptionIndexes": [0, 3],
                "explanation": "ASG provides horizontal scaling by adjusting instance count. Changing to larger instance types enables vertical scaling (resize within same family or to different family). NLB doesn't scale instances. Manual configuration for vertical scaling is typical."
            },
            {
                "id": "q30",
                "type": "single",
                "prompt": "An Application Load Balancer listener is configured with an HTTPS certificate from AWS Certificate Manager. How does the ALB handle the certificate renewal?",
                "options": [
                    "Manual renewal is required before certificate expiration",
                    "AWS automatically renews the certificate through ACM",
                    "The certificate must be uploaded to S3 for renewal",
                    "The ALB generates a new self-signed certificate automatically"
                ],
                "correctOptionIndex": 1,
                "explanation": "AWS Certificate Manager automatically manages certificate renewal for certificates associated with ALB/NLB/CloudFront. No manual action is required. Certificates don't go to S3, and self-signed certs aren't used for validated domains."
            },
            {
                "id": "q31",
                "type": "multiple",
                "prompt": "A financial application requires extremely low latency with millions of requests per second. Which load balancer and configuration should be chosen? (Choose two.)",
                "options": [
                    "Network Load Balancer (NLB) operating at Layer 4 for ultra-high performance",
                    "Enable NLB flow hash algorithm for consistent connection routing",
                    "Disable cross-zone load balancing to minimize inter-AZ latency",
                    "Application Load Balancer with path-based routing for flexibility"
                ],
                "correctOptionIndexes": [0, 2],
                "explanation": "NLB at Layer 4 provides extreme performance (millions req/sec, sub-millisecond latency). Disabling cross-zone keeps traffic local for lowest latency. Flow hash algorithm maintains connection affinity. ALB at Layer 7 has higher latency than NLB."
            },
            {
                "id": "q32",
                "type": "single",
                "prompt": "You need to distribute traffic for a real-time gaming application requiring persistent connections with sub-millisecond latency. Which load balancer is most appropriate?",
                "options": [
                    "Application Load Balancer for flexible routing",
                    "Network Load Balancer for extreme performance and low latency",
                    "Classic Load Balancer for simple distribution",
                    "Gateway Load Balancer for appliance traffic"
                ],
                "correctOptionIndex": 1,
                "explanation": "Network Load Balancer provides the lowest latency (sub-millisecond) and highest performance, supporting millions of requests per second. It's ideal for real-time applications with persistent connections. ALB is higher latency due to Layer 7 processing. CLB and GWLB don't fit this use case."
            },
            {
                "id": "q33",
                "type": "multiple",
                "prompt": "An Auto Scaling Group is scaling instances based on CloudWatch CPU metrics. Which issues could prevent expected scaling? (Choose two.)",
                "options": [
                    "Insufficient IAM permissions for ASG to execute scaling actions",
                    "CloudWatch alarm misconfiguration with incorrect threshold or evaluation periods",
                    "Load Balancer health checks marking all instances as unhealthy",
                    "Sticky sessions preventing traffic from reaching new instances"
                ],
                "correctOptionIndexes": [0, 1],
                "explanation": "Missing IAM permissions prevent ASG from launching/terminating instances. Misconfigured alarms (threshold, evaluation periods, metrics) prevent scaling triggers. LB health checks and sticky sessions don't prevent scaling decisions (they affect routing)."
            },
            {
                "id": "q34",
                "type": "single",
                "prompt": "An Application Load Balancer target group has health check configured with interval of 30 seconds and unhealthy threshold of 2. How long until an unhealthy instance stops receiving traffic?",
                "options": [
                    "30 seconds",
                    "60 seconds (2 failed checks × 30 seconds)",
                    "At least 60 seconds (depends on when check cycle aligns)",
                    "Immediately when first health check fails"
                ],
                "correctOptionIndex": 2,
                "explanation": "With 30-second interval and unhealthy threshold of 2, it takes at least 60 seconds (2 failed checks) to mark unhealthy. The actual time depends on when the health check cycle aligns. An instance isn't immediately removed after a single failure."
            },
            {
                "id": "q35",
                "type": "multiple",
                "prompt": "A company wants to implement canary deployments with load balancers to gradually roll out new application versions. Which configurations support this? (Choose two.)",
                "options": [
                    "ALB with multiple target groups routing different percentages of traffic to old/new versions",
                    "Weighted target group attributes to control traffic split between versions",
                    "ASG termination policies to gracefully remove old instances",
                    "Route 53 weighted routing policies to shift traffic to new ALB"
                ],
                "correctOptionIndexes": [0, 3],
                "explanation": "ALB listener rules can route different percentages to different target groups. Route 53 weighted routing can gradually shift traffic between ALBs. Target group weights don't exist in ALB directly. ASG termination policies are for instance removal, not traffic gradual shift."
            },
            {
                "id": "q36",
                "type": "single",
                "prompt": "You have an Auto Scaling Group with desired capacity of 4 and currently has 4 running instances. A target tracking policy triggers a scale-out to 6 instances. At what point does the desired capacity change?",
                "options": [
                    "Immediately when the scaling policy decision is made",
                    "When new instances reach 'running' state",
                    "When new instances pass the load balancer health check",
                    "After connection draining completes on existing instances"
                ],
                "correctOptionIndex": 0,
                "explanation": "The desired capacity changes immediately when the scaling policy decision is made. The ASG then launches new instances to reach the new desired capacity. Reaching 'running' state and health checks are part of the launch process but don't trigger the capacity change."
            },
            {
                "id": "q37",
                "type": "multiple",
                "prompt": "An organization is securing an Application Load Balancer to prevent unauthorized access. Which security measures should be implemented? (Choose two.)",
                "options": [
                    "Configure security group for ALB allowing only required ports (80, 443)",
                    "Enable AWS WAF (Web Application Firewall) on the ALB for application-layer protection",
                    "Store SSL certificates in S3 with restricted access",
                    "Configure backend security group to allow traffic only from ALB security group"
                ],
                "correctOptionIndexes": [0, 3],
                "explanation": "ALB security group restricting ports is essential. Backend security group allowing only LB traffic adds defense-in-depth. AWS WAF provides Layer 7 protection (optional but recommended). Certificates should be in ACM, not S3."
            },
            {
                "id": "q38",
                "type": "single",
                "prompt": "A web application uses sticky sessions on the load balancer. The application deploys a new version which clears session data during startup. What happens to existing users?",
                "options": [
                    "Sticky sessions persist, users continue on old session data",
                    "New requests route to updated instances, causing session loss",
                    "Load balancer automatically creates new sessions",
                    "Sticky sessions ensure users see the new version without data loss"
                ],
                "correctOptionIndex": 0,
                "explanation": "Sticky sessions route user requests to the same instance. If that instance is updated and clears session data, the user's session is lost when they hit that instance. Sticky sessions don't prevent application-level data loss from deployments."
            },
            {
                "id": "q39",
                "type": "multiple",
                "prompt": "A company is implementing multi-tier load balancing with different requirements per tier. Which configurations are appropriate? (Choose two.)",
                "options": [
                    "Web tier: ALB with host-based and path-based routing to different backend services",
                    "API tier: Network Load Balancer for ultra-high performance microservice communication",
                    "Database tier: Gateway Load Balancer to distribute queries across database instances",
                    "Cache tier: Application Load Balancer with sticky sessions for connection affinity"
                ],
                "correctOptionIndexes": [0, 1],
                "explanation": "ALB with content-based routing is perfect for web tier routing to services. NLB for API tier microservices provides high performance. GWLB isn't for databases (they have their own replication). ALB for cache isn't ideal; Redis/Memcached have their own clustering."
            },
            {
                "id": "q40",
                "type": "single",
                "prompt": "An Auto Scaling Group's scaling policy is creating too many instances during traffic spikes, overshooting the target. How can this be addressed?",
                "options": [
                    "Increase the target tracking metric percentage to reduce sensitivity",
                    "Reduce the scale-out cooldown period for faster decisions",
                    "Enable predictive scaling to anticipate demand",
                    "Increase the unhealthy instance replacement threshold"
                ],
                "correctOptionIndex": 0,
                "explanation": "Increasing the target metric percentage (e.g., from 70% to 80% CPU) reduces overshooting. Reducing cooldown causes more frequent scaling. Predictive scaling can help but doesn't directly reduce overshoot. Replacement threshold is for health checks, not target tracking."
            }
        ]
    },
    {
        "id": "exam_rds_aurora_elasticache_saa_c03",
        "title": "SAA-C03 Practice Set on RDS, Aurora, and ElastiCache",
        "description": "Comprehensive exam questions covering Amazon RDS, Aurora, ElastiCache, read replicas, multi-AZ, backups, security, RDS Proxy, and caching strategies",
        "durationSeconds": 7800,
        "questions": [
            {
                "id": "q1",
                "type": "multiple",
                "prompt": "A company needs a relational database with automatic replication for disaster recovery and high availability. Which RDS configurations should be implemented? (Choose two.)",
                "options": [
                    "Multi-AZ deployment for automatic failover with synchronous replication",
                    "Read Replicas in different AZs for handling read scaling and disaster recovery",
                    "Single-AZ RDS with manual snapshots for backup",
                    "RDS Custom for specialized database requirements"
                ],
                "correctOptionIndexes": [0, 1],
                "explanation": "Multi-AZ provides automatic failover with synchronous replication (HA). Read Replicas offer asynchronous replication for read scaling and can serve as DR targets. Single-AZ with manual snapshots lacks HA. RDS Custom is for specialized cases, not standard HA."
            },
            {
                "id": "q2",
                "type": "single",
                "prompt": "What is the primary difference between RDS Multi-AZ and RDS Read Replicas?",
                "options": [
                    "Multi-AZ is for read scaling while Read Replicas are for high availability",
                    "Multi-AZ is for high availability with automatic failover; Read Replicas are for read scaling with manual promotion",
                    "Multi-AZ supports all database engines while Read Replicas only support MySQL",
                    "Read Replicas require manual setup while Multi-AZ is automatic"
                ],
                "correctOptionIndex": 1,
                "explanation": "Multi-AZ: synchronous replication, automatic failover, single DNS endpoint, no read scaling. Read Replicas: asynchronous replication, no automatic failover, separate endpoints, read scaling possible, can be promoted to standalone."
            },
            {
                "id": "q3",
                "type": "multiple",
                "prompt": "A database application experiences sudden read-heavy traffic during certain hours. Which solutions can handle this? (Choose two.)",
                "options": [
                    "Create RDS Read Replicas to distribute read traffic",
                    "Increase instance size for vertical scaling",
                    "Use Amazon Aurora with auto-scaling read replicas",
                    "Implement ElastiCache in front of RDS for caching"
                ],
                "correctOptionIndexes": [0, 3],
                "explanation": "Read Replicas and ElastiCache both handle read scaling. Vertical scaling increases capacity but isn't as dynamic. Aurora has auto-scaling but replicas still need to handle connection distribution. ElastiCache provides caching layer for faster reads."
            },
            {
                "id": "q4",
                "type": "single",
                "prompt": "You have an RDS MySQL database with 5 read replicas. The primary database is paused for maintenance. What happens to the read replicas?",
                "options": [
                    "Read replicas continue operating and serving read traffic independently",
                    "Read replicas are automatically paused with the primary",
                    "Read replicas stop replicating but continue serving cached data",
                    "Read replicas are promoted to primary"
                ],
                "correctOptionIndex": 0,
                "explanation": "Read Replicas are independent copies with separate endpoints. Pausing the primary doesn't affect replica operation. Replicas use asynchronous replication, so they continue serving reads independently."
            },
            {
                "id": "q5",
                "type": "multiple",
                "prompt": "A company is designing a disaster recovery solution for its RDS database with RPO of 1 hour and RTO of 15 minutes. Which strategies meet these requirements? (Choose two.)",
                "options": [
                    "Multi-AZ RDS deployment for automatic failover within minutes",
                    "RDS Read Replica in different region for DR with manual promotion",
                    "Automated daily snapshots for backup",
                    "RDS Backup window configured with point-in-time recovery"
                ],
                "correctOptionIndexes": [0, 1],
                "explanation": "Multi-AZ achieves RTO of minutes with automatic failover. Cross-region read replica can be promoted for DR. Automated backups support point-in-time recovery (within backup window). Daily snapshots don't meet 1-hour RPO."
            },
            {
                "id": "q6",
                "type": "single",
                "prompt": "You need to create an RDS read replica in a different region from the primary database. What is the expected replication lag?",
                "options": [
                    "Synchronous (immediate)",
                    "Typically less than 1 second",
                    "Typically 1-10 seconds (asynchronous)",
                    "Could be several minutes depending on network"
                ],
                "correctOptionIndex": 2,
                "explanation": "Cross-region read replicas use asynchronous replication with typical lag of 1-10 seconds. This is acceptable for most read scaling scenarios. Synchronous replication would be Multi-AZ (same region). Network distance affects lag but typically stays under 10 seconds."
            },
            {
                "id": "q7",
                "type": "multiple",
                "prompt": "An e-commerce company wants to implement caching for frequently accessed product information. Which caching solutions are suitable? (Choose two.)",
                "options": [
                    "Amazon ElastiCache with Redis for session storage and product caching",
                    "RDS Read Replicas for caching database queries",
                    "ElastiCache with Memcached for simple key-value caching",
                    "Amazon DynamoDB for caching transactional data"
                ],
                "correctOptionIndexes": [0, 2],
                "explanation": "ElastiCache (Redis/Memcached) is designed for caching. Redis supports complex data structures and persistence; Memcached is simpler. Read Replicas aren't caching (they're full database copies). DynamoDB is a database, not a cache."
            },
            {
                "id": "q8",
                "type": "single",
                "prompt": "You need to cache session data with automatic expiration and support for complex data structures. Which ElastiCache engine is most appropriate?",
                "options": [
                    "Memcached for simplicity and speed",
                    "Redis for data structures and expiration support",
                    "DynamoDB for session management",
                    "RDS for persistent session storage"
                ],
                "correctOptionIndex": 1,
                "explanation": "Redis supports complex data structures (lists, sets, hashes), TTL/expiration (automatic key deletion), persistence, and replication. Memcached is simpler (string key-value only). DynamoDB and RDS are databases, not caching engines."
            },
            {
                "id": "q9",
                "type": "multiple",
                "prompt": "Amazon Aurora is being considered for a critical application. Which advantages does Aurora provide over standard RDS? (Choose two.)",
                "options": [
                    "Better read performance with auto-scaling read replicas (Aurora Replicas)",
                    "Faster replication with storage-level replication",
                    "5x better performance than MySQL RDS",
                    "Automatic backup with point-in-time recovery up to 35 days"
                ],
                "correctOptionIndexes": [0, 2],
                "explanation": "Aurora has auto-scaling read replicas and 5x better MySQL performance. Storage-level replication is a feature but not the main advantage. All RDS versions support point-in-time recovery (not Aurora-specific)."
            },
            {
                "id": "q10",
                "type": "single",
                "prompt": "An Aurora database cluster has 1 primary instance and 4 Aurora Replicas. If the primary fails, which replica becomes the new primary?",
                "options": [
                    "AWS automatically selects the replica with lowest latency",
                    "The oldest Aurora Replica is promoted",
                    "The replica with the lowest replication lag is promoted",
                    "Manual intervention is required to promote a replica"
                ],
                "correctOptionIndex": 2,
                "explanation": "Aurora automatically promotes the replica with the lowest replication lag to become the primary. This minimizes data loss. AWS handles failover automatically (unlike standard RDS read replicas which need manual promotion)."
            },
            {
                "id": "q11",
                "type": "multiple",
                "prompt": "A company needs to migrate from standard RDS MySQL to Aurora MySQL. Which migration considerations are important? (Choose two.)",
                "options": [
                    "Aurora is compatible with MySQL protocol but uses different storage architecture",
                    "Application connection strings require changes to point to Aurora endpoint",
                    "All data must be manually transferred using AWS DMS",
                    "Aurora uses the same backup format as RDS, making migration straightforward"
                ],
                "correctOptionIndexes": [0, 1],
                "explanation": "Aurora is MySQL-compatible at protocol level but has different architecture. Connection strings may need updates (cluster endpoint). AWS DMS can help but migration tools exist. Backup formats differ; direct restore isn't possible."
            },
            {
                "id": "q12",
                "type": "single",
                "prompt": "You have an RDS database with automated backups enabled with a 7-day retention period. You need to restore a database from 10 days ago. What options are available?",
                "options": [
                    "You cannot restore from 10 days ago (outside retention period)",
                    "Create a manual snapshot and restore from it",
                    "Use point-in-time recovery within the 7-day window",
                    "Restore from the automated backup and extend retention"
                ],
                "correctOptionIndex": 0,
                "explanation": "Automated backups are retained for the configured period (7 days). A restore request from 10 days ago is outside this window and cannot be restored. Manual snapshots can be retained longer, but 10-day data is already lost."
            },
            {
                "id": "q13",
                "type": "multiple",
                "prompt": "An RDS database needs enhanced security with encryption, access control, and auditing. Which security measures should be implemented? (Choose two.)",
                "options": [
                    "Enable encryption at rest using AWS KMS",
                    "Use RDS security groups to control network access",
                    "Store database credentials in environment variables",
                    "Enable encryption in transit using SSL/TLS connections"
                ],
                "correctOptionIndexes": [0, 3],
                "explanation": "Encryption at rest (KMS) and in transit (SSL/TLS) are encryption best practices. Security groups control network access but aren't directly 'RDS security'. Storing credentials in environment variables is a security anti-pattern; use IAM database authentication instead."
            },
            {
                "id": "q14",
                "type": "single",
                "prompt": "You need to connect to an RDS database using IAM database authentication instead of storing passwords. Which RDS engine supports this?",
                "options": [
                    "Only MySQL",
                    "Only PostgreSQL",
                    "MySQL and PostgreSQL",
                    "All RDS engines"
                ],
                "correctOptionIndex": 2,
                "explanation": "IAM database authentication is supported for MySQL and PostgreSQL. It generates temporary credentials, eliminating password storage. Other engines (Oracle, SQL Server) use traditional authentication methods."
            },
            {
                "id": "q15",
                "type": "multiple",
                "prompt": "An application experiences database connection pooling issues with large numbers of concurrent connections. Which solutions can address this? (Choose two.)",
                "options": [
                    "Use RDS Proxy to manage connection pooling between application and database",
                    "Increase the database instance size to handle more connections",
                    "Implement ElastiCache to reduce database queries and connection load",
                    "Create multiple read replicas to distribute connection load"
                ],
                "correctOptionIndexes": [0, 2],
                "explanation": "RDS Proxy manages connection pooling efficiently. ElastiCache reduces queries (lower connection needs). Larger instances help but don't solve pooling issues. Read replicas distribute reads but each needs separate connections."
            },
            {
                "id": "q16",
                "type": "single",
                "prompt": "RDS Proxy is deployed in front of an RDS database. What is the primary benefit?",
                "options": [
                    "Improves database query performance by 5x",
                    "Manages database connection pooling to improve efficiency",
                    "Provides automatic backup and recovery",
                    "Replicates data across regions"
                ],
                "correctOptionIndex": 1,
                "explanation": "RDS Proxy's main benefit is connection pooling—it reduces the number of database connections by reusing them, improving resource efficiency and supporting more concurrent application connections."
            },
            {
                "id": "q17",
                "type": "multiple",
                "prompt": "A company is choosing between RDS Custom and standard RDS. When is RDS Custom appropriate? (Choose two.)",
                "options": [
                    "When needing Oracle or Microsoft SQL Server with full database control",
                    "When requiring customization beyond RDS-managed limitations",
                    "For standard MySQL/PostgreSQL applications",
                    "When needing to install custom extensions or patches"
                ],
                "correctOptionIndexes": [0, 3],
                "explanation": "RDS Custom is for Oracle/SQL Server with need for OS-level access. Standard RDS works for MySQL/PostgreSQL. Custom is needed for custom extensions and patches. Standard RDS handles most use cases with less operational overhead."
            },
            {
                "id": "q18",
                "type": "single",
                "prompt": "An RDS database backup is encrypted with AWS KMS. You want to restore the database to a different AWS account. What is required?",
                "options": [
                    "The backup can be restored directly to the other account",
                    "KMS key policy must allow cross-account access before restoration",
                    "A new snapshot must be created in the target account",
                    "The database must be decrypted first, then restored"
                ],
                "correctOptionIndex": 1,
                "explanation": "Cross-account RDS backup restoration with KMS encryption requires the KMS key policy to allow the target account access. The source account must explicitly grant permissions in the key policy."
            },
            {
                "id": "q19",
                "type": "multiple",
                "prompt": "An Aurora cluster needs to handle read-heavy workloads across multiple regions. Which configurations are recommended? (Choose two.)",
                "options": [
                    "Create Aurora Global Database for read-only replicas in other regions",
                    "Deploy Aurora multi-region failover with automatic promotion",
                    "Use Aurora cross-region read replicas that can be promoted",
                    "Implement ElastiCache in each region for query caching"
                ],
                "correctOptionIndexes": [0, 3],
                "explanation": "Aurora Global Database provides read-only replicas across regions. ElastiCache reduces query load locally. Cross-region failover is automatic for Global Database (not manual promotion). Standard Aurora replicas don't span regions."
            },
            {
                "id": "q20",
                "type": "single",
                "prompt": "An Aurora database cluster has been configured with automated backups. What is the maximum point-in-time recovery window?",
                "options": [
                    "7 days",
                    "14 days",
                    "35 days",
                    "Indefinite with manual snapshots"
                ],
                "correctOptionIndex": 2,
                "explanation": "Aurora (like RDS) has a default 35-day point-in-time recovery window, longer than standard RDS (default 7 days). This can be increased to 35 days. Manual snapshots are retained indefinitely."
            },
            {
                "id": "q21",
                "type": "multiple",
                "prompt": "ElastiCache is being implemented for session storage in a web application. Which considerations are important? (Choose two.)",
                "options": [
                    "Sessions stored in ElastiCache should be considered volatile and not mission-critical",
                    "ElastiCache should never be used for session storage (use database instead)",
                    "Enable replication and automatic failover for session availability",
                    "Configure appropriate TTL values for session expiration"
                ],
                "correctOptionIndexes": [0, 3],
                "explanation": "ElastiCache is excellent for sessions but data isn't persistent (unlike databases). TTL is essential for automatic session cleanup. Replication adds HA. ElastiCache is actually ideal for session storage."
            },
            {
                "id": "q22",
                "type": "single",
                "prompt": "You need to cache database query results for 5 minutes. The cache must support automatic expiration. Which ElastiCache engine is appropriate?",
                "options": [
                    "Memcached (doesn't support expiration)",
                    "Redis with TTL/expiration support",
                    "Either Memcached or Redis (both support TTL)",
                    "DynamoDB with Time-to-Live"
                ],
                "correctOptionIndex": 1,
                "explanation": "Redis supports TTL (Time-to-Live) with automatic key expiration. Memcached doesn't support TTL natively. DynamoDB is a database, not a cache. Redis is the right choice for expiring cache entries."
            },
            {
                "id": "q23",
                "type": "multiple",
                "prompt": "A critical application requires database high availability with minimal failover time. Which configurations provide this? (Choose two.)",
                "options": [
                    "RDS Multi-AZ for automatic synchronous replication and sub-minute failover",
                    "Aurora for native high availability with automatic failover",
                    "RDS Read Replicas across AZs with manual promotion",
                    "Regular snapshots with automated restoration on failure"
                ],
                "correctOptionIndexes": [0, 1],
                "explanation": "Multi-AZ and Aurora both provide automatic failover (seconds to minutes). Read Replicas require manual promotion (minutes to hours). Snapshots require manual restoration (longer than automatic failover)."
            },
            {
                "id": "q24",
                "type": "single",
                "prompt": "An RDS database experiences high CPU utilization from query load. What immediate action can help reduce database load?",
                "options": [
                    "Create new RDS instances",
                    "Implement ElastiCache to cache frequently accessed data",
                    "Increase backup frequency",
                    "Enable query logging"
                ],
                "correctOptionIndex": 1,
                "explanation": "ElastiCache reduces database query load by caching results. New instances don't help without load distribution. Backup frequency and logging don't reduce query load."
            },
            {
                "id": "q25",
                "type": "multiple",
                "prompt": "An organization is implementing monitoring and alerting for RDS databases. Which metrics should be monitored? (Choose two.)",
                "options": [
                    "CPU utilization to detect resource contention",
                    "Database connections to identify connection pool issues",
                    "Read Replica lag to ensure replication health",
                    "S3 bucket size for backup storage"
                ],
                "correctOptionIndexes": [0, 1],
                "explanation": "CPU and connection metrics are critical for performance. Read Replica lag is important. S3 bucket size isn't an RDS metric (backups are managed by RDS)."
            },
            {
                "id": "q26",
                "type": "single",
                "prompt": "You create an RDS read replica in a different AWS region. What are the costs associated with this?",
                "options": [
                    "No additional costs (replica inherits primary costs)",
                    "Standard RDS pricing for replica instance + data transfer costs",
                    "Only data transfer costs (replica instance is free)",
                    "Shared pricing between primary and replica"
                ],
                "correctOptionIndex": 1,
                "explanation": "Read replicas are charged as separate instances at full RDS pricing. Cross-region data transfer incurs inter-region data transfer charges. This is important for cost planning."
            },
            {
                "id": "q27",
                "type": "multiple",
                "prompt": "An Aurora cluster needs to support a mix of OLTP and OLAP workloads. Which solutions are appropriate? (Choose two.)",
                "options": [
                    "Use separate Aurora instances (one for OLTP, one for OLAP)",
                    "Deploy Aurora read replicas with different settings for OLAP queries",
                    "Use Aurora with read-only replicas to offload analytics queries",
                    "Implement separate data warehouse (e.g., Redshift) for analytics"
                ],
                "correctOptionIndexes": [2, 3],
                "explanation": "Aurora read replicas can handle OLAP queries separately. Redshift is purpose-built for analytics and best practice for large-scale OLAP. Separate instances aren't necessary (replicas are cheaper). Different instance settings don't affect query type handling."
            },
            {
                "id": "q28",
                "type": "single",
                "prompt": "An RDS database has a 1-hour automated backup window and backups are retained for 7 days. When can you restore the database using point-in-time recovery?",
                "options": [
                    "Only during the 1-hour backup window",
                    "Any time within the last 7 days (not just the backup window)",
                    "Only to the specific times when backups occurred",
                    "Any time within the last 24 hours only"
                ],
                "correctOptionIndex": 1,
                "explanation": "Point-in-time recovery uses backup logs and transaction logs to restore to any second within the retention period (7 days), not just backup window times. The backup window is just when automated backups are created."
            },
            {
                "id": "q29",
                "type": "multiple",
                "prompt": "ElastiCache is being implemented to reduce database load for an e-commerce platform. Which caching strategies are most effective? (Choose two.)",
                "options": [
                    "Cache all database queries without exception",
                    "Cache product catalog and pricing data that changes infrequently",
                    "Cache user session data with appropriate TTL",
                    "Cache real-time inventory levels (frequently changing data)"
                ],
                "correctOptionIndexes": [1, 2],
                "explanation": "Cache stable data (product catalog, prices). Session data is ideal for caching with TTL. Don't cache everything (invalidation overhead). Real-time inventory changes too frequently for effective caching."
            },
            {
                "id": "q30",
                "type": "single",
                "prompt": "You need to set up an RDS database with encryption at rest. When should the encryption be enabled?",
                "options": [
                    "At database creation time",
                    "After creation by modifying the database",
                    "Only after taking a backup",
                    "Encryption is automatic and cannot be disabled"
                ],
                "correctOptionIndex": 0,
                "explanation": "Encryption at rest must be enabled at RDS instance creation time. It cannot be added or modified after creation—a new encrypted instance would need to be created and data migrated."
            },
            {
                "id": "q31",
                "type": "multiple",
                "prompt": "A company is migrating from RDS MySQL to Aurora MySQL using AWS DMS (Database Migration Service). Which considerations are important? (Choose two.)",
                "options": [
                    "DMS requires downtime for the migration",
                    "DMS can perform continuous replication until final cutover",
                    "Aurora is fully backward-compatible with MySQL applications",
                    "Connection endpoints change, requiring application updates"
                ],
                "correctOptionIndexes": [1, 3],
                "explanation": "DMS supports continuous replication with zero-downtime migration. Aurora is MySQL-compatible at protocol level. Endpoints differ (RDS: instance.xxx.rds.amazonaws.com vs Aurora: cluster.xxx.rds.amazonaws.com), requiring app string updates."
            },
            {
                "id": "q32",
                "type": "single",
                "prompt": "An Aurora Global Database is configured with the primary in us-east-1 and read-only secondary in eu-west-1. In which regions can write operations occur?",
                "options": [
                    "Both us-east-1 and eu-west-1",
                    "Only us-east-1 (primary region)",
                    "Only eu-west-1 (secondary region)",
                    "Both regions in read-only mode"
                ],
                "correctOptionIndex": 1,
                "explanation": "Aurora Global Database has one primary region (writable) and secondary regions (read-only). All writes must go to the primary. Secondaries can be promoted to primary for DR (but not both simultaneously)."
            },
            {
                "id": "q33",
                "type": "multiple",
                "prompt": "RDS Proxy is used to manage connections for a high-traffic application. Which benefits does it provide? (Choose two.)",
                "options": [
                    "Reduces idle database connections through connection pooling",
                    "Improves application query response time by 5x",
                    "Enables failover to read replicas automatically",
                    "Supports IAM authentication between application and proxy"
                ],
                "correctOptionIndexes": [0, 3],
                "explanation": "RDS Proxy pools connections and supports IAM authentication. It doesn't improve query response times (database performance unchanged). Automatic failover requires separate RDS Multi-AZ/Aurora HA setup."
            },
            {
                "id": "q34",
                "type": "single",
                "prompt": "You have RDS with read replicas in multiple AZs. During the primary failure, your application continues reading from the replicas. What happens after AWS completes the failover?",
                "options": [
                    "One read replica is promoted to primary; others remain as replicas",
                    "All read replicas are promoted to primary",
                    "The original primary is restored and made primary again",
                    "Manual intervention is required to designate a new primary"
                ],
                "correctOptionIndex": 0,
                "explanation": "RDS doesn't auto-promote replicas on primary failure (unlike Aurora). You must manually promote one replica. Failover is automatic only in Multi-AZ (which uses standby, not read replicas)."
            },
            {
                "id": "q35",
                "type": "multiple",
                "prompt": "An application needs caching for both sessions and application state with different requirements. Which approach is most appropriate? (Choose two.)",
                "options": [
                    "Use Redis for both sessions and application state (supports complex structures)",
                    "Use Memcached for sessions only (faster for simple key-value)",
                    "Use RDS for application state (persistent)",
                    "Use separate ElastiCache clusters optimized for each use case"
                ],
                "correctOptionIndexes": [0, 3],
                "explanation": "Redis handles both sessions and complex state well. Separate clusters allow independent scaling and configuration. Memcached is option for sessions but single instance can handle both. RDS is for persistence, not caching."
            },
            {
                "id": "q36",
                "type": "single",
                "prompt": "An RDS database backup is 500 GB. You want to restore it to a different region. How is the backup transferred?",
                "options": [
                    "You must manually download the backup and upload to the target region",
                    "AWS automatically transfers the snapshot across regions",
                    "The backup cannot be transferred (must be recreated in new region)",
                    "You must use AWS DataSync to transfer the backup"
                ],
                "correctOptionIndex": 1,
                "explanation": "RDS snapshots can be copied across regions automatically through the AWS Console/API. AWS handles the transfer transparently. You don't manually download/upload or need DataSync."
            },
            {
                "id": "q37",
                "type": "multiple",
                "prompt": "A financial application requires compliance with PCI-DSS for database security. Which RDS configurations meet this requirement? (Choose two.)",
                "options": [
                    "Enable encryption at rest using AWS KMS",
                    "Enable SSL/TLS encryption in transit for all connections",
                    "Use RDS in private subnets with no public access",
                    "Enable all database logging and query monitoring"
                ],
                "correctOptionIndexes": [0, 1],
                "explanation": "Encryption at rest and in transit are PCI-DSS requirements. Private subnet access is security best practice. Logging/monitoring are recommended but specific PCI-DSS requirements vary."
            },
            {
                "id": "q38",
                "type": "single",
                "prompt": "You create an Aurora read replica in the same region as the primary. What is the replication method?",
                "options": [
                    "Asynchronous replication through transaction logs",
                    "Synchronous replication (writes wait for replica confirmation)",
                    "Storage-level replication within the cluster",
                    "No replication (read replica is a separate database)"
                ],
                "correctOptionIndex": 2,
                "explanation": "Aurora read replicas (called Aurora Replicas) use storage-level replication—all instances in the cluster share the same storage. This provides ultra-fast, near-synchronous replication within the cluster."
            },
            {
                "id": "q39",
                "type": "multiple",
                "prompt": "An organization wants to implement disaster recovery for Aurora with minimal data loss. Which strategies are recommended? (Choose two.)",
                "options": [
                    "Use Aurora Global Database with cross-region read replicas",
                    "Create regular automated backups with 35-day retention",
                    "Deploy Aurora Multi-AZ with automatic failover",
                    "Manually promote cross-region replicas weekly"
                ],
                "correctOptionIndexes": [0, 2],
                "explanation": "Global Database and Multi-AZ provide automatic failover with minimal data loss. Automated backups enable recovery but require manual promotion. Manual weekly promotion is not modern DR best practice."
            },
            {
                "id": "q40",
                "type": "single",
                "prompt": "You need to connect multiple applications to an RDS database with strict connection limits. What is the best solution?",
                "options": [
                    "Increase RDS instance size to handle more connections",
                    "Deploy RDS Proxy to multiplex connections",
                    "Create separate RDS instances for each application",
                    "Configure application connection timeouts"
                ],
                "correctOptionIndex": 1,
                "explanation": "RDS Proxy is purpose-built for connection pooling, allowing many application connections to share fewer database connections. Larger instances help but don't solve pooling inefficiency. Separate instances increase costs and complexity."
            }
        ]
    },
    {
        "id": "exam_route53_saa_c03",
        "title": "SAA-C03 Practice Set on Route 53",
        "description": "Comprehensive exam questions covering DNS basics, Route 53 routing policies (Simple, Weighted, Latency, Failover, Geolocation, Geoproximity, IP-based, Multi Value), health checks, TTL, CNAME vs Alias, domain registration, and hybrid DNS",
        "durationSeconds": 7800,
        "questions": [
            {
                "id": "q1",
                "type": "multiple",
                "prompt": "A company needs to implement a DNS solution that distributes traffic to multiple EC2 instances with health checks for automatic failover. Which Route 53 routing policies would be appropriate? (Choose two.)",
                "options": [
                    "Weighted routing to distribute traffic proportionally with health checks",
                    "Failover routing with primary and secondary resources",
                    "Simple routing for basic DNS resolution",
                    "Latency-based routing for lowest latency across regions"
                ],
                "correctOptionIndexes": [0, 1],
                "explanation": "Weighted routing distributes traffic by percentage with health checks. Failover routing automatically switches to secondary on primary failure. Simple routing doesn't support health checks. Latency routing is for multi-region optimization, not primary failover needs."
            },
            {
                "id": "q2",
                "type": "single",
                "prompt": "What is the primary difference between CNAME and Alias records in Route 53?",
                "options": [
                    "CNAME works for any domain; Alias only works for AWS resources",
                    "CNAME can be used for root domains; Alias cannot",
                    "Alias is free; CNAME incurs query charges",
                    "CNAME points to IP addresses; Alias points to domain names"
                ],
                "correctOptionIndex": 0,
                "explanation": "CNAME records work for any domain but not root domains. Alias records are AWS-specific and work with AWS resources (ALB, CloudFront, S3) including root domains. Alias queries are free; CNAME queries are charged. Alias is generally preferred for AWS."
            },
            {
                "id": "q3",
                "type": "multiple",
                "prompt": "A global e-commerce application wants to direct users to the nearest regional server for optimal performance. Which Route 53 routing policies could achieve this? (Choose two.)",
                "options": [
                    "Latency-based routing to automatically route to lowest-latency region",
                    "Geolocation routing to route based on user's geographic location",
                    "Geoproximity routing to route based on geographic location with bias",
                    "Weighted routing to manually balance traffic across regions"
                ],
                "correctOptionIndexes": [0, 1],
                "explanation": "Latency-based routes to the region with lowest latency. Geolocation routes based on geographic location. Geoproximity also uses location but adds bias adjustment. Weighted routing requires manual percentage configuration."
            },
            {
                "id": "q4",
                "type": "single",
                "prompt": "You create a Route 53 health check that fails. What is the TTL impact on DNS resolution?",
                "options": [
                    "The TTL immediately decreases to 1 second",
                    "DNS clients continue using cached responses until TTL expires",
                    "The health check failure has no direct impact on TTL",
                    "The record is immediately removed from DNS"
                ],
                "correctOptionIndex": 2,
                "explanation": "Health check failures don't directly affect TTL. DNS clients use cached responses until TTL expires. Once TTL expires, clients query again and get the health check result. Failover routing can redirect to healthy records based on health checks."
            },
            {
                "id": "q5",
                "type": "multiple",
                "prompt": "A company registers a domain with a third-party registrar but wants to use Route 53 for DNS management. Which configurations are needed? (Choose two.)",
                "options": [
                    "Create a Route 53 hosted zone for the domain",
                    "Update nameservers at the third-party registrar to point to Route 53",
                    "Migrate the domain from the registrar to Route 53",
                    "Create DNS records in Route 53 hosted zone"
                ],
                "correctOptionIndexes": [0, 1],
                "explanation": "Create Route 53 hosted zone, get its nameservers, then update nameservers at the registrar. You don't need to migrate the domain (it can stay at the registrar). Create records in Route 53 once nameservers are updated."
            },
            {
                "id": "q6",
                "type": "single",
                "prompt": "You create an Alias record pointing to an ALB. After the ALB is deleted, what happens to DNS queries to the Alias record?",
                "options": [
                    "Route 53 returns the cached Alias record",
                    "Route 53 detects the missing resource and returns NXDOMAIN",
                    "The Alias record continues to exist but becomes invalid",
                    "DNS clients receive a timeout error"
                ],
                "correctOptionIndex": 1,
                "explanation": "Route 53 Alias records are intelligent—they check if the target resource exists. If the ALB is deleted, Route 53 returns NXDOMAIN (Non-Existent Domain) to indicate the record is invalid. This is an advantage of Alias over CNAME."
            },
            {
                "id": "q7",
                "type": "multiple",
                "prompt": "A company wants to implement blue-green deployment with DNS-based traffic switching. Which Route 53 configurations support this? (Choose two.)",
                "options": [
                    "Weighted routing to shift traffic percentages between blue and green environments",
                    "Failover routing with blue as primary and green as secondary",
                    "Simple routing to alternate between blue and green records",
                    "Alias records pointing to both ALBs with health checks"
                ],
                "correctOptionIndexes": [0, 1],
                "explanation": "Weighted routing gradually shifts traffic (e.g., 100% blue → 50/50 → 100% green). Failover routing can switch instantly (blue primary, green secondary). Simple routing doesn't support health checks. Alias records with health checks enable failover."
            },
            {
                "id": "q8",
                "type": "single",
                "prompt": "You set a TTL of 3600 seconds for a Route 53 record. A DNS client caches the response. How long will the client use the cached record?",
                "options": [
                    "3600 seconds (1 hour)",
                    "Until the client restarts",
                    "Indefinitely",
                    "30 seconds (Route 53 default)"
                ],
                "correctOptionIndex": 0,
                "explanation": "TTL (Time-to-Live) of 3600 seconds means DNS clients cache the response for 1 hour. After 1 hour, the client must query again. TTL doesn't depend on client restart or have indefinite caching."
            },
            {
                "id": "q9",
                "type": "multiple",
                "prompt": "A company needs to serve different content to users based on their geographic location. Which Route 53 routing policies support this? (Choose two.)",
                "options": [
                    "Geolocation routing to route based on user country/state/continent",
                    "Geoproximity routing to route based on geographic coordinates with bias",
                    "Latency-based routing to route based on closest region",
                    "IP-based routing to route based on client IP address location"
                ],
                "correctOptionIndexes": [0, 1],
                "explanation": "Geolocation routes by user location (country/state/continent). Geoproximity uses location with bias adjustment for fine-tuning. Latency and IP-based can indirectly achieve location-based routing but aren't the primary intent."
            },
            {
                "id": "q10",
                "type": "single",
                "prompt": "You configure Route 53 failover routing with a primary and secondary resource. When will the secondary resource be used?",
                "options": [
                    "When the primary resource is unhealthy (health check fails)",
                    "Randomly, alternating between primary and secondary",
                    "When primary load exceeds a threshold",
                    "During scheduled maintenance windows"
                ],
                "correctOptionIndex": 0,
                "explanation": "Failover routing switches to secondary only when primary fails health checks. It's not random or load-based. Failover is automatic based on health check results."
            },
            {
                "id": "q11",
                "type": "multiple",
                "prompt": "A Route 53 health check is configured with interval of 30 seconds and failure threshold of 3. How long before a resource is marked unhealthy?",
                "options": [
                    "30 seconds (on first failure)",
                    "At least 90 seconds (3 consecutive failures × 30 seconds)",
                    "Could be 90-120 seconds depending on timing",
                    "3 minutes (Route 53 default)"
                ],
                "correctOptionIndexes": [1, 2],
                "explanation": "With interval of 30 seconds and failure threshold of 3, it takes at least 3 × 30 = 90 seconds. Due to check timing, it could take up to 120 seconds. Health checks must fail the specified number of times before marking unhealthy."
            },
            {
                "id": "q12",
                "type": "single",
                "prompt": "You need to use a Route 53 Alias record to point to an S3 website endpoint. Which S3 configuration is required?",
                "options": [
                    "Enable S3 static website hosting",
                    "Create a CloudFront distribution first",
                    "Configure S3 bucket CORS",
                    "No special configuration is needed"
                ],
                "correctOptionIndex": 0,
                "explanation": "S3 Alias records require S3 static website hosting to be enabled on the bucket. This creates an HTTP endpoint that Route 53 can point to. CloudFront and CORS are optional but not required for Alias records."
            },
            {
                "id": "q13",
                "type": "multiple",
                "prompt": "A multi-region application uses Route 53 with latency-based routing. What factors determine which region's resources are used? (Choose two.)",
                "options": [
                    "The region with the lowest latency from the DNS client's location",
                    "Health check status of resources in each region",
                    "The geographic location of the user",
                    "The time of day and traffic patterns"
                ],
                "correctOptionIndexes": [0, 1],
                "explanation": "Latency-based routing selects the lowest-latency region. Health checks determine if a region's resources are available. Geographic location is used by geolocation routing, not latency. Time and traffic patterns aren't factors (those are manual with weighted routing)."
            },
            {
                "id": "q14",
                "type": "single",
                "prompt": "What is the difference between Route 53 health checks and CloudWatch alarms?",
                "options": [
                    "Health checks monitor AWS resources; CloudWatch alarms monitor metrics",
                    "Route 53 health checks are redundant with CloudWatch alarms",
                    "Health checks are free; CloudWatch alarms require CloudWatch",
                    "CloudWatch alarms trigger failover; health checks provide monitoring"
                ],
                "correctOptionIndex": 0,
                "explanation": "Route 53 health checks monitor endpoint health (HTTP, TCP, calculated checks). CloudWatch alarms monitor metrics (CPU, disk, custom metrics). Both serve different purposes and are often used together."
            },
            {
                "id": "q15",
                "type": "multiple",
                "prompt": "A company has two data centers and wants traffic distributed proportionally (60% to DC1, 40% to DC2) with automatic failover if one fails. Which routing policies could achieve this? (Choose two.)",
                "options": [
                    "Weighted routing with 60/40 weights and health checks",
                    "Failover routing (primary/secondary)",
                    "Latency routing to balance based on response time",
                    "Simple routing with multiple records"
                ],
                "correctOptionIndexes": [0, 1],
                "explanation": "Weighted routing allows exact percentage distribution (60/40) with health checks for failover. Failover routing provides failover but not proportional distribution. Latency routing is automatic but may not achieve exact percentages. Simple routing doesn't support health checks."
            },
            {
                "id": "q16",
                "type": "single",
                "prompt": "You create a Route 53 record with TTL of 60 seconds. A client queries the record and caches it. You update the record in Route 53. When will the client see the updated record?",
                "options": [
                    "Immediately",
                    "Within 60 seconds (when TTL expires)",
                    "After 5 minutes",
                    "Only after manual cache clearing"
                ],
                "correctOptionIndex": 1,
                "explanation": "Clients cache DNS records for the TTL duration. With 60-second TTL, updates are visible to clients within 60 seconds. Lower TTL allows faster propagation but increases DNS query load. This is why shorter TTL is used before planned changes."
            },
            {
                "id": "q17",
                "type": "multiple",
                "prompt": "Route 53 is configured with Geolocation routing. A user's location doesn't match any specific geolocation rule. What routing options are available? (Choose two.)",
                "options": [
                    "Route to a default location rule",
                    "Return NXDOMAIN (no answer)",
                    "Route based on latency as fallback",
                    "Require the user to specify location"
                ],
                "correctOptionIndexes": [0, 1],
                "explanation": "Geolocation routing can have a default rule for unmatched locations. Alternatively, no answer (NXDOMAIN) is returned. There's no automatic fallback to latency or user specification required."
            },
            {
                "id": "q18",
                "type": "single",
                "prompt": "You need to point example.com (root domain) to an Application Load Balancer. Which Route 53 record type should you use?",
                "options": [
                    "CNAME record",
                    "A record",
                    "Alias A record pointing to ALB",
                    "NS record"
                ],
                "correctOptionIndex": 2,
                "explanation": "CNAME records cannot be used for root domains. Standard A records require IP addresses (ALB IPs change). Alias A records are the preferred solution—they point to ALB and are AWS-specific. NS records are for nameserver delegation."
            },
            {
                "id": "q19",
                "type": "multiple",
                "prompt": "A company implements IP-based routing in Route 53 to control access based on client IP location. Which scenarios are appropriate? (Choose two.)",
                "options": [
                    "Route internal users (specific IP ranges) to different content",
                    "Route based on geographic location without knowing exact IP ranges",
                    "Direct employees from specific office networks to different endpoints",
                    "Prevent access from certain geographic regions"
                ],
                "correctOptionIndexes": [0, 2],
                "explanation": "IP-based routing works when you know specific IP ranges (internal networks, office IPs). It's not suitable for geographic routing without knowing IP ranges. IP-based routing is useful for internal/partner networks. Geolocation routing is better for geographic prevention."
            },
            {
                "id": "q20",
                "type": "single",
                "prompt": "Route 53 Geoproximity routing is configured with a bias of +100. What is the effect of this bias?",
                "options": [
                    "Increases the geographic distance by 100 kilometers",
                    "Expands the region of effect by 100% (bias pulls more traffic to this location)",
                    "Sets a 100-millisecond latency threshold",
                    "Routes 100% of traffic to this location"
                ],
                "correctOptionIndex": 1,
                "explanation": "Geoproximity bias of +100 expands the geographic radius of the location, pulling more traffic toward it (compared to negative bias which contracts the radius). Bias is a percentage adjustment, not distance or latency."
            },
            {
                "id": "q21",
                "type": "multiple",
                "prompt": "A company uses Route 53 with weighted routing for A/B testing. One variant is performing poorly. What actions can improve the situation? (Choose two.)",
                "options": [
                    "Reduce the weight percentage for the poor-performing variant",
                    "Add a health check to detect poor performance and failover",
                    "Temporarily set the weight to 0% to route no traffic to poor variant",
                    "Delete the poor variant record entirely"
                ],
                "correctOptionIndexes": [0, 2],
                "explanation": "Reducing weight or setting to 0% immediately reduces traffic to poor variant. Health checks can detect unhealthy variants for automatic failover. Deleting the record ends the test abruptly. Weighted routing allows gradual testing without complete removal."
            },
            {
                "id": "q22",
                "type": "single",
                "prompt": "What is Route 53 Alias record's key advantage over CNAME records for AWS resources?",
                "options": [
                    "Alias records are faster (lower latency)",
                    "Alias records work at the root domain level and are free",
                    "Alias records support all DNS record types",
                    "Alias records automatically update when target IP changes"
                ],
                "correctOptionIndex": 3,
                "explanation": "Alias records automatically follow the target's IP changes (especially important for ALBs with dynamic IPs). They work at root domains (CNAME limitation) and are free. They're AWS-specific and only work with AWS resources."
            },
            {
                "id": "q23",
                "type": "multiple",
                "prompt": "Route 53 hosted zone is created for example.com. Which features become available? (Choose two.)",
                "options": [
                    "Ability to create DNS records (A, AAAA, CNAME, Alias, MX, TXT, etc.)",
                    "Automatic domain registration with Route 53",
                    "Unique nameservers for the hosted zone provided by AWS",
                    "Automatic SSL certificate generation for the domain"
                ],
                "correctOptionIndexes": [0, 2],
                "explanation": "Hosted zones allow DNS record creation and provide AWS nameservers. Domain registration is optional (can use any registrar). SSL certificates are separate (ACM or other CAs)."
            },
            {
                "id": "q24",
                "type": "single",
                "prompt": "You configure Route 53 failover routing with a primary and secondary. The primary becomes healthy again after being unhealthy. What happens?",
                "options": [
                    "Traffic immediately switches back to primary",
                    "Traffic gradually shifts back to primary",
                    "Traffic remains on secondary",
                    "Manual intervention is required to switch back"
                ],
                "correctOptionIndex": 0,
                "explanation": "Failover routing automatically switches traffic back to primary when it becomes healthy (health check passes). There's no gradual shift—it's automatic and immediate."
            },
            {
                "id": "q25",
                "type": "multiple",
                "prompt": "A global company needs to implement DNS failover with health checks. Which health check configurations should be considered? (Choose two.)",
                "options": [
                    "HTTP/HTTPS health checks on application endpoints",
                    "TCP health checks for non-HTTP services",
                    "CloudWatch Alarm-based health checks for metric monitoring",
                    "Simple DNS resolution checks without endpoint verification"
                ],
                "correctOptionIndexes": [0, 1],
                "explanation": "HTTP/HTTPS checks verify application health. TCP checks work for non-HTTP services. CloudWatch Alarm checks monitor metrics. Simple DNS resolution isn't a health check type—it doesn't verify endpoint health."
            },
            {
                "id": "q26",
                "type": "single",
                "prompt": "Route 53 Multi Value routing is used with 3 records, each with health checks enabled. At least one record is unhealthy. What happens?",
                "options": [
                    "All 3 records are returned regardless of health",
                    "Only healthy records are returned; unhealthy records are excluded",
                    "One random record is returned",
                    "All records are marked as unhealthy"
                ],
                "correctOptionIndex": 1,
                "explanation": "Multi Value routing returns multiple healthy records (up to 8). Unhealthy records are automatically excluded from responses. This differs from simple routing which returns all records regardless of health."
            },
            {
                "id": "q27",
                "type": "multiple",
                "prompt": "A company uses Route 53 with DNS firewall to control DNS queries. Which use cases are appropriate? (Choose two.)",
                "options": [
                    "Block access to domains known to contain malware",
                    "Block DNS queries to specific internal domain suffixes",
                    "Filter DNS queries based on query source IP",
                    "Prevent DNS data exfiltration to external DNS servers"
                ],
                "correctOptionIndexes": [0, 2],
                "explanation": "Route 53 Resolver DNS Firewall can block malicious domains and filter by source IP. It's designed for security filtering. Internal domain access control and data exfiltration prevention have other solutions."
            },
            {
                "id": "q28",
                "type": "single",
                "prompt": "You have Route 53 Resolver configured for hybrid DNS resolution between on-premises and AWS. Which component enables this?",
                "options": [
                    "Route 53 Alias records",
                    "Route 53 Resolver Endpoints (inbound and outbound)",
                    "CloudWatch monitoring",
                    "VPC endpoints"
                ],
                "correctOptionIndex": 1,
                "explanation": "Route 53 Resolver Endpoints enable hybrid DNS: inbound endpoints accept queries from on-premises, outbound endpoints forward queries to on-premises DNS. This enables bidirectional DNS resolution between environments."
            },
            {
                "id": "q29",
                "type": "multiple",
                "prompt": "Route 53 is being used for a mission-critical application requiring high availability. Which redundancy measures should be implemented? (Choose two.)",
                "options": [
                    "Use multiple Route 53 hosted zones (not possible - single hosted zone per domain)",
                    "Combine Alias records with health checks for automatic failover",
                    "Use failover or weighted routing policies with multi-region resources",
                    "Rely on Route 53 as sole DNS (Route 53 is highly available by default)"
                ],
                "correctOptionIndexes": [1, 2],
                "explanation": "One hosted zone per domain (no multiple zones). Alias + health checks enable failover. Failover/weighted policies support multi-region HA. Route 53 itself is highly available (replicated globally)."
            },
            {
                "id": "q30",
                "type": "single",
                "prompt": "You transfer a domain from another registrar to Route 53. During the transfer, will the domain stop resolving?",
                "options": [
                    "Yes, for 24-48 hours during transfer",
                    "No, if nameservers are updated before transfer completes",
                    "Only if you don't update nameservers at the old registrar",
                    "Depends on TTL settings"
                ],
                "correctOptionIndex": 1,
                "explanation": "If you update nameservers to Route 53's nameservers before completing the transfer, the domain continues resolving (no downtime). Once nameservers point to Route 53, it handles DNS regardless of transfer status."
            },
            {
                "id": "q31",
                "type": "multiple",
                "prompt": "A company implements Route 53 Simple routing for a load-balanced application. What are the limitations? (Choose two.)",
                "options": [
                    "Cannot use health checks (all records returned)",
                    "Cannot use Alias records",
                    "Cannot distribute traffic proportionally",
                    "Cannot set TTL values"
                ],
                "correctOptionIndexes": [0, 2],
                "explanation": "Simple routing doesn't support health checks—all records are always returned. It doesn't support weighted distribution. Alias records and TTL values work fine with simple routing."
            },
            {
                "id": "q32",
                "type": "single",
                "prompt": "Route 53 Weighted routing has two records: Weight 100 and Weight 0. How is traffic distributed?",
                "options": [
                    "100% to the Weight 100 record",
                    "50% each (weights are relative)",
                    "0% to Weight 100, 100% to Weight 0",
                    "Alternating between the two"
                ],
                "correctOptionIndex": 0,
                "explanation": "Weights determine proportional distribution. Weight 100 vs Weight 0 = 100% to the non-zero weight. Total weight is 100, so 100/(100+0) = 100%. Setting weight to 0 effectively disables a record."
            },
            {
                "id": "q33",
                "type": "multiple",
                "prompt": "Route 53 is configured with Latency-based routing across 3 regions. A region experiences network issues increasing latency. What happens? (Choose two.)",
                "options": [
                    "Route 53 automatically detects increased latency and shifts traffic to lower-latency regions",
                    "Users in affected region experience degraded performance until latency improves",
                    "Health check failures in the affected region trigger failover",
                    "Traffic is equally distributed across regions regardless of latency changes"
                ],
                "correctOptionIndexes": [0, 2],
                "explanation": "Latency routing automatically shifts based on latency changes (detected by Route 53 measurements). Health check failures can trigger failover. Latency routing is dynamic and adapts to network conditions."
            },
            {
                "id": "q34",
                "type": "single",
                "prompt": "You need to implement blue-green deployment with DNS-based switching. The production (green) endpoint is the current endpoint, and blue is the new version. Which approach is recommended?",
                "options": [
                    "Use Simple routing to alternate records",
                    "Use Weighted routing with 100% weight on green, then gradually shift to blue",
                    "Use Failover routing with green as primary and blue as secondary",
                    "Use Latency routing for automatic switching"
                ],
                "correctOptionIndex": 1,
                "explanation": "Weighted routing allows controlled gradual traffic shift (100% green → 90/10 green/blue → 50/50 → 0/100 blue). This is the blue-green pattern. Failover is for HA, not gradual deployment. Simple doesn't support weights."
            },
            {
                "id": "q35",
                "type": "multiple",
                "prompt": "Route 53 DNS query logging is enabled. Which information is captured in the logs? (Choose two.)",
                "options": [
                    "Query timestamp, domain name, and query type (A, AAAA, CNAME, etc.)",
                    "DNS response code (NOERROR, NXDOMAIN, SERVFAIL, etc.)",
                    "Query response time and latency",
                    "Client IP address and user identity"
                ],
                "correctOptionIndexes": [0, 1],
                "explanation": "Route 53 query logs capture timestamp, domain, query type, response code. They don't include response time metrics or detailed user information. Logs are stored in CloudWatch Logs."
            },
            {
                "id": "q36",
                "type": "single",
                "prompt": "A Route 53 health check is configured with an HTTP health check on port 80. The endpoint is behind an Application Load Balancer. What should the health check monitor?",
                "options": [
                    "The ALB endpoint directly",
                    "A specific backend EC2 instance",
                    "The ALB health check endpoint",
                    "A CloudWatch alarm"
                ],
                "correctOptionIndex": 0,
                "explanation": "The health check should monitor the ALB (which represents the application as a whole). Monitoring individual instances is redundant (ALB has its own health checks). CloudWatch alarm-based checks are separate."
            },
            {
                "id": "q37",
                "type": "multiple",
                "prompt": "A company uses Route 53 MX records to configure email service. Which additional records are typically needed? (Choose two.)",
                "options": [
                    "SPF (TXT record) for sender authentication",
                    "DKIM (TXT record) for email signing",
                    "A records for mail server IP resolution",
                    "CNAME records for mail forwarding"
                ],
                "correctOptionIndexes": [0, 1],
                "explanation": "MX records specify mail servers. SPF (TXT) and DKIM (TXT) records enhance email security. A records resolve mail server names. CNAME records aren't typically used for email."
            },
            {
                "id": "q38",
                "type": "single",
                "prompt": "You register a domain with Route 53. How long does it take for the domain to be active and resolving?",
                "options": [
                    "Immediately (seconds)",
                    "Within 1-2 hours",
                    "Within 24-48 hours",
                    "Within 5 business days"
                ],
                "correctOptionIndex": 0,
                "explanation": "Route 53 domain registration is processed quickly. The domain becomes active within seconds to minutes (not hours or days like traditional registrars). DNS resolution is immediate once records are created."
            },
            {
                "id": "q39",
                "type": "multiple",
                "prompt": "Route 53 is integrated with CloudFront for a global web application. Which configurations are common? (Choose two.)",
                "options": [
                    "Alias record pointing Route 53 domain to CloudFront distribution",
                    "CloudFront distribution as the target for weighted routing",
                    "CNAME record pointing to CloudFront domain name",
                    "Geolocation routing to select different CloudFront distributions by region"
                ],
                "correctOptionIndexes": [0, 3],
                "explanation": "Alias records point domains to CloudFront distributions (preferred method). Geolocation routing can direct users to different CDN edge locations. CNAME also works but Alias is preferred. CloudFront itself isn't a weighted routing target."
            },
            {
                "id": "q40",
                "type": "single",
                "prompt": "A Route 53 health check fails for a primary resource. The failover record is promoted. What is the expected time before traffic switches?",
                "options": [
                    "Immediately (within seconds)",
                    "Based on health check interval (typically 30-60 seconds minimum)",
                    "Within 1-2 minutes",
                    "Depends on TTL of the record (up to TTL duration)"
                ],
                "correctOptionIndex": 1,
                "explanation": "Failover routing switches based on health check failures. Time depends on health check interval (3 failures × 30 seconds = 90 seconds minimum). TTL doesn't affect failover time—that's for cached responses. Actual failover is fast once health check detects failure."
            }
        ]
    }




];
