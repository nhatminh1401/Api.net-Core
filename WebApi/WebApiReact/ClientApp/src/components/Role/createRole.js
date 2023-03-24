import React from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Sidebar from '../../components/sidebar/Sidebar';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import roleApi from '../../api/roleApi';

function CreateRole() {

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = async (content) => {
        var data = await roleApi.addAsync(content);
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
                        <Form.Group as={Col} md="4" controlId="validationCustom01">
                            <Form.Label>Role Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Role name"
                                defaultValue="Role name"
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

export default CreateRole