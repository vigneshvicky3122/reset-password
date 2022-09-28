import React from "react";
import { useNavigate } from "react-router-dom";
import { url } from "../App";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";

function Forgot() {
//   let [otp, setOtp] = useState("");

//   useEffect(() => {
//     getData();
//   }, []);

//   let getData = async () => {
//     let rest = await axios.get(`${url}/token`);
//     setOtp(rest.data.token);
//   };
  let navigate = useNavigate();

  let handleSubmit = async (data) => {
    console.log(data);
    let rest = await axios.post(`${url}/forgot`, data);
    if (rest.data.statusCode === 200) {
      window.localStorage.setItem("app-token", rest.data.token);
      window.alert(rest.data.message);
      navigate("/user");
    } 
    if (rest.data.statusCode === 404) {
      window.alert(rest.data.message);
      navigate("/sign-up");
    }
    else {
      window.alert(rest.data.message);
    }
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirm_password: "",
//       verify: "",
    },
    validationSchema: yup.object({
      email: yup.string().email("Enter a valid email").required("* Required"),
      password: yup
        .string()
        .max(8, "Min & Max character allowed is 2-8")
        .min(5, "Enter a secure password")
        .required("* Required"),
      confirm_password: yup
        .string()
        .max(8, "Min & Max character allowed is 2-8")
        .min(5, "Enter a secure password")
        .required("* Required"),
//       verify: yup.string().max(6).min(4).required("*enter the below token"),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });
  return (
    <>
      <div>
        <h4 style={{ color: "black" }}>
          <strong>Create a New Password</strong>
        </h4>
        <form onLoad={getData} onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className="form-control"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div style={{ color: "red" }}>{formik.errors.email}</div>
            ) : null}
          </div>

          <div className="form-group">
            <label htmlFor="name">New Password</label>
            <input
              id="password"
              name="password"
              type="text"
              className="form-control"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div style={{ color: "red" }}>{formik.errors.password}</div>
            ) : null}
          </div>

          <div className="form-group">
            <label htmlFor="name">Confirm Password</label>
            <input
              id="confirm_password"
              name="confirm_password"
              type="text"
              className="form-control"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirm_password}
            />
            {formik.touched.confirm_password &&
            formik.errors.confirm_password ? (
              <div style={{ color: "red" }}>
                {formik.errors.confirm_password}
              </div>
            ) : null}
          </div>

//           <div className="form-group">
//             <label htmlFor="name">Verification</label>
//             <input
//               id="verify"
//               name="verify"
//               type="text"
//               className="form-control"
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               value={formik.values.verify}
//             />
//             {formik.touched.verify && formik.errors.verify ? (
//               <div style={{ color: "red" }}>{formik.errors.verify}</div>
//             ) : null}
//           </div>

//           <div className="form-group">
//             <label htmlFor="disabledTextInput">token</label>
//             <input
//               type="text"
//               id="disabledTextInput"
//               className="form-control"
//               value={otp}
//               disabled
//             />
//             <button type="button" onClick={getData}>
//               <i className="glyphicon glyphicon-refresh"></i>
//             </button>
//           </div>

          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Forgot;
