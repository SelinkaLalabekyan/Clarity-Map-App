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

* **Frontend:** React, JavaScript JSX, Tailwind CSS (for styling and layout)
* **Backend:** Python
* **Version Control:** Git

## Local Setup Instructions

To run this project locally, please ensure you have both Node.js (for the frontend) and Python 3 installed.

### 1. Repository Setup

1.  Clone the repository to your local machine:
    ```bash
    git clone [https://github.com/SelinkaLabekyan/Clarity-Map-App.git](https://github.com/SelinkaLabekyan/Clarity-Map-App.git)
    cd Clarity-Map-App
    ```

### 2. Backend Setup

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  *Install Python dependencies and run the server here.*

### 3. Frontend Setup

1.  Return to the root directory:
    ```bash
    cd ..
    ```
2.  *Install JavaScript dependencies and start the React application here.*
