# AWS SAA-C03 — Machine Learning Services Study Guide

---

## 🤖 Machine Learning Services Overview

```
┌──────────────────────────────────────────────────────────────────────┐
│                    AWS ML Services Map                                │
│                                                                       │
│  AI Services (Pre-trained, No ML Expertise Needed)                   │
│  ┌─────────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────────┐ │
│  │ Comprehend  │  │  Kendra  │  │   Lex    │  │     Polly        │ │
│  │ (NLP/Text   │  │ (Search/ │  │ (Chat-   │  │ (Text-to-Speech) │ │
│  │  analysis)  │  │   RAG)   │  │  bots)   │  │                  │ │
│  └─────────────┘  └──────────┘  └──────────┘  └──────────────────┘ │
│  ┌─────────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────────┐ │
│  │ Rekognition │  │ Textract │  │Transcribe│  │    Translate     │ │
│  │ (Images /   │  │  (Doc    │  │ (Speech- │  │  (Language       │ │
│  │   Video)    │  │   OCR)   │  │  to-Text)│  │   Translation)   │ │
│  └─────────────┘  └──────────┘  └──────────┘  └──────────────────┘ │
│                                                                       │
│  ML Platform (Build, Train, Deploy Custom Models)                    │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │  Amazon SageMaker AI                                          │   │
│  └──────────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────────┘
```

> 📌 **SAA-C03 Exam Note**: ML services are **lightly tested**. For most services, understand the **purpose and key use case** rather than deep technical detail. SageMaker and Rekognition get slightly more attention. Focus on recognizing which service solves which problem in a scenario question.

---

## 📝 1. Amazon Comprehend

### What It Is
A **Natural Language Processing (NLP)** service that uses ML to find insights and relationships in text — sentiment, entities, key phrases, language, topics — without any ML expertise.

### Architecture
```
┌──────────────────────────────────────────────────────────────────────┐
│                      Amazon Comprehend                                │
│                                                                       │
│  Input Text                                                           │
│  "The product arrived damaged. I am very disappointed."              │
│       │                                                               │
│       ▼  API call                                                     │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │  Comprehend Analysis                                          │   │
│  │                                                               │   │
│  │  Sentiment:    NEGATIVE (confidence: 0.97)                   │   │
│  │  Entities:     "product" [PRODUCT], "I" [PERSON]             │   │
│  │  Key Phrases:  "product arrived", "very disappointed"         │   │
│  │  Language:     en (English, confidence: 0.99)                │   │
│  │  PII:          No PII detected                                │   │
│  └──────────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────────┘
```

### Key Capabilities
| Feature | Description |
|---|---|
| **Sentiment Analysis** | Positive, Negative, Neutral, Mixed — per document or per sentence |
| **Entity Recognition** | People, places, organizations, dates, quantities, commercial items |
| **Key Phrase Extraction** | Most important phrases in the text |
| **Language Detection** | Identify the language of a document (100+ languages) |
| **Topic Modeling** | Group documents by topics they discuss (batch) |
| **PII Detection** | Identify and redact personally identifiable information |
| **Custom Classification** | Train your own text classifier on your categories |
| **Custom Entity Recognition** | Train to detect your domain-specific entities |

### Comprehend Medical
- Specialized for **healthcare and clinical text**
- Extracts: medical conditions, medications, dosages, anatomy, tests, procedures
- **PHI Detection** — Protected Health Information for HIPAA compliance

### Common Use Cases
| Use Case | How Comprehend Helps |
|---|---|
| **Customer feedback analysis** | Sentiment on reviews, support tickets |
| **Document classification** | Route documents to correct team |
| **Compliance / PII redaction** | Identify and remove sensitive data |
| **Content moderation** | Detect inappropriate language |
| **Clinical NLP** | Extract structured data from doctor notes |

### Exam Key Points ✅
- **No ML expertise needed** — call API with text, get structured results back
- **Real-time or batch** processing (async for large document sets)
- **Comprehend Medical** = healthcare-specific; extracts clinical entities and PHI
- **Custom models** (classification, entity recognition) — train on your own labeled data
- **S3 + Comprehend** = batch analysis; output results to S3
- **Use when**: analyzing customer reviews for sentiment, extracting entities from documents, detecting PII for compliance, routing support tickets

