import React, { useState, useEffect } from 'react'
import { useFirestore } from '../hooks/useFirestore'
import { db } from '../firebase/config'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { Save, Globe, Phone, Mail, MapPin, Share2 } from 'lucide-react'
import './SettingsModule.css'

const SettingsModule = () => {
    const [settings, setSettings] = useState({
        siteName: 'Akothee Safaris',
        contactPhone: '+254 700 000 000',
        contactEmail: 'info@akotheesafaris.com',
        officeLocation: 'Nairobi, Kenya',
        facebookUrl: '',
        instagramUrl: '',
        secretCode: '#FikaPlaces'
    })
    const [loading, setLoading] = useState(false)
    const [saveStatus, setSaveStatus] = useState('')

    useEffect(() => {
        const fetchSettings = async () => {
            const docRef = doc(db, 'settings', 'general')
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()) {
                setSettings(docSnap.data())
            }
        }
        fetchSettings()
    }, [])

    const handleChange = (e) => {
        setSettings(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSave = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            await setDoc(doc(db, 'settings', 'general'), settings)
            setSaveStatus('Settings updated successfully!')
            setTimeout(() => setSaveStatus(''), 3000)
        } catch (error) {
            console.error('Error saving settings:', error)
            alert('Failed to save settings.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="settings-module">
            <div className="module-header">
                <h1>Site Settings</h1>
                <button className="btn btn-primary" onClick={handleSave} disabled={loading}>
                    <Save size={18} /> {loading ? 'Saving...' : 'Save All Changes'}
                </button>
            </div>

            {saveStatus && <div className="alert-success">{saveStatus}</div>}

            <form className="settings-form" onSubmit={handleSave}>
                <div className="settings-section">
                    <h3><Globe size={18} /> General Information</h3>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Business Name</label>
                            <input type="text" name="siteName" value={settings.siteName} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Staff Signup Secret Code</label>
                            <input type="text" name="secretCode" value={settings.secretCode} onChange={handleChange} />
                        </div>
                    </div>
                </div>

                <div className="settings-section">
                    <h3><Phone size={18} /> Contact Details</h3>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Phone Number</label>
                            <input type="text" name="contactPhone" value={settings.contactPhone} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Email Address</label>
                            <input type="email" name="contactEmail" value={settings.contactEmail} onChange={handleChange} />
                        </div>
                        <div className="form-group full-width">
                            <label>Office Location</label>
                            <textarea name="officeLocation" rows="2" value={settings.officeLocation} onChange={handleChange}></textarea>
                        </div>
                    </div>
                </div>

                <div className="settings-section">
                    <h3><Share2 size={18} /> Social Media</h3>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Facebook URL</label>
                            <input type="url" name="facebookUrl" value={settings.facebookUrl} onChange={handleChange} placeholder="https://facebook.com/..." />
                        </div>
                        <div className="form-group">
                            <label>Instagram URL</label>
                            <input type="url" name="instagramUrl" value={settings.instagramUrl} onChange={handleChange} placeholder="https://instagram.com/..." />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SettingsModule
