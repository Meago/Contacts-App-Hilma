import axios from "axios";
import { useEffect, useRef } from "react";
import { Button, Col, Container, Row, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
 
const EditContact = () => {
  const name = useRef("");
  const phone = useRef("");
  const { id } = useParams("id");
  const navigate = useNavigate();
 
  useEffect(() => {
    axios.get(`http://localhost:4000/contact/contact/${id}`).then((response) => {
      let data = response.data;

      name.current.value = data.name;
      phone.current.value = data.phone;
    });
  });
 
  const updateContactHandler = () => {
    var payload = {
      name: name.current.value,
      phone: phone.current.value,
    };
    axios.put(`http://localhost:4000/contact/update?contactId=${id}` , payload)
    .then(() => {
        navigate("/");
    })
  };
 
  return (
    <>
      <Container className="mt-2"  dir="rtl" style={{color:"#4D3F5A"}}>
        <Row>
          <Col className="col-md-8 offset-md-2">
            <legend>עריכת איש קשר</legend>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>שם</Form.Label>
              <Form.Control type="text" ref={name} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formRole">
              <Form.Label>טלפון</Form.Label>
              <Form.Control type="text" ref={phone} />
            </Form.Group>
            <Button type="button" variant="primary" onClick={updateContactHandler} 
            style={{position:"absolute", left: "38%", background:"#EE7E54",  border:'none', borderRadius:"10px"}}>
              שמירה
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};
 
export default EditContact;