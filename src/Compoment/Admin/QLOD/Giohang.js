import React from "react";
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';
  import  { useState,useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie"; 
function Giohang() {
    const [cookies, setCookies, removeCookie] = useCookies([
        "usercf",
        "passwordcf",
        "loaitaikhoancf",
        "hotencf",
      ]);
    const [cart,setCart] =useState([]);
    let url = "https://600e771e3bb1d100179df338.mockapi.io//giohang";
    useEffect(() => {
      axios({
        method: "GET",
        url: url,
      })
        .then((response) => {
          const { data } = response;
          setCart(data);
      
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);


     //delete
  // const onDelete = (value, index) => {
  //   const url =
  //     "https://600e771e3bb1d100179df338.mockapi.io/shopcafe/" + value.maSp;

  //   return axios({
  //     method: "delete",
  //     url: url,
  //   });
  // };
  // const btnDeleteOnClick = function (event, value, index) {
  //   const result = onDelete(value, index);

  //   result
  //     .then((response) => {
  //       setDanhmuc((oldState) => {
  //         let newState = oldState.filter((value, idx) => {
  //           return idx == index ? false : true;
  //         });

  //         return newState;
  //       });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };
 
  return (
    <div>
      <div style={{ width: "100%", height: "36em"   , overflow: "scroll" }}>
      {
           cookies.hotencf != null ? (
            cart.map((value, index) => (
                <Card
                  id="card"
                  key={value.maSp}
                  style={{
                    width: "20%",
                    height: "23em",
                    float: "left",
                    marginLeft: "3.3em",
                    marginTop: "1em",
                  }}
                >
                  <CardImg top width="100%" height="60%" src={value.image} alt={value.image} />
                  <CardBody>
                    <CardTitle tag="h5">{value.tenSp}</CardTitle>
                    <CardSubtitle tag="h6" className="mb-2 text-muted">
                      {value.giaSp}
                    </CardSubtitle>
                    <CardText>Sản Phẩm của {value.username}</CardText>
                  </CardBody>
               
                </Card>
              ))
           ) : (
               <h1>B iu ơi login để xem giỏ hàng nào</h1>
           )
        }
       
      </div>
    </div>
  );
}

export default Giohang;
