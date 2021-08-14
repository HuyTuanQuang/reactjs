import "./App.css";
import React from "react";
import Rotemenu from "./Compoment/Page/Rotemenu";
import MenuAdmin from "./Compoment/Admin/MenuAdmin";
function App() {
  return (
    <React.Fragment>
      <div class="App">
        <MenuAdmin />
        <Rotemenu />
      </div>{" "}
    </React.Fragment>
  );
}

export default App;
