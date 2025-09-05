import React from 'react'
import { deleteApp } from '../../../services/appService'

const AppDetails = ({handleDetailsView, selectedApp, handleFormView}) => {
  // console.log(selectedApp)
  return (
    <>
      <h1>App details</h1>
      <p>name: {selectedApp.appName}</p>
      <p>type: {selectedApp.type}</p>
      <p>identifier: {selectedApp.identifier}</p>
      <p>owner: {selectedApp.owner}</p>
      <button onClick={handleFormView}>update</button>
      <button onClick={handleDetailsView}>BACK</button>
    </>
  )
}

export default AppDetails