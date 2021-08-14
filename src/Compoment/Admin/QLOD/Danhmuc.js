import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import "../../user/style.css";
import { useState, useEffect } from "react";
import axios from "axios";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { Badge } from "reactstrap";
import Snackbar from "@material-ui/core/Snackbar";
import "../../cafe.css";
import { Link } from "react-router-dom";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import VisibilityIcon from "@material-ui/icons/Visibility";
import CloseIcon from "@material-ui/icons/Close";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import AppBar from "@material-ui/core/AppBar";
import TextField from "@material-ui/core/TextField";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Button,
} from "reactstrap";
import { useCookies } from "react-cookie";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: "sm",
    height: 600,
    transform: "translateZ(0)",
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
  r1: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
}));
function Danhmuc(props) {
  const [loading, setLoading] = useState(false);
  const [cookies, setCookies, removeCookie] = useCookies([
    "usercf",
    "passwordcf",
    "loaitaikhoancf",
    "hotencf",
  ]);

  const [open1, setOpen1] = React.useState(false);

  const handleClick = () => {
    setOpen1(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen1(false);
  };
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const rows = [];
  const rows1 = {
    tenSp: "",
    giaSp: "",
  };

  const [danhmuc1, setDanhmuc1] = useState(rows1);
  const [danhmuc, setDanhmuc] = useState(rows);
  const [listDanhMuc, setListDanhMuc] = useState([]);
  useEffect(() => {
    const url = "https://600e771e3bb1d100179df338.mockapi.io/danhmuc/";
    axios.get(url).then((response) => {
      const { data } = response;
      setListDanhMuc(data);
    });
  }, []);
  const [danhMucId, setDanhMucId] = useState(1);
  const urlParams = new URLSearchParams(window.location.search);
  let pageInit = urlParams.get("page") != null ? parseInt(urlParams.get("page")) : 1;
  const [page, setPage] = useState(pageInit);
  const [limit, setLimit] = useState(10);
  let url =
    "https://600e771e3bb1d100179df338.mockapi.io/danhmuc/" +
    danhMucId +
    "/shopcafe?limit=" +
    limit +
    "&page=" +
    page;
  useEffect(() => {
    if (danhMucId == -1) {
      return;
    }
    setLoading(true);
    axios({
      method: "GET",
      url: url,
    })
      .then((response) => {
        const { data } = response;
        setDanhmuc(data);
        setLoading(false);
        console.log("ăn" + data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [page, danhMucId]);
  const pageTruoc = function () {
    if (page == 1) {
      return;
    }
    setPage(page - 1);
  };

  const pageSau = function () {
    setPage(page + 1);
  };

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  
  //thông tin từng sản phẩm
  const chitiet = {
    maSp: "",
    danhmucId: "",
    tenSp: "",
    giaSp: "",
    avatar: "",
    thongtinsp: "",
    trangthai: "",
  };
  
  const [thongtin, setthongtin] = useState(chitiet);
  //lấy thông tinh chi tiết
  const onMouseMoveHander = (e, value, index) => {
    setthongtin(value);  
  };
  
  console.log(thongtin.tenSp);
 //data để thêm vào giỏ hàng
  const dssp = {
    tenSp:`${thongtin.tenSp}`,
    giaSp: `${thongtin.giaSp}`,
    username: `${cookies.hotencf}`,
    image:`${thongtin.avatar}`,
  };
  const [cart, setCart] = useState(dssp);
  const addCart = () => {
    axios({
      method: "POST",
      url: "https://600e771e3bb1d100179df338.mockapi.io/giohang",
      data: dssp,
    })
      .then((response) => {
        const { data } = response;
        setCart({
          data,
        });
        return;
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const onclickHander = (e) => {
    e.preventDefault();
    addCart();
    setModal(true);
    return;
  };
  const danhMucOnChange = function (event) {
    setDanhMucId(event.target.value);
    setPage(1);
  };
  //Mở thông tin sản phẩm trên dialog
  const [open2, setOpen2] = React.useState(false);
  const handleClickOpen2 = () => {
    setOpen2(true);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };
  //tìm kiếm
const [seach,setSeach]=useState("");
let url1='https://600e771e3bb1d100179df338.mockapi.io/danhmuc/' +   danhMucId + '/shopcafe?filter='+seach;
useEffect(() => {
  if ( danhMucId == -1) {
    return ;
  }
  setLoading(true);
  axios({
    method: "GET",
    url: url1,
  })
    .then((response) => {
      const { data } = response;
      setDanhmuc(data);
      setLoading(false);
    })
    .catch((error) => {
      console.log(error);
    });
}, [
  danhMucId,seach]);
  return (
    <div class="Danhmuc">
      <Backdrop open={loading} style={{ zIndex: "1000" }}>
        <CircularProgress />
      </Backdrop>

      <div
        style={{
          float: "right",
          width: "80%",
          height: "100vh",
          overflow: "scroll",
        }}
      >
        {danhmuc.map((value, index) => (
          <Card
          onMouseMove={(event) => {
            onMouseMoveHander(event, value, index);
          }}
            id="card"
            key={value.maSp}
            style={{
              width: "20%",
              height: "22em",
              float: "left",
              marginLeft: "2em",
              marginTop: "1em",
              borderRadius: "3em",
            }}
          >
            <CardImg
              style={{ borderRadius: "1em", width: "100%" }}
              top
              height="65%"
              src={value.avatar}
              alt={value.avatar}
            />
            <CardBody>
              <CardTitle tag="h5">{value.tenSp}</CardTitle>
              <CardText>{value.giaSp}</CardText>
            </CardBody>
            {cookies.hotencf != null ? (
              <div>
                <Button
                  style={{
                    width: "25%",
                    float: "left",
                    backgroundColor: "violet",
                  }}
                 
                  onClick={handleClickOpen2}
                >
                  <VisibilityIcon />
                </Button>
                <Button
                  style={{
                    width: "25%",
                    float: "right",
                    backgroundColor: "violet",
                  }}
                  onMouseMove={(event) => {
                    onMouseMoveHander(event, value, index);
                  }}
                  onClick={onclickHander}
                >
                  <AddShoppingCartIcon />
                </Button>
              </div>
            ) : (
              <div>
                <Button
                  style={{
                    width: "25%",
                    float: "left",
                    backgroundColor: "violet",
                  }}
                  onMouseMove={(event) => {
                    onMouseMoveHander(event, value, index);
                  }}
                  onClick={handleClickOpen2}
                >
                  <VisibilityIcon />
                </Button>
                <Button
                  style={{
                    width: "25%",
                    float: "right",
                    backgroundColor: "violet",
                  }}
                  onClick={handleClick}
                >
                  <AddShoppingCartIcon />
                </Button>
              </div>
            )}
          </Card>
        ))}
      </div>
      <div style={{ height: "35em" }}>
      <form class="form-inline md-form form-sm active-pink active-pink-2">
      <TextField
          style={{ float: "left" }}
          id="standard-basic"
          label="Tìm kiếm"
          fullWidth
          onChange={(e)=>{
            setSeach(e.target.value)
          }}
        />
          </form>
        <h6>Danh Mục</h6>
        {listDanhMuc.map((danhMuc, index) => {
          return (
            <Button
            id="button"
              key={index}
              value={danhMuc.maSp}
              style={{
                fontSize: "12px",
                marginTop: "0.3em",
                width: "20em",
                height: "2em",
               
              }}
              onClick={danhMucOnChange}
              color="dark"
            >
              {danhMuc.Tendanhmuc}
            </Button>
          );
        })}
      </div>

      <div id="an" >
        <Badge
          style={{ marginLeft: "0.5em", width: "5em" }}
          href="#"
          onClick={pageTruoc}
          color="dark"
        >
          Prew
        </Badge>
        <Badge style={{ marginLeft: "0.5em", width: "2em" }}>{page}</Badge>
        <Badge
          style={{ marginLeft: "0.5em", width: "5em" }}
          href="#"
          onClick={pageSau}
          color="dark"
        >
          Next
        </Badge>
      </div>

      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={open1}
        autoHideDuration={2000}
        onClose={handleClose}
        message="Vui Lòng đăng nhập vào coffe shop"
        action={
          <React.Fragment>
            <Link to="/dangnhap">Đăng nhập</Link>
          </React.Fragment>
        }
      />

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Thông báo</ModalHeader>
        <ModalBody> {cookies.hotencf} đã add vào Giỏ hàng</ModalBody>
        <ModalFooter>
          <Link to="/Cart">Xem giỏ hàng</Link>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      {/* Thông tin sản Phẩm
       */}
      <Dialog
        fullScreen
        open={open2}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar id="AppBar" className={classes.appBar}>
          <Toolbar></Toolbar>
        </AppBar>
        <List>
          <div style={{ width: "50%", float: "left" }}>
            <img src={thongtin.avatar} />
          </div>
          <div style={{ width: "50%", float: "left", marginTop: "5em" }}>
            <h1>{thongtin.tenSp}</h1>

            <label>Giá :{thongtin.giaSp}</label>
            <br />
            <label>Trạng thái :{thongtin.trangthai}</label>
            <br />
            <label>Thông Tin : {thongtin.thongtinsp}</label>
            <br />
          </div>

          {cookies.hotencf != null ? (
            <div>
              <Button>Mua</Button>
              <Button autoFocus color="inherit" onClick={handleClose2}>
              Đóng
            </Button>
            </div>
          ) : (
            <Button autoFocus color="inherit" onClick={handleClose2}>
              Đóng
            </Button>
          )}
        </List>
      </Dialog>
    </div>
  );
}

export default Danhmuc;
