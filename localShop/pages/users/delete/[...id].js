import Layout from "@/components/layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import withAdminProtection from "@/hoc/withAdminProtection";

function DeleteUserPage(){
    const router = useRouter();
    const [userInfo, setUserInfo] = useState();
    const { id } = router.query;

    useEffect(() => {
        if(!id){
            return;
        }
        axios.get("/api/users?id=" + id).then(response => {
            setUserInfo(response.data);
        })
    }, [id])

    function goBack(){
        router.push("/users");
    }

    async function deleteUser(){
        await axios.delete("/api/users?id=" + id);
        goBack();
    }

    return (
        <Layout>
            <h1 className="text-center mb-5"> 
                Do you really want to delete user "<b>{userInfo?.name}</b>" with email "<b>{userInfo?.email}</b>"? 
            </h1>
            <div className="flex gap-2 justify-center">
                <button className="btn-red" onClick={deleteUser}>
                    Yes
                </button>
                <button className="btn-primary" onClick={goBack}>
                    No
                </button>
            </div>
        </Layout>
    )
}

export default withAdminProtection(DeleteUserPage);
