import { Container } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
 
const Layout = ({ children }) => {
  return (
    <>
      <Navbar variant="dark" style={{backgroundColor:"#4D3F5A", height:"60px"}}>
        <Navbar.Brand style={{position:"absolute", left:"50px"}}>משה לוי</Navbar.Brand>
      </Navbar>
      <Container>{children}</Container>
    </>
  );
};
 
export default Layout;