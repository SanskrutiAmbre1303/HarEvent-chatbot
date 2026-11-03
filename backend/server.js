
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// MAIN WELCOME MENU
const mainMenu = {
  message:
    "Hi! Welcome to HarEvent! 👋 I'm NiDi, your personal HarEvent assistant. I can help you explore our platform, discover event vendors, understand services and guide you through the process. How can I help you today?",
  options: [
    { label: "Customer", value: "customer" },
    { label: "Vendor", value: "vendor" },
  ],
};

// CHATBOT PREDEFINED QUESTIONS AND ANSWERS
const chatbotFlows = {
  start: mainMenu,
  main_menu: mainMenu,
  start_again: mainMenu,

  // CUSTOMER MAIN MENU
  customer: {
    message:
      "Welcome to the HarEvent Customer Journey! How can I help you today?",
    options: [
      { label: "What is HarEvent?", value: "customer_about" },
      { label: "How does HarEvent work?", value: "customer_how_it_works" },
      { label: "How can I find vendors?", value: "customer_find_vendors" },
      { label: "How can I explore vendor categories?", value: "customer_vendor_categories" },
      { label: "How can I explore event categories?", value: "customer_event_categories" },
      { label: "How can I view vendor profiles?", value: "customer_vendor_profiles" },
      { label: "How can I contact a vendor?", value: "customer_contact_vendor" },
      { label: "How can I send an enquiry?", value: "customer_send_enquiry" },
{ label: "How can I manage my account?", value: "customer_manage_account" },
{ label: "Contact HarEvent Support", value: "customer_contact_support" },
      { label: "Main Menu", value: "main_menu" },
    ],
  },

  // CUSTOMER: WHAT IS HAREVENT?
  customer_about: {
    message:
      "HarEvent is an event and wedding marketplace that helps customers discover and connect with event service providers in one place. Whether you're planning a wedding, birthday, corporate event or any special occasion, HarEvent helps you explore vendors and their services.",
    options: [
      { label: "What services can I find on HarEvent?", value: "customer_services" },
      { label: "Who can use HarEvent?", value: "customer_who_can_use" },
      { label: "How does HarEvent help me plan an event?", value: "customer_event_help" },
      { label: "Back to Customer Menu", value: "customer" },
      { label: "Main Menu", value: "main_menu" },
    ],
  },

  customer_services: {
    message:
      "HarEvent brings different event service providers together, including photographers, wedding planners, decorators, caterers, makeup artists, venues and banquet halls, DJs and entertainment providers, event managers, florists, invitation designers and mehendi artists. Other event service providers may also be available. The categories displayed depend on the active listings on HarEvent.",
    options: [
      { label: "Explore vendor categories", value: "customer_vendor_categories" },
      { label: "Back to Previous Question", value: "customer_about" },
      { label: "Main Menu", value: "main_menu" },
    ],
  },

  customer_who_can_use: {
    message:
      "HarEvent is for customers planning weddings, birthdays, corporate events and other special occasions, as well as event service providers who want to showcase their businesses and connect with customers.",
    options: [
      { label: "How can I find vendors?", value: "customer_find_vendors" },
      { label: "Back to Previous Question", value: "customer_about" },
      { label: "Main Menu", value: "main_menu" },
    ],
  },

  customer_event_help: {
    message:
      "HarEvent helps you explore event categories, discover relevant service providers, view vendor profiles and contact vendors to discuss your event requirements.",
    options: [
      { label: "Explore event categories", value: "customer_event_categories" },
      { label: "How can I find vendors?", value: "customer_find_vendors" },
      { label: "Back to Previous Question", value: "customer_about" },
      { label: "Main Menu", value: "main_menu" },
    ],
  },

  // CUSTOMER: HOW DOES HAREVENT WORK?
  customer_how_it_works: {
    message:
      "Using HarEvent is simple! Visit our website, explore event and vendor categories, browse vendor listings, and log in with your mobile number and OTP when prompted to view complete vendor profiles. You can then explore business details and portfolios and contact vendors through WhatsApp, phone, or an enquiry form.",
    options: [
      { label: "Do I need to register to explore HarEvent?", value: "customer_register_to_explore" },
      { label: "How can I contact a vendor?", value: "customer_how_contact_vendor" },
      { label: "Can I send enquiries to multiple vendors?", value: "customer_multiple_enquiries" },
      { label: "Back to Customer Menu", value: "customer" },
      { label: "Main Menu", value: "main_menu" },
    ],
  },

  customer_register_to_explore: {
    message:
      "You can explore the HarEvent website and browse vendor listings without logging in. However, you need to log in using your mobile number and verify the OTP to view complete vendor profiles.",
    options: [
      { label: "Back to Previous Question", value: "customer_how_it_works" },
      { label: "Main Menu", value: "main_menu" },
    ],
  },

  customer_how_contact_vendor: {
    message:
      "You can contact vendors through WhatsApp, direct phone calls, or the enquiry form, depending on the contact options available on their profiles. You can discuss your event requirements, pricing, and availability directly with the vendor.",
    options: [
      { label: "Back to Previous Question", value: "customer_how_it_works" },
      { label: "Main Menu", value: "main_menu" },
    ],
  },

  customer_multiple_enquiries: {
    message:
      "You can explore different vendor profiles and submit enquiries to multiple vendors to discuss your event requirements. Vendor responses and enquiry details can be managed through your customer dashboard, where available.",
    options: [
      { label: "Back to Previous Question", value: "customer_how_it_works" },
      { label: "Main Menu", value: "main_menu" },
    ],
  },

  customer_find_vendors: {
  message:
    "You can find vendors on HarEvent by browsing the available categories, services and vendor listings. You can explore vendors based on their service category and location, depending on the active listings available on the platform.",
  options: [
    {
      label: "Can I search for vendors by city?",
      value: "customer_search_by_city",
    },
    {
      label: "Can I compare different vendors?",
      value: "customer_compare_vendors",
    },
    {
      label: "Can I shortlist vendors?",
      value: "customer_shortlist_vendors",
    },
    { label: "Back to Customer Menu", value: "customer" },
    { label: "Main Menu", value: "main_menu" },
  ],
},

customer_search_by_city: {
  message:
    "You can explore vendors based on location where location-based listings are available on HarEvent. Select or search for your preferred city and browse the vendors listed for that area.",
  options: [
    { label: "Back to Previous Question", value: "customer_find_vendors" },
    { label: "Main Menu", value: "main_menu" },
  ],
},

customer_compare_vendors: {
  message:
    "You can explore different vendor profiles and review their business details, services, photos, videos and other portfolio information to help you compare available options.",
  options: [
    { label: "Back to Previous Question", value: "customer_find_vendors" },
    { label: "Main Menu", value: "main_menu" },
  ],
},

customer_shortlist_vendors: {
  message:
    "You can use the favourites feature, where available, to save vendors you are interested in and revisit them later through your customer dashboard.",
  options: [
    { label: "Back to Previous Question", value: "customer_find_vendors" },
    { label: "Main Menu", value: "main_menu" },
  ],
},

customer_vendor_categories: {
  message:
    "HarEvent offers different vendor categories, including wedding photographers, planners, decorators, caterers, makeup artists, venues and banquet halls, DJs and entertainment providers, event management services, florists, invitation designers, mehendi artists and other service providers. Available categories depend on the active listings on HarEvent.",
  options: [
    {
      label: "Can I find a specific type of service provider?",
      value: "customer_specific_vendor",
    },
    {
      label: "Can I find vendors in my location?",
      value: "customer_vendor_location",
    },
    {
      label: "Can I view vendor details?",
      value: "customer_view_vendor_details",
    },
    { label: "Back to Customer Menu", value: "customer" },
    { label: "Main Menu", value: "main_menu" },
  ],
},

customer_specific_vendor: {
  message:
    "Yes! You can explore the relevant vendor category on HarEvent to find specific service providers, such as photographers, caterers, decorators, makeup artists or event planners. The available options depend on active listings.",
  options: [
    { label: "Back to Previous Question", value: "customer_vendor_categories" },
    { label: "Main Menu", value: "main_menu" },
  ],
},

customer_vendor_location: {
  message:
    "You can explore vendors based on your preferred location where location-based listings are available. The vendors displayed depend on the active listings on HarEvent.",
  options: [
    { label: "Back to Previous Question", value: "customer_vendor_categories" },
    { label: "Main Menu", value: "main_menu" },
  ],
},

customer_view_vendor_details: {
  message:
    "Yes! You can open a vendor profile to explore available business information, services, photos, videos, brochures and other portfolio details. You may need to log in using your mobile number and verify the OTP to view the complete profile.",
  options: [
    { label: "Back to Previous Question", value: "customer_vendor_categories" },
    { label: "Main Menu", value: "main_menu" },
  ],
},

customer_event_categories: {
  message:
    "HarEvent supports different event categories, including weddings, engagements, birthday parties, anniversaries, baby showers, corporate events, festivals and celebrations, private parties and other special occasions. You can select an event category to discover relevant services and vendors.",
  options: [
    {
      label: "What events can I plan using HarEvent?",
      value: "customer_supported_events",
    },
    {
      label: "Can I find vendors for my wedding?",
      value: "customer_wedding_vendors",
    },
    {
      label: "Can I find vendors for corporate events?",
      value: "customer_corporate_vendors",
    },
    { label: "Back to Customer Menu", value: "customer" },
    { label: "Main Menu", value: "main_menu" },
  ],
},

customer_supported_events: {
  message:
    "You can explore services for weddings, engagements, birthday parties, anniversaries, baby showers, corporate events, festivals, celebrations, private parties and other special occasions on HarEvent.",
  options: [
    { label: "Back to Previous Question", value: "customer_event_categories" },
    { label: "Main Menu", value: "main_menu" },
  ],
},

customer_wedding_vendors: {
  message:
    "Yes! You can explore wedding-related vendor categories such as photographers, wedding planners, decorators, caterers, makeup artists, venues, DJs, florists, mehendi artists and other wedding service providers. Available options depend on active listings.",
  options: [
    { label: "Back to Previous Question", value: "customer_event_categories" },
    { label: "Main Menu", value: "main_menu" },
  ],
},

customer_corporate_vendors: {
  message:
    "Yes! You can explore event service providers relevant to corporate events, such as venues, caterers, event management services, decorators and entertainment providers. Available options depend on active listings on HarEvent.",
  options: [
    { label: "Back to Previous Question", value: "customer_event_categories" },
    { label: "Main Menu", value: "main_menu" },
  ],
},

customer_vendor_profiles: {
  message:
    "You can open a vendor profile to explore the business details, services, photos, videos, brochures and other portfolio information. You need to log in using your mobile number and verify the OTP to view the complete vendor profile.",
  options: [
    {
      label: "What information is available in a vendor profile?",
      value: "customer_profile_information",
    },
    {
      label: "Is OTP verification required?",
      value: "customer_profile_otp",
    },
    {
      label: "Can I save vendors as favourites?",
      value: "customer_profile_favourites",
    },
    { label: "Back to Customer Menu", value: "customer" },
    { label: "Main Menu", value: "main_menu" },
  ],
},

customer_profile_information: {
  message:
    "A vendor profile may include business information, services offered, photos, videos, brochures and other portfolio details to help you understand the vendor's offerings.",
  options: [
    { label: "Back to Previous Question", value: "customer_vendor_profiles" },
    { label: "Main Menu", value: "main_menu" },
  ],
},

customer_profile_otp: {
  message:
    "Yes. You need to log in using your mobile number and verify the OTP to view the complete vendor profile. You can still explore the website and vendor listings before logging in.",
  options: [
    { label: "Back to Previous Question", value: "customer_vendor_profiles" },
    { label: "Main Menu", value: "main_menu" },
  ],
},

customer_profile_favourites: {
  message:
    "You can save vendors as favourites and revisit them through your customer dashboard, where this feature is available.",
  options: [
    { label: "Back to Previous Question", value: "customer_vendor_profiles" },
    { label: "Main Menu", value: "main_menu" },
  ],
},

customer_contact_vendor: {
  message:
    "You can contact vendors through WhatsApp, direct phone calls or the enquiry form, depending on the contact options available on their profiles. You can discuss your event requirements, pricing and availability directly with the vendor.",
  options: [
    {
      label: "Can I contact vendors directly?",
      value: "customer_direct_contact",
    },
    {
      label: "Does HarEvent have an internal chat?",
      value: "customer_internal_chat",
    },
    {
      label: "How will I know if a vendor responds?",
      value: "customer_vendor_response",
    },
    { label: "Back to Customer Menu", value: "customer" },
    { label: "Main Menu", value: "main_menu" },
  ],
},

customer_direct_contact: {
  message:
    "Yes. You can contact a vendor directly through WhatsApp or phone if those options are available on the vendor's profile. You can discuss your requirements, pricing and availability with the vendor.",
  options: [
    { label: "Back to Previous Question", value: "customer_contact_vendor" },
    { label: "Main Menu", value: "main_menu" },
  ],
},

customer_internal_chat: {
  message:
    "HarEvent's available contact options include WhatsApp, direct phone calls and vendor enquiry forms where provided. Please use the contact options displayed on the vendor's profile.",
  options: [
    { label: "Back to Previous Question", value: "customer_contact_vendor" },
    { label: "Main Menu", value: "main_menu" },
  ],
},

customer_vendor_response: {
  message:
    "You can follow up with vendors using the contact details or enquiry options available on their profiles. Enquiry responses and vendor updates may also be available in your customer dashboard, where supported.",
  options: [
    { label: "Back to Previous Question", value: "customer_contact_vendor" },
    { label: "Main Menu", value: "main_menu" },
  ],
},

customer_send_enquiry: {
  message:
    "You can send an enquiry through the enquiry form available on a vendor's profile. The form may ask for details such as your name, mobile number, email, event type, event date and budget. You can check your enquiry status from your Customer Dashboard.",
  options: [
    {
      label: "Where can I view my enquiries?",
      value: "customer_view_enquiries",
    },
    {
      label: "What does Pending mean?",
      value: "customer_pending_enquiry",
    },
    {
      label: "Can I send enquiries to multiple vendors?",
      value: "customer_multiple_vendor_enquiries",
    },
    { label: "Back to Customer Menu", value: "customer" },
    { label: "Main Menu", value: "main_menu" },
  ],
},

customer_view_enquiries: {
  message:
    "You can check your submitted enquiries from the Enquiries section of your Customer Dashboard. The status and available vendor updates may be shown there.",
  options: [
    { label: "Back to Previous Question", value: "customer_send_enquiry" },
    { label: "Main Menu", value: "main_menu" },
  ],
},

customer_pending_enquiry: {
  message:
    "Pending means your enquiry has been submitted and is awaiting an update or response. You may follow up with the vendor using the contact details available on their profile.",
  options: [
    { label: "Back to Previous Question", value: "customer_send_enquiry" },
    { label: "Main Menu", value: "main_menu" },
  ],
},

customer_multiple_vendor_enquiries: {
  message:
    "You can explore different vendor profiles and submit enquiries to multiple vendors using their available enquiry forms. This helps you discuss your event requirements with different service providers.",
  options: [
    { label: "Back to Previous Question", value: "customer_send_enquiry" },
    { label: "Main Menu", value: "main_menu" },
  ],
},

customer_manage_account: {
  message:
    "Your Customer Dashboard helps you manage your personal profile, submitted enquiries, enquiry statuses, favourites and vendor responses or quotations where available. You may also find notifications, booking history, reviews and account settings, depending on the platform features available.",
  options: [
    {
      label: "How can I update my profile?",
      value: "customer_update_profile",
    },
    {
      label: "How can I check my enquiry status?",
      value: "customer_check_enquiry_status",
    },
    {
      label: "Where can I find my favourites?",
      value: "customer_find_favourites",
    },
    { label: "Back to Customer Menu", value: "customer" },
    { label: "Main Menu", value: "main_menu" },
  ],
},

customer_update_profile: {
  message:
    "You can update your personal details through the Profile or Account Settings section of your Customer Dashboard, wherever these options are available.",
  options: [
    { label: "Back to Previous Question", value: "customer_manage_account" },
    { label: "Main Menu", value: "main_menu" },
  ],
},

customer_check_enquiry_status: {
  message:
    "Open the Enquiries section of your Customer Dashboard to check the status of your submitted enquiries. Available updates may include Pending, Accepted or Rejected.",
  options: [
    { label: "Back to Previous Question", value: "customer_manage_account" },
    { label: "Main Menu", value: "main_menu" },
  ],
},

customer_find_favourites: {
  message:
    "You can find your saved vendors in the Favourites section of your Customer Dashboard, if this feature is available on your account.",
  options: [
    { label: "Back to Previous Question", value: "customer_manage_account" },
    { label: "Main Menu", value: "main_menu" },
  ],
},

customer_faq: {
  message:
    "Here are some frequently asked questions about using HarEvent. Choose a question below to learn more.",
  options: [
    {
      label: "Is customer registration free?",
      value: "customer_faq_registration",
    },
    {
      label: "Can I browse vendors without logging in?",
      value: "customer_faq_browse_login",
    },
    {
      label: "Does HarEvent provide event planning?",
      value: "customer_faq_event_planning",
    },
    {
      label: "Can I book vendors through HarEvent?",
      value: "customer_faq_booking",
    },
    {
      label: "Does HarEvent guarantee vendor availability?",
      value: "customer_faq_availability",
    },
    {
      label: "Can I contact vendors through WhatsApp?",
      value: "customer_faq_whatsapp",
    },
    {
      label: "How can I contact support?",
      value: "customer_faq_support",
    },
    { label: "Back to Customer Menu", value: "customer" },
    { label: "Main Menu", value: "main_menu" },
  ],
},

customer_faq_registration: {
  message:
    "Yes. Customer registration is free. You can register using your mobile number and verify it through an OTP.",
  options: [
    { label: "Back to FAQs", value: "customer_faq" },
    { label: "Main Menu", value: "main_menu" },
  ],
},

customer_faq_browse_login: {
  message:
    "You can explore the website and browse vendor listings without logging in. However, mobile number verification through OTP is required to view complete vendor profiles.",
  options: [
    { label: "Back to FAQs", value: "customer_faq" },
    { label: "Main Menu", value: "main_menu" },
  ],
},

customer_faq_event_planning: {
  message:
    "No. HarEvent is a marketplace that helps customers discover event vendors and connect with service providers. Event planning arrangements are made directly with the vendors.",
  options: [
    { label: "Back to FAQs", value: "customer_faq" },
    { label: "Main Menu", value: "main_menu" },
  ],
},

customer_faq_booking: {
  message:
    "HarEvent helps you discover vendors and send enquiries. Booking arrangements and confirmations are made directly with the vendor.",
  options: [
    { label: "Back to FAQs", value: "customer_faq" },
    { label: "Main Menu", value: "main_menu" },
  ],
},

customer_faq_availability: {
  message:
    "HarEvent does not guarantee vendor availability. Please contact the vendor directly to confirm availability for your event date.",
  options: [
    { label: "Back to FAQs", value: "customer_faq" },
    { label: "Main Menu", value: "main_menu" },
  ],
},

customer_faq_whatsapp: {
  message:
    "Yes. You can contact vendors through WhatsApp if the vendor has enabled or provided that contact option on their profile.",
  options: [
    { label: "Back to FAQs", value: "customer_faq" },
    { label: "Main Menu", value: "main_menu" },
  ],
},

customer_faq_support: {
  message:
    "You can contact the HarEvent team through the Contact Us section on the website for assistance.",
  options: [
    { label: "Back to FAQs", value: "customer_faq" },
    { label: "Main Menu", value: "main_menu" },
  ],
},

customer_contact_support: {
  message:
    "If you need help or have questions about using HarEvent, visit the Contact Us section on the HarEvent website to reach the support team.",
  options: [
    { label: "Back to Customer Menu", value: "customer" },
    { label: "Main Menu", value: "main_menu" },
    { label: "Start Again", value: "start_again" },
  ],
},

  // EXISTING VENDOR FLOW - TO BE UPDATED NEXT
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

  // EXISTING CUSTOMER FLOWS - TO BE UPDATED
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
      "You can submit an enquiry through the vendor's enquiry form. Would you like help finding a vendor first?",
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
      "You can start from the Login as Vendor option on the HarEvent website.",
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
      "For further assistance, please visit the Contact Us section on HarEvent.",
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

// BACKEND HEALTH CHECK
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "HarEvent Chatbot Backend is running!",
  });
});

// CHAT API
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

// START SERVER
app.listen(PORT, () => {
  console.log(`HarEvent chatbot backend running on http://localhost:${PORT}`);
});
