import React, { useState } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { Button } from "reactstrap";
import Dssp from "./Dssp";
import ThemSanPham from "./ThemSanPham";
import CapnhatSp from "./CapnhatSp";
import axios from "axios";
import { useEffect } from "react";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useCookies } from "react-cookie"; 
function Quanlisanpham(props) {
   //gọi data từ login về
const [cookies, setCookies, removeCookie] = useCookies([
  "usercf",
  "passwordcf",
  "loaitaikhoancf",
  "hotencf",
]);  
  const [activeTab, setActiveTab] = useState("1");
  const [loading, setLoading] = useState(false);
  const formDataInitValue = {
    maSp: "",
    danhmucId:"",
    tenSp: "",
    giaSp: "",
    thongtinsp: "",
    trangthai: "",
    avatar:"https://static2.yan.vn/YanNews/2167221/201708/20170822-054146-14_600x800.jpg",
  };
  const rows = [
    //
  ];
  const [listDanhMuc, setListDanhMuc] = useState([]);
  useEffect(() => {
    const url = "https://600e771e3bb1d100179df338.mockapi.io/danhmuc/";
    axios.get(url).then((response) => {
      const { data } = response;
      setListDanhMuc(data);
    });
  },[]);
  const [danhMucId, setDanhMucId] = useState(1);
  const [danhmuc, setDanhmuc] = useState(rows);
  const [clicked, setClicked] = useState(-1);
  const [formdata, setForm] = useState(formDataInitValue);
  const urlParams = new URLSearchParams(window.location.search);
  let pageInit =
  urlParams.get("page") != null ? parseInt(urlParams.get("page")) : 1;
  const [page, setPage] = useState(pageInit);
  const [limit, setLimit] = useState(10);
  let url ='https://600e771e3bb1d100179df338.mockapi.io/danhmuc/' + danhMucId + '/shopcafe?limit=' + limit + '&page=' + page;
  useEffect(() => {
    if (danhMucId == -1) {
      return ;
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
      })
      .catch((error) => {
        console.log(error);
      });
  }, [page,
    danhMucId]);
 
  const pageTruoc = function () {
    if (page == 1) {
      return;
    }

    setPage(page - 1);
  };

  const pageSau = function () {
    setPage(page + 1);
  };
  const danhMucOnChange = function (event) {
    setDanhMucId(event.target.value);
    setPage(1);const danhMucOnChange = function (event) {
      setDanhMucId(event.target.value);
      setPage(1);
    };
  };
  
  return (
   <div>
     {
       cookies.loaitaikhoancf != "Admin" ? (
        <h2>Chào bạn , bạn không có quyền truy cập vào trang quản lí của admin</h2>

       ) : (
 <div>
      

      <Backdrop open={loading} style={{ zIndex: '1000' }}>
        <CircularProgress />
      </Backdrop>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={activeTab == "1" ? "active" : ""}
            onClick={() => setActiveTab("1")}
          >
            Tất Cả
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab == "2" ? "active" : ""}
            onClick={() => setActiveTab("2")}
          >
            Thêm Sản Phẩm
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab == "3" ? "active" : ""}
            onClick={() => setActiveTab("3")}
          >
            Cập Nhật Sản Phẩm
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
       <div  style={{float:'left' }}>
       {listDanhMuc.map((danhMuc, index) => {
          return (
            <Button
            key={index}
            value={danhMuc.maSp}
            style={{fontSize:'13px', marginLeft: "0.3em",height:"2em",color:'green',backgroundColor:'violet',borderRadius:'1em' }}
            onClick={danhMucOnChange}
            color="dark"
            >
             {danhMuc.Tendanhmuc}
            </Button>
          );
        })}
       </div>
          <Dssp
            danhmuc={danhmuc}
            setDanhmuc={setDanhmuc}
            clicked={clicked}
            setClicked={setClicked}
            formdata={formdata}
            setForm={setForm}
            danhmucId={danhMucId}
            formdata={formdata}
            listDanhMuc={listDanhMuc}
            setListDanhMuc={setListDanhMuc}
            page={page}
            pageSau={pageSau}
            pageTruoc={pageTruoc}
            setDanhMucId={setDanhMucId}
            setPage={setPage}
            
          />
        </TabPane>
        <TabPane tabId="2">
          <ThemSanPham
          danhmuc={danhmuc}
          setDanhmuc={setDanhmuc}
          clicked={clicked}
          setClicked={setClicked}
          formdata={formdata}
          setForm={setForm}
          listDanhMuc={listDanhMuc}
          setListDanhMuc={setListDanhMuc}
          />
        </TabPane>
        <TabPane tabId="3">
          <CapnhatSp
            danhmuc={danhmuc}
            setDanhmuc={setDanhmuc}
            clicked={clicked}
            setClicked={setClicked}
            formdata={formdata}
            setForm={setForm}
            danhmucId={danhMucId}
            
          />
        </TabPane>
      </TabContent>
    </div>
       )
     }
   </div>
  );
}

export default Quanlisanpham;
