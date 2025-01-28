import React, { useEffect, useState } from 'react'
import './Form.css'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Form = () => {

  const data = useLocation();
  const user = data.state

  const emailpattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const [subject , setSubject] = useState([])
  const [error , setError] = useState()

  const route = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setValue,
    reset
  } = useForm();

  useEffect(() => {

    if (user) {
      setValue('name', user.name)
      setValue('email', user.email)
      setValue('password', user.password)
      setValue('birthdate', user.birthdate)
      setValue('gender', user.gender)
      setSubject(user.subject || [])
      console.log(user)
    }

  }, [user, setValue]);
  

 // checkbox

 const check = (e) => {
  const value = e.target.value
  const check = e.target.checked
  console.log('check',value , check)
  

  if(check){
    setSubject([ ...subject,value])
  }else{
    setSubject([...subject.filter((e)=> { e !== value })])
  }

}

  const onsubmit = async (data) => {
    console.log('data', data)


    let senddata = {'subject':subject ,...data}
    console.log('post',senddata)

    if (!user) {
      const response = await axios.post('http://localhost:3000/form', senddata)
      route('/table')
      return console.log(response.data)
    } else {
      let updatedata = {'id':user._id , ...senddata}
      const response = await axios.put(`http://localhost:3000/updateuser/${updatedata.id}`, updatedata)
      route('/table')
      return console.log(response.data)
    }
  }

  const clear = () => {
    reset();
  }

  const emailcheck = async (e) =>{
    const email =  e.target.value
      console.log('email',email)

      if(emailpattern.test(email) == true){
         const res = await axios.get(`http://localhost:3000/getemail/${email}`)
         console.log('res', res.data)
         if(res.data.exist === true){
          setError( " Email is already exists" )
         }else{
          setError( "" )
         } 
      }
  
    
  }

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(onsubmit)}>
          <h2><i>Detail Form</i></h2>

          <label>Name : </label>
          <input {...register('name', { required: { value: true, message: 'Name is required' } })} type="text" placeholder='enter your name' />

          <div className="error">{errors.name && errors.name.message }</div><br />

          <label>Email Id : </label>
          <input {...register('email', { required: { value: true, message: 'Email is required' } })} type="email" placeholder='enter your email' onChange={emailcheck} />

          <div className="error">{errors.email && errors.email.message || error}</div><br />

          <label>Password : </label>
          <input  {...register('password', { required: { value: true, message: "Password is Required" }, minLength: { value: 4, message: "Minimum 4 character required" } })} type="text" placeholder='enter your password' />

          <div className="error">{errors.password && errors.password.message}</div><br />

          <label>Birth Date : </label>
          <input  {...register('birthdate', { required: { value: true, message: 'Birth Date is required' } })} type="date" />

          <div className="error">{errors.birthdate && errors.birthdate.message}</div><br />

          <label>Gender :</label>&nbsp;
          <select {...register('gender',{ required:{value:true , message:'Gender is required'}})}>
            <option disabled selected >select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select> 

          <div className="error">{errors.gender && errors.gender.message}</div><br />

          <label>Subject : </label><br />
          <input type="checkbox" style={{width:20}} value="javascript" onChange={check} 
           checked={subject.includes("javascript")} />Javascript
          <input type="checkbox" style={{width:20}} value="python" onChange={check} checked={subject.includes("python")} />Python
          <input type="checkbox" style={{width:20}} value="react js" onChange={check} checked={subject.includes("react js")} />React Js

          <br /><br />

          {!user ? <button className='button' disabled={isSubmitting}>Submit</button> :
            <button className='button' disabled={isSubmitting}>Update</button>}

          &nbsp;
          {!user ? <button className='button' onClick={clear}>Clear</button> : ''}
          &nbsp;

          <Link className='button' to={'/table'}>Table</Link>

        </form>
      </div>
    </>
  )
}

export default Form
