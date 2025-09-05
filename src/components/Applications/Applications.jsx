import React from 'react'
import { appIndex,appDetails } from '../../services/appService'
import { useState, useEffect } from 'react'

const Applications = () => {
  const [apps, setApps] = useState([])
  const [detailsView, setDetailsView] = useState(false)
  // const [selectedApp, setSelectedApp] = ({})

  async function getAllApps() {
    try {
      const allApps = await appIndex()
      setApps(allApps)
      
    } catch (err) {
      return err
    }
  }

  function handleDetailsView()
  {
    setDetailsView(!detailsView)
  }

  useEffect(()=>{getAllApps()},[])

  return (
    <>
      <h1>Applications</h1>
      {apps.map((app, index) => (
        <div key={index}>
          <p>name: {app.appName}</p>
          <p>type: {app.type}</p>
          <button onClick={handleDetailsView}>details</button>
          <hr />
        </div>
      ))}
    </>
  )
}

export default Applications