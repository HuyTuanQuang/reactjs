import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Redirect } from "react-router-dom";
//import useCookies để lưu data
import { useCookies } from "react-cookie";
function Log(props) {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const formData = [];
  const [acount, setAcount] = useState(formData); 
  const dataValue = {
    usercf: "",
    passwordcf: "",
    loaitaikhoancf: "",
    hotencf: "",
  };
  //sử dụng useCookies
  //removeCookies để xóa thời gian sống của data
  const [cookies, setCookies, removeCookie] = useCookies([dataValue]);
  const formDataInitValue = {
    Username: "",
    PassWord: "",
    loaitaikhoan: "",
    hoten: "",
  };
  const [acount1, setAcount1] = useState(formDataInitValue);
  const onChange = (event) => {
    const { name, value } = event.target;
    setAcount1({
      ...acount1,
      [name]: value,
    });
  };
  useEffect(() => {
    axios({
      method: "GET",
      url: "https://600e771e3bb1d100179df338.mockapi.io/acount",
    })
      .then((response) => {
        const { data } = response;
        setAcount(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const onSubmit = (e) => {
    e.preventDefault();
    if (acount1.Username == "") {
      setModal(true);
      return;
    } 
      acount.map((value) => {
        if (value.Username == acount1.Username && value.PassWord == acount1.PassWord) {
          let d = new Date();
          d.setTime(d.getTime() + 60 * 60 * 24 * 30 * 365);
          //gửi data lên ....
          setCookies("usercf", acount1.Username, {
            path: "/",
            expires: d,
          });
          setCookies("passwordcf", acount1.PassWord, {
            path: "/",
            expires: d,
          });
          setCookies("loaitaikhoancf", value.loaitaikhoan, {
            path: "/",
            expires: d,
          });
          setCookies("hotencf", value.hoten, {
            path: "/",
            expires: d,
          });
          //reload
          window.location.reload();
        }else{
          setModal(true);
        }
      });
    
  };
//Khi cookies có data chuyển về home
  if (cookies.usercf != null) {
    return <Redirect to="/home" />;
  }

  return (
    <div>
      <div>
        <React.Fragment>
          <CssBaseline />
          <Container maxWidth="sm">
            <Typography
              component="div"
              style={{ height: "80vh",marginTop:"7vh",borderRadius:'1vh', boxShadow: "2px 2px 100px black" }}
            >
              <h2
                style={{ fontWeight: "bold", color: "black" }}
                id="simple-modal-title"
              >
                Đăng Nhập
              </h2>
              <Link style={{ float: "left", fontSize: "15px" }} to="/dangki">
                <br />
                Quay lại đăng kí
              </Link>
              <hr />
              <br />
              <form onSubmit={onSubmit} class="form">
                <TextField
                  style={{
                    width: "20em",
                    backgroundColor: "white",
                    borderRadius: "1em",
                    boxShadow: "2px 2px 100px black",
                  }}
                  fullWidth
                  name="Username"
                  id="tfid1"
                  label="Username"
                  variant="outlined"
                  onChange={onChange}
                />
                <span id="name" />
                <br /> <br />
                <TextField
                  style={{
                    width: "20em",
                    backgroundColor: "white",
                    borderRadius: "1em",
                    boxShadow: "2px 2px 100px black",
                  }}
                  fullWidth
                  name="PassWord"
                  id="tfid1"
                  type="password"
                  label="PassWord"
                  variant="outlined"
                  onChange={onChange}
                />
                <span id="pw" />
                <br />
                <br />
                <Button type="submit" color="danger">
                  {" "}
                  Đăng Nhập{" "}
                </Button>{" "}
              </form>{" "}
              <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Thông báo</ModalHeader>
                <ModalBody>Sai Thông Tin Đăng Nhập !</ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={toggle}>
                    Ok
                  </Button>{" "}
                  <Button color="secondary" onClick={toggle}>
                    Cancel
                  </Button>
                </ModalFooter>
              </Modal>
            </Typography>
          </Container>
        </React.Fragment>
      </div>
    </div>
  );
}

export default Log;
