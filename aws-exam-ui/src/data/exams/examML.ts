import type { ExamDefinition } from './types';

export const examML: ExamDefinition = {
    id: 'exam_ml_saa_c03',
    title: 'SAA-C03 Practice Set — Machine Learning',
    description: 'Scenario-based questions covering Amazon Comprehend, Kendra, Lex, Polly, Rekognition, SageMaker AI, Textract, Transcribe, and Translate.',
    durationSeconds: 3600,
    questions: [

        // ═══════════════════════════════════════════════════════════════════════
        // Amazon Comprehend
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ml_q1',
            type: 'single',
            prompt: 'A media company wants to automatically tag thousands of news articles with topics and detect the sentiment of customer comments posted on their site, without training any custom ML models. Which AWS service should they use?',
            options: [
                'Amazon SageMaker with a custom NLP model trained on their dataset',
                'Amazon Comprehend using built-in entity recognition and sentiment analysis',
                'Amazon Kendra with a custom document enrichment configuration',
                'AWS Glue with a custom Python sentiment library'
            ],
            correctOptionIndex: 1,
            explanation: 'Amazon Comprehend is a fully managed NLP service that provides built-in capabilities for sentiment analysis, entity recognition, key phrase extraction, language detection, and topic modeling — no model training required. SageMaker requires custom model development and training. Kendra is a search service, not a text analysis service. Glue is a data integration service, not NLP.'
        },
        {
            id: 'ml_q2',
            type: 'single',
            prompt: 'A legal technology company needs to identify and redact personally identifiable information (PII) such as names, addresses, and Social Security numbers from millions of legal documents stored in S3. Which Amazon Comprehend feature addresses this at scale?',
            options: [
                'Comprehend Sentiment Analysis on each document',
                'Comprehend PII detection and redaction using an asynchronous batch analysis job',
                'Amazon Textract with a custom extraction template for PII fields',
                'Amazon Macie for S3 object content scanning and redaction'
            ],
            correctOptionIndex: 1,
            explanation: 'Amazon Comprehend has a dedicated PII entity detection capability that can identify and optionally redact PII from text. For large-scale document processing from S3, you use asynchronous batch analysis jobs — Comprehend reads from S3 and writes redacted output back to S3. Textract extracts text from documents but does not detect or redact PII. Macie detects PII for compliance reporting but does not redact content.'
        },
        {
            id: 'ml_q3',
            type: 'single',
            prompt: 'An e-commerce platform receives customer reviews in multiple languages. They want to classify each review into product categories specific to their catalog (e.g., Electronics, Apparel, Home & Garden) using a model trained on their own labeled data. Which Amazon Comprehend feature supports this?',
            options: [
                'Comprehend built-in topic modeling using Latent Dirichlet Allocation',
                'Comprehend Custom Classification trained on customer-labeled review examples',
                'Amazon Kendra with custom document metadata fields for category filtering',
                'Amazon SageMaker BlazingText algorithm for multi-class text classification'
            ],
            correctOptionIndex: 1,
            explanation: 'Amazon Comprehend Custom Classification allows you to train a text classification model on your own labeled examples and then use it to classify new documents into your custom categories. The built-in topic modeling uses unsupervised LDA which discovers generic topics, not predefined business categories. Kendra is a search service. SageMaker BlazingText works but requires significantly more ML expertise and operational overhead compared to Comprehend Custom Classification.'
        },
        {
            id: 'ml_q4',
            type: 'multiple',
            prompt: 'A company is evaluating Amazon Comprehend for their document processing pipeline. Which TWO capabilities does Amazon Comprehend provide natively without custom model training? (Choose 2)',
            options: [
                'Sentiment analysis (positive, negative, neutral, mixed) of text',
                'Key phrase extraction to identify the main topics in a document',
                'Optical character recognition (OCR) to extract text from scanned PDFs',
                'Speech-to-text transcription of audio files'
            ],
            correctOptionIndexes: [0, 1],
            explanation: 'Amazon Comprehend natively provides sentiment analysis, key phrase extraction, entity recognition, language detection, and syntax analysis — all without custom training. OCR is provided by Amazon Textract, not Comprehend (Comprehend works on text, not images/PDFs directly). Speech-to-text is provided by Amazon Transcribe. Comprehend does not process audio or image files directly.'
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Amazon Kendra
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ml_q5',
            type: 'single',
            prompt: 'A large enterprise wants employees to search across internal wikis, SharePoint sites, S3 documents, and ServiceNow tickets using natural language questions like "What is the vacation policy?" and receive direct answers, not just links. Which AWS service is best suited for this?',
            options: [
                'Amazon OpenSearch Service with a keyword-based search index',
                'Amazon Kendra with connectors to the relevant data sources',
                'Amazon Comprehend with entity recognition and key phrase extraction',
                'AWS Glue Data Catalog with Athena queries across all data sources'
            ],
            correctOptionIndex: 1,
            explanation: 'Amazon Kendra is an intelligent enterprise search service powered by ML that understands natural language questions and returns direct answers ("passage answers") rather than just document links. It has built-in connectors to SharePoint, S3, ServiceNow, Salesforce, RDS, and more. OpenSearch is keyword-based and requires significant custom development for natural language understanding. Comprehend is for NLP analysis, not search. Glue/Athena is for structured data queries, not document search.'
        },
        {
            id: 'ml_q6',
            type: 'single',
            prompt: 'An Amazon Kendra index is returning irrelevant results for some company-specific terms that are not in common use. The enterprise wants to improve search relevance by teaching Kendra the meaning of their business jargon and synonyms. Which Kendra feature addresses this?',
            options: [
                'Re-train the underlying Kendra ML model with custom training data',
                'Use Kendra Thesaurus to define synonyms, and Kendra Custom Document Enrichment to add metadata',
                'Add more documents to the index to increase training data volume',
                'Switch to Amazon OpenSearch Service which supports custom analyzers and synonym filters'
            ],
            correctOptionIndex: 1,
            explanation: 'Amazon Kendra provides a Thesaurus feature to define domain-specific synonyms (e.g., "COGS" → "cost of goods sold"), improving relevance for business jargon. Custom Document Enrichment allows adding or modifying metadata during ingestion to improve ranking. You cannot directly retrain the underlying Kendra model. Adding unrelated documents can hurt relevance. OpenSearch supports custom analyzers but requires significantly more operational effort than Kendra.'
        },
        {
            id: 'ml_q7',
            type: 'single',
            prompt: 'A company wants to add an intelligent search experience to their customer-facing web application that queries a Kendra index. The web application has unauthenticated end users who should NOT have direct AWS credentials. How should the application query Kendra securely?',
            options: [
                'Embed IAM access keys in the JavaScript frontend to call the Kendra API directly',
                'Use an AWS Lambda function as a backend proxy — the user calls the Lambda which uses its IAM execution role to query Kendra',
                'Make the Kendra index public so unauthenticated users can query it directly',
                'Create an IAM user per end user and distribute credentials via the web application'
            ],
            correctOptionIndex: 1,
            explanation: 'The correct pattern is a backend proxy: the web application calls a Lambda (or EC2/container) backend, which uses its IAM role to query Kendra on behalf of the user. This keeps AWS credentials server-side. Embedding credentials in JavaScript exposes them to all users and is a critical security risk. Kendra indexes are not publicly accessible. Creating per-user IAM credentials is operationally impractical and insecure.'
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Amazon Lex
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ml_q8',
            type: 'single',
            prompt: 'A bank wants to build a customer service chatbot that can understand natural language questions like "What is my account balance?" and "Transfer $200 to my savings account", and integrate with their existing account management APIs. Which AWS service provides the conversational AI foundation?',
            options: [
                'Amazon Polly with SSML voice synthesis for spoken responses',
                'Amazon Lex for building conversational interfaces with intent recognition and slot filling',
                'Amazon Transcribe for converting customer speech to text',
                'AWS Lambda with custom NLP logic for intent classification'
            ],
            correctOptionIndex: 1,
            explanation: 'Amazon Lex is the service for building conversational chatbots and voice interfaces. It provides intent recognition (understanding what the user wants to do), slot filling (collecting required parameters like amount and destination account), and dialog management. Lex integrates with Lambda to fulfill intents by calling backend APIs. Polly converts text to speech (TTS) but does not handle conversational logic. Transcribe converts speech to text but does not understand intents. Custom Lambda NLP is possible but requires significant ML expertise.'
        },
        {
            id: 'ml_q9',
            type: 'single',
            prompt: 'An Amazon Lex bot needs to look up a customer\'s order status in a DynamoDB table when the user says "Where is my order #12345?" and return the result conversationally. How is this backend integration configured?',
            options: [
                'Lex directly queries DynamoDB using a built-in data connector without any additional code',
                'Configure a Lambda function as the fulfillment hook for the order status intent — Lex invokes it with the extracted slot values and returns the response',
                'Use Amazon Kendra to index the DynamoDB table and have Lex query Kendra',
                'Configure an API Gateway endpoint as the Lex fulfillment backend using a native API integration'
            ],
            correctOptionIndex: 1,
            explanation: 'Amazon Lex integrates with AWS Lambda for intent fulfillment. When Lex recognizes the "order status" intent and extracts the order number slot, it invokes the configured Lambda function with the slot values. The Lambda queries DynamoDB and returns a response that Lex relays to the user. Lex does not have a native DynamoDB connector. Kendra is a search service, not a structured data query tool. Lex fulfillment uses Lambda, not direct API Gateway integration.'
        },
        {
            id: 'ml_q10',
            type: 'multiple',
            prompt: 'A solutions architect is designing an end-to-end voice-enabled customer service application using AWS. Which TWO services work together to enable a user to speak a question and hear a spoken response? (Choose 2)',
            options: [
                'Amazon Transcribe — converts the user\'s spoken audio to text',
                'Amazon Polly — converts the bot\'s text response to natural-sounding speech',
                'Amazon Lex — provides both speech recognition and text-to-speech natively without Transcribe or Polly',
                'Amazon Rekognition — analyzes audio sentiment from the spoken question'
            ],
            correctOptionIndexes: [0, 1],
            explanation: 'For a complete voice pipeline: Amazon Transcribe converts user speech (audio) to text (ASR), the text is processed by Lex for intent understanding, and Amazon Polly converts the text response back to natural speech (TTS). Note: Amazon Lex V2 does include built-in ASR/TTS for streaming voice experiences, but in architecture questions, Transcribe and Polly are the canonical services for these tasks. Rekognition analyzes images and video, not audio sentiment.'
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Amazon Polly
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ml_q11',
            type: 'single',
            prompt: 'A publishing company wants to generate audio versions of their articles in multiple languages and store them as MP3 files in S3 for podcast distribution. The audio must sound natural and the solution should be fully managed with no infrastructure to maintain. Which service should they use?',
            options: [
                'Amazon Transcribe running in reverse (text input, audio output)',
                'Amazon Polly to synthesize speech from text in multiple languages, storing output in S3',
                'AWS Elemental MediaConvert with a text-to-speech plugin',
                'Amazon SageMaker with a custom TTS neural network'
            ],
            correctOptionIndex: 1,
            explanation: 'Amazon Polly is a fully managed text-to-speech (TTS) service that converts text to lifelike speech in multiple languages and voices. It supports MP3 output and can deliver audio directly to S3 using asynchronous synthesis tasks. Transcribe is speech-to-text, not text-to-speech — it does not work in reverse. MediaConvert handles video transcoding and does not include TTS. SageMaker TTS requires custom model development and operational effort.'
        },
        {
            id: 'ml_q12',
            type: 'single',
            prompt: 'A company uses Amazon Polly to generate voice announcements for a public address system. They need fine-grained control over pronunciation, speaking rate, and pauses — for example, saying "AWS" as three letters rather than a word, and inserting a 1-second pause between sentences. Which Polly feature enables this?',
            options: [
                'Polly pronunciation lexicons to define custom pronunciations globally',
                'Polly Speech Synthesis Markup Language (SSML) tags in the input text',
                'Polly Neural TTS engine which automatically applies advanced prosody controls',
                'Polly custom voice training with annotated audio samples'
            ],
            correctOptionIndex: 1,
            explanation: 'SSML (Speech Synthesis Markup Language) is an XML-based markup language that gives fine-grained control over Polly\'s speech output. SSML tags allow you to: specify pronunciation of individual words (<say-as interpret-as="characters">AWS</say-as>), insert pauses (<break time="1s"/>), control speaking rate, pitch, volume, and emphasis. Pronunciation lexicons define custom pronunciations for specific words globally across requests. Neural TTS improves naturalness but does not expose per-word control. Polly does not support custom voice training.'
        },
        {
            id: 'ml_q13',
            type: 'single',
            prompt: 'A company is building a real-time voice assistant that needs to stream synthesized speech to users as audio is generated, rather than waiting for a complete audio file. Which Amazon Polly feature supports this?',
            options: [
                'Polly asynchronous synthesis tasks that store audio in S3',
                'Polly SynthesizeSpeech API with streaming audio output (PCM or OGG_VORBIS format)',
                'Polly batch processing jobs for real-time voice generation',
                'Amazon Transcribe streaming with Polly integration for bidirectional audio'
            ],
            correctOptionIndex: 1,
            explanation: 'The Amazon Polly SynthesizeSpeech API returns an audio stream directly in the HTTP response — the caller can begin playing audio while the rest is still being generated (streaming). Output formats like PCM are specifically designed for real-time playback. Asynchronous synthesis tasks save to S3 and are better for long documents or batch processing. Transcribe streaming handles speech-to-text, not text-to-speech streaming.'
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Amazon Rekognition
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ml_q14',
            type: 'single',
            prompt: 'A social media platform wants to automatically detect and blur faces of minors in user-uploaded images before they are displayed publicly, without building or training any computer vision models. Which AWS service handles this?',
            options: [
                'Amazon SageMaker with a pre-built face detection container',
                'Amazon Rekognition using the DetectFaces and DetectProtectiveEquipment APIs',
                'Amazon Rekognition using the DetectFaces API to get face bounding boxes, then applying blurring in application code',
                'AWS Lambda with the OpenCV library for face detection'
            ],
            correctOptionIndex: 2,
            explanation: 'Amazon Rekognition\'s DetectFaces API returns bounding box coordinates for each detected face in an image — no model training required. The application code then uses these bounding boxes to apply blurring (Rekognition itself does not modify images). Rekognition handles the ML inference; the application handles the image manipulation. SageMaker requires building/deploying a model. Lambda + OpenCV requires custom ML code. DetectProtectiveEquipment detects PPE (masks, gloves), not faces for blurring.'
        },
        {
            id: 'ml_q15',
            type: 'single',
            prompt: 'A streaming video platform wants to automatically detect explicit content and violence in user-uploaded videos, and flag them for human review before publishing. Videos are stored in S3. Which Rekognition capability handles video content moderation at scale?',
            options: [
                'Rekognition DetectModerationLabels API called on individual video frames extracted by a Lambda function',
                'Rekognition StartContentModeration API for asynchronous video analysis, with results retrieved via GetContentModeration',
                'Rekognition RecognizeCelebrities to identify inappropriate public figures in videos',
                'Amazon Comprehend to analyze video transcripts for inappropriate language'
            ],
            correctOptionIndex: 1,
            explanation: 'Amazon Rekognition Video supports asynchronous analysis of videos stored in S3. StartContentModeration begins the analysis job; GetContentModeration retrieves results including timestamps of flagged content and moderation category labels. This is the native, scalable approach. Calling DetectModerationLabels on individual frames requires extracting frames (slow, costly, requires MediaConvert or FFmpeg) and lacks native temporal context. RecognizeCelebrities identifies people, not content moderation. Comprehend analyzes text, not visual content.'
        },
        {
            id: 'ml_q16',
            type: 'single',
            prompt: 'A security company wants to verify that employees entering a secure facility match their registered employee photos, using a camera at the entrance. They want to build a real-time face comparison system. Which Amazon Rekognition feature is designed for this use case?',
            options: [
                'Rekognition DetectFaces to detect a face and compare landmarks manually',
                'Rekognition SearchFacesByImage against a Rekognition Collection containing indexed employee face vectors',
                'Rekognition CompareFaces to compare the camera image against every employee photo one by one',
                'Rekognition DetectLabels to identify if a human is present at the entrance'
            ],
            correctOptionIndex: 1,
            explanation: 'Rekognition Collections store face vectors (embeddings) indexed from known faces (employee photos). SearchFacesByImage takes a new image and searches the collection for matching faces in milliseconds, regardless of collection size — this is the scalable identity verification pattern. CompareFaces compares two specific images and is unsuitable for searching thousands of employees. DetectFaces and DetectLabels do not perform identity matching.'
        },
        {
            id: 'ml_q17',
            type: 'multiple',
            prompt: 'A company is evaluating Amazon Rekognition for their media pipeline. Which TWO capabilities does Rekognition provide for image analysis? (Choose 2)',
            options: [
                'Object and scene detection — identifying objects like cars, trees, or indoor scenes with confidence scores',
                'Text detection in images — extracting printed or handwritten text visible in photos or screenshots',
                'Audio transcription — converting speech in video soundtracks to text',
                'Document parsing — extracting structured data from invoices and forms'
            ],
            correctOptionIndexes: [0, 1],
            explanation: 'Amazon Rekognition provides object and scene detection (DetectLabels), facial analysis, face comparison, celebrity recognition, content moderation, and text detection in images (DetectText — useful for license plates, road signs, screenshots). Audio transcription is provided by Amazon Transcribe, not Rekognition. Document structure parsing (forms, tables) is provided by Amazon Textract, not Rekognition.'
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Amazon SageMaker AI
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ml_q18',
            type: 'single',
            prompt: 'A data science team wants to build, train, and deploy a custom machine learning model. They need a managed environment for Jupyter notebooks, scalable distributed training on GPU instances, and a managed model hosting endpoint — all without managing servers. Which AWS service provides this end-to-end ML platform?',
            options: [
                'AWS Glue ML Transforms for building and deploying custom models',
                'Amazon SageMaker AI with Studio notebooks, training jobs, and hosted endpoints',
                'AWS Batch for distributed GPU training workloads',
                'Amazon EMR with Spark MLlib for distributed model training'
            ],
            correctOptionIndex: 1,
            explanation: 'Amazon SageMaker is the end-to-end ML platform covering the full lifecycle: SageMaker Studio for notebook-based development, managed training jobs on any instance type (including distributed GPU), built-in algorithms and custom containers, and managed real-time inference endpoints. Glue ML Transforms provides specific transforms (FindMatches) for ETL, not general model building. AWS Batch is a job scheduler without ML-specific tooling. EMR with MLlib supports ML but lacks the integrated model hosting and experiment management of SageMaker.'
        },
        {
            id: 'ml_q19',
            type: 'single',
            prompt: 'A company has trained a SageMaker model and deployed it to a real-time endpoint. The endpoint receives sporadic traffic with long idle periods. The team wants to minimize cost while maintaining the endpoint. Which SageMaker endpoint configuration reduces idle costs?',
            options: [
                'Deploy the model to a Provisioned Concurrency Lambda function instead of a SageMaker endpoint',
                'Use a SageMaker Serverless Inference endpoint, which scales to zero when idle and charges only per request',
                'Deploy to a SageMaker real-time endpoint with auto-scaling that scales down to zero instances',
                'Use SageMaker batch transform instead of a real-time endpoint for all requests'
            ],
            correctOptionIndex: 1,
            explanation: 'SageMaker Serverless Inference automatically scales to zero during idle periods and scales up instantly on incoming requests — you pay only for compute used per inference request, not idle time. Standard real-time endpoints require at least one running instance at all times (cannot scale to zero). Auto-scaling on real-time endpoints has a minimum of 1 instance. Batch Transform is for offline bulk inference, not real-time request/response.'
        },
        {
            id: 'ml_q20',
            type: 'single',
            prompt: 'A company wants to run SageMaker training jobs on their own EC2 instances to use reserved capacity they already own, while still using SageMaker\'s experiment tracking, model registry, and pipelines. Which SageMaker feature enables training on customer-managed infrastructure?',
            options: [
                'SageMaker Local Mode, which runs training jobs on the developer\'s laptop',
                'SageMaker Training Compiler, which optimizes training to run faster on existing instances',
                'SageMaker managed warm pools that keep instances alive between training runs',
                'SageMaker HyperPod or BYO container training using the customer\'s own compute registered via SageMaker'
            ],
            correctOptionIndex: 3,
            explanation: 'SageMaker supports Bring Your Own Container (BYOC) and SageMaker HyperPod for training on self-managed infrastructure while still integrating with SageMaker\'s MLOps features (experiment tracking, model registry, pipelines). Local Mode runs training on the local machine for development/testing only. Training Compiler optimizes TensorFlow/PyTorch training but on SageMaker-managed instances. Managed warm pools keep instances warm between jobs on SageMaker-managed infrastructure.'
        },
        {
            id: 'ml_q21',
            type: 'multiple',
            prompt: 'A company is adopting MLOps practices using Amazon SageMaker. Which TWO SageMaker features support automation and governance of the ML lifecycle? (Choose 2)',
            options: [
                'SageMaker Pipelines — a CI/CD workflow orchestration service for ML that automates data processing, training, evaluation, and deployment steps',
                'SageMaker Model Registry — a central repository to catalog, version, and manage approval of trained models before deployment',
                'SageMaker Ground Truth — a data labeling service for creating training datasets',
                'SageMaker Clarify — a service for detecting bias and explaining model predictions'
            ],
            correctOptionIndexes: [0, 1],
            explanation: 'MLOps focuses on automating and governing the ML lifecycle. SageMaker Pipelines provides DAG-based workflow automation for ML steps (processing → training → evaluation → registration → deployment) with step conditions and automatic triggering. SageMaker Model Registry provides model versioning, metadata tracking, and an approval workflow before models are deployed to production. Ground Truth is for data labeling (pre-training). Clarify supports model explainability and bias detection (post-training analysis), both valuable but not the primary MLOps governance features.'
        },
        {
            id: 'ml_q22',
            type: 'single',
            prompt: 'A machine learning team notices their deployed SageMaker model\'s predictions are degrading over time because real-world data has shifted from the training data distribution. Which SageMaker feature automatically detects this and alerts the team?',
            options: [
                'SageMaker Clarify for bias detection in training data',
                'SageMaker Model Monitor for detecting data drift and model quality degradation on production endpoints',
                'SageMaker Debugger for catching training anomalies during model training',
                'SageMaker Experiments for comparing model performance across training runs'
            ],
            correctOptionIndex: 1,
            explanation: 'SageMaker Model Monitor continuously monitors production endpoints and detects: data quality drift (input feature distribution shifts from training baseline), model quality degradation (prediction accuracy drop), bias drift, and feature attribution drift. It generates alerts via CloudWatch when violations exceed thresholds. Clarify detects bias in training data (pre-deployment). Debugger monitors training jobs (not production inference). Experiments compares offline training runs, not production model drift.'
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Amazon Textract
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ml_q23',
            type: 'single',
            prompt: 'A financial institution processes thousands of scanned loan application PDFs daily. They need to extract specific fields like applicant name, date of birth, annual income, and signature fields from semi-structured forms, going beyond simple OCR to understand form structure. Which AWS service should they use?',
            options: [
                'Amazon Rekognition DetectText for extracting all visible text from document images',
                'Amazon Textract with the AnalyzeDocument API using the FORMS and TABLES features',
                'Amazon Comprehend with entity recognition to extract structured data from raw text',
                'AWS Glue with a custom Python PDF parsing script'
            ],
            correctOptionIndex: 1,
            explanation: 'Amazon Textract goes beyond basic OCR — its AnalyzeDocument API with FORMS feature detects form key-value pairs (e.g., "Annual Income: $75,000"), while TABLES extracts tabular data preserving row/column structure. This is specifically designed for semi-structured documents like loan applications. Rekognition DetectText extracts raw text without understanding form structure. Comprehend works on plain text and does not extract from images or understand form layouts. Custom Glue scripts require significant custom PDF parsing development.'
        },
        {
            id: 'ml_q24',
            type: 'single',
            prompt: 'A healthcare company needs to process thousands of medical records stored as scanned PDFs in S3 and extract patient information into a structured database. The processing should be asynchronous since each document may take time to analyze. Which Textract approach is appropriate?',
            options: [
                'Call the Textract DetectDocumentText synchronous API for each PDF from a Lambda function',
                'Use the Textract StartDocumentAnalysis asynchronous API for multi-page PDFs, with SNS notification on completion',
                'Use Amazon Comprehend Medical to extract clinical entities directly from S3 PDFs',
                'Use Amazon Rekognition to extract text from each page image and feed to Comprehend Medical'
            ],
            correctOptionIndex: 1,
            explanation: 'For multi-page PDFs and large-scale batch processing, Amazon Textract\'s asynchronous APIs (StartDocumentAnalysis, StartDocumentTextDetection) are the correct approach. The job is submitted and Textract sends a completion notification to an SNS topic when done. The synchronous API has page limits and is inappropriate for large documents or high-throughput batch scenarios. Comprehend Medical extracts clinical entities from already-extracted text, not directly from PDFs. The Rekognition + Comprehend Medical chain is valid but adds unnecessary complexity compared to Textract\'s native PDF support.'
        },
        {
            id: 'ml_q25',
            type: 'multiple',
            prompt: 'A company is comparing Amazon Textract and Amazon Rekognition DetectText. Which TWO statements correctly differentiate them? (Choose 2)',
            options: [
                'Textract understands the semantic structure of documents (forms, tables, key-value pairs); Rekognition DetectText only extracts raw text from images without structural understanding',
                'Textract natively processes multi-page PDFs; Rekognition DetectText works only on single image files (JPEG, PNG)',
                'Rekognition DetectText supports scanned PDF input; Textract only supports image formats',
                'Textract and Rekognition DetectText both provide identical form field extraction capabilities'
            ],
            correctOptionIndexes: [0, 1],
            explanation: 'Textract\'s key differentiators: (1) it understands document structure — detecting form key-value pairs, table cells, selection elements (checkboxes), and document layouts, while Rekognition DetectText just extracts raw text bounding boxes; (2) Textract natively accepts multi-page PDF and TIFF files, while Rekognition only processes single-image formats (JPEG, PNG, etc.). Rekognition DetectText does not support PDF input. Their text extraction capabilities are not identical — Textract is purpose-built for document analysis.'
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Amazon Transcribe
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ml_q26',
            type: 'single',
            prompt: 'A call center wants to automatically transcribe all customer service calls stored as audio files in S3, and then use the transcripts to analyze customer sentiment and common complaint topics. Which AWS service handles the audio-to-text step?',
            options: [
                'Amazon Polly, used in reverse to convert audio to text',
                'Amazon Transcribe to convert audio files to text transcripts',
                'Amazon Lex, which transcribes audio as part of its conversational AI pipeline',
                'Amazon Comprehend with audio input processing enabled'
            ],
            correctOptionIndex: 1,
            explanation: 'Amazon Transcribe is the automatic speech recognition (ASR) service that converts audio to text transcripts. For call center analysis, Transcribe has built-in call analytics features that can identify speaker roles, detect interruptions, and provide sentiment per call segment. After transcription, Amazon Comprehend can analyze the text transcripts for sentiment and topic modeling. Polly is text-to-speech, not speech-to-text. Lex uses ASR for its chatbot interface but is not the service to use for batch audio transcription from S3. Comprehend does not accept audio input.'
        },
        {
            id: 'ml_q27',
            type: 'single',
            prompt: 'A healthcare company needs to transcribe physician-patient conversations. Medical terminology like drug names and anatomical terms are frequently misrecognized. Which Amazon Transcribe feature improves accuracy for medical speech?',
            options: [
                'Transcribe Custom Vocabulary to add a list of medical terms and their pronunciation hints',
                'Amazon Transcribe Medical — a specialized model trained on medical speech and terminology',
                'Transcribe Content Redaction to remove medical terms before transcription',
                'Transcribe Custom Language Model trained on general medical textbooks'
            ],
            correctOptionIndex: 1,
            explanation: 'Amazon Transcribe Medical is a purpose-built service trained on medical speech, automatically recognizing medical terminology, drug names, clinical jargon, and procedures without any custom configuration. It is HIPAA-eligible. Custom Vocabulary can supplement Transcribe\'s standard model with additional terms, but does not match the accuracy of a domain-specific medical model. Content Redaction removes PHI from transcripts for compliance, not for improving medical term accuracy. Custom Language Models can help for domain-specific vocabulary but are a training project, not an out-of-the-box solution like Transcribe Medical.'
        },
        {
            id: 'ml_q28',
            type: 'single',
            prompt: 'A legal company records meetings with multiple speakers and needs transcripts that identify which speaker said what (e.g., "Speaker 1: ...", "Speaker 2: ..."). Which Amazon Transcribe feature enables this?',
            options: [
                'Transcribe vocabulary filtering to tag speakers by filtered keywords',
                'Transcribe speaker diarization (speaker identification) enabled in the transcription job',
                'Transcribe channel identification when audio is recorded on separate channels per speaker',
                'Amazon Lex speaker recognition integrated with Transcribe'
            ],
            correctOptionIndexes: [1],
            correctOptionIndex: 1,
            explanation: 'Amazon Transcribe supports speaker diarization (also called speaker identification) — when enabled, the transcript labels each segment with a speaker identifier (Speaker 0, Speaker 1, etc.). This works on single-channel recordings where multiple voices are mixed. Channel identification is a separate feature for recordings where each speaker is recorded on a separate audio channel (e.g., stereo call recordings where customer and agent are on separate channels). Vocabulary filtering removes profanity or custom words, not speaker labeling. Lex does not provide speaker recognition for transcription.'
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Amazon Translate
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ml_q29',
            type: 'single',
            prompt: 'A global e-commerce platform wants to display product descriptions in the customer\'s preferred language. Product descriptions are stored in English in DynamoDB. The platform needs real-time translation when a page loads for non-English users. Which AWS service provides this?',
            options: [
                'Amazon Comprehend language detection followed by a custom translation dictionary',
                'Amazon Translate real-time translation API integrated with the application',
                'Amazon Polly to convert English text to speech in other languages',
                'Amazon Lex with multi-language bot configuration'
            ],
            correctOptionIndex: 1,
            explanation: 'Amazon Translate provides real-time neural machine translation between 75+ language pairs. The application calls the TranslateText API at page load time (or caches translations) to convert English product descriptions to the customer\'s language. Comprehend detects language but does not translate. Polly converts text to speech in a target language\'s TTS voice, not text translation. Lex provides multi-language chatbot interfaces, not general text translation for web content.'
        },
        {
            id: 'ml_q30',
            type: 'single',
            prompt: 'A company needs to translate millions of documents from English to Spanish, French, and German. The documents are stored in S3 and processing must be asynchronous. Which approach is correct?',
            options: [
                'Call the Amazon Translate TranslateText API synchronously from a Lambda function in a loop for each document',
                'Use Amazon Translate batch translation jobs (StartTextTranslationJob) pointing to S3 input/output locations',
                'Use Amazon Comprehend\'s multilingual analysis to convert documents to target languages',
                'Use AWS Glue with a custom translation library to process S3 documents in parallel'
            ],
            correctOptionIndex: 1,
            explanation: 'Amazon Translate supports batch translation jobs via StartTextTranslationJob — you specify an S3 input prefix (containing source documents), output prefix, source language, and target language(s). Translate processes all documents asynchronously and writes translated files to S3. The synchronous TranslateText API has a character limit and calling it in a loop from Lambda is not scalable for millions of documents. Comprehend does not translate text. Glue with a custom library adds operational overhead and lacks the managed scale of Translate batch jobs.'
        },
        {
            id: 'ml_q31',
            type: 'single',
            prompt: 'A company translates customer support chat messages using Amazon Translate. Brand names and product model numbers (like "TurboMax Pro X2") must never be translated or altered. Which Translate feature prevents specific terms from being translated?',
            options: [
                'Translate Content Redaction to remove brand names before translation',
                'Translate Custom Terminology — a glossary that maps source terms to exact target terms or marks them as do-not-translate',
                'Translate Active Custom Translation with a parallel corpus trained on brand documents',
                'Wrap brand names in HTML tags and use Translate\'s HTML translation mode'
            ],
            correctOptionIndex: 1,
            explanation: 'Amazon Translate Custom Terminology allows you to define a glossary of source terms and their required translations. For brand names and product codes that should not be translated, you can specify the same term in the target language, effectively marking them as untranslatable. This ensures "TurboMax Pro X2" stays as "TurboMax Pro X2" in any language. Content Redaction removes terms completely, not preserves them. Active Custom Translation improves translation style using parallel examples but does not control specific term handling. HTML tags can help but are not the intended mechanism.'
        },

        // ═══════════════════════════════════════════════════════════════════════
        // Multi-service Scenario Questions
        // ═══════════════════════════════════════════════════════════════════════
        {
            id: 'ml_q32',
            type: 'single',
            prompt: 'A company wants to build a multilingual customer support system where: (1) the customer speaks in any language, (2) the speech is converted to text, (3) the text is translated to English, (4) an English-speaking agent responds in English, (5) the response is translated back, and (6) played as speech to the customer. Which combination of AWS services implements this pipeline?',
            options: [
                'Amazon Lex → Amazon Comprehend → Amazon Polly',
                'Amazon Transcribe → Amazon Translate → Amazon Polly',
                'Amazon Transcribe → Amazon Comprehend → Amazon Translate',
                'Amazon Rekognition → Amazon Translate → Amazon Lex'
            ],
            correctOptionIndex: 1,
            explanation: 'The correct pipeline is: Amazon Transcribe (speech-to-text from any language) → Amazon Translate (translate to English for agent, and translate agent\'s English response back to customer language) → Amazon Polly (text-to-speech to play the translated response to the customer). Comprehend is for NLP analysis (sentiment, entities), not translation or speech. Rekognition is for image/video analysis. Lex is for chatbot conversational management, not needed for human-agent routing.'
        },
        {
            id: 'ml_q33',
            type: 'single',
            prompt: 'A retail company wants to automatically process supplier invoices. The invoices are scanned PDFs with varying formats. They need to extract invoice number, vendor name, line items, and totals, and store them in a database — all without writing custom OCR code. Which combination of services achieves this with minimal development?',
            options: [
                'Amazon Rekognition DetectText + Amazon Comprehend entity recognition',
                'Amazon Textract AnalyzeExpense API to extract structured data from invoices, then store results in DynamoDB',
                'Amazon SageMaker with a custom object detection model trained on invoice images',
                'AWS Glue with a PDF parsing script and Amazon Comprehend NER'
            ],
            correctOptionIndex: 1,
            explanation: 'Amazon Textract\'s AnalyzeExpense API is specifically designed for financial documents like invoices and receipts. It extracts standardized summary fields (invoice number, vendor name, total, due date) and line items from invoices of any format — no template configuration or ML training required. Results can be stored directly in DynamoDB. Rekognition + Comprehend lacks native invoice structure understanding and requires custom parsing logic. SageMaker requires custom model training. Glue + Comprehend requires significant custom PDF and NLP development.'
        },
        {
            id: 'ml_q34',
            type: 'single',
            prompt: 'A company wants to add a natural language search capability to their internal knowledge base without managing any ML infrastructure. Users should be able to ask questions like "How do I reset my VPN credentials?" and receive relevant document excerpts. The knowledge base documents are stored in S3. Which solution has the LOWEST operational overhead?',
            options: [
                'Train a custom SageMaker NLP model on the knowledge base documents and deploy it as an endpoint',
                'Set up Amazon OpenSearch Service with a custom NLP query parser and BM25 ranking',
                'Use Amazon Kendra with an S3 data source connector — index the documents and expose the Query API',
                'Use Amazon Comprehend to extract entities from all documents and build a custom search index in Elasticsearch'
            ],
            correctOptionIndex: 2,
            explanation: 'Amazon Kendra is purpose-built for intelligent enterprise search with minimum operational overhead. Setting up an S3 data source connector, indexing documents, and exposing the Query API requires no ML expertise. Kendra handles crawling, indexing, ML-based relevance ranking, and natural language question answering out of the box. SageMaker requires custom NLP model development and training. OpenSearch requires significant custom configuration for NLP-quality search. Comprehend + Elasticsearch requires building a custom search pipeline from scratch.'
        },
        {
            id: 'ml_q35',
            type: 'multiple',
            prompt: 'A solutions architect is selecting AWS AI/ML services for a document intelligence platform. Which TWO services are correctly matched to their primary use case? (Choose 2)',
            options: [
                'Amazon Textract — extracting structured data (forms, tables) from scanned documents and PDFs',
                'Amazon Comprehend — performing NLP analysis (sentiment, entities, key phrases) on text',
                'Amazon Transcribe — translating text between languages in real time',
                'Amazon Rekognition — converting text to natural-sounding speech'
            ],
            correctOptionIndexes: [0, 1],
            explanation: 'Amazon Textract is for document text extraction and structure analysis (forms, tables, key-value pairs). Amazon Comprehend is for NLP analysis on text (sentiment, named entity recognition, key phrase extraction, topic modeling). Amazon Transcribe is for speech-to-text (automatic speech recognition), not translation — Amazon Translate handles translation. Amazon Rekognition is for image and video analysis (object detection, face recognition, content moderation), not text-to-speech — Amazon Polly handles TTS.'
        }
    ]
};
