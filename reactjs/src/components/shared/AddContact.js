
// AddContact.js
// This file defines a React component that renders a modal dialog for adding a new contact.

// Import React and Bootstrap components
import Modal from "react-bootstrap/Modal";
import { Button, Col, Row, Form } from "react-bootstrap";

// Define the AddContact component
// It takes the following props:
// - showAddModal: a boolean value that determines whether the modal is visible or not
// - closeAddModalHandler: a function that handles closing the modal
// - name: a ref object that holds the value of the name input field
// - phone: a ref object that holds the value of the phone input field
// - title: a string that represents the title of the modal
// - addContactHandler: a function that handles adding a new contact
const AddContact = (props) => {
  return (
    <>
      <Modal
        show={props.showAddModal}
        onHide={() => {
          props.closeAddModalHandler();
        }}
        name={props.name}
        phone={props.phone}
        dir="rtl"
      >
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col className="col-md-8 offset-md-2">
              <br />
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>שם</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  ref={props.name}
                  style={{
                    borderRadius: "15px",
                    border: "2px solid #ccc",
                    width: "150%",
                  }}
                />
              </Form.Group>
              <br />
              <Form.Group className="mb-3" controlId="formRole">
                <Form.Label>טלפון</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  ref={props.phone}
                  style={{
                    borderRadius: "15px",
                    border: "2px solid #ccc",
                    width: "150%",
                  }}
                />
              </Form.Group>
              <br />
              <Button
                type="button"
                variant="primary"
                onClick={props.addContactHandler}
                style={{
                  position: "absolute",
                  bottom: "1%",
                  left: "1%",
                  background: "#EE7E54",
                  border: "none",
                  borderRadius: "10px",
                }}
              >
                שמירה
              </Button>
              <br />
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

// Export the component
export default AddContact;