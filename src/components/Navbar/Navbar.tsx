import { AppBar, Button, Toolbar, Typography } from "@mui/material";
const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Contatos
        </Typography>
        <Button color="inherit">Conta</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