---

## 🔍 2. Amazon Kendra

### What It Is
An **intelligent enterprise search service** powered by ML — searches across unstructured content (documents, FAQs, wikis, S3 files) and returns **precise, relevant answers** (not just a list of documents).

### Architecture
```
┌──────────────────────────────────────────────────────────────────────┐
│                        Amazon Kendra                                  │
│                                                                       │
│  Content Sources (Data Sources)                                       │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌──────────────────┐  │
│  │  S3    │ │SharePt │ │  RDS   │ │OneDrive│ │  Confluence,     │  │
│  │        │ │        │ │        │ │        │ │  ServiceNow, etc.│  │
│  └───┬────┘ └───┬────┘ └───┬────┘ └───┬────┘ └────────┬─────────┘  │
│      └──────────┴──────────┴──────────┴────────────────┘            │
│                             │  Index (crawl + ML)                    │
│                             ▼                                        │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │  Kendra Index (ML-powered search engine)                      │   │
│  │  • Understands natural language queries                       │   │
│  │  • Returns precise answers, not just links                    │   │
│  │  • Learns from user feedback (relevance tuning)               │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                             │                                        │
│  User: "What is the refund policy for international orders?"         │
│                             │                                        │
│  Response: "International orders can be refunded within 30 days..."  │
│  (extracted from policy PDF — not just a link to the document)       │
└──────────────────────────────────────────────────────────────────────┘
```

### Key Features
| Feature | Description |
|---|---|
| **Natural language queries** | Ask questions in plain English |
| **Precise answers** | Extracts answer snippets from documents (not just doc links) |
| **Multiple data sources** | S3, SharePoint, Confluence, RDS, OneDrive, Salesforce, etc. |
| **Document types** | PDF, Word, HTML, Excel, PowerPoint, plain text |
| **Access control** | Respects source document permissions (ACL-aware) |
| **Relevance tuning** | Click feedback improves future results |
| **Incremental sync** | Connectors sync changes automatically |
| **GenAI features** | Retrieval-Augmented Generation (RAG) for LLM-powered search |

### Exam Key Points ✅
- **Kendra = intelligent enterprise search** — not a database; finds answers across unstructured docs
- **Natural language questions** → precise extracted answers (not just "here's the document")
- Connectors for **S3, SharePoint, Confluence, ServiceNow** and many more
- **Access control aware** — respects original document permissions
- **Use when**: internal knowledge base search, HR/IT FAQ bot, document retrieval, enterprise Q&A

---

## 🤖 3. Amazon Lex

### What It Is
A service for building **conversational interfaces** (chatbots and voice bots) using the **same technology that powers Amazon Alexa** — with automatic speech recognition (ASR) and natural language understanding (NLU).

### Architecture
```
┌──────────────────────────────────────────────────────────────────────┐
│                         Amazon Lex                                    │
│                                                                       │
│  User: "I want to book a flight to Paris next Monday"                │
│       │                                                               │
│       ▼  Text or Voice                                                │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │  Lex Bot                                                      │   │
│  │                                                               │   │
│  │  Intent: BookFlight                                           │   │
│  │  Slots:  destination=Paris, date=next Monday                  │   │
│  │                                                               │   │
│  │  → Fulfillment: Lambda function                               │   │
│  │  → Confirmation: "Book a flight to Paris on Monday?"         │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                             │                                         │
│         ┌───────────────────┼───────────────────────┐               │
│         ▼                   ▼                       ▼               │
│    Web / Mobile         Amazon Connect           Slack / Teams       │
│    (chat widget)        (call center IVR)        (messaging apps)    │
└──────────────────────────────────────────────────────────────────────┘
```

### Key Concepts
| Concept | Description |
|---|---|
| **Bot** | The conversational agent |
| **Intent** | What the user wants to do (BookFlight, CheckBalance) |
| **Utterances** | Sample phrases that trigger an intent ("I want to fly to…") |
| **Slots** | Variables to fill (destination, date, class) |
| **Fulfillment** | Lambda function called when all slots are filled |
| **Elicitation** | Lex asks for missing slot values |
| **Session** | Conversation context maintained across turns |

