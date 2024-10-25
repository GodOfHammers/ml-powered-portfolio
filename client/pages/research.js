const ResearchPage = () => {
  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold text-teal-400 mb-12">Research & Publications</h1>
        
        <div className="space-y-12">
          {/* Research Papers */}
          <section>
            <h2 className="text-2xl font-bold text-teal-300 mb-6">Academic Publications</h2>
            <div className="space-y-6">
              {papers.map(paper => (
                <div className="bg-gray-900 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-teal-200 mb-2">{paper.title}</h3>
                  <p className="text-gray-400 mb-3">{paper.authors}</p>
                  <p className="text-gray-300 mb-4">{paper.abstract}</p>
                  <div className="flex gap-4">
                    <a href={paper.pdf} className="text-teal-400 hover:text-teal-300">Read Paper →</a>
                    <a href={paper.citation} className="text-teal-400 hover:text-teal-300">Cite →</a>
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