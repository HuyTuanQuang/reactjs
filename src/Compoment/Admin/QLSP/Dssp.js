import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import DeleteIcon from "@material-ui/icons/Delete";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import { Badge } from 'reactstrap';
import Snackbar from "@material-ui/core/Snackbar";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 550,
  },
  
});
function Dssp({clicked,setClicked,setForm,danhmuc,setDanhmuc,danhmucId,formdata, listDanhMuc,
  setListDanhMuc,pageSau,pageTruoc,setPage,page,setDanhMucId}) {
  const classes = useStyles(); 
  //load all
  // const listPromise= listdanhuc.map((value)=>{
  //   let url =  "https://600e771e3bb1d100179df338.mockapi.io/danhmuc/" + value.maSp + "/shopcafe/";
  //   const promise = axios.get(url);
  //   return promise;
   
  // })
  // promise.all(listPromise)
  // .then(listResponve =>{
  //   let spAll =[];
  //   listResponve.map(response =>{
  //     const {data} = response;
  //     spAll = {
  //       ...spAll,
  //       ...formdata,
  //     }
  //   })
  // })
  //Xóa Sản Phẩm
  const onDelete = (value, index) => {
    const url =  "https://600e771e3bb1d100179df338.mockapi.io/danhmuc/" + danhmucId + "/shopcafe/"  + value.maSp;
    return axios({
      method: 'delete',
      url: url,
    })
  }
//snackbar
const [open, setOpen] = React.useState(false);
const handleClick = () => {
  setOpen(true);
};

const handleClose = (event, reason) => {
  if (reason === "clickaway") {
    return;
  }

  setOpen(false);
};
  const onClickHandler = (e, value, index) => {
    setClicked(index);
    setForm(value);
    console.log(value)

  };
  const btnDeleteOnClick = function (e, value, index) {
    const result = onDelete(value, index);
    result.then((response) => {
        setDanhmuc((oldState) => {
          let newState = oldState.filter((value, idx) => {
            return idx === index ? false : true;
          });
          return newState;
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }
  const danhMucOnChange = function (event) {
    setDanhMucId(event.target.value);
    setPage(1);
  };
//tìm kiếm
const [seach,setSeach]=useState("");
let url='https://600e771e3bb1d100179df338.mockapi.io/danhmuc/' +  danhmucId + '/shopcafe?filter='+seach;
useEffect(() => {
  if ( danhmucId == -1) {
    return ;
  }
  axios({
    method: "GET",
    url: url,
  })
    .then((response) => {
      const { data } = response;
      setDanhmuc(data);
    })
    .catch((error) => {
      console.log(error);
    });
}, [
  danhmucId,seach]);
  return (
    <div>
         <form class="form-inline md-form form-sm active-pink active-pink-2">
            <input
              class="form-control form-control-sm ml-3 w-40"
              type="text"
              placeholder="Search"
              aria-label="Search"
              onChange={(e)=>{
                setSeach(e.target.value)
              }}
            />
          </form>
      <Paper style={{height:'40em'}} className={classes.root}>
        <TableContainer   onClick={handleClick} style={{height:'30em'}} className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Mã Sản Phẩm</TableCell>
                <TableCell>Tên Sản Phẩm</TableCell>
                <TableCell>Giá Sản Phẩm</TableCell>
                <TableCell>Thông tin Sản Phẩm</TableCell>
                <TableCell>Trạng Thái</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Danh Mục</TableCell>
                <TableCell>!!</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {danhmuc.map((value, index) => {
                return (
                  <TableRow
                
                    hover
                    onClick={
                      (event) => {
                        onClickHandler(event, value, index);
                      }
                      
                    }
                
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
                      <Button
                        onClick={(event) =>
                          btnDeleteOnClick(event, value, index)
                        }
                      >
                        <DeleteIcon />
                   </Button>
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
            onClick={pageTruoc}
          >
            Prew
          </Badge>
          <Badge onClick={pageSau} style={{ width: "5em",marginLeft: "0.5em" }} href="#" color="dark">
            Next
          </Badge>
        </div>
        <div style={{ float: "left" }}>
        {/* {listDanhMuc.map((danhMuc, index) => {
          return (
            <Button
            key={index}
            value={danhMuc.maSp}
            style={{fontSize:'13px', marginLeft: "1em", width: "8em",height:"2em" }}
            onClick={danhMucOnChange}
            color="dark"
            >
             {danhMuc.Tendanhmuc}
            </Button>
          );
        })} */}
          <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message="Chọn Sản Phẩm Thành Công"
        action={<React.Fragment></React.Fragment>}
      />
        </div>
      </Paper>
    
    </div>
  );
}

export default Dssp;
