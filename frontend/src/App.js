import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Import Router components
import Header from './components/header/Header';
import AddUserForm from './components/AddUserForm';
import UserList from './components/UserList';
import ContactUs from './components/ContactUs';
import Footer from './components/Footer/footer';

function App() {
  return (
    <Router>
      <Header />
      <div className="container mx-auto px-4 py-6 overflow-auto">
       
        <Routes>
          <Route path="/" element={<AddUserForm />} />
          <Route path="/view-user" element={<UserList />} />
          <Route path="/contact-us" element={<ContactUs />} />
        </Routes>
      </div>
      <Footer/>
    </Router>
  );
}

export default App;
