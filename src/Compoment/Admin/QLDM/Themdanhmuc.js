import React from 'react';
import { Button } from 'reactstrap';
import TextField from "@material-ui/core/TextField";
function Themdanhmuc({onChangeh, submitForm}) {
    return (
        <div>
               <form
                onSubmit={submitForm}
              style={{ marginTop: "13vh", textAlign: "center" }}
              class="form"
            >
              <TextField
              onChange={onChangeh}
                name="Tendanhmuc"
                id="tfid1"
                label="Tên Danh mục"
                variant="outlined"
              />
              <br /> <br />
              <br />
         
              <Button type='submit' variant="contained" color="secondary">
  Xác Nhận
</Button>
           
            </form>
        </div>
    );
}

export default Themdanhmuc;