import type { ExamDefinition } from './types';

export const examDumpSecurity66To130: ExamDefinition = {
    id: 'examDumpSecurity66To130',
    title: 'SAA-C03 Exam Dump — Security and Access Scenarios 66-130',
    description: 'AWS Solutions Architect Associate questions covering container scanning, IAM, identity federation, encryption, networking, S3 security, WAF, CloudFront, EKS, and governance topics.',
    durationSeconds: 7800,
    questions: [

        // ═══════════════════════════════════════════════════════════════════════
        // Question 66 — ECS / ECR Vulnerability Scanning
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed-sec-q66',
            type: 'single',
            prompt: 'A company runs its workloads on Amazon Elastic Container Service (Amazon ECS). The container images that the ECS task definition uses need to be scanned for Common Vulnerabilities and Exposures (CVEs). New container images that are created also need to be scanned. Which solution will meet these requirements with the FEWEST changes to the workloads?',
            options: [
                'Use Amazon Elastic Container Registry (Amazon ECR) as a private image repository to store the container images. Specify scan on push filters for the ECR basic scan.',
                'Store the container images in an Amazon S3 bucket. Use Amazon Macie to scan the images. Use an S3 Event Notification to initiate a Macie scan for every event with an s3:ObjectCreated:Put event type.',
                'Deploy the workloads to Amazon Elastic Kubernetes Service (Amazon EKS). Use Amazon Elastic Container Registry (Amazon ECR) as a private image repository. Specify scan on push filters for the ECR enhanced scan.',
                'Store the container images in an Amazon S3 bucket that has versioning enabled. Configure an S3 Event Notification for s3:ObjectCreated:* events to invoke an AWS Lambda function. Configure the Lambda function to initiate an Amazon Inspector scan.',
            ],
            correctOptionIndex: 0,
            explanation: 'Amazon ECR is the native AWS private container registry for ECS and supports image vulnerability scanning. Configuring scan on push scans new images as they are pushed with minimal workload changes.',
            incorrectOptionExplanations: {
                1: 'Amazon Macie discovers sensitive data in S3; it does not scan container images for CVEs.',
                2: 'Migrating from ECS to EKS is a major architecture change and does not meet the fewest-changes requirement.',
                3: 'Using S3, Lambda, and Inspector is unnecessarily complex. ECR provides the intended direct workflow for container image scanning.',
            },
            references: [
                'Amazon ECR User Guide — Image scanning.',
                'Amazon Inspector User Guide — Scanning Amazon ECR container images with Amazon Inspector.',
                'Amazon Macie User Guide — What is Amazon Macie?',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 67 — EKS / IAM Roles for Service Accounts
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed-sec-q67',
            type: 'single',
            prompt: 'A company has an application that runs on an Amazon Elastic Kubernetes Service (Amazon EKS) cluster on Amazon EC2 instances. The application has a UI that uses Amazon DynamoDB and data services that use Amazon S3 as part of the application deployment. The company must ensure that the EKS Pods for the UI can access only Amazon DynamoDB and that the EKS Pods for the data services can access only Amazon S3. The company uses AWS Identity and Access Management (IAM). Which solution meets these requirements?',
            options: [
                'Create separate IAM policies for Amazon S3 and DynamoDB access with the required permissions. Attach both IAM policies to the EC2 instance profile. Use role-based access control (RBAC) to control access to Amazon S3 or DynamoDB for the respective EKS Pods.',
                'Create separate IAM policies for Amazon S3 and DynamoDB access with the required permissions. Attach the Amazon S3 IAM policy directly to the EKS Pods for the data services and the DynamoDB policy to the EKS Pods for the UI.',
                'Create separate Kubernetes service accounts for the UI and data services to assume an IAM role. Attach the Amazon S3 Full Access policy to the data services account and the AmazonDynamoDBFullAccess policy to the UI service account.',
                'Create separate Kubernetes service accounts for the UI and data services to assume an IAM role. Use IAM Role for Service Accounts (IRSA) to provide access to the EKS Pods for the UI to Amazon S3 and the EKS Pods for the data services to DynamoDB.',
            ],
            correctOptionIndex: 2,
            explanation: 'IAM Roles for Service Accounts (IRSA) lets EKS pods receive AWS permissions through the Kubernetes service account they use. Separate service accounts and roles allow the UI pods to receive DynamoDB permissions and the data-service pods to receive S3 permissions.',
            incorrectOptionExplanations: {
                0: 'Attaching permissions to the EC2 instance profile grants those permissions to all pods on the node and violates least privilege.',
                1: 'IAM policies cannot be attached directly to pods. Pods assume roles through service accounts when using IRSA.',
                3: 'This option reverses the required permissions by giving S3 to the UI and DynamoDB to the data services.',
            },
            references: [
                'Amazon EKS User Guide — IAM roles for service accounts.',
                'Amazon EKS Best Practices Guide — IAM Roles for Service Accounts.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 68 — IAM Identity Center / AD Connector
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed-sec-q68',
            type: 'single',
            prompt: "A company needs to give a globally distributed development team secure access to the company's AWS resources in a way that complies with security policies. The company currently uses an on-premises Active Directory for internal authentication. The company uses AWS Organizations to manage multiple AWS accounts that support multiple projects. The company needs a solution to integrate with the existing infrastructure to provide centralized identity management and access control. Which solution will meet these requirements with the LEAST operational overhead?",
            options: [
                "Set up AWS Directory Service to create an AWS managed Microsoft Active Directory on AWS. Establish a trust relationship with the on-premises Active Directory. Use IAM roles that are assigned to Active Directory groups to access AWS resources within the company's AWS accounts.",
                "Create an IAM user for each developer. Manually manage permissions for each IAM user based on each user's involvement with each project. Enforce multi-factor authentication (MFA) as an additional layer of security.",
                'Use AD Connector in AWS Directory Service to connect to the on-premises Active Directory. Integrate AD Connector with AWS IAM Identity Center. Configure permissions sets to give each AD group access to specific AWS accounts and resources.',
                'Use Amazon Cognito to deploy an identity federation solution. Integrate the identity federation solution with the on-premises Active Directory. Use Amazon Cognito to provide access tokens for developers to access AWS accounts and resources.',
            ],
            correctOptionIndex: 2,
            explanation: 'IAM Identity Center centralizes workforce access across AWS Organizations. AD Connector proxies authentication to the existing on-premises Active Directory without running a new directory in AWS, reducing operational overhead.',
            incorrectOptionExplanations: {
                0: 'AWS Managed Microsoft AD plus a trust relationship adds another managed directory layer that is unnecessary for this use case.',
                1: 'Manually managing IAM users does not integrate with the existing directory and creates high operational overhead.',
                3: 'Amazon Cognito is intended primarily for application customer identities, not centralized workforce access to AWS accounts.',
            },
            references: [
                'AWS IAM Identity Center User Guide — Choose your identity source.',
                'AWS Directory Service Administration Guide — AD Connector.',
                'AWS Multiple Account Security Strategy — Centralize identity and access management.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 69 — API Gateway / Resource Policy
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed-sec-q69',
            type: 'single',
            prompt: "A company is developing an application in the AWS Cloud. The application's HTTP API contains critical information that is published in Amazon API Gateway. The critical information must be accessible from only a limited set of trusted IP addresses that belong to the company's internal network. Which solution will meet these requirements?",
            options: [
                'Set up an API Gateway private integration to restrict access to a predefined set of IP addresses.',
                'Create a resource policy for the API that denies access to any IP address that is not specifically allowed.',
                'Directly deploy the API in a private subnet. Create a network ACL. Set up rules to allow the traffic from specific IP addresses.',
                'Modify the security group that is attached to API Gateway to allow inbound traffic from only the trusted IP addresses.',
            ],
            correctOptionIndex: 1,
            explanation: 'API Gateway resource policies can allow or deny requests based on source IP address by using IAM condition keys such as aws:SourceIp.',
            incorrectOptionExplanations: {
                0: 'A private integration connects API Gateway to private backend resources. It does not restrict who can invoke the API endpoint.',
                2: 'API Gateway is a managed service and is not deployed directly into a subnet where network ACLs can protect it.',
                3: 'Public API Gateway endpoints do not use customer-managed security groups.',
            },
            references: [
                'Amazon API Gateway Developer Guide — Controlling access to an API with API Gateway resource policies.',
                'IAM User Guide — aws:SourceIp global condition key.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 70 — CloudFront / AWS WAF Rate-Based Rule
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed-sec-q70',
            type: 'single',
            prompt: 'A website runs on Amazon EC2 behind an ALB with Amazon CloudFront in front. The site is receiving a high rate of unwanted requests from specific IP addresses. How should the solutions architect address this problem?',
            options: [
                'Use AWS Shield to configure IP deny rules.',
                'Increase Auto Scaling capacity.',
                'Configure VPC network ACL deny rules.',
                'Use AWS WAF with a rate-based rule on the CloudFront distribution.',
            ],
            correctOptionIndex: 3,
            explanation: 'AWS WAF can be associated with CloudFront and can use rate-based rules to block or limit sources that exceed a request threshold before traffic reaches the origin.',
            incorrectOptionExplanations: {
                0: 'AWS Shield provides DDoS protection, but AWS WAF is the service for custom IP and rate-based web rules.',
                1: 'Scaling out absorbs unwanted traffic instead of blocking it and increases cost.',
                2: 'Network ACLs at the VPC do not reliably see the original client IP when CloudFront is in front and are not the right layer for this control.',
            },
            references: [
                'AWS WAF Developer Guide — Rate-based rule statement.',
                'Amazon CloudFront Developer Guide — Using AWS WAF to protect applications.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 71 — RDS PostgreSQL / Secrets Manager Rotation
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed-sec-q71',
            type: 'single',
            prompt: 'A company runs its databases on Amazon RDS for PostgreSQL. The company wants a secure solution to manage the master user password by rotating the password every 30 days. Which solution will meet these requirements with the LEAST operational overhead?',
            options: [
                'Use Amazon EventBridge to schedule a custom AWS Lambda function to rotate the password every 30 days.',
                'Use the modify-db-instance command in the AWS CLI to change the password.',
                'Integrate AWS Secrets Manager with Amazon RDS for PostgreSQL to automate password rotation.',
                'Integrate AWS Systems Manager Parameter Store with Amazon RDS for PostgreSQL to automate password rotation.',
            ],
            correctOptionIndex: 2,
            explanation: 'AWS Secrets Manager has built-in integration with Amazon RDS and can automatically rotate database credentials on a schedule without custom code.',
            incorrectOptionExplanations: {
                0: 'A custom Lambda rotation workflow works but has more operational overhead than the managed Secrets Manager integration.',
                1: 'A CLI command is manual and does not provide scheduled automated rotation.',
                3: 'Parameter Store can store secrets but does not provide the same native RDS credential rotation capability.',
            },
            references: [
                'AWS Secrets Manager User Guide — Rotating secrets for AWS services.',
                'AWS Secrets Manager User Guide — Compare Secrets Manager and Parameter Store.',
                'Amazon RDS Documentation — Password management with Secrets Manager.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 72 — Approved AMIs / Service Catalog
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed-sec-q72',
            type: 'single',
            prompt: 'A company wants to implement new security compliance requirements for its development team to limit the use of approved Amazon Machine Images (AMIs). The company wants to provide access to only the approved operating system and software for all its Amazon EC2 instances. The company wants the solution to have the least amount of lead time for launching EC2 instances. Which solution will meet these requirements?',
            options: [
                'Create a portfolio by using AWS Service Catalog that includes only EC2 instances launched with approved AMIs. Ensure that all required software is preinstalled on the AMIs. Create the necessary permissions for developers to use the portfolio.',
                'Create an AMI that contains the approved operating system and software by using EC2 Image Builder. Give developers access to that AMI to launch the EC2 instances.',
                'Create an AMI that contains the approved operating system. Tell the developers to use the approved AMI. Create an Amazon EventBridge rule to run an AWS Systems Manager script when a new EC2 instance is launched. Configure the script to install the required software from a repository.',
                'Create an AWS Config rule to detect the launch of EC2 instances with an AMI that is not approved. Associate a remediation rule to terminate those instances and launch the instances again with the approved AMI. Use AWS Systems Manager to automatically install the approved software on the launch of an EC2 instance.',
            ],
            correctOptionIndex: 0,
            explanation: 'AWS Service Catalog can provide governed self-service products that launch EC2 instances only from approved AMIs. Preinstalling software in the AMI minimizes launch lead time.',
            incorrectOptionExplanations: {
                1: 'Giving access to an approved AMI alone does not prevent developers from using other AMIs.',
                2: 'Installing software after launch increases the time before instances are ready.',
                3: 'AWS Config remediation is reactive and disruptive, not preventative, and adds launch delay.',
            },
            references: [
                'AWS Service Catalog Administrator Guide — What is AWS Service Catalog?',
                'AWS Service Catalog Administrator Guide — Creating a product.',
                'Amazon EC2 User Guide — Create a custom AMI.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 73 — Cross-Account Vendor Access
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed-sec-q73',
            type: 'single',
            prompt: "A company has hired an external vendor to work in the company's AWS account. The vendor uses an automated tool that the vendor hosts in its own AWS account. The vendor does not have IAM access to the company's AWS account. A solutions architect needs to grant access to the vendor. Which solution will meet these requirements MOST securely?",
            options: [
                "Create an IAM role in the company's account to delegate access to the vendor's IAM role. Attach the appropriate IAM policies to the new IAM role to grant the permissions that the vendor requires.",
                "Create an IAM user in the company's account with a password. Attach the appropriate IAM policies to the IAM user.",
                "Create an IAM group in the company's account. Add the IAM user for the vendor's automated tool from the vendor account to the IAM group. Attach policies to the group.",
                "Create a new identity provider (IdP) of provider type AWS account. Supply the vendor's AWS account ID and username. Attach policies to the IdP.",
            ],
            correctOptionIndex: 0,
            explanation: 'Cross-account IAM roles let the vendor assume a role and receive temporary credentials scoped by the role permissions and trust policy.',
            incorrectOptionExplanations: {
                1: 'IAM users introduce long-term credentials and are less secure for vendor automation.',
                2: 'IAM groups cannot contain users from another AWS account.',
                3: 'IAM identity providers are for external SAML or OIDC providers, not AWS account trust in this way.',
            },
            references: [
                'IAM User Guide — Delegate access across AWS accounts using IAM roles.',
                'IAM User Guide — Roles terms and concepts.',
                'IAM User Guide — Security best practices in IAM.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 74 — SQS / Lambda Message Transformation
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed-sec-q74',
            type: 'single',
            prompt: 'A logistics company is creating a data exchange platform to share shipment status information with shippers. The logistics company can see all shipment information and metadata. The company distributes shipment data updates to shippers. Each shipper should see only shipment updates that are relevant to their company. Shippers should not see the full detail that is visible to the logistics company. The company creates an Amazon Simple Notification Service (Amazon SNS) topic for each shipper to share data. Some shippers use a mobile app to submit shipment status updates. The company needs to create a data exchange platform that provides each shipper specific access to the data that is relevant to their company. Which solution will meet these requirements with the LEAST operational overhead?',
            options: [
                'Ingest the shipment updates from the mobile app into Amazon Simple Queue Service (Amazon SQS). Publish the updates to the SNS topic. Apply a filter policy to rewrite the body of each message.',
                'Ingest the shipment updates from the mobile app into Amazon Simple Queue Service (Amazon SQS). Use an AWS Lambda function to consume the updates from Amazon SQS and rewrite the body of each message. Publish the updates to the SNS topic.',
                'Ingest the shipment updates from the mobile app into a second SNS topic. Publish the updates to the shipper SNS topic. Apply a filter policy to rewrite the body of each message.',
                'Ingest the shipment updates from the mobile app into Amazon Simple Queue Service (Amazon SQS). Filter and rewrite the messages in Amazon EventBridge Pipes. Publish the updates to the SNS topic.',
            ],
            correctOptionIndex: 1,
            explanation: 'SQS decouples ingestion from processing. Lambda can apply custom transformation logic to remove or rewrite sensitive fields, then publish shipper-specific messages to the appropriate SNS topic.',
            incorrectOptionExplanations: {
                0: 'SNS filter policies route messages based on attributes; they do not rewrite message bodies.',
                2: 'SNS filter policies still cannot transform payloads.',
                3: 'EventBridge Pipes are single-source to single-target and would create more operational work for many shipper topics.',
            },
            references: [
                'AWS Lambda Developer Guide — Using Lambda with Amazon SQS.',
                'Amazon SNS Developer Guide — Message filtering.',
                'Amazon EventBridge User Guide — EventBridge Pipes.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 75 — Private Subnet Outbound Internet
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed-sec-q75',
            type: 'multiple',
            prompt: 'A company creates a VPC that has one public subnet and one private subnet. The company attaches an internet gateway to the VPC. An Application Load Balancer (ALB) in the public subnet communicates with Amazon EC2 instances in the private subnet. The EC2 instances in the private subnet must be able to download operating system and application updates from the internet. The instances must not be accessible from the internet. Which combination of steps will meet these requirements? (Select THREE.)',
            options: [
                'Associate an Elastic IP address with the NAT gateway.',
                'Add a route of 0.0.0.0/0 to the private subnet route table. Set the NAT gateway as a target.',
                'Deploy a NAT gateway in the public subnet.',
                'Deploy a NAT gateway in the private subnet.',
                'Add a route of 0.0.0.0/0 to the public subnet route table. Set the NAT gateway as a target.',
                'Associate an Elastic IP address with the internet gateway.',
            ],
            correctOptionIndexes: [0, 1, 2],
            explanation: 'A NAT gateway in a public subnet with an Elastic IP allows private-subnet instances to initiate outbound IPv4 internet connections. The private subnet route table must send 0.0.0.0/0 traffic to the NAT gateway.',
            incorrectOptionExplanations: {
                3: 'A NAT gateway must be in a public subnet with a route to an internet gateway.',
                4: 'The public subnet default route should target the internet gateway, not the NAT gateway.',
                5: 'Internet gateways do not use Elastic IP addresses; NAT gateways do.',
            },
            references: [
                'Amazon VPC User Guide — NAT gateways.',
                'Amazon VPC User Guide — Enable internet access for a private subnet.',
                'Amazon VPC User Guide — Route tables for your VPC.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 76 — CloudTrail Lake / Non-AWS Audit Events
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed-sec-q76',
            type: 'single',
            prompt: 'A company needs to set up a centralized solution to audit API calls to AWS for workloads that run on AWS services and non AWS services. The company must store logs of the audits for 7 years. Which solution will meet these requirements with the LEAST operational overhead?',
            options: [
                'Set up a data lake in Amazon S3. Incorporate AWS CloudTrail logs and logs from non AWS services into the data lake. Use CloudTrail to store the logs for 7 years.',
                'Configure custom integrations for AWS CloudTrail Lake to collect and store CloudTrail events from AWS services and non AWS services. Use CloudTrail to store the logs for 7 years.',
                'Enable AWS CloudTrail for AWS services. Ingest non AWS services into CloudTrail to store the logs for 7 years.',
                'Create new Amazon CloudWatch Logs groups. Send the audit data from non AWS services to the CloudWatch Logs groups. Enable AWS CloudTrail for workloads that run on AWS. Use CloudTrail to store the logs for 7 years.',
            ],
            correctOptionIndex: 1,
            explanation: 'CloudTrail Lake is a managed audit and security data lake that can ingest AWS and non-AWS events through integrations and supports retention up to about 10 years.',
            incorrectOptionExplanations: {
                0: 'Building an S3-based data lake requires custom ingestion, partitioning, querying, and lifecycle management.',
                2: 'Standard CloudTrail trails do not natively ingest non-AWS events; CloudTrail Lake integrations are designed for this.',
                3: 'This creates separate logging systems and increases operational overhead.',
            },
            references: [
                'AWS CloudTrail User Guide — CloudTrail Lake.',
                'AWS CloudTrail User Guide — Integrations with AWS CloudTrail Lake.',
                'AWS CloudTrail User Guide — Create an event data store retention period.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 77 — IAM Access Key Rotation Enforcement
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed-sec-q77',
            type: 'single',
            prompt: "A security team needs to enforce the rotation of all IAM users' access keys every 90 days. If an access key is found to be older, the key must be made inactive and removed. A solutions architect must create a solution that will check for and remediate any keys older than 90 days. Which solution meets these requirements with the LEAST operational effort?",
            options: [
                'Create an AWS Config rule to check for the key age. Configure the AWS Config rule to run an AWS Batch job to remove the key.',
                'Create an Amazon EventBridge rule to check for the key age. Configure the rule to run an AWS Batch job to remove the key.',
                'Create an AWS Config rule to check for the key age. Define an Amazon EventBridge rule to schedule an AWS Lambda function to remove the key.',
                'Create an Amazon EventBridge rule to check for the key age. Define an EventBridge rule to run an AWS Batch job to remove the key.',
            ],
            correctOptionIndex: 2,
            explanation: 'AWS Config is designed for compliance checks and includes managed rules for IAM access key age. A scheduled or remediation Lambda function can inactivate and delete noncompliant keys with little operational overhead.',
            incorrectOptionExplanations: {
                0: 'AWS Batch is excessive for simple IAM key remediation.',
                1: 'EventBridge alone is not the purpose-built compliance evaluation service, and Batch is unnecessarily heavy.',
                3: 'This duplicates scheduling logic and uses Batch where Lambda is more appropriate.',
            },
            references: [
                'AWS Config Developer Guide — Remediating noncompliant AWS resources.',
                'AWS Config Developer Guide — iam-access-key-rotated managed rule.',
                'AWS Lambda Developer Guide — What is AWS Lambda?',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 78 — Private S3 Website / CloudFront / WAF
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed-sec-q78',
            type: 'single',
            prompt: 'A company wants to publish a private website for its on-premises employees. The website consists of several HTML pages and image files. The website must be available only through HTTPS and must be available only to on-premises employees. A solutions architect plans to store the website files in an Amazon S3 bucket. Which solution will meet these requirements?',
            options: [
                'Create an S3 bucket policy to deny access when the source IP address is not the public IP address of the on-premises environment. Set up an Amazon Route 53 alias record to point to the S3 bucket. Provide the alias record to the on-premises employees to grant the employees access to the website.',
                'Create an S3 access point to provide website access. Attach an access point policy to deny access when the source IP address is not the public IP address of the on-premises environment. Provide the S3 access point alias to the on-premises employees to grant the employees access to the website.',
                'Create an Amazon CloudFront distribution that includes an origin access control (OAC) that is configured for the S3 bucket. Use AWS Certificate Manager for SSL. Use AWS WAF with an IP set rule that allows access for the on-premises IP address. Set up an Amazon Route 53 alias record to point to the CloudFront distribution.',
                'Create an Amazon CloudFront distribution that includes an origin access control (OAC) that is configured for the S3 bucket. Create a CloudFront signed URL for the objects in the bucket. Set up an Amazon Route 53 alias record to point to the CloudFront distribution. Provide the signed URL to the on-premises employees to grant the employees access to the website.',
            ],
            correctOptionIndex: 2,
            explanation: 'CloudFront with OAC keeps the S3 bucket private, ACM provides HTTPS, and AWS WAF can restrict requests to the on-premises public IP range.',
            incorrectOptionExplanations: {
                0: 'S3 static website endpoints do not support HTTPS with custom domains without CloudFront.',
                1: 'S3 access points are not intended as browsable static website hosting endpoints.',
                3: 'Signed URLs are impractical for an entire multi-object website and do not implement persistent IP-based access control.',
            },
            references: [
                'Amazon CloudFront Developer Guide — Restricting access to an Amazon S3 origin with OAC.',
                'AWS WAF Developer Guide — IP address-based rules.',
                'Amazon S3 User Guide — Hosting a static website using Amazon S3.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 79 — EBS Encryption Compliance
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed-sec-q79',
            type: 'single',
            prompt: 'A company needs a solution to enforce data encryption at rest on Amazon EC2 instances. The solution must automatically identify noncompliant resources and enforce compliance policies on findings. Which solution will meet these requirements with the LEAST administrative overhead?',
            options: [
                'Use an IAM policy that allows users to create only encrypted Amazon Elastic Block Store (Amazon EBS) volumes. Use AWS Config and AWS Systems Manager to automate the detection and remediation of unencrypted EBS volumes.',
                'Use AWS Key Management Service (AWS KMS) to manage access to encrypted Amazon Elastic Block Store (Amazon EBS) volumes. Use AWS Lambda and Amazon EventBridge to automate the detection and remediation of unencrypted EBS volumes.',
                'Use Amazon Macie to detect unencrypted Amazon Elastic Block Store (Amazon EBS) volumes. Use AWS Systems Manager Automation rules to automatically encrypt existing and new EBS volumes.',
                'Use Amazon Inspector to detect unencrypted Amazon Elastic Block Store (Amazon EBS) volumes. Use AWS Systems Manager Automation rules to automatically encrypt existing and new EBS volumes.',
            ],
            correctOptionIndex: 0,
            explanation: 'IAM can prevent creation of unencrypted EBS volumes, while AWS Config managed rules can detect noncompliant volumes and Systems Manager Automation can remediate them.',
            incorrectOptionExplanations: {
                1: 'A Lambda and EventBridge solution is custom and has higher administrative overhead than AWS Config plus Systems Manager.',
                2: 'Amazon Macie discovers sensitive data in S3, not EBS encryption compliance.',
                3: 'Amazon Inspector scans workloads for vulnerabilities and network exposure, not EBS encryption configuration compliance.',
            },
            references: [
                'AWS Config Developer Guide — encrypted-volumes managed rule.',
                'Amazon EBS User Guide — Enforce encryption.',
                'AWS Systems Manager Automation — AWS-EnableEBSVolumeEncryption.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 80 — EventBridge API Destinations / OAuth
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed-sec-q80',
            type: 'single',
            prompt: 'A manufacturing company runs an order processing application in its VPC. The company wants to securely send messages from the application to an external Salesforce system that uses Open Authorization (OAuth). A solutions architect needs to integrate the company\'s order processing application with the external Salesforce system. Which solution will meet these requirements?',
            options: [
                'Create an Amazon Simple Notification Service (Amazon SNS) topic in a fanout configuration that pushes data to an HTTPS endpoint. Configure the order processing application to publish messages to the SNS topic.',
                'Create an Amazon Simple Notification Service (Amazon SNS) topic in a fanout configuration that pushes data to an Amazon Data Firehose delivery stream that has a HTTP destination. Configure the order processing application to publish messages to the SNS topic.',
                'Create an Amazon EventBridge rule and configure an Amazon EventBridge API destination partner. Configure the order processing application to publish messages to Amazon EventBridge.',
                'Create an Amazon Managed Streaming for Apache Kafka (Amazon MSK) topic that has an outbound MSK Connect connector. Configure the order processing application to publish messages to the MSK topic.',
            ],
            correctOptionIndex: 2,
            explanation: 'EventBridge API destinations can invoke external HTTP APIs and support managed connections, including OAuth client credentials, so the application does not need to manage OAuth tokens directly.',
            incorrectOptionExplanations: {
                0: 'SNS HTTPS subscriptions do not natively manage OAuth token acquisition and refresh.',
                1: 'Firehose HTTP destinations are built for streaming delivery and are unnecessarily complex for event-based API integration.',
                3: 'Amazon MSK is excessive for this integration and adds operational overhead.',
            },
            references: [
                'Amazon EventBridge User Guide — API destinations.',
                'Amazon EventBridge User Guide — Connection authorization parameters.',
                'Amazon EventBridge User Guide — Tutorial: Use an API destination with a third-party API.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 81 — S3 Access From VPC Endpoint Only
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed-sec-q81',
            type: 'single',
            prompt: 'A company has Amazon EC2 instances in multiple AWS Regions. The instances all store and retrieve confidential data from the same Amazon S3 bucket. The company wants to improve the security of its current architecture. The company wants to ensure that only the Amazon EC2 instances within its VPC can access the S3 bucket. The company must block all other access to the bucket. Which solution will meet this requirement?',
            options: [
                'Use IAM policies to restrict access to the S3 bucket.',
                'Use server-side encryption (SSE) to encrypt data in the S3 bucket at rest. Store the encryption key on the EC2 instances.',
                'Create a VPC endpoint for Amazon S3. Configure an S3 bucket policy to allow connections only from the endpoint.',
                'Use AWS Key Management Service (AWS KMS) with customer-managed keys to encrypt the data before sending the data to the S3 bucket.',
            ],
            correctOptionIndex: 2,
            explanation: 'An S3 VPC endpoint provides private connectivity from the VPC to S3. A bucket policy with aws:sourceVpce can deny all requests that do not come through the approved endpoint.',
            incorrectOptionExplanations: {
                0: 'IAM policies restrict principals but do not by themselves restrict network origin to the VPC.',
                1: 'Encryption protects data at rest but does not control network access to the bucket.',
                3: 'KMS protects data but does not restrict which network path can access S3.',
            },
            references: [
                'Amazon VPC User Guide — Endpoints for Amazon S3.',
                'Amazon S3 User Guide — Controlling access from VPC endpoints with bucket policies.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 82 — Region Restrictions / IAM Conditions
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed-sec-q82',
            type: 'single',
            prompt: 'A global company operates in multiple AWS Regions to meet data residency requirements. The company uses AWS Organizations to manage its accounts. The company wants to restrict IAM roles and access to specific Regions to prevent accidental data operations across geographic boundaries. Which solution will meet these requirements?',
            options: [
                'Configure a service control policy (SCP) to deny the ec2:RunInstances action in non-compliant Regions.',
                'Configure IAM policies by using the aws:RequestedRegion condition.',
                'Configure IAM role trust policies that use the aws:SourceIp condition.',
                'Configure AWS Config to detect unwanted access across Regions.',
            ],
            correctOptionIndex: 1,
            explanation: 'The aws:RequestedRegion global condition key can be used in IAM policies to restrict API requests to approved AWS Regions.',
            incorrectOptionExplanations: {
                0: 'Denying only ec2:RunInstances is too narrow for restricting access and data operations across Regions.',
                2: 'aws:SourceIp controls caller network location, not the target AWS Region.',
                3: 'AWS Config is detective and reports after configuration changes; it does not prevent access.',
            },
            references: [
                'IAM User Guide — AWS global condition context keys.',
                'IAM User Guide — aws:RequestedRegion.',
                'AWS Organizations User Guide — Service control policies.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 83 — Cognito / Lambda@Edge / CloudFront
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed-sec-q83',
            type: 'single',
            prompt: "A company wants to restrict access to the content of its web application. The company needs to protect the content by using authorization techniques that are available on AWS. The company also wants to implement a serverless architecture for authorization and authentication that has low login latency. The solution must integrate with the web application and serve web content globally. The application currently has a small user base, but the company expects the application's user base to increase. Which solution will meet these requirements?",
            options: [
                'Configure Amazon Cognito for authentication. Implement Lambda@Edge for authorization. Configure Amazon CloudFront to serve the web application globally.',
                'Configure AWS Directory Service for Microsoft Active Directory for authentication. Implement AWS Lambda for authorization. Use an Application Load Balancer to serve the web application globally.',
                'Configure Amazon Cognito for authentication. Implement AWS Lambda for authorization. Use Amazon S3 Transfer Acceleration to serve the web application globally.',
                'Configure AWS Directory Service for Microsoft Active Directory for authentication. Implement Lambda@Edge for authorization. Use AWS Elastic Beanstalk to serve the web application globally.',
            ],
            correctOptionIndex: 0,
            explanation: 'Amazon Cognito provides scalable serverless authentication. Lambda@Edge runs authorization logic close to users, and CloudFront serves the application globally with low latency.',
            incorrectOptionExplanations: {
                1: 'An ALB is Regional and Directory Service is not ideal for scalable public web application authentication.',
                2: 'S3 Transfer Acceleration is not a CDN for serving global web content, and Regional Lambda adds more latency than Lambda@Edge.',
                3: 'Elastic Beanstalk is Regional, and Directory Service is not the best fit for this public web application scenario.',
            },
            references: [
                'Amazon Cognito Developer Guide — What is Amazon Cognito?',
                'Amazon CloudFront Developer Guide — What is Amazon CloudFront?',
                'Lambda@Edge Developer Guide — Authentication and authorization use cases.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 84 — Service Catalog Self-Service
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed-sec-q84',
            type: 'single',
            prompt: 'A consulting company provides professional services to customers worldwide. The company provides solutions and tools for customers to expedite gathering and analyzing data on AWS. The company needs to centrally manage and deploy a common set of solutions and tools for customers to use for self-service purposes. Which solution will meet these requirements?',
            options: [
                'Create AWS CloudFormation templates for the customers.',
                'Create AWS Service Catalog products for the customers.',
                'Create AWS Systems Manager templates for the customers.',
                'Create AWS Config items for the customers.',
            ],
            correctOptionIndex: 1,
            explanation: 'AWS Service Catalog is built to centrally manage approved IT services and provide self-service deployment while preserving governance.',
            incorrectOptionExplanations: {
                0: 'CloudFormation templates define infrastructure but do not provide catalog governance and self-service product management on their own.',
                2: 'Systems Manager manages operations and automation for resources, not a customer-facing service catalog.',
                3: 'AWS Config evaluates configuration compliance; it does not deploy solution catalogs.',
            },
            references: [
                'AWS Service Catalog Administrator Guide — What is AWS Service Catalog?',
                'AWS CloudFormation User Guide — What is AWS CloudFormation?',
                'AWS Systems Manager User Guide — What is AWS Systems Manager?',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 85 — ECS awsvpc / NLB / NAT Gateway
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed-sec-q85',
            type: 'single',
            prompt: 'A company is creating a payment processing application that supports TLS connections from IPv4 clients. The application requires outbound access to the public internet. The application must allow users to access the application from a single entry point while maintaining the lowest possible attack surface. The company wants to use Amazon ECS tasks to deploy the application. The company wants to enable awsvpc network mode. Which solution will meet these requirements?',
            options: [
                'Create a VPC that has an internet gateway, public subnets, and private subnets. Deploy a Network Load Balancer (NLB) and a NAT gateway in the public subnets. Deploy the ECS tasks in the private subnets.',
                'Create a VPC that has an egress-only internet gateway, public subnets, and private subnets. Deploy an Application Load Balancer (ALB) and a NAT gateway in the public subnets. Deploy the ECS tasks in the private subnets.',
                'Create a VPC that has an internet gateway, public subnets, and private subnets. Deploy an Application Load Balancer (ALB) in the public subnets. Deploy the ECS tasks in the public subnets.',
                'Create a VPC that has an egress-only internet gateway, public subnets, and private subnets. Deploy a Network Load Balancer (NLB) in the public subnets. Deploy the ECS tasks in the public subnets.',
            ],
            correctOptionIndex: 0,
            explanation: 'Keeping ECS tasks in private subnets reduces attack surface. A public NLB provides a single TLS entry point, and a NAT gateway provides outbound IPv4 internet access.',
            incorrectOptionExplanations: {
                1: 'An egress-only internet gateway supports IPv6 only, not IPv4 outbound access.',
                2: 'Putting ECS tasks in public subnets increases the attack surface.',
                3: 'This uses an IPv6-only egress-only internet gateway and exposes ECS tasks in public subnets.',
            },
            references: [
                'Amazon ECS Developer Guide — Task networking and awsvpc mode.',
                'Elastic Load Balancing User Guide — Network Load Balancers.',
                'Amazon VPC User Guide — NAT gateways.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 86 — CloudFormation / AWS Config
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed-sec-q86',
            type: 'single',
            prompt: "A company has customers located across the world. The company wants to use automation to secure its systems and network infrastructure. The company's security team must be able to track and audit all incremental changes to the infrastructure. Which solution will meet these requirements?",
            options: [
                'Use AWS Organizations to set up the infrastructure. Use AWS Config to track changes.',
                'Use AWS CloudFormation to set up the infrastructure. Use AWS Config to track changes.',
                'Use AWS Organizations to set up the infrastructure. Use AWS Service Catalog to track changes.',
                'Use AWS CloudFormation to set up the infrastructure. Use AWS Service Catalog to track changes.',
            ],
            correctOptionIndex: 1,
            explanation: 'CloudFormation provides infrastructure automation, and AWS Config records configuration changes and supports auditing over time.',
            incorrectOptionExplanations: {
                0: 'AWS Organizations manages accounts and governance, not infrastructure provisioning.',
                2: 'Service Catalog is not the primary service for tracking all resource configuration changes.',
                3: 'CloudFormation automates deployment, but Service Catalog does not provide comprehensive configuration history.',
            },
            references: [
                'AWS CloudFormation User Guide — What is AWS CloudFormation?',
                'AWS Config Developer Guide — What is AWS Config?',
                'AWS Organizations User Guide — What is AWS Organizations?',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 87 — IAM Identity Center / Managed AD Trust
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed-sec-q87',
            type: 'single',
            prompt: "A company is migrating applications from an on-premises Microsoft Active Directory that the company manages to AWS. The company deploys the applications in multiple AWS accounts. The company uses AWS Organizations to manage the accounts centrally. The company's security team needs a single sign-on solution across all the company's AWS accounts. The company must continue to manage users and groups that are in the on-premises Active Directory. Which solution will meet these requirements?",
            options: [
                'Create an Enterprise Edition Active Directory in AWS Directory Service for Microsoft Active Directory. Configure the Active Directory to be the identity source for AWS IAM Identity Center.',
                "Enable AWS IAM Identity Center. Configure a two-way forest trust relationship to connect the company's self-managed Active Directory with IAM Identity Center by using AWS Directory Service for Microsoft Active Directory.",
                "Use AWS Directory Service and create a two-way trust relationship with the company's self-managed Active Directory.",
                'Deploy an identity provider (IdP) on Amazon EC2. Link the IdP as an identity source within AWS IAM Identity Center.',
            ],
            correctOptionIndex: 1,
            explanation: 'IAM Identity Center provides SSO across AWS Organizations. AWS Managed Microsoft AD with a trust to the on-premises AD lets the company keep managing users and groups in the on-premises directory.',
            incorrectOptionExplanations: {
                0: 'Creating a new directory as the identity source does not satisfy continued management in the existing on-premises AD.',
                2: 'A trust relationship alone does not provide the SSO and account access management capabilities of IAM Identity Center.',
                3: 'A custom IdP on EC2 adds unnecessary operational overhead compared with AWS managed directory integration.',
            },
            references: [
                'AWS IAM Identity Center User Guide — Self-managed Active Directory identity source.',
                'AWS Directory Service Administration Guide — Create a trust relationship.',
                'AWS Security Blog — Use on-premises credentials to access AWS.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 88 — EC2 Microservices / IAM Roles
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed-sec-q88',
            type: 'single',
            prompt: 'A company is designing a microservice-based architecture for a new application on AWS. Each microservice will run on its own set of Amazon EC2 instances. Each microservice will need to interact with multiple AWS services such as Amazon S3 and Amazon Simple Queue Service (Amazon SQS). The company wants to manage permissions for each EC2 instance based on the principle of least privilege. Which solution will meet this requirement?',
            options: [
                'Assign an IAM user to each microservice. Use access keys stored within the application code to authenticate AWS service requests.',
                'Create a single IAM role that has permission to access all AWS services. Associate the IAM role with all EC2 instances that run the microservices.',
                'Use AWS Organizations to create a separate account for each microservice. Manage permissions at the account level.',
                'Create individual IAM roles based on the specific needs of each microservice. Associate the IAM roles with the appropriate EC2 instances.',
            ],
            correctOptionIndex: 3,
            explanation: 'Separate IAM roles scoped to each microservice provide least-privilege temporary credentials to the EC2 instances that need them.',
            incorrectOptionExplanations: {
                0: 'Access keys in application code are long-term credentials and are a security anti-pattern.',
                1: 'A single broad role violates least privilege.',
                2: 'Separate accounts can provide isolation but are unnecessarily complex and do not replace instance-level IAM roles.',
            },
            references: [
                'IAM User Guide — IAM roles for Amazon EC2.',
                'AWS Well-Architected Framework Security Pillar — Grant least privilege.',
                'IAM User Guide — Best practices and use cases.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 89 — CloudFormation / EC2 Instance Profile
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed-sec-q89',
            type: 'single',
            prompt: 'A company uses a set of Amazon EC2 instances to host a website. The website uses an Amazon S3 bucket to store images and media files. The company wants to automate website infrastructure creation to deploy the website to multiple AWS Regions. The company also wants to provide the EC2 instances access to the S3 bucket so the instances can store and access data by using AWS Identity and Access Management (IAM). Which solution will meet these requirements MOST securely?',
            options: [
                'Create an AWS CloudFormation template for the web server EC2 instances. Save an IAM access key in the UserData section of the AWS::EC2::Instance entity in the CloudFormation template.',
                'Create a file that contains an IAM secret access key and access key ID. Store the file in a new S3 bucket. Create an AWS CloudFormation template. In the template, create a parameter to specify the location of the S3 object that contains the access key and access key ID.',
                'Create an IAM role and an IAM access policy that allows the web server EC2 instances to access the S3 bucket. Create an AWS CloudFormation template for the web server EC2 instances that contains an IAM instance profile entity that references the IAM role and the IAM access policy.',
                'Create a script that retrieves an IAM secret access key and access key ID from IAM and stores them on the web server EC2 instances. Include the script in the UserData section of the AWS::EC2::Instance entity in an AWS CloudFormation template.',
            ],
            correctOptionIndex: 2,
            explanation: 'CloudFormation can create an IAM role, policy, instance profile, and EC2 instances. Instance profiles provide temporary credentials to EC2 without storing access keys.',
            incorrectOptionExplanations: {
                0: 'Access keys in UserData are exposed and long-lived.',
                1: 'Storing access keys in S3 is insecure and creates a credential retrieval problem.',
                3: 'Retrieving and storing access keys on instances is less secure than using an IAM role.',
            },
            references: [
                'IAM User Guide — IAM roles for Amazon EC2.',
                'AWS CloudFormation User Guide — AWS::EC2::Instance IamInstanceProfile.',
                'AWS Well-Architected Framework Security Pillar — Use temporary credentials.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 90 — S3 Presigned URL
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed-sec-q90',
            type: 'single',
            prompt: "A company creates operations data and stores the data in an Amazon S3 bucket for the company's annual audit. An external consultant needs to access an annual report that is stored in the S3 bucket. The external consultant needs to access the report for 7 days. The company must implement a solution to allow the external consultant access to only the report. Which solution will meet these requirements with the MOST operational efficiency?",
            options: [
                'Create a new S3 bucket that is configured to host a public static website. Migrate the operations data to the new S3 bucket. Share the S3 website URL with the external consultant.',
                'Enable public access to the S3 bucket for 7 days. Remove access to the S3 bucket when the external consultant completes the audit.',
                'Create a new IAM user that has access to the report in the S3 bucket. Provide the access keys to the external consultant. Revoke the access keys after 7 days.',
                'Generate a presigned URL that has the required access to the location of the report on the S3 bucket. Share the presigned URL with the external consultant.',
            ],
            correctOptionIndex: 3,
            explanation: 'A presigned URL grants time-limited access to a specific S3 object without creating users, sharing credentials, or exposing the bucket publicly.',
            incorrectOptionExplanations: {
                0: 'Creating a public website bucket and moving data is inefficient and insecure.',
                1: 'Public bucket access violates least privilege and exposes more than the one report.',
                2: 'Creating and revoking IAM users and access keys adds unnecessary operational work and long-term credential risk.',
            },
            references: [
                'Amazon S3 User Guide — Sharing objects using presigned URLs.',
                'IAM User Guide — Security best practices in IAM.',
                'Amazon S3 User Guide — Identity and access management for Amazon S3.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 91 — S3 Object Lock / Public Read
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed-sec-q91',
            type: 'single',
            prompt: 'How can a law firm make files publicly readable while preventing modifications or deletions until a specific future date?',
            options: [
                'Upload files to an Amazon S3 bucket configured for static website hosting. Grant read-only IAM permissions to any AWS principals.',
                'Create an S3 bucket. Enable S3 Versioning. Use S3 Object Lock with a retention period. Create a CloudFront distribution. Use a bucket policy to restrict access.',
                'Create an S3 bucket. Enable S3 Versioning. Configure an event trigger with AWS Lambda to restore modified objects from a private S3 bucket.',
                'Upload files to an S3 bucket for static website hosting. Use S3 Object Lock with a retention period. Grant read-only IAM permissions.',
            ],
            correctOptionIndex: 1,
            explanation: 'S3 Object Lock with a retention period provides WORM protection, and versioning is required. CloudFront can serve the content publicly while the bucket policy restricts direct origin access.',
            incorrectOptionExplanations: {
                0: 'Read-only IAM permissions do not prevent authorized modification or deletion by other principals and do not provide WORM retention.',
                2: 'Restoring after modification is reactive and does not prevent modification or deletion.',
                3: 'Direct static website hosting is less secure than CloudFront with restricted S3 origin access, and IAM permissions do not make anonymous public access work cleanly.',
            },
            references: [
                'Amazon S3 User Guide — Using S3 Object Lock.',
                'Amazon CloudFront Developer Guide — Restricting access to an Amazon S3 origin.',
                'Amazon S3 User Guide — Bucket policy examples.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 92 — S3 Upload Presigned URL
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed-sec-q92',
            type: 'single',
            prompt: 'A media company hosts a web application on AWS for uploading videos. Only authenticated users should upload within a specified time frame after authentication. Which solution will meet these requirements with the LEAST operational overhead?',
            options: [
                'Configure the application to generate IAM temporary security credentials for authenticated users.',
                'Create an AWS Lambda function that generates pre-signed URLs when a user authenticates.',
                'Develop a custom authentication service that integrates with Amazon Cognito to control and log direct S3 bucket access through the application.',
                'Use AWS Security Token Service (AWS STS) to assume a pre-defined IAM role that grants authenticated users temporary permissions to upload videos directly to the S3 bucket.',
            ],
            correctOptionIndex: 1,
            explanation: 'A Lambda function can generate a short-lived S3 presigned URL after authentication, allowing direct upload to a specific object without giving users AWS credentials.',
            incorrectOptionExplanations: {
                0: 'Temporary credentials require client-side AWS credential handling and SDK request signing.',
                2: 'A custom authentication service creates unnecessary development and operational overhead.',
                3: 'STS credentials are more complex for clients than a single presigned upload URL.',
            },
            references: [
                'Amazon S3 User Guide — Uploading objects using presigned URLs.',
                'Amazon S3 User Guide — Sharing objects using presigned URLs.',
                'AWS STS User Guide — Comparing STS API operations.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 93 — EC2 / Secrets Manager Access
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed-sec-q93',
            type: 'single',
            prompt: 'A company runs an application on EC2 instances that need access to RDS credentials stored in AWS Secrets Manager. Which solution meets this requirement?',
            options: [
                'Create an IAM role, and attach the role to each EC2 instance profile. Use an identity-based policy to grant the role access to the secret.',
                'Create an IAM user, and attach the user to each EC2 instance profile. Use a resource-based policy to grant the user access to the secret.',
                'Create a resource-based policy for the secret. Use EC2 Instance Connect to access the secret.',
                'Create an identity-based policy for the secret. Grant direct access to the EC2 instances.',
            ],
            correctOptionIndex: 0,
            explanation: 'Applications on EC2 should use an IAM role attached through an instance profile. The role receives temporary credentials and can be granted secretsmanager:GetSecretValue for the required secret.',
            incorrectOptionExplanations: {
                1: 'Instance profiles contain IAM roles, not IAM users.',
                2: 'EC2 Instance Connect is for SSH/RDP access, not programmatic secret retrieval.',
                3: 'Permissions are granted to IAM principals such as roles, not directly to EC2 instance resources.',
            },
            references: [
                'IAM User Guide — IAM roles for Amazon EC2.',
                'AWS Secrets Manager User Guide — Authentication and access control.',
                'Amazon EC2 User Guide — Common use cases for IAM roles.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 94 — Medical Repository / S3 Object Lock
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed-sec-q94',
            type: 'single',
            prompt: 'A company needs to save confidential medical results in an Amazon S3 bucket. The repository must allow a few approved users to add new files. The repository must restrict all other users to read-only access by using a write once, read many (WORM) approach. The company must keep every file in the repository for a minimum of 1 year after its creation date. Which solution will meet these requirements with the LEAST implementation effort?',
            options: [
                'Configure the S3 bucket with multi-factor authentication (MFA) delete. Do not share the MFA secret with users to avoid deletion.',
                'Use S3 Object Lock in compliance mode with a retention period of 1 year. Use an IAM policy that restricts file access to specified approved users.',
                'Use an IAM role to restrict all users from deleting or changing objects in the S3 bucket. Use an S3 bucket policy to only allow the IAM role.',
                'Configure the S3 bucket to invoke an AWS Lambda function every time an object is added. Configure the function to track the hash of the saved object so that modified objects can be marked accordingly.',
            ],
            correctOptionIndex: 1,
            explanation: 'S3 Object Lock in compliance mode enforces WORM retention for the configured period. IAM policies can grant write access only to approved users while others remain read-only.',
            incorrectOptionExplanations: {
                0: 'MFA Delete helps protect against deletion but does not enforce WORM retention or prevent overwrites.',
                2: 'IAM policies alone are weaker than Object Lock and do not enforce time-based immutable retention.',
                3: 'Hash tracking detects changes after the fact; it does not prevent modification or deletion.',
            },
            references: [
                'Amazon S3 User Guide — Using S3 Object Lock.',
                'Amazon S3 User Guide — S3 Object Lock retention modes.',
                'Amazon S3 User Guide — Managing access permissions to S3 resources.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 95 — BYOK / S3 Glacier SSE-C
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed-sec-q95',
            type: 'multiple',
            prompt: 'A company needs a cloud-based solution for backup, recovery, and archiving while retaining encryption key material control. Which combination of solutions will meet these requirements? (Select TWO.)',
            options: [
                "Create an AWS Key Management Service (AWS KMS) key without key material. Import the company's key material into the KMS key.",
                'Create an AWS KMS encryption key that contains key material generated by AWS KMS.',
                'Store the data in Amazon S3 Standard-Infrequent Access (S3 Standard-IA). Use S3 Bucket Keys with AWS KMS keys.',
                'Store the data in an Amazon S3 Glacier storage class. Use server-side encryption with customer-provided keys (SSE-C).',
                'Store the data in AWS Snowball devices. Use server-side encryption with AWS KMS keys (SSE-KMS).',
            ],
            correctOptionIndexes: [0, 3],
            explanation: 'Imported KMS key material supports bring-your-own-key requirements, and S3 Glacier with SSE-C supports long-term archival storage while letting the customer provide and control the encryption keys.',
            incorrectOptionExplanations: {
                1: 'AWS KMS-generated key material does not satisfy customer retention and control of key material.',
                2: 'S3 Standard-IA is not the lowest-cost long-term archive class, and KMS keys may use AWS-generated key material.',
                4: 'Snowball is for data transfer and edge use, not long-term cloud archiving.',
            },
            references: [
                'AWS KMS Developer Guide — Importing key material in AWS KMS keys.',
                'Amazon S3 User Guide — Server-side encryption with customer-provided keys (SSE-C).',
                'Amazon S3 User Guide — Amazon S3 storage classes.',
                'AWS Snowball Documentation — What is AWS Snowball?',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 96 — Macie / EventBridge / SNS
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed-sec-q96',
            type: 'single',
            prompt: 'How can a company detect and notify security teams about PII in S3 buckets?',
            options: [
                'Use Amazon Macie. Create an EventBridge rule for SensitiveData findings and send an SNS notification.',
                'Use Amazon GuardDuty. Create an EventBridge rule for CRITICAL findings and send an SNS notification.',
                'Use Amazon Macie. Create an EventBridge rule for SensitiveData:S3Object/Personal findings and send an SQS notification.',
                'Use Amazon GuardDuty. Create an EventBridge rule for CRITICAL findings and send an SQS notification.',
            ],
            correctOptionIndex: 0,
            explanation: 'Amazon Macie discovers sensitive data such as PII in S3 and publishes findings to EventBridge. EventBridge can route those findings to SNS for security team notifications.',
            incorrectOptionExplanations: {
                1: 'GuardDuty detects threats, not PII content in S3 objects.',
                2: 'Macie is correct, but SQS is a queue and requires a consumer; SNS is the direct notification service.',
                3: 'GuardDuty is the wrong service for PII discovery, and SQS is not direct notification.',
            },
            references: [
                'Amazon Macie User Guide — What is Amazon Macie?',
                'Amazon Macie User Guide — Monitoring and processing findings.',
                'Amazon EventBridge User Guide — EventBridge targets.',
                'Amazon GuardDuty User Guide — What is Amazon GuardDuty?',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 97 — Cross-Account S3 Access / Temporary Credentials
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed-sec-q97',
            type: 'single',
            prompt: 'A company uses two AWS accounts named Account A and Account B. Account A hosts a data analytics application. Account B hosts a data lake in an Amazon S3 bucket. Data analysts in Account A need to access the data lake in Account B. The access solution must be secure, use temporary credentials, enforce the principle of least privilege, and avoid long-term access keys. Which solution will meet these requirements?',
            options: [
                'Create IAM users in Account B and share the access keys for the users with analysts in Account A.',
                'Use an S3 bucket policy to configure the S3 bucket in Account B to be publicly accessible.',
                'Configure a resource-based policy for the S3 bucket in Account B to allow access from an IAM role in Account A.',
                'Use a bastion host in Account B to proxy analyst requests from Account A through an Amazon EC2 instance.',
            ],
            correctOptionIndex: 2,
            explanation: 'An S3 bucket policy can grant least-privilege access to a specific IAM role in another account. Analysts use temporary credentials by assuming the role.',
            incorrectOptionExplanations: {
                0: 'Shared IAM user access keys are long-term credentials and violate the requirements.',
                1: 'Public access violates least privilege and exposes the data lake.',
                3: 'A bastion host is not appropriate for S3 API access and adds unnecessary complexity.',
            },
            references: [
                'Amazon S3 User Guide — Cross-account bucket permissions walkthrough.',
                'IAM User Guide — IAM roles.',
                'IAM User Guide — Delegate access across AWS accounts using IAM roles.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 98 — Transfer Family Managed Workflows
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed-sec-q98',
            type: 'multiple',
            prompt: 'A company needs a solution to give customers the ability to upload encrypted files to a directory in an Amazon S3 bucket by using SFTP. After customers upload files, the solution must automatically decrypt the files and move them to a second directory within the same S3 bucket for downstream processing. The solution must not require authentication services. The solution must fully automate all post-upload operations and require minimal ongoing operational overhead. Which solution will meet these requirements? (Select THREE.)',
            options: [
                'Use AWS Transfer Family with the SFTP protocol. Configure the S3 bucket as the home directory for uploaded files.',
                'Use an S3 event notification to invoke an AWS Lambda function that moves uploaded files between folders.',
                'Use an AWS Transfer Family workflow and a DECRYPT action to decrypt uploaded files.',
                'Tag incoming S3 objects. Periodically query objects by using an external script that runs in a container.',
                'Use an AWS Transfer Family workflow and a COPY action to move files to a new directory within the S3 bucket after decryption.',
                'Use an AWS Batch job to poll the S3 bucket and run a decryption script on new files.',
            ],
            correctOptionIndexes: [0, 2, 4],
            explanation: 'AWS Transfer Family provides managed SFTP access to S3. Managed workflows can run post-upload DECRYPT and COPY steps to fully automate decryption and movement with minimal operations.',
            incorrectOptionExplanations: {
                1: 'S3 events with Lambda can work, but Transfer Family workflows are purpose-built for post-upload SFTP processing.',
                3: 'Polling with an external script is not fully event-driven and adds operational overhead.',
                5: 'Batch polling is inefficient and more operationally complex than managed workflows.',
            },
            references: [
                'AWS Transfer Family User Guide — What is AWS Transfer Family?',
                'AWS Transfer Family User Guide — Managed workflows.',
                'AWS Transfer Family User Guide — Decrypt files using managed workflows.',
                'AWS Transfer Family User Guide — Workflow steps.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 99 — CloudFront Logging Change Alert
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed-sec-q99',
            type: 'multiple',
            prompt: 'A company runs an order management application on AWS. The application allows customers to place orders and pay with a credit card. The company uses an Amazon CloudFront distribution to deliver the application. A security team has set up logging for all incoming requests. The security team needs a solution to generate an alert if any user modifies the logging configuration. Which combination of solutions will meet these requirements? (Select TWO.)',
            options: [
                'Configure an Amazon EventBridge rule that is invoked when a user creates or modifies a CloudFront distribution. Add the AWS Lambda function as a target of the EventBridge rule.',
                'Create an Application Load Balancer (ALB). Enable AWS WAF rules for the ALB. Configure an AWS Config rule to detect security violations.',
                'Create an AWS Lambda function to detect changes in CloudFront distribution logging. Configure the Lambda function to use Amazon Simple Notification Service (Amazon SNS) to send notifications to the security team.',
                'Set up Amazon GuardDuty. Configure GuardDuty to monitor findings from the CloudFront distribution. Create an AWS Lambda function to address the findings.',
                'Create a private API in Amazon API Gateway. Use AWS WAF rules to protect the private API from common security problems.',
            ],
            correctOptionIndexes: [0, 2],
            explanation: 'CloudFront distribution changes are logged through CloudTrail and can trigger EventBridge rules. A Lambda target can inspect whether logging changed and publish an SNS notification.',
            incorrectOptionExplanations: {
                1: 'ALB, WAF, and Config do not directly monitor CloudFront logging configuration changes.',
                3: 'GuardDuty detects threats; it is not designed for specific authorized configuration-change alerts.',
                4: 'API Gateway is unrelated to CloudFront distribution logging configuration.',
            },
            references: [
                'Amazon EventBridge User Guide — Trigger rules on AWS API calls using CloudTrail.',
                'Amazon CloudFront Developer Guide — Logging CloudFront API calls using CloudTrail.',
                'AWS Lambda Developer Guide — Using Lambda with EventBridge.',
                'Amazon SNS Developer Guide — Notifications.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 100 — IAM Roles Anywhere
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed-sec-q100',
            type: 'single',
            prompt: 'A company wants to provide a third-party system that runs in a private data center with access to its AWS account. The company wants to call AWS APIs directly from the third-party system. The company has an existing process for managing digital certificates. The company does not want to use SAML or OpenID Connect (OIDC) capabilities and does not want to store long-term AWS credentials. Which solution will meet these requirements?',
            options: [
                'Configure mutual TLS to allow authentication of the client and server sides of the communication channel.',
                'Configure AWS Signature Version 4 to authenticate incoming HTTPS requests to AWS APIs.',
                'Configure Kerberos to exchange tickets for assertions that can be validated by AWS APIs.',
                'Configure AWS Identity and Access Management (IAM) Roles Anywhere to exchange X.509 certificates for AWS credentials to interact with AWS APIs.',
            ],
            correctOptionIndex: 3,
            explanation: 'IAM Roles Anywhere lets workloads outside AWS use X.509 certificates to obtain temporary AWS credentials and assume IAM roles without SAML, OIDC, or long-term access keys.',
            incorrectOptionExplanations: {
                0: 'Mutual TLS authenticates the transport connection but does not provide IAM credentials for AWS API authorization.',
                1: 'Signature Version 4 signs requests but still requires AWS credentials; it does not solve credential issuance.',
                2: 'Kerberos is not the AWS mechanism for exchanging on-premises identities for AWS API credentials.',
            },
            references: [
                'IAM Roles Anywhere User Guide — What is IAM Roles Anywhere?',
                'IAM Roles Anywhere User Guide — How IAM Roles Anywhere works.',
                'IAM User Guide — Security best practices in IAM.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 101 — Transit Gateway Cross-Account Connectivity
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed-sec-q101',
            type: 'single',
            prompt: 'A company is migrating a new application from an on-premises data center to a new VPC in the AWS Cloud. The company has multiple AWS accounts and VPCs that share many subnets and applications. The company wants to have fine-grained access control for the new application. The company wants to ensure that all network resources across accounts and VPCs that are granted permission to access the new application can access the application. Which solution will meet these requirements?',
            options: [
                'Set up a VPC peering connection for each VPC that needs access to the new application VPC. Update route tables in each VPC to enable connectivity.',
                'Deploy a transit gateway in the account that hosts the new application. Share the transit gateway with each account that needs to connect to the application. Update route tables in the VPC that hosts the new application and in the transit gateway to enable connectivity.',
                'Use an AWS PrivateLink endpoint service to make the new application accessible to other VPCs. Control access to the application by using an endpoint policy.',
                'Use an Application Load Balancer (ALB) to expose the new application to the internet. Configure authentication and authorization processes to ensure that only specified VPCs can access the application.',
            ],
            correctOptionIndex: 1,
            explanation: 'Transit Gateway provides scalable hub-and-spoke connectivity across many VPCs and accounts and can be shared through AWS RAM. Transit gateway route tables allow controlled connectivity between VPC attachments.',
            incorrectOptionExplanations: {
                0: 'VPC peering becomes complex at scale and is non-transitive.',
                2: 'PrivateLink is best for exposing a specific service, while this scenario emphasizes broad network-resource connectivity across accounts and VPCs.',
                3: 'Exposing the application to the internet is unnecessary and increases risk.',
            },
            references: [
                'Amazon VPC User Guide — Transit gateways and how they work.',
                'Amazon VPC User Guide — Share your transit gateway.',
                'Amazon VPC User Guide — Transit gateway route tables.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 102 — Macie Sensitive Data Alerts
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed-sec-q102',
            type: 'single',
            prompt: 'A company is enhancing the security of its AWS environment, where the company stores a significant amount of sensitive customer data. The company needs a solution that automatically identifies and classifies sensitive data that is stored in multiple Amazon S3 buckets. The solution must automatically respond to data breaches and alert the company\'s security team through email immediately when noncompliant data is found. Which solution will meet these requirements?',
            options: [
                'Use Amazon GuardDuty. Configure an AWS Lambda function to route alerts to an Amazon Simple Notification Service (Amazon SNS) topic. Subscribe the security team to the SNS topic.',
                'Use Amazon GuardDuty. Configure an AWS Lambda function to route alerts to an Amazon Simple Queue Service (Amazon SQS) queue. Configure a second Lambda function to periodically poll the SQS queue and to send emails to the security team by using Amazon Simple Email Service (Amazon SES).',
                'Use Amazon Macie. Integrate Amazon EventBridge with Macie, and configure EventBridge to send alerts to an Amazon Simple Notification Service (Amazon SNS) topic. Subscribe the security team to the SNS topic.',
                'Use Amazon Macie. Integrate Amazon EventBridge with Macie, and configure EventBridge to route alerts to an Amazon Simple Queue Service (Amazon SQS) queue. Configure an AWS Lambda function to periodically poll the SQS queue and to send alerts to the security team by using Amazon Simple Email Service (Amazon SES).',
            ],
            correctOptionIndex: 2,
            explanation: 'Amazon Macie discovers and classifies sensitive data in S3. Macie findings can be routed through EventBridge directly to SNS for immediate email notifications.',
            incorrectOptionExplanations: {
                0: 'GuardDuty detects threats and malicious behavior, not sensitive data content classification.',
                1: 'GuardDuty is the wrong service and the SQS polling workflow adds unnecessary delay and complexity.',
                3: 'Macie is correct, but EventBridge to SNS is simpler and more direct than SQS plus polling Lambda plus SES.',
            },
            references: [
                'Amazon Macie User Guide — What is Amazon Macie?',
                'Amazon Macie User Guide — Monitoring Macie events with EventBridge.',
                'Amazon EventBridge User Guide — EventBridge targets.',
                'Amazon GuardDuty User Guide — What is Amazon GuardDuty?',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 103 — Data Lake Row-Level Access
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed-sec-q103',
            type: 'single',
            prompt: 'A company wants to implement a data lake in the AWS Cloud. The company must ensure that only specific teams have access to sensitive data in the data lake. The company must have row-level access control for the data lake. Which solution will meet these requirements?',
            options: [
                'Use Amazon RDS to store the data. Use IAM roles and permissions for data governance and access control.',
                'Use Amazon Redshift to store the data. Use IAM roles and permissions for data governance and access control.',
                'Use Amazon S3 to store the data. Use AWS Lake Formation for data governance and access control.',
                'Use AWS Glue Catalog to store the data. Use AWS Glue DataBrew for data governance and access control.',
            ],
            correctOptionIndex: 2,
            explanation: 'Amazon S3 is the common storage layer for AWS data lakes, and AWS Lake Formation provides fine-grained data lake permissions including row-level and column-level access control.',
            incorrectOptionExplanations: {
                0: 'RDS is a relational database service, not the typical scalable storage layer for a data lake.',
                1: 'Redshift is a data warehouse rather than the primary raw data lake storage layer.',
                3: 'The Glue Data Catalog stores metadata, and DataBrew prepares data; they do not provide data lake governance and row-level access control.',
            },
            references: [
                'AWS Documentation — What is a data lake?',
                'AWS Lake Formation Developer Guide — Fine-grained access control.',
                'AWS Glue DataBrew Documentation — What is AWS Glue DataBrew?',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 104 — Aurora Credentials / Secrets Manager
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed-sec-q104',
            type: 'single',
            prompt: 'A company has a relational database workload that runs on Amazon Aurora MySQL. According to new compliance standards, the company must rotate all database credentials every 30 days. The company needs a solution that maximizes security and minimizes development effort. Which solution will meet these requirements?',
            options: [
                'Store the database credentials in AWS Secrets Manager. Configure automatic credential rotation for every 30 days.',
                'Store the database credentials in AWS Systems Manager Parameter Store. Create an AWS Lambda function to rotate the credentials every 30 days.',
                'Store the database credentials in an environment file or in a configuration file. Modify the credentials every 30 days.',
                'Store the database credentials in an environment file or in a configuration file. Create an AWS Lambda function to rotate the credentials every 30 days.',
            ],
            correctOptionIndex: 0,
            explanation: 'AWS Secrets Manager securely stores and automatically rotates supported database credentials, including Aurora credentials, on a configured schedule.',
            incorrectOptionExplanations: {
                1: 'Parameter Store does not provide the same built-in database credential rotation and would require custom Lambda code.',
                2: 'Configuration files are insecure for secrets and manual rotation increases effort.',
                3: 'Configuration files are insecure even if rotation is automated with Lambda.',
            },
            references: [
                'AWS Secrets Manager User Guide — What is AWS Secrets Manager?',
                'AWS Secrets Manager User Guide — Rotate Secrets Manager secrets.',
                'AWS Secrets Manager User Guide — Comparing Secrets Manager and Parameter Store.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 105 — IAM Identity Center / Existing AD / MFA
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed-sec-q105',
            type: 'single',
            prompt: 'A company that has multiple AWS accounts maintains an on-premises Microsoft Active Directory. The company needs a solution to implement Single Sign-On for its employees. The company wants to use AWS IAM Identity Center. The solution must meet the following requirements: Allow users to access AWS accounts and third-party applications by using existing Active Directory credentials. Enforce multi-factor authentication (MFA) to access AWS accounts. Centrally manage permissions to access AWS accounts and applications. Which solution will meet these requirements?',
            options: [
                'Create an IAM identity provider for Active Directory in each AWS account. Ensure that Active Directory users and groups access AWS accounts directly through IAM roles. Use IAM Identity Center to enforce MFA in each account for all users.',
                'Use AWS Directory Service to create a new AWS Managed Microsoft AD Active Directory. Configure IAM Identity Center in each account to use the new AWS Managed Microsoft AD Active Directory as the identity source. Use IAM Identity Center to enforce MFA for all users.',
                'Use IAM Identity Center with the existing Active Directory as the identity source. Enforce MFA for all users. Use AWS Organizations and Active Directory groups to manage access permissions for AWS accounts and application access.',
                'Use AWS Lambda functions to periodically synchronize Active Directory users and groups with IAM users and groups in each AWS account. Use IAM roles and policies to manage application access. Create a second Lambda function to enforce MFA.',
            ],
            correctOptionIndex: 2,
            explanation: 'IAM Identity Center integrates with AWS Organizations and can use an existing Active Directory identity source, enforce MFA, and centrally assign permission sets to AD groups for AWS accounts and applications.',
            incorrectOptionExplanations: {
                0: 'Configuring IAM identity providers in each account is decentralized and defeats centralized management.',
                1: 'Creating a new directory does not use the existing on-premises AD as required.',
                3: 'Synchronizing users into IAM is complex, duplicates identities, and is less secure than federation.',
            },
            references: [
                'AWS IAM Identity Center User Guide — What is AWS IAM Identity Center?',
                'AWS IAM Identity Center User Guide — Choose your identity source.',
                'AWS IAM Identity Center User Guide — Multi-factor authentication.',
                'AWS Directory Service Administration Guide — AD Connector.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 106 — CloudFront Logging Change Alert Duplicate
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed-sec-q106',
            type: 'multiple',
            prompt: 'A company runs an order management application on AWS. The application allows customers to place orders and pay with a credit card. The company uses an Amazon CloudFront distribution to deliver the application. A security team has set up logging for all incoming requests. The security team needs a solution to generate an alert if any user modifies the logging configuration. Which combination of solutions will meet these requirements? (Select TWO.)',
            options: [
                'Configure an Amazon EventBridge rule that is invoked when a user creates or modifies a CloudFront distribution. Add the AWS Lambda function as a target of the EventBridge rule.',
                'Create an Application Load Balancer (ALB). Enable AWS WAF rules for the ALB. Configure an AWS Config rule to detect security violations.',
                'Create an AWS Lambda function to detect changes in CloudFront distribution logging. Configure the Lambda function to use Amazon Simple Notification Service (Amazon SNS) to send notifications to the security team.',
                'Set up Amazon GuardDuty. Configure GuardDuty to monitor findings from the CloudFront distribution. Create an AWS Lambda function to address the findings.',
                'Create a private API in Amazon API Gateway. Use AWS WAF rules to protect the private API from common security problems.',
            ],
            correctOptionIndexes: [0, 2],
            explanation: 'EventBridge can match CloudTrail events for CloudFront distribution changes. A Lambda function can inspect whether logging was changed and publish an SNS alert.',
            incorrectOptionExplanations: {
                1: 'ALB and WAF protect application traffic, not CloudFront logging configuration.',
                3: 'GuardDuty is not a configuration change auditing service for this purpose.',
                4: 'API Gateway is unrelated to CloudFront logging configuration changes.',
            },
            references: [
                'Amazon EventBridge User Guide — Log AWS API calls using EventBridge.',
                'AWS Lambda Developer Guide — Using Lambda with EventBridge.',
                'Amazon CloudFront Developer Guide — Logging API calls using CloudTrail.',
                'Amazon SNS Developer Guide — Notifications.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 107 — S3 Object Lock / CloudFront OAC
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed-sec-q107',
            type: 'single',
            prompt: 'A law firm needs to make hundreds of files readable for the general public. The law firm must prevent members of the public from modifying or deleting the files before a specified future date. Which solution will meet these requirements MOST securely?',
            options: [
                'Upload the files to an Amazon S3 bucket that is configured for static website hosting. Grant read-only IAM permissions to any AWS principals that access the S3 bucket until the specified date.',
                'Create a new Amazon S3 bucket. Enable S3 Versioning. Use S3 Object Lock and set a retention period based on the specified date. Create an Amazon CloudFront distribution to serve content from the bucket. Use an S3 bucket policy to restrict access to the CloudFront origin access control (OAC).',
                'Create a new Amazon S3 bucket. Enable S3 Versioning. Configure an event trigger to run an AWS Lambda function if a user modifies or deletes an object. Configure the Lambda function to replace the modified or deleted objects with the original versions of the objects from a private S3 bucket.',
                'Upload the files to an Amazon S3 bucket that is configured for static website hosting. Select the folder that contains the files. Use S3 Object Lock with a retention period based on the specified date. Grant read-only IAM permissions to any AWS principals that access the S3 bucket.',
            ],
            correctOptionIndex: 1,
            explanation: 'S3 Object Lock with retention prevents object modification or deletion until the specified date. CloudFront with OAC serves public reads while keeping direct S3 access restricted.',
            incorrectOptionExplanations: {
                0: 'Static website hosting and IAM read-only permissions do not provide WORM protection or anonymous public access securely.',
                2: 'Lambda restoration is reactive and permits a window where objects may be changed or deleted.',
                3: 'Direct public static website hosting is less secure than using CloudFront with OAC, and IAM does not represent anonymous public access.',
            },
            references: [
                'Amazon S3 User Guide — Using S3 Object Lock.',
                'Amazon CloudFront Developer Guide — Restricting access to an Amazon S3 origin with OAC.',
                'Amazon S3 User Guide — S3 Versioning and Object Lock prerequisites.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 108 — Authenticated Upload / Presigned URLs
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed-sec-q108',
            type: 'single',
            prompt: 'A media company hosts a web application on AWS. The application gives users the ability to upload and view videos. The application stores the videos in an Amazon S3 bucket. The company wants to ensure that only authenticated users can upload videos. Authenticated users must have the ability to upload videos only within a specified time frame after authentication. Which solution will meet these requirements with the LEAST operational overhead?',
            options: [
                'Configure the application to generate IAM temporary security credentials for authenticated users.',
                'Create an AWS Lambda function that generates pre-signed URLs when a user authenticates.',
                'Develop a custom authentication service that integrates with Amazon Cognito to control and log direct S3 bucket access through the application.',
                'Use AWS Security Token Service (AWS STS) to assume a pre-defined IAM role that grants authenticated users temporary permissions to upload videos directly to the S3 bucket.',
            ],
            correctOptionIndex: 1,
            explanation: 'After authentication, a Lambda function can issue a short-lived S3 presigned URL for a specific upload, keeping clients simple and avoiding AWS credential distribution.',
            incorrectOptionExplanations: {
                0: 'Temporary credentials require the client to handle AWS credentials and request signing.',
                2: 'A custom authentication service creates unnecessary operational and development effort.',
                3: 'STS credentials are valid but more complex for this upload-only use case than presigned URLs.',
            },
            references: [
                'Amazon S3 User Guide — Sharing objects using presigned URLs.',
                'AWS Security Blog — Presigned URLs.',
                'AWS STS Documentation — Temporary credentials.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 109 — EC2 / Secrets Manager Access Duplicate
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed-sec-q109',
            type: 'single',
            prompt: 'A company runs an application on Amazon EC2 instances. The instances need to access an Amazon RDS database by using specific credentials. The company uses AWS Secrets Manager to contain the credentials the EC2 instances must use. Which solution will meet this requirement?',
            options: [
                'Create an IAM role, and attach the role to each EC2 instance profile. Use an identity-based policy to grant the new IAM role access to the secret that contains the database credentials.',
                'Create an IAM user, and attach the user to each EC2 instance profile. Use a resource-based policy to grant the new IAM user access to the secret that contains the database credentials.',
                'Create a resource-based policy for the secret that contains the database credentials. Use EC2 Instance Connect to access the secret.',
                'Create an identity-based policy for the secret that contains the database credentials. Grant direct access to the EC2 instances.',
            ],
            correctOptionIndex: 0,
            explanation: 'An IAM role attached through an EC2 instance profile supplies temporary credentials to the application. An identity-based policy on the role can grant access to the required Secrets Manager secret.',
            incorrectOptionExplanations: {
                1: 'IAM users cannot be attached to EC2 instance profiles and would require long-term credentials.',
                2: 'EC2 Instance Connect is for connecting to instances, not retrieving secrets.',
                3: 'IAM permissions are granted to principals, not directly to EC2 instances.',
            },
            references: [
                'IAM User Guide — IAM roles for Amazon EC2.',
                'AWS Secrets Manager User Guide — Identity-based policies.',
                'AWS Well-Architected Framework Security Pillar — Use roles for instances.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 110 — PII Detection / Macie
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed-sec-q110',
            type: 'single',
            prompt: "A company stores data in Amazon S3. According to regulations, the data must not contain personally identifiable information (PII). The company recently discovered that S3 buckets have some objects that contain PII. The company needs to automatically detect PII in S3 buckets and to notify the company's security team. Which solution will meet these requirements?",
            options: [
                'Use Amazon Macie. Create an Amazon EventBridge rule to filter the SensitiveData event type from Macie findings and to send an Amazon Simple Notification Service (Amazon SNS) notification to the security team.',
                'Use Amazon GuardDuty. Create an Amazon EventBridge rule to filter the CRITICAL event type from GuardDuty findings and to send an Amazon Simple Notification Service (Amazon SNS) notification to the security team.',
                'Use Amazon Macie. Create an Amazon EventBridge rule to filter the SensitiveData:S3Object/Personal event type from Macie findings and to send an Amazon Simple Queue Service (Amazon SQS) notification to the security team.',
                'Use Amazon GuardDuty. Create an Amazon EventBridge rule to filter the CRITICAL event type from GuardDuty findings and to send an Amazon Simple Queue Service (Amazon SQS) notification to the security team.',
            ],
            correctOptionIndex: 0,
            explanation: 'Macie detects PII and other sensitive data in S3. Its findings can be filtered by EventBridge and sent to SNS for immediate notification.',
            incorrectOptionExplanations: {
                1: 'GuardDuty is for threat detection, not PII content discovery.',
                2: 'SQS is a queue and does not directly notify a security team; SNS is the better notification target.',
                3: 'GuardDuty is the wrong service and SQS is not the direct notification mechanism.',
            },
            references: [
                'Amazon Macie User Guide — What is Amazon Macie?',
                'Amazon Macie User Guide — Monitoring Macie events with EventBridge.',
                'Amazon SNS Developer Guide — What is Amazon SNS?',
                'Amazon GuardDuty User Guide — What is Amazon GuardDuty?',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 111 — LDAP / Custom Identity Broker
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed-sec-q111',
            type: 'single',
            prompt: 'A company needs to use its on-premises LDAP directory service to authenticate its users to the AWS Management Console. The directory service is not compatible with Security Assertion Markup Language (SAML). Which solution meets these requirements?',
            options: [
                'Enable AWS IAM Identity Center between AWS and the on-premises LDAP.',
                'Create an IAM policy that uses AWS credentials, and integrate the policy into LDAP.',
                'Set up a process that rotates the IAM credentials whenever LDAP credentials are updated.',
                'Develop an on-premises custom identity broker application or process that uses AWS STS to get short-lived credentials.',
            ],
            correctOptionIndex: 3,
            explanation: 'If the directory cannot use SAML, a custom identity broker can authenticate users against LDAP and call AWS STS to obtain short-lived credentials for console access.',
            incorrectOptionExplanations: {
                0: 'IAM Identity Center normally integrates with supported directories or federation mechanisms; non-SAML LDAP requires a custom broker pattern.',
                1: 'IAM policies are not integrated directly into LDAP and do not authenticate users.',
                2: 'Rotating long-term IAM credentials is not secure federation and increases operational burden.',
            },
            references: [
                'IAM User Guide — Scenarios for granting temporary access.',
                'IAM User Guide — Custom identity broker.',
                'AWS STS API Reference — AssumeRole.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 112 — PrivateLink Application Access
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed-sec-q112',
            type: 'single',
            prompt: 'A company is migrating a new application from an on-premises data center to a new VPC in the AWS Cloud. The company has multiple AWS accounts and VPCs that share many subnets and applications. The company wants to have fine-grained access control for the new application. The company wants to ensure that all network resources across accounts and VPCs that are granted permission to access the new application can access the application. Which solution will meet these requirements?',
            options: [
                'Set up a VPC peering connection for each VPC that needs access to the new application VPC. Update route tables in each VPC to enable connectivity.',
                'Deploy a transit gateway in the account that hosts the new application. Share the transit gateway with each account that needs to connect to the application. Update route tables in the VPC that hosts the new application and in the transit gateway to enable connectivity.',
                'Use an AWS PrivateLink endpoint service to make the new application accessible to other VPCs. Control access to the application by using an endpoint policy.',
                'Use an Application Load Balancer (ALB) to expose the new application to the internet. Configure authentication and authorization processes to ensure that only specified VPCs can access the application.',
            ],
            correctOptionIndex: 2,
            explanation: 'AWS PrivateLink exposes a specific application as an endpoint service to approved consumers across VPCs and accounts without public internet exposure. Access can be controlled at the endpoint service level.',
            incorrectOptionExplanations: {
                0: 'VPC peering grants broader VPC-to-VPC connectivity and does not provide fine-grained service-level access control.',
                1: 'Transit Gateway provides network routing control but not the same service-specific access control as PrivateLink.',
                3: 'A public ALB increases exposure and is not necessary for private cross-VPC service access.',
            },
            references: [
                'Amazon VPC User Guide — VPC endpoint services with AWS PrivateLink.',
                'Amazon VPC User Guide — Control access to your endpoint service.',
                'AWS Transit Gateway Documentation — What is a transit gateway?',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 113 — S3 Standard / SSE-S3 / CRR
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed-sec-q113',
            type: 'single',
            prompt: 'A healthcare provider is planning to store patient data on AWS as PDF files. To comply with regulations, the company must encrypt the data and store the files in multiple locations. The data must be available for immediate access from any environment. Which solution will meet these requirements?',
            options: [
                'Store the files in an Amazon S3 bucket. Use the Standard storage class. Enable server-side encryption with Amazon S3 managed keys (SSE-S3) on the bucket. Configure cross-Region replication on the bucket.',
                'Store the files in an Amazon Elastic File System (Amazon EFS) volume. Use an AWS KMS managed key to encrypt the EFS volume. Use AWS DataSync to replicate the EFS volume to a second AWS Region.',
                'Store the files in an Amazon Elastic Block Store (Amazon EBS) volume. Configure AWS Backup to back up the volume on a regular schedule. Use an AWS KMS key to encrypt the backups.',
                'Store the files in an Amazon S3 bucket. Use the S3 Glacier Flexible Retrieval storage class. Ensure that all PDF files are encrypted by using client-side encryption before the files are uploaded. Configure cross-Region replication on the bucket.',
            ],
            correctOptionIndex: 0,
            explanation: 'S3 Standard provides immediate object access from any environment over HTTPS. SSE-S3 encrypts at rest, and cross-Region replication stores copies in multiple Regions.',
            incorrectOptionExplanations: {
                1: 'EFS is a file system accessed from network clients, typically within VPC environments, not universally via object access.',
                2: 'EBS volumes attach to EC2 instances and are not suitable for immediate access from any environment.',
                3: 'S3 Glacier Flexible Retrieval is archival and does not provide immediate access.',
            },
            references: [
                'Amazon S3 User Guide — Amazon S3 storage classes.',
                'Amazon S3 User Guide — Server-side encryption with SSE-S3.',
                'Amazon S3 User Guide — Replicating objects with CRR.',
                'Amazon EBS User Guide — Amazon EBS volumes.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 114 — Encryption At Rest and In Transit
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed-sec-q114',
            type: 'single',
            prompt: 'A company is building a new web-based customer relationship management application. The application will use several Amazon EC2 instances that are backed by Amazon EBS volumes behind an Application Load Balancer (ALB). The application will also use an Amazon Aurora database. All data for the application must be encrypted at rest and in transit. Which solution will meet these requirements?',
            options: [
                'Use AWS KMS certificates on the ALB to encrypt data in transit. Use AWS Certificate Manager (ACM) to encrypt the EBS volumes and Aurora database storage at rest.',
                "Use the AWS root account to log in to the AWS Management Console. Upload the company's encryption certificates. While in the root account, select the option to turn on encryption for all data at rest and in transit for the account.",
                'Use AWS KMS to encrypt the EBS volumes and Aurora database storage at rest. Attach an AWS Certificate Manager (ACM) certificate to the ALB to encrypt data in transit.',
                "Use BitLocker to encrypt all data at rest. Import the company's TLS certificate keys to AWS KMS. Attach the KMS keys to the ALB to encrypt data in transit.",
            ],
            correctOptionIndex: 2,
            explanation: 'AWS KMS manages keys for encrypting EBS volumes and Aurora storage at rest. ACM manages TLS certificates that can be attached to ALB HTTPS listeners for encryption in transit.',
            incorrectOptionExplanations: {
                0: 'This reverses the roles of KMS and ACM.',
                1: 'There is no root-account switch for all encryption, and root account use for operations is not best practice.',
                3: 'BitLocker is OS-level and not the managed AWS solution; ALBs use ACM certificates, not KMS keys, for TLS.',
            },
            references: [
                'AWS KMS Developer Guide — How AWS services use AWS KMS.',
                'AWS Certificate Manager User Guide — Concepts.',
                'Elastic Load Balancing User Guide — HTTPS listeners for Application Load Balancers.',
                'Amazon Aurora User Guide — Encrypting an Aurora DB cluster.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 115 — Lake Formation / PII Column Access
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed-sec-q115',
            type: 'single',
            prompt: 'A company uses Amazon S3 to store customer data that contains personally identifiable information (PII) attributes. The company needs to make the customer information available to company resources through an AWS Glue Catalog. The company needs to have fine-grained access control for the data so that only specific IAM roles can access the PII data. Which solution will meet these requirements?',
            options: [
                'Create one IAM policy that grants access to PII. Create a second IAM policy that grants access to non-PII data. Assign the PII policy to the specified IAM roles.',
                'Create one IAM role that grants access to PII. Create a second IAM role that grants access to non-PII data. Assign the PII policy to the specified IAM roles.',
                'Use AWS Lake Formation to provide the specified IAM roles access to the PII data.',
                'Use AWS Glue to create one view for PII data. Create a second view for non-PII data. Provide the specified IAM roles access to the PII view.',
            ],
            correctOptionIndex: 2,
            explanation: 'AWS Lake Formation provides fine-grained permissions for S3 data cataloged in AWS Glue, including table, column, and row/cell-level controls for specific IAM roles.',
            incorrectOptionExplanations: {
                0: 'S3 IAM policies generally operate at the bucket/object level and do not provide column-level PII control inside datasets.',
                1: 'Creating roles and policies alone does not provide fine-grained data lake permissions.',
                3: 'AWS Glue catalogs and transforms data, but Lake Formation is the access-control layer for governed data lakes.',
            },
            references: [
                'AWS Lake Formation Developer Guide — What is AWS Lake Formation?',
                'AWS Lake Formation Developer Guide — Granting column-level permissions.',
                'AWS Glue Developer Guide — Security in AWS Glue.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 116 — S3 Access Points / Prefix Isolation
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed-sec-q116',
            type: 'single',
            prompt: "A company stores data for multiple business units in a single Amazon S3 bucket that is in the company's payer AWS account. To maintain data isolation, the business units store data in separate prefixes in the S3 bucket by using an S3 bucket policy. The company plans to add a large number of dynamic prefixes. The company does not want to rely on a single S3 bucket policy to manage data access at scale. The company wants to develop a secure access management solution in addition to the bucket policy to enforce prefix-level data isolation. Which solution will meet these requirements?",
            options: [
                'Configure the S3 bucket policy to deny s3:GetObject permissions for all users. Configure the bucket policy to allow s3:* access to individual business units.',
                'Enable default encryption on the S3 bucket by using server-side encryption with Amazon S3 managed keys (SSE-S3).',
                'Configure resource-based permissions on the S3 bucket by creating an S3 access point for each business unit.',
                'Use pre-signed URLs to provide access to the S3 bucket.',
            ],
            correctOptionIndex: 2,
            explanation: 'S3 Access Points provide dedicated policies and hostnames for shared buckets. Each business unit can receive an access point policy scoped to its prefix, avoiding one large bucket policy.',
            incorrectOptionExplanations: {
                0: 'This still relies on one bucket policy, which the company wants to avoid at scale.',
                1: 'Encryption protects data at rest but does not isolate access by prefix.',
                3: 'Presigned URLs are temporary object-level grants, not scalable persistent prefix-level access management.',
            },
            references: [
                'Amazon S3 User Guide — Managing data access with S3 access points.',
                'Amazon S3 User Guide — S3 Access Point policies.',
                'Amazon S3 User Guide — Should I use an access point or a bucket policy?',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 117 — NAT Gateway High Availability
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed-sec-q117',
            type: 'single',
            prompt: 'A company is launching a new application that will be hosted on Amazon EC2 instances. A solutions architect needs to design a solution that does not allow public IPv4 access that originates from the internet. However, the solution must allow the EC2 instances to make outbound IPv4 internet requests. Which solution will meet these requirements?',
            options: [
                'Deploy a NAT gateway in public subnets in both Availability Zones. Create and configure one route table for each private subnet.',
                'Deploy an internet gateway in public subnets in both Availability Zones. Create and configure a shared route table for the private subnets.',
                'Deploy a NAT gateway in public subnets in both Availability Zones. Create and configure a shared route table for the private subnets.',
                'Deploy an egress-only internet gateway in public subnets in both Availability Zones. Create and configure one route table for each private subnet.',
            ],
            correctOptionIndex: 0,
            explanation: 'A NAT gateway in each AZ allows private instances to initiate outbound IPv4 internet traffic while blocking unsolicited inbound access. Separate private subnet route tables can target the NAT gateway in the same AZ for resilience.',
            incorrectOptionExplanations: {
                1: 'An internet gateway permits public internet routing and is attached to the VPC, not deployed per subnet.',
                2: 'A shared route table would normally point all private subnets to one NAT gateway, creating a single point of failure and cross-AZ dependency.',
                3: 'Egress-only internet gateways support outbound-only IPv6, not IPv4.',
            },
            references: [
                'Amazon VPC User Guide — NAT gateways.',
                'Amazon VPC User Guide — Example VPC with private subnets and NAT gateway.',
                'Amazon VPC User Guide — Egress-only internet gateways.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 118 — AWS WAF Geographic Match
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed-sec-q118',
            type: 'single',
            prompt: "A company hosts an application on Amazon EC2 instances that are part of a target group behind an Application Load Balancer (ALB). The company has attached a security group to the ALB. During a recent review of application logs, the company found many unauthorized login attempts from IP addresses that belong to countries outside the company's normal user base. The company wants to allow traffic only from the United States and Australia. Which solution will meet these requirements?",
            options: [
                'Edit the default network ACL to block IP addresses from outside of the allowed countries.',
                'Create a geographic match rule in AWS WAF. Attach the rule to the ALB.',
                'Configure the ALB security group to allow the IP addresses of company employees. Edit the default network ACL to block IP addresses from outside of the allowed countries.',
                'Use a host-based firewall on the EC2 instances to block IP addresses from outside of the allowed countries. Configure the ALB security group to allow the IP addresses of company employees.',
            ],
            correctOptionIndex: 1,
            explanation: 'AWS WAF geographic match rules can allow or block web requests based on country of origin and can be associated with an ALB.',
            incorrectOptionExplanations: {
                0: 'Network ACLs are not practical for maintaining dynamic country IP ranges and have rule limits.',
                2: 'This targets employee IPs rather than allowed countries and still relies on impractical network ACL geo-blocking.',
                3: 'Host-based firewalls add instance-level management burden and filter traffic after it reaches the load balancer and instances.',
            },
            references: [
                'AWS WAF Developer Guide — Geographic match rule statement.',
                'AWS WAF Developer Guide — Associating web ACLs with AWS resources.',
                'Amazon VPC User Guide — Network ACL rule limits.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 119 — EC2 Workload Temporary Credentials
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed-sec-q119',
            type: 'single',
            prompt: 'A company is developing a new application that will run on Amazon EC2 instances. The application needs to access multiple AWS services. The company needs to ensure that the application will not use long-term access keys to access AWS services. Which solution will meet these requirements?',
            options: [
                'Create an IAM user. Assign the IAM user to the application. Create programmatic access keys for the IAM user. Embed the access keys in the application code.',
                'Create an IAM user that has programmatic access keys. Store the access keys in AWS Secrets Manager. Configure the application to retrieve the keys from Secrets Manager when the application runs.',
                'Create an IAM role that can access AWS Systems Manager Parameter Store. Associate the role with each EC2 instance profile. Create IAM access keys for the AWS services, and store the keys in Parameter Store. Configure the application to retrieve the keys from Parameter Store when the application runs.',
                'Create an IAM role that has permissions to access the required AWS services. Associate the IAM role with each EC2 instance profile.',
            ],
            correctOptionIndex: 3,
            explanation: 'An IAM role associated with an EC2 instance profile supplies temporary, automatically rotated credentials to the application through the instance metadata service.',
            incorrectOptionExplanations: {
                0: 'Embedding long-term access keys in code is insecure and violates the requirement.',
                1: 'Storing long-term keys in Secrets Manager still uses long-term keys.',
                2: 'Using a role only to retrieve stored long-term keys defeats the purpose of temporary credentials.',
            },
            references: [
                'IAM User Guide — IAM roles for Amazon EC2.',
                'AWS Well-Architected Framework Security Pillar — Use temporary credentials.',
                'AWS Security Best Practices — Use IAM roles for applications on EC2.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 120 — API Gateway / Cognito / AWS WAF
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed-sec-q120',
            type: 'multiple',
            prompt: 'A solutions architect needs to secure an Amazon API Gateway REST API. Users need to be able to log in to the API by using common external social identity providers (IdPs). The social IdPs must use standard authentication protocols such as SAML or OpenID Connect (OIDC). The solutions architect needs to protect the API against attempts to exploit application vulnerabilities. Which combination of steps will meet these security requirements? (Select TWO.)',
            options: [
                'Create an AWS WAF web ACL that is associated with the REST API. Add the appropriate managed rules to the ACL.',
                'Subscribe to AWS Shield Advanced. Enable DDoS protection. Associate Shield Advanced with the REST API.',
                'Create an Amazon Cognito user pool with a federation to the social IdPs. Integrate the user pool with the REST API.',
                'Create an API key in API Gateway. Associate the API key with the REST API.',
                'Create an IP address filter in AWS WAF that allows only the social IdPs. Associate the filter with the web ACL and the API.',
            ],
            correctOptionIndexes: [0, 2],
            explanation: 'Amazon Cognito user pools can federate with social IdPs and integrate with API Gateway authorizers. AWS WAF managed rules protect REST APIs against common application-layer exploits.',
            incorrectOptionExplanations: {
                1: 'Shield Advanced focuses on DDoS protection, not general application vulnerability exploit protection.',
                3: 'API keys identify and throttle clients; they do not authenticate users through social IdPs.',
                4: 'End-user traffic comes from users, not from the social IdP IP addresses.',
            },
            references: [
                'Amazon Cognito Developer Guide — Adding social identity providers to a user pool.',
                'Amazon API Gateway Developer Guide — Control access using Cognito user pools.',
                'AWS WAF Developer Guide — Using AWS WAF to protect APIs.',
                'AWS WAF Developer Guide — AWS Managed Rules.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 121 — S3 VPC Endpoints
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed-sec-q121',
            type: 'multiple',
            prompt: 'A solutions architect is designing the network architecture for an application that runs on Amazon EC2 instances in an Auto Scaling group. The application needs to access data that is in Amazon S3 buckets. Traffic to the S3 buckets must not use public IP addresses. The solutions architect will deploy the application in a VPC that has public and private subnets. Which solutions will meet these requirements? (Select TWO.)',
            options: [
                'Deploy the EC2 instances in a private subnet. Configure a default route to an egress-only internet gateway.',
                "Deploy the EC2 instances in a public subnet. Create a gateway endpoint for Amazon S3. Associate the endpoint with the subnet's route table.",
                'Deploy the EC2 instances in a public subnet. Create an interface endpoint for Amazon S3. Configure DNS hostnames and DNS resolution for the VPC.',
                'Deploy the EC2 instances in a private subnet. Configure a default route to a NAT gateway in a public subnet.',
                'Deploy the EC2 instances in a private subnet. Configure a default route to a customer gateway.',
            ],
            correctOptionIndexes: [1, 2],
            explanation: 'Both S3 gateway endpoints and S3 interface endpoints provide private connectivity to S3 without requiring public IP addresses for the EC2 instances or public internet routing.',
            incorrectOptionExplanations: {
                0: 'An egress-only internet gateway is for IPv6 outbound internet access, not private S3 connectivity.',
                3: 'A NAT gateway sends traffic to public AWS service endpoints and uses public IP addressing.',
                4: 'A customer gateway is for VPN or Direct Connect connectivity to on-premises networks, not S3 access.',
            },
            references: [
                'Amazon VPC User Guide — VPC endpoints for Amazon S3.',
                'Amazon VPC User Guide — Gateway endpoints.',
                'Amazon VPC User Guide — Interface endpoints.',
                'Amazon VPC User Guide — NAT gateways.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 122 — EKS Pod Isolation / Fargate
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed-sec-q122',
            type: 'single',
            prompt: 'A company is designing a new Amazon Elastic Kubernetes Service (Amazon EKS) deployment to host multi-tenant applications that use a single cluster. The company wants to ensure that each pod has its own hosted environment. The environments must not share CPU, memory, storage, or elastic network interfaces. Which solution will meet these requirements?',
            options: [
                'Use Amazon EC2 instances to host self-managed Kubernetes clusters. Use taints and tolerations to enforce isolation boundaries.',
                'Use Amazon EKS with AWS Fargate. Use Fargate to manage resources and to enforce isolation boundaries.',
                'Use Amazon EKS and self-managed node groups. Use taints and tolerations to enforce isolation boundaries.',
                'Use Amazon EKS and managed node groups. Use taints and tolerations to enforce isolation boundaries.',
            ],
            correctOptionIndex: 1,
            explanation: 'EKS on Fargate runs each pod in its own isolated compute environment and does not share CPU, memory, storage, or ENIs with other pods.',
            incorrectOptionExplanations: {
                0: 'Taints and tolerations control scheduling placement, not full runtime resource isolation.',
                2: 'Self-managed node groups still run multiple pods on shared EC2 nodes unless isolated by other mechanisms.',
                3: 'Managed node groups simplify node management but still share EC2 node resources among pods.',
            },
            references: [
                'AWS Fargate FAQ — Security and compliance pod isolation.',
                'Amazon EKS User Guide — AWS Fargate.',
                'Kubernetes Documentation — Taints and tolerations.',
                'Amazon EKS User Guide — Amazon EKS nodes.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 123 — Web App / STS Temporary Access
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed-sec-q123',
            type: 'single',
            prompt: 'A company is developing a public web application that needs to access multiple AWS services. The application will have hundreds of users who must log in to the application first before using the services. The company needs to implement a secure and scalable method to grant the web application temporary access to the AWS resources. Which solution will meet these requirements?',
            options: [
                'Create an IAM role for each AWS service that the application needs to access. Assign the roles directly to the instances that the web application runs on.',
                'Create an IAM role that has the access permissions the web application requires. Configure the web application to use AWS Security Token Service (AWS STS) to assume the IAM role. Use STS tokens to access the required AWS services.',
                'Use AWS IAM Identity Center to create a user pool that includes the application users. Assign access credentials to the web application users. Use the credentials to access the required AWS services.',
                'Create an IAM user that has programmatic access keys for the AWS services. Store the access keys in AWS Systems Manager Parameter Store. Retrieve the access keys from Parameter Store. Use the keys in the web application.',
            ],
            correctOptionIndex: 1,
            explanation: 'Assuming an IAM role with AWS STS provides temporary credentials for the web application to access required AWS services without embedding long-term access keys.',
            incorrectOptionExplanations: {
                0: 'Creating a role per service is less manageable than a role with the required least-privilege permissions.',
                2: 'IAM Identity Center is for workforce access, not application user pools; Cognito would be the application user identity service.',
                3: 'Long-term access keys in Parameter Store still create long-term credential risk.',
            },
            references: [
                'IAM User Guide — Best practices in IAM.',
                'IAM User Guide — IAM roles.',
                'AWS STS User Guide — Requesting temporary security credentials.',
                'AWS Well-Architected Framework Security Pillar — Manage machine identities.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 124 — Firehose Data Transformation / PII Masking
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed-sec-q124',
            type: 'single',
            prompt: 'A solutions architect is building an Amazon S3 data lake for a company. The company uses Amazon Kinesis Data Firehose to ingest customer personally identifiable information (PII) and transactional data in near real-time to an S3 bucket. The company needs to mask all PII data before storing the data in the data lake. Which solution will meet these requirements?',
            options: [
                'Create an AWS Lambda function to detect and mask PII. Invoke the function from Kinesis Data Firehose.',
                'Use Amazon Macie to scan the S3 bucket. Configure Macie to detect and mask PII.',
                'Enable server-side encryption (SSE) on the S3 bucket.',
                'Create an AWS Lambda function that integrates with AWS CloudHSM. Configure the function to detect and mask PII.',
            ],
            correctOptionIndex: 0,
            explanation: 'Kinesis Data Firehose can invoke Lambda to transform records before delivery to S3. The Lambda function can detect and mask PII in-flight so masked data lands in the data lake.',
            incorrectOptionExplanations: {
                1: 'Macie detects sensitive data after it is stored and does not perform in-flight masking.',
                2: 'Server-side encryption protects objects at rest but does not mask PII fields.',
                3: 'CloudHSM manages cryptographic keys and does not provide PII detection or masking.',
            },
            references: [
                'Amazon Kinesis Data Firehose Developer Guide — Data transformation.',
                'AWS Lambda Developer Guide — Using Lambda with Kinesis Data Firehose.',
                'Amazon Macie User Guide — How Amazon Macie works.',
                'Amazon S3 User Guide — Protecting data using server-side encryption.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 125 — KMS Automatic Key Rotation
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed-sec-q125',
            type: 'single',
            prompt: 'A company hosts an application that processes highly sensitive customer transactions on AWS. The application uses Amazon RDS as its database. The company manages its own encryption keys to secure the data in Amazon RDS. The company needs to update the customer-managed encryption keys at least once each year. Which solution will meet these requirements with the LEAST operational overhead?',
            options: [
                'Set up automatic key rotation in AWS Key Management Service (AWS KMS) for the encryption keys.',
                'Configure AWS Key Management Service (AWS KMS) to alert the company to rotate the encryption keys annually.',
                'Schedule an AWS Lambda function to rotate the encryption keys annually.',
                'Create an AWS CloudFormation stack to run an AWS Lambda function that deploys new encryption keys once each year.',
            ],
            correctOptionIndex: 0,
            explanation: 'AWS KMS supports automatic annual rotation for customer-managed KMS keys, which updates cryptographic material with no custom code or manual process.',
            incorrectOptionExplanations: {
                1: 'An alert still requires manual rotation and has higher operational overhead.',
                2: 'A custom Lambda rotation process requires development and maintenance.',
                3: 'CloudFormation plus Lambda is more complex than the native KMS feature.',
            },
            references: [
                'AWS KMS Developer Guide — Rotating AWS KMS keys.',
                'AWS KMS Developer Guide — How automatic key rotation works.',
                'Amazon RDS User Guide — Encrypting Amazon RDS resources.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 126 — ALB Security Group HTTPS and Health Checks
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed-sec-q126',
            type: 'multiple',
            prompt: 'A company is designing a web application with an internet-facing Application Load Balancer (ALB). The company needs the ALB to receive HTTPS web traffic from the public internet. The ALB must send only HTTPS traffic to the web application servers hosted on the Amazon EC2 instances on port 443. The ALB must perform a health check of the web application servers over HTTPS on port 8443. Which combination of configurations of the security group that is associated with the ALB will meet these requirements? (Select THREE.)',
            options: [
                'Allow HTTPS inbound traffic from 0.0.0.0/0 for port 443.',
                'Allow all outbound traffic to 0.0.0.0/0 for port 443.',
                'Allow HTTPS outbound traffic to the web application instances for port 443.',
                'Allow HTTPS inbound traffic from the web application instances for port 443.',
                'Allow HTTPS outbound traffic to the web application instances for the health check on port 8443.',
                'Allow HTTPS inbound traffic from the web application instances for the health check on port 8443.',
            ],
            correctOptionIndexes: [0, 2, 4],
            explanation: 'The ALB security group needs inbound 443 from internet clients, outbound 443 to targets for application traffic, and outbound 8443 to targets for health checks.',
            incorrectOptionExplanations: {
                1: 'Allowing outbound HTTPS to all internet destinations is broader than required.',
                3: 'Traffic from targets back to the ALB is return traffic for established connections; the ALB initiates forwarding to targets.',
                5: 'Health checks are initiated by the ALB outbound to the instances, not inbound from instances to the ALB.',
            },
            references: [
                'Elastic Load Balancing User Guide — Security groups for your Application Load Balancer.',
                'Elastic Load Balancing User Guide — Health checks for target groups.',
                'Elastic Load Balancing User Guide — Listeners for Application Load Balancers.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 127 — AWS WAF Bot Control
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed-sec-q127',
            type: 'single',
            prompt: 'A finance company has a web application that generates credit reports for customers. The company hosts the frontend of the web application on a fleet of Amazon EC2 instances that is associated with an Application Load Balancer (ALB). The application generates reports by running queries on an Amazon RDS for SQL Server database. The company recently discovered that malicious traffic from around the world is abusing the application by submitting unnecessary requests. The malicious traffic is consuming significant compute resources. The company needs to address the malicious traffic. Which solution will meet this requirement?',
            options: [
                'Use AWS WAF to create a web ACL. Associate the web ACL with the ALB. Update the web ACL to block IP addresses that are associated with malicious traffic.',
                'Use AWS WAF to create a web ACL. Associate the web ACL with the ALB. Use the AWS WAF Bot Control managed rule feature.',
                'Set up AWS Shield to protect the ALB and the database.',
                'Use AWS WAF to create a web ACL. Associate the web ACL with the ALB. Configure the AWS WAF IP reputation rule.',
            ],
            correctOptionIndex: 1,
            explanation: 'AWS WAF Bot Control is designed to identify and mitigate automated bot traffic that consumes application resources. Associating the web ACL with the ALB filters traffic before it reaches EC2.',
            incorrectOptionExplanations: {
                0: 'Manual IP blocking is not scalable against distributed or changing bot sources.',
                2: 'AWS Shield focuses on DDoS protection and is not the primary control for application-layer bot abuse.',
                3: 'IP reputation rules help with known bad sources, but Bot Control is more targeted for bot behavior.',
            },
            references: [
                'AWS WAF Developer Guide — AWS WAF Bot Control.',
                'AWS WAF Developer Guide — How AWS WAF works.',
                'AWS WAF Developer Guide — Amazon IP reputation list.',
                'AWS Shield Developer Guide — How AWS Shield works.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 128 — Artist Uploads / S3 Presigned URLs
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed-sec-q128',
            type: 'single',
            prompt: 'A media company is launching a new product platform that artists from around the world can use to upload videos and images directly to an Amazon S3 bucket. The company owns and maintains the S3 bucket. The artists must be able to upload files from personal devices without the need for AWS credentials or an AWS account. Which solution will meet these requirements MOST securely?',
            options: [
                'Enable cross-origin resource sharing (CORS) on the S3 bucket.',
                'Turn off block public access for the S3 bucket. Share the bucket URL to the artists to enable uploads without credentials.',
                'Use an IAM role that has upload permissions for the S3 bucket to generate presigned URLs for S3 prefixes that are specific to each artist. Share the URLs to the artists.',
                'Create a web interface that uses an IAM role that has permission to upload and view objects in the S3 bucket. Share the web interface URL to the artists.',
            ],
            correctOptionIndex: 2,
            explanation: 'S3 presigned URLs allow users without AWS accounts or credentials to upload specific objects for a limited time. Scoping URLs to artist-specific prefixes follows least privilege.',
            incorrectOptionExplanations: {
                0: 'CORS controls browser cross-origin behavior but does not authorize S3 uploads.',
                1: 'Disabling Block Public Access for anonymous uploads is insecure.',
                3: 'A web interface adds an extra component and the described role includes unnecessary view permissions.',
            },
            references: [
                'Amazon S3 User Guide — Uploading objects using presigned URLs.',
                'IAM User Guide — Grant least privilege.',
                'Amazon S3 User Guide — Blocking public access.',
                'Amazon S3 User Guide — Cross-origin resource sharing.',
            ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Question 129 — API Gateway / JWT / Lambda Authorizer / NLB
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ed-sec-q129',
            type: 'single',
            prompt: 'A company wants to create an API to authorize users by using JSON Web Tokens (JWTs). The company needs to support dynamic access to multiple AWS services by using path-based routing. Which solution will meet these requirements?',
            options: [
                'Deploy an Application Load Balancer behind an Amazon API Gateway REST API. Configure IAM authorization.',
                'Deploy an Application Load Balancer behind an Amazon API Gateway HTTP API. Use Amazon Cognito for authorization.',
                'Deploy a Network Load Balancer behind an Amazon API Gateway REST API. Use an AWS Lambda function as a custom authorizer.',
                'Deploy a Network Load Balancer behind an Amazon API Gateway HTTP API. Use Amazon Cognito for authorization.',
            ],
            correctOptionIndex: 2,
            explanation: 'API Gateway REST APIs support Lambda authorizers that can validate JWTs and return dynamic IAM policies. REST API private integrations use VPC links with Network Load Balancers, and REST APIs support path-based routing.',
            incorrectOptionExplanations: {
                0: 'IAM authorization uses SigV4-signed AWS credentials, not JWT validation.',
                1: 'Private API Gateway integrations use NLBs rather than ALBs, and Cognito authorization is less flexible for dynamic IAM-policy generation.',
                3: 'HTTP API JWT authorizers are useful, but REST API Lambda authorizers provide the dynamic policy behavior required here.',
            },
            references: [
                'Amazon API Gateway Developer Guide — Use Lambda authorizers.',
                'Amazon API Gateway Developer Guide — Set up private integrations with a REST API.',
                'Amazon API Gateway Developer Guide — Choosing between HTTP APIs and REST APIs.',
            ],
        },


        {
            id: 'ed-sec-q130',
            type: 'multiple',
            prompt: 'A company is performing a security review of its Amazon EMR API usage. The company\'s developers use an integrated development environment (IDE) that is hosted on Amazon EC2 instances. The IDE is configured to authenticate users to AWS by using access keys. Traffic between the company\'s EC2 instances and EMR cluster uses public IP addresses. A solutions architect needs to improve the company\'s overall security posture.The solutions architect needs to reduce the company\'s use of long-term credentials and to limit the amount of communication that uses public IP addresses. Which combination of steps will MOST improve the security of the companys architecture? (Select TWO.)',
            options: [
                'Set up a gateway endpoint to the EMR cluster.',
                'Set up interface VPC endpoints to connect to the EMR cluster.',
                'Set up a private NAT gateway to connect to the EMR cluster.',
                'Set up IAM roles for the developers to use to connect to the Amazon EMR API.',
                'Set up AWS Systems Manager Parameter Store to store access keys for each developer.'
            ],
            correctOptionIndexes: [1, 3],
            explanation: 'This solution addresses the two primary security requirements. First, using IAM roles for the EC2 instances (Option D) eliminates the need for long-term access keys. The EC2 instances can assume a role to obtain temporary, automatically rotated credentials for accessing the Amazon EMR API, which is a security best practice. Second, setting up interface VPC endpoints for EMR (Option B) allows the EC2 instances to communicate with the EMR API endpoint privately over the AWS network, using AWS PrivateLink. This prevents traffic from traversing the public internet, fulfilling the requirement to limit communication over public IP addresses.',
            incorrectOptionExplanations: {
                0: 'Gateway endpoints are incorrect because they only support Amazon S3 and DynamoDB, not Amazon EMR.',
                2: 'A NAT gateway is used to enable instances in a private subnet to connect to the internet or other AWS services, not for establishing private connectivity to services within AWS.',
                4: 'Storing access keys in Parameter Store is more secure than hardcoding them, but it still relies on long-term credentials, which the requirement explicitly aims to reduce.',
            },
            references: [
                'Amazon VPC User Guide — NAT gateways.',
                'Amazon VPC User Guide — Enable internet access for a private subnet.',
                'Amazon VPC User Guide — Route tables for your VPC.',
            ],
        },


    ],
};
