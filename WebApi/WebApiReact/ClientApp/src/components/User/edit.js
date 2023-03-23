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

  const [user, setUser] = useState([]);
  const [role, setUserRole] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const user = await userApi.getByIdAsync(id);
    const role = await roleApi.getAllAsync();
    console.log(role);
    setUser(user);
    setUserRole(role);
  }

  // const options = [
  //   { value: 'chocolate', label: 'Chocolate' },
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
    content.userId = id
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
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label>Role</Form.Label>
              <Form.Control
                type="text"
                defaultValue={user.role}
                {...register('role')}
              />
                <Form.Select 
                    defaultValue={user.role}
                >
                    <option>{user.role}</option>
                    <option>{role.RoleName}</option>
                    <option>{role.role}</option>
                    <option>{role.role}</option>
                </Form.Select>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
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