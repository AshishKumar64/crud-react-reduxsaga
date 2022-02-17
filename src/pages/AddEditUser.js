import FormComponent from './FormComponent';
import { MDBBtn, MDBInput, MDBValidation } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createUserStart, updateUserStart } from '../redux/actions';

 const initialState = {
  name: "",
  email: "",
  phone: "",
  address: "",
}
const AddEditUser = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch();
  const {id} = useParams();
  const { users } = useSelector((state) => state.data); 

  const [formValue, setFormValue] = useState(initialState);
  const [editMode, setEditMode] = useState(false);
  const {name, email, phone, address} = formValue;
  

  useEffect(() => {
    if(id){
      setEditMode(true);
      const user = users.find((user) => user.id === Number(id));
      // console.log(user);
      setFormValue({...user});
    }
    else{
      setEditMode(false);
      setFormValue({...initialState});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && phone && address) {
      if (!editMode) {
        dispatch(createUserStart(formValue));
        toast.success("User Added Successfully");
      } else {
        dispatch(updateUserStart({id, formValue}));
        setEditMode(false);
        toast.success("User Updated Successfully");
      }
      setTimeout(() => navigate("/"), 500);
    }
  }

  const onInputChange= (e) => {
    let {name, value} = e.target;
    setFormValue({...formValue, [name]: value})
  }
  return(
      // <MDBValidation className='row g-2' style={{marginTop: "30px"}} noValidate onSubmit={handleSubmit}>
      //   <p className='fs-2 fw-bold' style={{textAlign: "center"}}>{!editMode ? "Add User Details" : "Update User Details"}</p>
      //   <div style={{margin: "auto", padding: "15px", maxWidth: "400px", alignContent: "center"}}>
      //     <MDBInput required value={name || ""} type="text" name='name' onChange={onInputChange} label='Name' validation='Please enter name' invalid/><br />
      //     <MDBInput required value={email || ""} type="email" name='email' onChange={onInputChange} label='Email Id' validation='Please enter valid email id' invalid/><br />
      //     <MDBInput required value={phone || ""} type="number" name='phone' onChange={onInputChange} label='Phone' validation='Please enter valid phone number' invalid max="9999999999" min="1000000000"/><br />
      //     <MDBInput required value={address || ""} type="text" name='address' onChange={onInputChange} label='Address' validation='Please enter address' invalid/><br />
      //   </div>
      //   <div className='d-flex justify-content-center' style={{alignContent: "center"}}>
      //     <MDBBtn style={{marginRight: "12px"}} type='submit' color='secondary'>{!editMode? "Add" : "Update"}</MDBBtn>
      //     <MDBBtn onClick={() => navigate('/')} color='danger'>Go back</MDBBtn>
      //   </div>
      // </MDBValidation>
      <FormComponent/>
  );
};

export default AddEditUser;
