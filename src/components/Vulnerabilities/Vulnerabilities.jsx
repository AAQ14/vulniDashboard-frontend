import React, { useState, useEffect } from 'react'
import { deleteVuln, index, details } from '../../services/vulnService'
import VulnerabilityForm from './VulnerabilityForm/VulnerabilityForm'
import { FadeLoader } from 'react-spinners'

const Vulnerabilities = () => {
      const [vulnerabilities, setVulnerabilities] = useState([])
      const [isFormOpen, setIsFormOpen] = useState(false)

      async function getAllVulns() {
         try {
            const allVuln = await index()
            console.log(allVuln)
            setVulnerabilities(allVuln)
         } catch (err) {
            console.log(err)
         }
      }

      function handleFormView(){
        setIsFormOpen(!isFormOpen)
      }

      useEffect(()=>{
        getAllVulns()
      }, [])

  return (
    <>
      <br/>
      
      {isFormOpen ? <VulnerabilityForm handleFormView={handleFormView} getAllVulns={getAllVulns}/> : vulnerabilities.length ? <><h1>All Vulnerabilities</h1>
      <button onClick={handleFormView}>{isFormOpen ? 'Back' : 'Add vulnerability'}</button>
      {vulnerabilities?.map(vuln => (
          <>
            <p>title: {vuln.title}</p>
            <p>rating: {vuln.rating}</p>
            <p>score: {vuln.score}</p>
            <p>description: {vuln.description}</p>
            <p>app: {vuln.app?.appName}</p>
            <p>status: {vuln.status}</p>
            <p>Discovered at: {vuln.discoveredAt}</p>
            <hr/>
          </>
      ))}</> : <FadeLoader color='white' />}
      
      
    </>
  )
}

export default Vulnerabilities