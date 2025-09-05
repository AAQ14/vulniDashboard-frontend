import React from 'react'
import { deleteApp } from '../../../services/appService'

const AppDetails = ({handleDetailsView, selectedApp,getAllApps, setFormIsShown}) => {
  // console.log(selectedApp)
  return (
    <>
      <h1>App details</h1>
      <p>name: {selectedApp.appName}</p>
      <p>type: {selectedApp.type}</p>
      <p>identifier: {selectedApp.identifier}</p>
      <p>owner: {selectedApp.owner}</p>
      <button onClick={async()=>{await deleteApp(selectedApp._id);getAllApps(); handleDetailsView();}}>DELETE</button>
      <button onClick={()=>{setFormIsShown(true)}}>update</button>
      <button onClick={handleDetailsView}>BACK</button>
    </>
  )
}

export default AppDetails