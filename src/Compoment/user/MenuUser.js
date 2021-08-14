import React from "react";
import { Button } from "reactstrap";
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
  NavbarText,
} from "reactstrap";
import MicIcon from '@material-ui/icons/Mic';
import { Link } from "react-router-dom";
import { useState } from "react";
import { MDBCol,MDBIcon } from "mdbreact";
function MenuUser() {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    return (
      <div>
        <Navbar color="light" light expand="md">
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
                <NavLink>
                  {" "}
                  <Link id="link" to="/DanhMuc">
                    Danh Mục Sản Phẩm{" "}
                  </Link>{" "}
                </NavLink>{" "}
              </NavItem>{" "}
              <NavItem>
                <NavLink>
                  <Link id="link" to="/GioiThieu">
                    Giới Thiệu{" "}
                  </Link>{" "}
                </NavLink>{" "}
              </NavItem>{" "}
              <NavItem>
                <NavLink>
                  <Link id="link" to="/Vitri">
                    Coffe Gần Bạn{" "}
                  </Link>{" "}
                </NavLink>{" "}
              </NavItem>{" "}
              <NavItem>
                <NavLink>
                 
                </NavLink>{" "}
              </NavItem>{" "}
            </Nav>
            <MDBCol md="30">
                    <div className="input-group md-form form-sm form-1 pl-0">
                      <div className="input-group-prepend">
                        <span
                          className="input-group-text purple lighten-3"
                          id="basic-text1"
                        >
                         <MicIcon />
                        </span>
                      </div>
                      <input
                        className="form-control my-0 py-1"
                        type="text"
                        placeholder="Search"
                        aria-label="Search"
                      />
                    </div>
                  </MDBCol>
            <Nav>
              
            </Nav>{" "}
            <NavbarText></NavbarText>{" "}
            <Link id="link" to="/Cart">
              Giỏ Hàng
              <ShoppingCartRoundedIcon />
            </Link>{" "}
            <Link id="link" to="/Cart">
            Đăng Xuất
          </Link>{" "}
          </Collapse>{" "}
        </Navbar>{" "}
      </div>
    );
}

export default MenuUser;
