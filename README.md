# SIH26088 – SIA: Smart Indian Assistant

## Multilingual Cooperative Governance & Legal Assistance Chatbot

SIA (Smart Indian Assistant) is an AI-powered, multilingual, voice-first chatbot designed to help cooperative members, farmers, and rural stakeholders understand cooperative governance, legal provisions, government schemes, PACS services, crop insurance, financial literacy, and grievance procedures in their preferred language.

The system uses Retrieval-Augmented Generation (RAG) to provide reliable, source-grounded answers using information collected from official government sources.

Your Voice. Your Language. Your Rights.


## 📌 Problem Statement

Problem Statement ID: SIH26088

Title: Multilingual Cooperative Governance & Legal Assistance Chatbot

Organization: Ministry of Cooperation

Category: Hardware

Theme: Agriculture, FoodTech & Rural Development

### Problem

Cooperative members, farmers, and rural stakeholders often face difficulties accessing reliable information about cooperative laws, government schemes, PACS services, crop insurance, financial literacy, and grievance redressal.

Information is distributed across different government portals and may be difficult to understand due to language barriers, complex legal terminology, and limited digital accessibility.

### Our Solution

We propose SIA – Smart Indian Assistant, a multilingual AI-powered chatbot that allows users to ask questions through voice or text and receive simple, understandable, and source-grounded answers in their preferred language.


## 🎯 Objectives

- Provide multilingual access to cooperative and government information.
- Make complex legal and governance information easier to understand.
- Provide voice-based assistance for users with limited digital literacy.
- Answer questions using verified government documents and webpages.
- Help users understand cooperative schemes and PACS services.
- Provide information related to crop insurance such as PMFBY.
- Provide financial-literacy assistance.
- Guide users regarding cooperative grievance procedures.
- Display relevant sources used for generating answers.
- Provide a low-cost hardware-based access point using Raspberry Pi.


## ✨ Key Features

### 🌐 Multilingual Chatbot

Users can communicate with SIA in their preferred supported Indian language through text or voice.

### 🎙️ Voice-Based Assistance

Users can speak their questions using a microphone and receive responses through both the touchscreen and speaker.

### 📚 RAG-Based Knowledge System

SIA uses Retrieval-Augmented Generation(RAG) to retrieve relevant information from verified government documents before generating an answer.

### ⚖️ Cooperative Governance & Legal Guidance

The chatbot can provide simplified guidance regarding cooperative governance, laws, rules, by-laws, guidelines, and related information available in the knowledge base.

### 🏛️ Government Scheme Assistance

SIA provides information about relevant government schemes and services related to cooperation, agriculture, crop insurance, financial literacy, and rural development.

### 🔎 Source-Grounded Answers

Answers can show the relevant government source or document so that users can verify important information.

### 🗣️ Simple Language

Complex government and legal information is converted into easy-to-understand conversational responses.

### 🖥️ Raspberry Pi Kiosk

A touchscreen-based Raspberry Pi prototype provides a simple physical interface for rural and cooperative users.



# 🧠 System Architecture

