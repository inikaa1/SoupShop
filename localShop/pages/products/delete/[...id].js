import Layout from "@/components/layout";
import {useRouter} from "next/router";
import {useEffect,useState} from "react";
import axios from "axios";
import withAdminProtection from "@/hoc/withAdminProtection";

function DeleteProductPage(){
    const router = useRouter();
    const [productInfo,setProductInfo] = useState();
    const {id} = router.query;
    useEffect(()=> {
        if(!id){
            return;
        }
        axios.get("/api/products?id=" +id).then(response => {
            setProductInfo(response.data);
        })
    },[id])
    function goBack(){
        router.push("/products");
    }
    async function deleteProduct(){
        await axios.delete("/api/products?id="+id);
        goBack();
    }
    return(
        <Layout>
            <h1 className="text-center mb-5"> Do you really want to delete "<b>{productInfo?.title}</b>"? </h1>
            <div className="flex gap-2 justify-center">
                <button className="btn-red" onClick={deleteProduct}>
                    Yes
                </button>
                <button className="btn-primary" onClick={goBack}>
                    No
                </button>
            </div>
        </Layout>
    )
}

export default withAdminProtection(DeleteProductPage);