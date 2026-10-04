export interface CourseCurriculumModule {
  id?: string;
  title: string;
  lectures?: string;
  duration?: string;
  details?: string[];
}

export interface Course {
  id: string;
  name: string;
  category: string;
  badge: 'Popular' | 'New' | 'Trending' | string;
  badgeColor?: 'amber' | 'emerald' | 'blue';
  price: number;
  originalPrice: number;
  validityDays: number;
  duration: string;
  level: string;
  rating: number;
  reviewsCount: string;
  description: string;
  faculty: string;
  image: string;
  modulesCount: number;
  testsCount: number;
  pdfNotesCount: number;

  videoUrl?: string;
  videoUrls?: string[];
  aboutCourse?: string;
  whatYouWillLearn?: string[];
  curriculumList?: CourseCurriculumModule[];
  instructorTitle?: string;
  instructorBio?: string;
  instructorImage?: string;

  digitalAssetUrl?: string;
  digitalAssetName?: string;
  digitalAssetType?: 'pdf' | 'image' | 'zip' | 'document' | 'link';
}

export interface StudentCourse {
  courseId: string;
  purchaseDate: string;
  expiryDate: string;
  progressPercent?: number;
}

export interface Student {
  id: string | number;
  name: string;
  email: string;
  phone: string;
  password?: string;
  joinDate: string;
  courses: StudentCourse[];
}

export interface NotificationItem {
  id: number;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  source: string;
  seen: boolean;
}

export interface SiteContent {
  heroHeading: string;
  heroLede: string;
  contactPhone: string;
  contactEmail: string;
  heroImage: string;
  promoVideoUrl: string;
}

export interface SessionUser {
  email: string;
  role: 'student' | 'owner';
  name?: string;
  phone?: string;
}

export const BB_OWNER = {
  email: 'owner@brainbridge.in',
  password: process.env.BB_OWNER_PASSWORD || '',
  name: 'Surendra Kumar Saini',
  phone: '+91-90243-03988',
  intlPhone: '919024303988',
  notifyEmail: 'surendrakumarsaini94@gmail.com',
};

export interface CourseLesson {
  id: string;
  title: string;
  duration: string;
  isFreePreview: boolean;
  topic: string;
  videoUrl?: string;
  notesTitle?: string;
}

export interface CourseModule {
  id: string;
  title: string;
  duration: string;
  lecturesCount: number;
  lessons: CourseLesson[];
}

export interface CourseDetailInfo {
  modules: CourseModule[];
  whatYouWillLearn: string[];
  requirements: string[];
  targetAudience: string[];
  facultyBio: {
    name: string;
    designation: string;
    experience: string;
    education: string;
    studentsMentored: string;
    bio: string;
  };
  studentReviews: {
    id: string;
    name: string;
    role: string;
    rating: number;
    date: string;
    comment: string;
    verified: boolean;
  }[];
}

