import React from 'react'
import { deleteApp } from '../../../services/assetService'

const AppDetails = ({handleDetailsView, selectedApp,getAllApps, handleFormView}) => {
  // Q: I passed props here to application Form but it didn't work? 
  return (
    <>
      <h1>App details</h1>
      <p>name: {selectedApp.appName}</p>
      <p>type: {selectedApp.type}</p>
      <p>identifier: {selectedApp.identifier}</p>
      <p>owner: {selectedApp.owner}</p>
      <button onClick={async()=>{await deleteApp(selectedApp._id);getAllApps(); handleDetailsView();}}>DELETE</button>
      <button onClick={()=>{handleFormView()}}>update</button>
      <button onClick={handleDetailsView}>BACK</button>
    </>
  )
}

export default AppDetails