### Integrations
- **Amazon Connect** — build **contact center IVR** solutions (voice bot for call centers)
- **Web + Mobile** — embed chat widget via Lex Web UI
- **Messaging** — Slack, Facebook Messenger, Twilio SMS, Kik

### Exam Key Points ✅
- **Lex = Alexa technology** — same ASR + NLU engine
- **Voice AND text** — handles both speech and typed input
- **Amazon Connect + Lex** = automated call center / IVR (Interactive Voice Response) — most tested pattern
- **Lambda fulfillment** — Lambda executes business logic after all slots collected
- **Use when**: customer service bots, voice IVR for call centers, FAQ chatbots, booking/ordering bots

---

## 🔊 4. Amazon Polly

### What It Is
A **Text-to-Speech (TTS)** service that turns text into lifelike speech using deep learning — dozens of voices across many languages.

### Key Features
| Feature | Description |
|---|---|
| **Standard voices** | Pre-recorded speech units (concatenated) |
| **Neural TTS (NTTS)** | Deep learning for more natural, human-like speech |
| **SSML support** | Speech Synthesis Markup Language — control pitch, rate, volume, pauses |
| **Lexicons** | Custom pronunciation rules for specialized terms |
| **Speech marks** | Metadata about word timing (for lip sync, captions) |
| **Newscaster style** | Extra-natural tone for news reading (Neural only) |
| **50+ voices** | Multiple languages and regional accents |

### Common Use Cases
- **E-learning** — convert text lessons to audio
- **Accessibility** — read content aloud for visually impaired
- **Call center IVR** — static voice prompts (for dynamic prompts, use Lex)
- **Podcast / media** — auto-generate audio from articles
- **Notifications** — spoken alerts in IoT or applications

### Exam Key Points ✅
- **Polly = Text → Speech** (one direction)
- **Neural TTS** = most natural; uses deep learning
- **SSML** = control pronunciation, pauses, emphasis
- **Polly ≠ Transcribe** — Polly converts text TO speech; Transcribe converts speech TO text
- **Use when**: any feature that needs to "read aloud" text to users

---

## 👁️ 5. Amazon Rekognition

### What It Is
A **computer vision service** that analyzes **images and videos** to detect objects, faces, text, scenes, and inappropriate content — using pre-trained deep learning models.

### Architecture
```
┌──────────────────────────────────────────────────────────────────────┐
│                      Amazon Rekognition                               │
│                                                                       │
│  Input: Image / Video (S3 or bytes)                                  │
│                                                                       │
│  ┌────────────────────────────────────────────────────────────────┐  │
│  │  Rekognition Analysis                                           │  │
│  │                                                                │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐ │  │
│  │  │  Face        │  │  Object &    │  │  Content Moderation   │ │  │
│  │  │  Analysis    │  │  Scene       │  │  (Unsafe content)    │ │  │
│  │  │  Detection   │  │  Detection   │  │                      │ │  │
│  │  └──────────────┘  └──────────────┘  └──────────────────────┘ │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐ │  │
│  │  │  Text in     │  │  Celebrity   │  │  Custom Labels       │ │  │
│  │  │  Image (OCR) │  │  Recognition │  │  (train own model)   │ │  │
│  │  └──────────────┘  └──────────────┘  └──────────────────────┘ │  │
│  │  ┌──────────────┐  ┌──────────────────────────────────────┐   │  │
│  │  │  PPE         │  │  Face Search / Comparison            │   │  │
│  │  │  Detection   │  │  (against face collection)           │   │  │
│  │  └──────────────┘  └──────────────────────────────────────┘   │  │
│  └────────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────┘
```

### Key Capabilities
| Feature | Description |
|---|---|
| **Object & Scene Detection** | 3,000+ object categories; confidence scores |
| **Face Detection** | Detect faces; analyze age range, emotion, gender, glasses |
| **Face Comparison** | Compare two faces — are they the same person? |
| **Face Search** | Search a face against a collection of indexed faces |
| **Celebrity Recognition** | Identify well-known public figures |
| **Text Detection** | OCR for text in images (road signs, labels, screenshots) |
| **Content Moderation** | Detect explicit/suggestive content; confidence-based |
| **Custom Labels** | Train model to detect your specific objects/scenes |
| **PPE Detection** | Safety equipment compliance (hard hats, masks, vests) |
| **Video Analysis** | Async analysis of stored video; detect events over time |

