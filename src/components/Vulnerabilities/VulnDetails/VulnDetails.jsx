import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { FadeLoader } from "react-spinners";
import { details, deleteVuln } from "../../../services/vulnService";
import VulnerabilityForm from "../VulnerabilityForm/VulnerabilityForm";

const VulnDetails = ({ handleDetailsView, selected, handleFormView, isFormOpen, getAllVulns, setStatus, status, message, setMessage}) => {
  const [vuln, setVuln] = useState(null);

    function displayMessage(){
        if(status == 'updated'){
            setMessage("vulnerability updated successfully")
            setTimeout(()=>{setMessage(null);setStatus(null);}, 3000)
        }
      }

  async function getVulnDetails() {
    try {
      const vulnDetails = await details(selected._id);
      setVuln(vulnDetails);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDelete()
  {
    try {
      const res = await deleteVuln(vuln._id)
      if(res.status == 200)
      {
        setStatus('deleted')
        getAllVulns()
        handleDetailsView()
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getVulnDetails();
    displayMessage();
  }, [status]);

  return (
    <>
      {isFormOpen ? <VulnerabilityForm /> :
      vuln? <>
      <div>{message}</div>
      <h1>VulnDetails</h1>
      <p>title: {vuln.title}</p>
      <p>rating: {vuln.rating}</p>
      <p>score: {vuln.score}</p>
      <p>description: {vuln.description}</p>
      <p>asset: {vuln.asset?.name}</p>
      <p>status: {vuln.status}</p>
      <p>
        Discovered at: {dayjs(vuln.discoveredAt).format("YYYY/MM/DD HH:mm")}
      </p>
      <p>
        resolved at:{" "}
        {vuln.resolvedAt == null
          ? "not solved yet"
          : dayjs(vuln.resolvedAt).format("YYYY/MM/DD HH:mm")}
      </p>
       <button onClick={handleFormView}>UPDATE</button>
       <button onClick={handleDelete}>DELETE</button>
      </>:<FadeLoader />}
      <button onClick={handleDetailsView}>BACK</button>
    </>
  );
};

export default VulnDetails;
