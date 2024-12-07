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
│   ├── db                     # MongoDB integration setup
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
   - Responsive design for seamless use on mobile and desktop devices.
4. **Utility Functions**:
   - `helper.js` for token expiration and refresh handling.
   - `protected.js` for route protection.

### Backend (Django with MongoDB)
1. **Database**: MongoDB for scalable, flexible data storage.
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
- MongoDB (running locally or in the cloud)
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

## Future Improvements

- Integration with cloud-based MongoDB (e.g., MongoDB Atlas).
- Add automated tests for frontend components.
- Deploy the application on platforms like AWS or Heroku.
- Implement tagging and searching for journal entries.
- Expand styling using TailwindCSS or Material-UI for a more modern look.

---

## License

This project is licensed under the MIT License.