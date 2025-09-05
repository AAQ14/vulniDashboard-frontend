import React from 'react'
import { deleteApp, updateApp } from '../../../services/appService'

const AppDetails = ({handleDetailsView, selectedApp}) => {
  console.log(selectedApp)
  return (
    <>
      <h1>App details</h1>
      <p>name: {selectedApp.appName}</p>
      <p>type: {selectedApp.type}</p>
      <p>identifier: {selectedApp.identifier}</p>
      <p>owner: {selectedApp.owner}</p>
      <button onClick={handleDetailsView}>BACK</button>
    </>
  )
}

export default AppDetails