import Layout from "@/components/layout";
import ProductForm from "@/components/productForm";
import withAdminProtection from "@/hoc/withAdminProtection";

function NewProduct(){
    return(
        <Layout>
            <h1>New Product</h1>
            <ProductForm/>
        </Layout>
    );
}

export default withAdminProtection(NewProduct)