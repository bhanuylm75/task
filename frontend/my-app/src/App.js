import './App.css';
import axios from "axios"
import Docket from './Docket';
import { useEffect,useState,useRef } from 'react';
import React from 'react'

const App = () => {
  const [sup,setsup]=useState()
  const [docket,setdocket]=useState([])
  const [currpo,setcurrpo]=useState("")
  const [allpo,setallpo]=useState()
  const inputRef = useRef(null);
  //console.log(inputRef.current?.value)
  const poinput=useRef(null)
  //console.log(poinput.current?.value)
  const ele=useRef(null)
  const [currsup,setcurrsup]=useState()



  //console.log(currsup.current.value)

  //console.log(currsup)
  //console.log(docket)
  useEffect(()=>{
   
    onsup()
  },[])
  useEffect(()=>{
    onchangesup()
  },[currsup])
  const onsup= async (e)=>{
    const res= await axios.get("http://localhost:3006/sup")
    const {data}=await res
    setsup(data)
    //setcurrsup(inputRef.current?.value)
    //console.log(data)
  }
  const onchangesup= async(e)=>{
    //console.log(e.target.value)
    setcurrsup(inputRef.current?.value)
    //console.log(inputRef.current?.value)
    const endpoint=currsup?currsup:"Bunnings - QLD"
    const res= await axios.get(`http://localhost:3006/${endpoint}`)
    const {data}=await res
    console.log(data)
    setcurrpo(data[0]?.ponumber)
    console.log(data[0]?.ponumber)
    setallpo(data)


  }
  const onsubmit= async (e)=>{
    e.preventDefault()
    const num=currpo?.slice(5)
    const endpoint=currpo?num:"M00002"
    const res= await axios.get(`http://localhost:3006/all/${endpoint}`)
    const {data}=await res
   
    const neww=[...docket,...data]
    setdocket(neww)
    //console.log(data)

  }
  return (
    <div className='con'>
      <div class="container">
    <h2>create docket</h2>
    <form onSubmit={onsubmit}>
        <div class="form-group">
            <label for="name">Name:</label>
            <input  ref={ele} type="text" id="name" name="name" />
        </div>
        <div class="form-group">
            <label for="starttime">Start Time:</label>
            <input type="datetime-local" id="starttime" name="starttime" />
        </div>
        <div class="form-group">
            <label for="endtime">End Time:</label>
            <input type="datetime-local" id="endtime" name="endtime"/>
        </div>
        <div class="form-group">
            <label for="hours">Number of Hours Worked:</label>
            <input type="number" id="hours" name="hours" />
        </div>
        <div class="form-group">
            <label for="rate">Rate Per Hour:</label>
            <input type="number" id="rate" name="rate"/>
        </div>
        <div class="form-group">
        <label for="cars">Supplier</label>
          <select  value={currsup}  ref={inputRef} onChange={onchangesup}  >
          {sup?.map((val)=>(
              <option    value={val?.Supplier}>{val?.Supplier}</option>

            ))}
          </select>
            
        </div>
        <div class="form-group">
            <label for="ponumber">Purchase Order:</label>
            <select  ref={poinput} onChange={()=>{setcurrpo(poinput.current?.value)}}>
          {allpo?.map((val)=>(
              <option   value={val?.ponumber}>{val?.ponumber}</option>

            ))}
          </select>
            
        </div>
        <button type="submit">Submit</button>
    </form>
</div>
<div className='doc'>
<div class="box">
        <div class="column">
            <h3>Po Number</h3>
        </div>
        <div class="column">
            <h3>Supplier</h3>
          
        </div>
        <div class="column">
            <h3>Description</h3>
        </div>
    </div>
    {docket?.map((doc)=>(
      <Docket doc={doc}/>
    ))}
    

    </div>

    </div>



  )
}

export default App