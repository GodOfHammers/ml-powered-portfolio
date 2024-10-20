import Head from 'next/head'
import Link from 'next/link'

export default function Contact() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Head>
        <title>Contact - Srikanth Polisetty</title>
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
        <h1 className="text-4xl font-bold mb-6 text-teal-400">Contact Me</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="text-lg mb-4">I'm always open to new opportunities and collaborations. Feel free to reach out!</p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="mr-2">📧</span>
                <a href="mailto:polis.srikanth@gmail.com" className="text-teal-400 hover:text-teal-300">polis.srikanth@gmail.com</a>
              </li>
              <li className="flex items-center">
                <span className="mr-2">📱</span>
                <a href="tel:+61478811351" className="text-teal-400 hover:text-teal-300">+61 478 811 351</a>
              </li>
              <li className="flex items-center">
                <span className="mr-2">📍</span>
                <span>Acton, ACT 2601, Australia</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">💼</span>
                <a href="https://www.linkedin.com/in/srikanthp12/" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:text-teal-300">LinkedIn Profile</a>
              </li>
            </ul>
          </div>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
              <input type="text" id="name" name="name" className="w-full px-3 py-2 bg-gray-800 rounded-md" required />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
              <input type="email" id="email" name="email" className="w-full px-3 py-2 bg-gray-800 rounded-md" required />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
              <textarea id="message" name="message" rows="4" className="w-full px-3 py-2 bg-gray-800 rounded-md" required></textarea>
            </div>
            <button type="submit" className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 transition duration-300">Send Message</button>
          </form>
        </div>
      </main>
    </div>
  )
}