import Modal from "react-bootstrap/Modal";
import { Button, Col, Row, Form } from "react-bootstrap";
 
const EditContact = (props) => {

  return (
    <>
      <Modal
        show={props.showEditModal}
        onHide={() => {
          props.closeEditModalHandler();
        }}
        name={props.name}
        phone={props.phone}
        dir="rtl"
      >
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body><Row>
          <Col className="col-md-8 offset-md-2">
            <br/>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>שם</Form.Label>
              <Form.Control type="text" name="name" ref={props.name} style={{borderRadius: "15px",
             border: "2px solid #ccc", width:"150%"}} />
            </Form.Group>
            <br/>
            <Form.Group className="mb-3" controlId="formRole">
              <Form.Label>טלפון</Form.Label>
              <Form.Control type="text" name="phone" ref={props.phone}  style={{borderRadius: "15px",
             border: "2px solid #ccc", width:"150%"}} />
            </Form.Group>
            <br/>
            <Button type="button" variant="primary" onClick={props.updateContactHandler} 
            style={{position:"absolute", bottom:"1%", left:"1%",  background:"#EE7E54",  border:'none', borderRadius:"10px"}}>
              שמירה
            </Button>
            <br/>
          </Col>
        </Row>
        <Row>

        </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default EditContact;