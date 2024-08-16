import React from "react";
import Stat from "./Stat";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

const StyledStats = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  @media (max-width: 1000px) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 0.7rem;
  }
  & > * {
    flex: 1;
  }
`;

function Stats({ totalUser, liveUsers, revenues }) {
  const navigate = useNavigate();
  function handelClickNavigate() {
    navigate("/users");
  }

  return (
    <React.Fragment>
      <StyledStats>
        <Stat
          title="المستخدمين"
          image="/usersIcon.svg"
          value={totalUser}
          handelClickNavigate={handelClickNavigate}
        />
        <Stat
          title="المستخدمين الناشطين"
          image="/usersActive-icon.svg"
          value={liveUsers}
        />
        <Link to={"/revenue"}>
          <Stat title="الايرادات" image="/Revenues-icon.svg" value={revenues} />
        </Link>
      </StyledStats>
    </React.Fragment>
  );
}

export default Stats;
