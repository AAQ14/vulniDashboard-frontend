import React, { useState, useEffect } from "react";
import { index } from "../../services/vulnService";
import VulnerabilityForm from "./VulnerabilityForm/VulnerabilityForm";
import VulnDetails from "./VulnDetails/VulnDetails";
import { FadeLoader } from "react-spinners";
import dayjs from "dayjs";

const Vulnerabilities = ({ username, userId }) => {
  const [vulnerabilities, setVulnerabilities] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [message, setMessage] = useState(null);
  const [status, setStatus] = useState(null);

  console.log("this is selected", selected);

  async function getAllVulns() {
    try {
      const allVuln = await index(userId);
      console.log(allVuln);
      setVulnerabilities(allVuln);
    } catch (err) {
      console.log(err);
    }
  }

  function displayMessage() {
    if (status == "added") {
      setMessage("vulnerability created successfully");
      setTimeout(() => {
        setMessage(null);
        setStatus(null);
      }, 3000);
    }
    if (status == "deleted") {
      setMessage("vulnerability deleted successfully");
      setTimeout(() => {
        setMessage(null);
        setStatus(null);
      }, 3000);
    }
  }

  function handleFormView() {
    setIsFormOpen(!isFormOpen);
  }

  function handleDetailsView() {
    setIsDetailsOpen(!isDetailsOpen);
  }

  function handleSelected(vuln) {
    setSelected(vuln);
  }

  useEffect(() => {
    getAllVulns();
  }, [userId]);

  useEffect(() => {
    displayMessage();
  }, [status]);

  return (
    <>
      <br />
      {isFormOpen ? (
        <VulnerabilityForm
          handleFormView={handleFormView}
          getAllVulns={getAllVulns}
          selected={selected}
          setStatus={setStatus}
          username={username}
          userId={userId}
        />
      ) : isDetailsOpen ? (
        <VulnDetails
          handleDetailsView={handleDetailsView}
          selected={selected}
          handleFormView={handleFormView}
          isFormOpen={isFormOpen}
          getAllVulns={getAllVulns}
          setStatus={setStatus}
          status={status}
          setMessage={setMessage}
          message={message}
        />
      ) : vulnerabilities.length ? (
        <>
          <h1>All Vulnerabilities</h1>
          <div>{message}</div>
          <button
            onClick={() => {
              handleSelected(null);
              handleFormView();
            }}
          >
            {isFormOpen ? "Back" : "Add vulnerability"}
          </button>
          <table>
            <tr>
              <th>title</th>
              <th>rating</th>
              <th>score</th>
              <th>description</th>
              <th>discovered at</th>
              <th>resolved at</th>
              <th>status</th>
              <th>actions</th>
            </tr>
            {vulnerabilities?.map((vuln, index) => (
              <>
                {/* <p>title: {vuln.title}</p>
            <p>rating: {vuln.rating}</p>
            <p>score: {vuln.score}</p>
            <button onClick={()=>{ handleSelected(vuln);handleDetailsView();}}>Details</button>
            <hr/> */}
                <tr>
                  <td>{vuln.title}</td>
                  <td>{vuln.rating}</td>
                  <td>{vuln.score}</td>
                  <td>{vuln.description}</td>
                  <td>
                    {" "}
                    {dayjs(vuln.discoveredAt).format("YYYY/MM/DD HH:mm")}
                  </td>
                  <td>
                    {" "}
                    {vuln.resolvedAt == null
                      ? "not solved yet"
                      : dayjs(vuln.resolvedAt).format("YYYY/MM/DD HH:mm")}
                  </td>
                  {vuln.status == "Open" ? (
                    <div>
                      <td id="open"> {vuln.status} </td>
                    </div>
                  ) : vuln.status == "In progress" ? (
                    <td id="Inprogress"> {vuln.status} </td>
                  ) : (
                    <td id="Fixed"> {vuln.status} </td>
                  )}
                  {/* {vuln.status} */}
                  <td><button>delete</button></td>
                </tr>
              </>
            ))}
          </table>
        </>
      ) : vulnerabilities.length == 0 ? (
        <>
          <div>{message}</div>
          <button
            onClick={() => {
              handleSelected(null);
              handleFormView();
            }}
          >
            {isFormOpen ? "Back" : "Add vulnerability"}
          </button>
          <p>no vulnerabilities</p>
        </>
      ) : (
        <FadeLoader color="white" />
      )}
    </>
  );
};

export default Vulnerabilities;
