import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ModalUser = ({ show, handleClose, handleSave, user }) => {
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('USER');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (user) {
            setEmail(user.email);
            setRole(user.role);
            setPassword(user.password);
        } else {
            setEmail('');
            setRole('USER');
            setPassword('');
        }
    }, [user]);

    const handleSaveClick = () => {
        const userData = {
            id: user ? user.id : null,
            email: email,
            role: role,
            password: password
        };
        handleSave(userData);
    };

    return (
        <Modal show={show} onHide={handleClose} backdrop="static" centered>
            <Modal.Header closeButton>
                <Modal.Title>{user ? 'Update User' : 'Create User'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formUserEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter email"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formUserPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formUserRole">
                        <Form.Label>Role</Form.Label>
                        {user ? (
                            <Form.Control
                                as="select"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option value="USER">USER</option>
                                <option value="ADMIN">ADMIN</option>
                            </Form.Control>
                        ) : (
                            <Form.Control
                                type="text"
                                value="USER"
                                readOnly
                            />
                        )}
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSaveClick}>
                    {user ? 'Update' : 'Create'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalUser;