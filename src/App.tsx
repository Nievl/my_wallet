import "./App.scss";
import { Menu } from "./Menu";
import { useState } from "react";
import { Year } from "./Year";
import { AppBar, Button, IconButton, Toolbar } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

function App() {
  const [menu, setMenu] = useState(true);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setMenu(!menu)}>
            <MenuIcon />
          </IconButton>
          News
          <Button color="inherit">exit</Button>
        </Toolbar>
      </AppBar>
      <div className="app">
        {menu && <Menu />}
        <div className="main">
          <Year />
        </div>
      </div>
    </>
  );
}

export default App;
