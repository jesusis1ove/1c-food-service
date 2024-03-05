import { Layers } from "../../components/Layers";
import { Split } from "../../components/Split";
import { Pad } from "../../components/Pad";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import styled from "styled-components";
import { MediaWrapper } from "../../components/MediaWrapper";
import { useState } from "react";
import { encode } from "base-64";
import {useNavigate} from "react-router-dom";
import {Title} from "../../components/Title";

export default function Login() {
  const navigate = useNavigate()
  const [authorization, setAuthorization] = useState({
    login: "",
    password: "",
  });
  console.log(localStorage.getItem("token"));
  return (
    <>
      <Title>Вход</Title>
      <Split fraction={"1/3"}>
        <Pad padding={["0", "0.5rem"]}>
          <Layers>
            <Layers gutter={"0.3rem"} centerText={"left"}>
              <label htmlFor={"login"}>Логин</label>
              <Input
                placeholder={"Введите логин"}
                type={"text"}
                id="login"
                value={authorization.login}
                onChange={(e) =>
                  setAuthorization({ ...authorization, login: e.target.value })
                }
              />
            </Layers>
            <Layers gutter={"0.3rem"} centerText={"left"}>
              <label htmlFor={"password"}>Пароль</label>
              <Input
                type={"password"}
                id={"password"}
                value={authorization.password}
                onChange={(e) =>
                  setAuthorization({
                    ...authorization,
                    password: e.target.value,
                  })
                }
                placeholder={"Введите пароль"}
              />
            </Layers>
          </Layers>

          <Pad margin={["1rem"]}>
            <Button
              onClick={() => {
                localStorage.setItem(
                  "token",
                  encode(`${authorization.login}:${authorization.password}`),
                );
                console.log(localStorage.getItem("token"));
                console.log(authorization);
                navigate('/orders')
              }}
              maxWidth={"100%"}
              type={"submit"}
            >
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
