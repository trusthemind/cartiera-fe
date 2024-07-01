import { CollapseProps } from "antd";

export const FAQList: CollapseProps['items'] = [
  {
    key: 1,
    label: "How do I search for cars on Cartiera?",
    children: `Simply use our search bar to enter the make, model, or keywords of the
  car you are looking for. You can also filter results by price, year,
  mileage, and other criteria to narrow down your options.`,
  },
  //   {
  //     label: "Can I compare different cars?",
  //     children: `Yes, our comparison tool allows you to evaluate multiple cars side by
  //   side. Compare features, specifications, and prices to make the best
  //   choice.`,
  //   },
  {
    key: 2,
    label: "Is my personal information secure?",
    children: `Absolutely. We use advanced security measures to protect your personal
  information and ensure a safe browsing and purchasing experience.`,
  },
  {
    key: 3,
    label: "How do I contact customer support?",
    children: `You can reach out to our customer support team through the contact form on
  our website, via email at support@cartiera.com, or by calling our
  support hotline.`,
  },
  {
    key: 4,
    label: "What payment methods are accepted?",
    children: `We accept various payment methods including credit/debit cards, bank
  transfers, and financing options. Please check our payment page for
  more details.`,
  },
  //   {
  //     label: "Can I schedule a test drive?",
  //     children: `Yes, you can schedule a test drive by contacting the car seller directly
  //   through the car's listing page. Alternatively, you can reach out to our
  //   customer support team for assistance.`,
  //   },
  {
    key: 5,
    label: "What should I do if I encounter issues with a car after purchase?",
    children: `If you experience any issues with a car after purchase, please contact the
  seller directly for support. For any other concerns, our customer support
  team is available to assist you.`,
  },
  {
    key: 6,
    label: "How can I update my profile information?",
    children: `You can update your profile information by logging into your account and
  navigating to the 'Profile' section. From there, you can edit your personal
  details and save the changes.`,
  },
];
