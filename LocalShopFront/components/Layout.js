import { useSession, signIn, signOut } from "next-auth/react"
import { useState, useEffect } from "react";
import Nav from "@/components/nav";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Layout({children}) {
const link = "https://isys2160localshop.s3.amazonaws.com/google-logo.png";
    const { data: session } = useSession();
    const notDashboard = "bg-[#F5F5F2] flex-grow mt-5 mr-5 mb-5 ml-0 rounded-md p-4 relative";
    const dashboard = "bg-[#F5F5F2] flex-grow mt-5 mr-5 mb-5 ml-0 rounded-tr-md rounded-br-md rounded-bl-md p-4 relative";
    const router = useRouter();
    const { pathname } = router;
    const backupImageURI = "https://isys2160localshop.s3.amazonaws.com/Profile_Image_Placeholder.jpeg"
    
    const [isOpen, setIsOpen] = useState(() => {
        return JSON.parse(localStorage.getItem('isOpen') || 'false');
    });
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
    useEffect(() => {
        localStorage.setItem('isOpen', JSON.stringify(isOpen));
    }, [isOpen]);
    
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
    <div className="flex flex-col h-screen">
        <div className="bg-[#424E28] py-2 text-[#F5F5F2] flex justify-between">
            <Link href={"/dashboard"} className="flex gap-1 mb-0 text-xl font-semibold p-2 ml-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
                </svg>
                <span className="">
                    Local Shop Admin
                </span>
            </Link>
            <div className="text-xs truncate flex justify-end items-center mb-0">

                            <div className="flex pl-1 pr-3 py-1">
                            <div className="flex pl-1 pr-3 py-1">
                            {session?.user?.image ? (
                                <img className="h-8 w-8 rounded-full ml-2" src={session.user.image} alt="User" onError=
                                    {(e) => {e.target.onerror = null; e.target.src={backupImageURI};}}/> ) : (<img className="h-8 w-8 rounded-full ml-2" src= {backupImageURI} alt="User" />)
                            }
                                <div className="flex flex-col">
                                    <b className="ml-2 text-sm">{session?.user?.name || 'Name'}</b>
                                    <p className="ml-2 text-xs">{session?.user?.role ? capitalizeFirstLetter(session.user.role) : 'Role'}</p>
                                </div>     
                                </div>                       
                        </div>
                    </div>
        </div>
        {/* <button type="button" onClick={() => console.log(session?.user?.image)} className="bg-red-500">
            THE TEST BUTTON. Something not working? PUT THE THING TO TEST IN THE CONSOLE.LOG TO CONSOLE.log it!
        </button> */}
        <div className="bg-[#59654E] flex flex-grow overflow-hidden">
            <Nav isOpen={isOpen} setIsOpen={setIsOpen} />
            <div className={isOpen ?  notDashboard : dashboard} style={{ overflowY: 'auto', flex: 1 }}>
                {children}
            </div>
        </div>
    </div>
    );
}