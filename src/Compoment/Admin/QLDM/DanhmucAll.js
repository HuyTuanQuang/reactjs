import React from "react";
import { useState, useEffect } from "react";
import { Badge } from "reactstrap";
import axios from "axios";
import "../../cafe.css";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";
function DanhmucAll({
  clicked,
  setClicked,
  formdata,
  setForm,
  danhmuc,
  setDanhmuc,
}) {
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setForm({
      ...formdata,
      [name]: value,
    });
  };
  const onClickHandler = (e, value, index) => {
    setClicked(index);
    setForm(value);
  };
  const onUpdateDanhmuc = () => {
    axios({
      url:
        "https://600e771e3bb1d100179df338.mockapi.io/shopcafe/" + formdata.maSp,
      method: "PUT",
      data: formdata,
    })
      .then((response) => {
        const { data } = response;
        setDanhmuc((oldState) => {
          let newState = oldState.map((value, index) => {
            return index == clicked ? data : value;
          });

          return newState;
        });
      })
      .catch((error) => {
        console.error(error.response);
      });
  };
  const onClickHandler1 = (e) => {
    e.preventDefault();
    onUpdateDanhmuc();
    alert("aaaaa");
  };

  //load danh mục
  const [danhMucId, setDanhMucId] = useState(-1);
  const [listDanhMuc, setListDanhMuc] = useState([]);

  useEffect(() => {
    const url = 'https://600e771e3bb1d100179df338.mockapi.io/giohang/';
    axios.get(url)
      .then((response) => {
        const { data } = response;
        setListDanhMuc(data);
      })
  }, []);
  const urlParams = new URLSearchParams(window.location.search);
  let pageInit = urlParams.get('page') != null ? parseInt(urlParams.get('page')) : 1;
  const [page, setPage] = useState(pageInit);
  const [limit, setLimit] = useState(10);
  let url = "https://600e771e3bb1d100179df338.mockapi.io/shopcafe/"+  danhMucId + "/giohang?limit=" + limit + "&page=" + page;
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
  }, [page,
    danhMucId,]);
  const pageTruoc = function () {
    if (page == 1) {
      return ;
    }

    setPage(page - 1);
  }

  const pageSau = function () {
  
    setPage(page + 1);
  }
  const danhMucOnChange = function (event) {
    setDanhMucId(event.target.value);
    setPage(1);
  }
  return (
    
    <div>
      <select
          onChange={ danhMucOnChange }
          className="form-control">
          <option>Chọn danh mục</option>
          {
            listDanhMuc.map((danhMuc, index) => {
              return (
                <option
                  key={ index }
                  value={ danhMuc.NhomSp }>
                  { danhMuc.NhomSp }
                </option>
              );
            })
          }
        </select>
      <input
        name="NhomSp"
        onChange={onChangeHandler}
        value={formdata.maSp}
      ></input>
      <div>
        <Badge href="#" color="dark">
          Hàn Quốc
        </Badge>
        <Badge href="#" color="dark">
          Việt Nam
        </Badge>
        <Badge href="#" color="dark">
          Nhật Bản
        </Badge>
        <Badge href="#" color="dark">
          Ấn độ
        </Badge>
        <Badge href="#" color="dark">
          Siêu Đẳng Cấp
        </Badge>
        <Badge href="#" color="dark">
          ngon bất chấp
        </Badge>
      </div>

      <div style={{ width: "100%", height: "34em", overflow: "scroll" }}>
        {danhmuc.map((value, index) => (
          <Card
            id="card"
            onMouseMove={(event) => {
              onClickHandler(event, value, index);
            }}
            key={value.maSp}
            style={{
              width: "20%",
              height: "23em",
              float: "left",
              marginLeft: "3.3em",
              marginTop: "1em",
            }}
          >
            <CardImg top width="100%" src={value.avatar} alt={value.avatar} />
            <CardBody>
              <CardTitle tag="h5">{value.tenSp}</CardTitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted">
                {value.giaSp}
              </CardSubtitle>
              <CardText>{value.thongtinsp}</CardText>
              <CardText>{value.NhomSp}</CardText>
            </CardBody>
            <Badge onClick={onClickHandler1} href="#" color="dark">
              Xóa khỏi danh mục
            </Badge>
          </Card>
        ))}
        ;
      </div>
    </div>
  );
}

export default DanhmucAll;
