import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Sidebar from '../../components/sidebar/Sidebar';
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from 'react-hook-form';
import userApi from '../../api/userApi';
import roleApi from '../../api/roleApi';
import { getUser } from './../../utils/Common';

function EditUser() {

  var { id } = useParams();
  const navigate = useNavigate();

  //const [user, setUser] = useState([]);
  const [role, setUserRole] = useState([]);
  const [user, setEmployee] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  // const fetchData = async () => {
  //   const user = await userApi.getByIdAsync(id);
  //   const role = await roleApi.getAllAsync();
  //   //console.log(role);
  //   let a = role.values();
  //   for (const value of a) 
  //     {
  //       //const userrole = value.role;
  //       const usernames = value.roleName;
  //       const userrolename = value;
  //       console.log(userrolename);
  //       //console.log(usernames);
  //       setUserRole(usernames, userrolename);
  //     }      
  //   setUser(user);
   
  // }
  const fetchData = async () => {
    const role = await roleApi.getAllAsync()
    setUserRole(role);
    const user = await userApi.getByIdAsync(id)
    console.log(user);
    setEmployee(user);
  }

  // const options = [
  //   { value: 'usernames', label: 'Chocolate' },
  //   { value: 'strawberry', label: 'Strawberry' },
  //   { value: 'vanilla', label: 'Vanilla' }
  // ]
  
  // const MyComponent = () => (
  //   <Select options={options} />
  // )
  
  const {   
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (content) => {
    content.userId = id;
    var result = await userApi.updateAsync(content);
    console.log(result);
    if(result !== 0) {
      alert("Da update user pham thanh cong!");
      navigate(-1);
    }
  }

  return (
    <>
      <div style={{ padding: '0px 0px 0px 370px' }}>
        <Sidebar />
      </div>
      <div style={{ padding: '50px 50px 0px 0px' }}>
      <Container>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                defaultValue={user.userName}
                {...register('userName')}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                defaultValue={user.email}
                {...register('email')}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label>first Name</Form.Label>
              <Form.Control
                type="text"
                defaultValue={user.firstName}
                {...register('firstName')}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                defaultValue={user.lastName}
                {...register('lastName')}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label>PassWord</Form.Label>
              <Form.Control
                type="password"
                defaultValue={user.password}
                {...register('password')}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                defaultValue={user.confirmPassword}
                {...register('confirmPassword')}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
           
          </Row>
          <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationCustom04">
                <Form.Label>Role</Form.Label>
                <select
                  className="form-control-alternative form-control"
                  id="input-category"
                  type="select"
                  {...register("roleId")}
                  defaultValue=""
                  //onChange={handleChange}
                >
                  {role.map((roleType, key) => (
                    <option key={key} value={roleType.roleId}>
                      {roleType.roleName}
                    </option>
                  ))}
                </select>
              </Form.Group>
            </Row>
          <Button type="submit">Submit form</Button>
        </Form>
      </Container>
      </div>
    </>
  );
}

export default EditUser