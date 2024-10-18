import { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import BackgroundSVG from '../components/BackgroundSVG'
import ParticleEffect from '../components/ParticleEffect'

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
  return (
    <div className="min-h-screen relative overflow-hidden font-sans bg-black text-white">
      <BackgroundSVG />
      <ParticleEffect />
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "url('/images/bg.jpg')", // Replace with your Midjourney generated image
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>
      <div className="relative z-10">
        <Head>
          <title>Srikanth Polisetty - Tech Designer</title>
          <link rel="icon" href="/favicon.ico" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Press+Start+2P&display=swap" rel="stylesheet" />
        </Head>

        <header className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <motion.div 
              className="text-xl font-bold text-neon-blue font-pixel"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              SP
            </motion.div>
            <nav className="hidden md:flex space-x-6">
              {['Home', 'About', 'Portfolio', 'Contact'].map((item) => (
                <Link key={item} href={`/${item.toLowerCase()}`} className="text-neon-pink hover:text-neon-green transition-colors duration-300">
                  {item}
                </Link>
              ))}
            </nav>
            <div className="flex items-center">
              <span className="mr-2">📧</span>
              <a href="mailto:polis.srikanth@gmail.com" className="text-neon-yellow hover:text-neon-green transition-colors duration-300">polis.srikanth@gmail.com</a>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-16">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-2xl mb-4 text-neon-green font-pixel">Hey, I'm Srikanth Polisetty</h2>
              <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight text-neon-blue neon-text">
                <TextScramble text="TECH DESIGNER" />
              </h1>
              <p className="text-xl mb-8 text-neon-pink">
                I enjoy designing tech websites and digital products
              </p>
              <div className="flex space-x-4">
                <motion.button 
                  className="bg-neon-purple text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-neon-blue transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get in touch
                </motion.button>
                <motion.button 
                  className="bg-neon-green text-black px-8 py-3 rounded-full text-lg font-semibold hover:bg-neon-yellow transition-colors duration-300 flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="mr-2">📱</span>
                  Chat on WhatsApp
                </motion.button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="animate-float"
              >
                <Image 
                  src="/images/profile.jpg" 
                  alt="Srikanth Polisetty" 
                  width={300} 
                  height={300} 
                  className="rounded-full border-4 border-neon-blue"
                />
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}