export const domains = [
  { id: 'mechanical', name: 'Mechanical Engineering', icon: '⚙️' },
  { id: 'electrical', name: 'Electrical Engineering', icon: '⚡' },
  { id: 'chemical', name: 'Chemical Engineering', icon: '🧪' },
  { id: 'computer-science', name: 'Computer Science', icon: '💻' }
];

export const services = [
  { id: 'homeworks-assignments', name: 'HomeWorks & Assignments', icon: '📋', desc: 'High-quality solutions for daily assignments, homework tasks, and problem sheets.' },
  { id: 'exam-preparation', name: 'Exam Preparation', icon: '📚', desc: 'Tailored revision plans, mock exams, key formulas summaries, and worksheets.' },
  { id: 'subject-tutoring', name: 'Subject Tutoring Service', icon: '👨‍🏫', desc: 'One-on-one conceptual tutoring and exam preparation worksheets across core subjects.' },
  { id: 'technical-writing', name: 'Technical Report Writing', icon: '✍️', desc: 'Rigorous writing support for technical reports, lab records, proposals, and summaries.' },
  { id: 'proofreading-editing', name: 'Proofreading & Editing', icon: '🔍', desc: 'Meticulous proofreading and editing to refine grammar, styling, and academic structure.' },
  { id: 'semester-projects', name: 'Semester Projects Services', icon: '📂', desc: 'End-to-end support for semester-long academic projects and presentations.' },
  { id: 'final-year-projects', name: 'Final Year Projects Services', icon: '🎓', desc: 'Comprehensive final year project support including coding, thesis writing, and report creation.' },
  { id: 'lab-tasks-projects', name: 'Lab Tasks & Projects', icon: '🛠️', desc: 'Practical lab report writing, hardware tasks, software simulations, and project designs.' }
];

