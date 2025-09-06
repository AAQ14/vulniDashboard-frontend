import React, { useState } from 'react'
import {addAsset, updateAsset } from '../../../services/assetService'

const AssetForm = ({getAllAssets, handleFormView, selectedAsset, getAssetDetails}) => {

  const initialState = {
    name : '',
    type: '',
    identifier: '',
    owner: ''
  }
  const [formData, setFormData] = useState( selectedAsset ? selectedAsset :initialState)

  console.log("this is form data: ", formData)

  function handleChange(evt)
  {
    setFormData({...formData, [evt.target.name] : evt.target.value})
    console.log(formData)
  }

  function handleSubmit(evt){
    evt.preventDefault();
    selectedAsset ? handleUpdate() : handleAdd()
  }

  async function handleAdd(){
    try {
      const res = await addAsset(formData)
      if (res.status == 201)
      {
        getAllAssets()
        handleFormView()
      }
    } catch (err) {
      return err
    }
  }

  async function handleUpdate(){
      try {
        const res = await updateAsset(selectedAsset._id, formData)
        if(res.status == 200){
          getAssetDetails()
          getAllAssets()
          handleFormView()
        }
      } catch (err) {
        console.log(err)
        return err
      }
  }
  return (
    <>
      <h1>Add new asset</h1>
      <form onSubmit={handleSubmit}>
         <label htmlFor="name">name: </label>
         <input type="text" id='name' name='name' onChange={handleChange} value={formData.name} required />

         <select name="type" onChange={handleChange} value={formData.type}>
            <option value="web app">web app</option>
            <option value="server">server</option>
            <option value="network">network</option>
            <option value="router">router</option>
            <option value="firewall">firewall</option>
            <option value="database server">database server</option>
         </select>

         <label htmlFor="identifier" >identifier: </label>
         <input type="text" id='identifier' name='identifier' onChange={handleChange} value={formData.identifier} required />

        <label htmlFor="owner">owner: </label>
        <input type="text" id='owner' name='owner' onChange={handleChange} value={formData.owner} required />

        <button>{selectedAsset? "update" : "add"}</button>
      </form>
      <button onClick={handleFormView}>BACK</button>
    </>
  )
}

export default AssetForm