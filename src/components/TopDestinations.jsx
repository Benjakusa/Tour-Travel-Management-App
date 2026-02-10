import React, { useState, useEffect } from 'react'
import { useFirestore } from '../hooks/useFirestore'
import DestinationCard from './DestinationCard'
import ServiceDetailModal from './ServiceDetailModal'
import './TopDestinations.css'

const TopDestinations = () => {
    const { data: allPackages, loading } = useFirestore('packages', {
        where: ['status', '==', 'published']
    })
    const [startIndex, setStartIndex] = useState(0)
    const [selectedItem, setSelectedItem] = useState(null)

    useEffect(() => {
        if (allPackages.length > 9) {
            const timer = setInterval(() => {
                setStartIndex((prev) => (prev + 9) % allPackages.length)
            }, 7000)
            return () => clearInterval(timer)
        }
    }, [allPackages.length])

    if (loading) return <div className="dest-loading">Loading Destinations...</div>

    const visiblePackages = allPackages.length > 9
        ? [...allPackages, ...allPackages].slice(startIndex, startIndex + 9)
        : allPackages

    return (
        <section className="top-destinations section container">
            <div className="section-header">
                <h2>Top Destinations</h2>
                <p>Handpicked specialized packages for your next trip</p>
            </div>

            <div className="mobile-slider hide-scrollbar">
                {visiblePackages.map((item, idx) => (
                    <DestinationCard
                        key={`${item.id}-${idx}`}
                        item={{ ...item, displayPrice: `KES ${Number(item.price).toLocaleString()}` }}
                        onViewDetails={setSelectedItem}
                    />
                ))}
            </div>

            <ServiceDetailModal
                item={selectedItem}
                isOpen={!!selectedItem}
                onClose={() => setSelectedItem(null)}
            />

            {allPackages.length === 0 && (
                <div className="no-results">
                    <p>No travel packages available at the moment. Please check back later.</p>
                </div>
            )}
        </section>
    )
}

export default TopDestinations
