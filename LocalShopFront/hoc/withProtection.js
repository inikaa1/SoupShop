import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Spinner from "@/components/spinner";

export default function withProtection(Component) {
  return function ProtectedPage(props) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "loading") {
            return;
        }

        if (!session) {
            router.push("/login");
        }
    }, [status, session, router]);

    if (status === "loading") {
        return (
            <div style={{ height: "100vh" }} className="p-1 flex justify-center items-center">
                <Spinner size={150} />
            </div>
            );
    }

    if (session) {
        return <Component {...props} />;
    }

    return <div>You have to login to access this page.</div>;
    };
}
