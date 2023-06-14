import "./App.css";
import Layout from "./components/shared/Layout";
import { Route, Routes } from "react-router-dom";
import AllContacts from "./pages/AllContacts";
 
function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<AllContacts />}></Route>
      </Routes>
    </Layout>
  );
}
export default App;