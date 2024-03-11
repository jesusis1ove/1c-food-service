import { TextArea } from "../../components/TextArea";

export default function RenderOptionalInput({ ...props }) {
  return (
    <TextArea
      value={props.note}
      type={"text"}
      placeholder={"Комментарий к заказу"}
      onChange={(e) => props.setNote(e.target.value)}
    />
  );
}
