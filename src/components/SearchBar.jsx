import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, MapPin, Calendar, Users, DollarSign } from 'lucide-react'
import './SearchBar.css'

const SearchBar = () => {
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useState({
        type: 'Packages',
        destination: '',
        date: '',
        pax: '1',
        price: '500000'
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setSearchParams(prev => ({ ...prev, [name]: value }))
    }

    const handleSearch = (e) => {
        e.preventDefault()
        const query = new URLSearchParams(searchParams).toString()
        navigate(`/destinations?${query}`)
    }

    return (
        <form className="search-bar" onSubmit={handleSearch}>
            <div className="search-field">
                <label><Search size={16} /> Service Type</label>
                <select name="type" value={searchParams.type} onChange={handleChange}>
                    <option>Packages</option>
                    <option>Hotels</option>
                    <option>Flights</option>
                    <option>Visas</option>
                    <option>Transfers</option>
                </select>
            </div>

            <div className="search-field">
                <label><MapPin size={16} /> Destination</label>
                <input
                    type="text"
                    name="destination"
                    placeholder="Where to?"
                    value={searchParams.destination}
                    onChange={handleChange}
                />
            </div>

            <div className="search-field">
                <label><Calendar size={16} /> Date</label>
                <input
                    type="date"
                    name="date"
                    value={searchParams.date}
                    onChange={handleChange}
                />
            </div>

            <div className="search-field">
                <label><Users size={16} /> Pax</label>
                <input
                    type="number"
                    name="pax"
                    min="1"
                    value={searchParams.pax}
                    onChange={handleChange}
                />
            </div>

            <div className="search-field">
                <label><DollarSign size={16} /> Max Price</label>
                <input
                    type="range"
                    name="price"
                    min="1000"
                    max="1000000"
                    step="1000"
                    value={searchParams.price}
                    onChange={handleChange}
                />
                <span className="price-display">KES {Number(searchParams.price).toLocaleString()}</span>
            </div>

            <button type="submit" className="search-submit">
                Search
            </button>
        </form>
    )
}

export default SearchBar
