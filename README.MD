# Journal Management Application

A full-stack web application for managing personal journal entries. Users can register, log in, and perform CRUD (Create, Read, Update, Delete) operations on their journal entries. This project features a **React frontend**, **Django backend**, and **MongoDB database**.

---

## Project Structure

```
.
├── backend
│   ├── app
│   │   ├── __init__.py
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── authentication.py   # Custom authentication logic
│   │   ├── models.py           # MongoDB models
│   │   ├── serializers.py      # API serializers
│   │   ├── tests.py            # Backend tests
│   │   ├── urls.py             # API routes
│   │   └── views.py            # API views
│   ├── journal
│   │   ├── settings.py         # Backend settings
│   │   ├── urls.py             # Project-level URL configuration
│   │   └── wsgi.py             # WSGI entry point
│   ├── manage.py               # Django management script
│   ├── populate.py             # Script to seed database
│   └── requirements.txt        # Backend dependencies
└── frontend
    ├── journal
    │   ├── src
    │   │   ├── App.js          # Main application component
    │   │   ├── Entries.js      # Displays journal entries
    │   │   ├── Entry.js        # Single journal entry view
    │   │   ├── Error.js        # Error handling component
    │   │   ├── Journal.js      # Journal dashboard
    │   │   ├── Landing.js      # Landing page
    │   │   ├── Login.js        # Login form
    │   │   ├── Register.js     # Registration form
    │   │   ├── UpdateEntry.js  # Entry update form
    │   │   ├── utils
    │   │   │   ├── config.js      # Axios configurations
    │   │   │   ├── helper.js      # Utility functions (e.g., token expiry checks)
    │   │   │   └── protected.js   # Wrapper for protected routes
    │   │   ├── styles
    │   │   │   └── img           # Image assets
    │   │   └── index.js         # Application entry point
    └── package.json              # Frontend dependencies
```

---

## Features

### Frontend (React)
1. **Authentication**: User registration and login with validation.
2. **Protected Routes**: Secured pages accessible only to authenticated users.
3. **Journal Management**:
   - Create, view, update, and delete personal journal entries.
   - Responsive design for mobile and desktop devices.
4. **Utility Functions**:
   - `helper.js` for token expiration and refresh handling.
   - `protected.js` for route protection.

### Backend (Django with MongoDB)
1. **Database**: MongoDB for flexible data storage.
2. **RESTful API**:
   - Token-based authentication for secure API interaction.
   - CRUD operations for managing user data and journal entries.
3. **Custom Features**:
   - Database seeding with `populate.py`.
   - User authentication integrated with JSON Web Tokens (JWT).

---

## Installation and Setup

### Prerequisites
- Python 3.10 or above
- Django
- Node.js 16.x or above
- MongoDB (local or cloud-based)
- npm or yarn

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Configure MongoDB connection in `settings.py`.
4. Seed the database (optional):
   ```bash
   python populate.py
   ```
5. Start the Django development server:
   ```bash
   python manage.py runserver
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend/journal
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm start
   ```

---

## Usage

1. Open your browser and navigate to `http://localhost:3000` (frontend).
2. Register a new account or log in with existing credentials.
3. Manage your journal entries from the dashboard:
   - Add new entries.
   - View, edit, or delete existing entries.

---

## File Breakdown

### Backend

- **`app/__init__.py`**: Initializes the app and ensures the app directory is treated as a Python package.
- **`app/admin.py`**: Contains Django admin interface configurations for MongoDB models.
- **`app/apps.py`**: Defines the application configuration for the app.
- **`app/authentication.py`**: Custom authentication logic, including user login and JWT handling.
- **`app/models.py`**: Defines MongoDB models for journal entries and user data using Django's ORM and MongoDB integration.
- **`app/serializers.py`**: Serializes and deserializes data for API interactions, ensuring proper structure and validation.
- **`app/tests.py`**: Contains backend unit tests for the API endpoints and authentication logic.
- **`app/urls.py`**: Defines URL routes for the journal API, linking views to their corresponding endpoints.
- **`app/views.py`**: API views that define the logic for handling requests to CRUD journal entries and user authentication.
- **`journal/settings.py`**: Configuration settings for the Django project, including MongoDB connection settings and security options.
- **`journal/urls.py`**: Project-level URL routing, including references to app-specific URLs.
- **`journal/wsgi.py`**: WSGI entry point for serving the Django app in production.
- **`manage.py`**: Django management script for running server commands and performing database migrations.
- **`populate.py`**: Script to seed the database with sample data (e.g., test users or journal entries).
- **`requirements.txt`**: Lists Python dependencies for the backend (e.g., Django, djangorestframework, PyJWT).

### Frontend

- **`frontend/journal/src/App.js`**: Main application component that handles routing and includes the layout of the app.
- **`frontend/journal/src/Entries.js`**: Displays a list of journal entries, allowing the user to view details and manage entries.
- **`frontend/journal/src/Entry.js`**: A detailed view of a single journal entry, allowing users to read and edit.
- **`frontend/journal/src/Error.js`**: Handles error displays, ensuring proper messaging for users when things go wrong.
- **`frontend/journal/src/Journal.js`**: Dashboard component that manages overall journal entry CRUD operations and user interactions.
- **`frontend/journal/src/Landing.js`**: Landing page component with options to register, log in, and navigate to the journal management section.
- **`frontend/journal/src/Login.js`**: Login form for users to authenticate with their credentials.
- **`frontend/journal/src/Register.js`**: Registration form that allows new users to sign up for the app.
- **`frontend/journal/src/UpdateEntry.js`**: Form for updating an existing journal entry.
- **`frontend/journal/src/utils/config.js`**: Contains configuration for Axios, including base API URL and headers.
- **`frontend/journal/src/utils/helper.js`**: Utility functions, such as token expiration handling and user authentication.
- **`frontend/journal/src/utils/protected.js`**: A higher-order component (HOC) for protecting routes, ensuring only authenticated users can access them.
- **`frontend/journal/src/styles/img/`**: Directory containing image assets (e.g., logos or icons used in the app).
- **`frontend/journal/src/index.js`**: Entry point for the React application, responsible for rendering the app to the DOM.
- **`frontend/package.json`**: Lists frontend dependencies and scripts for building and running the React app.

---

## Future Improvements

- Add automated tests for frontend components.
- Deploy the application on platforms like AWS or Heroku.
- Implement tagging and searching for journal entries.
- Expand styling using TailwindCSS or Material-UI for a more modern look.

---

## License

This project is licensed under the MIT License.
