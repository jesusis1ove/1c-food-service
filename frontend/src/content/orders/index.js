import { useFetchOrdersQuery } from "../../redux/services/orders";

export default function Orders() {
  const { data: orders } = useFetchOrdersQuery();
  console.log(orders);
  return <div>Ваш заказ</div>;
}
