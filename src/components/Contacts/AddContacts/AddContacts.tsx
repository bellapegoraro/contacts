import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export type TContact = {
  name: string;
  uf: string;
  city: string;
  address: string;
  number: string;
  cep: string;
  complement: string;
  cpf: string;
  phone: string;
  lat: number;
  lng: number;
};

export const CONTACT_INFORMATION = {
  name: "",
  uf: "",
  city: "",
  address: "",
  number: "",
  cep: "",
  complement: "",
  cpf: "",
  phone: "",
  lat: -25.4437172,
  lng: -49.2789859,
};

function AddContacts({
  setOpenDialog,
}: {
  setOpenDialog: (state: boolean) => void;
}): JSX.Element {
  const [contactInformation, setContactInformation] = useState<TContact>({
    ...CONTACT_INFORMATION,
  });
  const [contactsList, setContactsList] = useState<TContact[]>([]);
  const [alert, setAlert] = useState<{ active: boolean; message: string }>({
    active: false,
    message: "",
  });
  const [cpfError, setCPRError] = useState<boolean>(false);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCreateContact = () => {
    const hasContactRegistered = contactsList.filter(
      ({ cpf }) => cpf === contactInformation.cpf
    );

    if (!hasContactRegistered.length) {
      const updatedContacts = [...contactsList, contactInformation];
      setContactsList(updatedContacts);

      localStorage.setItem("contacts", JSON.stringify(updatedContacts));

      setAlert({ active: true, message: "Contato criado com sucesso." });

      setTimeout(() => {
        setAlert({ active: false, message: "" });

        setContactInformation({
          ...CONTACT_INFORMATION,
        });
      }, 4000);
    } else {
      setAlert({
        active: true,
        message: "Contato já existente.",
      });

      setTimeout(() => {
        setAlert({ active: false, message: "" });
      }, 4000);
    }
  };

  const hadleValidateCPF = (value: string): void => {
    const regex = /^[0-9]{3}[0-9]{3}[0-9]{3}[0-9]{2}$/;

    if (!regex.test(value)) {
      setCPRError(true);
    } else {
      setCPRError(false);
    }
  };

  useEffect(() => {
    if (contactInformation.cep.length >= 8) {
      const getData = async () => {
        const response = await fetch(
          `https://viacep.com.br/ws/${contactInformation.cep}/json/`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("data", data);

        setContactInformation({
          ...CONTACT_INFORMATION,
          uf: data.uf,
          city: data.localidade,
          address: data.logradouro,
          cep: data.cep,
        });
      };

      getData();
    }
  }, [contactInformation.cep]);

  useEffect(() => {
    const getData = async () => {
      if (
        contactInformation.address &&
        contactInformation.number &&
        contactInformation.city
      ) {
        const endereco = [
          `${contactInformation.address}, ${contactInformation.number}`,
          contactInformation.city,
        ];
        try {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
              endereco[0]
            )},${encodeURIComponent(
              endereco[1]
            )}&components=country:BR&key=AIzaSyDjchWJHf1z2mEE_VoThHFDPnI9LXPxqr0`
          );

          const data = await response.json();

          if (data.status === "OK") {
            const { lat, lng } = data.results[0].geometry.location;
            setContactInformation((state) => ({
              ...state,
              lat,
              lng,
            }));
          } else {
            console.error(`Erro na API: ${data.status}`);
          }
        } catch (error) {
          console.error("Erro ao buscar dados da API:", error);
        }
      }
    };

    getData();
  }, [
    contactInformation.address,
    contactInformation.number,
    contactInformation.city,
  ]);

  useEffect(() => {
    const storedData = localStorage.getItem("contacts");
    if (storedData) {
      setContactsList(JSON.parse(storedData));
    }
  }, []);

  return (
    <Dialog open={true} onClose={handleCloseDialog}>
      <DialogTitle>Cadastrar contato</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleCloseDialog}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent
        style={{
          paddingTop: "12px",
          display: "flex",
          flexDirection: "column",
          width: "400px",
          gap: "12px",
        }}
      >
        <TextField
          label="CEP"
          variant="outlined"
          value={contactInformation.cep}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setContactInformation({
              ...contactInformation,
              cep: event.target.value,
            });
          }}
        />
        <TextField
          label="Nome"
          variant="outlined"
          value={contactInformation.name}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setContactInformation({
              ...contactInformation,
              name: event.target.value,
            });
          }}
        />
        <TextField
          label="CPF"
          variant="outlined"
          value={contactInformation.cpf}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setContactInformation({
              ...contactInformation,
              cpf: event.target.value,
            });
            hadleValidateCPF(event.target.value);
          }}
          error={cpfError}
          helperText={cpfError && "CPF incorreto."}
        />
        <TextField
          label="Telefone"
          variant="outlined"
          value={contactInformation.phone}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setContactInformation({
              ...contactInformation,
              phone: event.target.value,
            });
          }}
        />

        <TextField
          label="Estado"
          id="uf"
          variant="outlined"
          value={contactInformation.uf}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setContactInformation({
              ...contactInformation,
              uf: event.target.value,
            });
          }}
        />
        <TextField
          label="Cidade"
          variant="outlined"
          value={contactInformation.city}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setContactInformation({
              ...contactInformation,
              city: event.target.value,
            });
          }}
        />
        <TextField
          label="Rua"
          variant="outlined"
          value={contactInformation.address}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setContactInformation({
              ...contactInformation,
              address: event.target.value,
            });
          }}
        />

        <TextField
          label="Número"
          variant="outlined"
          value={contactInformation.number}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setContactInformation({
              ...contactInformation,
              number: event.target.value,
            });
          }}
        />
        <TextField
          label="Complemento"
          variant="outlined"
          value={contactInformation.complement}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setContactInformation({
              ...contactInformation,
              complement: event.target.value,
            });
          }}
        />
        <Button variant="outlined" onClick={handleCreateContact}>
          Criar contato
        </Button>
      </DialogContent>
      {alert.active && <Alert>{alert.message}</Alert>}
    </Dialog>
  );
}

export default AddContacts;
