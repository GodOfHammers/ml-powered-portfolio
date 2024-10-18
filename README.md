# ML-Powered Portfolio

This project is a sophisticated personal website that showcases web development skills and incorporates machine learning capabilities. It uses modern web development frameworks and technologies to create an impressive, job-ready portfolio.

## Technologies Used

- Frontend: React with Next.js
- Backend: Node.js with Express
- Database: MongoDB
- Machine Learning: TensorFlow.js
- Styling: Tailwind CSS
- State Management: Redux
- API: GraphQL
- Authentication: JWT
- Deployment: Docker and Kubernetes

## Project Structure

The project is divided into two main parts:

1. `client/`: Contains the Next.js frontend application
2. `server/`: Contains the Express backend application

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- Docker and Docker Compose
- MongoDB (if running without Docker)

### Installation and Setup

1. Clone the repository:
   ```
   git clone https://github.com/your-username/ml-powered-portfolio.git
   cd ml-powered-portfolio
   ```

2. Install dependencies for both client and server:
   ```
   cd client && npm install
   cd ../server && npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the `server/` directory and add the following:
     ```
     MONGODB_URI=mongodb://localhost:27017/ml_portfolio
     JWT_SECRET=your_jwt_secret
     ```

4. Run the development servers:
   - For the client:
     ```
     cd client && npm run dev
     ```
   - For the server:
     ```
     cd server && npm run dev
     ```

5. Alternatively, use Docker Compose to run the entire stack:
   ```
   docker-compose up --build
   ```

## Features

- Responsive design using Tailwind CSS
- Server-side rendering with Next.js
- GraphQL API with Apollo Server
- User authentication using JWT
- Image classification using TensorFlow.js and MobileNet
- Simple sentiment analysis
- Asynchronous processing with Web Workers

## Testing

Run tests for the client:

```
cd client && npm test
```

## Deployment

The project includes a `docker-compose.yml` file for easy deployment. You can deploy it to any cloud provider that supports Docker containers.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).