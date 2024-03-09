import { useMount } from "ahooks";
import { Container, Nav, Navbar, Spinner } from "react-bootstrap";
import { useNavigate, Outlet, Link } from "react-router-dom";

import { LogoutButton } from "@features/logout";
import { useAuthModel } from "@entities/auth";
import { TOPIC_LIST, AUTH_PATH, SECTION_LIST, USERS_LIST, AppConfirm } from "@shared";



export function Layout() {
    const navigate = useNavigate();
    const auth = useAuthModel()

    useMount(() => { init() })

    async function init() {
        const isAuth = await auth.getCurrentUser()
        if (!isAuth) {
            location.href = AUTH_PATH;
        } else {
            navigate(TOPIC_LIST)
        }
    }

    const menuList = [
        { title: 'Темы', link: TOPIC_LIST },
        { title: 'Секции', link: SECTION_LIST },
        { title: 'Пользователи', link: USERS_LIST },
    ];

    return (<>
        <Navbar bg="primary" variant="dark">
            <Container>
                <Navbar.Brand href="#home" >
                    <img
                        alt=""
                        src="/favicon-32x32.png"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                    GEO App
                </Navbar.Brand>
                <Nav className="me-auto">
                    {menuList.map(menuItem => <Nav.Link as={Link} key={menuItem.title} to={menuItem.link}>{menuItem.title}</Nav.Link>)}
                </Nav>
                <LogoutButton />
            </Container>
        </Navbar>

        <Container className="pt-4 pb-4">
            {auth.isAuth ? <Outlet /> : <Spinner animation="border" />}
        </Container>

        <AppConfirm />

    </>)
}