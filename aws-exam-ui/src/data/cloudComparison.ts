export interface CloudServiceRow {
  aws: string;
  azure: string;
  gcp: string;
  description: string;
}

export interface CloudComparisonCategory {
  category: string;
  icon: string;
  services: CloudServiceRow[];
}

export const cloudComparisonCategories: CloudComparisonCategory[] = [
  {
    category: 'Compute',
    icon: '⚙️',
    services: [
      { aws: 'EC2', azure: 'Virtual Machines', gcp: 'Compute Engine', description: 'IaaS virtual machines with full OS control.' },
      { aws: 'Lambda', azure: 'Azure Functions', gcp: 'Cloud Functions / Cloud Run', description: 'Serverless function-as-a-service (FaaS).' },
      { aws: 'Elastic Beanstalk', azure: 'App Service', gcp: 'App Engine', description: 'Managed PaaS for deploying web applications.' },
      { aws: 'Batch', azure: 'Azure Batch', gcp: 'Cloud Batch', description: 'Managed batch compute for large-scale jobs.' },
      { aws: 'Lightsail', azure: 'Azure Virtual Machines (Basic)', gcp: 'Compute Engine (shared-core)', description: 'Simple, low-cost virtual servers for small workloads.' },
      { aws: 'Outposts', azure: 'Azure Stack Hub', gcp: 'Google Distributed Cloud', description: 'Cloud-managed infrastructure deployed on-premises.' },
      { aws: 'Wavelength', azure: 'Azure Edge Zones', gcp: 'Mobile Edge Cloud', description: 'Compute embedded at 5G network edge for ultra-low latency.' },
    ],
  },
  {
    category: 'Containers',
    icon: '📦',
    services: [
      { aws: 'ECS', azure: 'Azure Container Apps / ACI', gcp: 'Cloud Run', description: 'Managed container orchestration without Kubernetes.' },
      { aws: 'EKS', azure: 'AKS (Azure Kubernetes Service)', gcp: 'GKE (Google Kubernetes Engine)', description: 'Managed Kubernetes service.' },
      { aws: 'Fargate', azure: 'Azure Container Instances (ACI)', gcp: 'Cloud Run (fully managed)', description: 'Serverless containers — no cluster or node management.' },
      { aws: 'ECR', azure: 'Azure Container Registry (ACR)', gcp: 'Artifact Registry / Container Registry', description: 'Managed private Docker image registry.' },
      { aws: 'App Runner', azure: 'Azure Container Apps', gcp: 'Cloud Run', description: 'Fully managed container deployment from source or image.' },
    ],
  },
  {
    category: 'Storage',
    icon: '🗄️',
    services: [
      { aws: 'S3', azure: 'Azure Blob Storage', gcp: 'Cloud Storage', description: 'Scalable object / blob storage.' },
      { aws: 'S3 Glacier', azure: 'Azure Archive Storage', gcp: 'Cloud Storage Archive', description: 'Low-cost long-term archival storage.' },
      { aws: 'EBS', azure: 'Azure Managed Disks', gcp: 'Persistent Disk', description: 'Block storage volumes for virtual machines.' },
      { aws: 'EFS', azure: 'Azure Files / Azure NetApp Files', gcp: 'Filestore', description: 'Managed shared NFS file storage.' },
      { aws: 'FSx for Windows', azure: 'Azure Files (SMB)', gcp: 'Managed Service for Microsoft AD + Filestore', description: 'Managed Windows-compatible SMB file shares.' },
      { aws: 'FSx for Lustre', azure: 'Azure HPC Cache', gcp: 'Filestore (High Scale)', description: 'High-performance parallel file system for HPC/ML.' },
      { aws: 'Storage Gateway', azure: 'Azure StorSimple', gcp: 'Storage Transfer Service', description: 'Hybrid storage connecting on-premises to cloud.' },
      { aws: 'DataSync', azure: 'Azure File Sync / Data Box', gcp: 'Storage Transfer Service', description: 'Automated high-speed data transfer to cloud storage.' },
      { aws: 'Snowball', azure: 'Azure Data Box', gcp: 'Transfer Appliance', description: 'Physical device for offline large-scale data migration.' },
      { aws: 'AWS Backup', azure: 'Azure Backup', gcp: 'Cloud Backup and DR Service', description: 'Centralized backup management across cloud services.' },
    ],
  },
  {
    category: 'Database — Relational',
    icon: '🛢️',
    services: [
      { aws: 'RDS (MySQL)', azure: 'Azure Database for MySQL', gcp: 'Cloud SQL (MySQL)', description: 'Fully managed MySQL relational database.' },
      { aws: 'RDS (PostgreSQL)', azure: 'Azure Database for PostgreSQL', gcp: 'Cloud SQL (PostgreSQL) / AlloyDB', description: 'Fully managed PostgreSQL relational database.' },
      { aws: 'RDS (SQL Server)', azure: 'Azure SQL Database / SQL Managed Instance', gcp: 'Cloud SQL (SQL Server)', description: 'Fully managed Microsoft SQL Server.' },
      { aws: 'Aurora', azure: 'Azure SQL Hyperscale', gcp: 'AlloyDB for PostgreSQL', description: 'High-performance cloud-native relational database.' },
      { aws: 'Aurora Serverless', azure: 'Azure SQL Serverless', gcp: 'AlloyDB Omni / Spanner serverless', description: 'Serverless auto-scaling relational database.' },
      { aws: 'Redshift', azure: 'Azure Synapse Analytics', gcp: 'BigQuery', description: 'Managed cloud data warehouse for analytical workloads (OLAP).' },
      { aws: 'RDS Proxy', azure: 'Azure SQL Connection Pooling', gcp: 'Cloud SQL Proxy', description: 'Managed database proxy for connection pooling.' },
    ],
  },
  {
    category: 'Database — NoSQL & Specialist',
    icon: '📑',
    services: [
      { aws: 'DynamoDB', azure: 'Azure Cosmos DB (Table API)', gcp: 'Firestore / Bigtable', description: 'Fully managed key-value and document NoSQL database.' },
      { aws: 'ElastiCache (Redis)', azure: 'Azure Cache for Redis', gcp: 'Memorystore for Redis', description: 'Managed in-memory Redis cache.' },
      { aws: 'ElastiCache (Memcached)', azure: 'Azure Cache (Memcached via OSS)', gcp: 'Memorystore for Memcached', description: 'Managed in-memory Memcached cache.' },
      { aws: 'DocumentDB', azure: 'Azure Cosmos DB (MongoDB API)', gcp: 'Firestore', description: 'Managed MongoDB-compatible document database.' },
      { aws: 'Neptune', azure: 'Azure Cosmos DB (Gremlin API)', gcp: 'Spanner Graph (preview) / Vertex AI Feature Store', description: 'Managed graph database.' },
      { aws: 'Keyspaces', azure: 'Azure Cosmos DB (Cassandra API)', gcp: 'Bigtable', description: 'Managed Apache Cassandra-compatible wide-column database.' },
      { aws: 'QLDB', azure: 'Azure SQL Ledger', gcp: 'Spanner (with audit logging)', description: 'Immutable cryptographically verifiable ledger database.' },
      { aws: 'Timestream', azure: 'Azure Data Explorer (ADX)', gcp: 'BigTable / BigQuery (time-series)', description: 'Managed time-series database.' },
    ],
  },
  {
    category: 'Networking',
    icon: '🌐',
    services: [
      { aws: 'VPC', azure: 'Azure Virtual Network (VNet)', gcp: 'Virtual Private Cloud (VPC)', description: 'Isolated virtual network within the cloud.' },
      { aws: 'CloudFront', azure: 'Azure CDN / Azure Front Door', gcp: 'Cloud CDN', description: 'Global content delivery network (CDN).' },
      { aws: 'Route 53', azure: 'Azure DNS / Azure Traffic Manager', gcp: 'Cloud DNS / Cloud Load Balancing', description: 'Managed DNS and traffic routing.' },
      { aws: 'API Gateway', azure: 'Azure API Management', gcp: 'Cloud Endpoints / Apigee', description: 'Managed API gateway for REST/WebSocket APIs.' },
      { aws: 'Direct Connect', azure: 'Azure ExpressRoute', gcp: 'Cloud Interconnect', description: 'Dedicated private network link from on-premises to cloud.' },
      { aws: 'Site-to-Site VPN', azure: 'Azure VPN Gateway', gcp: 'Cloud VPN', description: 'Encrypted IPsec tunnel between on-premises and cloud.' },
      { aws: 'Transit Gateway', azure: 'Azure Virtual WAN', gcp: 'Cloud Router / VPC Peering', description: 'Centralized hub-and-spoke network connectivity.' },
      { aws: 'ALB', azure: 'Azure Application Gateway', gcp: 'Cloud Load Balancing (HTTP(S))', description: 'Layer 7 HTTP/HTTPS application load balancer.' },
      { aws: 'NLB', azure: 'Azure Load Balancer (Standard)', gcp: 'Cloud Load Balancing (TCP/UDP)', description: 'Layer 4 TCP/UDP high-performance load balancer.' },
      { aws: 'Global Accelerator', azure: 'Azure Front Door', gcp: 'Cloud CDN + Global Load Balancing', description: 'Global traffic acceleration over backbone network.' },
      { aws: 'PrivateLink', azure: 'Azure Private Link', gcp: 'Private Service Connect', description: 'Private connectivity to cloud services without internet.' },
      { aws: 'NAT Gateway', azure: 'Azure NAT Gateway', gcp: 'Cloud NAT', description: 'Managed outbound internet access for private subnets.' },
    ],
  },
  {
    category: 'Security & Identity',
    icon: '🔒',
    services: [
      { aws: 'IAM', azure: 'Azure Active Directory (Entra ID)', gcp: 'Cloud IAM', description: 'Identity and access management for cloud resources.' },
      { aws: 'Cognito', azure: 'Azure AD B2C / External Identities', gcp: 'Identity Platform (Firebase Auth)', description: 'User sign-up/sign-in and authentication for apps.' },
      { aws: 'KMS', azure: 'Azure Key Vault (Keys)', gcp: 'Cloud KMS', description: 'Managed encryption key management service.' },
      { aws: 'CloudHSM', azure: 'Azure Dedicated HSM', gcp: 'Cloud HSM', description: 'Dedicated hardware security module for key custody.' },
      { aws: 'Secrets Manager', azure: 'Azure Key Vault (Secrets)', gcp: 'Secret Manager', description: 'Managed storage and rotation of secrets/credentials.' },
      { aws: 'ACM', azure: 'App Service Certificates / Azure Key Vault', gcp: 'Certificate Manager', description: 'Managed SSL/TLS certificate provisioning.' },
      { aws: 'WAF', azure: 'Azure Web Application Firewall', gcp: 'Cloud Armor', description: 'Web Application Firewall for HTTP traffic filtering.' },
      { aws: 'Shield', azure: 'Azure DDoS Protection', gcp: 'Cloud Armor (DDoS)', description: 'DDoS protection service.' },
      { aws: 'GuardDuty', azure: 'Microsoft Defender for Cloud', gcp: 'Security Command Center (Threat Detection)', description: 'Threat detection from log analysis.' },
      { aws: 'Inspector', azure: 'Microsoft Defender for Servers (Qualys)', gcp: 'Security Command Center (Vulnerability Scanning)', description: 'Automated vulnerability scanning for compute resources.' },
      { aws: 'Macie', azure: 'Microsoft Purview (Data Map)', gcp: 'Cloud DLP (Data Loss Prevention)', description: 'Sensitive data (PII) discovery and protection.' },
      { aws: 'CloudTrail', azure: 'Azure Monitor Activity Log', gcp: 'Cloud Audit Logs', description: 'API call audit trail across the cloud account.' },
      { aws: 'Config', azure: 'Azure Policy / Azure Resource Graph', gcp: 'Cloud Asset Inventory / Policy Intelligence', description: 'Resource configuration tracking and compliance.' },
      { aws: 'Organizations', azure: 'Azure Management Groups', gcp: 'Resource Manager / Folders', description: 'Multi-account / multi-project governance and hierarchy.' },
      { aws: 'Control Tower', azure: 'Azure Landing Zones', gcp: 'Google Cloud Landing Zone', description: 'Automated secure multi-account environment setup.' },
      { aws: 'SSO / IAM Identity Center', azure: 'Azure AD SSO / Entra External ID', gcp: 'Cloud Identity / Workforce Identity Federation', description: 'Single sign-on across multiple accounts and apps.' },
    ],
  },
  {
    category: 'Messaging & Integration',
    icon: '🔗',
    services: [
      { aws: 'SQS', azure: 'Azure Service Bus (Queues) / Azure Queue Storage', gcp: 'Cloud Tasks / Pub/Sub', description: 'Managed message queuing service.' },
      { aws: 'SNS', azure: 'Azure Service Bus (Topics) / Azure Event Grid', gcp: 'Cloud Pub/Sub', description: 'Managed pub/sub notification and fan-out service.' },
      { aws: 'EventBridge', azure: 'Azure Event Grid', gcp: 'Eventarc', description: 'Serverless event bus for event-driven architectures.' },
      { aws: 'Step Functions', azure: 'Azure Logic Apps / Durable Functions', gcp: 'Cloud Workflows', description: 'Managed workflow orchestration / state machines.' },
      { aws: 'Kinesis Data Streams', azure: 'Azure Event Hubs', gcp: 'Cloud Pub/Sub', description: 'Real-time data streaming ingestion.' },
      { aws: 'Kinesis Firehose', azure: 'Azure Event Hubs Capture', gcp: 'Dataflow (streaming to storage)', description: 'Managed streaming data delivery to storage/warehouse.' },
      { aws: 'Amazon MQ', azure: 'Azure Service Bus (Premium)', gcp: 'Managed Service for RabbitMQ (partner)', description: 'Managed message broker for ActiveMQ / RabbitMQ workloads.' },
      { aws: 'MSK (Kafka)', azure: 'Azure HDInsight Kafka / Azure Event Hubs (Kafka protocol)', gcp: 'Managed Service for Apache Kafka', description: 'Managed Apache Kafka streaming platform.' },
    ],
  },
  {
    category: 'Analytics',
    icon: '📊',
    services: [
      { aws: 'Athena', azure: 'Azure Synapse Analytics (Serverless SQL)', gcp: 'BigQuery', description: 'Serverless SQL queries over object storage.' },
      { aws: 'EMR', azure: 'Azure HDInsight / Azure Databricks', gcp: 'Dataproc', description: 'Managed Spark / Hadoop big data cluster.' },
      { aws: 'Glue', azure: 'Azure Data Factory / Azure Purview', gcp: 'Cloud Dataflow / Data Catalog', description: 'Serverless ETL and data catalogue.' },
      { aws: 'Redshift', azure: 'Azure Synapse Analytics', gcp: 'BigQuery', description: 'Cloud data warehouse for OLAP workloads.' },
      { aws: 'OpenSearch Service', azure: 'Azure AI Search (Cognitive Search)', gcp: 'Vertex AI Search / OpenSearch on GKE', description: 'Managed search and log analytics (Elasticsearch-compatible).' },
      { aws: 'QuickSight', azure: 'Power BI (Embedded)', gcp: 'Looker Studio / Looker', description: 'Managed BI and data visualisation service.' },
      { aws: 'Lake Formation', azure: 'Azure Purview + Data Lake Storage', gcp: 'Dataplex', description: 'Managed data lake governance and security.' },
      { aws: 'Kinesis Data Analytics', azure: 'Azure Stream Analytics', gcp: 'Cloud Dataflow (streaming)', description: 'Real-time stream processing with SQL or Flink.' },
    ],
  },
  {
    category: 'Machine Learning & AI',
    icon: '🤖',
    services: [
      { aws: 'SageMaker', azure: 'Azure Machine Learning', gcp: 'Vertex AI', description: 'End-to-end managed ML platform (build, train, deploy).' },
      { aws: 'Rekognition', azure: 'Azure AI Vision', gcp: 'Vision AI', description: 'Image and video analysis API.' },
      { aws: 'Textract', azure: 'Azure AI Document Intelligence', gcp: 'Document AI', description: 'Extract text and structured data from documents.' },
      { aws: 'Comprehend', azure: 'Azure AI Language (Text Analytics)', gcp: 'Natural Language AI', description: 'Natural language processing (NLP) service.' },
      { aws: 'Translate', azure: 'Azure AI Translator', gcp: 'Cloud Translation API', description: 'Neural machine translation service.' },
      { aws: 'Polly', azure: 'Azure AI Speech (TTS)', gcp: 'Text-to-Speech API', description: 'Text-to-speech synthesis service.' },
      { aws: 'Transcribe', azure: 'Azure AI Speech (STT)', gcp: 'Speech-to-Text API', description: 'Automatic speech recognition (ASR) service.' },
      { aws: 'Lex', azure: 'Azure Bot Service / Azure AI Language', gcp: 'Dialogflow CX', description: 'Conversational chatbot building service.' },
      { aws: 'Personalize', azure: 'Azure Personalizer', gcp: 'Recommendations AI', description: 'ML-powered personalisation and recommendation engine.' },
      { aws: 'Forecast', azure: 'Azure AI AutoML (Forecasting)', gcp: 'Vertex AI Forecast', description: 'Managed time-series forecasting service.' },
      { aws: 'Kendra', azure: 'Azure AI Search', gcp: 'Vertex AI Search', description: 'Intelligent enterprise search powered by ML.' },
      { aws: 'Bedrock', azure: 'Azure OpenAI Service', gcp: 'Vertex AI Model Garden', description: 'Access to foundation models (FMs) / LLMs via API.' },
    ],
  },
  {
    category: 'Developer Tools & DevOps',
    icon: '🛠️',
    services: [
      { aws: 'CodeCommit', azure: 'Azure Repos (Git)', gcp: 'Cloud Source Repositories', description: 'Managed private Git source control.' },
      { aws: 'CodeBuild', azure: 'Azure Pipelines (Build)', gcp: 'Cloud Build', description: 'Managed CI build service.' },
      { aws: 'CodeDeploy', azure: 'Azure Pipelines (Release)', gcp: 'Cloud Deploy', description: 'Automated application deployment service.' },
      { aws: 'CodePipeline', azure: 'Azure Pipelines (CI/CD)', gcp: 'Cloud Build + Cloud Deploy', description: 'End-to-end CI/CD pipeline orchestration.' },
      { aws: 'CloudFormation', azure: 'Azure Resource Manager (ARM) / Bicep', gcp: 'Cloud Deployment Manager / Terraform (preferred)', description: 'Infrastructure-as-code service.' },
      { aws: 'CDK', azure: 'Azure Bicep / Pulumi', gcp: 'Pulumi / Terraform CDK', description: 'Define cloud infrastructure using programming languages.' },
      { aws: 'X-Ray', azure: 'Azure Application Insights (Distributed Tracing)', gcp: 'Cloud Trace', description: 'Distributed tracing for microservices.' },
      { aws: 'CloudWatch', azure: 'Azure Monitor', gcp: 'Cloud Monitoring (Operations Suite)', description: 'Metrics, logs, alarms and dashboards.' },
      { aws: 'Systems Manager', azure: 'Azure Arc + Azure Automation', gcp: 'OS Config / Cloud Operations', description: 'Unified management for patching and configuration.' },
      { aws: 'CodeArtifact', azure: 'Azure Artifacts', gcp: 'Artifact Registry', description: 'Managed package/artifact repository.' },
    ],
  },
  {
    category: 'Management & Governance',
    icon: '🏛️',
    services: [
      { aws: 'CloudTrail', azure: 'Azure Monitor Activity Log', gcp: 'Cloud Audit Logs', description: 'Audit log of all API activity.' },
      { aws: 'AWS Config', azure: 'Azure Policy / Azure Resource Graph', gcp: 'Cloud Asset Inventory', description: 'Resource configuration history and compliance checks.' },
      { aws: 'Trusted Advisor', azure: 'Azure Advisor', gcp: 'Active Assist / Recommender', description: 'Best-practice and cost-optimisation recommendations.' },
      { aws: 'Service Catalog', azure: 'Azure Managed Applications', gcp: 'Service Catalog', description: 'Approved product catalogue for self-service provisioning.' },
      { aws: 'Cost Explorer', azure: 'Azure Cost Management + Billing', gcp: 'Cloud Billing Reports / Cost Management', description: 'Spend analysis and cost forecasting.' },
      { aws: 'Budgets', azure: 'Azure Budgets', gcp: 'Cloud Billing Budgets', description: 'Spend threshold alerts and budget controls.' },
      { aws: 'Health Dashboard', azure: 'Azure Service Health', gcp: 'Google Cloud Status Dashboard', description: 'Personalised service health and incident notifications.' },
      { aws: 'License Manager', azure: 'Azure Hybrid Benefit / License Management', gcp: 'License Manager (partner tools)', description: 'Software licence tracking and compliance.' },
    ],
  },
  {
    category: 'Migration',
    icon: '🚚',
    services: [
      { aws: 'Migration Hub', azure: 'Azure Migrate', gcp: 'Google Cloud Migrate', description: 'Central dashboard for tracking cloud migrations.' },
      { aws: 'Application Discovery Service', azure: 'Azure Migrate (Discovery)', gcp: 'Migrate to Virtual Machines', description: 'On-premises server discovery for migration planning.' },
      { aws: 'DMS', azure: 'Azure Database Migration Service', gcp: 'Database Migration Service', description: 'Managed database migration to cloud.' },
      { aws: 'DataSync', azure: 'Azure File Sync / AzCopy', gcp: 'Storage Transfer Service', description: 'Automated file and data transfer to cloud.' },
      { aws: 'Snowball', azure: 'Azure Data Box', gcp: 'Transfer Appliance', description: 'Physical offline large-scale data migration device.' },
    ],
  },
  {
    category: 'IoT',
    icon: '📡',
    services: [
      { aws: 'IoT Core', azure: 'Azure IoT Hub', gcp: 'Cloud IoT Core (deprecated → Pub/Sub + Dataflow)', description: 'Managed IoT device connectivity and messaging.' },
      { aws: 'IoT Greengrass', azure: 'Azure IoT Edge', gcp: 'Google Distributed Cloud Edge', description: 'Cloud capabilities extended to edge / on-device.' },
      { aws: 'IoT Analytics', azure: 'Azure Stream Analytics', gcp: 'Dataflow / BigQuery', description: 'Analytics pipeline for IoT data streams.' },
      { aws: 'IoT SiteWise', azure: 'Azure Digital Twins', gcp: 'Industrial Dataspace (partner)', description: 'Collect and model industrial equipment data.' },
    ],
  },
  {
    category: 'End-User Computing',
    icon: '🖥️',
    services: [
      { aws: 'WorkSpaces', azure: 'Azure Virtual Desktop (AVD)', gcp: 'Chrome Enterprise / Cloud Workstations', description: 'Managed cloud desktop (DaaS) service.' },
      { aws: 'AppStream 2.0', azure: 'Azure Virtual Desktop (RemoteApp)', gcp: 'Cloud Workstations', description: 'Managed application streaming to a browser.' },
    ],
  },
];
