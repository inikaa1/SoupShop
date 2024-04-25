import Layout from "@/components/layout";
import { useEffect, useState } from "react";
import withAdminProtection from "@/hoc/withAdminProtection";

function Users() {
    const [isStage1, setIsStage1] = useState(window.innerWidth < 1000);
    const [isStage2, setIsStage2] = useState(window.innerWidth < 640);

    const [expandedRows, setExpandedRows] = useState([]);

    // const [users, setUsers] = useState([
    //     { user_id: 1, name: 'John Doe', email: 'john.doe@example.com' },
    //     { user_id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
    //     { user_id: 3, name: 'Robert Brown', email: 'robert.brown@example.com' }
    // ]);

    // function handleDelete(userId) {
    //     setUsers(prevUsers => prevUsers.filter(user => user.user_id !== userId));
    // }

    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await fetch('/api/users');
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Failed to fetch users:', error);
            }
        }
        fetchUsers();
    }, []);
    const toggleRow = (userId) => {
        if (expandedRows.includes(userId)) {
            setExpandedRows(expandedRows.filter(id => id !== userId));
        } else {
            setExpandedRows([...expandedRows, userId]);
        }
    };
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
    

    async function handleDelete(userId) {
        try {
            const response = await fetch(`/api/users?id=${userId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
            } else {
                console.error('Failed to delete user:', await response.text());
            }
        } catch (error) {
            console.error('Failed to delete user:', error);
        }
    }

    return (
        <Layout>
            <table className="basic mt-2">
                <thead>
                    <tr>
                        {!isStage1 &&  <td>User ID</td>}
                        {!isStage2 &&  <td>Name</td>}
                        <td>Email</td>
                        <td className="text-center">Action</td>
                    </tr>
                </thead>
                <tbody>
                {users.map(user => (
                    <>
                        <tr key={user._id} onClick={() => isStage1 && toggleRow(user._id)} className={isStage1 ? "cursor-pointer" : ""}>
                            {!isStage1 && <td>{user._id}</td>}
                            {!isStage2 && <td>{user.name}</td>}
                            <td>{user.email}</td>
                            <td className="text-center">
                                <button 
                                    onClick={() => handleDelete(user._id)} 
                                    className="btn-red mx-auto">
                                    Delete
                                </button>
                            </td>
                        </tr>
                        {isStage1 && expandedRows.includes(user._id) && (
                            <tr>
                                <td colSpan={isStage2 ? 1 : 2}>
                                    <p>User ID: {user._id}</p>
                                    <p>Name: {user.name}</p>
                                    <p>Email: {user.email}</p>
                                </td>
                                <td></td>
                            </tr>
                        )}
                    </>
                ))}


                </tbody>
            </table>
        </Layout>
    );
}

export default withAdminProtection(Users);
