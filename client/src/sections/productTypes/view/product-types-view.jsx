import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

// ----------------------------------------------------------------------

export default function ProductTypeView() {

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Danh sách loại sản phẩm
      </Typography>

      <Stack
        direction="row"
        alignItems="center"
        flexWrap="wrap-reverse"
        justifyContent="flex-end"
        sx={{ mb: 5 }}
      />
    </Container>
  );
}
