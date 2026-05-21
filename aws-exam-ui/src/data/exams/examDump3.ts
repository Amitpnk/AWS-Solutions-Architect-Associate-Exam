import type { ExamDefinition } from './types';

export const examDumpSecurity131To195: ExamDefinition = {
    id: 'examDumpSecurity131To195',
    title: 'SAA-C03 Exam Dump — Security and Access Scenarios 131-195',
    description: 'Mixed AWS Solutions Architect Associate exam-dump questions covering IAM, networking, encryption, compliance, database security, identity federation, and more — with detailed incorrect-option explanations and AWS documentation references.',
    durationSeconds: 7800,
    questions: [

        // ═══════════════════════════════════════════════════════════════════════
        // Question 131 — IAM MFA Enforcement / aws:MultiFactorAuthPresent
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed2-q131',
            type: 'single',
            prompt:
                'A company is implementing a new policy to enhance the security of its AWS environment. The policy requires all administrative actions that users perform on the AWS Management Console to be secured by multi-factor authentication (MFA). Which solution will allow the company to enforce this policy in the MOST operationally efficient way?',
            options: [
                'Enable MFA on the root account. Ensure that all administrators use the root account to perform administrative actions.',
                'Create an IAM policy that requires MFA to be enabled for the IAM roles that administrators assume to perform administrative actions.',
                'Configure an Amazon CloudWatch alarm that sends an email notification when an administrator performs an administrative action without MFA.',
                'Use AWS Config to periodically audit IAM users and to automatically attach an IAM policy that requires MFA when AWS Config detects administrative actions.',
            ],
            correctOptionIndex: 1,
            explanation:
                'The most operationally efficient and secure method to enforce MFA for administrative actions is by using an IAM policy with the aws:MultiFactorAuthPresent condition key set to true. This proactively denies any API calls for administrative actions if the session was not authenticated using MFA, directly enforcing the security requirement without manual intervention or delay. This is a preventative control that aligns with AWS security best practices.',
            incorrectOptionExplanations: {
                0: 'Using the root account for routine administrative tasks is a significant security risk and violates the principle of least privilege. It should only be used for specific account management tasks.',
                2: 'This is a detective control, not a preventative one. It only sends a notification after an action has been performed without MFA, failing to enforce the policy beforehand.',
                3: 'This approach is reactive and complex. There would be a delay between an action and the remediation, leaving a window of vulnerability. A direct IAM policy is far more efficient.',
            },
            references: [
                'AWS IAM User Guide — "Configuring MFA-protected API access": Details using the aws:MultiFactorAuthPresent condition key to deny actions if MFA is not used.',
                'AWS Security Best Practices Whitepaper: Recommends requiring MFA for all access and using IAM roles to grant permissions, while strongly advising against using the root user for daily tasks.',
                'AWS Well-Architected Framework — Security Pillar: Recommends enforcing MFA via IAM policies for any access to AWS resources.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 132 — Lambda in VPC / S3 Private Access (Multi-select)
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed2-q132',
            type: 'multiple',
            prompt:
                'A company wants to deploy an AWS Lambda function that will read and write objects to Amazon S3 bucket. The Lambda function must be connected to the company\'s VPC. The company must deploy the Lambda function only to private subnets in the VPC. The Lambda function must not be allowed to access the internet. Which solutions will meet these requirements? (Select TWO.)',
            options: [
                'Create a private NAT gateway to access the S3 bucket.',
                'Attach an Elastic IP address to the NAT gateway.',
                'Create a gateway VPC endpoint for the S3 bucket.',
                'Create an interface VPC endpoint for the S3 bucket.',
                'Create a public NAT gateway to access the S3 bucket.',
            ],
            correctOptionIndexes: [2, 3],
            explanation:
                'When an AWS Lambda function is connected to a VPC and placed in private subnets, it loses default internet connectivity. Amazon S3 supports two types of VPC endpoints: Gateway Endpoints and Interface Endpoints. Both create a private and secure connection between the VPC and the S3 service over the AWS network, allowing the Lambda function to read and write to the S3 bucket while remaining isolated from the public internet.',
            incorrectOptionExplanations: {
                0: 'A private NAT gateway facilitates communication between VPCs or from on-premises networks, not for accessing public AWS services like S3 from within a VPC.',
                1: 'Attaching an Elastic IP address to a NAT gateway makes it a public NAT gateway, which provides internet access, directly violating the scenario\'s requirements.',
                4: 'A public NAT gateway is explicitly designed to provide internet access to resources in private subnets, which is forbidden by the question.',
            },
            references: [
                'AWS VPC User Guide — "VPC endpoints for Amazon S3": Both gateway and interface VPC endpoints route traffic privately between the VPC and S3 without leaving the Amazon network.',
                'AWS Lambda Developer Guide — "Configuring VPC access for Lambda functions": Recommends VPC endpoints to access AWS services without internet access.',
                'AWS VPC User Guide — "Compare gateway and interface endpoints": S3 is supported by both gateway and interface endpoints.',
                'AWS VPC User Guide — "NAT gateways": A public NAT gateway enables internet access; a private NAT gateway is for private network-to-network traffic.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 133 — ECS awsvpc / NLB / NAT Gateway / Private Subnets
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed2-q133',
            type: 'single',
            prompt:
                'A company is creating a low-latency payment processing application that supports TLS connections from IPv4 clients. The application requires outbound access to the public internet. Users must access the application from a single entry point. The bank wants to use Amazon Elastic Container Service (Amazon ECS) tasks to deploy the application. The company wants to enable AWSVPC network mode. Which solution will meet these requirements MOST securely?',
            options: [
                'Create a VPC that has an internet gateway, public subnets, and private subnets. Deploy a Network Load Balancer and a NAT gateway in the public subnets. Deploy the ECS tasks in the private subnets.',
                'Create a VPC that has an outbound-only internet gateway, public subnets, and private subnets. Deploy an Application Load Balancer and a NAT gateway in the public subnets. Deploy the ECS tasks in the private subnets.',
                'Create a VPC that has an internet gateway, public subnets, and private subnets. Deploy an Application Load Balancer in the public subnets. Deploy the ECS tasks in the public subnets.',
                'Create a VPC that has an outbound-only internet gateway, public subnets, and private subnets. Deploy a Network Load Balancer in the public subnets. Deploy the ECS tasks in the public subnets.',
            ],
            correctOptionIndex: 0,
            explanation:
                'Placing ECS tasks in private subnets prevents them from being directly exposed to the internet. A Network Load Balancer (NLB) is ideal for low-latency, high-throughput TCP-based workloads like payment processing with TLS. The NAT gateway, in a public subnet, enables the ECS tasks to initiate outbound connections to the internet without allowing inbound connections from the internet to the tasks.',
            incorrectOptionExplanations: {
                1: 'An outbound-only internet gateway (Egress-Only Internet Gateway) is used for IPv6 traffic, not IPv4 as specified in the requirements.',
                2: 'Deploying ECS tasks in public subnets potentially exposes them to direct internet traffic, violating security best practices.',
                3: 'This option incorrectly specifies an outbound-only internet gateway for IPv4 clients and insecurely places ECS tasks in public subnets.',
            },
            references: [
                'AWS VPC User Guide — "NAT gateways": To enable instances in a private subnet to connect to the internet, deploy a NAT gateway in a public subnet.',
                'Elastic Load Balancing User Guide — "What is a Network Load Balancer?": NLB functions at Layer 4 and handles millions of requests per second with ultra-low latencies.',
                'Amazon ECS Developer Guide — "Task networking with the awsvpc network mode": Tasks in a private subnet receive only a private IP, requiring a NAT gateway for internet access.',
                'AWS Well-Architected Framework — Security Pillar: Recommends placing resources in private subnets and denying direct internet access.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 134 — NAT Gateway in Public Subnet / Outbound-Only Internet
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed2-q134',
            type: 'single',
            prompt:
                'A company hosts an Amazon EC2 instance in a private subnet in a new VPC. The VPC also has a public subnet that has the default route set to an internet gateway. The private subnet does not have outbound internet access. The EC2 instance needs to have the ability to download monthly security updates from an outside vendor. However, the company must block any connections that are initiated from the internet. Which solution will meet these requirements?',
            options: [
                'Configure the private subnet route table to use the internet gateway as the default route.',
                'Create a NAT gateway in the public subnet. Configure the private subnet route table to use the NAT gateway as the default route.',
                'Create a NAT instance in the private subnet. Configure the private subnet route table to use the NAT instance as the default route.',
                'Create a NAT instance in the private subnet. Configure the private subnet route table to use the internet gateway as the default route.',
            ],
            correctOptionIndex: 1,
            explanation:
                'A NAT gateway in a public subnet allows EC2 instances in private subnets to initiate outbound internet connections while the NAT gateway blocks any unsolicited inbound connections from the internet. The route table for the private subnet must be configured with a default route (0.0.0.0/0) pointing to the NAT gateway.',
            incorrectOptionExplanations: {
                0: 'Configuring the private subnet\'s route table to use the internet gateway directly would make it a public subnet, allowing inbound connections from the internet.',
                2: 'A NAT device must be placed in a public subnet to have a route to the internet; placing it in a private subnet will not work.',
                3: 'This option is incorrect for two reasons: the NAT instance is in the wrong subnet (private), and the route table configuration bypasses the NAT instance entirely.',
            },
            references: [
                'AWS VPC User Guide — "NAT gateways": To create a NAT gateway, specify a public subnet. Then update the private subnet\'s route table to point internet-bound traffic to the NAT gateway.',
                'AWS VPC User Guide — "Example: VPC with public and private subnets (NAT)": Illustrates the exact scenario described.',
                'AWS VPC User Guide — "Route tables for your VPC": To allow a private subnet instance to initiate outbound internet communication, use a NAT gateway.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 135 — Control Tower / Account Factory / Multi-Account
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed2-q135',
            type: 'single',
            prompt:
                "A global company is migrating its workloads from an on-premises data center to AWS. The AWS environment includes multiple AWS accounts, IAM roles, AWS Config rules, and a VPC. The company wants an automated process to provision new accounts on demand when the company's business units require new accounts. Which solution will meet these requirements with LEAST effort?",
            options: [
                'Use AWS Control Tower to set up an organization in AWS Organizations. Use AWS Control Tower Account Factory for Terraform (AFT) to provision new AWS accounts.',
                'Create an organization in AWS Organizations. Use the AWS CLI CreateAccount API action to provision new AWS accounts. Organize the business units with organizational units (OUs).',
                'Create an AWS Lambda function that uses the AWS Organizations API to create new accounts. Invoke the Lambda function from an AWS CloudFormation template in AWS Service Catalog.',
                'Create an organization in AWS Organizations. Use AWS Step Functions to orchestrate the account creation process. Send account creation requests to an Amazon API Gateway API endpoint to invoke an AWS Lambda function that creates new accounts.',
            ],
            correctOptionIndex: 0,
            explanation:
                'AWS Control Tower is designed to set up and govern a secure, multi-account AWS environment with the least effort. Account Factory provides a standardized, automated workflow for provisioning new AWS accounts that automatically conform to the organization\'s baseline policies, including VPCs, IAM roles, and AWS Config rules.',
            incorrectOptionExplanations: {
                1: 'The AWS CLI CreateAccount API creates the account but does not automatically configure baseline resources like VPCs, IAM roles, or AWS Config rules, requiring significant manual effort.',
                2: 'Building and maintaining a custom Lambda function and Service Catalog product is more complex and higher effort than using the managed AWS Control Tower service.',
                3: 'This is the most complex option, requiring the development and integration of multiple services (API Gateway, Step Functions, Lambda), representing significant engineering effort.',
            },
            references: [
                'AWS Control Tower User Guide — "What Is AWS Control Tower?": The easiest way to set up and govern a new, secure, multi-account AWS environment.',
                'AWS Control Tower User Guide — "Provision accounts with AWS Control Tower Account Factory": Standardizes provisioning with pre-approved account configurations.',
                'AWS Organizations API Reference — CreateAccount: Only creates the account; does not perform in-account resource configuration.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 136 — IAM Identity Center / S3 Access / Least Overhead
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed2-q136',
            type: 'single',
            prompt:
                'An international company needs to share data from an Amazon S3 bucket to employees who are located around the world. The company needs a secure solution to provide employees with access to the S3 bucket. The employees are already enrolled in AWS IAM Identity Center. Which solution will meet these requirements with the LEAST operational overhead?',
            options: [
                'Create a help desk application to generate an Amazon S3 presigned URL for each employee. Configure the presigned URLs to have short expirations. Instruct employees to contact the company help desk to receive a presigned URL to access the S3 bucket.',
                'Create a group for Amazon S3 access in IAM Identity Center. Add the employees who require access to the S3 bucket to the group. Create an IAM policy to allow Amazon S3 access from the group. Instruct employees to use the AWS access portal to access the AWS Management Console and navigate to the S3 bucket.',
                'Create an Amazon S3 File Gateway. Create one share for data uploads and a second share for data downloads. Set up an SFTP service on an Amazon EC2 instance. Mount the shares to the EC2 instance. Instruct employees to use the SFTP server.',
                'Configure AWS Transfer Family SFTP endpoints. Select the custom identity provider option. Use AWS Secrets Manager to manage the user credentials. Instruct employees to use Transfer Family SFTP.',
            ],
            correctOptionIndex: 1,
            explanation:
                'The most efficient solution is to leverage the existing AWS IAM Identity Center infrastructure. By creating a group for S3 access, assigning an IAM policy (as part of a permission set), and adding employees to the group, administrators can centrally manage permissions. Employees use their existing credentials to sign in via the AWS access portal. This avoids custom application development, manual processes, and separate infrastructure.',
            incorrectOptionExplanations: {
                0: 'This creates significant operational overhead by requiring a custom application and manual intervention from a help desk for every access request.',
                2: 'Requiring S3 File Gateway, an EC2 instance, and an SFTP service results in high operational overhead.',
                3: 'Configuring Transfer Family with a custom identity provider and Secrets Manager adds more setup and management overhead than using IAM Identity Center directly.',
            },
            references: [
                'AWS IAM Identity Center User Guide — "How IAM Identity Center works": Allows centrally managing access by creating permission sets and assigning users and groups to those permission sets.',
                'AWS IAM Identity Center User Guide — "Permission sets": Collections of IAM policies defining effective permissions for a user or group.',
                'Amazon S3 User Guide — Sharing objects using presigned URLs: Generating presigned URLs through a help desk is a manual, high-overhead task.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 137 — Lambda + SNS + KMS Permissions (Select THREE)
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed2-q137',
            type: 'multiple',
            prompt:
                'A healthcare company is developing an AWS Lambda function that publishes notifications to an encrypted Amazon Simple Notification Service (Amazon SNS) topic. The notifications contain protected health information (PHI). The SNS topic uses AWS Key Management Service (AWS KMS) customer-managed keys for encryption. The company must ensure that the application has the necessary permissions to publish messages securely to the SNS topic. Which combination of steps will meet these requirements? (Select THREE.)',
            options: [
                'Create a resource policy for the SNS topic that allows the Lambda function to publish messages to the topic.',
                'Use server-side encryption with AWS KMS keys (SSE-KMS) for the SNS topic instead of customer-managed keys.',
                'Create a resource policy for the encryption key that the SNS topic uses that has the necessary AWS KMS permissions.',
                "Specify the Lambda function's Amazon Resource Name (ARN) in the SNS topic's resource policy.",
                'Associate an Amazon API Gateway HTTP API with the SNS topic to control access to the topic by using API Gateway resource policies.',
                'Configure a Lambda execution role that has the necessary IAM permissions to use a customer-managed key in AWS KMS.',
            ],
            correctOptionIndexes: [0, 2, 5],
            explanation:
                'To allow a Lambda function to publish to an SNS topic encrypted with a customer-managed KMS key, a multi-layered permission model is required: (1) A resource-based policy on the SNS topic grants the Lambda execution role permission to publish. (2) The Lambda execution role requires IAM permissions for kms:GenerateDataKey and kms:Decrypt on the specific customer-managed key. (3) The KMS key\'s own resource policy must grant usage permissions to both the Lambda execution role and the Amazon SNS service principal (sns.amazonaws.com).',
            incorrectOptionExplanations: {
                1: 'This option proposes changing the encryption key type, which contradicts the requirement to use the existing customer-managed key.',
                3: 'Permissions are granted to the Lambda function\'s execution role ARN, not the function\'s ARN itself, which is the identifier for the function.',
                4: 'Introducing Amazon API Gateway is an unnecessary architectural change and does not directly address the core IAM permission issue between Lambda, SNS, and KMS.',
            },
            references: [
                'AWS KMS Developer Guide — "Key policies in AWS KMS": Key policy is the primary way to control access to a KMS key.',
                'Amazon SNS Developer Guide — "Protecting Amazon SNS data using AWS KMS": Publishers must have kms:GenerateDataKey and kms:Decrypt permissions; the SNS service principal also needs key permissions.',
                'Amazon SNS Developer Guide — "Identity and access management in Amazon SNS": Resource-based policies allow a principal to publish to a topic.',
                'AWS Lambda Developer Guide — "AWS Lambda execution role": Permissions for the Lambda function are managed via its execution role.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 138 — Cross-Account IAM Role / DynamoDB Access
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed2-q138',
            type: 'single',
            prompt:
                "A company stores sensitive customer data in an Amazon DynamoDB table. The company frequently updates the data. The company wants to use the data to personalize offers for customers. The company's analytics team has its own AWS account. The analytics team runs an application on Amazon EC2 instances that needs to process data from the DynamoDB tables. The company needs to follow security best practices to create a process to regularly share data from DynamoDB to the analytics team. Which solution will meet these requirements?",
            options: [
                'Export the required data from the DynamoDB table to an Amazon S3 bucket as multiple JSON files. Provide the analytics team with the necessary IAM permissions to access the S3 bucket.',
                'Allow public access to the DynamoDB table. Create an IAM user that has permission to access DynamoDB. Share the IAM user with the analytics team.',
                'Allow public access to the DynamoDB table. Create an IAM user that has read-only permission for DynamoDB. Share the IAM user with the analytics team.',
                'Create a cross-account IAM role. Create an IAM policy that allows the AWS account ID of the analytics team to access the DynamoDB table. Attach the IAM policy to the IAM role. Establish a trust relationship between accounts.',
            ],
            correctOptionIndex: 3,
            explanation:
                'The most secure method for granting programmatic, cross-account access to AWS resources is by using an IAM role. This avoids sharing long-term credentials. The EC2 instances in the analytics account can assume this role to get temporary security credentials, enabling them to directly and securely access the frequently updated DynamoDB data.',
            incorrectOptionExplanations: {
                0: 'Exporting data to S3 introduces latency, meaning the analytics team would work with stale data, which is not ideal for a frequently updated source.',
                1: 'Allowing public access to a table containing sensitive customer data is a severe security violation.',
                2: 'Making sensitive data publicly accessible is unacceptable, even with read-only permissions.',
            },
            references: [
                'AWS IAM User Guide — "IAM tutorial: Delegate access across AWS accounts using IAM roles": Describes using IAM roles to delegate access to another trusted AWS account.',
                'AWS IAM User Guide — "Security best practices in IAM": Recommends using roles rather than sharing credentials.',
                'AWS Well-Architected Framework — Security Pillar: Recommends using IAM roles to provide temporary credentials for machine identities.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 139 — CloudFront + S3 + WAF / Frontend Migration
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed2-q139',
            type: 'single',
            prompt:
                'A financial service company has a two-tier consumer banking application. The frontend serves static web content. The backend consists of APIs. The company needs to migrate the frontend component to AWS. The backend of the application will remain on premises. The company must protect the application from common web vulnerabilities and attacks. Which solution will meet these requirements with the LEAST operational overhead?',
            options: [
                'Migrate the frontend to Amazon EC2 instances. Deploy an Application Load Balancer (ALB) in front of the instances. Use the instances to invoke the on-premises APIs. Associate AWS WAF rules with the instances.',
                'Deploy the frontend as an Amazon CloudFront distribution that has multiple origins. Configure one origin to be an Amazon S3 bucket that serves the static web content. Configure a second origin to route traffic to the on-premises APIs based on the URL pattern. Associate AWS WAF rules with the distribution.',
                'Migrate the frontend to Amazon EC2 instances. Deploy a Network Load Balancer (NLB) in front of the instances. Use the instances to invoke the on-premises APIs. Create an AWS Network Firewall instance. Route all traffic through the Network Firewall instance.',
                'Deploy the frontend as a static website based on an Amazon S3 bucket. Use an Amazon API Gateway REST API and a set of Amazon EC2 instances to invoke the on-premises APIs. Associate AWS WAF rules with the REST API and the S3 bucket.',
            ],
            correctOptionIndex: 1,
            explanation:
                'Amazon S3 hosts static web content without managing servers. CloudFront acts as a single entry point, caching static content and routing API requests to on-premises via path-based routing with a second origin. AWS WAF integrates directly with CloudFront for centralized protection against web vulnerabilities. This avoids provisioning, patching, and managing EC2 instances.',
            incorrectOptionExplanations: {
                0: 'EC2 instances for static content incurs high operational overhead, and AWS WAF cannot be associated directly with EC2 instances.',
                2: 'High EC2 operational overhead; AWS Network Firewall operates at L3/L4 and is not designed to protect against application-layer web attacks like WAF.',
                3: 'AWS WAF cannot be associated directly with an S3 bucket; it must be fronted by CloudFront or an ALB.',
            },
            references: [
                'Amazon CloudFront Developer Guide — "Routing traffic to different origins based on the request": Supports path-based routing to multiple origins.',
                'Amazon S3 User Guide — "Hosting a static website using Amazon S3": Standard, low-overhead solution for hosting static frontend.',
                'AWS WAF Developer Guide — "Associating or disassociating a web ACL with an AWS resource": WAF integrates with CloudFront, ALB, and API Gateway — not EC2 instances or S3 buckets directly.',
                'AWS Well-Architected Framework — Operational Excellence Pillar: Using managed services reduces operational effort.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 140 — CloudFront Signed Cookies / Music Downloads / Same URL
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed2-q140',
            type: 'single',
            prompt:
                'A media company has an ecommerce website to sell music. Each music file is stored as an MP3 file. Premium users of the website purchase music files and download the files. The company wants to store music files on AWS. The company wants to provide access only to the premium users. The company wants to use the same URL for all premium users. Which solution will meet these requirements?',
            options: [
                'Store the MP3 files on a set of Amazon EC2 instances that have Amazon Elastic Block Store (Amazon EBS) volumes attached. Manage access to the files by creating an IAM user and an IAM policy for each premium user.',
                'Store all the MP3 files in an Amazon S3 bucket. Create a presigned URL for each MP3 file. Share the presigned URLs with the premium users.',
                'Store all the MP3 files in an Amazon S3 bucket. Create an Amazon CloudFront distribution that uses the S3 bucket as the origin. Generate CloudFront signed cookies for the music files. Share the signed cookies with the premium users.',
                'Store all the MP3 files in an Amazon S3 bucket. Create an Amazon CloudFront distribution that uses the S3 bucket as the origin. Use a CloudFront signed URL for each music file. Share the signed URLs with the premium users.',
            ],
            correctOptionIndex: 2,
            explanation:
                'CloudFront signed cookies are the most appropriate mechanism when you want to provide access to multiple restricted files without changing the individual file URLs. The application authenticates a premium user and sets cookie headers, which the browser includes in subsequent requests for any music file, granting access while keeping URLs consistent.',
            incorrectOptionExplanations: {
                0: 'Using EC2 and EBS for static file storage is not cost-effective or scalable compared to S3. Managing end-users with individual IAM users is an anti-pattern.',
                1: 'An S3 presigned URL contains a unique signature and expiration time in its query string, making the URL different for each request, violating the same-URL requirement.',
                3: 'A CloudFront signed URL embeds a unique signature and policy in the URL itself, violating the requirement for a consistent URL.',
            },
            references: [
                'AWS CloudFront Developer Guide — "Choosing between signed URLs and signed cookies": Use signed cookies when providing access to multiple restricted files, as you don\'t need to generate a new URL for each file.',
                'AWS CloudFront Developer Guide — "Serving private content with signed URLs and signed cookies": Explains restricting access to content in an S3 origin.',
                'AWS S3 User Guide — "Sharing objects with presigned URLs": A presigned URL includes security credentials to grant time-limited, unique permission.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 141 — Firewall Manager + WAF + Config / Multi-Account
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed2-q141',
            type: 'single',
            prompt:
                'A company has an e-commerce site. The site is designed as a distributed web application hosted in multiple AWS accounts under one AWS Organizations organization. The web application is comprised of multiple microservices. All microservices expose their AWS services either through Amazon CloudFront distributions or public Application Load Balancers (ALBs). The company wants to protect public endpoints from malicious attacks and monitor security configurations. Which solution will meet these requirements with the LEAST operational overhead?',
            options: [
                'Use AWS WAF to protect the public endpoints. Use AWS Firewall Manager from a dedicated security account to manage rules in AWS WAF. Use AWS Config rules to monitor the Regional and global WAF configurations.',
                'Use AWS WAF to protect the public endpoints. Apply AWS WAF rules in each account. Use AWS Config rules and AWS Security Hub to monitor the WAF configurations of the ALBs and the CloudFront distributions.',
                'Use AWS WAF to protect the public endpoints. Use AWS Firewall Manager from a dedicated security account to manage the rules in AWS WAF. Use Amazon Inspector and AWS Security Hub to monitor the WAF configurations of the ALBs and the CloudFront distributions.',
                'Use AWS Shield Advanced to protect the public endpoints. Use AWS Config rules to monitor the Shield Advanced configuration for each account.',
            ],
            correctOptionIndex: 0,
            explanation:
                'AWS WAF protects against common web exploits. AWS Firewall Manager centrally manages WAF rules across all accounts within AWS Organizations, minimizing operational overhead. AWS Config assesses and audits WAF WebACL configurations, including managed rules like wafv2-web-acl-logging-enabled. This combination provides a complete, centrally managed, and auditable security solution.',
            incorrectOptionExplanations: {
                1: 'Applying WAF rules in each account individually creates high operational overhead, directly contradicting the requirement for centralized management.',
                2: 'Amazon Inspector is a vulnerability management service for compute workloads, not for monitoring the configuration of services like AWS WAF.',
                3: 'AWS Shield Advanced primarily protects against DDoS attacks and does not protect against application-layer attacks like SQL injection.',
            },
            references: [
                'AWS Firewall Manager Developer Guide — "What Is AWS Firewall Manager?": Centrally configures and manages WAF rules across accounts in AWS Organizations.',
                'AWS WAF Developer Guide — "How AWS WAF works": Protects CloudFront and ALB from common web exploits.',
                'AWS Config Developer Guide — "What Is AWS Config?" and managed rules: Assesses, audits, and evaluates configurations including WAF resources.',
                'Amazon Inspector User Guide: Focused on application vulnerabilities in compute resources, not service configurations.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 142 — CloudFront + S3 + WAF / Banking Frontend (duplicate topic)
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed2-q142',
            type: 'single',
            prompt:
                'A financial services company has a two-tier consumer banking application. The frontend serves static web content. The backend consists of APIs. The company needs to migrate the frontend component to AWS. The backend of the application will remain on-premises. The company must protect the application from common web vulnerabilities and attacks. Which solution will meet these requirements?',
            options: [
                'Migrate the frontend to Amazon EC2 instances. Deploy an Application Load Balancer (ALB) in front of the instances. Use the instances to invoke the on-premises APIs. Associate AWS WAF rules with the instances.',
                'Deploy the frontend as an Amazon CloudFront distribution that has multiple origins. Configure one origin to be an Amazon S3 bucket that serves the static web content. Configure a second origin to route traffic to the on-premises APIs based on the URL pattern. Associate AWS WAF rules with the distribution.',
                'Migrate the frontend to Amazon EC2 instances. Deploy a Network Load Balancer (NLB) in front of the instances. Use the instances to invoke the on-premises APIs. Create an AWS Network Firewall instance. Route all traffic through the Network Firewall instance.',
                'Deploy the frontend as a static website based on an Amazon S3 bucket. Use an Amazon API Gateway REST API and a set of Amazon EC2 instances to invoke the on-premises APIs. Associate AWS WAF rules with the REST API and the S3 bucket.',
            ],
            correctOptionIndex: 1,
            explanation:
                'Amazon S3 is the optimal service for hosting static web content. CloudFront acts as the CDN and supports multiple origins — one for the S3 static frontend and one for the on-premises API endpoint — using path-based routing (cache behaviors). AWS WAF integrates directly with CloudFront to provide edge protection against common web exploits for all traffic entering the application.',
            incorrectOptionExplanations: {
                0: 'EC2 instances for static content is inefficient. AWS WAF cannot be associated directly with EC2 instances.',
                2: 'An NLB operates at Layer 4 and cannot perform path-based routing. AWS Network Firewall addresses network threats, not specific web exploits.',
                3: 'AWS WAF cannot be associated directly with an Amazon S3 bucket; it must be fronted by a service like CloudFront.',
            },
            references: [
                'Amazon CloudFront Developer Guide — "Using multiple origins with a CloudFront distribution": Supports serving static content from S3 and dynamic content from other origins.',
                'AWS WAF Developer Guide — "How AWS WAF works": WAF can protect CloudFront, ALBs, and API Gateway — not EC2 instances or S3 buckets directly.',
                'Amazon S3 User Guide — "Tutorial: Configuring a static website on Amazon S3": Best practice for hosting static website content.',
                'AWS Whitepaper — AWS Best Practices for DDoS Resiliency: Recommends CloudFront with WAF for edge protection.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 143 — S3 Object Lock Compliance Mode + Lifecycle / 7-Year Retention
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed2-q143',
            type: 'single',
            prompt:
                'A company plans to use an Amazon S3 bucket to archive backup data. Regulations require the company to retain the backup data for 7 years. During the retention period, the company must prevent users, including administrators, from deleting the data. The company can delete the data after 7 years. Which solution will meet these requirements?',
            options: [
                'Create an S3 bucket policy that denies delete operations for 7 years. Create an S3 Lifecycle policy to delete the data after 7 years.',
                'Create an S3 Object Lock default retention policy that retains data for 7 years in governance mode. Create an S3 Lifecycle policy to delete the data after 7 years.',
                'Create an S3 Object Lock default retention policy that retains data for 7 years in compliance mode. Create an S3 Lifecycle policy to delete the data after 7 years.',
                'Create an S3 Batch Operations job to set a legal hold on each object for 7 years. Create an S3 Lifecycle policy to delete the data after 7 years.',
            ],
            correctOptionIndex: 2,
            explanation:
                'S3 Object Lock in compliance mode prevents a protected object version from being overwritten or deleted by any user, including the root user. The retention period cannot be shortened. This meets the strict regulatory requirement. An S3 Lifecycle policy can then be configured to automatically delete the objects after the 7-year retention period expires.',
            incorrectOptionExplanations: {
                0: 'An S3 bucket policy can be modified or deleted by an administrator or root user, bypassing the deletion prevention rule.',
                1: 'S3 Object Lock in governance mode allows users with special permissions (s3:BypassGovernanceRetention) to override the lock, failing to prevent administrators from deleting data.',
                3: 'A legal hold does not have a fixed retention period; it remains indefinitely until explicitly removed. The requirement is for a fixed 7-year term.',
            },
            references: [
                'AWS S3 Developer Guide — "Using S3 Object Lock": Compliance mode prevents overwriting or deletion by any user including root.',
                'AWS S3 Developer Guide — "S3 Object Lock legal hold": A legal hold remains in effect until explicitly removed, making it inappropriate for a fixed-term retention.',
                'AWS S3 Developer Guide — "Managing your storage lifecycle": Lifecycle rules can be combined with Object Lock; rules will not delete locked objects until their retention period ends.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 144 — NACL Deny Rules / Application Isolation
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed2-q144',
            type: 'single',
            prompt:
                'A company runs multiple applications on Amazon EC2 instances in a VPC. Application A runs in a private subnet that has a custom route table and network ACL. Application B runs in a second private subnet in the same VPC. The company needs to prevent Application A from sending traffic to Application B. Which solution will meet this requirement?',
            options: [
                'Add a deny outbound rule to a security group associated with Application B. Configure the rule to prevent Application B from sending traffic to Application A.',
                'Add a deny outbound rule to a security group associated with Application A. Configure the rule to prevent Application A from sending traffic to Application B.',
                'Add a deny outbound rule to the custom network ACL for the Application B subnet. Configure the rule to prevent Application B from sending traffic to the IP addresses associated with Application A.',
                'Add a deny outbound rule to the custom network ACL for the Application A subnet. Configure the rule to prevent Application A from sending traffic to the IP addresses associated with Application B.',
            ],
            correctOptionIndex: 3,
            explanation:
                'Network Access Control Lists (NACLs) are stateless firewalls that operate at the subnet level and support explicit deny rules. By adding an outbound deny rule to the NACL associated with Application A\'s subnet, specifying the destination as the IP address range of Application B\'s subnet, traffic will be blocked before it can leave its source subnet.',
            incorrectOptionExplanations: {
                0: 'Security groups do not support explicit deny rules; they only allow rules. This option also targets the wrong direction (B to A).',
                1: 'Security groups are stateful firewalls at the instance level and do not support explicit deny rules.',
                2: 'This rule would be placed on the NACL for Application B\'s subnet, blocking outbound traffic from B to A, not the required A to B direction.',
            },
            references: [
                'AWS VPC User Guide — "Compare security groups and network ACLs": Security groups support allow rules only; NACLs support allow and deny rules.',
                'AWS VPC User Guide — "Control traffic to subnets using network ACLs": NACLs support adding allow or deny rules.',
                'AWS VPC User Guide — "Security group rules": Security groups have no deny rules; they use a default deny for traffic not explicitly allowed.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 145 — AWS Config Custom Rule / Redshift Compliance
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed2-q145',
            type: 'single',
            prompt:
                'An e-commerce company stores inventory, order, and user information in multiple Amazon Redshift clusters. The Redshift clusters must comply with the company\'s security policies. The company must receive notifications about any security configuration violations. Which solution will meet these requirements?',
            options: [
                'Create an Amazon EventBridge rule that uses the Redshift clusters as the source. Create an AWS Lambda function to evaluate the Redshift cluster security configuration. Configure the Lambda function to notify the company of any violations of the security policies. Add the Lambda function as a target of the EventBridge rule.',
                'Create an AWS Lambda function to check the validity of the Redshift cluster security configurations. Create an Amazon EventBridge rule that invokes the Lambda function when Redshift clusters are created. Notify the company of any violations of security policies.',
                'Set up Amazon Redshift Advisor in the company\'s AWS account to monitor cluster configurations. Configure Redshift Advisor to generate notifications for security items that the company must address.',
                'Create an AWS Lambda function to check the Redshift clusters for any violation of the security configurations. Create an AWS Config custom rule to invoke the Lambda function when Redshift cluster security configurations are modified. Provide the compliance state of each Redshift cluster to AWS Config. Configure AWS Config to notify the company of any violations of the security policies.',
            ],
            correctOptionIndex: 3,
            explanation:
                'AWS Config is designed for assessing, auditing, and evaluating resource configurations. A custom Config rule triggers a Lambda function whenever a Redshift cluster\'s configuration is modified. The Lambda function reports compliance status back to AWS Config, which can be integrated with Amazon SNS to send notifications when a resource is flagged as non-compliant.',
            incorrectOptionExplanations: {
                0: 'Amazon EventBridge for Redshift primarily captures high-level state change events, not detailed configuration changes needed for continuous compliance monitoring.',
                1: 'This approach only evaluates compliance at cluster creation time. It fails to detect configuration drift on existing clusters.',
                2: 'Amazon Redshift Advisor provides best-practice recommendations for performance and cost, not a framework for enforcing custom security policy violations.',
            },
            references: [
                'AWS Config Developer Guide — "Evaluating Resources with AWS Config Rules": Config rules use Lambda functions to evaluate resource compliance.',
                'AWS Config Developer Guide — "AWS Config Custom Lambda Rules": Invoked when a resource configuration change occurs.',
                'Amazon Redshift Management Guide — "Monitoring Amazon Redshift using AWS Config": AWS Config records Redshift cluster configuration changes and supports compliance rules.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 146 — Amazon Macie Delegated Administrator / PII Scanning
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed2-q146',
            type: 'single',
            prompt:
                'A company has an organization in AWS Organizations that has all features enabled. The company has multiple Amazon S3 buckets in multiple AWS Regions around the world. The S3 buckets contain sensitive data. The company needs to ensure that no personally identifiable information (PII) is stored in the S3 buckets. The company also needs a scalable solution to identify PII. Which solution will meet these requirements?',
            options: [
                'In the Organizations management account, configure an Amazon Macie administrator IAM user as the delegated administrator for the global organization. Use the Macie administrator user to configure Macie settings to scan for PII.',
                'For each Region in the Organizations management account, designate a delegated Amazon Macie administrator account. In the Macie administrator account, add all accounts in the organization. Use the Macie administrator account to enable Macie. Configure automated sensitive data discovery for all accounts in the organization.',
                'For each Region in the Organizations management account, configure a service control policy (SCP) to identify PII. Apply the SCP to the organization root.',
                'In the Organizations management account, configure AWS Lambda functions to scan for PII in each Region.',
            ],
            correctOptionIndex: 1,
            explanation:
                'To manage Macie across a multi-account environment, the recommended approach is to designate a specific member account as the delegated Macie administrator for each Region where S3 buckets need to be monitored. Because Macie is a regional service, the delegated administrator must be configured per Region. The delegated administrator can then enable Macie and configure automated sensitive data discovery for all member accounts, providing a continuous and scalable solution.',
            incorrectOptionExplanations: {
                0: 'Delegated administration in AWS Organizations is assigned to an AWS account, not an IAM user. Macie is also a regional service and must be configured in each desired Region.',
                2: 'SCPs enforce permission guardrails on API actions. They cannot inspect the data content within S3 objects to identify PII.',
                3: 'Building a custom Lambda solution to scan for PII is not scalable compared to using Amazon Macie, a purpose-built managed service.',
            },
            references: [
                'AWS Macie User Guide — "Managing multiple accounts in Amazon Macie": Recommends designating a member account as the delegated Macie administrator, configured per Region.',
                'AWS Macie User Guide — "How automated sensitive data discovery works": Continuously evaluates S3 bucket inventory for sensitive data.',
                'AWS Organizations User Guide — "Service control policies": SCPs manage permissions, not data content analysis.',
                'AWS Macie User Guide — "Getting started with Amazon Macie": Enable Macie in each Region where you want to discover and protect sensitive data.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 147 — Amazon Rekognition / Content Moderation / No Model Training
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed2-q147',
            type: 'single',
            prompt:
                'A company needs a solution to prevent photos with unwanted content from being uploaded to the company\'s web application. The solution must not involve training a machine learning (ML) model. Which solution will meet these requirements?',
            options: [
                'Create and deploy a model by using Amazon SageMaker Autopilot. Create a real-time endpoint that the web application invokes when new photos are uploaded.',
                'Create an AWS Lambda function that uses Amazon Rekognition to detect unwanted content. Create a Lambda function URL that the web application invokes when new photos are uploaded.',
                'Create an Amazon CloudFront function that uses Amazon Comprehend to detect unwanted content. Associate the function with the web application.',
                'Create an AWS Lambda function that uses Amazon Rekognition Video to detect unwanted content. Create a Lambda function URL that the web application invokes when new photos are uploaded.',
            ],
            correctOptionIndex: 1,
            explanation:
                'Amazon Rekognition provides pre-trained machine learning capabilities for image and video analysis. The DetectModerationLabels API operation identifies unsafe or unwanted content in images without requiring custom model training. An AWS Lambda function with a Lambda function URL provides a serverless HTTPS endpoint for the web application to invoke for photo analysis.',
            incorrectOptionExplanations: {
                0: 'Amazon SageMaker Autopilot automatically builds, trains, and tunes custom machine learning models, directly violating the requirement not to train a model.',
                2: 'Amazon Comprehend is a natural language processing (NLP) service for analyzing text, not images.',
                3: 'Amazon Rekognition Video analyzes stored or streaming video, not individual photos as required.',
            },
            references: [
                'Amazon Rekognition Developer Guide — "Detecting unsafe content": The DetectModerationLabels API detects unsafe content without model training.',
                'AWS Lambda Developer Guide — "Lambda function URLs": A function URL is a dedicated HTTP(S) endpoint for a Lambda function.',
                'Amazon SageMaker Developer Guide — "Amazon SageMaker Autopilot": Autopilot automatically builds, trains, and tunes custom ML models.',
                'Amazon Comprehend Developer Guide: An NLP service for text analysis, unsuitable for image content.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 148 — Interface VPC Endpoints / Private S3 + Secrets Manager (Multi-select)
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed2-q148',
            type: 'multiple',
            prompt:
                "An internal product team is deploying a new application to a private VPC in a company's AWS account. The application runs on Amazon EC2 instances that are in a security group named App1. The EC2 instances store application data in an Amazon S3 bucket and use AWS Secrets Manager to store application service credentials. The company's security policy prohibits applications in a private VPC from using public IP addresses to communicate. Which combination of solutions will meet these requirements? (Select TWO.)",
            options: [
                'Configure gateway endpoints for Amazon S3 and AWS Secrets Manager.',
                'Configure interface VPC endpoints for Amazon S3 and AWS Secrets Manager.',
                'Add routes to the endpoints in the VPC route table.',
                'Associate the App1 security group with the interface VPC endpoints. Configure a self-referencing security group rule to allow inbound traffic.',
                'Associate the App1 security group with the gateway endpoints. Configure a self-referencing security group rule to allow inbound traffic.',
            ],
            correctOptionIndexes: [1, 3],
            explanation:
                'AWS Secrets Manager only supports interface VPC endpoints. While S3 supports both, to provide a consistent and functional solution for both services, interface endpoints must be used. Interface endpoints are ENIs with private IP addresses. To control traffic, you associate the App1 security group with the interface endpoints and configure a self-referencing rule that allows inbound traffic from instances in the same security group.',
            incorrectOptionExplanations: {
                0: 'AWS Secrets Manager does not support gateway endpoints. It requires an interface endpoint.',
                2: 'Route table modifications are the mechanism for gateway endpoints, not interface endpoints. Interface endpoints use DNS to resolve to private IPs within the VPC.',
                4: 'Gateway endpoints do not have security groups. Access control for gateway endpoints is managed through endpoint policies and VPC route tables.',
            },
            references: [
                'AWS VPC User Guide — "VPC endpoints": Interface endpoints are ENIs with private IPs; gateway endpoints are route table targets.',
                'AWS PrivateLink Guide — "AWS services that integrate with AWS PrivateLink": Both S3 and Secrets Manager support interface endpoints.',
                'AWS VPC User Guide — "Interface VPC endpoints (AWS PrivateLink)": Security groups can be associated with endpoint network interfaces.',
                'AWS VPC User Guide — "Control access to services using VPC endpoints": Security groups control traffic to interface endpoints.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 149 — Firewall Manager / Security Group Management / Multi-Account
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed2-q149',
            type: 'single',
            prompt:
                "A company manages multiple AWS accounts in an organization in AWS Organizations. The company's applications run on Amazon EC2 instances in multiple AWS Regions. The company needs a solution to simplify the management of security rules across the accounts in its organization. The solution must apply shared security group rules, audit security groups, and detect unused and redundant rules in VPC security groups across all AWS environments. Which solution will meet these requirements with the MOST operational efficiency?",
            options: [
                'Use AWS Firewall Manager to create a set of rules based on the security requirements. Replicate the rules to all the AWS accounts and Regions.',
                'Use AWS CloudFormation StackSets to provision VPC security groups based on the specifications across multiple accounts and Regions. Deploy AWS Network Firewall to define the firewall rules to control network traffic across multiple accounts and Regions.',
                'Use AWS CloudFormation StackSets to provision VPC security groups based on the specifications across multiple accounts and Regions. Configure AWS Config and AWS Lambda to evaluate compliance information and to automate enforcement across all accounts and Regions.',
                'Use AWS Network Firewall to build policies based on the security requirements. Centrally apply the new policies to all the VPCs and accounts.',
            ],
            correctOptionIndex: 0,
            explanation:
                'AWS Firewall Manager is designed for centrally configuring and managing firewall rules across multiple accounts in AWS Organizations. A Firewall Manager security group policy can establish baseline common security group rules and apply them consistently. Firewall Manager also includes policy types for auditing existing security groups and detecting unused or redundant security groups.',
            incorrectOptionExplanations: {
                1: 'AWS Network Firewall is a VPC-level firewall for filtering traffic between subnets; it does not manage security groups attached to EC2 instances.',
                2: 'While technically feasible, this requires building and maintaining a custom solution, whereas Firewall Manager provides these capabilities as a managed service.',
                3: 'AWS Network Firewall operates at the VPC and subnet level to inspect traffic flows, not to manage or audit security group rules.',
            },
            references: [
                'AWS Firewall Manager Developer Guide — "AWS Firewall Manager for Amazon VPC security groups": Configures common security groups and audits for unused and redundant ones across accounts.',
                'AWS Firewall Manager Developer Guide — "How AWS Firewall Manager works with AWS Organizations": Centralized management from a single account.',
                'AWS Network Firewall Developer Guide: Network Firewall filters traffic at the VPC boundary, not at the security group level.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 150 — AWS PrivateLink / SaaS Connectivity
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed2-q150',
            type: 'single',
            prompt:
                "A company has a multi-tier web application. The application's internal service components are deployed on Amazon EC2 instances. The internal service components need to access third-party software as a service (SaaS) APIs that are hosted on AWS. The company needs to provide secure and private connectivity from the application's internal services to the third-party SaaS application. The company needs to ensure that there is minimal public internet exposure. Which solution will meet these requirements?",
            options: [
                'Implement an AWS Site-to-Site VPN to establish a secure connection with the third-party SaaS provider.',
                'Deploy AWS Transit Gateway to manage and route traffic between the application\'s VPC and the third-party SaaS provider.',
                'Configure AWS PrivateLink to allow only outbound traffic from the VPC without enabling the third-party SaaS provider to establish a return path to the network.',
                'Use AWS PrivateLink to create a private connection between the application\'s VPC and the third-party SaaS provider.',
            ],
            correctOptionIndex: 3,
            explanation:
                'AWS PrivateLink is the purpose-built AWS service for creating secure, private connectivity between a VPC and services hosted on AWS, including third-party SaaS applications. It creates an interface VPC endpoint in the consumer\'s VPC, ensuring that all traffic remains on the AWS private network and never traverses the public internet.',
            incorrectOptionExplanations: {
                0: 'AWS Site-to-Site VPN is primarily used to connect on-premises networks to a VPC. It is not the standard or most efficient solution for connecting to a SaaS service within AWS.',
                1: 'AWS Transit Gateway is a network hub for interconnecting multiple VPCs and on-premises networks. It does not, by itself, provide a private endpoint to a service.',
                2: 'This option describes a characteristic of AWS PrivateLink but is less accurate and complete than option D, which correctly identifies the overall solution.',
            },
            references: [
                'AWS PrivateLink Documentation — "AWS PrivateLink concepts": Provides private connectivity between VPCs, AWS services, and on-premises networks without exposing traffic to the public internet.',
                'AWS PrivateLink Documentation — "What is AWS PrivateLink?": Allows connecting to services hosted by other AWS accounts privately from your VPC.',
                'AWS PrivateLink Documentation — "Compare AWS PrivateLink and other AWS services": Site-to-Site VPN and Direct Connect are for connecting on-premises networks to VPCs.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 151 — EMR Runtime Roles / Multi-Tenant Cluster
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed2-q151',
            type: 'single',
            prompt:
                'A company wants to create an Amazon EMR cluster that multiple teams will use. The company wants to ensure that each team\'s big data workloads can access only the AWS services that each team needs to interact with. The company does not want the workloads to have access to Instance Metadata Service Version 2 (IMDSv2) on the cluster\'s underlying EC2 instances. Which solution will meet these requirements?',
            options: [
                'Configure interface VPC endpoints for each AWS service that the teams need. Use the required interface VPC endpoints to submit the big data workloads.',
                'Create EMR runtime roles. Configure the cluster to use the runtime roles. Use the runtime roles to submit the big data workloads.',
                'Create an EC2 IAM instance profile that has the required permissions for each team. Use the instance profile to submit the big data workloads.',
                'Create an EMR security configuration that has the EnableApplicationScoped IAM Role option set to false. Use the security configuration to submit the big data workloads.',
            ],
            correctOptionIndex: 1,
            explanation:
                'Amazon EMR runtime roles are the designated feature for providing granular, least-privilege permissions in a multi-tenant cluster environment. Each EMR step acquires only the permissions defined in its associated runtime role, isolating permissions on a per-job basis. This mechanism provides credentials directly to the application, decoupling it from the broader permissions of the EC2 instance profile.',
            incorrectOptionExplanations: {
                0: 'Interface VPC endpoints are a networking feature for private connectivity. They do not control or assign IAM permissions to applications.',
                2: 'An EC2 instance profile applies a single IAM role to all EC2 instances in the cluster, granting all teams\' workloads the same permissions, violating the per-team access control requirement.',
                3: 'This option refers to a non-existent EMR security configuration setting.',
            },
            references: [
                'AWS EMR Management Guide — "Use runtime roles for Amazon EMR steps": Specifying a different IAM role for each step limits permissions and supports multi-tenant clusters.',
                'AWS EMR Management Guide — "IAM roles for Amazon EMR": Distinguishes between instance profile (cluster-wide) and runtime roles (per-step).',
                'AWS PrivateLink Documentation — "Interface endpoints": Interface endpoints handle networking, not identity management for applications.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 152 — DAX Cluster Encryption / Recreate Required
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed2-q152',
            type: 'single',
            prompt:
                'A company discovers that an Amazon DynamoDB Accelerator (DAX) cluster for the company\'s web application workload is not encrypting data at rest. The company needs to resolve the security issue. Which solution will meet this requirement?',
            options: [
                'Stop the existing DAX cluster. Enable encryption at rest for the existing DAX cluster, and start the cluster again.',
                'Delete the existing DAX cluster. Recreate the DAX cluster, and configure the new cluster to encrypt the data at rest.',
                'Update the configuration of the existing DAX cluster to encrypt the data at rest.',
                'Integrate the existing DAX cluster with AWS Security Hub to automatically enable encryption at rest.',
            ],
            correctOptionIndex: 1,
            explanation:
                'Amazon DynamoDB Accelerator (DAX) encryption at rest is a configuration that must be enabled when a cluster is created. This setting is immutable and cannot be changed after the cluster has been provisioned. Therefore, the existing cluster must be deleted and a new cluster must be created with encryption at rest enabled during creation.',
            incorrectOptionExplanations: {
                0: 'DAX clusters do not have a stop/start lifecycle state, and the encryption setting cannot be modified after creation.',
                2: 'The encryption at rest configuration for an existing DAX cluster is immutable and cannot be updated in-place.',
                3: 'AWS Security Hub is a security posture management service that provides findings but does not directly modify resource configurations.',
            },
            references: [
                'AWS DynamoDB Developer Guide — "DAX Encryption at Rest": Encryption at rest can only be enabled when you create a DAX cluster; you can\'t change it on an existing cluster.',
                'AWS CLI Command Reference — dax create-cluster: The --sse-specification parameter configures server-side encryption at creation.',
                'AWS CLI Command Reference — dax update-cluster: Does not include any option to enable or disable server-side encryption.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 153 — SQS Resource Policy + Lambda Execution Role
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed2-q153',
            type: 'single',
            prompt:
                'An application uses an Amazon SQS queue and two AWS Lambda functions. One of the Lambda functions pushes messages to the queue, and the other function polls the queue and receives queued messages. A solutions architect needs to ensure that only the two Lambda functions can write to or read from the queue. Which solution will meet these requirements?',
            options: [
                'Attach an IAM policy to the SQS queue that grants the Lambda function principals read and write access. Attach an IAM policy to the execution role of each Lambda function that denies all access to the SQS queue except for the principal of each function.',
                'Attach a resource-based policy to the SQS queue to deny read and write access to the queue for any entity except the principal of each Lambda function. Attach an IAM policy to the execution role of each Lambda function that allows read and write access to the queue.',
                'Attach a resource-based policy to the SQS queue that grants the Lambda function principals read and write access to the queue. Attach an IAM policy to the execution role of each Lambda function that allows read and write access to the queue.',
                'Attach a resource-based policy to the SQS queue to deny all access to the queue. Attach an IAM policy to the execution role of each Lambda function that grants read and write access to the queue.',
            ],
            correctOptionIndex: 2,
            explanation:
                'To allow only specific Lambda functions to access an SQS queue, permissions must be configured on both the identity (Lambda execution role via IAM policy) and the resource (SQS queue via resource-based policy). The SQS resource-based policy explicitly grants permissions to the specific Lambda execution role principals, and the IAM policy on the execution role allows the required SQS actions.',
            incorrectOptionExplanations: {
                0: 'A Deny policy on the Lambda execution role is unnecessary and could block the function\'s own access if misconfigured.',
                1: 'While using Deny with a NotPrincipal condition is a valid pattern, the standard and more direct method is using explicit Allow statements for the intended principals.',
                3: 'An explicit Deny in a resource-based policy always overrides an Allow in an identity-based policy, which would block the Lambda functions from accessing the queue entirely.',
            },
            references: [
                'AWS IAM User Guide — "Policy evaluation logic": An explicit deny in a resource-based policy overrides any allow in an identity-based policy.',
                'AWS Lambda Developer Guide — "Using AWS Lambda with Amazon SQS": Lambda execution role needs IAM policy with Allow for SQS actions; the SQS queue uses a resource-based policy to Allow the Lambda principal.',
                'Amazon SQS Developer Guide — "Amazon SQS resource-based policies": Allows granting permissions to specific AWS service principals by specifying their ARNs in an Allow statement.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 154 — SCT + DMS + Site-to-Site VPN / Oracle to Aurora (Multi-select)
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed2-q154',
            type: 'multiple',
            prompt:
                'A company wants to migrate its on-premises Oracle database to Amazon Aurora. The company wants to use a secure and encrypted network to transfer the data. Which combination of steps will meet these requirements? (Select TWO.)',
            options: [
                'Use AWS Application Migration Service to migrate the data.',
                'Use AWS Schema Conversion Tool (AWS SCT) and AWS Database Migration Service (AWS DMS) to migrate the data.',
                'Use AWS Direct Connect SiteLink to transfer data from the on-premises environment to AWS.',
                'Use AWS Site-to-Site VPN to establish a connection to transfer the data from the on-premises environment to AWS.',
                'Use AWS App2Container to migrate the data.',
            ],
            correctOptionIndexes: [1, 3],
            explanation:
                'For a heterogeneous database migration from Oracle to Amazon Aurora, AWS SCT converts the source schema and code objects to a format compatible with the target database, and AWS DMS migrates the data. AWS Site-to-Site VPN establishes an IPsec VPN tunnel between the on-premises data center and AWS VPC, ensuring all data in transit is encrypted.',
            incorrectOptionExplanations: {
                0: 'AWS Application Migration Service (MGN) is designed for lift-and-shift server migrations, not for heterogeneous database migrations which require schema transformation.',
                2: 'AWS Direct Connect provides a dedicated private connection but is not encrypted by default. SiteLink is a feature for connecting Direct Connect locations.',
                4: 'AWS App2Container is a tool for modernizing and containerizing applications; it is not a database migration service.',
            },
            references: [
                'AWS DMS User Guide: Supports heterogeneous migrations such as Oracle to Amazon Aurora.',
                'AWS SCT User Guide: Converts existing database schema from one engine to another, including Oracle to Aurora.',
                'AWS Site-to-Site VPN User Guide: Creates a secure connection using IPsec VPN tunnels.',
                'AWS Direct Connect User Guide: Direct Connect does not encrypt traffic in transit by default; Site-to-Site VPN is needed for encryption.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 155 — S3 Object Lock Compliance + Versioning / Log Retention
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed2-q155',
            type: 'single',
            prompt:
                'A financial services company must retain log data for 1 year. The company stores log files in an Amazon S3 bucket and wants to prevent any user from deleting or overwriting the log files during this period. The data must remain available for read-only requests. Which solution will meet these requirements?',
            options: [
                'Enable S3 Versioning on the bucket. Use Object Lock in compliance mode with a 1-year retention period.',
                'Enable S3 Transfer Acceleration on the bucket. Create an S3 Lifecycle Configuration rule to move objects to Amazon S3 Glacier Flexible Retrieval after 1 year.',
                'Enable S3 Versioning on the bucket. Create an S3 Lifecycle Configuration rule to move objects to Amazon S3 Glacier Flexible Retrieval after 1 year.',
                'Create an AWS Lambda function to programmatically check the timestamp of S3 data and to move the data to Amazon S3 Glacier Deep Archive if the data is older than 1 year.',
            ],
            correctOptionIndex: 0,
            explanation:
                'Amazon S3 Object Lock in compliance mode enforces a fixed retention period during which no user, including the root user, can overwrite or delete an object version. S3 Versioning is a prerequisite for enabling Object Lock. This solution directly meets the company\'s immutability and retention requirements while keeping the data readily available for read requests.',
            incorrectOptionExplanations: {
                1: 'S3 Transfer Acceleration speeds up data transfers, not data protection. A Lifecycle rule does not protect data from deletion during the retention period.',
                2: 'S3 Versioning alone does not prevent deletion. A user with sufficient permissions can permanently delete object versions.',
                3: 'A custom Lambda function is operationally complex and does not provide the required WORM protection. Moving data to Glacier Deep Archive may not meet the read availability requirement.',
            },
            references: [
                'AWS S3 User Guide — "Using S3 Object Lock": Compliance mode prevents overwriting or deletion by any user including root.',
                'AWS S3 User Guide — "Using S3 Object Lock - Getting Started": Versioning is a prerequisite for Object Lock.',
                'AWS S3 User Guide — "Using versioning in S3 buckets": With permissions, users can permanently delete object versions; versioning alone is insufficient for WORM.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 156 — KMS + SecureTransport + IAM + CloudTrail / S3 Security
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed2-q156',
            type: 'single',
            prompt:
                'A company is planning to migrate customer records to an Amazon S3 bucket. The company needs to ensure that customer records are protected against unauthorized access and are encrypted in transit and at rest. The company must monitor all access to the S3 bucket. Which solution will meet these requirements?',
            options: [
                'Use AWS Key Management Service (AWS KMS) to encrypt customer records at rest. Create an S3 bucket policy that includes the aws:SecureTransport condition. Use an IAM policy to control access to the records. Use AWS CloudTrail to monitor access to the records.',
                'Use AWS Nitro Enclaves to encrypt customer records at rest. Use AWS Key Management Service (AWS KMS) to encrypt the records in transit. Use an IAM policy to control access to the records. Use AWS CloudTrail and AWS Security Hub to monitor access to the records.',
                'Use AWS Key Management Service (AWS KMS) to encrypt customer records at rest. Create an Amazon Cognito user pool to control access to the records. Use AWS CloudTrail to monitor access to the records. Use Amazon GuardDuty to detect threats.',
                'Use server-side encryption with Amazon S3 managed keys (SSE-S3) with default settings to encrypt the records at rest. Access the records by using an Amazon CloudFront distribution that uses the S3 bucket as the origin. Use IAM roles to control access to the records. Use Amazon CloudWatch to monitor access to the records.',
            ],
            correctOptionIndex: 0,
            explanation:
                'KMS (SSE-KMS) provides encryption at rest with centralized key management. The aws:SecureTransport condition in an S3 bucket policy denies any non-HTTPS requests, enforcing encryption in transit. IAM policies provide granular access control. AWS CloudTrail logs all API calls including S3 object-level access (when data events are enabled), fulfilling the monitoring requirement.',
            incorrectOptionExplanations: {
                1: 'AWS Nitro Enclaves are isolated compute environments for EC2, not a storage encryption service for S3. KMS is used for encryption at rest, not in transit.',
                2: 'This option completely omits the requirement to enforce encryption in transit. Cognito is for application user management, not fundamental resource access control.',
                3: 'CloudWatch monitors metrics but does not natively log all API access to S3 objects; CloudTrail is the correct service. Using CloudFront does not guarantee all S3 access is encrypted.',
            },
            references: [
                'AWS KMS Developer Guide — "How Amazon S3 uses AWS KMS": SSE-KMS encrypts all new objects with a KMS key.',
                'Amazon S3 User Guide — "Bucket policy examples - Requiring encryption in transit": The aws:SecureTransport condition denies non-SSL access.',
                'AWS IAM User Guide — "Policies and permissions in IAM": IAM policies are the primary mechanism for access management.',
                'AWS CloudTrail User Guide — "Logging Amazon S3 API calls by using AWS CloudTrail": CloudTrail records object-level API operations when data events are enabled.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 157 — EKS IRSA / OIDC Provider (Multi-select)
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed2-q157',
            type: 'multiple',
            prompt:
                'A company is using an Amazon Elastic Kubernetes Service (Amazon EKS) cluster. The company must ensure that Kubernetes service accounts in the EKS cluster have secure and granular access to specific AWS resources by using IAM roles for service accounts (IRSA). Which combination of solutions will meet these requirements? (Select TWO.)',
            options: [
                'Create an IAM policy that defines the required permissions. Attach the policy directly to the IAM role of the EKS nodes.',
                'Implement network policies within the EKS cluster to prevent Kubernetes service accounts from accessing specific AWS services.',
                'Modify the EKS cluster\'s IAM role to include permissions for each Kubernetes service account. Ensure a one-to-one mapping between IAM roles and Kubernetes roles.',
                'Define an IAM role that includes the necessary permissions. Annotate the Kubernetes service accounts with the Amazon Resource Name (ARN) of the IAM role.',
                'Set up a trust relationship between the IAM roles for the service accounts and an OpenID Connect (OIDC) identity provider.',
            ],
            correctOptionIndexes: [3, 4],
            explanation:
                'IRSA works by associating a Kubernetes service account with an IAM role. The cluster\'s OIDC provider is used to issue and sign tokens. A trust relationship must be established between the IAM role and the cluster\'s OIDC provider (E), allowing STS to accept and verify tokens. The Kubernetes service account is linked to the IAM role by annotating it with the role\'s ARN (D).',
            incorrectOptionExplanations: {
                0: 'Attaching policies to the EKS node\'s IAM role grants permissions to all pods on that node, which is not granular and violates the principle of least privilege.',
                1: 'Kubernetes network policies manage network traffic flow (Layer 3/4) between pods and do not control access to AWS services.',
                2: 'The EKS cluster\'s IAM role is for the Kubernetes control plane to manage AWS resources, not for granting permissions to individual application workloads.',
            },
            references: [
                'Amazon EKS User Guide — "IAM roles for service accounts": Associates an IAM role with a Kubernetes service account to provide AWS permissions to containers.',
                'Amazon EKS User Guide — "Creating an IAM OIDC provider for your cluster": The cluster\'s OIDC identity provider is a prerequisite for IRSA.',
                'Amazon EKS User Guide — "Configuring a Kubernetes service account to assume an IAM role": Annotate the Kubernetes service account with the ARN of the IAM role.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 158 — Control Tower + SCPs / Multi-Account Governance
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed2-q158',
            type: 'single',
            prompt:
                'A company uses AWS Organizations to manage multiple AWS accounts. Each department in the company has its own AWS account. A security team needs to implement centralized governance and control to enforce security best practices across all accounts. The team wants to have control over which AWS services each account can use. The team needs to restrict access to sensitive resources based on IP addresses or geographic regions. The root user must be protected with multi-factor authentication (MFA) across all accounts. Which solution will meet these requirements?',
            options: [
                'Use AWS Identity and Access Management (IAM) to manage IAM users and IAM roles in each account. Implement MFA for the root user in each account. Enforce service restrictions by using AWS managed prefix lists.',
                'Use AWS Control Tower to establish a multi-account environment. Use service control policies (SCPs) to enforce service restrictions in AWS Organizations. Configure MFA for the root user across all accounts.',
                'Use AWS Systems Manager to enforce service restrictions across multiple accounts. Use IAM policies to enforce MFA for the root user across all accounts.',
                'Use AWS IAM Identity Center to manage user access and to enforce service restrictions by using permissions boundaries in each account.',
            ],
            correctOptionIndex: 1,
            explanation:
                'AWS Control Tower sets up and governs a secure multi-account environment using AWS Organizations. SCPs provide centralized control over the maximum available permissions for all accounts, enforcing which AWS services can be used. SCPs can also enforce MFA for the root user and restrict actions based on IP address or geographic region using condition keys.',
            incorrectOptionExplanations: {
                0: 'AWS managed prefix lists are for controlling traffic in security groups and route tables, not for restricting access to AWS services. Managing IAM per account is not a centralized approach.',
                2: 'AWS Systems Manager is for operational management and automation of infrastructure, not for enforcing account-level service permissions.',
                3: 'IAM Identity Center centralizes user access, but permissions boundaries apply to individual IAM roles/users, not as a blanket restriction for an entire account. SCPs are the correct tool.',
            },
            references: [
                'AWS Control Tower User Guide — "What is AWS Control Tower?": Applies guardrails using AWS Organizations SCPs.',
                'AWS Organizations User Guide — "Service control policies (SCPs)": Offers central control over maximum available permissions for all accounts.',
                'AWS Organizations User Guide — "SCP examples - Require MFA for root user": SCPs can deny all actions for root user if MFA is not present.',
                'AWS IAM User Guide — "Permissions boundaries for IAM entities": Boundaries apply to specific entities, not entire accounts.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 159 — S3 Bucket Policy / Cross-Account Access
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed2-q159',
            type: 'single',
            prompt:
                'A company operates an online photo-sharing service and stores data in AWS Account A in a centralized Amazon S3 bucket. The company wants to grant a second AWS account named Account B access to the centralized S3 bucket. The company owns Account B. Which solution will meet these requirements?',
            options: [
                'Enable S3 Transfer Acceleration to provide Account B access to the centralized S3 bucket in Account A.',
                'Enable cross-Region replication between Account A and Account B to share the S3 bucket data.',
                'Use Amazon CloudFront to distribute the S3 bucket contents. Grant Account B access to the bucket contents through a signed URL.',
                'Create a bucket policy that grants Account B permission to access the centralized S3 bucket in Account A.',
            ],
            correctOptionIndex: 3,
            explanation:
                'The most direct and standard method for granting one AWS account access to an S3 bucket in another account is by using a resource-based policy (S3 bucket policy). By attaching a bucket policy to the centralized S3 bucket in Account A, the owner can explicitly grant permissions to a principal in Account B without duplicating data or introducing unnecessary complexity.',
            incorrectOptionExplanations: {
                0: 'S3 Transfer Acceleration speeds up data transfers using AWS edge locations; it does not manage access permissions.',
                1: 'Cross-Region replication copies S3 objects to another bucket for disaster recovery or latency reduction. It does not grant access to the original, centralized bucket.',
                2: 'CloudFront with signed URLs grants temporary, time-limited access to individual objects for end-users, not persistent bucket-level access to another AWS account.',
            },
            references: [
                'AWS S3 Documentation — "Bucket owner granting cross-account bucket permissions": The bucket owner of Account A adds a bucket policy to grant permissions to Account B.',
                'AWS S3 Documentation — "Using bucket policies": A bucket policy is a resource-based IAM policy granting other AWS accounts or IAM users access permissions.',
                'AWS S3 Documentation — "S3 Transfer Acceleration": For speeding up transfers, not access control.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 160 — Internal ALB + NAT Gateway / Site-to-Site VPN
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed2-q160',
            type: 'single',
            prompt:
                "A company wants to deploy an internal web application on AWS. The web application must be accessible only from the company's office. The company needs to download security patches for the web application from the internet. The company has created a VPC and has configured an AWS Site-to-Site VPN connection to the company's office. A solutions architect must design a secure architecture for the web application. Which solution will meet these requirements?",
            options: [
                'Deploy the web application on Amazon EC2 instances in public subnets behind a public Application Load Balancer (ALB). Attach an internet gateway to the VPC. Set the inbound source of the ALB\'s security group to 0.0.0.0/0.',
                'Deploy the web application on Amazon EC2 instances in private subnets behind an internal Application Load Balancer (ALB). Deploy NAT gateways in public subnets. Attach an internet gateway to the VPC. Set the inbound source of the ALB\'s security group to the company\'s office network CIDR block.',
                'Deploy the web application on Amazon EC2 instances in public subnets behind an internal Application Load Balancer (ALB). Deploy NAT gateways in private subnets. Attach an internet gateway to the VPC. Set the outbound destination of the ALB\'s security group to the company\'s office network CIDR block.',
                'Deploy the web application on Amazon EC2 instances in private subnets behind a public Application Load Balancer (ALB). Attach an internet gateway to the VPC. Set the outbound destination of the ALB\'s security group to 0.0.0.0/0.',
            ],
            correctOptionIndex: 1,
            explanation:
                'EC2 instances in private subnets prevent direct internet exposure. An internal ALB has private IP addresses and is only accessible from within the VPC or connected networks (like the office via Site-to-Site VPN). NAT gateways in public subnets allow the private instances to download security patches. The ALB security group is restricted to allow inbound traffic only from the company\'s office network CIDR block.',
            incorrectOptionExplanations: {
                0: 'A public ALB with inbound rule 0.0.0.0/0 exposes the internal application to the entire internet.',
                2: 'NAT gateways must be in public subnets, not private subnets. Outbound security group rules are not the correct mechanism for controlling inbound access.',
                3: 'A public ALB exposes the application to the internet, contradicting the requirement for an internal application accessible only from the company\'s office.',
            },
            references: [
                'AWS VPC User Guide — "Example: VPC with servers in private subnets and NAT": Describes using a NAT gateway in a public subnet for private subnet outbound access.',
                'AWS Elastic Load Balancing User Guide — "Load balancer scheme": Internal load balancers have only private IP addresses.',
                'Amazon EC2 User Guide — "Amazon EC2 security groups": Restricting inbound source to the office CIDR is the correct access control method.',
                'AWS VPC User Guide — "What is a NAT gateway?": NAT gateway must be in a public subnet.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 161 — ALB + Cognito + ADFS Authentication
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed2-q161',
            type: 'single',
            prompt:
                'A company hosts a public application on AWS. The company uses an Application Load Balancer (ALB) to distribute application traffic to multiple Amazon EC2 instances that are hosted in private subnets. The company wants to authenticate all the requests by using an on-premises Active Directory Federation Service (AD FS). The company uses AWS Direct Connect to connect its on-premises data center to AWS. Which solution will meet this requirement?',
            options: [
                'Configure an Amazon Cognito user pool. Integrate the user pool with the ALB for AD FS authentication.',
                'Configure an AWS Directory Service directory. Integrate the directory with the ALB for AD FS authentication.',
                'Replace the ALB with a Network Load Balancer (NLB). Use Amazon Connect Agent Workspace to integrate an agent workspace with the NLB.',
                'Configure an AWS Directory Service AD Connector. Integrate the AD Connector with the ALB for AD FS authentication.',
            ],
            correctOptionIndex: 0,
            explanation:
                'The ALB can be configured to authenticate users before forwarding requests to backend EC2 instances. Amazon Cognito user pools support federation with third-party identity providers using SAML 2.0, which includes Active Directory Federation Services (AD FS). The ALB redirects unauthenticated users to Cognito, which federates with the on-premises AD FS for authentication.',
            incorrectOptionExplanations: {
                1: 'ALBs do not natively integrate with AWS Directory Service for user authentication. The ALB\'s authentication feature works with Amazon Cognito or OIDC-compliant IdPs.',
                2: 'NLBs operate at Layer 4 and lack the Layer 7 capability to perform user authentication. Amazon Connect is a contact center service unrelated to this scenario.',
                3: 'AD Connector acts as a proxy for directory requests but is not an identity provider that can be directly integrated with an ALB for user authentication.',
            },
            references: [
                'AWS Elastic Load Balancing User Guide — "Authenticate users using an Application Load Balancer": Integrates with Amazon Cognito and OIDC-compliant IdPs.',
                'Amazon Cognito Developer Guide — "Adding a SAML identity provider to a user pool": Supports SAML-based IdPs including AD FS.',
                'Elastic Load Balancing User Guide — "What is a Network Load Balancer?": NLBs function at Layer 4 and do not support application-level authentication.',
                'AWS Directory Service Administration Guide — "AD Connector": A directory gateway, not a direct authentication endpoint for an ALB.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 162 — Macie + GuardDuty / Sensitive Data + 24/7 Monitoring
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed2-q162',
            type: 'single',
            prompt:
                'A company recently migrated a large amount of research data to an Amazon S3 bucket. The company needs an automated solution to identify sensitive data in the bucket. A security team also needs to monitor access patterns for the data 24 hours a day, 7 days a week to identify suspicious activities or evidence of tampering with security controls. Which solution will meet these requirements?',
            options: [
                'Set up AWS CloudTrail reporting, and grant the security team read-only access to the CloudTrail reports. Set up an Amazon S3 Inventory report to identify sensitive data. Review the findings with the security team.',
                'Enable Amazon Macie and Amazon GuardDuty on the account. Grant the security team access to Macie and GuardDuty. Review the findings with the security team.',
                'Set up an Amazon S3 Inventory report. Use Amazon Athena and Amazon QuickSight to identify sensitive data. Create a dashboard for the security team to review findings.',
                'Use AWS Identity and Access Management (IAM) Access Advisor to monitor for suspicious activity and tampering. Create a dashboard for the security team. Set up an Amazon S3 Inventory report to identify sensitive data. Review the findings with the security team.',
            ],
            correctOptionIndex: 1,
            explanation:
                'Amazon Macie is a fully managed data security service that uses machine learning to automatically discover and protect sensitive data in Amazon S3. Amazon GuardDuty is a threat detection service that continuously monitors for malicious activity and unauthorized behavior, including analyzing S3 data events to detect suspicious access patterns and potential tampering, providing the required 24/7 monitoring.',
            incorrectOptionExplanations: {
                0: 'Amazon S3 Inventory only provides metadata about objects (name, size, storage class); it does not scan object content to identify sensitive data.',
                2: 'S3 Inventory does not contain information about object content, so it cannot be used with Athena to identify sensitive data.',
                3: 'IAM Access Advisor shows when a user or role last accessed a service to refine permissions. It is not a threat detection tool for suspicious data access patterns.',
            },
            references: [
                'Amazon Macie Documentation — "What is Amazon Macie?": Discovers sensitive data using machine learning and pattern matching.',
                'Amazon GuardDuty Documentation — "What is Amazon GuardDuty?": Continuously monitors for malicious activity including suspicious S3 access patterns.',
                'Amazon S3 Inventory Documentation: Provides a flat file list of objects and metadata; does not scan content.',
                'IAM Access Advisor Documentation: Shows last-accessed service information for refining permissions, not threat detection.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 163 — EMR Security Configuration / Encryption at Rest + In Transit
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed2-q163',
            type: 'single',
            prompt:
                'A healthcare company uses an Amazon EMR cluster to process patient data. The data must be encrypted in transit and at rest. Local volumes in the cluster also need to be encrypted. Which solution will meet these requirements?',
            options: [
                'Create Amazon EBS volumes. Enable encryption. Attach the volumes to the existing EMR cluster.',
                'Create an EMR security configuration that encrypts the data and the volumes as required.',
                'Create an EC2 instance profile for the EMR instances. Configure the instance profile to enforce encryption.',
                'Create a runtime role that has a trust policy for the EMR cluster.',
            ],
            correctOptionIndex: 1,
            explanation:
                'An Amazon EMR security configuration is a reusable set of options that configures encryption for data at rest and in transit. A single configuration can specify settings for Amazon S3 encryption (EMRFS), local disk encryption (including attached EBS volumes), and in-transit encryption between cluster nodes using TLS, comprehensively addressing all requirements.',
            incorrectOptionExplanations: {
                0: 'Manually creating and attaching encrypted EBS volumes is incomplete. It fails to address in-transit encryption between nodes or at-rest encryption for data in S3.',
                2: 'An EC2 instance profile is an IAM role granting permissions to EMR cluster instances. It does not configure encryption settings for local disks or data in transit.',
                3: 'A runtime role is an IAM role used by EMR steps to access other AWS resources. It governs permissions, not the cluster\'s encryption configuration.',
            },
            references: [
                'Amazon EMR Management Guide — "Encryption options": A security configuration is the primary tool for configuring data encryption.',
                'Amazon EMR Management Guide — "Using security configurations to set up cluster security": Covers encryption at rest and in-transit encryption as main categories.',
                'Amazon EMR Management Guide — "At-rest encryption": Includes S3 encryption and local disk encryption (EBS root device and storage volumes).',
                'Amazon EMR Management Guide — "In-transit data encryption": Enables in-transit encryption for open-source applications like Hadoop and Spark.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 164 — S3 Access Points / Bucket Policy Size Quota
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed2-q164',
            type: 'single',
            prompt:
                'A company uses a single Amazon S3 bucket to store data that multiple business applications must access. The company hosts the applications on Amazon EC2 Windows instances that are in a VPC. The company configured a bucket policy for the S3 bucket to grant the applications access to the bucket. The company continually adds more business applications to the environment. As the number of business applications increases, the policy document becomes more difficult to manage. The S3 bucket policy document will soon reach its policy size quota. The company needs a solution to scale its architecture to handle more business applications. Which solution will meet these requirements in the MOST operationally efficient way?',
            options: [
                'Migrate the data from the S3 bucket to an Amazon Elastic File System (Amazon EFS) volume. Ensure that all application owners configure their applications to use the EFS volume.',
                'Deploy an AWS Storage Gateway appliance for each application. Reconfigure the applications to use a dedicated Storage Gateway appliance to access the S3 objects instead of accessing the objects directly.',
                'Create a new S3 bucket for each application. Configure S3 replication to keep the new buckets synchronized with the original S3 bucket. Instruct application owners to use their respective S3 buckets.',
                'Create an S3 access point for each application. Instruct application owners to use their respective S3 access points.',
            ],
            correctOptionIndex: 3,
            explanation:
                'S3 Access Points are designed specifically for this scenario. Each access point has its own distinct access policy, allowing the single large bucket policy to be decomposed into smaller, manageable policies per access point. This is highly scalable (up to 10,000 access points per bucket per Region) and requires no data migration or additional infrastructure.',
            incorrectOptionExplanations: {
                0: 'Migrating to Amazon EFS is a major architectural change from object storage to file storage, operationally intensive and not solving the S3 policy management problem directly.',
                1: 'Deploying AWS Storage Gateway for each application is overly complex and costly. Storage Gateway is primarily for hybrid cloud use cases.',
                2: 'Creating new buckets and using S3 replication introduces significant operational overhead, cost due to data duplication, and management of multiple buckets.',
            },
            references: [
                'AWS S3 Documentation — "Managing data access with Amazon S3 access points": Simplifies managing data access at scale for applications using shared datasets.',
                'AWS S3 Documentation — "S3 Access Points use cases": Allows decomposing one large bucket policy into separate, discrete access point policies per application.',
                'AWS S3 Documentation — "Quotas in Amazon S3": Bucket policy size limit is 20 KB; up to 10,000 access points per bucket per Region.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 165 — S3 + SSE-KMS / Envelope Encryption + Rotation + Audit (Multi-select)
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed2-q165',
            type: 'multiple',
            prompt:
                'A company needs to store confidential files on AWS. The company accesses the files every week. The company must encrypt the files by using envelope encryption, and the encryption keys must be rotated automatically. The company must have an audit trail to monitor encryption key usage. Which combination of solutions will meet these requirements? (Select TWO.)',
            options: [
                'Store the confidential files in Amazon S3.',
                'Store the confidential files in Amazon S3 Glacier Deep Archive.',
                'Use server-side encryption with customer-provided keys (SSE-C).',
                'Use server-side encryption with Amazon S3 managed keys (SSE-S3).',
                'Use server-side encryption with AWS KMS managed keys (SSE-KMS).',
            ],
            correctOptionIndexes: [0, 4],
            explanation:
                'Amazon S3 is appropriate for files with weekly access (standard storage class provides low-latency, high-throughput access). SSE-KMS uses envelope encryption, supports automatic rotation of customer managed keys, and integrates with AWS CloudTrail to log all API requests for KMS keys, providing the required audit trail.',
            incorrectOptionExplanations: {
                1: 'S3 Glacier Deep Archive has retrieval times of hours, making it unsuitable for files that need to be accessed every week.',
                2: 'With SSE-C, the customer is responsible for managing and rotating the encryption keys, which does not meet the requirement for automatic key rotation.',
                3: 'SSE-S3 provides automatic key rotation but does not offer a direct, customer-accessible audit trail for the usage of the master encryption keys themselves.',
            },
            references: [
                'Amazon S3 Documentation — "Using Amazon S3 storage classes": For frequently accessed data, S3 Standard is recommended.',
                'Amazon S3 Documentation — "Server-Side Encryption with AWS KMS keys (SSE-KMS)": Provides an audit trail showing when the KMS key was used and by whom.',
                'AWS KMS Documentation — "Automatic Key Rotation": AWS KMS generates new cryptographic material every year for customer managed keys.',
                'AWS KMS Documentation — "Logging with CloudTrail": All API calls for AWS KMS are captured as CloudTrail events.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 166 — SSM Session Manager + Interface Endpoint + AmazonSSMManagedInstanceCore (Multi-select)
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed2-q166',
            type: 'multiple',
            prompt:
                'A company runs a three-tier web application in a VPC on AWS. The company deployed an Application Load Balancer (ALB) in a public subnet. The web tier and application tier Amazon EC2 instances are deployed in a private subnet. The company uses a self-managed MySQL database that runs on EC2 instances in an isolated private subnet for the database tier. The company wants a mechanism that will give a DevOps team the ability to use SSH to access all the servers. The company also wants to have a centrally managed log of all connections made to the servers. Which combination of solutions will meet these requirements with the MOST operational efficiency? (Select TWO.)',
            options: [
                'Create a bastion host in the public subnet. Configure security groups in the public, private, and isolated subnets to allow SSH access.',
                'Create an interface VPC endpoint for AWS Systems Manager Session Manager. Attach the endpoint to the VPC.',
                'Create an IAM policy that grants access to AWS Systems Manager Session Manager. Attach the IAM policy to the EC2 instances.',
                'Create a gateway VPC endpoint for AWS Systems Manager Session Manager. Attach the endpoint to the VPC.',
                'Attach an AmazonSSMManagedInstanceCore AWS managed IAM policy to all the EC2 instance roles.',
            ],
            correctOptionIndexes: [1, 4],
            explanation:
                'AWS Systems Manager Session Manager provides secure, auditable shell access to instances in private subnets without bastion hosts, open SSH ports, or SSH key management. For Session Manager to work with instances in private subnets lacking internet access, an interface VPC endpoint for SSM is required for private connectivity. The AmazonSSMManagedInstanceCore AWS managed policy provides the necessary core permissions for an instance to be managed by Systems Manager.',
            incorrectOptionExplanations: {
                0: 'A bastion host is less operationally efficient. It requires patching, hardening, user management, and separate logging configuration.',
                2: 'While a custom IAM policy works, using the AmazonSSMManagedInstanceCore managed policy (option E) is more efficient and ensures all necessary permissions are included.',
                3: 'AWS Systems Manager uses interface VPC endpoints for private connectivity, not gateway VPC endpoints. Gateway endpoints are only available for S3 and DynamoDB.',
            },
            references: [
                'AWS Systems Manager Documentation — Session Manager: Provides secure, auditable instance management without opening inbound ports or managing SSH keys.',
                'AWS Systems Manager Documentation — VPC Endpoints: Use interface VPC endpoints for private connectivity to Systems Manager.',
                'AWS Systems Manager Documentation — IAM Permissions: AmazonSSMManagedInstanceCore is the recommended AWS managed policy for the instance profile role.',
                'AWS PrivateLink Documentation: Systems Manager integrates with AWS PrivateLink using interface VPC endpoints, not gateway endpoints.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 167 — IAM Roles / Least Privilege / Developer Access
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed2-q167',
            type: 'single',
            prompt:
                "A company needs to grant a team of developers access to the company's AWS resources. The company must maintain a high level of security for the resources. The company requires an access control solution that will prevent unauthorized access to the sensitive data. Which solution will meet these requirements?",
            options: [
                'Share the IAM user credentials for each development team member with the rest of the team to simplify access management and to streamline development workflows.',
                'Define IAM roles that have fine-grained permissions based on the principle of least privilege. Assign an IAM role to each developer.',
                'Create IAM access keys to grant programmatic access to AWS resources. Allow only developers to interact with AWS resources through API calls by using the access keys.',
                'Create an AWS Cognito user pool. Grant developers access to AWS resources by using the user pool.',
            ],
            correctOptionIndex: 1,
            explanation:
                'IAM roles with permissions defined by the principle of least privilege provide temporary security credentials, which is an AWS security best practice reducing the risk of compromised long-term keys. Roles with fine-grained permissions tailored to specific job functions ensure team members have only the access they need.',
            incorrectOptionExplanations: {
                0: 'Sharing credentials is a critical security anti-pattern. It eliminates individual accountability and makes it impossible to trace actions to a specific person.',
                2: 'Long-lived access keys are a higher security risk than temporary credentials provided by IAM roles.',
                3: 'Amazon Cognito is primarily designed for managing user identity for customer-facing web and mobile applications, not for managing permissions for internal development teams accessing AWS resources.',
            },
            references: [
                'AWS IAM best practices — "Security best practices in IAM": Recommends granting least privilege and using temporary credentials via IAM roles.',
                'AWS IAM roles documentation: Roles provide temporary security credentials without long-term access keys.',
                'What is Amazon Cognito? — Amazon Cognito Developer Guide: Primarily for web and mobile app end-users, not internal AWS administrators.',
                'Managing IAM users: Advises against sharing IAM user credentials.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 168 — IAM Identity Center + Fine-Grained Roles / Developer Environment
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed2-q168',
            type: 'single',
            prompt:
                'A company is setting up a development environment on AWS for a team of developers. The team needs to access multiple Amazon S3 buckets to store project data. The team also needs to use Amazon EC2 to run development instances. The company needs to ensure that the developers have access only to specific Amazon S3 buckets and EC2 instances. Access permissions must be assigned according to each developer\'s role on the team. The company wants to minimize the use of permanent credentials and to ensure access is securely managed according to the principle of least privilege. Which solution will meet these requirements?',
            options: [
                'Create IAM roles that have administrative-level permissions for Amazon S3 and Amazon EC2. Require developers to sign in by using Amazon Cognito to access Amazon S3 and Amazon EC2.',
                'Create IAM roles that have fine-grained permissions for Amazon S3 and Amazon EC2. Configure AWS IAM Identity Center to manage credentials for the developers.',
                'Create IAM users that have programmatic access to Amazon S3 and Amazon EC2. Generate individual access keys for each developer to access Amazon S3 and Amazon EC2.',
                'Create a VPC endpoint for Amazon S3. Require developers to access Amazon EC2 instances and Amazon S3 buckets through a bastion host.',
            ],
            correctOptionIndex: 1,
            explanation:
                'AWS IAM Identity Center (formerly AWS SSO) centrally manages workforce access to AWS accounts. It assigns users to groups mapped to permission sets using IAM roles with fine-grained policies enforcing the principle of least privilege. This provides users with temporary credentials for accessing EC2 and S3, minimizing the security risks associated with permanent access keys.',
            incorrectOptionExplanations: {
                0: 'Granting "administrative-level permissions" directly violates the principle of least privilege.',
                2: 'Creating IAM users with individual access keys results in long-lived, permanent credentials, contradicting the requirement to minimize their use.',
                3: 'A VPC endpoint and a bastion host are network security controls. They do not address identity management, role-based access, or permission granularity.',
            },
            references: [
                'AWS IAM Identity Center User Guide — "What is AWS IAM Identity Center?": Centrally manages access using permission sets assigned to users and groups.',
                'AWS IAM User Guide — "Security best practices in IAM": Recommends using temporary credentials from an identity provider via IAM Identity Center.',
                'AWS IAM roles documentation: Roles provide temporary security credentials without long-term access keys.',
                'AWS IAM User Guide — "Grant least privilege": Create policies with minimum required permissions.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 169 — CloudFront Field-Level Encryption
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed2-q169',
            type: 'single',
            prompt:
                'A solutions architect is creating a new Amazon CloudFront distribution for an application. Some of the information submitted by users is sensitive. The application uses HTTPS but needs another layer of security. The sensitive information should be protected throughout the entire application stack, and access to the information should be restricted to certain applications. Which action should the solutions architect take?',
            options: [
                'Configure a CloudFront signed URL.',
                'Configure a CloudFront signed cookie.',
                'Configure a CloudFront field-level encryption profile.',
                'Configure CloudFront and set the Origin Protocol Policy setting to HTTPS Only for the Viewer Protocol Policy.',
            ],
            correctOptionIndex: 2,
            explanation:
                'Amazon CloudFront field-level encryption provides an additional layer of security on top of HTTPS. It encrypts specific sensitive data fields in a POST request at the CloudFront edge location using a public key. This data remains encrypted throughout the application stack until it reaches a specific backend application that holds the corresponding private key. This directly addresses the need to protect sensitive information throughout the stack and restrict access to certain applications.',
            incorrectOptionExplanations: {
                0: 'A CloudFront signed URL provides time-limited, restricted access to individual files, not to encrypt specific data fields within a user\'s request.',
                1: 'A CloudFront signed cookie provides time-limited, restricted access to multiple files, not to encrypt specific data fields within a user\'s request.',
                3: 'Enforcing HTTPS via the Viewer Protocol Policy is standard practice but does not add granular data field-level protection.',
            },
            references: [
                'AWS CloudFront Developer Guide — "Using field-level encryption": Sensitive information is encrypted at the edge and only certain components in the application stack can see the data.',
                'AWS CloudFront Developer Guide — "Choosing between signed URLs and signed cookies": Signed URLs/cookies are for access restriction, not data field encryption.',
                'AWS CloudFront Developer Guide — "Requiring HTTPS for communication between viewers and CloudFront": Enforces transport-level security, not field-level encryption.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 170 — Secrets Manager / RDS PostgreSQL Password Rotation
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed2-q170',
            type: 'single',
            prompt:
                'A company uses Amazon RDS for PostgreSQL databases for its data tier. The company must implement password rotation for the databases. Which solution meets this requirement with the LEAST operational overhead?',
            options: [
                'Store the password in AWS Secrets Manager. Enable automatic rotation on the secret.',
                'Store the password in AWS Systems Manager Parameter Store. Enable automatic rotation on the parameter.',
                'Store the password in AWS Systems Manager Parameter Store. Write an AWS Lambda function that rotates the password.',
                'Store the password in AWS Key Management Service (AWS KMS). Enable automatic rotation on the AWS KMS key.',
            ],
            correctOptionIndex: 0,
            explanation:
                'AWS Secrets Manager provides native, automated rotation capabilities for Amazon RDS for PostgreSQL. By enabling automatic rotation, Secrets Manager uses a pre-configured Lambda function to handle the entire process of changing the password in the database and updating the stored secret. This requires minimal configuration and no custom code.',
            incorrectOptionExplanations: {
                1: 'AWS Systems Manager Parameter Store does not have a native, built-in feature for automatic secret rotation for RDS database credentials, requiring a custom solution.',
                2: 'While functional, writing and maintaining a custom Lambda rotation function represents significantly more operational overhead than Secrets Manager\'s managed rotation.',
                3: 'AWS KMS is used to manage cryptographic keys, not to store secrets like passwords. KMS key rotation rotates the key material, not the database password.',
            },
            references: [
                'AWS Secrets Manager User Guide — "Rotating your AWS Secrets Manager secrets": For supported AWS services including Amazon RDS, Secrets Manager provides managed rotation.',
                'AWS Secrets Manager User Guide — "Compare AWS Secrets Manager and AWS Systems Manager Parameter Store": Secrets Manager offers built-in RDS rotation; Parameter Store does not.',
                'AWS KMS Developer Guide — "Rotating AWS KMS keys": KMS automatic rotation changes only the backing key, not external secrets like database passwords.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 171 — S3 Bucket Policy / Cross-Account / Multi-Agency Data Sharing
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed2-q171',
            type: 'single',
            prompt:
                'A company collects 10 GB of telemetry data every day from multiple devices. The company stores the data in an Amazon S3 bucket that is in a source data account. The company has hired several consulting agencies to analyze the company\'s data. Each agency has a unique AWS account. Each agency requires read access to the company\'s data. The company needs a secure solution to share the data from the source data account to the consulting agencies. Which solution will meet these requirements with the LEAST operational effort?',
            options: [
                'Set up an Amazon CloudFront distribution. Use the S3 bucket as the origin.',
                'Make the S3 bucket public for a limited time. Inform only the agencies that the bucket is publicly accessible.',
                'Configure cross-account access for the S3 bucket to the accounts that the agencies own.',
                'Set up an IAM user for each agency in the source data account. Grant each agency IAM user access to the company\'s S3 bucket.',
            ],
            correctOptionIndex: 2,
            explanation:
                'The most secure and operationally efficient solution is to use a resource-based policy (S3 bucket policy) to grant cross-account read-only access. This allows the source account to explicitly grant permissions to the specific AWS accounts of the consulting agencies. The agencies then use their own IAM roles and users to access the bucket, following the principle of least privilege.',
            incorrectOptionExplanations: {
                0: 'Setting up a CloudFront distribution is for content delivery and caching, not direct data sharing between specific accounts. It adds unnecessary complexity.',
                1: 'Making an S3 bucket public, even temporarily, is a severe security risk exposing the data to the entire internet.',
                3: 'Creating IAM users for each agency in the source account is an anti-pattern that creates significant operational overhead for managing external credentials.',
            },
            references: [
                'Amazon S3 Developer Guide — "Bucket policy examples - Bucket owner granting cross-account bucket permissions": Details granting permissions to an external AWS account.',
                'AWS IAM User Guide — "How IAM roles differ from resource-based policies": For S3, a resource-based policy is a direct approach for cross-account access.',
                'Amazon S3 Developer Guide — "Blocking public access to your Amazon S3 storage": Warns against making buckets public.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 172 — WAF Logging / Data Firehose / Traffic Analysis + Security
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed2-q172',
            type: 'single',
            prompt:
                'A company uses AWS to host a public website. The load on the web servers recently increased. The company wants to learn more about the traffic flow and traffic sources. The company also wants to increase the overall security of the website. Which solution will meet these requirements?',
            options: [
                'Deploy AWS WAF and set up logging. Use Amazon Data Firehose to deliver the log files to an Amazon S3 bucket for analysis.',
                'Deploy Amazon API Gateway and set up logging. Use Amazon Kinesis Data Streams to deliver the log files to an Amazon S3 bucket for analysis.',
                'Deploy a Network Load Balancer and set up logging. Use Amazon Data Firehose to deliver the log files to an Amazon S3 bucket for analysis.',
                'Deploy an Application Load Balancer and set up logging. Use Amazon Kinesis Data Streams to deliver the log files to an Amazon S3 bucket for analysis.',
            ],
            correctOptionIndex: 0,
            explanation:
                'AWS WAF is designed to protect web applications from common exploits, meeting the security requirement. WAF provides full logging of all requests it inspects, including source IP addresses, headers, and URIs, satisfying the need to learn about traffic flow and sources. Amazon Data Firehose is an efficient managed way to stream these logs directly to an S3 bucket for analysis.',
            incorrectOptionExplanations: {
                1: 'API Gateway is for managing APIs, not for securing a general public website. WAF is the more appropriate security service.',
                2: 'An NLB operates at Layer 4 (TCP/UDP) and cannot inspect web traffic content, thus cannot provide web application security against common exploits.',
                3: 'While an ALB is suitable for websites, it does not inherently provide the advanced web exploit protection that AWS WAF does.',
            },
            references: [
                'AWS WAF Developer Guide — "What is AWS WAF?": Monitors HTTP/HTTPS requests and allows or blocks based on conditions like source IP or query strings.',
                'AWS WAF Developer Guide — "Logging web ACL traffic information": WAF logs can be sent to CloudWatch Logs, an S3 bucket, or Kinesis Data Firehose.',
                'Amazon Kinesis Data Firehose Developer Guide: A fully managed service for delivering real-time streaming data to destinations like Amazon S3.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 173 — Secrets Manager / RDS MySQL Rotation / Application Availability
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed2-q173',
            type: 'single',
            prompt:
                'A company has a web application that uses several web servers that run on Amazon EC2 instances. The instances use a shared Amazon RDS for MySQL database. The company requires a secure method to store database credentials. The credentials must be automatically rotated every 30 days without affecting application availability. Which solution will meet these requirements?',
            options: [
                'Store database credentials in AWS Secrets Manager. Create an AWS Lambda function to automatically rotate the credentials. Use Amazon EventBridge to run the Lambda function on a schedule. Grant the necessary IAM permissions to allow the web servers to access Secrets Manager.',
                'Store database credentials in AWS Systems Manager OpsCenter. Grant the necessary IAM permissions to allow the web servers to access OpsCenter.',
                'Store database credentials in an Amazon S3 bucket. Create an AWS Lambda function to automatically rotate the credentials. Use Amazon EventBridge to run the Lambda function on a schedule. Grant the necessary IAM permissions to allow the web servers to retrieve credentials from the S3 bucket.',
                'Store the credentials in a local file on each of the web servers. Use an AWS KMS key to encrypt the credentials. Create a cron job on each server to rotate the credentials every 30 days.',
            ],
            correctOptionIndex: 0,
            explanation:
                'AWS Secrets Manager provides native, automated rotation for Amazon RDS for MySQL. The rotation process uses a staging label (AWSPENDING) during the update, ensuring the application can retrieve new credentials without interruption. Using an IAM role attached to the EC2 instances is the secure standard way to grant applications permission to retrieve secrets.',
            incorrectOptionExplanations: {
                1: 'AWS Systems Manager OpsCenter is for viewing, investigating, and resolving operational issues; it is not designed for storing or rotating secrets.',
                2: 'Storing credentials in an S3 bucket is not a security best practice. Secrets Manager provides superior security features including managed rotation and auditing.',
                3: 'Storing credentials on local files with cron jobs is not scalable, has high management overhead, and risks downtime if rotation fails or is uncoordinated across servers.',
            },
            references: [
                'AWS Secrets Manager User Guide — "What is AWS Secrets Manager?": Manages, retrieves, and rotates database credentials throughout their lifecycle.',
                'AWS Secrets Manager User Guide — "Rotate AWS Secrets Manager secrets": For supported services like Amazon RDS MySQL, Secrets Manager updates credentials in both the secret and the database.',
                'AWS Secrets Manager User Guide — "How rotation works": Uses staging labels (AWSPENDING, AWSCURRENT, AWSPREVIOUS) to ensure continuous application function during rotation.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 174 — SAML 2.0 Federation / Active Directory / No New Identity
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed2-q174',
            type: 'single',
            prompt:
                'A company wants to provide users with access to AWS resources. The company has 1,500 users and manages their access to on-premises resources through Active Directory user groups on the corporate network. However, the company does not want users to have to maintain another identity to access the resources. A solutions architect must manage user access to the AWS resources while preserving access to the on-premises resources. What should the solutions architect do to meet these requirements?',
            options: [
                'Create an IAM user for each user in the company. Attach the appropriate policies to each user.',
                'Use Amazon Cognito with an Active Directory user pool. Create roles with the appropriate policies attached.',
                'Define cross-account roles with the appropriate policies attached. Map the roles to the Active Directory groups.',
                'Configure Security Assertion Markup Language (SAML) 2.0-based federation. Create roles with the appropriate policies attached. Map the roles to the Active Directory groups.',
            ],
            correctOptionIndex: 3,
            explanation:
                'SAML 2.0-based federation allows the company to use its existing on-premises Active Directory as an Identity Provider (IdP). Users authenticate with their corporate credentials, and the IdP sends a SAML assertion to AWS, which provides temporary security credentials. By mapping Active Directory groups to IAM roles, the company can centrally manage permissions using existing group structures without creating new identities.',
            incorrectOptionExplanations: {
                0: 'Creating an IAM user for each of the 1,500 users directly contradicts the requirement that users should not maintain another identity and creates significant administrative overhead.',
                1: 'Amazon Cognito is primarily designed for adding sign-up, sign-in, and access control to web and mobile apps, not for federating corporate users for direct AWS console access.',
                2: 'Cross-account roles are used to grant access between different AWS accounts. They do not establish the trust relationship between an on-premises identity provider and an AWS account.',
            },
            references: [
                'AWS IAM User Guide — "About SAML 2.0-based federation": Enables using an on-premises IdP to create a trust relationship with AWS and create roles that map to IdP-defined identities.',
                'AWS IAM User Guide — "Security best practices in IAM": Recommends requiring human users to use federation with an IdP to access AWS using temporary credentials.',
                'Amazon Cognito Developer Guide — "What is Amazon Cognito?": Primarily for application user management, not corporate identity federation for AWS resource access.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 175 — S3 Object Lambda / PII Redaction / Multiple Apps
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed2-q175',
            type: 'single',
            prompt:
                'An ecommerce company stores terabytes of customer data in the AWS Cloud. The data contains personally identifiable information (PII). The company wants to use the data in three applications. Only one of the applications needs to process the PII. The PII must be removed before the other two applications process the data. Which solution will meet these requirements with the LEAST operational overhead?',
            options: [
                'Store the data in an Amazon DynamoDB table. Create a proxy application layer to intercept and process the data that each application requests.',
                'Store the data in an Amazon S3 bucket. Process and transform the data by using S3 Object Lambda before returning the data to the requesting application.',
                'Process the data and store the transformed data in three separate Amazon S3 buckets so that each application has its own custom dataset. Point each application to its respective S3 bucket.',
                'Process the data and store the transformed data in three separate Amazon DynamoDB tables so that each application has its own custom dataset. Point each application to its respective DynamoDB table.',
            ],
            correctOptionIndex: 1,
            explanation:
                'S3 Object Lambda allows you to invoke an AWS Lambda function to process and transform data as it is being retrieved, enabling on-the-fly redaction of PII for the two applications that do not require it, while the third application accesses the original data. This avoids creating and managing multiple data copies or building a separate proxy infrastructure.',
            incorrectOptionExplanations: {
                0: 'A custom proxy application layer must be built, scaled, and maintained, creating significant operational overhead.',
                2: 'Storing data in three separate S3 buckets results in data duplication and requires an ETL process to keep datasets synchronized, increasing storage costs and management overhead.',
                3: 'Same data duplication and management overhead as option C, plus DynamoDB is generally less cost-effective for storing terabytes of raw data compared to S3.',
            },
            references: [
                'Amazon S3 User Guide — "Transforming objects with S3 Object Lambda": Primary use cases include redacting PII for analytics or non-production environments without storing derivative copies.',
                'AWS Documentation — "Using AWS Lambda with Amazon S3 Object Lambda": S3 Object Lambda intercepts GetObject requests and invokes Lambda to modify data before returning it to the application.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 176 — CloudTrail Log File Validation + SSE-KMS Config (Multi-select)
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed2-q176',
            type: 'multiple',
            prompt:
                'A company wants to migrate its accounting system from an on-premises data center to the AWS Cloud in a single AWS Region. Data security and an immutable audit log are the top priorities. The company must monitor all AWS activities for compliance auditing. The company has enabled AWS CloudTrail but wants to make sure it meets these requirements. Which actions should a solutions architect take to protect and secure CloudTrail? (Select TWO.)',
            options: [
                'Enable CloudTrail log file validation.',
                'Install the CloudTrail Processing Library.',
                'Enable logging of Insights events in CloudTrail.',
                'Enable custom logging from the on-premises resources.',
                'Create an AWS Config rule to monitor whether CloudTrail is configured to use server-side encryption with AWS KMS managed encryption keys (SSE-KMS).',
            ],
            correctOptionIndexes: [0, 4],
            explanation:
                'Enabling CloudTrail log file validation (A) directly addresses the immutability requirement by creating digitally signed digest files for each log, allowing verification that logs have not been altered. Creating an AWS Config rule to monitor SSE-KMS encryption on CloudTrail (E) addresses the data security requirement, ensuring logs are encrypted at rest and this security control is continuously monitored.',
            incorrectOptionExplanations: {
                1: 'The CloudTrail Processing Library is a Java library for building applications that consume and process CloudTrail logs; it does not secure the logs themselves.',
                2: 'CloudTrail Insights detects unusual API activity but does not protect the integrity or confidentiality of log files.',
                3: 'This is out of scope. The question is about securing AWS CloudTrail logs, not logs from on-premises systems.',
            },
            references: [
                'AWS CloudTrail User Guide — "Validating CloudTrail log file integrity": Log file validation helps determine if a log file was unchanged, deleted, or modified after delivery.',
                'AWS CloudTrail User Guide — "Security best practices in AWS CloudTrail": Recommends encrypting CloudTrail log files with SSE-KMS.',
                'AWS Config Developer Guide — cloudtrail-encryption-enabled: A managed rule that checks whether CloudTrail is configured to use SSE-KMS.',
                'AWS CloudTrail User Guide — "What Is the AWS CloudTrail Processing Library?": A tool for processing CloudTrail logs, not for securing them.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 177 — Two-Tier VPC / ALB Public + EC2 + RDS Private
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed2-q177',
            type: 'single',
            prompt:
                'A solutions architect is designing the architecture for a two-tier web application. The web application consists of an internet-facing Application Load Balancer (ALB) that forwards traffic to an Auto Scaling group of Amazon EC2 instances. The EC2 instances must be able to access an Amazon RDS database. The company does not want to rely solely on security groups or network ACLs. Only the minimum resources that are necessary should be routable from the internet. Which network design meets these requirements?',
            options: [
                'Place the ALB, EC2 instances, and RDS database in private subnets.',
                'Place the ALB in public subnets. Place the EC2 instances and RDS database in private subnets.',
                'Place the ALB and EC2 instances in public subnets. Place the RDS database in private subnets.',
                'Place the ALB outside the VPC. Place the EC2 instances and RDS database in private subnets.',
            ],
            correctOptionIndex: 1,
            explanation:
                'An internet-facing ALB must be placed in public subnets to be accessible from the internet. EC2 instances only need to receive traffic from the ALB, so placing them in private subnets minimizes exposure. The RDS database should be in private subnets for maximum security, accessible only from the application tier. This design exposes only the necessary component (the ALB) to the internet.',
            incorrectOptionExplanations: {
                0: 'An internet-facing ALB cannot be placed in private subnets as it would not be able to receive traffic directly from the internet.',
                2: 'Placing EC2 instances in public subnets unnecessarily increases the attack surface, violating the requirement to minimize resources routable from the internet.',
                3: 'An Application Load Balancer must be provisioned within a VPC and associated with specific subnets; it cannot exist "outside the VPC".',
            },
            references: [
                'AWS Elastic Load Balancing User Guide — "Subnets for your load balancer": An internet-facing load balancer requires at least two public subnets.',
                'AWS VPC User Guide — "Example: VPC with servers in private subnets and NAT": Illustrates ALB in public subnets with application instances in private subnets.',
                'AWS Well-Architected Framework — Security Pillar: Place resources in private subnets when they don\'t require direct internet access.',
                'Amazon RDS User Guide — "Scenarios for accessing a DB instance in a VPC": Recommends private subnets for DB instances.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 178 — S3 Object Lock Compliance Mode / Regulatory Retention
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed2-q178',
            type: 'single',
            prompt:
                'A company needs to implement a new data retention policy for regulatory compliance. As part of this policy, sensitive documents that are stored in an Amazon S3 bucket must be protected from deletion or modification for a fixed period of time. Which solution will meet these requirements?',
            options: [
                'Activate S3 Object Lock on the required objects and enable governance mode.',
                'Activate S3 Object Lock on the required objects and enable compliance mode.',
                'Enable versioning on the S3 bucket. Set a lifecycle policy to delete the objects after a specified period.',
                'Configure an S3 Lifecycle policy to transition objects to S3 Glacier Flexible Retrieval for the retention duration.',
            ],
            correctOptionIndex: 1,
            explanation:
                'S3 Object Lock in compliance mode provides the highest level of immutability. When an object is locked in compliance mode, no user (including root) can overwrite or delete the protected object version until the retention period expires. The retention period cannot be shortened and the mode cannot be changed.',
            incorrectOptionExplanations: {
                0: 'Governance mode allows users with special permissions (s3:BypassGovernanceRetention) to override the lock, which may not meet strict regulatory compliance requirements.',
                2: 'Versioning protects against accidental deletion, but a user with sufficient permissions can intentionally delete all versions.',
                3: 'Transitioning objects to S3 Glacier is an archival strategy for cost savings. It does not provide WORM protection; objects can still be deleted.',
            },
            references: [
                'Amazon S3 User Guide — "S3 Object Lock retention modes": In compliance mode, a protected object version cannot be overwritten or deleted by any user including root.',
                'Amazon S3 User Guide — "How S3 Object Lock works": Details the WORM model and contrasts governance and compliance modes.',
                'Amazon S3 User Guide — "Using versioning in S3 buckets": Versioning alone is insufficient for WORM compliance.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 179 — Root User Security / MFA + Password Reset (Multi-select)
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed2-q179',
            type: 'multiple',
            prompt:
                'The lead member of a DevOps team creates an AWS account. A DevOps engineer shares the account credentials with a solutions architect through a password manager application. The solutions architect needs to secure the root user for the new account. Which actions will meet this requirement? (Select TWO.)',
            options: [
                'Update the root user password to a new, strong password.',
                'Secure the root user account by using a virtual multi-factor authentication (MFA) device.',
                'Create an IAM user for each member of the DevOps team. Assign the AdministratorAccess AWS managed policy to each IAM user.',
                'Create root user access keys. Save the keys as a new parameter in AWS Systems Manager Parameter Store.',
                'Update the IAM role for the root user to ensure the root user can use only approved services.',
            ],
            correctOptionIndexes: [0, 1],
            explanation:
                'Changing the root user password to a new, strong, and unique value immediately invalidates the shared credentials (A). Enabling a virtual MFA device adds a crucial second layer of security, requiring a time-based one-time password in addition to the password for login, protecting the account even if the password is compromised (B).',
            incorrectOptionExplanations: {
                2: 'Creating IAM users is a vital practice for daily operations but does not secure the root user itself. The root user would remain vulnerable without a strong password and MFA.',
                3: 'Creating access keys for the root user is strongly discouraged by AWS security best practices. Programmatic access should be handled through IAM roles.',
                4: 'The root user\'s permissions cannot be restricted by an IAM role or policy. The root user has ultimate authority over the account by definition.',
            },
            references: [
                'AWS IAM User Guide — "Security best practices in IAM": Use a strong and unique password for the root user; enable MFA on the root user.',
                'AWS IAM User Guide — "Security best practices in IAM - Lock away root access keys": Do not create access keys for the root user.',
                'AWS IAM User Guide — "IAM JSON policy elements: Principal": IAM policies cannot explicitly deny root user access to resources.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 180 — Lake Formation Tag-Based Access Control / Data Lake
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed2-q180',
            type: 'single',
            prompt:
                'A company wants to use a data lake that is hosted on Amazon S3 to provide analytics services for historical data. The data lake consists of 800 tables but is expected to grow to thousands of tables. More than 50 departments use the tables, and each department has hundreds of users. Different departments need access to specific tables and columns. Which solution will meet these requirements with the LEAST operational overhead?',
            options: [
                'Create an IAM role for each department. Use AWS Lake Formation based access control to grant each IAM role access to specific tables and columns. Use Amazon Athena to analyze the data.',
                'Create an Amazon Redshift cluster for each department. Use AWS Glue to ingest into the Redshift cluster only the tables and columns that are relevant to that department. Create Redshift database users. Grant the users access to the relevant department\'s Redshift cluster. Use Amazon Redshift to analyze the data.',
                'Create an IAM role for each department. Use AWS Lake Formation tag-based access control to grant each IAM role access to only the relevant resources. Create LF-tags that are attached to tables and columns. Use Amazon Athena to analyze the data.',
                'Create an Amazon EMR cluster for each department. Configure an IAM service role for each EMR cluster to access relevant S3 files. For each department\'s users, create an IAM role that provides access to the relevant EMR cluster. Use Amazon EMR to analyze the data.',
            ],
            correctOptionIndex: 2,
            explanation:
                'AWS Lake Formation\'s tag-based access control (LF-TBAC) is the most scalable and efficient solution. By assigning LF-tags to tables and columns (e.g., department=finance), administrators create a small number of policies granting permissions based on tags. When new tables are added, they only need to be tagged correctly to inherit appropriate permissions automatically, significantly reducing operational overhead.',
            incorrectOptionExplanations: {
                0: 'This approach is functional but has high operational overhead. Manually granting permissions for each of the thousands of tables to over 50 department roles is not scalable.',
                1: 'Creating a Redshift cluster for each department is prohibitively expensive and creates immense operational overhead for managing clusters, users, and data ingestion pipelines.',
                3: 'Managing an Amazon EMR cluster per department is operationally complex and costly. Fine-grained table and column-level access through IAM policies on S3 files is difficult.',
            },
            references: [
                'AWS Lake Formation Developer Guide — "AWS Lake Formation tag-based access control": LF-TBAC helps manage permissions on Data Catalog resources at scale.',
                'AWS Lake Formation Developer Guide — "Overview of access control methods in Lake Formation": LF-TBAC simplifies permissions management when the number of resources or principals is large.',
                'AWS Big Data Blog — "Govern data across accounts with AWS Lake Formation": LF-TBAC allows defining policies once and applying them using tags, simplifying governance at scale.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 181 — KMS Imported Key Material / Manual Rotation / Same Key ID
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed2-q181',
            type: 'single',
            prompt:
                'A company must follow strict regulations for the management of data encryption keys. The company manages its own key externally and imports the key into AWS Key Management Service (AWS KMS). The company must control the imported key material and must rotate the key material on a regular schedule. A solutions architect needs to import the key material into AWS KMS and rotate the key without interrupting applications that use the key. Which solution will meet these requirements?',
            options: [
                'Create a new AWS KMS key that has the same key ID as the existing key. Import new key material into the key.',
                'Schedule the existing AWS KMS key for deletion. Create a new KMS key that has new key material.',
                'Import new key material into the existing AWS KMS key. Set an expiration time for the old key material.',
                'Enable automatic key rotation for the existing AWS KMS key.',
            ],
            correctOptionIndex: 2,
            explanation:
                'For KMS keys with imported key material (origin EXTERNAL), the correct procedure for manual rotation is importing new key material into the existing KMS key. This action preserves the key\'s metadata, including its Key ID and ARN. Since applications reference the key by its ID or ARN, they can continue to function without any changes or interruptions.',
            incorrectOptionExplanations: {
                0: 'AWS KMS key IDs are globally unique identifiers. It is impossible to create a new KMS key with the same key ID as an existing key.',
                1: 'Creating a new KMS key generates a new key ID. All applications would need to be reconfigured to use the new key, causing service interruption.',
                3: 'Automatic key rotation is only available for symmetric encryption KMS keys with key material generated by AWS (origin AWSKMS), not for keys with imported material.',
            },
            references: [
                'AWS KMS Developer Guide — "Rotating imported key material": Manual rotation imports new key material to replace existing material, preserving the key ID.',
                'AWS KMS Developer Guide — "How automatic key rotation works": Automatic rotation cannot be enabled for KMS keys with imported key material.',
                'AWS KMS Developer Guide — "AWS KMS key identifiers (Key ID)": Key IDs are unique and cannot be duplicated.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 182 — AWS Config / Configuration Recorder / Configuration Items
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed2-q182',
            type: 'single',
            prompt:
                'A company runs production workloads in its AWS account. Multiple teams create and maintain the workloads. The company needs to be able to detect changes in resource configurations. The company needs to capture changes as configuration items without changing or modifying the existing resources. Which solution will meet these requirements?',
            options: [
                'Use AWS Config. Start the configuration recorder for AWS resources to detect changes in resource configurations.',
                'Use AWS CloudFormation. Initiate drift detection to capture changes in resource configurations.',
                'Use Amazon Detective to detect, analyze, and investigate changes in resource configurations.',
                'Use AWS Audit Manager to capture management events and global service events for resource configurations.',
            ],
            correctOptionIndex: 0,
            explanation:
                'AWS Config is the designated service for assessing, auditing, and evaluating resource configurations. It continuously monitors and records resource configurations, capturing them as "configuration items." The term "configuration items" is specific AWS Config terminology. This process is non-intrusive and provides the exact functionality required without modifying the resources.',
            incorrectOptionExplanations: {
                1: 'AWS CloudFormation drift detection is limited to resources managed within a CloudFormation stack and compares current state only to the template-defined state.',
                2: 'Amazon Detective is a security service for investigating potential security issues by analyzing log data; it does not track resource configuration history.',
                3: 'AWS Audit Manager is a compliance service that automates evidence collection for audits; it relies on data from services like AWS Config but does not perform the primary capture itself.',
            },
            references: [
                'AWS Config Developer Guide — "What Is AWS Config?": Provides a detailed view of AWS resource configurations; a configuration item (CI) represents a point-in-time view of resource attributes.',
                'AWS Config Developer Guide — "Managing the Configuration Recorder": The configuration recorder stores supported resource configurations as configuration items.',
                'AWS CloudFormation User Guide — "Detecting unmanaged configuration changes": Drift detection is limited to CloudFormation stack resources.',
                'Amazon Detective Administrator Guide — "What is Amazon Detective?": Focused on security investigations, not configuration tracking.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 183 — ECS Task Role + Specific Bucket ARNs (Multi-select)
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed2-q183',
            type: 'multiple',
            prompt:
                'A company runs an application as a task in an Amazon Elastic Container Service (Amazon ECS) cluster. The application must have read and write access to a specific group of Amazon S3 buckets. The S3 buckets are in the same AWS Region and AWS account as the ECS cluster. The company needs to grant the application access to the S3 buckets according to the principle of least privilege. Which combination of solutions will meet these requirements? (Select TWO.)',
            options: [
                'Add a tag to each bucket. Create an IAM policy that includes a StringEquals condition that matches the tags and values of the buckets.',
                'Create an IAM policy that lists the full Amazon Resource Name (ARN) for each S3 bucket.',
                'Attach the IAM policy to the instance role of the ECS task.',
                'Create an IAM policy that includes a wildcard Amazon Resource Name (ARN) that matches all combinations of the S3 bucket names.',
                'Attach the IAM policy to the task role of the ECS task.',
            ],
            correctOptionIndexes: [1, 4],
            explanation:
                'The most specific way to grant access to a known group of S3 buckets is by explicitly listing the full ARN for each bucket in the IAM policy\'s Resource element. In Amazon ECS, the correct mechanism for granting AWS permissions to an application running within a container is the IAM task role, which is associated directly with the task definition.',
            incorrectOptionExplanations: {
                0: 'While using tags is a valid and scalable method, listing specific ARNs is more explicit and granular for a predefined set of resources, better embodying least privilege.',
                2: 'Attaching the policy to the instance role grants permissions to the EC2 host and all tasks running on it, which violates the principle of least privilege.',
                3: 'Using a broad wildcard in the ARN is less secure and could inadvertently grant access to unintended buckets.',
            },
            references: [
                'Amazon ECS Developer Guide — "IAM roles for tasks": Using task roles grants permissions to specific tasks rather than all tasks on an instance.',
                'AWS IAM User Guide — "Granting least privilege": Start with a minimum set of permissions; listing full ARNs is the standard method for identifying specific resources.',
                'AWS IAM User Guide — "IAM JSON policy elements: Resource": Full ARNs are the standard for identifying specific S3 buckets.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 184 — EC2 IAM Role / Instance Profile / Least Privilege / RDS
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed2-q184',
            type: 'single',
            prompt:
                'A company runs an application on Amazon EC2 instances. The application needs to access an Amazon RDS database. The company wants to grant the EC2 instances access permissions to the RDS database while following the principle of least privilege. Which solution will meet these requirements?',
            options: [
                'Create an IAM user that has a policy that grants administrative permissions. Use the IAM user\'s access keys on the EC2 instances to access the RDS database.',
                'Create an IAM user that has a policy that grants the minimum required permissions to access the RDS database. Embed the IAM user\'s access keys on the EC2 instances to access the RDS database.',
                'Create an IAM role that has a policy that grants the minimum required permissions to access the RDS database. Attach the IAM role access key and the IAM role secret key to the EC2 instance profile.',
                'Create an IAM role that has a policy that grants the minimum required permissions to access the RDS database. Attach the IAM role to an EC2 instance profile. Associate the instance profile with the instances.',
            ],
            correctOptionIndex: 3,
            explanation:
                'Using an IAM role associated with an EC2 instance profile provides temporary security credentials to the application running on the instance. This avoids storing long-term IAM user access keys on the instance. The policy attached to the role grants only the minimum permissions required for the application to access the RDS database, adhering to the principle of least privilege.',
            incorrectOptionExplanations: {
                0: 'This solution violates the principle of least privilege by granting administrative permissions and uses insecure, hardcoded IAM user access keys.',
                1: 'While applying least privilege to the policy, this option relies on embedding insecure, long-term access keys on the instance, which is not a best practice.',
                2: 'An IAM role does not have access keys and a secret key in the traditional sense. The instance retrieves temporary credentials automatically through the instance metadata service.',
            },
            references: [
                'AWS IAM User Guide — "IAM roles for Amazon EC2": IAM roles are a secure way to grant permissions, providing temporary credentials without long-term access keys.',
                'Amazon RDS User Guide — "IAM database authentication": Using IAM to authenticate with RDS DB instances without embedding passwords.',
                'AWS IAM User Guide — "Security best practices in IAM - Grant least privilege": Grant only the permissions required to perform a task.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 185 — Macie + EventBridge + Lambda Legal Hold (Select THREE)
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed2-q185',
            type: 'multiple',
            prompt:
                'A company is storing data in Amazon S3 buckets. The company needs to retain any objects that contain personally identifiable information (PII) that might need to be reviewed. A solutions architect must develop an automated solution to identify objects that contain PII and apply the necessary controls to prevent deletion before review. Which combination of steps should the solutions architect take to meet these requirements? (Select THREE.)',
            options: [
                'Create a job in Amazon Macie to scan the S3 buckets for the relevant sensitive data identifiers.',
                'Move the identified objects to the S3 Glacier Deep Archive storage class.',
                'Create an AWS Lambda function that performs an S3 Object Lock legal hold operation on the identified objects.',
                'Create an AWS Lambda function that applies an S3 Object Lock retention period to the identified objects in governance mode.',
                'Create an Amazon EventBridge rule that invokes the AWS Lambda function when Amazon Macie detects sensitive data.',
                'Configure multi-factor authentication (MFA) delete on the S3 buckets.',
            ],
            correctOptionIndexes: [0, 2, 4],
            explanation:
                'This creates a fully automated, event-driven workflow: (1) Amazon Macie continuously scans S3 buckets for PII. (2) When Macie discovers sensitive data, it publishes a finding event to Amazon EventBridge. (3) An EventBridge rule invokes an AWS Lambda function. (4) The Lambda function applies an S3 Object Lock legal hold on the specific object, preventing deletion indefinitely until explicitly removed after review.',
            incorrectOptionExplanations: {
                1: 'Moving objects to S3 Glacier Deep Archive is for long-term archival. It does not inherently prevent deletion and is not the primary mechanism for data retention compliance.',
                3: 'An S3 Object Lock retention period is time-bound. A legal hold is more appropriate for a review process where the duration is unknown and the lock must be explicitly removed.',
                5: 'MFA Delete protects against accidental deletions by requiring a second authentication factor, but does not prevent an authorized user with MFA from deleting the object.',
            },
            references: [
                'Amazon Macie Documentation — "Discovering sensitive data": Macie scans S3 buckets using built-in and custom data identifiers.',
                'Amazon Macie Documentation — "Monitoring sensitive data findings with Amazon EventBridge": Macie publishes findings to EventBridge; rules can route events to specified targets.',
                'Amazon S3 Documentation — "Using S3 Object Lock - Legal holds": A legal hold prevents deletion with no expiration date until explicitly removed.',
                'AWS Security Blog — "How to automate sensitive data discovery and remediation in AWS": Validates the Macie → EventBridge → Lambda → Object Lock workflow.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 186 — GuardDuty + EventBridge + Lambda / Crypto Mining Isolation
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed2-q186',
            type: 'single',
            prompt:
                'A company needs an automated solution to detect cryptocurrency mining activity on Amazon EC2 instances. The solution must automatically isolate any identified EC2 instances for forensic analysis. Which solution will meet these requirements?',
            options: [
                'Create an Amazon EventBridge rule that runs when Amazon GuardDuty detects cryptocurrency mining activity. Configure the rule to invoke an AWS Lambda function to isolate the identified EC2 instances.',
                'Create an AWS Security Hub custom action that runs when Amazon GuardDuty detects cryptocurrency mining activity. Configure the custom action to invoke an AWS Lambda function to isolate the identified EC2 instances.',
                'Create an Amazon Inspector rule that runs when Amazon GuardDuty detects cryptocurrency mining activity. Configure the rule to invoke an AWS Lambda function to isolate the identified EC2 instances.',
                'Create an AWS Config custom rule that runs when AWS Config detects cryptocurrency mining activity. Configure the rule to invoke an AWS Lambda function to isolate the identified EC2 instances.',
            ],
            correctOptionIndex: 0,
            explanation:
                'Amazon GuardDuty continuously monitors for malicious activity including cryptocurrency mining. When GuardDuty detects a threat, it generates a finding and sends it as an event to Amazon EventBridge. An EventBridge rule filters for specific GuardDuty finding types (e.g., CryptoCurrency:EC2/BitcoinTool.B!DNS) and invokes an AWS Lambda function to isolate the compromised EC2 instance for forensic analysis.',
            incorrectOptionExplanations: {
                1: 'AWS Security Hub custom actions are designed for manual, user-initiated responses from the console, not for automated, event-driven remediation.',
                2: 'Amazon Inspector is a vulnerability management service that scans for software vulnerabilities, not a real-time threat detection service for malicious activity like cryptocurrency mining.',
                3: 'AWS Config assesses and audits resource configurations for compliance. It does not perform threat detection or monitor for malicious runtime activity.',
            },
            references: [
                'Amazon GuardDuty User Guide — Finding types: Includes CryptoCurrency finding types for EC2 instances.',
                'Amazon GuardDuty User Guide — "Monitoring GuardDuty findings with Amazon EventBridge": GuardDuty sends finding events to EventBridge; EventBridge rules can invoke Lambda for automated remediation.',
                'AWS Security Hub User Guide — "Creating custom actions": Custom actions are manual and user-driven, not automatic.',
                'Amazon Inspector User Guide: Focused on vulnerability management in compute workloads, not runtime threat detection.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 187 — IAM Access Analyzer / Unused Permissions / Multi-Account
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed2-q187',
            type: 'single',
            prompt:
                'A company runs all its business applications in the AWS Cloud. The company uses AWS Organizations to manage multiple AWS accounts. A solutions architect needs to review all permissions granted to IAM users to determine which users have more permissions than required. Which solution will meet these requirements with the LEAST administrative overhead?',
            options: [
                'Use Network Access Analyzer to review all access permissions in the company\'s AWS accounts.',
                'Create an AWS CloudWatch alarm that activates when an IAM user creates or modifies resources in an AWS account.',
                'Use AWS Identity and Access Management (IAM) Access Analyzer to review all the company\'s resources and accounts.',
                'Use Amazon Inspector to find vulnerabilities in existing IAM policies.',
            ],
            correctOptionIndex: 2,
            explanation:
                'AWS IAM Access Analyzer is specifically designed to identify unused permissions and help achieve least privilege. It can be enabled at the AWS Organizations level, allowing a designated administrator to centrally manage and review findings for all member accounts from a single location, fulfilling the requirement for the least administrative overhead in a multi-account environment.',
            incorrectOptionExplanations: {
                0: 'Network Access Analyzer identifies unintended network access paths to resources; it does not analyze IAM user permissions.',
                1: 'A CloudWatch alarm is a reactive monitoring tool. It generates alerts on actions but does not proactively analyze all policies to find excessive, unused permissions.',
                3: 'Amazon Inspector is a vulnerability management service that scans compute workloads for software vulnerabilities, not IAM policies.',
            },
            references: [
                'AWS IAM User Guide — "What is IAM Access Analyzer?": Helps identify unused access and remove it. Can be enabled for the entire organization with a delegated administrator.',
                'AWS IAM User Guide — "Identifying unused permissions": IAM Access Analyzer reviews permissions granted to IAM roles and generates findings for unused permissions.',
                'Amazon VPC User Guide — "What is Network Access Analyzer?": Identifies unintended network access to resources.',
                'Amazon Inspector User Guide — "What is Amazon Inspector?": Scans workloads for software vulnerabilities and unintended network exposure.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 188 — IAM Access Analyzer Delegated Administrator / Organizations
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed2-q188',
            type: 'single',
            prompt:
                'A company is using AWS Identity and Access Management (IAM) Access Analyzer to refine IAM permissions for employee users. The company uses an organization in AWS Organizations and AWS Control Tower to manage its AWS accounts. The company has designated a specific member account as an audit account. A solutions architect needs to set up IAM Access Analyzer to aggregate findings from all member accounts in the audit account. What is the first step the solutions architect should take?',
            options: [
                'Use AWS CloudTrail to configure one trail for all accounts. Create an Amazon S3 bucket in the audit account. Configure the trail to send logs related to access activity to the new S3 bucket in the audit account.',
                'Configure a delegated administrator account for IAM Access Analyzer in the AWS Control Tower management account. In the delegated administrator account for IAM Access Analyzer, specify the AWS account ID of the audit account.',
                'Create an Amazon S3 bucket in the audit account. Generate a new permissions policy, and add a service role to the policy to give IAM Access Analyzer access to AWS CloudTrail and the S3 bucket in the audit account.',
                'Add a new trust policy that includes permissions to allow IAM Access Analyzer to perform sts:AssumeRole actions. Modify the permissions policy to allow IAM Access Analyzer to generate policies.',
            ],
            correctOptionIndex: 1,
            explanation:
                'To centralize IAM Access Analyzer findings across an AWS Organization, the first and mandatory step is to designate a member account as the delegated administrator for the service from the organization\'s management account. This grants the audit account permissions to create and manage analyzers collecting findings from all other accounts.',
            incorrectOptionExplanations: {
                0: 'IAM Access Analyzer functions by analyzing resource-based policies, not by processing AWS CloudTrail logs. This describes setting up centralized logging, a different function.',
                2: 'IAM Access Analyzer does not require a manually created Amazon S3 bucket for its findings, nor does it require a custom service role as the initial setup step.',
                3: 'The necessary service-linked roles and trust policies are created automatically by AWS when you enable IAM Access Analyzer for an organization; this is not a manual first step.',
            },
            references: [
                'AWS IAM User Guide — "Enabling IAM Access Analyzer": To enable for an organization, you must sign in to the management account and designate a member account as delegated administrator.',
                'AWS Organizations User Guide — "AWS services that you can use with AWS Organizations": Lists IAM Access Analyzer as supporting delegated administration.',
                'AWS IAM User Guide — "IAM Access Analyzer service-linked roles": Service-linked roles are created automatically when you enable IAM Access Analyzer; no manual creation needed.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 189 — RDS for Oracle + Secrets Manager Rotation / Migration
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed2-q189',
            type: 'single',
            prompt:
                'A company needs to migrate its customer transactions database from on-premises to AWS. The database resides on an Oracle DB instance that runs on a Linux server. According to a new security requirement, the company must rotate the database password each year. Which solution will meet these requirements with the LEAST operational overhead?',
            options: [
                'Convert the database to Amazon DynamoDB by using AWS Schema Conversion Tool (AWS SCT). Store the password in AWS Systems Manager Parameter Store. Create an Amazon CloudWatch alarm to invoke an AWS Lambda function for yearly password rotation.',
                'Migrate the database to Amazon RDS for Oracle. Store the password in AWS Secrets Manager. Turn on automatic rotation. Configure a yearly rotation schedule.',
                'Migrate the database to an Amazon EC2 instance. Use AWS Systems Manager Parameter Store to keep and rotate the connection string by using an AWS Lambda function on a yearly schedule.',
                'Migrate the database to Amazon Neptune by using AWS Schema Conversion Tool (AWS SCT). Create an Amazon CloudWatch alarm to invoke an AWS Lambda function for yearly password rotation.',
            ],
            correctOptionIndex: 1,
            explanation:
                'Amazon RDS for Oracle is a managed service that automates administration tasks, reducing operational overhead. AWS Secrets Manager provides built-in, automated rotation capabilities for Amazon RDS databases. Configuring a yearly rotation schedule requires minimal configuration and no custom code, directly fulfilling the least operational overhead requirement.',
            incorrectOptionExplanations: {
                0: 'Converting from Oracle (relational) to DynamoDB (NoSQL) is a complex re-architecture, not a simple migration, creating significant operational overhead.',
                2: 'Migrating to EC2 requires self-management of the OS and database, which is higher operational overhead than using the managed Amazon RDS service.',
                3: 'Converting from Oracle (relational) to Neptune (graph) is an inappropriate and complex database engine change for a transactional database.',
            },
            references: [
                'AWS Secrets Manager User Guide — "Rotate AWS Secrets Manager secrets": For Amazon RDS, you can choose a rotation schedule in number of days from 1 to 365.',
                'Amazon RDS User Guide — "What is Amazon RDS?": Makes it easier to set up, operate, and scale a relational database with less management.',
                'AWS Database Migration Service User Guide: Amazon RDS is recommended when migrating an on-premises Oracle database to reduce management burden.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 190 — Lambda Environment Variables + KMS Encryption Helpers
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed2-q190',
            type: 'single',
            prompt:
                'A company has AWS Lambda functions that use environment variables. The company does not want its developers to see environment variables in plaintext. Which solution will meet these requirements?',
            options: [
                'Deploy code to Amazon EC2 instances instead of using Lambda functions.',
                'Configure SSL encryption on the Lambda functions to use AWS CloudHSM to store and encrypt the environment variables.',
                'Create a certificate in AWS Certificate Manager (ACM). Configure the Lambda functions to use the certificate to encrypt the environment variables.',
                'Create an AWS Key Management Service (AWS KMS) key. Enable encryption helpers on the Lambda functions to use the KMS key to store and encrypt the environment variables.',
            ],
            correctOptionIndex: 3,
            explanation:
                'AWS Lambda provides built-in integration with AWS KMS to secure environment variables. By enabling encryption helpers in the Lambda console or API and using a customer-managed KMS key, you can control who can decrypt these variables. IAM policies can grant the Lambda execution role permission to decrypt at runtime while denying developers the kms:Decrypt permission on that specific key.',
            incorrectOptionExplanations: {
                0: 'Migrating to EC2 is a drastic architectural change that avoids the problem rather than solving it within the existing serverless architecture.',
                1: 'SSL/TLS encryption is for securing data in transit, not for encrypting environment variables at rest. Lambda\'s native encryption uses KMS, not CloudHSM directly.',
                2: 'AWS Certificate Manager provisions SSL/TLS certificates for securing network communications, not for encrypting application-level data at rest.',
            },
            references: [
                'AWS Lambda Developer Guide — "Securing environment variables": Lambda encrypts environment variables using a KMS key; customer managed keys provide more control.',
                'AWS KMS Developer Guide — "How AWS Lambda uses AWS KMS": When Lambda encrypts environment variables, it uses the KMS key to generate a unique data key.',
                'AWS Security Blog — "How to manage secrets for your serverless applications": KMS can encrypt and decrypt Lambda environment variables.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 191 — API Gateway HTTP API / JWT Authorizer / ALB Integration
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed2-q191',
            type: 'single',
            prompt:
                'A company runs an application on Amazon EC2 instances behind an Application Load Balancer (ALB). The company wants to create a public API for the application that uses JSON Web Tokens (JWT) for authentication. The company wants the API to integrate directly with the ALB. Which solution will meet these requirements?',
            options: [
                'Use Amazon API Gateway to create a REST API.',
                'Use Amazon API Gateway to create an HTTP API.',
                'Use Amazon API Gateway to create a WebSocket API.',
                'Use Amazon API Gateway to create a gRPC API.',
            ],
            correctOptionIndex: 1,
            explanation:
                'Amazon API Gateway HTTP APIs are designed for building low-latency and cost-effective APIs that proxy requests to HTTP endpoints such as an ALB. A key feature of HTTP APIs is built-in support for JSON Web Token (JWT) authorizers, providing native integration with OIDC and OAuth 2.0-compliant identity providers without needing custom Lambda authorizers.',
            incorrectOptionExplanations: {
                0: 'A REST API can integrate with an ALB and use authorizers, but it does not have the same streamlined, built-in JWT authorizer as an HTTP API.',
                2: 'A WebSocket API is designed for stateful, real-time, bidirectional communication (e.g., chat applications), not a standard public request-response API.',
                3: 'Amazon API Gateway does not offer a native gRPC API type.',
            },
            references: [
                'AWS API Gateway Developer Guide — "Choosing between HTTP APIs and REST APIs": HTTP APIs offer native OIDC and OAuth 2.0 support and are optimized for proxying requests to backend services like ALBs.',
                'AWS API Gateway Developer Guide — "Controlling access to HTTP APIs with JWT authorizers": JWT authorizers authorize API calls using JSON Web Tokens from an identity provider.',
                'AWS API Gateway Developer Guide — "Configuring private integrations for HTTP APIs": Details integrating an HTTP API with an ALB using a VPC link.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 192 — IPv6 / Interface VPC Endpoints for S3 + DynamoDB
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed2-q192',
            type: 'single',
            prompt:
                'A company is designing an IPv6 application that is hosted on Amazon EC2 instances in a private subnet within a VPC. The application will store user-uploaded content in Amazon S3 buckets. The application will save each S3 object\'s URL link and metadata in Amazon DynamoDB. The company must not use public internet connections to transmit user-uploaded content or metadata. Which solution will meet these requirements?',
            options: [
                'Implement a gateway VPC endpoint for Amazon S3 and an interface VPC endpoint for Amazon DynamoDB.',
                'Implement interface VPC endpoints for both Amazon S3 and Amazon DynamoDB.',
                'Implement gateway VPC endpoints for both Amazon S3 and Amazon DynamoDB.',
                'Implement a gateway VPC endpoint for Amazon DynamoDB and an interface VPC endpoint for Amazon S3.',
            ],
            correctOptionIndex: 1,
            explanation:
                'Gateway VPC endpoints do not support IPv6 traffic; they are limited to IPv4 only. Since the application is designed for IPv6, interface VPC endpoints (powered by AWS PrivateLink) must be used for both Amazon S3 and Amazon DynamoDB, as they support IPv6 traffic and provide private connectivity without traversing the public internet.',
            incorrectOptionExplanations: {
                0: 'The gateway VPC endpoint for S3 does not support IPv6 traffic, making this solution non-functional for the application.',
                2: 'Gateway VPC endpoints for both services do not support IPv6 traffic, failing to meet the fundamental design requirement.',
                3: 'The gateway VPC endpoint for DynamoDB does not support IPv6 traffic, making this solution non-functional for the application.',
            },
            references: [
                'AWS VPC User Guide — "Gateway endpoints" Limitations: Gateway endpoints support traffic over IPv4 only; they do not support IPv6 traffic.',
                'AWS VPC User Guide — "Interface endpoints (AWS PrivateLink)": Interface endpoints can support traffic over IPv6 if endpoint network interfaces are in dual-stack subnets with IPv6 addresses.',
                'AWS VPC User Guide — "VPC endpoints for Amazon S3": Both gateway and interface endpoints are available for S3.',
                'AWS VPC User Guide — "VPC endpoints for Amazon DynamoDB": Both endpoint types are available for DynamoDB.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 193 — NAT Gateway in Public Subnet / IPv4 Private Subnet Internet
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed2-q193',
            type: 'single',
            prompt:
                'A solutions architect is configuring a VPC that has public subnets and private subnets. The VPC and subnets use IPv4 CIDR blocks. There is one public subnet and one private subnet in each of three Availability Zones (AZs). An internet gateway is attached to the VPC. The private subnets require access to the internet to allow Amazon EC2 instances to download software updates. Which solution will meet this requirement?',
            options: [
                'Create a NAT gateway in one of the public subnets. Update the route tables that are attached to the private subnets to forward non-VPC traffic to the NAT gateway.',
                'Create three NAT instances in each private subnet. Create a private route table for each Availability Zone that forwards non-VPC traffic to the NAT instances.',
                'Attach an egress-only internet gateway in the VPC. Update the route tables of the private subnets to forward non-VPC traffic to the egress-only internet gateway.',
                'Create a NAT gateway in one of the private subnets. Update the route tables that are attached to the private subnets to forward non-VPC traffic to the NAT gateway.',
            ],
            correctOptionIndex: 0,
            explanation:
                'A NAT gateway must be placed in a public subnet (a subnet with a route to an Internet Gateway) to forward traffic to the internet. The route tables associated with the private subnets must then direct internet-bound traffic (0.0.0.0/0) to the NAT gateway, allowing instances to access the internet for software updates while preventing inbound connections.',
            incorrectOptionExplanations: {
                1: 'A NAT device must be placed in a public subnet to have a route to the internet; placing NAT instances in private subnets will not work.',
                2: 'An egress-only internet gateway is used exclusively for providing outbound-only internet access for IPv6 traffic, not IPv4.',
                3: 'A NAT gateway must be deployed in a public subnet, not a private one, as it requires a direct route to the Internet Gateway to function.',
            },
            references: [
                'AWS VPC User Guide — "NAT gateways": To create a NAT gateway, specify the public subnet in which it should reside; then update private subnet route tables to point to the NAT gateway.',
                'AWS VPC User Guide — "Scenario: VPC with public and private subnets (NAT)": The main route table for the private subnet sends all traffic destined outside the VPC to the NAT gateway.',
                'AWS VPC User Guide — "Egress-only internet gateways": Used for outbound-only communication over IPv6, not IPv4.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 194 — EC2 IAM Role / Instance Profile / S3 Access / Security Best Practices
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed2-q194',
            type: 'single',
            prompt:
                'A company wants to migrate applications from its on-premises servers to AWS. As a first step, the company is modifying and migrating a non-critical application to a single Amazon EC2 instance. The application will store information in an Amazon S3 bucket. The company needs to follow security best practices when deploying the application on AWS. Which approach should the company take to allow the application to interact with Amazon S3?',
            options: [
                'Create an IAM role that has administrative access to AWS. Attach the role to the EC2 instance.',
                'Create an IAM user. Attach the AdministratorAccess policy. Copy the generated access key and secret key. Within the application code, use the access key and secret key along with the AWS SDK to communicate with Amazon S3.',
                'Create an IAM role that has the necessary access to Amazon S3. Attach the role to the EC2 instance.',
                'Create an IAM user. Attach a policy that provides the necessary access to Amazon S3. Copy the generated access key and secret key. Within the application code, use the access key and secret key along with the AWS SDK to communicate with Amazon S3.',
            ],
            correctOptionIndex: 2,
            explanation:
                'The most secure and recommended method for an EC2 instance application to access other AWS services is by using an IAM role. An IAM role provides temporary security credentials automatically rotated by AWS, eliminating the security risks of long-term access keys. The policy grants only the necessary permissions to interact with the specific S3 bucket, adhering to the principle of least privilege.',
            incorrectOptionExplanations: {
                0: 'Granting administrative access violates the principle of least privilege by providing excessive permissions far beyond what the application requires.',
                1: 'Using an IAM user with long-term, hardcoded administrative keys is a major security anti-pattern.',
                3: 'Using an IAM user with long-term access keys is not a best practice; IAM roles are the recommended method for providing temporary, managed credentials to EC2 instances.',
            },
            references: [
                'AWS IAM User Guide — "IAM roles for Amazon EC2": Strongly recommends using IAM roles with EC2 instances to avoid managing long-term credentials.',
                'AWS IAM User Guide — "Security best practices in IAM": Grant least privilege; use temporary credentials provided by IAM roles for applications running on EC2.',
                'AWS Well-Architected Framework — Security Pillar: Use IAM roles to provide temporary credentials for machine identities.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 195 — RDS Encryption / Snapshot Copy + Customer Managed KMS (Multi-select)
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed2-q195',
            type: 'multiple',
            prompt:
                'A company has an application that uses an Amazon RDS for PostgreSQL database. The company is developing an application feature that will store sensitive information for an individual in the database. During a security review of the environment, the company discovers that the RDS DB instance is not encrypting data at rest. The company needs a solution that will provide encryption at rest for all the existing data and for any new data that is entered for an individual. Which combination of steps should the company take to meet these requirements? (Select TWO.)',
            options: [
                'Create a snapshot of the DB instance. Enable encryption on the snapshot. Use the encrypted snapshot to create a new DB instance. Adjust the application configuration to use the new DB instance.',
                'Create a snapshot of the DB instance. Create an encrypted copy of the snapshot. Use the encrypted snapshot to create a new DB instance. Adjust the application configuration to use the new DB instance.',
                'Modify the configuration of the DB instance by enabling encryption. Create a snapshot of the DB instance. Use the snapshot to create a new DB instance. Adjust the application configuration to use the new DB instance.',
                'Use AWS Key Management Service (AWS KMS) to create a new default AWS managed aws/rds key. Select this key as the encryption key for operations with Amazon RDS.',
                'Use AWS Key Management Service (AWS KMS) to create a new customer managed key. Select this key as the encryption key for operations with Amazon RDS.',
            ],
            correctOptionIndexes: [1, 4],
            explanation:
                'You cannot enable encryption directly on an existing, unencrypted Amazon RDS DB instance. The correct procedure is: create a snapshot of the unencrypted instance, create an encrypted copy of that snapshot specifying an AWS KMS key, then restore a new DB instance from the encrypted snapshot. For handling sensitive information, using a customer managed key from AWS KMS provides granular control over the key\'s lifecycle, permissions, and rotation policy.',
            incorrectOptionExplanations: {
                0: 'You cannot "enable encryption on" an existing snapshot. You must create an encrypted copy of the snapshot.',
                2: 'You cannot modify an existing, unencrypted RDS DB instance to enable encryption directly. The instance must be replaced.',
                3: 'Users cannot create AWS managed keys (e.g., aws/rds). These keys are created and managed by AWS on the user\'s behalf.',
            },
            references: [
                'Amazon RDS User Guide — "Encrypting an unencrypted DB instance": Create a snapshot, create an encrypted copy of that snapshot, then restore a DB instance from the encrypted snapshot.',
                'Amazon RDS User Guide — "Encrypting Amazon RDS resources": KMS keys can be specified during the snapshot copy operation.',
                'AWS KMS Developer Guide — "AWS KMS concepts - AWS managed keys": AWS managed keys are created and managed on your behalf; users cannot create them.',
                'AWS KMS Developer Guide — "AWS KMS concepts - Customer managed keys": Customer managed keys provide full control including policies, enabling/disabling, and rotation.',
            ],
        },

    ],
};
