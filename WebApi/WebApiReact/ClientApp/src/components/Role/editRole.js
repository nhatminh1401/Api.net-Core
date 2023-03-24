import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Sidebar from '../../components/sidebar/Sidebar';
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from 'react-hook-form';
import roleApi from '../../api/roleApi';

function EditRole() {

  var { id } = useParams();
  const navigate = useNavigate();

  const [role, setRole] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const role = await roleApi.getByIdAsync(id)
    setRole(role);
  }

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (content) => {
    content.roleId = id
    var result = await roleApi.updateAsync(content);
    console.log(result);
    if(result !== 0) {
      alert("Da update role pham thanh cong!");
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
              <Form.Label>Role</Form.Label>
              <Form.Control
                type="text"
                defaultValue={role.roleName}
                {...register('roleName')}
              />
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

export default EditRole