export function getCourseCurriculum(courseId: string): CourseDetailInfo {
  switch (courseId) {
    case 'web-dev':
      return {
        modules: [
          {
            id: 'm1',
            title: 'Module 1: Modern Web Foundations & Semantic HTML5',
            duration: '3h 45m',
            lecturesCount: 4,
            lessons: [
              {
                id: 'l1',
                title: 'Lesson 1.1: Web Architecture, HTTP & Modern Tooling',
                duration: '42:15 mins',
                isFreePreview: true,
                topic: 'Client-server model, DNS, DevTools, terminal workflow, and modern VS Code setup',
                notesTitle: 'Web_Fundamentals_Guide.pdf',
              },
              {
                id: 'l2',
                title: 'Lesson 1.2: Modern Semantic HTML & Accessibility (a11y)',
                duration: '48:30 mins',
                isFreePreview: true,
                topic: 'Semantic tags, screen reader optimization, SEO meta headers, and form validation',
                notesTitle: 'HTML5_Semantic_Cheatsheet.pdf',
              },
              {
                id: 'l3',
                title: 'Lesson 1.3: Modern CSS Layouts (Flexbox & CSS Grid Mastery)',
                duration: '56:20 mins',
                isFreePreview: false,
                topic: '2-dimensional layouts, alignment, auto-fit/fill grids, and responsive viewports',
                notesTitle: 'CSS_Grid_Flexbox_Reference.pdf',
              },
              {
                id: 'l4',
                title: 'Lesson 1.4: Tailwind CSS & Modern Design Systems',
                duration: '50:10 mins',
                isFreePreview: false,
                topic: 'Utility-first styling, color tokens, animations, responsive breakpoints, and dark mode',
                notesTitle: 'Tailwind_Design_Tokens.pdf',
              },
            ],
          },
          {
            id: 'm2',
            title: 'Module 2: JavaScript Mastery & Asynchronous Programming',
            duration: '5h 10m',
            lecturesCount: 5,
            lessons: [
              {
                id: 'l5',
                title: 'Lesson 2.1: Modern ES6+ Syntax, Scoping & Closures',
                duration: '52:40 mins',
                isFreePreview: true,
                topic: 'Destructuring, spread, arrow functions, lexical scope, and memory management',
                notesTitle: 'Modern_ES6_DeepDive.pdf',
              },
              {
                id: 'l6',
                title: 'Lesson 2.2: DOM Manipulation, Events & Bubbling',
                duration: '46:15 mins',
                isFreePreview: false,
                topic: 'Event delegation, dynamic element rendering, mutation observers, and custom events',
                notesTitle: 'DOM_Engine_Notes.pdf',
              },
              {
                id: 'l7',
                title: 'Lesson 2.3: Promises, Async/Await & Fetch API',
                duration: '58:00 mins',
                isFreePreview: false,
                topic: 'Handling REST APIs, JSON parsing, error boundaries, and debounce/throttle utilities',
                notesTitle: 'Async_JavaScript_Handbook.pdf',
              },
              {
                id: 'l8',
                title: 'Lesson 2.4: Object-Oriented JS, Prototypes & Modules',
                duration: '45:30 mins',
                isFreePreview: false,
                topic: 'Classes, prototype chaining, inheritance patterns, and ESM import/export',
                notesTitle: 'OOP_JavaScript_Notes.pdf',
              },
              {
                id: 'l9',
                title: 'Lesson 2.5: Browser Storage, Cookies & Security Essentials',
                duration: '38:10 mins',
                isFreePreview: false,
                topic: 'LocalStorage, IndexedDB, XSS defense, CSRF mitigation, and CORS configuration',
                notesTitle: 'Web_Security_Checklist.pdf',
              },
            ],
          },
          {
            id: 'm3',
            title: 'Module 3: React 19 & Next.js App Router Architecture',
            duration: '6h 20m',
            lecturesCount: 5,
            lessons: [
              {
                id: 'l10',
                title: 'Lesson 3.1: React Core: Virtual DOM, Components & JSX',
                duration: '54:20 mins',
                isFreePreview: true,
                topic: 'Component lifecycle, declarative state rendering, unidirectional data flow, and props typing',
                notesTitle: 'React_Foundations_Summary.pdf',
              },
              {
                id: 'l11',
                title: 'Lesson 3.2: Advanced React Hooks (useState, useEffect, useMemo, useRef)',
                duration: '62:10 mins',
                isFreePreview: false,
                topic: 'Rules of hooks, memoization patterns, ref callbacks, and custom re-usable hooks',
                notesTitle: 'Advanced_React_Hooks.pdf',
              },
              {
                id: 'l12',
                title: 'Lesson 3.3: Next.js Server & Client Components Deep Dive',
                duration: '59:30 mins',
                isFreePreview: false,
                topic: 'RSC mental model, zero-bundle streaming, layouts, metadata, and routing handlers',
                notesTitle: 'NextJS_AppRouter_Architecture.pdf',
              },
              {
                id: 'l13',
                title: 'Lesson 3.4: Server Actions, API Routes & Database Integration',
                duration: '55:00 mins',
                isFreePreview: false,
                topic: 'End-to-end type safety, optimistic UI updates, form validations with Zod, and cookies',
                notesTitle: 'Server_Actions_Guide.pdf',
              },
              {
                id: 'l14',
                title: 'Lesson 3.5: State Management, Context & Clean Component Architecture',
                duration: '48:45 mins',
                isFreePreview: false,
                topic: 'Zustand vs React Context, atomic design principles, and scalable directory structure',
                notesTitle: 'Scalable_Frontend_Patterns.pdf',
              },
            ],
          },
          {
            id: 'm4',
            title: 'Module 4: Full Stack Capstone Projects & Production Deployment',
            duration: '4h 50m',
            lecturesCount: 4,
            lessons: [
              {
                id: 'l15',
                title: 'Lesson 4.1: Capstone Project: SaaS Web Application Build',
                duration: '65:00 mins',
                isFreePreview: false,
                topic: 'Building complete authentication, payment gateway simulation, and real-time dashboard',
                notesTitle: 'Capstone_Project_Brief.pdf',
              },
              {
                id: 'l16',
                title: 'Lesson 4.2: Performance Optimization & Core Web Vitals',
                duration: '45:30 mins',
                isFreePreview: false,
                topic: 'Lighthouse 100/100, image optimization, dynamic imports, and font zero-layout-shift',
                notesTitle: 'Core_Web_Vitals_Playbook.pdf',
              },
              {
                id: 'l17',
                title: 'Lesson 4.3: Git, GitHub CI/CD & Cloud Deployment',
                duration: '40:15 mins',
                isFreePreview: false,
                topic: 'Branching strategies, automated test pipelines, Vercel/Cloud Run deployments, and DNS',
                notesTitle: 'DevOps_Deployment_Guide.pdf',
              },
              {
                id: 'l18',
                title: 'Lesson 4.4: Technical Resume, Portfolio & Interview Preparation',
                duration: '52:00 mins',
                isFreePreview: false,
                topic: 'Top 50 frontend interview questions, live coding rounds, system design, and salary negotiation',
                notesTitle: 'Tech_Interview_Mastery.pdf',
              },
            ],
          },
        ],
        whatYouWillLearn: [
          'Build responsive, production-ready web apps from scratch using Next.js 15 and Tailwind CSS.',
          'Master modern JavaScript (ES6+), async/await, DOM APIs, and object-oriented architectures.',
          'Understand Server Components (RSC) vs Client Components and clean component separation.',
          'Design interactive dashboards, secure forms with Zod, and full-stack API routes.',
          'Deploy live applications to production clouds with automated CI/CD and custom domains.',
          'Gain complete technical interview readiness with real capstone projects and portfolio guidance.',
        ],
        requirements: [
          'No prior programming experience required; we start right from scratch.',
          'A computer or laptop with an internet connection and modern web browser.',
          'Dedication of 5-7 hours per week for live classes, hands-on coding, and assignments.',
        ],
        targetAudience: [
          'College students and graduates aiming for lucrative software engineering roles.',
          'Self-taught learners and working professionals transitioning into modern frontend/fullstack tech.',
          'Founders and creators wanting to build their own software products with high velocity.',
        ],
        facultyBio: {
          name: 'Er. R. K. Gupta & Lead Engineering Faculty',
          designation: 'Ex-Senior Staff Engineer & Tech Educator (IIT Delhi Alum)',
          experience: '12+ Years in High-Scale Web Architecture & Mentorship',
          education: 'B.Tech in Computer Science, IIT Delhi',
          studentsMentored: '25,000+ Engineers placed at top tech startups and MNCs',
          bio: 'Er. R. K. Gupta has engineered distributed web platforms serving millions of users. His teaching methodology focuses on first-principles thinking, clean architecture, and real production patterns rather than superficial syntax.',
        },
        studentReviews: [
          {
            id: 'r1',
            name: 'Aman Singhal',
            role: 'Associate Software Engineer at Fintech Startup',
            rating: 5,
            date: '2 weeks ago',
            comment:
              'The curriculum is incredibly practical! In just 8 weeks, I transitioned from basic HTML to building full Next.js apps with server actions. Got placed with a 9 LPA package. Best ₹499 investment of my life.',
            verified: true,
          },
          {
            id: 'r2',
            name: 'Sneha Patel',
            role: 'B.Tech 3rd Year Student',
            rating: 5,
            date: '1 month ago',
            comment:
              'The recorded demo lecture convinced me immediately. The doubt support on WhatsApp is super active. Whenever I was stuck in React state bugs, the mentors resolved it within minutes.',
            verified: true,
          },
          {
            id: 'r3',
            name: 'Vikram Joshi',
            role: 'Self-Taught Frontend Developer',
            rating: 4.8,
            date: '2 months ago',
            comment:
              'No fluff, no AI-generated theory. Every lecture has line-by-line live coding and practical exercises. The PDF chapter notes and formula sheets alone are worth triple the price.',
            verified: true,
          },
        ],
      };

    case 'neet':
      return {
        modules: [
          {
            id: 'm1',
            title: 'Module 1: Physics Mechanics & NCERT Line-by-Line Core',
            duration: '4h 15m',
            lecturesCount: 4,
            lessons: [
              {
                id: 'l1',
                title: 'Lesson 1.1: Kinematics 1D & 2D with Graphical Shortcuts',
                duration: '48:20 mins',
                isFreePreview: true,
                topic: 'Slope interpretation, area under curve, relative velocity, and projectile motion traps',
                notesTitle: 'Kinematics_HighYield_Notes.pdf',
              },
              {
                id: 'l2',
                title: 'Lesson 1.2: Newton’s Laws of Motion & Friction Mechanics',
                duration: '54:15 mins',
                isFreePreview: true,
                topic: 'Free body diagrams, pseudo forces, constraint relations, and block-on-block friction',
                notesTitle: 'NLM_Friction_Formula_Sheet.pdf',
              },
              {
                id: 'l3',
                title: 'Lesson 1.3: Work, Energy, Power & Circular Dynamics',
                duration: '52:10 mins',
                isFreePreview: false,
                topic: 'Work-energy theorem, conservative fields, vertical circular motion, and power graphs',
                notesTitle: 'WEP_PYQ_Solved_Drill.pdf',
              },
              {
                id: 'l4',
                title: 'Lesson 1.4: Center of Mass & Rotational Motion Mastery',
                duration: '60:00 mins',
                isFreePreview: false,
                topic: 'Moment of inertia theorems, torque equations, rolling without slipping, and angular momentum',
                notesTitle: 'Rotation_Master_CheatSheet.pdf',
              },
            ],
          },
          {
            id: 'm2',
            title: 'Module 2: Chemistry — Physical & Inorganic Formula Drills',
            duration: '4h 50m',
            lecturesCount: 4,
            lessons: [
              {
                id: 'l5',
                title: 'Lesson 2.1: Mole Concept, Stoichiometry & Redox Titrations',
                duration: '45:30 mins',
                isFreePreview: true,
                topic: 'Equivalent weight calculations, n-factor shortcuts, and oxidation number methods',
                notesTitle: 'Mole_Concept_HighYield.pdf',
              },
              {
                id: 'l6',
                title: 'Lesson 2.2: Chemical Thermodynamics & Ionic Equilibrium',
                duration: '58:40 mins',
                isFreePreview: false,
                topic: 'Enthalpy, entropy, Gibbs energy, buffer solutions, solubility product (Ksp), and pH traps',
                notesTitle: 'Thermodynamics_Ionic_Notes.pdf',
              },
              {
                id: 'l7',
                title: 'Lesson 2.3: Periodic Table Trends & Chemical Bonding (VSEPR/MOT)',
                duration: '52:15 mins',
                isFreePreview: false,
                topic: 'Hybridization tricks, magnetic properties, bond order shortcuts, and exception lists',
                notesTitle: 'Chemical_Bonding_MindMap.pdf',
              },
              {
                id: 'l8',
                title: 'Lesson 2.4: Coordination Compounds & p-Block High-Yield Reactions',
                duration: '50:00 mins',
                isFreePreview: false,
                topic: 'Crystal field theory, isomerism, color explanations, and NCERT tabular trends',
                notesTitle: 'Coordination_Inorganic_Master.pdf',
              },
            ],
          },
          {
            id: 'm3',
            title: 'Module 3: Biology — Human Physiology & Genetics (360/360 Target)',
            duration: '5h 30m',
            lecturesCount: 4,
            lessons: [
              {
                id: 'l9',
                title: 'Lesson 3.1: Principles of Inheritance & Molecular Basis of Inheritance',
                duration: '62:00 mins',
                isFreePreview: true,
                topic: 'Mendelian ratios, pedigree analysis, DNA replication, lac operon, and genetic code',
                notesTitle: 'Genetics_NCERT_Extracts.pdf',
              },
              {
                id: 'l10',
                title: 'Lesson 3.2: Human Neural & Chemical Coordination (Endocrine System)',
                duration: '55:20 mins',
                isFreePreview: false,
                topic: 'Nerve impulse conduction, synapse transmission, hormone feedback loops, and disorders',
                notesTitle: 'Endocrine_Neural_Review.pdf',
              },
              {
                id: 'l11',
                title: 'Lesson 3.3: Plant Physiology (Photosynthesis & Respiration)',
                duration: '50:40 mins',
                isFreePreview: false,
                topic: 'Light reaction, Calvin cycle, C4 pathway, Krebs cycle, and electron transport chain',
                notesTitle: 'Plant_Physiology_Cycles.pdf',
              },
              {
                id: 'l12',
                title: 'Lesson 3.4: Biotechnology Principles & Applications',
                duration: '46:10 mins',
                isFreePreview: false,
                topic: 'Restriction enzymes, PCR steps, gel electrophoresis, transgenic animals, and ethical issues',
                notesTitle: 'Biotech_Summary_Notes.pdf',
              },
            ],
          },
          {
            id: 'm4',
            title: 'Module 4: NEET Mock Test Series & 10-Year PYQ Drill',
            duration: '4h 10m',
            lecturesCount: 3,
            lessons: [
              {
                id: 'l13',
                title: 'Lesson 4.1: Full Mock Test 01 Video Discussion & Paper Analysis',
                duration: '60:00 mins',
                isFreePreview: false,
                topic: 'Negative marking control, speed enhancement, question selection sequence, and rank analysis',
                notesTitle: 'NEET_Mock_Test_01_Solution.pdf',
              },
              {
                id: 'l14',
                title: 'Lesson 4.2: Top 100 Most Repeated Trap Questions in NEET (2014-2025)',
                duration: '55:30 mins',
                isFreePreview: false,
                topic: 'Examiner psychological pitfalls, statement-assertion hacks, and multi-concept questions',
                notesTitle: 'NEET_Trap_Questions_Compendium.pdf',
              },
              {
                id: 'l15',
                title: 'Lesson 4.3: Final 30-Day Revision Strategy & Mind Maps',
                duration: '42:00 mins',
                isFreePreview: false,
                topic: 'Day-by-day revision schedule, formula memory cards, and exam-hall time management',
                notesTitle: 'Final_30Days_BattlePlan.pdf',
              },
            ],
          },
        ],
        whatYouWillLearn: [
          'Score 650+ in NEET with NCERT line-by-line coverage in Biology, Chemistry, and Physics.',
          'Solve physics numericals in under 60 seconds with proven short-cut techniques.',
          'Master periodic table exceptions, organic mechanism roadmaps, and physical chemistry formula drills.',
          'Complete 10 years of NTA NEET PYQs with in-depth video explanations.',
          'Access chapter-wise tests with real-time All India Rank and detailed percentile metrics.',
          'Direct doubt clearance via WhatsApp and dedicated portal faculty sessions.',
        ],
        requirements: [
          'Class 11, Class 12, or dropper student preparing for NEET UG examination.',
          'Basic understanding of high school Science and NCERT textbooks.',
          'Notebook and calculator-free practice habit for rigorous exam conditioning.',
        ],
        targetAudience: [
          'NEET UG 2026/2027 Medical Aspirants seeking top Government Medical Colleges (AIIMS, MAMC, etc.).',
          'Students feeling overwhelmed by expensive ₹1,50,000+ coaching institutes wanting affordable excellence.',
          'Dropper students needing targeted formula revision, speed drills, and test series analytics.',
        ],
        facultyBio: {
          name: 'Dr. Arvind Sharma & Senior Medical Faculty Team',
          designation: 'Ex-Senior Faculty (Kota & Delhi Institutes) & Senior Biologist',
          experience: '15+ Years Mentoring NEET Rankers (AIR 14, 48, 89)',
          education: 'MBBS / M.Sc. Gold Medalist',
          studentsMentored: '40,000+ Students Guided to Government Medical Seats',
          bio: 'Dr. Arvind Sharma brings 15 years of prestigious classroom teaching experience from Kota and Delhi. Known for his visual mnemonics in Biology and step-by-step simplification of Physics mechanics.',
        },
        studentReviews: [
          {
            id: 'r1',
            name: 'Pooja Choudhary',
            role: 'NEET Aspirant (Mock Score: 685/720)',
            rating: 5,
            date: '3 weeks ago',
            comment:
              'BrainBridge changed everything for me. In my previous offline coaching, physics was terrifying. Here, the graphical derivations and question shortcuts made mechanics my strongest topic!',
            verified: true,
          },
          {
            id: 'r2',
            name: 'Rohan Meena',
            role: '1st Year MBBS Student (SMS Medical College)',
            rating: 5,
            date: '2 months ago',
            comment:
              'Quality coaching at just ₹499 is a godsend for students from small towns. The test series ranking helped me calibrate my exact speed. Highly recommend the free demo lectures first!',
            verified: true,
          },
        ],
      };

    default:
      const course = getCourseById(courseId);
      const courseName = course ? course.name : 'Course';
      const courseCategory = course?.category || 'Competitive Exam';
      const courseFaculty = course?.faculty || 'Senior Faculty';
      return {
        modules: [
          {
            id: 'm1',
            title: `Module 1: Foundations & Core Principles of ${courseName}`,
            duration: '3h 30m',
            lecturesCount: 4,
            lessons: [
              {
                id: 'l1',
                title: 'Lesson 1.1: Core Concept Orientation & Foundational Framework',
                duration: '45:10 mins',
                isFreePreview: true,
                topic: `Overview of ${courseName}, key definitions, mental models, and real-world relevance`,
                notesTitle: `${courseName.replace(/\s+/g, '_')}_Foundations.pdf`,
              },
              {
                id: 'l2',
                title: 'Lesson 1.2: Deep Dive into Core Methodologies & Formulations',
                duration: '52:30 mins',
                isFreePreview: true,
                topic: 'Step-by-step structural walkthrough, standard problems, and analytical derivations',
                notesTitle: 'Core_Formulas_Handbook.pdf',
              },
              {
                id: 'l3',
                title: 'Lesson 1.3: Practical Applications & High-Yield Drills',
                duration: '48:15 mins',
                isFreePreview: false,
                topic: 'Real scenario breakdowns, common student pitfalls, and elimination methods',
                notesTitle: 'Practical_Drills_Set1.pdf',
              },
              {
                id: 'l4',
                title: 'Lesson 1.4: Chapter Review & Practice Milestone Quiz',
                duration: '35:00 mins',
                isFreePreview: false,
                topic: 'Timed self-assessment, step-by-step solutions, and key revision highlights',
                notesTitle: 'Milestone_Quiz_Solutions.pdf',
              },
            ],
          },
          {
            id: 'm2',
            title: 'Module 2: Advanced Techniques, Problem Solving & Case Studies',
            duration: '4h 45m',
            lecturesCount: 4,
            lessons: [
              {
                id: 'l5',
                title: 'Lesson 2.1: Advanced Problem Formulations & Speed Hacks',
                duration: '54:20 mins',
                isFreePreview: true,
                topic: 'Solving complex multi-step problems with accuracy and minimal time consumption',
                notesTitle: 'Advanced_Techniques_Notes.pdf',
              },
              {
                id: 'l6',
                title: 'Lesson 2.2: Comprehensive Industry & Exam Case Studies',
                duration: '50:40 mins',
                isFreePreview: false,
                topic: 'Exam trends from past 5 years and high-frequency pattern recognition',
                notesTitle: 'Case_Studies_Reference.pdf',
              },
              {
                id: 'l7',
                title: 'Lesson 2.3: Cross-Disciplinary Synthesis & Formula Memory Maps',
                duration: '46:15 mins',
                isFreePreview: false,
                topic: 'Connecting interconnected concepts and constructing quick memory anchors',
                notesTitle: 'Memory_Maps_Color.pdf',
              },
              {
                id: 'l8',
                title: 'Lesson 2.4: Live Doubt Clearing Session Breakdown',
                duration: '40:00 mins',
                isFreePreview: false,
                topic: 'Frequently asked student questions and tricky edge-case clarifications',
                notesTitle: 'Live_Session_Summary.pdf',
              },
            ],
          },
          {
            id: 'm3',
            title: 'Module 3: Full Syllabus Mock Tests & Performance Calibration',
            duration: '4h 15m',
            lecturesCount: 3,
            lessons: [
              {
                id: 'l9',
                title: 'Lesson 3.1: Full Mock Test Paper Discussion & Rank Calibration',
                duration: '58:00 mins',
                isFreePreview: false,
                topic: 'Real-time test simulation, score distribution analysis, and accuracy improvement',
                notesTitle: 'Mock_Test_Discussion.pdf',
              },
              {
                id: 'l10',
                title: 'Lesson 3.2: 100 Most Critical Previous Questions Walkthrough',
                duration: '55:10 mins',
                isFreePreview: false,
                topic: 'Thorough step-by-step walkthrough of previous year questions and variations',
                notesTitle: 'Previous_Questions_Bank.pdf',
              },
              {
                id: 'l11',
                title: 'Lesson 3.3: Error Log Analysis & Eliminating Silly Mistakes',
                duration: '42:30 mins',
                isFreePreview: false,
                topic: 'How to maintain an effective mistake diary and avoid negative score deductions',
                notesTitle: 'Mistake_Correction_Guide.pdf',
              },
            ],
          },
          {
            id: 'm4',
            title: 'Module 4: Final Revision, Formula Cheat Sheets & Next Steps',
            duration: '3h 10m',
            lecturesCount: 3,
            lessons: [
              {
                id: 'l12',
                title: 'Lesson 4.1: High-Speed Rapid Fire Revision',
                duration: '45:00 mins',
                isFreePreview: false,
                topic: 'Covering entire syllabus essentials in a single comprehensive sprint',
                notesTitle: 'Rapid_Fire_Revision.pdf',
              },
              {
                id: 'l13',
                title: 'Lesson 4.2: Complete Formula & Theorem Summary Sheet',
                duration: '38:00 mins',
                isFreePreview: false,
                topic: 'One-page quick reference sheets designed for the last 24 hours before exams',
                notesTitle: 'Complete_Formula_Sheet.pdf',
              },
              {
                id: 'l14',
                title: 'Lesson 4.3: Course Certificate, Career Guidance & Next Steps',
                duration: '30:00 mins',
                isFreePreview: false,
                topic: 'Issuing verifiable course completion credentials and next-level roadmap',
                notesTitle: 'Roadmap_And_Certificate_Info.pdf',
              },
            ],
          },
        ],
        whatYouWillLearn: [
          `Master all core concepts of ${courseName} from first principles to advanced mastery.`,
          'Solve numericals and theoretical problems with confidence using structured frameworks.',
          'Access chapter-wise formula cheat sheets and downloadable high-yield PDF summaries.',
          'Take full-length mock tests with detailed performance analytics and instant answer keys.',
          'Direct doubt resolution via dedicated student support channels.',
          'Earn a verified BrainBridge Course Certificate upon completing the modules.',
        ],
        requirements: [
          'Interest and commitment to learning the subject methodically.',
          'Smartphone, tablet, or laptop with basic internet connection.',
          'Dedication of 4-6 hours per week for structured lectures and revision.',
        ],
        targetAudience: [
          `Students and aspirants preparing for ${courseCategory} examinations or career skills.`,
          'Learners looking for high-quality structured guidance at an affordable, honest price.',
          'Anyone seeking conceptual clarity without superficial rote learning.',
        ],
        facultyBio: {
          name: courseFaculty,
          designation: 'Senior Faculty & Subject Specialist',
          experience: '10+ Years in Curriculum Design & Student Mentorship',
          education: 'Master of Science / Engineering Specialist',
          studentsMentored: '20,000+ Enrolled Learners across India',
          bio: `${courseFaculty} is renowned for breaking down complex topics into intuitive, practical frameworks. Dedicated to democratic, affordable quality education.`,
        },
        studentReviews: [
          {
            id: 'r1',
            name: 'Pooja Verma',
            role: 'Enrolled Student',
            rating: 5,
            date: '3 weeks ago',
            comment:
              'The structure of this course is so well arranged! The free demo lecture gives you an honest taste of the teaching quality. The notes are crisp and exam-focused.',
            verified: true,
          },
          {
            id: 'r2',
            name: 'Manish Kumar',
            role: 'Exam Aspirant',
            rating: 4.9,
            date: '1 month ago',
            comment:
              'At ₹499 this offers better clarity than coachings charging thousands. The doubt response is quick and teachers are genuinely supportive.',
            verified: true,
          },
        ],
      };
  }
}

