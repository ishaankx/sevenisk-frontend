// src/data/projectsData.ts

export interface Project {
  id: number;
  imageUrl: string;
  title: string;
  summary: string;
  techStack: string[];
  githubLink: string;
  liveDemoLink?: string; // Optional
}

export const projects: Project[] = [
  {
    id: 1,
    imageUrl: '/images/rimas.png', // UPDATE THIS PATH
    title: 'R.I.M.A.S (Real-Time Intelligent Monitoring Advanced System)',
    summary: 'A cross-platform Agentic AI that integrates Computer Vision, ML, and voice recognition to help users improve productivity by fine-tuning YOLOv8 for distraction detection and LLaMA-2-7b for AI-driven feedback, all within a high-performance Tauri/Rust desktop app.',
    techStack: [
      'Tauri', 
      'Rust', 
      'YOLOv8', 
      'OpenCV', 
      'Python', 
      'FastAPI', 
      'PyTorch', 
      'LLaMA-2-7b', 
      'SQLite', 
      'TTS libraries', 
      'MLOps'
    ],
    githubLink: 'https://github.com/ishaankx/RIMAS', // UPDATE THIS LINK
  },
  {
    id: 2,
    imageUrl: '/images/xatnys.png', // UPDATE THIS PATH
    title: 'XATNYS: AI-Powered Operating System',
    summary: 'A microkernel-based operating system built from scratch in Rust with full AI integration. In controlled tests, this design showed up to 28% faster application launch times and 23% improved power efficiency compared to a baseline model.',
    techStack: [
      'Rust', 
      'Python', 
      'In-Line Assembly', 
      'PyTorch', 
      'CNN', 
      'Reinforcement Learning', 
      'NLP', 
      'ONNX', 
      'Docker'
    ],
    githubLink: 'https://github.com/ishaankx/Xatnys', // UPDATE THIS LINK
  },
  {
    id: 3,
    imageUrl: '/images/hashkrypt.png', // UPDATE THIS PATH
    title: 'HashKrypt: Zero-Knowledge File Encryption Platform',
    summary: 'A secure web application for file encryption and sharing. It uses client-side AES-256 encryption and a zero-knowledge model, ensuring the server never accesses plaintext keys or files. Deployed on Vercel and Railway.',
    techStack: [
      'Typescript', 
      'Next.js', 
      'NestJS', 
      'GitHub Actions', 
      'Prisma', 
      'PostgreSQL', 
      'Railway', 
      'Vercel', 
      'Redis', 
      'Tailwind CSS', 
      'BullMQ', 
      'WebCrypto/libsodium'
    ],
    githubLink: 'https://github.com/ishaankx/HashKrypt', // UPDATE THIS LINK
    liveDemoLink: 'https://hash-krypt.vercel.app/', // UPDATE THIS LINK
  },
  {
  id: 4, // Use the next available ID
  imageUrl: '/images/recongence.png', // Create a visual for your Streamlit app!
  title: 'Recongence AI: Finance-clear. Credit Risk-Secured.',
  summary: 'A production-ready Probability of Default (PD) classification model for a financial institution to forecast loan risk and flag potential fraud. Implemented a full MLOps pipeline for data ingestion, feature engineering (LTI, Age-Binning), model serving, and real-time inference via a public web application.',
  techStack: [
    'Python', 
    'XGBoost', 
    'Scikit-learn', 
    'Pandas/NumPy', 
    'Streamlit', 
    'MLOps',
    'SHAP (XAI)', 
    'Joblib', 
    'Git/GitHub'
  ],
  githubLink: 'https://github.com/ishaankx/Recongence-AI', // UPDATE THIS LINK
  liveDemoLink: 'https://recongence.streamlit.app/', // UPDATE THIS LINK
},
  // You can add more projects here...
  // {
  //   id: 4,
  //   imageUrl: '/images/project-image-4.png',
  //   title: 'Your Next Project',
  //   summary: 'A brief summary of your next project.',
  //   techStack: ['React', 'Node.js', 'MongoDB'],
  //   githubLink: 'https://github.com/your-username/your-next-project',
  // },
];