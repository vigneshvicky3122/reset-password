import React from 'react'
import {useNavigate} from 'react-router-dom';
import {url} from '../App'
import axios from 'axios'
import {useFormik} from 'formik';
import * as yup from 'yup'

function Login() {
  let navigate = useNavigate();

    let handleSubmit = async (data)=>{
   
      let res = await axios.post(`${url}/login`,data);
      if(res.data.statusCode===200){
        window.alert(res.data.message)
        navigate('/Dashboard')
  }
        if(res.data.statusCode===404){
            window.alert(res.data.message)
            navigate('/sign-up')
            }
        else{
                window.alert(res.data.message) 
            }
    }

  const formik = useFormik({
    initialValues:{
      email:"",
      password:"",
      confirm_password:""
    },
    validationSchema: yup.object({
      
      email:yup.string().email('Enter a valid email').required('* Required'),
      password:yup.string().max(8,'Min & Max character allowed is 2-8').min(5,'Enter a secure password').required('* Required'),
      confirm_password:yup.string().max(8,'Min & Max character allowed is 2-8').min(5,'Enter a secure password').required('* Required'),
      
    }),
    onSubmit:values=>{
      handleSubmit(values)
    }
  })
  return <>
    <div>
      <h4 style={{'color': 'black'}}><strong>Login</strong></h4>
      <form onSubmit={formik.handleSubmit}>
        

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
          <label htmlFor='name'>Confirm Password</label>
          <input
            id='confirm_password'
            name='confirm_password'
            type='text'
            className='form-control'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirm_password}
          />
          {formik.touched.confirm_password && formik.errors.confirm_password?(<div style={{"color":"red"}}>{formik.errors.confirm_password}</div>):null}
        </div>

        <div className="form-group">
            <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  </>
}

export default Login