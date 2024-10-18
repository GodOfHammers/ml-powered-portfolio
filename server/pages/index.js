import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Head>
        <title>Your Name - ML-Powered Portfolio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-16">
        <h1 className="text-6xl font-bold mb-4">Your Name</h1>
        <p className="text-xl mb-8">
          I am a full-stack developer specializing in ML-powered applications. Currently working on innovative projects that blend AI with web technologies.
        </p>

        <div className="mb-12">
          <Image 
            src="/placeholder-image.jpg" 
            alt="Decorative illustration" 
            width={500} 
            height={300} 
            className="rounded-lg"
          />
        </div>

        <div className="mb-8">
          <Link href="https://github.com/yourusername" className="mr-4 hover:underline">GitHub</Link>
          <Link href="https://linkedin.com/in/yourusername" className="mr-4 hover:underline">LinkedIn</Link>
          <Link href="https://twitter.com/yourusername" className="hover:underline">Twitter</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-3xl font-semibold mb-4">Visual Design</h2>
            <p>Brief description of your visual design skills and projects.</p>
          </div>
          <div>
            <h2 className="text-3xl font-semibold mb-4">Product Design</h2>
            <p>Overview of your product design experience and methodologies.</p>
          </div>
        </div>
      </main>
    </div>
  )
}