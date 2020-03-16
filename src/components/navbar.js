import React from 'react'
import {Navbar, Nav} from 'react-bootstrap'
import {connect} from 'react-redux'
import {log_out} from '../store/actions'
const Navigate = (props) => {
    const {authedUser, dispatch} = props
    return (
        <Navbar bg='light' expand="md">
            <Navbar.Brand disabled>Welcome {authedUser?authedUser:null}</ Navbar.Brand>
            <Navbar.Toggle aria-controls="items" />
            <Navbar.Collapse id='items'>
                <Nav>
                    <Nav.Link>
                        Questions
                    </ Nav.Link>
                    <Nav.Link>
                        Leaderboard
                    </ Nav.Link>
                </ Nav>
                <Nav className="justify-content-end">
                    <Nav.Link onClick={()=>dispatch(log_out())}>
                        Logout
                    </ Nav.Link>
                </ Nav>
            </ Navbar.Collapse>
        </ Navbar>
    )

}
function mapStateToProps(state) {
    const {authedUser} = state
    return {authedUser}
}

export default connect(mapStateToProps)(Navigate)