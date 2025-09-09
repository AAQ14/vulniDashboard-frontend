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
import{PieChart, Pie}from "recharts"

const Home = ({ userId }) => {
  console.log(userId);
  const [system, setSystem] = useState({});

  const [vulnerabilities, setVulnerabilities] = useState([]);
  const [assets, setAssets] = useState([])

  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  const secondData = [
    {
      name: "A",
      value: 5,
    },
    {
      name: "B",
      value: 10,
    },
    {
      name: "C",
      value: 15,
    },
    {
      name: "D",
      value: 20,
    },
  ];

  const thirdData = [
  { name: 'Group A', value: 400 }, { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 }, { name: 'Group D', value: 200 },
]

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
      const res = await assetIndex()
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
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
  getAssets();
  },[]);

  console.log(system);
  return (
    <>
      {assets.map((asset,index)=>(
      <>{asset.name}<br/></>
      ))}
      <h1>HOME</h1>
      {console.log(data)}
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        // layout="vertical"
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" type="category" />
        <YAxis  />
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" stackId="a" fill="#8884d8" />
        <Bar dataKey="amt" stackId="a" fill="#82ca9d" />
        <Bar dataKey="uv" fill="#ffc658" />
      </BarChart>

      {/* <BarChart width={500} height={300} data={secondData} layout="vertical">
        <XAxis dataKey="name" type="category" />
        <YAxis dataKey="value" type="number" />
        <Bar dataKey="name" fill="#8884d8" />
        <Tooltip />
      </BarChart> */}
       
<BarChart
        width={500}
        height={300}
        data={assets}
        margin={{
          top: 5,
          right: 20,
          left: 20,
          bottom: 5,
        }}
        // layout="vertical"
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" type="category" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="vulnerabilities.low" stackId="a" fill="#F6DA63" maxBarSize={30}/>
        <Bar dataKey="vulnerabilities.medium" stackId="a" fill="#EB8242" maxBarSize={30}/>
        <Bar dataKey="vulnerabilities.high" stackId="a" fill="#DA2D2D" maxBarSize={30} />
        <Bar dataKey="vulnerabilities.critical" stackId="a" fill="#9D0B0B" maxBarSize={30} />
      </BarChart>

      <BarChart
        width={500}
        height={300}
        data={assets}
        margin={{
          top: 2,
          right: 60,
          left: 60,
          bottom: 3,
        }}
        layout="vertical"
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis  type="number"/>
        <YAxis dataKey="name" type="category"/>
        <Tooltip />
        <Legend />
        <Bar dataKey="vulnerabilities.low" stackId="a" fill="#F6DA63" maxBarSize={30}/>
        <Bar dataKey="vulnerabilities.medium" stackId="a" fill="#EB8242" maxBarSize={30}/>
        <Bar dataKey="vulnerabilities.high" stackId="a" fill="#DA2D2D" maxBarSize={30} />
        <Bar dataKey="vulnerabilities.critical" stackId="a" fill="#9D0B0B" maxBarSize={30} />
      </BarChart>

      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie dataKey="value" 
            data={thirdData} 
            fill="#8884d8" 
            label="name"    
            />
            <text x={400} y={200} textAnchor="middle" dominantBaseline="middle">
    Donut
   </text>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default Home;