export const BB_COURSES: Course[] = [];

export const BB_SITE_DEFAULTS: SiteContent = {
  heroHeading: 'BrainBridge — Learn What Moves You Forward',
  heroLede:
    'Personalized learning for a brighter future. Get access to expert-led courses, interactive lessons, and the right support to achieve your goals.',
  contactPhone: '+91-90243-03988',
  contactEmail: 'support@brainbridge.in',
  heroImage: '/images/hero_learning.jpg',
  promoVideoUrl: '',
};

function daysFromNow(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

const INITIAL_STUDENTS: Student[] = [
  {
    id: 1,
    name: 'Priya Sharma',
    email: 'priya@example.com',
    phone: '9990011111',
    password: 'demo123',
    joinDate: daysFromNow(-40),
    courses: [
      {
        courseId: 'web-dev',
        purchaseDate: daysFromNow(-40),
        expiryDate: daysFromNow(50),
        progressPercent: 68,
      },
    ],
  },
  {
    id: 2,
    name: 'Rohit Verma',
    email: 'rohit@example.com',
    phone: '9990022222',
    password: 'demo123',
    joinDate: daysFromNow(-85),
    courses: [
      {
        courseId: 'data-science',
        purchaseDate: daysFromNow(-85),
        expiryDate: daysFromNow(5),
        progressPercent: 92,
      },
    ],
  },
  {
    id: 3,
    name: 'Sneha Patel',
    email: 'sneha@example.com',
    phone: '9990033333',
    password: 'demo123',
    joinDate: daysFromNow(-100),
    courses: [
      {
        courseId: 'ui-ux',
        purchaseDate: daysFromNow(-100),
        expiryDate: daysFromNow(20),
        progressPercent: 80,
      },
    ],
  },
];

export function getStudents(): Student[] {
  if (typeof window === 'undefined') return INITIAL_STUDENTS;
  try {
    const data = localStorage.getItem('bb_students');
    if (!data) {
      localStorage.setItem('bb_students', JSON.stringify(INITIAL_STUDENTS));
      return INITIAL_STUDENTS;
    }
    return JSON.parse(data);
  } catch {
    return INITIAL_STUDENTS;
  }
}

import {
  dbSaveCourse,
  dbSaveCategory,
  dbSaveOrder,
  dbSaveStudent,
  dbSaveRazorpayConfig,
  dbDeleteCourse,
  dbDeleteCategory,
  dbDeleteStudent,
} from './supabase-service';

export function saveStudents(students: Student[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('bb_students', JSON.stringify(students));
  students.forEach((s) => dbSaveStudent(s));
}

export function findStudentByEmail(email: string): Student | undefined {
  const list = getStudents();
  return list.find((s) => s.email.toLowerCase() === email.trim().toLowerCase());
}

export function findStudentByPhone(phone: string): Student | undefined {
  const digits = String(phone).replace(/\D/g, '');
  if (!digits) return undefined;
  const list = getStudents();
  return list.find((s) => s.phone && s.phone.replace(/\D/g, '') === digits);
}

export function getSession(): SessionUser | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem('bb_session');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setSession(session: SessionUser) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('bb_session', JSON.stringify(session));
}

export function clearSession() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('bb_session');
}

