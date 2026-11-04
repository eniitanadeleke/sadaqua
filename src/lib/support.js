// Words for Help & Support and Contact us (Figma: Help & Support, Contact us,
// FAQ 1, How it works). Support is shared by givers and recipients.
//
// The Figma only has the giver questions, without answers. The answers and the
// recipient questions below are drafts: replace them with the client's wording.

export const FAQS = {
  giver: [
    {
      question: "What is Sadaqah?",
      answer:
        "Sadaqah is voluntary charity, given out of kindness to help someone in need. Sadaqua makes it simple to give to people whose needs have been checked.",
    },
    {
      question: "How do I support a cause?",
      answer:
        "Browse the causes, open one you care about, choose how much to give and complete your donation through our secure payment partner.",
    },
    {
      question: "How do I know a cause is verified?",
      answer:
        "Every cause is reviewed by a Sadaqua verification officer before it is published. Only verified causes are shown to givers.",
    },
    {
      // Figma repeats "How do I know a cause is verified?" here
      question: "Is my payment secure?",
      answer:
        "Yes. Donations are processed by our secure payment partner. Sadaqua never sees or stores your card details.",
    },
    {
      question: "Can I see how my donation is being used?",
      answer:
        "Yes. Each cause shows its funding progress and updates as it moves forward.",
    },
    {
      question: "What happens if a cause is not fully funded?",
      answer:
        "The support raised still goes toward the need. Our team keeps the person updated on what happens next.",
    },
    {
      question: "Where can I find my giving history?",
      answer:
        "Open Profile, then Giving history, to see every donation you have made.",
    },
  ],
  recipient: [
    {
      question: "How do I request help?",
      answer:
        "Tap Request help, tell us what you need and how much, add one supporting document and submit. It only takes a few minutes.",
    },
    {
      question: "What document should I upload?",
      answer:
        "One PDF, JPG, PNG or MP4 file of up to 10 MB that supports your need, such as a medical report, a school fee invoice or a rent notice.",
    },
    {
      question: "How long does verification take?",
      answer:
        "It usually takes 2-3 working days. You can follow every step under My requests.",
    },
    {
      question: "Who can see my request?",
      answer:
        "Only approved requests are published. Your name is shown the way you choose under Profile, Name display, and only your general location is shown.",
    },
    {
      question: "What if more information is needed?",
      answer:
        "Your request will show More information needed. Tap Provide information, answer the question and, if you can, add a document. Your request then goes back to review.",
    },
    {
      question: "How will I receive support?",
      answer:
        "When givers give, support is provided toward your need. You can see how much has been received on your request.",
    },
  ],
};

// "How Sadaqua Works": the two tabs (Figma: How it works)
export const HOW_IT_WORKS = {
  give: {
    tab: "I want to give",
    steps: [
      {
        title: "Find a verified cause",
        text: "Browse causes that have been reviewed by Sadaqua.",
      },
      {
        title: "Choose how much to give",
        text: "Select a cause and choose your donation amount.",
      },
      {
        title: "Give securely",
        text: "Complete your donation through our secure payment partner.",
      },
      {
        title: "Follow the impact",
        text: "See funding progress and updates as the cause moves forward.",
      },
    ],
    action: { label: "Browse causes", href: "/giver/causes" },
  },
  help: {
    tab: "I need help",
    steps: [
      {
        title: "Submit a request",
        text: "Tell us what kind of support you need.",
      },
      {
        title: "Get verified",
        text: "A Sadaqua verification officer reviews your request.",
      },
      {
        title: "Get approved",
        text: "Approved requests can be published as verified causes.",
      },
      {
        title: "Receive support",
        text: "When people give, support is provided toward your need and you can track its progress.",
      },
    ],
    action: { label: "Request help", href: "/recipient/request-help" },
  },
};

// Placeholders: replace with Sadaqua's real support email and WhatsApp number
export const SUPPORT_CONTACT = {
  email: "support@sadaqua.org",
  whatsapp: "2348000000000", // international format, no "+"
};

export const whatsappHref = () => `https://wa.me/${SUPPORT_CONTACT.whatsapp}`;
export const emailHref = () => `mailto:${SUPPORT_CONTACT.email}`;
