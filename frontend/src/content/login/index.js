import { Layers } from "../../components/Layers";
import { Split } from "../../components/Split";
import { Pad } from "../../components/Pad";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { MediaWrapper } from "../../components/MediaWrapper";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Title } from "../../components/Title";
import { useCreateAccountMutation } from "../../redux/services/user";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../redux/slices/authorizationSlice";
import { useLoginMutation } from "../../redux/services/test";
import GeneralComponent from "../../components/GeneralComponent";

export default function Login() {
  const navigate = useNavigate();
  const errorRef = useRef();
  const [authorization, setAuthorization] = useState({
    username: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const dispatch = useDispatch();
  const [createAccount, result] = useCreateAccountMutation();
  // console.log(result);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await createAccount({
        username: authorization.username,
        password: authorization.password,
      }).unwrap();
      dispatch(setCredentials({ ...userData, authorization }));
      setAuthorization({
        ...authorization,
        username: "",
        password: "",
      });
      navigate("/menu");
    } catch (error) {
      console.log(error);
      if (!error.originalStatus) {
        setErrorMsg("No Server Response");
      } else if (!error.originalStatus === "400") {
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
    <GeneralComponent
      maxWidth={"90%"}
      children={
        <>

          <Title>Вход</Title>
          <p ref={errorRef}>{errorMsg}</p>
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
                <Button
                  onClick={handleSubmit}
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
          {result?.isLoading && <p>Loading...</p>}
        </>
      }
    />
  );
}