export function getCourseById(id: string): Course | undefined {
  return getStoredCourses().find((c) => c.id === id);
}

export function getDaysLeft(expiryDate: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const exp = new Date(expiryDate);
  exp.setHours(0, 0, 0, 0);
  return Math.round((exp.getTime() - today.getTime()) / 86400000);
}

export function getStatusFromDaysLeft(days: number): {
  label: string;
  badgeClass: string;
  statusType: 'active' | 'warn' | 'expired';
} {
  if (days < 0) {
    return {
      label: 'Expired',
      badgeClass: 'bg-red-50 text-red-700 border border-red-200',
      statusType: 'expired',
    };
  }
  if (days <= 7) {
    return {
      label: 'Expiring soon',
      badgeClass: 'bg-amber-50 text-amber-800 border border-amber-200',
      statusType: 'warn',
    };
  }
  return {
    label: 'Active',
    badgeClass: 'bg-emerald-50 text-emerald-800 border border-emerald-200',
    statusType: 'active',
  };
}

export interface RazorpayConfig {
  enabled: boolean;
  keyId: string;
  keySecret: string;
}

export interface OrderRecord {
  id: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  courseId: string;
  courseTitle: string;
  amount: number;
  gateway: string;
  paymentId: string;
  status: 'SUCCESS' | 'FAILED' | 'PENDING';
  date: string;
}

