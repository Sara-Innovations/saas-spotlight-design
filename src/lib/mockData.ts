// Mock data for Trading Hub

export interface Business {
  id: string;
  name: string;
  category: string;
  location: string;
  state: string;
  phone: string;
  description: string;
  image: string;
  rating: number;
  reviews: number;
  services: string[];
  openHours: string;
  email: string;
  website: string;
  address: string;
}

export interface Service {
  id: string;
  title: string;
  provider: string;
  providerId: string;
  category: string;
  price: number;
  priceType: "fixed" | "hourly" | "starting";
  rating: number;
  reviews: number;
  description: string;
  image: string;
  location: string;
}

export interface Product {
  id: string;
  title: string;
  seller: string;
  sellerId: string;
  price: number;
  originalPrice?: number;
  category: string;
  condition: "new" | "used" | "refurbished";
  image: string;
  rating: number;
  reviews: number;
  description: string;
  location: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  companyId: string;
  location: string;
  type: "full-time" | "part-time" | "contract" | "casual";
  salary: string;
  description: string;
  requirements: string[];
  postedDate: string;
  category: string;
  logo: string;
}

export interface Invoice {
  id: string;
  date: string;
  dueDate: string;
  amount: number;
  status: "paid" | "pending" | "overdue";
  client: string;
  description: string;
}

export const businesses: Business[] = [
  { id: "1", name: "Vella Nero", category: "Cafes", location: "Sydney", state: "New South Wales", phone: "0292680755", description: "It's coffee couture! Award-winning, in-store coffee roastery, coffee bean boutique and Sydney CBD cafe.", image: "", rating: 4.5, reviews: 128, services: ["Coffee Roasting", "Catering", "Events"], openHours: "Monday to Friday, 9:00 AM - 5:00 PM", email: "info@vellanero.com.au", website: "vellanero.com.au", address: "Shop 3, 259 Clarence St, Sydney" },
  { id: "2", name: "Gupta, Ritu", category: "Dermatologists", location: "Sydney", state: "New South Wales", phone: "0280148500", description: "Dr Ritu Gupta MBBS (Hons), FACD, PhD Medicine Dermatologist specialising in Skin checks, Mole checks, medical dermatology, skin cancer excisions, cosmetic dermatology including laser.", image: "", rating: 4.8, reviews: 256, services: ["Skin Checks", "Mole Removal", "Laser Treatment", "Cosmetic Dermatology"], openHours: "Monday to Friday, 8:00 AM - 6:00 PM", email: "info@drritugupta.com.au", website: "drritugupta.com.au", address: "Level 3, 1 Oxford St, Sydney" },
  { id: "3", name: "Cafeideas", category: "Furniture Stores", location: "Chippendale", state: "New South Wales", phone: "1300223343", description: "Online and Australia Wide. Come for the Price, Stay for the Service", image: "", rating: 4.2, reviews: 89, services: ["Furniture Sales", "Delivery", "Assembly"], openHours: "Monday to Saturday, 9:00 AM - 5:30 PM", email: "sales@cafeideas.com.au", website: "cafeideas.com.au", address: "12 Kensington St, Chippendale" },
  { id: "4", name: "MORE4LIFE Financial Services", category: "Refinancing", location: "Sydney", state: "New South Wales", phone: "0299390702", description: "My Life Financial Services - Helping you get more from life with smart financial planning.", image: "", rating: 4.6, reviews: 67, services: ["Refinancing", "Home Loans", "Investment Advice"], openHours: "Monday to Friday, 9:00 AM - 5:00 PM", email: "info@more4life.com.au", website: "more4life.com.au", address: "Level 5, 33 York St, Sydney" },
  { id: "5", name: "Museum of Applied Arts and Sciences", category: "Museums", location: "Ultimo", state: "New South Wales", phone: "0292170111", description: "A museum of applied arts and sciences located in Ultimo. The Powerhouse Museum is a hands-on experience for the young and the old.", image: "", rating: 4.7, reviews: 512, services: ["Exhibitions", "Events", "Education Programs"], openHours: "Daily, 10:00 AM - 5:00 PM", email: "info@maas.museum", website: "maas.museum", address: "500 Harris St, Ultimo" },
  { id: "6", name: "Ribs & Burgers Central Park", category: "Restaurants", location: "Sydney", state: "New South Wales", phone: "0279030288", description: "Ribs and Burgers is an identified restaurant in Central Park, recommended for its burger all over Australia.", image: "", rating: 4.4, reviews: 340, services: ["Dine In", "Takeaway", "Catering"], openHours: "Daily, 11:00 AM - 10:00 PM", email: "info@ribsandburgers.com", website: "ribsandburgers.com", address: "Central Park Mall, Broadway, Sydney" },
  { id: "7", name: "Enliven Fitness Pty Ltd", category: "Personal Trainers", location: "Ultimo", state: "New South Wales", phone: "0282034598", description: "Enliven is a boutique fitness and massage centre located in Ultimo. We specialise in group training, personal training, nutritional coaching and massage therapy.", image: "", rating: 4.9, reviews: 198, services: ["Personal Training", "Group Classes", "Massage", "Nutrition Coaching"], openHours: "Monday to Saturday, 6:00 AM - 8:00 PM", email: "info@enlivenfitness.com.au", website: "enlivenfitness.com.au", address: "15 Jones St, Ultimo" },
  { id: "8", name: "KOI Dessert Bar", category: "Cake Shop", location: "Sydney", state: "New South Wales", phone: "0292121230", description: "Award-winning dessert bar offering unique desserts, cakes and pastries in the heart of Sydney.", image: "", rating: 4.8, reviews: 445, services: ["Custom Cakes", "Desserts", "Catering"], openHours: "Tuesday to Sunday, 10:00 AM - 9:00 PM", email: "hello@koidessertbar.com.au", website: "koidessertbar.com.au", address: "Kingsford, Sydney" },
  { id: "9", name: "TLC Management Pty Ltd", category: "Bookkeeping", location: "Marrickville", state: "New South Wales", phone: "0299727777", description: "TLC Management Pty Ltd - Professional bookkeeping and accounting services.", image: "", rating: 4.3, reviews: 42, services: ["Bookkeeping", "BAS Preparation", "Payroll", "Tax Planning"], openHours: "Monday to Friday, 9:00 AM - 5:00 PM", email: "info@tlcmanagement.com.au", website: "tlcmanagement.com.au", address: "21 Illawarra Rd, Marrickville" },
  { id: "10", name: "CMSN Network", category: "Business Services", location: "Los Angeles", state: "California", phone: "1300870274", description: "Publication Was Formed With A Passion To Solve Most Challenging And Complex Technology Needs.", image: "", rating: 4.1, reviews: 35, services: ["Web Development", "IT Solutions", "Consulting"], openHours: "Monday to Friday, 9:00 AM - 5:00 PM", email: "sumonmiah2003@cmsngroup.com.au", website: "cmsngroup.com.au", address: "Los Angeles, CA" },
];

