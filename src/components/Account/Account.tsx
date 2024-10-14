import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Alert,
  AlertColor,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "../common/styles/Box.styles";

type TAlert = {
  severity: AlertColor | undefined;
  active: boolean;
  message: string;
};

function Account(): JSX.Element {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [alert, setAlert] = useState<TAlert>({
    active: false,
    message: "",
    severity: undefined,
  });

  const navigate = useNavigate();

  const handleDelete = () => {
    if (password === user.password) {
      localStorage.removeItem("currentUser");
      localStorage.removeItem("contacts");
      localStorage.removeItem("users");

      setAlert({
        active: true,
        message: "Usuário deletado com sucesso!",
        severity: "success",
      });

      setTimeout(() => {
        navigate("/");
      }, 4000);
    } else {
      setAlert({
        active: true,
        message: "Senhas não compatíveis.",
        severity: "error",
      });

      setTimeout(() => {
        setAlert({
          active: false,
          message: "",
          severity: undefined,
        });
      }, 4000);
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    const storedData = localStorage.getItem("currentUser");
    if (storedData) {
      setUser(JSON.parse(storedData));
    }
  }, []);

  return (
    <Container>
      <Box style={{ marginTop: "24px" }}>
        <Typography>Olá, {user?.name}!</Typography>
        <Button variant="outlined" onClick={handleOpenDialog}>
          Deletar conta
        </Button>
      </Box>
      {openDialog && (
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogContent>
            <Typography>
              Por favor, para confirmar a deleção da sua conta digite sua senha.
            </Typography>
            <TextField
              id="outlined-basic"
              label="Senha"
              variant="outlined"
              fullWidth
              style={{ margin: "12px 0" }}
              value={password}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setPassword(event.target.value);
              }}
            />
            <DialogActions>
              <Button variant="outlined" onClick={handleDelete}>
                Deletar
              </Button>
            </DialogActions>
          </DialogContent>
          {alert.active && (
            <Alert severity={alert.severity}>{alert.message}</Alert>
          )}
        </Dialog>
      )}
    </Container>
  );
}

export default Account;
