import React from 'react'
import { assetDetails, assetIndex } from '../../services/assetService'
import { useState, useEffect } from 'react'
import { FadeLoader } from 'react-spinners'

import AssetDetails from './AssetDetails/AssetDetails'
import AssetForm from './AssetForm/AssetForm'

const Assets = () => {
  const [assets, setAssets] = useState([])
  const [detailsView, setDetailsView] = useState(false)
  const [selectedAsset, setSelectedAsset] = useState({})
  const [formIsShown, setFormIsShown] = useState(false)

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

  useEffect(()=>{getAllAssets();getAssetDetails();},[])

  return (
    <>
      < br/>
      < br/>
      {formIsShown? <AssetForm handleFormView={handleFormView} selectedAsset={selectedAsset} getAllAssets={getAllAssets} getAssetDetails={getAssetDetails}/> :
      detailsView ? <AssetDetails selectedAsset={selectedAsset} handleDetailsView={handleDetailsView} handleFormView={handleFormView} getAllAssets={getAllAssets}/> : 
      assets.length ?
      <>
        <button  onClick={()=>{setSelectedAsset(null); handleFormView();}}>Add Asset</button>
        <h1>Assets</h1>
        {assets.map((asset, index) => (
        <div key={index}>
          <p>name: {asset.name}</p>
          <p>type: {asset.type}</p>
          <button onClick={()=>{setSelectedAsset(asset);handleDetailsView();}}>details</button>
          <hr />
        </div>
       ))}
      </>
      :assets.length == 0 ?
      <>
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