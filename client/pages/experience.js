import { motion } from 'framer-motion';
import { experiences } from '../data';
import { PageHeader, Tag } from '../components/shared';
import { fadeInUp, staggerContainer } from '../utils/animations';
import { FiBriefcase, FiCalendar, FiMapPin } from 'react-icons/fi';

const ExperienceCard = ({ experience }) => (
  <motion.div 
    variants={fadeInUp}
    className="relative"
  >
    <div className="absolute -left-3 md:-left-4 top-5 w-6 h-6 bg-teal-400 rounded-full border-4 border-black" />
    <div className="ml-6 md:ml-8">
      <div className="bg-gray-900 rounded-xl p-6">
        <div className="flex items-center gap-2 text-teal-400 text-sm mb-2">
          <FiCalendar />
          <span>{experience.date}</span>
        </div>
        <h3 className="text-xl font-bold text-teal-300 mb-1">{experience.role}</h3>
        <div className="flex items-center gap-2 text-teal-200 mb-3">
          <FiBriefcase />
          <span>{experience.company}</span>
          <span>•</span>
          <FiMapPin />
          <span>{experience.location}</span>
        </div>
        <p className="text-gray-300 mb-4">{experience.description}</p>
        <div className="flex flex-wrap gap-2">
          {experience.technologies.map((tech, index) => (
            <Tag key={index}>{tech}</Tag>
          ))}
        </div>
      </div>
    </div>
  </motion.div>
);

export default function ExperiencePage() {
  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <PageHeader 
            title="Experience" 
            description="My professional journey in machine learning and software development."
          />
          
          <div className="relative pl-3 md:pl-4">
            <div className="absolute left-0 top-0 h-full w-0.5 bg-teal-400"></div>
            <div className="space-y-12">
              {experiences.map((experience) => (
                <ExperienceCard key={experience.id} experience={experience} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}