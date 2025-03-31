[![Python IDLE](https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=fff)](#)
[![Django](https://img.shields.io/badge/Django-%23092E20.svg?logo=django&logoColor=white)](#)
![DRF](https://img.shields.io/badge/Django_REST-FF1709?logo=django&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?logo=JSON%20web%20tokens)
[![Postgres](https://img.shields.io/badge/Postgres-%23316192.svg?logo=postgresql&logoColor=white)](#)
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=fff)](#)
[![React](https://img.shields.io/badge/React-%2320232a.svg?logo=react&logoColor=%2361DAFB)](#)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?logo=axios&logoColor=white)
[![NodeJS](https://img.shields.io/badge/Node.js-6DA55F?logo=node.js&logoColor=white)](#)

# 🚀 Inventory Management System

📦 **A Full-Stack Inventory Management Solution** with 🔐 **User Authentication** and **Authorization**. ✨ Built with **Django | Django REST Framework** for the backend and **Vite | React | Tailwind CSS** for the frontend. Fully ⚡ **Optimized Code** with 📱 **Fully Responsive**.

![Tech Stack](photo/Presentation.png)

## 🌟 Key Features

### 🔐 Authentication & Security

- 👤 **User Registration** - Create new accounts with validation
- 🔑 **JWT Authentication** - Secure login/logout system
- 🛡️ **Role-Based Access** - Protected routes & endpoints

### 📦 Product Management

- 🆕 **CRUD Operations** - Add/Edit/View/Delete products
- 🏷️ **Smart Categorization** - Organize with nested categories
- 📊 **Real-Time Inventory** - Track stock levels & alerts

### 💼 Business Operations

- 👥 **Customer Management** - Track purchases & history
- 🏭 **Supplier Integration** - Manage procurement workflow
- 💰 **Sales & Purchases** - Complete transaction tracking

### 🛠️ Advanced Functionality

- 🔍 **Powerful Search** - Filter products by multiple criteria
- 📈 **Reporting Dashboard** - Visualize sales & inventory data
- 📱 **Mobile-Friendly** - Works flawlessly on all devices

## 🔥 Tech Stack

### 🏗️ Backend

- 🐍 **Python:** Programming language.
- 🎯 **Django:** Web framework.
- 🔄 **Django REST Framework (DRF):** For building RESTful APIs.
- 🔐 **JWT Authentication:** Secure user authentication.

### 🎨 Frontend

- ⚡ **Vite:** Fast build tool for React.
- ⚛️ **React:** JavaScript library for building user interfaces.
- 🎨 **Tailwind CSS:** Utility-first CSS framework for styling.
- 🔄 **Axios:** For making HTTP requests to the backend.

## 🚀 Quick Start

### 📋 Prerequisites

- Python 3.10+
- Node.js 16+
- PostgreSQL 12+

## Backend Setup

1. Clone the repository:

```bash
git clone https://github.com/kevinThulnith/Inventory-Management-System.git
```

2. Create a virtual environment:

```bash
python -m venv venv
source venv/bin/activate  # On Windows: .\venv\Scripts\activate
```

3. Install dependencies:

- install postgressSQL and c++ buid tool first.

```bash
pip install -r requirements.txt
```

4. Run migrations:

```bash
python manage.py migrate
```

5. Start the Django development server:

```bash
python manage.py runserver
```

➡️ Backend runs at `http://localhost:8000`

## Frontend Setup

1. Navigate to the frontend directory:

```bash
cd ../frontend
```

2. Install dependencies:

```bash
npm i
```

3. Start the Vite development server:

```bash
npm run dev
```

➡️ Frontend runs at `http://localhost:3000`

## 🌐 To Host on Local Network

1. Get device **Ip** address

```bash
ipconfig getifaddr en0 // in windows ipconfig
```

2. Start bachend

```bash
py .\manage.py runserver <Device Ip address>:8000
```

3. Start frontend

   - change **.env** file fist

```bash
npx vite --host {Device Ip Address}
```

## **Configuration:** ⚙️

- **Database:** Configure your database settings in `backend/inventory/settings.py`. You can use SQLite (default, good for development) or PostgreSQL, MySQL, etc. for production.
- **Environment Variables:** Consider using environment variables (e.g., using `python-dotenv`) for sensitive information like secret keys and database credentials. _Don't commit these to your repository!_ 🤫
- **API Base URL:** Update the API base URL in your frontend React components to point to your Django backend (usually `http://localhost:8000`).

<br>

## 📂 Project Structure

```bash
📦 inventory-management-system
├── 📂 backend             # Django REST API
│   ├── 📂 core            # Main app (settings, models, views)
│   ├── 📂 products        # Product & Category logic
│   ├── 📂 customers       # Customer management
│   ├── 📂 suppliers       # Supplier management
│   ├── 📂 sales           # Sales tracking
│   └── 📂 purchases       # Purchase tracking
│
├── 📂 frontend            # React Frontend
│   ├── 📂 src
│   │   ├── 📂 components  # Reusable UI components
│   │   ├── 📂 pages       # Page components
│   │   ├── 📂 hooks       # Custom React hooks
│   │   └── 📂 api        # API service functions
│   └── vite.config.js     # Vite configuration
│
└── 📜 README.md           # You're here!
```

## 🔐 Authentication Flow

- Register `api/user/register/` : Users can create an account by providing their details.
- Login `api/token/` : Users log in with their credentials and receive an authentication token.
- Protected Routes: Only authenticated users can access product management features.
- Logout `api/token/blacklist/` : Users can log out, and their token is invalidated.

## 🔗 API Endpoints:

The backend provides a RESTful API using Django REST Framework. You can access the API documentation at `http://localhost:8000/api/` (or the correct port for your development server) after running the Django server. Example endpoints:

- `/api/categories/` (GET, POST, PUT, DELETE)
- `/api/customers/` (GET, POST, PUT, DELETE)
- `/api/suppliers/` (GET, POST, PUT, DELETE)
- `/api/products/` (GET, POST, PUT, DELETE)
- `/api/sales/` (GET, POST, PUT, DELETE)
- `/api/purchases/` (GET, POST, PUT, DELETE)
- `/api/token/` (POST) - Obtain JWT token
- `/api/token/refresh/` (POST) - Refresh JWT token

## 💡 Why Choose This Project?

- 🚀 Modern Stack - Cutting-edge technologies
- 📈 Scalable Architecture - Ready for growth
- 🎨 Beautiful UI - Tailwind-powered design
- 🔄 Real-Time Updates - Instant data reflection
- 📱 Mobile-Ready - Perfect for all devices

## 🤝 Contributing

We ❤️ contributions! Here's how:

1. 🍴 Fork the repository
2. 🌿 Create a branch (git checkout -b feature/amazing-feature)
3. 💾 Commit changes (git commit -m 'Add amazing feature')
4. 📤 Push to branch (git push origin feature/amazing-feature)
5. 🔀 Open a Pull Request

## Show Your Support: ❤️

If you find `Inventory Management System` helpful, please consider:

- Starring the repository on GitHub! ⭐
- Sharing it with your network.
- Contributing to the project.

Happy Coding! 🎉👨‍💻👩‍💻
