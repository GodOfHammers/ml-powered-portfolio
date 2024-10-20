import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

const projects = [
  { 
    id: 1, 
    title: 'Traffic Analysis using Computer Vision', 
    image: '/images/traffic-analysis.png', 
    description: 'Developed Python scripts using Computer Vision techniques for traffic data prediction and analysis on construction sites.' 
  },
  { 
    id: 2, 
    title: 'Bank Passbook Image Processing', 
    image: '/images/passbook-processing.jpg', 
    description: "Improved image data extraction accuracy using machine learning techniques like morphological transformations and Otsu's thresholding." 
  },
  { 
    id: 3, 
    title: 'Stock Trading with Twitter Sentiment Analysis', 
    image: '/images/stock-trading.jpg', 
    description: 'Predicted stock market trends using machine learning and sentiment analysis of Twitter data.' 
  },
  { 
    id: 4, 
    title: 'MedCription - Android App for Medicine Purchases', 
    image: '/images/medcription.jpg', 
    description: 'Developed an Android application for ordering medicines with advanced search capabilities.' 
  },
]

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Head>
        <title>Portfolio - Srikanth Polisetty</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="container mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-teal-400">SP</Link>
          <div className="space-x-4">
            <Link href="/" className="text-teal-400 hover:text-teal-300">Home</Link>
            <Link href="/about" className="text-teal-400 hover:text-teal-300">About</Link>
            <Link href="/portfolio" className="text-teal-400 hover:text-teal-300">Portfolio</Link>
            <Link href="/contact" className="text-teal-400 hover:text-teal-300">Contact</Link>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-6 text-teal-400">My Portfolio</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-gray-800 rounded-lg overflow-hidden">
              <Image src={project.image} alt={project.title} width={400} height={300} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2 text-teal-400">{project.title}</h2>
                <p className="text-gray-300">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}