export const services: Service[] = [
  { id: "1", title: "Professional Web Development", provider: "CMSN Network", providerId: "10", category: "IT & Software", price: 150, priceType: "hourly", rating: 4.8, reviews: 67, description: "Full-stack web development services including React, Node.js, and cloud deployment.", image: "", location: "Remote" },
  { id: "2", title: "Logo & Brand Design", provider: "Creative Studio", providerId: "10", category: "Design", price: 500, priceType: "starting", rating: 4.9, reviews: 124, description: "Professional logo and brand identity design for businesses of all sizes.", image: "", location: "Sydney" },
  { id: "3", title: "Tax Return Preparation", provider: "TLC Management", providerId: "9", category: "Finance", price: 200, priceType: "fixed", rating: 4.5, reviews: 89, description: "Individual and business tax return preparation with maximum deductions.", image: "", location: "Marrickville" },
  { id: "4", title: "Personal Training Session", provider: "Enliven Fitness", providerId: "7", category: "Health & Fitness", price: 80, priceType: "hourly", rating: 4.9, reviews: 198, description: "One-on-one personal training tailored to your fitness goals.", image: "", location: "Ultimo" },
  { id: "5", title: "Corporate Catering", provider: "Ribs & Burgers", providerId: "6", category: "Food & Beverage", price: 25, priceType: "starting", rating: 4.6, reviews: 56, description: "Delicious catering packages for corporate events and meetings.", image: "", location: "Sydney" },
  { id: "6", title: "Skin Health Check", provider: "Dr Ritu Gupta", providerId: "2", category: "Health", price: 150, priceType: "fixed", rating: 4.8, reviews: 230, description: "Comprehensive skin check by experienced dermatologist.", image: "", location: "Sydney" },
];

