import type { ExamDefinition } from './types';

export const examDump1: ExamDefinition = {
    id: 'examDump1',
    title: 'SAA-C03 Exam Dump 1 — Mixed Scenarios',
    description: 'Mixed AWS Solutions Architect Associate exam-dump questions covering networking, databases, security, identity, encryption, and compliance topics — with detailed incorrect-option explanations and AWS documentation references.',
    durationSeconds: 7800,
    questions: [

        // ═══════════════════════════════════════════════════════════════════════
        // Question 1 — Networking / RDS Connectivity
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed1-q1',
            type: 'single',
            prompt: "A company's software development team needs an Amazon RDS Multi-AZ cluster. The RDS cluster will serve as a backend for a desktop client that is deployed on premises. The desktop client requires direct connectivity to the RDS cluster. The company must give the development team the ability to connect to the cluster by using the client when the team is in the office. Which solution provides the required connectivity MOST securely?",
            options: [
                'Create a VPC and two public subnets. Create the RDS cluster in the public subnets. Use AWS Site-to-Site VPN with a customer gateway in the company\'s office.',
                'Create a VPC and two private subnets. Create the RDS cluster in the private subnets. Use AWS Site-to-Site VPN with a customer gateway in the company\'s office.',
                'Create a VPC and two private subnets. Create the RDS cluster in the private subnets. Use RDS security groups to allow the company\'s office IP ranges to access the cluster.',
                'Create a VPC and two public subnets. Create the RDS cluster in the public subnets. Create a cluster user for each developer. Use RDS security groups to allow the users to access the cluster.',
            ],
            correctOptionIndex: 1,
            explanation: 'This solution provides the highest level of security by implementing a defense-in-depth strategy. Placing the Amazon RDS cluster in private subnets ensures it is not directly accessible from the public internet, which is a fundamental security best practice for databases. An AWS Site-to-Site VPN establishes a secure, encrypted IPsec tunnel between the company\'s on-premises office and the AWS VPC. This allows the desktop clients to communicate with the RDS cluster over a private, encrypted connection as if it were on the local network, without exposing any resources to the public internet.',
            incorrectOptionExplanations: {
                0: 'Placing the RDS cluster in public subnets exposes it to the internet, which is a significant and unnecessary security risk — even with a VPN tunnel in place. A database should never reside in a public subnet.',
                2: 'Security groups alone cannot establish connectivity from an on-premises network to private subnets within a VPC. A VPN or AWS Direct Connect is required to bridge the network gap; the cluster would simply be unreachable from the office.',
                3: 'This is the least secure option. It places the database in public subnets and relies only on security groups for network filtering, creating a direct attack surface on the internet. Per-user database accounts do not compensate for network-level exposure.',
            },
            references: [
                'AWS Documentation — Amazon RDS User Guide, "Using Amazon RDS with Amazon VPC": "A common strategy is to have a public subnet with a web server that has access to the internet and a private subnet with no internet access that contains your DB instances... We recommend that you run your DB instance in a private subnet."',
                'AWS Documentation — AWS Site-to-Site VPN User Guide, "What is AWS Site-to-Site VPN?": "By default, instances that you launch into an Amazon VPC can\'t communicate with your own (remote) network. You can enable access to your remote network from your VPC by creating an AWS Site-to-Site VPN connection."',
                'AWS Whitepapers — "Amazon Virtual Private Cloud Connectivity Options", section "AWS Managed VPN": Describes the service as a way to "establish an encrypted connection between your on-premises network and your Amazon VPCs over the internet."',
                'AWS Documentation — Amazon VPC User Guide, "Subnets for your VPC": "Resources in a private subnet can\'t be accessed from the internet." This reinforces why databases should be placed in private subnets.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 2 — Graph Database / Change Streams
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed1-q2',
            type: 'single',
            prompt: 'A social media company wants to store its database of user profiles, relationships, and interactions in the AWS Cloud. The company needs an application to monitor any changes in the database. The application needs to analyze the relationships between the data entities and to provide recommendations to users. Which solution will meet these requirements with the LEAST operational overhead?',
            options: [
                'Use Amazon Neptune to store the information. Use Amazon Kinesis Data Streams to process changes in the database.',
                'Use Amazon Neptune to store the information. Use Neptune Streams to process changes in the database.',
                'Use Amazon Quantum Ledger Database (Amazon QLDB) to store the information. Use Amazon Kinesis Data Streams to process changes in the database.',
                'Use Amazon Quantum Ledger Database (Amazon QLDB) to store the information. Use Neptune Streams to process changes in the database.',
            ],
            correctOptionIndex: 1,
            explanation: 'Social media data (profiles, relationships, interactions) is highly connected, making Amazon Neptune — a fully managed graph database — the ideal choice. Neptune Streams is a native, built-in feature that provides a complete, ordered log of all graph data changes with no extra infrastructure to manage, directly minimizing operational overhead. This combination also supports relationship-based recommendation engines natively.',
            incorrectOptionExplanations: {
                0: 'While Neptune is the correct database, integrating Kinesis Data Streams adds operational overhead because a custom mechanism must be built to capture changes from Neptune and publish them to Kinesis. Neptune Streams is simpler, native, and eliminates that extra pipeline.',
                2: 'Amazon QLDB is an immutable ledger database, not a graph database. It is not optimized for querying the complex, many-to-many relationships found in a social network, so relationship analysis and recommendations would be impractical.',
                3: 'Neptune Streams is a feature exclusive to Amazon Neptune and cannot be used with Amazon QLDB, making this option technically invalid. Additionally, QLDB is not suited for social-graph relationship analysis.',
            },
            references: [
                'AWS Documentation — Amazon Neptune Features, "Use cases": Lists "Social networking" and "Recommendation engines" as primary use cases for Neptune, which is designed to store and navigate relationships efficiently.',
                'AWS Documentation — "Capturing graph changes in real time using Neptune Streams": "You can use Neptune Streams to get a complete and ordered sequence of the changes in your graph data as they happen." This directly addresses monitoring changes with minimal overhead.',
                'AWS Documentation — "What is Amazon QLDB?", section "When should I use Amazon QLDB?": Describes QLDB as a ledger for applications requiring a verifiable history of all changes — distinct from relationship analysis needed for a social media graph.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 3 — Ledger Database / Compliance
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed1-q3',
            type: 'single',
            prompt: 'A company maintains its accounting records in a custom application that runs on Amazon EC2 instances. The company needs to migrate the data to an AWS managed service for development and maintenance of the application data. The solution must require minimal operational support and provide immutable, cryptographically verifiable logs of data changes. Which solution will meet these requirements MOST cost-effectively?',
            options: [
                'Copy the records from the application into an Amazon Redshift cluster.',
                'Copy the records from the application into an Amazon Neptune cluster.',
                'Copy the records from the application into an Amazon Timestream database.',
                'Copy the records from the application into an Amazon Quantum Ledger Database (Amazon QLDB) ledger.',
            ],
            correctOptionIndex: 3,
            explanation: 'Amazon QLDB is a purpose-built, fully managed, serverless ledger database designed for systems that require an immutable and cryptographically verifiable transaction log. Its journal is append-only and uses cryptographic hashing to link transactions, ensuring data integrity can be verified at any time. As a serverless service, QLDB also fulfils the requirement for minimal operational support — there are no clusters to provision or maintain.',
            incorrectOptionExplanations: {
                0: 'Amazon Redshift is a data warehouse optimized for large-scale analytics and business intelligence queries. It does not provide an append-only, cryptographically verifiable journal, making it unsuitable for ledger-based accounting compliance.',
                1: 'Amazon Neptune is a managed graph database designed for querying datasets with complex relationships (e.g., social graphs, fraud detection). It is not designed for ledger-based accounting systems or cryptographic change verification.',
                2: 'Amazon Timestream is a time-series database built for ingesting and analyzing time-stamped metrics — such as IoT sensor data or operational telemetry. It does not offer the immutable, verifiable ledger capabilities required for accounting.',
            },
            references: [
                'AWS Documentation — Amazon QLDB Developer Guide, "What is Amazon QLDB?": "Amazon QLDB is a fully managed ledger database that provides a transparent, immutable, and cryptographically verifiable transaction log... With QLDB, your data\'s change history is immutable — it can\'t be altered or deleted — and using cryptography, you can easily verify that there have been no unintended modifications to your application\'s data."',
                'AWS Whitepapers — Databases on AWS, "Purpose-built databases": Positions QLDB for "Systems of record, such as supply chain, finance, registration, and HR systems." In contrast, Redshift is described for analytics, Neptune for graph use cases, and Timestream for time-series data.',
                'AWS Documentation — Amazon Redshift Database Developer Guide, "Amazon Redshift system overview": "Amazon Redshift is a fully managed, petabyte-scale data warehouse service in the cloud." This confirms it is an analytical tool, not a ledger.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 4 — DDoS Protection / Shield Advanced
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed1-q4',
            type: 'single',
            prompt: 'A company is building an application in the AWS Cloud. The application is hosted on Amazon EC2 instances behind an Application Load Balancer (ALB). The company uses Amazon Route 53 for the DNS. The company needs a managed solution with proactive engagement to detect against DDoS attacks. Which solution will meet these requirements?',
            options: [
                'Enable AWS Config. Configure an AWS Config managed rule that detects DDoS attacks.',
                'Enable AWS WAF on the ALB. Create an AWS WAF web ACL with rules to detect and prevent DDoS attacks. Associate the web ACL with the ALB.',
                'Store the ALB access logs in an Amazon S3 bucket. Configure Amazon GuardDuty to detect and take automated preventative actions for DDoS attacks.',
                'Subscribe to AWS Shield Advanced. Configure hosted zones in Route 53. Add ALB resources as protected resources.',
            ],
            correctOptionIndex: 3,
            explanation: 'AWS Shield Advanced is a managed DDoS protection service that provides 24×7 access to the AWS Shield Response Team (SRT), which offers expert assistance before, during, and after a DDoS attack. This expert, proactive engagement directly fulfills the stated requirement. Shield Advanced is designed to protect resources such as Application Load Balancers and Route 53 hosted zones — exactly the resources described in the scenario.',
            incorrectOptionExplanations: {
                0: 'AWS Config is a service for assessing, auditing, and evaluating the configurations of AWS resources. It does not perform DDoS detection, provide attack mitigation, or offer any proactive engagement with a response team.',
                1: 'AWS WAF is a web application firewall that can help mitigate Layer 7 DDoS attacks via rate-based rules, but it is not a fully managed DDoS service and critically lacks the proactive engagement component provided by the AWS Shield Response Team (SRT).',
                2: 'Amazon GuardDuty is a threat detection service that monitors for malicious activity and unauthorized behavior across AWS accounts and workloads. It is not a DDoS mitigation service and does not provide proactive engagement from a dedicated incident-response team.',
            },
            references: [
                'AWS Shield Features, "24×7 access to the AWS Shield Response Team (SRT)": "With AWS Shield Advanced, you get 24×7 access to the AWS Shield Response Team (SRT) for custom mitigation during an attack... The SRT will also proactively contact you if a health check that you have associated with a protected resource becomes unhealthy during an event."',
                'AWS Documentation — What is AWS Shield Advanced?: "AWS Shield Advanced provides expanded DDoS attack protection for your AWS resources... including intelligent DDoS attack detection and mitigation for network layer (Layer 3), transport layer (Layer 4), and application layer (Layer 7) attacks."',
                'AWS WAF Developer Guide, "What is AWS WAF?": "AWS WAF is a web application firewall that lets you monitor the HTTP and HTTPS requests that are forwarded to your protected web application resources." This defines WAF\'s role, distinguishing it from a managed DDoS service with proactive engagement.',
                'Amazon GuardDuty User Guide, "What is Amazon GuardDuty?": "Amazon GuardDuty is a threat detection service that continuously monitors your AWS accounts and workloads for malicious activity and delivers detailed security findings for visibility and remediation." This clarifies GuardDuty\'s purpose as threat detection, not DDoS mitigation.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 5 — Encryption at Rest / PII Compliance
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed1-q5',
            type: 'single',
            prompt: 'A company is running a highly sensitive application on Amazon EC2 backed by an Amazon RDS database. Compliance regulations mandate that all personally identifiable information (PII) be encrypted at rest. Which solution should a solutions architect recommend to meet this requirement with the LEAST amount of changes to the infrastructure?',
            options: [
                'Deploy AWS Certificate Manager to generate certificates. Use the certificates to encrypt the database volume.',
                'Deploy AWS CloudHSM, generate encryption keys, and use the keys to encrypt database volumes.',
                'Configure SSL encryption using AWS Key Management Service (AWS KMS) keys to encrypt database volumes.',
                'Configure Amazon Elastic Block Store (Amazon EBS) encryption and Amazon RDS encryption with AWS Key Management Service (AWS KMS) keys to encrypt instance and database volumes.',
            ],
            correctOptionIndex: 3,
            explanation: 'Amazon EBS encryption and Amazon RDS encryption are native, built-in features that encrypt data at rest with minimal configuration changes. Both integrate seamlessly with AWS KMS for key management. Enabling these features requires only straightforward configuration — the least operational overhead — and directly satisfies the compliance requirement for both the EC2 (EBS volumes) and RDS database tiers.',
            incorrectOptionExplanations: {
                0: 'AWS Certificate Manager (ACM) provisions and manages SSL/TLS certificates for securing network communications (data in transit). It does not encrypt data stored at rest on EBS or RDS storage volumes and cannot be used for volume encryption.',
                1: 'AWS CloudHSM provides dedicated hardware security modules for cryptographic operations. While it supports encryption, it is significantly more complex and costly to set up, integrate, and operate compared to native KMS-based EBS/RDS encryption — directly violating the "least amount of changes" requirement.',
                2: 'SSL encryption is a protocol designed to protect data in transit over a network connection. It does not encrypt the underlying storage volumes where data resides at rest, so enabling SSL would not satisfy the at-rest encryption compliance mandate.',
            },
            references: [
                'AWS Documentation — Amazon EC2 User Guide, "Amazon EBS encryption": "Amazon EBS encryption is a feature that offers a simple encryption solution for your EBS volumes without you having to build, maintain, and secure your own key management infrastructure. It uses AWS Key Management Service (AWS KMS) keys when creating encrypted volumes and snapshots."',
                'AWS Documentation — Amazon RDS User Guide, "Encrypting Amazon RDS resources": "Amazon RDS encrypted DB instances use the industry-standard AES-256 encryption algorithm to encrypt your data on the server that hosts your DB instance. Amazon RDS handles authentication of access and decryption of your data transparently with minimal impact on performance. You don\'t need to modify your database client applications to use encryption... Amazon RDS uses AWS KMS to manage the encryption keys."',
                'AWS Documentation — AWS KMS Developer Guide, "How AWS services use AWS KMS": "AWS KMS integrates with many AWS services to help you protect the data that you store in those services."',
                'AWS Documentation — AWS Certificate Manager User Guide, "What is AWS Certificate Manager?": "AWS Certificate Manager is a service that lets you easily provision, manage, and deploy public and private SSL/TLS certificates for use with AWS services." This confirms ACM is for data in transit, not storage encryption.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 6 — Identity Federation / Active Directory
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed1-q6',
            type: 'single',
            prompt: "A company is developing a new application that uses Amazon EC2, Amazon S3, and AWS Lambda resources. The company wants to allow employees to access the AWS Management Console by using existing credentials that the company stores and manages in an on-premises Microsoft Active Directory. Each employee must have a specific level of access to the AWS resources that is based on the employee's role. Which solution will meet these requirements with the LEAST operational overhead?",
            options: [
                'Configure AWS Directory Service to create an Active Directory in AWS Managed Microsoft AD. Establish a trust relationship with the on-premises Active Directory. Configure IAM roles and trust policies to give the employees access to the AWS resources.',
                'Use LDAP to directly integrate the on-premises Active Directory with IAM. Map Active Directory groups to IAM roles to control access to AWS resources.',
                'Implement a custom identity broker to authenticate users into the on-premises Active Directory. Configure the identity broker to use AWS STS to grant authorized users IAM role-based access to the AWS resources.',
                'Configure Amazon Cognito to federate users into the on-premises Active Directory. Use Cognito user pools to manage user identities and to manage user access to the AWS resources.',
            ],
            correctOptionIndex: 0,
            explanation: 'AWS Directory Service (AWS Managed Microsoft AD) with a forest trust to the on-premises Active Directory is the most direct, fully managed solution for federating corporate credentials into AWS. Users authenticate with their existing on-premises credentials, and IAM roles mapped to AD groups enforce role-based access. Using fully managed AWS services significantly reduces the administrative burden compared to building a custom broker or using less direct integration methods.',
            incorrectOptionExplanations: {
                1: 'IAM does not natively support direct LDAP integration for federating user identities for AWS Management Console access. Achieving this would require a custom-built or third-party solution, significantly increasing operational overhead.',
                2: 'Building and maintaining a custom identity broker is a complex development task that represents the highest possible operational overhead — directly contradicting the "least operational overhead" requirement.',
                3: 'Amazon Cognito is primarily designed for customer-facing web and mobile application identity management (CIAM). It is not the AWS-recommended tool for federating internal corporate employees into the AWS Management Console using Active Directory credentials.',
            },
            references: [
                'AWS Documentation — AWS Directory Service Administration Guide, "AWS Managed Microsoft AD": "With AWS Managed Microsoft AD, you can run directory-aware workloads in the AWS Cloud... you can also configure a trust relationship between AWS Managed Microsoft AD in the AWS Cloud and your existing on-premises Microsoft Active Directory."',
                'AWS Documentation — AWS Identity and Access Management User Guide, "Identity providers and federation": "You can use an identity provider (IdP) to manage your user identities outside of AWS and give these external user identities permissions to use AWS resources in your account."',
            ],
        },


        // ═══════════════════════════════════════════════════════════════════════
        // Question 7 — S3 Encryption / KMS Key Rotation
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed1-q7',
            type: 'single',
            prompt: 'A company is preparing to store confidential data in Amazon S3. For compliance reasons, the data must be encrypted at rest. Encryption key usage must be logged for auditing purposes. Keys must be rotated every year. Which solution meets these requirements and is the MOST operationally efficient?',
            options: [
                'Server-side encryption with customer-provided keys (SSE-C)',
                'Server-side encryption with Amazon S3 managed keys (SSE-S3)',
                'Server-side encryption with AWS KMS keys (SSE-KMS) with manual rotation',
                'Server-side encryption with AWS KMS keys (SSE-KMS) with automatic rotation',
            ],
            correctOptionIndex: 3,
            explanation: 'SSE-KMS with automatic rotation meets all requirements with the least operational effort. AWS KMS integrates with AWS CloudTrail to log every use of the encryption key, satisfying the audit requirement. KMS supports automatic annual rotation of customer managed key material — once enabled, no further manual intervention is needed. This is the most operationally efficient approach.',
            incorrectOptionExplanations: {
                0: 'With SSE-C, AWS does not store or manage the keys, so it cannot log their usage (via CloudTrail) or automatically rotate them. This fails the logging, rotation, and operational-efficiency requirements.',
                1: 'SSE-S3 uses AWS-managed keys and does not provide a separately queryable CloudTrail audit trail of individual key usage events, which fails the specific auditing requirement.',
                2: 'SSE-KMS with manual rotation meets the encryption and logging requirements but requires manual action each year to rotate keys. This is less operationally efficient than the automated alternative.',
            },
            references: [
                'AWS KMS Developer Guide — "Rotating AWS KMS keys", section "How automatic key rotation works": "When you enable automatic key rotation for a customer managed key, AWS KMS generates new cryptographic material for the KMS key every year."',
                'Amazon S3 User Guide — "Protecting data using server-side encryption", section "Server-side encryption with AWS KMS keys (SSE-KMS)": Highlights "An audit trail of when your key was used and by whom" and the ability to use automatic key rotation.',
                'AWS KMS Developer Guide — "Logging AWS KMS API calls with AWS CloudTrail": "AWS KMS is integrated with AWS CloudTrail... CloudTrail captures all API calls for AWS KMS as events."',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 8 — VPC Endpoint / Private S3 Access
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed1-q8',
            type: 'single',
            prompt: "A company has applications that run on Amazon EC2 instances in a VPC. One of the applications needs to call the Amazon S3 API to store and read objects. According to the company's security regulations, no traffic from the applications is allowed to travel across the internet. Which solution will meet these requirements?",
            options: [
                'Configure an S3 gateway endpoint.',
                'Create an S3 bucket in a private subnet.',
                'Create an S3 bucket in the same AWS Region as the EC2 instances.',
                'Configure a NAT gateway in the same subnet as the EC2 instances.',
            ],
            correctOptionIndex: 0,
            explanation: 'A VPC gateway endpoint for Amazon S3 creates a route-table target that directs S3-bound traffic over the AWS private network — bypassing the public internet entirely. No internet gateway or NAT gateway is required. This directly satisfies the security regulation while requiring minimal configuration.',
            incorrectOptionExplanations: {
                1: 'S3 buckets are global resources stored in a specific AWS Region; they do not reside inside a VPC or private subnet. This option is architecturally incorrect and not possible.',
                2: 'Creating the bucket in the same Region is a latency and cost best practice but does not change how traffic is routed. By default, S3 API calls still traverse the public internet unless a VPC endpoint is configured.',
                3: 'A NAT gateway is specifically designed to let private-subnet instances send outbound traffic to the internet. Using one would route S3 traffic over the internet, directly violating the stated security requirement.',
            },
            references: [
                'AWS VPC User Guide — "Gateway endpoints": "A gateway endpoint is a gateway that you specify as a target for a route in your route table for traffic destined to a supported AWS service... Gateway endpoints are available for Amazon S3 and DynamoDB."',
                'Amazon S3 User Guide — "Controlling access from VPC endpoints": "With a VPC endpoint, you can securely connect to S3 without requiring an internet gateway, a NAT device, or a virtual private network (VPN) connection."',
                'AWS VPC User Guide — "NAT gateways": "You can use a NAT gateway to enable instances in a private subnet to connect to the internet or other AWS services..." This confirms NAT gateways route traffic over the internet.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 9 — BYOK / S3 Glacier Encryption (Multi-select)
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed1-q9',
            type: 'multiple',
            prompt: 'A company stores petabytes of historical medical information on premises. The company has a process to manage encryption of the data to comply with regulations. The company needs a cloud-based solution for data backup, recovery, and archiving. The company must retain control over the encryption key material. Which combination of solutions will meet these requirements? (Select TWO.)',
            options: [
                'Create an AWS Key Management Service (AWS KMS) key without key material. Import the company\'s key material into the KMS key.',
                'Create an AWS Key Management Service (AWS KMS) encryption key that contains key material generated by AWS KMS.',
                'Store the data in Amazon S3 Standard-Infrequent Access (S3 Standard-IA) storage. Use S3 Bucket Keys with AWS Key Management Service (AWS KMS) keys.',
                'Store the data in an Amazon S3 Glacier storage class. Use server-side encryption with customer-provided keys (SSE-C).',
                'Store the data in AWS Snowball devices. Use server-side encryption with AWS KMS keys (SSE-KMS).',
            ],
            correctOptionIndexes: [0, 3],
            explanation: 'Option A (BYOK — importing company-owned key material into a KMS key) directly satisfies the requirement to retain control over encryption key material. The company creates, manages, and keeps a secure copy of the key material. Option D pairs Amazon S3 Glacier (a low-cost long-term archival service suited for petabytes of historical data) with SSE-C, where the encryption key is provided on each request and never stored by AWS, giving the company full key control.',
            incorrectOptionExplanations: {
                1: 'With AWS KMS-generated key material, AWS creates and manages the cryptographic material internally. The company does not control or hold a copy of the key material, violating the retention requirement.',
                2: 'S3 Standard-IA is designed for infrequently accessed data that still needs rapid retrieval, making it more expensive than Glacier for long-term archiving. Additionally, using KMS-managed keys (not customer-provided) does not guarantee customer control over key material.',
                4: 'AWS Snowball is a physical data transport appliance used to move large datasets into AWS. It is not a long-term cloud storage or archiving service and does not satisfy the ongoing archiving requirement.',
            },
            references: [
                'AWS KMS Developer Guide — "Importing key material in AWS KMS keys": "You might choose to import your own key material to satisfy specific regulatory requirements... When you import your key material, you are responsible for maintaining a secure copy of your key material..."',
                'Amazon S3 User Guide — "Using server-side encryption with customer-provided keys (SSE-C)": "With SSE-C, you manage the encryption keys and Amazon S3 manages the encryption... Amazon S3 doesn\'t store the encryption key."',
                'Amazon S3 User Guide — "Amazon S3 storage classes": Describes the S3 Glacier storage classes as being for "long-term data archiving."',
                'AWS KMS Developer Guide — "AWS KMS concepts": An origin of AWSKMS means AWS created the key material; EXTERNAL means the key material was imported by the customer.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 10 — Control Tower / RAM / Multi-Account Networking
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed1-q10',
            type: 'single',
            prompt: 'A company wants to isolate its workloads by creating an AWS account for each workload. The company needs a solution that centrally manages networking components for the workloads. The solution also must create accounts with automatic security controls (guardrails). Which solution will meet these requirements with the LEAST operational overhead?',
            options: [
                'Use AWS Control Tower to deploy accounts. Create a networking account that has a VPC with private subnets and public subnets. Use AWS Resource Access Manager (AWS RAM) to share the subnets with the workload accounts.',
                'Use AWS Organizations to deploy accounts. Create a networking account that has a VPC with private subnets and public subnets. Use AWS Resource Access Manager (AWS RAM) to share the subnets with the workload accounts.',
                'Use AWS Control Tower to deploy accounts. Deploy a VPC in each workload account. Configure each VPC to route through an inspection VPC by using a transit gateway attachment.',
                'Use AWS Organizations to deploy accounts. Deploy a VPC in each workload account. Configure each VPC to route through an inspection VPC by using a transit gateway attachment.',
            ],
            correctOptionIndex: 0,
            explanation: 'AWS Control Tower is the purpose-built service for setting up and governing a secure multi-account environment with pre-configured guardrails — directly fulfilling the automated security requirement. A dedicated networking account hosting a central VPC, with subnets shared to workload accounts via AWS RAM, centralizes network management and lets workload accounts deploy resources without managing their own VPCs. This is the AWS recommended pattern for least operational overhead.',
            incorrectOptionExplanations: {
                1: 'AWS Organizations provides the framework for multi-account management but does not automatically apply pre-configured security guardrails. Additional manual configuration would be required, increasing operational overhead compared to Control Tower.',
                2: 'Using Control Tower satisfies the guardrails requirement, but deploying a separate VPC in every workload account decentralizes network management, contradicting the central networking requirement and increasing VPC management overhead.',
                3: 'This option fails on both counts: AWS Organizations lacks automated guardrails, and deploying a VPC per workload account decentralizes networking management. Neither core requirement is met.',
            },
            references: [
                'AWS Control Tower User Guide — "What Is AWS Control Tower?": "AWS Control Tower provides the easiest way to set up and govern a new, secure, multi-account AWS environment... It automates the setup of a landing zone... and details the automated Guardrails feature."',
                'AWS RAM User Guide — "Sharing your VPCs and subnets": "You can share subnets with other AWS accounts within the same AWS Organization... participants can create, modify, and delete their network resources in the shared subnets."',
                'AWS Whitepaper — "Organizing Your AWS Environment Using Multiple Accounts": Describes the pattern of using a dedicated "Network account" to create shared network resources such as VPCs, subnets, and transit gateways.',
                'AWS Well-Architected Framework — "Multiple accounts": "Use AWS Control Tower to set up and govern a secure multi-account environment... including guardrails." This reinforces Control Tower as the best-practice tool.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 11 — EBS Encryption by Default
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed1-q11',
            type: 'single',
            prompt: 'A company plans to rehost an application to Amazon EC2 instances that use Amazon Elastic Block Store (Amazon EBS) as the attached storage. A solutions architect must design a solution to ensure that all newly created Amazon EBS volumes are encrypted by default. The solution must also prevent the creation of unencrypted EBS volumes. Which solution will meet these requirements?',
            options: [
                'Configure the EC2 account attributes to always encrypt new EBS volumes.',
                'Use AWS Config. Configure the encrypted-volumes identifier. Apply the default AWS Key Management Service (AWS KMS) key.',
                'Configure AWS Systems Manager to create encrypted copies of the EBS volumes. Reconfigure the EC2 instances to use the encrypted volumes.',
                'Create a customer managed key in AWS Key Management Service (AWS KMS). Configure AWS Migration Hub to use the key when the company migrates workloads.',
            ],
            correctOptionIndex: 0,
            explanation: 'Enabling "EBS encryption by default" for the AWS account on a per-Region basis is a preventive control that ensures every new EBS volume and snapshot copy created in that Region is automatically encrypted at rest — no user action required during creation. This directly satisfies both requirements: default encryption and prevention of unencrypted volume creation.',
            incorrectOptionExplanations: {
                1: 'AWS Config is a detective control. The encrypted-volumes rule can identify unencrypted volumes after they have already been created, but it cannot prevent their creation. The prevention requirement is not met.',
                2: 'This describes a complex, manual remediation workflow — creating encrypted copies after the fact and reconfiguring instances. The goal is to prevent unencrypted volumes from being created in the first place, not to fix them retroactively.',
                3: 'AWS Migration Hub is a service for planning and tracking application migrations. It has no capability to enforce resource configuration policies such as default EBS encryption.',
            },
            references: [
                'Amazon EC2 User Guide — "Encryption by default": "You can enable encryption by default for your account. This is a Region-specific setting. After you enable encryption by default, all new EBS volumes and snapshot copies that you create in the Region are encrypted."',
                'AWS Config Managed Rules — "encrypted-volumes": "Check whether EBS volumes that are in an attached state are encrypted." Confirms this is a detective, not preventive, control.',
                'AWS Documentation — "What is AWS Migration Hub?": "AWS Migration Hub provides a single place to track the progress of application migrations." Confirms it is a tracking tool, not a policy enforcement engine.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 12 — Security Group Referencing / RDS Access Control
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed1-q12',
            type: 'single',
            prompt: 'A company is deploying a new application to a VPC on existing Amazon EC2 instances. The application has a presentation tier that uses an Auto Scaling group of EC2 instances. The application also has a database tier that uses an Amazon RDS Multi-AZ database. The VPC has two public subnets that are split between two Availability Zones. A solutions architect adds one private subnet to each Availability Zone for the RDS database. The solutions architect wants to restrict network access to the RDS database to block access from EC2 instances that do not host the new application. Which solution will meet this requirement?',
            options: [
                'Modify the RDS database security group to allow traffic from a CIDR range that includes IP addresses of the EC2 instances that host the new application.',
                'Associate a new ACL with the private subnets. Deny all incoming traffic from IP addresses that belong to any EC2 instance that does not host the new application.',
                'Modify the RDS database security group to allow traffic from the security group that is associated with the EC2 instances that host the new application.',
                'Associate a new ACL with the private subnets. Deny all incoming traffic except for traffic from a CIDR range that includes IP addresses of the EC2 instances that host the new application.',
            ],
            correctOptionIndex: 2,
            explanation: 'Referencing the application EC2 instances\' security group as the source in the RDS security group inbound rule creates a dynamic, identity-based rule. Traffic is automatically permitted from any instance associated with that security group, regardless of IP address. This is ideal for an Auto Scaling group where instance IPs are ephemeral and change over time — ensuring only the intended application tier can access the database.',
            incorrectOptionExplanations: {
                0: 'Using a CIDR range is not scalable for an Auto Scaling group. Instance IP addresses are dynamic and ephemeral; new instances may fall outside the specified CIDR, breaking connectivity or requiring constant manual updates.',
                1: 'Network ACLs are stateless and operate at the subnet level. Maintaining a deny list of individual IP addresses for a dynamic Auto Scaling group is operationally complex, error-prone, and not a recommended practice.',
                3: 'Like option A, using a CIDR-based Network ACL is not suitable for the dynamic nature of an Auto Scaling group where instance IPs change frequently, requiring constant updates to remain accurate.',
            },
            references: [
                'AWS VPC User Guide — "Security group rules", section "Rule components": "For the source or destination, you can specify... The ID of another security group." Confirms the capability to reference security groups as a traffic source.',
                'Amazon RDS User Guide — "Controlling access with security groups": "To allow an EC2 instance to connect to your DB instance, you can add a rule to the DB instance\'s VPC security group that allows connections from the security group that is associated with the EC2 instance."',
                'AWS VPC User Guide — "Compare security groups and network ACLs": Security groups operate at the instance level and are stateful; network ACLs are stateless and operate at the subnet level, making security groups the better tool for tier-to-tier access control.',
            ],
        },

    ],
};
