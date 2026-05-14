export interface ScenarioTip {
  scenario: string;
  service: string;
  note: string;
  keywords: string[];
}

export interface ScenarioCategory {
  category: string;
  icon: string;
  tips: ScenarioTip[];
}

export interface ComparisonOption {
  name: string;
  useWhen: string;
}

export interface Comparison {
  title: string;
  options: ComparisonOption[];
}

export interface KeyFact {
  service: string;
  fact: string;
  tag: 'limit' | 'tip' | 'gotcha' | 'default';
}

// ─── Scenario → Service tips ────────────────────────────────────────────────

export const scenarioCategories: ScenarioCategory[] = [
  {
    category: 'Storage',
    icon: '🗄️',
    tips: [
      {
        scenario: 'Store files/objects accessible from anywhere, virtually unlimited size',
        service: 'S3',
        note: 'Default object store; 99.999999999% durability; use lifecycle rules for cost.',
        keywords: ['object', 'files', 'unlimited', 'static website', 'backup'],
      },
      {
        scenario: 'Shared file system mounted across multiple EC2 instances simultaneously',
        service: 'EFS',
        note: 'NFS-based, elastic, multi-AZ by default; great for CMS, home dirs, shared code.',
        keywords: ['shared', 'concurrent', 'multiple EC2', 'NFS', 'POSIX'],
      },
      {
        scenario: 'High-performance block storage attached to a single EC2 instance',
        service: 'EBS',
        note: 'Single-AZ; persists independently of instance; use io2 for high IOPS.',
        keywords: ['block', 'single instance', 'database volume', 'IOPS', 'boot volume'],
      },
      {
        scenario: 'Windows-based shared file storage (SMB/NTFS, AD integration)',
        service: 'FSx for Windows File Server',
        note: 'Fully managed Windows FS; integrates with Active Directory.',
        keywords: ['windows', 'SMB', 'NTFS', 'Active Directory', 'DFS'],
      },
      {
        scenario: 'High-performance parallel file system for HPC, ML, or big data',
        service: 'FSx for Lustre',
        note: 'Sub-millisecond latency; integrates with S3 for warm data.',
        keywords: ['HPC', 'Lustre', 'parallel', 'ML training', 'high throughput'],
      },
      {
        scenario: 'Archive rarely accessed data for months or years at lowest cost',
        service: 'S3 Glacier / S3 Glacier Deep Archive',
        note: 'Glacier: retrieval in minutes. Deep Archive: retrieval in hours, cheapest.',
        keywords: ['archive', 'cold', 'infrequent', 'compliance retention', 'years'],
      },
      {
        scenario: 'On-premises app needs cloud storage but keep a local cache',
        service: 'Storage Gateway',
        note: 'File/Volume/Tape Gateway bridges on-prem to S3 or EBS with local cache.',
        keywords: ['hybrid', 'on-premises', 'local cache', 'tape', 'NFS on-prem'],
      },
      {
        scenario: 'Transfer terabytes / petabytes of data to AWS with limited bandwidth',
        service: 'Snowball / Snowball Edge',
        note: 'Physical device shipped by AWS; use when network transfer would take weeks.',
        keywords: ['large migration', 'offline transfer', 'petabyte', 'snowball'],
      },
      {
        scenario: 'Automated recurring data transfer between on-prem and S3/EFS',
        service: 'DataSync',
        note: 'Up to 10× faster than open-source tools; agent-based or agentless.',
        keywords: ['sync', 'scheduled transfer', 'agent', 'NFS to S3'],
      },
    ],
  },
  {
    category: 'Database',
    icon: '🛢️',
    tips: [
      {
        scenario: 'Relational database, fully managed, standard SQL workload',
        service: 'RDS',
        note: 'Supports MySQL, PostgreSQL, MariaDB, Oracle, SQL Server; automated backups.',
        keywords: ['relational', 'SQL', 'managed', 'OLTP', 'joins'],
      },
      {
        scenario: 'Relational database needing highest performance + auto-scaling storage',
        service: 'Aurora',
        note: '5× MySQL / 3× PostgreSQL throughput; 6-way replication across 3 AZs.',
        keywords: ['aurora', 'high performance', 'MySQL compatible', 'PostgreSQL compatible'],
      },
      {
        scenario: 'Relational database with unpredictable or intermittent traffic',
        service: 'Aurora Serverless',
        note: 'Scales capacity automatically to zero; pay-per-request; good for dev/test.',
        keywords: ['serverless', 'intermittent', 'variable load', 'auto-pause'],
      },
      {
        scenario: 'NoSQL, single-digit millisecond latency, massive scale, key-value or document',
        service: 'DynamoDB',
        note: 'Fully serverless; DynamoDB Streams for change capture; DAX for microsecond cache.',
        keywords: ['NoSQL', 'key-value', 'document', 'millisecond', 'gaming', 'IoT', 'serverless DB'],
      },
      {
        scenario: 'Speed up database reads with an in-memory caching layer',
        service: 'ElastiCache (Redis or Memcached)',
        note: 'Redis: persistence, multi-AZ, pub/sub. Memcached: simple, multi-threaded.',
        keywords: ['cache', 'in-memory', 'session store', 'leaderboard', 'real-time'],
      },
      {
        scenario: 'Run complex SQL analytics on large datasets (OLAP / data warehouse)',
        service: 'Redshift',
        note: 'Columnar storage; massively parallel; Redshift Spectrum queries S3 directly.',
        keywords: ['OLAP', 'data warehouse', 'analytics', 'columnar', 'business intelligence'],
      },
      {
        scenario: 'MongoDB-compatible document database, fully managed',
        service: 'DocumentDB',
        note: 'Drop-in replacement for MongoDB workloads with AWS-managed operations.',
        keywords: ['MongoDB', 'document', 'JSON'],
      },
      {
        scenario: 'Store highly connected data — social networks, fraud detection, knowledge graphs',
        service: 'Neptune',
        note: 'Supports Gremlin and SPARQL; up to 15 read replicas.',
        keywords: ['graph', 'relationships', 'social network', 'fraud', 'Gremlin'],
      },
      {
        scenario: 'Immutable, cryptographically verifiable transaction history (ledger)',
        service: 'QLDB',
        note: 'No decentralisation; use for financial transactions, audit logs.',
        keywords: ['ledger', 'immutable', 'audit', 'financial transactions', 'blockchain-like'],
      },
      {
        scenario: 'Store and query time-stamped IoT or operational metrics data',
        service: 'Timestream',
        note: 'Auto-tiers data between memory and magnetic; built-in time-series functions.',
        keywords: ['time-series', 'IoT', 'metrics', 'telemetry', 'operational data'],
      },
      {
        scenario: 'Too many DB connections overwhelming RDS (Lambda or microservices)',
        service: 'RDS Proxy',
        note: 'Pools and multiplexes connections; failover up to 66% faster.',
        keywords: ['connection pooling', 'Lambda RDS', 'too many connections', 'proxy'],
      },
    ],
  },
  {
    category: 'Compute',
    icon: '⚙️',
    tips: [
      {
        scenario: 'Need full OS control, custom AMI, or long-running workloads',
        service: 'EC2',
        note: 'Choose instance family for use case: C for CPU, R for memory, I for storage.',
        keywords: ['virtual machine', 'OS control', 'lift and shift', 'persistent server'],
      },
      {
        scenario: 'Run code in response to events with no server management',
        service: 'Lambda',
        note: 'Max 15 min runtime; 10 GB memory; pay per 1ms of execution.',
        keywords: ['event-driven', 'serverless function', 'no server', 'trigger', 'FaaS'],
      },
      {
        scenario: 'Deploy web/worker applications without managing infrastructure',
        service: 'Elastic Beanstalk',
        note: 'PaaS; you upload code, AWS handles capacity, LB, scaling, monitoring.',
        keywords: ['PaaS', 'deploy app', 'no infra management', 'easy deploy'],
      },
      {
        scenario: 'Run Docker containers with full cluster management control',
        service: 'ECS',
        note: 'AWS-native container orchestration; integrates tightly with ALB, IAM, CloudWatch.',
        keywords: ['Docker', 'containers', 'orchestration', 'ECS tasks'],
      },
      {
        scenario: 'Run containers without managing underlying EC2 instances',
        service: 'Fargate',
        note: 'Serverless compute for ECS/EKS; you define CPU/memory per task.',
        keywords: ['serverless containers', 'no EC2 management', 'Fargate task'],
      },
      {
        scenario: 'Need Kubernetes (K8s) on AWS with managed control plane',
        service: 'EKS',
        note: 'AWS manages master nodes; worker nodes are EC2 or Fargate.',
        keywords: ['Kubernetes', 'K8s', 'managed control plane', 'microservices'],
      },
      {
        scenario: 'Batch processing jobs — HPC, simulations, ETL at scale',
        service: 'AWS Batch',
        note: 'Manages EC2/Spot fleet dynamically; you define job queues and compute environments.',
        keywords: ['batch jobs', 'HPC', 'ETL', 'simulation', 'queue-based'],
      },
    ],
  },
  {
    category: 'Networking',
    icon: '🌐',
    tips: [
      {
        scenario: 'Distribute HTTP/HTTPS traffic with path/host-based routing',
        service: 'ALB (Application Load Balancer)',
        note: 'Layer 7; supports WebSocket, HTTP/2, Lambda targets, sticky sessions.',
        keywords: ['HTTP', 'HTTPS', 'path routing', 'host routing', 'Layer 7'],
      },
      {
        scenario: 'Ultra-high performance TCP/UDP load balancing, static IP',
        service: 'NLB (Network Load Balancer)',
        note: 'Layer 4; millions of requests/sec; preserves client IP; use for gaming, VoIP.',
        keywords: ['TCP', 'UDP', 'Layer 4', 'static IP', 'high throughput', 'PrivateLink'],
      },
      {
        scenario: 'Deliver static and dynamic content globally with low latency (CDN)',
        service: 'CloudFront',
        note: '400+ edge locations; integrates with S3, ALB, EC2; HTTPS by default with ACM.',
        keywords: ['CDN', 'edge', 'cache', 'static content', 'video streaming', 'global'],
      },
      {
        scenario: 'Improve global application availability and performance using AWS backbone',
        service: 'Global Accelerator',
        note: 'Routes to nearest healthy endpoint over AWS network; provides static Anycast IPs.',
        keywords: ['global routing', 'anycast IP', 'failover', 'gaming', 'non-HTTP'],
      },
      {
        scenario: 'Dedicated private connection from on-premises data centre to AWS',
        service: 'Direct Connect',
        note: 'Consistent bandwidth and latency; does NOT encrypt by default — add VPN on top.',
        keywords: ['dedicated line', 'private connection', 'consistent bandwidth', 'compliance'],
      },
      {
        scenario: 'Encrypted tunnel from on-premises to VPC over the public internet',
        service: 'Site-to-Site VPN',
        note: 'Quick to set up; variable latency; use as backup for Direct Connect.',
        keywords: ['VPN', 'IPsec', 'encrypted tunnel', 'internet', 'quick setup'],
      },
      {
        scenario: 'Connect multiple VPCs and on-premises networks through a central hub',
        service: 'Transit Gateway',
        note: 'Hub-and-spoke model; replaces complex VPC peering meshes; supports multicast.',
        keywords: ['hub spoke', 'multiple VPCs', 'transit', 'centralized routing'],
      },
      {
        scenario: 'Private access to AWS services (e.g., S3) without internet gateway',
        service: 'VPC Endpoints (Gateway / Interface)',
        note: 'Gateway: S3 and DynamoDB (free). Interface: everything else via PrivateLink.',
        keywords: ['private S3 access', 'no internet', 'endpoint', 'PrivateLink'],
      },
      {
        scenario: 'Route 53 needs to route based on latency, geography, health, or weight',
        service: 'Route 53 Routing Policies',
        note: 'Simple / Weighted / Latency / Failover / Geolocation / Geoproximity / Multi-value.',
        keywords: ['DNS routing', 'failover DNS', 'latency routing', 'geo routing'],
      },
      {
        scenario: 'Allow private subnets to reach the internet without inbound connections',
        service: 'NAT Gateway',
        note: 'Managed, AZ-specific; use one per AZ for high availability.',
        keywords: ['private subnet internet', 'outbound only', 'NAT', 'updates from private'],
      },
    ],
  },
  {
    category: 'Security & Identity',
    icon: '🔒',
    tips: [
      {
        scenario: 'Grant an EC2 instance permission to call AWS services (no hardcoded keys)',
        service: 'IAM Role (EC2 Instance Profile)',
        note: 'Always use roles over storing access keys on the instance.',
        keywords: ['instance permissions', 'no credentials', 'assume role', 'EC2 role'],
      },
      {
        scenario: 'Store and auto-rotate DB passwords, API keys, OAuth tokens',
        service: 'Secrets Manager',
        note: 'Automatic rotation via Lambda; fine-grained IAM; costs ~$0.40/secret/month.',
        keywords: ['rotate credentials', 'auto-rotate', 'DB password', 'API key'],
      },
      {
        scenario: 'Store configuration values or non-sensitive secrets cheaply',
        service: 'SSM Parameter Store',
        note: 'Free tier available; SecureString uses KMS; no auto-rotation built in.',
        keywords: ['config values', 'environment variables', 'free', 'parameter'],
      },
      {
        scenario: 'Encrypt data at rest or in transit using managed encryption keys',
        service: 'KMS',
        note: 'CMKs can be AWS-managed or customer-managed; integrates with S3, EBS, RDS.',
        keywords: ['encryption', 'key management', 'CMK', 'envelope encryption'],
      },
      {
        scenario: 'Compliance requires keys to never leave a hardware security module',
        service: 'CloudHSM',
        note: 'Single-tenant HSM; you manage keys; AWS cannot access them.',
        keywords: ['HSM', 'compliance', 'FIPS 140-2', 'dedicated hardware', 'key custody'],
      },
      {
        scenario: 'Protect web application from SQL injection, XSS, bad bots',
        service: 'WAF',
        note: 'Attach to ALB, CloudFront, or API Gateway; supports managed rule groups.',
        keywords: ['SQL injection', 'XSS', 'web exploit', 'OWASP', 'rate limiting'],
      },
      {
        scenario: 'Protect against DDoS attacks at Layer 3/4 and Layer 7',
        service: 'Shield (Standard / Advanced)',
        note: 'Standard: free, automatic. Advanced: $3k/month, 24/7 DRT, cost protection.',
        keywords: ['DDoS', 'distributed denial of service', 'volumetric attack'],
      },
      {
        scenario: 'Detect threats by analysing CloudTrail, VPC Flow Logs, DNS logs',
        service: 'GuardDuty',
        note: 'ML-based threat detection; no agents; 30-day free trial per account.',
        keywords: ['threat detection', 'anomaly', 'crypto mining', 'port scanning'],
      },
      {
        scenario: 'Scan EC2 and container images for OS and software vulnerabilities',
        service: 'Inspector',
        note: 'Agent-based for EC2; agentless for Lambda and ECR; produces findings with severity.',
        keywords: ['vulnerability scan', 'CVE', 'software vulnerability', 'container scan'],
      },
      {
        scenario: 'Discover and protect sensitive data (PII, credit cards) stored in S3',
        service: 'Macie',
        note: 'ML-based; auto-discovers S3 buckets; sends findings to Security Hub/EventBridge.',
        keywords: ['PII', 'sensitive data', 'GDPR', 'data classification', 'S3 data scan'],
      },
      {
        scenario: 'Audit every API call made across your AWS account',
        service: 'CloudTrail',
        note: 'Enabled by default (90-day history); send to S3 + CloudWatch Logs for long-term.',
        keywords: ['API audit', 'who did what', 'compliance', 'account activity'],
      },
    ],
  },
  {
    category: 'Messaging & Integration',
    icon: '🔗',
    tips: [
      {
        scenario: 'Decouple services so producer does not wait for consumer to process',
        service: 'SQS',
        note: 'Pull-based; message retention up to 14 days; at-least-once delivery.',
        keywords: ['decouple', 'queue', 'buffer', 'async', 'producer consumer'],
      },
      {
        scenario: 'Fan-out a message to multiple subscribers at the same time',
        service: 'SNS',
        note: 'Push-based pub/sub; supports SQS, Lambda, HTTP, email, SMS as subscribers.',
        keywords: ['fan-out', 'broadcast', 'pub/sub', 'notification', 'multiple receivers'],
      },
      {
        scenario: 'Exactly-once processing or strict message ordering required',
        service: 'SQS FIFO',
        note: 'Guarantees order and exactly-once; max 3,000 msg/sec with batching.',
        keywords: ['FIFO', 'ordering', 'exactly once', 'deduplication', 'financial'],
      },
      {
        scenario: 'Route events between AWS services, SaaS apps and custom apps',
        service: 'EventBridge',
        note: 'Schema registry; archive & replay; 90+ AWS service event sources.',
        keywords: ['event bus', 'event-driven', 'SaaS integration', 'scheduled events', 'cron'],
      },
      {
        scenario: 'Orchestrate multi-step workflows across AWS services with error handling',
        service: 'Step Functions',
        note: 'Visual state machine; Express (high-volume, async) or Standard (audit trail).',
        keywords: ['workflow', 'state machine', 'orchestration', 'retry logic', 'saga pattern'],
      },
      {
        scenario: 'Real-time ingestion of clickstreams, logs, IoT data at high throughput',
        service: 'Kinesis Data Streams',
        note: 'Shards-based; 1 MB/s per shard in; multiple consumers; replay up to 7 days.',
        keywords: ['real-time stream', 'clickstream', 'log ingestion', 'shards', 'replay'],
      },
      {
        scenario: 'Load streaming data into S3, Redshift, or OpenSearch without code',
        service: 'Kinesis Data Firehose',
        note: 'Near real-time (60s buffer); managed; no consumers to manage.',
        keywords: ['streaming to S3', 'streaming to Redshift', 'near real-time', 'no code'],
      },
      {
        scenario: 'Migrate from RabbitMQ or ActiveMQ to a managed broker',
        service: 'Amazon MQ',
        note: 'Use when existing app uses AMQP, MQTT, STOMP; not for new designs (prefer SQS/SNS).',
        keywords: ['RabbitMQ', 'ActiveMQ', 'AMQP', 'MQTT', 'existing broker migration'],
      },
    ],
  },
  {
    category: 'Monitoring & Observability',
    icon: '📊',
    tips: [
      {
        scenario: 'Monitor metrics, set alarms, and create dashboards for AWS resources',
        service: 'CloudWatch',
        note: 'Default metrics every 5 min; detailed monitoring every 1 min (extra cost).',
        keywords: ['metrics', 'alarms', 'dashboard', 'logs', 'CPU utilisation'],
      },
      {
        scenario: 'Trace requests through distributed microservices to find bottlenecks',
        service: 'X-Ray',
        note: 'Instruments code via SDK or daemon; shows service map with latency breakdown.',
        keywords: ['distributed tracing', 'service map', 'latency', 'bottleneck', 'microservices'],
      },
      {
        scenario: 'Track resource configuration changes and assess compliance over time',
        service: 'AWS Config',
        note: 'Rules can auto-remediate; stores config history; integrates with CloudTrail.',
        keywords: ['compliance', 'config drift', 'resource history', 'audit', 'change tracking'],
      },
      {
        scenario: 'Get best-practice recommendations across cost, security, performance, and fault tolerance',
        service: 'Trusted Advisor',
        note: 'Core checks free; full checks need Business/Enterprise Support plan.',
        keywords: ['recommendations', 'best practice', 'cost saving', 'security check'],
      },
    ],
  },
  {
    category: 'Analytics',
    icon: '📈',
    tips: [
      {
        scenario: 'Query data directly in S3 using SQL without loading it into a database',
        service: 'Athena',
        note: 'Serverless; $5/TB scanned; use Parquet/ORC + partitioning to reduce cost.',
        keywords: ['S3 SQL query', 'serverless query', 'ad-hoc', 'pay per query'],
      },
      {
        scenario: 'Run Spark / Hadoop jobs on large datasets at scale',
        service: 'EMR',
        note: 'Managed cluster; use Spot Instances for cost; master + core + task nodes.',
        keywords: ['Spark', 'Hadoop', 'MapReduce', 'big data processing', 'Hive'],
      },
      {
        scenario: 'Discover, catalogue, and prepare data for analytics (ETL)',
        service: 'Glue',
        note: 'Serverless; Data Catalog acts as Hive metastore for Athena/EMR.',
        keywords: ['ETL', 'data catalogue', 'crawlers', 'schema discovery', 'transform'],
      },
      {
        scenario: 'Search, analyse, and visualise logs and events at scale',
        service: 'OpenSearch Service',
        note: 'Managed Elasticsearch/OpenSearch; use Firehose as ingest pipeline.',
        keywords: ['log search', 'full-text search', 'Kibana', 'Elasticsearch', 'dashboards'],
      },
      {
        scenario: 'Build BI dashboards and visualisations without a BI server',
        service: 'QuickSight',
        note: 'Serverless; SPICE in-memory engine; per-session pricing.',
        keywords: ['BI', 'dashboards', 'visualisation', 'business intelligence', 'reports'],
      },
    ],
  },
  {
    category: 'Cost Optimisation',
    icon: '💰',
    tips: [
      {
        scenario: 'Reduce EC2 cost for steady, predictable workloads (1 or 3 year commitment)',
        service: 'Reserved Instances / Savings Plans',
        note: 'Up to 72% savings. Savings Plans are more flexible (apply across instance families).',
        keywords: ['steady state', 'long-term', 'predictable', '1 year', '3 year', 'commit'],
      },
      {
        scenario: 'Run fault-tolerant, stateless, or flexible workloads at lowest cost',
        service: 'Spot Instances',
        note: 'Up to 90% discount; can be interrupted with 2-min warning; not for critical jobs.',
        keywords: ['cheapest EC2', 'interruptible', 'batch', 'fault tolerant', 'spot'],
      },
      {
        scenario: 'Need EC2 capacity reserved in a specific AZ but want discount',
        service: 'Zonal Reserved Instances',
        note: 'Provides capacity reservation + discount; Regional RI gives flexibility but no reservation.',
        keywords: ['capacity reservation', 'AZ specific', 'guaranteed capacity'],
      },
      {
        scenario: 'Analyse and visualise spending trends, and forecast future costs',
        service: 'Cost Explorer',
        note: 'Free; 12 months of history; 12-month forecast; filter by service/tag/account.',
        keywords: ['spend analysis', 'cost forecast', 'billing trends', 'cost report'],
      },
      {
        scenario: 'Get alerted when spending exceeds a defined threshold',
        service: 'AWS Budgets',
        note: 'Supports cost, usage, RI/Savings Plans utilisation budgets; SNS/email alerts.',
        keywords: ['budget alert', 'overspend notification', 'cost alert', 'threshold'],
      },
    ],
  },
  {
    category: 'High Availability & DR',
    icon: '🛡️',
    tips: [
      {
        scenario: 'Protect against AZ failure with minimal data loss and auto-failover',
        service: 'Multi-AZ RDS / Aurora',
        note: 'Synchronous replication; automatic failover in ~60s (RDS) or ~30s (Aurora).',
        keywords: ['multi-AZ', 'automatic failover', 'synchronous', 'HA database'],
      },
      {
        scenario: 'Scale read traffic for RDS/Aurora without affecting the primary',
        service: 'Read Replicas',
        note: 'Asynchronous replication; RDS: up to 5 replicas; Aurora: up to 15.',
        keywords: ['read replica', 'read scaling', 'asynchronous', 'reporting queries'],
      },
      {
        scenario: 'Achieve RPO near zero and RTO in seconds across regions',
        service: 'Aurora Global Database',
        note: 'Primary region + up to 5 secondary; replication lag <1s; promote in <1 min.',
        keywords: ['global DR', 'cross-region', 'RPO near zero', 'sub-second replication'],
      },
      {
        scenario: 'Back up and replicate S3 objects to another region for DR',
        service: 'S3 Cross-Region Replication (CRR)',
        note: 'Async replication; requires versioning on both buckets.',
        keywords: ['S3 replication', 'cross-region', 'DR bucket', 'compliance copy'],
      },
      {
        scenario: 'Automatically replace unhealthy instances and maintain desired capacity',
        service: 'Auto Scaling Group',
        note: 'Define min/desired/max; integrates with ALB health checks and CloudWatch alarms.',
        keywords: ['auto healing', 'desired capacity', 'horizontal scaling', 'replace instances'],
      },
      {
        scenario: 'Keep RPO/RTO low for EC2 workloads across Regions',
        service: 'AWS Elastic Disaster Recovery (DRS)',
        note: 'Continuous block-level replication of servers to AWS; failover in minutes.',
        keywords: ['EC2 DR', 'disaster recovery', 'block replication', 'failover servers'],
      },
    ],
  },
];

