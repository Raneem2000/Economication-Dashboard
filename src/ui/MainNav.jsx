import { NavLink, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { logout } from "../services/apiAuth";
import { useState } from "react";
import Modal from "./Modal";
const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  height: 100%;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    font-family: "Cairo", sans-serif;
    color: var(--color-grey-0);
    font-size: 1.5rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: #ffa015;
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    transition: all 0.3s;
  }

  &:hover svg path,
  &:active svg path,
  &.active:link svg path,
  &.active:visited svg path {
    fill: #ffa015;
    stroke: #ffa015;
    font-weight: 500;
  }
  &:hover svg .logout-icon,
  &:active svg .logout-icon,
  &.active:link svg .logout-icon,
  &.active:visited svg .logout-icon {
    fill: none !important;
    stroke: #ffa015;
    font-weight: 500;
  }
`;
const StyledLogout = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    font-family: "Cairo", sans-serif;
    color: var(--color-grey-0);
    font-size: 16px;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
    &:hover {
      color: #ffa015;
    }
    &:hover svg .logout-icon {
      fill: none !important;
      stroke: #ffa015;
      font-weight: 500;
    }
  }
`;
const Content = styled.div`
  margin: 40px 0px;
  width: 350px !important;
`;
const Title = styled.h2`
  margin-bottom: 25px;
`;
const ButtonEnter = styled.button`
  width: 45%;
  border: none;
  outline: none;
  background-color: #5c2d91;
  border-radius: 4px;
  color: #fff;
  padding: 4px 0px;
  &:focus {
    outline: none;
  }
`;
const ButtonCancel = styled.button`
  width: 45%;
  background-color: #fdf7ff;
  border: 1px solid #e1e3e6;
  padding: 4px 0px;
  border-radius: 4px;

  &:focus {
    outline: none;
  }
`;
const ButtonsCategory = styled.div`
  display: flex;
  width: 90%;
  margin: auto;
  justify-content: center;
  gap: 20px;
`;
function MainNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);

  const handleLogoutClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirmLogout = () => {
    logout(navigate);
    setShowModal(false);
  };

  return (
    <nav>
      <NavList>
        <li>
          <StyledNavLink to="/dashboard">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.77 13.75H15.73C13.72 13.75 12.75 12.82 12.75 10.9V4.1C12.75 2.18 13.73 1.25 15.73 1.25H19.77C21.78 1.25 22.75 2.18 22.75 4.1V10.9C22.75 12.82 21.77 13.75 19.77 13.75ZM15.73 2.75C14.46 2.75 14.25 3.09 14.25 4.1V10.9C14.25 11.91 14.46 12.25 15.73 12.25H19.77C21.04 12.25 21.25 11.91 21.25 10.9V4.1C21.25 3.09 21.04 2.75 19.77 2.75H15.73Z" fill="#fff" />
              <path d="M19.77 22.75H15.73C13.72 22.75 12.75 21.82 12.75 19.9V18.1C12.75 16.18 13.73 15.25 15.73 15.25H19.77C21.78 15.25 22.75 16.18 22.75 18.1V19.9C22.75 21.82 21.77 22.75 19.77 22.75ZM15.73 16.75C14.46 16.75 14.25 17.09 14.25 18.1V19.9C14.25 20.91 14.46 21.25 15.73 21.25H19.77C21.04 21.25 21.25 20.91 21.25 19.9V18.1C21.25 17.09 21.04 16.75 19.77 16.75H15.73Z" fill="#fff" />
              <path d="M8.27 22.75H4.23C2.22 22.75 1.25 21.82 1.25 19.9V13.1C1.25 11.18 2.23 10.25 4.23 10.25H8.27C10.28 10.25 11.25 11.18 11.25 13.1V19.9C11.25 21.82 10.27 22.75 8.27 22.75ZM4.23 11.75C2.96 11.75 2.75 12.09 2.75 13.1V19.9C2.75 20.91 2.96 21.25 4.23 21.25H8.27C9.54 21.25 9.75 20.91 9.75 19.9V13.1C9.75 12.09 9.54 11.75 8.27 11.75H4.23Z" fill="#fff" />
              <path d="M8.27 8.75H4.23C2.22 8.75 1.25 7.82 1.25 5.9V4.1C1.25 2.18 2.23 1.25 4.23 1.25H8.27C10.28 1.25 11.25 2.18 11.25 4.1V5.9C11.25 7.82 10.27 8.75 8.27 8.75ZM4.23 2.75C2.96 2.75 2.75 3.09 2.75 4.1V5.9C2.75 6.91 2.96 7.25 4.23 7.25H8.27C9.54 7.25 9.75 6.91 9.75 5.9V4.1C9.75 3.09 9.54 2.75 8.27 2.75H4.23Z" fill="#fff" />
            </svg>
            <span>لوحه التحكم</span>
          </StyledNavLink>
        </li>

        <li>
          <StyledNavLink to="/users" className={location.pathname.startsWith("/profile") ? "active" : ""}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 7.16C17.94 7.15 17.87 7.15 17.81 7.16C16.43 7.11 15.33 5.98 15.33 4.58C15.33 3.15 16.48 2 17.91 2C19.34 2 20.49 3.16 20.49 4.58C20.48 5.98 19.38 7.11 18 7.16Z" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M16.97 14.4402C18.34 14.6702 19.85 14.4302 20.91 13.7202C22.32 12.7802 22.32 11.2402 20.91 10.3002C19.84 9.59016 18.31 9.35016 16.94 9.59016" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M5.96998 7.16C6.02998 7.15 6.09998 7.15 6.15998 7.16C7.53998 7.11 8.63998 5.98 8.63998 4.58C8.63998 3.15 7.48998 2 6.05998 2C4.62998 2 3.47998 3.16 3.47998 4.58C3.48998 5.98 4.58998 7.11 5.96998 7.16Z" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M7 14.4402C5.63 14.6702 4.12 14.4302 3.06 13.7202C1.65 12.7802 1.65 11.2402 3.06 10.3002C4.13 9.59016 5.66 9.35016 7.03 9.59016" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M12 14.6302C11.94 14.6202 11.87 14.6202 11.81 14.6302C10.43 14.5802 9.32996 13.4502 9.32996 12.0502C9.32996 10.6202 10.48 9.47021 11.91 9.47021C13.34 9.47021 14.49 10.6302 14.49 12.0502C14.48 13.4502 13.38 14.5902 12 14.6302Z" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M9.08997 17.7804C7.67997 18.7204 7.67997 20.2603 9.08997 21.2003C10.69 22.2703 13.31 22.2703 14.91 21.2003C16.32 20.2603 16.32 18.7204 14.91 17.7804C13.32 16.7204 10.69 16.7204 9.08997 17.7804Z" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <span>المستخدمين</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/games">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.5581 22.9771C17.2315 22.9771 16.8763 22.8796 16.5157 22.6848L11.6366 20.0428L8.63976 21.666C8.29597 21.8534 7.86976 21.7163 7.68813 21.362C7.50689 21.0078 7.63929 20.5691 7.98347 20.3829L11.3084 18.5821C11.5137 18.471 11.7591 18.471 11.9644 18.5821L17.1708 21.4013C17.4147 21.5329 17.5562 21.5353 17.5868 21.5258C17.5757 21.5207 17.6173 21.3809 17.5703 21.1001L16.5767 15.1349C16.5371 14.8993 16.6134 14.6597 16.779 14.4928L20.9888 10.2695C21.1872 10.0704 21.2342 9.93174 21.2349 9.89914C21.2246 9.90856 21.1101 9.82491 20.835 9.78367L15.0177 8.91293C14.7883 8.87837 14.5899 8.7303 14.4873 8.51625L12.8126 5.0231C12.6405 4.66373 12.7836 4.22934 13.1323 4.05182C13.4819 3.87508 13.9039 4.02236 14.076 4.38095L15.587 7.53201L21.038 8.34776C21.8294 8.46716 22.3907 8.87562 22.578 9.46907C22.765 10.0629 22.5445 10.733 21.9721 11.3072L18.0275 15.2649L18.9589 20.8546C19.0936 21.6653 18.889 22.3404 18.3987 22.7076C18.1587 22.8871 17.8718 22.9771 17.5581 22.9771Z" fill="#fff" />
              <path d="M5.25516 23C4.93142 23 4.6349 22.9088 4.38648 22.7267C3.87939 22.3547 3.66804 21.6699 3.80684 20.8481L4.77015 15.1779L0.694116 11.1644C0.102643 10.5821 -0.126059 9.90246 0.0675492 9.30014C0.260763 8.69783 0.840801 8.28314 1.659 8.16244L7.29337 7.33505L9.81423 2.17634C10.179 1.42863 10.748 1 11.3745 1C12.0015 1.0004 12.5705 1.42943 12.936 2.17754C13.1135 2.54164 12.9656 2.98262 12.6052 3.16228C12.2448 3.34233 11.8083 3.19295 11.63 2.82806C11.5035 2.56952 11.3864 2.47949 11.3552 2.46874C11.3623 2.47949 11.2452 2.56912 11.1186 2.82726L8.4286 8.33254C8.32253 8.54964 8.11749 8.69982 7.88051 8.73488L1.86878 9.61803C1.58527 9.65946 1.46421 9.74511 1.4441 9.7718C1.45041 9.77538 1.50443 9.90883 1.71027 10.1112L6.06074 14.3943C6.23227 14.5636 6.31074 14.8066 6.27012 15.0456L5.24214 21.0963C5.19404 21.3803 5.23741 21.5225 5.25634 21.55C5.25752 21.5376 5.40421 21.5348 5.65657 21.401C6.01224 21.2122 6.45269 21.3504 6.6396 21.7105C6.8265 22.0698 6.68928 22.5148 6.33321 22.7032C5.96019 22.9012 5.59308 23 5.25516 23Z" fill="#FFf" />
            </svg>
            <span>الالعاب</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/settings">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 15.75C9.93 15.75 8.25 14.07 8.25 12C8.25 9.93 9.93 8.25 12 8.25C14.07 8.25 15.75 9.93 15.75 12C15.75 14.07 14.07 15.75 12 15.75ZM12 9.75C10.76 9.75 9.75 10.76 9.75 12C9.75 13.24 10.76 14.25 12 14.25C13.24 14.25 14.25 13.24 14.25 12C14.25 10.76 13.24 9.75 12 9.75Z" fill="#FFf" />
              <path
                d="M15.21 22.1903C15 22.1903 14.79 22.1603 14.58 22.1103C13.96 21.9403 13.44 21.5503 13.11 21.0003L12.99 20.8003C12.4 19.7803 11.59 19.7803 11 20.8003L10.89 20.9903C10.56 21.5503 10.04 21.9503 9.42 22.1103C8.79 22.2803 8.14 22.1903 7.59 21.8603L5.87 20.8703C5.26 20.5203 4.82 19.9503 4.63 19.2603C4.45 18.5703 4.54 17.8603 4.89 17.2503C5.18 16.7403 5.26 16.2803 5.09 15.9903C4.92 15.7003 4.49 15.5303 3.9 15.5303C2.44 15.5303 1.25 14.3403 1.25 12.8803V11.1203C1.25 9.66029 2.44 8.47029 3.9 8.47029C4.49 8.47029 4.92 8.30029 5.09 8.01029C5.26 7.72029 5.19 7.26029 4.89 6.75029C4.54 6.14029 4.45 5.42029 4.63 4.74029C4.81 4.05029 5.25 3.48029 5.87 3.13029L7.6 2.14029C8.73 1.47029 10.22 1.86029 10.9 3.01029L11.02 3.21029C11.61 4.23029 12.42 4.23029 13.01 3.21029L13.12 3.02029C13.8 1.86029 15.29 1.47029 16.43 2.15029L18.15 3.14029C18.76 3.49029 19.2 4.06029 19.39 4.75029C19.57 5.44029 19.48 6.15029 19.13 6.76029C18.84 7.27029 18.76 7.73029 18.93 8.02029C19.1 8.31029 19.53 8.48029 20.12 8.48029C21.58 8.48029 22.77 9.67029 22.77 11.1303V12.8903C22.77 14.3503 21.58 15.5403 20.12 15.5403C19.53 15.5403 19.1 15.7103 18.93 16.0003C18.76 16.2903 18.83 16.7503 19.13 17.2603C19.48 17.8703 19.58 18.5903 19.39 19.2703C19.21 19.9603 18.77 20.5303 18.15 20.8803L16.42 21.8703C16.04 22.0803 15.63 22.1903 15.21 22.1903ZM12 18.4903C12.89 18.4903 13.72 19.0503 14.29 20.0403L14.4 20.2303C14.52 20.4403 14.72 20.5903 14.96 20.6503C15.2 20.7103 15.44 20.6803 15.64 20.5603L17.37 19.5603C17.63 19.4103 17.83 19.1603 17.91 18.8603C17.99 18.5603 17.95 18.2503 17.8 17.9903C17.23 17.0103 17.16 16.0003 17.6 15.2303C18.04 14.4603 18.95 14.0203 20.09 14.0203C20.73 14.0203 21.24 13.5103 21.24 12.8703V11.1103C21.24 10.4803 20.73 9.96029 20.09 9.96029C18.95 9.96029 18.04 9.52029 17.6 8.75029C17.16 7.98029 17.23 6.97029 17.8 5.99029C17.95 5.73029 17.99 5.42029 17.91 5.12029C17.83 4.82029 17.64 4.58029 17.38 4.42029L15.65 3.43029C15.22 3.17029 14.65 3.32029 14.39 3.76029L14.28 3.95029C13.71 4.94029 12.88 5.50029 11.99 5.50029C11.1 5.50029 10.27 4.94029 9.7 3.95029L9.59 3.75029C9.34 3.33029 8.78 3.18029 8.35 3.43029L6.62 4.43029C6.36 4.58029 6.16 4.83029 6.08 5.13029C6 5.43029 6.04 5.74029 6.19 6.00029C6.76 6.98029 6.83 7.99029 6.39 8.76029C5.95 9.53029 5.04 9.97029 3.9 9.97029C3.26 9.97029 2.75 10.4803 2.75 11.1203V12.8803C2.75 13.5103 3.26 14.0303 3.9 14.0303C5.04 14.0303 5.95 14.4703 6.39 15.2403C6.83 16.0103 6.76 17.0203 6.19 18.0003C6.04 18.2603 6 18.5703 6.08 18.8703C6.16 19.1703 6.35 19.4103 6.61 19.5703L8.34 20.5603C8.55 20.6903 8.8 20.7203 9.03 20.6603C9.27 20.6003 9.47 20.4403 9.6 20.2303L9.71 20.0403C10.28 19.0603 11.11 18.4903 12 18.4903Z"
                fill="#FFf"
              />
            </svg>
            <span>الاعدادات</span>
          </StyledNavLink>
        </li>
        <li onClick={handleLogoutClick}>
          <StyledLogout>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path className="logout-icon" d="M8.90002 7.55999C9.21002 3.95999 11.06 2.48999 15.11 2.48999H15.24C19.71 2.48999 21.5 4.27999 21.5 8.74999V15.27C21.5 19.74 19.71 21.53 15.24 21.53H15.11C11.09 21.53 9.24002 20.08 8.91002 16.54" stroke="#FFf" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path className="logout-icon" d="M15 12H3.62" stroke="#FFf" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path className="logout-icon" d="M5.85 8.6499L2.5 11.9999L5.85 15.3499" stroke="#FFf" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <span>تسجيل الخروج</span>
          </StyledLogout>
        </li>
        {showModal && (
          <Modal onClose={handleCloseModal}>
            <Content>
              <Title>هل انت متاكد من تسجيل الخروج؟</Title>
              <ButtonsCategory>
                <ButtonCancel onClick={handleConfirmLogout}>نعم ارغب</ButtonCancel>
                <ButtonEnter onClick={handleCloseModal}>لا ارغب</ButtonEnter>
              </ButtonsCategory>
            </Content>
          </Modal>
        )}
      </NavList>
    </nav>
  );
}

export default MainNav;
