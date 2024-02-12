import BarMenu from "../BarMenu";
import { ContentArea } from "../ContentArea";
import { Center } from "../Center";
import { ContentPage } from "../../content/login/styled";

export default function GeneralComponent({ content, maxWidth}) {
  return (
    <div className="App">
      <BarMenu />
      <ContentArea>
        <Center maxWidth={maxWidth}>
          <ContentPage>{content}</ContentPage>
        </Center>
      </ContentArea>
    </div>
  );
}
