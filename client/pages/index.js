import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import HumanVerification from '../components/HumanVerification'
import CookieConsent from '../components/CookieConsent'

const TextScramble = ({ text }) => {
  const [scrambledText, setScrambledText] = useState(text)
  
  useEffect(() => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let iteration = 0
    const interval = setInterval(() => {
      setScrambledText(prev => 
        prev.split('').map((char, index) => 
          index < iteration ? text[index] : chars[Math.floor(Math.random() * 26)]
        ).join('')
      )
      if (iteration >= text.length) clearInterval(interval)
      iteration += 1/3
    }, 30)
    return () => clearInterval(interval)
  }, [text])

  return <span>{scrambledText}</span>
}

export default function Home() {
  const [isVerified, setIsVerified] = useState(false);
  const [showVerification, setShowVerification] = useState(true);

  useEffect(() => {
    const verified = localStorage.getItem('humanVerified');
    if (verified === 'true') {
      setIsVerified(true);
      setShowVerification(false);
    }
  }, []);

  const handleVerified = () => {
    setIsVerified(true);
    setShowVerification(false);
    localStorage.setItem('humanVerified', 'true');
  };

  return (
    <div className="min-h-screen relative overflow-hidden font-sans bg-black text-white">
      {showVerification && <HumanVerification onVerified={handleVerified} />}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "url('/images/tech-background.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>
      <div className="relative z-10">
        <Head>
          <title>Srikanth Polisetty - Machine Learning Specialist</title>
          <link rel="icon" href="/favicon.ico" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Press+Start+2P&display=swap" rel="stylesheet" />
        </Head>

        <header className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-teal-400">SP</Link>
            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="text-teal-400 hover:text-teal-300 transition-colors duration-300">Home</Link>
              <Link href="/about" className="text-teal-400 hover:text-teal-300 transition-colors duration-300">About</Link>
              <Link href="/portfolio" className="text-teal-400 hover:text-teal-300 transition-colors duration-300">Portfolio</Link>
              <Link href="/evolve-or-die" className="bg-teal-500 text-black px-4 py-2 rounded-full hover:bg-teal-400 transition-colors duration-300">Play Game</Link>
              <Link href="/contact" className="text-teal-400 hover:text-teal-300 transition-colors duration-300">Contact</Link>
            </nav>
            <div className="flex items-center">
              <span className="mr-2">📧</span>
              <a href="mailto:polis.srikanth@gmail.com" className="text-teal-400 hover:text-teal-300 transition-colors duration-300">
                polis.srikanth@gmail.com
              </a>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-16">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-2xl mb-4 text-teal-300 font-pixel">Hey, I'm Srikanth Polisetty</h2>
              <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight text-teal-400 neon-text">
                <TextScramble text="ML SPECIALIST" />
              </h1>
              <p className="text-xl mb-8 text-teal-200">
                Machine Learning researcher and developer specializing in Computer Vision and AI applications
              </p>
              <div className="flex space-x-4">
                <Link 
                  href="/contact"
                  className="bg-teal-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-teal-600 transition duration-300"
                >
                  Get in touch
                </Link>
                <a 
                  href="https://wa.me/61478811351" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-green-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-600 transition duration-300 flex items-center"
                >
                  <span className="mr-2">📱</span>
                  Chat on WhatsApp
                </a>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-64 h-64 animate-float">
                <Image 
                  src="/images/profile.jpg" 
                  alt="Srikanth Polisetty" 
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full border-4 border-teal-400"
                />
              </div>
            </div>
          </div>
        </main>
      </div>
      <CookieConsent />
    </div>
  )
}