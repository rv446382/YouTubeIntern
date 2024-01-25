
import styled from "styled-components";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import MainRoutes from "./pages/MainRoutes";


// const Main = styled.div`
//   background-color: #202020;
//   width: 100%;
//   overflow: hidden; /* Add this line */
// `;
const Main = styled.div`
  background-color: #202020;
  width: 100%;
  height: 100%;
  overflow: hidden; 
  margin: 0; 
  padding: 0; 
  position:relative;
`;


function App() {
  return (
    <Main>
      <div style={{ position: "sticky", top: "0" }}>
        <Navbar />
      </div>


      <div style={{ display: "flex" }}>
        <Menu />
        <MainRoutes />
      </div>
    </Main>
  );
}

export default App;