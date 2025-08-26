import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import { useContext } from 'react';
import {DarkModeContext, SetDarkModeContext} from './Context/DarkMode.jsx'


function Navigation({user, signOut}) {
  const darkMode = useContext(DarkModeContext);
  const toggleDarkMode = useContext(SetDarkModeContext)
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand style={{color:"white"}} href="/">DiRates</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/courses">Courses</Nav.Link>
            <Nav.Link href="/teachers">Teachers</Nav.Link>
            {!user ? (
            <>
            <Nav.Link href="/signup">Sign up</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            </>
            ) : (
              <Dropdown align="end">
                <Dropdown.Toggle as={Nav.Link} className= "nav-link"variant="secondary" size="sm">
                  My Account
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#profile"> Profile </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={signOut}> Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            
            )}
          </Nav>
          <Button
          variant={darkMode ? 'light' : 'secondary'} 
          onClick={toggleDarkMode}
          size='sm'>
            {darkMode? "☀️" : "🌙"}
          </Button>
          
          
        </Container>
      </Navbar>
    </>
  );
}

export default Navigation;

