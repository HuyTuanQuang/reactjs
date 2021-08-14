
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

import React, { useState,useEffect } from "react";
import axios from "axios";
import Dsspod from "./Dsspod";

function Quanlioder(props) {
  const [activeTab, setActiveTab] = useState("1");
  
  const [cart,setCart] =useState([]);
  let url = "https://600e771e3bb1d100179df338.mockapi.io//giohang";
  useEffect(() => {
    axios({
      method: "GET",
      url: url,
    })
      .then((response) => {
        const { data } = response;
        setCart(data);
    
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <Nav tabs>
        <NavItem>
          <NavLink 
            className={activeTab === "1" ? "active" : ""}
            onClick={() => setActiveTab("1")}
          >
             Tất cả
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab === "2" ? "active" : ""}
            onClick={() => setActiveTab("2")}
          >
          Đơn Oder
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab == "3" ? "active" : ""}
            onClick={() => setActiveTab("3")}
          >
             Đơn đã thu hồi
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane  tabId="1">
          <Dsspod cart={cart}
                  setCart={setCart}
            />
           
        </TabPane>
        <TabPane tabId="2">Tab 2 Content</TabPane>
        <TabPane tabId="3">Tab 3 Content</TabPane>
      </TabContent>
    </div>
  );
}

export default Quanlioder
