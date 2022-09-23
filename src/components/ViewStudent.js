import React,{useState, useEffect}  from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import {useNavigate} from 'react-router-dom';
import {url} from '../App'
import axios from 'axios';

function ViewStudent() { 
  let navigate = useNavigate();
  
  let [data,setData] = useState([]);

    useEffect(()=>{
        getData()
    },[]) 

    let getData = async ()=>{
       let res1 = await axios.get(`${url}/user`)
       setData(res1.data.users)
    }

    let handleDelete = async(i)=>{

      let res = await axios.delete(`${`${url}/delete-user/${i}`}`)
      
    if (res.data.statusCode>200){
      window.alert(res.data.message)
   
    } 
  else{
    window.alert(res.data.message)
    await getData()
  }}

  return <>
    <div>
<Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Password</th>
          <th>Mobile</th>
          <th>Batch</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {
            data.map((e,i)=>{
                return <tr key={e._id}>
                    <td>{i+1}</td>
                    <td>{e.name}</td>
                    <td>{e.email}</td>
                    <td>{e.password}</td>
                    <td>{e.mobile}</td>
                    <td>{e.batch}</td>
                    <td>
                        <Button variant="primary" onClick={()=>navigate(`/reset/${e._id}`)}>Edit</Button>
                        &nbsp;&nbsp;
                        <Button variant="danger" onClick={()=>handleDelete(e._id)}>Delete</Button>
                    </td>
                </tr>
            })
        }
      </tbody>
    </Table>                                         
</div>
  </>
}

export default ViewStudent