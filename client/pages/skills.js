import { motion } from 'framer-motion';
import { mlSkills, webSkills, toolsAndTechnologies } from '../data';
import { PageHeader, Card } from '../components/shared';
import { fadeInUp, staggerContainer } from '../utils/animations';
import { useInView } from 'react-intersection-observer';

const SkillBar = ({ skill }) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <div ref={ref} className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="text-teal-200">{skill.name}</span>
        <span className="text-teal-400">{skill.level}%</span>
      </div>
      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-gradient-to-r from-teal-400 to-teal-600"
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

const SkillSection = ({ title, skills }) => (
  <motion.div variants={fadeInUp}>
    <Card>
      <h2 className="text-2xl font-bold text-teal-300 mb-6">{title}</h2>
      <div className="space-y-4">
        {skills.map((skill, index) => (
          <SkillBar key={index} skill={skill} />
        ))}
      </div>
    </Card>
  </motion.div>
);

export default function SkillsPage() {
  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <PageHeader 
            title="Skills & Expertise" 
            description="A comprehensive overview of my technical skills and proficiencies."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <SkillSection title="Machine Learning & AI" skills={mlSkills} />
            <SkillSection title="Web Development" skills={webSkills} />
            <SkillSection title="Tools & Technologies" skills={toolsAndTechnologies} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}