// ─── Service Comparisons ─────────────────────────────────────────────────────

export const comparisons: Comparison[] = [
  {
    title: 'SQS vs SNS vs EventBridge',
    options: [
      { name: 'SQS', useWhen: 'You need to decouple a producer from a consumer with a persistent queue (pull-based, one consumer per message).' },
      { name: 'SNS', useWhen: 'You need to fan-out one message to many subscribers simultaneously (push-based pub/sub).' },
      { name: 'EventBridge', useWhen: 'You need event routing, filtering, transformation, or integration with 3rd-party SaaS apps and 90+ AWS services.' },
    ],
  },
  {
    title: 'CloudFront vs Global Accelerator',
    options: [
      { name: 'CloudFront', useWhen: 'Content delivery (CDN) — caches HTTP/S responses at edge locations; ideal for static assets, video, and dynamic web content.' },
      { name: 'Global Accelerator', useWhen: 'Network acceleration — no caching; routes TCP/UDP traffic over AWS backbone to the nearest healthy endpoint; best for gaming, VoIP, non-HTTP.' },
    ],
  },
  {
    title: 'Direct Connect vs Site-to-Site VPN',
    options: [
      { name: 'Direct Connect', useWhen: 'Need consistent, high-bandwidth, low-latency private link; compliance requires traffic off internet. Takes weeks to provision.' },
      { name: 'Site-to-Site VPN', useWhen: 'Need quick encrypted connectivity over internet; good as backup for Direct Connect; variable latency.' },
    ],
  },
  {
    title: 'EBS vs EFS vs S3',
    options: [
      { name: 'EBS', useWhen: 'Block storage for a single EC2 instance (databases, boot volumes). Low-latency, high IOPS.' },
      { name: 'EFS', useWhen: 'Shared file storage for multiple EC2 instances at once (NFS). Scales automatically.' },
      { name: 'S3', useWhen: 'Object storage for files, backups, static content. Accessed via HTTP API, not file system.' },
    ],
  },
  {
    title: 'RDS vs DynamoDB',
    options: [
      { name: 'RDS', useWhen: 'Need SQL, complex joins, transactions, or existing relational schema.' },
      { name: 'DynamoDB', useWhen: 'Need horizontal scale, single-digit ms latency, flexible schema, or serverless data storage.' },
    ],
  },
  {
    title: 'ALB vs NLB vs CLB',
    options: [
      { name: 'ALB', useWhen: 'HTTP/HTTPS workloads needing path-based routing, host-based routing, or WebSocket support (Layer 7).' },
      { name: 'NLB', useWhen: 'TCP/UDP workloads requiring extreme performance, static IP, or source IP preservation (Layer 4).' },
      { name: 'CLB', useWhen: 'Legacy only — do not use for new designs; no path routing, no WebSocket.' },
    ],
  },
  {
    title: 'Secrets Manager vs SSM Parameter Store',
    options: [
      { name: 'Secrets Manager', useWhen: 'Need automatic credential rotation, cross-account access, or storing DB passwords with rotation. Costs ~$0.40/secret/month.' },
      { name: 'SSM Parameter Store', useWhen: 'Need to store config values, non-sensitive strings, or secrets without rotation. Free tier available.' },
    ],
  },
  {
    title: 'Kinesis Data Streams vs Kinesis Firehose',
    options: [
      { name: 'Kinesis Data Streams', useWhen: 'Need real-time processing with custom consumers, multiple consumers, or replay (retention up to 7 days). Manage shards yourself.' },
      { name: 'Kinesis Firehose', useWhen: 'Need to load streaming data into S3/Redshift/OpenSearch with no code. Managed, near real-time (60s buffer min).' },
    ],
  },
  {
    title: 'ElastiCache Redis vs Memcached',
    options: [
      { name: 'Redis', useWhen: 'Need persistence, Multi-AZ failover, pub/sub, sorted sets, Lua scripting, or complex data types.' },
      { name: 'Memcached', useWhen: 'Need simple, high-performance multi-threaded caching with no persistence requirements. Pure cache only.' },
    ],
  },
  {
    title: 'CloudWatch vs CloudTrail vs AWS Config',
    options: [
      { name: 'CloudWatch', useWhen: 'Monitoring performance metrics and application logs in real time; set alarms.' },
      { name: 'CloudTrail', useWhen: 'Auditing WHO made WHAT API call and WHEN; account activity history.' },
      { name: 'AWS Config', useWhen: 'Tracking WHAT your resource configuration looks like over time and whether it is compliant.' },
    ],
  },
];

