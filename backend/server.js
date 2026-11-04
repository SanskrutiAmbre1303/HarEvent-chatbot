
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
 
  // ==========================================
  // COMPLETE VENDOR JOURNEY
  // ==========================================

  vendor: {
    message: "Hello Vendor! 👋 Welcome to HarEvent! I'm NiDi, your personal vendor assistant. What would you like to know?",
    options: [
      { label: "What is HarEvent for Vendors?", value: "vendor_about" },
      { label: "Why should I join HarEvent?", value: "vendor_benefits" },
      { label: "How can I register as a Vendor?", value: "vendor_register_info" },
      { label: "What information is required for registration?", value: "vendor_registration_requirements" },
      { label: "How can I create my Vendor Profile?", value: "vendor_create_profile" },
      { label: "How can I choose Vendor Categories?", value: "vendor_categories" },
      { label: "What are Vendor Packages?", value: "vendor_packages" },
      { label: "How do Basic and Gold Packages work?", value: "vendor_package_comparison" },
      { label: "How can I manage my Vendor Dashboard?", value: "vendor_dashboard" },
      { label: "How can I receive Customer Enquiries?", value: "vendor_enquiries" },
      { label: "How can I manage Leads and Customer Responses?", value: "vendor_leads" },
      { label: "How can I improve my Vendor Visibility?", value: "vendor_visibility" },
      { label: "How does Vendor Approval work?", value: "vendor_approval" },
      { label: "Frequently Asked Questions", value: "vendor_faq" },
      { label: "Contact Vendor Support", value: "vendor_support" },
      { label: "Main Menu", value: "main_menu" },
    ],
  },

  // 1. WHAT IS HAREVENT FOR VENDORS?

  vendor_about: {
    message: "HarEvent is a marketplace where event service providers can showcase their businesses, display their services and connect with customers looking for event-related services. You can create a business profile and present your work to potential customers.",
    options: [
      { label: "Why should I join HarEvent?", value: "vendor_benefits" },
      { label: "Who can register as a vendor?", value: "vendor_who_can_register" },
      { label: "What services can I list?", value: "vendor_services_list" },
      { label: "Back to Previous Question", value: "vendor" },
      { label: "Main Menu", value: "main_menu" },
    ],
  },

  vendor_who_can_register: {
    message: "Event service providers such as photographers, decorators, caterers, wedding planners, makeup artists, venues and other event-related businesses can register as vendors on HarEvent.",
    options: [
      { label: "How can I register?", value: "vendor_register_info" },
      { label: "Back to Previous Question", value: "vendor_about" },
      { label: "Main Menu", value: "main_menu" },
    ],
  },

  vendor_services_list: {
    message: "You can list the event-related services your business provides, such as photography, decoration, catering, event planning, makeup, venues, entertainment and other relevant services.",
    options: [
      { label: "How can I choose Vendor Categories?", value: "vendor_categories" },
      { label: "Back to Previous Question", value: "vendor_about" },
      { label: "Main Menu", value: "main_menu" },
    ],
  },

  // 2. WHY SHOULD I JOIN HAREVENT?

  vendor_benefits: {
    message: "Joining HarEvent gives your business an opportunity to showcase your business online, display your services and portfolio, reach customers looking for event services, receive customer enquiries, improve your business visibility and manage your business profile through a dedicated dashboard.",
    options: [
      { label: "How can I register?", value: "vendor_register_info" },
      { label: "How can I get customer enquiries?", value: "vendor_enquiries" },
      { label: "What packages are available?", value: "vendor_packages" },
      { label: "Back to Vendor Menu", value: "vendor" },
      { label: "Main Menu", value: "main_menu" },
    ],
  },

  // 3. HOW CAN I REGISTER AS A VENDOR?

  vendor_register_info: {
    message: "Follow these steps to register as a vendor:\n\n1. Visit the HarEvent website.\n2. Select Login as Vendor.\n3. Start the vendor registration process.\n4. Enter your business and contact information.\n5. Select your vendor category and services.\n6. Submit your registration.\n7. Complete your business profile.\n8. Wait for the required verification and approval.",
    options: [
      { label: "What information is required?", value: "vendor_registration_requirements" },
      { label: "How long does approval take?", value: "vendor_approval_time" },
      { label: "Can I update my profile later?", value: "vendor_edit_profile" },
      { label: "Back to Vendor Menu", value: "vendor" },
      { label: "Main Menu", value: "main_menu" },
    ],
  },

  // 4. WHAT INFORMATION IS REQUIRED?

  vendor_registration_requirements: {
    message: "You may need to provide the following information:\n\nBusiness Information:\n• Business Name\n• Business Description\n• Business Contact Details\n• Business Address\n• Service Locations\n\nOwner Information:\n• Owner or Contact Person Name\n• Mobile Number\n• Email Address\n\nBusiness Details:\n• Vendor Category\n• Services Offered\n• Business Experience\n• Portfolio and Work Samples\n\nAdditional information may be required depending on the vendor category and verification process.",
    options: [
      { label: "Can I select multiple categories?", value: "vendor_multiple_categories" },
      { label: "Can I upload photos and videos?", value: "vendor_upload_media" },
      { label: "Can I complete my profile later?", value: "vendor_edit_profile" },
      { label: "Back to Vendor Menu", value: "vendor" },
      { label: "Main Menu", value: "main_menu" },
    ],
  },
