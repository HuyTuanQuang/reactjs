import React, { useState, useEffect } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import axios from "axios";
import Dddm from "./Dddm";
import { useCookies } from "react-cookie";  
import Themdanhmuc from "./Themdanhmuc";
function Quanlidanhmuc(props) {
  
  //gọi data từ login về
  const [cookies, setCookies, removeCookie] = useCookies([
    "usercf",
    "passwordcf",
    "loaitaikhoancf",
    "hotencf",
  ]);
  
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [activeTab, setActiveTab] = useState("1");
  const rows = [];
  const [listDanhMuc, setListDanhMuc] = useState([]);
  const [danhmuc, setDanhmuc] = useState(rows);
  const [clicked, setClicked] = useState(-1);
  const urlParams = new URLSearchParams(window.location.search);
  let pageInit =
    urlParams.get("page") != null ? parseInt(urlParams.get("page")) : 1;
  const [page, setPage] = useState(pageInit);
  const [limit, setLimit] = useState(10);
  let url =
    "https://600e771e3bb1d100179df338.mockapi.io/danhmuc?limit=" +
    limit +
    "&page=" +
    page;
  useEffect(() => {
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
  }, [page]);
  const pageTruoc = function () {
    if (page == 1) {
      return;
    }

    setPage(page - 1);
  };

  const pageSau = function () {
    setPage(page + 1);
  };
  //thêm danh mục
  const dssp = {
    maSp: "",
    Tendanhmuc: "",
  };
  const [dmuc, setdmuc] = useState(dssp);
  const onChangehanler = (event) => {
    const { name, value } = event.target;
    setdmuc({
      ...dmuc,
      [name]: value,
    });
    console.log(dmuc);
  };

  const addDanhmuc = () => {
    axios({
      method: "POST",
      url: "https://600e771e3bb1d100179df338.mockapi.io/danhmuc/",
      data: dmuc,
    })
      .then((response) => {
        const { data } = response;
        setdmuc({
          data,
        });
        window.location.reload();
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const submitForm = (event) => {
    event.preventDefault();
   if(dssp.Tendanhmuc != null){
    addDanhmuc();
    alert("Thêm thành công");
    return;
   }else{
    alert("Thiếu danh mục");
   }
  };
  return (
    <div>
      {cookies.loaitaikhoancf != "Admin" ? (
        <h3>Mày là ai đấy có phải admin đâu</h3>
      ):
      (
        <div>
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
          Thêm danh mục
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Dddm
            danhmuc={danhmuc}
            setDanhmuc={setDanhmuc}
            clicked={clicked}
            setClicked={setClicked}
            dmuc={dmuc}
            setdmuc={setdmuc}
            pageSau={pageSau}
            pageTruoc={pageTruoc}
            handleClickOpen1={handleClickOpen}
          />
        </TabPane>
        <TabPane tabId="2">
       <Themdanhmuc
      onChangeh={onChangehanler}
      submitForm={submitForm}
       />
        </TabPane>
      </TabContent>
    </div>
      )
      }
    </div>
  );
}

export default Quanlidanhmuc;
