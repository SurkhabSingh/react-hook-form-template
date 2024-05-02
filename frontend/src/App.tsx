import { BrowserRouter, Route, Routes } from "react-router-dom";
import Form from "./components/UserForm";
import EditForm from "./components/EditForm";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Form />} />
      <Route path="/edit-form" element={<EditForm />} />
    </Routes>
  </BrowserRouter>
);

export default App;
