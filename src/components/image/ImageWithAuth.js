import React, {useState} from 'react';
import axios from 'axios';
import Image from 'react-bootstrap/Image';

const ImageWithAuth = (props) => {

    const [img, setImg] = useState(null);
    
    const url = 'http://localhost:8080/getImageProfile';
    const headers = {
        'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzIiwiaWF0IjoxNjIyNjUzNzI3LCJleHAiOjE2MjM1MTc3Mjd9.A7wYd0R3hN9nCdLUoDQy9priha9Bu2ojJZLpftdXjKBJcDkhRgzOXhPIidBio3QXh6gLm2PrLb8kMGV-uPcY9g'
    };
    axios.get(url, {headers: headers, responseType: 'blob'})
        .then(function (response) {

            var reader = new window.FileReader();
            reader.readAsDataURL(response.data); 
            reader.onload = function() {
                setImg(reader.result)
            }
        })

    return (
        <Image src={img} roundedCircle width="150px" height="150px" alt="Image Profile"/>
    );
}

export default ImageWithAuth;