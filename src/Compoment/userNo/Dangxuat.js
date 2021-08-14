import React from 'react';
import { Redirect } from "react-router-dom";
import {useCookies} from "react-cookie";
function Dangxuat(props) {
//nhận data gửi từ login
    const [cookies, setCookies,removeCookie] = useCookies(["usercf", "passwordcf","loaitaikhoancf","hotencf"])
    //xóa data
    removeCookie("usercf")
    removeCookie("passwordcf")
    removeCookie("loaitaikhoancf")
    removeCookie("hotencf")
    if(cookies.usercf == null){
        return <Redirect to="/dangnhap" />
     
    };
    window.location.reload();
    return (
        <div>
            
        </div>
    );
}

export default Dangxuat;