### Rekognition Video
- **Stored video** (in S3): async job; results via SNS + SQS notification
- **Streaming video** (Kinesis Video Streams): real-time analysis
- Detect: people paths, activity over time, unsafe content in video

### Face Collections
```
  Enroll users:
  IndexFaces() → store face vectors in Collection

  Authenticate:
  SearchFacesByImage() → compare live face to Collection
  Returns: matched face ID + confidence score
```

### Common Use Cases
| Use Case | Features Used |
|---|---|
| **Identity verification** | Face Comparison, Face Search |
| **Media content moderation** | Content Moderation |
| **Workplace safety** | PPE Detection |
| **Retail analytics** | Object Detection, People counting |
| **Media asset management** | Celebrity Recognition, Scene Detection |
| **Custom defect detection** | Custom Labels (train on your products) |

### Exam Key Points ✅
- **Rekognition = computer vision** — images and video analysis
- **Content Moderation** is the most commonly tested use case — detect inappropriate content in user-uploaded images/videos
- **Face Collection** = database of face vectors for search/compare at scale
- **Custom Labels** = train Rekognition on your own images (products, defects, logos)
- **Video analysis** = async (S3 → SNS/SQS) or real-time (Kinesis Video Streams)
- **PPE Detection** = workplace safety compliance monitoring
- **Use when**: image/video moderation, face-based authentication, object detection in images, label generation for media

---

## 🧠 6. Amazon SageMaker AI

### What It Is
A **fully managed ML platform** for data scientists and developers to **build, train, tune, and deploy** custom machine learning models at scale — without managing infrastructure.

### Architecture
```
┌──────────────────────────────────────────────────────────────────────┐
│                      Amazon SageMaker AI                              │
│                                                                       │
│  ML Lifecycle                                                         │
│                                                                       │
│  1. PREPARE                2. BUILD               3. TRAIN           │
│  ┌──────────────┐          ┌──────────────┐        ┌──────────────┐  │
│  │  SageMaker   │          │  SageMaker   │        │  Training    │  │
│  │  Data Wrangler│         │  Studio      │        │  Jobs        │  │
│  │  (data prep) │          │  (IDE for ML)│        │  (managed    │  │
│  │              │          │              │        │   instances) │  │
│  │  Ground Truth│          │  Notebooks   │        │              │  │
│  │  (labeling)  │          │  (Jupyter)   │        │  Distributed │  │
│  └──────────────┘          └──────────────┘        │  training    │  │
│                                                     └──────────────┘  │
│  4. TUNE                   5. DEPLOY              6. MONITOR         │
│  ┌──────────────┐          ┌──────────────┐        ┌──────────────┐  │
│  │  Automatic   │          │  Real-time   │        │  Model       │  │
│  │  Model Tuning│          │  Endpoints   │        │  Monitor     │  │
│  │  (HPO)       │          │              │        │  (drift,     │  │
│  │              │          │  Batch       │        │   quality)   │  │
│  │  SageMaker   │          │  Transform   │        │              │  │
│  │  Experiments │          │              │        │  Clarify     │  │
│  └──────────────┘          │  Serverless  │        │  (bias)      │  │
│                             │  Inference   │        └──────────────┘  │
│                             └──────────────┘                          │
└──────────────────────────────────────────────────────────────────────┘
```

### Key SageMaker Components
| Component | Description |
|---|---|
| **SageMaker Studio** | Web-based IDE for entire ML lifecycle; notebooks, experiments, pipelines |
| **SageMaker Notebooks** | Managed Jupyter notebooks on EC2 |
| **Ground Truth** | Human-labeling service for training data (crowdsourced + automated) |
| **Data Wrangler** | Visual data preparation and feature engineering (no-code) |
| **Feature Store** | Centralized store for ML features (online + offline) |
| **Training Jobs** | Managed distributed training on EC2 (choose instance type) |
| **Hyperparameter Tuning (HPO)** | Automatic model tuning — find best hyperparameters |
| **Experiments** | Track and compare model training runs |
| **Pipelines** | CI/CD for ML — automate training, evaluation, deployment |
| **Model Registry** | Version control for trained models |
| **Real-time Inference** | Deploy model to HTTPS endpoint backed by EC2 instances |
| **Serverless Inference** | No instance management; auto-scales to zero |
| **Batch Transform** | Run inference on large datasets in S3 (no endpoint) |
| **Async Inference** | For large payloads or long inference times; queued |
| **Model Monitor** | Detect data drift and model quality degradation in production |
| **Clarify** | Detect bias in data and models; explain predictions |
| **Canvas** | No-code AutoML for business analysts |
| **JumpStart** | Pre-trained foundation models and ML solutions |

