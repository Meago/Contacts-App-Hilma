import "./App.css";
import Layout from "./components/shared/Layout";
import { Route, Routes } from "react-router-dom";
import AllContacts from "./pages/AllContacts";
import AddContact from "./pages/AddContact";
import EditContact from "./pages/EditContact";
 
function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<AllContacts />}></Route>
        <Route path="/add-contact" element={<AddContact />}></Route>
        <Route path="/edit-contact/:id" element={<EditContact />}></Route>
      </Routes>
    </Layout>
  );
}
export default App;