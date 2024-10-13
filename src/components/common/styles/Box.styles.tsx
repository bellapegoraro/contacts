import Grid from "@mui/material/Grid2";
import { styled } from "@mui/material/styles";

export const Box = styled(Grid)(() => ({
  padding: "24px",
  gap: "16px",
  borderRadius: "8px",
  boxShadow: "3px 3px 12px -6px rgba(0,0,0,0.75)",
  display: "grid",
  flexDirection: "column",
  // height: "fit-content",
  alignSelf: "center",
  backgroundColor: "#ffffff",
}));
