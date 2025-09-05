import React from 'react'
import { appIndex,appDetails } from '../../services/appService'
import { useState, useEffect } from 'react'

import AppDetails from './AppDetails/AppDetails'
import ApplicationForm from './ApplicationForm/ApplicationForm'

const Applications = () => {
  const [apps, setApps] = useState([])
  const [detailsView, setDetailsView] = useState(false)
  const [selectedApp, setSelectedApp] = useState({})
  const [formIsShown, setFormIsShown] = useState(false)

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

  function handleFormView()
  {
    setFormIsShown(!formIsShown)
  }

  useEffect(()=>{getAllApps()},[])

  return (
    <>
      < br/>
      < br/>
      {formIsShown? <ApplicationForm handleFormView={handleFormView} getAllApps={getAllApps}/> :
      detailsView ? <AppDetails selectedApp={selectedApp} handleDetailsView={handleDetailsView}/> : 
      <>
        <button onClick={handleFormView}>Add App</button>
        <h1>Applications</h1>
        {apps.map((app, index) => (
        <div key={index}>
          <p>name: {app.appName}</p>
          <p>type: {app.type}</p>
          <button onClick={()=>{setSelectedApp(app);handleDetailsView();}}>details</button>
          <hr />
        </div>
       ))}
      </>
      }
    </>
  )
}

export default Applications