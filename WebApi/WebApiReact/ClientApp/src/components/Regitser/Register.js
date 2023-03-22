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

function Register() {

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
                                // placeholder="Email"
                                // defaultValue="Email"
                                {...register('email')}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="validationCustom01">
                            <Form.Label>UserName</Form.Label>
                            <Form.Control
                                type="text"
                                //placeholder="Address"
                                //defaultValue="Address"
                                {...register('userName')}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="validationCustom01">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                //placeholder="Deparment name"
                                //defaultValue="Deparment name"
                                {...register('password')}
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
                                    {min: 6, message: 'Vui lòng không nhập dưới 6 kí tự'}
                                ]}
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
                                //placeholder="Last name"
                                // defaultValue="Last name"
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

export default Register

// import React from 'react';
// import {Col, Form, Input, Button, Checkbox} from 'antd';

// const layout = {
//     labelCol: {span: 8},
//     wrapperCol: {span: 14},
// };


// const Register = (props) => {
//     const [form] = Form.useForm();

//     const showLoginForm = () => {
//         props.showLoginForm(false);
//     };

//     const onFinish = (values) => {
//         const {register} = props;
//         register(values);
//     };
//     const navigate = useNavigate();

//         const {
//             register,
//             handleSubmit,
//             formState: { errors }
//         } = useForm();
    
//         const onSubmit = async (content) => {
//             var data = await userApi.addAsync(content);
//             console.log(data)
//             if (data !== "") {
//                 alert("Da tao thanh cong!");
//                 navigate(-1);
//             }
//         }

//     return (
//         <Col span={8} className='register_form'>
//             <h3>Đăng ký</h3>
//             <div className='register_form--wrap'>
//                 <Form
//                     {...layout}
//                     name="basic"
//                     onFinish={onFinish}
//                 >
//                     <Form.Item
//                         label="Tên"
//                         name="name"
//                         rules={[
//                             {required: true, message: 'Vui lòng nhập tên'},
//                             {max: 191, message: 'Vui lòng không nhập quá 191 ký tự'}
//                         ]}
//                     >
//                         <Input/>
//                     </Form.Item>
//                     <Form.Item
//                         label="Email"
//                         name="email"
//                         rules={[
//                             {required: true, message: 'Vui lòng nhập email'},
//                             {type: 'email', message: 'Vui lòng nhập đúng định dạng email'},
//                             {max: 191, message: 'Vui lòng không nhập quá 191 ký tự'}
//                         ]}
//                     >
//                         <Input/>
//                     </Form.Item>

//                     <Form.Item
//                         label="Mật khẩu"
//                         name="password"
//                         rules={[
//                             {required: true, message: 'Vui lòng nhập mật khẩu'},
//                             {max: 16, message: 'Vui lòng không nhập quá 16 kí tự'},
//                             {min: 6, message: 'Vui lòng không nhập dưới 6 kí tự'}
//                         ]}
//                     >
//                         <Input.Password/>
//                     </Form.Item>
//                     <Form.Item
//                         label="Nhập lại mật khẩu"
//                         name="password_confirmation"
//                         dependencies={['password']}
//                         rules={[
//                             {required: true, message: 'Vui lòng nhập đúng mật khẩu'},
//                             ({getFieldValue}) => ({
//                                 validator(rule, value) {
//                                     if (!value || getFieldValue('password') === value) {
//                                         return Promise.resolve();
//                                     }
//                                     return Promise.reject('Mật khẩu nhập lại không khớp');
//                                 },
//                             }),
//                         ]}
//                     >
//                         <Input.Password/>
//                     </Form.Item>
                    

//                     <Form.Item>
//                         <Button type="primary" htmlType="submit">
//                             Đăng ký
//                         </Button>
//                         <Button className='register_form--wrap__register-btn' type="danger" onClick={showLoginForm}>
//                             Đăng nhập
//                         </Button>
//                     </Form.Item>
//                 </Form>
//             </div>
//         </Col>
//     )
// };

// export default Register;
