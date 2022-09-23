import React from 'react'
import {useNavigate} from 'react-router-dom';
import {url} from '../App'
import axios from 'axios'
import {useFormik} from 'formik';
import * as yup from 'yup'

function CreateStudent() {
  let navigate = useNavigate();

    let handleSubmit = async (data)=>{
   
      let res = await axios.post(`${url}/sign-up`,data);
      if(res.data.statusCode===401){
        window.alert(res.data.message)
        navigate('/login')
      }
          if(res.data.statusCode===200){
            window.alert(res.data.message)
            
            navigate('/user')
          }
          else{
            window.alert(res.data.message)
          }
   }
  const formik = useFormik({
    initialValues:{
      name:"",
      email:"",
      password:"",
      mobile:"",
      batch:""
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
      <h4 style={{'color': 'black'}}><strong>REGISTER HERE!!!</strong></h4>
      <form onSubmit={formik.handleSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            id='name'
            name='name'
            type='text'
            className='form-control'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
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
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email?(<div style={{"color":"red"}}>{formik.errors.email}</div>):null}
        </div>

        <div className='form-group'>
          <label htmlFor='name'>Password</label>
          <input
            id='password'
            name='password'
            type='text'
            className='form-control'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
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
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.mobile}
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
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.batch}
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

export default CreateStudent