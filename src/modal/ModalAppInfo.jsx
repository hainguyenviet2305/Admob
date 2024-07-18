import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const ModalAppInfo = ({ show, handleClose, handleSave, appInfo }) => {
  const [appId, setAppId] = useState("");
  const [appName, setAppName] = useState("");
  const [po, setPo] = useState("");
  const [marketing, setMarketing] = useState("");
  const [leaderMarketing, setLeaderMarketing] = useState("");
  const [leaderPo, setLeaderPo] = useState("");

  useEffect(() => {
    if (appInfo) {
      setAppId(appInfo.appId);
      setAppName(appInfo.appName);
      setPo(appInfo.po);
      setMarketing(appInfo.marketing);
      setLeaderMarketing(appInfo.leaderMarketing);
      setLeaderPo(appInfo.leaderPo);
    } else {
      setAppId("");
      setAppName("");
      setPo("");
      setMarketing("");
      setLeaderMarketing("");
      setLeaderPo("");
    }
  }, [appInfo]);

  const handleSaveAppInfo = () => {
    const updatedAppInfo = {
      id: appInfo ? appInfo.id : null,
      appId: appId,
      appName: appName,
      po: po,
      marketing: marketing,
      leaderMarketing: leaderMarketing,
      leaderPo: leaderPo
    };
    handleSave(updatedAppInfo);
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>{appInfo ? 'Update App Info' : 'Create App Info'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formAppId">
            <Form.Label>App ID</Form.Label>
            <Form.Control type="text" value={appId} onChange={(e) => setAppId(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formAppName">
            <Form.Label>App Name</Form.Label>
            <Form.Control type="text" value={appName} onChange={(e) => setAppName(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPo">
            <Form.Label>PO</Form.Label>
            <Form.Control type="text" value={po} onChange={(e) => setPo(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formMarketing">
            <Form.Label>Marketing</Form.Label>
            <Form.Control type="text" value={marketing} onChange={(e) => setMarketing(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formLeaderMarketing">
            <Form.Label>Leader Marketing</Form.Label>
            <Form.Control type="text" value={leaderMarketing} onChange={(e) => setLeaderMarketing(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formLeaderPo">
            <Form.Label>Leader PO</Form.Label>
            <Form.Control type="text" value={leaderPo} onChange={(e) => setLeaderPo(e.target.value)} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSaveAppInfo}>
          {appInfo ? 'Update' : 'Create'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAppInfo;