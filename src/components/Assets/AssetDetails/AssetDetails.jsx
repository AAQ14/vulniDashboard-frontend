import React, { useEffect } from 'react'
import { deleteAsset } from '../../../services/assetService'

const AssetDetails = ({handleDetailsView, selectedAsset,getAllAssets, handleFormView, status, setStatus,setMessage, message}) => {
  // Q: I passed props here to asset Form but it didn't work? 
    function showMessage(){
    if(status == 'updated'){
      setMessage('asset updated successfully')
      setTimeout(()=>{setMessage(null),setStatus(null)}, 3000)
    }
  }

  useEffect(()=>showMessage(), [status])
  return (
    <>
      <div>{message}</div>
      <h1>Asset details</h1>
      <p>name: {selectedAsset.name}</p>
      <p>type: {selectedAsset.type}</p>
      <p>identifier: {selectedAsset.identifier}</p>
      <p>owner: {selectedAsset.owner}</p>
      <button onClick={async()=>{await deleteAsset(selectedAsset._id);getAllAssets(); setStatus('deleted'); handleDetailsView();}}>DELETE</button>
      <button onClick={()=>{handleFormView()}}>update</button>
      <button onClick={handleDetailsView}>BACK</button>
    </>
  )
}

export default AssetDetails