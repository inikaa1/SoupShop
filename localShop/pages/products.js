import Layout from "@/components/layout";
import Link from "next/link";
import {useState,useEffect} from "react";
import axios from "axios";
import withAdminProtection from "@/hoc/withAdminProtection";
import { useRouter } from "next/router";

function Products(){
const router = useRouter();
    const [products,setProducts] = useState([]);
    useEffect(() => {
        axios.get("/api/products").then( response => {
            setProducts(response.data)
        })
    },[])
function handleEditRouting(pID){
        router.push('/products/edit/' + pID);
    }
    function handleDeleteRouting(pID){
        router.push('/products/delete/' + pID);
    }
    return (
        <Layout>
                        <table className="basic mt-2">
                <thead>
                    <tr>
                        <td>Products</td>
                        <td>SOH</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product._id}>
                            <td>
                                {product.title}
                            </td>
                            <td>
                                {product.SOH}
                            </td>
                            <td className="sm:text-right max-sm:text-center">
                                <button onClick={() => handleEditRouting(product._id)} className="btn-primary sm:mr-2 max-sm:mb-1">
                                    Edit 
                                </button>
                                <button onClick={() => handleDeleteRouting(product._id)}className="btn-red">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
                <div className="mt-5">
                    <Link className="btn-primary" href = {"/products/new"}>
                        Add New Product
                    </Link>
                </div>
        </Layout>
    );
}


export default withAdminProtection(Products);
