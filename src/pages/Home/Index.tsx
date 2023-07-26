import { styled } from "styled-components";
import FeedInput from "./FeedInput";
import NewsFeed from "./NewsFeed";

const Container = styled.div`
  width: 100%;
  max-width: 320px;
  display: flex;
  flex-direction: column;
`;

export default function Home() {
  return (
    <Container>
      <FeedInput></FeedInput>
      <NewsFeed></NewsFeed>
    </Container>
  );
}
