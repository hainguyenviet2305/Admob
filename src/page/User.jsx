import React, { useEffect, useState } from 'react';
import { Table, Container, Button, Row, Col, Spinner } from 'react-bootstrap';
import { getAllUsers, createUser, updateUser, deleteUser } from '../service/UserService';
import { toast } from 'react-toastify';
import ModalUser from '../modal/ModalUser';

const User = () => {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalUser, setModalUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);
      
    const fetchUsers = async () => {
        setIsLoading(true);
        try {
            const response = await getAllUsers();
            setUsers(response.data.content);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdate = (id) => {
        const selectedUser = users.find(user => user.id === id);
        setModalUser(selectedUser);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        setIsLoading(true);
        try {
            await deleteUser(id);
            fetchUsers();
            toast.success('User deleted successfully!');
        } catch (error) {
            console.error('Error deleting user:', error);
            toast.error('Error deleting user!');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async (user) => {
        setIsLoading(true);
        try {
            if (user.id) {
                if (user.password) {
                    await updateUser(user.id, user.email, user.role, user.password);
                } else {
                    await updateUser(user.id, user.email, user.role);
                }
                toast.success('User updated successfully!');
            } else {
                const response = await createUser(user.email, user.role, user.password);
                toast.success('User created successfully!');
                setUsers([...users, response.data]);
            }
            setShowModal(false);
            setModalUser(null);
            fetchUsers();
        } catch (error) {
            console.error('Error saving user:', error);
            toast.error('Error saving user!');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setModalUser(null);
    };
    
    const handleShowModal = () => {
        setModalUser(null);
        setShowModal(true);
    };

    return (
        <Container>
            {isLoading && (
                <div className="text-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            )}
            {!isLoading && (
                <>
                    <Row className="my-3">
                        <Col>
                            <h1>User List</h1>
                        </Col>
                        <Col className="text-end">
                            <Button variant="primary" onClick={handleShowModal}>Create</Button>
                        </Col>
                    </Row>
                    <Table bordered hover>
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>
                                        <Button variant="warning" onClick={() => handleUpdate(user.id)}>Update</Button>{' '}
                                        <Button variant="danger" onClick={() => handleDelete(user.id)}>Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <ModalUser
                        show={showModal}
                        handleClose={handleCloseModal}
                        handleSave={handleSave}
                        user={modalUser}
                    />
                </>
            )}
        </Container>
    );
};


export default User;