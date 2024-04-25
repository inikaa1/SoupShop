import Layout from "@/components/layout";
import withAdminProtection from "@/hoc/withAdminProtection";
import { useEffect, useState } from "react";
import styles from './Orders.module.css';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [isStage1, setIsStage1] = useState(window.innerWidth < 1000);
  const [isStage2, setIsStage2] = useState(window.innerWidth < 640);
  const [expandedRows, setExpandedRows] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await fetch('/api/orders'); 
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    }
  
    fetchOrders();
  }, []);

  useEffect(() => {
    function handleResize() {
        setIsStage1(window.innerWidth < 1000);
        setIsStage2(window.innerWidth < 640);
    }

    window.addEventListener('resize', handleResize);

    return () => {
        window.removeEventListener('resize', handleResize);
    };
}, []);

const handleStatusChange = async (_id, newStatus) => {
  // First, update the local state to provide immediate feedback to the user
  setOrders((prevOrders) =>
    prevOrders.map((order) =>
      order._id === _id
        ? {
            ...order,
            status: newStatus,
            deliveryDate: newStatus === "delivered" ? new Date() : order.deliveryDate,
          }
        : order
    )
  );

  // Then, make an API call to update the status in the database
  try {
    const response = await fetch('/api/updateOrderStatus', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ orderId: _id, newStatus }),
    });

    if (!response.ok) {
      throw new Error('Failed to update order status in the database.');
    }

  } catch (error) {
    console.error('Error updating order status:', error);
    
    // If the API call fails, revert the change in the UI to match the database
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order._id === _id
          ? {
              ...order,
              status: order.status, // revert the status to its previous value
              deliveryDate: order.deliveryDate 
            }
          : order
      )
    );
  }
};

  
  const toggleRow = (_id) => {
    if (expandedRows.includes(_id)) {
      setExpandedRows(expandedRows.filter(id => id !== _id));
    } else {
      setExpandedRows([...expandedRows, _id]);
    }
  };
  return (
    <Layout>
      <div className={styles['table-container']}>
        <table className={styles['order-table']}>
          <thead>
            <tr>
              {!isStage2 &&<th className={styles['order-table-header']}>OrderID</th>}
              
              <th className={styles['order-table-header']}>Order Placed Date</th>
              {!isStage1 && (
                <>
                  <th className={styles['order-table-header']}>Name</th>
                  <th className={styles['order-table-header']}>Address</th>
                  <th className={styles['order-table-header']}>Items</th>
                </>
              )}
              <th className={styles['order-table-header']}>Status</th>
              <th className={styles['order-table-header']}>Delivered Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
            <>
              <tr key={order._id}  onClick={() => isStage1 && toggleRow(order._id)} className={isStage1 ? "cursor-pointer" : ""}>
                {!isStage2 && <td>{order._id}</td>}
                <td>{new Date(order.orderDate).toDateString()}</td>
                {!isStage1 && (
                <>
                  <td>{order.customer.name}</td>
                  <td>{order.customer.address}</td>
                  <td>
                    <ul>
                      {order.items.map((item, index) => (
                        <li key={index}>
                          {item.productName} (Qty: {item.quantity})
                        </li>
                      ))}
                    </ul>
                  </td>
                </>)}
                
                <td>
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                    className={styles['status-dropdown']}
                    // disable the dropdown if the order status is 'delivered'
                    disabled={order.status === "delivered"}
                  >
                    <option value="paid">Paid</option>
                    <option value="processed">Processed</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                  </select>
                  {order.status === "delivered" && <span> (Status finalized)</span>}
                </td>
                <td>
                  {order.deliveryDate ? new Date(order.deliveryDate).toDateString() : "Not Delivered"}
                </td>
              </tr>
              {isStage1 && expandedRows.includes(order._id) && (
                  <tr>
                    <td colSpan="7">
                      <p>Order ID: {order._id}</p>
                      <p>Placed at:{new Date(order.orderDate).toDateString()}</p>
                
                  <p>Customer Name: {order.customer.name}</p>
                  <p>Customer Address: {order.customer.address}</p>
                  <p>
                    <ul>
                      {order.items.map((item, index) => (
                        <li key={index}>
                          {item.productName} (Qty: {item.quantity})
                        </li>
                      ))}
                    </ul>
                  </p>
                <p> Update Order Status:
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                    className={styles['status-dropdown']}
                    // disable the dropdown if the order status is 'delivered'
                    disabled={order.status === "delivered"}
                  >
                    <option value="paid">Paid</option>
                    <option value="processed">Processed</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                  </select>
                  {order.status === "delivered" && <span> (Status finalized)</span>}
                </p>
                <p> 
                  {order.deliveryDate
                    ? order.deliveryDate.toDateString()
                    : "Not Delivered"}
                </p>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default withAdminProtection(Orders);