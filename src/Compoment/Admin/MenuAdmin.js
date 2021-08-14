import React from "react";
import ShoppingCartRoundedIcon from "@material-ui/icons/ShoppingCartRounded";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import Avatar from "@material-ui/core/Avatar";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { useState } from "react";
import "../cafe.css";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
function MenuAdmin() {
  //nhận data
  const [cookies, setCookies, removeCookie] = useCookies([
    "usercf",
    "passwordcf",
    "loaitaikhoancf",
    "hotencf",
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Navbar id="navbar" color="light" light expand="md">
        <NavbarBrand>
          {" "}
          <Link id="link" to="/home">
            COFFESHOP{" "}
          </Link>{" "}
        </NavbarBrand>{" "}
        <NavbarToggler onClick={toggle} />{" "}
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              {cookies.loaitaikhoancf == "Admin" ? (
                <NavLink>
                  <Link id="link" to="/QuanliDanhmuc">
                    Quản lý Danh mục{" "}
                  </Link>
                </NavLink>
              ) : (
                <NavLink>
                  {" "}
                  <Link id="link" to="/danhmuc">
                    Trang Chủ{" "}
                  </Link>{" "}
                </NavLink>
              )}
            </NavItem>{" "}
            <NavItem>
              {cookies.loaitaikhoancf == "Admin" ? (
                <NavLink>
                  <Link id="link" to="/QuanliSanPham">
                    Quản Lí Sản Phẩm{" "}
                  </Link>
                </NavLink>
              ) : (
                <NavLink>
                  {" "}
                  <Link id="link" to="Gioithieu">
                    Giới Thiệu{" "}
                  </Link>{" "}
                </NavLink>
              )}
            </NavItem>{" "}
            <NavItem>
              {cookies.loaitaikhoancf == "Admin" ? (
                <NavLink>
                  <Link id="link" to="/QuanliOder">
                    Quản Lí Oder{" "}
                  </Link>
                </NavLink>
              ) : (
                <NavLink>
                  {" "}
                  <Link id="link" to="/vitri">
                    Gần Bạn{" "}
                  </Link>{" "}
                </NavLink>
              )}
            </NavItem>{" "}
          </Nav>
          {cookies.loaitaikhoancf == "Admin" ? (
            <Avatar
              style={{ marginRight: "2em" }}
              onClick={handleClickOpen}
              src="https://scontent.fhan3-3.fna.fbcdn.net/v/t1.0-9/116265935_1411277525928813_3645354126024338037_n.jpg?_nc_cat=101&ccb=3&_nc_sid=09cbfe&_nc_ohc=ieQOGhQDRAUAX9sD1P_&_nc_ht=scontent.fhan3-3.fna&oh=2603cc83cd2b019da3c4c3ede5693193&oe=605D5F2F"
            ></Avatar>
          ) : null}
          {cookies.loaitaikhoancf == "User" ? (
          <div>
              <Avatar
              style={{ marginRight: "2em" }}
              onClick={handleClickOpen}
              src="https://static2.yan.vn/YanNews/2167221/201708/20170822-054146-14_600x800.jpg"
            ></Avatar>
          </div>
          ) : null}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{cookies.hotencf}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Tên Đăng Nhập : {cookies.usercf}
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
         Loại Tài Khoản : {cookies.loaitaikhoancf}
          </DialogContentText>
        </DialogContent>
      
      </Dialog>
          <form method='GET'  action="http://www.google.com/search" class="form-inline md-form form-sm active-pink active-pink-2">
            <input
              class="form-control form-control-sm ml-3 w-75"
              type="text"
              placeholder="Search"
              aria-label="Search"    
            />
          </form>
          {cookies.loaitaikhoancf == "Admin"  ?  (
             null
          )  : (
            <Link style={{ marginRight: "1em" }} id="link" to="/Cart">
            Giỏ Hàng
            <ShoppingCartRoundedIcon />
          </Link>
          )}
          <Nav>
            {cookies.loaitaikhoancf == "Admin" ||
            cookies.loaitaikhoancf == "User" ? (
              <Link id="link" to="/dangxuat">
                Đăng Xuất
              </Link>
            ) : (
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle style={{ color: "white" }} nav caret>
                  Tài Khoản{" "}
                </DropdownToggle>{" "}
                <DropdownMenu right>
                  <DropdownItem>
                    {" "}
                    <Link to="/dangnhap">Đăng Nhập </Link>
                  </DropdownItem>{" "}
                  <DropdownItem divider />
                  <DropdownItem>
                    <Link to="/dangki"> Đăng Kí </Link>
                  </DropdownItem>
                </DropdownMenu>{" "}
              </UncontrolledDropdown>
            )}
            {}
          </Nav>
        </Collapse>{" "}
      </Navbar>{" "}
    </div>
  );
}

export default MenuAdmin;
