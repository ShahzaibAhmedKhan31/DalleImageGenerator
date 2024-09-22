import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import logo from '../Images/openai.png';
import ThemeToggleButton from './ToggleButton';
import { useSelector } from 'react-redux';


function MyNavbar() {
  var darkMode = useSelector(state => state.darkMode)
  
  return (
    <>
    <Navbar bg={darkMode ? "dark" : "light"} variant={darkMode ? "dark" : "light"}>
      <Container>
        <Image src={logo} rounded width='50' />
        <Navbar.Brand href="/">DaLL-E Image Generator</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/gallery">Gallery</Nav.Link>
        </Nav>
        <ThemeToggleButton />
      </Container>
    </Navbar>
    </>
  );
}

export default MyNavbar;