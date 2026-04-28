export interface ExamQuestion {
    id: string;
    prompt: string;
    options: string[];
    correctOptionIndex: number;
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
        title: 'SAA-C03 Practice Set 2',
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
];
