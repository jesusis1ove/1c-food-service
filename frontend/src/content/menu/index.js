import React, { useRef } from "react";
import GeneralComponent from "../../components/GeneralComponent";
import { Title } from "../../components/Title";
import { Inline } from "../../components/Inline";
import { useState } from "react";
import RenderAmountInput from "./renderAmountInput";
import RenderOptionalInput from "./renderOptionalInput";
import { useFetchMenuQuery } from "../../redux/services/menu";
import { Button } from "../../components/Button";
import { useCreateOrderMutation } from "../../redux/services/orders";
import { Input } from "../../components/Input";
import { Pad } from "../../components/Pad";
import { Column, ColumnsWrapper } from "../../components/ColumnsWrapper";

export default function Menu() {
  const errorRef = useRef();
  const [date, setDate] = useState(new Date().toJSON().slice(0, 10));
  const [infoObject, setInfoObject] = useState({ menu_content: 0, amount: 0 });
  const { data: menu, isFetching } = useFetchMenuQuery({ date });
  const [createOrder, result] = useCreateOrderMutation();
  const [order, setOrder] = useState([]);
  const [note, setNote] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  console.log(result);
  const handleCreateOrder = async (e) => {
    e.preventDefault();
    try {
      await createOrder({
        content: order,
        menu: menu?.results[0]?.id,
        note,
      }).unwrap();
      // navigation("/orders");
    } catch (error) {
      console.log(error);
      if (!error.status) {
        setErrorMsg("No Server Response");
      } else {
        setErrorMsg("Info Failed");
      }
      errorRef.current?.focus();
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
          <h3 ref={errorRef}>{errorMsg}</h3>
          {isFetching ? (
            <p>Loading...</p>
          ) : (
            <React.Fragment>
              <ColumnsWrapper columns={4}>
                <Column>Наименование</Column>
                <Column>Грамм</Column>
                <Column>Цена</Column>
                <Column>Количество</Column>
              </ColumnsWrapper>

              <ColumnsWrapper columns={4}>
                {menu?.results[0]?.content?.map((el, index) => (
                  <>
                    <Column>
                      {el.nomenclature?.map((item) => (
                        <p>{item.name}</p>
                      ))}
                    </Column>
                    <Column>
                      {el.nomenclature?.map((item) => (
                        <p>{item.rate}</p>
                      ))}
                    </Column>
                    <Column>
                      <p>{el.price}бел.р.</p>
                    </Column>
                    <Column>
                      <RenderAmountInput
                        el={el}
                        index={index}
                        setInfoObject={setInfoObject}
                        infoObject={infoObject}
                        setOrder={setOrder}
                        order={order}
                      />
                    </Column>
                  </>
                ))}
              </ColumnsWrapper>
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
            </React.Fragment>
          )}
        </div>
      }
    />
  );
}
