import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index.js';
// import Image from 'react-bootstrap/Image';
import ImageWithAuth from '../image/ImageWithAuth.js';

const Profile = props => {

    const {token, tokenType, userId} = props;
    const {onGetProfileInfo, onClickGetImage, onGetProfileBooks} = props;

    useEffect(() => {
        onGetProfileInfo(token, tokenType);
        onClickGetImage(token, tokenType);
        onGetProfileBooks(token, tokenType, userId);
    },[onGetProfileInfo, onClickGetImage, onGetProfileBooks, token, tokenType, userId]);

    let profileDetails = null;
    if(props.name && props.email){
        profileDetails = (
            <div className="container-fluid" style={{ padding: '10px'}}>
                <div className="row">
                    <div className="col-sm-4">
                        <b>Email</b>
                        <br></br>
                        <b>Location</b>
                    </div>
                    <div className="col-sm-8">
                        {props.email}
                        <br></br>
                        {props.location}
                    </div>
                </div>
            </div>
        );
    }
    let allBooks = null;
    let privateBooks = null;
    let favoriteBooks = null;
    let openForOffersBooks = null;
    let wantToReadBooks = null;
    if(props.books){
        allBooks = props.books.map(book => 
            (
                <div key={book.bookId} className="card" style={{margin: "5px"}}>
                    <img className="card-img-top" src="img.png" alt="Book_Image" style={{width: "100%"}}/>
                    <div className="card-body">
                        <h6 className="card-title">{book.bookName}</h6>
                        <i>by {book.authorName}</i>
                    </div>
                </div>
            )
        );
        privateBooks = props.books.filter(book => !book.publicVisibility).map(book => 
            (
                <div key={book.bookId} className="card" style={{margin: "5px"}}>
                    <img className="card-img-top" src="img.png" alt="Book_Image" style={{width: "100%"}}/>
                    <div className="card-body">
                        <h6 className="card-title">{book.bookName}</h6>
                        <i>by {book.authorName}</i>
                    </div>
                </div>
            )
        );
        favoriteBooks = props.books.filter(book => book.favorites).map(book => 
            (
                <div key={book.bookId} className="card" style={{margin: "5px"}}>
                    <img className="card-img-top" src="img.png" alt="Book_Image" style={{width: "100%"}}/>
                    <div className="card-body">
                        <h6 className="card-title">{book.bookName}</h6>
                        <i>by {book.authorName}</i>
                    </div>
                </div>
            )
        );
        openForOffersBooks = props.books.filter(book => book.openForOffers).map(book => 
            (
                <div key={book.bookId} className="card" style={{margin: "5px"}}>
                    <img className="card-img-top" src="img.png" alt="Book_Image" style={{width: "100%"}}/>
                    <div className="card-body">
                        <h6 className="card-title">{book.bookName}</h6>
                        <i>by {book.authorName}</i>
                    </div>
                </div>
            )
        );
        wantToReadBooks = props.books.filter(book => book.wantToRead).map(book => 
            (
                <div key={book.bookId} className="card" style={{margin: "5px"}}>
                    <img className="card-img-top" src="img.png" alt="Book_Image" style={{width: "100%"}}/>
                    <div className="card-body">
                        <h6 className="card-title">{book.bookName}</h6>
                        <i>by {book.authorName}</i>
                    </div>
                </div>
            )
        );
    }

    return (
        <div className="container-fluid" style={{ padding: '10px'}}>
            <div className="row" style={{padding: '5px'}}>
                <div className="col-sm-4">
                    {/* <Image src={props.imageUrl} roundedCircle width="150px" height="150px" alt="Image Profile"/> */}
                    <ImageWithAuth/>
                </div>
                <div className="col-sm-8">
                    {profileDetails}
                </div>

            </div >
            <br></br>
            <div className="row" style={{ padding: '5px'}}>
                <div id="accordion" style={{ maxWidth: '100%'}}>
                    
                    <div className="card">
                        <div className="card-header" style={{ minWidth: '200px'}}>
                            <a className="card-link" data-toggle="collapse" href="#collapseOne" >
                            All books
                            </a>
                        </div>
                        <div id="collapseOne" className="collapse">
                            <div className=" card-body card-columns">
                                {allBooks}
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-header" style={{ minWidth: '200px'}}>
                            <a className="card-link" data-toggle="collapse" href="#collapseTwo" >
                            Private books
                            </a>
                        </div>
                        <div id="collapseTwo" className="collapse">
                            <div className=" card-body card-columns">
                                {privateBooks}
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-header" style={{ minWidth: '200px'}}>
                            <a className="card-link" data-toggle="collapse" href="#collapseThree" >
                            Favorite books
                            </a>
                        </div>
                        <div id="collapseThree" className="collapse">
                            <div className=" card-body card-columns">
                                {favoriteBooks}
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-header" style={{ minWidth: '200px'}}>
                            <a className="card-link" data-toggle="collapse" href="#collapseFour" >
                            Books open for offers
                            </a>
                        </div>
                        <div id="collapseFour" className="collapse">
                            <div className=" card-body card-columns">
                                {openForOffersBooks}
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-header" style={{ minWidth: '200px'}}>
                            <a className="card-link" data-toggle="collapse" href="#collapseFive" >
                            Books want to read
                            </a>
                        </div>
                        <div id="collapseFive" className="collapse">
                            <div className=" card-body card-columns">
                                {wantToReadBooks}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        tokenType: state.auth.tokenType,
        userId: state.auth.userId,
        name: state.profile.name,
        email: state.profile.email,
        location: state.profile.location,
        imageUrl: state.image.imageUrl,
        books: state.profile.books
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetProfileInfo: (token, tokenType) => dispatch(actions.getProfileInfo(token, tokenType)),
        onGetProfileBooks: (token, tokenType, userId) => dispatch(actions.getProfileBooks(token, tokenType, userId)),
        onClickGetImage: (token, tokenType) => dispatch(actions.getImage(token, tokenType))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Profile);