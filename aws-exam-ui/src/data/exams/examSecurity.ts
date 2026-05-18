import type { ExamDefinition } from './types';

export const examSecurity: ExamDefinition = {
    id: 'exam_security_saa_c03',
    title: 'SAA-C03 Practice Set — Security, Identity & Compliance',
    description: 'Scenario-based questions covering IAM, KMS, Cognito, GuardDuty, WAF, Shield, Secrets Manager, ACM, CloudHSM, Macie, Inspector, Security Hub, Network Firewall, Firewall Manager, Detective, Audit Manager, RAM, S3 security, VPC endpoints, CloudTrail, and STS.',
    durationSeconds: 5400,
    questions: [

        // ═══════════════════════════════════════════════════════════════════════
        // IAM
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'sec_q1',
            type: 'single',
            prompt: 'A solutions architect needs to grant an EC2 instance in Account A access to an S3 bucket in Account B. The EC2 instance already has an IAM role attached. What is the MOST secure approach?',
            options: [
                'Create an IAM user in Account B, generate access keys, and store them in the EC2 instance user data',
                'Create a cross-account IAM role in Account B with a trust policy allowing Account A\'s EC2 role to assume it, then update the S3 bucket policy to allow the role',
                'Make the S3 bucket public and restrict by the EC2 instance\'s Elastic IP address',
                'Use AWS Resource Access Manager (RAM) to share the S3 bucket with Account A'
            ],
            correctOptionIndex: 1,
            explanation: 'Cross-account access is best handled with IAM role assumption. A role in Account B trusts the EC2 role ARN from Account A, and the S3 bucket policy grants access to that assumed role. No long-term credentials are needed, which is most secure. RAM does not support sharing S3 buckets. Static credentials in user data are a security antipattern and rotate manually.'
        },
        {
            id: 'sec_q2',
            type: 'multiple',
            prompt: 'A security team is auditing IAM configurations. Which TWO practices reduce the risk of privilege escalation in an AWS account? (Choose 2)',
            options: [
                'Apply IAM permission boundaries to limit the maximum permissions a user or role can grant to others',
                'Enable AWS Organizations Service Control Policies (SCPs) to restrict actions across the organization',
                'Rotate IAM user access keys every 90 days using AWS Config rules',
                'Assign AdministratorAccess to all developers to avoid permission errors during deployments'
            ],
            correctOptionIndexes: [0, 1],
            explanation: 'Permission boundaries cap the effective permissions an identity can have, preventing users from escalating their own privileges even if they can create roles. SCPs restrict the maximum permissions for all principals in an OU, providing an org-wide guardrail. Key rotation is good hygiene but does not prevent escalation. Granting AdministratorAccess is the opposite of least-privilege.'
        },
        {
            id: 'sec_q3',
            type: 'single',
            prompt: 'A Lambda function needs read access to a specific S3 bucket. A developer attached an inline policy with s3:* on * to the Lambda execution role. A security audit flags this. What is the BEST remediation?',
            options: [
                'Replace the inline policy with a managed policy that grants s3:* on the specific bucket ARN',
                'Replace the inline policy with a customer-managed policy granting only s3:GetObject and s3:ListBucket on the specific bucket ARN',
                'Remove the inline policy and enable S3 Block Public Access on the bucket',
                'Add a permission boundary to the Lambda execution role to deny s3:DeleteObject'
            ],
            correctOptionIndex: 1,
            explanation: 'Least privilege requires granting only the actions the function needs (s3:GetObject, s3:ListBucket) scoped to the exact resource. s3:* on * is overly permissive. A customer-managed policy is reusable and auditable. A permission boundary is an additional control, not the primary fix.'
        },
        {
            id: 'sec_q4',
            type: 'single',
            prompt: 'A company uses AWS Organizations. The security team wants to prevent all accounts in a specific OU from disabling AWS CloudTrail, regardless of account administrator permissions. What is the MOST effective control?',
            options: [
                'Create an IAM policy in each account denying cloudtrail:StopLogging',
                'Apply an SCP to the OU with a Deny on cloudtrail:StopLogging and cloudtrail:DeleteTrail',
                'Enable AWS Config in each account with a rule that detects CloudTrail being disabled',
                'Use AWS Security Hub to alert when CloudTrail is turned off'
            ],
            correctOptionIndex: 1,
            explanation: 'SCPs are the only control that restricts even account root users and administrators. An SCP Deny on cloudtrail:StopLogging and cloudtrail:DeleteTrail on the OU prevents any identity in those accounts from disabling CloudTrail. IAM policies in individual accounts can be overridden by the account admin. Config and Security Hub are detective controls — they do not prevent the action.'
        },
        {
            id: 'sec_q5',
            type: 'single',
            prompt: 'A third-party auditing company needs access to resources in your AWS account. You must ensure that they can only assume the role when accessing YOUR account specifically, preventing the confused deputy attack. Which IAM mechanism achieves this?',
            options: [
                'Require MFA in the role trust policy using aws:MultiFactorAuthPresent condition',
                'Add an ExternalId condition to the role trust policy and share that unique value with the auditor',
                'Restrict the trust policy to the auditor\'s specific AWS account ID only',
                'Use a permission boundary to limit what the auditor role can access'
            ],
            correctOptionIndex: 1,
            explanation: 'The confused deputy attack occurs when a third-party service uses its own IAM role to access multiple customers\' accounts. The ExternalId condition in the trust policy requires the caller to provide a unique secret value that only you and the auditor know. This ensures the auditor\'s role can only assume your role when explicitly targeting your account. AWS account ID restriction alone is insufficient because the auditor\'s role serves many customers.'
        },
        {
            id: 'sec_q6',
            type: 'single',
            prompt: 'A company wants to implement Attribute-Based Access Control (ABAC) in AWS so that IAM roles can only access resources that share the same environment tag (dev, staging, prod). How is this implemented?',
            options: [
                'Create separate IAM policies for each environment with explicit resource ARNs',
                'Use IAM condition keys (aws:ResourceTag and aws:PrincipalTag) in IAM policies to match tag values',
                'Apply SCPs that restrict access based on resource tags in each OU',
                'Use AWS Config rules to detect cross-environment access and send alerts'
            ],
            correctOptionIndex: 1,
            explanation: 'ABAC in AWS is implemented using IAM condition keys: aws:PrincipalTag/env matches the tag on the IAM identity, and aws:ResourceTag/env matches the tag on the resource. A policy like "Allow action if aws:PrincipalTag/env equals aws:ResourceTag/env" enforces environment isolation without hardcoding resource ARNs. This scales automatically as new resources are tagged.'
        },
        {
            id: 'sec_q7',
            type: 'single',
            prompt: 'An IAM policy contains a condition "aws:MultiFactorAuthPresent": "true". A developer with MFA enabled calls the AWS API using long-term access keys (not the console). Will this condition be satisfied?',
            options: [
                'Yes, because the developer has MFA enabled on their IAM user account',
                'No, because the condition is only satisfied when the session was authenticated with MFA — long-term access keys do not produce an MFA-authenticated session',
                'Yes, if the access key was generated after MFA was enabled',
                'No, unless the IAM user has an attached MFA device that is also listed in the policy'
            ],
            correctOptionIndex: 1,
            explanation: 'The aws:MultiFactorAuthPresent condition key is true only in the context of a session where MFA was actually used at authentication time — for example, a console session with MFA or a temporary credential obtained via GetSessionToken with an MFA code. Long-term access keys generate API calls without MFA involvement, so aws:MultiFactorAuthPresent is false (or absent) even if the user has MFA enabled on their account.'
        },
        {
            id: 'sec_q8',
            type: 'multiple',
            prompt: 'A solutions architect is evaluating IAM identity types. Which TWO statements about IAM roles are correct? (Choose 2)',
            options: [
                'IAM roles provide temporary security credentials (access key, secret key, session token) via STS',
                'IAM roles can be assumed by AWS services, IAM users in the same or different accounts, and web identity providers',
                'IAM roles can have permanent access keys generated for them like IAM users',
                'An IAM role must always be assumed from within the AWS console and cannot be used programmatically'
            ],
            correctOptionIndexes: [0, 1],
            explanation: 'IAM roles issue temporary credentials through AWS STS (sts:AssumeRole) — these expire and rotate automatically, unlike IAM user long-term keys. Roles support multiple trust principal types: AWS services (EC2, Lambda), other AWS accounts, and web identity providers (Cognito, OIDC). Roles do not have permanent access keys — that is a key differentiator from IAM users. Roles can absolutely be assumed programmatically using the AWS SDK/CLI.'
        },

        // ═══════════════════════════════════════════════════════════════════════
        // AWS KMS
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'sec_q9',
            type: 'single',
            prompt: 'A company stores sensitive customer records in S3. They require that encryption keys are managed by the company, not AWS, and that every key usage is individually auditable via CloudTrail. Which encryption option satisfies these requirements?',
            options: [
                'SSE-S3 (S3-managed keys)',
                'SSE-KMS with an AWS managed key (aws/s3)',
                'SSE-KMS with a customer-managed KMS key (CMK)',
                'Client-side encryption with keys stored in the application config file'
            ],
            correctOptionIndex: 2,
            explanation: 'A customer-managed KMS CMK gives full control over the key policy, rotation, and deletion. Every encrypt/decrypt call against a CMK is logged as a KMS API event in CloudTrail. AWS managed keys (aws/s3) are managed by AWS without key policy control. SSE-S3 is fully AWS-managed with no customer visibility. Config-file keys are insecure and not CloudTrail-auditable.'
        },
        {
            id: 'sec_q10',
            type: 'multiple',
            prompt: 'A solutions architect is designing a data encryption strategy using AWS KMS. Which TWO statements about KMS customer-managed keys are correct? (Choose 2)',
            options: [
                'KMS keys can be automatically rotated annually; the old key material is retained to decrypt data encrypted with prior versions',
                'A KMS key can be used directly to encrypt objects larger than 4 KB using the Encrypt API',
                'KMS supports envelope encryption: a data key encrypts the data and the CMK encrypts the data key',
                'Disabling a KMS key immediately deletes its key material, making encrypted data permanently unrecoverable'
            ],
            correctOptionIndexes: [0, 2],
            explanation: 'Automatic annual key rotation retains old key material so existing ciphertext can still be decrypted. KMS envelope encryption is the standard pattern: a data key (DEK) encrypts data locally, and the CMK encrypts the DEK. The KMS Encrypt API only supports data up to 4 KB; larger data must use envelope encryption. Disabling a key suspends its use but does NOT delete key material — re-enabling restores access. Deletion requires a 7–30 day scheduled waiting period.'
        },
        {
            id: 'sec_q11',
            type: 'single',
            prompt: 'A Lambda function in Account A needs to decrypt data using a KMS CMK that exists in Account B. What TWO things are required? (Select the answer that lists both correctly)',
            options: [
                'The KMS key policy in Account B must allow Account A\'s Lambda role, AND the Lambda role must have kms:Decrypt in its IAM policy',
                'The KMS key must be replicated to Account A using KMS multi-region key replication first',
                'The KMS key in Account B must be made an AWS managed key so it can be shared',
                'Account A must assume a role in Account B before calling kms:Decrypt'
            ],
            correctOptionIndex: 0,
            explanation: 'Cross-account KMS access requires two-sided permission: (1) the KMS key policy in Account B must explicitly allow the cross-account principal (Account A\'s Lambda execution role ARN or Account A\'s root), AND (2) the IAM policy on the Lambda execution role in Account A must grant kms:Decrypt on the key ARN in Account B. Both must exist — either alone is insufficient. Multi-region keys make it possible to use the same logical key in different regions, but that is not required here. AWS managed keys cannot have their policies edited for cross-account access.'
        },
        {
            id: 'sec_q12',
            type: 'single',
            prompt: 'A company needs a KMS key policy that allows the RDS service to use the key for encrypting database storage, but ONLY when the request originates from RDS (not from any other service or user calling kms:GenerateDataKey directly). Which condition key enforces this?',
            options: [
                'aws:SourceIp to restrict to RDS IP ranges',
                'aws:CalledVia to ensure KMS was called through the RDS service',
                'kms:ViaService to restrict key usage to a specific AWS service endpoint',
                'aws:PrincipalServiceName to allow only the rds.amazonaws.com service principal'
            ],
            correctOptionIndex: 2,
            explanation: 'kms:ViaService is the KMS-specific condition key that restricts key use to requests coming through a specific AWS service on behalf of a principal. For example, "kms:ViaService": "rds.us-east-1.amazonaws.com" ensures the key can only be used when RDS in us-east-1 calls KMS — not by a user or Lambda calling KMS directly. aws:CalledVia is a broader condition that checks the service chain but is not KMS-specific in this way.'
        },
        {
            id: 'sec_q13',
            type: 'single',
            prompt: 'A company operates in two AWS regions and wants to encrypt EBS snapshots copied between regions using the same logical KMS key, with the same key ID in both regions. Which KMS feature supports this?',
            options: [
                'KMS key replication — export the key material and import it in the target region',
                'KMS multi-region keys — a primary key and replicas that share the same key ID and key material',
                'Cross-region KMS grants — grant the second region permission to use the primary key',
                'AWS Backup with KMS encryption that automatically transfers key access cross-region'
            ],
            correctOptionIndex: 1,
            explanation: 'KMS multi-region keys are a set of interoperable KMS keys in different regions that share the same key ID, key material, and key spec. This means ciphertext encrypted in one region can be decrypted in the other without re-encryption. Key replication in KMS refers to creating multi-region replicas, but you cannot manually export/import KMS key material to create copies with the same ID. Cross-region grants do not exist in KMS.'
        },

        // ═══════════════════════════════════════════════════════════════════════
        // AWS CloudHSM
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'sec_q14',
            type: 'single',
            prompt: 'A financial services company must use FIPS 140-2 Level 3 validated hardware for all cryptographic operations and requires dedicated single-tenant hardware they exclusively control. Which AWS service meets both requirements?',
            options: [
                'AWS KMS with customer-managed keys',
                'AWS CloudHSM',
                'AWS Secrets Manager with KMS integration',
                'AWS Certificate Manager with RSA 4096 certificates'
            ],
            correctOptionIndex: 1,
            explanation: 'AWS CloudHSM provides dedicated, single-tenant HSMs that are FIPS 140-2 Level 3 validated. The customer has exclusive control — AWS has no access to key material. KMS is FIPS 140-2 Level 2 and is multi-tenant (logically isolated). Secrets Manager and ACM are not HSM services and do not provide physical hardware control.'
        },
        {
            id: 'sec_q15',
            type: 'single',
            prompt: 'A company uses AWS CloudHSM for key management. They want to ensure high availability of the HSM cluster. What is the MINIMUM recommended configuration?',
            options: [
                'One HSM in a single AZ is sufficient because AWS manages replication',
                'Two HSMs in the same AZ for active-active redundancy',
                'At least two HSMs in two different Availability Zones within the same VPC',
                'One HSM per AWS region with cross-region replication enabled'
            ],
            correctOptionIndex: 2,
            explanation: 'AWS CloudHSM clusters require at least two HSMs in two different Availability Zones for high availability. HSM data is automatically synchronized across cluster members. A single AZ deployment means a single AZ failure takes the cluster offline. AWS does not replicate HSM state — the customer is responsible for HA through multi-AZ deployment. Cross-region replication is not natively supported by CloudHSM.'
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Amazon Cognito
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'sec_q16',
            type: 'single',
            prompt: 'A mobile app needs to allow users to sign in with their Google accounts and then access objects in a private S3 bucket using temporary AWS credentials scoped to that user. Which combination of AWS services should be used?',
            options: [
                'IAM users with long-term access keys distributed to the mobile app',
                'Amazon Cognito User Pool for authentication and Cognito Identity Pool for AWS credential vending',
                'AWS IAM Identity Center (SSO) with Google as an external IdP',
                'Amazon API Gateway with a Lambda authorizer that validates Google JWT tokens'
            ],
            correctOptionIndex: 1,
            explanation: 'Cognito User Pools handle authentication and federate with social providers like Google. Cognito Identity Pools exchange the User Pool token for short-lived AWS credentials (via STS) scoped to an IAM role, enabling direct S3 access. IAM users with long-term keys in a mobile app is a critical risk. IAM Identity Center is for workforce SSO, not consumer apps. API Gateway + Lambda authorizer adds complexity and does not vend S3 credentials.'
        },
        {
            id: 'sec_q17',
            type: 'single',
            prompt: 'A Cognito Identity Pool is configured with both authenticated and unauthenticated (guest) roles. A developer is concerned that unauthenticated users could access sensitive DynamoDB tables. What is the BEST control?',
            options: [
                'Disable unauthenticated identities in the Identity Pool entirely if guest access is not needed',
                'Apply a DenyAll SCP to the account to block unauthenticated access',
                'Add a resource-based policy on DynamoDB that denies cognito-identity.amazonaws.com',
                'Use Cognito User Pool triggers to block unauthenticated requests'
            ],
            correctOptionIndex: 0,
            explanation: 'If the application does not require guest access, the simplest and most secure control is to disable unauthenticated identities in the Cognito Identity Pool settings. This removes the unauthenticated role entirely, so no guest credentials are ever vended. The unauthenticated IAM role should also be scoped to the minimum needed if guest access is intentional. SCPs affect AWS service API calls by principals, not Cognito identity vending.'
        },
        {
            id: 'sec_q18',
            type: 'single',
            prompt: 'An application uses Amazon Cognito User Pools. Before issuing tokens, the company wants to add custom claims to the JWT based on data from an internal database (e.g., user subscription tier). Which Cognito feature enables this?',
            options: [
                'Cognito User Pool hosted UI custom CSS',
                'A Pre Token Generation Lambda trigger that modifies the token claims before issuing',
                'Cognito Identity Pool role mapping rules based on token claims',
                'An Amazon API Gateway Lambda authorizer that injects claims into the request'
            ],
            correctOptionIndex: 1,
            explanation: 'The Pre Token Generation Lambda trigger fires before Cognito issues tokens (ID token and access token). The Lambda function can add, suppress, or override claims in the token using data from any source (e.g., an internal database). Identity Pool role mapping reads existing claims but cannot modify tokens. The hosted UI customization is cosmetic. API Gateway authorizers validate tokens after issuance — they cannot modify the token itself.'
        },
        {
            id: 'sec_q19',
            type: 'single',
            prompt: 'A company uses Amazon Cognito User Pools. The security team requires that users set a password with at least 12 characters including uppercase, lowercase, digits, and symbols, and that MFA is mandatory for all users. Where are these controls configured?',
            options: [
                'In an IAM password policy applied to the Cognito service role',
                'In the Cognito User Pool password policy and MFA settings',
                'In AWS WAF rules attached to the Cognito endpoint',
                'In an SCP applied to the account where the User Pool resides'
            ],
            correctOptionIndex: 1,
            explanation: 'Cognito User Pool settings include password policy (minimum length, required character classes) and MFA configuration (Optional, Required for all users, or Conditional). These are per-User-Pool settings. IAM password policies apply to IAM users only. WAF can protect Cognito from bots but does not enforce password complexity. SCPs apply to AWS API calls, not user authentication flows.'
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Amazon GuardDuty
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'sec_q20',
            type: 'single',
            prompt: 'A security team wants to detect if IAM role credentials attached to an EC2 instance are being used from an external IP address outside AWS. The solution must require no agents and minimal configuration. Which service detects this automatically?',
            options: [
                'AWS Config with a custom rule checking CloudTrail for foreign IPs',
                'Amazon GuardDuty',
                'Amazon Inspector',
                'AWS Security Hub'
            ],
            correctOptionIndex: 1,
            explanation: 'GuardDuty natively analyzes VPC Flow Logs, CloudTrail events, and DNS logs using ML-based threat detection. Its finding UnauthorizedAccess:IAMUser/InstanceCredentialExfiltration triggers when EC2 instance credentials are used from an IP outside AWS. No agents are required — enabled with one click. Inspector is for vulnerability scanning. Config rules detect configuration drift, not credential exfiltration. Security Hub aggregates findings but does not detect on its own.'
        },
        {
            id: 'sec_q21',
            type: 'multiple',
            prompt: 'A company enables Amazon GuardDuty across all accounts in an AWS Organization. Which TWO data sources does GuardDuty analyze by default without additional setup? (Choose 2)',
            options: [
                'AWS CloudTrail management events',
                'Amazon S3 server access logs stored in a logging bucket',
                'VPC Flow Logs',
                'Application-level HTTP request logs from an ALB'
            ],
            correctOptionIndexes: [0, 2],
            explanation: 'GuardDuty automatically ingests CloudTrail management events and VPC Flow Logs as core data sources. S3 server access logs are not a GuardDuty source — it uses CloudTrail S3 data events for S3 threat detection (a separate optional data source). ALB access logs are not a GuardDuty data source.'
        },
        {
            id: 'sec_q22',
            type: 'single',
            prompt: 'A company has enabled GuardDuty with S3 Protection. GuardDuty generates many low-severity findings for a specific S3 bucket used by a known internal security scanning tool. The team wants to stop seeing these findings without disabling GuardDuty. What should they use?',
            options: [
                'Create a GuardDuty filter and suppression rule to automatically archive findings matching the bucket and source IP of the scanner',
                'Delete and recreate the S3 bucket with a different name',
                'Disable S3 Protection in GuardDuty for the entire account',
                'Add an IAM policy to the scanner role that denies GuardDuty from recording its actions'
            ],
            correctOptionIndex: 0,
            explanation: 'GuardDuty suppression rules allow you to define filter criteria (bucket name, source IP, finding type, etc.) to automatically archive matching findings so they do not appear in the active findings list. This silences known-good activity without disabling GuardDuty or S3 Protection. Disabling S3 Protection would hide real threats from all buckets. IAM policies cannot prevent GuardDuty from analyzing activity — GuardDuty reads its own data sources independently.'
        },
        {
            id: 'sec_q23',
            type: 'single',
            prompt: 'An AWS Organization has a GuardDuty administrator account that manages GuardDuty for 40 member accounts. A new AWS account is added to the Organization. What happens regarding GuardDuty enrollment?',
            options: [
                'The new account must manually enable GuardDuty and associate itself with the administrator account',
                'GuardDuty auto-enables for the new account because the administrator configured auto-enable for new Organization members',
                'The new account inherits GuardDuty findings from the administrator account immediately',
                'GuardDuty cannot be centrally managed across an Organization — each account manages it independently'
            ],
            correctOptionIndex: 1,
            explanation: 'When GuardDuty is configured with an Organizations delegated administrator and the auto-enable option is turned on, any new account added to the Organization is automatically enrolled in GuardDuty under the administrator account without requiring manual steps. The administrator account can view and manage findings from all member accounts centrally. GuardDuty is one of the services that most directly supports centralized management via AWS Organizations.'
        },

        // ═══════════════════════════════════════════════════════════════════════
        // AWS WAF
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'sec_q24',
            type: 'single',
            prompt: 'A web application behind an ALB is being hit by a credential stuffing attack with millions of login requests from bots. The solution must automatically identify and block bot traffic without affecting legitimate users. Which AWS service and feature should be used?',
            options: [
                'AWS Shield Advanced with DDoS protection enabled on the ALB',
                'AWS WAF with Bot Control managed rule group attached to the ALB',
                'Amazon GuardDuty with VPC Flow Log analysis',
                'AWS Network Firewall with a stateful rule group blocking HTTP POST requests'
            ],
            correctOptionIndex: 1,
            explanation: 'AWS WAF Bot Control is a managed rule group that uses ML and traffic analysis to identify and block bots including credential stuffing tools. It attaches to an ALB and distinguishes between legitimate users and bots. Shield Advanced protects against volumetric DDoS, not credential stuffing. GuardDuty detects threats at the account/network level but cannot block HTTP requests. Network Firewall blocking all POST requests would break legitimate logins.'
        },
        {
            id: 'sec_q25',
            type: 'single',
            prompt: 'A company uses AWS WAF in front of Amazon CloudFront to protect a global web application. They want to block all traffic from a specific country. What is the SIMPLEST implementation?',
            options: [
                'Create a WAF IP set with all IP ranges of that country and use it in a Block rule',
                'Use a WAF rule with a Geographic match condition that blocks requests from the specified country',
                'Configure a CloudFront response header policy to return 403 for that country',
                'Create a Lambda@Edge function that reads the CloudFront-Viewer-Country header and returns 403'
            ],
            correctOptionIndex: 1,
            explanation: 'AWS WAF geographic (geo) match conditions identify request origin country using GeoIP data. A WAF Block rule with a Geo match condition is the simplest, most operationally efficient solution. Maintaining an IP set for an entire country is impractical. CloudFront response headers and Lambda@Edge can achieve this but require custom development.'
        },
        {
            id: 'sec_q26',
            type: 'single',
            prompt: 'A public API Gateway endpoint is receiving bursts of requests from individual IP addresses that look like automated scraping. The team wants to automatically block any IP that sends more than 1,000 requests in a 5-minute window. What is the MOST operationally efficient solution?',
            options: [
                'Create an AWS Lambda function that reads CloudFront logs every 5 minutes and updates a WAF IP set to block offending IPs',
                'Create an AWS WAF rate-based rule with a threshold of 1,000 requests per 5 minutes and attach the Web ACL to API Gateway',
                'Enable API Gateway throttling with a burst limit of 1,000 and a rate limit of 200 rps per stage',
                'Add a Network ACL to the VPC that blocks IPs exceeding the threshold using a custom Lambda trigger'
            ],
            correctOptionIndex: 1,
            explanation: 'AWS WAF rate-based rules automatically track request counts per source IP over a rolling 5-minute window and block IPs that exceed the configured threshold. This is fully managed with no Lambda functions or custom scripts required. The rule automatically unblocks IPs when their rate drops below the threshold. API Gateway throttling limits overall throughput but does not block individual abusive IPs. NACLs require manual or custom automation to update.'
        },
        {
            id: 'sec_q27',
            type: 'multiple',
            prompt: 'A solutions architect is configuring AWS WAF to protect an Application Load Balancer. Which TWO resources can a WAF Web ACL be directly associated with? (Choose 2)',
            options: [
                'Amazon CloudFront distribution',
                'Application Load Balancer',
                'Network Load Balancer',
                'Amazon RDS database instance'
            ],
            correctOptionIndexes: [0, 1],
            explanation: 'AWS WAF Web ACLs can be associated with: Amazon CloudFront distributions, Application Load Balancers (regional), Amazon API Gateway REST APIs, AWS AppSync GraphQL APIs, and Amazon Cognito User Pools. Network Load Balancers operate at Layer 4 and do not support WAF (WAF operates at Layer 7). RDS is a database service and cannot have a WAF Web ACL attached.'
        },

        // ═══════════════════════════════════════════════════════════════════════
        // AWS Shield
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'sec_q28',
            type: 'single',
            prompt: 'A company\'s public-facing application was hit by a large DDoS attack causing downtime and unexpected AWS cost increases. Management wants financial protection against future DDoS-related cost increases and access to the AWS DDoS Response Team (DRT). Which service tier provides this?',
            options: [
                'AWS Shield Standard, automatically enabled for all AWS accounts',
                'AWS WAF with rate-based rules applied to all public endpoints',
                'AWS Shield Advanced subscribed at the account level',
                'Amazon CloudFront with origin shield enabled'
            ],
            correctOptionIndex: 2,
            explanation: 'AWS Shield Advanced provides: (1) enhanced detection and mitigation for sophisticated DDoS attacks; (2) DDoS cost protection — AWS credits scaling costs caused by a DDoS event; (3) 24/7 access to the AWS DDoS Response Team (DRT). Shield Standard is free but provides only basic L3/L4 protection without cost coverage or DRT access. WAF and CloudFront help but offer neither DRT access nor financial DDoS protection.'
        },
        {
            id: 'sec_q29',
            type: 'single',
            prompt: 'A company with AWS Shield Advanced wants the DDoS Response Team (DRT) to be able to immediately create and deploy WAF rules during an active attack without waiting for manual approval from the account team. How should they configure this?',
            options: [
                'Grant the DRT role administrative IAM access to all account resources',
                'Proactively authorize the DRT by granting the aws-shield-drt:PutDRTAccessRoleAssociation permission and associating an IAM role the DRT can assume',
                'File a support ticket each time an attack occurs to grant temporary DRT access',
                'Enable AWS Managed Rules for WAF which the DRT can modify without account access'
            ],
            correctOptionIndex: 1,
            explanation: 'Shield Advanced allows proactive DRT authorization: the account owner grants the DRT permission to assume a specific IAM role and optionally access S3 bucket logs. This is done in advance in the Shield Advanced console. The DRT can then create WAF rules and adjust mitigations during an attack without requiring the customer to be online. Granting full admin access is overly permissive. Support tickets during an attack introduce delays.'
        },

        // ═══════════════════════════════════════════════════════════════════════
        // AWS Secrets Manager
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'sec_q30',
            type: 'single',
            prompt: 'An EC2-hosted application connects to an Amazon RDS MySQL database. The database password is currently hardcoded in a config file. The security team requires the password to be automatically rotated every 30 days without application downtime. Which solution achieves this?',
            options: [
                'Store the password in SSM Parameter Store SecureString and manually update it every 30 days',
                'Store the password in AWS Secrets Manager with automatic rotation enabled using the provided RDS rotation Lambda function',
                'Encrypt the password with a KMS key and store it in S3; rotate by re-encrypting and redeploying',
                'Use IAM database authentication to eliminate the need for a password entirely'
            ],
            correctOptionIndex: 1,
            explanation: 'Secrets Manager supports native automatic rotation for RDS using AWS-provided Lambda rotation functions. It rotates credentials in both Secrets Manager and RDS on a schedule without application changes (the application retrieves the latest secret via the API). SSM Parameter Store does not support automatic rotation natively. IAM DB authentication eliminates passwords but requires application code changes and is not universally supported.'
        },
        {
            id: 'sec_q31',
            type: 'multiple',
            prompt: 'A solutions architect is comparing AWS Secrets Manager and AWS Systems Manager Parameter Store. Which TWO statements correctly differentiate them? (Choose 2)',
            options: [
                'Secrets Manager supports native automatic rotation; Parameter Store does not have built-in rotation',
                'Parameter Store Standard tier has no additional storage cost; Secrets Manager charges per secret per month',
                'Parameter Store cannot store encrypted values — only Secrets Manager supports KMS encryption',
                'Secrets Manager is only available in GovCloud regions'
            ],
            correctOptionIndexes: [0, 1],
            explanation: 'Secrets Manager was built for rotation and supports automated rotation with Lambda. Parameter Store does not have native rotation. Parameter Store Standard tier is free (up to 10,000 parameters); Secrets Manager charges ~$0.40/secret/month plus API charges. Both services support KMS encryption — Parameter Store has a SecureString type. Secrets Manager is available in all commercial regions.'
        },
        {
            id: 'sec_q32',
            type: 'single',
            prompt: 'A startup stores API keys and OAuth tokens in Lambda environment variables. A security review flags this as high risk. What is the BEST AWS-native remediation?',
            options: [
                'Base64-encode the secrets before storing them in environment variables',
                'Store the secrets in AWS Secrets Manager and retrieve them at runtime via the Secrets Manager API or Lambda extension',
                'Store the secrets in an encrypted S3 bucket and download them on each Lambda cold start',
                'Embed the secrets in the Lambda deployment package and encrypt the package with KMS'
            ],
            correctOptionIndex: 1,
            explanation: 'Secrets Manager is purpose-built for this. The Lambda function retrieves secrets via the Secrets Manager API or the AWS Parameters and Secrets Lambda extension (which caches secrets in memory). Base64 is encoding, not encryption — zero security. Downloading from S3 adds latency without rotation benefits. Secrets in deployment packages are visible to anyone with package access.'
        },
        {
            id: 'sec_q33',
            type: 'single',
            prompt: 'An application in Account A needs to read a secret stored in AWS Secrets Manager in Account B. What is required to enable this cross-account access?',
            options: [
                'Replicate the secret to Account A using Secrets Manager cross-account replication',
                'Add a resource-based policy to the secret in Account B allowing Account A\'s role, and grant kms:Decrypt on the KMS key used to encrypt the secret',
                'Export the secret value from Account B and store it in Account A\'s Secrets Manager',
                'Create an IAM role in Account A with full SecretsManager access and trust Account B'
            ],
            correctOptionIndex: 1,
            explanation: 'Secrets Manager supports resource-based policies on individual secrets. To allow cross-account access: (1) the secret\'s resource policy in Account B must allow secretsmanager:GetSecretValue for Account A\'s IAM role, AND (2) the KMS CMK used to encrypt the secret must also grant kms:Decrypt to Account A\'s role. Both are required. Simply replicating the secret or creating roles in Account A without the resource policy on Account B is insufficient.'
        },

        // ═══════════════════════════════════════════════════════════════════════
        // AWS Certificate Manager (ACM)
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'sec_q34',
            type: 'single',
            prompt: 'A company needs to deploy a TLS certificate on an ALB to enable HTTPS. The certificate must auto-renew before expiry without manual intervention and cost nothing. Which solution meets these requirements?',
            options: [
                'Purchase a third-party certificate, import it into ACM, and set a CloudWatch alarm for expiry',
                'Use AWS Certificate Manager to provision a public certificate, which auto-renews at no charge, and deploy it on the ALB',
                'Generate a self-signed certificate with OpenSSL and import it into ACM',
                'Use ACM Private CA to issue a private certificate for the ALB'
            ],
            correctOptionIndex: 1,
            explanation: 'ACM public certificates are free and automatically renew (typically 60 days before expiry) as long as domain validation is still valid. ACM integrates natively with ALB, CloudFront, and API Gateway. Imported third-party or self-signed certificates do not auto-renew in ACM — you must manage renewal manually. ACM Private CA certificates have a monthly cost and are appropriate for internal/private endpoints, not public HTTPS.'
        },
        {
            id: 'sec_q35',
            type: 'single',
            prompt: 'A company is provisioning an ACM public certificate. They want automatic renewal to work reliably even without email access to the domain\'s admin contact addresses. Which validation method should they choose?',
            options: [
                'Email validation — ACM sends a validation email to the domain contact addresses',
                'DNS validation — ACM provides a CNAME record to add to the domain\'s DNS zone, which persists for future renewals',
                'HTTP validation — ACM places a token file at the domain\'s web root',
                'Phone validation — ACM calls the domain registrant\'s phone number'
            ],
            correctOptionIndex: 1,
            explanation: 'DNS validation is the recommended method for ACM public certificates, especially for automated renewal. ACM writes a CNAME record to the certificate owner\'s DNS zone. As long as the CNAME record remains in DNS, ACM can automatically renew the certificate without any human action. Email validation requires someone to click a link in a validation email each renewal cycle. HTTP validation is not supported by ACM. Phone validation does not exist in ACM.'
        },
        {
            id: 'sec_q36',
            type: 'single',
            prompt: 'A company has internal microservices that communicate over HTTPS within a VPC. They want to issue private TLS certificates for these services from a private CA they control, without any public trust chain. Which AWS service should they use?',
            options: [
                'ACM public certificates with a private domain validation method',
                'AWS Certificate Manager Private CA (ACM PCA)',
                'Self-signed certificates imported into ACM',
                'AWS KMS with an asymmetric RSA key pair used as a certificate'
            ],
            correctOptionIndex: 1,
            explanation: 'ACM Private CA (PCA) allows you to create a private CA hierarchy (root and subordinate CAs) that issues private certificates for internal use. These certificates are trusted within your organization but not publicly. ACM PCA integrates with ACM, enabling managed issuance and automatic renewal for internal services. Public ACM certificates require public domain ownership and are not suitable for internal-only hostnames. Self-signed certificates require manual management. KMS asymmetric keys are not TLS certificate authorities.'
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Amazon Inspector
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'sec_q37',
            type: 'single',
            prompt: 'A DevSecOps team wants to continuously scan EC2 instances and Lambda functions for software vulnerabilities (CVEs) and network exposure without deploying any additional agents beyond what is already on managed instances. Which service provides this?',
            options: [
                'AWS Config with managed rules for EC2 compliance',
                'Amazon Inspector v2',
                'Amazon GuardDuty with EC2 runtime monitoring',
                'AWS Trusted Advisor security checks'
            ],
            correctOptionIndex: 1,
            explanation: 'Amazon Inspector v2 provides continuous automated vulnerability management. For EC2, it uses the SSM agent (already present on managed instances). For Lambda, it integrates directly. It scans for CVEs from the NVD and evaluates network reachability — no separate Inspector agent. GuardDuty detects runtime threats, not CVEs. Config checks configuration compliance. Trusted Advisor has limited security checks that are not CVE-based.'
        },
        {
            id: 'sec_q38',
            type: 'single',
            prompt: 'A company uses Amazon ECR to store Docker images. They want to automatically scan images for known CVEs every time a new image is pushed to the registry. Which service and approach implements this with minimal operational effort?',
            options: [
                'Run Amazon Inspector manually on a schedule against all ECR repositories',
                'Enable Amazon Inspector ECR scanning — it automatically scans on push and continuously re-evaluates as new CVEs are published',
                'Use AWS CodePipeline with a custom Lambda step that runs trivy against each image',
                'Configure ECR basic scanning (free) which uses enhanced CVE detection algorithms'
            ],
            correctOptionIndex: 1,
            explanation: 'Amazon Inspector v2 integrates with ECR to provide enhanced scanning: it scans images automatically when pushed and continuously re-evaluates them as new vulnerabilities are discovered (even for images already in ECR). This is "push and continuous" scanning. ECR basic scanning (free) only scans on push and uses the Clair engine, which has less coverage. Custom Lambda pipelines add operational overhead. Inspector is the recommended service for this use case.'
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Amazon Macie
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'sec_q39',
            type: 'single',
            prompt: 'A compliance team needs to discover and report on the location of PII stored across hundreds of S3 buckets in an AWS account. Which service is purpose-built for this?',
            options: [
                'Amazon GuardDuty S3 protection',
                'AWS Config with S3 bucket compliance rules',
                'Amazon Macie',
                'AWS Trusted Advisor S3 bucket checks'
            ],
            correctOptionIndex: 2,
            explanation: 'Amazon Macie uses ML and pattern matching to automatically discover, classify, and report on sensitive data — including PII (names, credit card numbers, SSNs) — stored in S3. GuardDuty S3 protection detects unusual access patterns but does not identify PII content. Config rules check bucket configuration (encryption, public access), not data content. Trusted Advisor does not inspect S3 object content.'
        },
        {
            id: 'sec_q40',
            type: 'single',
            prompt: 'Amazon Macie reports that an S3 bucket contains files with credit card numbers (PCI data). The security team wants to be automatically notified in their incident management system whenever Macie generates a new high-severity finding. What is the MOST operationally efficient architecture?',
            options: [
                'Poll the Macie API every 5 minutes using a Lambda function and push findings to the ticketing system',
                'Configure Macie to publish findings to Amazon EventBridge, create an EventBridge rule that triggers an SNS topic or Lambda to notify the incident management system',
                'Export Macie findings to an S3 bucket and process them with Athena queries on a daily schedule',
                'Use AWS Security Hub to forward Macie findings directly to the ticketing system via a direct integration'
            ],
            correctOptionIndex: 1,
            explanation: 'Macie publishes findings to Amazon EventBridge in near real-time. An EventBridge rule can filter for high-severity Macie findings and trigger downstream actions: SNS notifications, Lambda functions calling incident management APIs, or SQS queues. This is event-driven and requires no polling. Polling adds delay and unnecessary API calls. S3 + Athena introduces daily delay. Security Hub aggregates findings but does not have direct ticketing system integrations out of the box.'
        },

        // ═══════════════════════════════════════════════════════════════════════
        // AWS Security Hub
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'sec_q41',
            type: 'single',
            prompt: 'A security operations team manages 50 AWS accounts across multiple regions. They want a single pane of glass to aggregate security findings from GuardDuty, Inspector, and Macie, and assess compliance against AWS Foundational Security Best Practices. Which service provides this?',
            options: [
                'AWS Organizations with delegated administrator for IAM',
                'Amazon CloudWatch with a multi-account, multi-region dashboard',
                'AWS Security Hub with cross-account and cross-region aggregation enabled',
                'AWS Config Aggregator with conformance packs'
            ],
            correctOptionIndex: 2,
            explanation: 'Security Hub aggregates findings from integrated services (GuardDuty, Inspector, Macie, Firewall Manager, and more) across accounts and regions in normalized ASFF format. It provides built-in compliance standards: AWS Foundational Security Best Practices, CIS Benchmarks, and PCI DSS. Cross-account and cross-region aggregation gives a central security account a full view. Config Aggregator + conformance packs check configuration compliance but do not aggregate threat findings.'
        },
        {
            id: 'sec_q42',
            type: 'single',
            prompt: 'A security engineer wants to automatically remediate a specific Security Hub finding — whenever an S3 bucket is found to have public read access (finding type S3.2), they want a Lambda function to re-enable Block Public Access. What is the MOST event-driven approach?',
            options: [
                'Schedule a Lambda function to query Security Hub for S3.2 findings every hour and remediate',
                'Create a Security Hub custom action that triggers an EventBridge rule connected to a Lambda function for S3.2 findings',
                'Create an EventBridge rule that matches Security Hub findings of type S3.2 and invokes a remediation Lambda automatically',
                'Use AWS Config automatic remediation with an SSM automation document'
            ],
            correctOptionIndex: 2,
            explanation: 'Security Hub automatically publishes findings to EventBridge. An EventBridge rule with a pattern matching Security Hub findings of finding type S3.2 can invoke a Lambda function immediately and automatically when the finding is generated — no manual trigger required. Custom actions require a human to manually select and trigger them in the Security Hub console. Config automatic remediation also works but is specific to Config rule evaluations, not Security Hub findings.'
        },

        // ═══════════════════════════════════════════════════════════════════════
        // AWS IAM Identity Center
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'sec_q43',
            type: 'single',
            prompt: 'A company with 20 AWS accounts in an Organization wants employees to sign in once with their Microsoft Active Directory credentials and access any account with appropriate permissions. Which service provides this with least operational overhead?',
            options: [
                'Create IAM users in each account with SAML federation configured independently',
                'Use AWS IAM Identity Center connected to Active Directory via AWS Directory Service or AD Connector',
                'Use Amazon Cognito User Pools with an Active Directory SAML IdP in each account',
                'Create cross-account roles in all 20 accounts and distribute credentials via a corporate portal'
            ],
            correctOptionIndex: 1,
            explanation: 'AWS IAM Identity Center (formerly AWS SSO) is the recommended service for workforce SSO across an Organization. It connects to AD (via AWS Managed Microsoft AD or AD Connector), centralizes permission set assignment per account, and provides a single access portal. Creating IAM users or cross-account roles per account is operationally heavy. Cognito is designed for consumer app authentication, not workforce SSO.'
        },
        {
            id: 'sec_q44',
            type: 'single',
            prompt: 'A company uses AWS IAM Identity Center with permission sets. The security team wants to ensure that a developer permission set only allows access to the us-east-1 and eu-west-1 regions. How should this be enforced?',
            options: [
                'Add an SCP to the developer OU restricting actions to those two regions',
                'Configure the permission set\'s inline policy with an aws:RequestedRegion condition denying actions outside those two regions',
                'Configure IAM Identity Center trusted IP ranges to only allow access from those regions',
                'Use Cognito Identity Pool roles scoped to those regions'
            ],
            correctOptionIndex: 1,
            explanation: 'IAM Identity Center permission sets support both AWS managed policies and custom inline policies. Adding an inline policy with a Deny statement and an aws:RequestedRegion NotCondition (or a matching Allow only for those regions) directly controls which regions the permission set can operate in. SCPs on the OU would also work but apply to all principals in the OU, not just this permission set. Identity Center does not have trusted IP range settings per permission set.'
        },

        // ═══════════════════════════════════════════════════════════════════════
        // AWS Directory Service
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'sec_q45',
            type: 'single',
            prompt: 'A company wants to join Windows EC2 instances to a domain and allow on-premises Active Directory users to log in. They do not want to manage domain controllers themselves. Which AWS Directory Service option minimizes operational overhead?',
            options: [
                'AD Connector — a proxy that redirects authentication to on-premises AD without caching any data',
                'Simple AD — a standalone Samba-based directory for small environments',
                'AWS Managed Microsoft AD — fully managed Microsoft Active Directory hosted in AWS',
                'Amazon Cognito User Pools with Active Directory SAML integration'
            ],
            correctOptionIndex: 2,
            explanation: 'AWS Managed Microsoft AD runs actual Microsoft Active Directory managed by AWS (patching, snapshots, replication). It supports domain join, Group Policy, RADIUS MFA, and two-way trust with on-premises AD. AD Connector proxies to an existing on-premises AD without hosting a directory in AWS — appropriate when you need no local directory. Simple AD does not support trusts with on-premises AD. Cognito is not a domain service.'
        },
        {
            id: 'sec_q46',
            type: 'single',
            prompt: 'A company has an existing on-premises Active Directory and wants AWS services like WorkSpaces and IAM Identity Center to authenticate against it, without replicating directory data to AWS or running domain controllers in AWS. Which Directory Service option meets this?',
            options: [
                'AWS Managed Microsoft AD with a one-way trust to on-premises AD',
                'Simple AD with an LDAP connector to on-premises',
                'AD Connector',
                'AWS IAM Identity Center with a built-in directory'
            ],
            correctOptionIndex: 2,
            explanation: 'AD Connector is a directory gateway that proxies all authentication and directory requests to the existing on-premises Active Directory. No directory data is stored or cached in AWS — it is purely a proxy. This is ideal when a company wants to leverage AWS services that require a directory (WorkSpaces, IAM Identity Center) without replicating their AD to AWS. Managed Microsoft AD would require running domain controllers in AWS. Simple AD is standalone. IAM Identity Center\'s built-in directory is separate from on-premises AD.'
        },

        // ═══════════════════════════════════════════════════════════════════════
        // AWS Firewall Manager
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'sec_q47',
            type: 'single',
            prompt: 'A company uses AWS Organizations with 30 accounts. The security team needs WAF rules protecting against OWASP Top 10 threats consistently deployed across all ALBs in all accounts and regions, with new accounts automatically inheriting these rules. Which service enables this centrally?',
            options: [
                'Deploy WAF Web ACLs in each account manually using CloudFormation StackSets',
                'AWS Firewall Manager with WAF policies',
                'AWS Config with a conformance pack that detects missing WAF rules',
                'AWS Security Hub with WAF findings enabled'
            ],
            correctOptionIndex: 1,
            explanation: 'AWS Firewall Manager allows a central security administrator to define WAF, Shield Advanced, VPC Security Group, and Network Firewall policies that automatically apply to existing and new accounts within the Organization. New accounts are automatically enrolled. StackSets require manual effort for new accounts and do not enforce continuous compliance. Config can detect but not enforce. Security Hub aggregates findings but does not deploy WAF rules.'
        },
        {
            id: 'sec_q48',
            type: 'multiple',
            prompt: 'An organization uses AWS Firewall Manager to centrally manage security policies. Which TWO policy types can Firewall Manager enforce across an AWS Organization? (Choose 2)',
            options: [
                'AWS WAF policy — apply Web ACL rules to ALBs, CloudFront, and API Gateway across accounts',
                'VPC Security Group policy — enforce baseline security group rules and audit non-compliant SGs',
                'IAM permission policy — enforce least-privilege IAM policies on all roles across accounts',
                'S3 bucket policy — enforce encryption at rest on all S3 buckets in the organization'
            ],
            correctOptionIndexes: [0, 1],
            explanation: 'Firewall Manager manages WAF policies (Web ACLs on ALBs, CloudFront, API Gateway), Shield Advanced policies, Network Firewall policies, DNS Firewall policies, and VPC Security Group policies (audit and enforce SG configurations). Firewall Manager does not manage IAM policies — that is the domain of SCPs and IAM. S3 bucket policies are not managed by Firewall Manager (Config and SCPs handle S3 compliance).'
        },

        // ═══════════════════════════════════════════════════════════════════════
        // AWS Network Firewall
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'sec_q49',
            type: 'single',
            prompt: 'A financial services company needs stateful deep-packet inspection of all traffic entering and leaving their VPC, with FQDN-based filtering and the ability to detect known exploit patterns. Which AWS service provides this natively?',
            options: [
                'AWS WAF with a rule group that blocks specific domains',
                'VPC Security Groups with outbound rules blocking known malicious IPs',
                'AWS Network Firewall with stateful rules and domain list filtering',
                'Amazon Route 53 Resolver DNS Firewall'
            ],
            correctOptionIndex: 2,
            explanation: 'AWS Network Firewall provides stateful managed network security including: FQDN/domain-based filtering, Suricata-compatible IDS/IPS rules for deep packet inspection, and TLS inspection. It sits at the VPC level inspecting all traffic through a Firewall Endpoint. WAF operates only at L7 for HTTP/HTTPS. Security Groups cannot inspect packet content. Route 53 Resolver DNS Firewall blocks DNS queries to bad domains but does not inspect non-DNS traffic.'
        },
        {
            id: 'sec_q50',
            type: 'single',
            prompt: 'A company wants to deploy AWS Network Firewall for centralized egress inspection in a hub-and-spoke architecture where multiple spoke VPCs route all outbound internet traffic through a central inspection VPC. What routing architecture enables this?',
            options: [
                'Deploy VPC Peering between all spoke VPCs and the inspection VPC with default routes to the firewall',
                'Use a Transit Gateway with a separate inspection route table that routes spoke VPC traffic to the Network Firewall endpoint in the inspection VPC before reaching the internet gateway',
                'Attach Network Firewall endpoints directly to each spoke VPC independently',
                'Use AWS PrivateLink to route all egress traffic through the inspection VPC'
            ],
            correctOptionIndex: 1,
            explanation: 'Centralized egress inspection uses a Transit Gateway (TGW) hub-and-spoke model: spoke VPCs route all traffic to the TGW, the TGW uses a dedicated inspection route table to send traffic to the Network Firewall endpoint in the inspection (hub) VPC before forwarding to the internet gateway. This avoids deploying separate firewalls in each spoke VPC. VPC Peering is not transitive and cannot achieve this routing. PrivateLink is for exposing services privately, not egress inspection.'
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Amazon Detective
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'sec_q51',
            type: 'single',
            prompt: 'A GuardDuty finding indicates unusual API activity from an IAM role. A security analyst needs to investigate which other resources were accessed, the sequence of API calls, and geographic IP history — without querying raw CloudTrail logs manually. Which service provides an interactive investigation graph?',
            options: [
                'AWS CloudTrail Lake with SQL query support',
                'Amazon Detective',
                'AWS Security Hub investigation workflow',
                'Amazon Athena querying CloudTrail S3 logs'
            ],
            correctOptionIndex: 1,
            explanation: 'Amazon Detective automatically ingests GuardDuty, CloudTrail, and VPC Flow Log data and builds an interactive behavior graph. Analysts can start from a GuardDuty finding and pivot through related entities (IAM principals, IPs, EC2 instances) to understand scope and timeline without writing queries. CloudTrail Lake and Athena can query raw logs but require manual query construction. Security Hub manages finding workflows but does not provide an investigation graph.'
        },

        // ═══════════════════════════════════════════════════════════════════════
        // AWS Audit Manager
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'sec_q52',
            type: 'single',
            prompt: 'A company is preparing for a PCI DSS audit and needs to continuously collect evidence of AWS control compliance (CloudTrail logs, Config snapshots, Security Hub findings) mapped to PCI DSS requirements automatically. Which service is designed for this?',
            options: [
                'AWS Config with a PCI DSS conformance pack',
                'AWS Audit Manager',
                'AWS Security Hub with PCI DSS standard enabled',
                'AWS Artifact for downloading AWS compliance reports'
            ],
            correctOptionIndex: 1,
            explanation: 'AWS Audit Manager automates evidence collection for PCI DSS, SOC 2, HIPAA, and custom frameworks. It continuously collects evidence from CloudTrail, Config, Security Hub, and IAM and maps it to specific control requirements, reducing manual audit preparation effort. Config conformance packs check configuration compliance but do not produce audit-ready evidence reports. Security Hub maps findings to PCI DSS but does not produce structured audit evidence. AWS Artifact provides AWS\'s own compliance reports, not evidence about the customer\'s environment.'
        },

        // ═══════════════════════════════════════════════════════════════════════
        // AWS Resource Access Manager
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'sec_q53',
            type: 'single',
            prompt: 'Account A has a Transit Gateway and wants Accounts B and C to attach their VPCs to it without recreating the TGW in each account. Which service enables sharing the Transit Gateway across accounts?',
            options: [
                'VPC Peering between all accounts',
                'AWS Resource Access Manager (RAM)',
                'AWS PrivateLink with a shared endpoint',
                'Cross-account IAM roles with VPC permissions'
            ],
            correctOptionIndex: 1,
            explanation: 'AWS RAM allows sharing AWS resources — including Transit Gateways, Subnets, Route 53 Resolver rules, License Manager configurations, and more — with other accounts or within an Organization. Account A shares the TGW via RAM, and Accounts B and C create attachments directly. VPC Peering is pairwise and not transitive. PrivateLink shares service endpoints, not a Transit Gateway. IAM cross-account roles control permissions but do not share the resource itself.'
        },
        {
            id: 'sec_q54',
            type: 'multiple',
            prompt: 'A solutions architect is evaluating AWS Resource Access Manager. Which TWO resources can be shared using RAM? (Choose 2)',
            options: [
                'VPC Subnets (to allow other accounts to launch resources into a shared subnet)',
                'Amazon RDS database instances (direct shared read access)',
                'AWS License Manager license configurations',
                'Amazon S3 buckets (to allow cross-account object access without bucket policies)'
            ],
            correctOptionIndexes: [0, 2],
            explanation: 'RAM supports sharing VPC Subnets (enabling shared VPC architectures where multiple accounts launch resources into centrally managed subnets), AWS License Manager configurations, Route 53 Resolver rules, Transit Gateways, and several other resource types. RDS instances cannot be shared via RAM — cross-account RDS access uses snapshots or IAM authentication. S3 buckets are not shareable via RAM — cross-account S3 access uses bucket policies or ACLs.'
        },

        // ═══════════════════════════════════════════════════════════════════════
        // AWS Artifact
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'sec_q55',
            type: 'single',
            prompt: 'A company\'s compliance officer needs to download the AWS ISO 27001 certification and the AWS SOC 2 Type II report to present to a customer as evidence of AWS\'s own compliance posture. Where can these be downloaded without contacting AWS support?',
            options: [
                'AWS Security Hub compliance standards dashboard',
                'AWS Trusted Advisor compliance check results',
                'AWS Artifact',
                'Amazon Inspector compliance reports'
            ],
            correctOptionIndex: 2,
            explanation: 'AWS Artifact is a self-service portal to download AWS compliance documents including SOC reports, ISO certifications, PCI DSS AOC, HIPAA BAA, and more. These attest to AWS\'s own compliance posture. Security Hub, Trusted Advisor, and Inspector assess the customer\'s own environment — they do not provide AWS\'s compliance documentation.'
        },

        // ═══════════════════════════════════════════════════════════════════════
        // S3 Security
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'sec_q56',
            type: 'single',
            prompt: 'A company stores financial records in S3 and must comply with regulations requiring that records cannot be deleted or overwritten for 7 years, even by account administrators. Which S3 feature enforces this?',
            options: [
                'S3 Versioning with a lifecycle policy that retains objects for 7 years',
                'S3 Object Lock in Compliance mode with a 7-year retention period',
                'S3 Object Lock in Governance mode with a 7-year retention period',
                'S3 Replication to a cross-region bucket with delete replication disabled'
            ],
            correctOptionIndex: 1,
            explanation: 'S3 Object Lock Compliance mode prevents ANY user — including the root account — from deleting or overwriting a locked object before the retention period expires. This is the WORM (Write Once Read Many) protection required for strict regulatory compliance. Governance mode also prevents deletion but allows users with s3:BypassGovernanceRetention to override it — not suitable when even admins must be prevented. Versioning and lifecycle do not prevent deletion. Replication does not prevent deletions in the source bucket.'
        },
        {
            id: 'sec_q57',
            type: 'single',
            prompt: 'A developer needs to allow a third-party application to temporarily upload a specific file to a private S3 bucket without granting the application any AWS credentials. What is the BEST approach?',
            options: [
                'Create a temporary IAM user, generate access keys, and delete the user after the upload',
                'Make the S3 bucket publicly writable and add a lifecycle rule to delete the uploaded file after 1 day',
                'Generate a pre-signed URL with a short expiry that allows s3:PutObject for the specific object key',
                'Create a bucket policy that allows PUT from the third-party\'s IP address range'
            ],
            correctOptionIndex: 2,
            explanation: 'Pre-signed URLs allow time-limited access to a specific S3 operation (PutObject) on a specific object key, signed with the IAM credentials of the generator. The third-party application uses the URL directly without needing AWS credentials. The URL expires after the specified time (e.g., 15 minutes). Creating temporary IAM users adds overhead and risk. Making the bucket publicly writable is a major security risk. IP-based bucket policies are brittle if the IP changes and allow anyone from that IP range.'
        },
        {
            id: 'sec_q58',
            type: 'multiple',
            prompt: 'A company wants to ensure all new S3 buckets are never publicly accessible, even if a developer accidentally sets a public bucket policy. Which TWO controls prevent this? (Choose 2)',
            options: [
                'Enable S3 Block Public Access at the account level',
                'Apply an SCP that denies s3:PutBucketPublicAccessBlock with a Deny condition preventing disabling the setting',
                'Enable Amazon Macie to detect and automatically remediate public buckets',
                'Create an IAM policy that denies s3:CreateBucket for all users'
            ],
            correctOptionIndexes: [0, 1],
            explanation: 'S3 Block Public Access at the account level overrides any bucket-level policy or ACL that would make a bucket public — it is a hard preventive guardrail. Pairing it with an SCP that prevents disabling Block Public Access ensures even an administrator cannot bypass it. Macie detects public buckets but cannot automatically remediate them — it is detective, not preventive. Denying s3:CreateBucket would prevent all S3 usage, which is far too restrictive.'
        },
        {
            id: 'sec_q59',
            type: 'single',
            prompt: 'A company has a multi-tenant SaaS application where each tenant stores data in a shared S3 bucket. The company wants to enforce that each tenant\'s IAM role can only access objects prefixed with their own tenant ID, without creating separate buckets per tenant. Which S3 feature supports this at scale?',
            options: [
                'S3 Bucket Policies with a condition on s3:prefix for each tenant',
                'S3 Access Points — create a separate access point per tenant with a policy restricting access to that tenant\'s prefix',
                'S3 ACLs on each object granting access to the tenant\'s IAM role',
                'S3 Inventory to list each tenant\'s objects and apply policies daily'
            ],
            correctOptionIndex: 1,
            explanation: 'S3 Access Points allow you to create named entry points to a bucket, each with its own access policy. Each tenant gets an access point with a policy that restricts access to objects under their tenant prefix. This is the recommended scalable pattern for multi-tenant S3 access — it avoids a single complex bucket policy that must enumerate all tenants. ACLs on individual objects are operationally impractical at scale. S3 Inventory is a reporting tool, not an access control mechanism.'
        },

        // ═══════════════════════════════════════════════════════════════════════
        // VPC Security (Security Groups, NACLs, VPC Endpoints)
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'sec_q60',
            type: 'single',
            prompt: 'A company runs a multi-tier web application with an ALB in public subnets and EC2 app servers in private subnets. The security team wants EC2 instances to only accept traffic from the ALB, even if ALB IPs change. How should the security group be configured?',
            options: [
                'App tier SG inbound: allow port 443 from 0.0.0.0/0 to ensure ALB can always reach it',
                'App tier SG inbound: allow port 443 from the ALB\'s current Elastic IP address',
                'App tier SG inbound: allow port 443 referencing the ALB\'s security group ID as the source',
                'App tier SG inbound: allow port 443 from the public subnet CIDR range'
            ],
            correctOptionIndex: 2,
            explanation: 'Security groups can reference another security group as the source, which is the preferred approach for inter-tier communication. This automatically allows all current and future IPs of instances/load balancers in the referenced SG and does not break if IPs change. Referencing a CIDR is fragile with dynamic IPs. Allowing 0.0.0.0/0 defeats the purpose of private subnets. ALBs do not have Elastic IPs.'
        },
        {
            id: 'sec_q61',
            type: 'multiple',
            prompt: 'A solutions architect is comparing Security Groups and Network ACLs (NACLs). Which TWO statements are correct? (Choose 2)',
            options: [
                'Security Groups are stateful — return traffic is automatically allowed; NACLs are stateless — you must explicitly allow both inbound and outbound directions',
                'NACLs apply at the subnet level and evaluate rules in order by rule number; Security Groups apply at the instance/ENI level',
                'Security Groups support both Allow and Deny rules; NACLs only support Allow rules',
                'NACLs can reference other security groups as sources, just like Security Groups can'
            ],
            correctOptionIndexes: [0, 1],
            explanation: 'Security Groups are stateful: tracked connections automatically allow return traffic. NACLs are stateless: both inbound and outbound rules must be configured for bidirectional traffic (including ephemeral ports). NACLs apply to all resources in a subnet and process rules by ascending rule number. Security Groups apply per ENI. Security Groups are allow-only (no Deny rules); NACLs support both Allow and Deny. NACLs cannot reference security groups — they only use CIDR ranges and protocol/port.'
        },
        {
            id: 'sec_q62',
            type: 'single',
            prompt: 'Lambda functions in a private VPC need to call the AWS SSM Parameter Store API without traversing the public internet. The company does not want to deploy a NAT Gateway. Which solution achieves this?',
            options: [
                'Assign a public IP to the Lambda function\'s ENI',
                'Create a VPC Interface Endpoint (AWS PrivateLink) for the SSM service in the VPC',
                'Create a VPC Gateway Endpoint for SSM in the route table',
                'Use an S3 bucket as an intermediary to cache Parameter Store values'
            ],
            correctOptionIndex: 1,
            explanation: 'AWS Systems Manager (including Parameter Store) is supported by VPC Interface Endpoints (powered by AWS PrivateLink). An interface endpoint creates a private ENI in the VPC subnet, routing all SSM API traffic over the AWS private network without a NAT Gateway or internet gateway. Gateway Endpoints are only available for S3 and DynamoDB — not SSM. Lambda functions in a VPC cannot have public IPs assigned directly. An S3 cache intermediary adds complexity and does not solve the private connectivity requirement directly.'
        },
        {
            id: 'sec_q63',
            type: 'single',
            prompt: 'An EC2 instance in a private subnet needs to access Amazon S3. The company wants to ensure traffic stays on the AWS network and does not traverse the internet, and they want the lowest-cost option. Which VPC endpoint type should they use?',
            options: [
                'VPC Interface Endpoint for S3 using AWS PrivateLink',
                'VPC Gateway Endpoint for S3 added to the route table',
                'NAT Gateway with S3 HTTPS traffic routed through it',
                'AWS Direct Connect with a public VIF to reach the S3 public endpoint'
            ],
            correctOptionIndex: 1,
            explanation: 'VPC Gateway Endpoints for S3 (and DynamoDB) are free, add a route to the VPC route table, and keep S3 traffic on the AWS network. There are no per-hour or per-GB charges. Interface Endpoints for S3 also exist but incur hourly and per-GB charges. NAT Gateways are costly and route S3 traffic over the internet. Direct Connect with a public VIF routes traffic over AWS backbone but requires Direct Connect, which is a significant cost.'
        },

        // ═══════════════════════════════════════════════════════════════════════
        // AWS CloudTrail
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'sec_q64',
            type: 'single',
            prompt: 'A company uses AWS Organizations and wants a single CloudTrail trail that captures management events from all current and future accounts in the organization, stored in a central S3 bucket. Which feature enables this?',
            options: [
                'Create a CloudTrail trail in each account pointing to the central S3 bucket',
                'Enable a CloudTrail Organization Trail from the management account or a delegated administrator account',
                'Enable AWS Config with a multi-account aggregator to collect all API events',
                'Use Amazon EventBridge to capture all API calls across the organization and forward to S3'
            ],
            correctOptionIndex: 1,
            explanation: 'A CloudTrail Organization Trail is created once in the management or delegated administrator account and automatically applies to all current and future member accounts in the Organization. All management events are logged to a central S3 bucket. Creating individual trails per account requires manual effort for each new account. AWS Config aggregates configuration data, not raw API event logs. EventBridge captures events but is not a CloudTrail replacement for comprehensive API logging.'
        },
        {
            id: 'sec_q65',
            type: 'single',
            prompt: 'A security team suspects that CloudTrail log files stored in S3 have been tampered with after delivery. How can they cryptographically verify the integrity of CloudTrail log files?',
            options: [
                'Enable S3 versioning on the CloudTrail bucket and compare object versions',
                'Enable CloudTrail log file validation — CloudTrail creates a signed digest file every hour that can be used to verify whether log files were modified or deleted',
                'Use Amazon Macie to scan the CloudTrail bucket for modified files',
                'Enable S3 Object Lock on the CloudTrail bucket with a 1-year compliance retention'
            ],
            correctOptionIndex: 1,
            explanation: 'CloudTrail log file validation creates a signed digest file (SHA-256 hash) every hour that references the log files delivered during that period. The AWS CLI command aws cloudtrail validate-logs uses these digest files to cryptographically verify that log files have not been modified, deleted, or forged after delivery. S3 versioning tracks changes but does not prove integrity — a file could be replaced with a new version. Macie detects sensitive data, not tampering. Object Lock prevents deletion but does not provide cryptographic integrity proof of log content.'
        },
        {
            id: 'sec_q66',
            type: 'single',
            prompt: 'A company needs to query CloudTrail events using SQL to investigate specific incidents, with the ability to retain and query 2 years of event history. Standard CloudTrail event history only retains 90 days. Which CloudTrail feature extends this?',
            options: [
                'Configure CloudTrail to deliver logs to S3 and query with Athena (no retention limit)',
                'Enable CloudTrail Lake — an event data store with configurable retention and native SQL querying',
                'Use CloudTrail Insights to retain anomalous API events for longer periods',
                'Enable AWS Config to capture all API events as configuration change history'
            ],
            correctOptionIndex: 1,
            explanation: 'CloudTrail Lake is a managed event data store that lets you retain CloudTrail events for up to 7 years and query them with SQL directly in the CloudTrail console or API — no separate S3, Glue, or Athena setup required. S3 + Athena also supports long-term retention and SQL querying but requires more operational setup. CloudTrail Insights detects unusual API activity but does not extend retention for all events. Config captures configuration states, not full API call logs.'
        },

        // ═══════════════════════════════════════════════════════════════════════
        // AWS STS / Temporary Credentials
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'sec_q67',
            type: 'single',
            prompt: 'A company uses STS AssumeRole to grant a third-party auditor temporary access. The auditor\'s role has broad read permissions. The security team wants to ensure that even within the assumed role, the auditor can only read from a specific S3 bucket during the session. How can the session permissions be restricted without changing the role\'s permission policy?',
            options: [
                'Create a new IAM role with narrower permissions and have the auditor assume that role instead',
                'Pass a session policy in the AssumeRole call to further restrict the auditor\'s effective permissions for that session',
                'Add a resource-based policy to the S3 bucket that denies access to the assumed role ARN for other buckets',
                'Enable IAM Access Analyzer to block access to non-approved buckets during the session'
            ],
            correctOptionIndex: 1,
            explanation: 'STS supports session policies — an optional IAM policy passed at role assumption time (via AssumeRole, AssumeRoleWithWebIdentity, etc.) that further restricts the effective permissions of the resulting session. The effective permissions are the intersection of the role\'s identity policy AND the session policy. This allows narrowing permissions per session without modifying the role itself. IAM Access Analyzer is an analysis tool, not a real-time access control. Resource-based policies on S3 would need to enumerate all other buckets to deny them.'
        },
        {
            id: 'sec_q68',
            type: 'single',
            prompt: 'A mobile application uses Amazon Cognito to authenticate users and then calls sts:AssumeRoleWithWebIdentity to obtain temporary AWS credentials. What is the principal benefit of using temporary credentials from STS over long-term IAM access keys?',
            options: [
                'Temporary credentials have higher API rate limits than long-term keys',
                'Temporary credentials automatically expire, minimizing the window of exposure if they are compromised',
                'Temporary credentials can only be used from the same AWS region where they were issued',
                'Temporary credentials do not require IAM permission policies and bypass all access controls'
            ],
            correctOptionIndex: 1,
            explanation: 'The primary security benefit of STS temporary credentials is that they have a defined expiration time (15 minutes to 12 hours for role sessions). If compromised, the attacker\'s access window is bounded by the credential TTL. Long-term access keys remain valid until explicitly rotated or deleted — a compromise can persist indefinitely without detection. Temporary credentials do not have higher rate limits, are not region-restricted, and are still subject to all IAM permission policies.'
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Multi-service Scenario Questions
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'sec_q69',
            type: 'multiple',
            prompt: 'A company is building a Zero Trust security architecture on AWS. Which TWO services directly enforce least-privilege access at the network and identity layers? (Choose 2)',
            options: [
                'AWS IAM with permission boundaries and resource-based policies scoped to specific principals',
                'Amazon VPC Security Groups with default-deny inbound and explicit allow rules per workload',
                'Amazon S3 with static website hosting and public read access',
                'AWS CloudTrail with log file validation enabled'
            ],
            correctOptionIndexes: [0, 1],
            explanation: 'Zero Trust enforces least privilege at every layer. IAM permission boundaries and resource policies enforce identity-level least privilege. VPC Security Groups with default-deny enforce network-level least privilege. S3 public access is the opposite of least privilege. CloudTrail log validation is a detective integrity control, not a preventive least-privilege enforcement.'
        },
        {
            id: 'sec_q70',
            type: 'single',
            prompt: 'An application on EC2 in a private subnet must access DynamoDB and call the STS API. The company has no NAT Gateway and wants traffic to stay on the AWS private network. What is required?',
            options: [
                'Create a VPC Gateway Endpoint for DynamoDB and a VPC Interface Endpoint for STS',
                'Create a VPC Interface Endpoint for both DynamoDB and STS',
                'Create a VPC Gateway Endpoint for both DynamoDB and STS',
                'Create a VPC Gateway Endpoint for DynamoDB; STS calls use the public internet by default and cannot be privately routed'
            ],
            correctOptionIndex: 0,
            explanation: 'DynamoDB supports VPC Gateway Endpoints (free, route-table based). STS supports VPC Interface Endpoints (PrivateLink, hourly + data charges). Using both allows the EC2 instance to access DynamoDB and STS without a NAT Gateway or internet gateway. Gateway Endpoints are only available for S3 and DynamoDB — STS must use an Interface Endpoint. It is incorrect that STS cannot be privately routed; an Interface Endpoint enables this.'
        },
        {
            id: 'sec_q71',
            type: 'single',
            prompt: 'A company\'s security review finds that CloudTrail is logging all API activity, but a malicious insider could still cover their tracks by deleting the CloudTrail logs from S3. What is the BEST defense-in-depth configuration to prevent this?',
            options: [
                'Enable MFA Delete on the CloudTrail S3 bucket and use S3 Object Lock with a compliance retention policy',
                'Encrypt CloudTrail logs with a KMS CMK to prevent unauthorized reads',
                'Enable S3 versioning so deleted objects can be restored',
                'Restrict s3:DeleteObject permissions on the CloudTrail bucket to the root user only'
            ],
            correctOptionIndex: 0,
            explanation: 'The strongest defense combines: (1) S3 Object Lock with Compliance mode — prevents any user including root from deleting or overwriting logs before the retention period expires, and (2) MFA Delete — requires MFA authentication to delete object versions or change versioning state. Together these make log tampering extremely difficult. KMS encryption prevents reading logs but not deleting them. S3 versioning alone does not prevent deletion of all versions. Restricting DeleteObject to root still allows the root account to delete logs, which Object Lock Compliance mode prevents.'
        },
        {
            id: 'sec_q72',
            type: 'single',
            prompt: 'A startup stores API keys in Lambda environment variables. After remediation to Secrets Manager, the team also wants to cache secret values in memory to avoid calling the Secrets Manager API on every Lambda invocation (to reduce latency and cost). What is the AWS-recommended approach?',
            options: [
                'Cache the secret in an S3 bucket and fetch it once per day',
                'Use the AWS Parameters and Secrets Lambda Extension, which caches secrets locally in the Lambda execution environment',
                'Store the secret in a global Python/Node variable and refresh it via a scheduled EventBridge event',
                'Use ElastiCache Redis to cache secrets and share them across Lambda instances'
            ],
            correctOptionIndex: 1,
            explanation: 'The AWS Parameters and Secrets Lambda Extension is a Lambda layer that provides a local HTTP endpoint within the execution environment. Lambda functions retrieve secrets from this local cache (with configurable TTL) instead of calling Secrets Manager directly. This reduces API call frequency, latency, and cost. The extension handles background refresh before TTL expiry. A global variable approach works but does not handle rotation gracefully. ElastiCache is overkill and introduces additional attack surface for secrets. S3 caching lacks rotation integration.'
        },
        {
            id: 'sec_q73',
            type: 'multiple',
            prompt: 'A company is designing a security architecture for a new multi-account AWS environment. Which TWO services form the foundation of a well-architected detection and response strategy? (Choose 2)',
            options: [
                'Amazon GuardDuty — threat detection analyzing CloudTrail, VPC Flow Logs, and DNS logs for malicious activity',
                'AWS CloudTrail — API activity logging providing the event history that all other security services depend on',
                'Amazon Route 53 — DNS service providing low-latency resolution for security tooling',
                'AWS Elastic Beanstalk — application platform that automatically patches underlying EC2 instances'
            ],
            correctOptionIndexes: [0, 1],
            explanation: 'CloudTrail is the foundational audit logging service — it records all API calls and is the data source for GuardDuty, Detective, Audit Manager, and Security Hub. Without CloudTrail, most detective controls have no data to work with. GuardDuty provides automated threat detection using ML on CloudTrail, VPC Flow Logs, and DNS data. Together they form the detection backbone. Route 53 and Elastic Beanstalk are infrastructure services, not core security detection services.'
        },
        {
            id: 'sec_q74',
            type: 'single',
            prompt: 'A company has enabled AWS Config and wants to automatically remediate all S3 buckets that do not have server-side encryption enabled, without any manual intervention. What is the MOST operationally efficient configuration?',
            options: [
                'Use Amazon EventBridge to detect Config NON_COMPLIANT events and trigger a Lambda that enables encryption',
                'Configure an AWS Config rule (s3-bucket-server-side-encryption-enabled) with automatic remediation using an SSM Automation document that enables S3 default encryption',
                'Schedule a daily Lambda function that queries all S3 buckets and enables encryption on non-compliant ones',
                'Use AWS Security Hub with auto-remediation scripts deployed via CloudFormation'
            ],
            correctOptionIndex: 1,
            explanation: 'AWS Config supports automatic remediation directly — you can attach an SSM Automation document (AWS-ConfigureS3BucketLogging or a custom runbook) to a Config rule that triggers automatically when a resource is evaluated as NON_COMPLIANT. This is the most operationally efficient pattern: Config detects the violation and SSM remediates it immediately, all within AWS managed services. EventBridge + Lambda also works but requires more custom code. Scheduled Lambda functions introduce delay between violation and remediation.'
        },
        {
            id: 'sec_q75',
            type: 'single',
            prompt: 'A solutions architect needs to ensure that an Amazon RDS database in a private subnet is only accessible from specific EC2 application servers, and that no traffic can reach it from the internet or other parts of the VPC. What is the MINIMUM set of controls required?',
            options: [
                'Place the RDS instance in a public subnet with a Security Group that allows only the app server SG',
                'Place the RDS instance in a private subnet with a Security Group that allows the database port only from the app server\'s Security Group, and a NACL that blocks all other inbound traffic to the subnet',
                'Place the RDS instance in a private subnet with a Security Group that allows the database port only from the app server\'s Security Group',
                'Place the RDS instance in a private subnet and add a bucket policy to block internet access'
            ],
            correctOptionIndex: 2,
            explanation: 'A private subnet (no route to an internet gateway) combined with a Security Group allowing only the database port from the specific application server Security Group is the minimum correct configuration. This ensures only app servers can reach RDS. A NACL can add defense-in-depth but is not required — the Security Group already blocks all other traffic. A public subnet would expose the RDS endpoint to the internet even with a restrictive SG. Bucket policies are S3 concepts and do not apply to RDS.'
        }
    ]
};