export interface CourseCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export const DEFAULT_CATEGORIES: CourseCategory[] = [
  {
    id: 'cat-1',
    name: 'Web Development',
    slug: 'web-development',
    description: 'Frontend, Backend, MERN Stack, and Full Stack Engineering.',
  },
  {
    id: 'cat-2',
    name: 'Data Science & AI',
    slug: 'data-science-ai',
    description: 'Python, Machine Learning, Data Analytics, and AI models.',
  },
  {
    id: 'cat-3',
    name: 'Board & Competitive Exams',
    slug: 'board-competitive-exams',
    description: 'JEE Main/Advanced, NEET, and Class 10/12 Board Exams.',
  },
  {
    id: 'cat-4',
    name: 'Digital Marketing',
    slug: 'digital-marketing',
    description: 'SEO, Performance Marketing, Social Media & Analytics.',
  },
  {
    id: 'cat-5',
    name: 'Design & UI/UX',
    slug: 'design-ui-ux',
    description: 'Figma, Product Design, Visual Identity & UX Research.',
  },
];

export const DEFAULT_ORDERS: OrderRecord[] = [
  {
    id: 'pay_rzp_9a87f2b1',
    studentName: 'Priya Sharma',
    studentEmail: 'priya.s@example.com',
    studentPhone: '9876543210',
    courseId: 'web-dev',
    courseTitle: 'Full Stack Web Development (MERN)',
    amount: 499,
    gateway: 'Razorpay',
    paymentId: 'pay_live_87a3b4c5d6e7',
    status: 'SUCCESS',
    date: '2026-01-20',
  },
  {
    id: 'pay_rzp_6c54d3e2',
    studentName: 'Rahul Verma',
    studentEmail: 'rahul.verma@gmail.com',
    studentPhone: '9812345678',
    courseId: 'data-science',
    courseTitle: 'Data Science & Machine Learning Masterclass',
    amount: 499,
    gateway: 'Razorpay',
    paymentId: 'pay_live_3c2d1e0f9a8b',
    status: 'SUCCESS',
    date: '2026-01-18',
  },
  {
    id: 'pay_rzp_3f2e1d0c',
    studentName: 'Ananya Gupta',
    studentEmail: 'ananya.gupta@outlook.com',
    studentPhone: '9765432109',
    courseId: 'neet',
    courseTitle: 'NEET & Board Biology Physics Chemistry Booster',
    amount: 499,
    gateway: 'Razorpay',
    paymentId: 'pay_live_5e4d3c2b1a0f',
    status: 'SUCCESS',
    date: '2026-01-15',
  },
];

