import { db } from '../firebase/config'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

export const seedData = async () => {
    if (!window.confirm('Spread sample data? This will add hero slides and packages.')) return

    try {
        // 1. Seed Hero Slides
        const heroSlides = [
            {
                image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2068&auto=format&fit=crop',
                title: 'Discover the Wild Heart of Africa',
                subtitle: 'Unforgettable safaris across Kenya and Tanzania',
                ctaText: 'Explore Destinations',
                ctaLink: '/destinations',
                priority: 1,
                active: true
            },
            {
                image: 'https://images.unsplash.com/photo-1493246507139-91e8bef99c02?q=80&w=2070&auto=format&fit=crop',
                title: 'Breathtaking Beach Escapes',
                subtitle: 'White sands and turquoise waters of Diani Beach',
                ctaText: 'Book a Hotel',
                ctaLink: '/destinations',
                priority: 2,
                active: true
            }
        ]

        for (const slide of heroSlides) {
            await addDoc(collection(db, 'hero_slides'), slide)
        }

        // 2. Seed Packages
        const packages = [
            {
                name: 'Maasai Mara 3-Day Safari',
                destination: 'Maasai Mara, Kenya',
                price: 45000,
                pax: 6,
                type: 'hot_deal',
                serviceType: 'Packages',
                description: 'Guided tour with professional rangers. Meals and transport included.',
                images: ['https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2068&auto=format&fit=crop'],
                status: 'published',
                createdAt: serverTimestamp()
            },
            {
                name: 'Diani Beach Getaway',
                destination: 'Diani, Kenya',
                price: 25000,
                pax: 2,
                type: 'normal',
                serviceType: 'Packages',
                description: 'Luxury hotel stay with breakfast and spa access.',
                images: ['https://images.unsplash.com/photo-1493246507139-91e8bef99c02?q=80&w=2070&auto=format&fit=crop'],
                status: 'published',
                createdAt: serverTimestamp()
            }
        ]

        for (const pkg of packages) {
            await addDoc(collection(db, 'packages'), pkg)
        }

        // 3. Seed Hotels
        const hotels = [
            {
                name: 'Sarova Stanley',
                location: 'Nairobi, Kenya',
                pricePerNight: 15000,
                serviceType: 'Hotels',
                description: 'Historic luxury hotel in the heart of the city.',
                images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop'],
                status: 'published',
                createdAt: serverTimestamp()
            }
        ]

        for (const hotel of hotels) {
            await addDoc(collection(db, 'hotels'), hotel)
        }

        // 4. Seed Flights
        const flights = [
            {
                from: 'Nairobi',
                to: 'Mombasa',
                priceRange: 'KES 8,000 - 12,000',
                serviceType: 'Flights',
                type: 'return',
                status: 'published',
                createdAt: serverTimestamp()
            }
        ]

        for (const flight of flights) {
            await addDoc(collection(db, 'flights'), flight)
        }

        // 5. Seed Visas
        const visas = [
            {
                country: 'United Arab Emirates (Dubai)',
                type: '30 Days Tourist',
                serviceType: 'Visas',
                processingTime: '2-3 Working Days',
                price: 18000,
                requirements: ['Passport Scan', 'Passport Photo', 'Flight Reservation'],
                status: 'published',
                createdAt: serverTimestamp()
            }
        ]

        for (const visa of visas) {
            await addDoc(collection(db, 'visas'), visa)
        }

        // 6. Seed Transfers
        const transfers = [
            {
                title: 'JKIA Airport Transfer',
                destination: 'JKIA to Nairobi City',
                vehicleType: 'Executive Sedan',
                serviceType: 'Transfers',
                capacity: 3,
                price: 3500,
                status: 'published',
                createdAt: serverTimestamp()
            }
        ]

        for (const trans of transfers) {
            await addDoc(collection(db, 'transfers'), trans)
        }

        alert('Seeding complete!')
    } catch (error) {
        console.error('Error seeding data:', error)
        alert('Seeding failed. See console.')
    }
}
