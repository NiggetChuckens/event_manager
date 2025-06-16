# Event Manager

This project is a Full-stack web application for managing events. It provides a user-friendly interface for users to view, create, update, and delete events.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Event Manager is a React-based web application designed to streamline the process of organizing and coordinating events for businesses or organizations. It offers a comprehensive solution for event management, allowing users to efficiently handle various aspects of event planning and execution.

## Features

- View, create, update, and delete events
- Manage event details including date, time, location, and attendees
- Search and filter events
- Responsive design for optimal viewing experience across devices

## Last updated Features

- User authentication and authorization
  - Signup and login functionality
  - Admin-only user deletion

## Technologies Used

- Frontend: React + Next.js
- Backend: Flask
- Database: SQLite
- Languages: Python, JavaScript (JSX/JS), CSS, SQL
- Build Tools: Webpack, Babel

## API Endpoints

### `/signup`
- **Method**: POST
- **Description**: Allows users to sign up.
- **Request Body**:
  ```json
  {
    "nombre": "John Doe",
    "email": "john.doe@example.com",
    "password": "password123",
    "rol": "user"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "User signed up successfully"
  }
  ```

### `/login`
- **Method**: POST
- **Description**: Allows users to log in.
- **Request Body**:
  ```json
  {
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Login successful, rol: user"
  }
  ```
- **Request Body**:
  ```json
  {
    "email": "john.doe_2@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Login successful, rol: administrator"
  }
  ```

### `/delete_user`
- **Method**: POST
- **Description**: Allows an admin to delete a user.
- **Request Body**:
  ```json
  {
    "admin_email": "admin@example.com",
    "target_email": "john.doe@example.com"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "User deleted successfully"
  }
  ```

## Project Structure

Here's an updated overview of the project structure:
```
event_manager/
├── backend/
│   ├── main.py
│   ├── db/
│   │   ├── db_init.py
│   ├── functions/
│   │   ├── user_magnament.py
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   └── favicon.ico
│   ├── src/
│   │   ├── App.jsx
│   │   ├── index.js
│   │   ├── index.css
│   │   ├── reportWebVitals.js
│   │   └── pages/
├── README.md
└── requirements.txt
```

## Getting Started

1. Clone the repository.
2. Set up the virtual environment using Python:
  <br>For debian based linux distro use `sudo apt install python3-virtualenv` to install virtualenv
  <br>For arch based linux distro use `sudo pacman -S python3-virtualenv` to install virtualenv
  <br>For windows use `pip install virtualenv` to install virtualenv
  <br>And then activate the virtual environment to work with it.
3. Install the required dependencies using `pip install -r requirements.txt`.
4. Run the backend server using `python backend/main.py`.
5. Navigate to the frontend directory and start the React development server.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.

# Event Manager Roadmap

## Version 1.0 - Core Event Management
- [x] Basic user authentication and authorization
- [ ] Event CRUD operations
  - [ ] Create event form with basic details (date, time, location)
  - [ ] Event listing and detail views
  - [ ] Event editing interface
  - [ ] Event deletion with confirmation
- [ ] Responsive design implementation

## Version 1.1 - Enhanced Event Features
- [ ] Advanced event details
  - [ ] Attendee management
  - [ ] Event categories/tags
  - [ ] Event description formatting
- [ ] Search functionality
  - [ ] Search by event name
  - [ ] Filter by date range
  - [ ] Filter by category
- [ ] Event sharing capabilities

## Version 1.2 - User Experience
- [ ] Dashboard with event analytics
- [ ] Calendar view integration
- [ ] Event notifications system
- [ ] Bulk event operations
- [ ] Export event data (CSV, PDF)

## Version 2.0 - Advanced Features
- [ ] Event templates
- [ ] Recurring events
- [ ] Multi-language support
- [ ] Integration with third-party calendars (Google, Outlook)
- [ ] Event registration system

## Future Considerations
- [ ] Mobile application
- [ ] Real-time collaboration features
- [ ] Payment integration for paid events
- [ ] API documentation for external integrations
