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
            }
        ],
    },
    {
        "id": "exam_ec2_saa_c03",
        "title": "SAA-C03 Practice Set on EC2",
        "description": "Comprehensive EC2 exam questions covering EC2 basics, security groups, purchasing options, networking, EBS, storage, and advanced scenarios",
        "durationSeconds": 7800,
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
    }

];