```text
                ┌─────────────────────┐
                │        USER         │
                │   Voice / Text      │
                └──────────┬──────────┘
                           │
                           ▼
                ┌─────────────────────┐
                │ Language Detection  │
                │     + STT           │
                └──────────┬──────────┘
                           │
                           ▼
                ┌─────────────────────┐
                │  Query Processing   │
                └──────────┬──────────┘
                           │
                           ▼
                ┌─────────────────────┐
                │    FAISS Vector     │
                │     Database        │
                │    RAG Retrieval    │
                └──────────┬──────────┘
                           │
                           ▼
                ┌─────────────────────┐
                │        LLM          │
                │ Grounded Response   │
                └──────────┬──────────┘
                           │
                           ▼
                ┌─────────────────────┐
                │ Translation + TTS   │
                └──────────┬──────────┘
                           │
                           ▼
                ┌─────────────────────┐
                │ Screen + Speaker    │
                │ Final Response      │
                └─────────────────────┘


# 📚 Knowledge Base

SIA uses a curated knowledge base containing information collected from official government sources.

For the initial prototype, we focus on 5–6 major government portals and approximately 20–40 high-value official pages/PDFs.

## Official Sources

### 1. Ministry of Cooperation
- Cooperative governance
- PACS
- Cooperative schemes
- Cooperative initiatives
- Guidelines and official documents

### 2. PMFBY
- Crop insurance
- Farmer information
- Premium-related information
- Policy information
- Claims
- Grievance information

### 3. India.gov.in
- Government schemes
- Citizen services
- Government programmes
- Relevant public information

### 4. RBI
- Financial literacy
- Banking awareness
- Financial information
- Consumer awareness

### 5. NABARD
- Rural finance
- Cooperative development
- Rural development
- Agriculture-related financial information

### 6. NCDC
- Cooperative development
- Financial assistance
- Cooperative programmes
- Cooperative-related initiatives


# 🔍 RAG Pipeline

SIA uses Retrieval-Augmented Generation (RAG) to retrieve relevant information from the knowledge base before generating an answer.

```text
Official Government Pages / PDFs
              │
              ▼
      Document Collection
              │
              ▼
       Text Extraction
              │
              ▼
      Cleaning & Chunking
              │
              ▼
          Embeddings
              │
              ▼
       FAISS Vector Index
              │
              ▼
      Semantic Retrieval
              │
              ▼
             LLM
              │
              ▼
      Grounded Answer
              │
              ▼
       Source / Reference


# 🌍 Multilingual Approach

SIA is designed as a multilingual AI assistant that allows users to interact with the system in their preferred language.

The system uses a single verified knowledge base instead of maintaining a separate knowledge base for every language.

```text
User Voice / Text
       │
       ▼
Language Detection
       │
       ▼
Speech-to-Text
       │
       ▼
Query Processing
       │
       ▼
FAISS Knowledge Base
       │
       ▼
Relevant Information
       │
       ▼
LLM
       │
       ▼
Response Generation
       │
       ▼
Translation
       │
       ▼
Text + Voice Response


# 🏛️ State-wise Expansion

The initial prototype focuses on universal government portals that provide information applicable across India.

In future versions, SIA can be expanded by adding state-specific government sources to provide information relevant to individual states.

### State-specific information can include:

- State cooperative laws
- State cooperative rules
- Registrar of Cooperative Societies (RCS) information
- State-specific government schemes
- State-specific PACS information
- State-specific grievance procedures
- State-level cooperative guidelines

### Future Architecture

```text
              SIA Knowledge System
                       │
             ┌─────────┴─────────┐
             │                   │
     Universal Sources      State Sources
             │                   │
      Ministry of Coop.     State RCS
      PMFBY                 State Schemes
      RBI                   State Rules
      NABARD                State Guidelines
      NCDC
             │                   │
             └─────────┬─────────┘
                       ▼
                    FAISS
                       ▼
                      RAG
                       ▼
                      LLM


# 🖥️ Hardware Prototype

SIA will be deployed as a low-cost Raspberry Pi-based kiosk that provides an easy-to-use interface for cooperative members, farmers, and rural users.

The kiosk will support both touchscreen and voice-based interaction.

## Main Hardware Components

- Raspberry Pi
- 7-inch touchscreen
- USB microphone
- Speaker
- MicroSD card
- Power supply
- Raspberry Pi case/cooling
- Push-to-talk button
- HDMI/USB cables
- Jumper wires

## Hardware Architecture

```text
                 ┌──────────────────┐
                 │    Touchscreen   │
                 │                  │
                 │   SIA Assistant  │
                 └────────┬─────────┘
                          │
                          ▼
                 ┌──────────────────┐
                 │   Raspberry Pi   │
                 └────────┬─────────┘
                          │
                 ┌────────┴────────┐
                 │                 │
                 ▼                 ▼
            Microphone          Speaker
                 │                 │
                 └───────┬─────────┘
                         │
                         ▼
                  SIA AI System


# 🔄 End-to-End Working

The complete SIA system works through the following process:

```text
1. User asks a question
            ↓
2. Voice / Text Input
            ↓
3. Language Detection
            ↓
