import Layout from "@/components/layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductForm from "@/components/productForm";
import withAdminProtection from "@/hoc/withAdminProtection";

function EditProductPage() {
    const [productInfo, setProductInfo] = useState(null);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (!id) {
            return;
        }
        async function fetchProductInfo() {
            try {
                const response = await axios.get("/api/products?id=" + id);
                setProductInfo(response.data);
            } catch (error) {
                console.error("Error fetching product data:", error);
            }
        }
        fetchProductInfo();
        }, [id]);

    return (
        <Layout>
            <h1>Edit Product</h1>
        {productInfo && <ProductForm {...productInfo} />}
        </Layout>
    );
}
export default withAdminProtection(EditProductPage);