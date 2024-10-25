const BlogPage = () => {
  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold text-teal-400 mb-12">Tech Insights</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map(post => (
            <article className="bg-gray-900 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
              <img 
                src={post.coverImage} 
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex gap-2 mb-3">
                  {post.tags.map(tag => (
                    <span className="px-2 py-1 bg-teal-900 text-teal-200 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-xl font-bold text-teal-300 mb-2">{post.title}</h2>
                <p className="text-gray-300 mb-4">{post.excerpt}</p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">{post.date}</span>
                  <a href={post.slug} className="text-teal-400 hover:text-teal-300">Read More →</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};