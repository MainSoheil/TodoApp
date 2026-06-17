# 🕐 TimeZone Todo App

A full-stack todo application with Persian (Jalali) calendar support and advanced time management features.

![Todo App Demo](screenshots/demo.gif)

## ✨ Features

- ✅ CRUD operations for todos
- 📅 Persian (Jalali) calendar date picker
- ⏰ Advanced timer for tasks
- 🎯 Deadline management
- 📱 Responsive design
- 🔄 Real-time updates
- 🌐 Persian language support

## 🛠️ Tech Stack

### Frontend
- **React 18** with Hooks
- **Vite** for fast builds
- **CSS Modules** / Tailwind CSS
- **Axios** for API calls
- **ESLint** for code quality

### Backend
- **Flask** (Python)
- **SQLAlchemy** ORM
- **SQLite** database
- **Flask-CORS** for cross-origin requests

## 📁 Project Structure
TodoAPp/
├── backend/ # Flask backend API
│ ├── frontend # BuildFolder of Frontend
│ ├── app.py # Main application
│ ├── database.py # Database models
│ ├── requirements.txt
│ └── migrations/ # Database migrations
├── frontend/ # React + Vite frontend
│ ├── src/ # Source code
│ ├── public/ # Static assets
│ ├── dist/ # Build output
│ └── package.json
└── README.md

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup

```bash
cd backend
python -m venv venv
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

pip install -r requirements.txt
python app.py