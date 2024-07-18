import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const ModalEmail = ({ show, handleClose, handleSave, email }) => {
  const [emailAccount, setEmailAccount] = useState("");
  const [emailForward, setEmailForward] = useState("");

  useEffect(() => {
    if (email) {
      setEmailAccount(email.emailAccount);
      setEmailForward(email.emailForward);
    } else {
      setEmailAccount("");
      setEmailForward("");
    }
  }, [email]);

  const handleSaveEmail = () => {
    const updatedEmail = {
      id: email ? email.id : null,
      emailAccount: emailAccount,
      emailForward: emailForward
    };
    handleSave(updatedEmail);
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>{email ? 'Update Email' : 'Create Email'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formEmailAccount">
            <Form.Label>Email Account</Form.Label>
            <Form.Control type="text" value={emailAccount} onChange={(e) => setEmailAccount(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formEmailForward">
            <Form.Label>Email Forward</Form.Label>
            <Form.Control type="text" value={emailForward} onChange={(e) => setEmailForward(e.target.value)} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSaveEmail}>
          {email ? 'Update' : 'Create'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEmail;