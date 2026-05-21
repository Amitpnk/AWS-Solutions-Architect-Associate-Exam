import type { ExamDefinition } from './types';

export const examDump1: ExamDefinition = {
  id: 'examDump1',
  title: 'SAA-C03 Exam Dump 1 — Mixed Scenarios 1-65',
  description:
    'Mixed AWS Solutions Architect Associate exam-dump questions covering networking, databases, security, identity, encryption, and compliance topics — with detailed incorrect-option explanations and AWS documentation references.',
  durationSeconds: 7800,
  questions: [

    // ═══════════════════════════════════════════════════════════════════════
    // Question 1 — Networking / RDS Connectivity
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: 'ed1-q1',
      type: 'single',
      prompt:
        "A company's software development team needs an Amazon RDS Multi-AZ cluster. The RDS cluster will serve as a backend for a desktop client that is deployed on premises. The desktop client requires direct connectivity to the RDS cluster. The company must give the development team the ability to connect to the cluster by using the client when the team is in the office. Which solution provides the required connectivity MOST securely?",
      options: [
        "Create a VPC and two public subnets. Create the RDS cluster in the public subnets. Use AWS Site-to-Site VPN with a customer gateway in the company's office.",
        "Create a VPC and two private subnets. Create the RDS cluster in the private subnets. Use AWS Site-to-Site VPN with a customer gateway in the company's office.",
        "Create a VPC and two private subnets. Create the RDS cluster in the private subnets. Use RDS security groups to allow the company's office IP ranges to access the cluster.",
        "Create a VPC and two public subnets. Create the RDS cluster in the public subnets. Create a cluster user for each developer. Use RDS security groups to allow the users to access the cluster.",
      ],
      correctOptionIndex: 1,
      explanation:
        "This solution provides the highest level of security by implementing a defense-in-depth strategy. Placing the Amazon RDS cluster in private subnets ensures it is not directly accessible from the public internet, which is a fundamental security best practice for databases. An AWS Site-to-Site VPN establishes a secure, encrypted IPsec tunnel between the company's on-premises office and the AWS VPC. This allows the desktop clients to communicate with the RDS cluster over a private, encrypted connection as if it were on the local network, without exposing any resources to the public internet.",
      incorrectOptionExplanations: {
        0: 'Placing the RDS cluster in public subnets exposes it to the internet, which is a significant and unnecessary security risk — even with a VPN tunnel in place. A database should never reside in a public subnet.',
        2: 'Security groups alone cannot establish connectivity from an on-premises network to private subnets within a VPC. A VPN or AWS Direct Connect is required to bridge the network gap; the cluster would simply be unreachable from the office.',
        3: 'This is the least secure option. It places the database in public subnets and relies only on security groups for network filtering, creating a direct attack surface on the internet. Per-user database accounts do not compensate for network-level exposure.',
      },
      references: [
        'AWS Documentation — Amazon RDS User Guide, "Using Amazon RDS with Amazon VPC": Recommends running DB instances in a private subnet.',
        'AWS Documentation — AWS Site-to-Site VPN User Guide, "What is AWS Site-to-Site VPN?": Explains enabling access from a VPC to a remote network via VPN.',
        'AWS Whitepapers — "Amazon Virtual Private Cloud Connectivity Options", section "AWS Managed VPN": Describes establishing an encrypted connection between on-premises and VPCs.',
        'AWS Documentation — Amazon VPC User Guide, "Subnets for your VPC": Resources in a private subnet cannot be accessed from the internet.',
      ],
    },

    // ═══════════════════════════════════════════════════════════════════════
    // Question 2 — Graph DB / Neptune Streams
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: 'ed1-q2',
      type: 'single',
      prompt:
        'A social media company wants to store its database of user profiles, relationships, and interactions in the AWS Cloud. The company needs an application to monitor any changes in the database. The application needs to analyze the relationships between the data entities and to provide recommendations to users. Which solution will meet these requirements with the LEAST operational overhead?',
      options: [
        'Use Amazon Neptune to store the information. Use Amazon Kinesis Data Streams to process changes in the database.',
        'Use Amazon Neptune to store the information. Use Neptune Streams to process changes in the database.',
        'Use Amazon Quantum Ledger Database (Amazon QLDB) to store the information. Use Amazon Kinesis Data Streams to process changes in the database.',
        'Use Amazon Quantum Ledger Database (Amazon QLDB) to store the information. Use Neptune Streams to process changes in the database.',
      ],
      correctOptionIndex: 1,
      explanation:
        'The scenario describes a social media application with highly connected data (profiles, relationships, interactions) and the need for relationship analysis and recommendations — a classic graph database use case. Amazon Neptune is a fully managed graph database ideal for this purpose. Neptune Streams is a native feature that provides a complete, ordered log of all changes to the graph data. Using this built-in feature requires less management than setting up a separate data streaming pipeline with Amazon Kinesis.',
      incorrectOptionExplanations: {
        0: 'While possible, using Kinesis Data Streams adds operational overhead by requiring a custom mechanism to capture changes from Neptune and publish them to Kinesis, unlike the native Neptune Streams feature.',
        2: 'Amazon QLDB is an immutable ledger database, not a graph database. It is not optimized for querying the complex, many-to-many relationships found in a social network.',
        3: 'Neptune Streams is a feature exclusive to Amazon Neptune and cannot be used with Amazon QLDB, making this option technically invalid.',
      },
      references: [
        'Amazon Neptune — Use cases: Lists "Social networking" and "Recommendation engines" as primary use cases.',
        'AWS Documentation — "Capturing graph changes in real time using Neptune streams": Neptune Streams provides a complete and ordered sequence of graph data changes.',
        'AWS Documentation — "What is Amazon QLDB?": QLDB is for applications requiring a verifiable history of all changes, not for relationship analysis.',
      ],
    },

    // ═══════════════════════════════════════════════════════════════════════
    // Question 3 — Ledger DB / QLDB
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: 'ed1-q3',
      type: 'single',
      prompt:
        'A company maintains its accounting records in a custom application that runs on Amazon EC2 instances. The company needs to migrate the data to an AWS managed service for development and maintenance of the application data. The solution must require minimal operational support and provide immutable, cryptographically verifiable logs of data changes. Which solution will meet these requirements MOST cost-effectively?',
      options: [
        'Copy the records from the application into an Amazon Redshift cluster.',
        'Copy the records from the application into an Amazon Neptune cluster.',
        'Copy the records from the application into an Amazon Timestream database.',
        'Copy the records from the application into an Amazon Quantum Ledger Database (Amazon QLDB) ledger.',
      ],
      correctOptionIndex: 3,
      explanation:
        'Amazon Quantum Ledger Database (QLDB) is a purpose-built, fully managed ledger database designed for this exact use case. It maintains a complete and unchangeable history of all application data changes. Its journal is append-only and uses cryptographic hashing to link transactions, ensuring data integrity can be verified. As a serverless service, it also fulfills the requirement for minimal operational support.',
      incorrectOptionExplanations: {
        0: 'Amazon Redshift is a data warehouse optimized for large-scale analytics and business intelligence, not for maintaining a transactional, verifiable ledger.',
        1: 'Amazon Neptune is a managed graph database service designed for querying datasets with complex relationships, which is not the primary need for an accounting system.',
        2: 'Amazon Timestream is a time-series database built for ingesting and analyzing time-stamped data such as from IoT devices, not for ledger-based applications.',
      },
      references: [
        'Amazon QLDB Developer Guide — "What is Amazon QLDB?": QLDB provides a transparent, immutable, and cryptographically verifiable transaction log.',
        'AWS Whitepaper — Databases on AWS: Positions QLDB for systems of record such as finance, registration, and HR systems.',
        'Amazon Redshift Documentation: Defines Redshift as a fully managed, petabyte-scale data warehouse — an analytical tool, not a ledger.',
      ],
    },

    // ═══════════════════════════════════════════════════════════════════════
    // Question 4 — DDoS / Shield Advanced
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: 'ed1-q4',
      type: 'single',
      prompt:
        'A company is building an application in the AWS Cloud. The application is hosted on Amazon EC2 instances behind an Application Load Balancer (ALB). The company uses Amazon Route 53 for the DNS. The company needs a managed solution with proactive engagement to detect against DDoS attacks. Which solution will meet these requirements?',
      options: [
        'Enable AWS Config. Configure an AWS Config managed rule that detects DDoS attacks.',
        'Enable AWS WAF on the ALB. Create an AWS WAF web ACL with rules to detect and prevent DDoS attacks. Associate the web ACL with the ALB.',
        'Store the ALB access logs in an Amazon S3 bucket. Configure Amazon GuardDuty to detect and take automated preventative actions for DDoS attacks.',
        'Subscribe to AWS Shield Advanced. Configure hosted zones in Route 53. Add ALB resources as protected resources.',
      ],
      correctOptionIndex: 3,
      explanation:
        'AWS Shield Advanced is a managed DDoS protection service that provides enhanced protections for applications running on AWS. A key feature of Shield Advanced is 24x7 access to the AWS Shield Response Team (SRT), which offers expert assistance before, during, and after a DDoS attack. This direct, expert involvement fulfills the requirement for a "managed solution with proactive engagement." The service protects resources such as Application Load Balancers and Amazon Route 53 hosted zones.',
      incorrectOptionExplanations: {
        0: 'AWS Config is a service for assessing, auditing, and evaluating resource configurations. It is not a DDoS detection or mitigation service.',
        1: 'AWS WAF can mitigate some Layer 7 DDoS attacks but is not a fully managed service and lacks the proactive engagement component provided by the AWS SRT.',
        2: 'Amazon GuardDuty is a threat detection service that monitors for malicious activity. It is not a primary DDoS mitigation service and does not offer proactive engagement from a response team.',
      },
      references: [
        'AWS Shield Features — "24x7 access to the AWS Shield Response Team (SRT)" section: Shield Advanced provides proactive SRT contact when health checks become unhealthy during an event.',
        'AWS Shield Documentation — "What is AWS Shield Advanced?": Provides intelligent DDoS attack detection and mitigation for Layers 3, 4, and 7.',
        'AWS WAF Developer Guide — "What is AWS WAF?": Defines WAF as a web application firewall, distinguishing it from a managed DDoS service.',
        'Amazon GuardDuty User Guide — "What is Amazon GuardDuty?": GuardDuty is a threat detection service, not a DDoS mitigation service.',
      ],
    },

    // ═══════════════════════════════════════════════════════════════════════
    // Question 5 — Encryption at Rest / EBS + RDS
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: 'ed1-q5',
      type: 'single',
      prompt:
        'A company is running a highly sensitive application on Amazon EC2 backed by an Amazon RDS database. Compliance regulations mandate that all personally identifiable information (PII) be encrypted at rest. Which solution should a solutions architect recommend to meet this requirement with the LEAST amount of changes to the infrastructure?',
      options: [
        'Deploy AWS Certificate Manager to generate certificates. Use the certificates to encrypt the database volume.',
        'Deploy AWS CloudHSM. Generate encryption keys, and use the keys to encrypt database volumes.',
        'Configure SSL encryption using AWS Key Management Service (AWS KMS) keys to encrypt database volumes.',
        'Configure Amazon Elastic Block Store (Amazon EBS) encryption and Amazon RDS encryption with AWS Key Management Service (AWS KMS) keys to encrypt instance and database volumes.',
      ],
      correctOptionIndex: 3,
      explanation:
        'Amazon EBS encryption is a native feature that encrypts data at rest for volumes attached to EC2 instances. Similarly, Amazon RDS encryption encrypts the underlying database storage, automated backups, read replicas, and snapshots. Both services seamlessly integrate with AWS KMS to manage encryption keys. Enabling these features is a straightforward configuration change, directly addressing the compliance requirement for both tiers of the application with the least operational overhead.',
      incorrectOptionExplanations: {
        0: 'AWS Certificate Manager (ACM) provides and manages SSL/TLS certificates for securing network communications (data in transit), not for encrypting data at rest on storage volumes.',
        1: 'AWS CloudHSM provides dedicated hardware security modules. While it can be used for encryption, it is a more complex and costly solution, violating the "least amount of changes" requirement.',
        2: 'This option incorrectly combines SSL encryption, which is for data in transit, with the task of encrypting database volumes at rest. SSL does not encrypt the underlying storage.',
      },
      references: [
        'Amazon EBS Encryption — AWS EC2 User Guide: EBS encryption uses AWS KMS keys when creating encrypted volumes and snapshots.',
        'Amazon RDS Encryption — AWS RDS User Guide: Amazon RDS uses AES-256 and AWS KMS to manage encryption keys for encrypted DB instances.',
        'AWS KMS Integration: When you use an AWS service integrated with KMS, you can use that service to encrypt your data.',
        'AWS Certificate Manager User Guide: ACM provisions SSL/TLS certificates for network communications.',
      ],
    },

    // ═══════════════════════════════════════════════════════════════════════
    // Question 6 — Active Directory Federation / IAM Identity
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: 'ed1-q6',
      type: 'single',
      prompt:
        "A company is developing a new application that uses Amazon EC2, Amazon S3, and AWS Lambda resources. The company wants to allow employees to access the AWS Management Console by using existing credentials that the company stores and manages in an on-premises Microsoft Active Directory. Each employee must have a specific level of access to the AWS resources that is based on the employee's role. Which solution will meet these requirements with the LEAST operational overhead?",
      options: [
        'Configure AWS Directory Service to create an Active Directory in AWS Managed Microsoft AD. Establish a trust relationship with the on-premises Active Directory. Configure IAM roles and trust policies to give the employees access to the AWS resources.',
        'Use LDAP to directly integrate the on-premises Active Directory with IAM. Map Active Directory groups to IAM roles to control access to AWS resources.',
        'Implement a custom identity broker to authenticate users into the on-premises Active Directory. Configure the identity broker to use AWS STS to grant authorized users IAM role-based access to the AWS resources.',
        'Configure Amazon Cognito to federate users into the on-premises Active Directory. Use Cognito user pools to manage user identities and to manage user access to the AWS resources.',
      ],
      correctOptionIndex: 0,
      explanation:
        "The most direct and lowest-overhead solution is to use AWS Directory Service to create an AWS Managed Microsoft AD and establish a forest trust relationship with the on-premises directory. This allows users to authenticate with their existing corporate credentials. IAM roles can then be mapped to AD groups to enforce role-based access control. This approach uses fully managed AWS services, significantly reducing the administrative burden compared to building a custom solution.",
      incorrectOptionExplanations: {
        1: 'IAM does not offer direct LDAP integration for federating users for console access. This would require a custom-built or third-party solution, increasing overhead.',
        2: 'Implementing a custom identity broker is a complex development task that represents the highest possible operational overhead, directly contradicting the requirement.',
        3: 'Amazon Cognito is primarily designed for customer-facing web and mobile application identity management (CIAM), not for federating corporate employees for AWS console access.',
      },
      references: [
        'AWS Directory Service Administration Guide — AWS Managed Microsoft AD: Supports running directory-aware workloads and configuring trust relationships with on-premises Active Directory.',
        'AWS IAM User Guide — Identity providers and federation: Describes using an IdP to manage user identities outside AWS and give them permissions to use AWS resources.',
      ],
    },

    // ═══════════════════════════════════════════════════════════════════════
    // Question 7 — SSE-KMS / Key Rotation / Auditing
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: 'ed1-q7',
      type: 'single',
      prompt:
        'A company is preparing to store confidential data in Amazon S3. For compliance reasons, the data must be encrypted at rest. Encryption key usage must be logged for auditing purposes. Keys must be rotated every year. Which solution meets these requirements and is the MOST operationally efficient?',
      options: [
        'Server-side encryption with customer-provided keys (SSE-C)',
        'Server-side encryption with Amazon S3 managed keys (SSE-S3)',
        'Server-side encryption with AWS KMS keys (SSE-KMS) with manual rotation',
        'Server-side encryption with AWS KMS keys (SSE-KMS) with automatic rotation',
      ],
      correctOptionIndex: 3,
      explanation:
        'Server-side encryption with AWS KMS (SSE-KMS) is the only option that meets all criteria. AWS KMS integrates with AWS CloudTrail to log every use of the encryption key, satisfying the audit requirement. KMS supports automatic annual rotation of the backing key material for customer managed keys. This automated process is the most operationally efficient method, as it requires no manual intervention after initial setup.',
      incorrectOptionExplanations: {
        0: 'AWS does not store or manage SSE-C keys, so it cannot log their usage or rotate them. This fails the logging, rotation, and operational efficiency requirements.',
        1: 'SSE-S3 does not provide a detailed audit trail of key usage separable from S3 object-level actions, failing the specific auditing requirement.',
        2: 'While SSE-KMS with manual rotation meets the encryption and logging requirements, manual rotation is not the most operationally efficient solution compared to the automated alternative.',
      },
      references: [
        'AWS KMS Developer Guide — "Rotating AWS KMS keys": Automatic key rotation generates new cryptographic material for the KMS key every year.',
        'Amazon S3 User Guide — SSE-KMS section: Highlights an audit trail of when keys were used and supports automatic key rotation.',
        'AWS KMS Developer Guide — "Logging AWS KMS API calls with AWS CloudTrail": CloudTrail captures all API calls for AWS KMS as events.',
      ],
    },

    // ═══════════════════════════════════════════════════════════════════════
    // Question 8 — VPC Gateway Endpoint / S3
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: 'ed1-q8',
      type: 'single',
      prompt:
        "A company has applications that run on Amazon EC2 instances in a VPC. One of the applications needs to call the Amazon S3 API to store and read objects. According to the company's security regulations, no traffic from the applications is allowed to travel across the internet. Which solution will meet these requirements?",
      options: [
        'Configure an S3 gateway endpoint.',
        'Create an S3 bucket in a private subnet.',
        'Create an S3 bucket in the same AWS Region as the EC2 instances.',
        'Configure a NAT gateway in the same subnet as the EC2 instances.',
      ],
      correctOptionIndex: 0,
      explanation:
        'A VPC gateway endpoint for Amazon S3 provides a secure and private connection between your VPC and S3. It creates a target for a route in the VPC route table for traffic destined for S3. This ensures that traffic from EC2 instances to S3 is routed over the AWS private network and does not traverse the public internet.',
      incorrectOptionExplanations: {
        1: 'S3 buckets are global resources with data stored in a specific region; they do not reside within a VPC or a private subnet. This option is architecturally incorrect.',
        2: 'Placing the S3 bucket in the same region is a best practice for latency and cost, but it does not prevent traffic from traversing the internet by default.',
        3: 'A NAT gateway is specifically designed to enable instances in a private subnet to send traffic to the internet, which directly violates the stated security requirement.',
      },
      references: [
        'AWS VPC User Guide — Gateway endpoints: A gateway endpoint routes traffic to Amazon S3 and DynamoDB privately.',
        'Amazon S3 User Guide — Controlling access from VPC endpoints: VPC endpoints allow secure connection to S3 without requiring an internet gateway, NAT device, or VPN.',
        'AWS VPC User Guide — NAT gateways: NAT gateways facilitate outbound internet connectivity, contrary to this requirement.',
      ],
    },

    // ═══════════════════════════════════════════════════════════════════════
    // Question 9 — BYOK / S3 Glacier Encryption (Multi-select)
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: 'ed1-q9',
      type: 'multiple',
      prompt:
        'A company stores petabytes of historical medical information on premises. The company has a process to manage encryption of the data to comply with regulations. The company needs a cloud-based solution for data backup, recovery, and archiving. The company must retain control over the encryption key material. Which combination of solutions will meet these requirements? (Select TWO.)',
      options: [
        "Create an AWS Key Management Service (AWS KMS) key without key material. Import the company's key material into the KMS key.",
        'Create an AWS Key Management Service (AWS KMS) encryption key that contains key material generated by AWS KMS.',
        'Store the data in Amazon S3 Standard-Infrequent Access (S3 Standard-IA) storage. Use S3 Bucket Keys with AWS Key Management Service (AWS KMS) keys.',
        'Store the data in an Amazon S3 Glacier storage class. Use server-side encryption with customer-provided keys (SSE-C).',
        'Store the data in AWS Snowball devices. Use server-side encryption with AWS KMS keys (SSE-KMS).',
      ],
      correctOptionIndexes: [0, 3],
      explanation:
        'Option A (BYOK — importing company-owned key material into a KMS key) directly satisfies the requirement to retain control over encryption key material. Option D pairs Amazon S3 Glacier (a low-cost long-term archival service suited for petabytes of historical data) with SSE-C, where the encryption key is provided on each request and never stored by AWS, giving the company full key control.',
      incorrectOptionExplanations: {
        1: 'With AWS KMS-generated key material, AWS creates and manages the cryptographic material internally. The company does not control or hold a copy of the key material, violating the retention requirement.',
        2: 'S3 Standard-IA is more expensive than Glacier for long-term archiving. Using KMS-managed keys does not guarantee customer control over key material.',
        4: 'AWS Snowball is a physical data transport appliance used to move large datasets into AWS. It is not a long-term cloud storage or archiving service.',
      },
      references: [
        'AWS KMS Developer Guide — "Importing key material in AWS KMS keys": The customer is responsible for maintaining a secure copy of imported key material.',
        'Amazon S3 User Guide — SSE-C: AWS does not store the encryption key when SSE-C is used.',
        'Amazon S3 User Guide — Amazon S3 storage classes: S3 Glacier is for long-term data archiving.',
        'AWS KMS Developer Guide — AWS KMS concepts: Origin AWSKMS means AWS created the key; EXTERNAL means the customer imported it.',
      ],
    },

    // ═══════════════════════════════════════════════════════════════════════
    // Question 10 — Control Tower / RAM / Guardrails
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: 'ed1-q10',
      type: 'single',
      prompt:
        'A company wants to isolate its workloads by creating an AWS account for each workload. The company needs a solution that centrally manages networking components for the workloads. The solution also must create accounts with automatic security controls (guardrails). Which solution will meet these requirements with the LEAST operational overhead?',
      options: [
        'Use AWS Control Tower to deploy accounts. Create a networking account that has a VPC with private subnets and public subnets. Use AWS Resource Access Manager (AWS RAM) to share the subnets with the workload accounts.',
        'Use AWS Organizations to deploy accounts. Create a networking account that has a VPC with private subnets and public subnets. Use AWS Resource Access Manager (AWS RAM) to share the subnets with the workload accounts.',
        'Use AWS Control Tower to deploy accounts. Deploy a VPC in each workload account. Configure each VPC to route through an inspection VPC by using a transit gateway attachment.',
        'Use AWS Organizations to deploy accounts. Deploy a VPC in each workload account. Configure each VPC to route through an inspection VPC by using a transit gateway attachment.',
      ],
      correctOptionIndex: 0,
      explanation:
        'AWS Control Tower is the designated service for setting up and governing a secure, multi-account AWS environment with pre-configured security controls (guardrails). Creating a dedicated networking account to host a central VPC and sharing its subnets with workload accounts using AWS RAM is a standard and efficient pattern. This centralizes network management and minimizes administrative effort.',
      incorrectOptionExplanations: {
        1: 'AWS Organizations provides the framework for multi-account management but does not automatically apply pre-configured security guardrails, requiring manual configuration and increasing overhead.',
        2: 'Deploying a VPC in each workload account decentralizes networking components, contradicting the requirement to centrally manage them and increasing operational overhead.',
        3: 'This option fails on two fronts: it lacks automated guardrails from Control Tower and decentralizes VPC management.',
      },
      references: [
        'AWS Control Tower User Guide — "What Is AWS Control Tower?": Automates the setup of a landing zone with security guardrails.',
        'AWS RAM User Guide — Sharing your VPCs and subnets: Participants can create resources in shared subnets without managing their own VPCs.',
        'AWS Whitepaper — Organizing Your AWS Environment Using Multiple Accounts: Describes a dedicated "Network account" for shared network resources.',
        'AWS Well-Architected Framework — Multiple accounts: Recommends AWS Control Tower for setting up and governing a secure multi-account environment.',
      ],
    },

    // ═══════════════════════════════════════════════════════════════════════
    // Question 11 — EBS Encryption By Default
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: 'ed1-q11',
      type: 'single',
      prompt:
        'A company plans to rehost an application to Amazon EC2 instances that use Amazon Elastic Block Store (Amazon EBS) as the attached storage. A solutions architect must design a solution to ensure that all newly created Amazon EBS volumes are encrypted by default. The solution must also prevent the creation of unencrypted EBS volumes. Which solution will meet these requirements?',
      options: [
        'Configure the EC2 account attributes to always encrypt new EBS volumes.',
        'Use AWS Config. Configure the encrypted-volumes identifier. Apply the default AWS Key Management Service (AWS KMS) key.',
        'Configure AWS Systems Manager to create encrypted copies of the EBS volumes. Reconfigure the EC2 instances to use the encrypted volumes.',
        'Create a customer managed key in AWS Key Management Service (AWS KMS). Configure AWS Migration Hub to use the key when the company migrates workloads.',
      ],
      correctOptionIndex: 0,
      explanation:
        'Enabling "EBS encryption by default" for the AWS account on a per-region basis ensures that any new EBS volume created in that region is automatically encrypted at rest, without requiring any user action during creation. This setting acts as a preventive control, effectively blocking the creation of unencrypted volumes within the specified region.',
      incorrectOptionExplanations: {
        1: 'AWS Config is a detective control service. It can identify unencrypted volumes after they have been created but cannot prevent their creation.',
        2: 'This describes a complex and inefficient remediation process. The goal is to prevent unencrypted volumes from being created in the first place, not to fix them after the fact.',
        3: 'AWS Migration Hub is a service for planning and tracking migrations. It does not enforce resource configuration policies like default encryption for EBS volumes.',
      },
      references: [
        'Amazon EC2 User Guide — "Encryption by default": After enabling, all new EBS volumes and snapshot copies created in the Region are encrypted.',
        'AWS Config Managed Rules — encrypted-volumes: Checks whether EBS volumes in an attached state are encrypted (detective, not preventive).',
        'AWS Documentation — "What is AWS Migration Hub?": A tracking tool, not a policy enforcement engine.',
      ],
    },

    // ═══════════════════════════════════════════════════════════════════════
    // Question 12 — Security Group Referencing / RDS Access
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: 'ed1-q12',
      type: 'single',
      prompt:
        'A company is deploying a new application to a VPC on existing Amazon EC2 instances. The application has a presentation tier that uses an Auto Scaling group of EC2 instances. The application also has a database tier that uses an Amazon RDS Multi-AZ database. The VPC has two public subnets that are split between two Availability Zones. A solutions architect adds one private subnet to each Availability Zone for the RDS database. The solutions architect wants to restrict network access to the RDS database to block access from EC2 instances that do not host the new application. Which solution will meet this requirement?',
      options: [
        'Modify the RDS database security group to allow traffic from a CIDR range that includes IP addresses of the EC2 instances that host the new application.',
        'Associate a new ACL with the private subnets. Deny all incoming traffic from IP addresses that belong to any EC2 instance that does not host the new application.',
        'Modify the RDS database security group to allow traffic from the security group that is associated with the EC2 instances that host the new application.',
        'Associate a new ACL with the private subnets. Deny all incoming traffic except for traffic from a CIDR range that includes IP addresses of the EC2 instances that host the new application.',
      ],
      correctOptionIndex: 2,
      explanation:
        "By creating an inbound rule on the RDS database's security group that specifies the application instances' security group as the source, you create a dynamic link. This rule automatically permits traffic from any EC2 instance associated with the application's security group, regardless of its IP address. This is ideal for an Auto Scaling group where instances and their private IP addresses are ephemeral.",
      incorrectOptionExplanations: {
        0: 'Using a CIDR range is not scalable for an Auto Scaling group because instance IP addresses are dynamic and can fall outside the specified range as the group scales.',
        1: 'Network ACLs are stateless and less granular than security groups. Managing a deny list of individual IP addresses is operationally complex and not a recommended practice.',
        3: 'This approach uses a Network ACL with a CIDR range, which is not suitable for the dynamic nature of an Auto Scaling group where instance IPs change frequently.',
      },
      references: [
        'AWS VPC User Guide — Security group rules: The source for a rule can be the ID of another security group.',
        'Amazon RDS User Guide — Controlling access with security groups: Describes allowing an EC2 instance to connect to a DB instance using the EC2 instance\'s security group as the source.',
        'AWS VPC User Guide — Compare security groups and network ACLs: Security groups are stateful and operate at the instance level; NACLs are stateless at the subnet level.',
      ],
    },

    // ═══════════════════════════════════════════════════════════════════════
    // Question 13 — End-to-End Encryption ALB to EC2
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: 'ed1-q13',
      type: 'single',
      prompt:
        'A company hosts an end-user application on Amazon EC2 instances behind an Application Load Balancer (ALB). The company needs to configure end-to-end encryption between the ALB and the EC2 instances. Which solution will meet this requirement with the LEAST operational effort?',
      options: [
        'Deploy AWS CloudHSM. Import a third-party certificate into CloudHSM. Configure the EC2 instances and the ALB to use the CloudHSM imported certificate.',
        'Import a third-party certificate bundle into AWS Certificate Manager (ACM). Generate a self-signed certificate on the EC2 instances. Associate the ACM imported third-party certificate with the ALB.',
        'Import a third-party SSL certificate into AWS Certificate Manager (ACM). Install the third-party certificate on the EC2 instances. Associate the ACM imported third-party certificate with the ALB.',
        'Use Amazon-issued AWS Certificate Manager (ACM) certificates on the EC2 instances and the ALB.',
      ],
      correctOptionIndex: 1,
      explanation:
        "For end-to-end encryption with minimal operational effort, certificates are needed on both the ALB and EC2 instances. Option B correctly uses ACM to manage the ALB certificate (reducing operational overhead) and self-signed certificates on EC2 instances for backend encryption. Self-signed certificates are acceptable for ALB-to-EC2 communication since the ALB doesn't validate backend certificates by default.",
      incorrectOptionExplanations: {
        0: 'CloudHSM adds unnecessary complexity and cost for a simple TLS requirement.',
        2: 'Installing third-party certificates on EC2 instances requires manual management and renewal, increasing operational effort.',
        3: 'ACM certificates cannot be installed directly on EC2 instances; they only work with AWS-managed services like ALB, CloudFront, and API Gateway.',
      },
      references: [
        'AWS Documentation — Elastic Load Balancing User Guide: HTTPS Listeners for ALB, Backend Authentication section.',
        'AWS Certificate Manager User Guide — "Supported Resources" section: ACM certificates are used with ALB and other AWS services, not EC2 directly.',
        'AWS Well-Architected Framework — Security Pillar: Data Protection section on encryption in transit.',
      ],
    },

    // ═══════════════════════════════════════════════════════════════════════
    // Question 14 — Container Image Scanning / ECS (Multi-select)
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: 'ed1-q14',
      type: 'multiple',
      prompt:
        'A company is building new learning management applications on AWS. The company is using Amazon Elastic Container Service (Amazon ECS) on Amazon EC2 to host the applications. The company must ensure that container images are secure. Company administrators must receive notifications of any security vulnerabilities in the images. Which combination of solutions will meet these requirements? (Select TWO.)',
      options: [
        'Modify the ECS cluster properties to use privileged mode. Enable host-based logging.',
        'Use the AWS Config conformance pack for Amazon ECS. Use AWS Config to notify administrators if any security vulnerabilities are detected.',
        'Configure AWS WAF to invoke an Amazon CloudWatch alarm when a new security vulnerability is detected.',
        'Use Amazon Inspector to scan container images in Amazon Elastic Container Registry (Amazon ECR).',
        'Use AWS Systems Manager Parameter Store to encrypt container images.',
      ],
      correctOptionIndexes: [1, 3],
      explanation:
        "Amazon Inspector's enhanced scanning analyzes container images stored in Amazon ECR and automatically produces CVE findings sent to EventBridge, which can notify administrators via SNS. A Config conformance pack for Amazon ECS (Operational Best Practices for ECS) contains managed rules such as ecr-image-scanning-enabled that enforce secure-image settings and can send compliance alerts to SNS.",
      incorrectOptionExplanations: {
        0: 'Privileged mode increases, not reduces, risk and offers no vulnerability scanning or alerting capability.',
        2: 'AWS WAF defends HTTP requests; it does not examine container images or raise CVE alerts.',
        4: 'Parameter Store stores parameters/secrets, not container images; it provides no scanning or notifications.',
      },
      references: [
        'Amazon Inspector User Guide — Container image scanning, pp. 80-84.',
        'Amazon Inspector User Guide — Amazon EventBridge integration, pp. 102-103.',
        'AWS Config Conformance Packs — Operational Best Practices for Amazon ECS: ecr-image-scanning-enabled rule.',
        'AWS Config Developer Guide — Monitoring compliance with Amazon SNS.',
      ],
    },

    // ═══════════════════════════════════════════════════════════════════════
    // Question 15 — Multi-Tier Security Groups / ALB
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: 'ed1-q15',
      type: 'single',
      prompt:
        'A company is designing a new multi-tier web application that consists of the following components: Web and application servers that run on Amazon EC2 instances as part of Auto Scaling groups; An Amazon RDS DB instance for data storage. A solutions architect needs to limit access to the application servers so that only the web servers can access them. Which solution will meet these requirements?',
      options: [
        'Deploy AWS PrivateLink in front of the application servers. Configure the network ACL to allow only the web servers to access the application servers.',
        'Deploy a VPC endpoint in front of the application servers. Configure the security group to allow only the web servers to access the application servers.',
        'Deploy a Network Load Balancer with a target group that contains the application servers\' Auto Scaling group. Configure the network ACL to allow only the web servers to access the application servers.',
        'Deploy an Application Load Balancer with a target group that contains the application servers\' Auto Scaling group. Configure the security group to allow only the web servers to access the application servers.',
      ],
      correctOptionIndex: 3,
      explanation:
        'An ALB is designed to operate at the application layer (HTTP/HTTPS), making it ideal for distributing traffic to application servers. By creating a rule in the application servers\' security group that specifies the web servers\' security group as the source, access is precisely limited to only instances within the web server group. This method is highly manageable with Auto Scaling, as new instances automatically inherit the correct permissions.',
      incorrectOptionExplanations: {
        0: 'AWS PrivateLink is primarily for providing private connectivity between VPCs or to AWS services, not for controlling traffic between tiers within the same VPC.',
        1: 'VPC endpoints are used to connect a VPC privately to AWS services, not to front-end a group of EC2 instances for intra-VPC communication.',
        2: 'Network ACLs are stateless and operate at the subnet level. Security groups provide more granular, stateful, instance-level control.',
      },
      references: [
        'AWS VPC User Guide — Security group rules: A security group can be referenced as the source, affecting all instances associated with it.',
        'AWS Documentation — What is an Application Load Balancer?: ALB functions at the application layer and evaluates listener rules to select targets.',
        'AWS VPC User Guide — Compare security groups and network ACLs: Security groups operate at the instance level; NACLs at the subnet level.',
      ],
    },

    // ═══════════════════════════════════════════════════════════════════════
    // Question 16 — WAF Managed Rules / CVE Protection
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: 'ed1-q16',
      type: 'single',
      prompt:
        'A solutions architect is designing a web application that will run on Amazon EC2 instances behind an Application Load Balancer (ALB). The company strictly requires that the application be resilient against malicious internet activity and attacks, and protect against new common vulnerabilities and exposures. What should the solutions architect recommend?',
      options: [
        'Leverage Amazon CloudFront with the ALB endpoint as the origin.',
        'Deploy an appropriate managed rule for AWS WAF and associate it with the ALB.',
        'Subscribe to AWS Shield Advanced and ensure common vulnerabilities and exposures are blocked.',
        'Configure network ACLs and security groups to allow only ports 80 and 443 to access the EC2 instances.',
      ],
      correctOptionIndex: 1,
      explanation:
        'AWS WAF with AWS Managed Rule groups (such as the Core rule set or Known bad inputs) protects against a wide range of threats. AWS Managed Rules are curated and maintained by AWS threat intelligence teams, ensuring they are updated to protect against new and emerging threats including CVEs. This directly meets the requirement for protection against malicious activity and new vulnerabilities.',
      incorrectOptionExplanations: {
        0: 'Amazon CloudFront is a CDN that improves performance and provides some DDoS protection, but does not inherently protect against application-layer attacks like SQL injection or XSS.',
        2: 'AWS Shield Advanced is a managed DDoS protection service. While it protects against large-scale network attacks, it does not inspect application traffic to block CVE-related exploits.',
        3: 'Network ACLs and security groups operate at Layers 3 and 4 and cannot inspect the content of web traffic to block application-layer attacks.',
      },
      references: [
        'AWS WAF Developer Guide — "AWS WAF": Protects web applications from common web exploits and bots.',
        'AWS WAF Developer Guide — "AWS Managed Rules rule groups list": Known bad inputs rule group blocks patterns associated with exploitation of vulnerabilities including Log4Shell.',
        'AWS Documentation — Application Load Balancer features: AWS WAF can be associated with an ALB to protect against web exploits.',
        'AWS Documentation — "How AWS Shield works": Shield\'s primary purpose is DDoS mitigation, not application-layer exploit prevention.',
      ],
    },

    // ═══════════════════════════════════════════════════════════════════════
    // Question 17 — EKS KMS Secrets Encryption
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: 'ed1-q17',
      type: 'single',
      prompt:
        'A company is building an Amazon Elastic Kubernetes Service (Amazon EKS) cluster for its workloads. All secrets that are stored in Amazon EKS must be encrypted in the Kubernetes etcd key-value store. Which solution will meet these requirements?',
      options: [
        'Create a new AWS Key Management Service (AWS KMS) key. Use AWS Secrets Manager to manage, rotate, and store all secrets in Amazon EKS.',
        'Create a new AWS Key Management Service (AWS KMS) key. Enable Amazon EKS KMS secrets encryption on the Amazon EKS cluster.',
        'Create the Amazon EKS cluster with default options. Use the Amazon Elastic Block Store (Amazon EBS) Container Storage Interface (CSI) driver as an add-on.',
        'Create a new AWS Key Management Service (AWS KMS) key with the alias/aws/ebs alias. Enable default Amazon Elastic Block Store (Amazon EBS) volume encryption for the account.',
      ],
      correctOptionIndex: 1,
      explanation:
        'Amazon EKS provides a native feature to encrypt Kubernetes secrets at rest within the underlying etcd key-value store using envelope encryption with a customer-managed AWS KMS key. When this feature is enabled on the EKS cluster, Kubernetes secrets are encrypted by EKS using a data key, and that data key is itself encrypted by the specified KMS key.',
      incorrectOptionExplanations: {
        0: 'AWS Secrets Manager stores secrets outside of the Kubernetes secrets object model and etcd. The requirement is to encrypt secrets within etcd.',
        2: 'The Amazon EBS CSI driver is used for managing persistent storage volumes for pods, not for encrypting Kubernetes secrets in etcd.',
        3: 'Enabling default EBS encryption encrypts data at rest on worker node volumes but does not encrypt the Kubernetes secrets within the EKS control plane\'s etcd store.',
      },
      references: [
        'AWS Documentation — Amazon EKS User Guide, "Encrypting Kubernetes secrets using AWS KMS": Enabling secrets encryption uses a KMS key to encrypt secrets at the application layer.',
      ],
    },

    // ═══════════════════════════════════════════════════════════════════════
    // Question 18 — SCPs / AWS Organizations
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: 'ed1-q18',
      type: 'single',
      prompt:
        'A company has separate AWS accounts for its finance, data analytics, and development departments. Because of costs and security concerns, the company wants to control which services each AWS account can use. Which solution will meet these requirements with the LEAST operational overhead?',
      options: [
        'Use AWS Systems Manager templates to control which AWS services each department can use.',
        'Create organizational units (OUs) for each department in AWS Organizations. Attach service control policies (SCPs) to the OUs.',
        'Use AWS CloudFormation to automatically provision only the AWS services that each department can use.',
        'Set up a list of products in AWS Service Catalog in the AWS accounts to manage and control the usage of specific AWS services.',
      ],
      correctOptionIndex: 1,
      explanation:
        'SCPs are a feature of AWS Organizations that act as guardrails, specifying the maximum permissions for member accounts. Attaching an SCP to an OU restricts or allows service access for all accounts within that OU simultaneously, controlling usage for security and cost reasons with minimal administrative effort.',
      incorrectOptionExplanations: {
        0: 'AWS Systems Manager is for operational management and configuration of resources like EC2 instances, not for enforcing permissions or restricting access to AWS services at the account level.',
        2: 'AWS CloudFormation is an IaC service for provisioning resources. It does not prevent users with appropriate permissions from creating unapproved resources manually.',
        3: 'AWS Service Catalog allows a catalog of approved IT services but does not prevent users from bypassing the catalog if they have the necessary IAM permissions.',
      },
      references: [
        'AWS Organizations User Guide — Service control policies (SCPs): SCPs offer central control over the maximum available permissions for all accounts, affecting all users including root.',
        'AWS Organizations User Guide — Managing organizational units: Policies attached to an OU are inherited by all accounts and child OUs.',
        'AWS Whitepaper — AWS Multiple Account Security Strategy: Recommends SCPs for establishing service-level guardrails.',
      ],
    },

    // ═══════════════════════════════════════════════════════════════════════
    // Question 19 — S3 Storage Lens / Versioning Audit
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: 'ed1-q19',
      type: 'single',
      prompt:
        "A global company runs its workloads on AWS. The company's application uses Amazon S3 buckets across AWS Regions for sensitive data storage and analysis. The company stores millions of objects in multiple S3 buckets daily. The company wants to identify all S3 buckets that are not versioning-enabled. Which solution will meet these requirements?",
      options: [
        'Set up an AWS CloudTrail event that has a rule to identify all S3 buckets that are not versioning-enabled across Regions.',
        'Use Amazon S3 Storage Lens to identify all S3 buckets that are not versioning-enabled across Regions.',
        'Enable IAM Access Analyzer for S3 to identify all S3 buckets that are not versioning-enabled across Regions.',
        'Create an S3 Multi-Region Access Point to identify all S3 buckets that are not versioning-enabled across Regions.',
      ],
      correctOptionIndex: 1,
      explanation:
        'Amazon S3 Storage Lens aggregates metrics for all S3 buckets across all Regions within an AWS account or an entire AWS Organization. It includes specific data protection metrics that track the percentage of buckets with versioning enabled, allowing easy identification of non-versioned buckets through its interactive dashboard or metrics export.',
      incorrectOptionExplanations: {
        0: 'AWS CloudTrail records API activity. While it logs the PutBucketVersioning API call, it is not an efficient tool for auditing the current configuration state of all existing buckets.',
        2: 'IAM Access Analyzer for S3 identifies buckets with policies allowing public or cross-account access. It does not analyze bucket configurations like versioning.',
        3: 'An S3 Multi-Region Access Point provides a single global endpoint for data access in multiple Regions. It is not a tool for auditing bucket configurations.',
      },
      references: [
        'Amazon S3 User Guide — Assessing your storage activity with S3 Storage Lens: Provides organization-wide visibility including data protection best practices like S3 Versioning.',
        'Amazon S3 User Guide — S3 Storage Lens metrics: Lists "Versioning-enabled buckets count" under the "Data protection" category.',
        'AWS IAM User Guide — What is IAM Access Analyzer?: Focuses on external access, not versioning.',
        'Amazon S3 User Guide — What is a Multi-Region Access Point?: A data access mechanism, not a configuration auditing tool.',
      ],
    },

    // ═══════════════════════════════════════════════════════════════════════
    // Question 20 — CloudFront Signed URLs / Premium Content
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: 'ed1-q20',
      type: 'single',
      prompt:
        'A media company uses an Amazon CloudFront distribution to deliver content over the internet. The company wants only premium customers to have access to the media streams and file content. The company stores all content in an Amazon S3 bucket. The company also delivers content on demand to customers for a specific purpose, such as movie rentals or music downloads. Which solution will meet these requirements?',
      options: [
        'Generate and provide S3 signed cookies to premium customers.',
        'Generate and provide CloudFront signed URLs to premium customers.',
        'Use origin access control (OAC) to limit the access of non-premium customers.',
        'Generate and activate field-level encryption to block non-premium customers.',
      ],
      correctOptionIndex: 1,
      explanation:
        'CloudFront signed URLs are ideal for restricting access to individual files (e.g., movie rentals, music downloads). A signed URL includes additional information such as an expiration time to grant temporary access to a specific file, ensuring only authenticated premium customers can download the specific content for the allowed duration.',
      incorrectOptionExplanations: {
        0: 'S3 does not use signed cookies; this is a feature of CloudFront. This option references the wrong service.',
        2: 'Origin access control (OAC) restricts direct access to the S3 bucket, forcing all requests through CloudFront. It does not differentiate between user types.',
        3: 'Field-level encryption is used to protect sensitive user-submitted data in POST requests en route to origin servers. It does not control access to delivered content.',
      },
      references: [
        'AWS CloudFront Developer Guide — Choosing between signed URLs and signed cookies: Signed URLs are recommended when restricting access to individual files.',
        'AWS CloudFront Developer Guide — Serving private content with signed URLs: A signed URL specifies restrictions including how long the URL is valid.',
        'AWS CloudFront Developer Guide — Restricting access to an Amazon S3 origin: OAC secures the origin, not end-users.',
        'AWS CloudFront Developer Guide — Using field-level encryption: Field-level encryption protects data users upload, not content delivered to users.',
      ],
    },

    // ═══════════════════════════════════════════════════════════════════════
    // Question 21 — WAF on API Gateway / SQL Injection XSS
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: 'ed1-q21',
      type: 'single',
      prompt:
        'A company uses Amazon API Gateway to manage its REST APIs that third-party service providers access. The company must protect the REST APIs from SQL injection and cross-site scripting attacks. What is the MOST operationally efficient solution that meets these requirements?',
      options: [
        'Configure AWS Shield.',
        'Configure AWS WAF.',
        'Set up API Gateway with an Amazon CloudFront distribution. Configure AWS Shield in CloudFront.',
        'Set up API Gateway with an Amazon CloudFront distribution. Configure AWS WAF in CloudFront.',
      ],
      correctOptionIndex: 1,
      explanation:
        'AWS WAF can be directly associated with an Amazon API Gateway REST API stage. This provides a direct and operationally efficient method to block SQL injection and XSS attacks without introducing additional services, simplifying the architecture and management overhead.',
      incorrectOptionExplanations: {
        0: 'AWS Shield is a managed DDoS protection service. It does not provide protection against application-layer attacks like SQL injection or XSS.',
        2: 'This is incorrect for two reasons: it adds an unnecessary CloudFront distribution and uses Shield (the wrong protection service) for these threats.',
        3: 'While technically feasible, this is not the most operationally efficient solution. It adds the complexity of a CloudFront distribution when WAF can be applied directly to API Gateway.',
      },
      references: [
        'AWS WAF Developer Guide — "What is AWS WAF?": Protects against SQL injection and cross-site scripting.',
        'Amazon API Gateway Developer Guide — "Use AWS WAF to protect your API": WAF can be associated with an API stage to protect against SQL injection and XSS attacks.',
        'AWS Shield Documentation — "What is AWS Shield?": Shield is for DDoS protection.',
      ],
    },

    // ═══════════════════════════════════════════════════════════════════════
    // Question 22 — WAF Oversized Request Body Handling
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: 'ed1-q22',
      type: 'single',
      prompt:
        'A company uses AWS WAF to protect its web applications. A solutions architect configures a web ACL that uses several rules, including a rule that inspects the HTTP request body for malicious content. The solutions architect notices that the web ACL is not inspecting large HTTP POST requests properly. Some large HTTP POST requests are more than 8 MB in size. The solutions architect must ensure that the web ACL inspects the large HTTP POST requests properly. Which solution will meet this requirement?',
      options: [
        'Create two custom AWS WAF rules. Configure one rule to block all oversized requests. Configure the second rule with a higher priority to allow large requests from legitimate hosts.',
        'Enable AWS Shield Advanced. Reconfigure the web ACL to block oversized requests by using Shield Advanced.',
        'Verify that the Content-Type header is correctly set in the HTTP requests that AWS WAF rules inspect.',
        'Create an AWS Lambda function to preprocess the large requests before AWS rules inspect the requests.',
      ],
      correctOptionIndex: 0,
      explanation:
        'AWS WAF has a default size limit of 8 KB for inspecting the body of an HTTP/S request. For larger requests, the "oversize handling" setting determines WAF behavior. Creating a rule that blocks oversized components handles the general case, while a separate, higher-priority rule can allow traffic from trusted sources (e.g., by IP address), bypassing the blocking rule for legitimate large requests.',
      incorrectOptionExplanations: {
        1: 'AWS Shield Advanced is a managed DDoS protection service. It does not change the request body inspection size limits of AWS WAF.',
        2: 'The Content-Type header informs WAF how to parse the body but does not affect or override the size limitation for inspection.',
        3: 'An AWS Lambda function cannot preprocess a request, break it into smaller chunks, and then submit it to AWS WAF for inspection.',
      },
      references: [
        'AWS WAF Developer Guide — "Handling oversized request components in AWS WAF": Describes configuring rules to block oversized requests.',
        'AWS WAF Developer Guide — "Rule processing order in a web ACL": Lower numeric priority values are evaluated first, allowing an "allow" rule to execute before a "block" rule.',
      ],
    },

    // ═══════════════════════════════════════════════════════════════════════
    // Question 23 — Symmetric KMS / Automatic Rotation
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: 'ed1-q23',
      type: 'single',
      prompt:
        'A company decides to use AWS Key Management Service (AWS KMS) for data encryption operations. The company must create a KMS key and automate the rotation of the key. The company also needs the ability to deactivate the key and schedule the key for deletion. Which solution will meet these requirements?',
      options: [
        'Create an asymmetric customer managed KMS key. Enable automatic key rotation.',
        'Create a symmetric customer managed KMS key. Disable the envelope encryption option.',
        'Create a symmetric customer managed KMS key. Enable automatic key rotation.',
        'Create an asymmetric customer managed KMS key. Disable the envelope encryption option.',
      ],
      correctOptionIndex: 2,
      explanation:
        'Only customer-managed keys (CMKs) can be disabled and scheduled for deletion by the customer. Crucially, the automatic key rotation feature is available only for symmetric CMKs. Asymmetric keys and AWS managed keys do not support customer-enabled automatic rotation.',
      incorrectOptionExplanations: {
        0: 'Asymmetric KMS keys do not support the automatic key rotation feature, failing a primary requirement.',
        1: '"Envelope encryption" is a cryptographic design pattern, not a configurable option on a KMS key that can be enabled or disabled.',
        3: 'Asymmetric keys do not support automatic rotation, and "envelope encryption" is not a direct key setting.',
      },
      references: [
        'AWS KMS Developer Guide — "Rotating AWS KMS keys": Automatic key rotation can only be enabled for symmetric encryption KMS keys, not asymmetric.',
        'AWS KMS Developer Guide — "Determining the KMS key type": Clarifies differences between symmetric and asymmetric keys.',
        'AWS KMS Developer Guide — "Deleting AWS KMS keys": Customer-managed keys can be scheduled for deletion.',
      ],
    },

    // ═══════════════════════════════════════════════════════════════════════
    // Question 24 — WAF IP Sets / 20K Retail Stores
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: 'ed1-q24',
      type: 'single',
      prompt:
        "A company has an application that serves clients that are deployed in more than 20,000 retail storefront locations around the world. The application consists of backend web services that are exposed over HTTPS on port 443. The application is hosted on Amazon EC2 instances behind an Application Load Balancer (ALB). The retail locations communicate with the web application over the public internet. The company allows each retail location to register the IP address that the retail location has been allocated by its local ISP. The company's security team recommends to increase the security of the application endpoint by restricting access to only the IP addresses registered by the retail locations. What should a solutions architect do to meet these requirements?",
      options: [
        'Associate an AWS WAF web ACL with the ALB. Use IP rule sets on the ALB to filter traffic. Update the IP addresses in the rule to include the registered IP addresses.',
        'Deploy AWS Firewall Manager to manage the ALB. Configure firewall rules to restrict traffic to the ALB. Modify the firewall rules to include the registered IP addresses.',
        'Store the IP addresses in an Amazon DynamoDB table. Configure an AWS Lambda authorization function on the ALB to validate that incoming requests are from the registered IP addresses.',
        'Configure the network ACL on the subnet that contains the public interface of the ALB. Update the ingress rules on the network ACL with entries for each of the registered IP addresses.',
      ],
      correctOptionIndex: 0,
      explanation:
        'AWS WAF with an IP set match rule is designed for this exact use case. IP sets containing the 20,000+ registered IP addresses are used in a web ACL rule associated directly with the ALB. This efficiently filters traffic at the edge, allowing only requests from known retail locations to reach the application.',
      incorrectOptionExplanations: {
        1: 'AWS Firewall Manager is for centrally managing security policies across multiple accounts and resources, not the primary tool for creating IP filtering logic for a single application.',
        2: 'This proposes a complex, custom-built solution using Lambda and DynamoDB, whereas AWS WAF provides a native, more performant, and cost-effective managed service.',
        3: 'Network ACLs have a very low limit on rules (40 maximum per ACL), making it impossible to add rules for over 20,000 distinct IP addresses.',
      },
      references: [
        'AWS WAF Developer Guide — IP set rule statement: Inspects the IP address of a web request against a set of IP addresses.',
        'AWS WAF Developer Guide — Working with IP sets: An IP set can hold up to 10,000 IP addresses; multiple sets can be combined.',
        'Amazon VPC User Guide — Network ACL quotas: Maximum of 40 rules per NACL.',
        'AWS Firewall Manager Developer Guide — What is AWS Firewall Manager?: A central management tool for policies across accounts.',
      ],
    },

    // ═══════════════════════════════════════════════════════════════════════
    // Question 25 — Inspector + Patch Manager
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: 'ed1-q25',
      type: 'single',
      prompt:
        'A security audit reveals that Amazon EC2 instances are not being patched regularly. A solutions architect needs to provide a solution that will run regular security scans across a large fleet of EC2 instances. The solution should also patch the EC2 instances on a regular schedule and provide a report of each instance\'s patch status. Which solution will meet these requirements?',
      options: [
        'Set up Amazon Macie to scan the EC2 instances for software vulnerabilities. Set up a cron job on each EC2 instance to patch the instance on a regular schedule.',
        'Turn on Amazon GuardDuty in the account. Configure GuardDuty to scan the EC2 instances for software vulnerabilities. Set up AWS Systems Manager Session Manager to patch the EC2 instances on a regular schedule.',
        'Set up Amazon Detective to scan the EC2 instances for software vulnerabilities. Set up an Amazon EventBridge scheduled rule to patch the EC2 instances on a regular schedule.',
        'Turn on Amazon Inspector in the account. Configure Amazon Inspector to scan the EC2 instances for software vulnerabilities. Set up AWS Systems Manager Patch Manager to patch the EC2 instances on a regular schedule.',
      ],
      correctOptionIndex: 3,
      explanation:
        'Amazon Inspector is a vulnerability management service that continuously scans EC2 instances for software vulnerabilities and provides detailed findings reports. AWS Systems Manager Patch Manager automates the process of patching managed nodes on a schedule and provides detailed compliance reporting on patch status for each instance.',
      incorrectOptionExplanations: {
        0: 'Amazon Macie is a data security service for Amazon S3, not for scanning EC2 instance vulnerabilities. A cron job is not a scalable fleet management solution.',
        1: 'Amazon GuardDuty is a threat detection service that monitors for malicious activity, not a vulnerability scanner. Session Manager provides secure interactive access, not automated patching.',
        2: 'Amazon Detective is used for security investigation and root cause analysis, not for proactive vulnerability scanning.',
      },
      references: [
        'AWS Documentation — What is Amazon Inspector?: Continuously scans EC2 instances for software vulnerabilities.',
        'AWS Documentation — AWS Systems Manager Patch Manager: Automates patching and provides patch compliance reporting.',
      ],
    },

    // ═══════════════════════════════════════════════════════════════════════
    // Question 26 — VPC Gateway Endpoint + IAM Instance Profile
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: 'ed1-q26',
      type: 'single',
      prompt:
        "A company hosts its application on several Amazon EC2 instances inside a VPC. The company creates a dedicated Amazon S3 bucket for each customer to store their relevant information in Amazon S3. The company wants to ensure that the application running on EC2 instances can securely access only the S3 buckets that belong to the company's AWS account. Which solution will meet these requirements with the LEAST operational overhead?",
      options: [
        'Create a gateway endpoint for Amazon S3 that is attached to the VPC. Update the IAM instance profile policy to provide access to only the specific buckets that the application needs.',
        'Create a NAT gateway in a public subnet with a security group that allows access to only Amazon S3. Update the route tables to use the NAT Gateway.',
        'Create a gateway endpoint for Amazon S3 that is attached to the VPC. Update the IAM instance profile policy with a Deny action and the aws:ResourceAccount condition key.',
        'Create a NAT Gateway in a public subnet. Update route tables to use the NAT Gateway. Assign bucket policies for all buckets with a Deny action and the aws:ResourceAccount condition key.',
      ],
      correctOptionIndex: 0,
      explanation:
        'A gateway VPC endpoint for S3 routes EC2 traffic to S3 using private IP addresses, keeping traffic within the AWS network without the public internet. An IAM instance profile policy granting access only to specific S3 buckets enforces the principle of least privilege. Using wildcards in the bucket ARN (e.g., arn:aws:s3:::company-customer-*) automatically applies to new customer buckets without modification.',
      incorrectOptionExplanations: {
        1: 'A NAT gateway routes traffic over the public internet to reach S3, which is less secure than a VPC endpoint and does not specify access control to specific buckets.',
        2: 'A Deny policy acts as a guardrail but does not grant permissions. An explicit Allow action is still required for the instances to access any buckets, making this option incomplete.',
        3: 'Using a NAT gateway is inefficient. Managing individual bucket policies for every customer bucket creates significant operational overhead.',
      },
      references: [
        'AWS VPC User Guide — Gateway VPC endpoints: Gateway endpoints support Amazon S3 and DynamoDB.',
        'AWS IAM User Guide — IAM roles for Amazon EC2: Using IAM roles is the recommended secure way to grant permissions to EC2 instances.',
        'Amazon S3 User Guide — Policies and permissions in Amazon S3: Wildcards can be used in resource ARNs for flexible policy management.',
      ],
    },

    // ═══════════════════════════════════════════════════════════════════════
    // Question 27 — Lambda Function URL / IAM Auth
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: 'ed1-q27',
      type: 'single',
      prompt:
        "A solutions architect has created an AWS Lambda function that is written in Java. A company will use the Lambda function as a new microservice for its application. The company's customers must be able to call an HTTPS endpoint to reach the microservice. The microservice must use AWS Identity and Access Management (IAM) to authenticate calls. Which solution will meet these requirements?",
      options: [
        'Create an Amazon API Gateway REST API. Configure an API method to use the Lambda function. Create a second Lambda function that is configured as an authorizer.',
        'Create an AWS Lambda function URL for the Lambda function. Specify AWSIAM as the authentication type.',
        'Create an Amazon CloudFront distribution. Deploy the Lambda function to Lambda@Edge. Integrate IAM authentication logic into the Lambda@Edge function.',
        'Create an Amazon CloudFront distribution. Deploy the Lambda function to CloudFront Functions. Specify AWSIAM as the authentication type.',
      ],
      correctOptionIndex: 1,
      explanation:
        'AWS Lambda Function URLs provide a dedicated HTTPS endpoint for a Lambda function without needing API Gateway or CloudFront. Setting the authentication type to AWSIAM enforces that all incoming requests must be signed with valid AWS credentials. This is the simplest, most direct, and most cost-effective solution.',
      incorrectOptionExplanations: {
        0: 'A Lambda authorizer is for custom authorization logic. For standard IAM authentication with API Gateway, you configure the method\'s authorization type, not use a separate authorizer function.',
        2: 'Lambda@Edge is designed for running code at edge locations to customize content delivered by CloudFront, not for hosting a primary backend microservice.',
        3: 'CloudFront Functions are for lightweight, short-running request/response manipulations at the edge and cannot implement a full microservice backend.',
      },
      references: [
        'AWS Documentation — Invoking Lambda function URLs: Describes function URL security and auth model.',
        'AWS Documentation — Security and auth model for Lambda function URLs: AuthType AWSIAM requires signed AWS credentials.',
        'AWS Compute Blog — Announcing AWS Lambda Function URLs: Built-in HTTPS Endpoints for Single-Function Microservices.',
      ],
    },

    // ═══════════════════════════════════════════════════════════════════════
    // Question 28 — AWS Glue / CSE-KMS / Per-Customer Keys
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: 'ed1-q28',
      type: 'single',
      prompt:
        'A medical company wants to perform transformations on a large amount of clinical trial data that comes from several customers. The company must extract the data from a relational database that contains the customer data. Then the company will transform the data by using a series of complex rules. The company will load the data to Amazon S3 when the transformations are complete. All data must be encrypted where it is processed before the company stores the data in Amazon S3. All data must be encrypted by using customer-specific keys. Which solution will meet these requirements with the LEAST amount of operational effort?',
      options: [
        'Create one AWS Glue job for each customer. Attach a security configuration to each job that uses server-side encryption with Amazon S3 managed keys (SSE-S3) to encrypt the data.',
        'Create one Amazon EMR cluster for each customer. Attach a security configuration to each cluster that uses client-side encryption with a custom client-side root key (CSE-Custom) to encrypt the data.',
        'Create one AWS Glue job for each customer. Attach a security configuration to each job that uses client-side encryption with AWS KMS managed keys (CSE-KMS) to encrypt the data.',
        'Create one Amazon EMR cluster for each customer. Attach a security configuration to each cluster that uses server-side encryption with AWS KMS keys (SSE-KMS) to encrypt the data.',
      ],
      correctOptionIndex: 2,
      explanation:
        'AWS Glue is a fully managed ETL service, significantly reducing operational overhead compared to managing EMR clusters. Using CSE-KMS (client-side encryption with AWS KMS managed keys) allows the Glue job to encrypt data using customer-specific KMS keys before writing to S3, fulfilling the requirement to encrypt data where it is processed.',
      incorrectOptionExplanations: {
        0: 'SSE-S3 does not use customer-specific keys, failing a key requirement.',
        1: 'Amazon EMR requires more operational effort than AWS Glue. Using a custom client-side root key adds significant key management overhead.',
        3: 'Amazon EMR has higher operational overhead than AWS Glue. SSE-KMS encrypts data upon arrival at S3, not necessarily during processing on the cluster itself.',
      },
      references: [
        'AWS Glue Developer Guide — Security configurations: Specifying a KMS key in a security configuration encrypts at-rest data written to local disks by ETL jobs.',
        'Amazon S3 User Guide — Protecting data using client-side encryption: The application (Glue job) performs encryption before upload when using CSE-KMS.',
        'AWS Glue FAQs: AWS Glue is a fully-managed ETL service that does not require creating and managing infrastructure.',
      ],
    },

    // ═══════════════════════════════════════════════════════════════════════
    // Question 29 — EventBridge + ACM Certificate Expiry
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: 'ed1-q29',
      type: 'single',
      prompt:
        "A company generates SSL certificates from a third-party provider. The company imports the certificates into AWS Certificate Manager (ACM) to use with public web applications. A solutions architect must implement a solution to notify the company's security team 30 days before an imported certificate expires. The company already has an Amazon Simple Queue Service (Amazon SQS) queue. The company also has an Amazon Simple Notification Service (Amazon SNS) topic that has the security team's email address as a subscriber. Which solution will provide the security team with the required notification about certificates?",
      options: [
        'Create an AWS Lambda function to scan for expiring certificates. Program the Lambda function to list the certificates in a JSON message and to deliver the message to the SQS queue.',
        'Create an AWS Lambda function to scan for expiring certificates. Program the Lambda function to list the certificates in a JSON message and to deliver the message to the SNS topic.',
        'Create an Amazon EventBridge rule that specifies the ACM Certificate Approaching Expiration event type. Set the SQS queue as the rule\'s target.',
        'Create an Amazon EventBridge rule that specifies the ACM Certificate Approaching Expiration event type. Set the SNS topic as the rule\'s target.',
      ],
      correctOptionIndex: 3,
      explanation:
        'AWS Certificate Manager integrates with Amazon EventBridge to automatically emit an "ACM Certificate Approaching Expiration" event for imported certificates. By creating an EventBridge rule listening for this event type and setting the existing SNS topic as the target, EventBridge forwards the notification directly to the SNS topic, which emails the subscribed security team. This approach is serverless, requires no custom code, and is highly reliable.',
      incorrectOptionExplanations: {
        0: 'This requires writing and maintaining a custom Lambda function to poll ACM. Sending the message to SQS does not directly notify the team and adds an unnecessary step.',
        1: 'While a Lambda function could work, it is a less efficient, custom solution compared to the native event-driven integration between ACM and EventBridge.',
        2: 'Setting the SQS queue as the target will not directly notify the security team. An additional component would be needed to process the SQS message.',
      },
      references: [
        'AWS Documentation — Monitoring certificate expiration with Amazon EventBridge: ACM Certificate Approaching Expiration event.',
        'AWS Documentation — Creating Amazon EventBridge rules that react to events: Event patterns and targets.',
        'AWS Documentation — Tutorial: Set up notifications for imported certificates: Walks through the exact solution described in option D.',
      ],
    },

    // ═══════════════════════════════════════════════════════════════════════
    // Question 30 — Shield Advanced / CloudFront DDoS
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: 'ed1-q30',
      type: 'single',
      prompt:
        'A retail company runs its application on AWS. The application uses Amazon EC2 for web servers, Amazon RDS for database services, and Amazon CloudFront for global content distribution. The company needs a solution to mitigate DDoS attacks. Which solution will meet this requirement?',
      options: [
        'Implement AWS WAF custom rules to limit the length of query requests. Configure CloudFront to work with AWS WAF.',
        'Enable AWS Shield Advanced. Configure CloudFront to work with Shield Advanced.',
        'Use Amazon Inspector to scan the EC2 instances. Enable Amazon GuardDuty.',
        'Enable Amazon Macie. Configure CloudFront Origin Shield.',
      ],
      correctOptionIndex: 1,
      explanation:
        'AWS Shield Advanced offers enhanced detection, mitigation against larger and more sophisticated DDoS attacks, near real-time visibility into attacks, and 24/7 access to the AWS DDoS Response Team (DRT). It is specifically designed to protect resources like Amazon CloudFront.',
      incorrectOptionExplanations: {
        0: 'AWS WAF is a web application firewall that protects against Layer 7 exploits like SQL injection. While it can mitigate some application-layer DDoS attacks, it is not the primary, comprehensive DDoS service.',
        2: 'Amazon Inspector scans for software vulnerabilities, and Amazon GuardDuty is a threat detection service. Neither provides active, real-time DDoS mitigation.',
        3: 'Amazon Macie is a data security service for S3. CloudFront Origin Shield is a caching feature to reduce origin load, not a DDoS mitigation tool.',
      },
      references: [
        'AWS Shield Documentation — "What is AWS Shield?": Shield Advanced provides enhanced DDoS protection for EC2, ELB, CloudFront, Global Accelerator, and Route 53.',
        'AWS Whitepaper — AWS Best Practices for DDoS Resiliency: Recommends subscribing to Shield Advanced for higher protection levels.',
        'AWS WAF Documentation: WAF\'s primary function is different from DDoS mitigation.',
        'Amazon GuardDuty Documentation: GuardDuty is a detection, not mitigation, service.',
      ],
    },

    // ═══════════════════════════════════════════════════════════════════════
    // Question 31 — Gateway Load Balancer / Centralized Inspection
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: 'ed1-q31',
      type: 'single',
      prompt:
        'An ecommerce company runs several internal applications in multiple AWS accounts. The company uses AWS Organizations to manage its AWS accounts. A security appliance in the company\'s networking account must inspect interactions between applications across AWS accounts. Which solution will meet these requirements?',
      options: [
        'Deploy a Network Load Balancer (NLB) in the networking account to send traffic to the security appliance. Configure the application accounts to send traffic to the NLB by using an interface VPC endpoint in the application accounts.',
        'Deploy an Application Load Balancer (ALB) in the application accounts to send traffic directly to the security appliance.',
        'Deploy a Gateway Load Balancer (GWLB) in the networking account to send traffic to the security appliance. Configure the application accounts to send traffic to the GWLB by using an interface GWLB endpoint in the application accounts.',
        'Deploy an interface VPC endpoint in the application accounts to send traffic directly to the security appliance.',
      ],
      correctOptionIndex: 2,
      explanation:
        'Gateway Load Balancer (GWLB) is purpose-built to deploy, scale, and manage virtual appliances such as firewalls and intrusion detection systems. A GWLB Endpoint (GWLBE) in each application VPC acts as a next-hop target in route tables, transparently forwarding traffic to the security appliance for inspection before continuing to its destination.',
      incorrectOptionExplanations: {
        0: 'An NLB with an interface endpoint is for providing private access to a service, not for transparently inserting an appliance into the traffic path.',
        1: 'An ALB operates at Layer 7 (HTTP/HTTPS) and is not suitable for inspecting all types of network traffic. The proposed architecture is also incorrect.',
        3: 'An interface VPC endpoint alone is not a complete solution; it requires a load balancer service (like GWLB) to route traffic to an appliance fleet.',
      },
      references: [
        'Elastic Load Balancing User Guide — "What is a Gateway Load Balancer?": Designed for distributing traffic across virtual appliances.',
        'Elastic Load Balancing User Guide — Gateway Load Balancer endpoints: Route tables direct traffic through GWLBE for inspection.',
        'AWS Whitepaper — Building a scalable and secure multi-VPC AWS network infrastructure: Describes centralized network traffic inspection using GWLB.',
        'AWS Blog — Centralized inspection architecture with AWS Gateway Load Balancer and AWS Transit Gateway.',
      ],
    },

    // ═══════════════════════════════════════════════════════════════════════
    // Question 32 — RDS Multi-AZ for SQL Server Migration
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: 'ed1-q32',
      type: 'single',
      prompt:
        'A company is migrating its workloads to AWS. The company has sensitive and critical data in on-premises relational databases that run on SQL Server instances. The company wants to use the AWS Cloud to increase security and reduce operational overhead for the databases. Which solution will meet these requirements?',
      options: [
        'Migrate the databases to Amazon EC2 instances. Use an AWS Key Management Service (AWS KMS) AWS managed key for encryption.',
        'Migrate the databases to a Multi-AZ Amazon RDS for SQL Server DB instance. Use an AWS Key Management Service (AWS KMS) AWS managed key for encryption.',
        'Migrate the data to an Amazon S3 bucket. Use Amazon Macie to ensure data security.',
        'Migrate the databases to an Amazon DynamoDB table. Use Amazon CloudWatch Logs to ensure data security.',
      ],
      correctOptionIndex: 1,
      explanation:
        'Amazon RDS is a managed service that significantly reduces operational overhead by automating patching, backups, and hardware provisioning. Using a Multi-AZ deployment provides high availability and durability. Encrypting the RDS instance with AWS KMS enhances security by protecting data at rest.',
      incorrectOptionExplanations: {
        0: 'Using EC2 instances for databases does not reduce operational overhead; it shifts it to the cloud as the customer still manages the OS and database software.',
        2: 'Amazon S3 is an object storage service, not a relational database. Migrating would require a complete application redesign.',
        3: 'Amazon DynamoDB is a NoSQL database. Migrating from a relational SQL Server database would be a complex process and is not a direct migration path.',
      },
      references: [
        'AWS Documentation — "What is Amazon RDS?": Amazon RDS makes it easier to set up, operate, and scale a relational database in the cloud.',
        'AWS Documentation — Amazon RDS Multi-AZ deployments: Provides enhanced availability and durability.',
        'AWS Documentation — Encrypting Amazon RDS resources: AWS KMS provides an additional layer of data protection.',
      ],
    },

    // ═══════════════════════════════════════════════════════════════════════
    // Question 33 — Customer Managed Key / EBS / Rotation Control
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: 'ed1-q33',
      type: 'single',
      prompt:
        'A company uses Amazon EC2 instances and stores data on Amazon Elastic Block Store (Amazon EBS) volumes. The company must ensure that all data is encrypted at rest by using AWS Key Management Service (AWS KMS). The company must be able to control rotation of the encryption keys. Which solution will meet these requirements with the LEAST operational overhead?',
      options: [
        'Create a customer managed key. Use the key to encrypt the EBS volumes.',
        'Use an AWS managed key to encrypt the EBS volumes. Use the key to configure automatic key rotation.',
        'Create an external KMS key with imported key material. Use the key to encrypt the EBS volumes.',
        'Use an AWS owned key to encrypt the EBS volumes.',
      ],
      correctOptionIndex: 0,
      explanation:
        'A customer managed key is the only KMS key type that allows the customer to manage the key\'s lifecycle, including enabling or disabling automatic key rotation, or performing manual rotation. AWS handles the rotation process itself, minimizing ongoing operational effort.',
      incorrectOptionExplanations: {
        1: 'AWS managed keys have automatic rotation enabled by default, and this setting cannot be changed by the customer. This fails the requirement to control rotation.',
        2: 'Keys with imported material require manual rotation, which imposes the highest operational overhead, directly contradicting a key requirement.',
        3: 'AWS owned keys are managed entirely by AWS. Customers have no visibility into or control over these keys, including their rotation policies.',
      },
      references: [
        'AWS KMS Developer Guide — "AWS KMS keys": Customer managed keys offer full control including key policies, enabling/disabling, and rotation. AWS managed key properties cannot be changed.',
        'AWS KMS Developer Guide — "Rotating AWS KMS keys": Automatic key rotation can be enabled/disabled for customer managed keys; it is always on for AWS managed keys and not available for keys with imported material.',
        'Amazon EBS User Guide — Amazon EBS encryption: Both customer managed and AWS managed keys can be used for EBS encryption.',
      ],
    },

    // ═══════════════════════════════════════════════════════════════════════
    // Question 34 — VPC Flow Logs / Data Firehose / OpenSearch
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: 'ed1-q34',
      type: 'single',
      prompt:
        "A company's application uses Network Load Balancers, Auto Scaling groups, Amazon EC2 instances, and databases that are deployed in an Amazon VPC. The company wants to capture information about traffic to and from the network interfaces in near real time in its Amazon VPC. The company wants to send the information to Amazon OpenSearch Service for analysis. Which solution will meet these requirements?",
      options: [
        'Create a log group in Amazon CloudWatch Logs. Configure VPC Flow Logs to send the log data to the log group. Use Amazon Kinesis Data Streams to stream the logs from the log group to OpenSearch Service.',
        'Create a log group in Amazon CloudWatch Logs. Configure VPC Flow Logs to send the log data to the log group. Use Amazon Data Firehose to stream the logs from the log group to OpenSearch Service.',
        'Create a trail in AWS CloudTrail. Configure VPC Flow Logs to send the log data to the trail. Use Amazon Kinesis Data Streams to stream the logs from the trail to OpenSearch Service.',
        'Create a trail in AWS CloudTrail. Configure VPC Flow Logs to send the log data to the trail. Use Amazon Data Firehose to stream the logs from the trail to OpenSearch Service.',
      ],
      correctOptionIndex: 1,
      explanation:
        'VPC Flow Logs can be published to Amazon CloudWatch Logs. Amazon Data Firehose provides a direct, managed integration to stream data from CloudWatch Logs to OpenSearch Service. A CloudWatch Logs subscription filter sends log events to a Firehose delivery stream, which buffers and delivers data to the OpenSearch Service domain automatically.',
      incorrectOptionExplanations: {
        0: 'Using Kinesis Data Streams would require an additional compute layer (like AWS Lambda) to consume the stream and write to OpenSearch Service, adding complexity.',
        2: 'AWS CloudTrail is for logging API calls and user activity, not for capturing network traffic information from VPCs. VPC Flow Logs cannot be sent to CloudTrail.',
        3: 'VPC Flow Logs cannot be sent to AWS CloudTrail, making the initial step invalid.',
      },
      references: [
        'AWS Documentation — "Publishing flow logs": CloudWatch Logs is a valid destination for VPC Flow Logs.',
        'AWS Documentation — Amazon OpenSearch Service data ingestion: Amazon Data Firehose is a primary method for real-time streaming data ingestion.',
        'AWS Documentation — Streaming CloudWatch Logs data to Amazon OpenSearch Service: CloudWatch Logs can be streamed to OpenSearch via a Kinesis Data Firehose delivery stream.',
      ],
    },

    // ═══════════════════════════════════════════════════════════════════════
    // Question 35 — Amazon Macie / PII Discovery in S3
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: 'ed1-q35',
      type: 'single',
      prompt:
        'A company manages millions of documents in hundreds of Amazon S3 buckets in multiple AWS Regions. The company must determine whether any of the S3 buckets contain personally identifiable information (PII). Which solution will meet this requirement with the LEAST operational overhead?',
      options: [
        'Use Amazon Detective to detect PII in the S3 buckets.',
        'Use AWS Trusted Advisor to generate PII notifications.',
        'Use Amazon Macie to detect PII in the S3 buckets.',
        'Use AWS Lambda functions to review each file in the S3 buckets to identify PII.',
      ],
      correctOptionIndex: 2,
      explanation:
        'Amazon Macie is a fully managed data security and data privacy service that uses machine learning and pattern matching to automatically discover sensitive data, such as PII, in Amazon S3 buckets at scale. Using Macie is the most efficient method, requiring minimal configuration.',
      incorrectOptionExplanations: {
        0: 'Amazon Detective analyzes log data to identify the root cause of security findings. It does not scan data within S3 buckets for PII.',
        1: 'AWS Trusted Advisor provides recommendations on cost optimization, security, and performance based on best practices. It does not perform deep content inspection of S3 objects.',
        3: 'Using AWS Lambda functions requires significant development effort and ongoing maintenance, representing high operational overhead.',
      },
      references: [
        'AWS Documentation — What is Amazon Macie?: Macie discovers sensitive data including PII in S3.',
        'AWS Documentation — How Amazon Macie works: The "Discovering sensitive data" section details the automated discovery process.',
      ],
    },

    // ═══════════════════════════════════════════════════════════════════════
    // Question 36 — Layer 7 DDoS / WAF Managed Rules
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: 'ed1-q36',
      type: 'single',
      prompt:
        'A company runs an application on a group of Amazon EC2 instances behind an Application Load Balancer (ALB). The company wants to protect the application against layer 7 DDoS attacks. Which solution will meet this requirement?',
      options: [
        'Associate AWS Shield Standard with the ALB.',
        'Create an AWS WAF web ACL and add a custom rule. Associate the web ACL with the ALB.',
        'Create an AWS WAF web ACL and add an AWS managed rule. Associate the web ACL with the ALB.',
        'Create an Amazon CloudFront distribution and set the ALB as the origin. Configure the application DNS record to point to the CloudFront distribution instead of the ALB.',
      ],
      correctOptionIndex: 2,
      explanation:
        'AWS WAF with AWS Managed Rule groups (such as AWSManagedRulesKnownBadInputsRuleSet or rate-based rules) provides pre-configured rules maintained by AWS security experts to protect against common threats including Layer 7 DDoS attacks like HTTP floods. Associating this web ACL with the ALB directly applies these protections.',
      incorrectOptionExplanations: {
        0: 'AWS Shield Standard provides protection against common Layer 3 and Layer 4 DDoS attacks but does not offer specific mitigation for application-layer (Layer 7) attacks.',
        1: 'Custom rules require more effort to define and maintain compared to AWS Managed Rules, making this less effective for general DDoS protection.',
        3: 'Using Amazon CloudFront is a valid DDoS mitigation strategy but represents a more significant architectural change. WAF directly on the ALB is the most direct solution.',
      },
      references: [
        'AWS WAF Developer Guide — "What is AWS WAF?": Protects Application Load Balancers, CloudFront, and API Gateway.',
        'AWS WAF Developer Guide — AWS Managed Rules rule groups list: Includes rules for known bad inputs and rate-based rules for DDoS mitigation.',
        'AWS Shield Documentation — AWS Shield Standard: Defends against common network and transport layer DDoS attacks.',
      ],
    },

    // ═══════════════════════════════════════════════════════════════════════
    // Question 37 — Tag Policies + SCPs / EC2 Tagging (Multi-select)
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: 'ed1-q37',
      type: 'multiple',
      prompt:
        'A company is designing the architecture for a new mobile app that uses the AWS Cloud. The company uses organizational units (OUs) in AWS Organizations to manage its accounts. The company wants to tag Amazon EC2 instances with data sensitivity by using values of sensitive and nonsensitive. IAM identities must not be able to delete a tag or create instances without a tag. Which combination of steps will meet these requirements? (Select TWO.)',
      options: [
        'In Organizations, create a new tag policy that specifies the data sensitivity tag key and the required values. Enforce the tag values for the EC2 instances. Attach the tag policy to the appropriate OU.',
        'In Organizations, create a new service control policy (SCP) that specifies the data sensitivity tag key and the required tag values. Enforce the tag values for the EC2 instances. Attach the SCP to the appropriate OU.',
        'Create a tag policy to deny running instances when a tag key is not specified. Create another tag policy that prevents identities from deleting tags. Attach the tag policies to the appropriate OU.',
        'Create a service control policy (SCP) to deny creating instances when a tag key is not specified. Create another SCP that prevents identities from deleting tags. Attach the SCPs to the appropriate OU.',
        'Create an AWS Config rule to check if EC2 instances use the data sensitivity tag and the specified values. Configure an AWS Lambda function to delete the resource if a noncompliant resource is found.',
      ],
      correctOptionIndexes: [0, 3],
      explanation:
        'Option A correctly uses a Tag Policy to standardize tags across the organization by defining the data sensitivity tag key and its allowed values (sensitive, nonsensitive) and enforcing it for EC2 instances. Option D correctly uses SCPs to enforce preventative guardrails: one SCP denies ec2:RunInstances if the required tag is absent, and a second SCP denies ec2:DeleteTags for the mandatory tag key.',
      incorrectOptionExplanations: {
        1: 'SCPs enforce permissions; they do not define a list of allowed tag values. Tag Policies are the correct service for this function.',
        2: 'Tag policies govern tag compliance; they cannot directly deny actions like RunInstances or DeleteTags. Permission enforcement requires an SCP.',
        4: 'AWS Config is a detective control that evaluates configurations after creation. It does not prevent non-compliant actions from occurring.',
      },
      references: [
        'AWS Organizations User Guide — Tag policies: Tag policies standardize tags and can enforce compliance for specific resource types.',
        'AWS Organizations User Guide — Example SCPs — "Require a tag on specified created resources": SCP denies ec2:RunInstances if a specific tag is not in the request.',
        'AWS Organizations User Guide — Example SCPs — "Prevent tags from being changed": SCP using aws:TagKeys condition key to deny tag modification actions.',
        'AWS IAM User Guide — AWS global condition context keys: aws:RequestTag and aws:TagKeys condition keys control access based on tag presence.',
      ],
    },

    // ═══════════════════════════════════════════════════════════════════════
    // Question 38 — Control Tower Proactive Controls / IAM Inline Policy
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: 'ed1-q38',
      type: 'single',
      prompt:
        'A company uses AWS CloudFormation to deploy IAM resources within accounts that AWS Control Tower governs. The security team wants to prevent the deployment of IAM roles that include inline policies with the following statements: "Effect": "Allow", "Action": "*", "Resource": "*". Which solution will meet this requirement?',
      options: [
        'Use AWS Control Tower proactive controls to block CloudFormation stacks that match these inline policy statements.',
        'Use AWS Control Tower detective controls to detect and delete IAM inline policies that contain these statements upon deployment.',
        'Use AWS Config to create a rule that detects these statements in any inline IAM policies. Configure the rule to automatically remove these statements by using the AWS-DeleteIAMInlinePolicy remediation.',
        'Use AWS Config to create a rule that detects these statements in inline IAM policies and sends a notification to the security team.',
      ],
      correctOptionIndex: 0,
      explanation:
        'AWS Control Tower proactive controls are implemented using AWS CloudFormation hooks that run checks on resources before they are provisioned. If a resource violates a proactive control, CloudFormation fails the deployment, preventing the non-compliant resource from ever being created. This directly meets the requirement to prevent deployment.',
      incorrectOptionExplanations: {
        1: 'Detective controls operate after a resource has been deployed. They can detect non-compliance but cannot prevent the initial deployment.',
        2: 'AWS Config with auto-remediation is a reactive mechanism. It detects a non-compliant resource after it has been created and then attempts to fix it.',
        3: 'An AWS Config rule with only a notification is purely detective. It alerts the team to a problem but takes no action to prevent or remediate it.',
      },
      references: [
        'AWS Documentation — Proactive controls in AWS Control Tower: "Proactive controls are preventative... Proactive controls check resources before they are provisioned."',
        'AWS Documentation — How AWS Control Tower controls work: Contrasts proactive (preventative) and detective controls.',
      ],
    },

    // ═══════════════════════════════════════════════════════════════════════
    // Question 39 — Cognito Identity Pool + S3 VPC Endpoint (Multi-select)
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: 'ed1-q39',
      type: 'multiple',
      prompt:
        'A company hosts an application in a private subnet. The company has already integrated the application with Amazon Cognito. The company uses an Amazon Cognito user pool to authenticate users. The company needs to modify the application so the application can securely store user documents in an Amazon S3 bucket. Which combination of steps will securely integrate Amazon S3 with the application? (Select TWO.)',
      options: [
        'Create an Amazon Cognito identity pool to generate secure Amazon S3 access tokens for users when they successfully log in.',
        'Use the existing Amazon Cognito user pool to generate Amazon S3 access tokens for users when they successfully log in.',
        'Create an Amazon S3 VPC endpoint in the same VPC where the company hosts the application.',
        'Create a NAT gateway in the VPC where the company hosts the application. Assign a policy to the S3 bucket to deny any request that is not initiated from Amazon Cognito.',
        "Attach a policy to the S3 bucket that allows access only from the users' IP addresses.",
      ],
      correctOptionIndexes: [0, 2],
      explanation:
        'An Amazon Cognito identity pool exchanges user authentication tokens from the user pool for temporary, limited-privilege AWS credentials (via IAM roles) that grant access to S3. An S3 VPC gateway endpoint provides private connectivity from the private subnet to S3 without traversing the public internet.',
      incorrectOptionExplanations: {
        1: 'Amazon Cognito user pools are for user authentication (sign-in/sign-up) and do not directly generate AWS credentials for accessing services like S3.',
        3: 'A NAT gateway enables internet access, which is less secure and more costly than a private VPC endpoint for accessing AWS services.',
        4: "S3 requests originate from the application's IP address in the private subnet, not end-users' IPs, making this policy ineffective and unmanageable.",
      },
      references: [
        'Amazon Cognito Developer Guide — Identity pools (federated identities): With an identity pool, users can obtain temporary AWS credentials to access AWS services like S3.',
        'Amazon Cognito Developer Guide — Common Amazon Cognito scenarios: User pool tokens are exchanged via an identity pool for AWS credentials to access services.',
        'Amazon VPC User Guide — Gateway VPC endpoints: S3 and DynamoDB are supported via gateway endpoints for private connectivity.',
      ],
    },

    // ═══════════════════════════════════════════════════════════════════════
    // Question 40 — Permissions Boundaries + SCPs
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: 'ed1-q40',
      type: 'single',
      prompt:
        'A company wants DevOps teams to create IAM roles, but no role may have administrative permissions. Which solution will meet these requirements?',
      options: [
        'Use SCPs to deny AdministratorAccess policy usage.',
        'Use SCPs to require a permissions boundary when creating IAM roles.',
        'Allow all permissions and auto-delete noncompliant roles.',
        'Attach restrictive permissions boundaries directly to IAM users.',
      ],
      correctOptionIndex: 1,
      explanation:
        'An SCP within AWS Organizations can enforce a rule that requires any newly created IAM role to have a specific permissions boundary attached. This boundary acts as a ceiling, defining the maximum permissions the role can ever have, effectively blocking the creation of roles with administrative permissions while still allowing DevOps teams to create roles.',
      incorrectOptionExplanations: {
        0: 'Denying a specific policy like AdministratorAccess is insufficient, as users could create a custom policy with equivalent wildcard permissions.',
        2: 'A reactive "detect and delete" approach is insecure as it leaves a window of opportunity for misuse before the noncompliant role is removed.',
        3: 'Permissions boundaries are applied to the principal being created (the role), not to the IAM user who is performing the creation action.',
      },
      references: [
        'AWS Documentation — Permissions boundaries for IAM entities: The permissions boundary sets the maximum permissions that the entity can have.',
        'AWS Documentation — Example SCPs — "Require a permissions boundary on all new IAM roles": Provides a specific SCP example that enforces iam:CreateRole only if a permissions boundary is attached.',
      ],
    },

    // ═══════════════════════════════════════════════════════════════════════
    // Question 41 — IAM Identity Center / Existing IdP / Multi-account
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: 'ed1-q41',
      type: 'single',
      prompt:
        'A company sets up an organization in AWS Organizations that contains 10 AWS accounts. A solutions architect must design a solution to provide access to the accounts for several thousand employees. The company has an existing identity provider (IdP). The company wants to use the existing IdP for authentication to AWS. Which solution will meet these requirements?',
      options: [
        'Create IAM users for the employees in the required AWS accounts. Connect IAM users to the existing IdP. Configure federated authentication for the IAM users.',
        'Set up AWS account root users with user email addresses and passwords that are synchronized from the existing IdP.',
        'Configure AWS IAM Identity Center. Connect IAM Identity Center to the existing IdP. Provision users and groups from the existing IdP.',
        'Use AWS Resource Access Manager (AWS RAM) to share access to the AWS accounts with the users in the existing IdP.',
      ],
      correctOptionIndex: 2,
      explanation:
        'AWS IAM Identity Center (formerly AWS SSO) is the recommended service for centrally managing workforce access to multiple AWS accounts. It integrates seamlessly with AWS Organizations and can connect to an external IdP, enabling employees to use their existing corporate credentials. Permission sets grant role-based access to the various AWS accounts within the organization.',
      incorrectOptionExplanations: {
        0: 'Creating individual IAM users for thousands of employees across 10 accounts is not scalable and is a significant management overhead.',
        1: 'Using the root user for regular access is a major security anti-pattern. The root user should be used only for specific account management tasks.',
        3: 'AWS RAM is used for sharing specific AWS resources across accounts, not for managing user identities or providing federated access.',
      },
      references: [
        'AWS IAM Identity Center User Guide — "What is AWS IAM Identity Center?": Provides centralized access management across AWS accounts and applications.',
        'AWS IAM Identity Center User Guide — Manage access to AWS accounts: Uses permission sets to control access within an AWS Organization.',
        'AWS Security Best Practices Whitepaper: Recommends IAM Identity Center for human user access management.',
      ],
    },

    // ═══════════════════════════════════════════════════════════════════════
    // Question 42 — Control Tower + Security Hub / FSBP Compliance
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: 'ed1-q42',
      type: 'single',
      prompt:
        'A company requires centralized auditing for all AWS accounts and compliance monitoring against AWS Foundational Security Best Practices (FSBP) with minimal operational overhead. Which solution will meet these requirements?',
      options: [
        'Deploy AWS Control Tower in the management account. Enable AWS Security Hub and Account Factory.',
        'Deploy AWS Control Tower in a member account.',
        'Use AWS Managed Services (AMS) with GuardDuty.',
        'Use AWS Managed Services (AMS) with Security Hub.',
      ],
      correctOptionIndex: 0,
      explanation:
        'AWS Control Tower provides the most streamlined way to set up and govern a secure, multi-account AWS environment. Deployed in the management account, it establishes a landing zone with best-practice guardrails and centralized logging. Integration with AWS Security Hub enables continuous compliance monitoring against FSBP across all accounts.',
      incorrectOptionExplanations: {
        1: 'AWS Control Tower must be deployed in the management account, not a member account, to govern member accounts.',
        2: 'AWS Managed Services is an operational service, and GuardDuty is for threat detection, not comprehensive compliance auditing against FSBP.',
        3: 'While Security Hub provides compliance checks, this option lacks the foundational governance, guardrails, and automated account provisioning provided by AWS Control Tower.',
      },
      references: [
        'AWS Documentation — What Is AWS Control Tower?: Automates landing zone setup and configures AWS management and security services including Security Hub.',
        'AWS Documentation — AWS Foundational Security Best Practices standard: Enabled by default when Security Hub is enabled.',
        'AWS Documentation — How AWS Control Tower works: Control Tower must be set up in the management account.',
      ],
    },

    // ═══════════════════════════════════════════════════════════════════════
    // Question 43 — Shield Advanced / DDoS Response Team
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: 'ed1-q43',
      type: 'single',
      prompt:
        'A company wants to protect resources that the company hosts on AWS, including Application Load Balancers and Amazon CloudFront distributions. The company wants an AWS service that can provide near real-time visibility into attacks on the company\'s resources. The service must also have a dedicated AWS team to assist with DDoS attacks. Which AWS service will meet these requirements?',
      options: [
        'AWS WAF',
        'AWS Shield Standard',
        'Amazon Macie',
        'AWS Shield Advanced',
      ],
      correctOptionIndex: 3,
      explanation:
        'AWS Shield Advanced offers near real-time visibility into attacks using Amazon CloudWatch metrics and detailed attack diagnostics. A key feature is 24x7 access to the AWS DDoS Response Team (DRT), who can assist in mitigating complex DDoS attacks. This service is specifically designed to protect ALBs and CloudFront distributions.',
      incorrectOptionExplanations: {
        0: 'AWS WAF protects against common web exploits at Layer 7 but does not include a dedicated DDoS response team.',
        1: 'AWS Shield Standard provides baseline DDoS protection but lacks advanced visibility and access to the dedicated AWS DDoS Response Team.',
        2: 'Amazon Macie is a data security service for discovering sensitive data in S3; it is not a DDoS protection service.',
      },
      references: [
        'AWS Shield Developer Guide — AWS Shield Advanced features: 24/7 access to SRT and near real-time visibility into attacks.',
        'AWS Shield Features Page: Comparison table showing DRT access and attack visibility are exclusive to Shield Advanced.',
        'AWS WAF Developer Guide — "What is AWS WAF?": Layer 7 protection, not comprehensive DDoS coverage.',
        'Amazon Macie User Guide: Data security service, not DDoS protection.',
      ],
    },

    // ═══════════════════════════════════════════════════════════════════════
    // Question 44 — Secrets Manager / RDS Credential Rotation
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: 'ed1-q44',
      type: 'single',
      prompt:
        'A company has an application that runs on Amazon EC2 instances and uses an Amazon Aurora database. The EC2 instances connect to the Aurora database by using user names and passwords that the company stores locally in a file. The company changes the user names and passwords every month. The company wants to minimize the operational overhead of credential management. Which solution will meet these requirements?',
      options: [
        'Store the credentials as a secret within AWS Secrets Manager. Assign IAM permissions to the secret. Reconfigure the application to call the secret. Enable rotation on the secret and configure rotation to occur on a monthly schedule.',
        'Use AWS Systems Manager Parameter Store to create a new parameter for the credentials. Use IAM policies to restrict access to the parameter. Reconfigure the application to access the parameter.',
        'Create an Amazon S3 bucket to store objects. Use an AWS Key Management Service (AWS KMS) key to encrypt the objects. Migrate the credentials file to the S3 bucket. Update the application to retrieve the credentials file from the S3 bucket.',
        'Create an encrypted Amazon Elastic Block Store (Amazon EBS) volume for each EC2 instance. Attach the encrypted EBS volumes to the EC2 instances. Migrate the credentials file to the new EBS volumes.',
      ],
      correctOptionIndex: 0,
      explanation:
        'AWS Secrets Manager securely stores secrets and offers automated rotation capabilities that integrate directly with services like Amazon Aurora. Configuring the application to retrieve credentials from Secrets Manager and enabling automatic monthly rotation completely offloads the operational overhead of manual credential management.',
      incorrectOptionExplanations: {
        1: 'AWS Systems Manager Parameter Store can store secrets, but its automated rotation is less integrated and straightforward than Secrets Manager for databases.',
        2: 'Storing a credentials file in an S3 bucket is not a recommended security practice for active database credentials and adds retrieval overhead.',
        3: 'Using an encrypted EBS volume only protects data at rest; it does not provide a mechanism for managing or rotating credentials.',
      },
      references: [
        'AWS Secrets Manager User Guide — Rotate AWS Secrets Manager secrets: Describes automated rotation for Amazon Aurora.',
        'AWS Secrets Manager User Guide — What is AWS Secrets Manager?: Purpose-built for managing secrets including database credentials.',
        'AWS Whitepapers — AWS Security Best Practices: Recommends AWS Secrets Manager for managing application secrets.',
      ],
    },

    // ═══════════════════════════════════════════════════════════════════════
    // Question 45 — Shield Advanced Protection Groups / Blue-Green
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: 'ed1-q45',
      type: 'single',
      prompt:
        'A company runs an application on Amazon EC2 instances behind an Application Load Balancer (ALB). The company uses Amazon Route 53 to route traffic to the ALB. The ALB is a resource in an AWS Shield Advanced protection group. The company is preparing for a blue/green deployment in which traffic will shift to a new ALB. The company wants to protect against DDoS attacks during the deployment. Which solution will meet this requirement?',
      options: [
        'Add the new ALB to the Shield Advanced protection group. Select Sum as the aggregation type for the volume of traffic for the whole group.',
        'Add the new ALB to the Shield Advanced protection group. Select Mean as the aggregation type for the volume of traffic for the whole group.',
        'Create a new Shield Advanced protection group. Add the new ALB to the new protection group. Select Sum as the aggregation type for the volume of traffic.',
        'Set up an Amazon CloudFront distribution. Add the CloudFront distribution and the new ALB to the Shield Advanced protection group. Select Max as the aggregation type for the volume of traffic for the whole group.',
      ],
      correctOptionIndex: 0,
      explanation:
        'During a blue/green deployment, both ALBs serve production traffic simultaneously. Adding the new ALB to the existing protection group with Sum aggregation combines the traffic from both ALBs, providing a holistic view of total application traffic for accurate baselining and DDoS detection.',
      incorrectOptionExplanations: {
        1: 'Mean aggregation would average the traffic, which would not accurately represent the total attack surface when traffic is unevenly split between two ALBs.',
        2: 'Creating a new protection group would treat the new ALB as a separate application, preventing Shield from detecting a coordinated attack distributed across both environments.',
        3: 'Introducing CloudFront is an unnecessary architectural change. Max aggregation only considers the busiest ALB, ignoring traffic to the other.',
      },
      references: [
        'AWS Shield Developer Guide — Protection group aggregation: Sum aggregation is for protecting the total traffic across all resources in the group, ideal for a group of ALBs sharing application traffic.',
        'AWS Well-Architected Framework — Reliability Pillar: Blue/green deployments involve running two identical production environments simultaneously.',
      ],
    },

    // ═══════════════════════════════════════════════════════════════════════
    // Question 46 — AppConfig + Secrets Manager / Least Admin Overhead
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: 'ed1-q46',
      type: 'single',
      prompt:
        'A company is building an application on AWS that connects to an Amazon RDS database. The company wants to manage the application configuration and to securely store and retrieve credentials for the database and other services. Which solution will meet these requirements with the LEAST administrative overhead?',
      options: [
        'Use AWS AppConfig to store and manage the application configuration. Use AWS Secrets Manager to store and retrieve the credentials.',
        'Use AWS Lambda to store and manage the application configuration. Use AWS Systems Manager Parameter Store to store and retrieve the credentials.',
        'Use an encrypted application configuration file. Store the file in Amazon S3 for the application configuration. Create another S3 file to store and retrieve the credentials.',
        'Use AWS AppConfig to store and manage the application configuration. Use Amazon RDS to store and retrieve the credentials.',
      ],
      correctOptionIndex: 0,
      explanation:
        'AWS AppConfig is designed to create, manage, and deploy application configurations with controlled updates without redeploying. AWS Secrets Manager is a dedicated service for securely storing and managing secrets like database credentials, with automatic rotation for supported services including Amazon RDS, significantly reducing administrative overhead.',
      incorrectOptionExplanations: {
        1: 'Using AWS Lambda to manage configuration is not its intended purpose and requires custom development. Parameter Store lacks the automatic RDS credential rotation of Secrets Manager.',
        2: 'Storing configuration and credentials in S3 files requires manual processes for updates and rotation, creating significant administrative overhead.',
        3: 'Storing credentials for other services within the Amazon RDS database itself is a poor security practice.',
      },
      references: [
        'AWS AppConfig User Guide: Manages application configurations with controlled deployments.',
        'AWS Secrets Manager User Guide: Secures and automatically rotates database credentials including Amazon RDS.',
        'AWS Systems Manager User Guide — Comparing Secrets Manager and Parameter Store: Recommends Secrets Manager when secret rotation is required.',
      ],
    },

    // ═══════════════════════════════════════════════════════════════════════
    // Question 47 — RDS KMS + SSL/TLS / Financial Data Encryption
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: 'ed1-q47',
      type: 'single',
      prompt:
        'A financial services company plans to launch a new application on AWS to handle sensitive financial transactions. The company will deploy the application on Amazon EC2 instances. The company will use Amazon RDS for MySQL as the database. The company\'s security policies mandate that data must be encrypted at rest and in transit. Which solution will meet these requirements with the LEAST operational overhead?',
      options: [
        'Configure encryption at rest for Amazon RDS for MySQL by using AWS KMS managed keys. Configure AWS Certificate Manager (ACM) SSL/TLS certificates for encryption in transit.',
        'Configure encryption at rest for Amazon RDS for MySQL by using AWS KMS managed keys. Configure IPsec tunnels for encryption in transit.',
        'Implement third-party application-level data encryption before storing data in Amazon RDS for MySQL. Configure AWS Certificate Manager (ACM) SSL/TLS certificates for encryption in transit.',
        'Configure encryption at rest for Amazon RDS for MySQL by using AWS KMS managed keys. Configure a VPN connection to enable private connectivity to encrypt data in transit.',
      ],
      correctOptionIndex: 0,
      explanation:
        'Amazon RDS provides built-in encryption at rest using AWS KMS with a simple configuration setting. For encryption in transit, Amazon RDS natively supports SSL/TLS connections between the application and the database. These native, managed features minimize operational burden compared to IPsec tunnels or VPN connections.',
      incorrectOptionExplanations: {
        1: 'Configuring IPsec tunnels between EC2 and RDS adds significant complexity and management overhead compared to native SSL/TLS support.',
        2: 'Third-party application-level encryption requires managing encryption libraries, key rotation, and custom code, creating much higher operational overhead.',
        3: 'A VPN is primarily for securing traffic between a VPC and an external network. Using it for intra-VPC traffic is unnecessary and adds complexity compared to SSL/TLS.',
      },
      references: [
        'Amazon RDS User Guide — Encrypting Amazon RDS resources: AES-256 encryption using AWS KMS.',
        'Amazon RDS User Guide — Using SSL/TLS to encrypt a connection to a DB instance: SSL/TLS certificates are installed on the DB instance when provisioned.',
        'AWS Well-Architected Framework — Security Pillar: Recommends using managed services that perform security testing on your behalf.',
      ],
    },

    // ═══════════════════════════════════════════════════════════════════════
    // Question 48 — Site-to-Site VPN / Security Groups / NACLs
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: 'ed1-q48',
      type: 'single',
      prompt:
        "A solutions architect needs to connect a company's corporate network to its VPC to allow on-premises access to its AWS resources. The solution must provide encryption of all traffic between the corporate network and the VPC at the network layer and the session layer. The solution also must provide security controls to prevent unrestricted access between AWS and the on-premises systems. Which solution meets these requirements?",
      options: [
        'Configure AWS Direct Connect to connect to the VPC. Configure the VPC route tables to allow and deny traffic between AWS and on premises as required.',
        'Create an IAM policy to allow access to the AWS Management Console only from a defined set of corporate IP addresses. Restrict user access based on job responsibility by using an IAM policy and roles.',
        'Configure AWS Site-to-Site VPN to connect to the VPC. Configure route table entries to direct traffic from on premises to the VPC. Configure instance security groups and network ACLs to allow only required traffic from on premises.',
        'Configure AWS Transit Gateway to connect to the VPC. Configure route table entries to direct traffic from on premises to the VPC. Configure instance security groups and network ACLs to allow only required traffic from on premises.',
      ],
      correctOptionIndex: 2,
      explanation:
        'AWS Site-to-Site VPN uses the IPsec protocol suite to encrypt traffic at the network layer (Layer 3), protecting data in transit including at higher layers. Security groups (stateful firewalls) and network ACLs (stateless firewalls) define specific rules permitting or denying traffic based on protocols, ports, and source/destination IPs, preventing unrestricted access.',
      incorrectOptionExplanations: {
        0: 'AWS Direct Connect provides a dedicated private connection but is not encrypted by default. To meet the encryption requirement, a VPN would need to be configured over it.',
        1: 'IAM policies manage user permissions for AWS APIs (control plane), not network traffic flow or encryption between a VPC and on-premises network (data plane).',
        3: 'AWS Transit Gateway is a network transit hub for interconnecting multiple VPCs. While it can use a VPN attachment for encryption, it is less direct than a single VPC-to-on-premises Site-to-Site VPN.',
      },
      references: [
        'AWS Documentation — What is AWS Site-to-Site VPN?: Uses IPsec VPN tunnel to encrypt communications.',
        'AWS Documentation — Security groups for your VPC: Acts as a virtual firewall for EC2 instances.',
        'AWS Documentation — Network ACLs: An optional firewall layer for controlling traffic in and out of subnets.',
        'AWS Direct Connect FAQs: Direct Connect traffic is not encrypted by default; Site-to-Site VPN is needed for encryption.',
      ],
    },

    // ═══════════════════════════════════════════════════════════════════════
    // Question 49 — EC2 Instance Connect Endpoint / Private SSH
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: 'ed1-q49',
      type: 'single',
      prompt:
        'A company has deployed a non-production Amazon EC2 instance by using an Amazon Linux AMI in a private subnet. The company wants to allow a group of developers to connect to the EC2 instance remotely by using SSH without exposing the EC2 instance to the internet. The developers must be able to connect to the EC2 instance through the AWS Management Console. Which solution will meet these requirements?',
      options: [
        'Create a VPC endpoint for AWS Systems Manager in the same subnet as the EC2 instance. Allow inbound access from the endpoint security group to the EC2 instance security group on port 22. Create an IAM role for the EC2 instance and attach the AmazonSSMManagedInstanceCore policy.',
        'Create an EC2 Instance Connect Endpoint in the same subnet as the EC2 instance. Attach a security group to the endpoint that allows inbound connections on port 443. Assign the AmazonEC2InstanceConnect IAM managed policy to the group of developers.',
        'Create an EC2 Instance Connect Endpoint in the same subnet as the EC2 instance. Attach a security group to the endpoint that allows inbound connections on port 22. Assign the AmazonEC2InstanceConnect IAM managed policy to the group of developers.',
        'Create a VPC endpoint for AWS Systems Manager in the same subnet as the EC2 instance. Allow inbound access from the endpoint security group to the EC2 instance security group on port 443. Create an IAM role for the EC2 instance and attach the AmazonSSMReadOnlyAccess policy.',
      ],
      correctOptionIndex: 1,
      explanation:
        'EC2 Instance Connect Endpoint enables console-initiated SSH to instances in private subnets without requiring a public IP or bastion. Traffic from the browser is tunneled over TLS (TCP 443) to the endpoint, which then makes an internal TCP-22 connection to the instance. The endpoint\'s security group therefore needs port 443 open. Developers require the AmazonEC2InstanceConnect managed policy to push temporary SSH keys.',
      incorrectOptionExplanations: {
        0: 'SSM Session Manager provides command-line sessions, not native SSH, and port 22 is not used in Session Manager.',
        2: 'The endpoint listens on 443; authorizing inbound 22 prevents the TLS handshake, blocking connections.',
        3: 'AmazonSSMReadOnlyAccess does not allow an instance to register with SSM, and Session Manager is still not SSH.',
      },
      references: [
        'Amazon EC2 Instance Connect Endpoint Guide — Prerequisites, Step 2: Security group must allow inbound TCP 443.',
        'Amazon EC2 User Guide — Connect using EC2 Instance Connect Endpoint.',
        'IAM Managed Policies documentation — AmazonEC2InstanceConnect: Allows publishing of SSH keys.',
      ],
    },

    // ═══════════════════════════════════════════════════════════════════════
    // Question 50 — Secrets Manager / Lambda / RDS PostgreSQL Migration
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: 'ed1-q50',
      type: 'single',
      prompt:
        'A company runs a Node.js function on a server in its on-premises data center. The data center stores data in a PostgreSQL database. The company stores the credentials in a connection string in an environment variable on the server. The company wants to migrate its application to AWS and to replace the Node.js application server with AWS Lambda. The company also wants to migrate to Amazon RDS for PostgreSQL and to ensure that the database credentials are securely managed. Which solution will meet these requirements with the LEAST operational overhead?',
      options: [
        'Store the database credentials as a parameter in AWS Systems Manager Parameter Store. Configure Parameter Store to automatically rotate the secrets every 30 days. Update the Lambda function to retrieve the credentials from the parameter.',
        'Store the database credentials as a secret in AWS Secrets Manager. Configure Secrets Manager to automatically rotate the credentials every 30 days. Update the Lambda function to retrieve the credentials from the secret.',
        'Store the database credentials as an encrypted Lambda environment variable. Write a custom Lambda function to rotate the credentials. Schedule the Lambda function to run every 30 days.',
        'Store the database credentials as a key in AWS Key Management Service (AWS KMS). Configure automatic rotation for the key. Update the Lambda function to retrieve the credentials from the KMS key.',
      ],
      correctOptionIndex: 1,
      explanation:
        'AWS Secrets Manager provides native, automated rotation capabilities for Amazon RDS for PostgreSQL without writing or maintaining custom code. The Lambda function can retrieve current credentials at runtime via IAM permissions, securely managing credentials with the least operational overhead.',
      incorrectOptionExplanations: {
        0: 'AWS Systems Manager Parameter Store does not have a built-in, automated rotation feature for RDS database credentials. Implementing rotation would require a custom solution.',
        2: 'Storing credentials in Lambda environment variables and writing a custom rotation function creates significant operational overhead.',
        3: 'AWS KMS is used to create and manage cryptographic keys, not to store secrets like database credentials. KMS key rotation rotates the encryption key, not the database password.',
      },
      references: [
        'AWS Secrets Manager User Guide — Rotate AWS Secrets Manager secrets: Provides a Lambda function to rotate secrets for supported AWS services including Amazon RDS.',
        'AWS Secrets Manager User Guide — Compare Secrets Manager and Parameter Store: Secrets Manager offers built-in rotation for Amazon RDS; Parameter Store does not.',
        'AWS Lambda Developer Guide — Managing secrets: Best practice for Lambda functions to access Secrets Manager.',
        'AWS KMS Developer Guide — What is AWS Key Management Service?: For managing cryptographic keys, not storing application secrets.',
      ],
    },

    // ═══════════════════════════════════════════════════════════════════════
    // Question 51 — Secrets Manager / Auto Scaling Credential Rotation
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: 'ed1-q51',
      type: 'single',
      prompt:
        'A company has an application that runs on Amazon EC2 instances in an Auto Scaling group. The application uses hardcoded credentials to access an Amazon RDS database. To comply with new regulations, the company needs to automatically rotate the database password for the application service account every 90 days. Which solution will meet these requirements?',
      options: [
        'Create an AWS Lambda function to generate new passwords and upload them to EC2 instances by using SSH.',
        'Create a secret for the database credentials in AWS Secrets Manager. Enable rotation every 90 days. Modify the application to retrieve credentials from Secrets Manager.',
        'Create an Amazon ECS task to rotate passwords and upload them to EC2 instances.',
        'Create a new EC2 instance that runs a cron job to rotate passwords.',
      ],
      correctOptionIndex: 1,
      explanation:
        'AWS Secrets Manager is purpose-built for this scenario. Storing credentials as a secret with automatic 90-day rotation eliminates manual intervention. Modifying the application to retrieve credentials from Secrets Manager using the AWS SDK eliminates hardcoded credentials and improves security posture.',
      incorrectOptionExplanations: {
        0: 'This is a complex, custom solution requiring SSH access management and is less secure and reliable than a managed AWS service.',
        2: 'Using an Amazon ECS task is another custom, overly complex solution for a problem that AWS Secrets Manager solves natively.',
        3: 'Running a cron job on a dedicated EC2 instance is an outdated, inefficient, and less secure method requiring infrastructure management.',
      },
      references: [
        'AWS Secrets Manager User Guide — What is AWS Secrets Manager?: Enables rotating, managing, and retrieving database credentials.',
        'AWS Secrets Manager User Guide — Rotate AWS Secrets Manager secrets: Details the process and benefits of automatic rotation.',
        'AWS Secrets Manager User Guide — Retrieve secrets from AWS Secrets Manager: Code examples for applications to fetch secrets.',
      ],
    },

    // ═══════════════════════════════════════════════════════════════════════
    // Question 52 — AWS Config / EBS Encryption Compliance
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: 'ed1-q52',
      type: 'single',
      prompt:
        'A company wants to standardize its Amazon Elastic Block Store (Amazon EBS) volume encryption strategy. The company also wants to minimize the cost and configuration effort required to operate the volume encryption check. Which solution will meet these requirements?',
      options: [
        'Write API calls to describe the EBS volumes and to confirm the EBS volumes are encrypted. Use Amazon EventBridge to schedule an AWS Lambda function to run the API calls.',
        'Write API calls to describe the EBS volumes and to confirm the EBS volumes are encrypted. Run the API calls on an AWS Fargate task.',
        'Create an AWS Identity and Access Management (IAM) policy that requires the use of tags on EBS volumes. Use AWS Cost Explorer to display resources that are not properly tagged. Encrypt the untagged resources manually.',
        'Create an AWS Config rule for Amazon EBS to evaluate if a volume is encrypted and to flag the volume if it is not encrypted.',
      ],
      correctOptionIndex: 3,
      explanation:
        'AWS Config provides a managed rule, encrypted-volumes, specifically designed to check whether attached Amazon EBS volumes are encrypted. This solution avoids writing custom code, managing infrastructure, or scheduling tasks, minimizing configuration effort. Cost is optimized as you pay only for configuration items recorded and rule evaluations.',
      incorrectOptionExplanations: {
        0: 'This is a custom solution requiring writing, testing, and maintaining Lambda code — significantly more effort than a managed AWS Config rule.',
        1: 'Using AWS Fargate is overly complex and not cost-effective for a simple periodic compliance check.',
        2: 'This option conflates tagging with encryption. IAM policies and Cost Explorer are for access control and cost management, not encryption status.',
      },
      references: [
        'AWS Config Developer Guide — List of AWS Config Managed Rules: The encrypted-volumes rule checks whether attached EBS volumes are encrypted.',
        'Amazon EBS User Guide — Amazon EBS encryption: AWS Config is used to audit compliance against encryption standards.',
        'AWS Well-Architected Framework — Security Pillar: Recommends AWS Config to check that data is encrypted at rest.',
      ],
    },

    // ═══════════════════════════════════════════════════════════════════════
    // Question 53 — IAM Role / Instance Profile / CloudFormation
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: 'ed1-q53',
      type: 'single',
      prompt:
        'A company uses Amazon EC2 instances to host a website. The website uses an Amazon S3 bucket to store media files. The company wants to automate infrastructure creation across multiple Regions and securely grant EC2 access to S3 using IAM. Which solution will meet these requirements MOST securely?',
      options: [
        'Store IAM access keys in UserData.',
        'Store access keys in S3 and reference them in CloudFormation.',
        'Use an IAM role and instance profile in CloudFormation.',
        'Retrieve access keys dynamically and store them on EC2.',
      ],
      correctOptionIndex: 2,
      explanation:
        'Using an IAM role attached to an EC2 instance profile provides temporary credentials automatically rotated by AWS, eliminating the risk of storing long-lived access keys. AWS CloudFormation can define the IAM role, permissions, instance profile, and associate it with the EC2 instance for secure and automated deployment across multiple regions.',
      incorrectOptionExplanations: {
        0: 'Storing access keys in UserData is highly insecure as this data can be easily retrieved and is not intended for storing secrets.',
        1: 'Storing access keys in S3 introduces unnecessary complexity and risk; it is an anti-pattern to store long-lived credentials anywhere.',
        3: 'Storing retrieved access keys on an EC2 instance is less secure than using an IAM role, which manages credentials in memory without writing them to disk.',
      },
      references: [
        'AWS Documentation — IAM roles for Amazon EC2: Using IAM roles is the secure way to grant permissions to EC2 instances.',
        'AWS Documentation — Security best practices in IAM: Recommends temporary credentials provided by IAM roles over long-term access keys.',
        'AWS Documentation — AWS::IAM::InstanceProfile: Shows how CloudFormation creates and associates instance profiles.',
      ],
    },

    // ═══════════════════════════════════════════════════════════════════════
    // Question 54 — Cross-Account IAM Role / CloudWatch Logs Vendor Access
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: 'ed1-q54',
      type: 'single',
      prompt:
        'A company needs to allow a vendor to access CloudWatch Logs in the company\'s AWS account by using IAM roles for cross-account access. Which solution will meet these requirements?',
      options: [
        'Create roles in both accounts and trust the company role.',
        'Create a role in the vendor account and trust the company role.',
        'Create a role in the company account and trust the company role.',
        'Create a role in the company account with permissions and trust the vendor role.',
      ],
      correctOptionIndex: 3,
      explanation:
        "The account containing the resources (the company) must create an IAM role with: (1) a permissions policy granting access to CloudWatch Logs, and (2) a trust policy specifying the vendor's AWS account as the principal allowed to assume the role. The vendor then uses STS AssumeRole to obtain temporary credentials.",
      incorrectOptionExplanations: {
        0: 'The trust relationship is one-way; the company\'s role must trust the vendor\'s account, not another role in the company\'s own account.',
        1: 'The role with permissions to access resources must be created in the account that owns those resources (the company account), not the vendor\'s account.',
        2: 'Trusting a role in the same account does not enable cross-account access; the trust policy must reference the external vendor\'s account ID.',
      },
      references: [
        'AWS Documentation — IAM tutorial: Delegate access across AWS accounts using IAM roles: Step-by-step guide for cross-account access.',
        'AWS Documentation — How to use trust policies with IAM roles: Explains the function of the trust policy.',
        'AWS Documentation — Switching to a role (console): Defines trusting and trusted accounts.',
      ],
    },

    // ═══════════════════════════════════════════════════════════════════════
    // Question 55 — Route 53 Resolver Outbound / On-Premises DNS
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: 'ed1-q55',
      type: 'single',
      prompt:
        'A company is designing a web application on AWS. The application uses a VPN connection between the company\'s on-premises data center and the company\'s VPC. The company uses Amazon Route 53 as its DNS service. The application must use private DNS records to communicate with the on-premises services from a VPC. Which solution will meet these requirements MOST securely?',
      options: [
        'Create a Route 53 Resolver outbound endpoint. Create a Resolver rule. Associate the Resolver rule with the VPC.',
        'Create a Route 53 Resolver inbound endpoint. Create a Resolver rule. Associate the Resolver rule with the VPC.',
        'Create a Route 53 private hosted zone. Associate the private hosted zone with the on-premises network.',
        'Create a Route 53 public hosted zone. Create a record for each on-premises service.',
      ],
      correctOptionIndex: 0,
      explanation:
        'To resolve DNS queries for on-premises domains from within a VPC, a Route 53 Resolver outbound endpoint is created in the VPC, providing a path for queries to exit. A Resolver forwarding rule specifies which domain names should be forwarded to the on-premises DNS servers\' IP addresses. The rule is then associated with the VPC.',
      incorrectOptionExplanations: {
        1: 'A Route 53 Resolver inbound endpoint handles the opposite traffic flow: resolving VPC DNS names from the on-premises network.',
        2: 'A private hosted zone resolves DNS within AWS VPCs. It cannot be associated with an on-premises network to forward queries.',
        3: 'A public hosted zone would insecurely expose internal service names to the public internet.',
      },
      references: [
        'AWS Documentation — Resolving DNS queries between VPCs and your network: Describes forwarding outbound DNS queries from VPCs to on-premises networks.',
        'AWS Documentation — Managing forwarding rules: Forwarding rules direct queries for specific domains to target IP addresses.',
      ],
    },

    // ═══════════════════════════════════════════════════════════════════════
    // Question 56 — Per-Customer KMS Keys / Multi-Tenant Encryption
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: 'ed1-q56',
      type: 'single',
      prompt:
        "A company is designing an application on AWS that processes sensitive data. The application stores and processes financial data for multiple customers. To meet compliance requirements, the data for each customer must be encrypted separately at rest by using a secure, centralized key management solution. The company wants to use AWS Key Management Service (AWS KMS) to implement encryption. Which solution will meet these requirements with the LEAST operational overhead?",
      options: [
        'Generate a unique encryption key for each customer. Store the keys in an Amazon S3 bucket. Enable server-side encryption.',
        'Deploy a hardware security appliance in the AWS environment that securely stores customer-provided encryption keys. Integrate the security appliance with AWS KMS to encrypt the sensitive data in the application.',
        'Create a single AWS KMS key to encrypt all sensitive data across the application.',
        "Create separate AWS KMS keys for each customer's data that have granular access control and logging enabled.",
      ],
      correctOptionIndex: 3,
      explanation:
        'Creating a distinct AWS KMS customer-managed key (CMK) for each customer provides cryptographic isolation, customer-specific access controls through key policies, and detailed audit trails via AWS CloudTrail. As AWS KMS is fully managed, this solution has the least operational overhead.',
      incorrectOptionExplanations: {
        0: 'Storing raw encryption keys in an S3 bucket is a significant security anti-pattern and creates high operational overhead for key management.',
        1: 'Deploying and managing a hardware security appliance introduces substantial operational complexity.',
        2: 'Using a single KMS key for all customers fails the primary compliance requirement for separate, per-customer data encryption.',
      },
      references: [
        'AWS KMS Developer Guide — Customer managed keys: Full control over key policies, enabling/disabling, and rotation.',
        'AWS KMS Developer Guide — Key policies in AWS KMS: Per-customer keys allow granular, per-customer access control.',
        'AWS KMS Developer Guide — Logging AWS KMS API calls with CloudTrail: All API calls for each key are logged by default.',
        'AWS Well-Architected Framework — Security Pillar: Recommends different keys per tenant in multi-tenant environments.',
      ],
    },

    // ═══════════════════════════════════════════════════════════════════════
    // Question 57 — ECR Scan on Push / CVE Scanning
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: 'ed1-q57',
      type: 'single',
      prompt:
        'A company runs its workloads on Amazon Elastic Container Service (Amazon ECS). The container images that the ECS task definition uses need to be scanned for Common Vulnerabilities and Exposures (CVEs). New container images that are created also need to be scanned. Which solution will meet these requirements with the FEWEST changes to the workloads?',
      options: [
        'Use Amazon Elastic Container Registry (Amazon ECR) as a private image repository. Enable scan on push for ECR basic scanning.',
        'Store the container images in an Amazon S3 bucket. Use Amazon Macie to scan the images.',
        'Migrate the workloads to Amazon EKS. Use ECR enhanced scanning.',
        'Store the container images in S3 and trigger Amazon Inspector scans with Lambda.',
      ],
      correctOptionIndex: 0,
      explanation:
        'Amazon ECR integrates seamlessly with Amazon ECS. ECR\'s "scan on push" feature automatically scans container images for software vulnerabilities upon being pushed to a repository. This is a simple configuration change on the ECR repository with no modification to the ECS workloads themselves.',
      incorrectOptionExplanations: {
        1: 'Amazon Macie is a data security service that discovers sensitive data; it does not scan container images for CVEs.',
        2: 'Migrating from Amazon ECS to EKS is a significant architectural change violating the requirement for the fewest changes.',
        3: 'This introduces unnecessary complexity; ECR provides a native, integrated scanning solution.',
      },
      references: [
        'Amazon ECR User Guide — Image scanning: Describes "Scan on push" configuration.',
        'Amazon ECR User Guide — Basic scanning: Automated vulnerability scan on push.',
      ],
    },

    // ═══════════════════════════════════════════════════════════════════════
    // Question 58 — IAM Identity Center / Permission Sets / Least Privilege
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: 'ed1-q58',
      type: 'single',
      prompt:
        'A company is building a cloud-based application on AWS that will handle sensitive customer data. The application uses Amazon RDS for the database. Amazon S3 for object storage, and S3 Event Notifications that invoke AWS Lambda for serverless processing. The company uses AWS IAM Identity Center to manage user credentials. The development, testing, and operations teams need secure access to Amazon RDS and Amazon S3 while ensuring the confidentiality of sensitive customer data. The solution must comply with the principle of least privilege. Which solution meets these requirements with the LEAST operational overhead?',
      options: [
        'Use IAM roles with least privilege to grant all the teams access. Assign IAM roles to each team with customized IAM policies defining specific permissions for Amazon RDS and S3 object access based on team responsibilities.',
        'Enable IAM Identity Center with an Identity Center directory. Create and configure permission sets with granular access to Amazon RDS and Amazon S3. Assign all the teams to groups that have specific access with the permission sets.',
        'Create individual IAM users for each member in all the teams with role-based permissions. Assign the IAM roles with predefined policies for RDS and S3 access to each user based on user needs. Implement IAM Access Analyzer for periodic credential evaluation.',
        'Use AWS Organizations to create separate accounts for each team. Implement cross-account IAM roles with least privilege. Grant specific permissions for RDS and S3 access based on team roles and responsibilities.',
      ],
      correctOptionIndex: 1,
      explanation:
        'The company already uses IAM Identity Center. The most efficient approach is to create groups for each team and attach granular permission sets, managing access based on job functions. This adheres to the principle of least privilege while minimizing operational overhead by managing group memberships and permission sets rather than individual user policies.',
      incorrectOptionExplanations: {
        0: 'This describes using standard IAM roles, which is less efficient than using IAM Identity Center\'s permission sets and group management since Identity Center is already in use.',
        2: 'Creating individual IAM users is not a best practice for managing human access, leads to higher operational overhead, and bypasses the existing IAM Identity Center infrastructure.',
        3: 'Creating separate AWS accounts for each team introduces significant complexity and operational overhead for a single application.',
      },
      references: [
        'AWS IAM Identity Center User Guide: Recommends using permission sets based on job function assigned to groups.',
        'AWS IAM Identity Center User Guide — How permission sets work: A collection of administrator-defined policies used to determine effective permissions.',
        'AWS Security Best Practices Whitepaper: Recommends centralizing identity management using groups and roles.',
      ],
    },

    // ═══════════════════════════════════════════════════════════════════════
    // Question 59 — CloudFront to ALB / Restrict Direct Access
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: 'ed1-q59',
      type: 'single',
      prompt:
        'A company plans to deploy an application that uses an Amazon CloudFront distribution. The company will set an Application Load Balancer (ALB) as the origin for the distribution. The company wants to ensure that users access the ALB only through the CloudFront distribution. The company plans to deploy the solution in a new VPC. Which solution will meet these requirements?',
      options: [
        'Configure the network ACLs in the subnet where the ALB is deployed to allow inbound traffic only from the public IP addresses of the CloudFront edge locations.',
        'Create a VPC origin for the CloudFront distribution. Set the VPC origin Amazon Resource Name (ARN) to the ARN of the ALB.',
        'Create a security group that allows only inbound traffic from the public IP addresses of the CloudFront edge locations. Associate the security group with the ALB.',
        'Create a VPC origin for the CloudFront distribution. Configure an ALB rule. Set the source IP condition to allow traffic only from the public IP addresses of the CloudFront edge locations.',
      ],
      correctOptionIndex: 2,
      explanation:
        'Creating a security group associated with the ALB with an inbound rule allowing traffic from the AWS-managed prefix list com.amazonaws.global.cloudfront.origin-facing ensures traffic to the ALB comes exclusively from CloudFront. AWS automatically maintains this prefix list, making it scalable and low-maintenance.',
      incorrectOptionExplanations: {
        0: 'Network ACLs are stateless and managing the large, dynamic list of CloudFront IP addresses in a NACL is impractical compared to a security group with a managed prefix list.',
        1: '"VPC origin" is not a standard CloudFront origin type for an ALB. An ALB is configured as a "Custom Origin" using its DNS name. This also fails to implement any access restriction.',
        3: 'Managing the extensive and dynamic list of CloudFront IP addresses within ALB listener rules is not feasible. Security groups are the purpose-built tool.',
      },
      references: [
        'Amazon CloudFront Developer Guide — Restricting access to Application Load Balancers: Recommends using the CloudFront managed prefix list in a security group.',
        'Amazon VPC User Guide — Managed prefix lists: The com.amazonaws.global.cloudfront.origin-facing prefix list is for security group rules to allow CloudFront traffic.',
        'Amazon EC2 User Guide — Security group rules: How to reference an AWS-managed prefix list as a source.',
      ],
    },

    // ═══════════════════════════════════════════════════════════════════════
    // Question 60 — SSM Session Manager + IAM Identity Center / OS Access
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: 'ed1-q60',
      type: 'single',
      prompt:
        "A company has applications that run in an organization in AWS Organizations. The company outsources operational support of the applications. The company needs to provide access for the external support engineers without compromising security. The external support engineers need access to the AWS Management Console. The external support engineers also need operating system access to the company's fleet of Amazon EC2 instances that run Amazon Linux in private subnets. Which solution will meet these requirements MOST securely?",
      options: [
        'Confirm that AWS Systems Manager Agent (SSM Agent) is installed on all instances. Assign an instance profile with the necessary policy to connect to Systems Manager. Use AWS IAM Identity Center to provide the external support engineers console access. Use Systems Manager Session Manager to assign the required permissions.',
        'Confirm that AWS Systems Manager Agent (SSM Agent) is installed on all instances. Assign an instance profile with the necessary policy to connect to Systems Manager. Use Systems Manager Session Manager to provide local IAM user credentials in each AWS account to the external support engineers for console access.',
        'Confirm that all instances have a security group that allows SSH access only from the external support engineers source IP address ranges. Provide local IAM user credentials in each AWS account to the external support engineers for console access. Provide each external support engineer an SSH key pair to log in to the application instances.',
        'Create a bastion host in a public subnet. Set up the bastion host security group to allow access from only the external engineers\' IP address ranges. Ensure that all instances have a security group that allows SSH access from the bastion host. Provide each external support engineer an SSH key pair to log in to the application instances. Provide local account IAM user credentials to the engineers for console access.',
      ],
      correctOptionIndex: 0,
      explanation:
        'AWS IAM Identity Center provides centralized, scalable console access without local IAM users. AWS Systems Manager Session Manager provides secure, auditable shell access to instances in private subnets without bastion hosts, SSH keys, or open inbound ports. Session activity can be logged to S3 or CloudWatch Logs for auditing.',
      incorrectOptionExplanations: {
        1: 'Providing local IAM user credentials in each account is not secure or scalable. It creates credential sprawl and makes central management difficult.',
        2: 'This requires opening inbound SSH ports and managing SSH key pairs, increasing the attack surface and adding significant key management overhead.',
        3: 'A bastion host is less secure and more complex than Session Manager. It still requires managing SSH keys and an additional EC2 instance.',
      },
      references: [
        'AWS IAM Identity Center User Guide: Recommended approach for workforce authentication across multiple AWS accounts.',
        'AWS Systems Manager User Guide — Session Manager: Provides secure, auditable instance management without opening inbound ports, managing SSH keys, or using bastion hosts.',
        'AWS IAM User Guide — Security best practices: Recommends using temporary credentials via federation instead of creating IAM users.',
      ],
    },

    // ═══════════════════════════════════════════════════════════════════════
    // Question 61 — S3 Object Lock Compliance Mode / WORM
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: 'ed1-q61',
      type: 'single',
      prompt:
        'A company must protect sensitive documents in Amazon S3 from deletion or modification for a fixed retention period to meet regulatory requirements. Which solution will meet these requirements?',
      options: [
        'Enable S3 Object Lock in governance mode.',
        'Enable S3 Object Lock in compliance mode.',
        'Enable S3 versioning with lifecycle deletion rules.',
        'Transition objects to S3 Glacier Flexible Retrieval.',
      ],
      correctOptionIndex: 1,
      explanation:
        'In compliance mode, a protected object version cannot be overwritten or deleted by any user, including the root user in the AWS account, for the duration of the retention period. This ensures immutability essential for satisfying strict regulatory compliance mandates.',
      incorrectOptionExplanations: {
        0: 'In governance mode, users with special IAM permissions can bypass retention settings, which may not be sufficient for strict regulatory compliance.',
        2: 'S3 versioning protects against accidental deletion but does not prevent intentional deletion by a user with sufficient permissions.',
        3: 'Transitioning objects to S3 Glacier is a cost savings strategy, not a primary mechanism for enforcing WORM compliance.',
      },
      references: [
        'Amazon S3 User Guide — Using S3 Object Lock: Provides WORM storage capability.',
        'Amazon S3 User Guide — S3 Object Lock retention modes: In compliance mode, no user including root can overwrite or delete a protected object version.',
      ],
    },

    // ═══════════════════════════════════════════════════════════════════════
    // Question 62 — Serverless Microservices / CloudFront + S3 + Lambda + RDS
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: 'ed1-q62',
      type: 'single',
      prompt:
        "A company has developed a non-production application that is composed of multiple microservices for each of the company's business units. A single development team maintains all the microservices. The current architecture uses a static web frontend and a Java-based backend that contains the application logic. The architecture also uses a MySQL database that the company hosts on an Amazon EC2 instance. The company needs to ensure that the application is secure and available globally. Which solution will meet these requirements with the LEAST operational overhead?",
      options: [
        'Use Amazon CloudFront and AWS Amplify to host the static web frontend. Refactor the microservices to use AWS Lambda functions that the microservices access by using Amazon API Gateway. Migrate the MySQL database to an Amazon EC2 Reserved Instance.',
        'Use Amazon CloudFront and Amazon S3 to host the static web frontend. Refactor the microservices to use AWS Lambda functions that the microservices access by using Amazon API Gateway. Migrate the MySQL database to Amazon RDS for MySQL.',
        'Use Amazon CloudFront and Amazon S3 to host the static web frontend. Refactor the microservices to use AWS Lambda functions that are in a target group behind a Network Load Balancer. Migrate the MySQL database to Amazon RDS for MySQL.',
        'Use Amazon S3 to host the static web frontend. Refactor the microservices to use AWS Lambda functions that are in a target group behind an Application Load Balancer. Migrate the MySQL database to an Amazon EC2 Reserved Instance.',
      ],
      correctOptionIndex: 1,
      explanation:
        'S3 + CloudFront is the standard approach for globally distributing static content with low latency and built-in DDoS protection. Lambda + API Gateway creates a serverless, scalable backend eliminating server management. Amazon RDS for MySQL offloads database administration tasks, directly addressing the requirement for minimal operational overhead.',
      incorrectOptionExplanations: {
        0: 'An Amazon EC2 Reserved Instance is a billing discount, not a managed service. It does not reduce the operational overhead of managing a database on EC2.',
        2: 'A Network Load Balancer operates at Layer 4 and cannot invoke AWS Lambda functions directly for an HTTP/S-based API. API Gateway is required.',
        3: 'S3 alone does not provide CloudFront\'s global content delivery. An EC2 Reserved Instance does not reduce operational overhead for the database.',
      },
      references: [
        'Amazon S3 & CloudFront for Static Websites: Standard approach for hosting static content globally.',
        'AWS Whitepaper — Serverless Architectures with AWS Lambda: S3 + CloudFront for frontend with API Gateway + Lambda for backend.',
        'Amazon RDS User Guide: Reduces operational overhead compared to managing databases on EC2.',
        'Amazon EC2 User Guide — Reserved Instances: A billing discount, not a managed service.',
      ],
    },

    // ═══════════════════════════════════════════════════════════════════════
    // Question 63 — Shield Advanced / ALB + CloudFront / DDoS Response Team
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: 'ed1-q63',
      type: 'single',
      prompt:
        'A company wants to protect AWS-hosted resources, including Application Load Balancers and CloudFront distributions. They need near real-time visibility into attacks and a dedicated AWS response team for DDoS events. Which AWS service meets these requirements?',
      options: [
        'AWS WAF',
        'AWS Shield Standard',
        'Amazon Macie',
        'AWS Shield Advanced',
      ],
      correctOptionIndex: 3,
      explanation:
        'AWS Shield Advanced provides near real-time visibility into attacks through advanced diagnostics and Amazon CloudWatch metrics. Subscribers get 24x7 access to the AWS Shield Response Team (SRT) for expert assistance in mitigating complex DDoS events. This service protects ALBs and CloudFront distributions.',
      incorrectOptionExplanations: {
        0: 'AWS WAF protects against common web exploits at Layer 7 but does not include a dedicated DDoS response team.',
        1: 'AWS Shield Standard offers baseline DDoS protection but lacks advanced visibility and access to the AWS Shield Response Team.',
        2: 'Amazon Macie is a data security service for discovering sensitive data in S3; it is not a DDoS protection service.',
      },
      references: [
        'AWS Shield Features Page: Shield Advanced includes 24x7 access to SRT and near real-time visibility with CloudWatch metrics.',
        'AWS Shield Developer Guide — The AWS Shield Response Team (SRT): SRT analyzes attacks and applies custom mitigations.',
        'AWS Shield Developer Guide — Getting started with AWS Shield Advanced: Describes attack visibility and reporting benefits.',
      ],
    },

    // ═══════════════════════════════════════════════════════════════════════
    // Question 64 — Secrets Manager BatchGetSecretValue / CloudFormation
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: 'ed1-q64',
      type: 'single',
      prompt:
        'A company is designing a new internal web application in the AWS Cloud. The new application must securely retrieve and store multiple employee usernames and passwords from an AWS managed service. Which solution will meet these requirements with the LEAST operational overhead?',
      options: [
        'Store the employee credentials in AWS Systems Manager Parameter Store. Use AWS CloudFormation and the BatchGetSecretValue API to retrieve usernames and passwords from Parameter Store.',
        'Store the employee credentials in AWS Secrets Manager. Use AWS CloudFormation and AWS Batch with the BatchGetSecretValue API to retrieve the usernames and passwords from Secrets Manager.',
        'Store the employee credentials in AWS Systems Manager Parameter Store. Use AWS CloudFormation and AWS Batch with the BatchGetSecretValue API to retrieve the usernames and passwords from Parameter Store.',
        'Store the employee credentials in AWS Secrets Manager. Use AWS CloudFormation and the BatchGetSecretValue API to retrieve the usernames and passwords from Secrets Manager.',
      ],
      correctOptionIndex: 3,
      explanation:
        'AWS Secrets Manager is purpose-built for securely storing and managing secrets like usernames and passwords with automatic rotation. The BatchGetSecretValue API is a specific Secrets Manager function for efficiently retrieving multiple secret values in a single request. CloudFormation provisions the secrets as part of IaC best practice.',
      incorrectOptionExplanations: {
        0: 'The BatchGetSecretValue API is part of AWS Secrets Manager, not AWS Systems Manager Parameter Store. This option incorrectly pairs the API with the wrong service.',
        1: 'AWS Batch is a service for running batch computing jobs, not for web application secret retrieval. It adds unnecessary complexity.',
        2: 'This option is incorrect for two reasons: it uses the wrong service (Parameter Store) for the BatchGetSecretValue API and unnecessarily includes AWS Batch.',
      },
      references: [
        'AWS Secrets Manager User Guide — What is AWS Secrets Manager?: Purpose-built for managing and retrieving secrets.',
        'AWS Secrets Manager API Reference — BatchGetSecretValue: Retrieves a batch of secret values in a single request.',
        'AWS Systems Manager User Guide — Comparing Secrets Manager and Parameter Store: Recommends Secrets Manager when rotation is required.',
        'AWS CloudFormation User Guide — AWS::SecretsManager::Secret: Declaring secrets in CloudFormation templates.',
      ],
    },

    // ═══════════════════════════════════════════════════════════════════════
    // Question 65 — Shield Advanced / NLB / DDoS Minimal Architecture Change
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: 'ed1-q65',
      type: 'single',
      prompt:
        'A company hosts a video streaming web application in a VPC. The company uses a Network Load Balancer (NLB) to handle TCP traffic for real-time data processing. There have been unauthorized attempts to access the application. The company wants to improve application security with minimal architectural change to prevent unauthorized attempts to access the application. Which solution will meet these requirements?',
      options: [
        'Implement a series of AWS WAF rules directly on the NLB to filter out unauthorized traffic.',
        'Recreate the NLB with a security group to allow only trusted IP addresses.',
        'Deploy a second NLB in parallel with the existing NLB configured with a strict IP address allow list.',
        'Use AWS Shield Advanced to provide enhanced DDoS protection and prevent unauthorized access attempts.',
      ],
      correctOptionIndex: 3,
      explanation:
        'AWS Shield Advanced is a managed threat protection service specifically designed to safeguard applications against DDoS attacks. It can be enabled on NLB resources (by protecting its associated Elastic IP address) with no architectural changes, directly addressing the security requirement while adhering to the minimal architectural modification constraint.',
      incorrectOptionExplanations: {
        0: 'AWS WAF operates at Layer 7 and cannot be directly integrated with a Network Load Balancer, which is a Layer 4 service.',
        1: 'Security groups cannot be directly associated with a Network Load Balancer. They are applied to the targets (e.g., EC2 instances) registered with the NLB.',
        2: 'Deploying a second, parallel NLB constitutes a significant architectural change, explicitly violating the requirement for minimal architectural impact.',
      },
      references: [
        'AWS Shield Documentation — AWS Shield Advanced: Provides DDoS protection for Elastic Load Balancing including NLBs.',
        'Elastic Load Balancing User Guide — Network Load Balancer: NLB functions at Layer 4; security groups cannot be associated with it.',
        'AWS WAF Developer Guide: WAF supports CloudFront, API Gateway, and Application Load Balancers — not NLBs.',
      ],
    },

  ],
};