// HOW LONG DOES APPROVAL TAKE?
  vendor_approval_time: {
  message: "HarEvent has not specified a fixed approval timeline. The time required may depend on the verification process. Please check your Vendor Dashboard or contact HarEvent Support for an update.",
  options: [
    {
      label: "How can I check my approval status?",
      value: "vendor_check_approval"
    },
    {
      label: "Contact Vendor Support",
      value: "vendor_support"
    },
    {
      label: "Back to Vendor Menu",
      value: "vendor"
    },
    {
      label: "Main Menu",
      value: "main_menu"
    }
  ]
},

// CAN I UPLOAD PHOTOS AND VIDEOS?
vendor_upload_media: {
  message: "Yes! You can upload photos, albums and videos through your Vendor Dashboard. The proposed Basic Package includes up to 5 photos and 1 video. The Gold Package includes up to 10 photo albums. Please check your selected package for applicable upload limits.",
  options: [
    {
      label: "What are Vendor Packages?",
      value: "vendor_packages"
    },
    {
      label: "How can I create my Vendor Profile?",
      value: "vendor_create_profile"
    },
    {
      label: "Back to Previous Question",
      value: "vendor_registration_requirements"
    },
    {
      label: "Main Menu",
      value: "main_menu"
    }
  ]
},
  // 5. HOW CAN I CREATE MY VENDOR PROFILE?

  vendor_create_profile: {
    message: "After registration, log in to your Vendor Dashboard and complete your business profile. You can add your business description, services, photos, albums, videos, digital brochures, price lists, service packages, contact details and service locations. A complete profile helps customers understand your business and services.",
    options: [
      { label: "How can I edit my profile?", value: "vendor_edit_profile" },
      { label: "How many photos can I upload?", value: "vendor_photo_limit" },
      { label: "How can I add brochures?", value: "vendor_add_brochures" },
      { label: "Back to Vendor Menu", value: "vendor" },
      { label: "Main Menu", value: "main_menu" },
    ],
  },

  vendor_edit_profile: {
    message: "You can manage and update your business information through your Vendor Dashboard after logging in.",
    options: [
      { label: "How can I create my Vendor Profile?", value: "vendor_create_profile" },
      { label: "Back to Previous Question", value: "vendor_register_info" },
      { label: "Main Menu", value: "main_menu" },
    ],
  },

  vendor_photo_limit: {
    message: "The proposed Basic Package allows up to 5 photos. The Gold Package includes up to 10 photo albums. Please check the package details displayed on HarEvent for applicable limits.",
    options: [
      { label: "What are Vendor Packages?", value: "vendor_packages" },
      { label: "Back to Previous Question", value: "vendor_create_profile" },
      { label: "Main Menu", value: "main_menu" },
    ],
  },

  vendor_add_brochures: {
    message: "You can add digital brochures and price lists through your Vendor Dashboard, where these features are available. The proposed Gold Package includes up to 5 digital or price brochures.",
    options: [
      { label: "What are Vendor Packages?", value: "vendor_packages" },
      { label: "Back to Previous Question", value: "vendor_create_profile" },
      { label: "Main Menu", value: "main_menu" },
    ],
  },

  // 6. HOW CAN I CHOOSE VENDOR CATEGORIES?

  vendor_categories: {
    message: "Select the categories that match the services your business provides. If your business offers multiple services, you can select multiple relevant categories during registration or through your profile settings, subject to platform rules.",
    options: [
      { label: "Can I select multiple categories?", value: "vendor_multiple_categories" },
      { label: "How will category selection affect my package?", value: "vendor_category_package" },
      { label: "Can I change categories later?", value: "vendor_change_categories" },
      { label: "Back to Vendor Menu", value: "vendor" },
      { label: "Main Menu", value: "main_menu" },
    ],
  },

  vendor_multiple_categories: {
    message: "Yes, you can select multiple relevant vendor categories. Applicable package pricing will follow the combined-category pricing rules.",
    options: [
      { label: "How can I choose Vendor Categories?", value: "vendor_categories" },
      { label: "What are Vendor Packages?", value: "vendor_packages" },
      { label: "Main Menu", value: "main_menu" },
    ],
  },

  vendor_category_package: {
    message: "The applicable package pricing for multiple categories will follow HarEvent's combined-category pricing rules. Please check the package selection page for the applicable details.",
    options: [
      { label: "What are Vendor Packages?", value: "vendor_packages" },
      { label: "Back to Previous Question", value: "vendor_categories" },
      { label: "Main Menu", value: "main_menu" },
    ],
  },

  vendor_change_categories: {
    message: "You can manage your vendor categories through your profile settings, subject to the platform's rules.",
    options: [
      { label: "Back to Previous Question", value: "vendor_categories" },
      { label: "Main Menu", value: "main_menu" },
    ],
  },

  // 7. WHAT ARE VENDOR PACKAGES?

  vendor_packages: {
    message: "HarEvent offers vendor packages to help businesses showcase their services and improve their online presence. The proposed package structure includes Basic and Gold Packages. You can explore the available features and select the package that suits your business.",
    options: [
      { label: "What is included in Basic?", value: "vendor_basic_package" },
      { label: "What is included in Gold?", value: "vendor_gold_package" },
      { label: "Can I choose multiple categories?", value: "vendor_multiple_categories" },
      { label: "Back to Vendor Menu", value: "vendor" },
      { label: "Main Menu", value: "main_menu" },
    ],
  },

  // 8. HOW DO BASIC AND GOLD PACKAGES WORK?

  vendor_package_comparison: {
    message: "HarEvent currently has a proposed Basic Package and Gold Package. Each package offers different features to help vendors showcase their businesses.",
    options: [
      { label: "What is included in Basic?", value: "vendor_basic_package" },
      { label: "What is included in Gold?", value: "vendor_gold_package" },
      { label: "How can I upgrade to Gold?", value: "vendor_upgrade_package" },
      { label: "Back to Vendor Menu", value: "vendor" },
      { label: "Main Menu", value: "main_menu" },
    ],
  },

  vendor_basic_package: {
    message: "Basic Package – Free\n\n• Basic Business Listing\n• Up to 5 Photos\n• 1 Video\n• Up to 3 Enquiries per Month\n• Standard Search Visibility\n• City and Category Visibility\n• Email and Call Support",
    options: [
      { label: "What is included in Gold?", value: "vendor_gold_package" },
      { label: "Back to Vendor Packages", value: "vendor_packages" },
      { label: "Main Menu", value: "main_menu" },
    ],
  },

  vendor_gold_package: {
    message: "Gold Package\n\n• Dedicated Business Webpage\n• Up to 10 Photo Albums\n• Up to 5 Digital or Price Brochures\n• 1 Blog per Year\n• WhatsApp Contact Details\n• Priority Visibility\n• Service Packages\n\nPackage availability and applicable pricing will be displayed on the vendor package selection page.",
    options: [
      { label: "How can I upgrade to Gold?", value: "vendor_upgrade_package" },
      { label: "What is included in Basic?", value: "vendor_basic_package" },
      { label: "Back to Vendor Packages", value: "vendor_packages" },
      { label: "Main Menu", value: "main_menu" },
    ],
  },

  vendor_upgrade_package: {
    message: "You can explore the available upgrade options from your Vendor Dashboard and select the package that suits your business. Applicable pricing will be displayed during package selection.",
    options: [
      { label: "What is included in Gold?", value: "vendor_gold_package" },
      { label: "Back to Vendor Packages", value: "vendor_packages" },
      { label: "Main Menu", value: "main_menu" },
    ],
  },

  // 9. HOW CAN I MANAGE MY VENDOR DASHBOARD?

  vendor_dashboard: {
    message: "Your Vendor Dashboard helps you manage your business activities in one place. You can access your Business Profile, Profile Completion, Vendor Categories and Services, Package Details, Customer Enquiries, Lead Activities, Profile Visits, Calls and WhatsApp Activity where tracking is available, Portfolio Management, Notifications and Account Settings.",
    options: [
      { label: "How can I check customer enquiries?", value: "vendor_check_enquiries" },
      { label: "How can I update my business profile?", value: "vendor_edit_profile" },
      { label: "How can I track profile visits?", value: "vendor_profile_visits" },
      { label: "Back to Vendor Menu", value: "vendor" },
      { label: "Main Menu", value: "main_menu" },
    ],
  },

  vendor_check_enquiries: {
    message: "You can check customer enquiries through the Customer Enquiries section of your Vendor Dashboard.",
    options: [
      { label: "How can I receive Customer Enquiries?", value: "vendor_enquiries" },
      { label: "Back to Previous Question", value: "vendor_dashboard" },
      { label: "Main Menu", value: "main_menu" },
    ],
  },

  vendor_profile_visits: {
    message: "Your Vendor Dashboard may display profile visits and other business activity metrics, depending on the tracking features available on HarEvent.",
    options: [
      { label: "How can I improve my Vendor Visibility?", value: "vendor_visibility" },
      { label: "Back to Previous Question", value: "vendor_dashboard" },
      { label: "Main Menu", value: "main_menu" },
    ],
  },

  // 10. HOW CAN I RECEIVE CUSTOMER ENQUIRIES?

  vendor_enquiries: {
    message: "Customers can submit enquiries through your vendor profile. When a customer submits an enquiry, it will be available in your Vendor Dashboard. You can review the customer's event requirements and contact details and respond directly to the customer.",
    options: [
      { label: "Where can I view enquiries?", value: "vendor_check_enquiries" },
      { label: "Will I receive notifications?", value: "vendor_enquiry_notifications" },
      { label: "Can I contact customers directly?", value: "vendor_contact_customers" },
      { label: "Back to Vendor Menu", value: "vendor" },
      { label: "Main Menu", value: "main_menu" },
    ],
  },

  vendor_enquiry_notifications: {
    message: "Enquiry notifications may be available through your Vendor Dashboard and other notification options supported by HarEvent.",
    options: [
      { label: "How can I receive Customer Enquiries?", value: "vendor_enquiries" },
      { label: "Back to Vendor Menu", value: "vendor" },
      { label: "Main Menu", value: "main_menu" },
    ],
  },

  vendor_contact_customers: {
    message: "You can review the customer's enquiry details and use the available contact information to discuss their event requirements directly.",
    options: [
      { label: "How can I manage Leads?", value: "vendor_leads" },
      { label: "Back to Previous Question", value: "vendor_enquiries" },
      { label: "Main Menu", value: "main_menu" },
    ],
  },

  // 11. HOW CAN I MANAGE LEADS AND CUSTOMER RESPONSES?

  vendor_leads: {
    message: "Your dashboard helps you track customer enquiries and available lead activities. You can review enquiry details and manage the enquiry status. Available statuses include Pending, Viewed, Accepted and Rejected. You can contact customers through the available contact details and discuss their requirements directly.",
    options: [
      { label: "What does each enquiry status mean?", value: "vendor_enquiry_status" },
      { label: "How can I respond to a customer?", value: "vendor_respond_customer" },
      { label: "Can I track my business activity?", value: "vendor_track_activity" },
      { label: "Back to Vendor Menu", value: "vendor" },
      { label: "Main Menu", value: "main_menu" },
    ],
  },

  vendor_enquiry_status: {
    message: "The available enquiry statuses are:\n\n• Pending – The enquiry is awaiting an update.\n• Viewed – The enquiry has been viewed.\n• Accepted – The enquiry has been accepted.\n• Rejected – The enquiry has been rejected.",
    options: [
      { label: "How can I manage Leads?", value: "vendor_leads" },
      { label: "Back to Vendor Menu", value: "vendor" },
      { label: "Main Menu", value: "main_menu" },
    ],
  },

  vendor_respond_customer: {
    message: "You can review the customer's event requirements and contact details from your Vendor Dashboard, then respond using the available contact options.",
    options: [
      { label: "How can I receive Customer Enquiries?", value: "vendor_enquiries" },
      { label: "Back to Previous Question", value: "vendor_leads" },
      { label: "Main Menu", value: "main_menu" },
    ],
  },

  vendor_track_activity: {
    message: "You can review available business activity information such as enquiries, profile visits, calls and WhatsApp activity where tracking is supported on HarEvent.",
    options: [
      { label: "How can I manage my Vendor Dashboard?", value: "vendor_dashboard" },
      { label: "Back to Previous Question", value: "vendor_leads" },
      { label: "Main Menu", value: "main_menu" },
    ],
  },

  // 12. HOW CAN I IMPROVE MY VENDOR VISIBILITY?

  vendor_visibility: {
    message: "You can improve your business presentation by:\n\n• Completing your business profile.\n• Uploading quality photos and videos.\n• Adding detailed service descriptions.\n• Uploading brochures and price lists.\n• Selecting relevant categories.\n• Keeping contact information updated.\n• Exploring available visibility packages.",
    options: [
      { label: "Does Gold offer priority visibility?", value: "vendor_priority_visibility" },
      { label: "How can I update my portfolio?", value: "vendor_update_portfolio" },
      { label: "How can I get more enquiries?", value: "vendor_more_enquiries" },
      { label: "Back to Vendor Menu", value: "vendor" },
      { label: "Main Menu", value: "main_menu" },
    ],
  },

  vendor_priority_visibility: {
    message: "The proposed Gold Package includes priority visibility. Please check the vendor package selection page for current availability and applicable pricing.",
    options: [
      { label: "What is included in Gold?", value: "vendor_gold_package" },
      { label: "Back to Previous Question", value: "vendor_visibility" },
      { label: "Main Menu", value: "main_menu" },
    ],
  },

  vendor_update_portfolio: {
    message: "You can manage your portfolio through your Vendor Dashboard by updating your photos, albums, videos, brochures and other available business information.",
    options: [
      { label: "How can I create my Vendor Profile?", value: "vendor_create_profile" },
      { label: "Back to Previous Question", value: "vendor_visibility" },
      { label: "Main Menu", value: "main_menu" },
    ],
  },

  vendor_more_enquiries: {
    message: "Complete your business profile, upload quality work samples, add detailed service descriptions, keep your contact information updated and select relevant categories. You can also explore the available visibility packages.",
    options: [
      { label: "How can I improve my Vendor Visibility?", value: "vendor_visibility" },
      { label: "What are Vendor Packages?", value: "vendor_packages" },
      { label: "Main Menu", value: "main_menu" },
    ],
  },

  // 13. HOW DOES VENDOR APPROVAL WORK?

  vendor_approval: {
    message: "After submitting your vendor registration, your information may go through the HarEvent verification and approval process. Once approved, your vendor listing can become available according to the platform's listing and package rules. If additional information is required, the HarEvent team may contact you.",
    options: [
      { label: "How can I check my approval status?", value: "vendor_check_approval" },
      { label: "What if my registration is rejected?", value: "vendor_rejected" },
      { label: "Can I update my submitted information?", value: "vendor_update_submitted_info" },
      { label: "Back to Vendor Menu", value: "vendor" },
      { label: "Main Menu", value: "main_menu" },
    ],
  },

  vendor_check_approval: {
    message: "You can check your vendor registration and approval status through the available Vendor Dashboard or contact the HarEvent support team for assistance.",
    options: [
      { label: "Contact Vendor Support", value: "vendor_support" },
      { label: "Back to Previous Question", value: "vendor_approval" },
      { label: "Main Menu", value: "main_menu" },
    ],
  },

  vendor_rejected: {
    message: "If your vendor registration is rejected, review any information or verification requirements shared by HarEvent. You can contact the support team for clarification and assistance.",
    options: [
      { label: "Contact Vendor Support", value: "vendor_support" },
      { label: "Back to Previous Question", value: "vendor_approval" },
      { label: "Main Menu", value: "main_menu" },
    ],
  },

  vendor_update_submitted_info: {
    message: "You can manage and update your business information through your Vendor Dashboard, subject to the platform's rules and available editing options.",
    options: [
      { label: "How can I create my Vendor Profile?", value: "vendor_create_profile" },
      { label: "Back to Previous Question", value: "vendor_approval" },
      { label: "Main Menu", value: "main_menu" },
    ],
  },

  // 14. VENDOR FREQUENTLY ASKED QUESTIONS

  vendor_faq: {
    message: "Here are some frequently asked questions about using HarEvent as a vendor. Choose a question below to learn more.",
    options: [
      { label: "Is the Basic Vendor Package free?", value: "vendor_faq_basic_free" },
      { label: "Can I select multiple vendor categories?", value: "vendor_faq_multiple_categories" },
      { label: "Can I update my vendor profile?", value: "vendor_faq_update_profile" },
      { label: "Can customers contact me directly?", value: "vendor_faq_direct_contact" },
      { label: "Will I receive customer enquiries?", value: "vendor_faq_receive_enquiries" },
      { label: "Can I upgrade my package?", value: "vendor_faq_upgrade" },
      { label: "What happens if my package expires?", value: "vendor_faq_expiry" },
      { label: "Can I register more than one business?", value: "vendor_faq_multiple_businesses" },
      { label: "Back to Vendor Menu", value: "vendor" },
      { label: "Main Menu", value: "main_menu" },
    ],
  },

  vendor_faq_basic_free: {
    message: "Yes. The proposed Basic package is free and provides essential business listing features.",
    options: [
      { label: "What is included in Basic?", value: "vendor_basic_package" },
      { label: "Back to FAQs", value: "vendor_faq" },
      { label: "Main Menu", value: "main_menu" },
    ],
  },

  vendor_faq_multiple_categories: {
    message: "Yes, you can select multiple relevant categories. Applicable package pricing will follow the combined-category pricing rules.",
    options: [
      { label: "How can I choose Vendor Categories?", value: "vendor_categories" },
      { label: "Back to FAQs", value: "vendor_faq" },
      { label: "Main Menu", value: "main_menu" },
    ],
  },

  vendor_faq_update_profile: {
    message: "Yes. You can manage and update your business information through your Vendor Dashboard.",
    options: [
      { label: "How can I manage my Vendor Dashboard?", value: "vendor_dashboard" },
      { label: "Back to FAQs", value: "vendor_faq" },
      { label: "Main Menu", value: "main_menu" },
    ],
  },

  vendor_faq_direct_contact: {
    message: "Yes. Customers can contact you through available WhatsApp and phone options or submit an enquiry through your vendor profile.",
    options: [
      { label: "How can I receive Customer Enquiries?", value: "vendor_enquiries" },
      { label: "Back to FAQs", value: "vendor_faq" },
      { label: "Main Menu", value: "main_menu" },
    ],
  },

  vendor_faq_receive_enquiries: {
    message: "Customers can submit enquiries through your vendor profile. These enquiries will be available in your Vendor Dashboard. Enquiry limits may depend on your selected package.",
    options: [
      { label: "How can I manage Leads?", value: "vendor_leads" },
      { label: "Back to FAQs", value: "vendor_faq" },
      { label: "Main Menu", value: "main_menu" },
    ],
  },

  vendor_faq_upgrade: {
    message: "You can explore the available upgrade options from your Vendor Dashboard.",
    options: [
      { label: "What is included in Gold?", value: "vendor_gold_package" },
      { label: "Back to FAQs", value: "vendor_faq" },
      { label: "Main Menu", value: "main_menu" },
    ],
  },

  vendor_faq_expiry: {
    message: "Your package status and applicable listing features will be managed according to the package terms displayed by HarEvent. Please check your Vendor Dashboard for package information.",
    options: [
      { label: "Contact Vendor Support", value: "vendor_support" },
      { label: "Back to FAQs", value: "vendor_faq" },
      { label: "Main Menu", value: "main_menu" },
    ],
  },

  vendor_faq_multiple_businesses: {
    message: "Registration of multiple businesses will depend on HarEvent's vendor account rules. Please contact the support team for clarification.",
    options: [
      { label: "Contact Vendor Support", value: "vendor_support" },
      { label: "Back to FAQs", value: "vendor_faq" },
      { label: "Main Menu", value: "main_menu" },
    ],
  },

  // 15. CONTACT VENDOR SUPPORT

  vendor_support: {
    message: "Need help with registration, profile setup, packages or enquiries? The HarEvent support team is here to assist you. Please visit the Contact Us section on the HarEvent website.",
    options: [
      { label: "Back to Vendor Menu", value: "vendor" },
      { label: "Frequently Asked Questions", value: "vendor_faq" },
      { label: "Main Menu", value: "main_menu" },
      { label: "Start Again", value: "start_again" },
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
