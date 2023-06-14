import { useEffect, useState } from "react";
import { Container, Table, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DeleteConfirmation from "../components/shared/DeleteConfirmation";
import edit from '../resources/edit.svg';
import del from '../resources/delete.svg';
import plus from '../resources/Icon feather-plus-circle.svg';
import copy from '../resources/Icon material-content-copy.svg';
import sicon from '../resources/Icon awesome-search.png';


 
const AllContacts = () => {
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [itemIdToDelete, setItemIdToDelete] = useState(0);
 
  useEffect(() => {
    axios.get("http://localhost:4000/contact/contact").then((response) => {
      setContacts(response.data);
    });
  },[]);
 
  const openDeleteModalHandler = (id) => {
    setItemIdToDelete(id);
    setShowModal(true);
  };
 
  const closeDeleteModalHandler = () => {
    setItemIdToDelete(0);
    setShowModal(false);
  };
  
 
  function confirmDeleteHandler() {
    axios
      .delete(`http://localhost:4000/contact/delete?contactId=${itemIdToDelete}`)
      .then(() => {
        setContacts((existingData) => {
          return existingData.filter((_) => _._id !== itemIdToDelete);
        });
        setItemIdToDelete(0);
        setShowModal(false);
      });
  }

  function searchEvent (evt) {
    if(evt.target.value===""){
      axios.get("http://localhost:4000/contact/contact").then((response) => {
        setContacts(response.data);
      });
    }else
    axios.get("http://localhost:4000/contact/search/"+evt.target.value).then((response) => {
      setContacts(response.data);
    });
  }
 
  return (
    <>
      <DeleteConfirmation
        title="Delete Confimation!"
        body="Are sure to delete this item"
        showModal={showModal}
        closeDeleteModalHandler={closeDeleteModalHandler}
        confirmDeleteHandler={confirmDeleteHandler}
      ></DeleteConfirmation>
      <Container className="mt-2" dir="rtl">
        <Row style={{font:"30px Heebo", color: "#A5A4BF"}}>
          אנשי קשר
        </Row>
        <Row>
          <Col>
            <input type="text" placeholder="חיפוש" id="myInput" onChange={ searchEvent }
             style={{ backgroundImage: `url(${sicon})`,
             backgroundPosition: "1% 50%",
             backgroundSize: "4%",
             backgroundRepeat: "no-repeat",
             borderRadius: "15px",
             border: "2px solid #ccc",
             width: "150%"
              }}></input>
        </Col>
          <Col className="col-md-4 offset-md-4">
            <Button
              style={ { borderRadius: "100%",
               border:'none',
                background:"#EE7E54 0% 0% no-repeat padding-box",
                 boxShadow: "0px 3px 6px #00000029",
              position: "relative",
              padding: "1% 1%",
              right: "190%" }}
              variant="primary"
              type="button"
              onClick={() => navigate("/add-contact")}
            >
              <img src={plus} alt= "buttonpng" style={{ width: "50%", height: "50%"}}/>
            </Button>
          </Col>
        </Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>שם</th>
              <th>טלפון</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((emp) => (
              <tr key={emp._id}>
                <td>{emp.name}</td>
                <td>
                  {emp.phone}
                  &emsp;
                    
                      <img src={copy} onClick={() => {
                    navigator.clipboard.writeText(`${emp.phone}`);
                    window.alert("המספר הועתק!");
                }} alt=""/>
                 
                </td>
                <td>
                  <img src={edit} onClick={() => {
                    navigate(`/edit-contact/${emp._id}`);
                }} alt=""/>
                </td>
                  <td>
                  <img src={del} onClick={() => {
                      openDeleteModalHandler(emp._id);
                }} alt=""/>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
};
export default AllContacts;