import React, { useEffect, useState } from "react";
import { details } from "../../services/systemService";
import { index } from "../../services/vulnService";
import { assetIndex } from "../../services/assetService";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Chart from "react-apexcharts"
import { FadeLoader } from "react-spinners";
import PieChart from "./PieChart/PieChart";
import Fixed from "./Fixed/Fixed";

const Home = ({ userId }) => {
  console.log(userId);
  const [system, setSystem] = useState({});

  const [vulnerabilities, setVulnerabilities] = useState([]);
  const [assets, setAssets] = useState([])
  const [vulnSeverty, setVulnSeverity] = useState(
[5, 3, 7, 8])

  async function getAllVulns() {
    try {
      const allVuln = await index();
      console.log(allVuln);
      setVulnerabilities(allVuln);
    } catch (err) {
      console.log(err);
    }
  }

  async function getAssets() {
    try {
      const res = await assetIndex(userId)
      setAssets(res)
    } catch (err) {
      return err
    }
  }

  console.log(assets)

  async function getSystemDetails() {
    try {
      const res = await details(userId);
      // if(res.status == 200){
      //     setSystem(res)
      // }
      setSystem(res);
      console.log(res)
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
  getAssets();getSystemDetails();
  },[userId]);

  
  console.log(system.lowSeverityVulns);
  useEffect(()=>{setVulnSeverity([system.lowSeverityVulns, system.mediumSeverityVulns, system.highSeverityVulns, system.criticalSeverityVulns])},[system])
  console.log(vulnSeverty)
  return (
    <>
      <h1>Pie chart</h1>
      <Fixed system={system}/>
    
      {vulnSeverty.length>0 && < PieChart vulnSeverty={vulnSeverty}/>}
      {/* {vulnSeverty.length? 
          <>
          <p>hi</p>
          <Chart 
          type="pie"
          width={700}
         height={350} 
         series={[vulnSeverty[0],vulnSeverty[1],vulnSeverty[2],vulnSeverty[3]]} 
         options={{
            title:{text: "Overall Vulnerabilities per severity percentage"},
            noData :{text: "Empty Data"},
            colors:["#F6DA63", "#EB8242", "#DA2D2D", "#9D0B0B"] ,
            labels:['low severity', 'medium severity', 'high severity', 'critical severity']
          } }>

          </Chart>
          </>
      : <FadeLoader />} */}
      

      {assets?.map((asset,index)=>(
      <>{asset.name}<br/></>
      ))}
      <h1>HOME</h1>
       
<BarChart
        width={500}
        height={300}
        data={assets}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        // layout="vertical"
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" type="category" fontSize={10} stroke="black"/>
        <YAxis stroke="black"/>
        <Tooltip />
        <Legend />
        <Bar dataKey="vulnerabilities.low" stackId="a" fill="#F6DA63" maxBarSize={30}/>
        <Bar dataKey="vulnerabilities.medium" stackId="a" fill="#EB8242" maxBarSize={30}/>
        <Bar dataKey="vulnerabilities.high" stackId="a" fill="#DA2D2D" maxBarSize={30} />
        <Bar dataKey="vulnerabilities.critical" stackId="a" fill="#9D0B0B" maxBarSize={30} />
      </BarChart>

       {/* <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer> */}
      <BarChart
        width={500}
        height={300}
        data={assets}
        margin={{
          top: 2,
          right: 30,
          left: 60,
          bottom: -20,
        }}
        layout="vertical"
      >
        <CartesianGrid strokeDasharray="3 3" stroke="none"/>
        <XAxis  type="number" stroke="black"/>
        <YAxis dataKey="name" type="category" stroke="black" fontSize={15}/>
        <Tooltip />
        <Legend />
        <Bar dataKey="vulnerabilities.low" stackId="a" fill="#F6DA63" maxBarSize={25}/>
        <Bar dataKey="vulnerabilities.medium" stackId="a" fill="#EB8242" maxBarSize={25}/>
        <Bar dataKey="vulnerabilities.high" stackId="a" fill="#DA2D2D" maxBarSize={25} />
        <Bar dataKey="vulnerabilities.critical" stackId="a" fill="#9D0B0B" maxBarSize={25} />
      </BarChart>
      {/* </ResponsiveContainer>
      </div>
       */}

    </>
  );
};

export default Home;
