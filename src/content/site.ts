// All copy and figures for the site live here.
// PLACEHOLDER: everything except the company name, city and the 15,000 BBL
// capacity figure is illustrative and must be replaced with verified data
// before launch.

export const company = {
  name: "Bengal Distilleries",
  short: "BD",
  founded: "2025",
  city: "Kharagpur",
  region: "West Bengal, India",
  legalAge: 21,
  address: [
    "Plot 14, Vidyasagar Industrial Park",
    "Rakhajungle, Kharagpur",
    "Paschim Medinipur, West Bengal 721301",
  ],
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Vidyasagar+Industrial+Park+Kharagpur",
  email: {
    general: "hello@bengaldistilleries.in",
    investors: "ir@bengaldistilleries.in",
    trade: "trade@bengaldistilleries.in",
  },
  phone: { display: "+91 3222 255 014", href: "tel:+913222255014" },
  hours: "Brewhouse tours on Saturdays, 11:00 to 16:00, by appointment from February 2027.",
  social: {
    instagram: "https://instagram.com/",
    linkedin: "https://linkedin.com/",
    x: "https://x.com/",
    youtube: "https://youtube.com/",
  },
  // Drop a looping MP4 into /public/media and set these to swap the drawn
  // placeholders for real footage.
  heroVideo: "",
  facilityVideo: "",
  // Launch moment for the site-wide countdown banner.
  launchAt: "2026-10-12T20:00:00+05:30",
};

export const marquee = [
  "Heimer Strong Launches 12 Oct",
  "Batch No. 01 Ready",
  "Unfiltered Character",
  "Scaling Capacity: 15,000 BBL",
  "Crafted for the Fearless",
  "Brewed in Kharagpur",
  "Nolen Gur Season",
];

export const flagship = {
  name: "Heimer Strong",
  bengali: "হাইমার স্ট্রং",
  style: "Imperial amber ale with nolen gur",
  tagline:
    "A big, bronze, unfiltered amber brewed with Bengal's winter date-palm jaggery. Toffee up front, a peppery hop bite, and a dry finish that wants another sip.",
  story: {
    title: "Brewed strong, built for the table.",
    paragraphs: [
      "India drinks strong beer. Walk into any bar from Kharagpur to Kolkata and the big bottles on the table are 7 or 8 percent, brewed for punch and little else. Heimer Strong keeps the strength and adds the flavour that went missing: a bronze amber ale with real malt depth, a peppery hop bite, and nolen gur from Joynagar folded in at the end of the boil.",
      "It is unfiltered, so it pours with a faint haze under a dense, off-white head. The gur ferments almost dry, leaving smoke and caramel rather than sweetness, and the 7.2% sits quietly until the second glass. We brew it in small batches in Kharagpur, on the same kit that makes the wash for our whisky.",
      "It is made for food and for company: mustard fish, kosha mangsho, a plate of beguni, and a long evening. Batch 001 is in tank now. The first cans and kegs go out on launch day.",
    ],
  },
  stats: [
    { label: "ABV", value: "7.2", unit: "%" },
    { label: "IBU", value: "38", unit: "" },
    { label: "SRM", value: "17", unit: "" },
    { label: "OG", value: "1.072", unit: "" },
  ],
  notes: [
    {
      id: "malt",
      label: "Malt bill",
      body: "Pale ale malt with Munich and a touch of crystal 60 for the bronze. Gobindobhog rice from Bardhaman lightens the body so the gur can speak.",
      highlight: ["Malt sweetness", "Body"],
    },
    {
      id: "hops",
      label: "Hops",
      body: "Magnum for a clean bittering spine, then Cascade and Mosaic late in the boil. Expect orange peel and resin, never grassy.",
      highlight: ["Bitterness", "Aroma"],
    },
    {
      id: "gur",
      label: "Nolen gur",
      body: "Date-palm jaggery from Joynagar goes into the whirlpool. It ferments mostly dry and leaves smoke, caramel and a faint mineral edge.",
      highlight: ["Malt sweetness", "Aroma"],
    },
    {
      id: "finish",
      label: "Finish",
      body: "Unfiltered and naturally hazy. Lively carbonation scrubs the palate, so it holds up next to mustard, chilli and fried things.",
      highlight: ["Carbonation", "Bitterness"],
    },
  ],
  profile: [
    { label: "Malt sweetness", value: 4 },
    { label: "Bitterness", value: 3 },
    { label: "Body", value: 4 },
    { label: "Aroma", value: 4 },
    { label: "Carbonation", value: 3 },
  ],
  specs: [
    ["Style", "Imperial amber ale, unfiltered"],
    ["Alcohol", "7.2% ABV"],
    ["Bitterness", "38 IBU"],
    ["Colour", "17 SRM, deep bronze with an amber edge"],
    ["Gravity", "OG 1.072 / FG 1.017"],
    ["Malts", "Pale ale, Munich, crystal 60, Gobindobhog rice"],
    ["Hops", "Magnum, Cascade, Mosaic"],
    ["Adjunct", "Nolen gur (date-palm jaggery), Joynagar"],
    ["Yeast", "English ale strain, fermented at 19 °C"],
    ["Tasting notes", "Toffee, smoked caramel, orange peel, black pepper, dry mineral finish"],
    ["Food pairings", "Kosha mangsho, Kolkata biryani, beguni, shorshe ilish, aged cheddar"],
    ["Serve", "8 to 10 °C in a tulip or nonic pint"],
    ["Formats", "330 ml can, 650 ml bottle, 30 L keg"],
  ] as [string, string][],
};

