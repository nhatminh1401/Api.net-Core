import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Sidebar from '../../components/sidebar/Sidebar';
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from 'react-hook-form';
import deparmentApi from '../../api/deparmentApi';

function EditDeparment() {

  var { id } = useParams();
  const navigate = useNavigate();

  const [deparment, setDeparment] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const deparment = await deparmentApi.getByIdAsync(id)
    setDeparment(deparment);
    console.log (deparment, "!!!!");
  }

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (content) => {
    content.departmentId = id
    var result = await deparmentApi.updateAsync(content);
    console.log(result.data);
    if(result !== 0) {
      alert("Da update deparment pham thanh cong!");
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
              <Form.Label>Depatmnet name</Form.Label>
              <Form.Control
                type="text"
                defaultValue={deparment.departmentName}
                {...register('departmentName')}
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

export default EditDeparment