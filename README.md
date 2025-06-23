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

### `/create_user`
- **Method**: POST
- **Description**: Allows administrators to create users.
- **Request Body**:
  ```json
  {
    "nombre": "John Doe",
    "email": "john.doe@example.com",
    "password": "password123",
    "admin_email": "john.doe_2@example.com",
    "rol": "user"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "User created successfully"
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
- **Request Body**:
  ```json
  {
    "email": "john.doe_3@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Login successful, rol: moderator"
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

### `/user-details`
- **Method**: GET
- **Description**: Fetches user details based on the provided token.
- **Headers**:
  ```json
  {
    "Authorization": "Bearer <token>"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "user": {
      "id": "123",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "role": "user"
    }
  }
  ```

### `/validate_token`
- **Method**: POST
- **Description**: Validates the provided token.
- **Request Body**:
  ```json
  {
    "token": "<token>"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Token is valid"
  }
  ```

### `/fetch_users`
- **Method**: GET
- **Description**: Fetches all users.
- **Response**:
  ```json
  {
    "success": true,
    "users": [
      {
        "id": "123",
        "name": "John Doe",
        "email": "john.doe@example.com",
        "role": "user"
      },
      {
        "id": "124",
        "name": "Jane Smith",
        "email": "jane.smith@example.com",
        "role": "admin"
      }
    ]
  }
  ```

### `/get_user_by_id`
- **Method**: GET
- **Description**: Fetches user details by ID.
- **Query Parameters**:
  ```json
  {
    "id": "123"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "user": {
      "id": "123",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "role": "user"
    }
  }
  ```

### `/update_user`
- **Method**: POST
- **Description**: Updates user details.
- **Request Body**:
  ```json
  {
    "id": "123",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "role": "admin",
    "admin_email": "admin@example.com"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "User updated successfully"
  }
  ```

### `/upcoming_events`
- **Method**: GET
- **Description**: Fetches upcoming events.
- **Response**:
  ```json
  {
    "success": true,
    "events": [
      {
        "id": "1",
        "name": "Event 1",
        "date": "2025-06-21"
      },
      {
        "id": "2",
        "name": "Event 2",
        "date": "2025-06-22"
      }
    ]
  }
  ```

### `/pending_events`
- **Method**: GET
- **Description**: Fetches pending events for a user.
- **Headers**:
  ```json
  {
    "Authorization": "Bearer <token>"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "events": [
      {
        "id": "1",
        "name": "Pending Event 1",
        "date": "2025-06-23"
      },
      {
        "id": "2",
        "name": "Pending Event 2",
        "date": "2025-06-24"
      }
    ]
  }
  ```

## Project Structure

Here's an updated overview of the project structure:
```
event_manager/
├── LICENSE
├── README.md
├── requirements.txt
├── src/
│   ├── backend/
│   │   ├── Dockerfile
│   │   ├── eventos.db
│   │   ├── main.py
│   │   ├── db/
│   │   │   └── db_init.py
│   │   ├── functions/
│   │   │   ├── event_management.py
│   │   │   └── user_management.py
│   ├── frontend/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── package-lock.json
│   │   ├── public/
│   │   │   ├── favicon.ico
│   │   │   ├── index.html
│   │   │   ├── logo192.png
│   │   │   ├── logo512.png
│   │   │   ├── manifest.json
│   │   │   └── robots.txt
│   │   ├── src/
│   │   │   ├── App.jsx
│   │   │   ├── index.css
│   │   │   ├── index.js
│   │   │   ├── reportWebVitals.js
│   │   │   ├── api/
│   │   │   │   ├── Login_handler.ts
│   │   │   │   ├── admin/
│   │   │   │   ├── user/
│   │   │   │   │   ├── fetchEvents.ts
│   │   │   │   │   ├── fetchPendingEvents.ts
│   │   │   │   │   └── validateToken.ts
│   │   │   ├── components/
│   │   │   │   ├── admin/
│   │   │   │   │   └── navbar.jsx
│   │   │   │   ├── common/
│   │   │   │   │   ├── editProfile.jsx
│   │   │   │   │   ├── eventsConfirmed.jsx
│   │   │   │   │   ├── eventsNotConfirmed.jsx
│   │   │   │   │   ├── footer.jsx
│   │   │   │   │   └── navbar.jsx
│   │   │   ├── pages/
│   │   │   │   ├── login.jsx
│   │   │   │   ├── admin/
│   │   │   │   │   ├── create/
|   |   |   |   |   |   ├── event.jsx
|   |   |   |   |   |   ├── user.jsx
│   │   │   │   │   ├── edit/
|   |   |   |   |   |   ├── event.jsx
|   |   |   |   |   |   ├── user.jsx
│   │   │   │   │   ├── events.jsx
│   │   │   │   │   ├── home.jsx
│   │   │   │   │   ├── stats.jsx
│   │   │   │   │   └── users-panel.jsx
│   │   │   │   └── user/
│   │   │   │   │   ├── home.jsx
│   │   │   │   │   └── perfil.jsx

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
  - [x] Create event form with basic details (date, time, location)
  - [ ] Event listing and detail views
  - [ ] Event editing interface
  - [ ] Event deletion with confirmation
- [x] User CRUD operations
  - [x] Create User form with basic details
  - [x] User listing
  - [x] User editing interface
  - [x] User deletion with confirmation
- [x] Responsive design implementation

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