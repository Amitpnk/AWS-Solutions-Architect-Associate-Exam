import type { ExamDefinition } from './types';

export const examCloudFront: ExamDefinition = {
    "id": "exam_cloudfront_globalaccelerator_saa_c03",
    "title": "SAA-C03 Practice Set on CloudFront and AWS Global Accelerator",
    "description": "Comprehensive exam questions covering CloudFront CDN, cache behaviors, origins (S3, ALB, EC2), geo-restriction, cache invalidation, TTL, and AWS Global Accelerator for global acceleration and DDoS protection",
    "durationSeconds": 7800,
    "questions": [
        {
            "id": "q1",
            "type": "multiple",
            "prompt": "A company needs to deliver static content globally with low latency and high performance. Which solutions should be evaluated? (Choose two.)",
            "options": [
                "CloudFront distribution with S3 origin for global edge caching",
                "AWS Global Accelerator with EC2 instances in multiple regions",
                "S3 cross-region replication for geo-redundancy",
                "CloudFront with ALB origin for dynamic content delivery"
            ],
            "correctOptionIndexes": [0, 3],
            "explanation": "CloudFront with S3 is ideal for static content caching at edge locations. CloudFront with ALB handles dynamic content. Global Accelerator is for optimizing application performance and DDoS protection, not just static content. S3 replication doesn't provide CDN edge caching benefits."
        },
        {
            "id": "q2",
            "type": "single",
            "prompt": "What is the primary difference between CloudFront and AWS Global Accelerator?",
            "options": [
                "CloudFront caches content; Global Accelerator routes traffic based on proximity",
                "CloudFront is a CDN for content delivery; Global Accelerator optimizes TCP/UDP traffic routing",
                "CloudFront is for static content only; Global Accelerator is for applications",
                "Global Accelerator has more edge locations than CloudFront"
            ],
            "correctOptionIndex": 1,
            "explanation": "CloudFront caches and delivers content from edge locations. Global Accelerator uses edge locations to route traffic optimally to application origins using Anycast. Both serve different purposes: CDN vs. global application acceleration."
        },
        {
            "id": "q3",
            "type": "multiple",
            "prompt": "A video streaming company wants to serve content to users worldwide with the lowest latency. Which CloudFront features should be leveraged? (Choose two.)",
            "options": [
                "CloudFront edge locations (200+ globally) for content caching near users",
                "TTL settings optimized for video content (typically longer TTL)",
                "Cache Invalidation for instant content updates",
                "Origin Shield for additional caching layer before origin"
            ],
            "correctOptionIndexes": [0, 3],
            "explanation": "Edge locations provide global coverage for low latency. Origin Shield adds protection and additional caching but increases cost. Longer TTL helps video (less frequent updates). Cache Invalidation is for updates, not latency optimization."
        },
        {
            "id": "q4",
            "type": "single",
            "prompt": "You create a CloudFront distribution with an S3 bucket as the origin. To improve security, what should be configured?",
            "options": [
                "S3 bucket policy allowing public read access",
                "S3 Block Public Access settings enabled with CloudFront Origin Access Identity (OAI)",
                "S3 encryption enabled (does not restrict access)",
                "CloudFront public IP whitelist in S3"
            ],
            "correctOptionIndex": 1,
            "explanation": "Origin Access Identity (OAI) allows CloudFront to access S3 privately while blocking direct S3 access. Block Public Access prevents accidental public exposure. Bucket policy for public access defeats the purpose of using OAI. S3 encryption is separate from access control."
        },
        {
            "id": "q5",
            "type": "multiple",
            "prompt": "A CloudFront distribution is configured with multiple origins (S3, ALB, custom origin). Which behaviors determine how requests are routed? (Choose two.)",
            "options": [
                "Cache behaviors based on URL path patterns to route to appropriate origins",
                "Default behavior specifies the fallback origin",
                "Origin selection based on user geographic location",
                "Cache behaviors configured with TTL, compression, and headers"
            ],
            "correctOptionIndexes": [0, 3],
            "explanation": "Cache behaviors use path patterns (/*.jpg → S3, /api/* → ALB). Default behavior is the fallback. Cache behaviors also configure caching settings. Geographic routing is done via CloudFront functions or Route 53, not cache behaviors."
        },
        {
            "id": "q6",
            "type": "single",
            "prompt": "CloudFront caches an object with TTL of 3600 seconds. You update the object in the S3 origin. When will users see the updated content?",
            "options": [
                "Immediately",
                "Within 3600 seconds (when TTL expires)",
                "After CloudFront detects the change",
                "Never (until distribution is redeployed)"
            ],
            "correctOptionIndex": 1,
            "explanation": "CloudFront respects TTL values. Cached content is served until TTL expires and a new request retrieves the updated content. This is why cache invalidation exists for immediate updates."
        },
        {
            "id": "q7",
            "type": "multiple",
            "prompt": "A company implements CloudFront geo-restriction to comply with content licensing agreements. Which configurations are available? (Choose two.)",
            "options": [
                "Whitelist specific countries where content can be accessed",
                "Blacklist specific countries to block content access",
                "Restrict access based on user IP addresses",
                "Restrict access based on user subscription level"
            ],
            "correctOptionIndexes": [0, 1],
            "explanation": "CloudFront geo-restriction allows whitelist (allow only specified countries) and blacklist (block specified countries) configurations. IP-based and subscription restrictions require custom logic (Lambda@Edge). Geo-restriction uses IP geolocation data."
        },
        {
            "id": "q8",
            "type": "single",
            "prompt": "You need to invalidate specific objects in a CloudFront distribution. What is the cost implication?",
            "options": [
                "First 3,000 invalidations per month are free; additional invalidations are charged",
                "All invalidations are free",
                "Each invalidation is charged at $0.005 per file path",
                "Invalidations are only available for paid CloudFront plans"
            ],
            "correctOptionIndex": 0,
            "explanation": "CloudFront provides 3,000 free invalidation requests per month. Additional invalidations incur charges. This makes it important to plan invalidation strategies carefully."
        },
        {
            "id": "q9",
            "type": "multiple",
            "prompt": "A web application uses CloudFront with ALB as the origin. Which configurations optimize performance? (Choose two.)",
            "options": [
                "Enable Origin Shield for additional protection and caching layer",
                "Configure custom headers to control caching behavior",
                "Increase CloudFront TTL for dynamic content (API responses)",
                "Enable HTTP/2 between CloudFront and origin for faster connections"
            ],
            "correctOptionIndexes": [0, 3],
            "explanation": "Origin Shield adds caching protection (useful for dynamic content). HTTP/2 improves performance between CloudFront and origin. Custom headers control behavior. Long TTL for dynamic content defeats the purpose (it changes frequently)."
        },
        {
            "id": "q10",
            "type": "single",
            "prompt": "CloudFront distribution is configured with Origin Shield enabled. What is the primary benefit?",
            "options": [
                "Reduces latency for users (faster downloads)",
                "Provides additional caching layer between CloudFront edge and origin",
                "Automatically invalidates cache when origin updates",
                "Encrypts traffic between CloudFront and origin"
            ],
            "correctOptionIndex": 1,
            "explanation": "Origin Shield is an additional caching layer that reduces origin load and cache misses. It doesn't reduce user latency directly but improves overall performance. It's useful for dynamic content and protecting origins from traffic spikes."
        },
        {
            "id": "q11",
            "type": "multiple",
            "prompt": "A company experiences cache misses during traffic spikes, overloading the origin. Which CloudFront optimizations help reduce this? (Choose two.)",
            "options": [
                "Increase CloudFront TTL for longer caching duration",
                "Enable Origin Shield for additional caching layer",
                "Use CloudFront functions to modify request/response headers",
                "Configure minimum TTL to ensure content is cached longer"
            ],
            "correctOptionIndexes": [1, 3],
            "explanation": "Origin Shield absorbs traffic spikes with additional caching. Minimum TTL ensures even short-lived content is cached. Longer TTL helps but requires managing stale content. CloudFront functions don't reduce cache misses."
        },
        {
            "id": "q12",
            "type": "single",
            "prompt": "You configure a CloudFront distribution with CNAME alias (example.com). What is required?",
            "options": [
                "CloudFront distribution DNS name (e.g., d123.cloudfront.net)",
                "SSL/TLS certificate for example.com in AWS Certificate Manager (ACM)",
                "S3 bucket named example.com",
                "Route 53 hosted zone (required)"
            ],
            "correctOptionIndex": 1,
            "explanation": "Using CNAME with CloudFront requires an ACM SSL/TLS certificate. The distribution has a default CloudFront DNS name, but CNAME allows custom domain. S3 bucket naming and Route 53 are not required (though Route 53 is recommended for DNS)."
        },
        {
            "id": "q13",
            "type": "multiple",
            "prompt": "AWS Global Accelerator is configured for an application with endpoints in multiple regions. Which benefits are provided? (Choose two.)",
            "options": [
                "Improved application availability with automatic failover to healthy endpoints",
                "DDoS protection through AWS Shield Standard (always included)",
                "Optimal routing using TCP/UDP instead of HTTP",
                "Global IP address that anycast traffic to nearest endpoint"
            ],
            "correctOptionIndexes": [0, 3],
            "explanation": "Global Accelerator provides automatic failover and uses Anycast IP addressing to route to nearest endpoint. DDoS protection requires AWS Shield Standard (included but is basic). Global Accelerator works at Layer 4 (TCP/UDP), not Layer 7."
        },
        {
            "id": "q14",
            "type": "single",
            "prompt": "How many global IP addresses does AWS Global Accelerator provide?",
            "options": [
                "1 global IP address",
                "2 global static IP addresses",
                "4 global IP addresses",
                "Depends on number of endpoints"
            ],
            "correctOptionIndex": 1,
            "explanation": "AWS Global Accelerator provides exactly 2 global static IP addresses using Anycast. These IPs are geographically distributed and route to your endpoints based on proximity."
        },
        {
            "id": "q15",
            "type": "multiple",
            "prompt": "A CloudFront distribution needs to cache different versions of content based on request headers. Which features enable this? (Choose two.)",
            "options": [
                "Forward custom headers to origin for cache key variation",
                "Query string forwarding (CloudFront uses as part of cache key)",
                "Cache based on cookies for session-specific content",
                "Use CloudFront functions to add versioning headers"
            ],
            "correctOptionIndexes": [0, 2],
            "explanation": "CloudFront cache key can include custom headers and cookies. Query strings can also be part of cache key. CloudFront functions modify requests but don't create cache variations. These allow serving different cached versions for different users/sessions."
        },
        {
            "id": "q16",
            "type": "single",
            "prompt": "You need to use CloudFront with a custom origin (non-AWS HTTP server). What is required?",
            "options": [
                "Origin must be publicly accessible on the internet",
                "Custom origin security group must allow HTTPS from CloudFront",
                "Origin must be in an AWS region",
                "Origin requires a VPN connection to CloudFront"
            ],
            "correctOptionIndex": 0,
            "explanation": "Custom origins must be publicly accessible (CloudFront is outside your VPC). AWS origins (ALB, EC2) can be private with appropriate security groups. Custom origins don't need to be in AWS or have VPN."
        },
        {
            "id": "q17",
            "type": "multiple",
            "prompt": "CloudFront is configured with Lambda@Edge to modify requests/responses. Which use cases are appropriate? (Choose two.)",
            "options": [
                "Rewrite URLs based on user location (geolocation)",
                "Add custom headers to requests sent to origin",
                "Decrypt CloudFront traffic (not recommended)",
                "Serve different content based on device type (mobile vs desktop)"
            ],
            "correctOptionIndexes": [0, 3],
            "explanation": "Lambda@Edge can modify requests (add headers, rewrite URLs) and responses (serve different content). It runs at edge locations. Decryption at edges reduces security benefits. Lambda@Edge is ideal for location/device-based logic."
        },
        {
            "id": "q18",
            "type": "single",
            "prompt": "A CloudFront distribution experiences high cache miss ratio. Which metric should be investigated?",
            "options": [
                "CloudFront request count",
                "Cache hit ratio (percentage of requests served from cache)",
                "Origin latency",
                "Bandwidth consumption"
            ],
            "correctOptionIndex": 1,
            "explanation": "Cache hit ratio indicates the percentage of requests served from CloudFront cache vs. origin. Low ratio means frequent cache misses. Request count, origin latency, and bandwidth are separate metrics."
        },
        {
            "id": "q19",
            "type": "multiple",
            "prompt": "AWS Global Accelerator traffic flow optimization can improve application performance. Which scenarios benefit most? (Choose two.)",
            "options": [
                "Applications with users distributed globally requiring optimal routing",
                "Applications with multiple endpoints in different regions needing automatic failover",
                "Static content delivery (CloudFront is more appropriate)",
                "Real-time applications sensitive to latency and packet loss"
            ],
            "correctOptionIndexes": [0, 3],
            "explanation": "Global Accelerator optimizes routing for distributed users and real-time applications. It handles failover but isn't primary purpose. Static content is better served by CloudFront. Global Accelerator uses TCP/UDP optimization and monitors paths."
        },
        {
            "id": "q20",
            "type": "single",
            "prompt": "You want to restrict CloudFront distribution access to specific countries for content licensing. How is this implemented?",
            "options": [
                "CloudFront distribution-level geo-restriction",
                "Origin security group rules",
                "CloudFront functions to check IP geolocation",
                "Route 53 geolocation routing"
            ],
            "correctOptionIndex": 0,
            "explanation": "CloudFront geo-restriction directly supports whitelisting/blacklisting countries using IP geolocation. CloudFront functions can implement custom logic but geo-restriction is simpler for country-level control."
        },
        {
            "id": "q21",
            "type": "multiple",
            "prompt": "A company implements CloudFront for a web application to improve performance. Which metrics indicate successful optimization? (Choose two.)",
            "options": [
                "Increased cache hit ratio (more requests served from edge)",
                "Reduced origin load (fewer requests to origin)",
                "Decreased user-perceived latency (faster content delivery)",
                "Increased CloudFront data transfer charges"
            ],
            "correctOptionIndexes": [0, 2],
            "explanation": "Higher cache hit ratio means better caching. Lower latency at edge improves user experience. Reduced origin load is a benefit. Increased CloudFront charges is a cost, not a success metric."
        },
        {
            "id": "q22",
            "type": "single",
            "prompt": "CloudFront distribution has multiple origins (S3, API, custom). How is the origin selected for each request?",
            "options": [
                "Based on URL path pattern rules configured in cache behaviors",
                "Round-robin between origins",
                "Based on user's geographic location",
                "Based on origin response time"
            ],
            "correctOptionIndex": 0,
            "explanation": "Cache behaviors use URL path patterns to route requests to specific origins. This allows different content types to be served from appropriate origins (e.g., /images/* from S3, /api/* from API origin)."
        },
        {
            "id": "q23",
            "type": "multiple",
            "prompt": "AWS Global Accelerator is deployed for an e-commerce application with endpoints in 3 regions. Which features ensure high availability? (Choose two.)",
            "options": [
                "Health checks on endpoints with automatic failover to healthy regions",
                "2 static global IP addresses for Anycast routing",
                "Automatic traffic shifting based on endpoint capacity",
                "Load balancing within each regional endpoint"
            ],
            "correctOptionIndexes": [0, 1],
            "explanation": "Global Accelerator health checks enable automatic failover. Anycast IPs route to nearest healthy endpoint. Traffic shifting isn't automatic (manual via traffic dials). Load balancing within regions is ALB/NLB responsibility."
        },
        {
            "id": "q24",
            "type": "single",
            "prompt": "You configure CloudFront with query string forwarding enabled. What is the impact?",
            "options": [
                "Query strings are included in the cache key (different query = different cached version)",
                "Query strings are always forwarded to origin without caching",
                "Query strings are removed to increase cache hit ratio",
                "No impact on caching behavior"
            ],
            "correctOptionIndex": 0,
            "explanation": "When query string forwarding is enabled, CloudFront includes query strings in the cache key. Different query strings result in different cached objects. This is important for applications using query parameters (e.g., ?id=123 vs ?id=456)."
        },
        {
            "id": "q25",
            "type": "multiple",
            "prompt": "CloudFront distribution uses signed URLs/cookies for content protection. Which use cases are appropriate? (Choose two.)",
            "options": [
                "Restrict access to premium/paid content based on subscription",
                "Provide temporary access to specific users",
                "Protect all static content automatically",
                "Verify user identity before serving content"
            ],
            "correctOptionIndexes": [0, 1],
            "explanation": "Signed URLs/cookies authenticate users and control access duration. They're ideal for time-limited or user-specific content. Protecting all static content requires signed URLs for all users (operational overhead). Identity verification uses other methods (e.g., Cognito)."
        },
        {
            "id": "q26",
            "type": "single",
            "prompt": "A CloudFront distribution serves content from S3 with invalidation patterns. What is the best practice for cache invalidation?",
            "options": [
                "Invalidate all content with /* (every update)",
                "Invalidate only changed content paths to minimize costs",
                "Let CloudFront cache expire naturally (no invalidation)",
                "Invalidate entire distribution (reset cache)"
            ],
            "correctOptionIndex": 1,
            "explanation": "Targeted invalidation (specific paths) is most cost-effective (3,000 free per month). Invalidating /* uses up free quota quickly. Waiting for expiration increases stale content duration. Specific invalidation optimizes cost and performance."
        },
        {
            "id": "q27",
            "type": "multiple",
            "prompt": "AWS Global Accelerator traffic dials and endpoint weights are configured. Which adjustment strategies optimize traffic? (Choose two.)",
            "options": [
                "Reduce traffic dial for unhealthy regions during partial outages",
                "Use endpoint weights to balance load within a region's endpoints",
                "Set traffic dial to 0 for maintenance without affecting other regions",
                "Auto-scale endpoint weights based on demand"
            ],
            "correctOptionIndexes": [0, 1],
            "explanation": "Traffic dials control percentage of traffic per region (0-100%). Endpoint weights balance traffic among endpoints within a region. Both are manual controls (no auto-scaling). Setting dial to 0 is better than health check for planned maintenance."
        },
        {
            "id": "q28",
            "type": "single",
            "prompt": "CloudFront uses HTTP/2 by default for client connections. What is the primary benefit?",
            "options": [
                "Faster content delivery through multiplexing and header compression",
                "Automatic caching of all responses",
                "Encryption of all traffic",
                "Reduction in cache misses"
            ],
            "correctOptionIndex": 0,
            "explanation": "HTTP/2 provides multiplexing (multiple requests on single connection) and header compression, improving performance. It doesn't guarantee caching or encryption (HTTPS is separate). Cache behavior depends on headers/TTL."
        },
        {
            "id": "q29",
            "type": "multiple",
            "prompt": "A company implements CloudFront with field-level encryption for sensitive data. Which data is protected? (Choose two.)",
            "options": [
                "Data encrypted in CloudFront cache (reduces visibility)",
                "Sensitive POST fields encrypted end-to-end from client to origin",
                "Data in transit between client and CloudFront",
                "Encryption certificates managed by AWS Certificate Manager"
            ],
            "correctOptionIndexes": [1, 3],
            "explanation": "Field-level encryption encrypts sensitive POST fields end-to-end (only origin can decrypt). It protects specific fields, not entire cache. HTTPS protects client-to-CloudFront traffic (separate from field encryption). ACM manages certificates."
        },
        {
            "id": "q30",
            "type": "single",
            "prompt": "You configure AWS Global Accelerator with TCP and UDP traffic. Which application types benefit most?",
            "options": [
                "HTTP web applications (use CloudFront instead)",
                "Real-time applications (VoIP, gaming, IoT) requiring optimized routing",
                "Static website hosting",
                "Email services"
            ],
            "correctOptionIndex": 1,
            "explanation": "Global Accelerator optimizes TCP/UDP routing for real-time applications. Web applications benefit more from CloudFront. Static sites can use both but CloudFront is primary choice. Email uses SMTP (not primary Global Accelerator use case)."
        },
        {
            "id": "q31",
            "type": "multiple",
            "prompt": "CloudFront distribution experiences slow performance for users in a specific region. Which troubleshooting steps are appropriate? (Choose two.)",
            "options": [
                "Check CloudFront cache hit ratio for that region (cache misses = origin latency)",
                "Verify Origin Shield is enabled for dynamic content",
                "Review ALB/origin performance in that region",
                "Increase CloudFront distribution TTL globally"
            ],
            "correctOptionIndexes": [0, 2],
            "explanation": "Cache hit ratio indicates if content is cached. Origin performance issues cause slowness if cache misses occur. Origin Shield helps but doesn't directly address regional performance. Increasing TTL globally affects all regions, not specific problem area."
        },
        {
            "id": "q32",
            "type": "single",
            "prompt": "A CloudFront distribution serves both images and API responses. How should cache behaviors be configured?",
            "options": [
                "Single cache behavior with TTL=0 for all content",
                "Path-based behaviors: /api/* (short TTL) and /images/* (long TTL)",
                "Single cache behavior with mixed TTL",
                "Separate distributions for images and API"
            ],
            "correctOptionIndex": 1,
            "explanation": "Separate cache behaviors optimize for content types: images cache longer (less frequent changes), API responses cache shorter (frequently updated). Path-based routing is the standard approach. Multiple distributions are unnecessary overhead."
        },
        {
            "id": "q33",
            "type": "multiple",
            "prompt": "AWS Global Accelerator deployment includes health checks for endpoints. Which monitoring capabilities are available? (Choose two.)",
            "options": [
                "Real-time health status monitoring of all endpoints",
                "Traffic flow analysis showing request routing patterns",
                "Automatic failover when endpoint health deteriorates",
                "Detailed metric reporting in CloudWatch"
            ],
            "correctOptionIndexes": [0, 2],
            "explanation": "Global Accelerator monitors endpoint health and automatically fails over. Traffic flow analysis and CloudWatch metrics are available but not primary monitoring features. Real-time status and automatic failover are core benefits."
        },
        {
            "id": "q34",
            "type": "single",
            "prompt": "You need to serve different versions of a webpage to desktop and mobile users. Which CloudFront feature enables this?",
            "options": [
                "CloudFront functions to modify requests based on device headers",
                "Geo-restriction by device type",
                "Cache behaviors based on User-Agent header",
                "CloudFront Geo-proximity routing"
            ],
            "correctOptionIndex": 2,
            "explanation": "CloudFront cache behaviors can forward and use User-Agent headers to create cache key variations. Different User-Agent (mobile vs desktop) = different cached versions. CloudFront functions can enhance this logic."
        },
        {
            "id": "q35",
            "type": "multiple",
            "prompt": "CloudFront and AWS Global Accelerator are being evaluated for different use cases. Which is most appropriate for each? (Choose two.)",
            "options": [
                "CloudFront: Static website content delivery with caching",
                "Global Accelerator: Real-time application optimization with anycast routing",
                "CloudFront: Web API with authentication tokens",
                "Global Accelerator: Content distribution (same as CloudFront)"
            ],
            "correctOptionIndexes": [0, 1],
            "explanation": "CloudFront is for CDN/caching (static and dynamic content). Global Accelerator is for application acceleration and failover (real-time, non-HTTP). APIs can use CloudFront but requires proper cache key configuration. Global Accelerator isn't a CDN."
        },
        {
            "id": "q36",
            "type": "single",
            "prompt": "A CloudFront distribution is configured with Origin Access Identity (OAI) for S3. How is the S3 bucket accessed securely?",
            "options": [
                "CloudFront makes requests on behalf of OAI identity; S3 bucket policy restricts access to OAI only",
                "Users access S3 directly if they know the bucket name",
                "OAI provides temporary credentials to users",
                "S3 bucket must have public access enabled"
            ],
            "correctOptionIndex": 0,
            "explanation": "OAI acts as an identity for CloudFront. The S3 bucket policy grants access only to the OAI, preventing direct user access. Users must go through CloudFront. This provides secure, private origin setup."
        },
        {
            "id": "q37",
            "type": "multiple",
            "prompt": "AWS Global Accelerator is integrated with AWS Shield for DDoS protection. Which protections are provided? (Choose two.)",
            "options": [
                "AWS Shield Standard (always included) for basic DDoS protection",
                "AWS Shield Advanced (optional) for advanced DDoS mitigation",
                "Automatic DDoS detection and traffic filtering at Global Accelerator IPs",
                "Application-layer DDoS protection for all traffic"
            ],
            "correctOptionIndexes": [0, 1],
            "explanation": "Global Accelerator includes Shield Standard (basic protection). Shield Advanced can be added for advanced mitigations. DDoS detection/filtering is at the network layer. Application-layer protection requires additional solutions (e.g., WAF)."
        },
        {
            "id": "q38",
            "type": "single",
            "prompt": "CloudFront cache invalidation is performed with wildcard pattern /images/*. How many invalidation requests does this consume?",
            "options": [
                "1 invalidation request (single pattern)",
                "Based on number of objects matching the pattern (e.g., 500 files = 500 requests)",
                "Wildcard patterns count as unlimited invalidations",
                "Free (doesn't count against 3,000 limit)"
            ],
            "correctOptionIndex": 0,
            "explanation": "Wildcard patterns like /images/* count as 1 invalidation request. CloudFront applies the pattern to all matching objects. This is efficient for invalidating multiple objects with a single request."
        },
        {
            "id": "q39",
            "type": "multiple",
            "prompt": "A streaming video platform implements CloudFront with regional edge caches. Which benefits are realized? (Choose two.)",
            "options": [
                "Improved cache hit ratio by caching at both edge and regional levels",
                "Reduced origin load through multi-layer caching",
                "Faster video start times due to edge proximity",
                "Automatic video transcoding at edge locations"
            ],
            "correctOptionIndexes": [0, 1],
            "explanation": "Regional edge caches are positioned between edge locations and origin, caching at multiple levels. This improves hit ratio and reduces origin load. Edge proximity reduces latency. Video transcoding requires Lambda@Edge or origin encoding."
        },
        {
            "id": "q40",
            "type": "single",
            "prompt": "AWS Global Accelerator endpoints are in 2 regions. One region experiences complete outage. What happens to traffic?",
            "options": [
                "All traffic is routed to the healthy region (automatic failover)",
                "Traffic is split 50/50 (disabled region still receives traffic)",
                "Requests fail (no failover)",
                "Manual intervention is required to switch traffic"
            ],
            "correctOptionIndex": 0,
            "explanation": "Global Accelerator health checks detect the outage and automatically failover all traffic to the healthy region. This is automatic and requires no manual intervention, providing true high availability."
        }
    ]
};
