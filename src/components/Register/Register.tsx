import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Alert, Button, Container, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Box } from "../common/styles/Box.styles";
import Banner from "./Banner";

type TUserInformation = {
  email: string;
  password: string;
  name: string;
};

type TError = {
  active: boolean;
  text: string;
};

function Register(): JSX.Element {
  const navigate = useNavigate();
  const [userInformation, setUserInformation] = useState<TUserInformation>({
    email: "",
    password: "",
    name: "",
  });
  const [users, setUsers] = useState<TUserInformation[]>([]);
  const [error, setError] = useState<TError>({ active: false, text: "" });
  const [alert, setAlert] = useState<boolean>(false);

  const handleRegister = () => {
    const hasEmailRegistered = users.filter(
      ({ email }) => email === userInformation.email
    );

    if (!hasEmailRegistered.length) {
      const updatedUsers = [...users, userInformation];
      setUsers(updatedUsers);

      localStorage.setItem("users", JSON.stringify(updatedUsers));

      setAlert(true);

      setTimeout(() => {
        setAlert(false);
      }, 4000);

      navigate("/");
    } else {
      setError({
        ...error,
        active: true,
        text: "Email já registrado.",
      });

      setTimeout(() => {
        setError({
          ...error,
          active: false,
        });
      }, 4000);
    }
  };

  useEffect(() => {
    const storedData = localStorage.getItem("users");
    if (storedData) {
      setUsers(JSON.parse(storedData));
    }
  }, []);

  return (
    <Container>
      <Typography variant="h4" component="h1" align="center">
        Crie sua conta
      </Typography>
      <Grid container spacing={16}>
        <Banner />
        <Box size={6} direction="column">
          <TextField
            label="Nome"
            variant="outlined"
            fullWidth
            value={userInformation.name}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setUserInformation({
                ...userInformation,
                name: event.target.value,
              });
            }}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={userInformation.email}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setUserInformation({
                ...userInformation,
                email: event.target.value,
              });
            }}
            error={error.active}
            helperText={error.text}
          />
          <TextField
            label="Senha"
            variant="outlined"
            fullWidth
            value={userInformation.password}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setUserInformation({
                ...userInformation,
                password: event.target.value,
              });
            }}
          />
          <Button variant="outlined" onClick={handleRegister}>
            Criar conta
          </Button>
        </Box>
      </Grid>

      {alert && <Alert>Cadastro efetuado com sucesso.</Alert>}
    </Container>
  );
}

export default Register;
