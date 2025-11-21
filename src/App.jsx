import Contacts from './Contacts.jsx';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./navigation/Layout.jsx";
import AddContact from './AddContact.jsx';
import DeleteContact from './DeleteContact.jsx';
import UpdateContact from './UpdateContact.jsx';

function App() {
  const Home = () => <p>Welcome.</p>;

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Layout title="Phone Contacts App"><Home /></Layout>}
          />
          <Route
            path="/contacts"
            element={<Layout title="Contacts List"><Contacts /></Layout>}
          />
          <Route
            path="/add"
            element={<Layout title="Add Contact"><AddContact /></Layout>}
          />
          <Route
            path="/delete"
            element={<Layout title="Delete Contact"><DeleteContact /></Layout>}
          />
          <Route
            path="/update"
            element={<Layout title="Update Contact"><UpdateContact /></Layout>}
          />
          {/* default */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
