import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import styled from "styled-components";
import LogoWe from "./LogoWe";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 22.5rem 1fr;
  grid-template-rows: auto 1fr;
  direction: rtl;
  background-color: #fff;
  width: 90%;
  height: calc(100vh - 130px);
  margin: 25px auto;
  border-radius: var(--border-radius-lg);

  font-family: "Cairo";
`;
const Main = styled.main`
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 0px;
  }
`;

function AppLayout() {
  return (
    <>
      <LogoWe />
      <StyledAppLayout>
        {/* <Header /> */}
        <Sidebar />
        <Main>
          <Outlet />
        </Main>
      </StyledAppLayout>
    </>
  );
}

export default AppLayout;
