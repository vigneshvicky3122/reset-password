import React,{useState, useEffect}  from 'react';
import {useNavigate,useParams} from 'react-router-dom';
import {url} from '../App'
import axios from 'axios';
import {useFormik} from 'formik';
import * as yup from 'yup'

function EditStudent() {
  let params = useParams();

  let [name,setName] = useState("");
  let [email,setEmail] = useState("");
  let [password,setPassword] = useState("");
  let [mobile,setMobile] = useState("");
  let [batch,setBatch] = useState("");

  useEffect(()=>{
    getData()
  },[])

  let getData = async ()=>{
    let res = await axios.get(`${`${url}/user`}/${params.id}`)
    setName(res.data.users[0].name)
    setEmail(res.data.users[0].email)
    setPassword(res.data.users[0].password)
    setMobile(res.data.users[0].mobile)
    setBatch(res.data.users[0].batch)
  }
 

  let navigate = useNavigate();


  let handleSubmit = async (data)=>{

      let res = await axios.put(`${`${url}/reset`}/${params.id}`,data)
      
      if(res.data.statusCode>200){
        window.alert(res.data.message)
  
      
      }else{
        window.alert(res.data.message)
        navigate('/user')
      }}
  const formik = useFormik({
    initialValues:{
      name:"",
      email:"",
      password:"",
      mobile:"",
      batch:"",
    },
    validationSchema: yup.object({
      name:yup.string().required('* Required'),
      email:yup.string().email('Enter a valid email').required('* Required'),
      password:yup.string().max(8,'Min & Max character allowed is 2-8').min(5,'Enter a secure password').required('* Required'),
      mobile:yup.string().matches(/^\d{10}$/, "Enter a valid Mobile number").required('* Required'),
      batch:yup.string().max(10,'Maximum character allowed is 10').min(2,'Minimum Character Should be 2').required('* Required')
    }),
    onSubmit:values=>{
      handleSubmit(values)
    }

  })
  return <>
  <div>
      <h4 style={{'color': 'black'}}><strong>Edit Student Details</strong></h4>
      <form onSubmit={formik.handleSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            id='name'
            name='name'
            type='text'
            className='form-control'
            onChange={(e)=>setName(e.target.value)}
            onBlur={formik.handleChange}
            value={name}
          />
          {formik.touched.name && formik.errors.name?(<div style={{"color":"red"}}>{formik.errors.name}</div>):null}
        </div>
        <div className='form-group'>
          <label htmlFor='name'>Email</label>
          <input
            id='email'
            name='email'
            type='email'
            className='form-control'
            onChange={(e)=>setEmail(e.target.value)}
            onBlur={formik.handleChange}
            value={email}
          />
          {formik.touched.email && formik.errors.email?(<div style={{"color":"red"}}>{formik.errors.email}</div>):null}
        </div>

        <div className='form-group'>
          <label htmlFor='name'>Password</label>
          <input
            id='password'
            name='password'
            type='password'
            className='form-control'
            onChange={(e)=>setPassword(e.target.value)}
            onBlur={formik.handleChange}
            value={password}
          />
          {formik.touched.password && formik.errors.password?(<div style={{"color":"red"}}>{formik.errors.password}</div>):null}
        </div>

        <div className='form-group'>
          <label htmlFor='name'>Mobile Number</label>
          <input
            id='mobile'
            name='mobile'
            type='text'
            className='form-control'

            onChange={(e)=>setMobile(e.target.value)}
            onBlur={formik.handleChange}
            value={mobile}
          />
          {formik.touched.mobile && formik.errors.mobile?(<div style={{"color":"red"}}>{formik.errors.mobile}</div>):null}
        </div>

        <div className='form-group'>
          <label htmlFor='name'>Batch code</label>
          <input
            id='batch'
            name='batch'
            type='text'
            className='form-control'

            onChange={(e)=>setBatch(e.target.value)}
            onBlur={formik.handleChange}
            value={batch}
          />
          {formik.touched.batch && formik.errors.batch?(<div style={{"color":"red"}}>{formik.errors.batch}</div>):null}
        </div>

        <div className="form-group">
            <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  </>
}



export default EditStudent