// Content map: [domainId][serviceId]
export const contentData = {
  mechanical: {
    'semester-projects': {
      title: 'Mechanical Semester Projects',
      desc: 'End-to-end support for semester-long mechanical design, CAD modeling, and thermal/structural simulations.',
      topics: ['SolidWorks & AutoCAD 3D Models', 'ANSYS Structural & Thermal Simulations', 'HVAC Design Projects', 'Control Systems Implementations'],
      benefits: [
        { icon: '💻', title: 'CAD/CFD Software Experts', desc: 'We deliver functional CAD source files, meshes, and simulation outputs.' },
        { icon: '🛠️', title: 'Rigorous Lab Reports', desc: 'Accurate data tables, error analysis, and engineering conclusions.' }
      ]
    },
    'final-year-projects': {
      title: 'Mechanical Final Year Projects (FYP)',
      desc: 'Comprehensive engineering guidance for major design projects, thesis documentation, and prototype modeling.',
      topics: ['FEA Structural Analysis Research', 'Renewable Energy Systems Design', 'Robotics & Automation Systems', 'Advanced Materials Characterization'],
      benefits: [
        { icon: '📝', title: 'Research-Grade Writing', desc: 'In-depth literature reviews, methodologies, and thesis formatting.' },
        { icon: '📊', title: 'Data Analysis & Plotting', desc: 'Help plotting finite element analysis (FEA) and computational fluid dynamics (CFD) results.' }
      ]
    },
    'technical-writing': {
      title: 'Mechanical Technical Report Writing',
      desc: 'Professional drafting and formatting of lab books, feasibility studies, project proposals, and technical documentation.',
      topics: ['Lab Experiment Reporting', 'Project Feasibility Studies', 'Engineering Design Proposals', 'Technical Manual Drafting'],
      benefits: [
        { icon: '📝', title: 'Accurate Formats', desc: 'Clear formatting using standard engineering styles.' },
        { icon: '📊', title: 'Data Visualizations', desc: 'Clean presentation of charts, CAD diagrams, and calculations.' }
      ]
    },
    'subject-tutoring': {
      title: 'Mechanical Subject Tutoring',
      desc: 'Personalized conceptual tutoring, formula reviews, and solved worksheets for core mechanical engineering courses.',
      topics: ['Thermodynamics Tutoring', 'Fluid Mechanics Concepts', 'Statics & Dynamics Reviews', 'Heat Transfer Concept Reviews'],
      benefits: [
        { icon: '👨‍🏫', title: 'One-on-One Guidance', desc: 'Concepts explained in simple, easy-to-understand terms.' },
        { icon: '💡', title: 'Conceptual Mastery', desc: 'Focus on core physics and formula derivations.' }
      ]
    },
    'homeworks-assignments': {
      title: 'Mechanical Homeworks & Assignments',
      desc: 'Accurate and detailed solutions for mechanical engineering assignments. We provide clear derivations, step-by-step math, and conceptual explanations.',
      topics: ['Thermodynamics Calculations', 'Fluid Mechanics Problems', 'Statics & Dynamics Derivations', 'Heat Transfer Equations', 'Solid Mechanics Problems', 'Kinematics Worksheets'],
      benefits: [
        { icon: '📐', title: 'Step-by-Step Derivations', desc: 'Every solution is written out clearly with all intermediate algebraic steps.' },
        { icon: '🔧', title: 'Experienced ME Grads', desc: 'Handled by mechanical engineers holding advanced Masters/PhD degrees.' }
      ]
    },
    'proofreading-editing': {
      title: 'Mechanical Proofreading & Editing',
      desc: 'Polishing mechanical engineering essays, research papers, and reports to ensure professional academic tone, flow, and formatting.',
      topics: ['Technical Grammar Polishing', 'Citation Styling (IEEE)', 'Equation Formatting Reviews', 'Consistency Checks'],
      benefits: [
        { icon: '🔍', title: 'Error-Free Reports', desc: 'Eliminate typos, syntax issues, and formatting irregularities.' },
        { icon: '🎓', title: 'Academic Standards', desc: 'Formatting to fit strict university guidelines.' }
      ]
    },
    'lab-tasks-projects': {
      title: 'Mechanical Lab Tasks & Projects',
      desc: 'Practical mechanical engineering lab report writing, software simulation runs, and hardware project designs.',
      topics: ['Lab Experiment Data Analysis', 'ANSYS Simulation Output Reports', 'SolidWorks CAD Parts & Assemblies', 'Control Systems Lab Exercises'],
      benefits: [
        { icon: '💻', title: 'Software Mastery', desc: 'Simulations and designs set up correctly using industry-standard CAD/CAE tools.' },
        { icon: '📝', title: 'Detailed Lab Records', desc: 'Explanations of methodology, data tabulation, graphs, and conclusions.' }
      ]
    },
    'exam-preparation': {
      title: 'Mechanical Exam Preparation',
      desc: 'Ace your upcoming engineering examinations with targeted review packages, cheat sheets, and solved practice exams.',
      topics: ['Thermodynamics Exam Review', 'Fluid Dynamics Prep Problems', 'Mechanical Vibration Mock Exams', 'Heat Exchanger Design Worksheets'],
      benefits: [
        { icon: '🎯', title: 'Concept Summaries', desc: 'Condensed summaries of core equations, boundary conditions, and laws.' },
        { icon: '⏱️', title: 'Time-Management Prep', desc: 'Practice mock exams structured under standard university test durations.' }
      ]
    }
  },
  electrical: {
    'semester-projects': {
      title: 'Electrical Semester Projects',
      desc: 'Semester-long project guidance, including hardware design, component selection, and presentation planning.',
      topics: ['Embedded System Designs', 'Analog Circuit Board Projects', 'Power Grid Simulation Systems', 'Signal Processing Projects'],
      benefits: [
        { icon: '🔋', title: 'Component Sizing', desc: 'Choosing optimal microcontrollers, sensors, and power stages.' },
        { icon: '📊', title: 'Project Tracking', desc: 'Milestone reports and progress documentation for grading panels.' }
      ]
    },
    'final-year-projects': {
      title: 'Electrical Final Year Projects (FYP)',
      desc: 'Academic research support for senior design papers, engineering theses, prototypes, and research proposals in EE.',
      topics: ['Smart Grid Power Distribution System', 'VLSI Design & Semiconductor Thesis', 'Wireless Communication Systems Research', 'Renewable Energy Grid Integration'],
      benefits: [
        { icon: '🔬', title: 'Academic Research Standards', desc: 'Assistance formatting literature reviews and methodology chapters.' },
        { icon: '📂', title: 'Data Validation', desc: 'We help tabulate simulation data and run comparative performance analyses.' }
      ]
    },
    'technical-writing': {
      title: 'Electrical Technical Report Writing',
      desc: 'Circuit operation reports, senior design project specifications, hardware validation studies, and lab experiments.',
      topics: ['Lab Journals & Reports', 'System Design Specifications', 'Validation Test Reports', 'Hardware Schematics Explanations'],
      benefits: [
        { icon: '📝', title: 'Detailed Analysis', desc: 'Step-by-step description of circuit functionality and outcomes.' },
        { icon: '⚡', title: 'Schematic Formatting', desc: 'High-quality block diagrams and circuit diagrams embedded.' }
      ]
    },
    'subject-tutoring': {
      title: 'Electrical Subject Tutoring',
      desc: 'One-on-one conceptual clarification, formula sheets, and review sheets for electrical engineering coursework.',
      topics: ['Circuit Analysis Tutoring', 'Signals & Transforms Concepts', 'Digital Logic Fundamentals', 'Electromagnetic Fields Review'],
      benefits: [
        { icon: '👨‍🏫', title: 'Expert Explanations', desc: 'Difficult concepts broken down into intuitive analogies.' },
        { icon: '💡', title: 'Interactive Worksheets', desc: 'Tailored practice problems solved together.' }
      ]
    },
    'homeworks-assignments': {
      title: 'Electrical Homeworks & Assignments',
      desc: 'Reliable help solving circuit analysis, signals & systems, and analog electronics homework tasks with absolute precision.',
      topics: ['Circuit Analysis (AC/DC)', 'KCL/KVL & Mesh Analysis Problems', 'Signal & Systems Fourier Transforms', 'Electromagnetics & Field Equations', 'Analog Circuit Design Math'],
      benefits: [
        { icon: '⚡', title: 'EE Core Experts', desc: 'Assignments solved by qualified tutors specialized in electrical and electronics.' },
        { icon: '📈', title: 'Detailed Waveform Graphs', desc: 'Includes clear signal plots, phasor diagrams, and schematic drawings.' }
      ]
    },
    'proofreading-editing': {
      title: 'Electrical Proofreading & Editing',
      desc: 'Formatting validation reports, lab notes, and senior design documentations for maximum professional clarity.',
      topics: ['IEEE Standard Checking', 'Grammar & Academic Flow', 'Diagram Caption Verification', 'Equation Continuity Checks'],
      benefits: [
        { icon: '🔍', title: 'Polished Writing', desc: 'Presenting hardware designs with perfect technical grammar.' },
        { icon: '✍️', title: 'Clear Structuring', desc: 'Reorganizing text for optimal readability and impact.' }
      ]
    },
    'lab-tasks-projects': {
      title: 'Electrical Lab Tasks & Projects',
      desc: 'Get your hardware projects, circuit simulations, microcontroller coding, and lab reports done by experts.',
      topics: ['MATLAB/Simulink Simulations', 'LTSpice & Multisim Circuits', 'Embedded Systems & Arduino Coding', 'PCB Layout & Altium Design Projects', 'FPGA Programming (VHDL/Verilog)'],
      benefits: [
        { icon: '💻', title: 'Simulation File Delivery', desc: 'Direct delivery of source simulator files (.asc, .ms, etc.).' },
        { icon: '📝', title: 'Professional Lab Reports', desc: 'Well-formatted reports with scope plots, tables, and analysis.' }
      ]
    },
    'exam-preparation': {
      title: 'Electrical Exam Preparation',
      desc: 'Structured study guides, step-by-step formula reviews, and mock papers for midterms and finals.',
      topics: ['Electronics Exam Prep', 'Power Systems Review Questions', 'Signals & Transforms Study Sheets', 'Digital Logic Design Mock Tests'],
      benefits: [
        { icon: '📝', title: 'Custom Formula Cards', desc: 'Cheat sheets covering Laplace, Z-transforms, and Fourier series.' },
        { icon: '🏆', title: 'Grading Rubric Target', desc: 'Solutions structured exactly to earn maximum points from university graders.' }
      ]
    }
  },
  chemical: {
    'semester-projects': {
      title: 'Chemical Semester Projects',
      desc: 'Assistance designing process systems and executing environmental or chemical process feasibility studies.',
      topics: ['Process Flowsheet Design', 'Energy Balance Modeling', 'Reactor Sizing Semester Studies', 'Pollution Control Projects'],
      benefits: [
        { icon: '🌿', title: 'Sustainability Focus', desc: 'Reports addressing green chemical design and emissions analysis.' },
        { icon: '📐', title: 'Technical Layouts', desc: 'Process diagrams showing material and energy flows.' }
      ]
    },
    'final-year-projects': {
      title: 'Chemical Final Year Projects (FYP)',
      desc: 'Top-tier thesis and dissertation research support for chemical process engineering and material science majors.',
      topics: ['Catalysis & Reactor Design Thesis', 'Polymer Science Research Paper', 'Biochemical Engineering Proposals', 'Green Chemistry Process Design'],
      benefits: [
        { icon: '🧬', title: 'Advanced Research Support', desc: 'Assistance writing literature reviews, chemical pathways, and conclusions.' },
        { icon: '📈', title: 'Process Flow Diagrams', desc: 'We help create clear process flows (PFD) and process layout studies.' }
      ]
    },
    'technical-writing': {
      title: 'Chemical Technical Report Writing',
      desc: 'Laboratory reports, process safety audits, plant design reports, and chemical process documentation.',
      topics: ['HAZOP Audit Documentation', 'Process Flow Summaries', 'Biochemical Lab Manuals', 'Plant Feasibility Reports'],
      benefits: [
        { icon: '📝', title: 'Scientific Accuracy', desc: 'Precise chemical formula representation and balance details.' },
        { icon: '🔬', title: 'Process Outlines', desc: 'Well-structured descriptions of process dynamics.' }
      ]
    },
    'subject-tutoring': {
      title: 'Chemical Subject Tutoring',
      desc: 'One-on-one sessions addressing reactor dynamics, fluid flow, separating systems, and mass balances.',
      topics: ['Kinetics Concepts Tutoring', 'Material & Energy Balance Reviews', 'Separation Physics Reviews', 'Transport Phenomena Guides'],
      benefits: [
        { icon: '👨‍🏫', title: 'Step-by-Step Solved Proofs', desc: 'Complex calculus-based transport models explained.' },
        { icon: '💡', title: 'Concepts Made Simple', desc: 'Core chemical principles explained clearly.' }
      ]
    },
    'homeworks-assignments': {
      title: 'Chemical Homeworks & Assignments',
      desc: 'Master material balances, chemical kinetics, and thermodynamics with calculations structured for clarity.',
      topics: ['Chemical Thermodynamics Problems', 'Reaction Kinetics & Rate Laws', 'Mass & Energy Balance Sheets', 'Fluid Flow & Pipe Network Math', 'Heat Exchanger Sizing Calculations'],
      benefits: [
        { icon: '🧪', title: 'Chemical Principles Specialists', desc: 'Assistance from chemistry and chemical engineering postgraduates.' },
        { icon: '🔍', title: 'Unit Consistency Checks', desc: 'Every solution includes rigorous unit analysis and check steps.' }
      ]
    },
    'proofreading-editing': {
      title: 'Chemical Proofreading & Editing',
      desc: 'Editing chemical engineering thesis papers, process studies, and scientific summaries to meet academic journals standards.',
      topics: ['Scientific Vocabulary Checks', 'Reference Validation', 'Flow & Cohesiveness Checks', 'Unit Conversion Auditing'],
      benefits: [
        { icon: '🔍', title: 'Professional Style', desc: 'Scientific data written and presented professionally.' },
        { icon: '🧬', title: 'Clear Argumentation', desc: 'Ensure your chemical research questions are clearly defended.' }
      ]
    },
    'lab-tasks-projects': {
      title: 'Chemical Lab Tasks & Projects',
      desc: 'Get help with Aspen Plus process design, biochemical lab reports, and semester design projects.',
      topics: ['Aspen Plus & HYSYS Process Simulation', 'Plant Design Semester Projects', 'Safety & HAZOP Analysis Reports', 'Biochemical Engineering Lab Reports'],
      benefits: [
        { icon: '📈', title: 'Simulation Flowsheets', desc: 'Detailed simulation reports with stream tables, design parameters, and charts.' },
        { icon: '🌿', title: 'Technical Reporting', desc: 'Reports formatted strictly to engineering department submission rules.' }
      ]
    },
    'exam-preparation': {
      title: 'Chemical Exam Preparation',
      desc: 'Prepare for reaction engineering, separations, and process control exams with solved practice packages.',
      topics: ['Kinetics & Reactor Exam Prep', 'Separation Processes Study Guides', 'Process Control Mock Exams', 'Fluid Mechanics Practice Sets'],
      benefits: [
        { icon: '📖', title: 'Core Equation Guides', desc: 'Formula sheets covering transport phenomena, kinetics, and thermodynamics.' },
        { icon: '🏆', title: 'Solved Mock Exams', desc: 'Full step-by-step walkthroughs of past exams and standard review questions.' }
      ]
    }
  },
  'computer-science': {
    'semester-projects': {
      title: 'Computer Science Semester Projects',
      desc: 'Development support for database systems, web products, software designs, and semester portfolios.',
      topics: ['Web Application Projects', 'Software Architecture Plans', 'Relational Database Designs', 'CI/CD Pipeline Building'],
      benefits: [
        { icon: '💻', title: 'Standard Tooling', desc: 'Build using modern tools and workflows (Git, Docker, APIs).' },
        { icon: '📝', title: 'Project Portfolios', desc: 'Reports demonstrating requirements gathering, UML diagrams, and testing.' }
      ]
    },
    'final-year-projects': {
      title: 'Computer Science Final Year Projects (FYP)',
      desc: 'Research, architecture design, prototype implementation, and academic writing support for CS final year projects and AI/ML theses.',
      topics: ['Machine Learning Model Thesis', 'Distributed Systems Performance Study', 'Cloud Computing & Serverless Proposals', 'Blockchain Smart Contract Security'],
      benefits: [
        { icon: '🤖', title: 'Cutting-Edge Tech Support', desc: 'Advanced literature surveys on AI, NLP, computer vision, and systems.' },
        { icon: '📂', title: 'Architecture Documentation', desc: 'Help drafting system UML diagrams, data models, and API definitions.' }
      ]
    },
    'technical-writing': {
      title: 'Computer Science Technical Report Writing',
      desc: 'Software design documentation, database schema designs, API integration specs, and technical research project reports.',
      topics: ['Software Design Docs (SDD)', 'API Schemas & Specs', 'Database Schema Diagrams', 'Security & Pen-testing Reports'],
      benefits: [
        { icon: '📝', title: 'Developer Specs', desc: 'Extremely clear technical requirements and architecture diagrams.' },
        { icon: '🛠️', title: 'Clear Flowcharts', desc: 'Visual representation of algorithms and system execution flows.' }
      ]
    },
    'subject-tutoring': {
      title: 'Computer Science Subject Tutoring',
      desc: 'One-on-one conceptual clarification, data structures explanations, complexity proofs, and basic coding tutorials.',
      topics: ['Data Structures Help', 'Big-O Analysis Help', 'Automata & Theory Guides', 'Coding Principles Reviews'],
      benefits: [
        { icon: '👨‍🏫', title: 'Live Coding Help', desc: 'Interactive screen-share to debug, trace, and explain algorithms.' },
        { icon: '🏆', title: 'Concept Clarity', desc: 'Difficult computational models made clear and accessible.' }
      ]
    },
    'homeworks-assignments': {
      title: 'Computer Science Homeworks & Assignments',
      desc: 'Clean, working code and detailed analysis for algorithms, data structures, and database assignments.',
      topics: ['Data Structures (Trees, Graphs)', 'Algorithm Complexity (Big-O)', 'SQL Queries & Database Design', 'Computer Networks Protocols', 'Operating Systems Scripts'],
      benefits: [
        { icon: '🚀', title: 'Clean, Documented Code', desc: 'Code written following industry styles with extensive inline comments.' },
        { icon: '🌐', title: 'All Languages Supported', desc: 'Expertise in Python, Java, C++, JavaScript, Go, Rust, SQL, and Assembly.' }
      ]
    },
    'proofreading-editing': {
      title: 'Computer Science Proofreading & Editing',
      desc: 'Polishing readmes, user documentation, and AI/ML research papers for academic tone and developer clarity.',
      topics: ['Code Explanation Polishing', 'Grammar & Tech Terminology', 'Reference Styling (ACM/IEEE)', 'Project Structure Reviews'],
      benefits: [
        { icon: '🔍', title: 'Developer Clarity', desc: 'Documentation written in clear, concise developer language.' },
        { icon: '🚀', title: 'Impact Optimization', desc: 'Ensure software performance arguments are stated strongly.' }
      ]
    },
    'lab-tasks-projects': {
      title: 'Computer Science Lab Tasks & Projects',
      desc: 'Get full support for web apps, mobile applications, software engineering labs, and DevOps setups.',
      topics: ['Full-Stack Web App Projects', 'Mobile Development Labs (React Native/Flutter)', 'AI/ML Model Training & Simulation Runs', 'CI/CD Pipeline & DevOps Semester Projects'],
      benefits: [
        { icon: '✅', title: 'Fully Tested Repos', desc: 'We deliver working code packages tested and verified for correct execution.' },
        { icon: '📂', title: 'Setup Guides Included', desc: 'Comprehensive README files explaining how to install and run the code.' }
      ]
    },
    'exam-preparation': {
      title: 'Computer Science Exam Preparation',
      desc: 'Practice logic problems, trace tables, complexity proofs, and mock exams for computing courses.',
      topics: ['Data Structures Midterm Prep', 'Algorithms Exam Practice Sheets', 'Automata & Theory of Computation', 'Computer Architecture Review Sheets'],
      benefits: [
        { icon: '📝', title: 'Trace & Debug Worksheets', desc: 'Guides on tracing loops, recursion, stack states, and pointers.' },
        { icon: '🏆', title: 'Solved Theory Proofs', desc: 'Step-by-step answers showing induction proofs and state machine diagrams.' }
      ]
    }
  }
};
