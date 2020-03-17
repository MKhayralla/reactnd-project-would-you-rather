import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { handleLogout } from '../store/shared'
const Navigate = (props) => {
    const { authedUser, dispatch } = props
    return (
        <Navbar bg='light' expand="md">
            <Navbar.Text disabled>Welcome {authedUser ? authedUser : null}</ Navbar.Text>
            <Navbar.Toggle aria-controls="items" />
            <Navbar.Collapse id='items'>
                <Nav>
                    <Nav.Link>
                        <Link to="/polls">Polls</ Link>
                    </ Nav.Link>
                    <Nav.Link>
                        <Link to="/leaderboard">Leaderboard</ Link>
                    </ Nav.Link>
                </ Nav>
                <Nav>
                    {authedUser ? (
                        <Nav.Link onClick={() => dispatch(handleLogout())}>
                            Logout
                    </ Nav.Link>
                    ) : (
                            <Nav.Link>
                                <Link to="/login">Login</ Link>
                            </ Nav.Link>
                        )}
                </ Nav>
            </ Navbar.Collapse>
        </ Navbar>
    )

}
function mapStateToProps(state) {
    const { authedUser } = state
    return { authedUser }
}

export default connect(mapStateToProps)(Navigate)
