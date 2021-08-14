import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import { Button } from "reactstrap";
import { useState, useEffect } from "react";
import "../user/style.css";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
function Sings(props) {
  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const toggle = () => setModal(!modal);
  const toggle1 = () => setModal1(!modal1);
  const dangki = {
    PassWord: "",
    Username: "",
    hoten: "",
    diachi: "",
    loaitaikhoan: "User",
  };
  const dangki1 = {
    PassWord: "",
    Username: "",
    hoten: "",
    diachi: "",
    loaitaikhoan: "User",
    NlPass: "",
  };
  const [listUser, SetListUser] = useState(dangki);
  const [listUser1, SetListUser1] = useState(dangki1);
  const onChangehanler = (e) => {
    const { name, value } = e.target;
    SetListUser({
      ...listUser,
      [name]: value,
    });
  };
  const onChangehanler1 = (e) => {
    const { name, value } = e.target;
    SetListUser1({
      ...listUser,
      [name]: value,
    });
  };
  const[acount,setAcount]=useState([]);
  //gọi acout về
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
  //đưa giữ liệu lên mockapi Acount = axios
  const Accont = () => {
    axios({
      method: "POST",
      url: "https://600e771e3bb1d100179df338.mockapi.io/acount",
      data: listUser,
    })
      .then((response) => {
        const { data } = response;
        SetListUser(data);
         window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const submitForm = (e) => {
    e.preventDefault();
  
    if (listUser.Username === "") {setModal(true) 
      return;
    } else if (listUser.PassWord === "") {setModal(true)
       return;
    } else if (listUser1.NlPass === "") {setModal(true) 
      return;
    } else if ( listUser.NlPass === listUser1.NlPass) {setModal(true) 
      return;
    } else if (listUser.hoten === "") {setModal(true) 
      return;
    } else if (listUser.diachi === "") {setModal(true) 
      return;
    }else{
      Accont();
      setModal1(true); 
    } 
  //   acount.map((value)=>{
  //     console.log(value.Username)
  //     if(value.Username != listUser.Username){
  //       Accont();
  //        setModal1(true);
  //       return;
  //     }else {
  //      alert('User Đã Tồn tại');
     
  //     }
    
  // })
  };

  return (
    <div>
     
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm">
          <Typography
            component="div"
            style={{
              height: "85vh",
              marginTop: "3vh",
              borderRadius: "2vh",
              boxShadow: "2px 2px 50px black",
            }}
          >
            <h2
              style={{ fontWeight: "bold", color: "black" }}
              id="simple-modal-title"
            >
              {" "}
              Đăng Kí{" "}
            </h2>{" "}
            <Link style={{ float: "left", fontSize: "15px" }} to="/dangnhap">
              <br />
              Đăng Nhập
            </Link>
            <hr />
            <br />
            <form
              class="form"
              onSubmit={(event) => {
                submitForm(event);
              }}
            >
              <TextField
                style={{
                  width: "20em",
                  backgroundColor: "white",
                  borderRadius: "1em",
                  boxShadow: "2px 2px 100px black",
                }}
                onChange={onChangehanler}
                name="Username"
                id="tfid1"
                label="Username"
                variant="outlined"
              />
              <span id="em" />
              <br /> <br />
              <TextField
                style={{
                  width: "20em",
                  backgroundColor: "white",
                  borderRadius: "1em",
                  boxShadow: "2px 2px 50px black",
                }}
                fullWidth
                onChange={onChangehanler}
                name="PassWord"
                id="tfid1"
                type="password"
                label="PassWord"
                variant="outlined"
              />
              <span id="pw" />
              <br /> <br />
              <TextField
                style={{
                  width: "20em",
                  backgroundColor: "white",
                  borderRadius: "1em",
                  boxShadow: "2px 2px 50px black",
                }}
                fullWidth
                onChange={onChangehanler1}
                name="NlPass"
                id="tfid1"
                type="password"
                label="Nhập lại password"
                variant="outlined"
              />
              <span id="nlpw" />
              <br /> <br />
              <TextField
                style={{
                  width: "20em",
                  backgroundColor: "white",
                  borderRadius: "1em",
                  boxShadow: "2px 2px 50px black",
                }}
                fullWidth
                onChange={onChangehanler}
                name="hoten"
                id="tfid1"
                label="Họ Và Tên"
                variant="outlined"
              />
              <br />
              <br />
              <TextField
                style={{
                  width: "20em",
                  backgroundColor: "white",
                  borderRadius: "1em",
                  boxShadow: "2px 2px 50px black",
                }}
                fullWidth
                onChange={onChangehanler}
                name="diachi"
                id="tfid1"
                label="Địa chỉ"
                variant="outlined"
              />
              <Button
                color="danger"
                style={{ marginTop: "2em", marginLeft: "10em" }}
              >
                {" "}
                Đăng Kí{" "}
              </Button>{" "}
            </form>{" "}
          </Typography>
        </Container>
      </React.Fragment>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Thông báo</ModalHeader>
        <ModalBody>Thiếu thông tin</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Ok
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={modal1} toggle1={toggle1}>
        <ModalHeader toggle1={toggle1}>Thông báo</ModalHeader>
        <ModalBody>Đăng kí thành công</ModalBody>
        <ModalFooter> 
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default Sings;
