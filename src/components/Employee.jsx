import React, { useEffect, useState } from 'react'
import './Employee.css'
// import link for navigation
import { Link } from 'react-router-dom'
import axios from 'axios'


const Employee = () => {

  const [formData, setFormData] =useState({
    name:'',
    phoneNumber: '',
    gender: 'Male',
    maritalStatus: '',
    job: '',
    age: ''
  })

  // state to show list of employees

  const [employee, setEmployee] =useState([])

  const [editMode, setEditMode]=useState(false)  // to set editmode
  const [editId, setEditId]=useState(null)  //to get editid 


  // to get data from input fields
  const handleChange=(e)=>{
    const {name, value} =e.target;
    setFormData((preData)=>({
      ...preData,
      [name]:value,
    }))
  }

  // function to save data
  const handleSubmit=async(e)=>{
    e.preventDefault();
    console.log(formData);
    if(editMode){
      updateDetails(editId,formData)
    }else{
      try{
        const response = await axios.post('https://crud-demo-nodejs.onrender.com/api/create',formData)
        console.log(response.data.data);
        alert("Employee added successfully!!")
        displayEmployeeDetails()
        clearForm()
      }catch(error){
             console.log(error);
             
      }   
    }
    
      
  }


  const clearForm =()=>{
    setFormData({
      name:'',
      phoneNumber:'',
      age:'',
      gender:'Male',
      maritalStatus:'',
      job:'',
    })
  }


// /function to display data

const displayEmployeeDetails = async()=>{
  try {
    const display = await axios.get('https://crud-demo-nodejs.onrender.com/api/employees')
    console.log(display.data);
      if(display.status>=200 && display.status<300){
         setEmployee(display.data.data)
       }else{
          console.log("Failed");     
       }
    
   } catch (error) {
    console.log(error);   
   }
  
}


// function to delete card

const deleteCard =async(id)=>{
  try {
    const deleteData = await axios.delete(`https://crud-demo-nodejs.onrender.com/api/employees/${id}`)
    if(deleteData.status>=200 && deleteData.status<300){
      alert("Are you sure you want to delete this employee?")
      // update list
      setEmployee((preEmployee)=>preEmployee.filter((emp)=>emp._id!==id))
    }else{
      console.log("Failed to delete employee");
      
    }
  } catch (error) {
    console.log(error);
    
  }
  
}


// function to edit data

const updateDetails =async(id,updateData)=>{
 try {
  const edit = await axios.put(`https://crud-demo-nodejs.onrender.com/api/employees/${id}`,updateData)
  console.log(edit.data.data);
  if(edit.status>=200 && edit.status<300){
    alert(edit.data.message)
    displayEmployeeDetails()
    clearForm()
  }
  
 } catch (error) {
  console.log(error);
  
 }
}

// editID
const fillDataToForm =(id)=>{
  const employeeId = employee.find((findId)=>findId._id ==id)
  console.log(employeeId);
  
  if(employeeId){
    setFormData({
      name:employeeId.name,
      phoneNumber:employeeId.phoneNumber,
      age:employeeId.age,
      gender:employeeId.gender,
      maritalStatus:employeeId.maritalStatus,
      job:employeeId.job,
    })
  }
  setEditMode(true)
  setEditId(id)

}



useEffect(()=>{
  displayEmployeeDetails()
},[])
  





  return (

    <div className='main'>
        {/* heading */}
        <div className='head'>
        <h1>Employee Management system</h1>
        </div>
        
       <div className='home'>
         
         {/* container to enter details */}
          <div className='container mt-5'>
          
             {/* forms */}
             <form action="" className='form'>
                  <label htmlFor="">Full Name</label>
                  <input type="text" placeholder='Enter your name' name="name" value={formData.name} onChange={handleChange} />
  
                  <label htmlFor="">Phone Number</label>
                  <input type="number" placeholder='Enter your phone number'  name="phoneNumber" value={formData.phoneNumber} onChange={handleChange}/>
  
                  <label htmlFor="">Gender</label>
                  <div className='gender'>
                       <label htmlFor=""><input type="radio" name='gender' value="Male" checked={formData.gender==='Male'} onChange={handleChange} defaultChecked/>Male</label>
                      <label htmlFor=""><input type="radio" name='gender' value="female" checked={formData.gender==='female'} onChange={handleChange}  />Female</label>
                      <label htmlFor=""><input type="radio" name='gender' value="others" checked={formData.gender==='others'} onChange={handleChange} />Other</label> 
                  </div>
  
                  <label htmlFor="maritalStatus" className="status">Marital status</label>
                      <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} id="">
                          <option value="">Select</option>
                          <option value="married">Married</option>
                          <option value="unmarried">Unmarried</option>
                      </select>
                  
                  <label htmlFor="">Age</label>
                  <input type="number" placeholder='Enter your age' name="age" value={formData.age} onChange={handleChange}/>
                  
                  <label htmlFor="">Job</label>
                  <input type="text" placeholder='Enter your job' name='job' value={formData.job} onChange={handleChange} />
  
                  
                  <div className='btn1'>
                    
                    <button className='btnSub' type='submit' onClick={handleSubmit}>Submit</button>
                    <button className='btnCan' onClick={clearForm}>Cancel</button>
                    
                  </div>
              </form>
           
         </div>
  
        <div className='details'>

          {
            employee.length>0?(
              <div  className='allDetails'>
                {
                  employee.map((emp)=>(
                 <div key={emp._id} className='contact'>
                
                    <Link to={{ pathname: `/home/${emp._id}`}} state={{ homeEmployeeParameter: emp }} className='contacts'>
                    <p>Name: {emp.name}</p>
                    <p>Phone number: {emp.phoneNumber}</p>
                </Link>
   
                <div className='contact-actions'>
                <button className='btn editBtn' onClick={()=>fillDataToForm(emp._id)}><i class="fas fa-edit"></i></button>
                <button className='btn deleteBtn ms-3' onClick={()=>deleteCard(emp._id)}><i class="fa-solid fa-trash"></i></button>
                </div>
                 </div>
                  ))
                }
             
            </div>
            )
            :
            <p>No Employees found.</p>
          }
             
  
            
  
        </div>
    </div>


    </div>

  )
}

export default Employee