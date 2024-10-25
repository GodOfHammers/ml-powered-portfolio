const SkillsPage = () => {
  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold text-teal-400 mb-12">Skills & Expertise</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Interactive Skill Trees */}
          <section>
            <h2 className="text-2xl font-bold text-teal-300 mb-6">Machine Learning</h2>
            <div className="space-y-4">
              {mlSkills.map(skill => (
                <div className="relative">
                  <div className="flex justify-between mb-1">
                    <span className="text-teal-200">{skill.name}</span>
                    <span className="text-teal-400">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full">
                    <div 
                      className="h-full bg-gradient-to-r from-teal-400 to-teal-600 rounded-full"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};