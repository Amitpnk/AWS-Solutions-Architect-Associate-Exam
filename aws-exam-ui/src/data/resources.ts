export interface StudyResource {
  service: string;
  url: string; 
}

export interface ResourceCategory {
  category: string;
  icon: string;
  resources: StudyResource[];
}

const BLOG_BASE = 'https://medium.com/'; 

export const resourceCategories: ResourceCategory[] = [
  {
    category: 'Compute',
    icon: '⚙️',
    resources: [
      { service: 'EC2', url: `${BLOG_BASE}/ec2` },
      { service: 'Lambda', url: `${BLOG_BASE}/lambda` },
      { service: 'ECS & EKS', url: `${BLOG_BASE}/ecs-eks` },
      { service: 'Elastic Beanstalk', url: `${BLOG_BASE}/elastic-beanstalk` },
      { service: 'Auto Scaling', url: `${BLOG_BASE}/auto-scaling` },
    ],
  },
  {
    category: 'Storage',
    icon: '🗄️',
    resources: [
      { service: 'S3', url: `${BLOG_BASE}/s3` },
      { service: 'EBS', url: `${BLOG_BASE}/ebs` },
      { service: 'EFS', url: `${BLOG_BASE}/efs` },
      { service: 'S3 Glacier', url: `${BLOG_BASE}/s3-glacier` },
      { service: 'AWS Backup', url: `${BLOG_BASE}/aws-backup` },
    ],
  },
  {
    category: 'Database',
    icon: '🛢️',
    resources: [
      { service: 'RDS', url: `${BLOG_BASE}/rds` },
      { service: 'Aurora', url: `${BLOG_BASE}/aurora` },
      { service: 'DynamoDB', url: `${BLOG_BASE}/dynamodb` },
      { service: 'ElastiCache', url: `${BLOG_BASE}/elasticache` },
      { service: 'Redshift', url: `${BLOG_BASE}/redshift` },
    ],
  },
  {
    category: 'Networking & CDN',
    icon: '🌐',
    resources: [
      { service: 'VPC', url: `${BLOG_BASE}/vpc` },
      { service: 'Route 53', url: `${BLOG_BASE}/route-53` },
      { service: 'CloudFront', url: `${BLOG_BASE}/cloudfront` },
      { service: 'API Gateway', url: `${BLOG_BASE}/api-gateway` },
      { service: 'ELB & ALB', url: `${BLOG_BASE}/elb-alb` },
      { service: 'Global Accelerator', url: `${BLOG_BASE}/global-accelerator` },
    ],
  },
  {
    category: 'Security & Identity',
    icon: '🔒',
    resources: [
      { service: 'IAM', url: `${BLOG_BASE}/iam` },
      { service: 'KMS', url: `${BLOG_BASE}/kms` },
      { service: 'Cognito', url: `${BLOG_BASE}/cognito` },
      { service: 'WAF & Shield', url: `${BLOG_BASE}/waf-shield` },
      { service: 'Secrets Manager', url: `${BLOG_BASE}/secrets-manager` },
    ],
  },
  {
    category: 'Monitoring & Logging',
    icon: '📊',
    resources: [
      { service: 'CloudWatch', url: `${BLOG_BASE}/cloudwatch` },
      { service: 'CloudTrail', url: `${BLOG_BASE}/cloudtrail` },
      { service: 'AWS X-Ray', url: `${BLOG_BASE}/xray` },
      { service: 'AWS Config', url: `${BLOG_BASE}/aws-config` },
    ],
  },
  {
    category: 'Messaging & Integration',
    icon: '📨',
    resources: [
      { service: 'SQS', url: `${BLOG_BASE}/sqs` },
      { service: 'SNS', url: `${BLOG_BASE}/sns` },
      { service: 'EventBridge', url: `${BLOG_BASE}/eventbridge` },
      { service: 'Step Functions', url: `${BLOG_BASE}/step-functions` },
      { service: 'Kinesis', url: `${BLOG_BASE}/kinesis` },
    ],
  },
  {
    category: 'Migration & Transfer',
    icon: '🚚',
    resources: [
      { service: 'Snowball / Snowflake', url: `${BLOG_BASE}/snowball` },
      { service: 'DMS', url: `${BLOG_BASE}/dms` },
      { service: 'Server Migration Service', url: `${BLOG_BASE}/sms` },
    ],
  },
];
