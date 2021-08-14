import React from "react";
import TextField from '@material-ui/core/TextField';
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
const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 550,
  },
  
});
function Dsspod({cart,setCart}) {
  const classes = useStyles(); 
  return (
 <div>
     <div style={{float:'left'}}>  <TextField id="standard-basic" label="Tìm kiếm" /></div>
      <Paper style={{height:'40em'}} className={classes.root}>
        <TableContainer style={{height:'29em'}} className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Mã Sản Phẩm</TableCell>
                <TableCell>Tên Sản Phẩm</TableCell>
                <TableCell>Giá Sản Phẩm</TableCell>
                <TableCell>Người thêm</TableCell>
                <TableCell>Image</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cart.map((value, index) => {
                return (
                  <TableRow
                    hover
                    key={value.maSp}>
                    <TableCell>
                      <span>CF</span>
                      {value.maSp}
                    </TableCell>
                    <TableCell>{value.tenSp}</TableCell>
                    <TableCell>{value.giaSp}</TableCell>
                    <TableCell>{value.username}</TableCell>
                    <TableCell>
                      <img
                        style={{ width: "4em", height: "5em" ,borderRadius:'20em' }}
                        src={value.image}
                      ></img>
                    </TableCell>
                    <TableCell>
                      <Button
                       
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
        <div style={{float:'left'}}>
        <Badge style={{marginLeft:'1em',width:'5em'}} href="#" color="dark">Theo giá</Badge>
        <Badge style={{marginLeft:'0.5em',}} href="#"  color="dark">Theo danh mục</Badge>
       
        </div>
      </Paper>
    
  
</div>
  );
}

export default Dsspod;
