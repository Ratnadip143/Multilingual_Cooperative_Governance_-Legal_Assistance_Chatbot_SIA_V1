# SIH26187 – AI-Based Intelligent Border Surveillance

## AI-Based Intelligent Video Analytics Platform for Border Surveillance using Existing CCTV Infrastructure

![Project Status](https://img.shields.io/badge/Status-In%20Development-orange)
![Smart India Hackathon](https://img.shields.io/badge/SIH-2026-blue)
![Category](https://img.shields.io/badge/Category-Software-green)
![Theme](https://img.shields.io/badge/Theme-Blockchain%20%26%20Cybersecurity-purple)

---

## 📌 Problem Statement

**Problem Statement ID:** SIH26187

**Title:** AI-Based Intelligent Video Analytics Platform for Border Surveillance using Existing CCTV Infrastructure

**Organization:** Ministry of Home Affairs

**Department:** Sashastra Seema Bal (SSB), Police II Division

**Category:** Software

**Theme:** Blockchain & Cybersecurity

---

## 📖 Project Overview

Border security forces deploy CCTV cameras at Border Out Posts (BOPs), border roads, and other strategic locations for surveillance and monitoring.

However, conventional CCTV systems mainly provide video recording and live monitoring, which requires continuous human observation. Advanced surveillance capabilities such as human tracking, vehicle identification, intrusion detection, suspicious activity detection, and automated number plate recognition generally require specialized and expensive surveillance solutions.

Our project proposes an **AI-powered video analytics platform** that transforms existing CCTV infrastructure into an intelligent surveillance system.

The platform uses **Artificial Intelligence, Machine Learning, Computer Vision, and Video Analytics** to analyze CCTV video streams and generate actionable information in real time.

The prototype is designed to operate over a **local network**, allowing video processing, event logging, alerts, and storage without mandatory dependence on cloud services.

---

## 🎯 Objectives

- Enhance existing CCTV infrastructure with AI-based intelligence.
- Detect and track humans and vehicles automatically.
- Detect unauthorized entry into restricted areas.
- Identify suspicious activities and movements.
- Generate real-time security alerts.
- Support Automatic Number Plate Recognition (ANPR).
- Provide night-time movement detection.
- Maintain local surveillance event records.
- Provide a centralized monitoring dashboard.
- Reduce dependence on expensive dedicated surveillance hardware.
- Improve situational awareness and response time.
- Build a cost-effective and scalable prototype.

---

# 🚀 Key Features

### 1. Human Detection & Tracking
Detect and track people appearing in the CCTV video stream.

### 2. Vehicle Detection & Classification
Detect vehicles and classify them into categories such as car, motorcycle, truck, etc.

### 3. Face Detection
Detect faces appearing in the surveillance footage for monitoring purposes.

### 4. Automatic Number Plate Recognition (ANPR)
Detect vehicle number plates and extract readable plate information where image quality permits.

### 5. Virtual Fence / Restricted Zone Detection
Define restricted areas on the camera view and generate an alert when a detected person or vehicle enters the zone.

### 6. Suspicious Activity Detection
Identify predefined suspicious movement patterns or activities and flag them for human verification.

### 7. Night-Time Movement Detection
Detect movement during low-light/night-time conditions using available camera footage.

### 8. Real-Time Alerts
Generate alerts when important events such as restricted-zone intrusion or suspicious movement are detected.

### 9. Event Logging
Store important event information such as event type, timestamp, camera ID, and detection details.

### 10. Risk / Threat Assessment
Assign a simple risk level to detected events to help prioritize alerts.

### 11. CCTV Video Integration
Support video input from existing CCTV/IP-camera streams and recorded footage for demonstration.

### 12. Monitoring Dashboard
Provide a centralized dashboard for viewing camera feeds, alerts, events, and detection information.

---

# 🏗️ System Architecture

```text
                 ┌──────────────────┐
                 │   CCTV / IP      │
                 │     Camera       │
                 └────────┬─────────┘
                          │
                          ▼
                 ┌──────────────────┐
                 │   Local Router   │
                 │   LAN Network    │
                 └────────┬─────────┘
                          │
                          ▼
                 ┌──────────────────┐
                 │  Local Server /  │
                 │     Laptop       │
                 └────────┬─────────┘
                          │
                          ▼
              ┌────────────────────────┐
              │ AI / Computer Vision    │
              │ Video Analytics Engine  │
              └───────────┬────────────┘
                          │
                          ▼
              ┌────────────────────────┐
              │ Detection & Event       │
              │ Analysis                │
              └───────────┬────────────┘
                          │
                ┌─────────┴─────────┐
                │                   │
                ▼                   ▼
       ┌────────────────┐   ┌────────────────┐
       │    Backend     │   │ Local Storage  │
       │    Services    │   │ & Event Logs   │
       └───────┬────────┘   └────────────────┘
               │
               ▼
       ┌────────────────┐
       │   Dashboard    │
       │    Frontend    │
       └───────┬────────┘
               │
               ▼
       ┌────────────────┐
       │ Alerts / Event │
       │ Visualization  │
       └────────────────┘

---

# 🤖 AI & Computer Vision Pipeline

The AI module analyzes CCTV video streams and extracts useful information for surveillance.

```text
CCTV Video
     ↓
Frame Extraction
     ↓
Object Detection
     ↓
Object Tracking
     ↓
Event Analysis
     ↓
┌──────────────────────────────┐
│ Person Detection             │
│ Vehicle Detection            │
│ Virtual Fence Detection      │
│ Suspicious Activity          │
│ ANPR                         │
│ Night Movement Detection     │
└──────────────┬───────────────┘
               ↓
        Risk Assessment
               ↓
        Alert Generation
               ↓
       Dashboard + Logging

---

# 🚀 Key Features

- 👤 Human Detection and Tracking
- 🚗 Vehicle Detection and Classification
- 🚧 Virtual Fence Intrusion Detection
- ⚠️ Suspicious Activity Detection
- 🌙 Night-Time Movement Detection
- 🔢 Automatic Number Plate Recognition (ANPR)
- 📹 Real-Time CCTV Video Analysis
- 🚨 Real-Time Security Alerts
- 📝 Event Logging and History
- 📊 Surveillance Dashboard
- 🖥️ Local Network Operation
- 💾 Local Storage of Video and Event Data

---

# 🛠️ Technology Stack

### AI & Computer Vision
- Python
- OpenCV
- YOLO-based Object Detection
- Computer Vision
- ANPR / OCR

### Backend
- Python
- FastAPI / Flask
- REST APIs

### Frontend
- HTML
- CSS
- JavaScript
- Dashboard UI

### Hardware & Networking
- IP CCTV Camera
- Local Network / Wi-Fi Router
- Laptop / Local Processing System
- Local Storage

### Data & Storage
- Local Video Storage
- Event Logs
- JSON / SQLite

### Development Tools
- Git
- GitHub
- VS Code

---

# 🏗️ System Architecture

The system follows a local-network architecture where CCTV footage is processed locally using AI and Computer Vision.

```text
┌──────────────────┐
│   IP CCTV Camera │
└────────┬─────────┘
         │
         │ Live Video Stream
         ▼
┌──────────────────┐
│   Local Network  │
│  Wi-Fi / Router  │
└────────┬─────────┘
         │
         ▼
┌──────────────────────────┐
│ Local Processing Laptop  │
│                          │
│ AI + Computer Vision     │
│ Video Analytics Engine   │
└────────┬─────────────────┘
         │
         ├───────────────┐
         ▼               ▼
┌────────────────┐ ┌────────────────┐
│ Event Detection│ │ Local Storage  │
│ & Risk Analysis│ │ Video + Logs   │
└───────┬────────┘ └────────────────┘
        │
        ▼
┌──────────────────────────┐
│ Backend / API Services   │
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│ Surveillance Dashboard   │
│                          │
│ Live Feed • Alerts       │
│ Events • Analytics       │
└──────────────────────────┘

---

# ⚙️ How It Works

1. **Video Capture**  
   The IP CCTV camera captures live video footage from the surveillance area.

2. **Local Video Streaming**  
   The video stream is transmitted through the local network to the processing system.

3. **Frame Processing**  
   The system extracts and processes video frames using Computer Vision techniques.

4. **AI Detection**  
   The AI model detects people, vehicles and other relevant objects in the video.

5. **Activity Analysis**  
   The system analyzes movement and predefined surveillance zones to identify potentially suspicious activities.

6. **Event Generation**  
   When a defined event is detected, the system generates an alert and records the event details.

7. **Local Storage**  
   Relevant video clips, timestamps and event information are stored locally.

8. **Dashboard Visualization**  
   The dashboard displays the live feed, detected events, alerts and system information to the user.

---

# 🎯 Project Objectives

- Transform existing CCTV infrastructure into an intelligent surveillance system.
- Detect and track people and vehicles in real time.
- Identify suspicious activities and unauthorized movement.
- Provide virtual fence intrusion detection.
- Support Automatic Number Plate Recognition (ANPR).
- Generate real-time security alerts for detected events.
- Maintain event logs for later investigation.
- Store surveillance data locally without depending on cloud services.
- Provide a simple dashboard for monitoring and situational awareness.
- Reduce the need for expensive dedicated surveillance hardware.
- Improve response time and operational awareness for security personnel.
- Build a cost-effective and scalable surveillance solution for remote locations.

---

# 👥 Team Roles

| Member | Role | Responsibilities |
|---|---|---|
| Ratnadip | Team Leader / Manager | Project planning, task distribution, team coordination, integration, progress tracking and final presentation |
| Dipanshu | Hardware + Embedded Engineer | Hardware connections, IP camera setup, local network hardware, physical prototype/model and hardware testing |
| Mohit | Frontend + Dashboard Developer | Dashboard UI, live feed interface, alerts, event display and data visualization |
| Nitish | Backend + Local Network Engineer | Backend APIs, CCTV stream handling, local network communication, local storage and integration with AI module |
| Debasmita | QA + UI/UX + Documentation / Presenter | Testing, UI/UX improvements, bug reporting, documentation, demo preparation and presentation support |
| Akshay | AI / Computer Vision Engineer | AI model selection/training, object detection, tracking, suspicious activity detection, ANPR and Computer Vision pipeline |

---

# 🔧 Hardware Prototype

The project will include a low-cost physical prototype to demonstrate how AI-based surveillance alerts can trigger physical warning devices.

### Proposed Hardware

- IP CCTV Camera / Webcam
- Local Wi-Fi Router
- Laptop / Local Server
- ESP32
- LED
- Buzzer
- Breadboard
- Jumper Wires
- USB Cable / Power Supply

### Hardware Alert Flow

```text
CCTV Camera
     ↓
AI Detection
     ↓
Security Event
     ↓
Backend
     ↓
ESP32
   ↙   ↘
 LED   Buzzer

---

# 🌐 Local Network & Data Storage

The system is designed to operate on a **local network without mandatory cloud connectivity**.

### Local Network Flow

```text
IP CCTV Camera
       ↓
   Wi-Fi Router
       ↓
Local Processing Laptop
       ↓
AI + Backend
       ↓
Dashboard + Local Storage
---

# 📊 Project Status

**Current Status:** 🚧 In Development

The project is currently in the planning and development phase.

### Development Stages

- [x] Problem identification
- [x] Feature selection
- [x] System architecture planning
- [x] Team role distribution
- [ ] AI module development
- [ ] Backend development
- [ ] Frontend dashboard development
- [ ] Hardware prototype development
- [ ] System integration
- [ ] Testing and optimization
- [ ] Final demonstration

The project will be continuously updated as development progresses.

---

# 🧪 Testing Strategy

The system will be tested module-by-module and then as a complete integrated system.

### AI Testing
- Human detection accuracy
- Vehicle detection accuracy
- Object tracking
- Virtual fence detection
- ANPR results
- Suspicious activity detection
- Night-time detection

### Backend Testing
- API communication
- CCTV stream handling
- Event generation
- Data storage
- Local network communication

### Frontend Testing
- Dashboard functionality
- Live feed display
- Alert display
- Event history
- System status

### Hardware Testing
- ESP32 connectivity
- LED response
- Buzzer response
- Alert triggering
- Local network communication

### Integration Testing

The complete workflow will be tested:

```text
CCTV
 ↓
AI Detection
 ↓
Event Detection
 ↓
Backend
 ↓
Dashboard
 ↓
ESP32 Alert
 ↓
Local Event Storage

---

# 🎯 Expected Outcome

The final prototype aims to demonstrate how existing CCTV infrastructure can be enhanced with AI-based video analytics to provide intelligent and automated border surveillance.

The system is expected to:

- Detect and track people and vehicles.
- Identify restricted-zone intrusions.
- Detect predefined suspicious activities.
- Read vehicle number plates using ANPR.
- Generate real-time security alerts.
- Display surveillance information through a centralized dashboard.
- Store important events and recordings locally.
- Trigger physical alerts using ESP32, LED and buzzer.
- Operate primarily over a local network without mandatory cloud connectivity.
- Provide a cost-effective and scalable prototype.

---

# 🌟 Advantages

- **Cost Effective:** Uses existing CCTV infrastructure and low-cost hardware for the prototype.
- **Local Processing:** Core functionality can operate within a local network without mandatory cloud dependency.
- **Real-Time Monitoring:** Detects important events and provides alerts quickly.
- **Reduced Manual Monitoring:** AI assists operators by automatically identifying potentially important events.
- **Scalable:** Additional cameras and AI modules can be added in the future.
- **Modular:** AI, backend, frontend and hardware modules can be developed and integrated independently.
- **Centralized Monitoring:** Provides a single dashboard for viewing cameras, alerts and events.
- **Physical Alert Support:** ESP32-based LED and buzzer can provide immediate physical alerts.
- **Local Data Storage:** Important surveillance data can be stored locally for later analysis.

---

# 🔮 Future Scope

The project can be further enhanced in the future with:

- Multi-camera intelligent tracking
- Advanced suspicious behaviour analysis
- Improved night-time and low-light detection
- Edge AI processing
- GPU-based real-time processing
- Advanced threat and risk assessment
- Improved ANPR accuracy
- Secure centralized command-center integration
- Integration with additional authorized surveillance systems
- Deployment across multiple border surveillance locations
- Advanced AI models for behavioural analysis
- Automated generation of detailed surveillance reports

---

# 📅 Project Timeline

| Phase | Duration | Main Activities |
|---|---|---|
| Planning | Days 1–2 | Architecture, feature finalization and setup |
| Individual Development | Days 3–5 | AI, backend, frontend and hardware modules |
| Integration | Days 6–9 | Connect AI, backend, dashboard and hardware |
| Advanced Features | Days 10–11 | ANPR, suspicious activity and night detection |
| Testing | Days 12–13 | System testing, bug fixing and optimization |
| Final Preparation | Days 14–15 | Demo rehearsal, documentation and presentation |

During the 36-hour hackathon, the team will focus primarily on **integration, improvements, testing, modifications and final presentation preparation**.

---

# ⚠️ Disclaimer

This project is an academic prototype developed for **Smart India Hackathon 2026**.

The system is intended to demonstrate the feasibility of AI-assisted video analytics for border surveillance. It is designed to assist trained security personnel and is **not intended to replace human judgment or operational security systems**.

AI-generated detections and alerts should be verified by authorized personnel before taking any operational action.


---

# 📜 License

This project is developed for academic and Smart India Hackathon purposes.

The source code and project materials are intended for educational, research and demonstration purposes.
