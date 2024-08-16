import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import LogoWe from "../ui/LogoWe";

const LoginLayout = styled.main`
  width: 100%;
  height: 100vh;
  background-image: url("/Group 113.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function Login() {
  return (
    <>
      <LogoWe />
      <LoginLayout>
        <LoginForm />
      </LoginLayout>
    </>
  );
}

export default Login;
