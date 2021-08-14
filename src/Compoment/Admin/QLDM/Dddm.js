import React, { useState } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import DeleteIcon from "@material-ui/icons/Delete";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Badge } from "reactstrap";
import SystemUpdateAltIcon from "@material-ui/icons/SystemUpdateAlt";
import Dialog from "@material-ui/core/Dialog";
import CropFreeIcon from "@material-ui/icons/CropFree";
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { useEffect } from "react";
const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 550,
  },
  appBar: {
    position: 'relative',
    backgroundColor:'green',
  },
  title: {
    marginLeft: '',
    flex: 1,
  },
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Dddm({
  clicked,
  setClicked,
  dmuc,
  setdmuc,
  danhmuc,
  setDanhmuc,
  pageSau,
  pageTruoc,
  handleClickOpen1,
}) {
  const [open2, setOpen2] = React.useState(false);

  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const classes = useStyles();

  //Xóa Sản Phẩm
  const onDelete = (value, index) => {
    const url =
      "https://600e771e3bb1d100179df338.mockapi.io/danhmuc/" + value.maSp;
    return axios({
      method: "delete",
      url: url,
    });
  };
  const btnDeleteOnClick = function (e, value, index) {
    const result = onDelete(value, index);

    result
      .then((response) => {
        setDanhmuc((oldState) => {
          let newState = oldState.filter((value, idx) => {
            return idx === index ? false : true;
          });
          return newState;
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //hiện danh mục lên form
  const MouseMove = (e, value, index) => {
    setClicked(index);
    setdmuc(value);
    console.log(value)
  };
 
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setdmuc({
      ...dmuc,
      [name]: value,
    });
  };
   //update
  const onUpdateDanhMuc = () => {
    axios({
      url: "https://600e771e3bb1d100179df338.mockapi.io/danhmuc/" + dmuc.maSp,
      method: "PUT",
      data: dmuc,
    })
      .then((response) => {
        const { data } = response;
        setDanhmuc((oldState) => {
          let newState = oldState.map((value, index) => {
            return index === clicked ? data : value;
          });
          return newState;
        });
        window.location.reload();
      })
      .catch((error) => {
        console.error(error.response);
      });
  };
  //Hiện sản Phẩm
  const [sp,setSp]= useState([]);
  const urlParams1 = new URLSearchParams(window.location.search);
  let pageInit1 =urlParams1.get("page") != null ? parseInt(urlParams1.get("page")) : 1;
  const [page1, setPage1] = useState(pageInit1);
  const [limit1, setLimit1] = useState(10);
  let url ='https://600e771e3bb1d100179df338.mockapi.io/danhmuc/' + dmuc.maSp + '/shopcafe?limit=' + limit1 + '&page=' + page1;
  useEffect(() => {
    axios({
      method: "GET",
      url: url,
    })
      .then((response) => {
        const { data } = response;
        setSp(data);
        console.log("data :" +data)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [page1,dmuc.maSp]);
  const onSubmitHandler = (e) => {
    e.preventDefault();
    onUpdateDanhMuc();
  };
  //chuyển page
  const pageTruoc1 = function () {
    if (page1 == 1) {
      return;
    }

    setPage1(page1 - 1);
  };

  const pageSau1 = function () {
    setPage1(page1 + 1);
  };
   //tìm kiếm
const [seach,setSeach]=useState("");
let url1='https://600e771e3bb1d100179df338.mockapi.io/danhmuc?filter='+seach;
useEffect(() => {
  axios({
    method: "GET",
    url: url1,
  })
    .then((response) => {
      const { data } = response;
      setDanhmuc(data);
    })
    .catch((error) => {
      console.log(error);
    });
}, [
seach]);
console.log(seach)
  return (
    <div>
      <div>
        {" "}
        <TextField
          style={{ float: "left" }}
          id="standard-basic"
          label="Tìm kiếm"
          onChange={(e)=>{
            setSeach(e.target.value)
          }}
        />
        
      </div>
      <Paper style={{ height: "40em" }} className={classes.root}>
        <TableContainer
          style={{ height: "28em" }}
          className={classes.container}
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Mã Danh Mục</TableCell>
                <TableCell>Tên Danh Mục </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>Xóa</TableCell>
                <TableCell>Update</TableCell>
                <TableCell>Mở rộng</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {danhmuc.map((value, index) => {
                return (
                  <TableRow hover key={value.maSp}>
                    <TableCell>
                      <span>D</span>
                      {value.maSp}
                    </TableCell>
                    <TableCell>{value.Tendanhmuc}</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                    <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                    <TableCell>
                      {" "}
                      <Button
                        onClick={(event) =>
                          btnDeleteOnClick(event, value, index)
                        }
                      >
                        <DeleteIcon />
                      </Button>
                    </TableCell>
                    <TableCell>
                      {" "}
                      <Button
                        onMouseMove={(event) => {
                          MouseMove(event, value, index);
                        }}
                        onClick={handleClickOpen}
                      >
                        <SystemUpdateAltIcon />
                      </Button>
                    </TableCell>
                    <TableCell>
                      {" "}
                      <Button
                        onMouseMove={(event) => {
                          MouseMove(event, value, index);
                        }}
                        onClick={handleClickOpen2}
                      >
                        <CropFreeIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <div style={{ float: "left" }}>
          <Badge
            style={{ marginLeft: "1em", width: "5em" }}
            href="#"
            color="dark"
            onClick={pageTruoc}
          >
            Prew
          </Badge>
          <Badge
            onClick={pageSau}
            style={{ marginLeft: "0.5em" }}
            href="#"
            color="dark"
          >
            Next
          </Badge>
        </div>
      </Paper>

      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div
        
        >
          <form
            onSubmit={onSubmitHandler}
            style={{ marginTop:'1em'}}
            class="form"
          >
            <TextField
            
              onChange={onChangeHandler}
              name="Tendanhmuc"
              id="tfid1"
              label="Tên Danh mục"
              variant="outlined"
              value={dmuc.Tendanhmuc}
              autoComplete="null"
         ></TextField>
            <br />
            <br />
            <Button type="submit" style={{ float: "right" }} variant="outlined">
              Cập Nhật
            </Button>
            <Button
              onClick={handleClose}
              style={{ float: "right", marginRight: "7vh" }}
              variant="outlined"
            >
              caned
            </Button>
          </form>
        </div>
      </Dialog>
      {/* <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message="Chọn Thành Công"
        action={<React.Fragment></React.Fragment>}
      ></Snackbar> */}
      <Dialog fullScreen open={open2} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Button  autoFocus color="inherit" onClick={handleClose2}>
            <CloseIcon />
            </Button>
          </Toolbar>
        </AppBar>
        <List>
        <Paper style={{height:'35em'}} className={classes.root}>
        <TableContainer style={{height:'35em'}} className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Mã Sản Phẩm</TableCell>
                <TableCell>Tên Sản Phẩm</TableCell>
                <TableCell>Giá Sản Phẩm</TableCell>
                <TableCell>Thông tin Sản Phẩm</TableCell>
                <TableCell>Trạng Thái</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>!!</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sp.map((value, index) => {
                return (
                  <TableRow
                    hover
                   
                    key={value.maSp}
                  >
                    <TableCell>
                      <span>CF</span>
                      {value.maSp}
                    </TableCell>
                    <TableCell>{value.tenSp}</TableCell>
                    <TableCell>{value.giaSp}</TableCell>
                    <TableCell>{value.thongtinsp}</TableCell>
                    <TableCell>{value.trangthai}</TableCell>
                  
                    <TableCell>
                      <img
                        style={{ width: "4em", height: "5em" ,borderRadius:'20em' }}
                        src={value.avatar}
                      ></img>
                    </TableCell>
                    <TableCell>
                   
                
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          
        </TableContainer>
        <div style={{ float: "right" }}>
          <Badge
            style={{ marginLeft: "1em", width: "5em" }}
            href="#"
            color="dark"
            onClick={pageTruoc1}
          >
            Prew
          </Badge>
          <Badge
           style={{ marginLeft: "0.5em", width: "5em" }}
          >

            {page1}
          </Badge>
          <Badge onClick={pageSau1} style={{ width: "5em",marginLeft: "0.5em" }} href="#" color="dark">
            Next
          </Badge>
        </div>
      </Paper>
    
       
        </List>
      </Dialog>
    </div>
  );
}

export default Dddm;
