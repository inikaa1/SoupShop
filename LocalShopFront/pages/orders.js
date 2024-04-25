import React, { useEffect, useState } from "react";
import styles from './Orders.module.css';
import Header from "@/components/Header";
import withProtection from "@/hoc/withProtection";
import { useSession } from 'next-auth/react'

function Orders() {
  const [orders, setOrders] = useState([]);
  const [isStage1, setIsStage1] = useState(window.innerWidth < 1000);
  const [isStage2, setIsStage2] = useState(window.innerWidth < 640);
  const [expandedRows, setExpandedRows] = useState([]);
  const { data: session } = useSession();


  useEffect(() => {
    async function fetchOrders() {
      if (session) {
        const userEmail = session.user.email;
        const response = await fetch(`/api/orders?email=${userEmail}`);
        if (response.ok) {
          const userOrders = await response.json();
          setOrders(userOrders);
        }
      }
    }

    fetchOrders();
  }, [session]);

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
const toggleRow = (_id) => {
  if (expandedRows.includes(_id)) {
    setExpandedRows(expandedRows.filter(id => id !== _id));
  } else {
    setExpandedRows([...expandedRows, _id]);
  }
};
    return (
    <>
      <Header />
      <div className={styles['table-container']}>
        <h1 className={styles['page-title']}>Orders</h1>
        {orders.length ? (
          <table className={styles['order-table']}>
            <thead>
              <tr>
                
                {!isStage2 && <th className={styles['order-table-header']}>OrderID</th>}
                <th className={styles['order-table-header']}>Order Placed Date</th>
                {!isStage1 && (<>
                  <th className={styles['order-table-header']}>Name</th>
                  <th className={styles['order-table-header']}>Address</th>
                  <th className={styles['order-table-header']}>Items</th>
                </>)}
                <th className={styles['order-table-header']}>Status</th>
                <th className={styles['order-table-header']}>Delivered Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
              <>
                <tr key={order._id} onClick={() => isStage1 && toggleRow(order._id)} style={isStage1 ? { cursor: 'pointer' } : {}}>
                  {!isStage2 && <td>{order._id}</td>}
                  <td>
                  {order.orderDate ? new Date(order.orderDate).toDateString() : 'N/A'}
                    </td>
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
                    </>
                  )}
                  <td>{order.status}</td>
                  <td>
                    {order.deliveryDate
                      ? new Date(order.deliveryDate).toDateString()
                      : "Not Delivered"}
                  </td>
                </tr>
                {isStage1 && expandedRows.includes(order._id) && (
                  <tr>
                    <td colSpan="7">
                      <p>Order ID: {order._id}</p>
                      <p>Placed at: {new Date(order.orderDate).toDateString()}</p>
                
                  <p>Name: {order.customer.name}</p>
                  <p>Address: {order.customer.address}</p>
                  <p> Items:
                    <ul>
                      {order.items.map((item, index) => (
                        <li key={index}>
                          {item.productName} (Qty: {item.quantity})
                        </li>
                      ))}
                    </ul>
                  </p>
                    </td>
                  </tr>
                )}
                </>
              ))}
            </tbody>
          </table>
        ) : (
          <p>You have no orders.</p>
        )}
      </div>
    </>
  );
}

export default withProtection(Orders);