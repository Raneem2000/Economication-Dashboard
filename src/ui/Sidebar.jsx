import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";

const StyledSidebar = styled.aside`
  padding: 2rem 2.4rem;
  grid-row: 1 / -1;
  display: flex;
  height: 100%;
  flex-direction: column;
  gap: 1.2rem;
  background-color: #7a5aa5;
  border-top-right-radius: var(--border-radius-lg);
  border-bottom-right-radius: var(--border-radius-lg);
`;

function Sidebar() {
  return (
    <StyledSidebar>
      <Logo />
      <MainNav />
    </StyledSidebar>
  );
}

export default Sidebar;
