import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


function NavBar({user}) {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">DiRates</Navbar.Brand>
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
            <Nav.Link href="/login">My account</Nav.Link>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;

