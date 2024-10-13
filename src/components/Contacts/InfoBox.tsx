import { Box, Typography } from "@mui/material";

function InfoBox({
  setOpenDialog,
}: {
  setOpenDialog: (state: boolean) => void;
}): JSX.Element {
  return (
    <Box>
      <Typography variant="body1" component="p" align="center">
        Sua lista de contatos está vazia.
      </Typography>
    </Box>
  );
}

export default InfoBox;
