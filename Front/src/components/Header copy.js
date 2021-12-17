import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faBars } from '@fortawesome/free-solid-svg-icons';
import { ReactComponent as Logo } from './sources/logo-ochobits2.svg';
/* import { line } from '@fortawesome/react-fontawesome'; */

const Header = (props) =>{

    return(
        <>
        
        {/* <Navbar bg="light" expand={false}>
        <Container fluid>
        <Navbar.Toggle aria-controls="offcanvasNavbar" />
            <Navbar.Brand href="#">Navbar Offcanvas</Navbar.Brand>
            
            <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="start"
            >
            <Offcanvas.Header closeButton>
                <Offcanvas.Title id="offcanvasNavbarLabel">Offcanvas</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="#action1">Home</Nav.Link>
                <Nav.Link href="#action2">Link</Nav.Link>
                <NavDropdown title="Dropdown" id="offcanvasNavbarDropdown">
                    <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                    Something else here
                    </NavDropdown.Item>
                </NavDropdown>
                </Nav>
                <Form className="d-flex">
                <FormControl
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
                </Form>
            </Offcanvas.Body>
            </Navbar.Offcanvas>
        </Container>
        </Navbar> */}
        {/* <Router>
        <Navbar bg="light" expand="lg">
          <Container fluid>
            <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="HelloMessage">HelloMessage</Nav.Link>
                <Nav.Link as={Link} to="TodoApp">TodoApp</Nav.Link>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar> */}
        {/* <DataContext.Provider value={ user } >
          <Routes>
            <Route path="HelloMessage" element={<HelloMessage />} />
            <Route path="TodoApp" element={<TodoApp />} />
            <Route path="ClassTimer" element={<ClassTimer />} />
            <Route path="FunctionTimer" element={<FunctionTimer />} />
          </Routes>
        </DataContext.Provider> */}
      {/* </Router> */}
        <header className="header">
            {/* <> */}
        {/* <header className="header"> */}
            <div className="div-bars-logo">
                <div className="div-bars">
                <FontAwesomeIcon className="fas fa-bars" icon={ faBars }/>
                    {/* <i className="fas fa-bars"></i> */}
                </div>
                <Logo className="logo-header" alt='logo Ocho Bits'/>
            </div>
            <div className="nav-father">
                <nav className="nav-menu">
                    <a /* href={mainChanger('tables.html')} */ className="txt-menu tm-users"><span>Tables</span></a>
                    {/* <a href="javascript:getUsers();" className="txt-menu tm-users"><span>Users</span></a>
                    <a href="javascript:getLaptops();" className="txt-menu tm-laptop" ><span>Laptops</span></a> */}
                    <a /* href={mainChanger('orders.html')} */ className="txt-menu tm-orders"><span>Orders</span></a>
                </nav>
                <div className="nav-menu-popup"></div>
                <nav className="nav-menu-left">
                    <a /* href={mainChanger('tables.html')}  */className="txt-menu-left tm-users"><span>Tables</span></a>
                    {/* <a href="javascript:getUsers();" className="txt-menu-left tm-users"><span>Users</span></a>
                    <a href="javascript:getLaptops();" className="txt-menu-left tm-laptop"><span>Laptops</span></a> */}
                    <a /* href={mainChanger('orders.html')} */ className="txt-menu-left tm-orders"><span>Orders</span></a>
                </nav>
                <div className="menu-logo-user">
                    {/* <i className="fas fa-user-circle"></i> */}
                    <FontAwesomeIcon className="fas fa-user-circle" icon={ faUserCircle }/>
                </div>
                <div className="div-menu-user">
                    <a href="#" className="txt-menu t-m-name"><span>juanito</span></a>
                    
                    <i className="fas fa-caret-down"></i>
                </div>
            </div>
            <div className="nav-menu-popup2"></div>
            <div className="info-user">
            </div>
            {/* </header> */}
            {/* </> */}
        </header>
        </>
        
    )

}

export default Header;