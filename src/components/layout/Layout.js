import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { useHistory, NavLink } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";



function Layout() {
    const [auth, setAuth] = useContext(AuthContext);

    const history = useHistory();

    function logout() {
        setAuth(null);
        history.push("/");
    }

    return (
   
        <Navbar bg="light" expand="lg">
    <NavLink to="/" exact>
        <Navbar.Brand href="/">
            <a href="/" className="logo-text"><span id="sol">SOL</span><span id="hjerter">HJERTER</span></a>
        </Navbar.Brand>
    </NavLink>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="ml-auto">
      <Nav.Link href="/courses">KURS</Nav.Link>
      <Nav.Link href="/about">OM OSS</Nav.Link>
      <Nav.Link href="/signup">PÅMELDING</Nav.Link>
      <Nav.Link href="/contact">KONTAKT</Nav.Link>
      {auth ? (
        <>
            
            <Nav.Link href="/admin-page">ADMINSIDE</Nav.Link>
            <Nav.Link onClick={logout}>LOGG UT</Nav.Link>
        </>
      ) : ( <Nav.Link href="/login"></Nav.Link>
      )}
    </Nav>
  </Navbar.Collapse>
</Navbar>

    );
}

export default Layout;