import { useNavigate } from "react-router-dom";

import { AppBar, Button, Toolbar, Typography } from "@mui/material";

function Navbar(): JSX.Element {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/conta");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Contatos
        </Typography>
        <Button color="inherit" onClick={handleClick}>
          Conta
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
