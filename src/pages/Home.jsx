import React, { useEffect, useState } from 'react'

import './Home.css'
import axios from 'axios'
import { useParams } from 'react-router-dom'



const Home = () => {

  const {id} =useParams()  // useParams is used to extract employee id directlt from url
  const [employee, setEmployee] =useState(null)  //state to hold employee details

  useEffect(()=>{
   const displayEmployeeDetails = async()=>{
    try {
      console.log(`Fetching details for employee ID: ${id}`);

      const response = await axios.get(`https://crud-demo-nodejs.onrender.com/api/employees`)
      console.log(response.data.data);
      
      if(response.status>=200 && response.status<300){
        setEmployee(response.data.data)
      }else{
         console.log("Failed to fetch employee details");
         
      }
      
    } catch (error) {
      console.log(error);
      
    }
   }

   displayEmployeeDetails()
  },[id])

  if(!employee){
    return <p>Loading employee details...</p>
  }

  return (
   
        <div className='contactDetails'>
            <div className='contact-card'>
                <h3>{employee.name}</h3>
                <div className='contact-info'>
                     <p><strong>Phone number:</strong> <span>{employee.phoneNumber}</span></p>
                     <p><strong>Gender:</strong> <span>{employee.gender}</span></p>
                     <p><strong>Marital status:</strong> <span>{employee.maritalStatus}</span></p>
                     <p><strong>Age:</strong> <span>{employee.age}</span></p>
                     <p><strong>Job:</strong> <span>{employee.job}</span></p>
                </div>
            </div>
        </div>
   
  )
}

export default Home