export const productionSteps = [
  {
    id: "mash",
    title: "Milling and mashing",
    body: "Malt and Gobindobhog rice are milled and steeped at 66 °C. Enzymes turn starch into sugar, and we run the sweet wort off clear.",
  },
  {
    id: "brew",
    title: "Brewing",
    body: "Wort boils for 70 minutes with hops. Nolen gur goes in at whirlpool so the smoke and caramel survive.",
  },
  {
    id: "ferment",
    title: "Fermentation",
    body: "Ale yeast works for 9 to 12 days in jacketed steel. The same yeast work makes the wash for our stills.",
  },
  {
    id: "still",
    title: "Distillation",
    body: "Unhopped wash runs twice through copper pot stills. Copper strips sulphur; the stillman cuts hearts by nose and hydrometer.",
  },
  {
    id: "cask",
    title: "Cask ageing",
    body: "New-make spirit fills ex-bourbon and Heimer-seasoned oak. Kharagpur's heat and monsoon humidity age it fast and hard.",
  },
];

export const team = [
  {
    name: "Ananya Sengupta",
    role: "Founder and CEO",
    initials: "AS",
    bio: "Twelve years in beverage alcohol strategy across India and Southeast Asia. Led route-to-market for two national beer brands before going independent.",
    creds: ["IIT Kharagpur, B.Tech", "IIM Calcutta, MBA"],
  },
  {
    name: "Rohan Mitra",
    role: "Master Brewer",
    initials: "RM",
    bio: "Trained in Bavaria and brewed in Bengaluru's craft scene for nine years. Built three brewpub programmes from empty sheds to award-winning taps.",
    creds: ["Diploma Brewer, IBD", "Doemens Academy"],
  },
  {
    name: "Dr. Ishita Bose",
    role: "Head Distiller",
    initials: "IB",
    bio: "Fermentation scientist turned stillman. Spent six years on single malt production in Goa, from wash to warehouse.",
    creds: ["PhD, Microbiology", "Heriot-Watt, MSc Distilling"],
  },
  {
    name: "Kabir Dasgupta",
    role: "Chief Financial Officer",
    initials: "KD",
    bio: "Former investment banker covering consumer and alcobev. Structured excise-bonded inventory financing for India's first craft whisky warehouse loan.",
    creds: ["Chartered Accountant", "CFA charterholder"],
  },
];

export type MilestoneStatus = "done" | "now" | "next";

export const milestones: { when: string; title: string; body: string; status: MilestoneStatus }[] = [
  { when: "Q2 2025", title: "Land secured", body: "3.2 acres at Vidyasagar Industrial Park, 9 km from Kharagpur junction.", status: "done" },
  { when: "Q4 2025", title: "Brewhouse ordered", body: "First seed tranche closed; 20 BBL brewhouse and copper stills commissioned from fabricators.", status: "done" },
  { when: "Q2 2026", title: "Licences granted", body: "Brewery and distillery licences issued by the West Bengal Excise Directorate.", status: "done" },
  { when: "Q3 2026", title: "Facility buildout", body: "Brewhouse, cellar and bonded warehouse built and pressure-tested.", status: "done" },
  { when: "Q4 2026", title: "Heimer Strong launch", body: "Batch 001 goes on sale on 12 October 2026 across West Bengal on-premise.", status: "now" },
  { when: "2027", title: "Year-one volume", body: "25,000 case target across bars, hotels and retail in West Bengal.", status: "next" },
  { when: "Q2 2027", title: "First 500 casks", body: "Single malt barrelling begins in ex-bourbon and Heimer-seasoned oak.", status: "next" },
  { when: "2028", title: "Multi-state expansion", body: "Odisha, Jharkhand and Assam, then Karnataka. Capacity steps to 15,000 BBL.", status: "next" },
];
