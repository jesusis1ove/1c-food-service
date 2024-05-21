import { ContentArea } from "../ContentArea";
import { Center } from "../Center";
import { ContentPage } from "../../content/login/styled";

export default function GeneralComponent({ children, maxWidth }) {
  return (
    <ContentArea>
      <Center maxWidth={maxWidth}>
        <ContentPage>{children}</ContentPage>
      </Center>
    </ContentArea>
  );
}
