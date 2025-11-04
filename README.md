# Chatbot API

A powerful and intelligent chatbot backend API built with Node.js, Express, and Natural Language Processing (NLP) capabilities. This API serves as the backend for a government city hall chatbot system designed to answer queries about city services, officials, navigation, and more.

## 🚀 Features

- **Natural Language Processing**: Powered by `node-nlp` and `compromise` for intelligent query understanding
- **Knowledge Base Management**: Dynamic knowledge management system with categories including:
  - City Officials information
  - Service requests and requirements
  - Navigation within city hall
  - Forms and documents
  - Social media links
  - FAQs and trivia
- **Authentication & Authorization**: Secure JWT-based authentication with bcrypt password hashing
- **Rate Limiting**: Built-in API rate limiting for security
- **CORS Support**: Configured for multiple frontend origins
- **Archive System**: Conversation archiving capabilities
- **Real-time Processing**: Efficient query processing and response generation
- **Scheduled Tasks**: Cron job support for automated operations
- **Firebase Integration**: Firebase Admin SDK for additional services
- **MongoDB Integration**: Persistent data storage with MongoDB

## 🛠️ Technology Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: MongoDB
- **NLP Engine**: node-nlp, compromise, stopword
- **Authentication**: JWT, bcrypt
- **Cloud Services**: Firebase Admin
- **Task Scheduling**: node-cron
- **Testing**: Jest
- **Code Quality**: ESLint
- **Documentation**: JSDoc

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm or yarn
- MongoDB (local or cloud instance)
- Firebase project (for Firebase services)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Jireh-sama/chatbot-api.git
   cd chatbot-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory with the following variables:
   ```env
   # Server Configuration
   PORT=3001
   NODE_ENV=development

   # MongoDB Configuration
   URI=your_mongodb_connection_string

   # JWT Configuration
   JWT_SECRET=your_jwt_secret_key

   # Firebase Configuration
   # Add your Firebase credentials as needed
   ```

4. **Firebase Setup**
   
   Place your Firebase service account JSON file in the `serviceAccount/` directory (this directory is gitignored for security).

## 🚦 Usage

### Development Mode
Start the server with auto-reload on file changes:
```bash
npm run dev
```

### Production Mode
Start the server in production:
```bash
npm start
```

### Running Tests
Execute the test suite:
```bash
npm test
```

The server will start on `http://localhost:3001` (or the port specified in your `.env` file).

## 🐳 Docker Support

The project includes Docker support for easy deployment.

**Build the Docker image:**
```bash
docker build -t chatbot-api .
```

**Run the container:**
```bash
docker run -p 3001:3001 --env-file .env chatbot-api
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/login` - User authentication
- `POST /api/auth/register` - User registration
- Additional auth endpoints as configured

### Knowledge Base
- `GET /api/knowledge` - Retrieve knowledge entries (requires authentication)
- `POST /api/knowledge` - Add new knowledge entry (requires authentication)
- `PUT /api/knowledge/:id` - Update knowledge entry (requires authentication)
- `DELETE /api/knowledge/:id` - Delete knowledge entry (requires authentication)

### Chatbot
- `POST /api/chatbot/query` - Send a query to the chatbot
- Additional chatbot endpoints

### Archive
- `GET /api/archive` - Retrieve archived conversations
- Additional archive endpoints

### Static Routes
- `/user` - User-facing chatbot interface
- `/admin` - Admin panel interface

## 📁 Project Structure

```
chatbot-api/
├── src/
│   ├── __tests__/          # Test files
│   ├── application/        # Application business logic
│   ├── domain/            # Domain entities and services
│   │   ├── entities/      # Domain entities
│   │   └── services/      # Domain services
│   ├── infrastructure/    # Infrastructure layer
│   │   ├── config/        # Configuration files
│   │   ├── errors/        # Custom error classes
│   │   ├── persistence/   # Database repositories
│   │   ├── service/       # External services
│   │   └── utils/         # Utility functions
│   ├── interface/         # Interface layer (API)
│   │   ├── controllers/   # Route controllers
│   │   ├── middleware/    # Express middleware
│   │   └── routes/        # Route definitions
│   ├── app.js            # Express app configuration
│   └── main.js           # Application entry point
├── public/               # Static frontend files
│   ├── admin/           # Admin panel
│   └── user/            # User interface
├── .babelrc             # Babel configuration
├── Dockerfile           # Docker configuration
├── eslint.config.mjs    # ESLint configuration
├── jest.config.mjs      # Jest configuration
├── package.json         # Project dependencies
└── README.md           # This file
```

## 🎯 Knowledge Categories

The chatbot is configured to handle queries in the following categories:

1. **About** - Information about the chatbot itself
2. **City Officials** - Government personnel and positions
3. **Fallback** - Handling vague or unclear queries
4. **Form** - Document downloads and forms
5. **Link** - Social media and external links
6. **Navigation** - Location guidance within city hall
7. **Question** - General information queries
8. **Request** - Service requirements and processes
9. **Salutation** - Greetings and farewells
10. **Service** - Contact information and services
11. **Trivia** - Miscellaneous facts and information

## 🔨 Development

### Code Style
The project uses ESLint for code quality. Run the linter:
```bash
npx eslint .
```

### Testing
Tests are written using Jest. The test structure follows the source code organization in `src/__tests__/`.

### Architecture
This project follows Clean Architecture principles with clear separation of concerns:
- **Domain Layer**: Core business logic and entities
- **Application Layer**: Use cases and business rules
- **Infrastructure Layer**: External dependencies and frameworks
- **Interface Layer**: API routes and controllers

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please ensure your code:
- Follows the existing code style
- Includes appropriate tests
- Updates documentation as needed
- Passes all existing tests

## 📝 License

This project is licensed under the ISC License.

## 👤 Author

Created by the Chatbot API Team

## 🙏 Acknowledgments

- Built with Node.js and Express
- NLP powered by node-nlp and compromise
- Deployed on Render
- Frontend hosted on Vercel

## 📞 Support

For issues, questions, or contributions, please open an issue on the GitHub repository.

---

**Note**: This is a government city hall chatbot system. Please ensure all data and credentials are kept secure and confidential.
