import type { ExamDefinition } from './types';

export const examSecureApps: ExamDefinition = {
    id: 'exam_secure_apps_saa_c03',
    title: 'SAA-C03 Practice Set — Design Secure Applications & Architectures',
    description: 'High-frequency scenario questions covering: encryption at rest/in-transit, API Gateway authorization, IMDSv2, Secrets Manager vs Parameter Store, IAM DB auth, SSM Session Manager, S3 bucket policies, CloudFront OAC, ECS/Lambda security, VPC security design, and application-level security patterns. This is Domain 2 of SAA-C03 (30% of exam).',
    durationSeconds: 4500,
    questions: [

        // ═══════════════════════════════════════════════════════════════════════
        // EC2 Instance Security
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'sapp_q1',
            type: 'single',
            prompt: 'A company is hardening its EC2 fleet. A red team found that the Instance Metadata Service (IMDS) v1 allows any process on the instance, including SSRF-vulnerable web applications, to retrieve the IAM role credentials without authentication. What is the BEST mitigation?',
            options: [
                'Disable the IAM role attached to the EC2 instance and use long-term access keys stored in environment variables',
                'Enforce IMDSv2 on all EC2 instances — IMDSv2 requires a session-oriented PUT request with a token before metadata can be retrieved, blocking SSRF exploits',
                'Block access to 169.254.169.254 using a Security Group deny rule',
                'Rotate the IAM role\'s credentials every hour using a scheduled Lambda function'
            ],
            correctOptionIndex: 1,
            explanation: 'IMDSv2 (Instance Metadata Service v2) is session-oriented: to retrieve metadata, the caller must first make a PUT request to obtain a session token, then use that token in subsequent GET requests. SSRF attacks typically cannot perform a PUT request followed by using the token — they are limited to GET-based requests from server-side. Enforcing IMDSv2 by setting HttpTokens=required at instance launch or account-level via SCP blocks SSRF-based credential theft. Security Groups cannot deny access to the link-local 169.254.0.0/16 address — SG rules only apply to external traffic, not localhost/link-local. IAM role credentials should be used, not static keys.'
        },
        {
            id: 'sapp_q2',
            type: 'single',
            prompt: 'A security engineer needs to connect to EC2 instances in private subnets for troubleshooting. The company\'s policy prohibits opening inbound SSH ports (port 22) from the internet. There are no bastion hosts. What is the AWS-recommended approach that requires the LEAST infrastructure?',
            options: [
                'Deploy a bastion host in a public subnet and SSH through it to private instances',
                'Temporarily add an inbound SSH rule to the Security Group from the engineer\'s IP address and remove it after the session',
                'Use AWS Systems Manager Session Manager to establish a browser or CLI shell session to the instance without any inbound ports open',
                'Create a VPN connection to the VPC and SSH over the VPN tunnel'
            ],
            correctOptionIndex: 2,
            explanation: 'AWS Systems Manager Session Manager provides interactive shell access to EC2 instances without opening any inbound ports, without a bastion host, and without SSH keys. It works by the SSM agent on the instance making an outbound connection to the SSM service endpoint. Sessions are authenticated via IAM and fully logged in CloudTrail and CloudWatch Logs. It is the AWS-recommended replacement for bastion hosts. Bastion hosts add infrastructure to maintain. Temporary SG rule changes violate the no-inbound-SSH policy. VPNs require significant setup and still need SSH to be open on the instance.'
        },
        {
            id: 'sapp_q3',
            type: 'single',
            prompt: 'A company stores sensitive application configuration in EC2 user data (e.g., database passwords passed as plain text at launch). A security audit flags this as high risk. What is the BEST remediation?',
            options: [
                'Base64-encode the sensitive values before adding them to user data',
                'Remove sensitive values from user data; store them in AWS Secrets Manager or SSM Parameter Store SecureString, and have the instance retrieve them at startup using the instance\'s IAM role',
                'Enable EC2 user data encryption using a KMS CMK in the Launch Template',
                'Store the sensitive values in an encrypted S3 object and pass only the S3 URL in user data'
            ],
            correctOptionIndex: 1,
            explanation: 'EC2 user data is stored in plaintext and is accessible to anyone who can describe the instance or query the instance metadata endpoint — base64 encoding is trivially reversible and provides no security. EC2 Launch Templates do not offer native user data encryption. The correct pattern is to remove secrets from user data entirely and retrieve them at runtime from Secrets Manager (with automatic rotation) or SSM Parameter Store SecureString (encrypted with KMS). The EC2 instance\'s IAM role grants the access, keeping credentials completely out of user data and instance configuration. Passing an S3 URL in user data still requires the S3 object to be protected and is a more complex pattern than using Secrets Manager directly.'
        },

        // ═══════════════════════════════════════════════════════════════════════
        // API Gateway Security
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'sapp_q4',
            type: 'single',
            prompt: 'A company exposes a REST API via Amazon API Gateway. They want to authenticate users who have signed in via a mobile app using Amazon Cognito User Pools. The solution must validate JWTs automatically without writing custom code. What is the SIMPLEST approach?',
            options: [
                'Use a Lambda authorizer that decodes and validates the JWT from the Authorization header using a custom library',
                'Configure an API Gateway Cognito User Pool Authorizer that natively validates Cognito JWTs before forwarding the request to the backend',
                'Use IAM authorization on API Gateway and have the mobile app sign requests with SigV4',
                'Deploy an Amazon API Gateway resource policy that allows only Cognito\'s IP ranges'
            ],
            correctOptionIndex: 1,
            explanation: 'API Gateway has native integration with Cognito User Pools via a Cognito User Pool Authorizer. The client includes the Cognito ID token in the Authorization header; API Gateway validates the JWT signature, expiry, and claims automatically — no custom code needed. A Lambda authorizer is more flexible (supporting any JWT source) but requires custom code. IAM authorization (SigV4) is designed for AWS service-to-service communication and would require distributing AWS credentials to mobile clients. Resource policies based on Cognito IP ranges are not feasible since Cognito does not call API Gateway from a fixed IP.'
        },
        {
            id: 'sapp_q5',
            type: 'single',
            prompt: 'An API Gateway REST API needs to authorize requests from a third-party service that uses API keys issued by the company. The third-party does not use AWS credentials or Cognito. The company wants custom logic to validate the API key against a database. What authorization mechanism should they use?',
            options: [
                'API Gateway Usage Plans with built-in API Key validation',
                'A Lambda authorizer (TOKEN type) that receives the API key from the Authorization header and returns an IAM policy allowing or denying access',
                'An API Gateway resource policy that allows the third-party\'s IP address range',
                'IAM authorization with the third-party assuming a cross-account role'
            ],
            correctOptionIndex: 1,
            explanation: 'A Lambda authorizer (custom authorizer) is designed exactly for this use case: custom authentication/authorization logic with external systems. A TOKEN-type Lambda authorizer receives the bearer token from the Authorization header, executes custom logic (database lookup, signature validation, etc.), and returns an IAM policy that API Gateway evaluates. Results are cached by the authorizer TTL. API Gateway Usage Plans and API Keys provide basic API key management but do not support custom validation logic against an external database. Resource policies restrict by IP but not by token validity. IAM authorization requires AWS credentials.'
        },
        {
            id: 'sapp_q6',
            type: 'single',
            prompt: 'A company uses Amazon API Gateway with Lambda integration. They want to ensure that the Lambda function can only be invoked through API Gateway and not called directly by any IAM principal. What is the BEST approach?',
            options: [
                'Remove the Lambda function\'s resource-based policy entirely so no one can invoke it',
                'Use an API Gateway resource policy that explicitly denies all principals except the API Gateway service principal (execute-api.amazonaws.com)',
                'Configure the Lambda function\'s resource-based policy to allow invocation only from the specific API Gateway ARN, and use IAM authorization on API Gateway to control user access',
                'Deploy the Lambda function inside a VPC with no internet access'
            ],
            correctOptionIndex: 2,
            explanation: 'Lambda resource-based policies control who can invoke the function. API Gateway automatically adds a resource-based policy statement when it integrates with Lambda, scoping it to the specific API/stage/method ARN using the execute-api.amazonaws.com service principal. Removing the resource-based policy would prevent API Gateway from invoking the function. An API Gateway resource policy controls who can call the API, not who can invoke the Lambda directly. Placing Lambda in a VPC controls network egress, not who can invoke it via the API. The correct defense-in-depth is: Lambda resource policy scoped to the specific API Gateway ARN + IAM/Cognito/Lambda authorizer on the API.'
        },
        {
            id: 'sapp_q7',
            type: 'single',
            prompt: 'A company exposes an internal API through API Gateway to be consumed only by services within their corporate network (private IP ranges). The API must never be accessible from the internet. Which API Gateway endpoint type enforces this?',
            options: [
                'Edge-optimized endpoint with a WAF Geo block rule',
                'Regional endpoint with a Security Group blocking internet traffic',
                'Private endpoint — an API Gateway endpoint accessible only via a VPC Interface Endpoint (PrivateLink), with a resource policy that denies public internet access',
                'Regional endpoint with an API Gateway usage plan that restricts API key distribution'
            ],
            correctOptionIndex: 2,
            explanation: 'API Gateway Private endpoints are accessible only through a VPC Interface Endpoint (PrivateLink). Combined with a resource policy that allows access only from the VPC endpoint ID or VPC ID, the API is completely inaccessible from the internet — it does not even have a public DNS entry that resolves to a public IP. Edge-optimized endpoints route through CloudFront and are inherently internet-facing. Regional endpoints are internet-accessible by default; WAF or resource policies can restrict access but the endpoint is still publicly resolvable. API Gateway does not attach Security Groups.'
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Encryption at Rest
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'sapp_q8',
            type: 'single',
            prompt: 'A company migrates an application to AWS. The application stores sensitive health records in Amazon S3. They must ensure data is encrypted at rest using keys that AWS never has access to — the company manages the raw key material entirely. Which S3 encryption option meets this requirement?',
            options: [
                'SSE-S3 (AES-256 with S3-managed keys)',
                'SSE-KMS with an AWS managed key (aws/s3)',
                'SSE-KMS with a customer-managed CMK with automatic rotation enabled',
                'SSE-C (Server-Side Encryption with Customer-Provided Keys) — the client provides the encryption key with each request'
            ],
            correctOptionIndex: 3,
            explanation: 'SSE-C allows the client to provide the encryption key material with each PUT and GET request. AWS uses the key to encrypt/decrypt the object but never stores the key — it is discarded after use. This means AWS never retains the raw key material. SSE-S3 uses AWS-managed keys stored within AWS. SSE-KMS with AWS managed or customer-managed keys stores key material within AWS KMS (though customer-managed keys give control over key policy and lifecycle, AWS KMS still manages the key material within its HSMs). For absolute requirement that AWS never has access to the raw key, SSE-C is the answer — though the client bears full responsibility for key management.'
        },
        {
            id: 'sapp_q9',
            type: 'single',
            prompt: 'A company stores sensitive data in an Amazon RDS MySQL database. The security team requires that the database storage, automated backups, read replicas, and snapshots are all encrypted. When must encryption be enabled?',
            options: [
                'Encryption can be enabled on an existing unencrypted RDS instance at any time from the console',
                'Encryption must be enabled at RDS instance creation time — it cannot be enabled on an existing unencrypted instance directly; you must snapshot, copy the snapshot with encryption, and restore',
                'Enable encryption by modifying the storage type to Provisioned IOPS after creation',
                'Encryption is applied per table via the RDS encryption CLI command and does not require instance recreation'
            ],
            correctOptionIndex: 1,
            explanation: 'RDS encryption is set at instance creation and cannot be changed afterward on an existing instance. To encrypt an unencrypted RDS instance: (1) take a snapshot, (2) copy the snapshot enabling encryption with a KMS key, (3) restore a new instance from the encrypted snapshot. Once an RDS instance is encrypted, all associated storage, automated backups, read replicas, and snapshots are automatically encrypted. There is no in-place encryption toggle for existing RDS instances. The encrypt-then-restore workflow is the AWS-documented migration path.'
        },
        {
            id: 'sapp_q10',
            type: 'single',
            prompt: 'A developer is designing a data pipeline. Large datasets (several GB) must be encrypted using a customer-managed KMS key before being stored in S3. The developer calls kms:Encrypt directly on the dataset. A security engineer flags this as incorrect. What is the proper pattern?',
            options: [
                'Use SSE-KMS on the S3 PutObject call — AWS will handle encryption with the CMK automatically',
                'Use KMS envelope encryption: call kms:GenerateDataKey to get a plaintext data key, encrypt the data locally with that key using AES-256, then call kms:Encrypt only on the data key (not the data)',
                'Split the dataset into 4 KB chunks and call kms:Encrypt on each chunk separately',
                'Use the KMS CLI with the --recursive flag to encrypt large objects'
            ],
            correctOptionIndex: 1,
            explanation: 'The AWS KMS Encrypt API supports a maximum of 4 KB of data — it is designed to encrypt small values like symmetric data keys, not large datasets. The correct pattern is envelope encryption: (1) call kms:GenerateDataKey to receive a plaintext data key and its encrypted copy; (2) encrypt the large dataset locally (in memory) using the plaintext data key with AES-256; (3) discard the plaintext data key; (4) store the encrypted data and the encrypted data key together. To decrypt, call kms:Decrypt on the encrypted data key to recover the plaintext key, then use it to decrypt the data locally. Using SSE-KMS on S3 also implements envelope encryption transparently — that is a valid approach for S3 storage specifically.'
        },
        {
            id: 'sapp_q11',
            type: 'multiple',
            prompt: 'A company requires that all data stored in Amazon DynamoDB is encrypted with a key they control, and they want full audit logs of every key usage. Which TWO statements about DynamoDB encryption are correct? (Choose 2)',
            options: [
                'DynamoDB encrypts all data at rest by default using AWS owned keys; switching to a customer-managed CMK enables full CloudTrail audit of key usage',
                'DynamoDB does not support encryption at rest — data must be encrypted by the application before writing',
                'With a customer-managed CMK, revoking or disabling the key will eventually prevent DynamoDB from reading the table data',
                'DynamoDB encrypted tables can be freely switched between AWS owned keys, AWS managed keys, and customer-managed CMKs at any time without table downtime'
            ],
            correctOptionIndexes: [0, 2],
            explanation: 'DynamoDB encrypts all data at rest by default using AWS owned keys (free, no CloudTrail visibility). Switching to a customer-managed CMK causes every DynamoDB encryption/decryption operation to log a KMS event to CloudTrail, providing full audit trail. If the CMK is disabled or deleted, DynamoDB loses the ability to decrypt table data within hours — this is a powerful control but requires careful key management. DynamoDB does support encryption at rest natively. You can change the encryption key type (switch between owned/managed/CMK) without table downtime — DynamoDB handles re-encryption transparently.'
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Encryption in Transit
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'sapp_q12',
            type: 'single',
            prompt: 'A company wants to enforce that all data uploaded to an S3 bucket is done over HTTPS — any HTTP request must be rejected. How is this enforced?',
            options: [
                'Enable S3 Transfer Acceleration, which automatically upgrades HTTP to HTTPS',
                'Add a bucket policy with a Deny statement for s3:PutObject when the condition aws:SecureTransport is false',
                'Enable S3 Block Public Access, which forces all traffic to use HTTPS',
                'Configure an S3 gateway endpoint with TLS enforcement'
            ],
            correctOptionIndex: 1,
            explanation: 'The aws:SecureTransport condition key is false when a request arrives over HTTP (not HTTPS/TLS). A bucket policy with a Deny on all S3 actions (s3:*) or specific actions (s3:PutObject, s3:GetObject) when aws:SecureTransport is false enforces HTTPS-only access. Any HTTP request will receive a 403 Forbidden. S3 Transfer Acceleration optimizes transfer speed over CloudFront, not security enforcement. Block Public Access controls public ACL/policy settings, not transport security. S3 Gateway Endpoints always use HTTPS internally within AWS but this does not prevent HTTP from outside.'
        },
        {
            id: 'sapp_q13',
            type: 'single',
            prompt: 'A company hosts an application behind an Application Load Balancer. The ALB terminates TLS and forwards traffic to EC2 instances over HTTP. A compliance requirement mandates end-to-end encryption — data must be encrypted even between the ALB and backend instances. What change achieves this?',
            options: [
                'Enable ALB sticky sessions with HTTPS protocol',
                'Change the ALB listener to TCP pass-through (use a Network Load Balancer instead) and terminate TLS on the EC2 instances',
                'Configure the ALB target group to use HTTPS protocol and install a valid TLS certificate on the EC2 instances, so the ALB forwards traffic over HTTPS to the backend',
                'Enable ALB access logs in S3 — logs are transmitted over HTTPS'
            ],
            correctOptionIndex: 2,
            explanation: 'ALB supports HTTPS on both the listener (client-to-ALB) and the target group (ALB-to-backend). Configuring the target group protocol to HTTPS means the ALB re-encrypts the request before forwarding it to the EC2 instances. A valid certificate must be installed on the EC2 web server. This provides end-to-end encryption with the ALB being able to inspect request content (for routing, WAF, etc.). An NLB with TCP pass-through is an alternative but loses ALB\'s Layer 7 features. Sticky sessions and access logs are unrelated to backend encryption.'
        },

        // ═══════════════════════════════════════════════════════════════════════
        // CloudFront Security
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'sapp_q14',
            type: 'single',
            prompt: 'A company serves private S3 content through Amazon CloudFront. They want to ensure that users can ONLY access the S3 objects through CloudFront, and that direct S3 URL access is blocked. Which CloudFront feature enables this?',
            options: [
                'CloudFront signed URLs with a time-based expiry on every object',
                'CloudFront Origin Access Control (OAC) — CloudFront uses OAC to sign requests to S3, and the S3 bucket policy allows only CloudFront\'s OAC principal',
                'CloudFront field-level encryption applied to all responses',
                'Enable S3 Transfer Acceleration and disable the standard S3 endpoint'
            ],
            correctOptionIndex: 1,
            explanation: 'CloudFront Origin Access Control (OAC) is the modern replacement for Origin Access Identity (OAI). With OAC, CloudFront signs requests to S3 using SigV4. The S3 bucket policy is configured to allow GetObject only from the CloudFront OAC service principal (cloudfront.amazonaws.com) with a condition matching the specific distribution ARN. This makes the bucket private (no public access) while CloudFront can still serve objects. Direct S3 URL access is blocked. Signed URLs restrict who can access CloudFront content but do not block direct S3 access. Field-level encryption protects specific fields in responses. S3 Transfer Acceleration is for upload speed, not access restriction.'
        },
        {
            id: 'sapp_q15',
            type: 'single',
            prompt: 'A company wants CloudFront to serve content only to users in specific countries (allowlist) and block all other countries. Which combination of AWS services implements this?',
            options: [
                'AWS WAF on CloudFront with a Geo match rule that blocks non-allowlisted countries',
                'CloudFront Geographic Restrictions (Geo Restriction) — enable allowlist mode and specify permitted countries',
                'Lambda@Edge at the viewer request event that checks the CloudFront-Viewer-Country header and returns 403',
                'Both A and B are correct, but B is the simpler approach'
            ],
            correctOptionIndex: 3,
            explanation: 'Both AWS WAF on CloudFront with a Geo match rule and CloudFront\'s built-in Geographic Restriction feature can enforce country-based access control. CloudFront Geo Restriction (option B) is the simplest: configure allowlist or blocklist directly in the CloudFront distribution settings with no additional services. WAF Geo match rules (option A) are more flexible — you can combine geo with other conditions — but add cost and complexity. Lambda@Edge can also achieve this but adds the most complexity. The exam correct answer when simplicity is the priority is the native CloudFront Geo Restriction, making D (both correct, B simpler) the technically accurate combined answer.'
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Lambda Security
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'sapp_q16',
            type: 'single',
            prompt: 'A Lambda function processes sensitive user data and stores results in DynamoDB. The Lambda must access internet-hosted third-party APIs AND a DynamoDB table. The company wants the Lambda to use a private DynamoDB endpoint. Which architecture is correct?',
            options: [
                'Deploy Lambda in a VPC with private subnets; add a VPC Gateway Endpoint for DynamoDB; add a NAT Gateway in a public subnet for internet access to third-party APIs',
                'Deploy Lambda outside a VPC; DynamoDB and internet access both work by default',
                'Deploy Lambda in a VPC; use a VPC Interface Endpoint for both DynamoDB and the internet',
                'Deploy Lambda in a VPC; Gateway Endpoints provide both DynamoDB and internet access without a NAT Gateway'
            ],
            correctOptionIndex: 0,
            explanation: 'When Lambda is deployed in a VPC, it loses default internet access — all traffic must be routed through VPC constructs. For DynamoDB: a VPC Gateway Endpoint routes DynamoDB traffic over the AWS private network (free). For internet access to third-party APIs: a NAT Gateway in a public subnet with a route from the private subnets enables outbound internet access. This combination provides private DynamoDB access AND internet access. A Lambda outside a VPC has internet access and DynamoDB access by default, but cannot use a private VPC endpoint. Gateway Endpoints do not provide internet access — they only cover S3 and DynamoDB within AWS.'
        },
        {
            id: 'sapp_q17',
            type: 'single',
            prompt: 'A Lambda function\'s environment variables contain a database connection string. A security engineer notes that Lambda encrypts environment variables at rest with an AWS managed key by default. The engineer wants customer-controlled encryption for these variables. How should this be configured?',
            options: [
                'Store the database connection string in plaintext environment variables — Lambda handles security automatically',
                'Configure the Lambda function to use a customer-managed KMS CMK for environment variable encryption at rest, and optionally use a separate CMK for encryption in transit (client-side encryption helper)',
                'Remove environment variables and use the Lambda function\'s code to hardcode the connection string',
                'Use Lambda Layers to store the connection string — layers are encrypted differently from environment variables'
            ],
            correctOptionIndex: 1,
            explanation: 'Lambda encrypts environment variables at rest using an AWS managed key (aws/lambda) by default. You can specify a customer-managed KMS CMK in the Lambda function configuration, which gives you control over the key policy and enables CloudTrail audit of every decryption. Lambda also offers a "client-side encryption helper" — a code snippet that encrypts sensitive values using a CMK before they are sent to Lambda, so the values are double-encrypted. Hardcoding secrets in code is a serious security violation. Lambda Layers do not offer different encryption properties for environment variable content.'
        },
        {
            id: 'sapp_q18',
            type: 'multiple',
            prompt: 'A DevSecOps team is reviewing Lambda security best practices. Which TWO of the following represent secure Lambda design principles? (Choose 2)',
            options: [
                'Grant the Lambda execution role only the specific IAM permissions it needs (least privilege) — avoid attaching AWSLambdaFullAccess or AdministratorAccess',
                'Use a single shared Lambda execution role across all Lambda functions in the account to simplify permission management',
                'Retrieve secrets at invocation time from Secrets Manager or use the Parameters and Secrets Lambda Extension for cached retrieval — never store secrets in environment variables or code',
                'Store all Lambda functions in the same VPC subnet to simplify Security Group management'
            ],
            correctOptionIndexes: [0, 2],
            explanation: 'Least-privilege execution roles are critical: each Lambda function should have a unique execution role with only the exact permissions it needs. Sharing a role across functions means a compromise of any function exposes all functions\' access. Secrets must not be in code or environment variables in plaintext — Secrets Manager with the Lambda extension is the recommended pattern. Sharing subnets and SGs across all Lambdas violates the principle of least privilege at the network level and expands blast radius.'
        },

        // ═══════════════════════════════════════════════════════════════════════
        // ECS / Container Security
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'sapp_q19',
            type: 'single',
            prompt: 'An application runs as containers on Amazon ECS with Fargate. Each container needs different levels of access to AWS services (one container accesses S3, another accesses DynamoDB). What is the MOST secure way to grant these permissions?',
            options: [
                'Attach a single IAM role to the ECS cluster with all necessary permissions — all containers in the cluster will share it',
                'Create separate ECS Task IAM Roles — one per task definition — scoped to only the AWS services that specific task needs',
                'Store AWS access keys in ECS container environment variables and rotate them manually each month',
                'Grant the Fargate container agent the AdministratorAccess policy and rely on application-level controls'
            ],
            correctOptionIndex: 1,
            explanation: 'ECS Task IAM Roles are attached at the task definition level and provide temporary credentials to all containers within that task via the ECS credential provider endpoint. Each task definition should have its own IAM role with only the permissions that task requires — this is ECS\'s implementation of least privilege. The ECS container agent role (or cluster IAM role) is separate and controls cluster management tasks, not application AWS access. Storing access keys in environment variables violates the no-long-term-credentials principle. AdministratorAccess is a clear violation of least privilege.'
        },
        {
            id: 'sapp_q20',
            type: 'single',
            prompt: 'A company runs ECS tasks on EC2 launch type. Developers realize they can call the EC2 Instance Metadata Service from within any container and potentially retrieve credentials for the container instance\'s IAM role (which has broader permissions than the task role). What AWS feature prevents containers from accessing the instance metadata service at the container level?',
            options: [
                'ECS Task Network Mode set to awsvpc — each task gets its own elastic network interface, isolating it from instance-level metadata',
                'AWS Shield Advanced protecting the ECS cluster from metadata queries',
                'A Security Group rule on the container instance blocking 169.254.169.254',
                'Using Fargate instead of EC2 launch type — Fargate does not have an accessible instance metadata endpoint'
            ],
            correctOptionIndex: 0,
            explanation: 'When ECS tasks use awsvpc network mode, each task gets its own dedicated elastic network interface (ENI) with its own IP. The ECS agent blocks access to the EC2 instance metadata endpoint (169.254.169.254) from within the task network namespace — containers can only access the ECS task credential endpoint. This prevents containers from assuming the container instance IAM role. Fargate always uses awsvpc mode and also provides this isolation. Security Group rules cannot block link-local addresses. Shield Advanced is a DDoS protection service.'
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Database Security
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'sapp_q21',
            type: 'single',
            prompt: 'A company wants to allow an EC2 application to connect to Amazon RDS MySQL without using a static username and password. Instead, authentication should use short-lived IAM credentials. Which feature enables this?',
            options: [
                'RDS Proxy with IAM authentication enabled — the proxy handles credentials internally',
                'RDS IAM Database Authentication — the application generates a temporary auth token using its IAM role and uses it instead of a password to connect',
                'AWS Secrets Manager automatic rotation that updates the password every 5 minutes',
                'Amazon Cognito User Pools as a database authentication proxy'
            ],
            correctOptionIndex: 1,
            explanation: 'RDS IAM Database Authentication allows applications to connect to MySQL or PostgreSQL RDS instances without a static password. The application calls rds:GenerateDbAuthToken using its IAM role to obtain a short-lived (15-minute) authentication token, which is passed as the database password in the connection string. The RDS instance validates the token against IAM. No password is stored — only IAM permissions are required. RDS Proxy can also work with IAM auth but adds a layer of infrastructure. Secrets Manager rotation is not the same as IAM-based passwordless auth. Cognito is for application user authentication, not database authentication.'
        },
        {
            id: 'sapp_q22',
            type: 'single',
            prompt: 'A company uses Amazon Aurora MySQL for a production workload. They want to ensure that database credentials used by the application are automatically rotated every 30 days without any application downtime. Which service and feature provides this with the LEAST operational overhead?',
            options: [
                'AWS Config rule that detects credential age and triggers a Lambda to update the password',
                'AWS Secrets Manager with automatic rotation enabled using the built-in Lambda rotation function for Aurora MySQL (single-user or multi-user rotation strategy)',
                'Manually update the password in the application config file every 30 days and restart the application',
                'IAM database authentication generates new tokens automatically — no rotation is needed'
            ],
            correctOptionIndex: 1,
            explanation: 'Secrets Manager provides native automatic rotation for RDS and Aurora with built-in Lambda rotation functions. The multi-user rotation strategy creates a new database user, tests it, then switches traffic to the new user — providing zero-downtime rotation. The application always calls GetSecretValue at connection time to get the current credentials. AWS Config can detect but not rotate. Manual rotation violates the automation requirement. IAM DB auth tokens expire in 15 minutes and are regenerated automatically, but this is a different authentication mechanism (passwordless) — if the company is using username/password today, Secrets Manager rotation is the answer.'
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Application Security Patterns
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'sapp_q23',
            type: 'single',
            prompt: 'A company runs a public-facing web application on EC2 behind an ALB. They want to protect against SQL injection and cross-site scripting (XSS) attacks at the application layer. Which AWS service and configuration provides this protection with the LEAST development effort?',
            options: [
                'Amazon GuardDuty with web attack protection enabled',
                'Amazon Inspector v2 with web vulnerability scanning enabled',
                'AWS WAF with the AWS Managed Rules for Core Rule Set (CRS) and SQL database rule group attached to the ALB',
                'Amazon CloudFront with Shield Standard for all HTTP traffic'
            ],
            correctOptionIndex: 2,
            explanation: 'AWS WAF with Managed Rule Groups provides ready-to-use OWASP Top 10 protection including SQL injection and XSS detection rules. The Core Rule Set (CRS) and SQL database rule groups are maintained by AWS and updated as new attack patterns emerge — no custom rule writing needed. WAF is attached directly to the ALB. GuardDuty analyzes VPC/CloudTrail/DNS data for threats at the infrastructure level but does not inspect HTTP application layer content. Inspector scans for CVEs on compute resources. CloudFront + Shield Standard provides DDoS protection but no L7 WAF rules.'
        },
        {
            id: 'sapp_q24',
            type: 'single',
            prompt: 'An e-commerce application generates signed JWTs for API authentication. The token signing key (RS256 private key) is currently stored in the application\'s source code repository. A security review identifies this as critical. What is the BEST remediation on AWS?',
            options: [
                'Store the private key in an environment variable encrypted with the default system key',
                'Store the private key in AWS Secrets Manager and retrieve it at application startup; alternatively, use AWS KMS with an asymmetric RSA key pair to sign JWTs using the KMS Sign API',
                'Rotate the private key weekly and commit the new key to a private GitHub branch',
                'Convert from RS256 to HS256 — symmetric keys are easier to store in code'
            ],
            correctOptionIndex: 1,
            explanation: 'Private keys must never be in source code repositories — they are exposed in git history even after removal. The two best AWS-native approaches are: (1) Store the private key in Secrets Manager and retrieve it at runtime — the application signs JWTs in memory; (2) Use AWS KMS asymmetric keys (RSA 2048 or EC P-256) and call kms:Sign — the private key never leaves KMS, making it impossible to exfiltrate. KMS Sign is the most secure as the key material is non-exportable. Environment variables with default encryption still have the key in plaintext in memory. HS256 with a symmetric secret in code has the same problem — the secret can be stolen from the repo.'
        },
        {
            id: 'sapp_q25',
            type: 'single',
            prompt: 'A company\'s application uses an SQS queue. A developer notices that SQS messages are stored unencrypted at rest. The company\'s compliance policy requires encryption. What is the simplest fix?',
            options: [
                'Encrypt the message content in the application before calling sqs:SendMessage — application-level encryption',
                'Enable SQS server-side encryption (SSE) on the queue using an AWS managed key (SQS-managed or KMS key) — all messages stored in the queue will be encrypted at rest',
                'Migrate from SQS to Amazon MQ, which supports native message encryption',
                'Add a Dead Letter Queue (DLQ) configured with encryption — messages will be moved to the encrypted DLQ'
            ],
            correctOptionIndex: 1,
            explanation: 'SQS supports server-side encryption (SSE) natively. Enable SSE on the queue and specify either the SQS-managed key (SSE-SQS, free) or a customer-managed KMS key (SSE-KMS, for CloudTrail audit and key control). All messages stored in the queue are encrypted transparently — no application changes needed. Application-level encryption also works but requires code changes and key management by the application. A DLQ does not encrypt messages in the main queue. Amazon MQ is a different service and migrating to it for encryption is disproportionate.'
        },
        {
            id: 'sapp_q26',
            type: 'single',
            prompt: 'A solutions architect is designing a multi-tier application. The web tier (ALB + EC2) must communicate with the application tier (private EC2 instances) over an internal network only. The application tier must communicate with the database tier (RDS). No traffic should flow between the web tier and database tier directly. Which Security Group design enforces this?',
            options: [
                'Web SG: allow inbound 443 from 0.0.0.0/0. App SG: allow inbound from web SG. DB SG: allow inbound from web SG and app SG',
                'Web SG: allow inbound 443 from 0.0.0.0/0, outbound to app SG. App SG: allow inbound from web SG, outbound to DB SG. DB SG: allow inbound from app SG only',
                'All tiers use the same Security Group with self-referencing rules',
                'Web SG: allow all traffic. App SG: allow all traffic. DB SG: allow MySQL/Postgres port from the VPC CIDR'
            ],
            correctOptionIndex: 1,
            explanation: 'Correct multi-tier Security Group design uses chaining: Web SG allows inbound HTTPS from the internet and outbound to the app SG. App SG allows inbound only from the web SG (not the internet) and outbound to the DB SG. DB SG allows inbound only from the app SG — not from the web tier or anywhere else. Security Groups are stateful, so return traffic is automatically allowed. Referencing SG IDs (not CIDRs) ensures the rules are dynamic and do not break if IPs change. Allowing all traffic or referencing the VPC CIDR are overly permissive.'
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Secrets Management in Applications
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'sapp_q27',
            type: 'single',
            prompt: 'A microservices application deployed on EKS (Kubernetes) needs to securely access AWS Secrets Manager to retrieve database credentials at pod startup. The credentials should never appear in pod environment variables or Kubernetes Secrets (which are base64-encoded but unencrypted by default). What is the AWS-recommended approach?',
            options: [
                'Store the credentials in a Kubernetes Secret and mount it as an environment variable in the pod',
                'Use the AWS Secrets and Configuration Provider (ASCP) for the Kubernetes Secrets Store CSI Driver — mounts secrets from Secrets Manager directly as files in the pod filesystem using the pod\'s IAM role for Kubernetes (IRSA)',
                'Bake the credentials into the container image during the CI/CD build process',
                'Create a Kubernetes ConfigMap with the plaintext credentials and mount it as a volume'
            ],
            correctOptionIndex: 1,
            explanation: 'The AWS Secrets and Configuration Provider (ASCP) integrates the Kubernetes Secrets Store CSI Driver with AWS Secrets Manager. Secrets are mounted as files in the pod filesystem (not environment variables, which can be exposed through introspection). IAM Roles for Service Accounts (IRSA) provides each pod with a scoped IAM role to access only its specific secrets — no long-term credentials needed. Default Kubernetes Secrets are only base64-encoded (trivially decoded) and are not encrypted at rest unless etcd encryption is separately configured. Baking secrets into images is a critical anti-pattern. ConfigMaps are for non-sensitive configuration.'
        },
        {
            id: 'sapp_q28',
            type: 'single',
            prompt: 'A company uses AWS Systems Manager Parameter Store to store application configuration. Some parameters contain sensitive database passwords (SecureString type). The application running on EC2 retrieves these parameters at startup. A developer hardcoded the parameter names in the source code. Which additional security control ensures the EC2 instance can only read specific parameters, not all parameters in the account?',
            options: [
                'Enable SSM Parameter Store encryption with KMS — only instances with KMS access can decrypt',
                'Use parameter hierarchies (e.g., /prod/myapp/db-password) and scope the EC2 IAM role policy to allow ssm:GetParameter only on the specific parameter ARNs or hierarchy prefix',
                'Set the parameter values to NoEcho in SSM so they cannot be retrieved programmatically',
                'Enable SSM Session Manager audit logging to detect unauthorized parameter access'
            ],
            correctOptionIndex: 1,
            explanation: 'SSM Parameter Store supports hierarchical naming (e.g., /prod/myapp/db-password). The EC2 IAM role policy should grant ssm:GetParameter and ssm:GetParameters on the specific ARNs or path prefix (arn:aws:ssm:region:account:parameter/prod/myapp/*). This ensures the instance can only access its own parameters, not parameters for other applications or environments. KMS access controls decryption of SecureString values but does not restrict which parameters can be retrieved. There is no NoEcho setting in SSM (that concept is from CloudFormation). Audit logging is detective, not preventive.'
        },

        // ═══════════════════════════════════════════════════════════════════════
        // VPC Design for Secure Applications
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'sapp_q29',
            type: 'single',
            prompt: 'A financial application requires that all outbound internet traffic from EC2 instances passes through a centralized security appliance for deep-packet inspection before leaving the VPC. The appliance is a third-party virtual firewall. What VPC architecture achieves this?',
            options: [
                'Deploy the appliance as an EC2 instance in the same private subnet and add a Security Group rule routing traffic through it',
                'Place the appliance in a public subnet with an Elastic IP; route private subnet traffic to it using VPC route tables (subnet route tables pointing 0.0.0.0/0 to the appliance\'s ENI)',
                'Use AWS Network Firewall managed service instead — third-party appliances are not supported in VPC',
                'Enable VPC Traffic Mirroring to copy traffic to the appliance for inspection'
            ],
            correctOptionIndex: 1,
            explanation: 'To route all outbound traffic through a security appliance: (1) Deploy the appliance in a public subnet with an Elastic IP and disable source/destination check on its ENI; (2) Modify the private subnet route tables to set 0.0.0.0/0 (default route) pointing to the appliance\'s ENI ID instead of the internet gateway; (3) The appliance inspects and forwards traffic to the IGW. This is the classic "virtual gateway" pattern. Third-party appliances are fully supported. AWS Network Firewall is an AWS-managed alternative but the question specifies third-party. Traffic Mirroring creates a copy for inspection but does not intercept or block traffic.'
        },
        {
            id: 'sapp_q30',
            type: 'single',
            prompt: 'A company deploys a web application in a VPC with public and private subnets. Users report that they can access the application, but internal developers cannot SSH to the private EC2 instances even from the corporate office. VPN is connected and routes are in place. What is the MOST likely cause?',
            options: [
                'The VPC does not have DNS resolution enabled',
                'The Security Group on the private EC2 instances does not allow inbound SSH (port 22) from the corporate office\'s IP range or VPN CIDR',
                'The private subnet route table does not have a route to the internet gateway',
                'The Network ACL on the public subnet is blocking SSH traffic from the VPN'
            ],
            correctOptionIndex: 1,
            explanation: 'Security Groups are the most likely cause. Even with VPN connectivity and route tables configured correctly, the Security Group on the private EC2 instances must explicitly allow inbound traffic on port 22 from the corporate/VPN CIDR range or the VPN tunnel\'s CIDR. Security Groups default to deny all inbound. A missing IGW route would affect internet access, not VPN-originated access. NACLs on the public subnet would not affect traffic destined for private subnet instances — traffic from VPN comes through the Virtual Private Gateway directly into the private subnet, bypassing public subnet NACLs.'
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Compliance and Governance
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'sapp_q31',
            type: 'single',
            prompt: 'A company wants to prevent any EC2 instance in their AWS account from being launched without IMDSv2 enforced. New instances must always have HttpTokens set to required. What is the MOST preventive control?',
            options: [
                'Use Amazon Inspector to scan running instances and flag those without IMDSv2',
                'Create an AWS Config rule that detects instances launched without IMDSv2 and send SNS alerts',
                'Apply an SCP that denies ec2:RunInstances when the ec2:MetadataHttpTokens condition key is not set to required',
                'Create a Lambda function triggered by CloudTrail events that terminates instances launched without IMDSv2'
            ],
            correctOptionIndex: 2,
            explanation: 'An SCP with a Deny on ec2:RunInstances when the condition ec2:MetadataHttpTokens is not "required" prevents any instance from being launched without IMDSv2 enforcement — this is a proactive guardrail that blocks non-compliant launches before they happen. Inspector and Config rules are detective controls — they identify violations after the fact. A Lambda that terminates instances is reactive (the instance existed, even briefly, in a non-compliant state) and is more complex to maintain. The SCP approach is the cleanest preventive control.'
        },
        {
            id: 'sapp_q32',
            type: 'multiple',
            prompt: 'A security team is conducting a threat model of an application. Which TWO of the following are examples of the "Defense in Depth" security principle applied in an AWS architecture? (Choose 2)',
            options: [
                'Using both VPC Security Groups (instance-level firewall) AND Network ACLs (subnet-level firewall) to control network access',
                'Enabling both CloudTrail and GuardDuty — CloudTrail provides the audit log, and GuardDuty provides automated threat detection on those logs',
                'Using a single IAM policy that grants access to all services but adding MFA as the only additional control',
                'Storing all secrets in a single Secrets Manager secret for simplified access'
            ],
            correctOptionIndexes: [0, 1],
            explanation: 'Defense in Depth means applying multiple independent security controls at different layers. Security Groups + NACLs provide two separate network filtering layers — an attacker must bypass both. CloudTrail + GuardDuty provide both visibility (CloudTrail logs every API call) and automated detection (GuardDuty analyzes those logs for threats) — complementary layers. A single IAM policy with MFA is not defense in depth — it is one authorization control with one authentication factor. Consolidating secrets into one secret creates a single point of compromise.'
        },
        {
            id: 'sapp_q33',
            type: 'single',
            prompt: 'A company must ensure that any new IAM roles created by developers cannot be granted more permissions than those the developer themselves already has (preventing privilege escalation). Which IAM mechanism enforces this?',
            options: [
                'Enable IAM Access Analyzer to detect roles with excessive permissions post-creation',
                'Apply an SCP that limits the maximum permissions in all accounts to a predefined set',
                'Attach a Permission Boundary to every IAM role that the developer creates — the boundary defines the maximum permissions the role can ever have, regardless of what policies are attached to it',
                'Use AWS Organizations to separate developer accounts from production accounts'
            ],
            correctOptionIndex: 2,
            explanation: 'IAM Permission Boundaries are specifically designed to prevent privilege escalation. A developer can be given permission to create roles but only if they also attach a specified permission boundary. The boundary caps what the role can ever do — even if someone attaches AdministratorAccess, the effective permissions are limited to the intersection of AdministratorAccess and the boundary. This is enforced with IAM policy conditions: the role creation policy requires iam:PassedToService with a condition that a specific boundary ARN must be set. SCPs restrict what can happen at the account level but are coarser-grained. Access Analyzer is detective.'
        },

        // ═══════════════════════════════════════════════════════════════════════
        // HARD — IAM Policy Evaluation Logic
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'sapp_q34',
            type: 'single',
            prompt: 'An IAM user has an identity policy granting s3:GetObject on a specific S3 bucket. The bucket has a resource-based policy that explicitly Denies s3:GetObject for that user. There is no SCP. What happens when the user calls s3:GetObject?',
            options: [
                'Access is granted because the identity policy Allow takes precedence over a resource policy Deny',
                'Access is denied because an explicit Deny in any applicable policy always overrides an Allow, regardless of which policy type it is in',
                'Access is granted because the user\'s identity policy is evaluated before the resource policy',
                'Access depends on which policy was created first — the newer policy takes precedence'
            ],
            correctOptionIndex: 1,
            explanation: 'IAM policy evaluation follows a strict order: (1) explicit Deny in any policy wins — always. An explicit Deny in a resource-based policy overrides an Allow in the identity policy. The evaluation engine collects all applicable policies (SCPs, resource policies, identity policies, session policies, permission boundaries) and if ANY of them has an explicit Deny for the action, the final decision is Deny regardless of Allows elsewhere. Policy creation order is irrelevant. This is the single most important IAM rule: explicit Deny always wins.'
        },
        {
            id: 'sapp_q35',
            type: 'single',
            prompt: 'A principal has the following two IAM policy statements attached. Statement 1: Allow s3:* on arn:aws:s3:::my-bucket/*. Statement 2: Deny s3:DeleteObject on arn:aws:s3:::*. The principal calls s3:PutObject on my-bucket. What is the outcome?',
            options: [
                'Denied — Statement 2 Denies all S3 operations on all buckets',
                'Allowed — Statement 2 only Denies s3:DeleteObject, not s3:PutObject; the Allow in Statement 1 applies',
                'Denied — when there is both an Allow and a Deny statement, the default is to deny all',
                'Allowed — Statement 1 is more specific, so it takes precedence over Statement 2'
            ],
            correctOptionIndex: 1,
            explanation: 'Statement 2 explicitly Denies only s3:DeleteObject. For s3:PutObject, Statement 2 does not apply — there is no Deny covering PutObject. Statement 1 grants Allow for s3:* (which includes PutObject) on my-bucket/*. The final result for s3:PutObject is: no applicable Deny + explicit Allow = Access Granted. The Deny does block s3:DeleteObject on any bucket for this principal. Specificity does not determine precedence — only explicit Deny does.'
        },
        {
            id: 'sapp_q36',
            type: 'single',
            prompt: 'A company uses AWS Organizations. An SCP on the root OU allows only specific AWS services. A member account has an IAM user with AdministratorAccess. The IAM user tries to create an EC2 instance but EC2 is not in the SCP allowlist. What happens?',
            options: [
                'The IAM user can create the EC2 instance because AdministratorAccess overrides SCPs',
                'The IAM user is denied — SCPs define the maximum available permissions for ALL principals in the account; if EC2 is not allowed by the SCP, no identity in that account can use EC2',
                'The IAM user can create the instance because SCPs apply only to the root user, not IAM users',
                'The IAM user is denied only if the account administrator has not explicitly granted EC2 access'
            ],
            correctOptionIndex: 1,
            explanation: 'Service Control Policies (SCPs) are guardrails that restrict the maximum permissions available to every principal in a member account — including the root user, IAM users, IAM roles, and even the account administrator. An SCP does not grant permissions; it only limits them. If EC2 is not in the SCP allowlist, no identity in that account can perform EC2 actions, even with AdministratorAccess attached. SCPs apply to all principals in the account without exception. The effective permission is always the intersection of the SCP and the identity/resource policies.'
        },

        // ═══════════════════════════════════════════════════════════════════════
        // HARD — Cross-Account S3 + KMS
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'sapp_q37',
            type: 'multiple',
            prompt: 'Account A has an IAM role. Account B has an S3 bucket encrypted with a customer-managed KMS key in Account B. The Account A role needs to read objects from the bucket. Which THREE configurations are ALL required? (Choose 3)',
            options: [
                'The S3 bucket policy in Account B must explicitly allow s3:GetObject for Account A\'s IAM role ARN',
                'The IAM role in Account A must have an identity policy granting s3:GetObject on the Account B bucket ARN and kms:Decrypt on the Account B KMS key ARN',
                'The KMS key policy in Account B must allow kms:Decrypt for Account A\'s IAM role ARN',
                'Account A must enable VPC peering with Account B to allow cross-account S3 access'
            ],
            correctOptionIndexes: [0, 1, 2],
            explanation: 'Cross-account access to a KMS-encrypted S3 bucket requires all three: (1) The S3 bucket policy in Account B must allow the cross-account principal (Account A role) to call s3:GetObject — without this, S3 rejects the request before KMS is even consulted. (2) The IAM role in Account A must have identity policy permissions for both s3:GetObject on the bucket AND kms:Decrypt on the KMS key — AWS evaluates both the S3 and KMS sides. (3) The KMS key policy in Account B must allow Account A\'s role to call kms:Decrypt — KMS denies decryption without this even if the IAM policy allows it. VPC peering is irrelevant for cross-account S3 access, which goes over the AWS global network.'
        },
        {
            id: 'sapp_q38',
            type: 'single',
            prompt: 'A Lambda function in Account A writes objects to an S3 bucket in Account B. The objects are encrypted with an Account B KMS CMK. The Lambda\'s execution role in Account A has s3:PutObject granted by the Account B bucket policy. However, the write fails with a KMS access denied error. What is the MOST likely missing configuration?',
            options: [
                'The Lambda function needs a VPC Interface Endpoint for KMS in Account A',
                'The KMS key policy in Account B does not grant kms:GenerateDataKey to the Lambda execution role in Account A — this is required for SSE-KMS encryption on PutObject',
                'The Lambda execution role needs kms:Encrypt permission in Account A\'s IAM policy for the Account B key ARN',
                'The S3 bucket in Account B must disable default encryption so the Lambda can use its own key'
            ],
            correctOptionIndex: 1,
            explanation: 'When writing an SSE-KMS encrypted object to S3, the caller does not call KMS directly — S3 calls KMS on behalf of the caller using kms:GenerateDataKey to get a data key for encryption. The caller\'s principal must have kms:GenerateDataKey permission on the CMK. For cross-account writes, the Account B KMS key policy must explicitly grant kms:GenerateDataKey to Account A\'s Lambda execution role ARN. Without this, S3 cannot obtain a data key and returns AccessDenied. The IAM policy in Account A also needs kms:GenerateDataKey on the key ARN (both sides required). kms:Encrypt is used for direct encryption calls, not S3 SSE-KMS. A VPC endpoint for KMS is unrelated to the permission issue.'
        },

        // ═══════════════════════════════════════════════════════════════════════
        // HARD — VPC Endpoint Policies
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'sapp_q39',
            type: 'single',
            prompt: 'A company wants EC2 instances in a private VPC to access S3, but ONLY the company\'s own S3 buckets — never public S3 buckets (e.g., software repositories operated by third parties). A VPC Gateway Endpoint for S3 is already in place. How can access to external S3 buckets be restricted?',
            options: [
                'Add an outbound Security Group rule on the EC2 instances blocking traffic to 0.0.0.0/0 on port 443',
                'Add an endpoint policy to the VPC Gateway Endpoint that explicitly allows s3:GetObject and s3:PutObject only on the company\'s own bucket ARNs, denying all others',
                'Enable S3 Block Public Access on all company buckets — this prevents EC2 from reaching external buckets',
                'Use AWS WAF on the VPC endpoint to filter requests by bucket name'
            ],
            correctOptionIndex: 1,
            explanation: 'VPC Endpoint policies control what S3 operations are permitted through the endpoint. By attaching a restrictive endpoint policy that allows actions only on specific bucket ARNs (arn:aws:s3:::company-bucket and arn:aws:s3:::company-bucket/*), any request through the endpoint targeting other buckets is denied. This is the recommended way to prevent data exfiltration via S3 from private instances — even if an attacker compromises the instance, they cannot upload data to external S3 buckets through the endpoint. Security Groups apply to traffic leaving the instance, not per-S3-bucket access control. Block Public Access controls public access settings on owned buckets, not what the EC2 can reach. WAF does not attach to VPC Gateway Endpoints.'
        },
        {
            id: 'sapp_q40',
            type: 'single',
            prompt: 'An EC2 instance in a private subnet uses an IAM role with s3:* on all resources. A VPC Gateway Endpoint for S3 is configured with the default endpoint policy. A security engineer wants to use the endpoint policy to restrict the instance to only listing and reading from one specific bucket, regardless of what the IAM role allows. Which endpoint policy achieves this?',
            options: [
                'An endpoint policy that Allows s3:ListBucket and s3:GetObject on the specific bucket ARN — the effective permission is the intersection of the IAM role and the endpoint policy',
                'An endpoint policy that Denies s3:PutObject and s3:DeleteObject — this leaves ListBucket and GetObject allowed',
                'Remove the IAM role from the instance and rely solely on the endpoint policy for S3 access',
                'Endpoint policies cannot restrict IAM role permissions — only IAM policies can limit the role\'s effective access'
            ],
            correctOptionIndex: 0,
            explanation: 'VPC endpoint policies work in conjunction with IAM policies — the effective permissions for requests through the endpoint are the intersection (AND) of what the IAM identity policy allows AND what the endpoint policy allows. An endpoint policy that only allows s3:ListBucket and s3:GetObject on arn:aws:s3:::specific-bucket means that even though the IAM role has s3:*, the effective permission through the endpoint is limited to those two actions on that one bucket. The IAM role\'s broad permissions are effectively narrowed. Denying specific actions leaves many other permitted actions. Endpoint policies cannot grant permissions the IAM role does not have, but they can restrict the role\'s usable permissions.'
        },

        // ═══════════════════════════════════════════════════════════════════════
        // HARD — SCP Syntax: NotAction vs Action Deny
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'sapp_q41',
            type: 'single',
            prompt: 'A security team writes the following SCP to protect critical security services:\n\n{"Effect":"Deny","NotAction":["cloudtrail:*","guardduty:*","config:*"],"Resource":"*"}\n\nWhat does this SCP actually do?',
            options: [
                'It denies all actions on CloudTrail, GuardDuty, and Config — protecting them from modification',
                'It denies all AWS actions EXCEPT CloudTrail, GuardDuty, and Config — effectively blocking everything else in the account',
                'It allows only CloudTrail, GuardDuty, and Config and grants no other permissions',
                'It has no effect because SCPs with NotAction are invalid'
            ],
            correctOptionIndex: 1,
            explanation: 'NotAction with Effect:Deny is one of the most commonly misunderstood IAM/SCP constructs. "Deny NotAction [X,Y,Z]" means: "Deny everything EXCEPT X, Y, and Z." In this case, every AWS action that is NOT cloudtrail:*, guardduty:*, or config:* is Denied. This would block EC2, S3, Lambda, RDS — essentially everything except those three services. The intent was likely to PROTECT those services, but the SCP was written backwards. To protect those services from modification, you would write: Effect:Deny, Action:[cloudtrail:StopLogging, cloudtrail:DeleteTrail, guardduty:DeleteDetector, config:DeleteConfigRule], Resource:*. NotAction+Deny is a powerful but easy-to-misapply construct.'
        },

        // ═══════════════════════════════════════════════════════════════════════
        // HARD — Pre-Signed URL + VPC Endpoint
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'sapp_q42',
            type: 'single',
            prompt: 'A developer generates an S3 pre-signed URL using an IAM role. The URL is emailed to a partner. The partner tries to use the URL but gets a 403 Forbidden error. The IAM role\'s identity policy has s3:GetObject on the bucket. Which of the following is the MOST likely reason for the failure?',
            options: [
                'Pre-signed URLs are only valid within the same AWS account — third parties cannot use them',
                'The IAM role that generated the URL has been modified or the temporary credentials (STS session) used to generate the URL have expired, invalidating the pre-signed URL',
                'The bucket has S3 Transfer Acceleration enabled, which blocks pre-signed URL access',
                'Pre-signed URLs require the recipient to have an AWS account and IAM user'
            ],
            correctOptionIndex: 1,
            explanation: 'A pre-signed URL\'s validity is tied to the credentials that signed it. If the URL was signed with temporary STS credentials (from an assumed role), the pre-signed URL becomes invalid when the STS session expires — even if the URL\'s own expiry time has not elapsed. This is a critical difference from using long-term IAM user access keys. Additionally, if the IAM role\'s permissions are revoked or the role is deleted after URL generation, the URL also fails. Pre-signed URLs are usable by anyone who has the URL — no AWS account required. Transfer Acceleration does not affect pre-signed URL access.'
        },

        // ═══════════════════════════════════════════════════════════════════════
        // HARD — Secrets Manager Rotation Strategies
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'sapp_q43',
            type: 'single',
            prompt: 'A production RDS database has hundreds of application servers connecting with a single shared username and password stored in Secrets Manager. The team enables automatic rotation. During the first rotation, half the application servers get 401 authentication errors for about 30 seconds. What rotation strategy eliminates this downtime?',
            options: [
                'Single-user rotation with a longer rotation window so servers have more time to update',
                'Multi-user rotation — Secrets Manager alternates between two database users (e.g., appuser1 and appuser2). While one is active, the other is being rotated, ensuring at least one valid credential is always available',
                'Immediate rotation with a Lambda function that sends a cache-clear signal to all application servers before rotating',
                'Increase the Secrets Manager cache TTL on all application servers to 24 hours to prevent them from reading stale credentials during rotation'
            ],
            correctOptionIndex: 1,
            explanation: 'Single-user rotation updates the ONE user\'s password in both Secrets Manager and the database. During the brief window between the password update in the DB and the application servers fetching the new secret, connections fail — this is the 30-second gap. Multi-user rotation maintains TWO users (e.g., appuser_a and appuser_b). Secrets Manager alternates: while appuser_a is active, it rotates appuser_b\'s credentials. Then it switches the "current" user to appuser_b and rotates appuser_a. At no point are ALL valid credentials invalidated simultaneously — there is always one working credential set available. This achieves zero-downtime rotation.'
        },

        // ═══════════════════════════════════════════════════════════════════════
        // HARD — Systems Manager Session Manager Private Endpoint Requirements
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'sapp_q44',
            type: 'multiple',
            prompt: 'A company wants to use AWS Systems Manager Session Manager to connect to EC2 instances in a private VPC with no NAT Gateway and no internet gateway. Which THREE VPC Interface Endpoints are required for Session Manager to function? (Choose 3)',
            options: [
                'com.amazonaws.region.ssm',
                'com.amazonaws.region.ssmmessages',
                'com.amazonaws.region.ec2messages',
                'com.amazonaws.region.sts'
            ],
            correctOptionIndexes: [0, 1, 2],
            explanation: 'For SSM Session Manager to work in a fully private VPC (no internet access), the EC2 instance\'s SSM agent must be able to reach three SSM service endpoints via PrivateLink Interface Endpoints: (1) ssm — for core SSM API calls (parameter retrieval, inventory, etc.); (2) ssmmessages — the Session Manager data channel endpoint (all interactive session traffic flows through this); (3) ec2messages — used by the SSM agent for Run Command and other agent-to-service communication. Additionally, if using SSE-KMS encryption for sessions, a KMS endpoint is also needed. STS is NOT required for Session Manager specifically — the EC2 instance role credentials are obtained via the instance metadata service (IMDSv2), not via a VPC endpoint to STS.'
        },

        // ═══════════════════════════════════════════════════════════════════════
        // HARD — KMS Key Policy vs IAM Policy Interaction
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'sapp_q45',
            type: 'single',
            prompt: 'A KMS customer-managed key has a key policy that grants the account root full access. An IAM user has an identity policy that grants kms:Decrypt on all KMS keys. However, the KMS key policy does NOT explicitly list the IAM user or any IAM policies. Can the IAM user decrypt data using this key?',
            options: [
                'No — KMS key policies must explicitly grant access to each IAM principal; IAM policies alone are not sufficient for KMS keys that do not delegate to IAM',
                'Yes — the IAM user\'s identity policy with kms:Decrypt is sufficient; KMS evaluates IAM policies normally',
                'Yes — the root account grant in the key policy covers all IAM users in the account automatically',
                'No — only the root user can use a key whose policy grants root full access'
            ],
            correctOptionIndex: 0,
            explanation: 'KMS key policies are unique in AWS: unlike most resource-based policies, KMS key policies are the PRIMARY access control for KMS keys. If the key policy does NOT delegate to IAM (i.e., does not include a statement allowing the account root to enable IAM policies), then IAM identity policies alone are insufficient. The critical statement that enables IAM delegation is: "Principal":{"AWS":"arn:aws:iam::ACCOUNT:root"} with kms:* — this tells KMS to ALSO evaluate IAM policies for this key. Without this delegation statement, the IAM user\'s kms:Decrypt identity policy is ignored by KMS. If the key policy does include the root delegation, then IAM policies do matter. This makes KMS the one AWS service where the resource policy can completely override IAM policies.'
        },
        {
            id: 'sapp_q46',
            type: 'single',
            prompt: 'A security team wants to ensure that a KMS CMK can only be used to encrypt/decrypt when called from within a specific AWS account — never cross-account, even if the key policy is later misconfigured to allow external principals. Which KMS key policy condition enforces this?',
            options: [
                'kms:ViaService condition limiting the key to a specific AWS service',
                'aws:SourceAccount condition matching the account ID in the key policy',
                'kms:CallerAccount condition key — restricts key usage to API calls originating from the specified AWS account number',
                'aws:PrincipalOrgID condition matching the organization ID'
            ],
            correctOptionIndex: 2,
            explanation: 'The kms:CallerAccount condition key in a KMS key policy restricts all usage of the key to API calls made from the specified AWS account. Even if an external principal is later granted access in the key policy, the kms:CallerAccount condition denies the request if the API call originates from a different account. This is a defense-in-depth measure to prevent cross-account key usage regardless of key policy mistakes. aws:SourceAccount is used in resource-based policies for service principals (e.g., SNS calling Lambda). aws:PrincipalOrgID restricts to principals within the organization but does not specify a single account. kms:ViaService restricts to a specific AWS service.'
        },

        // ═══════════════════════════════════════════════════════════════════════
        // HARD — GuardDuty Automated Remediation
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'sapp_q47',
            type: 'single',
            prompt: 'A GuardDuty finding indicates that an EC2 instance is communicating with a known cryptocurrency mining command-and-control server (finding: CryptoCurrency:EC2/BitcoinTool.B). The security team wants to automatically isolate the instance by removing it from all Security Groups and placing it in an isolated SG with no inbound/outbound rules — within seconds of the finding. What is the MOST operationally efficient architecture?',
            options: [
                'Set up a CloudWatch alarm on GuardDuty findings metric and trigger an SNS notification to the on-call engineer who manually isolates the instance',
                'Configure GuardDuty to publish findings to Amazon EventBridge; create an EventBridge rule matching the finding type that triggers a Lambda function which uses the EC2 API to replace the instance\'s Security Groups with an isolated quarantine SG',
                'Enable GuardDuty malware protection — it automatically quarantines infected instances',
                'Create an AWS Config rule that detects the instance communication pattern and triggers an SSM Automation document to isolate it'
            ],
            correctOptionIndex: 1,
            explanation: 'GuardDuty automatically publishes all findings to Amazon EventBridge in near real-time. An EventBridge rule with an event pattern matching the specific finding type (CryptoCurrency:EC2/BitcoinTool.B) triggers a Lambda function that uses the EC2 ModifyNetworkInterfaceAttribute or ModifyInstanceAttribute API to replace the instance\'s security groups with a pre-created quarantine SG that has no inbound or outbound rules. This automated response happens within seconds without human intervention. GuardDuty malware protection scans EBS volumes for malware — it does not automatically quarantine instances. AWS Config detects configuration compliance violations, not active network communication patterns. Manual SNS notification introduces unacceptable delay for active threats.'
        },

        // ═══════════════════════════════════════════════════════════════════════
        // HARD — RDS Proxy + IAM Authentication
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'sapp_q48',
            type: 'single',
            prompt: 'A company runs thousands of Lambda functions that each open direct connections to an Amazon RDS Aurora PostgreSQL cluster. Connection exhaustion is causing application errors. The team wants to use RDS Proxy. They also want Lambda functions to authenticate to RDS Proxy without storing database passwords — using IAM authentication only. What combination is required?',
            options: [
                'Create an RDS Proxy with IAM authentication enabled; the Lambda execution role needs rds-db:connect permission; RDS Proxy fetches the actual database credentials from Secrets Manager automatically',
                'Create an RDS Proxy without IAM authentication; Lambda passes the password from an environment variable to the proxy',
                'Enable RDS IAM Database Authentication directly on Aurora; RDS Proxy is not compatible with IAM auth',
                'Store database credentials in SSM Parameter Store; Lambda retrieves them and passes them to RDS Proxy which uses them for the database connection'
            ],
            correctOptionIndex: 0,
            explanation: 'RDS Proxy with IAM authentication is the correct pattern: (1) Enable IAM authentication on the RDS Proxy (not directly on the Aurora cluster for this pattern); (2) The Lambda execution role needs the rds-db:connect IAM permission on the proxy\'s ARN; (3) Lambda generates an IAM auth token using rds:GenerateDbAuthToken and uses it as the database password when connecting to the proxy\'s endpoint; (4) RDS Proxy itself stores the actual Aurora username/password in Secrets Manager and manages the connection pool to Aurora. Lambda functions see only short-lived IAM tokens — no static database credentials. RDS Proxy is fully compatible with IAM authentication and is the AWS-recommended pattern for Lambda-to-RDS connection pooling with IAM auth.'
        },

        // ═══════════════════════════════════════════════════════════════════════
        // HARD — S3 Object Lock Nuances
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'sapp_q49',
            type: 'single',
            prompt: 'A company has S3 Object Lock enabled in Governance mode on a bucket with a 1-year retention period. A senior administrator (with the s3:BypassGovernanceRetention permission) accidentally needs to delete a locked object before the retention period expires for a legitimate compliance correction. The deletion is urgent. What must the administrator do?',
            options: [
                'Nothing special — Governance mode automatically expires after a request from any IAM administrator',
                'Upgrade the object\'s lock to Compliance mode first, then delete it — Compliance mode allows deletion by administrators',
                'Include the x-amz-bypass-governance-retention: true header in the DELETE request and ensure the IAM identity has the s3:BypassGovernanceRetention IAM permission',
                'Contact AWS Support to perform emergency object deletion — only AWS can bypass Governance mode'
            ],
            correctOptionIndex: 2,
            explanation: 'Governance mode is specifically designed to allow authorized administrators to bypass the retention lock when necessary (unlike Compliance mode which prevents even the root account from deleting). To bypass Governance mode: (1) the IAM identity must have the s3:BypassGovernanceRetention permission explicitly granted in their IAM policy; AND (2) the DELETE (or overwrite) request must include the HTTP header x-amz-bypass-governance-retention: true. Both conditions are required — the permission alone is not enough without the header, and the header alone without the permission will be denied. AWS Support does not manage customer object-level settings. Compliance mode cannot be downgraded to Governance mode to allow deletion.'
        },

        // ═══════════════════════════════════════════════════════════════════════
        // HARD — Network Firewall Stateless vs Stateful Rules
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'sapp_q50',
            type: 'single',
            prompt: 'A company deploys AWS Network Firewall. A stateless rule group passes all traffic to the stateful rule group. The stateful rule group has an IPS (Suricata) rule that DROPs all outbound HTTP traffic to a known malware domain. A developer\'s EC2 instance makes an HTTPS (port 443) request to the same malware domain. The request is NOT blocked. Why?',
            options: [
                'Stateful rules only inspect TCP traffic on port 80, not port 443',
                'The Suricata rule is written to match HTTP traffic (port 80), but the request is HTTPS (port 443). TLS inspection (decryption) is not configured, so the firewall cannot inspect the encrypted SNI hostname in the HTTPS payload to match the domain — it only sees encrypted traffic on port 443',
                'The stateless rule group\'s pass action causes stateful rules to be skipped for that traffic',
                'Network Firewall does not support domain-based rules for HTTPS traffic under any configuration'
            ],
            correctOptionIndex: 1,
            explanation: 'This is a critical Network Firewall concept. A Suricata rule matching HTTP traffic (content in plaintext) will NOT match HTTPS traffic because the HTTP headers and content are encrypted inside TLS. The firewall sees only the encrypted payload. Without TLS inspection (decryption) configured, the firewall cannot read the HTTP Host header or URL path of HTTPS requests — it can only see the TCP handshake and TLS SNI (Server Name Indication) header. To block HTTPS to a specific domain, you must either: (a) use a domain list stateful rule group with STRICT_ORDER that inspects the TLS SNI field, or (b) configure TLS inspection with a decryption certificate. The Suricata HTTP-matching rule specifically matches cleartext HTTP (port 80) payloads.'
        },

        // ═══════════════════════════════════════════════════════════════════════
        // HARD — IAM Access Analyzer
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'sapp_q51',
            type: 'single',
            prompt: 'A security team enables IAM Access Analyzer with an analyzer scoped to the AWS account. Access Analyzer generates a finding for an S3 bucket that is accessible from a different AWS account. The security team verifies this cross-account access is intentional and expected. What should they do to prevent this finding from appearing repeatedly?',
            options: [
                'Delete the S3 bucket resource policy to remove the cross-account access grant',
                'Disable IAM Access Analyzer for S3 resources',
                'Archive the finding in Access Analyzer — archived findings are acknowledged as expected and will not re-appear as active findings',
                'Add an SCP that denies cross-account S3 access to prevent Access Analyzer from flagging it'
            ],
            correctOptionIndex: 2,
            explanation: 'IAM Access Analyzer findings can be archived when the access is reviewed and deemed intentional. Archiving a finding is the formal acknowledgment workflow: the finding moves from Active to Archived status and will not reappear as an active finding for the same access configuration. If the access configuration changes (e.g., the bucket policy is modified), Access Analyzer may generate a new finding. This is the correct operational process for managing expected external access without suppressing the entire analyzer. Deleting the bucket policy would remove legitimate business access. Disabling the analyzer removes security visibility. The SCP approach would break the intentional cross-account access.'
        },
        {
            id: 'sapp_q52',
            type: 'single',
            prompt: 'A company wants to continuously validate that IAM policies in their account grant ONLY the minimum permissions required by each role — flagging any role with permissions that have not been used in the past 90 days. Which AWS feature provides this analysis automatically?',
            options: [
                'IAM Access Analyzer policy validation — checks policies against IAM best practices',
                'AWS Trusted Advisor IAM checks — flags overly permissive IAM policies',
                'IAM Last Accessed data combined with AWS Config rules — Config evaluates last-accessed timestamps',
                'IAM Access Analyzer unused access findings — identifies roles with permissions and access that has not been used within the analysis period'
            ],
            correctOptionIndex: 3,
            explanation: 'IAM Access Analyzer unused access findings (introduced in 2023) analyze IAM roles, users, and policies to identify unused permissions, unused access keys, and unused passwords. An analyzer configured for unused access finds roles with permissions that have not been exercised in the analysis window (configurable, default 90 days). This surfaces over-provisioned roles so they can be right-sized to least privilege. Access Analyzer policy validation checks new policies against static best-practice rules but does not look at historical usage. Trusted Advisor\'s IAM checks are high-level (e.g., root MFA enabled) and do not analyze per-permission usage. IAM Last Accessed data is available manually per role but is not automatically analyzed by Config rules in a built-in way.'
        }
    ]
};
