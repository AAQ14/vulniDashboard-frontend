import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { FadeLoader } from "react-spinners";
import { details } from "../../../services/vulnService";
import VulnerabilityForm from "../VulnerabilityForm/VulnerabilityForm";

const VulnDetails = ({ handleDetailsView, selected, handleFormView, isFormOpen}) => {
  const [vuln, setVuln] = useState(null);

  async function getVulnDetails() {
    try {
      const vulnDetails = await details(selected._id);
      setVuln(vulnDetails);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getVulnDetails();
  }, []);

  return (
    <>
      {isFormOpen ? <VulnerabilityForm /> :
      vuln? <>
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
      </>:<FadeLoader />}
       <button onClick={handleFormView}>UPDATE</button>
      <button onClick={handleDetailsView}>BACK</button>
    </>
  );
};

export default VulnDetails;
