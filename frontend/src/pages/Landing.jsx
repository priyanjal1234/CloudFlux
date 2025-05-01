import React from 'react'
import { Navbar } from '../components/Navbar'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Integrations from '../components/Integrations'
import Pricing from '../components/Pricing'

const Landing = () => {
  return (
    <div className='min-h-screen flex flex-col bg-slate-950'>
        <Navbar />
        <main>
            <Hero />
            <Features />
            <Integrations />
            <Pricing />
        </main>
    </div>
  )
}

export default Landing