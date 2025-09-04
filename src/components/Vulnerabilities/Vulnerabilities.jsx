import React, { useState, useEffect } from 'react'
import { add, deleteVuln, update, index, details } from '../../services/vulnService'

const Vulnerabilities = () => {
      const [vulnerabilities, setVulnerabilities] = useState([])

      async function getAllVulns() {
         try {
            const allVuln = await index()
            console.log(allVuln)
            setVulnerabilities(allVuln)
         } catch (err) {
            console.log(err)
         }
      }

      useEffect(()=>{
        getAllVulns()
      }, [])

  return (
    <>
      <h1>All Vulnerabilities</h1>
      {vulnerabilities?.map(vuln => (
          <>
            <p>title: {vuln.title}</p>
            <p>rating: {vuln.rating}</p>
            <p>score: {vuln.score}</p>
            <p>description: {vuln.description}</p>
            <p>status: {vuln.status}</p>
            <hr/>
          </>
      ))}
    </>
  )
}

export default Vulnerabilities