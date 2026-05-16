import type { ExamDefinition } from './types';

export const exam3: ExamDefinition = {
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
};
