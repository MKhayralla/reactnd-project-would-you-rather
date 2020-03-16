import React, {Fragment} from 'react'
import {Col, Image} from 'react-bootstrap'

export default function(props) {
    const {user} = props
    return (
        <Fragment>
            <Col xs={4} md={{'span' : 1, 'offset' : 3}}>
              <Image src={user.avatarURL} roundedCircle height={25} width={25} />
            </ Col>
            <Col xs={8}>
              <span className="user-name">{user.name}</span>
            </ Col>    
        </ Fragment>
    )
}