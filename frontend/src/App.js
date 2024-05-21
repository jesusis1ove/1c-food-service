import "./App.css";
import GeneralComponent from "./components/GeneralComponent";

function App() {
  return (
    <GeneralComponent
      children={<h1>Добро пожаловать в личный кабинет пользователя</h1>}
      maxWidth={"50%"}
    />
  );
}

export default App;
