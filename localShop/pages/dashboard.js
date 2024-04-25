import withAdminProtection from "@/hoc/withAdminProtection";
import Layout from "@/components/layout";
import { useSession, signIn } from "next-auth/react";
import {useState,useEffect} from "react";
import axios from "axios";

function Dashboard() {
    const { data: session, status } = useSession();
    const link = "https://isys2160localshop.s3.amazonaws.com/google-logo.png";
    const [products,setProducts] = useState([]);
    const [productListLength, setProductListLength] = useState(0);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    
    useEffect(() => {
            axios.get("/api/products").then(response => {
            const productsData = response.data;
            setProducts(productsData);
            setFilteredProducts(productsData.filter(product => product.SOH < 5).sort((a, b) => a.SOH - b.SOH));
        })
    }, []);

    useEffect(() => {
        axios.get("/api/orders").then(response => {
            const ordersData = response.data;
            setOrders(ordersData);
        }).catch(error => {
            console.error("Error fetching orders:", error);
        });
        
    }, []);

    useEffect(() => {
        setProductListLength(filteredProducts.length);
    }, [filteredProducts]);

    const ordersReadyToProcess = orders.filter(order => order.status === "paid");
    const ordersReadyToShip = orders.filter(order => order.status === "processed");

    if (status === 'loading') {
        return <p>Loading...</p>; 
    }

    if (!session){
        return (
            <div className="bg-[#59654E] w-screen h-screen flex items-center justify-center">
                <button onClick={() => signIn('google')} className="bg-[#F5F5F2] p-2 px-4 rounded-lg flex">
                <img src={link} className="rounded-lg h-6 mr-2" alt = "Login with google"></img>                
                <p>Login with Google</p>
                </button>
            </div>
        );
    }

    return (
        <Layout>
            <div className="dashboardContainer">
                <div className="rowContainer">
                    <div className="card">
                        <div className="card-header">
                            <h2>Products with low SOH</h2>
                        </div>
                        <table className="basic mt-2">
                            <thead>
                                <tr>
                                    <td>Product Name</td>
                                    <td>SOH</td>
                                </tr>
                            </thead>
                            <tbody>
                            {filteredProducts.map(product => (
                                    <tr key={product._id}>
                                        <td>{product.title}</td>
                                        <td>{product.SOH}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="card">
                        <div className="card-header">
                            <h2>Products with highest SOH</h2>
                        </div>
                        <table className="basic mt-2">
                            <thead>
                                <tr>
                                    <td>Product Name</td>
                                    <td>SOH</td>
                                </tr>
                            </thead>
                            <tbody>
                            {products.sort((a, b) => b.SOH - a.SOH).slice(0, productListLength).map(product => (
                                    <tr key={product._id}>
                                        <td>{product.title}</td>
                                        <td>{product.SOH}</td>
                                    </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <div className="rowContainer">
                    <div className="card">
                        <div className="card-header">
                            <h2>Orders ready to process</h2>
                        </div>
                        <table className="basic mt-2">
                            <thead>
                                <tr>
                                    <td>Customer Name</td>
                                    <td>Items</td>
                                </tr>
                            </thead>
                            <tbody>
                                {ordersReadyToProcess.map(order => (
                                    <tr key={order._id}>
                                        <td>{order.customer.name}</td>
                                        <td>
                                            <ul>
                                                {order.items.map(item => (
                                                    <li key={item.productName}>
                                                        {`${item.productName} (x${item.quantity})`}
                                                    </li>
                                                ))}
                                            </ul>                     
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="card">
                        <div className="card-header">
                            <h2>Orders ready to ship</h2>
                        </div>
                        <table className="basic mt-2">
                            <thead>
                                <tr>
                                    <td>Customer Name</td>
                                    <td>Address</td>
                                </tr>
                            </thead>
                            <tbody>
                                {ordersReadyToShip.map(order => (
                                    <tr key={order._id}>
                                        <td>{order.customer.name}</td>
                                        <td>{order.customer.address}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
export default withAdminProtection(Dashboard);