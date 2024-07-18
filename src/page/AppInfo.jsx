import React, { useEffect, useState } from 'react';
import { Table, Container, Button, Row, Col, Spinner } from 'react-bootstrap';
import { getAllAppInfos, createAppInfo, updateAppInfo, deleteAppInfo } from '../service/AppInfoService';
import { toast } from 'react-toastify';
import ModalAppInfo from '../modal/ModalAppInfo';

const AppInfo = () => {
    const [appInfos, setAppInfos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalAppInfo, setModalAppInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchAppInfos();
    }, []);

    const fetchAppInfos = async () => {
        setIsLoading(true);
        try {
            const response = await getAllAppInfos();
            setAppInfos(response.data.content);
        } catch (error) {
            console.error('Error fetching app infos:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdate = (id) => {
        const selectedAppInfo = appInfos.find(appInfo => appInfo.id === id);
        setModalAppInfo(selectedAppInfo);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        setIsLoading(true);
        try {
            await deleteAppInfo(id);
            fetchAppInfos();
            toast.success('App Info deleted successfully!');
        } catch (error) {
            console.error('Error deleting app info:', error);
            toast.error('Error deleting app info!');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async (appInfo) => {
        setIsLoading(true);
        try {
            if (appInfo.id) {
                await updateAppInfo(appInfo.id, appInfo.appId, appInfo.appName, appInfo.po, appInfo.marketing, appInfo.leaderMarketing, appInfo.leaderPo);
                toast.success('App Info updated successfully!');
            } else {
                const response = await createAppInfo(appInfo.appId, appInfo.appName, appInfo.po, appInfo.marketing, appInfo.leaderMarketing, appInfo.leaderPo);
                toast.success('App Info created successfully!');
                setAppInfos([...appInfos, response.data]);
            }
            setShowModal(false);
            fetchAppInfos();
        } catch (error) {
            console.error('Error saving app info:', error);
            toast.error('Error saving app info!');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setModalAppInfo(null);
    };

    const handleShowModal = () => {
        setModalAppInfo(null);
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
                            <h1>App Info List</h1>
                        </Col>
                        <Col className="text-end">
                            <Button variant="primary" onClick={handleShowModal}>Create</Button>
                        </Col>
                    </Row>
                    <Table bordered hover>
                        <thead>
                            <tr>
                                <th>App ID</th>
                                <th>App Name</th>
                                <th>PO</th>
                                <th>Marketing</th>
                                <th>Leader Marketing</th>
                                <th>Leader PO</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appInfos.map((appInfo) => (
                                <tr key={appInfo.id}>
                                    <td>{appInfo.appId}</td>
                                    <td>{appInfo.appName}</td>
                                    <td>{appInfo.po}</td>
                                    <td>{appInfo.marketing}</td>
                                    <td>{appInfo.leaderMarketing}</td>
                                    <td>{appInfo.leaderPo}</td>
                                    <td>
                                        <Button variant="warning" onClick={() => handleUpdate(appInfo.id)}>Update</Button>{' '}
                                        <Button variant="danger" onClick={() => handleDelete(appInfo.id)}>Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <ModalAppInfo
                        show={showModal}
                        handleClose={handleCloseModal}
                        handleSave={handleSave}
                        appInfo={modalAppInfo}
                    />
                </>
            )}
        </Container>
    );
};

export default AppInfo;