# University Events Manager

A full-stack cloud-native web application for managing university events. This platform allows students to discover, create, and attend events, while providing administrators with comprehensive analytics and reporting capabilities.

## 🚀 Technologies Used

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **EJS** - Template engine for server-side rendering
- **Firebase Admin SDK** - Backend Firebase integration
- **Multer** - Middleware for handling file uploads

### Frontend
- **HTML5/CSS3** - Structure and styling
- **JavaScript (ES6+)** - Client-side functionality
- **Bootstrap 5** - Responsive UI framework
- **SCSS** - CSS preprocessor for styling
- **Firebase SDK** - Client-side Firebase integration

### Database & Cloud Services
- **Firebase Firestore** - NoSQL cloud database
- **Firebase Authentication** - User authentication system
- **Firebase Storage** - Cloud storage for event images
- **Google Cloud Platform** - Deployment platform (App Engine ready)

## ✨ Features

### User Authentication
- **Email/Password Login** - Secure user authentication
- **Google Sign-In** - OAuth integration for quick access
- **User Registration** - New user account creation
- **Session Management** - Persistent user sessions with Firebase Auth

### Event Management
- **Create Events** - Add new events with details and images
- **Event Listings** - Browse all available events
- **Edit Events** - Modify existing event information
- **Delete Events** - Remove events from the system
- **Image Upload** - Upload and store event images in Firebase Storage

### Event Attendance
- **Attend Events** - Register attendance for events
- **Unattend Events** - Cancel event attendance
- **Attendance Tracking** - View events you're attending
- **Personal Dashboard** - Manage your event participations

### Analytics & Reporting
- **Statistics Dashboard** - Visual data representation
- **User Registration Metrics** - Track user growth over time
- **Event Category Analytics** - Analyze event popularity by category
- **Attendance Reports** - Comprehensive attendance data

### User Experience
- **Responsive Design** - Mobile-friendly interface
- **Dynamic UI** - Real-time updates without page refresh
- **Custom Animations** - Smooth transitions and interactions
- **Form Validation** - Client and server-side validation

## 📁 Project Structure

```
├── server.js                 # Express server configuration
├── package.json             # Project dependencies
├── app.yaml                 # Google Cloud App Engine config
├── routes/                  # API endpoints
│   ├── create-event.cjs
│   ├── edit-event.cjs
│   ├── delete-event.cjs
│   ├── attend-event.cjs
│   ├── unattend-event.cjs
│   ├── show-events.cjs
│   ├── show-att-events.cjs
│   ├── show-statistics.cjs
│   └── register-submit.cjs
├── views/                   # EJS templates
│   ├── index.ejs
│   ├── login.ejs
│   ├── registration.ejs
│   ├── events.ejs
│   ├── createEvent.ejs
│   ├── editEvent.ejs
│   ├── attendance.ejs
│   └── report.ejs
└── src/
    ├── js/                  # Client-side JavaScript
    ├── css/                 # Compiled stylesheets
    ├── scss/                # SCSS source files
    └── firebase/            # Firebase configuration

```

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Cloud_native-Website-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Firestore Database, Authentication, and Storage
   - Download your service account key and save as `src/firebase/serviceAccountKey.json`
   - Create `src/firebase/firebaseConfig.json` with your Firebase client config

4. **Start the server**
   ```bash
   npm start
   ```

5. **Access the application**
   - Open your browser and navigate to `http://localhost:8080`

## 🚀 Deployment

This application is configured for deployment on Google Cloud Platform App Engine:

```bash
gcloud app deploy
```

## 📝 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/register/submit` | Register new user |
| POST | `/events/create` | Create new event |
| GET | `/events/show` | Retrieve all events |
| POST | `/events/attend` | Attend an event |
| POST | `/events/unattend` | Unattend an event |
| GET | `/events/show/attended` | Get attended events |
| POST | `/events/edit` | Edit event details |
| POST | `/events/delete` | Delete an event |
| GET | `/statistics/show` | Get analytics data |

## 🔐 Security Features

- Firebase Authentication for secure user management
- Server-side input validation
- Protected routes requiring authentication
- Secure file upload with size limits (10MB max)
- Environment-based configuration

## 🎨 UI Components

- Custom animations and transitions
- Responsive navigation header
- Interactive event cards
- Form validation with error messages
- Google sign-in button integration
- Statistics charts and visualizations

## 📄 License

ISC

## 👤 Author

First attempt at a full-stack cloud-native web application

---

Built with ❤️ using Node.js, Express, and Firebase
