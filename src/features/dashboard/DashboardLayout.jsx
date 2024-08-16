import styled from "styled-components";
import Stats from "./Stats";
import Calender from "./Calender";
import GamesResults from "./GamesResults";
import { useState } from "react";
import { api } from "../../services/apiAuth";
import { useEffect } from "react";
import Header from "../../ui/Header";

const StyledDashboardLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  width: calc(100vw - 360px);
  height: 100%;
  box-sizing: border-box;
  padding: 1rem;

  @media (max-width: 1024px) {
    padding: 0.5rem;
    width: calc(100vw - 300px);
  }
`;

const StyledStats = styled.div`
  display: flex;
  flex: 0 0 auto;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.6rem;
  }
`;

const BottomSection = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.2rem;
  height: calc(100vh - 340px);
  width: 96%;
  margin: 0 auto;

  @media (max-width: 1050px) {
    flex-direction: column;
    height: auto;
  }
`;

const StyledCalender = styled(Calender)`
  flex: 1;
  height: 100%;

  @media (max-width: 800px) {
    height: 100%;
  }
`;

const StyledGamesResults = styled(GamesResults)`
  flex: 2;
  height: 100%;

  @media (max-width: 1000px) {
    height: 100%;
    flex-direction: column;
  }
`;
function DashboardLayout() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [selectedGameBorder, setSelectedGameBorder] = useState(null);
  const [activeButton, setActiveButton] = useState("اليوم");
  const [games, setGames] = useState([]);
  const [chartData, setChartData] = useState([]);

  const handleGameSelect = (game) => {
    setSelectedGame(game);
  };

  const [liveUsers, setLiveUsers] = useState(0);
  const [revenues, setRevenues] = useState("0000");
  const [totalUser, setTotalUser] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/dashboard");
        const { live_users, revenues, total_user, games } =
          response?.data?.data || {};
        setLiveUsers(live_users);
        setRevenues(revenues);
        setTotalUser(total_user);
        setGames(games); // تخزين games في الحالة
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <StyledDashboardLayout>
        <Header />

        <StyledStats>
          <Stats
            liveUsers={liveUsers}
            revenues={revenues}
            totalUser={totalUser}
          />
        </StyledStats>
        <BottomSection>
          <StyledCalender
            selectedGame={selectedGame}
            setSelectedGame={setSelectedGame}
            setSelectedGameBorder={setSelectedGameBorder}
            activeButton={activeButton}
            setActiveButton={setActiveButton}
            setChartData={setChartData} // تمرير setChartData كـ prop
          />
          <StyledGamesResults
            games={games}
            onSelectGame={handleGameSelect}
            selectedGame={selectedGameBorder}
            setSelectedGameBorder={setSelectedGameBorder}
            activeButton={activeButton}
            chartData={chartData} // تمرير chartData كـ prop
          />
        </BottomSection>
      </StyledDashboardLayout>
    </>
  );
}

export default DashboardLayout;
