import React from 'react'
import { deleteAsset } from '../../../services/assetService'

const AssetDetails = ({handleDetailsView, selectedAsset,getAllAssets, handleFormView}) => {
  // Q: I passed props here to asset Form but it didn't work? 
  return (
    <>
      <h1>Asset details</h1>
      <p>name: {selectedAsset.name}</p>
      <p>type: {selectedAsset.type}</p>
      <p>identifier: {selectedAsset.identifier}</p>
      <p>owner: {selectedAsset.owner}</p>
      <button onClick={async()=>{await deleteAsset(selectedAsset._id);getAllAssets(); handleDetailsView();}}>DELETE</button>
      <button onClick={()=>{handleFormView()}}>update</button>
      <button onClick={handleDetailsView}>BACK</button>
    </>
  )
}

export default AssetDetails