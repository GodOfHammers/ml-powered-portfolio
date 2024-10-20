import Head from 'next/head'
import Link from 'next/link'

export default function About() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Head>
        <title>About - Srikanth Polisetty</title>
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
        <h1 className="text-4xl font-bold mb-6 text-teal-400">About Me</h1>
        <div className="space-y-4">
          <p className="text-lg">
            I'm Srikanth Polisetty, a Machine Learning researcher and developer specializing in Computer Vision and AI applications. Currently pursuing a Master of Machine Learning and Computer Vision at Australian National University, I'm passionate about leveraging technology to solve real-world problems.
          </p>
          <p className="text-lg">
            With a background in Advanced Computing and hands-on experience in projects ranging from traffic analysis to image processing, I bring a unique blend of theoretical knowledge and practical skills to the table.
          </p>
          <p className="text-lg">
            My expertise includes:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Machine Learning and Deep Learning</li>
            <li>Computer Vision</li>
            <li>Natural Language Processing</li>
            <li>Full-Stack Web Development</li>
            <li>Python, JavaScript, and various programming languages</li>
          </ul>
          <p className="text-lg">
            When I'm not coding or researching, you can find me playing badminton, swimming, or exploring new technologies. I'm always excited to take on new challenges and collaborate on innovative projects.
          </p>
        </div>
      </main>
    </div>
  )
}