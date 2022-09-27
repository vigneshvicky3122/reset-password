import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { url } from "../App";
import axios from "axios";

function ViewStudent() {
  let navigate = useNavigate();

  let [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  let getData = async () => {
    try {
      let rest = await axios.get(`${url}/user`, {
        headers: { authorization: window.localStorage.getItem("app-token") },
      });
      setData(rest.data.users);

      if (rest.data.statusCode === 404) {
        window.alert(rest.data.message);
        navigate("/login");
      }
      if (rest.data.statusCode === 500) {
        window.alert(rest.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  let handleDelete = async (i) => {
    try {
      let rest = await axios.delete(`${`${url}/delete-user/${i}`}`, {
        headers: { authorization: window.localStorage.getItem("app-token") },
      });

      if (rest.data.statusCode === 200) {
        window.alert(rest.data.message);
//         window.location.reload();
      }
      if (rest.data.statusCode === 404) {
        window.alert(rest.data.message);
      }
      else{
        window.alert(rest.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
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
            {data.map((e, i) => {
              return (
                <tr key={e._id}>
                  <td>{i + 1}</td>
                  <td>{e.name}</td>
                  <td>{e.email}</td>
                  <td>{e.password}</td>
                  <td>{e.mobile}</td>
                  <td>{e.batch}</td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => navigate(`/reset/${e._id}`)}
                    >
                      Edit
                    </Button>
                    &nbsp;&nbsp;
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(e._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default ViewStudent;
