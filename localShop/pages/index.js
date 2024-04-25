import Layout from "@/components/layout";
import { useSession, signIn } from "next-auth/react";
import {useState,useEffect} from "react";
import { useRouter } from "next/router";
export default function Home() {
  const { data: session, status } = useSession();
  const link = "https://isys2160localshop.s3.amazonaws.com/google-logo.png";
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [isRun, setIsRun] = useState(false);


  useEffect(() => {
      setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []); 


  if (!session) {
    return (
      <div className="bg-[#59654E] w-screen h-screen flex flex-col items-center justify-center" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'77\' height=\'107\' viewBox=\'0 0 77 107\'%3E%3Cg fill-rule=\'evenodd\'%3E%3Cg id=\'stamp-collection\' fill=\'%23c0d9a1\' fill-opacity=\'0.27\'%3E%3Cpath d=\'M46 101a5 5 0 0 1 5 5h5a5 5 0 0 1 10 0h5a5 5 0 0 1 5-5v-5a5 5 0 0 1 0-10v-5a5 5 0 0 1 0-10v-5a5 5 0 0 1 0-10v-5a5 5 0 0 1 0-10v-5a5 5 0 0 1 0-10V6a5 5 0 0 1-5-5h-5a5 5 0 0 1-10 0h-5a5 5 0 0 1-10 0h-5a5 5 0 0 1-10 0h-5a5 5 0 0 1-10 0H6a5 5 0 0 1-5 5v5a5 5 0 0 1 0 10v5a5 5 0 0 1 0 10v5a5 5 0 0 1 0 10v5a5 5 0 0 1 0 10v5a5 5 0 0 1 0 10v5a5 5 0 0 1 5 5h5a5 5 0 0 1 10 0h5a5 5 0 0 1 10 0h5a5 5 0 0 1 5-5zm15-2a7 7 0 0 0-6.71 5h-1.58a7 7 0 0 0-13.42 0h-1.58a7 7 0 0 0-13.42 0h-1.58a7 7 0 0 0-13.42 0H7.71A7.01 7.01 0 0 0 3 99.29v-1.58a7 7 0 0 0 0-13.42v-1.58a7 7 0 0 0 0-13.42v-1.58a7 7 0 0 0 0-13.42v-1.58a7 7 0 0 0 0-13.42v-1.58a7 7 0 0 0 0-13.42v-1.58A7 7 0 0 0 3 9.29V7.71A7.02 7.02 0 0 0 7.71 3h1.58a7 7 0 0 0 13.42 0h1.58a7 7 0 0 0 13.42 0h1.58a7 7 0 0 0 13.42 0h1.58a7 7 0 0 0 13.42 0h1.58A7.02 7.02 0 0 0 74 7.71v1.58a7 7 0 0 0 0 13.42v1.58a7 7 0 0 0 0 13.42v1.58a7 7 0 0 0 0 13.42v1.58a7 7 0 0 0 0 13.42v1.58a7 7 0 0 0 0 13.42v1.58a7 7 0 0 0 0 13.42v1.58a7.01 7.01 0 0 0-4.71 4.71h-1.58A7 7 0 0 0 61 99zM12 12h53v83H12V12zm51 81H14V14h49v79z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}>
        <h1 className="text-[#F5F5F2] max-sm:text-7xl text-9xl mt-[-50px] mb-2 text-center" style={{ fontFamily: 'Allura, cursive' }}>Soup Street</h1>
        <h2 className="text-[#F5F5F2] max-sm:text-3xl text-4xl font-semibold mb-4 text-center" style={{ fontFamily: 'Tangerine, cursive' }}>Where Every Spoonful Feels Like Home.</h2>
        <button onClick={() => signIn('google')} className="bg-[#F5F5F2] p-3 px-5 text-[#59654E] rounded-lg flex items-center shadow-lg transform transition-transform hover:scale-105">
          <img src={link} className="rounded-lg h-8 mr-3" alt="Login with google" />
          <span className="text-lg font-semibold">Login with Google</span>
        </button>
      </div>
    );
}
  if (isMounted && !isRun) {  // ensure component is mounted before pushing new route
      if (status === 'authenticated' && session.user.role !== 'admin') {
        setIsRun(true);
        router.push('/notAuthorised');
      } else if (status === 'authenticated' && session.user.role === 'admin') {
        setIsRun(true);
        router.push('/dashboard');
      }
}
  return (
    <Layout>
      <div>
        <p>somethings gone wrong. You shouldn't be here :(</p>
      </div>
    </Layout>
  );
}