### SageMaker Training
```
  Training Job:
  Input:  S3 data + algorithm (built-in or custom Docker image)
  Compute: EC2 instance types (ml.m5, ml.p3 GPU, etc.)
  Output: Model artifacts → S3

  Built-in Algorithms:
  XGBoost, Linear Learner, DeepAR (forecasting), BlazingText (NLP),
  Image Classification, Object Detection, Semantic Segmentation,
  K-Means, PCA, Random Cut Forest (anomaly detection)
```

### SageMaker Inference Options
| Option | Description | Best For |
|---|---|---|
| **Real-time Endpoint** | Always-on HTTPS endpoint | Low-latency, consistent load |
| **Serverless Inference** | Auto-scales to zero; cold starts | Intermittent traffic |
| **Batch Transform** | One-time bulk inference from S3 | Large offline datasets |
| **Async Inference** | Queue-based; S3 output | Large payloads, long processing |

### Exam Key Points ✅
- **SageMaker = the ML platform** — use when pre-built AI services (Rekognition, Comprehend) don't fit your needs
- **Ground Truth** = human labeling of training data (crowdsource via Mechanical Turk or private workforce)
- **Batch Transform** = offline inference on datasets in S3 (no live endpoint)
- **SageMaker + S3** = training data in S3; model artifacts output to S3
- **Feature Store** = share features between teams; avoid duplicate feature engineering
- **Model Monitor** = detect when model performance degrades in production (data drift)
- **JumpStart** = deploy pre-built foundation models (Llama, Stable Diffusion, etc.) with one click
- **Savings Plans for SageMaker** = commit to $/hour for up to 64% discount on training/inference
- **Use when**: custom ML models, fine-tuning foundation models, building proprietary algorithms, ML pipelines for production

---

## 📄 7. Amazon Textract

### What It Is
A **document analysis service** that automatically **extracts text, handwriting, forms, tables, and structured data** from scanned documents — beyond simple OCR.

### Architecture
```
┌──────────────────────────────────────────────────────────────────────┐
│                       Amazon Textract                                 │
│                                                                       │
│  Input: Scanned document, PDF, image (S3 or bytes)                   │
│                                                                       │
│  ┌────────────────────────────────────────────────────────────────┐  │
│  │  Textract Analysis                                              │  │
│  │                                                                │  │
│  │  ┌────────────────────────────────────────────────────────┐   │  │
│  │  │  Form (key-value pairs):                                │   │  │
│  │  │  "Patient Name:" → "John Smith"                        │   │  │
│  │  │  "Date of Birth:" → "01/15/1985"                       │   │  │
│  │  └────────────────────────────────────────────────────────┘   │  │
│  │  ┌────────────────────────────────────────────────────────┐   │  │
│  │  │  Table:                                                 │   │  │
│  │  │  | Item    | Qty | Price |                             │   │  │
│  │  │  | Widget  |  5  | $10   |                             │   │  │
│  │  └────────────────────────────────────────────────────────┘   │  │
│  │  ┌────────────────────────────────────────────────────────┐   │  │
│  │  │  Raw Text + Word Positions (bounding boxes)             │   │  │
│  │  └────────────────────────────────────────────────────────┘   │  │
│  └────────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────┘
```

### Textract vs Simple OCR
| Feature | Simple OCR | Amazon Textract |
|---|---|---|
| **Raw text** | ✅ | ✅ |
| **Form key-value pairs** | ❌ | ✅ |
| **Table extraction** | ❌ | ✅ |
| **Handwriting** | Limited | ✅ |
| **Position/bounding box** | Varies | ✅ |
| **Confidence scores** | Varies | ✅ |

