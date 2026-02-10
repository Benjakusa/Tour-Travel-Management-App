import React from 'react'
import { Flame, Users, MapPin } from 'lucide-react'
import './DestinationCard.css'

const DestinationCard = ({ item, onViewDetails }) => {
    const formattedPrice = typeof item.price === 'string' && item.price.includes('-')
        ? item.price
        : (item.price ? `KES ${Number(item.price).toLocaleString()}` : 'N/A');

    return (
        <div className="dest-card">
            <div className="dest-image-container">
                <img src={item.images?.[0] || 'https://via.placeholder.com/400x300?text=No+Image'} alt={item.name} />
                {item.type === 'hot_deal' && (
                    <div className="hot-badge">
                        <Flame size={14} /> Hot Deal
                    </div>
                )}
            </div>
            <div className="dest-info">
                <h3>{item.name}</h3>
                <div className="dest-meta">
                    <span><MapPin size={14} /> {item.destination}</span>
                    <span><Users size={14} /> {item.pax} Pax</span>
                </div>
                <div className="dest-footer">
                    <div className="dest-price">
                        <span className="price-label">From</span>
                        <span className="price-amount">{formattedPrice}</span>
                    </div>
                    <button
                        className="btn btn-primary btn-block"
                        onClick={() => onViewDetails && onViewDetails(item)}
                    >
                        View Details
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DestinationCard
