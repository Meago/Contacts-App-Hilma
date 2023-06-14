// This file defines a React component called AddContact that renders a form for adding a new contact to a database
// It uses axios for making HTTP requests, useRef for accessing form inputs, and useNavigate for navigating to other pages
// It also uses react-bootstrap for styling the form elements

// Import the necessary modules
import axios from "axios";
import { useRef } from "react";
import { Button, Col, Container, Row, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// Define the AddContact component
const AddContact = () => {
  // Create references to the name and phone inputs
  const name = useRef("");
  const phone = useRef("");
  // Create a navigate function to redirect to the home page
  const navigate = useNavigate();

  // Define a handler function for adding a new contact
  const addContactHandler = () => {
    // Create a payload object with the name and phone values
    var payload = {
      name: name.current.value,
      phone: phone.current.value,
    };
    // Make a POST request to the server with the payload
    axios.post("http://localhost:4000/contact/create", payload).then(() => {
      // Navigate to the home page after the request is successful
      navigate("/");
    });
  };

  // Return the JSX code for rendering the component
  return (
    <>
      <Container className="mt-2" dir="rtl">
        <Row>
          <Col className="col-md-8 offset-md-2" style={{ color: "#4D3F5A" }}>
            <legend>הוספת איש קשר</legend>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>שם</Form.Label>
              <Form.Control type="text" ref={name} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formExperience">
              <Form.Label>טלפון</Form.Label>
              <Form.Control type="text" ref={phone} />
            </Form.Group>
            <Button
              type="button"
              variant="primary"
              onClick={addContactHandler}
              style={{
                position: "absolute",
                left: "38%",
                background: "#EE7E54",
                border: "none",
                borderRadius: "10px",
              }}
            >
              שמירה
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};
// Export the component as default
export default AddContact;