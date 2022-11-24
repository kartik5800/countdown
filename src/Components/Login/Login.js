import React, { useEffect } from 'react'
import * as yup from "yup";
import { Formik, useFormik } from "formik";
import { useHistory } from "react-router-dom";
import './Login.css'


export const Login = () => {

    const history = useHistory();
    let schema = yup.object().shape({
        email: yup.string().email().required("please enter email addersh"),
        password: yup.string().min(7 , "password must be 7 charecter").max(15 , "password not be more then  15 charecter").required("please enter your password"),
    });


    useEffect(() => {

        let olddata = localStorage.getItem('formdata');
        console.log("login page", olddata);
    }, [])

    const formik = useFormik({
        initialValues: {
          email: "",
          password: "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
          history.push("/home");
          localStorage.setItem("user", "123");

        },
      });

    const { errors, handleChange, handleSubmit, handleBlur, touched, values } = formik;
    return (
        <>
            <div className="container vh-100 vw-100">
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-12 bgimage ">
                        <div className=" col d-flex position_absolute ">
                            <Formik values={formik}>
                                <form onSubmit={handleSubmit} className='bg-form' >
                                    <h1 className='login'>LOGIN</h1>
                                    <input
                                        className='form-control'
                                        name="email"
                                        placeholder="Email"
                                        type="email"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.name}
                                    />
                                    <p>{errors.email && touched.email ? errors.email : ""}</p>
                                    <input
                                        className='form-control'
                                        name="password"
                                        placeholder="Password"
                                        type="password"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.password}
                                    />
                                    <p>
                                        {errors.password && touched.password ? errors.password : ""}
                                    </p>
                                    <div className='d-flex justify-content-center align-items-center'>
                                        <button className='btn btn-primary' type="submit">Login</button>
                                    </div>
                                </form>
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
