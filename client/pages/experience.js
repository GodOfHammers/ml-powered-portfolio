const ExperiencePage = () => {
  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold text-teal-400 mb-12">Professional Journey</h1>
        
        <div className="relative border-l-2 border-teal-400 pl-8 ml-4">
          {experiences.map((exp, index) => (
            <div className="mb-12 relative">
              <div className="absolute -left-14 w-6 h-6 bg-teal-400 rounded-full" />
              <div className="bg-gray-900 rounded-xl p-6">
                <span className="text-teal-400 text-sm mb-2 block">{exp.date}</span>
                <h3 className="text-xl font-bold text-teal-300 mb-2">{exp.role}</h3>
                <h4 className="text-lg text-teal-200 mb-3">{exp.company}</h4>
                <p className="text-gray-300 mb-4">{exp.description}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map(tech => (
                    <span className="px-3 py-1 bg-teal-900 text-teal-200 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};