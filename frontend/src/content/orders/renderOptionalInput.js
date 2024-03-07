import { TextArea } from "../../components/TextArea";

export default function RenderOptionalInput({ ...props }) {
  return (
    <TextArea value={""} type={"text"} placeholder={"Комментарий к заказу"} />
  );
}
