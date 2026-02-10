import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useFirestore } from '../hooks/useFirestore'
import DestinationCard from '../components/DestinationCard'
import ServiceDetailModal from '../components/ServiceDetailModal'
import { Filter, Search as SearchIcon, SlidersHorizontal } from 'lucide-react'
import './Destinations.css'

const Destinations = () => {
    const location = useLocation()
    const [filters, setFilters] = useState({
        type: 'All',
        destination: '',
        maxPrice: '1000000'
    })
    const [selectedItem, setSelectedItem] = useState(null)

    React.useEffect(() => {
        const query = new URLSearchParams(location.search)
        const type = query.get('type')
        const destination = query.get('destination')
        const price = query.get('price')

        if (type || destination || price) {
            setFilters(prev => ({
                ...prev,
                type: type || prev.type,
                destination: destination || prev.destination,
                maxPrice: price || prev.maxPrice
            }))
        }
    }, [location.search])

    const collectionMapping = {
        'All': 'packages',
        'Packages': 'packages',
        'Hotels': 'hotels',
        'Flights': 'flights',
        'Visas': 'visas',
        'Transfers': 'transfers'
    }

    const { data: rawResults, loading, error } = useFirestore(collectionMapping[filters.type] || 'packages', {
        where: ['status', '==', 'published']
    })

    const filteredResults = rawResults.map(item => ({
        ...item,
        // Normalize fields for the DestinationCard
        name: item.name || item.title || item.country || (item.from ? `${item.from} to ${item.to}` : ''),
        destination: item.destination || item.location || item.country || item.to || '',
        price: item.price || item.pricePerNight || (item.priceRange ? item.priceRange.split('-')[0].replace(/[^\d]/g, '') : 0),
        displayPrice: item.priceRange || `KES ${Number(item.price || item.pricePerNight).toLocaleString()}`
    })).filter(item => {
        const matchesDest = item.destination.toLowerCase().includes(filters.destination.toLowerCase())
        const matchesPrice = !filters.maxPrice || Number(item.price) <= Number(filters.maxPrice)
        return matchesDest && matchesPrice
    })

    const handleFilterChange = (e) => {
        const { name, value } = e.target
        setFilters(prev => ({ ...prev, [name]: value }))
    }

    return (
        <div className="destinations-page">
            <div className="dest-header">
                <h1>Discover Your Next Adventure</h1>
                <p>Browse our curated selection of travel packages and services</p>
            </div>

            <div className="dest-content">
                <aside className="filters-sidebar">
                    <div className="filter-group">
                        <label><Filter size={16} /> Service Type</label>
                        <select name="type" value={filters.type} onChange={handleFilterChange}>
                            <option>All</option>
                            <option>Packages</option>
                            <option>Hotels</option>
                            <option>Flights</option>
                            <option>Visas</option>
                            <option>Transfers</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <label><SearchIcon size={16} /> Destination</label>
                        <input
                            type="text"
                            name="destination"
                            placeholder="Search destination..."
                            value={filters.destination}
                            onChange={handleFilterChange}
                        />
                    </div>

                    <div className="filter-group">
                        <label><SlidersHorizontal size={16} /> Max Price (KES)</label>
                        <input
                            type="range"
                            name="maxPrice"
                            min="5000"
                            max="1000000"
                            step="5000"
                            value={filters.maxPrice}
                            onChange={handleFilterChange}
                        />
                        <div className="price-labels">
                            <span>KES 5k</span>
                            <span className="current-price">{Number(filters.maxPrice).toLocaleString()}</span>
                            <span>KES 1M</span>
                        </div>
                    </div>
                </aside>

                <main className="results-grid">
                    {loading ? (
                        <div className="loading">Searching...</div>
                    ) : error ? (
                        <div className="error-message">
                            <h3>Error loading results</h3>
                            <p>{error.message}</p>
                        </div>
                    ) : filteredResults.length > 0 ? (
                        <div className="grid">
                            {filteredResults.map(item => (
                                <div key={item.id} onClick={() => setSelectedItem(item)}>
                                    <DestinationCard item={item} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="no-results">
                            <h3>No results found</h3>
                            <p>Try adjusting your filters to find what you're looking for.</p>
                        </div>
                    )}
                </main>
            </div>

            {selectedItem && (
                <ServiceDetailModal
                    item={selectedItem}
                    isOpen={!!selectedItem}
                    onClose={() => setSelectedItem(null)}
                />
            )}
        </div>
    )
}

export default Destinations