4. Speech-to-Text (if voice input)
            ↓
5. Query Processing
            ↓
6. Search FAISS Knowledge Base
            ↓
7. Retrieve Relevant Government Information
            ↓
8. Send Query + Retrieved Context to LLM
            ↓
9. Generate Grounded Answer
            ↓
10. Translate Response to User's Language
            ↓
11. Display Answer on Touchscreen
            ↓
12. Convert Answer to Speech
            ↓
13. Play Response Through Speaker


# 🛠️ Technology Stack

| Component | Technology |
|---|---|
| Frontend | HTML, CSS, JavaScript / React |
| Backend | Python + FastAPI |
| RAG | Retrieval-Augmented Generation |
| Vector Database | FAISS |
| LLM | Hosted / Local LLM |
| Speech-to-Text | Whisper / Suitable Indian-language STT |
| Translation | Multilingual / Indic Language Model |
| Text-to-Speech | Indian-language TTS |
| Hardware | Raspberry Pi |
| Display | 7-inch Touchscreen |
| Audio Input | USB Microphone |
| Audio Output | Speaker |
| Knowledge Sources | Official Government Portals |

## Technology Flow

```text
Frontend
   ↓
FastAPI Backend
   ↓
Language Processing
   ↓
RAG + FAISS
   ↓
LLM
   ↓
Translation
   ↓
Text / Voice Response
   ↓
Raspberry Pi Interface

---

# 👥 Team

| Member | Role |
|---|---|
| Ratnadip | Team Leader + Backend/RAG + System Integration |
| Dipanshu | Hardware + Raspberry Pi Lead |
| Mohit | Frontend/UI Lead |
| Debasmita | RAG + Knowledge Base + PPT + QA |
| Jiya | Hardware Support + Speaker/Presenter |
| Chesta | Junior Technical Support + Testing |

## 👨‍💻 Team Responsibilities

### Ratnadip – Team Leader + Backend/RAG + System Integration

- Overall project coordination
- System architecture
- Backend development
- FastAPI
- RAG and LLM integration
- Multilingual pipeline
- API integration
- Frontend-backend integration
- Final system integration
- Demo coordination

### 🔧 Dipanshu – Hardware + Raspberry Pi Lead

- Raspberry Pi setup
- Touchscreen integration
- Microphone setup
- Speaker setup
- Hardware connectivity
- Power configuration
- Kiosk assembly
- Hardware troubleshooting

### 💻 Mohit – Frontend/UI Lead

- User interface
- Touchscreen interface
- Chat interface
- Language selection
- Voice controls
- Response display
- Source display
- Frontend-backend integration

### 📚 Debasmita – RAG + Knowledge Base + PPT + QA

- Government document preparation
- Knowledge-base organization
- Document cleaning
- Text preparation
- Chunking
- Embedding preparation
- FAISS/RAG development
- Retrieval testing
- Answer verification
- Quality assurance
- Complete PPT creation

### 🔧 Jiya – Hardware Support + Speaker/Presenter

- Assist with Raspberry Pi setup
- Assist with touchscreen testing
- Microphone testing
- Speaker testing
- Hardware connectivity checks
- End-to-end hardware testing
- Demo presentation
- Demo narration
- Judge interaction

### 🧪 Chesta – Junior Technical Support + Testing

- Collect and organize relevant official documents
- Prepare test questions
- Maintain testing checklist
- Organize source information
- Perform chatbot testing
- Verify answers against official sources
- Perform multilingual testing
- Perform UI testing
- Perform end-to-end testing
- Report bugs
- Perform regression testing


# 📂 Project Structure

```text
SIH26088-SIA/
│
├── frontend/
│
├── backend/
│
├── rag/
│
├── data/
│   ├── ministry_of_cooperation/
│   ├── pmfby/
│   ├── india_gov/
│   ├── rbi/
│   ├── nabard/
│   └── ncdc/
│
├── hardware/
│
├── tests/
│
├── .gitignore
└── README.md


# 🧪 Testing

SIA will be tested to ensure that the chatbot provides accurate, relevant, and source-grounded responses.

## RAG Testing

