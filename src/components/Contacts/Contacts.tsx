import {
  Box as BoxMaterial,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid2,
  Typography,
} from "@mui/material";
import { Box } from "../common/styles/Box.styles";
import { useEffect, useState } from "react";
import InfoBox from "./InfoBox";
import Map from "./Map";
import AddContacts from "./AddContacts";
import { CONTACT_INFORMATION, TContact } from "./AddContacts/AddContacts";

function Contacts(): JSX.Element {
  const [contactsList, setContactsList] = useState([]);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [contactInformation, setContactInformation] = useState<TContact>({
    ...CONTACT_INFORMATION,
  });
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  useEffect(() => {
    const storedData = localStorage.getItem("contacts");
    if (storedData) {
      setContactsList(JSON.parse(storedData));
    }
  }, []);

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
            {contactsList.length > 0 &&
              contactsList.map(
                (
                  { address, name, uf, city, number, cep, complement },
                  index
                ) => (
                  <Card>
                    <CardContent>
                      <Typography>{name}</Typography>
                      <Typography>
                        {address} - {number}, {cep}
                      </Typography>

                      <Typography>
                        {city} - {uf}
                      </Typography>

                      <Typography>{complement}</Typography>
                      <CardActions>
                        <Button
                          size="small"
                          onClick={() =>
                            setContactInformation(contactsList[index])
                          }
                        >
                          Ver no mapa
                        </Button>
                      </CardActions>
                    </CardContent>
                  </Card>
                )
              )}
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
