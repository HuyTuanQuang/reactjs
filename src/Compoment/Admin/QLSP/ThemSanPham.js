import React from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
function ThemSanPham({
  clicked,
  setClicked,
  setForm,
  danhmuc,
  setDanhmuc,
  formdata,
  listDanhMuc,
  setListDanhMuc,
}) {
  console.log(formdata);
  const onChangehanler = (event) => {
    const { name, value } = event.target;
    setForm({
      ...formdata,
      [name]: value,
    });
  };
  const [danhMucId, setDanhMucId] = useState(1);
  const addApi = () => {
    axios({
      method: "POST",
      url:
        "https://600e771e3bb1d100179df338.mockapi.io/danhmuc/" +
        danhMucId +
        "/shopcafe",
      data: formdata,
    })
      .then((response) => {
        const { data } = response;
        setForm({
          data,
        });
        console.log(data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const submitForm = (event) => {
    event.preventDefault();
    if (formdata.tenSp == "") {
      alert("Thiếu Name");
    } else if (formdata.giaSp == "") {
      alert("Thiếu giá");
    } else if (isNaN(formdata.giaSp)) {
      alert("Thiếu giá");
    } else if (formdata.thongtinsp == "") {
      alert("Thiếu Thông tin");
    } else if (formdata.trangthai == "") {
      alert("Thiếu Trạng thái");
    } else {
      addApi();
      alert("Thêm sản phẩm thành công");
      return <Redirect to="/QuanliSanPham" />;
    }
  };
  const danhMucOnChange = function (event) {
    setDanhMucId(event.target.value);
  };
  console.log(danhMucId);
  return (
    <div>
      <React.Fragment>
        <Container maxWidth="sm">
          <Typography
            component="div"
            style={{
              height: "100vh",
              marginTop: "1em",
              height: "100vh",
              boxShadow: "2px 2px 5px black",
            }}
          >
            <Form
              onSubmit={(event) => {
                submitForm(event);
              }}
            >
              <FormGroup>
                <TextField
                  fullWidth
                  name="tenSp"
                  id="outlined-basic"
                  label="Tên Sản Phẩm"
                  variant="outlined"
                  onChange={onChangehanler}
                />
              </FormGroup>
              <FormGroup>
                <TextField
                  name="giaSp"
                  onChange={onChangehanler}
                  fullWidth
                  id="outlined-basic"
                  label="giá"
                  variant="outlined"
                />
              </FormGroup>
              <FormGroup>
                <TextField
                  name="thongtinsp"
                  fullWidth
                  id="outlined-basic"
                  rows={4}
                  label="Thông Tin Sản Phẩm"
                  variant="outlined"
                  onChange={onChangehanler}
                />
              </FormGroup>
              <FormGroup>
                <TextField
                  name="trangthai"
                  fullWidth
                  id="outlined-basic"
                  rows={4}
                  label="Trạng thái"
                  variant="outlined"
                  onChange={onChangehanler}
                />
              </FormGroup>

              <FormGroup>
                <TextField
                  style={{ display: "none" }}
                  disabled
                  onChange={onChangehanler}
                  name="NhomSp"
                  fullWidth
                  id="outlined-basic"
                  rows={4}
                  label="Nhóm Sản Phẩm"
                  variant="outlined"
                />
              </FormGroup>

              <FormGroup>
              <select
            onChange={ danhMucOnChange }
            className="form-control">
            <option disabled>Chọn danh mục</option>
            {
              listDanhMuc.map((danhMuc, index) => {
                return (
                  <option
                    key={ index }
                    value={ danhMuc.maSp }>
                    { danhMuc.Tendanhmuc }
                  </option>
                );
              })
            }
          </select>
              </FormGroup>
              <Button type="submit">Thêm Sản Phẩm</Button>
            </Form>
          </Typography>
        </Container>
      </React.Fragment>
    </div>
  );
}

export default ThemSanPham;
