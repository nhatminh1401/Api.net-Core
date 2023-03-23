import React from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Sidebar from '../../components/sidebar/Sidebar';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import userApi from '../../api/userApi';

function CreateUser() {

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = async (content) => {
        var data = await userApi.addAsync(content);
        console.log(data)
        if (data !== "") {
            alert("Da tao thanh cong!");
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
                        <Form.Group as={Col} md="6" controlId="validationCustom01">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="text"
                                isInvalid={!!errors.email}
                                {...register('email')}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.email}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="validationCustom01">
                            <Form.Label>UserName</Form.Label>
                            <Form.Control
                                type="text"
                                {...register('userName')}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="validationCustom01">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"                                
                                {...register('password')}
                                required
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="validationCustom01">
                            <Form.Label>confirmPassword</Form.Label>
                            <Form.Control
                                type="password"
                                rules={[
                                    {required: true, message: 'Vui lòng nhập mật khẩu'},
                                    {max: 16, message: 'Vui lòng không nhập quá 16 kí tự'},
                                    {min: 6, message: 'Vui lòng không nhập dưới 6 kí tự'},
                                ]}
                                required
                                //placeholder="Deparment name"
                                //defaultValue="Deparment name"
                                {...register('confirmPassword')}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="validationCustom01">
                            <Form.Label>firstName</Form.Label>
                            <Form.Control
                                type="text"
                               // placeholder="firstname"
                                // defaultValue="firstname"
                                {...register('firstName')}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="validationCustom01">
                            <Form.Label>lastName</Form.Label>
                            <Form.Control
                                type="text"
                                {...register('lastName')}
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

export default CreateUser