export const products: Product[] = [
  { id: "1", title: "Ergonomic Office Chair", seller: "Cafeideas", sellerId: "3", price: 599, originalPrice: 799, category: "Furniture", condition: "new", image: "", rating: 4.5, reviews: 45, description: "Premium ergonomic office chair with lumbar support and adjustable armrests.", location: "Chippendale" },
  { id: "2", title: "Standing Desk - Adjustable", seller: "Cafeideas", sellerId: "3", price: 899, category: "Furniture", condition: "new", image: "", rating: 4.7, reviews: 89, description: "Electric height-adjustable standing desk with memory presets.", location: "Chippendale" },
  { id: "3", title: "Artisan Coffee Beans 1kg", seller: "Vella Nero", sellerId: "1", price: 45, category: "Food & Beverage", condition: "new", image: "", rating: 4.9, reviews: 234, description: "Premium single-origin coffee beans, freshly roasted in-house.", location: "Sydney" },
  { id: "4", title: "Custom Birthday Cake", seller: "KOI Dessert Bar", sellerId: "8", price: 120, originalPrice: 150, category: "Food & Beverage", condition: "new", image: "", rating: 4.8, reviews: 167, description: "Beautiful custom-designed birthday cake with your choice of flavors.", location: "Sydney" },
  { id: "5", title: "Resistance Band Set", seller: "Enliven Fitness", sellerId: "7", price: 49, category: "Sports & Fitness", condition: "new", image: "", rating: 4.6, reviews: 78, description: "Complete set of resistance bands for home workouts.", location: "Ultimo" },
  { id: "6", title: "Museum Exhibition Catalog", seller: "MAAS", sellerId: "5", price: 35, category: "Books", condition: "new", image: "", rating: 4.4, reviews: 23, description: "Limited edition exhibition catalog from the latest showcase.", location: "Ultimo" },
];

export const jobs: Job[] = [
  { id: "1", title: "Senior Web Developer", company: "CMSN Network", companyId: "10", location: "Sydney, NSW", type: "full-time", salary: "$120,000 - $150,000", description: "We are looking for an experienced web developer to lead our development team. You will be responsible for building and maintaining client websites and web applications.", requirements: ["5+ years React experience", "Node.js / TypeScript", "AWS or GCP experience", "Team leadership"], postedDate: "2026-04-07", category: "IT & Software", logo: "" },
  { id: "2", title: "Barista - Full Time", company: "Vella Nero", companyId: "1", location: "Sydney CBD, NSW", type: "full-time", salary: "$55,000 - $60,000", description: "Join our award-winning coffee team. Experience with specialty coffee preferred.", requirements: ["Barista experience", "Customer service skills", "Knowledge of coffee"], postedDate: "2026-04-06", category: "Hospitality", logo: "" },
  { id: "3", title: "Bookkeeper", company: "TLC Management", companyId: "9", location: "Marrickville, NSW", type: "part-time", salary: "$35 - $45/hr", description: "Part-time bookkeeper needed for growing accounting firm. MYOB and Xero experience required.", requirements: ["MYOB & Xero proficiency", "BAS preparation", "Cert IV Bookkeeping or equivalent"], postedDate: "2026-04-05", category: "Finance", logo: "" },
  { id: "4", title: "Personal Trainer", company: "Enliven Fitness", companyId: "7", location: "Ultimo, NSW", type: "casual", salary: "$40 - $60/hr", description: "Casual personal trainer for our boutique fitness studio. Flexible hours available.", requirements: ["Cert III/IV in Fitness", "First Aid certificate", "Insurance"], postedDate: "2026-04-08", category: "Health & Fitness", logo: "" },
  { id: "5", title: "Chef de Partie", company: "Ribs & Burgers", companyId: "6", location: "Sydney, NSW", type: "full-time", salary: "$65,000 - $75,000", description: "Experienced chef needed for our busy Central Park location.", requirements: ["Commercial kitchen experience", "Food safety certificate", "Flexibility with hours"], postedDate: "2026-04-04", category: "Hospitality", logo: "" },
  { id: "6", title: "Dermatology Nurse", company: "Dr Ritu Gupta", companyId: "2", location: "Sydney, NSW", type: "full-time", salary: "$80,000 - $95,000", description: "Registered nurse with dermatology experience for busy specialist practice.", requirements: ["Registered Nurse", "Dermatology experience", "Laser safety certificate"], postedDate: "2026-04-03", category: "Health", logo: "" },
];

export const invoices: Invoice[] = [
  { id: "INV-001", date: "2026-04-01", dueDate: "2026-04-15", amount: 1500, status: "paid", client: "CMSN Network", description: "Web Development Services - March 2026" },
  { id: "INV-002", date: "2026-04-03", dueDate: "2026-04-17", amount: 850, status: "pending", client: "Cafeideas", description: "Furniture Delivery - 5x Office Chairs" },
  { id: "INV-003", date: "2026-03-20", dueDate: "2026-04-03", amount: 200, status: "overdue", client: "TLC Management", description: "Bookkeeping Services - Q1 2026" },
  { id: "INV-004", date: "2026-04-05", dueDate: "2026-04-19", amount: 3200, status: "pending", client: "Enliven Fitness", description: "Annual Website Maintenance" },
  { id: "INV-005", date: "2026-03-28", dueDate: "2026-04-11", amount: 450, status: "paid", client: "Vella Nero", description: "Brand Design Package" },
];

export const categories = [
  "All Categories", "Business Services", "Cafes", "Restaurants", "Dermatologists", "Furniture Stores",
  "Refinancing", "Museums", "Personal Trainers", "Cake Shop", "Bookkeeping"
];
