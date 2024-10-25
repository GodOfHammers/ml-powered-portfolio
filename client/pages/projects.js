import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { projects } from '../data';
import { PageHeader, Card, Tag } from '../components/shared';
import { fadeInUp, staggerContainer } from '../utils/animations';
import Image from 'next/image';

const ProjectCard = ({ project }) => (
  <motion.div variants={fadeInUp}>
    <Card className="group">
      <div className="relative overflow-hidden rounded-lg mb-4 h-48">
        <Image
          src={project.image || '/images/placeholder-project.jpg'}
          alt={project.title}
          layout="fill"
          objectFit="cover"
          className="group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <h3 className="text-2xl font-bold text-teal-300 mb-3">{project.title}</h3>
      <p className="text-gray-300 mb-4">{project.description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {project.technologies.map((tech, index) => (
          <Tag key={index}>{tech}</Tag>
        ))}
      </div>
      <div className="flex gap-4">
        {project.github && (
          <a 
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-teal-400 hover:text-teal-300 transition-colors"
          >
            <FiGithub />
            <span>Source</span>
          </a>
        )}
        {project.demo && (
          <a 
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-teal-400 hover:text-teal-300 transition-colors"
          >
            <FiExternalLink />
            <span>Live Demo</span>
          </a>
        )}
      </div>
    </Card>
  </motion.div>
);

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <PageHeader 
            title="Projects" 
            description="A collection of my work in machine learning, computer vision, and web development."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}