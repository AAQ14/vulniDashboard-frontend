import React from 'react'
import { assetDetails, assetIndex } from '../../services/assetService'
import { useState, useEffect } from 'react'
import { FadeLoader } from 'react-spinners'

import AssetDetails from './AssetDetails/AssetDetails'
import AssetForm from './AssetForm/AssetForm'

const Assets = ({username, userId}) => {
  const [assets, setAssets] = useState([])
  const [detailsView, setDetailsView] = useState(false)
  const [selectedAsset, setSelectedAsset] = useState({})
  const [formIsShown, setFormIsShown] = useState(false)
  const [status, setStatus] = useState(null)
  const [message, setMessage] = useState(null)
 
  async function getAllAssets() {
    try {
      const allAssets = await assetIndex()
      setAssets(allAssets)
      
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

    async function getAssetDetails(){
    try {
       const res = await assetDetails(selectedAsset?._id)
       setSelectedAsset(res)
    } catch (err) {
      console.log(err)
      return err
    }
  }



  function showMessage(){
    if(status == 'added'){
      setMessage('asset added successfully')
      setTimeout(()=>{setMessage(null), setStatus(null)}, 3000)
    } 
    if(status == 'deleted'){
          setMessage('asset deleted successfully')
          setTimeout(()=>{setMessage(null),setStatus(null)}, 3000)
     }
  }

  useEffect(()=>{getAllAssets();getAssetDetails();showMessage()},[status])

  return (
    <>
      < br/>
      < br/>
      {formIsShown? <AssetForm handleFormView={handleFormView} selectedAsset={selectedAsset} getAllAssets={getAllAssets} getAssetDetails={getAssetDetails} setStatus={setStatus} username={username} userId={userId} /> :
      detailsView ? <AssetDetails selectedAsset={selectedAsset} handleDetailsView={handleDetailsView} handleFormView={handleFormView} getAllAssets={getAllAssets} status ={status} setStatus={setStatus} setMessage={setMessage} message={message}/> : 
      assets.length ?
      <>
        <button  onClick={()=>{setSelectedAsset(null); handleFormView();}}>Add Asset</button>
        <div>{message}</div>
        <h1>Assets</h1>
        {assets.map((asset, index) => (
        <div class="assets" key={index}>
          <p>name: {asset.name}</p>
          <p>type: {asset.type}</p>
          <button onClick={()=>{setSelectedAsset(asset);handleDetailsView();}}>details</button>
          <hr />
        </div>
       ))}
      </>
      :assets.length == 0 ?
      <>
        <div>{message}</div>
        <button  onClick={()=>{setSelectedAsset(null); handleFormView();}}>Add Asset</button>
        <p>No assets</p>
      </>
      
      :
      <FadeLoader color='white' />
      }
    </>
  )
}

export default Assets