### Specialized Features
| Feature | Description |
|---|---|
| **Analyze Document** | Extract text, forms, tables from single page |
| **Start Document Analysis** | Async multi-page PDF processing |
| **Queries** | Ask specific questions: "What is the invoice total?" |
| **Expense Analysis** | Specialized extraction for receipts and invoices |
| **Identity Document Analysis** | Extract fields from passports, driver's licenses |
| **Lending Document Analysis** | Mortgage, loan, financial document processing |

### Common Use Cases
| Use Case | Description |
|---|---|
| **Invoice processing** | Extract vendor, amount, date automatically |
| **Medical records** | Extract patient data from forms |
| **Identity verification** | Read passport/license fields |
| **Contract analysis** | Extract clauses and key terms |
| **Tax document processing** | W-2, 1099 data extraction |

### Exam Key Points ✅
- **Textract ≠ OCR** — goes beyond raw text to understand document structure (forms, tables)
- **Textract + Comprehend** = extract text from document → analyze sentiment or entities
- **Textract + A2I (Augmented AI)** = human review for low-confidence extractions
- **Async API** for multi-page documents; sync API for single pages
- **Use when**: processing scanned PDFs, invoices, tax forms, medical records, identity documents — any structured document data extraction

---

## 🎙️ 8. Amazon Transcribe

### What It Is
An **automatic speech recognition (ASR)** service that converts **audio/video to text** — transcription for media, call centers, real-time captioning, and more.

### Key Features
| Feature | Description |
|---|---|
| **Batch Transcription** | Upload audio/video to S3 → get transcript |
| **Streaming Transcription** | Real-time transcription via WebSocket or HTTP/2 |
| **Speaker Diarization** | Identify and label different speakers ("Speaker 1:", "Speaker 2:") |
| **Custom Vocabulary** | Add domain-specific terms (medical jargon, product names) |
| **Custom Language Models** | Fine-tune on your domain-specific audio corpus |
| **Automatic Content Redaction** | Automatically redact PII from transcripts (SSN, credit cards) |
| **Transcribe Medical** | Clinical terminology; HIPAA-eligible |
| **Channel Identification** | Separate transcription per channel (customer vs agent) |
| **Vocabulary Filtering** | Remove or mask profanity |
| **Multi-language** | 100+ languages and dialects |

### Common Use Cases
| Use Case | Features Used |
|---|---|
| **Call center analytics** | Channel identification + Comprehend sentiment |
| **Media subtitles/captions** | Batch transcription → add to video |
| **Meeting minutes** | Streaming or batch transcription |
| **Clinical documentation** | Transcribe Medical |
| **Voice search** | Real-time transcription of spoken queries |
| **Compliance** | Record and transcribe calls for regulatory requirements |

### Exam Key Points ✅
- **Transcribe = Speech → Text** (opposite of Polly which is Text → Speech)
- **Transcribe Medical** = clinical vocabulary; HIPAA-eligible for healthcare
- **Speaker Diarization** = who said what — critical for call center recordings
- **PII Redaction** = automatically remove sensitive info from transcripts
- **Streaming** = real-time transcription; **Batch** = async processing of stored audio
- **Use when**: transcribing call center recordings, generating subtitles, converting meeting audio to notes, voice search indexing

---

## 🌐 9. Amazon Translate

### What It Is
A **neural machine translation** service that delivers **fast, high-quality, and affordable language translation** — for websites, documents, or real-time user-generated content.

### Key Features
| Feature | Description |
|---|---|
| **75+ languages** | Translate between any supported language pair |
| **Real-time translation** | Synchronous API for immediate results |
| **Batch translation** | Async translation of S3 document sets |
| **Custom terminology** | Ensure brand names, product names translate correctly |
| **Parallel data** | Customize translation style for your domain |
| **Formality** | Control formal vs informal tone (some languages) |
| **Profanity masking** | Block profane content in output |

### Common Use Cases
| Use Case | Description |
|---|---|
| **Multilingual applications** | Translate UI content for global users |
| **Customer support** | Translate tickets from international customers |
| **Content localization** | Translate documents, marketing content |
| **Real-time chat** | Translate messages between users of different languages |
| **Media subtitles** | Transcribe (audio → text) + Translate (to target language) |
| **Sentiment analysis** | Translate → Comprehend (analyze non-English reviews) |

