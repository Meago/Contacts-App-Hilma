import { Container } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
 
const Layout = ({ children }) => {
  return (
    <>
      <Navbar variant="dark" style={{backgroundColor:"#4D3F5A"}}>
        <Navbar.Brand>משה לוי</Navbar.Brand>
      </Navbar>
      <Container>{children}</Container>
    </>
  );
};
 
export default Layout;