# Clarity-Map-App  - Community Pollution Cleanup Platform

A full-stack application designed to map pollution zones, encourage citizen involvement in cleanup missions, and provide an administrative dashboard for verification.


Demo video- https://youtu.be/TK5_yINoj50?si=GdY5qKgmUfNEhau4
## Overview & Key Features

This project consists of four main React components (Frontend) and four primary Python files (Backend), working together to manage the entire cleanup lifecycle:

### Frontend Components (React/JSX)

| File | Purpose | Description |
| :--- | :--- | :--- |
| `App.jsx` | **Main Map View** | Displays pollution zones, user stats, and map filtering options. |
| `MissionStart.jsx` | **Mission Detail Page** | Provides mission requirements and allows users to upload a verified "Before" photo to begin. |
| `MissionSubmit.jsx` | **Mission Completion** | Handles the upload of the "After" photo and submits the mission for administrative review. |
| `AdminDashboard.jsx` | **Admin Panel** | Secure interface for administrators to review submitted missions, verify photos/GPS, and approve/reject rewards. |

### Backend Services (Python)

| File | Purpose |
| :--- | :--- |
| `app.py` | Main application entry point and routing (e.g., Flask/Django). |
| `AppBackend.py` | Contains core mission/user data logic and API endpoints. |
| `validation.py` | Logic for GPS verification and mission data integrity checks. |
| `model_service.py` | Placeholder for any data models or services (e.g., database connection). |

## Technology Stack

• Frontend: The web-based application is built using HTML, CSS, and JavaScript. These
technologies were chosen for their broad browser compatibility, flexibility, and ability to create
responsive and interactive user interfaces that enhance user engagement.


• Backend and Server-Side Development: Python is used for backend logic, including
server-side operations and integration with the Machine Learning model. Frameworks such as
Flask or Django (if applicable) support handling requests, managing data, and connecting the
frontend to the ML components.


• Machine Learning: A Convolutional Neural Network (CNN) is implemented using
TensorFlow/Keras. This model automatically evaluates cleanup mission photos to determine
success, generating an ImprovementScore for reward calculations.


• Database and Storage: SQLite stores user data,
mission details, and progress tracking, ensuring secure and efficient data management.


• Version Control: GitHub is used for version control and project management. It allows the
author to track changes, manage code versions, and maintain a structured development
workflow, even as a solo developer.


• Other Tools: Additional tools such as VS Code for coding, Postman for API testing, and Figma
or Adobe XD for interface design (if used) helped streamline development and ensure usability.

  

