# HarEvent Chatbot – NiDi

## About the Project

NiDi is a predefined-question chatbot developed for the HarEvent platform. It helps customers and vendors understand the platform, its services, and the basic processes involved in using it.

The chatbot provides users with clickable options and predefined responses to guide them through different topics.

## Technologies Used

- **Frontend:** React.js, Vite, CSS
- **Backend:** Node.js, Express.js
- **Communication:** REST API
- **Development Tools:** Visual Studio Code, Git, GitHub

## Features

- Welcome screen with Customer and Vendor journeys
- Clickable predefined questions and answers
- Customer guidance for exploring HarEvent
- Follow-up questions for customer topics
- Navigation options to return to the previous question, go to the main menu, or start again
- React frontend connected to an Express backend
- Simple chatbot interface using HarEvent-inspired colours

## Project Structure

```text
harevent-chatbot/
│
├── backend/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── ...
│   └── package.json
│
└── README.md
```

## How to Run the Project

### 1. Clone the Repository

```bash
git clone https://github.com/SanskrutiAmbre1303/HarEvent-chatbot.git
cd HarEvent-chatbot
```

### 2. Start the Backend

Open a terminal and run:

```bash
cd backend
npm install
node server.js
```

The backend runs at:

```text
http://localhost:5000
```

### 3. Start the Frontend

Open a second terminal and run:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL displayed in the terminal, usually:

```text
http://localhost:5173
```

Keep both terminals running while using the chatbot.

## How It Works

1. The user opens the chatbot.
2. The user selects either the Customer or Vendor journey.
3. The chatbot displays predefined questions.
4. When a user selects an option, the frontend sends the selected choice to the backend.
5. The backend returns the corresponding predefined response and follow-up options.
6. The frontend displays the response and allows the user to continue navigating.

## Current Development Status

- Customer journey and its follow-up questions have been implemented.
- Main menu and start-again navigation are implemented.
- Chatbot interface has been updated based on the provided design reference.
- Vendor journey is pending further development and testing.

## Project Scope

This version uses predefined chatbot flows. It does not currently use an AI model, database, live vendor search, or booking integration.

## Repository

[HarEvent Chatbot – GitHub](https://github.com/SanskrutiAmbre1303/HarEvent-chatbot)
