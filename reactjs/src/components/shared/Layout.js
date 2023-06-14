// This file defines a Layout component that renders a navbar and a container 
// The navbar has a dark variant and a custom background color and height 
// The navbar also displays the name "משה לוי" on the left side 
// The container renders the children prop passed to the Layout component 
// The Layout component uses react-bootstrap components for styling

import { Container } from "react-bootstrap"; 
// import Container component from react-bootstrap library 
import Navbar from "react-bootstrap/Navbar"; 
// import Navbar component from react-bootstrap library

const Layout = ({ children }) => { 
  // define a Layout component that takes a children prop
  // render a Navbar component with dark variant and custom style, a Navbar.Brand component with custom style and text 
    // render a Container component that renders the children prop 
   return ( <> <Navbar variant="dark" style={{backgroundColor:"#4D3F5A", height:"60px"}}>
     <Navbar.Brand style={{position:"absolute", left:"50px"}}>משה לוי</Navbar.Brand>
      </Navbar> <Container>{children}</Container> 
      </> ); };

export default Layout; // export the Layout component as default