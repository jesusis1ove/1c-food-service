import GeneralComponent from "../../components/GeneralComponent";
import { Title } from "../../components/Title";
import { Split } from "../../components/Split";
import { Inline } from "../../components/Inline";
import { useState } from "react";
import RenderAmountInput from "./renderAmountInput";
import RenderOptionalInput from "./renderOptionalInput";
import { useFetchMenuQuery } from "../../redux/services/menu";
import { Button } from "../../components/Button";
import {
  useCreateOrderMutation,
  useFetchOrdersQuery,
} from "../../redux/services/orders";
import { Input } from "../../components/Input";
import { Pad } from "../../components/Pad";
import { useSelector } from "react-redux";
import {
  selectCurrentToken,
  selectCurrentUser,
} from "../../redux/slices/authorizationSlice";
import { useNavigate } from "react-router-dom";

export default function Menu() {
  const [date, setDate] = useState(new Date().toJSON().slice(0, 10));
  const navigation = useNavigate();
  const [infoObject, setInfoObject] = useState({ menu_content: 0, amount: 0 });
  const { data: menu, isLoading } = useFetchMenuQuery({ date });
  const [createOrder, result] = useCreateOrderMutation();
  const [order, setOrder] = useState([]);
  const [note, setNote] = useState("");
  console.log(result)
  const handleCreateOrder = async (e) => {
    e.preventDefault();
    try {
      await createOrder({
        content: order,
        // menu: menu?.results[0]?.id,
        note,
      });
      // navigation("/orders");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <GeneralComponent
      maxWidth={"90%"}
      children={
        <div>
          <Title>
            Меню на
            <Input
              type={"date"}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Title>

          <Split fraction={"1/3"}>
            <Inline justify={"spaceAround"}>
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
              {menu?.results[0]?.content?.map((el) => (
                <Inline justify={"spaceAround"} id={el.id}>
                  {/*<Input type={"checkbox"} />*/}
                  {/*<p>{el.nomenclature?.map((el) => el.name)}</p>*/}
                  {el.nomenclature?.map((item) => (
                    <p>
                      {item.name}
                      {/*<br />*/}
                    </p>
                  ))}
                </Inline>
              ))}
            </div>
            <div>
              {menu?.results[0]?.content?.map((el, index) => (
                <Inline justify={"spaceBetween"} id={el.id}>
                  <p>{el.rate}</p>
                  <p>{el.price}бел.р.</p>
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
            <RenderOptionalInput setNote={setNote} note={note} />
          </Pad>
          <Inline>
            <Button
              disabled={!order?.length}
              onClick={handleCreateOrder}
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
