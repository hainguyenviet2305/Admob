import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const ModalKeyword = ({ show, handleClose, handleSave, keyword }) => {
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [keywordValue, setKeywordValue] = useState("");

  useEffect(() => {
    if (keyword) {
      setTitle(keyword.title);
      setEmail(keyword.email);
      setKeywordValue(keyword.keyword);
    } else {
      setTitle("");
      setEmail("");
      setKeywordValue("");
    }
  }, [keyword]);

  const handleSaveKeyword = () => {
    const updatedKeyword = {
      id: keyword ? keyword.id : null,
      title: title,
      email: email,
      keyword: keywordValue,
    };
    handleSave(updatedKeyword);
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {keyword ? "Update Keyword" : "Create Keyword"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formKeyword">
            <Form.Label>Keyword</Form.Label>
            <Form.Control
              type="text"
              value={keywordValue}
              onChange={(e) => setKeywordValue(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSaveKeyword}>
          {keyword ? "Update" : "Create"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalKeyword;
