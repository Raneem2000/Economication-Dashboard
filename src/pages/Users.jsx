import { useState } from "react";
import UserTable from "../features/userprofile/UserTable";
import Heading from "../ui/Heading";
import Header from "../ui/Header";
import styled from "styled-components";

const Container = styled.div``;
const StyledContent = styled.div`
  text-align: center;
`;
function NewUsers() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  return (
    <Container>
      <StyledContent>
        <Header onSearch={handleSearch} />
        <Heading as="h1">
          <UserTable searchQuery={searchQuery} />
        </Heading>
      </StyledContent>
    </Container>
  );
}

export default NewUsers;
