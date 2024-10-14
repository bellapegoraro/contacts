import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box as BoxMaterial,
  Button,
  Container,
  Grid2,
  Typography,
} from "@mui/material";

import { Box } from "../common/styles/Box.styles";
import InfoBox from "./InfoBox";
import Map from "./Map";
import AddContacts from "./AddContacts";
import { CONTACT_INFORMATION, TContact } from "./AddContacts/AddContacts";
import CardContacts from "./CardContacts";

function Contacts(): JSX.Element {
  const [contactsList, setContactsList] = useState<TContact[]>([]);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [contactInformation, setContactInformation] = useState<TContact>({
    ...CONTACT_INFORMATION,
  });

  const navigate = useNavigate();

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  useEffect(() => {
    const storedData = localStorage.getItem("contacts");

    if (storedData) {
      setContactsList(JSON.parse(storedData));
    }
  }, [openDialog]);

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");

    if (!currentUser) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <Container style={{ height: "100vh" }}>
      <Typography variant="h4" component="h1" align="center">
        Encontre seus contatos!
      </Typography>
      <BoxMaterial>
        <Grid2 container spacing={8} style={{ height: "100vh" }}>
          <Box size={5} style={{}}>
            {contactsList.length === 0 && (
              <InfoBox setOpenDialog={setOpenDialog} />
            )}
            <CardContacts
              contactsList={contactsList}
              setContactInformation={setContactInformation}
            />
            <Button variant="outlined" onClick={handleOpenDialog}>
              Adicionar contato
            </Button>
          </Box>
          <Box>
            <Map contactInformation={contactInformation} />
          </Box>
        </Grid2>
      </BoxMaterial>
      {openDialog && <AddContacts setOpenDialog={setOpenDialog} />}
    </Container>
  );
}

export default Contacts;
