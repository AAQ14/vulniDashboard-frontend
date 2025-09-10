import React from 'react'

const Fixed = ({system}) => {
  return (
    <>
      {system?
        <p>{system.fixedVulns}</p> 
      : null}
    </>
  )
}

export default Fixed