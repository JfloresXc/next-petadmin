import React from 'react'
// import CardStats from 'components/Cards/CardStats.js'

export default function HeaderStats() {
  return (
    <>
      {/* Header */}
      <div className="bg-blueGray-800 md:pt-0 banner-container">
        <img className="banner " src="/storage/banner.jpg" alt="Banner" />
      </div>
      <style jsx>{`
        .banner-container {
        }
        .banner {
          height: 100%;
          object-fit: cover;
          object-position: center;
          width: 100%;
        }
      `}</style>
    </>
  )
}
