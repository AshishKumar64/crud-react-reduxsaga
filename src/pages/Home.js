import {
  MDBBtn,
  MDBIcon,
  MDBSpinner,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBTooltip,
} from "mdb-react-ui-kit";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteUserStart, loadUsersStart } from "../redux/actions";

const Home = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(loadUsersStart());
  }, []);

  useEffect(() => {error && toast.error(error)},[error])

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
      <MDBSpinner style={{marginTop: '250px'}} role="status" color="secondary">
        <span className="visually-hidden">Loading...</span>
      </MDBSpinner>
      </div>
      
    );
  }

  const handleDelete = (userId) => {
    if (window.confirm("Are you sure to delete this user?")) {
      dispatch(deleteUserStart(userId));
      toast.success("User deleted successfully!");
    }
  };
  return (
    <div className="container" style={{ marginTop: "15px", height:'85vh',overflow: 'scroll'}}>
      <MDBTable>
        <MDBTableHead dark style={{position: 'relative'}} >
          <tr style={{position: 'sticky', top: '0', zIndex:'100'}}>
            <th scope="col">No.</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Address</th>
            <th scope="col">Action</th>
          </tr>
        </MDBTableHead>
        {users &&
          users.map((user, index) => (
            <MDBTableBody key={index}>
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.address}</td>
                <td>
                  <MDBBtn
                    className="m-1"
                    tag="a"
                    color="none"
                    onClick={() => handleDelete(user.id)}
                  >
                    <MDBTooltip title="Delete" tag="a">
                      <MDBIcon
                        fas
                        icon="trash"
                        style={{ color: "#dd4b39", marginRight: "20px" }}
                        size="lg"
                      />
                    </MDBTooltip>
                  </MDBBtn>{" "}
                  <Link to={`/editUser/${user.id}`}>
                    <MDBTooltip title="Edit" tag="a">
                      <MDBIcon
                        fas
                        icon="pen"
                        style={{
                          color: "#55acee",
                          marginBottom: "10px",
                          marginRight: "20px",
                        }}
                        size="lg"
                      />
                    </MDBTooltip>
                  </Link>{" "}
                  <Link to={`/userInfo/${user.id}`}>
                    <MDBTooltip title="View" tag="a">
                      <MDBIcon
                        fas
                        icon="eye"
                        style={{
                          color: "#3b5998",
                          marginBottom: "10px",
                          marginRight: "20px",
                        }}
                        size="lg"
                      />
                    </MDBTooltip>
                  </Link>
                </td>
              </tr>
            </MDBTableBody>
          ))}
      </MDBTable>
    </div>
  );
};

export default Home;
