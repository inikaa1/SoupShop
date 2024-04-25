import { useSession } from "next-auth/react";
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Spinner
 from "@/components/spinner";
export default function withAdminProtection(Component) {
    return function AdminProtectedPage(props) {
        const { data: session, status } = useSession();
        const router = useRouter();

        useEffect(() => {
            if (status === 'authenticated') {
                if (session.user.role !== 'admin') {
                router.push('/notAuthorised'); 
            }
}
        }, [status, session]);
        
        
        if (status === 'loading') {
            return (<div style={{ height: '100vh' }} className="p-1 flex justify-center items-center ">
                <Spinner size={150} />
            </div>)
        }

        if (session && session.user.role === 'admin') {

            return <Component {...props} />;
        }

    }
}
