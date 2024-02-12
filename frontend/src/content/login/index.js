import { Layers } from "../../components/Layers";
import { Split } from "../../components/Split";
import { Pad } from "../../components/Pad";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import styled from "styled-components";
import { MediaWrapper } from "../../components/MediaWrapper";

const Title = styled.h2`
  color: #015f9c;
`;
export default function Login() {
  return (
    <>
      <Title>Вход</Title>
      <Split fraction={"1/3"}>
        <Pad padding={["0", "0.5rem"]}>
          <Layers>
            <Layers gutter={"0.3rem"} centerText={"left"}>
              <label htmlFor={"login"}>Логин</label>
              <Input placeholder={"Введите логин"} type={"text"} id="login" />
            </Layers>
            <Layers gutter={"0.3rem"} centerText={"left"}>
              <label htmlFor={"password"}>Пароль</label>
              <Input
                type={"password"}
                id={"password"}
                placeholder={"Введите пароль"}
              />
            </Layers>
          </Layers>

          <Pad margin={["1rem"]}>
            <Button maxWidth={"100%"} type={"submit"}>
              Войти
            </Button>
          </Pad>
        </Pad>

        {/*<Center maxWidth={"100%"}>*/}
        <MediaWrapper ratio={["1", "1"]}>
          <img
            src={require("../../assets/login_1.png")}
            alt={"login"}
            // style={{ width: "100%" }}
          />
        </MediaWrapper>

        {/*</Center>*/}
      </Split>
    </>
  );
}
