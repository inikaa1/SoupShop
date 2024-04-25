import { useSession, signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styled, { createGlobalStyle } from "styled-components";
import { textColour, background, foreground, pastel } from "@/lib/colors";
import Button from "@/components/Button";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${foreground};
    background-image: url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'77\' height=\'107\' viewBox=\'0 0 77 107\'%3E%3Cg fill-rule=\'evenodd\'%3E%3Cg id=\'stamp-collection\' fill=\'%23c0d9a1\' fill-opacity=\'0.27\'%3E%3Cpath d=\'M46 101a5 5 0 0 1 5 5h5a5 5 0 0 1 10 0h5a5 5 0 0 1 5-5v-5a5 5 0 0 1 0-10v-5a5 5 0 0 1 0-10v-5a5 5 0 0 1 0-10v-5a5 5 0 0 1 0-10v-5a5 5 0 0 1 0-10V6a5 5 0 0 1-5-5h-5a5 5 0 0 1-10 0h-5a5 5 0 0 1-10 0h-5a5 5 0 0 1-10 0h-5a5 5 0 0 1-10 0H6a5 5 0 0 1-5 5v5a5 5 0 0 1 0 10v5a5 5 0 0 1 0 10v5a5 5 0 0 1 0 10v5a5 5 0 0 1 0 10v5a5 5 0 0 1 0 10v5a5 5 0 0 1 5 5h5a5 5 0 0 1 10 0h5a5 5 0 0 1 10 0h5a5 5 0 0 1 5-5zm15-2a7 7 0 0 0-6.71 5h-1.58a7 7 0 0 0-13.42 0h-1.58a7 7 0 0 0-13.42 0h-1.58a7 7 0 0 0-13.42 0H7.71A7.01 7.01 0 0 0 3 99.29v-1.58a7 7 0 0 0 0-13.42v-1.58a7 7 0 0 0 0-13.42v-1.58a7 7 0 0 0 0-13.42v-1.58a7 7 0 0 0 0-13.42v-1.58a7 7 0 0 0 0-13.42v-1.58A7 7 0 0 0 3 9.29V7.71A7.02 7.02 0 0 0 7.71 3h1.58a7 7 0 0 0 13.42 0h1.58a7 7 0 0 0 13.42 0h1.58a7 7 0 0 0 13.42 0h1.58a7 7 0 0 0 13.42 0h1.58A7.02 7.02 0 0 0 74 7.71v1.58a7 7 0 0 0 0 13.42v1.58a7 7 0 0 0 0 13.42v1.58a7 7 0 0 0 0 13.42v1.58a7 7 0 0 0 0 13.42v1.58a7 7 0 0 0 0 13.42v1.58a7 7 0 0 0 0 13.42v1.58a7.01 7.01 0 0 0-4.71 4.71h-1.58A7 7 0 0 0 61 99zM12 12h53v83H12V12zm51 81H14V14h49v79z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    margin: 0;  // Reset default margin
  }
`;

const Box = styled.div`
  background-color: ${background};
  border-radius: 10px;
  padding: 30px;
`;

const CenteredBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* This ensures the box is centered vertically on the page */
`;

const GoogleButton = styled(Button)`
  background-color: ${textColour}; /* Google Blue */
  color: ${background};
  border: none;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;

  img {
    width: 24px;
    height: 24px;
    margin-right: 10px;
  }

  &:hover {
    background-color: ${pastel};
  }
`;


export default function Login() {
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
      <>
        <GlobalStyle />
        <CenteredBox>
          <Box>
            <GoogleButton white block onClick={() => signIn('google')}>
              <img src={link} alt="Login with Google"/>
              Login with Google
            </GoogleButton>
          </Box>
        </CenteredBox>
      </>
    );
  }
  if (isMounted && !isRun && status === 'authenticated') {  // ensure component is mounted before pushing new route
    setIsRun(true);
    router.push('/homepage');
  };
}