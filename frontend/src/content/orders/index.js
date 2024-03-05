import GeneralComponent from "../../components/GeneralComponent";
import { useFetchNomenclatureQuery } from "../../redux/services/nomenclature";
import { Title } from "../../components/Title";
import { Split } from "../../components/Split";
import {Inline} from "../../components/Inline";

export default function Orders() {
  const { data: nomenclature } = useFetchNomenclatureQuery();
  console.log(nomenclature);
  return (
    <GeneralComponent
      maxWidth={"90%"}
      content={
        <div>
          <Title>Меню </Title>
          <span>на {nomenclature && nomenclature[0]?.date}</span>
          <Split fraction={"1/2"}>
            <div>
              {nomenclature && nomenclature[0]?.content.map((el) => (
                <p>{el.nomenclature?.name}</p>
              ))}
            </div>
            <div>
              {nomenclature && nomenclature[0]?.content.map((el) => (
                <Inline justify={'spaceBetween'}>
                  <p>{el.rate}</p>
                  <p>{el.price}</p>
                  <input value={el.rate} type={"text"} placeholder={"amount"} />
                  <input
                    value={el.price}
                    type={"text"}
                    placeholder={"additionaly"}
                  />
                </Inline>
              ))}
            </div>
          </Split>
        </div>
      }
    />
  );
}
