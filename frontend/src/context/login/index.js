import { Center } from "../../components/Center";
import { ContentArea } from "../../components/ContentArea";
import { LoginPage } from "./styled";
import { Layers } from "../../components/Layers";
import { Split } from "../../components/Split";
import { Pad } from "../../components/Pad";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

export default function Login() {
  return (
    <ContentArea>
      <Center maxWidth={"50%"}>
        <LoginPage>
          <h2>Регистрация</h2>

          <Split fraction={"1/3"}>
            <div>
              <Layers>
                <Layers gutter={"0.3rem"} centerText={"left"}>
                  <label htmlFor={"login"}>Логин</label>
                  <Input
                    placeholder={"Введите логин"}
                    type={"text"}
                    id="login"
                  />
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
            </div>

            <Pad>
              <img
                src={require("../../assets/login_1.png")}
                alt={"login"}
                style={{ width: "100%" }}
              />
            </Pad>
          </Split>
        </LoginPage>
      </Center>
    </ContentArea>
  );
}
