import React from "react";
import { Switch, Route } from "react-router-dom";
import Quanlidanhmuc from "../Admin/QLDM/Quanlidanhmuc";
import Quanlioder from "../Admin/QLOD/Quanlioder";
import Quanlisanpham from "../Admin/QLSP/Quanlisanpham";
import Danhmuc from "../Admin/QLOD/Danhmuc";
import Home from "../userNo/Home";
import Log from "../userNo/Log";
import Sings from "../userNo/Sings";
import Dangxuat from "../userNo/Dangxuat";
import Gioithieu from "../userNo/Gioithieu";
import Vitri from "../userNo/Vitri";
import Giohang from "../Admin/QLOD/Giohang";
function Rotemenu() {
  return (
    <div>
      <Switch>
        <Route path="/home">
          {" "}
          <Home />
        </Route>{" "}
        <Route path="/Danhmuc">
          <Danhmuc />
        </Route>{" "}
        <Route path="/Gioithieu">
          {" "}
          <Gioithieu />
        </Route>
        <Route path="/vitri">
          <Vitri />
        </Route>{" "}
        <Route path="/QuanliDanhmuc">
          <Quanlidanhmuc />
        </Route>{" "}
        <Route path="/QuanliSanPham">
          <Quanlisanpham />
        </Route>{" "}
        <Route path="/QuanliOder">
          <Quanlioder />
        </Route>
        <Route path="/Cart">
          <Giohang />
        </Route>
        <Route path="/dangnhap">
          {" "}
          <Log />
        </Route>
        <Route path="/dangki">
          {" "}
          <Sings />
        </Route>
        <Route path="/dangxuat">
          {" "}
          <Dangxuat />
        </Route>
        <Route path="/">
          {" "}
          <Danhmuc />
        </Route>
      </Switch>{" "}
    </div>
  );
}

export default Rotemenu;
