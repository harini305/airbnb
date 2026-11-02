// Verbatim copy from the Phase 1 audit (docs/source-audit/03-content-inventory.md).
// Only obvious typos are corrected (audit issue C7); prices, names and facts are unchanged.

export const home = {
  title: "Discover services on Airbnb",
  lead: "Instantly book local professionals to elevate your next trip. Find trusted chefs, trainers, wellness experts, photographers and more.",
};

// Full detail record — only listing 7131141 was captured in the audit (03 §5).
export const details = {
  7131141: {
    title: "Editorial fashion portraits by Irfan",
    bio: "I hold a bachelor of visual communication and my work appears in Business minds media.",
    role: "Photographer in Chennai",
    providedAt: "Provided at your home",
    rating: 5.0,
    reviews: 3,
    priceFrom: 2500,
    unit: "guest",
    cancellation: "Free cancellation",
    cancellationDetail: "Up to 1 day before start time",
    host: { name: "Irfan", role: "Photographer", avatar: "7131141-host" },
    photos: ["7131141-03", "7131141-04", "7131141-07", "7131141-06", "7131141-02", "7131141-05", "7131141-01"],
    offerings: [
      { title: "Bikini photoshoot", description: "1 Look - 3,000 30 Raw photos - 3 will be edited", price: 2500, duration: "45 mins" },
      { title: "Holi Theme photoshoot", description: "Holi theme photoshoot will be done in indoor photoshoot setup. Holi powder will be applied during the shoot. 30 Raw photos and 3 will be edited.", price: 2800, duration: "1 hr 15 mins" },
      { title: "Fashion photoshoot", description: "1 look - 30 Raw photos, 3 will be edited. Indoor studio setup is included in the price.", price: 3000, duration: "45 mins" },
      { title: "Pre Wedding photoshoot", description: "Capture beautiful moments together in a guided couple photoshoot with creative poses and professional photography.", price: 3500, duration: "1 hr", minimum: 7500 },
      { title: "Boudoir portrait Photography", description: "Enjoy a private and professionally guided portrait photography session focused on elegant poses, creative lighting and artistic portraits. Suitable for adults aged 18+.", price: 3500, duration: "1 hr", minimum: 4500 },
    ],
    customiseNote: "You can message Irfan to customise or make changes.",
    qualifications: [
      { title: "10 years of experience", text: "I am an international fashion photographer who worked in Dubai, India & Saudi." },
      { title: "Career highlight", text: "Photographs have been featured in Saudi based magazine - Business minds media." },
      { title: "Education and training", text: "Bachelor's of visual communication" },
    ],
    paymentNote: "To help protect your payment, always use Airbnb to send money and communicate with hosts.",
    location: {
      comesToYou: "I travel to guests in the area outlined on the map. To book in a different location, you can message me.",
      comeToMe: "Chennai, Tamil Nadu, 600014",
    },
    thingsToKnow: [
      { title: "Guest requirements", text: "Guests aged 18 and up can attend." },
      { title: "Accessibility", text: "Message your host for details." },
      { title: "Cancellation policy", text: "Cancel at least 1 day before the start time for a full refund." },
    ],
  },
};

// Host acquisition page (/host/services), 03 §8.
export const host = {
  title: "Give your business a new home",
  lead: "Now your service can reach millions of people on Airbnb.",
  offer: {
    title: "Offer what you do best with Airbnb Services",
    text: "Airbnb is for more than homes. Now it's for businesses like yours.",
  },
  customers: {
    title: "Welcome a world of new customers",
    text: "Reach millions of people travelling and living near you on Airbnb.",
    stats: [
      { value: "390 million", label: "guests arrived in 2024.", note: "390m includes new and returning guests." },
      { value: "$81 billion", label: "spent on Airbnb in 2024.", note: "$81bn USD in gross bookings for stays and experiences." },
    ],
  },
  showUp: {
    title: "Show up beautifully. Get booked instantly.",
    text: "Create a standout listing and fill your calendar with instant booking.",
  },
  reach: {
    title: "Reach more people in more ways",
    text: "We put services like yours in front of guests who are planning and travelling.",
    items: [
      { title: "Get discovered when guests plan", text: "Your service can appear to people with upcoming trips to your city." },
      { title: "Get suggested as guests travel", text: "Show up in guest itineraries as a way to make their stay more special.", soon: true },
    ],
  },
  tools: {
    title: "World-class tools for your local business",
    text: "Your bookings, calendar, messages and payments – all in the Airbnb app.",
    items: [
      { title: "Manage reservations", text: "Stay organised with clear details for every booking.", image: "tool-reservations" },
      { title: "Simplify scheduling", text: "Sync with Google Calendar, set business hours and fill gaps in your day.", image: "tool-scheduling" },
      { title: "Message with guests", text: "Send photos, videos and accept payments for special requests.", image: "tool-messaging" },
      { title: "Get paid quickly", text: "Receive payments securely and see your earnings in real time.", image: "tool-payments" },
    ],
  },
  faq: [
    {
      q: "Is my service right for Airbnb?",
      a: "Airbnb Services is a marketplace for high-quality services that make a guest's stay even better. Services include catering, chefs, hair styling, make-up, massage, personal training, photography, prepared meals and spa treatments.",
    },
    {
      q: "How do I apply?",
      a: "It's easy to get started. First, share a little about yourself and the service you offer. Then add photos, set your pricing and submit your listing for review. We may get back to you with suggested changes, requests to upload licences or to ask for proof of insurance. Once your listing has been approved, you can publish it and start offering your service to customers immediately.",
    },
    {
      q: "What are Airbnb's fees?",
      a: "It's free to create and submit a listing for review. Airbnb automatically deducts a 15% service fee from the payout of every service booked.",
    },
  ],
};
