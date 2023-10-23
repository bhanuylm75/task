import React from 'react'
import "./docket.css"

const Docket  = ({doc}) => {
  //console.log(doc)
  const {ponumber,Supplier,Description}=doc
  return (
    <div class="box">
        <div class="column">
            <p>{ponumber}</p>
        </div>
        <div class="column">
            <p>{Supplier}</p>
          
        </div>
        <div class="column">
            <p>{Description}</p>
        </div>
    </div>
  )
}

export default Docket 