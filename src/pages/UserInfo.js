import { MDBBtn } from "mdb-react-ui-kit";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const UserInfo = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { users } = useSelector((state) => state.data);
  const user = users.find((user) => user.id === Number(id));
  return (
    <div style={{ marginTop: "100px" }}>
      <div
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "450px",
          alignContent: "center",
          alignItems: "center",
        }}
        className="row"
      >
        
        <p className="col-md-12 fs-3" style={{ textAlign: "center" }}>
          User Details
        </p>
        <hr />
        <p className="col-md-6 fw-bold">ID:</p>
        <p className="col-md-6">{user.id}</p>

        <p className="col-md-6 fw-bold">Name:</p>
        <p className="col-md-6">{user.name}</p>

        <p className="col-md-6 fw-bold">Email Id:</p>
        <p className="col-md-6">{user.email}</p>

        <p className="col-md-6 fw-bold">Phone:</p>
        <p className="col-md-6">{user.phone}</p>

        <p className="col-md-6 fw-bold">Address:</p>
        <p className="col-md-6">{user.address}</p>

        <MDBBtn
          onClick={() => navigate("/")}
          color="danger"
          style={{ maxWidth: "200px", margin: "auto" }}
        >
          Go back
        </MDBBtn>
      </div>
    </div>
  );
};

export default UserInfo;
