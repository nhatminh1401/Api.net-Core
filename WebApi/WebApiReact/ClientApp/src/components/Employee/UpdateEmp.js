import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Sidebar from '../../components/sidebar/Sidebar';
import deparmentApi from '../../api/deparmentApi';
import { useNavigate, useParams } from "react-router-dom";

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
//import * as Yup from "yup";
import employeeApi from '../../api/employeeApi';
import { END_POINT } from '../../api/endPoint';
//import UploadImg from './upload';

function EditEmployee() {
  var { id } = useParams();
  const navigate = useNavigate();

  const [productTypes, setProductTypes] = useState([]);

  const [employee, setEmployee] = useState([]);
  // const [employee, setEmployee] = useState({
  //   employeeName : "",
  //   emailId :'',
  //   departmentName :'',
  // });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const productTypes = await deparmentApi.getAllAsync()
    setProductTypes(productTypes);
    const employee = await employeeApi.getByIdAsync(id)
    console.log(employee);
    setEmployee(employee);
  }

  // const handleChange = (e) => {
  //   setEmployee({
  //       ...employee,
  //       [e.target.name] : e.target.value
  //   })
  //   console.log(employee)
  // };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  const onSubmit = async (content) => {
    // console.log(typeof(content));
    console.log(content);
    content.employeeID = id;
    console.log(content);
    var result = await employeeApi.updateAsync(content);
    if (result !== 0) {
      alert("Da update employee thanh cong");
      navigate(-1);
    }

  }

  return (
    <>
      <div style={{ padding: '50px 50px 0px 0px' }}>
        <h1>Update employee</h1>
        <Container>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>employee name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={employee.employeeName}
                  defaultValue={employee.employeeName}
                  //onChange={handleChange}
                  {...register('employeeName')}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={employee.emailId}
                  defaultValue={employee.emailId}
                  //onChange={handleChange}
                  {...register('emailId')}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationCustom04">
                <Form.Label>Deparment</Form.Label>
                <select
                  className="form-control-alternative form-control"
                  id="input-category"
                  type="select"
                  {...register("departmentId")}
                  defaultValue=""
                  //onChange={handleChange}
                >
                  {productTypes.map((productType, key) => (
                    <option key={key} value={productType.departmentId}>
                      {productType.departmentName}
                    </option>
                  ))}
                </select>
              </Form.Group>
            </Row>
            <Button type="submit">Update</Button>
          </Form>
          {/* {employee.productImages && (
            <UploadImg
              productId= {id}
              productImages={product.productImages} />
          )} */}
        </Container>
      </div>
    </>
  );
}

export default EditEmployee