import React, { useState } from 'react'
import Hero from '../components/Hero'
import SearchBar from '../components/SearchBar'
import TopDestinations from '../components/TopDestinations'
import HotDeals from '../components/HotDeals'
import HotelsSection from '../components/HotelsSection'
import FlightsSection from '../components/FlightsSection'
import TransfersSection from '../components/TransfersSection'
import VisaServices from '../components/VisaServices'
import PassportBanner from '../components/PassportBanner'
import BookingEntryPoints from '../components/BookingEntryPoints'
import WhyChooseUs from '../components/WhyChooseUs'
import InquiryModal from '../components/InquiryModal'
import './Home.css'

const Home = () => {
    const [modalType, setModalType] = useState(null)

    const openInquiry = (type) => setModalType(type)
    const closeInquiry = () => setModalType(null)

    return (
        <div className="home">
            <Hero />
            <div className="search-container">
                <SearchBar />
            </div>

            <TopDestinations />
            <HotDeals />
            <HotelsSection />
            <FlightsSection />
            <TransfersSection />
            <VisaServices />
            <PassportBanner onApply={openInquiry} />
            <BookingEntryPoints onInquiry={openInquiry} />
            <WhyChooseUs />

            <InquiryModal
                isOpen={!!modalType}
                onClose={closeInquiry}
                serviceType={modalType}
            />
        </div>
    )
}

export default Home
