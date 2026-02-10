import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useFirestore } from '../hooks/useFirestore'
import './Hero.css'

const Hero = () => {
    const { data: slides, loading } = useFirestore('hero_slides', {
        where: ['active', '==', true]
    })
    const [current, setCurrent] = useState(0)

    useEffect(() => {
        if (slides.length > 0) {
            const timer = setInterval(() => {
                setCurrent((prev) => (prev + 1) % slides.length)
            }, 5000)
            return () => clearInterval(timer)
        }
    }, [slides.length])

    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % slides.length)
    }

    const prevSlide = () => {
        setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
    }

    if (loading) {
        return <div className="hero-skeleton"></div>
    }

    if (slides.length === 0) {
        return (
            <div className="hero-fallback">
                <h1>Explore Africa with Akothee Safaris</h1>
                <p>Your dream destination awaits</p>
            </div>
        )
    }

    const slide = slides[current]

    return (
        <section className="hero">
            <AnimatePresence mode="wait">
                <motion.div
                    key={slide.id}
                    className="hero-slide"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url(${slide.image})` }}
                >
                    <div className="hero-content">
                        <motion.h1
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            {slide.title}
                        </motion.h1>
                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            {slide.subtitle}
                        </motion.p>
                        <motion.button
                            className="btn btn-primary"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            onClick={() => slide.ctaLink && (window.location.href = slide.ctaLink)}
                        >
                            {slide.ctaText || 'Explore Now'}
                        </motion.button>
                    </div>
                </motion.div>
            </AnimatePresence>

            {slides.length > 1 && (
                <>
                    <button className="hero-nav prev" onClick={prevSlide}>
                        <ChevronLeft size={32} />
                    </button>
                    <button className="hero-nav next" onClick={nextSlide}>
                        <ChevronRight size={32} />
                    </button>
                    <div className="hero-dots">
                        {slides.map((_, idx) => (
                            <span
                                key={idx}
                                className={`dot ${idx === current ? 'active' : ''}`}
                                onClick={() => setCurrent(idx)}
                            ></span>
                        ))}
                    </div>
                </>
            )}
        </section>
    )
}

export default Hero
