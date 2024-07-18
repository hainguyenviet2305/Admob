import React, { useEffect, useState } from 'react';
import { Table, Container, Button, Row, Col, Spinner } from 'react-bootstrap';
import { getAllKeywords, createKeyword, updateKeyword, deleteKeyword } from '../service/KeywordService';
import { toast } from 'react-toastify';
import ModalKeyword from '../modal/ModalKeyword ';


const Keyword = () => {
    const [keywords, setKeywords] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalKeyword, setModalKeyword] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchKeywords();
    }, []);

    const fetchKeywords = async () => {
        setIsLoading(true);
        try {
            const response = await getAllKeywords();
            setKeywords(response.data.content);
        } catch (error) {
            console.error('Error fetching keywords:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdate = (id) => {
        const selectedKeyword = keywords.find(keyword => keyword.id === id);
        setModalKeyword(selectedKeyword);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        setIsLoading(true);
        try {
            await deleteKeyword(id);
            fetchKeywords();
            toast.success('Keyword deleted successfully!');
        } catch (error) {
            console.error('Error deleting keyword:', error);
            toast.error('Error deleting keyword!');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async (keyword) => {
        setIsLoading(true);
        try {
            if (keyword.id) {
                await updateKeyword(keyword.id, keyword.title, keyword.email, keyword.keyword);
                toast.success('Keyword updated successfully!');
            } else {
                const response = await createKeyword(keyword.title, keyword.email, keyword.keyword);
                toast.success('Keyword created successfully!');
                setKeywords([...keywords, response.data]);
            }
            setShowModal(false);
            fetchKeywords();
        } catch (error) {
            console.error('Error saving keyword:', error);
            toast.error('Error saving keyword!');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setModalKeyword(null);
    };

    const handleShowModal = () => {
        setModalKeyword(null);
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
                            <h1>Keyword List</h1>
                        </Col>
                        <Col className="text-end">
                            <Button variant="primary" onClick={handleShowModal}>Create</Button>
                        </Col>
                    </Row>
                    <Table bordered hover>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Email</th>
                                <th>Keyword</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {keywords.map((keyword) => (
                                <tr key={keyword.id}>
                                    <td>{keyword.title}</td>
                                    <td>{keyword.email}</td>
                                    <td>{keyword.keyword}</td>
                                    <td>
                                        <Button variant="warning" onClick={() => handleUpdate(keyword.id)}>Update</Button>{' '}
                                        <Button variant="danger" onClick={() => handleDelete(keyword.id)}>Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <ModalKeyword
                        show={showModal}
                        handleClose={handleCloseModal}
                        handleSave={handleSave}
                        keyword={modalKeyword}
                    />
                </>
            )}
        </Container>
    );
};

export default Keyword;