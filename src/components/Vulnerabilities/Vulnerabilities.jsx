import React, { useState, useEffect } from 'react'
import { deleteVuln, index, details } from '../../services/vulnService'
import VulnerabilityForm from './VulnerabilityForm/VulnerabilityForm'
import { FadeLoader } from 'react-spinners'
import dayjs from 'dayjs'

const Vulnerabilities = () => {
      const [vulnerabilities, setVulnerabilities] = useState([])
      const [isFormOpen, setIsFormOpen] = useState(false)
      const [selected, setSelected] = useState(null)
      const [message, setMessage] = useState(null)
      const [status, setStatus] = useState(null)

      console.log("this is selected" , selected)

      async function getAllVulns() {
         try {
            const allVuln = await index()
            console.log(allVuln)
            setVulnerabilities(allVuln)
         } catch (err) {
            console.log(err)
         }
      }

      console.log(status)

      function displayMessage(){
        if(status == 'updated'){
            setMessage("vulnerability updated successfully")
            setTimeout(()=>{setMessage(null)}, 3000)
        }
         if(status == 'added'){
            setMessage("vulnerability created successfully")
            setTimeout(()=>{setMessage(null)}, 3000)
        }
        if(status== 'deleted'){
            setMessage("vulnerability deleted successfully")
            setTimeout(()=>{setMessage(null)}, 3000)
        }
      }


       console.log("this is message",message)
      // console.log("these are vulnerss",vulnerabilities) Q

      function handleFormView(){
        setIsFormOpen(!isFormOpen)
      }

      function handleSelected(vuln){
          setSelected(vuln)
      }

      useEffect(()=>{
        getAllVulns(),
        displayMessage()
      }, [status])

  return (
    <>
      <br/>
      {isFormOpen ? <VulnerabilityForm handleFormView={handleFormView} getAllVulns={getAllVulns} selected={selected} setStatus={setStatus}/> : vulnerabilities.length ? 
      <><h1>All Vulnerabilities</h1>
      <div>{message}</div>
      <button onClick={()=>{handleSelected(null); handleFormView();}}>{isFormOpen ? 'Back' : 'Add vulnerability'}</button>
      {vulnerabilities?.map((vuln, index) => (
          <div key={index}>
            <p>title: {vuln.title}</p>
            <p>rating: {vuln.rating}</p>
            <p>score: {vuln.score}</p>
            <p>description: {vuln.description}</p>
            <p>asset: {vuln.asset?.name}</p>
            <p>status: {vuln.status}</p>
            <p>Discovered at: {dayjs(vuln.discoveredAt).format('YYYY/MM/DD HH:mm')}</p>
            <p>resolved at: {vuln.resolvedAt==null? "not solved yet" : dayjs(vuln.resolvedAt).format('YYYY/MM/DD HH:mm')}</p>
            
            <button onClick={async()=>{await deleteVuln(vuln._id); getAllVulns(); setStatus('deleted')}}>Delete</button>

            <button  onClick={()=>{handleSelected(vuln); handleFormView();}}>Update</button>
            <hr/>
          </div>
      ))}
       
      </> : vulnerabilities.length==0 ? 
      <>
       <button onClick={()=>{handleSelected(null); handleFormView();}}>{isFormOpen ? 'Back' : 'Add vulnerability'}</button>
      <p>no vulnerabilities</p>
      </>      
      :<FadeLoader color='white' />}
      
      
    </>
  )
}

export default Vulnerabilities