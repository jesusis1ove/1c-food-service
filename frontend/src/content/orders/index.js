import GeneralComponent from "../../components/GeneralComponent";
import { Title } from "../../components/Title";
import { Split } from "../../components/Split";
import { Inline } from "../../components/Inline";
import { useState } from "react";
import RenderAmountInput from "./renderAmountInput";
import RenderOptionalInput from "./renderOptionalInput";
import { useFetchMenuQuery } from "../../redux/services/menu";
import { Button } from "../../components/Button";
import { useCreateOrderMutation } from "../../redux/services/orders";
import { Input } from "../../components/Input";
import { Pad } from "../../components/Pad";
import { useSelector } from "react-redux";
import {
  selectCurrentToken,
  selectCurrentUser,
} from "../../redux/slices/authorizationSlice";

export default function Orders() {
  const [date, setDate] = useState(new Date().toJSON().slice(0, 10));
  const [infoObject, setInfoObject] = useState({ menu_content: 0, amount: 0 });
  const { data: menu } = useFetchMenuQuery({ date });
  const [createOrder, { isSuccess, error }] = useCreateOrderMutation();
  const [order, setOrder] = useState([]);
  console.log(infoObject);
  console.log(order);

  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);
  console.log(user);
  console.log(token);
  return (
    <GeneralComponent
      maxWidth={"90%"}
      content={
        <div>
          <Title>
            Меню на{" "}
            <Input
              type={"date"}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Title>

          <Split fraction={"1/3"}>
            <Inline justify={"spaceAround"}>
              {/*<p>№</p>*/}
              <p>Наименование</p>
            </Inline>

            <Inline justify={"spaceBetween"}>
              <p>Грамм</p>
              <p>Цена</p>
              <p>Количество</p>
            </Inline>
          </Split>
          <Split fraction={"1/3"}>
            <div>
              {menu &&
                menu[0]?.content?.map((el) => (
                  <Inline justify={"spaceAround"} id={el.id}>
                    {/*<Input type={"checkbox"} />*/}
                    <p>{el.nomenclature?.name}</p>
                  </Inline>
                ))}
            </div>
            <div>
              {menu &&
                menu[0]?.content?.map((el, index) => (
                  <Inline justify={"spaceBetween"} id={el.id}>
                    <p>{el.rate}</p>
                    <p>{el.price}р.</p>
                    <RenderAmountInput
                      el={el}
                      index={index}
                      setInfoObject={setInfoObject}
                      infoObject={infoObject}
                      setOrder={setOrder}
                      order={order}
                    />
                  </Inline>
                ))}
            </div>
          </Split>
          <Pad margin={["0.5rem", 0]}>
            <RenderOptionalInput />
          </Pad>
          <Inline>
            <Button
              onClick={() =>
                createOrder({
                  content: order,
                })
              }
              type={"submit"}
            >
              Оформить заказ
            </Button>
          </Inline>
        </div>
      }
    />
  );
}
