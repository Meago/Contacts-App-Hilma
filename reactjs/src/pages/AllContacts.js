import { useEffect, useState, useRef } from "react";
import { Container, Table, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DeleteConfirmation from "../components/shared/DeleteConfirmation";
import EditContact from "../components/shared/EditContact";
import AddContact from "../components/shared/AddContact";
import edit from '../resources/edit.svg';
import del from '../resources/delete.svg';
import plus from '../resources/Icon feather-plus-circle.svg';
import copy from '../resources/Icon material-content-copy.svg';
import sicon from '../resources/Icon awesome-search.png';


 
const AllContacts = () => {
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [itemIdToDelete, setItemIdToDelete] = useState(0);
  const [id, setId] = useState(0);
  var name= useRef("");
  var phone= useRef("");

  
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

  const openEditModalHandler = (id) => {
    setShowEditModal(true);
    axios.get(`http://localhost:4000/contact/contact/${id}`).then((response) => {
      let data = response.data;
      setId(id);
      name.current.value = data.name;
      phone.current.value = data.phone;
  });
}

const updateContactHandler = () => {
  var payload = {
    name: name.current.value,
    phone: phone.current.value,
  };
  axios.put(`http://localhost:4000/contact/update?contactId=${id}` , payload)
  .then(() => {
    axios.get("http://localhost:4000/contact/contact").then((response) => {
      setContacts(response.data);
    });
    setShowEditModal(false);
  })
};

const closeEditModalHandler = () => {
  setShowEditModal(false);
};
 
  const closeAddModalHandler = () => {
    setShowAddModal(false);
  };

  const openAddModalHandler = () => {
    setShowAddModal(true);
}

const addContactHandler = () => {
  var payload = {
    name: name.current.value,
    phone: phone.current.value,
  };
  axios.post("http://localhost:4000/contact/create", payload)
  .then(() => {
    axios.get("http://localhost:4000/contact/contact").then((response) => {
      setContacts(response.data);
    });
    setShowAddModal(false);
  })
};
 



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
        title="אישור מחיקה"
        body="האם אתה בטוח שברצונך למחוק פריט זה?"
        showModal={showModal}
        closeDeleteModalHandler={closeDeleteModalHandler}
        confirmDeleteHandler={confirmDeleteHandler}
      ></DeleteConfirmation>

      <EditContact
        title="עריכת איש קשר"
        showEditModal={showEditModal}
        closeEditModalHandler={closeEditModalHandler}
        updateContactHandler={updateContactHandler}
        name={name}
        phone={phone}
      ></EditContact>

<AddContact
        title="יצירת איש קשר"
        showAddModal={showAddModal}
        closeAddModalHandler={closeAddModalHandler}
        addContactHandler={addContactHandler}
        name={name}
        phone={phone}
      ></AddContact>


      <Container className="mt-2" dir="rtl">
        <br/>
        <br/>
        <br/>
        <Row style={{font:"30px Heebo", color: "#A5A4BF"}}>
          אנשי קשר
        </Row>
        <Row>
            <input type="text" placeholder="חיפוש" id="myInput" onChange={ searchEvent }
             style={{ backgroundImage: `url(${sicon})`,
             backgroundPosition: "1% 50%",
             backgroundSize: "2%",
             backgroundRepeat: "no-repeat",
             borderRadius: "15px",
             border: "2px solid #ccc",
             width: "80%"
              }}></input>
          
            <Button
              style={ { borderRadius: "100%",
               border:'none',
                background:"#EE7E54 0% 0% no-repeat padding-box",
                 boxShadow: "0px 3px 6px #00000029",
              position: "relative",
              right: "15%",
              padding: "1% 1%",
              textAlign: "center",
              width:"30px",
              height:"30px"
               }}
              variant="primary"
              type="button"
              onClick={() => openAddModalHandler()}
            >
              <img src={plus} alt= "buttonpng" style={{height:"150%",display:"block"}} />
            </Button>
        </Row>
        <Table striped hover>
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
                <td style={{textAlign:"center"}}>
                  <img src={edit} onClick={() => {
                    openEditModalHandler(emp._id);
                    setId(emp.id);
                }} alt=""/>
                &emsp;
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