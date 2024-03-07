import { useCallback, useState } from "react";
import { Inline } from "../../components/Inline";

export default function RenderAmountInput({ ...props }) {
  const [testId, setTestId] = useState(0);
  const [amount, setAmount] = useState(1);

  const handleMinus = useCallback(() => {
    setAmount((prevState) => prevState - 1);
    +props.el?.id === +testId &&
      props.setInfoObject((prevState) => ({
        ...prevState,
        amount,
      }));
    props.setOrder((prevState) =>
      prevState.map((el) =>
        el.menu_content === props.el.id
          ? {
              ...el,
              amount,
            }
          : el,
      ),
    );
  }, [amount, props, testId]);

  const handlePlus = useCallback(() => {
    setAmount((prevState) => prevState + 1);
    +props.el?.id === +testId &&
      props.setInfoObject((prevState) => ({
        ...prevState,
        amount: amount,
      }));
    props.setOrder((prevState) =>
      prevState.map((el) =>
        el.menu_content === props.el.id
          ? {
              ...el,
              amount: amount,
            }
          : el,
      ),
    );
  }, [amount, props, testId]);

  const handleAddElement = useCallback(() => {
    setTestId(props.el.id);
    props.setInfoObject({
      menu_content: props.el.id,
    });
    props.setOrder((prevState) => [
      ...new Set([...prevState, { menu_content: props.el.id }]),
    ]);
  }, [props]);

  return (
    <>
      {testId === props.el.id ? (
        <Inline>
          <button id={props.el?.id} onClick={() => handleMinus()}>
            -
          </button>
          <p>
            {props.order.map((el) =>
              el.menu_content === props.el.id
                ? el.amount?.toString().replace(/[\s.,%]/g, 5)
                : "",
            )}
          </p>
          <button id={props.el?.id} onClick={() => handlePlus()}>
            +
          </button>
        </Inline>
      ) : (
        <button id={props.el.id} onClick={() => handleAddElement()}>
          Добавить
        </button>
      )}
    </>
  );
}
