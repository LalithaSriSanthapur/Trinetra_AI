<div align="center">

# TRINETRA AI

### **Turning Cameras into First Responders.**

### *AI-powered intelligent surveillance that detects emergencies before they become tragedies.*

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=FastAPI&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![OpenCV](https://img.shields.io/badge/OpenCV-27338e?style=for-the-badge&logo=opencv&logoColor=white)
![YOLO](https://img.shields.io/badge/YOLOv11-AI-orange?style=for-the-badge)
![PyTorch](https://img.shields.io/badge/PyTorch-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white)

---

**Real-Time CCTV Analysis • Emergency Detection • Instant Alerts • AI-Powered Safety**

</div>

---

# 📖 Overview

TRINETRA AI is an intelligent surveillance platform that transforms conventional CCTV cameras into proactive safety systems. Instead of simply recording footage for later review, TRINETRA continuously analyzes live video streams, identifies potential emergencies using computer vision, and instantly alerts authorities—enabling faster response when every second counts.

---

# 🚨 Problem Statement

Millions of CCTV cameras are installed across schools, campuses, hospitals, offices, and public spaces. Yet most serve only one purpose: recording incidents after they happen.

Human operators cannot continuously monitor hundreds of camera feeds, causing delays in responding to:

- Violence & physical altercations
- Medical emergencies
- Fire & smoke hazards
- Unauthorized access
- Suspicious activities

By the time someone notices an incident, valuable time has already been lost.

---

# 💡 Our Solution

TRINETRA AI provides continuous, real-time monitoring of CCTV feeds using AI.

Whenever a critical event is detected, the platform immediately:

- Detects the threat
- Classifies the emergency
- Sends instant alerts
- Updates the monitoring dashboard
- Logs the event for future analysis

The objective is simple:

> **Reduce response time. Increase safety. Save lives.**

---

# ✨ Features

- 🎥 Live CCTV Stream Monitoring
- 🤖 AI-Based Emergency Detection
- 🚨 Real-Time Alerts
- 🔥 Fire & Smoke Detection
- ❤️ Medical Emergency Recognition
- 🚷 Unauthorized Entry Detection
- 📊 Live Incident Dashboard
- 📈 Analytics & Event Logs

---

# 🏗️ System Architecture

```text
                    +-----------------------+
                    |    CCTV Cameras       |
                    +----------+------------+
                               |
                               |
                               v
                  +--------------------------+
                  | Video Stream Processing  |
                  |   OpenCV + FFmpeg        |
                  +------------+-------------+
                               |
                               v
                +-------------------------------+
                |      AI Detection Engine      |
                |     YOLOv11 + PyTorch         |
                +-------+-----------+-----------+
                        |           |
          +-------------+           +--------------+
          |                                    |
          v                                    v
 Violence / Fight                  Fire / Smoke Detection
 Detection
          |                                    |
          +---------------+--------------------+
                          |
                          v
             Medical Emergency Detection
                          |
                          v
               Threat Classification Engine
                          |
                          v
                +-----------------------+
                |    FastAPI Backend    |
                +-----------+-----------+
                            |
             +--------------+--------------+
             |                             |
             v                             v
     PostgreSQL Database        Notification Service
                               (SMS • Email • Push)
             |                             |
             +--------------+--------------+
                            |
                            v
                React Monitoring Dashboard
```

---

# ⚡ Workflow

```text
            Live CCTV Feed
                   │
                   ▼
         Video Frame Extraction
                   │
                   ▼
      AI Object & Activity Detection
                   │
                   ▼
       Emergency Classification
                   │
                   ▼
       Confidence Threshold Check
             │               │
             │               │
          Normal         Emergency
             │               │
             ▼               ▼
     Continue Monitoring   Save Event
                             │
                             ▼
                   Send Instant Alert
                             │
                             ▼
                  Update Live Dashboard
```

---

# 🛠️ Tech Stack

| Category | Technologies |
|----------|--------------|
| **Frontend** | React.js, Tailwind CSS |
| **Backend** | FastAPI, Python |
| **AI / Computer Vision** | YOLOv11, OpenCV, PyTorch |
| **Database** | PostgreSQL |
| **Authentication** | JWT |
| **Notifications** | Firebase Cloud Messaging, Twilio, Email API |
| **Deployment** | Docker, Railway / Render |
| **Version Control** | Git & GitHub |

---

# 📂 Project Structure

```text
TRINETRA-AI/
│
├── frontend/
│   ├── components/
│   ├── pages/
│   └── assets/
│
├── backend/
│   ├── routes/
│   ├── services/
│   ├── database/
│   └── utils/
│
├── ai/
│   ├── detection/
│   ├── models/
│   ├── inference/
│   └── preprocessing/
│
├── datasets/
├── notifications/
├── docs/
└── README.md
```

---

# 🚀 Future Scope

- Face Recognition
- Weapon Detection
- Crowd Density Monitoring
- Suspicious Behaviour Detection
- Edge AI Deployment
- Multi-Camera Centralized Monitoring
- Predictive Risk Analysis

---

# 🌍 Impact

TRINETRA AI aims to shift surveillance from **reactive monitoring** to **proactive intervention**.

Instead of reviewing footage after an emergency, organizations can respond while the incident is unfolding—reducing response time, improving safety, and enabling informed decision-making through AI.

---

<div align="center">

### **Turning Cameras into First Responders.**

**👁️ Watch • Detect • Protect**

</div>
