import React, { useState, useEffect } from 'react';
import ApiCall from '../utils/ApiCall';

import './css/style.css'
import SwitchApi from '../utils/SwitchApi';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
} from "react-router-dom";
export default function Child() {
    const [port, setPort] = useState(0);
    var { id } = useParams();
    console.log(id)
    const [url,setUrl]=useState(null);
    useEffect(() => {
        setUrl(`https://api.meraki.com/api/v1/devices/${id}/clients`)
        ApiCall(url, 'GET', null).then(res => {
            setPort(res.data)
            console.log(port)
        }).catch(err => {
            console.log(err)
        })
    },[]);
    
    return (
        <div>
            asdad
        </div>
    );
}