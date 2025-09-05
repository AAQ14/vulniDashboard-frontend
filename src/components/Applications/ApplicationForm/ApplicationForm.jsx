import React, { useState } from 'react'
import { addApp } from '../../../services/appService'

const ApplicationForm = ({getAllApps, handleFormView}) => {
  const initialState = {
    appName : '',
    type: '',
    identifier: '',
    owner: ''
  }
  const [formData, setFormData] = useState( initialState)

  function handleChange(evt)
  {
    setFormData({...formData, [evt.target.name] : evt.target.value})
    console.log(formData)
  }

  function handleSubmit(evt){
    evt.preventDefault();
    handleAdd()
  }

  async function handleAdd(){
    try {
      const res = await addApp(formData)
      if (res.status == 201)
      {
        getAllApps()
        handleFormView()
      }
    } catch (err) {
      return err
    }
  }

  async function handleUpdate() {}
  return (
    <>
      <h1>Add new app</h1>
      <form onSubmit={handleSubmit}>
         <label htmlFor="name">name: </label>
         <input type="text" id='name' name='appName' onChange={handleChange} required />

         <select name="type" onChange={handleChange}>
            <option value="web app">web app</option>
            <option value="server">server</option>
            <option value="network">network</option>
            <option value="router">router</option>
            <option value="firewall">firewall</option>
            <option value="database server">database server</option>
         </select>

         <label htmlFor="identifier">identifier: </label>
         <input type="text" id='identifier' name='identifier' onChange={handleChange} required />

        <label htmlFor="owner">owner: </label>
        <input type="text" id='owner' name='owner' onChange={handleChange} required />

        <button>add</button>
      </form>
      <button onClick={handleFormView}>BACK</button>
    </>
  )
}

export default ApplicationForm