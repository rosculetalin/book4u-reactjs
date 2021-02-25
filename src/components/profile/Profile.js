import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index.js';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Profile = props => {

    const {onGetProfile, onClickGetImage} = props;

    useEffect(() => {
        onGetProfile(props.token, props.tokenType);
        onClickGetImage(props.token, props.tokenType);
    },[onGetProfile, onClickGetImage, props.token, props.tokenType]);

    let profileDetails = null;
    if(props.id && props.name && props.email){
        profileDetails = (
            <div>
                <h2>{props.name}</h2>
                <hr></hr>
                <Container fluid style={{ padding: '10px'}}>
                <Row className="justify-content-md-center" style={{height: '150px'}}>
                    <Col sm={4}>
                        <b>Email</b>
                        <br></br>
                        <b>Location</b>
                    </Col>
                    <Col sm={8}>
                        {props.email}
                        <br></br>
                        {props.location}
                    </Col>
                </Row>
            </Container>
            </div>
        );
    }

    return (
        <div>
            <Container fluid style={{ padding: '10px'}}>
                <Row className="justify-content-md-center" style={{height: '200px'}}>
                    <Col md="auto">
                        <Image src={props.imageUrl} roundedCircle width="150px" height="150px" alt="Image Profile"/>
                    </Col>
                    <Col xs>
                        {profileDetails}
                    </Col>
                </Row>
            </Container>
            
        </div>
    );
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        tokenType: state.auth.tokenType,
        id: state.profile.id,
        name: state.profile.name,
        email: state.profile.email,
        location: state.profile.location,
        imageUrl: state.image.imageUrl
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetProfile: (token, tokenType) => dispatch(actions.getProfile(token, tokenType)),
        onClickGetImage: (token, tokenType) => dispatch(actions.getImage(token, tokenType))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Profile);