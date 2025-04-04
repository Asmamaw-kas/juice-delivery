import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Custom marker icons
const createMarkerIcon = (color) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="background-color:${color}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 5px rgba(0,0,0,0.3);"></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  })
}

const Locations = () => {
  const mapRef = useRef(null)
  const markersRef = useRef([])

  // Ethiopia branches data
  const branches = [
    {
      id: 1,
      name: 'Bole Branch',
      address: 'Bole Medhanialem, Main Street',
      hours: 'Open: 8:00 AM - 8:00 PM',
      status: 'open',
      coordinates: [8.9806, 38.7578] // Addis Ababa, Bole
    },
    {
      id: 2,
      name: 'Megenagna Branch',
      address: 'Megenagna Square, Addis Ababa',
      hours: 'Open: 7:00 AM - 7:00 PM',
      status: 'open',
      coordinates: [9.0227, 38.7469] // Addis Ababa, Megenagna
    },
    {
      id: 3,
      name: 'Bahir Dar Branch',
      address: 'Lake Tana Road, Bahir Dar',
      hours: 'Opening soon',
      status: 'coming-soon',
      coordinates: [11.6000, 37.3833] // Bahir Dar
    },
    {
      id: 4,
      name: 'Hawassa Branch',
      address: 'Lake Hawassa View, Hawassa',
      hours: 'Open: 9:00 AM - 6:00 PM',
      status: 'open',
      coordinates: [7.0500, 38.4667] // Hawassa
    }
  ]

  useEffect(() => {
    // Initialize map
    const map = L.map(mapRef.current).setView([9.1450, 40.4897], 7) // Center on Ethiopia
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map)

    // Add markers for each branch
    markersRef.current = branches.map(branch => {
      const markerColor = branch.status === 'open' ? '#4CAF50' : '#FFC107'
      const marker = L.marker(branch.coordinates, {
        icon: createMarkerIcon(markerColor)
      }).addTo(map)
      
      marker.bindPopup(`
        <h3>${branch.name}</h3>
        <p>${branch.address}</p>
        <p>${branch.hours}</p>
      `)
      
      return marker
    })

    // Animation for branches list
    const branchElements = document.querySelectorAll('.branch')
    branchElements.forEach((branch, index) => {
      branch.style.animationDelay = `${index * 0.1}s`
    })

    // Cleanup function
    return () => {
      map.remove()
      markersRef.current = []
    }
  }, [])

  const handleBranchHover = (branchId, isHovering) => {
    const markerIndex = branches.findIndex(b => b.id === branchId)
    if (markerIndex >= 0 && markersRef.current[markerIndex]) {
      const marker = markersRef.current[markerIndex]
      if (isHovering) {
        marker.openPopup()
        marker.setZIndexOffset(1000)
      } else {
        marker.closePopup()
        marker.setZIndexOffset(0)
      }
    }
  }

  return (
    <section id="locations" className="locations-section">
      <div className="container">
        <h2>Our Locations in Ethiopia</h2>
        <p className="subtitle">Find us near you or order for delivery</p>
        
        <div className="locations-container">
          <div className="map-container">
            <div 
              ref={mapRef} 
              className="map" 
              style={{ height: '500px', borderRadius: '10px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}
            ></div>
          </div>
          
          <div className="branches-list">
            {branches.map(branch => (
              <div 
                key={branch.id}
                className="branch"
                onMouseEnter={() => handleBranchHover(branch.id, true)}
                onMouseLeave={() => handleBranchHover(branch.id, false)}
              >
                <h3>{branch.name}</h3>
                <p>{branch.address}</p>
                <p>{branch.hours}</p>
                <div className={`status-indicator ${branch.status}`}></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .locations-section {
          padding: 4rem 2rem;
          background-color: white;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        h2 {
          text-align: center;
          font-size: 2.5rem;
          color: #4CAF50;
          margin-bottom: 1rem;
          position: relative;
        }
        
        h2::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 3px;
          background-color: #4CAF50;
        }
        
        .subtitle {
          text-align: center;
          color: #666;
          margin-bottom: 3rem;
          font-size: 1.1rem;
        }
        
        .locations-container {
          display: flex;
          flex-wrap: wrap;
          gap: 2rem;
          margin-top: 2rem;
        }
        
        .map-container {
          flex: 1;
          min-width: 300px;
        }
        
        .branches-list {
          flex: 1;
          min-width: 300px;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        
        .branch {
          background: white;
          padding: 1.5rem;
          border-radius: 10px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
          opacity: 0;
          animation: fadeInUp 0.5s ease forwards;
          cursor: pointer;
        }
        
        .branch:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        }
        
        .branch h3 {
          margin-top: 0;
          color: #4CAF50;
          font-size: 1.3rem;
        }
        
        .branch p {
          margin: 0.5rem 0;
          color: #666;
        }
        
        .status-indicator {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        
        .status-indicator.open {
          background-color: #4CAF50;
          animation: pulse 2s infinite;
        }
        
        .status-indicator.coming-soon {
          background-color: #FFC107;
        }
        
        @keyframes pulse {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(76, 175, 80, 0.7); }
          70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(76, 175, 80, 0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(76, 175, 80, 0); }
        }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Leaflet popup customization */
        :global(.leaflet-popup-content) {
          margin: 10px;
        }
        
        :global(.leaflet-popup-content h3) {
          margin: 0 0 5px;
          font-size: 1.1rem;
          color: #4CAF50;
        }
        
        :global(.leaflet-popup-content p) {
          margin: 0 0 5px;
          font-size: 0.9rem;
          color: #666;
        }
      `}</style>
    </section>
  )
}

export default Locations