export function getRazorpayConfig(): RazorpayConfig {
  if (typeof window === 'undefined') return { enabled: true, keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'your-razorpay-key-id', keySecret: process.env.RAZORPAY_KEY_SECRET || 'your-razorpay-secret' };
  try {
    const saved = JSON.parse(localStorage.getItem('bb_razorpay_config') || 'null');
    return saved || { enabled: true, keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'your-razorpay-key-id', keySecret: process.env.RAZORPAY_KEY_SECRET || 'your-razorpay-secret' };
  } catch {
    return { enabled: true, keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'your-razorpay-key-id', keySecret: process.env.RAZORPAY_KEY_SECRET || 'your-razorpay-secret' };
  }
}

export function saveRazorpayConfig(config: RazorpayConfig) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('bb_razorpay_config', JSON.stringify(config));
  dbSaveRazorpayConfig(config);
}

export function getOrders(): OrderRecord[] {
  if (typeof window === 'undefined') return DEFAULT_ORDERS;
  try {
    const saved = JSON.parse(localStorage.getItem('bb_orders') || 'null');
    return saved || DEFAULT_ORDERS;
  } catch {
    return DEFAULT_ORDERS;
  }
}

export function saveOrders(orders: OrderRecord[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('bb_orders', JSON.stringify(orders));
  orders.forEach((o) => dbSaveOrder(o));
}

export function addOrder(order: Omit<OrderRecord, 'id' | 'date' | 'status'>): OrderRecord {
  const list = getOrders();
  const newOrd: OrderRecord = {
    ...order,
    id: 'pay_rzp_' + Math.random().toString(36).substring(2, 10),
    date: new Date().toISOString().slice(0, 10),
    status: 'SUCCESS',
  };
  list.unshift(newOrd);
  saveOrders(list);
  dbSaveOrder(newOrd);
  return newOrd;
}

export interface Testimonial {
  id?: number | string;
  name: string;
  role: string;
  initials: string;
  avatarBg: string;
  quote: string;
  rating?: number;
}

export const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: 'Priya Sharma',
    role: 'Student',
    initials: 'PS',
    avatarBg: 'bg-emerald-100 text-emerald-800',
    quote: '“BrainBridge gave me the skills and confidence I needed to switch my career. The courses are well-structured and easy to follow.”',
    rating: 5,
  },
  {
    id: 2,
    name: 'Rohit Verma',
    role: 'Working Professional',
    initials: 'RV',
    avatarBg: 'bg-blue-100 text-blue-800',
    quote: '“The flexibility and quality of content are amazing. I learned while working and it really helped me grow in my career.”',
    rating: 5,
  },
  {
    id: 3,
    name: 'Sneha Patel',
    role: 'College Student',
    initials: 'SP',
    avatarBg: 'bg-amber-100 text-amber-800',
    quote: '“The community support is fantastic! I made great connections and always found help when I needed it.”',
    rating: 5,
  },
];

