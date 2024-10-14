import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Container, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Box } from "../common/styles/Box.styles";
import Banner from "./Banner";

type TUserInformation = {
  email: string;
  password: string;
};

interface TUsers extends TUserInformation {
  name: string;
}

type TError = {
  active: boolean;
  text: string;
};

function Login(): JSX.Element {
  const navigate = useNavigate();
  const [userInformation, setUserInformation] = useState<TUserInformation>({
    email: "",
    password: "",
  });
  const [users, setUsers] = useState<TUsers[]>([]);
  const [error, setError] = useState<TError>({ active: false, text: "" });

  const handleLogin = () => {
    const [registered] = users.filter(
      ({ email }) => email === userInformation.email
    );

    if (registered?.email && registered.password === userInformation.password) {
      localStorage.setItem("currentUser", JSON.stringify(registered));
      navigate("/contatos");
    } else {
      setError({
        ...error,
        active: true,
        text: "Email não cadastrado.",
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
        Entre ou cadastre-se para acessar seus contatos.
      </Typography>
      <Grid container spacing={16}>
        <Banner />
        <Box size={6} direction="column">
          <TextField
            id="outlined-basic"
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
            id="outlined-basic"
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
          <Button variant="outlined" onClick={handleLogin}>
            Entrar
          </Button>
          <Button variant="outlined" href="/cadastro">
            Não tem uma conta? Cadastre-se
          </Button>
        </Box>
      </Grid>
    </Container>
  );
}

export default Login;
