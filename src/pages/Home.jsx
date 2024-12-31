import React, { useEffect, useState } from 'react'

import './Home.css'

import { useLocation} from 'react-router-dom'


const Home = () => {


  const location = useLocation();  //to access the data 
  

  const employee = location.state?.homeEmployeeParameter;
  console.log(employee);
 
  // Redirect to a default page or show a fallback message if employee data is missing
  if (!employee) {
    return (
      <div>
        <p>Employee details not found.</p>
        
      </div>
    );


  
  }

  return (
   
        <div className='contactDetails'>
            <div className='contact-card'>
                <h3>{employee.name}</h3>
                <div className='contact-info'>
                     <p className='para'><strong>Phone number:</strong> <span>{employee.phoneNumber}</span></p>
                     <p className='para'><strong>Gender:</strong> <span>{employee.gender}</span></p>
                     <p className='para'><strong>Marital status:</strong> <span>{employee.maritalStatus}</span></p>
                     <p className='para'><strong>Age:</strong> <span>{employee.age}</span></p>
                     <p className='para'><strong>Job:</strong> <span>{employee.job}</span></p>
                </div>
            </div>
        </div>
   
  )
}

export default Home