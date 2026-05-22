import type { ExamDefinition } from './types';

export const examDumpSecurity196To260: ExamDefinition = {
    id: 'examDumpSecurity196To260',
    title: 'SAA-C03 Exam Dump — Security and Access Scenarios 196-260',
    description:
        'Mixed AWS Solutions Architect Associate exam-dump questions covering S3 lifecycle, security groups, VPN/Direct Connect, SSE-KMS, IAM policies, CloudFront, DynamoDB TTL, RDS Proxy, Route 53, and more — with detailed incorrect-option explanations and AWS documentation references.',
    durationSeconds: 7800,
    questions: [

        // ═══════════════════════════════════════════════════════════════════════
        // Question 196 — S3 Storage Classes / Non-Critical App Lifecycle
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed3-q196',
            type: 'single',
            prompt:
                'A company wants to migrate applications from its on-premises servers to AWS. As a first step, the company is modifying and migrating a non-critical application to a single Amazon EC2 instance. The application will store information in an Amazon S3 bucket. The company needs to follow security best practices when deploying the application on AWS. Which approach should the company take to allow the application to interact with Amazon S3?',
            options: [
                'Store the files in an Amazon S3 bucket. Use the S3 Glacier Instant Retrieval storage class. Create an S3 Lifecycle policy to transition the files to the S3 Glacier Deep Archive storage class after 1 year.',
                'Store the files in an Amazon S3 bucket. Use the S3 Standard storage class. Create an S3 Lifecycle policy to transition the files to the S3 Glacier Flexible Retrieval storage class after 1 year.',
                'Store the files on an Amazon Elastic Block Store (Amazon EBS) volume. Use Amazon Data Lifecycle Manager to create snapshots of the EBS volumes and to store those snapshots in Amazon S3.',
                'Store the files on an Amazon Elastic File System (Amazon EFS) mount. Configure EFS lifecycle management to transition the files to the EFS Standard-Infrequent Access (Standard-IA) storage class after 1 year.',
            ],
            correctOptionIndex: 0,
            explanation:
                'For a non-critical application, data is often accessed infrequently but may need to be retained for long periods. S3 Glacier Instant Retrieval is ideal for long-lived, rarely accessed data that still requires immediate retrieval. Transitioning to S3 Glacier Deep Archive after one year further minimizes costs for data that is almost never accessed again, aligning perfectly with a long-term retention strategy for non-critical information.',
            incorrectOptionExplanations: {
                1: 'S3 Standard is for frequently accessed data. Using it for a non-critical application\'s data is likely not the most cost-effective choice compared to an archival storage class.',
                2: 'This suggests storing files on an Amazon EBS volume first. The question explicitly states the application will store information in an Amazon S3 bucket, making EBS an incorrect primary storage choice.',
                3: 'This suggests using Amazon EFS, which is a file storage service. The requirement is for the application to use Amazon S3, which is an object storage service.',
            },
            references: [
                'Amazon S3 Storage Classes — S3 Glacier Instant Retrieval: For archiving data that is rarely accessed and requires milliseconds retrieval.',
                'Amazon S3 Storage Classes — S3 Glacier Deep Archive: Lowest-cost storage for long-term retention of data accessed perhaps once or twice a year.',
                'Amazon EC2 User Guide — Amazon EBS volumes: EBS provides block-level storage for EC2 instances, different from S3 object storage.',
                'Amazon EFS User Guide: EFS provides a managed network file system (NFS), different from the object storage model of S3.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 197 — Three-Tier Security Groups (Select THREE)
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed3-q197',
            type: 'multiple',
            prompt:
                'A solutions architect is designing a three-tier web application. The architecture consists of an internet-facing Application Load Balancer (ALB) and a web tier that is hosted on Amazon EC2 instances in private subnets. The application tier with the business logic runs on EC2 instances in private subnets. The database tier consists of Microsoft SQL Server that runs on EC2 instances in private subnets. Security is a high priority for the company. Which combination of security group configurations should the solutions architect use? (Select THREE.)',
            options: [
                'Configure the security group for the web tier to allow inbound HTTPS traffic from the security group for the ALB.',
                'Configure the security group for the web tier to allow outbound HTTPS traffic to 0.0.0.0/0.',
                'Configure the security group for the database tier to allow inbound Microsoft SQL Server traffic from the security group for the application tier.',
                'Configure the security group for the database tier to allow outbound HTTPS traffic and Microsoft SQL Server traffic to the security group for the web tier.',
                'Configure the security group for the application tier to allow inbound HTTPS traffic from the security group for the web tier.',
                'Configure the security group for the application tier to allow outbound HTTPS traffic and Microsoft SQL Server traffic to the security group for the web tier.',
            ],
            correctOptionIndexes: [0, 2, 4],
            explanation:
                'The correct configuration ensures each tier only accepts inbound traffic from the specific component that should communicate with it: (1) Web tier accepts HTTPS from the ALB security group. (2) Application tier accepts traffic from the web tier security group. (3) Database tier accepts Microsoft SQL Server traffic from the application tier security group. This implements the principle of least privilege using security group referencing.',
            incorrectOptionExplanations: {
                1: 'This rule is overly permissive. The web tier\'s primary outbound traffic is to the application tier, not the entire internet, violating the principle of least privilege.',
                3: 'This describes an incorrect traffic flow. The database tier responds to requests from the application tier; it does not initiate connections to the web tier.',
                5: 'This describes an incorrect traffic flow. The application tier responds to requests from the web tier; it does not initiate outbound connections to it.',
            },
            references: [
                'AWS VPC User Guide — "Security group rules": Traffic is allowed from network interfaces associated with the source security group for the specified protocol and port.',
                'AWS Well-Architected Framework — Security Pillar: Apply least privilege to network access using security groups to control traffic at the instance level.',
                'AWS Prescriptive Guidance — Set up a secure and scalable three-tier architecture on AWS: Explicitly details inbound rules for each tier referencing the tier above.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 198 — Site-to-Site VPN / Two VPCs / No Inter-VPC Traffic
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed3-q198',
            type: 'single',
            prompt:
                'A company is planning to connect a remote office to its AWS infrastructure. The office requires permanent and secure connectivity to AWS. The connection must provide secure access to resources in two VPCs. However, the VPCs must not be able to access each other. Which solution will meet these requirements?',
            options: [
                'Create two transit gateways. Set up one AWS Site-to-Site VPN connection from the remote office to each transit gateway. Connect one VPC to the transit gateway. Configure route table propagation to the appropriate transit gateway based on the destination VPC IP range.',
                'Set up one AWS Site-to-Site VPN connection from the remote office to each of the VPCs. Update the VPC route tables with static routes to the remote office resources.',
                'Set up one AWS Site-to-Site VPN connection from the remote office to one of the VPCs. Set up VPC peering between the two VPCs. Update the VPC route tables with static routes to the remote office and peered resources.',
                'Create a transit gateway. Set up an AWS Direct Connect gateway and one Direct Connect connection between the remote office and the Direct Connect gateway. Associate the transit gateway with the Direct Connect gateway. Configure a separate private virtual interface (VIF) for each VPC, and configure routing.',
            ],
            correctOptionIndex: 1,
            explanation:
                'This solution establishes two independent AWS Site-to-Site VPN connections, one from the remote office to each VPC. Each VPN connection terminates on a separate Virtual Private Gateway (VGW). This provides permanent and secure connectivity to both VPCs while keeping them completely isolated from each other since there is no network path established between them.',
            incorrectOptionExplanations: {
                0: 'Using two separate Transit Gateways for only two VPCs is overly complex and expensive. It is not a standard or cost-effective architecture.',
                2: 'This directly violates the requirement that VPCs must not access each other. VPC peering is specifically designed to enable network traffic between peered VPCs.',
                3: 'A Transit Gateway by default allows attached VPCs to communicate with each other. Additional complex configuration would be needed to enforce isolation, which is not mentioned.',
            },
            references: [
                'AWS Site-to-Site VPN User Guide — "What is AWS Site-to-Site VPN?": Creates a secure connection between a remote network and a single Amazon VPC via a virtual private gateway.',
                'AWS VPC Peering Guide — "What is VPC peering?": Enables routing traffic between two VPCs, directly contradicting the VPC isolation requirement.',
                'AWS Transit Gateway Documentation — "How Transit Gateways work": By default, attachments associated with the default route table can route packets to each other.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 199 — Interface VPC Endpoints / No Public IP / Private AWS Services
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed3-q199',
            type: 'single',
            prompt:
                'A company has a VPC with multiple private subnets that host multiple applications. The applications must not be accessible to the internet. However, the applications need to access multiple AWS services. The applications must not use public IP addresses to access the AWS services. Which solution will meet these requirements?',
            options: [
                'Configure interface VPC endpoints for the required AWS services. Route traffic from the private subnets through the interface VPC endpoints.',
                'Deploy a NAT gateway in each private subnet. Route traffic from the private subnets through the NAT gateways.',
                'Deploy internet gateways in each private subnet. Route traffic from the private subnets through the internet gateways.',
                'Set up an AWS Direct Connect connection between the private subnets. Route traffic from the private subnets through the Direct Connect connection.',
            ],
            correctOptionIndex: 0,
            explanation:
                'Interface VPC endpoints, powered by AWS PrivateLink, create an Elastic Network Interface (ENI) with a private IP address from your subnet. All traffic between your VPC and the service remains on the Amazon network, completely isolated from the public internet. Instances in the VPC do not require public IP addresses to communicate with the service.',
            incorrectOptionExplanations: {
                1: 'A NAT gateway allows instances in a private subnet to connect to AWS services, but the traffic traverses the public internet, violating the no-public-IP requirement.',
                2: 'An Internet Gateway is attached to a VPC to enable communication with the internet. Using it would make the subnets public, violating the core security requirement.',
                3: 'AWS Direct Connect is used to establish a dedicated private connection from an on-premises network to AWS, not for connecting resources within a VPC to AWS services.',
            },
            references: [
                'AWS VPC User Guide — "VPC endpoints": Enables privately connecting a VPC to supported AWS services without requiring an internet gateway, NAT device, VPN, or Direct Connect.',
                'AWS VPC User Guide — "Interface endpoints (AWS PrivateLink)": An interface endpoint is an ENI with a private IP address serving as an entry point for traffic destined to a supported service.',
                'AWS VPC User Guide — "NAT gateways": NAT gateways allow instances to connect to the internet or AWS services over public internet endpoints.',
                'AWS Direct Connect User Guide: For establishing dedicated network connections from on-premises to AWS, not for intra-VPC to service communication.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 200 — SSE-KMS / Bucket Policy / Audit / Granular Control
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed3-q200',
            type: 'single',
            prompt:
                'A company stores sensitive financial reports in an Amazon S3 bucket. To comply with auditing requirements, the company must encrypt the data at rest. Users must not have the ability to change the encryption method or remove encryption when the users upload data. The company must be able to audit all encryption and storage actions. Which solution will meet these requirements and provide the MOST granular control?',
            options: [
                'Enable default server-side encryption with Amazon S3 managed keys (SSE-S3) for the S3 bucket. Apply a bucket policy that denies any upload requests that do not include the x-amz-server-side-encryption header.',
                'Configure server-side encryption with AWS KMS (SSE-KMS) keys. Use an S3 bucket policy to reject any data that is not encrypted by the designated key.',
                'Use client-side encryption before uploading the reports. Store the encryption keys in AWS Secrets Manager.',
                'Enable default server-side encryption with Amazon S3 managed keys (SSE-S3). Use AWS Identity and Access Management (IAM) to prevent users from changing S3 bucket settings.',
            ],
            correctOptionIndex: 1,
            explanation:
                'SSE-KMS provides centralized and auditable encryption. AWS KMS integrates with AWS CloudTrail to log every use of the encryption key. A bucket policy can enforce that all uploaded objects are encrypted with a specific KMS key by evaluating the s3:x-amz-server-side-encryption-aws-kms-key-id condition, preventing users from changing or removing encryption. KMS key policies offer the most granular control over key usage.',
            incorrectOptionExplanations: {
                0: 'SSE-S3 does not provide an audit trail of key usage or the granular control over key policies that AWS KMS offers, failing the audit and granular control requirements.',
                2: 'Client-side encryption cannot be centrally enforced using S3 bucket policies, placing the burden of enforcement on the client application.',
                3: 'Default encryption with SSE-S3 does not prevent a user with upload permissions from specifying a different encryption method or no encryption during the upload.',
            },
            references: [
                'AWS KMS Developer Guide — "Key policies in AWS KMS": Key policies are the primary access control mechanism, enabling granular permissions for KMS keys.',
                'AWS KMS Developer Guide — "Logging AWS KMS API calls with AWS CloudTrail": All actions taken with KMS keys are recorded as CloudTrail events, providing a full audit trail.',
                'Amazon S3 User Guide — "Protecting data using SSE-KMS": AWS KMS provides an audit trail showing when and by whom the key was used.',
                'Amazon S3 User Guide — "Policy examples for AWS KMS keys": The s3:x-amz-server-side-encryption-aws-kms-key-id condition key enforces encryption with a specific KMS key.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 201 — IAM Deny + NotAction / Restrict to RDS Only
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed3-q201',
            type: 'single',
            prompt:
                'A company needs to ensure that an IAM group that contains database administrators can perform operations only within Amazon RDS. The company must ensure that the members of the IAM group cannot access any other AWS services. Which solution will meet these requirements?',
            options: [
                'Create an IAM policy that includes a statement that has the Effect "Allow" and the Action "rds:*". Attach the IAM policy to the IAM group.',
                'Create an IAM policy that includes two statements. Configure the first statement to have the Effect "Allow" and the Action "rds:*". Configure the second statement to have the Effect "Deny" and the Action "*:*". Attach the IAM policy to the IAM group.',
                'Create an IAM policy that includes a statement that has the Effect "Deny" and the NotAction "rds:*". Attach the IAM policy to the IAM group.',
                'Create an IAM policy with a statement that includes the Effect "Allow" and the Action "rds:*". Include a permissions boundary that has the Effect "Allow" and the Action "rds:*". Attach the IAM policy to the IAM group.',
            ],
            correctOptionIndex: 2,
            explanation:
                'Using an explicit Deny with the NotAction element, this policy explicitly denies all actions for all AWS services except rds:*. Since an explicit Deny always overrides any Allow, this ensures members cannot access any service other than Amazon RDS regardless of other policies attached. An additional Allow policy for rds:* would be needed to grant the actual RDS permissions.',
            incorrectOptionExplanations: {
                0: 'This policy only grants Allow permissions for RDS but does not prevent the user from gaining permissions to other services through other policies attached to the user or group.',
                1: 'An explicit Deny for *:* (all actions) would override the Allow for rds:*, resulting in the users being denied access to all AWS services including RDS itself.',
                3: 'A permissions boundary sets the maximum permissions an entity can have but does not grant permissions itself. It would not prevent access to other services if another policy granted it.',
            },
            references: [
                'AWS IAM Documentation — "IAM JSON policy elements: NotAction": NotAction with the Deny effect creates exceptions to a denial, denying all actions except those explicitly listed.',
                'AWS IAM Documentation — "Policy evaluation logic": An explicit deny in any applicable policy always overrides any allow.',
                'AWS IAM Documentation — "Permissions boundaries for IAM entities": Permissions boundaries set maximum permissions but do not grant permissions on their own.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 202 — Direct Connect + Interface S3 Endpoint / On-Premises to S3 (Multi-select)
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed3-q202',
            type: 'multiple',
            prompt:
                'A company wants to send data from its on-premises systems to Amazon S3 buckets. The company created the S3 buckets in three different accounts. The company must send the data privately without traveling across the internet. The company has no existing dedicated connectivity to AWS. Which combination of steps should a solutions architect take to meet these requirements? (Select TWO.)',
            options: [
                'Establish a networking account in the AWS Cloud. Create a private VPC in the networking account. Set up an AWS Direct Connect connection with a private VIF between the on-premises environment and the private VPC.',
                'Establish a networking account in the AWS Cloud. Create a private VPC in the networking account. Set up an AWS Direct Connect connection with a public VIF between the on-premises environment and the private VPC.',
                'Create an Amazon S3 interface endpoint in the networking account.',
                'Create an Amazon S3 gateway endpoint in the networking account.',
                'Establish a networking account in the AWS Cloud. Create a private VPC in the networking account. Peer VPCs from the accounts that host the S3 buckets with the VPC in the network account.',
            ],
            correctOptionIndexes: [0, 2],
            explanation:
                'AWS Direct Connect with a private VIF establishes a private, dedicated network connection from the on-premises environment to a VPC. An Amazon S3 interface endpoint (powered by AWS PrivateLink) in the VPC provides an ENI with a private IP address, allowing on-premises systems to route traffic to the S3 service through the Direct Connect connection to the private IP, ensuring all traffic remains on the private network.',
            incorrectOptionExplanations: {
                1: 'A public VIF is used to access AWS public service endpoints over the AWS backbone, not to connect privately to a VPC. A private VIF is required.',
                3: 'An S3 gateway endpoint cannot be accessed from on-premises networks over Direct Connect or a VPN. It only allows resources within the VPC to access S3 privately.',
                4: 'VPC peering is used to connect VPCs to each other. Amazon S3 is a regional service that does not reside in a VPC, so peering is not necessary for accessing S3 buckets.',
            },
            references: [
                'AWS VPC User Guide — "Access an AWS service using an interface VPC endpoint": Interface endpoints can be accessed from on-premises networks through AWS Direct Connect or AWS VPN.',
                'AWS Direct Connect User Guide — "AWS Direct Connect virtual interfaces": Private virtual interface provides access to an Amazon VPC using private IP addresses.',
                'AWS VPC User Guide — "Gateway VPC endpoints" Considerations: Gateway endpoints cannot be accessed from on-premises networks; interface endpoints must be used instead.',
                'AWS Whitepaper — "Hybrid Connectivity": Describes using Direct Connect with a private VIF plus PrivateLink interface endpoints for private S3 access from on-premises.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 203 — NAT Gateway / Private Subnet / External API Access
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed3-q203',
            type: 'single',
            prompt:
                'A company has deployed a multi-tier web application to support a website. The architecture includes an Application Load Balancer (ALB) in public subnets, two Amazon Elastic Container Service (Amazon ECS) tasks in the public subnets, and a PostgreSQL cluster that runs on Amazon EC2 instances in private subnets. The EC2 instances that host the PostgreSQL database run shell scripts that need to access an external API to retrieve product information. A solutions architect must design a solution to allow the EC2 instances to securely communicate with the external API without increasing operational overhead. Which solution will meet these requirements?',
            options: [
                'Assign public IP addresses to the EC2 instances in the private subnets. Configure security groups to allow outbound internet access.',
                'Configure a NAT gateway in the public subnets. Update the route table for the private subnets to route traffic to the NAT gateway.',
                'Configure a VPC peering connection between the private subnets and a public subnet that has access to the external API.',
                'Deploy an interface VPC endpoint to securely connect to the external API.',
            ],
            correctOptionIndex: 1,
            explanation:
                'A NAT gateway in a public subnet allows EC2 instances in a private subnet to initiate outbound connections to the internet (including external APIs) while remaining completely private and inaccessible from the internet. As a managed service, a NAT gateway handles scaling and availability automatically, minimizing operational overhead.',
            incorrectOptionExplanations: {
                0: 'Assigning public IPs to database instances in a private subnet is a security risk and technically flawed, as a private subnet lacks a route to an Internet Gateway.',
                2: 'VPC peering connects two different VPCs. It cannot be used to provide internet access to a subnet within the same VPC.',
                3: 'A VPC endpoint provides private connectivity to specific AWS services or AWS PrivateLink services, not to general external APIs on the public internet.',
            },
            references: [
                'AWS VPC User Guide — "NAT gateways": Enables instances in a private subnet to connect to the internet while preventing internet-initiated connections.',
                'AWS VPC User Guide — "VPCs and subnets - Subnet routing": If a subnet\'s traffic is routed to a NAT gateway, the instances can communicate with the internet.',
                'AWS VPC User Guide — "VPC endpoints": Provides private connectivity to supported AWS services via AWS PrivateLink, not general internet APIs.',
                'AWS VPC Peering Guide — "What is VPC peering?": For inter-VPC communication, not for providing internet access.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 204 — IAM Role for EC2 / S3 Access / Best Practices
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed3-q204',
            type: 'single',
            prompt:
                'A company runs several applications on Amazon EC2 instances. The company stores configuration files in an Amazon S3 bucket. A solutions architect must provide the company\'s applications with access to the configuration files. The solutions architect must follow AWS best practices for security. Which solution will meet these requirements?',
            options: [
                'Use the AWS account root user access keys.',
                'Use the AWS access key ID and the EC2 secret access key.',
                'Use an IAM role to grant the necessary permissions to the applications.',
                'Activate multi-factor authentication (MFA) and versioning on the S3 bucket.',
            ],
            correctOptionIndex: 2,
            explanation:
                'The AWS best practice for granting applications on EC2 instances access to other AWS resources is to use an IAM role. An IAM role provides temporary security credentials automatically rotated by AWS, eliminating the need to store long-lived credentials on the instance. This also adheres to the principle of least privilege.',
            incorrectOptionExplanations: {
                0: 'Using the AWS account root user access keys is a severe security anti-pattern. These keys provide unrestricted access and should never be used for applications.',
                1: 'Storing an IAM user\'s long-lived access key ID and secret access key on an instance is a security risk. If the instance is compromised, these credentials can be stolen.',
                3: 'Activating MFA and versioning on the S3 bucket are data protection features, not access control mechanisms for an application. They do not grant the EC2 instance permission to read files.',
            },
            references: [
                'AWS IAM User Guide — "IAM roles for Amazon EC2": Strongly recommends using IAM roles; they provide temporary credentials without managing long-term access keys.',
                'AWS Whitepaper — "AWS Security Best Practices": Do not use root user access keys; use temporary security credentials (IAM roles) for programmatic access.',
                'AWS Well-Architected Framework — Security Pillar: Require workloads to use temporary credentials and authenticate with an identity provider instead of long-term credentials.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 205 — SSE-KMS / CloudTrail Audit Trail / S3 Encryption
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed3-q205',
            type: 'single',
            prompt:
                'A solutions architect is storing sensitive data generated by an application in Amazon S3. The solutions architect wants to encrypt the data at rest. A company policy requires an audit trail of when the AWS KMS key was used and by whom. Which encryption option will meet these requirements?',
            options: [
                'Server-side encryption with Amazon S3 managed keys (SSE-S3)',
                'Server-side encryption with AWS KMS managed keys (SSE-KMS)',
                'Server-side encryption with customer-provided keys (SSE-C)',
                'Server-side encryption with self-managed keys',
            ],
            correctOptionIndex: 1,
            explanation:
                'SSE-KMS is the only option that meets both criteria: encryption at rest and a detailed audit trail. AWS KMS integrates with AWS CloudTrail to log every API call made to KMS, including requests from Amazon S3 for encryption or decryption. These CloudTrail logs capture the user identity, time of use, and the specific key involved.',
            incorrectOptionExplanations: {
                0: 'SSE-S3 provides encryption but does not provide a detailed audit trail of specific key usage, as S3 manages the entire key lifecycle.',
                2: 'With SSE-C, you manage the keys. AWS does not store them and cannot provide an audit trail of their usage; the responsibility for auditing lies with the customer.',
                3: 'Self-managed keys (client-side encryption) means AWS has no visibility into the key or its usage before the encrypted object is uploaded, so it cannot provide the required audit trail.',
            },
            references: [
                'Amazon S3 User Guide — "Protecting data using SSE-KMS": AWS KMS provides an audit trail showing when your KMS key was used and by whom.',
                'AWS KMS Developer Guide — "Logging AWS KMS API calls with AWS CloudTrail": CloudTrail log entries for KMS include the userIdentity element with information about who made the request.',
                'Amazon S3 User Guide — "Protecting data using server-side encryption" comparison: Lists "Audit trail of key usage" as a key feature of SSE-KMS not available for SSE-S3 or SSE-C.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 206 — S3 Object Lock Legal Hold / Versioning / Indefinite WORM
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed3-q206',
            type: 'single',
            prompt:
                'A company is moving data from an on-premises data center to the AWS Cloud. The company must store all its data in an Amazon S3 bucket. To comply with regulations, the company must also ensure that the data will be protected against overwriting indefinitely. Which solution will ensure that the data in the S3 bucket cannot be overwritten?',
            options: [
                'Enable versioning for the S3 bucket. Use server-side encryption with Amazon S3 managed keys (SSE-S3) to protect the data.',
                'Disable versioning for the S3 bucket. Configure S3 Object Lock for the S3 bucket with a retention period of 1 year.',
                'Enable versioning for the S3 bucket. Configure S3 Object Lock for the S3 bucket with a legal hold.',
                'Configure S3 Storage Lens for the S3 bucket. Use server-side encryption with customer-provided keys (SSE-C) to protect the data.',
            ],
            correctOptionIndex: 2,
            explanation:
                'S3 Object Lock with a legal hold prevents an object version from being overwritten or deleted indefinitely — it has no expiration date and remains in effect until explicitly removed. Enabling versioning is a prerequisite for using S3 Object Lock. Together they fulfill the "indefinitely" protection requirement for regulatory compliance.',
            incorrectOptionExplanations: {
                0: 'Versioning alone does not prevent a user with sufficient permissions from deleting all object versions. SSE-S3 protects data at rest, not against modification or deletion.',
                1: 'S3 Object Lock cannot be enabled on a bucket unless versioning is also enabled, making this option technically invalid. A 1-year retention period also does not meet the "indefinitely" requirement.',
                3: 'S3 Storage Lens is an analytics and monitoring tool with no data protection capabilities. SSE-C protects data at rest but does not prevent overwrites or deletions.',
            },
            references: [
                'Amazon S3 Developer Guide — "Using S3 Object Lock": Versioning must be enabled to configure S3 Object Lock.',
                'Amazon S3 Developer Guide — "S3 Object Lock legal holds": A legal hold has no expiration date; it remains in place until explicitly removed.',
                'Amazon S3 Developer Guide — "Using versioning in S3 buckets": Versioning alone is not a WORM compliance feature; intentional deletion of all versions is still possible.',
                'Amazon S3 Developer Guide — "Protecting data using server-side encryption": SSE options encrypt data at rest but do not control object mutability.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 207 — CloudFront Geographic Restrictions / Geo-Blocking
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed3-q207',
            type: 'single',
            prompt:
                'A company uses an Amazon CloudFront distribution to serve thousands of media files to users. The CloudFront distribution uses a private Amazon S3 bucket as an origin. A solutions architect must prevent users in specific countries from accessing the company\'s files. Which solution will meet these requirements in the MOST operationally-efficient way?',
            options: [
                'Require users to access the files by using CloudFront signed URLs.',
                'Configure geographic restrictions in CloudFront.',
                'Require users to access the files by using CloudFront signed cookies.',
                'Configure an origin access control (OAC) between CloudFront and the S3 bucket.',
            ],
            correctOptionIndex: 1,
            explanation:
                'Amazon CloudFront has a built-in geographic restrictions (geo-blocking) feature that allows you to create an allowlist or blocklist of countries where users can or cannot access your content. This is a simple configuration change within the CloudFront distribution settings, making it the most direct and operationally efficient method.',
            incorrectOptionExplanations: {
                0: 'Signed URLs provide time-limited, private access to individual files for specific users, not for blocking entire geographic regions.',
                2: 'Signed cookies provide access to multiple restricted files, not for implementing broad geographic blocking.',
                3: 'Origin access control (OAC) secures the connection between CloudFront and the S3 origin, ensuring users cannot bypass CloudFront to access S3 directly. It does not filter end-user requests by geographic location.',
            },
            references: [
                'AWS CloudFront Developer Guide — "Restricting the geographic distribution of your content": The geographic restrictions feature prevents users in specific geographic locations from accessing content.',
                'AWS CloudFront Developer Guide — "Choosing between signed URLs and signed cookies": Signed URLs and cookies control who can access content on a per-user basis, not based on geographic location.',
                'AWS CloudFront Developer Guide — "Restricting access to an Amazon S3 origin": OAC\'s purpose is origin security, not end-user geo-filtering.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 208 — IAM Identity Center / Federation / Multi-Region / MFA
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed3-q208',
            type: 'single',
            prompt:
                'A multinational company operates in multiple AWS Regions. The company must ensure that its developers and administrators have secure, role-based access to AWS resources. The roles must be specific to each user\'s geographic location and job responsibilities. The company wants to implement a solution to ensure that each team can access only resources within the team\'s Region. The company wants to use its existing directory service to manage user access. The existing directory service organizes users into roles based on location. The system must be capable of integrating seamlessly with multi-factor authentication (MFA). Which solution will meet these requirements?',
            options: [
                'Use AWS Security Token Service (AWS STS) to generate temporary access tokens. Integrate STS with the directory service. Assign Region-specific roles.',
                'Configure AWS IAM Identity Center with federated access. Integrate IAM Identity Center with the directory service to set up Region-specific IAM roles.',
                'Create IAM managed policies that restrict access by location. Apply policies based on group membership in the directory.',
                'Use custom Lambda functions to dynamically assign IAM policies based on login location and job function.',
            ],
            correctOptionIndex: 1,
            explanation:
                'AWS IAM Identity Center integrates directly with existing directory services and supports federation. Administrators can map groups from the external directory to permission sets with Region-specific IAM policies using the aws:RequestedRegion condition key. IAM Identity Center also seamlessly supports MFA, either within the service or at the identity provider level.',
            incorrectOptionExplanations: {
                0: 'While federation uses AWS STS, IAM Identity Center is the managed service that orchestrates this process, making it the correct solution to implement.',
                2: 'This option is incomplete. It describes the policies needed but omits the crucial federation mechanism required to connect the directory service to IAM.',
                3: 'Building and maintaining Lambda functions for identity management is not a best practice when a dedicated managed service like IAM Identity Center exists.',
            },
            references: [
                'AWS IAM Identity Center User Guide — "What is AWS IAM Identity Center?": Helps securely create or connect workforce identities and manage access centrally; connects to existing identity sources.',
                'AWS IAM Identity Center User Guide — "Permission sets": A permission set is used to create corresponding IAM roles in each AWS account.',
                'AWS IAM User Guide — "AWS global condition context keys": The aws:RequestedRegion key can be used to check the AWS Region specified in the request.',
                'AWS IAM Identity Center User Guide — "Multi-factor authentication": Supports MFA directly or through an external identity provider.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 209 — AWS STS Temporary Credentials / Contractors
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed3-q209',
            type: 'single',
            prompt:
                'A company needs to provide a team of contractors with temporary access to the company\'s AWS resources for a short-term project. The contractors need different levels of access to AWS services. The company needs to revoke permissions for all the contractors when the project is finished. Which solution will meet these requirements with the LEAST operational overhead?',
            options: [
                'Use AWS IAM to create a user account for each contractor. Attach policies that define access levels for the contractors to the user accounts. Manually deactivate the accounts when the project is finished.',
                'Use AWS Security Token Service (AWS STS) to generate temporary credentials for the contractors. Provide the contractors access based on predefined roles. Set the access to automatically expire when the project is finished.',
                'Configure AWS Config rules to monitor the contractors\' access patterns. Use AWS Config rules to automatically revoke permissions that are not in use or that are too permissive.',
                'Use AWS CloudTrail and custom Amazon EventBridge triggers to audit the contractors\' actions. Adjust the permissions for each contractor based on activity logs.',
            ],
            correctOptionIndex: 1,
            explanation:
                'Using AWS STS in conjunction with IAM roles allows contractors to assume roles and receive temporary security credentials with a predefined expiration time. Credentials automatically become invalid upon expiration, automating the access revocation process with the least operational overhead. This avoids security risks and manual effort associated with long-lived IAM user credentials.',
            incorrectOptionExplanations: {
                0: 'Creating IAM users generates long-term credentials and requires manual deactivation, increasing operational overhead and the risk of forgotten active accounts.',
                2: 'AWS Config monitors and evaluates resource configurations for compliance, not for granting or managing user access credentials.',
                3: 'CloudTrail and EventBridge are for auditing API activity and triggering automated responses, not for proactively provisioning temporary access.',
            },
            references: [
                'AWS IAM User Guide — "Roles terms and concepts": An IAM role provides temporary security credentials for a role session without standard long-term credentials.',
                'AWS STS User Guide — "Temporary security credentials in IAM": STS creates short-term credentials that you don\'t have to rotate or worry about when no longer needed.',
                'AWS IAM User Guide — "Security best practices in IAM": For temporary access scenarios, recommends IAM roles over creating IAM users.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 210 — NACL Deny Rules / Application Isolation (duplicate topic)
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed3-q210',
            type: 'single',
            prompt:
                'A company runs multiple applications on Amazon EC2 instances in a VPC. Application A runs in a private subnet that has a custom route table and network ACL. Application B runs in a second private subnet in the same VPC. The company needs to prevent Application A from sending traffic to Application B. Which solution will meet this requirement?',
            options: [
                'Add a deny outbound rule to a security group that is associated with Application B. Configure the rule to prevent Application B from sending traffic to Application A.',
                'Add a deny outbound rule to a security group that is associated with Application A. Configure the rule to prevent Application A from sending traffic to Application B.',
                'Add a deny outbound rule to the custom network ACL for the Application B subnet. Configure the rule to prevent Application B from sending traffic to IP addresses that are associated with the Application A subnet.',
                'Add a deny outbound rule to the custom network ACL for the Application A subnet. Configure the rule to prevent Application A from sending traffic to IP addresses that are associated with the Application B subnet.',
            ],
            correctOptionIndex: 3,
            explanation:
                'Network ACLs are stateless firewalls that operate at the subnet level and support explicit deny rules. By adding an outbound deny rule to the NACL associated with Application A\'s subnet with the destination as Application B\'s CIDR block, all traffic from A to B is blocked before it leaves the source subnet.',
            incorrectOptionExplanations: {
                0: 'Security groups do not support explicit deny rules. Furthermore, an outbound rule on Application B\'s security group would not block inbound traffic.',
                1: 'Security groups are stateful firewalls at the instance level and do not support explicit deny rules; they only support allow rules.',
                2: 'An outbound rule on Application B\'s subnet NACL controls traffic leaving that subnet, not traffic entering it from Application A\'s subnet.',
            },
            references: [
                'AWS VPC User Guide — "Control traffic to subnets using network ACLs": NACLs act as a firewall for controlling traffic in and out of subnets; rules can ALLOW or DENY.',
                'AWS VPC User Guide — "Control traffic to resources using security groups": Security group rules are always permissive; you can\'t create rules that deny access.',
                'AWS VPC User Guide — "Compare security groups and network ACLs": Security groups support allow rules only; NACLs support allow and deny rules.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 211 — DynamoDB TTL / PII Auto-Deletion / Guest Checkout
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed3-q211',
            type: 'single',
            prompt:
                'An ecommerce company has an application that collects order-related information from customers. The company uses one Amazon DynamoDB table to store customer home addresses, phone numbers, and email addresses. Customers can check out without creating an account. The application copies the customer information to a second DynamoDB table if a customer does create an account. The company requires a solution to delete personally identifiable information (PII) for customers who did not create an account within 28 days. Which solution will meet these requirements with the LEAST operational overhead?',
            options: [
                'Create an AWS Lambda function to delete items from the first DynamoDB table that have a delivery date more than 28 days in the past. Use a scheduled Amazon EventBridge rule to run the Lambda function every day.',
                'Update the application to store PII in an Amazon S3 bucket. Create an S3 Lifecycle rule to expire the objects after 28 days. Move the data to DynamoDB when a user creates an account.',
                'Launch an Amazon EC2 instance. Configure a daily cron job to run on the instance. Configure the cron job to use AWS CLI commands to delete items from DynamoDB.',
                'Use a createdAt timestamp to set TTL for data in the first DynamoDB table to 28 days.',
            ],
            correctOptionIndex: 3,
            explanation:
                'Amazon DynamoDB Time To Live (TTL) is a fully managed, no-cost feature that automatically deletes expired items in the background without consuming write capacity. By setting a TTL attribute to 28 days in the future upon item creation, DynamoDB automatically purges the data for guest checkouts without requiring custom code, servers, or scheduled tasks.',
            incorrectOptionExplanations: {
                0: 'This solution requires writing, deploying, and maintaining a Lambda function, which introduces more operational overhead than using the built-in DynamoDB TTL feature.',
                1: 'This unnecessarily complicates the architecture by introducing Amazon S3 and requiring logic to move data between services, increasing both development effort and operational complexity.',
                2: 'This option has the highest operational overhead, requiring provisioning, managing, patching, and securing an Amazon EC2 instance.',
            },
            references: [
                'Amazon DynamoDB Developer Guide — "Time To Live": DynamoDB TTL automatically deletes expired items with no extra cost and no write throughput consumption.',
                'AWS Well-Architected Framework — Operational Excellence Pillar: Using managed services reduces the operational burden compared to managing custom solutions.',
                'Amazon DynamoDB Developer Guide — "How it works: DynamoDB TTL": The TTL attribute must be a Number data type with a Unix epoch time format timestamp.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 212 — Gateway VPC Endpoint for DynamoDB / Lambda Private Subnet
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed3-q212',
            type: 'single',
            prompt:
                'A company uses AWS Lambda functions in a private subnet in a VPC to run application logic. The Lambda functions must not have access to the public internet. Additionally, all data communication must remain within the private network. As part of a new requirement, the application logic needs access to an Amazon DynamoDB table. What is the MOST secure way to meet this new requirement?',
            options: [
                'Provision the DynamoDB table inside the same VPC that contains the Lambda functions.',
                'Create a gateway VPC endpoint for DynamoDB to provide access to the table.',
                'Use a network ACL to only allow access to the DynamoDB table from the VPC.',
                'Use a security group to only allow access to the DynamoDB table from the VPC.',
            ],
            correctOptionIndex: 1,
            explanation:
                'A gateway VPC endpoint for DynamoDB creates a private connection by adding a route in the VPC\'s route table for traffic destined for DynamoDB. This ensures that requests from the Lambda function to DynamoDB are routed through the AWS private network and do not traverse the public internet.',
            incorrectOptionExplanations: {
                0: 'Amazon DynamoDB is a regional AWS service that operates outside of any customer VPC. It is not possible to provision a DynamoDB table inside a VPC.',
                2: 'A network ACL is a stateless firewall for subnets. It can permit or deny traffic but cannot create the private network path needed to reach DynamoDB without internet access.',
                3: 'A security group is a stateful firewall for resources like Lambda ENIs. It controls traffic but does not establish the private connectivity to DynamoDB, which is the primary requirement.',
            },
            references: [
                'AWS VPC User Guide — "Gateway endpoints": Supports Amazon S3 and DynamoDB; traffic between VPC and service stays on the Amazon network.',
                'AWS Lambda Developer Guide — "Configuring VPC access": To access AWS services without internet access, configure a VPC endpoint.',
                'Amazon DynamoDB Developer Guide — "VPC Endpoints for Amazon DynamoDB": Allows VPC resources to access DynamoDB tables without traversing the internet.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 213 — Direct Connect Private VIF + S3 Interface Endpoint / On-Prem to Multi-Account S3 (Multi-select)
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed3-q213',
            type: 'multiple',
            prompt:
                'A company wants to send data from its on-premises systems to Amazon S3 buckets. The company created the S3 buckets in three different accounts. The company must send the data privately without the data traveling across the internet. The company has no existing dedicated connectivity to AWS. Which combination of steps should a solutions architect take to meet these requirements? (Select TWO.)',
            options: [
                'Establish a networking account in the AWS Cloud. Create a private VPC in the networking account. Set up an AWS Direct Connect connection with a private VIF between the on-premises environment and the private VPC.',
                'Establish a networking account in the AWS Cloud. Create a private VPC in the networking account. Set up an AWS Direct Connect connection with a public VIF between the on-premises environment and the private VPC.',
                'Create an Amazon S3 interface endpoint in the networking account.',
                'Create an Amazon S3 gateway endpoint in the networking account.',
                'Establish a networking account in the AWS Cloud. Create a private VPC in the networking account. Peer VPCs from the accounts that host the S3 buckets with the VPC in the network account.',
            ],
            correctOptionIndexes: [0, 2],
            explanation:
                'AWS Direct Connect with a private VIF allows a private, dedicated network connection from the on-premises environment to a VPC. An Amazon S3 interface endpoint in that VPC provides an ENI with a private IP address, allowing on-premises systems to route traffic to S3 through the Direct Connect connection while keeping all traffic on the private network.',
            incorrectOptionExplanations: {
                1: 'A public VIF accesses AWS public service endpoints over the AWS backbone but does not connect privately to a VPC. A private VIF is required.',
                3: 'An S3 gateway endpoint can only be accessed by resources within the VPC, not from on-premises networks over Direct Connect.',
                4: 'VPC peering connects VPCs to each other. Amazon S3 does not reside in a VPC, so peering is not relevant for accessing S3 buckets from on-premises.',
            },
            references: [
                'AWS VPC User Guide — "Access an AWS service using an interface VPC endpoint": Interface endpoints can be accessed from on-premises networks through AWS Direct Connect or AWS VPN.',
                'AWS Direct Connect User Guide — "AWS Direct Connect virtual interfaces": Private virtual interface provides access to an Amazon VPC using private IP addresses.',
                'AWS VPC User Guide — "Gateway VPC endpoints" Considerations: Gateway endpoints cannot be accessed from on-premises networks; use interface endpoints instead.',
                'AWS Whitepaper — "Building a Scalable and Secure Multi-VPC AWS Network Infrastructure": Describes using a dedicated networking account with VPC endpoints for centralized private connectivity.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 214 — Client-Side Encryption / Encrypt Before Sending to S3
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed3-q214',
            type: 'single',
            prompt:
                'A company plans to store sensitive user data on Amazon S3. Internal security compliance requirements mandate encryption of data before sending it to Amazon S3. What should a solutions architect recommend to satisfy these requirements?',
            options: [
                'Server-side encryption with customer-provided encryption keys',
                'Client-side encryption with Amazon S3 managed encryption keys',
                'Server-side encryption with keys stored in AWS Key Management Service (AWS KMS)',
                'Client-side encryption with a key stored in AWS Key Management Service (AWS KMS)',
            ],
            correctOptionIndex: 3,
            explanation:
                'The core requirement is to encrypt data before sending it to Amazon S3 — this is client-side encryption. The client application encrypts the data objects first and then uploads the already-encrypted objects. AWS KMS provides a secure and managed way to handle the encryption keys required for this client-side encryption process, aligning with best practices for key management.',
            incorrectOptionExplanations: {
                0: 'Server-side encryption with customer-provided keys (SSE-C) is server-side encryption. Encryption occurs after the data is received by Amazon S3, not before, violating the stated requirement.',
                1: 'S3-managed keys are used exclusively for server-side encryption by AWS. They cannot be used for client-side encryption where the client performs the encryption.',
                2: 'SSE-KMS is server-side encryption. While it uses KMS, the encryption is performed by the S3 service upon receipt of the data, not before it is sent.',
            },
            references: [
                'AWS S3 Developer Guide — "Protecting data using encryption - Client-Side Encryption": Client-side encryption is the act of encrypting data before sending it to Amazon S3; supports using a CMK stored in AWS KMS.',
                'AWS S3 Developer Guide — "Protecting data using encryption - Server-Side Encryption": Server-side encryption is the encryption of data at its destination by the service that receives it.',
                'AWS KMS Developer Guide — "How AWS KMS works": The AWS Encryption SDK uses KMS CMKs for client-side encryption.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 215 — CloudFront + ACM SSL/TLS / S3 Static Website HTTPS (Multi-select)
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed3-q215',
            type: 'multiple',
            prompt:
                'A solutions architect is creating a website that will be hosted from an Amazon S3 bucket. The website must support secure browser connections (HTTPS). Which combination of actions must the solutions architect take to meet this requirement? (Select TWO.)',
            options: [
                'Create an Elastic Load Balancing (ELB) load balancer. Configure the load balancer to direct traffic to the S3 bucket.',
                'Create an Amazon CloudFront distribution. Set the S3 bucket as an origin.',
                'Configure the Elastic Load Balancing (ELB) load balancer with an SSL/TLS certificate.',
                'Configure the Amazon CloudFront distribution with an SSL/TLS certificate.',
                'Configure the S3 bucket with an SSL/TLS certificate.',
            ],
            correctOptionIndexes: [1, 3],
            explanation:
                'Amazon S3 static website endpoints do not natively support HTTPS with a custom domain. The standard architecture is to use Amazon CloudFront as the CDN with the S3 bucket as an origin, then configure the CloudFront distribution with an SSL/TLS certificate from ACM to serve content over HTTPS.',
            incorrectOptionExplanations: {
                0: 'An Elastic Load Balancer is not the primary or most cost-effective service for fronting an S3 static website; CloudFront is designed for this purpose.',
                2: 'This option is dependent on using an ELB, which is not the correct service for this use case.',
                4: 'It is not possible to directly attach a custom SSL/TLS certificate to an Amazon S3 bucket for its static website endpoint.',
            },
            references: [
                'AWS S3 Documentation — "Hosting a static website using Amazon S3": Amazon S3 website endpoints do not support HTTPS; it recommends using CloudFront.',
                'AWS CloudFront Documentation — "Getting started with a secure static website": Requires an S3 bucket and a CloudFront distribution.',
                'AWS CloudFront Documentation — "Using HTTPS with CloudFront": Requires an SSL/TLS certificate configured on the CloudFront distribution.',
                'AWS Certificate Manager Documentation — "Services integrated with AWS Certificate Manager": Lists Amazon CloudFront as a primary integrated service.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 216 — AmazonSSMManagedInstanceCore / EC2 IAM Role / Patch Manager
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed3-q216',
            type: 'single',
            prompt:
                'A company has a non-production application that runs on an Amazon EC2 instance. The EC2 instance has an instance profile and an associated IAM role. The company wants to automate patching for the EC2 instance. Which solution will meet this requirement?',
            options: [
                'Create a new IAM role. Attach the AmazonSSMManagedInstanceCore policy to the new IAM role. Attach the new IAM role to the EC2 instance profile. Use AWS Systems Manager to patch the instance.',
                'Create an IAM user. Attach the AmazonSSMManagedInstanceCore policy to the IAM user. Configure AWS Systems Manager to use the IAM user to patch the instance.',
                'Attach the AmazonSSMManagedInstanceCore policy to the existing IAM role. Use AWS Systems Manager to patch the EC2 instance.',
                'Attach the AmazonSSMManagedInstanceCore policy to an existing IAM user. Use EC2 Image Builder to patch the EC2 instance.',
            ],
            correctOptionIndex: 2,
            explanation:
                'Since the instance already has an IAM role and instance profile, the most direct solution is to modify the existing role by attaching the AmazonSSMManagedInstanceCore AWS managed policy. This grants the SSM Agent the required permissions to communicate with the Systems Manager service endpoint, enabling automated patching with Patch Manager.',
            incorrectOptionExplanations: {
                0: 'Creating a new IAM role is an unnecessary step. The principle of least overhead suggests modifying the existing role rather than replacing it.',
                1: 'EC2 instances use IAM roles attached via an instance profile to securely access AWS services, not IAM users. The SSM Agent uses credentials from the role.',
                3: 'EC2 instances use IAM roles, not users. Additionally, EC2 Image Builder is for creating patched AMIs, not for patching running instances directly.',
            },
            references: [
                'AWS Systems Manager User Guide — "Setting up AWS Systems Manager - Create an IAM instance profile": Recommends attaching AmazonSSMManagedInstanceCore to the instance\'s IAM role.',
                'AWS IAM User Guide — "IAM roles for Amazon EC2": EC2 instances use IAM roles for permissions; applications use role-provided temporary credentials to sign API requests.',
                'AWS Systems Manager User Guide — "AmazonSSMManagedInstanceCore": Provides permissions essential for core Systems Manager functionality including running the SSM Agent.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 217 — ACM + KMS / Encrypt in Transit + At Rest (Multi-select)
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed3-q217',
            type: 'multiple',
            prompt:
                'A company uses Amazon EC2 instances behind an Application Load Balancer (ALB) to serve content to users. The company uses Amazon Elastic Block Store (Amazon EBS) volumes to store data. The company needs to encrypt data in transit and at rest. Which combination of services will meet these requirements? (Select TWO.)',
            options: [
                'Amazon GuardDuty',
                'AWS Shield',
                'AWS Certificate Manager (ACM)',
                'AWS Secrets Manager',
                'AWS Key Management Service (AWS KMS)',
            ],
            correctOptionIndexes: [2, 4],
            explanation:
                'AWS Certificate Manager (ACM) provisions SSL/TLS certificates deployed on an ALB to terminate HTTPS connections, encrypting data in transit between clients and the load balancer. AWS Key Management Service (AWS KMS) manages cryptographic keys for Amazon EBS encryption, protecting data at rest on EBS volumes.',
            incorrectOptionExplanations: {
                0: 'Amazon GuardDuty is a threat detection service that monitors for malicious activity; it does not perform data encryption.',
                1: 'AWS Shield is a managed DDoS protection service; it safeguards applications but does not handle data encryption.',
                3: 'AWS Secrets Manager manages and retrieves secrets like database credentials and API keys, not for encrypting network traffic or storage volumes.',
            },
            references: [
                'AWS Elastic Load Balancing User Guide — "HTTPS listeners": ACM certificates are recommended for HTTPS listeners; the load balancer uses them to terminate SSL/TLS.',
                'Amazon EBS User Guide — "Amazon EBS encryption": EBS encryption uses AWS KMS to manage cryptographic keys for encrypted volumes and snapshots.',
                'Amazon GuardDuty User Guide: Threat detection service, not an encryption service.',
                'AWS Shield User Guide: DDoS protection service, not an encryption service.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 218 — WAF IP Set / Block Malicious IP / ALB
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed3-q218',
            type: 'single',
            prompt:
                'A developer creates a web application that runs on Amazon EC2 instances behind an Application Load Balancer (ALB). The instances are in an Auto Scaling group. The developer reviews the deployment and notices some suspicious traffic to the application. The traffic is malicious and is coming from a single public IP address. A solutions architect must block the public IP address. Which solution will meet this requirement?',
            options: [
                'Create a security group rule to deny all inbound traffic from the suspicious IP address. Associate the security group with the ALB.',
                'Implement Amazon Detective to monitor traffic and to block malicious activity from the internet. Configure Detective to integrate with the ALB.',
                'Implement AWS Resource Access Manager (AWS RAM) to manage traffic rules and to block malicious activity from the internet. Associate AWS RAM with the ALB.',
                'Add the malicious IP address to an IP set in AWS WAF. Create a web ACL. Include an IP set rule with the action set to BLOCK. Associate the web ACL with the ALB.',
            ],
            correctOptionIndex: 3,
            explanation:
                'AWS WAF provides the most direct and effective method to block a specific malicious IP address for an ALB. The process involves creating an IP set containing the malicious IP, defining a rule in a web ACL to block requests from that IP set, and associating the web ACL with the ALB. This filters traffic at the application layer before it reaches EC2 instances.',
            incorrectOptionExplanations: {
                0: 'Security groups do not support explicit deny rules. They are stateful and only allow the creation of allow rules.',
                1: 'Amazon Detective is a security investigation service for analyzing and visualizing security data to identify root causes of issues, not for actively blocking traffic.',
                2: 'AWS Resource Access Manager (AWS RAM) is for sharing AWS resources across different AWS accounts. It is not used for managing traffic or implementing security rules.',
            },
            references: [
                'AWS WAF Developer Guide — "IP set rule statement": Inspects the source IP address of a web request against a set of IP addresses and address ranges.',
                'Elastic Load Balancing User Guide — "Associate or disassociate a web ACL": AWS WAF can be used with an ALB to allow or block requests based on web ACL rules.',
                'Amazon EC2 User Guide — "Security group rules": Security group rules are always permissive; you can\'t create rules that deny access.',
                'Amazon Detective Administrator Guide — "What is Amazon Detective?": An analytical and investigation tool, not a preventative blocking service.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 219 — Root User Security / MFA + IAM Users / New Account
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed3-q219',
            type: 'single',
            prompt:
                'A company has established a new AWS account. The account is newly provisioned and no changes have been made to the default settings. The company is concerned about the security of the AWS account root user. What should be done to secure the root user?',
            options: [
                'Create IAM users for daily administrative tasks. Disable the root user.',
                'Create IAM users for daily administrative tasks. Enable multi-factor authentication on the root user.',
                'Generate an access key for the root user. Use the access key for daily administration tasks instead of the AWS Management Console.',
                'Provide the root user credentials to the most senior solutions architect. Have the solutions architect use the root user for daily administration tasks.',
            ],
            correctOptionIndex: 1,
            explanation:
                'AWS security best practices strongly recommend securing the root user with MFA and not using it for daily administrative tasks. Creating individual IAM users with minimum necessary permissions for all human and programmatic access, combined with enabling MFA on the root user, is a foundational security measure for any AWS account.',
            incorrectOptionExplanations: {
                0: 'The AWS account root user cannot be disabled. It is required for a small number of specific account and service management tasks.',
                2: 'Creating and using root user access keys is strongly discouraged. If compromised, these keys provide unrestricted programmatic access to the entire account.',
                3: 'Using the root user for daily tasks, even by a senior architect, violates security best practices and the principle of least privilege.',
            },
            references: [
                'AWS IAM User Guide — "Security best practices in IAM": Enable MFA on the root user; don\'t use the root user for everyday tasks.',
                'AWS Security Best Practices Whitepaper: Enable MFA for the root user and do not use the root user for day-to-day operations.',
                'AWS IAM User Guide — "Tasks that require root user credentials": Lists specific functions that require the root user, demonstrating it has unique functions and cannot be disabled.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 220 — STS AssumeRole / On-Premises Short-Lived S3 Upload
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed3-q220',
            type: 'single',
            prompt:
                'A company runs an application on premises. The application needs to periodically upload large files to an Amazon S3 bucket. A solutions architect needs a solution to provide the application with short-lived authenticated access to the S3 bucket. The solution must not use long-term credentials. The solution needs to be secure and scalable. Which solution will meet these requirements with the LEAST operational overhead?',
            options: [
                'Create an IAM user that has an access key and a secret key. Store the keys on the on-premises server in an environment variable. Attach a policy to the IAM user that restricts access to only the S3 bucket.',
                'Configure an AWS Site-to-Site VPN connection from the on-premises environment to the company\'s VPC. Launch an Amazon EC2 instance with an instance profile. Route all file uploads from the on-premises application through the EC2 instance to the S3 bucket.',
                'Configure an S3 bucket policy to allow access for the on-premises server\'s public IP address. Configure the policy to allow PUT operations only from the server\'s IP address.',
                'Configure a trust relationship between the on-premises server and AWS Security Token Service (AWS STS). Generate credentials by assuming an IAM role for each upload operation.',
            ],
            correctOptionIndex: 3,
            explanation:
                'Using AWS STS, an on-premises application can call the sts:AssumeRole API action to receive temporary security credentials (an access key ID, secret access key, and session token) that are automatically invalidated upon expiration. This directly fulfills requirements for short-lived credentials without long-term credential storage, with the lowest operational overhead.',
            incorrectOptionExplanations: {
                0: 'This solution uses long-term credentials (IAM user access keys), which violates a key requirement and is an AWS security anti-pattern.',
                1: 'This approach is overly complex and introduces significant operational overhead by requiring a Site-to-Site VPN and a dedicated EC2 proxy instance.',
                2: 'Using an IP-based bucket policy is not a robust authentication mechanism, as IP addresses can be spoofed or change, and it does not provide short-lived credentials.',
            },
            references: [
                'AWS IAM User Guide — "Temporary security credentials in IAM": STS creates and provides trusted users with temporary security credentials for controlling access to AWS resources.',
                'AWS IAM User Guide — "Roles terms and concepts": An IAM role provides temporary security credentials without standard long-term credentials like access keys.',
                'AWS STS API Reference — "AssumeRole": Returns a set of temporary security credentials that can be used to access AWS resources.',
                'AWS Security Best Practices Whitepaper: For applications running outside of AWS, consider using IAM Roles Anywhere or STS for temporary credentials.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 221 — S3 Same-Region Replication / Centralized Log Analysis
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed3-q221',
            type: 'single',
            prompt:
                'A company has multiple AWS accounts with applications deployed in the us-west-2 Region. Application logs are stored within Amazon S3 buckets in each account. The company wants to build a centralized log analysis solution that uses a single S3 bucket. Logs must not leave us-west-2, and the company wants to incur minimal operational overhead.',
            options: [
                'Create an S3 Lifecycle policy that copies the objects from one of the application S3 buckets to the centralized S3 bucket.',
                'Use S3 Same-Region Replication to replicate logs from the S3 buckets to another S3 bucket in us-west-2. Use this S3 bucket for log analysis.',
                'Write a script that uses the PutObject API operation every day to copy the entire contents of the buckets to another S3 bucket in us-west-2. Use this S3 bucket for log analysis.',
                'Write AWS Lambda functions in these accounts that are triggered every time logs are delivered to the S3 buckets (s3:ObjectCreated:*) event. Copy the logs to another S3 bucket in us-west-2. Use this S3 bucket for log analysis.',
            ],
            correctOptionIndex: 1,
            explanation:
                'S3 Same-Region Replication (SRR) is a managed feature that automatically and asynchronously copies new objects from source buckets to a destination bucket within the same AWS Region. It can be configured to replicate objects across different AWS accounts, centralizing logs with minimal operational overhead — just initial configuration required.',
            incorrectOptionExplanations: {
                0: 'S3 Lifecycle policies are used to manage the lifecycle of objects within a bucket (transitions, expirations). They do not copy objects to other buckets.',
                2: 'Writing and maintaining a custom script introduces significant operational overhead for development, scheduling, error handling, and monitoring.',
                3: 'Using Lambda functions adds complexity and operational overhead, requiring writing, deploying, and managing code and permissions in each account.',
            },
            references: [
                'Amazon S3 User Guide — "Replicating objects": S3 Replication provides an automatic asynchronous way to copy objects between S3 buckets; SRR copies objects within the same Region.',
                'Amazon S3 User Guide — "Setting up replication": Source and destination buckets for replication can be owned by different AWS accounts.',
                'Amazon S3 User Guide — "Managing your storage lifecycle": Lifecycle policies are for transitions and expirations, not replication.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 222 — CloudFront + S3 OAC + WAF / Static Website Protection
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed3-q222',
            type: 'single',
            prompt:
                'A solutions architect must design a solution that uses Amazon CloudFront with an Amazon S3 origin to serve a static website. The solution must use AWS WAF to inspect all website traffic. Which solution will meet these requirements?',
            options: [
                'Configure an S3 bucket policy to accept only requests that come from the AWS WAF Amazon Resource Name (ARN).',
                'Configure CloudFront to forward all incoming requests to AWS WAF before CloudFront requests content from the S3 origin.',
                'Configure a security group that allows only CloudFront IP addresses to access Amazon S3. Associate AWS WAF to the CloudFront distribution.',
                'Configure CloudFront and Amazon S3 to use an origin access control (OAC) to secure the origin S3 bucket. Associate AWS WAF to the CloudFront distribution.',
            ],
            correctOptionIndex: 3,
            explanation:
                'Origin Access Control (OAC) restricts access to the S3 bucket so only CloudFront can access it, preventing users from bypassing CloudFront. Associating AWS WAF with the CloudFront distribution ensures all incoming HTTP/S requests are inspected by WAF at the AWS edge network before being forwarded to the S3 origin.',
            incorrectOptionExplanations: {
                0: 'AWS WAF inspects traffic at CloudFront; it does not originate requests to S3. An S3 bucket policy cannot use a WAF ARN to grant access.',
                1: 'The architectural flow is incorrect. You associate an AWS WAF web ACL with a CloudFront distribution, not forward requests to WAF as a separate step.',
                2: 'Amazon S3 buckets do not use security groups for access control. Access is managed through bucket policies, ACLs, and IAM policies.',
            },
            references: [
                'Amazon CloudFront Developer Guide — "Restricting access to an Amazon S3 origin": OAC enables the CloudFront distribution to access the S3 bucket using a CloudFront service principal.',
                'AWS WAF Developer Guide — "Associating or disassociating a web ACL with an AWS resource": A web ACL can be associated with a CloudFront distribution.',
                'Amazon S3 User Guide — "Identity and access management in Amazon S3": S3 access control is managed through bucket policies and IAM policies, not security groups.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 223 — IAM Identity Center / Enable in Org + Permission Sets (Multi-select)
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed3-q223',
            type: 'multiple',
            prompt:
                'A company uses an organization in AWS Organizations to manage a multi-account landing zone. The company requires all users who access AWS accounts in the organization to use a centralized identity system that follows the principle of least privilege for operational tasks. The company currently uses an external identity provider (IdP). Which combination of solutions will meet these requirements? (Select TWO.)',
            options: [
                'Use AWS Identity and Access Management (IAM) to create IAM users and IAM user groups in each AWS account.',
                'Create permission sets in AWS IAM Identity Center. Assign the appropriate permission sets to the IAM users and IAM user groups in the accounts.',
                'Assign each IAM user to an IAM role by using an inline IAM policy based on operational duties. Assign each role to the appropriate AWS account in the organization.',
                'Configure a SAML identity provider in AWS Identity and Access Management (IAM) in each AWS account to establish a trust relationship with the company\'s external IdP.',
                'Enable AWS IAM Identity Center in the organization management account. Create user accounts and user groups.',
            ],
            correctOptionIndexes: [1, 4],
            explanation:
                'Enabling IAM Identity Center in the management account (E) establishes the centralized service that connects with external IdPs. Creating permission sets (B) defines specific access levels that enforce the principle of least privilege. These permission sets are assigned to users or groups from the IdP and granted access to specific AWS accounts within the organization.',
            incorrectOptionExplanations: {
                0: 'Creating IAM users in each account is decentralized and contradicts the requirement for a centralized identity system. It also does not leverage the existing external IdP.',
                2: 'This describes a manual and less scalable approach that doesn\'t provide the centralized management and IdP integration that IAM Identity Center offers.',
                3: 'Configuring a SAML IdP in each account is inefficient and creates significant management overhead. IAM Identity Center centralizes this trust relationship configuration for all accounts.',
            },
            references: [
                'AWS IAM Identity Center User Guide — "What is AWS IAM Identity Center?": Helps securely connect workforce identities and manage access centrally; supports external identity sources.',
                'AWS IAM Identity Center User Guide — "How IAM Identity Center works with AWS Organizations": Recommended to enable for the entire organization.',
                'AWS IAM Identity Center User Guide — "Create and manage permission sets": A collection of policies that IAM Identity Center uses to determine effective permissions per account.',
                'AWS IAM Identity Center User Guide — "Choose your identity source": Can be configured to use an external identity provider via SAML 2.0.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 224 — ALB + WAF / Sticky Sessions + Web ACL (Multi-select)
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed3-q224',
            type: 'multiple',
            prompt:
                'A company runs a web application on Amazon EC2 instances in an Auto Scaling group that has a target group. The company designed the application to work with session affinity (sticky sessions) for a better user experience. The application must be available publicly over the internet as an endpoint. A WAF must be applied to the endpoint for additional security. Session affinity (sticky sessions) must be configured on the endpoint. Which combination of actions should a solutions architect take? (Select TWO.)',
            options: [
                'Create a public Network Load Balancer. Specify the application target group.',
                'Create a Gateway Load Balancer. Specify the application target group.',
                'Create a public Application Load Balancer. Specify the application target group.',
                'Create a second target group. Add Elastic IP addresses to the EC2 instances.',
                'Create a web ACL in AWS WAF. Associate the web ACL with the endpoint.',
            ],
            correctOptionIndexes: [2, 4],
            explanation:
                'An Application Load Balancer (ALB) natively supports sticky sessions using cookies (Layer 7 feature) and can be directly associated with an AWS WAF web ACL. Creating a public ALB with the application target group and associating a WAF web ACL with it fulfills both requirements.',
            incorrectOptionExplanations: {
                0: 'A Network Load Balancer operates at Layer 4 and does not integrate with AWS WAF, which is a Layer 7 service.',
                1: 'A Gateway Load Balancer is used to deploy and manage third-party virtual network appliances, not to serve web application traffic directly.',
                3: 'Assigning Elastic IP addresses to individual instances in an Auto Scaling group is an anti-pattern that complicates management and defeats the purpose of load balancing.',
            },
            references: [
                'AWS Elastic Load Balancing User Guide — "Sticky sessions": ALBs support sticky sessions using cookies.',
                'AWS WAF Developer Guide — "Associating a web ACL with an AWS resource": WAF web ACLs can be associated with regional Application Load Balancers.',
                'AWS Elastic Load Balancing User Guide — "Product comparisons": Only ALBs support AWS WAF integration; NLBs do not.',
                'AWS Elastic Load Balancing User Guide — "What is a Gateway Load Balancer?": For deploying and managing virtual appliances, not for direct application traffic.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 225 — S3 Gateway Endpoint / EC2 Upload Without Public Endpoint
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed3-q225',
            type: 'single',
            prompt:
                'A company runs its legacy web application on AWS. The web application server runs on an Amazon EC2 instance in the public subnet of a VPC. The web application server collects images from customers and stores the image files in a locally attached Amazon Elastic Block Store (Amazon EBS) volume. The image files are uploaded every night to an Amazon S3 bucket for backup. A solutions architect discovers that the image files are being uploaded to Amazon S3 through the public endpoint. The solutions architect needs to ensure that traffic to Amazon S3 does not use the public endpoint. Which solution will meet these requirements?',
            options: [
                'Create a gateway VPC endpoint for the S3 bucket that has the necessary permissions for the VPC. Configure the subnet route table to use the gateway VPC endpoint.',
                'Move the S3 bucket inside the VPC. Configure the subnet route table to access the S3 bucket through private IP addresses.',
                'Create an Amazon S3 access point for the Amazon EC2 instance inside the VPC. Configure the web application to upload by using the Amazon S3 access point.',
                'Configure an AWS Direct Connect connection between the VPC that has the Amazon EC2 instance and Amazon S3 to provide a dedicated network path.',
            ],
            correctOptionIndex: 0,
            explanation:
                'A gateway VPC endpoint for Amazon S3 provides a secure, private connection between resources in a VPC and the S3 service. By creating a gateway endpoint and adding a route to the subnet\'s route table that directs S3-bound traffic through this endpoint, the EC2 instance communicates with S3 without using an internet gateway or NAT device, keeping all traffic within the AWS network.',
            incorrectOptionExplanations: {
                1: 'Amazon S3 is a global service that does not reside within a VPC. It is architecturally impossible to move an S3 bucket "inside" a VPC.',
                2: 'An S3 access point simplifies access management policies but does not create the private network path. A VPC endpoint is still required to route traffic privately.',
                3: 'AWS Direct Connect establishes a dedicated private connection from an on-premises data center to AWS, not for connecting services within AWS.',
            },
            references: [
                'Amazon VPC User Guide — "Gateway VPC endpoints": A gateway endpoint allows VPC instances to access S3 and DynamoDB without an internet gateway.',
                'Amazon VPC User Guide — "VPC endpoints for Amazon S3": For private subnet resources needing S3 access, use a gateway endpoint.',
                'Amazon S3 User Guide — "Restricting access to an Amazon S3 access point from a virtual private cloud": An endpoint provides the network path; an access point provides policy control.',
                'AWS Direct Connect User Guide: For connecting external premises to AWS, not for intra-AWS service communication.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 226 — AWS Backup Audit Manager / Compliance Reports
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed3-q226',
            type: 'single',
            prompt:
                'A company runs several custom applications on Amazon EC2 instances. Each team within the company manages its own set of applications and backups. To comply with regulations, the company must be able to report on the status of backups and ensure that backups are encrypted. Which solution will meet these requirements with the LEAST effort?',
            options: [
                'Create an AWS Lambda function that processes AWS Config events. Configure the Lambda function to query AWS Config for backup-related data and to generate daily reports.',
                'Check the backup status of the EC2 instances daily by reviewing the backup configurations in AWS Backup and Amazon Elastic Block Store (Amazon EBS) snapshots.',
                'Use an AWS Lambda function to query Amazon EBS snapshots, Amazon RDS snapshots, and AWS Backup jobs. Configure the Lambda function to process and report on the data. Schedule the function to run daily.',
                'Use AWS Config and AWS Backup Audit Manager to ensure compliance. Review generated reports daily.',
            ],
            correctOptionIndex: 3,
            explanation:
                'AWS Backup Audit Manager is a purpose-built feature within AWS Backup designed to audit and report on the compliance of data protection policies. It allows defining controls (e.g., backups must be encrypted, backups must occur with a certain frequency) and automatically generates reports to demonstrate compliance. This managed service directly addresses the need to report on backup status and ensure encryption with minimal operational overhead.',
            incorrectOptionExplanations: {
                0: 'Creating a custom Lambda function requires significant development, testing, and maintenance effort, which is not the path of "least effort."',
                1: 'Manual daily checks are operationally intensive, prone to human error, and do not scale effectively across multiple teams.',
                2: 'This custom Lambda solution is even more complex than option A, as it needs to query multiple AWS services, increasing development and maintenance overhead.',
            },
            references: [
                'AWS Backup Developer Guide — "Auditing and reporting with AWS Backup Audit Manager": Allows auditing and reporting on backup compliance to meet business and regulatory needs.',
                'AWS Backup Developer Guide — "Controls and remediation": Includes BACKUP_RESOURCES_PROTECTED_BY_BACKUP_PLAN and BACKUP_VAULT_ENCRYPTED controls that directly map to the requirements.',
                'AWS Config Developer Guide: AWS Config supports tracking of AWS Backup resources, complementing Audit Manager for a comprehensive compliance posture.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 227 — CloudHSM-backed KMS Keys / RDS Oracle TDE
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed3-q227',
            type: 'single',
            prompt:
                'A healthcare company stores personally identifiable information (PII) data in an Amazon RDS for Oracle database. The company must encrypt the PII data at rest. The company must use dedicated hardware modules to store and manage the encryption keys. Which solution will meet these requirements?',
            options: [
                'Use AWS Key Management Service (AWS KMS) to configure encryption for the RDS database. Store and manage keys in AWS CloudHSM.',
                'Use AWS CloudHSM backed AWS KMS keys to configure transparent encryption for the RDS database.',
                'Use Amazon EC2 instance store encryption to encrypt database volumes by using AWS CloudHSM backed keys.',
                'Configure RDS snapshots and use server-side encryption with Amazon S3 managed keys (SSE-S3). Store the keys in AWS CloudHSM.',
            ],
            correctOptionIndex: 1,
            explanation:
                'Amazon RDS integrates with AWS KMS to encrypt databases. For dedicated hardware requirements, AWS KMS can be configured to use a custom key store backed by an AWS CloudHSM cluster. This ensures KMS keys are generated, stored, and used exclusively within single-tenant HSMs. RDS for Oracle uses Transparent Data Encryption (TDE) through this integrated solution.',
            incorrectOptionExplanations: {
                0: 'This option is less precise. You cannot directly configure RDS to store and manage keys in CloudHSM. The correct and required integration path is through an AWS KMS custom key store backed by CloudHSM.',
                2: 'This is incorrect because the service is Amazon RDS, not a database on an EC2 instance. EC2 instance stores provide ephemeral, not persistent, storage.',
                3: 'This incorrectly focuses on encrypting snapshots rather than the primary database. It also inaccurately suggests using Amazon S3-managed keys (SSE-S3) for RDS encryption.',
            },
            references: [
                'AWS KMS Developer Guide — "Custom key stores": A custom key store is associated with an AWS CloudHSM cluster; cryptographic operations are performed in the HSMs you control.',
                'Amazon RDS User Guide — "Encrypting Amazon RDS resources": RDS can use KMS keys from a custom key store for encryption.',
                'Amazon RDS User Guide — "Oracle Transparent Data Encryption": Amazon RDS uses Oracle TDE to encrypt Oracle data at rest.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 228 — Security Hub + AWS Config Conformance Packs / Compliance
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed3-q228',
            type: 'single',
            prompt:
                'A company needs to create a compliance management solution. The company wants to use a combination of AWS services to achieve the fine-grained visibility that the solution requires. The compliance management solution must provide a centralized method for company employees to review security findings and out-of-compliance findings. Which solution will meet these requirements with the LEAST ongoing maintenance?',
            options: [
                'Configure AWS Security Hub to centralize findings. Use conformance packs in Amazon Inspector to check for compliance framework misalignment.',
                'Use AWS Marketplace to purchase a security tool. Install the tool on an Amazon EC2 instance. Assign an EC2 Instance Profile for the tool to gather data from AWS resources.',
                'Configure AWS Security Hub to centralize findings. Use conformance packs in AWS Config to check for compliance framework misalignment.',
                'Configure AWS Systems Manager to provide a centralized dashboard. Use conformance packs in AWS Config to check for compliance framework misalignment.',
            ],
            correctOptionIndex: 2,
            explanation:
                'AWS Security Hub aggregates, organizes, and prioritizes security findings from various AWS services. AWS Config conformance packs are collections of AWS Config rules that assess resources against compliance frameworks. Integrating AWS Config findings into Security Hub provides a centralized method to review both security and compliance findings, fulfilling all requirements with a fully managed, low-maintenance solution.',
            incorrectOptionExplanations: {
                0: 'Amazon Inspector is a vulnerability management service for compute workloads; it does not use conformance packs. Conformance packs are a feature of AWS Config.',
                1: 'Installing a third-party tool on an EC2 instance introduces significant operational overhead, including patching the OS and managing the instance, contradicting "LEAST ongoing maintenance."',
                3: 'While AWS Systems Manager has dashboard capabilities, its primary function is operational management, not centralizing security and compliance findings. AWS Security Hub is the purpose-built service.',
            },
            references: [
                'AWS Security Hub Developer Guide — "What is AWS Security Hub?": Provides a comprehensive view of security state and checks against security industry standards.',
                'AWS Config Developer Guide — "Conformance Packs": A collection of AWS Config rules and remediation actions deployed as a single entity.',
                'AWS Security Hub User Guide — "AWS Config integration with Security Hub": Security Hub uses service-linked rules from AWS Config for security checks.',
                'Amazon Inspector User Guide: Focused on vulnerability scanning in compute resources, not configuration compliance via conformance packs.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 229 — EMR Runtime Roles + EnableApplicationScopedIAMRole (Select THREE)
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed3-q229',
            type: 'multiple',
            prompt:
                'A healthcare company is running an Amazon EMR cluster on Amazon EC2 instances to process data that is stored in Amazon S3. The company must ensure that the data processing jobs have access only to the relevant data in Amazon S3. Each job must have specific EMR runtime roles. Which combination of steps will meet these requirements? (Select THREE.)',
            options: [
                'Set up security configurations in Amazon EMR, and set EnableApplicationScopedIAMRole to true.',
                'Set up runtime roles to assume the EC2 instance profile of the Amazon EMR cluster.',
                'Set up an EC2 instance profile for the Amazon EMR cluster to assume the runtime roles.',
                'For each IAM role that serves as an EMR runtime role, set up a trust policy with the EC2 instance profile role.',
                'Establish a trust policy between the EMR runtime roles and the EMR service role of the cluster.',
                'Set up security configurations in Amazon EMR, and set EnableInTransitEncryption to true.',
            ],
            correctOptionIndexes: [0, 2, 3],
            explanation:
                'Three key steps enable EMR job-specific S3 access: (A) Enable the feature via an EMR security configuration with EnableApplicationScopedIAMRole set to true. (C) The EC2 instance profile must be granted permission (sts:AssumeRole) to assume the runtime roles. (D) Each runtime role must have a trust policy that explicitly allows the EC2 instance profile role to assume it.',
            incorrectOptionExplanations: {
                1: 'This describes an incorrect trust direction. The EC2 instance profile assumes the runtime roles, not the other way around.',
                4: 'The trust relationship is between the EC2 instance profile and the runtime roles, not the EMR service role.',
                5: 'EnableInTransitEncryption is for encrypting data between cluster nodes and is unrelated to IAM permissions for S3 access.',
            },
            references: [
                'AWS Documentation — Amazon EMR Management Guide, "Configure IAM roles for EMRFS requests to Amazon S3": Describes creating a security configuration with EnableApplicationScopedIAMRole: true, and configuring trust policies between the instance profile and runtime roles.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 230 — SQS VPC Endpoint + Queue Policy / Private SQS Traffic
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed3-q230',
            type: 'single',
            prompt:
                'A company is designing a serverless application to process a large number of events within an AWS account. The application saves the events to a data warehouse for further analysis. The application sends incoming events to an Amazon SQS queue. Traffic between the application and the SQS queue must not use public IP addresses. Which solution will meet these requirements?',
            options: [
                'Create a VPC endpoint for Amazon SQS. Set the queue policy to deny all access except from the VPC endpoint.',
                'Configure server-side encryption with SQS-managed keys (SSE-SQS).',
                'Configure AWS Security Token Service (AWS STS) to generate temporary credentials for resources that access the queue.',
                'Configure VPC Flow Logs to detect SQS traffic that leaves the VPC.',
            ],
            correctOptionIndex: 0,
            explanation:
                'An interface VPC endpoint for Amazon SQS creates an ENI within the VPC, allowing resources to communicate with the SQS API using private IP addresses. All traffic remains on the AWS global network. An SQS queue policy configured to deny requests not originating from the VPC endpoint effectively blocks all public access.',
            incorrectOptionExplanations: {
                1: 'SSE-SQS encrypts data at rest within the queue. It does not address the requirement for private network connectivity (data in transit).',
                2: 'STS is an identity and access management best practice for authentication, but it does not control the network path of the traffic.',
                3: 'VPC Flow Logs is a detective control for monitoring IP traffic. It can report on traffic leaving the VPC but does not prevent public IP usage.',
            },
            references: [
                'Amazon SQS Developer Guide — "Amazon SQS and interface VPC endpoints": Communication between the VPC and Amazon SQS is conducted entirely within the AWS network.',
                'Amazon SQS Developer Guide — "Controlling access to Amazon SQS from virtual private clouds": Demonstrates using the aws:sourceVpce key to restrict access to a specific VPC endpoint.',
                'Amazon SQS Developer Guide — "Protecting data using server-side encryption": SSE-SQS and SSE-KMS encrypt message bodies at rest, not network connectivity.',
                'Amazon VPC User Guide — "Logging IP traffic using VPC Flow Logs": A monitoring tool, not a preventative network control.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 231 — IAM Policy Condition / aws:SourceIp / Access Denied
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed3-q231',
            type: 'single',
            prompt:
                'A company uses Amazon EC2 instances to host its internal systems. As part of a deployment operation, an administrator tries to use the AWS CLI to terminate an EC2 instance. However, the administrator receives a 403 (Access Denied) error message. The administrator is using an IAM role that has the following IAM policy attached that allows ec2:TerminateInstances with a Condition using aws:SourceIp limited to CIDR blocks 192.0.2.0/24 or 203.0.113.0/24. What is the cause of the unsuccessful request?',
            options: [
                'The EC2 instance has a resource-based policy with a Deny statement.',
                'The principal has not been specified in the policy statement.',
                'The "Action" field does not grant the actions that are required to terminate the EC2 instance.',
                'The request to terminate the EC2 instance does not originate from the CIDR blocks 192.0.2.0/24 or 203.0.113.0/24.',
            ],
            correctOptionIndex: 3,
            explanation:
                'The IAM policy includes a Condition element that restricts access based on the source IP address using the aws:SourceIp condition key. The Allow effect for ec2:TerminateInstances is only granted if the API request originates from an IP address within the specified CIDR blocks. Since the administrator received "Access Denied," the AWS CLI command was executed from a machine with an IP address outside those ranges.',
            incorrectOptionExplanations: {
                0: 'Amazon EC2 instances do not support resource-based policies. Permissions for EC2 actions are managed through identity-based policies.',
                1: 'The Principal element is not specified in identity-based policies because the principal is implicitly the user, group, or role to which the policy is attached.',
                2: 'The policy explicitly includes "Action": "ec2:TerminateInstances," which is the correct and sufficient permission to perform the intended operation.',
            },
            references: [
                'AWS IAM User Guide — "IAM JSON policy elements: Condition": The Condition block specifies conditions for when a policy is in effect; aws:SourceIp restricts access by IP range.',
                'AWS IAM User Guide — "AWS global condition context keys": aws:SourceIp contains the IP address from which a request originates.',
                'AWS IAM User Guide — "Identity-based policies and resource-based policies": For identity-based policies, the principal is the identity the policy is attached to; a Principal element is not included.',
                'AWS Service Authorization Reference — "Actions for Amazon EC2": ec2:TerminateInstances is the specific action required to terminate instances.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 232 — GuardDuty RDS Protection / Aurora Login Monitoring
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed3-q232',
            type: 'single',
            prompt:
                'An ecommerce company runs applications in AWS accounts that are part of an organization in AWS Organizations. The applications run on Amazon Aurora PostgreSQL databases across all the accounts. The company needs to prevent malicious activity and must identify abnormal failed and incomplete login attempts to the databases. Which solution will meet these requirements?',
            options: [
                'Attach service control policies (SCPs) to the root of the organization to identify the failed login attempts.',
                'Enable the Amazon RDS Protection feature in Amazon GuardDuty for the member accounts of the organization.',
                'Publish the Aurora general logs to a log group in Amazon CloudWatch Logs. Export the log data to a central Amazon S3 bucket.',
                'Publish all the Aurora PostgreSQL database events in AWS CloudTrail to a central Amazon S3 bucket.',
            ],
            correctOptionIndex: 1,
            explanation:
                'Amazon GuardDuty\'s RDS Protection feature specifically analyzes and profiles Amazon Aurora database login activity for potential access threats. It uses tailored machine learning models to detect suspicious login attempts such as brute-force attacks or access from unusual locations. By enabling this for the organization, GuardDuty monitors all member accounts centrally.',
            incorrectOptionExplanations: {
                0: 'SCPs are used to enforce permission guardrails and restrict actions at the account or OU level; they cannot detect or analyze login events.',
                2: 'This describes log collection and aggregation but does not include the required analysis component to identify malicious or abnormal patterns.',
                3: 'AWS CloudTrail logs management API calls to the Amazon RDS service. It does not capture data-plane events like user login attempts to the database engine itself.',
            },
            references: [
                'Amazon GuardDuty User Guide — "GuardDuty RDS Protection": Analyzes and profiles Aurora database login activity for potential access threats using tailored machine learning models.',
                'Amazon GuardDuty User Guide — "Understanding GuardDuty RDS Protection findings": GuardDuty monitors RDS login events from supported Aurora database engines.',
                'AWS Organizations User Guide: AWS Organizations supports centrally enabling GuardDuty for all accounts.',
                'AWS CloudTrail User Guide: CloudTrail logs management events like creating and deleting DB instances, not database login attempts.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 233 — ACM + DNS Validation / CloudFront TLS Auto-Renewal
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed3-q233',
            type: 'single',
            prompt:
                'A company uses an Amazon CloudFront distribution to serve content pages for its website. The company needs to ensure that clients use a TLS certificate when accessing the company\'s website. The company wants to automate the creation and renewal of the TLS certificates. Which solution will meet these requirements with the MOST operational efficiency?',
            options: [
                'Use a CloudFront security policy to create a certificate.',
                'Use a CloudFront origin access control (OAC) to create a certificate.',
                'Use AWS Certificate Manager (ACM) to create a certificate. Use DNS validation for the domain.',
                'Use AWS Certificate Manager (ACM) to create a certificate. Use email validation for the domain.',
            ],
            correctOptionIndex: 2,
            explanation:
                'AWS Certificate Manager (ACM) is the designated service for provisioning, managing, and deploying SSL/TLS certificates for CloudFront. When using ACM with DNS validation, a CNAME record is added to DNS. ACM can automatically validate and renew the certificate without any manual intervention as long as the CNAME record remains in place, achieving maximum operational efficiency for automated renewal.',
            incorrectOptionExplanations: {
                0: 'A CloudFront security policy defines SSL/TLS protocols and ciphers for viewer connections; it does not create or manage certificates.',
                1: 'CloudFront origin access control (OAC) restricts access to an origin (like S3); it is unrelated to TLS certificate creation.',
                2: 'This is correct.',
                3: 'Email validation requires a manual action (clicking a link in an approval email), making it less operationally efficient than DNS validation which can be fully automated.',
            },
            references: [
                'AWS Certificate Manager User Guide — "Validate with DNS": ACM can automatically renew certificates that use DNS validation as long as the CNAME record remains in DNS.',
                'AWS Certificate Manager User Guide — "Managed renewal for ACM certificates": ACM renews certificates automatically 60 days before expiry for DNS-validated certificates.',
                'Amazon CloudFront Developer Guide — "Using HTTPS with CloudFront": Recommends AWS Certificate Manager for SSL/TLS certificates on CloudFront.',
                'Amazon CloudFront Developer Guide — "Security policies": Defines SSL/TLS protocols and ciphers, not certificates.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 234 — Lambda in VPC + Security Group Referencing / RDS Access
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed3-q234',
            type: 'single',
            prompt:
                'A company is building a data processing application that uses AWS Lambda functions. The Lambda functions need to communicate with an Amazon RDS DB instance deployed inside a VPC in the same AWS account. Which solution meets these requirements in the most secure way?',
            options: [
                'Configure the DB instance for public access. Allow Lambda public address space.',
                'Deploy Lambda inside the VPC. Attach a network ACL allowing outbound access to the VPC CIDR. Update the DB security group to allow traffic from 0.0.0.0/0.',
                'Deploy Lambda inside the VPC. Attach a security group to the Lambda functions. Allow outbound access only to the VPC CIDR. Update the DB instance security group to allow traffic from the Lambda security group.',
                'Peer the Lambda default VPC with the DB VPC and avoid security groups.',
            ],
            correctOptionIndex: 2,
            explanation:
                'Configuring the Lambda function to operate within the VPC creates an ENI in the VPC\'s subnets. By assigning a specific security group to Lambda and creating an inbound rule on the RDS security group that references the Lambda security group as the source, you enforce least privilege. Only traffic from the designated Lambda functions can access the database.',
            incorrectOptionExplanations: {
                0: 'Configuring the DB instance for public access creates a significant security vulnerability by exposing the database to the internet.',
                1: 'Allowing traffic from 0.0.0.0/0 in the database security group permits access from any resource within the VPC, violating the principle of least privilege.',
                3: 'Lambda functions run in an AWS-managed service VPC; you cannot create a VPC peering connection to it. The correct pattern is to place the Lambda function\'s ENI inside the customer VPC.',
            },
            references: [
                'AWS Lambda Developer Guide — "Configuring VPC access for a Lambda function": Illustrates configuring the database\'s security group to allow inbound traffic from the Lambda function\'s security group.',
                'Amazon RDS User Guide — "Controlling access with security groups": Referencing a source security group applies identically to Lambda functions configured within a VPC.',
                'AWS Well-Architected Framework — Security Pillar: Recommends using security group references in rules instead of CIDR ranges for inter-resource access.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 235 — S3 Gateway Endpoint + Endpoint Policy / Private VPC Temporary Access
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed3-q235',
            type: 'single',
            prompt:
                'A company operates multiple VPCs in a single AWS account. Account users need temporary access to Amazon S3 buckets. The S3 buckets are private and have no public endpoints. The solution must follow the principle of least privilege for access to each environment and must avoid distributing permanent access keys. Which solution will meet these requirements?',
            options: [
                'Create a gateway VPC endpoint for Amazon S3 in each VPC. Attach an endpoint policy that allows only environment-scoped IAM roles to access the S3 buckets.',
                'Configure the S3 buckets to use SSE-S3. Create bucket policies that allow access only from the VPC CIDR blocks.',
                'Define separate S3 access points for each environment. Allow users to assume a role associated with the access points. Use the default Amazon S3 endpoints.',
                'Route S3 traffic through a NAT gateway. Configure bucket policies that allow traffic only from the NAT gateway\'s public IP addresses.',
            ],
            correctOptionIndex: 0,
            explanation:
                'A gateway VPC endpoint for S3 establishes a private connection between the VPC and S3 without traversing the public internet. An endpoint policy provides fine-grained access control specifying environment-scoped IAM roles as the allowed principals, enforcing least privilege. IAM roles provide temporary credentials, satisfying the requirement to avoid permanent access keys.',
            incorrectOptionExplanations: {
                1: 'SSE-S3 is an encryption feature for data at rest and does not control network access. Using VPC CIDR blocks in bucket policies is not the recommended method for controlling access from a VPC endpoint.',
                2: 'Using default Amazon S3 endpoints means traffic routes over the public internet, violating the requirement for private access.',
                3: 'A NAT gateway routes traffic from a private subnet to the internet. This means S3 traffic would traverse the public internet, failing to meet the private access requirement.',
            },
            references: [
                'AWS VPC User Guide — "VPC endpoints for Amazon S3": A gateway endpoint allows VPC resources to access S3 without an internet gateway or NAT device.',
                'Amazon S3 User Guide — "Controlling access from VPC endpoints - Using endpoint policies for Amazon S3": Endpoint policies provide IAM resource policies controlling access from the endpoint to the service.',
                'AWS IAM User Guide — "IAM roles": Roles provide temporary security credentials; users assume the role to get short-lived access without permanent keys.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 236 — Macie + Athena / Healthcare Sensitive Data Query
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed3-q236',
            type: 'single',
            prompt:
                'A healthcare company is designing a system to store and manage logs in the AWS Cloud. The system ingests and stores logs in JSON format that contain sensitive patient information. The company must identify any sensitive data and must be able to search the log data by using SQL queries. Which solution will meet these requirements?',
            options: [
                'Store the logs in an Amazon S3 bucket. Configure Amazon Macie to discover sensitive data. Use Amazon Athena to query the logs.',
                'Store the logs in an Amazon EBS volume. Create an application that uses Amazon SageMaker AI to detect sensitive data. Use Amazon RDS to query the logs.',
                'Store the logs in Amazon DynamoDB. Use AWS KMS to discover sensitive data. Use Amazon Redshift Spectrum to query the logs.',
                'Store the logs in an Amazon S3 bucket. Use Amazon Inspector to discover sensitive data. Use Amazon Athena to query the logs.',
            ],
            correctOptionIndex: 0,
            explanation:
                'Amazon S3 is ideal for storing large volumes of JSON log files. Amazon Macie uses machine learning to automatically discover and classify sensitive data such as patient information within S3. Amazon Athena provides a serverless SQL query service that analyzes data directly in S3 without needing to load it into a separate database.',
            incorrectOptionExplanations: {
                1: 'Amazon EBS is block storage for EC2 instances, not appropriate for querying log files directly. Amazon RDS cannot query files stored on an EBS volume.',
                2: 'AWS KMS is used for managing encryption keys; it does not have the capability to discover sensitive data content within files.',
                3: 'Amazon Inspector is a vulnerability management service for compute resources; it does not discover sensitive data within S3 objects.',
            },
            references: [
                'Amazon Macie Documentation — "What is Amazon Macie?": Discovers sensitive data using machine learning and pattern matching.',
                'Amazon Athena Documentation — "What is Amazon Athena?": An interactive query service that analyzes data directly in Amazon S3 using standard SQL.',
                'Amazon S3 Documentation: Common use case for storing log files.',
                'Amazon Inspector Documentation — "What is Amazon Inspector?": Scans workloads for software vulnerabilities, not sensitive data in S3.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 237 — SQS Queue Policy / Cross-Account SNS to SQS / Least Privilege
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed3-q237',
            type: 'single',
            prompt:
                'A company uses AWS Organizations to manage multiple AWS accounts. The company needs a secure, event-driven architecture in which specific Amazon SNS topics in Account A can publish messages to specific Amazon SQS queues in Account B. Which solution meets these requirements while maintaining least privilege?',
            options: [
                'Create a new IAM role in Account A that can publish to any SQS queue. Share the role ARN with Account B.',
                'Add SNS topic ARNs to SQS queue policies in Account B. Configure SNS topics to publish to any queue. Encrypt the queue with an AWS KMS key.',
                'Modify the SQS queue policies in Account B to allow only specific SNS topic ARNs from Account A to publish messages. Ensure the SNS topics have publish permissions for the specific queue ARN.',
                'Create a shared IAM role across both accounts with permission to publish to all SQS queues. Enable cross-account access.',
            ],
            correctOptionIndex: 2,
            explanation:
                'The most secure method for enabling a specific SNS topic in one account to publish to a specific SQS queue in another account is by using a resource-based policy on the SQS queue. The queue policy grants sqs:SendMessage permission specifically to the SNS topic\'s ARN using the aws:SourceArn condition key, adhering to least privilege. The SNS topic is then subscribed to the SQS queue.',
            incorrectOptionExplanations: {
                0: 'This violates least privilege by granting permission to publish to any SQS queue, not a specific one.',
                1: 'Configuring SNS topics to publish to any queue is overly permissive and violates least privilege.',
                3: 'A shared role with permissions to publish to all SQS queues is a significant violation of the principle of least privilege.',
            },
            references: [
                'AWS SQS Developer Guide — "Example cases for Amazon SQS access control - Example 4": Provides a policy granting a specific SNS topic permission to send messages to a specific SQS queue using the aws:SourceArn condition.',
                'AWS SNS Developer Guide — "Subscribing an Amazon SQS queue to an Amazon SNS topic": The primary control mechanism is the SQS queue\'s resource-based policy.',
                'AWS IAM User Guide — "The confused deputy problem": aws:SourceArn and aws:SourceAccount global condition context keys limit permissions to a specific source.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 238 — AWS Config + EventBridge + Lambda / IAM Key Rotation
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed3-q238',
            type: 'single',
            prompt:
                'A security team needs to enforce rotation of all IAM users\' access keys every 90 days. Keys older than 90 days must be automatically deactivated and removed. A solutions architect must create a remediation solution with minimal operational effort. Which solution meets these requirements?',
            options: [
                'Create an AWS Config rule to check key age. Configure the rule to run an AWS Batch job to remove the key.',
                'Create an Amazon EventBridge rule to check key age. Configure it to run an AWS Batch job to remove the key.',
                'Create an AWS Config rule to check key age. Define an EventBridge rule that schedules an AWS Lambda function to remove the key.',
                'Create an EventBridge rule to check key age. Define a second EventBridge rule to run an AWS Batch job to remove the key.',
            ],
            correctOptionIndex: 2,
            explanation:
                'AWS Config with the access-keys-rotated managed rule detects non-compliant access keys (older than 90 days). When AWS Config flags a resource as non-compliant, it generates an event that an Amazon EventBridge rule can filter on. The EventBridge rule then invokes an AWS Lambda function to deactivate and remove the old key, providing a fully automated, serverless remediation workflow.',
            incorrectOptionExplanations: {
                0: 'AWS Batch is designed for large-scale batch computing jobs, not for a simple event-driven task like removing a single access key. It is inefficient and overly complex.',
                1: 'An Amazon EventBridge rule on its own cannot check the key age; it requires AWS Config for detection. AWS Batch is also an inappropriate tool for this remediation task.',
                3: 'This architecture is unnecessarily complex. Using two EventBridge rules and the inefficient AWS Batch service is not optimal for this use case.',
            },
            references: [
                'AWS Config Managed Rules — access-keys-rotated: Checks whether active IAM access keys are rotated within the specified number of days.',
                'AWS Config Developer Guide — "Remediating Noncompliant AWS Resources - Automated remediation": EventBridge can send notifications or trigger Lambda when a resource becomes noncompliant.',
                'AWS Lambda Developer Guide: Lambda is designed for event-driven workloads, perfect for the remediation action.',
                'AWS Batch User Guide: AWS Batch enables running batch computing jobs at scale, which is excessive for removing a single access key.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 239 — RDS for Oracle + Secrets Manager Rotation / Oracle Migration
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed3-q239',
            type: 'single',
            prompt:
                'A company needs to migrate its customer transactions database from on premises to AWS. The database is an Oracle DB instance on Linux. A new requirement mandates rotating the database password yearly. Which solution provides this capability with the least operational overhead?',
            options: [
                'Convert the database to DynamoDB using AWS SCT. Store the password in Parameter Store. Use CloudWatch and Lambda for rotation.',
                'Migrate the database to Amazon RDS for Oracle. Store the password in AWS Secrets Manager. Turn on automatic rotation with a yearly rotation schedule.',
                'Migrate the database to an EC2 instance. Use Parameter Store to keep and rotate the connection string using a Lambda function with a yearly schedule.',
                'Migrate the database to Amazon Neptune using AWS SCT. Use CloudWatch and Lambda for yearly rotation.',
            ],
            correctOptionIndex: 1,
            explanation:
                'Amazon RDS for Oracle is a managed service that reduces administrative burden. AWS Secrets Manager provides native, automated rotation for Amazon RDS databases. Configuring a yearly rotation schedule in Secrets Manager requires minimal configuration and no custom code, directly fulfilling the requirement with the absolute minimum operational overhead.',
            incorrectOptionExplanations: {
                0: 'Converting from a relational database (Oracle) to a NoSQL database (DynamoDB) is a complex re-architecture, creating massive operational overhead.',
                2: 'Running a database on EC2 requires manual management of the OS, patching, and database software — higher operational overhead than managed Amazon RDS.',
                3: 'Migrating a transactional database to a graph database (Neptune) is an unsuitable and complex conversion, creating the highest possible operational overhead.',
            },
            references: [
                'AWS Secrets Manager User Guide — "Rotating your AWS Secrets Manager secrets": Provides a Lambda function to rotate secrets for supported databases including Amazon RDS.',
                'Amazon RDS User Guide — "What is Amazon RDS?": A managed service that reduces administrative burden for relational databases.',
                'AWS SCT User Guide: Describes complex heterogeneous database migrations, which are more operationally intensive than homogeneous migrations.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 240 — Block Public Access EBS Snapshots / Organization Level
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed3-q240',
            type: 'single',
            prompt:
                'A financial company is migrating banking applications to AWS accounts managed through AWS Organizations. The applications store sensitive customer data on Amazon EBS volumes, and the company takes regular snapshots for backups. The company must implement controls across all accounts to prevent sharing EBS snapshots publicly, with the least operational overhead. Which solution will meet these requirements?',
            options: [
                'Enable AWS Config rules for each OU to monitor EBS snapshot permissions.',
                'Enable block public access for EBS snapshots at the organization level.',
                'Create an IAM policy in the root account that prevents users from modifying snapshot permissions.',
                'Use AWS CloudTrail to track snapshot permission changes.',
            ],
            correctOptionIndex: 1,
            explanation:
                '"Block Public Access for EBS Snapshots" is a preventative security control that directly blocks any attempts to make EBS snapshots public, regardless of user IAM permissions. It can be set as a default for all new accounts at the AWS Organizations level, directly meeting the requirement with the least operational overhead.',
            incorrectOptionExplanations: {
                0: 'AWS Config rules are detective controls. They identify snapshots that are already public but do not prevent the action from occurring, creating a window of exposure.',
                2: 'An IAM policy in the management (root) account only applies to principals within that account; it does not propagate to or restrict actions in member accounts.',
                3: 'AWS CloudTrail is an auditing service. It records that a snapshot was made public but does not prevent the action from happening.',
            },
            references: [
                'Amazon EC2 User Guide — "Block public access for Amazon EBS snapshots": Recommends enabling this feature; describes the organization-level setting for new accounts.',
                'Amazon EC2 User Guide — "Default settings for EBS snapshots": Describes the organization-level control for enabling Block Public Access for new accounts.',
                'AWS Organizations User Guide — "Service control policies": SCPs are the mechanism for organization-wide permission guards.',
                'AWS Config Developer Guide — "What Is AWS Config?": AWS Config is a monitoring and detective tool, not a preventative control.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 241 — Secrets Manager / Lambda Versions / Aurora Rotation
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed3-q241',
            type: 'single',
            prompt:
                'A solutions architect is building a static website hosted on Amazon S3. The website uses an Amazon Aurora PostgreSQL database accessed through an AWS Lambda function. The production website uses a Lambda alias that points to a specific version of the Lambda function. Database credentials must rotate every 2 weeks. Previously deployed Lambda versions must always use the most recent credentials. Which solution will meet these requirements?',
            options: [
                'Store credentials in AWS Secrets Manager. Turn on rotation. Write code in the Lambda function to retrieve credentials from Secrets Manager.',
                'Include the credentials in the Lambda function code and update the function regularly.',
                'Use Lambda environment variables and update them when new credentials are available.',
                'Store credentials in AWS Systems Manager Parameter Store. Turn on rotation. Write code to retrieve credentials from Parameter Store.',
            ],
            correctOptionIndex: 0,
            explanation:
                'AWS Secrets Manager provides native, automated rotation for Amazon Aurora databases. By writing code in the Lambda function to retrieve the secret at runtime, any version of the function — including old immutable published versions — will always fetch the most current, valid credentials. This decouples the secret from the function\'s code and version-specific configuration.',
            incorrectOptionExplanations: {
                1: 'Hardcoding credentials in function code is a severe security anti-pattern, and old function versions would contain old, invalid credentials after rotation.',
                2: 'Lambda environment variables are locked to a specific function version upon publishing. Updating them for a new version does not change them for older, previously deployed versions.',
                3: 'While Parameter Store can store secrets, it does not offer native, automated rotation for Amazon Aurora that Secrets Manager provides.',
            },
            references: [
                'AWS Secrets Manager User Guide — "Rotate AWS Secrets Manager secrets": Provides automated rotation for RDS and Aurora databases.',
                'AWS Lambda Developer Guide — "Lambda function versions": Configuration including environment variables is locked for a published version; they cannot be changed.',
                'AWS Whitepaper — "AWS Security Best Practices": Do not hardcode secrets in application code; use AWS Secrets Manager.',
                'AWS Secrets Manager User Guide — "Comparing Secrets Manager and Parameter Store": Secrets Manager offers built-in rotation for Aurora; Parameter Store does not.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 242 — S3 Bucket Policy / Cross-Account Access
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed3-q242',
            type: 'single',
            prompt:
                'A company stores data in a centralized S3 bucket in Account A. It needs to grant Account B access to this bucket. Both accounts belong to the company. Which solution meets this requirement?',
            options: [
                'Enable S3 Transfer Acceleration for Account B.',
                'Enable cross-Region replication between accounts.',
                'Use CloudFront with signed URLs to grant access.',
                'Create a bucket policy granting Account B access to the bucket in Account A.',
            ],
            correctOptionIndex: 3,
            explanation:
                'The most direct and standard method for granting another AWS account access to an S3 bucket is by using an S3 bucket policy. The policy is attached to the S3 bucket in Account A, with the Principal element specifying Account B\'s account ID. The policy defines the specific S3 actions that Account B is allowed to perform.',
            incorrectOptionExplanations: {
                0: 'S3 Transfer Acceleration is a network optimization feature that speeds up data transfers; it does not provide any access control capabilities.',
                1: 'Cross-Region replication creates a copy of S3 objects in a bucket in another account and region. It does not grant access to the original bucket.',
                2: 'CloudFront with signed URLs grants temporary, time-limited access to individual objects for end-users, not persistent bucket-level access to another AWS account.',
            },
            references: [
                'AWS S3 Developer Guide — "Bucket policy examples": Provides examples of granting cross-account permissions using bucket policies with an AWS account as the Principal.',
                'AWS S3 Developer Guide — "How Amazon S3 authorizes a request": Explains how resource-based policies are evaluated for cross-account principals.',
                'AWS S3 Developer Guide — "S3 Transfer Acceleration": For speeding up transfers, not access control.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 243 — S3 Bucket Policy / Deny + StringNotEquals + aws:SourceVpc
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed3-q243',
            type: 'single',
            prompt:
                'A solutions architect needs to ensure that only resources in VPC vpc-11aabb22 can access an S3 bucket in account 123456789012 with Block Public Access enabled. Which solution meets this requirement?',
            options: [
                'Create a bucket policy with Deny and a Condition using "StringNotEquals": "aws:SourceVpc": "vpc-11aabb22".',
                'Create a bucket policy with Allow and Resource "arn:aws:ec2:us-west-2:123456789012:vpc/vpc-11aabb22".',
                'Create a bucket policy with Allow and a Condition using "StringNotEquals": "aws:SourceVpc": "vpc-11aabb22".',
                'Create a bucket policy with Deny and "StringNotEquals": "aws:PrincipalAccount": "123456789012".',
            ],
            correctOptionIndex: 0,
            explanation:
                'A bucket policy with an explicit Deny combined with the StringNotEquals operator on the aws:SourceVpc condition key denies all actions to any principal when the request does not originate from the specified VPC. An explicit Deny always overrides any Allow, making this a robust security control. A VPC endpoint for S3 must be configured in the specified VPC for this policy to function.',
            incorrectOptionExplanations: {
                1: 'The Resource element in an S3 bucket policy must specify an S3 ARN (e.g., arn:aws:s3:::bucket-name), not a VPC ARN. This syntax is invalid.',
                2: 'This policy would Allow access to any request where the source VPC is not vpc-11aabb22, which is the exact opposite of the stated requirement.',
                3: 'This policy restricts access based on the AWS account of the principal, not the network origin (VPC).',
            },
            references: [
                'AWS S3 Documentation — "Example bucket policies for VPC endpoints for Amazon S3": Provides a policy with Effect: "Deny" and a Condition using StringNotEquals on aws:sourceVpc.',
                'AWS IAM Documentation — "IAM JSON policy elements: Condition": StringNotEquals operator creates a condition true if the specified key does not match the policy value.',
                'AWS IAM Documentation — "Policy evaluation logic": A single Deny statement that is satisfied makes the final decision Deny.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 244 — Lake Formation Blueprint + Column-Level Security / QuickSight
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed3-q244',
            type: 'single',
            prompt:
                'A company uses AWS Lake Formation to govern its S3 data lake. It wants to visualize data in QuickSight by joining S3 data with Aurora MySQL operational data. The marketing team must see only specific columns. Which solution provides column-level authorization with the least operational overhead?',
            options: [
                'Use EMR to ingest database data into SPICE with only required columns.',
                'Use AWS Glue Studio to ingest database data into S3 and use IAM policies for column control.',
                'Use AWS Glue Elastic Views to create materialized S3 views with column restrictions.',
                'Use a Lake Formation blueprint to ingest database data to S3. Use Lake Formation for column-level access control. Use Athena as the QuickSight data source.',
            ],
            correctOptionIndex: 3,
            explanation:
                'Lake Formation blueprints provide a simplified, template-based method to ingest data from Aurora MySQL into the S3 data lake. Lake Formation\'s core feature of fine-grained access control supports column-level permissions. Amazon Athena as the QuickSight data source enforces these column-level permissions, ensuring marketing team visualizations are built only from authorized columns.',
            incorrectOptionExplanations: {
                0: 'Using Amazon EMR involves managing clusters and custom jobs, representing significantly higher operational overhead compared to using a managed Lake Formation blueprint.',
                1: 'IAM policies do not provide column-level access control for data within S3 objects. IAM governs access to AWS resources and actions, not the content inside files.',
                2: 'AWS Glue Elastic Views was discontinued as of November 30, 2022, and is no longer a viable service.',
            },
            references: [
                'AWS Lake Formation Developer Guide — "How Lake Formation access control works": Supports granting permissions on databases, tables, and columns.',
                'AWS Lake Formation Developer Guide — "Ingesting data using blueprints and workflows": Blueprints provide easy-to-use templates for ingesting data from relational databases.',
                'Amazon Athena User Guide — "Accessing data registered with AWS Lake Formation": Athena enforces Lake Formation permissions including column-level security.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 245 — KMS Multi-Region Keys + ABAC / Global Encryption
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed3-q245',
            type: 'single',
            prompt:
                'A home security company is expanding globally and needs to encrypt customer data. The company does not want to manage encryption keys. The keys must be usable in multiple AWS Regions, and access to the keys must be controlled. Which solution meets these requirements with the least operational overhead?',
            options: [
                'Use AWS KMS multi-Region keys. Apply tags and use ABAC condition keys for access control.',
                'Use AWS KMS imported key material in multiple Regions with ABAC-based policies.',
                'Use AWS CloudHSM and synchronize clusters across Regions with the CMU tool.',
                'Use AWS CloudHSM users and share keys manually with CMU across Regions.',
            ],
            correctOptionIndex: 0,
            explanation:
                'AWS KMS multi-Region keys share the same key ID and key material across specified Regions, simplifying cross-Region data encryption and decryption without requiring the company to manage key material or synchronization. ABAC with tags provides a scalable and flexible access control method with minimal management effort.',
            incorrectOptionExplanations: {
                1: 'Importing key material (BYOK) requires the company to generate, secure, and manage its own keys, directly contradicting the requirement not to manage keys and adding operational overhead.',
                2: 'AWS CloudHSM places significant key management and cluster synchronization responsibilities on the customer, resulting in much higher operational overhead than managed KMS.',
                3: 'Managing access control within CloudHSM via CMU and shareKey commands is a manual, complex process compared to using IAM policies with ABAC.',
            },
            references: [
                'AWS KMS Developer Guide — "Multi-Region keys": Keys in different Regions that can be used interchangeably; AWS manages the key material.',
                'AWS KMS Developer Guide — "ABAC for AWS KMS": Tags and aliases can be used for attribute-based access control on KMS keys.',
                'AWS KMS Developer Guide — "Choosing AWS KMS key material origin": Importing key material requires the customer to manage it.',
                'AWS CloudHSM User Guide: Customers control and manage their own keys, resulting in higher operational overhead.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 246 — S3 Bucket Policy / IP Restriction / Block Public Access Compatible
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed3-q246',
            type: 'single',
            prompt:
                'A company stores a file in an S3 bucket containing IP allow/deny lists. The file must be accessible via an HTTP endpoint. Firewalls outside AWS must read the file. The company wants to restrict access to only the firewall IP addresses. The S3 Block Public Access feature is enabled on the account. Which solution meets these requirements?',
            options: [
                'Host the bucket as a static website and restrict access by IP.',
                'Create a bucket policy that explicitly allows access only from the firewall IP addresses.',
                'Create a CloudFront distribution with the S3 bucket as the origin. Use an origin access control (OAC) that allows access only from the firewall IP addresses.',
                'Create a Lambda function to validate IP addresses and return the lists.',
            ],
            correctOptionIndex: 1,
            explanation:
                'An Amazon S3 bucket policy using the aws:SourceIp condition key can explicitly grant s3:GetObject permission to specific IP addresses. A bucket policy that restricts access to a specific set of IP addresses is not considered "public" by the S3 Block Public Access feature, making this solution fully compatible with the account-level security setting.',
            incorrectOptionExplanations: {
                0: 'Hosting as a static website generally requires making objects public, which is prevented by the S3 Block Public Access setting enabled on the account.',
                2: 'CloudFront Origin Access Control restricts access to the S3 bucket to the CloudFront distribution itself, not to the end-user\'s IP address. Filtering user IPs would require AWS WAF.',
                3: 'Using a Lambda function introduces unnecessary complexity and cost when S3 bucket policies provide a native, simpler solution for IP-based access control.',
            },
            references: [
                'AWS S3 Documentation — "Bucket policy examples - Restricting access to specific IP addresses": Uses the Condition element with IpAddress operator and aws:SourceIp condition key.',
                'AWS S3 Documentation — "Meaning of \'public\'": A policy restricting access to specific IP addresses is not considered public by the Block Public Access feature.',
                'AWS CloudFront Documentation — "Restricting access to an Amazon S3 origin": OAC secures the origin, not filtering viewer requests by IP.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 247 — EC2 + DynamoDB + VPC Endpoint + Instance Profile / Private App
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed3-q247',
            type: 'single',
            prompt:
                'An insurance company is creating an application to record personal user data. The data includes users\' names, ages, and health data. The company wants to run the application in a private subnet on AWS. Because of data security requirements, the company must have access to the operating system of the compute resources that run the application tier. The company must use a low-latency NoSQL database to store the data. Which solution will meet these requirements?',
            options: [
                'Use Amazon EC2 instances for the application tier. Use an Amazon DynamoDB table for the database tier. Create a VPC endpoint for DynamoDB. Assign the instances an instance profile that has permission to access DynamoDB.',
                'Use AWS Lambda functions for the application tier. Use an Amazon DynamoDB table for the database tier. Assign a Lambda function an appropriate IAM role to access the table.',
                'Use AWS Fargate for the application tier. Create an Amazon Aurora PostgreSQL instance inside a private subnet for the database tier.',
                'Use Amazon EC2 instances for the application tier. Use an Amazon S3 bucket to store the data in JSON format. Configure the application to use Amazon Athena to read and write the data to and from the S3 bucket.',
            ],
            correctOptionIndex: 0,
            explanation:
                'Amazon EC2 instances provide the necessary OS access. Amazon DynamoDB is a fully managed NoSQL database delivering single-digit millisecond performance. A VPC gateway endpoint for DynamoDB allows the private subnet instances to communicate with DynamoDB without traversing the public internet. An IAM instance profile securely grants permissions.',
            incorrectOptionExplanations: {
                1: 'AWS Lambda is a serverless compute service and does not provide the required access to the underlying operating system.',
                2: 'AWS Fargate abstracts the OS, and Amazon Aurora is a relational (SQL) database, not NoSQL.',
                3: 'Amazon S3 with Amazon Athena is an object storage and analytics query service, not a low-latency NoSQL database suitable for an application tier.',
            },
            references: [
                'Amazon EC2 Documentation — "What is Amazon EC2?": You have complete control and root access to each EC2 instance.',
                'Amazon DynamoDB Documentation — "What is Amazon DynamoDB?": Fully managed, serverless NoSQL database with single-digit millisecond performance.',
                'AWS VPC User Guide — "Gateway VPC endpoints": Supports Amazon DynamoDB for private VPC connectivity.',
                'AWS IAM User Guide — "IAM roles for Amazon EC2": An instance profile is a container for an IAM role passed to EC2 at launch.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 248 — RDS IAM Authentication / EC2 IAM Role / No Stored Credentials
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed3-q248',
            type: 'single',
            prompt:
                'A company is designing a secure solution to grant access to its Amazon RDS for PostgreSQL database. Applications that run on Amazon EC2 instances must be able to securely authenticate to the database without storing long-term credentials. Which solution will meet these requirements?',
            options: [
                'Enable RDS IAM authentication and configure AWS Secrets Manager to store database credentials. Configure applications to retrieve credentials at runtime.',
                'Configure a custom IAM policy for the database that allows access from the EC2 instances\' IP addresses. Configure applications to use a static password to authenticate to the database.',
                'Set up an IAM user for each application. Store the access key ID and secret access key in the EC2 instances\' environment variables. Grant the IAM users permission to the database.',
                'Use IAM roles to assign permissions to the EC2 instances. Configure the applications to obtain a token from the RDS database to authenticate by using IAM authentication.',
            ],
            correctOptionIndex: 3,
            explanation:
                'By attaching an IAM role to the EC2 instances, applications acquire temporary security credentials automatically. With IAM database authentication enabled on the RDS instance, the application uses these credentials to generate a short-lived authentication token used as the database connection password. This eliminates the need to store static, long-term credentials.',
            incorrectOptionExplanations: {
                0: 'Secrets Manager stores and rotates traditional username/password credentials, which is a different mechanism from token-based IAM database authentication that eliminates passwords entirely.',
                1: 'This approach uses a static password, which is a long-term credential and explicitly violates the requirements.',
                2: 'Using IAM user access keys requires storing long-term credentials on the EC2 instances, which is a security anti-pattern and violates the core requirement.',
            },
            references: [
                'AWS Documentation — "IAM database authentication for MariaDB, MySQL, and PostgreSQL": With IAM database authentication, you use an authentication token instead of a password. IAM roles for EC2 provide temporary credentials.',
                'AWS Documentation — "IAM roles for Amazon EC2": IAM roles provide secure, temporary credentials without long-term credential management.',
                'AWS Documentation — "Creating and using an IAM policy for IAM database access": The policy grants rds-db:connect action to the IAM role.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 249 — KMS Multi-Region Keys + ABAC / Global Home Security
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed3-q249',
            type: 'single',
            prompt:
                'A home security company is expanding its business globally. The company needs to encrypt customer data. The company does not want to manage its own keys. The company needs the keys to be usable in multiple AWS Regions and needs to control access to the keys. Which solution will meet these requirements with the LEAST operational overhead?',
            options: [
                'Use AWS Key Management Service (AWS KMS) to create multi-Region keys. Apply tags to identify each key. Use attribute-based access control (ABAC) condition keys to control access to the keys.',
                'Use AWS Key Management Service (AWS KMS) to create multiple keys by importing key material. Apply tags to identify each key. Use attribute-based access control (ABAC) condition keys to control access to the keys.',
                'Use AWS CloudHSM to create a CloudHSM cluster in the company\'s primary Region. Synchronize the CloudHSM cluster to additional Regions by using the CloudHSM Management Utility (CMU).',
                'Use AWS CloudHSM to create users. Use the CloudHSM Management Utility (CMU) to share keys with the users. Use the shareKey command to share or unshare the key with additional users in each Region.',
            ],
            correctOptionIndex: 0,
            explanation:
                'AWS KMS multi-Region keys are specifically designed for global businesses, allowing encryption in one Region and decryption in another without managing key material or synchronization. The company doesn\'t manage the key material since AWS manages it. ABAC with tags provides scalable, flexible access control with minimal management effort.',
            incorrectOptionExplanations: {
                1: 'Importing key material (BYOK) requires the company to generate, secure, and manage its own keys, directly contradicting the requirement not to manage keys.',
                2: 'AWS CloudHSM places significant key management and synchronization responsibilities on the customer, resulting in much higher operational overhead than managed KMS.',
                3: 'Managing access control within CloudHSM via CMU and shareKey commands is a manual and complex process with high operational overhead.',
            },
            references: [
                'AWS KMS Developer Guide — "Multi-Region keys": Multi-Region keys can be used interchangeably across Regions; AWS manages the key material.',
                'AWS KMS Developer Guide — "ABAC for AWS KMS": Tags and aliases can control access using ABAC strategy.',
                'AWS KMS Developer Guide — "Choosing AWS KMS key material origin": Importing key material requires customer management.',
                'AWS CloudHSM User Guide: Customers control and manage their own keys — higher overhead.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 250 — Lake Formation Blueprint + Column Access / QuickSight Athena
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed3-q250',
            type: 'single',
            prompt:
                'A company has an Amazon S3 data lake that is governed by AWS Lake Formation. The company wants to create a visualization in Amazon QuickSight by joining the data in the data lake with operational data that is stored in an Amazon Aurora MySQL database. The company wants to enforce column-level authorization so that the company\'s marketing team can access only a subset of columns in the database. Which solution will meet these requirements with the LEAST operational overhead?',
            options: [
                'Use Amazon EMR to ingest the data directly from the database to the QuickSight SPICE engine. Include only the required columns.',
                'Use AWS Glue Studio to ingest the data from the database to the S3 data lake. Attach an IAM policy to the QuickSight users to enforce column-level access control. Use Amazon S3 as the data source in QuickSight.',
                'Use AWS Glue Elastic Views to create a materialized view for the database in Amazon S3. Create an S3 bucket policy to enforce column-level access control for the QuickSight users. Use Amazon S3 as the data source in QuickSight.',
                'Use a Lake Formation blueprint to ingest the data from the database to the S3 data lake. Use Lake Formation to enforce column-level access control for the QuickSight users. Use Amazon Athena as the data source in QuickSight.',
            ],
            correctOptionIndex: 3,
            explanation:
                'A Lake Formation blueprint automates creating an AWS Glue workflow to ingest data from Aurora MySQL into the S3 data lake. Lake Formation\'s centralized, fine-grained access controls support column-level permissions for the marketing team. Athena as the QuickSight data source enforces these column-level permissions, extending the existing governance model with minimal operational overhead.',
            incorrectOptionExplanations: {
                0: 'Using Amazon EMR introduces significant operational overhead for managing clusters and jobs, and doesn\'t provide a dynamic column-level authorization mechanism.',
                1: 'IAM policies for Amazon S3 operate at the object level and do not support column-level access control within the data files themselves.',
                2: 'S3 bucket policies cannot enforce column-level access control. They manage permissions at the bucket and object level, not on the data inside objects.',
            },
            references: [
                'AWS Lake Formation Developer Guide — "Blueprints and workflows in Lake Formation - Database blueprints": Supports ingesting data from JDBC sources like Amazon Aurora.',
                'AWS Lake Formation Developer Guide — "Security and access control - Granting column-level permissions": Can grant SELECT permission on individual columns in a table.',
                'Amazon QuickSight User Guide — "Authorizing connections to Amazon Athena": QuickSight queries Athena; Athena checks Lake Formation permissions, enforcing column-level security.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 251 — Secrets Manager / Lambda Versions / Aurora Rotation (duplicate topic)
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed3-q251',
            type: 'single',
            prompt:
                'A company\'s solutions architect is building a static website to be deployed in Amazon S3 for a production environment. The website integrates with an Amazon Aurora PostgreSQL database by using an AWS Lambda function. The website that is deployed to production will use a Lambda alias that points to a specific version of the Lambda function. The company must rotate the database credentials every 2 weeks. Lambda functions that the company deployed previously must be able to use the most recent credentials. Which solution will meet these requirements?',
            options: [
                'Store the database credentials in AWS Secrets Manager. Turn on rotation. Write code in the Lambda function to retrieve the credentials from Secrets Manager.',
                'Include the database credentials as part of the Lambda function code. Update the credentials periodically and deploy the new Lambda function.',
                'Use Lambda environment variables. Update the environment variables when new credentials are available.',
                'Store the database credentials in AWS Systems Manager Parameter Store. Turn on rotation. Write code in the Lambda function to retrieve the credentials from Systems Manager Parameter Store.',
            ],
            correctOptionIndex: 0,
            explanation:
                'AWS Secrets Manager provides native, automated rotation for Aurora PostgreSQL databases. By writing code in the Lambda function to retrieve the secret at runtime, even old immutable Lambda function versions (referenced by an alias) will always fetch the most current credentials upon invocation.',
            incorrectOptionExplanations: {
                1: 'Hardcoding credentials requires a new deployment for every rotation, which would break older immutable function versions and is a security risk.',
                2: 'Lambda environment variables are locked to a specific function version upon publishing. Updating them requires creating a new version, failing the requirement for older versions to work.',
                3: 'While Parameter Store can store secrets, it does not have a native, built-in feature for automatically rotating database credentials like Secrets Manager does for Amazon Aurora.',
            },
            references: [
                'AWS Secrets Manager User Guide — "Rotate secrets": For databases such as Amazon Aurora, Secrets Manager can configure automatic rotation using a Lambda function.',
                'AWS Lambda Developer Guide — "Lambda function versions": A version is an immutable snapshot; configuration including environment variables cannot be changed for a published version.',
                'AWS Whitepapers — "AWS Security Best Practices": Strongly recommends not storing secrets in configuration files or source code; use Secrets Manager.',
                'AWS Well-Architected Framework — Security Pillar: Secrets Manager offers built-in rotation with integration for Amazon Aurora.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 252 — Block Public Access EBS Snapshots / Organizations (duplicate topic)
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed3-q252',
            type: 'single',
            prompt:
                'A financial company is migrating its banking applications to a set of AWS accounts managed by AWS Organizations. The applications will store sensitive customer data on Amazon Elastic Block Store (Amazon EBS) volumes. The company will take regular snapshots for backup purposes. The company wants to implement controls across all AWS accounts to prevent sharing EBS snapshots publicly. Which solution will meet these requirements with the LEAST operational overhead?',
            options: [
                'Enable AWS Config rules for each organizational unit (OU) in Organizations to monitor EBS snapshot permissions.',
                'Enable block public access for EBS snapshots at the organization level.',
                'Create an IAM policy in the root account of the organization that prevents users from modifying snapshot permissions.',
                'Use AWS CloudTrail to track snapshot permission changes.',
            ],
            correctOptionIndex: 1,
            explanation:
                'The "Block Public Access for EBS Snapshots" feature enforced via an SCP at the organization level is a preventive control that directly blocks API calls attempting to make an EBS snapshot public. A single SCP at the organization\'s root or relevant OU ensures no user or role in any member account can publicly share snapshots, satisfying the requirement with the least operational overhead.',
            incorrectOptionExplanations: {
                0: 'AWS Config is a detective control. It identifies snapshots that are already public but does not prevent the action from occurring, creating a window of exposure.',
                2: 'An IAM policy in the management (root) account only applies to principals within that account; it does not propagate to or restrict actions in member accounts.',
                3: 'AWS CloudTrail records that a snapshot was made public but provides no mechanism to prevent the action from happening.',
            },
            references: [
                'Amazon EC2 User Guide — "Block public access for EBS snapshots": An SCP can prevent users from publicly sharing snapshots by denying ec2:ModifySnapshotAttribute.',
                'AWS Organizations User Guide — "Service control policies": SCPs provide a preventive, organization-wide permission guardrail.',
                'AWS Config Developer Guide: AWS Config is a monitoring and detective tool, not a preventative control.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 253 — EC2 Image Builder / update-linux / Patched AMIs
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed3-q253',
            type: 'single',
            prompt:
                'A company hosts dozens of multi-tier applications on AWS. The presentation layer and logic layer are comprised of Amazon EC2 Linux instances that use Amazon Elastic Block Store (Amazon EBS) volumes. The company needs a solution to ensure that operating system vulnerabilities are not introduced to the EC2 instances when the company deploys new features. The company uses custom AMIs to deploy the EC2 instances in an Auto Scaling group. The solution must scale to handle all applications that the company hosts. Which solution will meet these requirements?',
            options: [
                'Use Amazon Inspector to patch operating system vulnerabilities. Invoke Amazon Inspector when a new AMI is deployed.',
                'Use AWS Backup to back up the EBS volume of each updated instance. Use the EBS backup volumes to create new AMIs. Use the existing Auto Scaling group to deploy the new AMIs.',
                'Use AWS Systems Manager Patch Manager to patch operating system vulnerabilities in the custom AMIs.',
                'Use EC2 Image Builder to create new AMIs when the company deploys new features. Include the update-linux component in the build components of the new AMIs. Use the existing Auto Scaling group to deploy the new AMIs.',
            ],
            correctOptionIndex: 3,
            explanation:
                'EC2 Image Builder is a fully managed service that automates the creation of customized, secure, and up-to-date server images. By including the AWS-managed update-linux component in the image recipe, the pipeline automatically applies all available OS updates during the build process. The resulting patched AMI can then be used to update the Auto Scaling group\'s launch template.',
            incorrectOptionExplanations: {
                0: 'Amazon Inspector is a vulnerability assessment service that scans for vulnerabilities; it does not patch or remediate them.',
                1: 'This describes a manual process for creating an AMI from a running instance without an inherent patching step. It is not a scalable, automated solution.',
                2: 'AWS Systems Manager Patch Manager applies patches to a fleet of running EC2 instances, not to build new patched AMIs directly.',
            },
            references: [
                'EC2 Image Builder User Guide — "What Is EC2 Image Builder?": Simplifies the creation, patching, testing, distribution, and sharing of Linux or Windows Server images.',
                'EC2 Image Builder User Guide — "AWS Task Orchestrator and Executor (AWSTOE) components": The update-linux component updates all packages on the Linux system.',
                'Amazon Inspector User Guide: A vulnerability assessment service that scans workloads, not a patching service.',
                'AWS Systems Manager User Guide — "AWS Systems Manager Patch Manager": Automates patching managed running nodes, not AMI creation.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 254 — SCP Deployment / Attach to Member Accounts or OU (Multi-select)
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed3-q254',
            type: 'multiple',
            prompt:
                'A company has an organization in AWS Organizations. The company runs Amazon EC2 instances across four AWS accounts in the root organizational unit (OU). There are three nonproduction accounts and one production account. The company wants to prohibit users from launching EC2 instances of a certain size in the nonproduction accounts. The company has created a service control policy (SCP) to deny access to launch instances that use the prohibited types. Which solutions to deploy the SCP will meet these requirements? (Select TWO.)',
            options: [
                'Attach the SCP to the root OU for the organization.',
                'Attach the SCP to the three nonproduction Organizations member accounts.',
                'Attach the SCP to the Organizations management account.',
                'Create an OU for the production account. Attach the SCP to the OU. Move the production member account into the new OU.',
                'Create an OU for the required accounts. Attach the SCP to the OU. Move the nonproduction member accounts into the new OU.',
            ],
            correctOptionIndexes: [1, 4],
            explanation:
                'The objective is to apply the SCP exclusively to the three nonproduction accounts: (B) Attach the SCP directly to each of the three nonproduction member accounts. (E) Create a new OU, move the three nonproduction accounts into it, and attach the SCP to the OU — the policy is inherited by all accounts within that OU.',
            incorrectOptionExplanations: {
                0: 'Attaching the SCP to the root OU would incorrectly apply the restriction to all accounts including the production account.',
                2: 'SCPs do not affect the management account; they only apply to member accounts, so this action would have no effect on the target accounts.',
                3: 'This applies the restriction to the production account, which is the opposite of the stated requirement.',
            },
            references: [
                'AWS Organizations User Guide — "Attaching and detaching service control policies": SCPs can be attached to an account itself, or to a root or OU that contains the account.',
                'AWS Organizations User Guide — "Inheritance for SCPs": An SCP attached to a root or OU is inherited by all AWS accounts in that entity.',
                'AWS Organizations User Guide — "Service control policies": SCPs don\'t affect users or roles in the management account; they affect only member accounts.',
                'AWS Organizations User Guide — "Strategies for using SCPs": Recommends grouping accounts with similar needs into OUs and attaching SCPs to OUs.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 255 — Lake Formation Data Filters / Row and Cell Level Security
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed3-q255',
            type: 'single',
            prompt:
                'A company is building a data analysis platform on AWS by using AWS Lake Formation. The platform will ingest data from different sources such as Amazon S3 and Amazon RDS. The company needs a secure solution to prevent access to portions of the data that contain sensitive information. Which solution will meet these requirements with the LEAST operational overhead?',
            options: [
                'Create an IAM role that includes permissions to access Lake Formation tables.',
                'Create data filters to implement row-level security and cell-level security.',
                'Create an AWS Lambda function that removes sensitive information before Lake Formation ingests the data.',
                'Create an AWS Lambda function that periodically queries and removes sensitive information from Lake Formation tables.',
            ],
            correctOptionIndex: 1,
            explanation:
                'AWS Lake Formation provides native capabilities for fine-grained access control including row-level and cell-level security through "data filters." Data filters restrict which rows and columns users can see when they query data. This is a managed, declarative approach that requires the least operational overhead compared to developing and maintaining custom Lambda code.',
            incorrectOptionExplanations: {
                0: 'IAM roles grant coarse-grained permissions (e.g., access to an entire table) and are insufficient for securing specific rows or cells within a table.',
                2: 'Using a Lambda function to remove sensitive data before ingestion requires custom code and permanently alters the source data — high operational overhead.',
                3: 'A Lambda function that periodically removes data is inefficient, reactive, and introduces high operational overhead and data consistency challenges.',
            },
            references: [
                'AWS Lake Formation Developer Guide — "Data filtering and cell-level security in Lake Formation": Data filters implement row-level and cell-level security.',
                'AWS Lake Formation Developer Guide — "Overview of Lake Formation permissions": Lake Formation permissions provide fine-grained access that complements broader IAM permissions.',
                'AWS Big Data Blog — "Govern your data lake centrally with AWS Lake Formation": Row-level security can be specified as a filter on a table for subsequent queries.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 256 — DynamoDB TTL via Lambda / User Data Deletion GDPR
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed3-q256',
            type: 'single',
            prompt:
                'A company is creating a mobile financial app that gives users the ability to sign up and store personal information. The app uses an Amazon DynamoDB table to store user details and preferences. The app generates a credit score report by using the data that is stored in DynamoDB. The app sends credit score reports to users once every month. The company needs to provide users with an option to remove their data and preferences. The app must delete customer data within one month of receiving a request to delete the data. Which solution will meet these requirements with the LEAST operational overhead?',
            options: [
                'Create an AWS Lambda function to delete user information. Create an Amazon EventBridge rule that runs when a specified TTL expires. Configure the EventBridge rule to invoke the Lambda function.',
                'Create a DynamoDB stream. Create an AWS Lambda function to delete user information. When a specified TTL expires, write user information to the DynamoDB stream from the DynamoDB table. Configure the DynamoDB stream to invoke the Lambda function to delete user information.',
                'Enable TTL in DynamoDB. Set the expiration date as an attribute. Create an AWS Lambda function to set the TTL based on the expiration date value. Invoke the Lambda function when a user requests to delete personal data.',
                'Enable TTL in DynamoDB. Create an AWS Lambda function to delete user information. Configure AWS Config to detect the DynamoDB stage change when TTL expires and to invoke the Lambda function.',
            ],
            correctOptionIndex: 2,
            explanation:
                'When a user requests data deletion, a Lambda function updates the user\'s item in DynamoDB with a TTL attribute set to one month in the future. With TTL enabled on the table, DynamoDB\'s managed background process automatically checks for and deletes items whose TTL timestamp has passed, requiring no custom scheduling or scanning logic.',
            incorrectOptionExplanations: {
                0: 'DynamoDB TTL expirations do not natively emit events to Amazon EventBridge. This architecture proposes a non-existent trigger mechanism.',
                1: 'A DynamoDB stream is populated after an item is deleted by TTL. The Lambda function\'s described purpose — to delete the data — is redundant as the deletion has already occurred.',
                3: 'AWS Config is a service for assessing resource configurations, not for tracking or reacting to item-level data plane operations like TTL deletions.',
            },
            references: [
                'Amazon DynamoDB Developer Guide — "Expiring Items by Using DynamoDB Time to Live (TTL)": TTL automatically deletes expired items at no extra cost without write throughput consumption.',
                'Amazon DynamoDB Developer Guide — "TTL and DynamoDB Streams": Each item deleted by TTL generates a delete stream record; the deletion happens first.',
                'AWS Config Developer Guide — "AWS Resource and Property Types Reference": AWS Config tracks DynamoDB table configuration properties, not individual item deletions.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 257 — ALB + WAF / HTTPS Header Routing + Malicious Request Blocking
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed3-q257',
            type: 'single',
            prompt:
                'A company is building a web application. The company needs a load balancing solution that supports HTTPS header-based routing. The company\'s security team also requires a rules-based method of blocking specific incoming requests to decrease the effects of malicious activity. Which solution will meet these requirements?',
            options: [
                'Create an Application Load Balancer (ALB). Configure an HTTPS listener with mutual TLS enabled.',
                'Create an Application Load Balancer (ALB). Integrate the ALB with AWS WAF. Configure the security team\'s required rules.',
                'Create an Application Load Balancer (ALB). Integrate the ALB with AWS Config. Apply custom rules to all ALB resources.',
                'Create a Network Load Balancer (NLB). Configure AWS Network Firewall with the security team\'s required rules.',
            ],
            correctOptionIndex: 1,
            explanation:
                'An ALB operates at Layer 7 and supports advanced routing rules based on HTTP/S headers, paths, and methods. AWS WAF integrates directly with an ALB to protect against common web exploits and allows creation of custom, rules-based filters to block malicious requests. Together they fulfill both requirements.',
            incorrectOptionExplanations: {
                0: 'Mutual TLS on an ALB is for client authentication (verifying client identity via certificates), not for general rules-based blocking of malicious web traffic.',
                2: 'AWS Config is a service for auditing and evaluating resource configurations for compliance. It does not inspect or filter live web traffic.',
                3: 'An NLB operates at Layer 4 and cannot perform routing based on Layer 7 HTTPS headers. AWS Network Firewall also operates at the network layer, not the application layer.',
            },
            references: [
                'AWS Elastic Load Balancing User Guide — "What is an Application Load Balancer?": ALB functions at Layer 7 and can route requests based on application traffic content.',
                'AWS WAF Developer Guide — "What is AWS WAF?": WAF protects web applications from common web exploits; can be deployed on ALBs.',
                'Elastic Load Balancing User Guide — "Listener authentication - Mutual authentication": mTLS authenticates clients using certificates, not for general request blocking.',
                'Elastic Load Balancing User Guide — "What is a Network Load Balancer?": NLB functions at Layer 4 (transport layer), not suitable for header-based routing.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 258 — Individual IAM Roles per Microservice / Least Privilege
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed3-q258',
            type: 'single',
            prompt:
                'A company is designing a microservice-based architecture for a new application on AWS. Each microservice will run on its own set of Amazon EC2 instances. Each microservice will need to interact with multiple AWS services. The company wants to manage permissions for each EC2 instance according to the principle of least privilege. Which solution will meet this requirement with the LEAST administrative overhead?',
            options: [
                'Assign an IAM user to each microservice. Use access keys that are stored within the application code to authenticate AWS service requests.',
                'Create a single IAM role that has permission to access all AWS services. Add the IAM role to an instance profile that is associated with the EC2 instances.',
                'Use AWS Organizations to create a separate account for each microservice. Manage permissions at the account level.',
                'Create individual IAM roles based on the specific needs of each microservice. Add each IAM role to an instance profile that is associated with the appropriate EC2 instance.',
            ],
            correctOptionIndex: 3,
            explanation:
                'Individual IAM roles scoped to each microservice\'s specific API actions, attached via instance profiles, provide the tightest permission boundaries with the least ongoing administrative effort. The Instance Metadata Service delivers short-lived, automatically-rotated credentials, eliminating hard-coded keys and satisfying the principle of least privilege.',
            incorrectOptionExplanations: {
                0: 'Hard-coded access keys violate security best practices, require manual rotation, and grant static long-lived credentials — high overhead and risk.',
                1: 'One broad role grants every microservice more permissions than required, breaking least-privilege guidance.',
                2: 'Separate accounts add billing, networking, logging, and cross-account governance overhead — overkill for simply isolating IAM permissions.',
            },
            references: [
                'AWS IAM User Guide — "IAM Roles for Amazon EC2": Using instance profiles to attach roles provides temporary, automatically-rotated credentials.',
                'AWS Well-Architected Framework — Security Pillar: Implement least privilege access.',
                'AWS Whitepaper — "Microservices on AWS" — Security section: Use IAM roles per microservice.',
                'Amazon EC2 User Guide — "IAM roles": IAM role credentials on EC2 are automatically rotated via the instance metadata service.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 259 — RDS Proxy / Reduce Failover Time / Application Timeouts
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed3-q259',
            type: 'single',
            prompt:
                'A global ecommerce company runs its critical workloads on AWS. The workloads use an Amazon RDS for PostgreSQL DB instance that is configured for a Multi-AZ deployment. Customers have reported application timeouts when the company undergoes database failovers. The company needs a resilient solution to reduce failover time. Which solution will meet these requirements?',
            options: [
                'Create an Amazon RDS Proxy. Assign the proxy to the DB instance.',
                'Create a read replica for the DB instance. Move the read traffic to the read replica.',
                'Enable Performance Insights. Monitor the CPU load to identify the timeouts.',
                'Take regular automatic snapshots. Copy the automatic snapshots to multiple AWS Regions.',
            ],
            correctOptionIndex: 0,
            explanation:
                'Amazon RDS Proxy maintains a pool of established connections to the RDS database instance. During a database failover, the application\'s connections to the proxy remain active. The proxy automatically detects the failover and routes traffic to the newly promoted primary instance, often in seconds, without dropping application connections.',
            incorrectOptionExplanations: {
                1: 'A read replica is used for scaling read traffic and does not reduce the failover time of the primary instance in a Multi-AZ configuration.',
                2: 'Performance Insights is a monitoring and performance tuning tool. It helps diagnose issues but does not actively reduce database failover time.',
                3: 'Copying snapshots to other AWS Regions is a disaster recovery strategy for regional failures, not a solution for reducing intra-region Multi-AZ failover time.',
            },
            references: [
                'Amazon RDS User Guide — "Managing connections with Amazon RDS Proxy": RDS Proxy makes applications more resilient by automatically connecting to a new database instance while preserving application connections.',
                'Amazon RDS User Guide — "High availability (Multi-AZ) for Amazon RDS": DNS-based failover requires re-establishing existing connections, causing timeouts that RDS Proxy is designed to solve.',
                'Amazon RDS User Guide — "Working with read replicas": The primary purpose of read replicas is read scaling, not improving failover speed.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 260 — Route 53 Multivalue Answer / Multi-Region / Health Checks
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed3-q260',
            type: 'single',
            prompt:
                'A company serves its website by using an Auto Scaling group of Amazon EC2 instances in a single AWS Region. The website does not require a database. The company is expanding, and the company\'s engineering team deploys the website to a second Region. The company wants to distribute traffic across both Regions to accommodate growth and for disaster recovery purposes. The solution should not serve traffic from a Region in which the website is unhealthy. Which policy or resource should the company use to meet these requirements?',
            options: [
                'An Amazon Route 53 simple routing policy',
                'An Amazon Route 53 multivalue answer routing policy',
                'An Application Load Balancer in one Region with a target group that specifies the EC2 instance IDs from both Regions',
                'An Application Load Balancer in one Region with a target group that specifies the IP addresses of the EC2 instances from both Regions',
            ],
            correctOptionIndex: 1,
            explanation:
                'Amazon Route 53 multivalue answer routing responds to DNS queries with up to eight healthy records selected at random. By creating a record for the endpoint in each Region and associating Route 53 health checks with each record, traffic is distributed across both Regions. If the health check for one Region fails, Route 53 stops returning that Region\'s record, providing disaster recovery.',
            incorrectOptionExplanations: {
                0: 'A simple routing policy routes traffic to a single resource. While you can specify multiple values, it does not perform health checks to remove unhealthy endpoints from responses.',
                2: 'An Application Load Balancer is a regional service. Its target groups cannot contain EC2 instances that reside in a different AWS Region.',
                3: 'An Application Load Balancer is regional and cannot have targets in another Region. This design also introduces a single point of failure in the primary Region.',
            },
            references: [
                'Amazon Route 53 Developer Guide — "Choosing a routing policy - Multivalue answer routing": Responds to DNS queries with up to eight healthy records; health checks remove unhealthy endpoints.',
                'AWS Documentation — "What is Elastic Load Balancing?": ELB distributes traffic within a single Region across multiple Availability Zones.',
                'Elastic Load Balancing User Guide — "Target groups for your Application Load Balancers - Register targets": Targets must be within the load balancer\'s VPC; cross-Region targets are not supported.',
            ],
        },

    ],
};