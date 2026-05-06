export interface StudyResource {
  service: string;
  url: string;
}

export interface ResourceCategory {
  category: string;
  icon: string;
  resources: StudyResource[];
}

const BLOG_BASE = '';

export const resourceCategories: ResourceCategory[] = [
  {
    category: 'Analytics',
    icon: '📈',
    resources: [
      { service: 'Amazon Athena', url: `` },
      { service: 'AWS Data Exchange', url: `${BLOG_BASE}/aws-data-exchange` },
      { service: 'Amazon Data Firehose', url: `${BLOG_BASE}/amazon-data-firehose` },
      { service: 'Amazon EMR', url: `${BLOG_BASE}/amazon-emr` },
      { service: 'AWS Glue', url: `${BLOG_BASE}/aws-glue` },
      { service: 'Amazon Kinesis', url: `${BLOG_BASE}/amazon-kinesis` },
      { service: 'AWS Lake Formation', url: `${BLOG_BASE}/aws-lake-formation` },
      { service: 'Amazon MSK', url: `${BLOG_BASE}/amazon-msk` },
      { service: 'Amazon OpenSearch Service', url: `${BLOG_BASE}/amazon-opensearch` },
      { service: 'Amazon QuickSight', url: `${BLOG_BASE}/amazon-quicksight` },
      { service: 'Amazon Redshift', url: `${BLOG_BASE}/amazon-redshift` },
    ],
  },
  {
    category: 'Application Integration',
    icon: '🔗',
    resources: [
      { service: 'Amazon AppFlow', url: `${BLOG_BASE}/amazon-appflow` },
      { service: 'AWS AppSync', url: `${BLOG_BASE}/aws-appsync` },
      { service: 'Amazon EventBridge', url: `${BLOG_BASE}/amazon-eventbridge` },
      { service: 'Amazon MQ', url: `${BLOG_BASE}/amazon-mq` },
      { service: 'Amazon SNS', url: `${BLOG_BASE}/amazon-sns` },
      { service: 'Amazon SQS', url: `${BLOG_BASE}/amazon-sqs` },
      { service: 'AWS Step Functions', url: `${BLOG_BASE}/aws-step-functions` },
    ],
  },
  {
    category: 'AWS Cost Management',
    icon: '💰',
    resources: [
      { service: 'AWS Budgets', url: `${BLOG_BASE}/aws-budgets` },
      { service: 'AWS Cost and Usage Report', url: `${BLOG_BASE}/aws-cost-usage-report` },
      { service: 'AWS Cost Explorer', url: `${BLOG_BASE}/aws-cost-explorer` },
      { service: 'Savings Plans', url: `${BLOG_BASE}/aws-savings-plans` },
    ],
  },
  {
    category: 'Compute',
    icon: '⚙️',
    resources: [
      { service: 'AWS Batch', url: `${BLOG_BASE}/aws-batch` },
      { service: 'Amazon EC2', url: `${BLOG_BASE}/amazon-ec2` },
      { service: 'Amazon EC2 Auto Scaling', url: `${BLOG_BASE}/ec2-auto-scaling` },
      { service: 'AWS Elastic Beanstalk', url: `${BLOG_BASE}/elastic-beanstalk` },
      { service: 'AWS Outposts', url: `${BLOG_BASE}/aws-outposts` },
      { service: 'AWS Serverless Application Repository', url: `${BLOG_BASE}/serverless-application-repository` },
      { service: 'VMware Cloud on AWS', url: `${BLOG_BASE}/vmware-cloud-aws` },
      { service: 'AWS Wavelength', url: `${BLOG_BASE}/aws-wavelength` },
    ],
  },
  {
    category: 'Containers',
    icon: '🐳',
    resources: [
      { service: 'Amazon ECR', url: `https://medium.com/expertminds/aws-container-services-ecr-ecs-eks-and-beyond-0a75f02cb28a` },
      { service: 'Amazon ECS', url: `https://medium.com/expertminds/aws-container-services-ecr-ecs-eks-and-beyond-0a75f02cb28a` },
      { service: 'Amazon ECS Anywhere', url: `https://medium.com/expertminds/aws-container-services-ecr-ecs-eks-and-beyond-0a75f02cb28a` },
      { service: 'Amazon EKS', url: `https://medium.com/expertminds/aws-container-services-ecr-ecs-eks-and-beyond-0a75f02cb28a` },
      { service: 'Amazon EKS Anywhere', url: `https://medium.com/expertminds/aws-container-services-ecr-ecs-eks-and-beyond-0a75f02cb28a` },
      { service: 'Amazon EKS Distro', url: `https://medium.com/expertminds/aws-container-services-ecr-ecs-eks-and-beyond-0a75f02cb28a` },
    ],
  },
  {
    category: 'Database',
    icon: '🛢️',
    resources: [
      { service: 'Amazon Aurora', url: `https://medium.com/expertminds/aws-databases-when-and-why-to-use-each-service-8a6f38b9b704` },
      { service: 'Amazon Aurora Serverless',url: `https://medium.com/expertminds/aws-databases-when-and-why-to-use-each-service-8a6f38b9b704` },
      { service: 'Amazon DocumentDB', url: `https://medium.com/expertminds/aws-databases-when-and-why-to-use-each-service-8a6f38b9b704` },
      { service: 'Amazon DynamoDB', url: `https://medium.com/expertminds/aws-databases-when-and-why-to-use-each-service-8a6f38b9b704` },
      { service: 'Amazon ElastiCache', url: `https://medium.com/expertminds/aws-databases-when-and-why-to-use-each-service-8a6f38b9b704` },
      { service: 'Amazon Keyspaces', url: `https://medium.com/expertminds/aws-databases-when-and-why-to-use-each-service-8a6f38b9b704` },
      { service: 'Amazon Neptune', url: `https://medium.com/expertminds/aws-databases-when-and-why-to-use-each-service-8a6f38b9b704` },
      { service: 'Amazon RDS', url: `https://medium.com/expertminds/aws-databases-when-and-why-to-use-each-service-8a6f38b9b704` },
      { service: 'Amazon Redshift', url: `https://medium.com/expertminds/aws-databases-when-and-why-to-use-each-service-8a6f38b9b704` },
    ],
  },
  {
    category: 'Developer Tools',
    icon: '🛠️',
    resources: [
      { service: 'AWS X-Ray', url: `https://github.com/Amitpnk/AWS-Solutions-Architect-Associate-Exam/blob/main/README.md#aws-x-ray` },
    ],
  },
  {
    category: 'Front-End Web and Mobile',
    icon: '📱',
    resources: [
      { service: 'AWS Amplify', url: `${BLOG_BASE}/aws-amplify` },
      { service: 'Amazon API Gateway', url: `${BLOG_BASE}/amazon-api-gateway` },
      { service: 'AWS Device Farm', url: `${BLOG_BASE}/aws-device-farm` },
    ],
  },
  {
    category: 'Machine Learning',
    icon: '🤖',
    resources: [
      { service: 'Amazon Comprehend', url: `${BLOG_BASE}/amazon-comprehend` },
      { service: 'Amazon Kendra', url: `${BLOG_BASE}/amazon-kendra` },
      { service: 'Amazon Lex', url: `${BLOG_BASE}/amazon-lex` },
      { service: 'Amazon Polly', url: `${BLOG_BASE}/amazon-polly` },
      { service: 'Amazon Rekognition', url: `${BLOG_BASE}/amazon-rekognition` },
      { service: 'Amazon SageMaker AI', url: `${BLOG_BASE}/amazon-sagemaker` },
      { service: 'Amazon Textract', url: `${BLOG_BASE}/amazon-textract` },
      { service: 'Amazon Transcribe', url: `${BLOG_BASE}/amazon-transcribe` },
      { service: 'Amazon Translate', url: `${BLOG_BASE}/amazon-translate` },
    ],
  },
  {
    category: 'Management and Governance',
    icon: '🏛️',
    resources: [
      { service: 'AWS Auto Scaling', url: `${BLOG_BASE}/aws-auto-scaling` },
      { service: 'AWS CLI', url: `${BLOG_BASE}/aws-cli` },
      { service: 'AWS CloudFormation', url: `${BLOG_BASE}/aws-cloudformation` },
      { service: 'AWS CloudTrail', url: `${BLOG_BASE}/aws-cloudtrail` },
      { service: 'Amazon CloudWatch', url: `${BLOG_BASE}/amazon-cloudwatch` },
      { service: 'AWS Compute Optimizer', url: `${BLOG_BASE}/aws-compute-optimizer` },
      { service: 'AWS Config', url: `${BLOG_BASE}/aws-config` },
      { service: 'AWS Control Tower', url: `${BLOG_BASE}/aws-control-tower` },
      { service: 'AWS Health Dashboard', url: `${BLOG_BASE}/aws-health-dashboard` },
      { service: 'AWS License Manager', url: `${BLOG_BASE}/aws-license-manager` },
      { service: 'Amazon Managed Grafana', url: `${BLOG_BASE}/amazon-managed-grafana` },
      { service: 'Amazon Managed Service for Prometheus', url: `${BLOG_BASE}/amazon-managed-prometheus` },
      { service: 'AWS Management Console', url: `${BLOG_BASE}/aws-management-console` },
      { service: 'AWS Organizations', url: `${BLOG_BASE}/aws-organizations` },
      { service: 'AWS Service Catalog', url: `${BLOG_BASE}/aws-service-catalog` },
      { service: 'AWS Systems Manager', url: `${BLOG_BASE}/aws-systems-manager` },
      { service: 'AWS Trusted Advisor', url: `${BLOG_BASE}/aws-trusted-advisor` },
      { service: 'AWS Well-Architected Tool', url: `${BLOG_BASE}/aws-well-architected-tool` },
    ],
  },
  {
    category: 'Media Services',
    icon: '🎬',
    resources: [
      { service: 'Amazon Elastic Transcoder', url: `${BLOG_BASE}/amazon-elastic-transcoder` },
      { service: 'Amazon Kinesis Video Streams', url: `${BLOG_BASE}/kinesis-video-streams` },
    ],
  },
  {
    category: 'Migration and Transfer',
    icon: '🚚',
    resources: [
      { service: 'AWS Application Migration Service', url: `${BLOG_BASE}/aws-application-migration-service` },
      { service: 'AWS DataSync', url: `${BLOG_BASE}/aws-datasync` },
      { service: 'AWS DMS', url: `${BLOG_BASE}/aws-dms` },
      { service: 'AWS Snow Family', url: `${BLOG_BASE}/aws-snow-family` },
      { service: 'AWS Transfer Family', url: `${BLOG_BASE}/aws-transfer-family` },
    ],
  },
  {
    category: 'Networking and Content Delivery',
    icon: '🌐',
    resources: [
      { service: 'AWS Client VPN', url: `${BLOG_BASE}/aws-client-vpn` },
      { service: 'Amazon CloudFront', url: `${BLOG_BASE}/amazon-cloudfront` },
      { service: 'AWS Direct Connect', url: `${BLOG_BASE}/aws-direct-connect` },
      { service: 'Elastic Load Balancing', url: `${BLOG_BASE}/elastic-load-balancing` },
      { service: 'AWS Global Accelerator', url: `${BLOG_BASE}/aws-global-accelerator` },
      { service: 'AWS PrivateLink', url: `${BLOG_BASE}/aws-privatelink` },
      { service: 'Amazon Route 53', url: `${BLOG_BASE}/amazon-route-53` },
      { service: 'AWS Site-to-Site VPN', url: `${BLOG_BASE}/site-to-site-vpn` },
      { service: 'AWS Transit Gateway', url: `${BLOG_BASE}/aws-transit-gateway` },
      { service: 'Amazon VPC', url: `${BLOG_BASE}/amazon-vpc` },
    ],
  },
  {
    category: 'Security, Identity, and Compliance',
    icon: '🔒',
    resources: [
      { service: 'AWS Artifact', url: `${BLOG_BASE}/aws-artifact` },
      { service: 'AWS Audit Manager', url: `${BLOG_BASE}/aws-audit-manager` },
      { service: 'AWS Certificate Manager', url: `${BLOG_BASE}/aws-certificate-manager` },
      { service: 'AWS CloudHSM', url: `${BLOG_BASE}/aws-cloudhsm` },
      { service: 'Amazon Cognito', url: `${BLOG_BASE}/amazon-cognito` },
      { service: 'Amazon Detective', url: `${BLOG_BASE}/amazon-detective` },
      { service: 'AWS Directory Service', url: `${BLOG_BASE}/aws-directory-service` },
      { service: 'AWS Firewall Manager', url: `${BLOG_BASE}/aws-firewall-manager` },
      { service: 'Amazon GuardDuty', url: `${BLOG_BASE}/amazon-guardduty` },
      { service: 'AWS IAM Identity Center', url: `${BLOG_BASE}/iam-identity-center` },
      { service: 'Amazon Inspector', url: `${BLOG_BASE}/amazon-inspector` },
      { service: 'AWS KMS', url: `${BLOG_BASE}/aws-kms` },
      { service: 'Amazon Macie', url: `${BLOG_BASE}/amazon-macie` },
      { service: 'AWS Network Firewall', url: `${BLOG_BASE}/aws-network-firewall` },
      { service: 'AWS Resource Access Manager', url: `${BLOG_BASE}/aws-resource-access-manager` },
      { service: 'AWS Secrets Manager', url: `${BLOG_BASE}/aws-secrets-manager` },
      { service: 'AWS Security Hub', url: `${BLOG_BASE}/aws-security-hub` },
      { service: 'AWS Shield', url: `${BLOG_BASE}/aws-shield` },
      { service: 'AWS WAF', url: `${BLOG_BASE}/aws-waf` },
      { service: 'IAM', url: `${BLOG_BASE}/aws-iam` },
    ],
  },
  {
    category: 'Serverless',
    icon: '⚡',
    resources: [
      { service: 'AWS AppSync', url: `${BLOG_BASE}/aws-appsync` },
      { service: 'AWS Fargate', url: `${BLOG_BASE}/aws-fargate` },
      { service: 'AWS Lambda', url: `${BLOG_BASE}/aws-lambda` },
    ],
  },
  {
    category: 'Storage',
    icon: '🗄️',
    resources: [
      { service: 'AWS Backup', url: `${BLOG_BASE}/aws-backup` },
      { service: 'Amazon EBS', url: `${BLOG_BASE}/amazon-ebs` },
      { service: 'Amazon EFS', url: `${BLOG_BASE}/amazon-efs` },
      { service: 'Amazon FSx', url: `${BLOG_BASE}/amazon-fsx` },
      { service: 'Amazon S3', url: `${BLOG_BASE}/amazon-s3` },
      { service: 'Amazon S3 Glacier', url: `${BLOG_BASE}/amazon-s3-glacier` },
      { service: 'AWS Storage Gateway', url: `${BLOG_BASE}/aws-storage-gateway` },
    ],
  },
];
