import { Helmet } from "react-helmet-async";

import { ProductTypeView } from "src/sections/productTypes/view";

// ----------------------------------------------------------------------
function ProductTypePage() {
    return (
        <>
            <Helmet>
                <title> Loại sản phẩm | Bông Tuyết Trắng </title>
            </Helmet>

            <ProductTypeView />
        </>
    );
}

export default ProductTypePage;
