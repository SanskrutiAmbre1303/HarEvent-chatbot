
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const mainMenu = {
  message: "Hi! Welcome to HarEvent. How can I help you today?",
  options: [
    { label: "Customer", value: "customer" },
    { label: "Vendor", value: "vendor" },
  ],
};

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "HarEvent Chatbot Backend is running!",
  });
});

const chatbotFlows = {
  start: mainMenu,
  main_menu: mainMenu,

  customer: {
    message: "Welcome, Customer! What would you like help with?",
    options: [
      { label: "Find a vendor", value: "find_vendor" },
      { label: "Explore event categories", value: "events" },
      { label: "Send an enquiry", value: "enquiry" },
      { label: "Login or signup", value: "login" },
      { label: "Other questions", value: "other" },
      { label: "Main menu", value: "main_menu" },
    ],
  },

  vendor: {
    message: "Welcome, Vendor! What would you like to do?",
    options: [
      { label: "Register as a vendor", value: "register" },
      { label: "Login to my account", value: "vendor_login" },
      { label: "Manage my profile", value: "profile" },
      { label: "Other questions", value: "other" },
      { label: "Main menu", value: "main_menu" },
    ],
  },

  find_vendor: {
    message: "Which type of vendor are you looking for?",
    options: [
      { label: "Photographer", value: "photography" },
      { label: "Decorator", value: "decor" },
      { label: "Caterer", value: "catering" },
      { label: "Event planner", value: "planner" },
      { label: "Venue", value: "venue" },
      { label: "Back", value: "customer" },
      { label: "Main menu", value: "main_menu" },
    ],
  },

  events: {
    message: "Which type of event are you planning?",
    options: [
      { label: "Wedding", value: "wedding" },
      { label: "Birthday", value: "birthday" },
      { label: "Corporate event", value: "corporate" },
      { label: "Engagement", value: "engagement" },
      { label: "Back", value: "customer" },
      { label: "Main menu", value: "main_menu" },
    ],
  },

  enquiry: {
    message:
      "You can contact a vendor through the enquiry option on their profile. Would you like help finding a vendor first?",
    options: [
      { label: "Find a vendor", value: "find_vendor" },
      { label: "Back", value: "customer" },
      { label: "Main menu", value: "main_menu" },
    ],
  },

  login: {
    message:
      "Please use the Login option on the HarEvent website to access your account or sign up.",
    options: [
      { label: "Back", value: "customer" },
      { label: "Main menu", value: "main_menu" },
    ],
  },

  register: {
    message:
      "You can start from the Join as a Vendor option on the HarEvent website.",
    options: [
      { label: "Back", value: "vendor" },
      { label: "Main menu", value: "main_menu" },
    ],
  },

  vendor_login: {
    message:
      "Please use Vendor Login on the HarEvent website to access your account.",
    options: [
      { label: "Back", value: "vendor" },
      { label: "Main menu", value: "main_menu" },
    ],
  },

  profile: {
    message:
      "For vendor profile management, please log in to your vendor account first.",
    options: [
      { label: "Back", value: "vendor" },
      { label: "Main menu", value: "main_menu" },
    ],
  },

  other: {
    message:
      "I'm still learning! Please use the Contact Us section on HarEvent for further assistance.",
    options: [
      { label: "Back", value: "customer" },
      { label: "Main menu", value: "main_menu" },
    ],
  },

  photography: {
    message:
      "Great! Select your city on HarEvent to look for photographers in your area.",
    options: [
      { label: "Choose another vendor", value: "find_vendor" },
      { label: "Main menu", value: "main_menu" },
    ],
  },

  decor: {
    message:
      "You can look for decorators by selecting your preferred city on HarEvent.",
    options: [
      { label: "Choose another vendor", value: "find_vendor" },
      { label: "Main menu", value: "main_menu" },
    ],
  },

  catering: {
    message:
      "You can look for catering services by selecting your preferred city on HarEvent.",
    options: [
      { label: "Choose another vendor", value: "find_vendor" },
      { label: "Main menu", value: "main_menu" },
    ],
  },

  planner: {
    message:
      "You can explore event planners on HarEvent and compare their profiles.",
    options: [
      { label: "Choose another vendor", value: "find_vendor" },
      { label: "Main menu", value: "main_menu" },
    ],
  },

  venue: {
    message:
      "You can explore venues on HarEvent and compare their profiles.",
    options: [
      { label: "Choose another vendor", value: "find_vendor" },
      { label: "Main menu", value: "main_menu" },
    ],
  },

  wedding: {
    message: "HarEvent can help you explore services for weddings.",
    options: [
      { label: "Find a vendor", value: "find_vendor" },
      { label: "Choose another event", value: "events" },
      { label: "Main menu", value: "main_menu" },
    ],
  },

  birthday: {
    message:
      "HarEvent can help you explore services for birthday celebrations.",
    options: [
      { label: "Find a vendor", value: "find_vendor" },
      { label: "Choose another event", value: "events" },
      { label: "Main menu", value: "main_menu" },
    ],
  },

  corporate: {
    message:
      "HarEvent can help you explore services for corporate events.",
    options: [
      { label: "Find a vendor", value: "find_vendor" },
      { label: "Choose another event", value: "events" },
      { label: "Main menu", value: "main_menu" },
    ],
  },

  engagement: {
    message:
      "HarEvent can help you explore services for engagements.",
    options: [
      { label: "Find a vendor", value: "find_vendor" },
      { label: "Choose another event", value: "events" },
      { label: "Main menu", value: "main_menu" },
    ],
  },
};

app.post("/api/chat", (req, res) => {
  const { choice } = req.body || {};

  if (typeof choice !== "string" || !chatbotFlows[choice]) {
    return res.status(400).json({
      success: false,
      message: "Invalid selection. Please choose an available option.",
    });
  }

  return res.json({
    success: true,
    ...chatbotFlows[choice],
  });
});

app.listen(PORT, () => {
  console.log(`HarEvent chatbot backend running on http://localhost:${PORT}`);
});
