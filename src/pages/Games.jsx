import styled from "styled-components";
import AddGames from "../features/games/AddGames";
import Header from "../ui/Header";

const Container = styled.div``;
const StyledContent = styled.div`
  text-align: center;
`;
function Bookings() {
  return (
    <Container>
      <StyledContent>
        <Header/>
        <AddGames />
      </StyledContent>
    </Container>
  );
}

export default Bookings;
