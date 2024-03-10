import styled from "styled-components";
import Map from "../../components/map/Map";

const HomePageContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const HomePage = () => {
  return (
    <HomePageContainer>
      <Map />
    </HomePageContainer>
  );
};

export default HomePage;
