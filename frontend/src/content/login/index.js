import { Layers } from "../../components/Layers";
import { Split } from "../../components/Split";
import { Pad } from "../../components/Pad";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { MediaWrapper } from "../../components/MediaWrapper";
import { useCallback, useEffect, useRef, useState } from "react";
import { encode } from "base-64";
import { useNavigate } from "react-router-dom";
import { Title } from "../../components/Title";
import { useCreateAccountMutation } from "../../redux/services/user";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../redux/slices/authorizationSlice";

export default function Login() {
  const navigate = useNavigate();
  const userRef = useRef();
  const errorRef = useRef();
  const [authorization, setAuthorization] = useState({
    username: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const dispatch = useDispatch();
  const [createAccount, result] = useCreateAccountMutation();
  console.log(result);
  console.log(result.data?.access);

  // useEffect(() => {
  //   userRef.current.focus();
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await createAccount({
        username: authorization.username,
        password: authorization.password,
      }).unwrap();
      dispatch(setCredentials({ ...userData, authorization }));
      setAuthorization(
        setAuthorization({
          ...authorization,
          username: "",
          password: "",
        }),
      );
      navigate("/orders");
    } catch (error) {
      console.log(error);
      if (!error.originalStatus) {
        setErrorMsg("No Server Response");
      } else if (!error.originalStatus === 400) {
        setErrorMsg("Missing Username or Password");
      } else if (!error.originalStatus === 401) {
        setErrorMsg("Unauthorized");
      } else {
        setErrorMsg("Login Failed");
      }
      errorRef.current?.focus();
    }
  };

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
                value={authorization.username}
                onChange={(e) =>
                  setAuthorization({
                    ...authorization,
                    username: e.target.value,
                  })
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
            <Button onClick={handleSubmit} maxWidth={"100%"} type={"submit"}>
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
