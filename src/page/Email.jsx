import React, { useEffect, useState } from 'react';
import { Table, Container, Button, Row, Col, Spinner } from 'react-bootstrap';
import { getAllEmails, createEmail, updateEmail, deleteEmail } from '../service/EmailService';
import { toast } from 'react-toastify';
import ModalEmail from '../modal/ModalEmail';

const Email = () => {
    const [emails, setEmails] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalEmail, setModalEmail] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchEmails();
    }, []);

    const fetchEmails = async () => {
        setIsLoading(true);
        try {
            const response = await getAllEmails();
            setEmails(response.data.content);
        } catch (error) {
            console.error('Error fetching emails:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdate = (id) => {
        const selectedEmail = emails.find(email => email.id === id);
        setModalEmail(selectedEmail);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        setIsLoading(true);
        try {
            await deleteEmail(id);
            fetchEmails();
            toast.success('Email deleted successfully!');
        } catch (error) {
            console.error('Error deleting email:', error);
            toast.error('Error deleting email!');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async (email) => {
        setIsLoading(true);
        try {
            if (email.id) {
                await updateEmail(email.id, email.emailAccount, email.emailForward);
                toast.success('Email updated successfully!');
            } else {
                const response = await createEmail(email.emailAccount, email.emailForward);
                toast.success('Email created successfully!');
                setEmails([...emails, response.data]);
            }
            setShowModal(false);
            fetchEmails();
        } catch (error) {
            console.error('Error saving email:', error);
            toast.error('Error saving email!');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setModalEmail(null);
    };

    const handleShowModal = () => {
        setModalEmail(null);
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
                            <h1>Email List</h1>
                        </Col>
                        <Col className="text-end">
                            <Button variant="primary" onClick={handleShowModal}>Create</Button>
                        </Col>
                    </Row>
                    <Table bordered hover>
                        <thead>
                            <tr>
                                <th>Email Account</th>
                                <th>Email Forward</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {emails.map((email) => (
                                <tr key={email.id}>
                                    <td>{email.emailAccount}</td>
                                    <td>{email.emailForward}</td>
                                    <td>
                                        <Button variant="warning" onClick={() => handleUpdate(email.id)}>Update</Button>{' '}
                                        <Button variant="danger" onClick={() => handleDelete(email.id)}>Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <ModalEmail
                        show={showModal}
                        handleClose={handleCloseModal}
                        handleSave={handleSave}
                        email={modalEmail}
                    />
                </>
            )}
        </Container>
    );
};

export default Email;