- Retrieval accuracy
- Answer correctness
- Source verification
- Relevant document retrieval
- Handling of unavailable information

## Multilingual Testing

- Language detection
- English queries
- Hindi queries
- Punjabi queries
- Other supported languages

## Voice Testing

- Speech recognition
- Microphone input
- Text-to-Speech
- Speaker output

## Functional Testing

- PACS-related questions
- Cooperative governance questions
- Government scheme questions
- PMFBY questions
- Financial-literacy questions
- Grievance-related questions

## Hardware Testing

- Raspberry Pi
- Touchscreen
- Microphone
- Speaker
- Power supply
- Connectivity

## Example Test Questions

```text
What is PACS?

What services are provided by PACS?

What is PMFBY?

Who can benefit from crop insurance?

How can I get information about cooperative schemes?

What is cooperative governance?

Where can I raise a cooperative grievance?

What financial services should cooperative members know about?


# 🔐 Responsible AI

SIA is designed to provide information and guidance based on verified sources.

It is not intended to replace:

- Lawyers
- Government officers
- Cooperative registrars
- Financial advisors
- Other authorized authorities

For important legal, financial, or government matters, users should be directed to the appropriate official authority and source.

## Reliability

SIA uses a RAG-based approach to reduce unsupported responses by retrieving relevant information from the verified knowledge base before generating an answer.

The system is designed to:

- Prefer information from official sources.
- Provide relevant source references where available.
- Avoid presenting unsupported information as fact.
- Inform the user when sufficient information is not available.


# 🔮 Future Scope

SIA can be further expanded and improved in the following areas:

## 🌐 More Indian Languages

Support additional Indian languages and regional languages to make SIA accessible to more users across India.

## 🏛️ State-wise Information

Add state-specific sources such as:

- State cooperative laws
- State cooperative rules
- Registrar of Cooperative Societies
- State-specific government schemes
- State-specific grievance procedures
- State-specific PACS information

## 📱 Mobile Application

Develop a mobile application so users can access SIA from smartphones.

## 📡 Improved Offline Capability

Introduce local caching and offline-friendly features for areas with limited or unreliable internet connectivity.

## 🧾 Grievance Assistance

Expand the system to guide users through cooperative grievance procedures and help identify the appropriate authority.

## 🏢 Cooperative Office Deployment

Deploy SIA kiosks in:

- PACS offices
- Cooperative societies
- Rural service centers
- Government assistance centers

## 📊 Feedback and Analytics

Add:

- User feedback
- Frequently asked questions
- Usage analytics
- Retrieval quality monitoring

## 🤖 Improved AI Capabilities

Future versions can include improved multilingual models, better legal-document retrieval, and more advanced conversational capabilities.


# 🎯 Project Vision

SIA aims to make reliable cooperative and government information accessible through voice, language, and simple conversation.

The goal is to reduce information and language barriers faced by cooperative members, farmers, and rural stakeholders by providing an easy-to-use AI assistant backed by verified government sources.

## SIA – Smart Indian Assistant

 Your Voice. Your Language. Your Rights.

# 🎥 Demo

The prototype demonstrates:

- Multilingual text-based interaction
- Voice-based interaction
- Government information retrieval using RAG
- Source-grounded responses
- Raspberry Pi touchscreen interface
- Audio response through speaker


## 📄 License

This project is developed as a prototype for Smart India Hackathon 2026.

# 🏆 Smart India Hackathon 2026

**Problem Statement ID:** SIH26088

**Problem Statement:** Multilingual Cooperative Governance & Legal Assistance Chatbot

**Organization:** Ministry of Cooperation

**Category:** Hardware

**Theme:** Agriculture, FoodTech & Rural Development

**Project Name:** SIA – Smart Indian Assistant

## 📌 Project Status

**Status:** In Development

SIA is being developed as a Smart India Hackathon 2026 prototype with a focus on:

- Multilingual AI assistance
- RAG-based government knowledge assistance
- Cooperative governance and legal information
- Government scheme assistance
- Agriculture and crop insurance support
- Voice-based interaction
- Raspberry Pi-based hardware
- Source-grounded responses
- Rural accessibility
