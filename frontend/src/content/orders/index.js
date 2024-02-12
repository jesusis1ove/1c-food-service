import GeneralComponent from "../../components/GeneralComponent";

export default function Orders() {
  return (
    <GeneralComponent maxWidth={'90%'}
      content={
        <div>
          <h1>Меню </h1>
          <span>на 02.02.2023</span>
          <div>
            <div>left-hand side список пунктов</div>
            <div>
              right-hand side
              <input type={"text"} placeholder={"amount"} />
              <input type={"text"} placeholder={"additionaly"} />
            </div>
          </div>
        </div>
      }
    />
  );
}