// ─── Key Facts / Numbers ─────────────────────────────────────────────────────

export const keyFacts: KeyFact[] = [
  { service: 'S3', fact: 'Max object size: 5 TB. Use multipart upload for files > 100 MB.', tag: 'limit' },
  { service: 'S3', fact: 'S3 Standard: 11 nines durability (99.999999999%).', tag: 'tip' },
  { service: 'S3', fact: 'S3 Transfer Acceleration uses CloudFront edge locations to speed up uploads.', tag: 'tip' },
  { service: 'Lambda', fact: 'Max execution timeout: 15 minutes. Max memory: 10 GB.', tag: 'limit' },
  { service: 'Lambda', fact: 'Default concurrent executions limit per region: 1,000 (can be increased).', tag: 'limit' },
  { service: 'Lambda', fact: 'Lambda@Edge: max 5s (viewer) / 30s (origin); deployed in us-east-1 and replicated globally.', tag: 'gotcha' },
  { service: 'SQS', fact: 'Max message size: 256 KB. Default visibility timeout: 30 seconds.', tag: 'limit' },
  { service: 'SQS', fact: 'Max message retention: 14 days. Default: 4 days.', tag: 'default' },
  { service: 'SQS FIFO', fact: 'Max throughput: 300 msg/s without batching, 3,000 msg/s with batching.', tag: 'limit' },
  { service: 'DynamoDB', fact: 'Single item max size: 400 KB.', tag: 'limit' },
  { service: 'DynamoDB', fact: 'DynamoDB Streams retain records for 24 hours.', tag: 'limit' },
  { service: 'DynamoDB', fact: 'DAX (DynamoDB Accelerator) adds in-memory caching with microsecond read latency.', tag: 'tip' },
  { service: 'RDS', fact: 'Multi-AZ is synchronous replication — for HA, NOT for read scaling.', tag: 'gotcha' },
  { service: 'RDS', fact: 'Read Replicas use asynchronous replication — for read scaling, can be promoted for DR.', tag: 'gotcha' },
  { service: 'RDS', fact: 'Max read replicas: MySQL/PostgreSQL 5; Aurora up to 15.', tag: 'limit' },
  { service: 'Aurora', fact: 'Aurora storage auto-scales in 10 GB increments up to 128 TB.', tag: 'tip' },
  { service: 'Aurora', fact: 'Aurora maintains 6 copies of data across 3 AZs (2 copies per AZ).', tag: 'tip' },
  { service: 'EBS', fact: 'gp3 is the default SSD; decouples IOPS from size (max 16,000 IOPS).', tag: 'tip' },
  { service: 'EBS', fact: 'io1/io2 supports Multi-Attach (same volume to multiple EC2 in same AZ).', tag: 'tip' },
  { service: 'EBS', fact: 'EBS snapshots are incremental and stored in S3 (but not directly visible).', tag: 'tip' },
  { service: 'CloudFront', fact: 'OAC (Origin Access Control) restricts S3 access to only CloudFront.', tag: 'tip' },
  { service: 'CloudFront', fact: 'Signed URLs: one file. Signed Cookies: multiple files.', tag: 'tip' },
  { service: 'VPC', fact: 'Max 5 VPCs per region by default (soft limit, can be increased).', tag: 'default' },
  { service: 'VPC', fact: 'CIDR block range: /16 (65,536 IPs) to /28 (16 IPs).', tag: 'limit' },
  { service: 'VPC', fact: 'Security Groups are stateful; NACLs are stateless (need inbound AND outbound rules).', tag: 'gotcha' },
  { service: 'IAM', fact: 'Evaluation order: Explicit DENY > Explicit ALLOW > Implicit DENY.', tag: 'gotcha' },
  { service: 'IAM', fact: 'Resource-based policies attached to S3, SQS, KMS, Lambda, etc. grant cross-account access.', tag: 'tip' },
  { service: 'KMS', fact: 'AWS-managed keys are rotated automatically every year; customer-managed keys: optional.', tag: 'default' },
  { service: 'Kinesis', fact: 'Each shard supports 1 MB/s or 1,000 records/s write; 2 MB/s read.', tag: 'limit' },
  { service: 'EC2', fact: 'Placement Groups: Cluster (low latency, same AZ), Spread (separate hardware, max 7/AZ), Partition (isolated groups for Hadoop/Cassandra).', tag: 'tip' },
  { service: 'EC2', fact: 'Instance store (ephemeral) is lost on stop/terminate; EBS persists.', tag: 'gotcha' },
  { service: 'Route 53', fact: 'Alias records are free and work for zone apex; CNAME cannot be used at zone apex.', tag: 'tip' },
  { service: 'Route 53', fact: 'Health checks can trigger DNS failover automatically.', tag: 'tip' },
  { service: 'Auto Scaling', fact: 'Cooldown period (default 300s) prevents triggering new scaling before previous action completes.', tag: 'default' },
  { service: 'Elastic Load Balancing', fact: 'Connection draining (deregistration delay): default 300s; allows in-flight requests to complete on deregistered targets.', tag: 'default' },
];
