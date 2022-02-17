import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { MDBValidation, MDBBtn, MDBInput } from "mdb-react-ui-kit";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { createUserStart, updateUserStart } from "../redux/actions";
import { toast } from "react-toastify";
import { TextField } from "@mui/material";
import Error from "../components/sharedComponents/Error";

const initialState = {
  name: "",
  email: "",
  phone: "",
  address: "",
};

const FormComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [editMode, setEditMode] = useState(false);
  const { users } = useSelector((state) => state.data);
  const [formValue, setFormValue] = useState(initialState);
  const [isFormSubmitted, setIsFormSubmitted] = useState(null)

  const phoneRegex = RegExp(
    /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
  );
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Please enter the name"),
    email: Yup.string()
      .email("Please enter valid email id")
      .required("Please enter email id"),
    phone:  Yup.string()
    .required("Please enter phone number")
    .min(10, "Phone number is too short")
    .max(10, "Phone number is too long")
    .matches(phoneRegex, 'Phone number is not valid')
    ,
    address: Yup.string().required("Please enter address of user"),
  });

  useEffect(() => {
    let isMounted = true
    if (id) {
      if(isMounted) {updateUser()};
      
    } else {
      if(isMounted) {addUser()};
    }
    
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
   
  function addUser() {
    setEditMode(false);
    setFormValue(initialState);
  }

  function updateUser() {
    setEditMode(true);
    const user = users.find((user) => user.id === Number(id));
    setFormValue(user);
  }



  useEffect(()=>{
    if(isFormSubmitted){
      navigate('/')
      if(isFormSubmitted === "editUser"){
        setEditMode(false)
    }
  }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  },[isFormSubmitted])
  
  return (
    <Formik 
      initialValues={formValue}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={(values, actions) => {
        if (values.name && values.email && values.address && values.phone) {
          if (!editMode) {
            console.log("Inside submit add----",values);
            dispatch(createUserStart(values));
            toast.success("User added successfully");
            setIsFormSubmitted('addUser')
          
          } else {
            console.log("Inside submit function",values);
            dispatch(updateUserStart({ id, ...values}));
            console.log("After Dispatch ------------------>", { id, ...values})
            toast.success("User Updated successfully");
            // navigate('/');
            setIsFormSubmitted('editUser')
          }
        }
      }}
    >
     
      {(formikProps) => {
        return (
          <form onSubmit={formikProps.handleSubmit}>
            <p className="fs-2 fw-bold" style={{ textAlign: "center" }}>
              {!editMode ? "Add User Details" : "Update User Details"}
            </p>
            <div
              style={{
                margin: "auto",
                padding: "15px",
                maxWidth: "300px",
                alignContent: "center",
              }}
            >
              <TextField
                // required
                value={formikProps.values.name||''}
                type={"text"}
                name="name"
                label="Name"
                error={
                  formikProps.touched["name"] && formikProps.errors["name"]
                }
                onChange={formikProps.handleChange}
                variant="outlined"
                size="small"
                fullWidth
              />
              {formikProps.errors.name && (
                <Error error={formikProps.errors.name} />
              )}

              <TextField
                // required
                value={formikProps.values.email||''}
                type={"email"}
                name="email"
                label="Email"
                error={
                  formikProps.touched["email"] && formikProps.errors["email"]
                }
                onChange={formikProps.handleChange}
                variant="outlined"
                size="small"
                margin="dense"
                fullWidth
              />
              {formikProps.errors.email && (
                <Error error={formikProps.errors.email} />
              )}

              <TextField
                // required
                value={formikProps.values.phone||''}
                type={"number"}
                name="phone"
                label="Phone"
                error={
                  formikProps.touched["phone"] && formikProps.errors["phone"]
                }
                onChange={formikProps.handleChange}
                variant="outlined"
                size="small"
                margin="dense"
                fullWidth
              />
              {formikProps.errors.phone && (
                <Error error={formikProps.errors.phone} />
              )}

              <TextField
                // required
                value={formikProps.values.address||''}
                type={"text"}
                name="address"
                label="Address"
                error={
                  formikProps.touched["address"] &&
                  formikProps.errors["address"]
                }
                onChange={formikProps.handleChange}
                variant="outlined"
                size="small"
                margin="dense"
                fullWidth
              />
              {formikProps.errors.address && (
                <Error error={formikProps.errors.address} />
              )}
            </div>
            <div
              className="d-flex justify-content-center"
              style={{ alignContent: "center" }}
            >
              <MDBBtn
                style={{ marginRight: "12px" }}
                type="submit"
                color="secondary"
              >
                {!editMode ? "Add" : "Update"}
              </MDBBtn>
              <MDBBtn onClick={() => navigate("/")} color="danger">
                Go back
              </MDBBtn>
            </div>
          </form>
        );
      }}
    </Formik>
  );
};

export default FormComponent;