export function getTestimonials(): Testimonial[] {
  if (typeof window === 'undefined') return DEFAULT_TESTIMONIALS;
  try {
    const saved = JSON.parse(localStorage.getItem('bb_testimonials') || 'null');
    return saved || DEFAULT_TESTIMONIALS;
  } catch {
    return DEFAULT_TESTIMONIALS;
  }
}

export function saveTestimonials(list: Testimonial[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('bb_testimonials', JSON.stringify(list));
}

export function getCategories(): CourseCategory[] {
  if (typeof window === 'undefined') return [];
  try {
    const saved = JSON.parse(localStorage.getItem('bb_categories') || 'null');
    return Array.isArray(saved) && saved.length > 0 ? saved : [];
  } catch {
    return [];
  }
}

export function saveCategories(categories: CourseCategory[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('bb_categories', JSON.stringify(categories));
  categories.forEach((c) => dbSaveCategory(c));
}

export function getStoredCourses(): Course[] {
  if (typeof window === 'undefined') return [];
  try {
    const saved = JSON.parse(localStorage.getItem('bb_courses') || 'null');
    if (Array.isArray(saved) && saved.length > 0) {
      return saved.map((c: Course) => ({
        ...c,
        curriculumList: Array.isArray(c.curriculumList)
          ? c.curriculumList.map((m) => ({
              id: m.id,
              title: m.title,
              lectures: m.lectures === '8 Lectures' ? undefined : m.lectures,
              duration: m.duration === '4 Hours' || m.duration === '4h 20m' ? undefined : m.duration,
              details: [],
            }))
          : [],
      }));
    }
    return [];
  } catch {
    return [];
  }
}

export function saveStoredCourses(courses: Course[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('bb_courses', JSON.stringify(courses));
  courses.forEach((c) => dbSaveCourse(c));
}

export function getSiteContent(): SiteContent {
  if (typeof window === 'undefined') return BB_SITE_DEFAULTS;
  try {
    const saved = JSON.parse(localStorage.getItem('bb_site_content') || 'null');
    return { ...BB_SITE_DEFAULTS, ...(saved || {}) };
  } catch {
    return BB_SITE_DEFAULTS;
  }
}

export function saveSiteContent(content: SiteContent) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('bb_site_content', JSON.stringify(content));
}

export function getNotifications(): NotificationItem[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem('bb_notifications') || '[]');
  } catch {
    return [];
  }
}

