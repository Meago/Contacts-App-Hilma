// This file defines an AllContacts component that renders a list of contacts with their names and phone numbers 
// The component also allows the user to search, add, edit and delete contacts using axios requests to a backend server 
// The component uses react-bootstrap components for styling and layout

// Importing relevant components, images, and react-bootstrap components.
import { useEffect, useState, useRef } from "react";
import { Container, Table, Row, Button } from "react-bootstrap";
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
  const [contacts, setContacts] = useState([]);  // define a state variable to store the list of contacts
  const [showModal, setShowModal] = useState(false); // define a state variable to control the visibility of the deletion modal 
  const [showEditModal, setShowEditModal] = useState(false); // define a state variable to control the visibility of the editing modal
  const [showAddModal, setShowAddModal] = useState(false); // define a state variable to control the visibility of the adding modal
  const [itemIdToDelete, setItemIdToDelete] = useState(0);  // define a state variable to store the id of the contact to be deleted
  const [id, setId] = useState(0); // define a state variable to store the id of the contact to be edited 
  var name= useRef(""); // define a ref variable to store the name of the contact to be added or edited 
  var phone= useRef(""); // define a ref variable to store the phone number of the contact to be added or edited

   // make a GET request to fetch all contacts from the server
    // update the contacts state with the response data
     // run this effect only once when the component mounts
  useEffect(() => {
    axios.get("http://localhost:4000/contact/contact").then((response) => {
      setContacts(response.data);
    });
  },[]);
 // takes an id as a parameter and sets the itemIdToDelete state to that id. 
 // It also sets the showModal state to true, which opens the deletion modal.
  const openDeleteModalHandler = (id) => {
    setItemIdToDelete(id);
    setShowModal(true);
  };
 //  sets the itemIdToDelete state to 0 and the showModal state to false, which closes the deletion modal.
  const closeDeleteModalHandler = () => {
    setItemIdToDelete(0);
    setShowModal(false);
  };
  
 /*
 This function makes a DELETE request to the server with the itemIdToDelete as a query parameter.
  It then updates the contacts state by filtering out the deleted contact. 
 It also sets the itemIdToDelete state to 0 and the showModal state to false, which closes the deletion modal.
 */
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
/*
 Takes an id as a parameter and sets the showEditModal state to true,
  which opens the editing modal.
   It also makes a GET request to the server with the id as a path parameter and gets the contact data. 
 It then sets the id state to that id and updates the name and phone ref variables with the contact data.
*/
  const openEditModalHandler = (id) => {
    setShowEditModal(true);
    axios.get(`http://localhost:4000/contact/contact/${id}`).then((response) => {
      let data = response.data;
      setId(id);
      name.current.value = data.name;
      phone.current.value = data.phone;
  });
}
/*
creates a payload object with the name and phone ref variables as properties. 
It then makes a PUT request to the server with the id state as a query parameter and the payload as the body.
 It then makes another GET request to fetch all contacts from the server and
  updates the contacts state with the response data. 
It also sets the showEditModal state to false, which closes the editing modal.
*/
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
// sets the showEditModal state to false, which closes the editing modal.
const closeEditModalHandler = () => {
  setShowEditModal(false);
};
 //sets the showAddModal state to false, which closes the adding modal.
  const closeAddModalHandler = () => {
    setShowAddModal(false);
  };
//  sets the showAddModal state to true, which opens the adding modal.
  const openAddModalHandler = () => {
    setShowAddModal(true);
}
/*
creates a payload object with the name and phone ref variables as properties.
 It then makes a POST request to the server with the payload as the body.
  It then makes another GET request to fetch all contacts from the server and
   updates the contacts state with the response data. 
It also sets the showAddModal state to false, which closes the adding modal.
*/
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
 
/*This function takes an event object as a parameter and gets its target value.
 If it is empty, it makes a GET request to fetch all contacts from the server and updates the contacts state with the response data.
  Otherwise, it makes a GET request to search for contacts by name or phone number using the target value as a path parameter.
   It then updates the contacts state with the response data.
*/
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