import React from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Snackbar from "@material-ui/core/Snackbar";

function CapnhatSp({
  clicked,
  setClicked,
  formdata,
  setForm,
  danhmuc,
  setDanhmuc,
  danhmucId,
}) {
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
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setForm({
      ...formdata,
      [name]: value,
    });
  };
  const onUpdateProduct = () => {
    axios({
      url:
        "https://600e771e3bb1d100179df338.mockapi.io/danhmuc/" + danhmucId + "/shopcafe/" + formdata.maSp,
      method: "PUT",
      data: formdata,
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
  const onSubmitHandler = (e) => {
    e.preventDefault();
    onUpdateProduct();
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message="Cập nhật Thành Công"
        action={<React.Fragment></React.Fragment>}
      />
      <React.Fragment>
        <Container maxWidth="sm">
          <Typography
            component="div"
            style={{
              borderRadius: "10px",
              marginTop: "1em",
              height: "100vh",
              boxShadow: "2px 2px 5px black",
            }}
          >
            <form onSubmit={onSubmitHandler}>
              <TextField
                label="Mã Sản Phẩm"
                fullWidth
                value={formdata.maSp}
                name="maSp"
                onChange={onChangeHandler}
                style={{ marginTop: "10px" }}
                variant="outlined"
              />
              <TextField
                label="Tên Sản Phẩm"
                fullWidth
                value={formdata.tenSp}
                name="tenSp"
                onChange={onChangeHandler}
                style={{ marginTop: "10px" }}
                variant="outlined"
              />
              <TextField
                label="Giá Sản Phẩm"
                fullWidth
                value={formdata.giaSp}
                name="giaSp"
                onChange={onChangeHandler}
                style={{ marginTop: "10px" }}
                variant="outlined"
              />
              <TextField
                label="Thông tin Sản Phẩm"
                fullWidth
                value={formdata.thongtinsp}
                name="thongtinsp"
                onChange={onChangeHandler}
                style={{ marginTop: "10px" }}
                variant="outlined"
              />
              <TextField
                label="Trạng Thái"
                fullWidth
                value={formdata.trangthai}
                name="trangthai"
                onChange={onChangeHandler}
                style={{ marginTop: "10px" }}
                variant="outlined"
              />  
              <img src={formdata.avartar}></img>
              <Button
                onClick={handleClick}
                style={{ marginTop: "1em" }}
                type="submit"
                variant="contained"
                color="primary"
              >
                Cập Nhật
              </Button>
            </form>
          </Typography>
        </Container>
      </React.Fragment>
    </div>
  );
}

export default CapnhatSp;
