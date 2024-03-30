import {useState, useEffect} from "react";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";

import ProductCard from "../product-card";
import ProductSort from "../product-sort";
import instance from "../../../services/axios";
import ProductFilters from "../product-filters";

// ----------------------------------------------------------------------

export default function ProductsView() {
  const [openFilter, setOpenFilter] = useState(false);

  const [products, setProducts] = useState([]);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

    useEffect(() => {
        instance.get('/products')
            .then(res => {
                console.log(res);
                if ('data' in res) {
                setProducts(res.data);
                }
            }).catch(err => {
            console.log(err)
        });
    }, []);

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Danh sách sản phẩm
      </Typography>

      <Stack
        direction="row"
        alignItems="center"
        flexWrap="wrap-reverse"
        justifyContent="flex-end"
        sx={{ mb: 5 }}
      >
        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
                <Button variant='outlined'>
                    Thêm sản phẩm
                </Button>
          <ProductFilters
            openFilter={openFilter}
            onOpenFilter={handleOpenFilter}
            onCloseFilter={handleCloseFilter}
          />

          <ProductSort />
        </Stack>
      </Stack>

      <Grid container spacing={3}>
        {products?.map((product) => (
          <Grid key={product._id} xs={12} sm={6} md={3}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>

    </Container>
  );
}
