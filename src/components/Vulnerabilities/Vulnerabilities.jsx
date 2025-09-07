import React, { useState, useEffect } from 'react'
import { deleteVuln, index, details } from '../../services/vulnService'
import VulnerabilityForm from './VulnerabilityForm/VulnerabilityForm'
import { FadeLoader } from 'react-spinners'

const Vulnerabilities = () => {
      const [vulnerabilities, setVulnerabilities] = useState([])
      const [isFormOpen, setIsFormOpen] = useState(false)
      const [selected, setSelected] = useState(null)

      async function getAllVulns() {
         try {
            const allVuln = await index()
            console.log(allVuln)
            setVulnerabilities(allVuln)
         } catch (err) {
            console.log(err)
         }
      }

      // console.log("these are vulnerss",vulnerabilities) Q

      function handleFormView(){
        setIsFormOpen(!isFormOpen)
      }

      function handleSelected(vuln){
          setSelected(vuln)
      }

      useEffect(()=>{
        getAllVulns()
      }, [])

  return (
    <>
      <br/>
      {isFormOpen ? <VulnerabilityForm handleFormView={handleFormView} getAllVulns={getAllVulns} selected={selected}/> : vulnerabilities.length ? <><h1>All Vulnerabilities</h1>
      <button onClick={()=>{handleSelected(null); handleFormView();}}>{isFormOpen ? 'Back' : 'Add vulnerability'}</button>
      {vulnerabilities?.map((vuln, index) => (
          <div key={index}>
            <p>title: {vuln.title}</p>
            <p>rating: {vuln.rating}</p>
            <p>score: {vuln.score}</p>
            <p>description: {vuln.description}</p>
            <p>asset: {vuln.asset?.name}</p>
            <p>status: {vuln.status}</p>
            <p>Discovered at: {vuln.discoveredAt}</p>
            {console.log(vuln.resolvedAt)}
            <p>resolved at: {vuln.resolvedAt==null? "not solved yet" : vuln.resolvedAt}</p>
            
            <button onClick={async()=>{await deleteVuln(vuln._id); getAllVulns()}}>Delete</button>

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