### Exam Key Points ✅
- **Translate = language translation** — one language to another
- **Custom Terminology** = ensure your brand/product names translate exactly right
- **Common pipeline**: Transcribe (speech → text) → Translate (to target language) → Polly (text → speech) — for real-time voice translation
- **Use when**: multilingual applications, translating customer feedback from non-English markets, localizing content for global audiences

---

## 🔄 Quick Reference: Which ML Service for Which Problem?

```
┌──────────────────────────────────────────────────────────────────────┐
│              ML Service Selection — Decision Framework                │
│                                                                       │
│  Problem / Scenario                   Service                        │
│  ─────────────────────────────────    ──────────────────────────    │
│  Analyze sentiment of customer review  Amazon Comprehend             │
│  Extract entities from text            Amazon Comprehend             │
│  Detect PII in text documents          Comprehend (PII detection)    │
│  Search across internal documents      Amazon Kendra                 │
│  Build a chatbot / voice bot           Amazon Lex                    │
│  Automated call center / IVR           Amazon Connect + Lex          │
│  Convert text to speech                Amazon Polly                  │
│  Detect objects in images              Amazon Rekognition            │
│  Moderate user-uploaded images         Rekognition (Content Mod.)    │
│  Face-based authentication             Rekognition (Face Search)     │
│  Build/train custom ML models          Amazon SageMaker              │
│  Extract text from scanned documents   Amazon Textract               │
│  Extract forms and tables from PDFs    Amazon Textract               │
│  Convert speech/audio to text          Amazon Transcribe             │
│  Transcribe call center recordings     Transcribe (+ diarization)    │
│  Translate between languages           Amazon Translate              │
│  Real-time voice translation (pipeline)Transcribe+Translate+Polly    │
│  Healthcare clinical text extraction   Comprehend Medical / Textract │
└──────────────────────────────────────────────────────────────────────┘
```

### Common ML Pipelines (Exam Patterns)
```
  Content Moderation Pipeline:
  S3 (image upload) ──▶ Rekognition ──▶ SNS (flag) ──▶ Human review

  Document Intelligence Pipeline:
  S3 (PDF upload) ──▶ Textract (extract) ──▶ Comprehend (analyze)
                                          ──▶ DynamoDB (store)

  Multilingual Voice Translation:
  Microphone ──▶ Transcribe (speech→text) ──▶ Translate (language)
              ──▶ Polly (text→speech in target language)

  Call Center Analytics:
  Phone call ──▶ Connect ──▶ Transcribe (speech→text)
                          ──▶ Comprehend (sentiment analysis)

  Intelligent Document Search:
  S3 / SharePoint ──▶ Kendra (index) ──▶ User query ──▶ Exact answer
```

---

## 🚨 Common Exam Traps

1. **Polly ≠ Transcribe** — Polly = text TO speech; Transcribe = speech TO text (opposite directions)
2. **Textract ≠ OCR** — Textract understands document structure (forms, tables); basic OCR just extracts raw text
3. **Lex ≠ Polly** — Lex = conversational bot (understands intent); Polly = reads text aloud (no understanding)
4. **Rekognition for images/video ONLY** — not for text documents; use Textract for document OCR
5. **SageMaker is needed ONLY for custom models** — if a pre-built AI service (Rekognition, Comprehend, etc.) fits the use case, prefer it over SageMaker
6. **Kendra vs OpenSearch** — Kendra = intelligent enterprise document search with natural language; OpenSearch = general-purpose search and log analytics (not intelligent Q&A)
7. **Amazon Connect + Lex** = call center IVR — Connect handles telephony; Lex handles conversation
8. **Comprehend Medical ≠ Textract** — Comprehend Medical extracts clinical entities from unstructured text (doctor notes); Textract extracts structured data from scanned forms/documents
9. **Transcribe Medical** is HIPAA-eligible; standard Transcribe is not automatically HIPAA-covered
10. **Rekognition Content Moderation** = confidence scores returned; YOU decide the threshold for rejection (not automatic blocking)

---

*Last updated for AWS SAA-C03 exam preparation*
