import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { posts } from '../data';
import { PageHeader, Tag } from '../components/shared';
import { fadeInUp, staggerContainer } from '../utils/animations';
import Image from 'next/image';
import Link from 'next/link';
import { FiClock, FiTag } from 'react-icons/fi';

const BlogCard = ({ post }) => (
  <motion.article 
    variants={fadeInUp}
    className="bg-gray-900 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
  >
    <div className="relative h-48 overflow-hidden">
      <Image
        src={post.coverImage || '/images/blog/default.jpg'}
        alt={post.title}
        layout="fill"
        objectFit="cover"
        className="transition-transform duration-300 hover:scale-110"
      />
    </div>
    <div className="p-6">
      <div className="flex flex-wrap gap-2 mb-4">
        {post.tags.map((tag, index) => (
          <Tag key={index}>{tag}</Tag>
        ))}
      </div>
      <Link href={post.slug}>
        <a>
          <h2 className="text-xl font-bold text-teal-300 mb-2 hover:text-teal-400 transition-colors">
            {post.title}
          </h2>
        </a>
      </Link>
      <p className="text-gray-300 mb-4 line-clamp-2">
        {post.excerpt}
      </p>
      <div className="flex items-center justify-between text-sm text-gray-400">
        <div className="flex items-center gap-2">
          <FiClock />
          <span>{format(new Date(post.date), 'MMMM d, yyyy')}</span>
        </div>
        <Link href={post.slug}>
          <a className="text-teal-400 hover:text-teal-300 transition-colors">
            Read More →
          </a>
        </Link>
      </div>
    </div>
  </motion.article>
);

// Featured post component for the latest/pinned post
const FeaturedPost = ({ post }) => (
  <motion.article 
    variants={fadeInUp}
    className="bg-gray-900 rounded-xl overflow-hidden mb-12"
  >
    <div className="grid md:grid-cols-2 gap-6">
      <div className="relative h-64 md:h-full min-h-[300px]">
        <Image
          src={post.coverImage || '/images/blog/default.jpg'}
          alt={post.title}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
          ))}
        </div>
        <Link href={post.slug}>
          <a>
            <h2 className="text-2xl font-bold text-teal-300 mb-3 hover:text-teal-400 transition-colors">
              {post.title}
            </h2>
          </a>
        </Link>
        <p className="text-gray-300 mb-6">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <FiClock />
            <span>{format(new Date(post.date), 'MMMM d, yyyy')}</span>
          </div>
          <Link href={post.slug}>
            <a className="text-teal-400 hover:text-teal-300 transition-colors">
              Read Full Article →
            </a>
          </Link>
        </div>
      </div>
    </div>
  </motion.article>
);

export default function BlogPage() {
  const [featuredPost, ...otherPosts] = posts;

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <PageHeader 
            title="Blog" 
            description="Thoughts and insights about machine learning, computer vision, and technology."
          />

          {/* Featured Post */}
          <FeaturedPost post={featuredPost} />
          
          {/* Post Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}