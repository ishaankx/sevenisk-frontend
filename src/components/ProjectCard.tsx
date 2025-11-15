import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/data/projectsData'; // Adjust path if necessary

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="project-card bg-zinc-900 border border-zinc-700 rounded-lg overflow-hidden shadow-lg flex flex-col items-start text-left h-full">
      
      <div className="relative w-full h-48"> 
        <Image
          src={project.imageUrl}
          alt={project.title}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>
      
      <div className="p-6 flex flex-col items-start flex-1 w-full"> 
        
        <h3 className="text-2xl font-bold text-teal-300 mb-4 w-full">{project.title}</h3>
        
        <p className="text-zinc-300 text-base mb-6 flex-grow">{project.summary}</p>
        
        <div className="flex flex-wrap justify-start gap-2 mb-4">
          {project.techStack.slice(0, 6).map((tech, index) => (
            <span key={index} className="px-3 py-1 bg-teal-800 text-teal-100 text-sm rounded-md">
              {tech}
            </span>
          ))}
        </div>

        {/* --- DIVIDER --- */}
        <div className="w-full relative flex justify-center my-6"> 
          <hr className="w-full border-t border-zinc-700 absolute top-1/2 transform -translate-y-1/2" />
          <div className="relative z-10 p-1">
            <div className="w-2 h-2 bg-teal-500 transform rotate-45 shadow-md shadow-teal-500/50">
            </div>
          </div>
        </div>
        {/* --- END DIVIDER --- */}

        {/* MODIFIED: Added responsive gap (gap-2 sm:gap-4) */}
        <div className="flex justify-center gap-2 sm:gap-4 mt-auto w-full"> 
          {project.liveDemoLink && (
            <Link 
              href={project.liveDemoLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              // MODIFIED: Added whitespace-nowrap and responsive padding (px-3 sm:px-4)
              className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-lg hover:from-teal-600 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 whitespace-nowrap"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-external-link"><path d="M15 3h6v6"/><path d="M10 14L21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
              Live Demo
            </Link>
          )}
          <Link 
            href={project.githubLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            // MODIFIED: Added whitespace-nowrap and responsive padding (px-3 sm:px-4)
            className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-zinc-700 text-white rounded-lg hover:bg-zinc-600 transition-all duration-300 transform hover:scale-105 whitespace-nowrap"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.44-.78-3.46 0 0-1.09-.35-3.5.42-.94-.25-1.94-.38-2.94-.38-.98 0-1.98.13-2.92.38-2.41-.77-3.5-.42-3.5-.42-.51 1.02-.92 2.22-.78 3.46 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/></svg>
            Source Code
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;