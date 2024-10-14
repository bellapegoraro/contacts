import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { TContact } from "../AddContacts/AddContacts";

function CardContacts({
  contactsList,
  setContactInformation,
}: {
  contactsList: TContact[];
  setContactInformation: (state: TContact) => void;
}): JSX.Element {
  return (
    <>
      {contactsList.length > 0 &&
        contactsList.map(
          ({ address, name, uf, city, number, cep, complement }, index) => (
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
                    onClick={() => setContactInformation(contactsList[index])}
                  >
                    Ver no mapa
                  </Button>
                </CardActions>
              </CardContent>
            </Card>
          )
        )}
    </>
  );
}

export default CardContacts;
