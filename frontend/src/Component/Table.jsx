import React, { useEffect, useState } from 'react'
import './table.css'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Table = () => {

  const [users , setusers] = useState(null)

  const apidata = async () => {
    const res = await axios.get('http://localhost:3000/getdata')
    console.log('res', res.data)
    setusers(res.data)
  }
  
  useEffect(() => {
    apidata();
  },[]);

  const deleteuser = async (id) =>{
    console.log('id',id)
    const reaponse = await axios.delete(`http://localhost:3000/deleteuser/${id}`)
    apidata();
  }

  return (
    <div>

      <div className='nav'>
        <h2>User Details</h2>
        <a href="/" >form</a>
      </div>

      {users == null ? <h1>Loading... <i className="fa-solid fa-spinner"></i></h1> :

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email Id</th>
              <th>Password</th>
              <th>Birth Date</th>
              <th>Gender</th>
              <th>Subject</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
           {users.map((item)=>{
            return (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.password}</td>
                <td>{item.birthdate}</td>
                <td>{item.gender}</td>
                <td>{item.subject.join(' , ')}</td>
                <td>
                  <button className='editbtn'>
                    <Link className='link' to={`/user/${item._id}`} state={item}>Edit</Link>
                  </button>
                  <button className='deletebtn' onClick={()=>deleteuser(item._id)}>Delete</button>
                </td>
              </tr>
            )
           })}
          </tbody>
        </table>

      }
    </div>
  )
}

export default Table
