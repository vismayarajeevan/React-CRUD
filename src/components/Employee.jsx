import React, { useEffect, useState } from 'react'
import './Employee.css'
// import link for navigation
import { Link } from 'react-router-dom'
import axios from 'axios'

import CircularProgress from '@mui/material/CircularProgress'; // Import Material-UI CircularProgress

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

  // state to vaidate inputs. Initially set as object beacause we need to validate multiple input fields 

  const [errors, setErrors] =useState({})

  // state to check it contains any error 
  const [formHasErrors, setFormHasErrors] = useState(false);



  // to get data from input fields
  const handleChange=(e)=>{
    const {name, value} =e.target;
    setFormData((preData)=>({
      ...preData,
      [name]:value,
    }))
  }

  // **********function to validate form **********

  const validateForm =()=>{
    // create a temporary object to hold errors
    const newErrors ={}
    
    if(!formData.name.trim()){
      newErrors.name='Name is required!!'   //trim() will remove those spaces, so we can check if the name is not empty (or just spaces).
    }else if(!/^[A-Za-z\s]+$/.test(formData.name)){
      newErrors.name ='Name should only contain letters!!'
    }

    if (!formData.phoneNumber || formData.phoneNumber.length !== 10) {
      newErrors.phoneNumber = 'Enter a valid 10-digit phone number!!';
    }

    
    

    if(!formData.age || formData.age<=0){
      newErrors.age ='Enter a valid age!!'
    }
    if(!formData.maritalStatus.trim()){
      newErrors.maritalStatus ='Marital status is required!!'
    }

    if(!formData.job.trim()){
      newErrors.job ='Job is required!!'
    }else if(!/^[A-Za-z\s]+$/.test(formData.job)){
      newErrors.job ='Job should only contain letters!!'
    }

      // update the error state with newerror object
      setErrors(newErrors)

      // check it contains any error or not
      setFormHasErrors(Object.keys(newErrors).length > 0);

      // check it contains any error by checking the newerror object is empty or not
      // if it is empty , it contains no error . otherwise it contains error

      return Object.keys(newErrors).length ===0;  //returns if no error


  }



  // ***********state for submit loading**********
  const [loadingSubmit , setLoadingSubmit] =useState(false)

  // function to save data

  const handleSubmit=async(e)=>{
    e.preventDefault();

    setLoadingSubmit(true)
    console.log(formData);

    // check validation
    if(!validateForm()){
      setLoadingSubmit(false)
      return
    }
     
    if(editMode){
        
      await updateDetails(editId,formData)
      
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
      finally {
        setLoadingSubmit(false); // Ensure cleanup
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

 
  // ********state for shimmereffect************
const [employeeLoading, setEmployeeLoading] =useState(false)

// /function to display data

const displayEmployeeDetails = async()=>{
  setEmployeeLoading(true)
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

   setEmployeeLoading(false)
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
    setEditMode(false)
  }
  
 } catch (error) {
  console.log(error);
  
 }
 finally {
  // Ensure loadingSubmit is reset regardless of success or error
  setLoadingSubmit(false);
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
          <div  className={`container mt-5 ${formHasErrors ? 'container-error' : 'container'}`}>
          
             {/* forms */}
             <form action="" className='form'>
            
                    <label htmlFor="">Full Name</label>
                    <input type="text" placeholder='Enter your name' name="name" value={formData.name} onChange={handleChange} />
  
                    {/* show validation error message */}
                    {errors.name && <p className="error-message">{errors.name}</p> } 
    
                    <label htmlFor="">Phone Number</label>
                    <input type="number" placeholder='Enter your phone number'  name="phoneNumber" value={formData.phoneNumber} onChange={handleChange}/>
                    
                    {/* show validation error message */}
                    {errors.phoneNumber && <p className="error-message">{errors.phoneNumber}</p> } 
  
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
  
                        {/* show validation error message */}
                    {errors.maritalStatus && <p className="error-message">{errors.maritalStatus}</p> } 
                    
                    <label htmlFor="">Age</label>
                    <input type="number" placeholder='Enter your age' name="age" value={formData.age} onChange={handleChange}/>
  
                    {/* show validation error message */}
                    {errors.age && <p className="error-message">{errors.age}</p> } 
                    
                    <label htmlFor="">Job</label>
                    <input type="text" placeholder='Enter your job' name='job' value={formData.job} onChange={handleChange} />
                    
  
                    {/* show validation error message */}
                    {errors.job && <p className="error-message">{errors.job}</p> } 
                    
                    <div className='btn1'>
                      
                      <button className='btnSub' type='submit' onClick={handleSubmit}>
                        {
                          loadingSubmit?(
                            <CircularProgress size={24} style={{ color: '#fff' }} />
                          ) : (
                            editMode ? "Update" : "Submit"
                          )
                        }
                      </button>
                      <button className='btnCan' onClick={clearForm}>Cancel</button>
                      
                    </div>
               
              </form>
           
         </div>
  
        <div className='details'>
        {employeeLoading ? (
          <div className="allDetails">
            {Array(5)
              .fill()
              .map((_, index) => (
                <div key={index} className="contact shimmer-contact">
                  <div className="shimmer-item" style={{ width: '60%' }}></div>
                  <div className="shimmer-item" style={{ width: '40%' }}></div>
                  <div className="shimmer-item" style={{ width: '50%' }}></div>
                </div>
              ))}
          </div>

        ) :
          
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
            (
            <p>No Employees found.</p>
            )
          }
             
  
            
  
        </div>


    </div>


    </div>

  )
}

export default Employee