export function saveNotifications(list: NotificationItem[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('bb_notifications', JSON.stringify(list));
}

export function addNotification(student: { name: string; email: string; phone?: string }, source: string) {
  const list = getNotifications();
  const newItem: NotificationItem = {
    id: Date.now(),
    name: student.name,
    email: student.email,
    phone: student.phone || '',
    date: new Date().toISOString().slice(0, 10),
    time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    source: source || 'signup',
    seen: false,
  };
  list.unshift(newItem);
  saveNotifications(list.slice(0, 100));
}

export function buildNotifyMailto(n: NotificationItem): string {
  const subject = encodeURIComponent('New BrainBridge signup: ' + n.name);
  const body = encodeURIComponent(
    `New student enrolled on BrainBridge.\n\nName: ${n.name}\nEmail: ${n.email}${
      n.phone ? '\nPhone: ' + n.phone : ''
    }\nDate & Time: ${n.date} ${n.time}\nSource: ${n.source}`
  );
  return `mailto:${BB_OWNER.notifyEmail}?subject=${subject}&body=${body}`;
}

export function buildNotifyWhatsapp(n: NotificationItem): string {
  const text = encodeURIComponent(
    `🎓 New BrainBridge Signup:\nName: ${n.name}\nEmail: ${n.email}${
      n.phone ? '\nPhone: ' + n.phone : ''
    }\nTime: ${n.date} ${n.time}`
  );
  return `https://wa.me/${BB_OWNER.intlPhone}?text=${text}`;
}

export function convertToEmbedUrl(url: string): string {
  if (!url) return '';
  try {
    const yt = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{6,})/);
    if (yt) return `https://www.youtube.com/embed/${yt[1]}`;
    const vm = url.match(/vimeo\.com\/(\d+)/);
    if (vm) return `https://player.vimeo.com/video/${vm[1]}`;
  } catch {
    return '';
  }
  return '';
}

