// This component renders a modal dialog that asks the user to confirm a delete action
 // It takes the following props: 
 // - showModal: a boolean value that determines whether the modal is visible or not 
 // - closeDeleteModalHandler: a function that closes the modal and cancels the delete action 
 // - confirmDeleteHandler: a function that performs the delete action and closes the modal
  // - title: a string that represents the title of the modal
   // - body: a string that represents the message of the modal 
// The component uses react-bootstrap components for styling and functionality
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
 
const DeleteConfirmation = (props) => {
  return (
    <>
      <Modal
        show={props.showModal}
        onHide={() => {
          props.closeDeleteModalHandler();
        }}
        dir="rtl"
      >
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.body}</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              props.closeDeleteModalHandler();
            }}
          >
            סגור
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              props.confirmDeleteHandler();
            }}
          >
            מאשר
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default DeleteConfirmation;