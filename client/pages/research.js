import { motion } from 'framer-motion';
import { papers } from '../data';
import { PageHeader, Card } from '../components/shared';
import { fadeInUp, staggerContainer } from '../utils/animations';
import { FiDownload, FiBook, FiCalendar } from 'react-icons/fi';

const ResearchPaper = ({ paper }) => (
  <motion.div variants={fadeInUp}>
    <Card className="group">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-teal-300 group-hover:text-teal-400 transition-colors">
          {paper.title}
        </h3>
        <span className="flex items-center gap-2 text-gray-400 text-sm">
          <FiCalendar />
          {paper.date}
        </span>
      </div>
      <p className="text-gray-400 text-sm mb-3">{paper.authors}</p>
      <p className="text-gray-300 mb-4">{paper.abstract}</p>
      <div className="flex items-center justify-between">
        <span className="text-gray-400 text-sm">{paper.journal}</span>
        <div className="flex gap-4">
          {paper.pdf && (
            <a 
              href={paper.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-teal-400 hover:text-teal-300 transition-colors"
            >
              <FiDownload />
              <span>PDF</span>
            </a>
          )}
          {paper.citation && (
            <button 
              onClick={() => {
                navigator.clipboard.writeText(paper.citation);
                // You might want to add a toast notification here
              }}
              className="flex items-center gap-2 text-teal-400 hover:text-teal-300 transition-colors"
            >
              <FiBook />
              <span>Cite</span>
            </button>
          )}
        </div>
      </div>
    </Card>
  </motion.div>
);

const ResearchMetrics = () => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
    {[
      { label: 'Publications', value: papers.length },
      { label: 'Citations', value: '50+' },
      { label: 'Projects', value: '10+' },
      { label: 'Collaborations', value: '5+' },
    ].map((metric, index) => (
      <motion.div
        key={index}
        variants={fadeInUp}
        className="bg-gray-900 rounded-xl p-6 text-center"
      >
        <h3 className="text-3xl font-bold text-teal-400 mb-2">{metric.value}</h3>
        <p className="text-gray-300">{metric.label}</p>
      </motion.div>
    ))}
  </div>
);

export default function ResearchPage() {
  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerC