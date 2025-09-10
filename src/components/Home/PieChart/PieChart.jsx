import React from 'react'
import Chart from "react-apexcharts"
import { FadeLoader } from 'react-spinners'


const PieChart = ({vulnSeverty}) => {
  return (
    <>
            {vulnSeverty.length? 
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
      : <FadeLoader />}
    </>
  )
}

export default PieChart