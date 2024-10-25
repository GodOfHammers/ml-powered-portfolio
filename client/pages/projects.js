const ProjectsPage = () => {
  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold text-teal-400 mb-12">Project Gallery</h1>
        
        {/* Interactive Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map(project => (
            <div 
              key={project.id} 
              className="group relative bg-gray-900 rounded-xl p-6 hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-400 to-purple-500 rounded-xl blur opacity-20 group-hover:opacity-50 transition-opacity"></div>
              <div className="relative">
                <h3 className="text-2xl font-bold text-teal-300 mb-3">{project.title}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map(tech => (
                    <span className="px-3 py-1 bg-teal-900 text-teal-200 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a href={project.demo} className="text-teal-400 hover:text-teal-300">Live Demo →</a>
                  <a href={project.github} className="text-teal-400 hover:text-teal-300">Source Code →</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};