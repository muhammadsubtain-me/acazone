import ServicePage from '../components/ServicePage';

export function MechanicalPage() {
  return (
    <ServicePage
      title="Mechanical Engineering" icon="⚙️"
      description="Expert assistance with all aspects of mechanical engineering assignments, projects, and research from thermodynamics to robotics."
      topics={['Thermodynamics','Fluid Mechanics','Statics & Dynamics','Heat Transfer','Manufacturing Processes','CAD/CAM','Robotics & Automation','Materials Science','Vibration Analysis','Control Systems','FEA Analysis','HVAC Systems','Machine Design','Kinematics','Solid Mechanics','Renewable Energy']}
      benefits={[
        { icon: '🔧', title: 'Experienced ME Graduates', desc: 'Our tutors hold advanced degrees from top engineering universities worldwide.' },
        { icon: '📐', title: 'Detailed Problem Solving', desc: 'Step-by-step solutions with clear derivations, diagrams, and explanations.' },
        { icon: '💻', title: 'Software Proficiency', desc: 'Help with ANSYS, SolidWorks, MATLAB, AutoCAD and all major ME tools.' },
        { icon: '⏱️', title: 'Deadline-Oriented', desc: 'We ensure on-time delivery for even the most complex ME projects.' },
        { icon: '🔁', title: 'Iterative Refinement', desc: 'Unlimited revisions until you are fully satisfied with every detail.' },
        { icon: '🎓', title: 'Academic Standards', desc: 'All work follows proper academic formatting, citations, and requirements.' },
      ]}
    />
  );
}

export function ElectricalPage() {
  return (
    <ServicePage
      title="Electrical Engineering" icon="⚡"
      description="Comprehensive support for electrical engineering coursework, circuit analysis, power systems, and electronics projects."
      topics={['Circuit Analysis','Digital Electronics','Power Systems','Signal Processing','Electromagnetics','Control Theory','Embedded Systems','PCB Design','VLSI Design','Microcontrollers','Communication Systems','Power Electronics','Electric Machines','Renewable Energy','FPGA Programming','Analog Circuits']}
      benefits={[
        { icon: '⚡', title: 'EE Specialists', desc: 'Expert tutors specializing in power, electronics, communications, and control.' },
        { icon: '🔬', title: 'Simulation Support', desc: 'Help with MATLAB/Simulink, LTSpice, Multisim, and Cadence tools.' },
        { icon: '📊', title: 'Clear Explanations', desc: 'Complex concepts broken down into understandable, structured solutions.' },
        { icon: '🛠️', title: 'Lab Report Writing', desc: 'Professional lab reports with accurate data analysis and conclusions.' },
        { icon: '🎯', title: 'Exam Preparation', desc: 'Targeted practice problems and concept reviews for upcoming exams.' },
        { icon: '💬', title: 'Responsive Support', desc: '24/7 availability to answer questions and clarify doubts promptly.' },
      ]}
    />
  );
}

export function ChemicalPage() {
  return (
    <ServicePage
      title="Chemical Engineering" icon="🧪"
      description="Expert help with chemical engineering assignments covering reaction kinetics, process design, thermodynamics, and more."
      topics={['Chemical Thermodynamics','Reaction Kinetics','Mass Transfer','Heat Transfer','Process Design','Fluid Flow','Separation Processes','Process Control','Polymer Science','Catalysis','Plant Design','Safety & Hazard Analysis','Biochemical Engineering','Environmental Eng.','Electrochemistry','Nanotechnology']}
      benefits={[
        { icon: '🧬', title: 'Chemistry Expertise', desc: 'Deep knowledge in organic, inorganic, physical, and biochemical domains.' },
        { icon: '📈', title: 'Process Simulation', desc: 'Proficient in Aspen Plus, HYSYS, CHEMCAD, and other process simulators.' },
        { icon: '🔍', title: 'Accurate Calculations', desc: 'Meticulous numerical work with proper unit analysis and methodology.' },
        { icon: '📝', title: 'Research Reports', desc: 'Well-structured technical reports meeting departmental requirements.' },
        { icon: '🌿', title: 'Sustainability Focus', desc: 'Up-to-date expertise in green chemistry and sustainable process design.' },
        { icon: '⭐', title: 'Top-Quality Output', desc: 'Work crafted to impress professors and achieve top grades.' },
      ]}
    />
  );
}

export function ComputerSciencePage() {
  return (
    <ServicePage
      title="Computer Science" icon="💻"
      description="From algorithms to AI, web development to databases — complete computer science assignment help from expert developers."
      topics={['Data Structures','Algorithms','Operating Systems','Database Systems','Web Development','Machine Learning','Artificial Intelligence','Computer Networks','Software Engineering','Cybersecurity','Cloud Computing','Mobile Development','Computer Graphics','Compiler Design','Distributed Systems','DevOps']}
      benefits={[
        { icon: '👨‍💻', title: 'Professional Developers', desc: 'Industry-experienced engineers who know real-world best practices.' },
        { icon: '🌐', title: 'All Languages Covered', desc: 'Python, Java, C++, JavaScript, Go, Rust, and every major stack.' },
        { icon: '🚀', title: 'Clean, Commented Code', desc: 'Well-structured, readable code with thorough inline documentation.' },
        { icon: '🤖', title: 'AI/ML Expertise', desc: 'Advanced support for deep learning, NLP, computer vision projects.' },
        { icon: '🔐', title: 'Security Awareness', desc: 'Solutions follow security best practices and coding standards.' },
        { icon: '✅', title: 'Tested & Verified', desc: 'All code is tested before delivery to ensure correctness.' },
      ]}
    />
  );
}
