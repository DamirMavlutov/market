import { useSelector } from "react-redux";
import Purchases from "./ Purchases";
const ShoppingCard = () => {
  const items = useSelector((state) => {
    const { shopingCardReduser } = state;
    return shopingCardReduser.items;
  });

  const dublePosition = [];
  for (let i = 0; i < items.length; i++) {
    let found = false;
    for (let j = 0; j < dublePosition.length; j++) {
      if (dublePosition[j].value === items[i]) {
        dublePosition[j].quantity++;
        found = true;
        break;
      }
    }
    if (!found) {
      dublePosition.push({ value: items[i], quantity: 1 });
    }
  } //создаем массив с карточками с новым параметром quantity, который указывает колво этих карточек

  console.log("Added cards>>>", dublePosition);

  const totalPrice = items
    .map((p) => +p.price)
    .reduce((partialSum, a) => partialSum + a, 0);

  return (
    <>
      <div className="container-fluid pt-5">
        <div className="row px-xl-5">
          <div className="col-lg-8 table-responsive mb-5">
            <table className="table table-bordered text-center mb-0">
              <thead className="bg-secondary text-dark">
                <tr>
                  <th>Products</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody className="align-middle">
                {dublePosition.map((group) => (
                  <Purchases
                    key={group.value.id}
                    item={group.value}
                    quantity={group.quantity}
                  />
                ))}
              </tbody>
            </table>
          </div>
          <div className="col-lg-4">
            <form
              className="mb-5"
              action=""
            >
              <div className="input-group">
                <input
                  type="text"
                  className="form-control p-4"
                  placeholder="Coupon Code"
                />
                <div className="input-group-append">
                  <button className="btn btn-primary">Apply Coupon</button>
                </div>
              </div>
            </form>
            <div className="card border-secondary mb-5">
              <div className="card-header bg-secondary border-0">
                <h4 className="font-weight-semi-bold m-0">Cart Summary</h4>
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-between mb-3 pt-1">
                  <h6 className="font-weight-medium">Subtotal</h6>
                  <h6 className="font-weight-medium">$150</h6>
                </div>
                <div className="d-flex justify-content-between">
                  <h6 className="font-weight-medium">Shipping</h6>
                  <h6 className="font-weight-medium">$10</h6>
                </div>
              </div>
              <div className="card-footer border-secondary bg-transparent">
                <div className="d-flex justify-content-between mt-2">
                  <h5 className="font-weight-bold">Total</h5>
                  <h5 className="font-weight-bold">${totalPrice}</h5>
                </div>
                <button className="btn btn-block btn-primary my-3 py-3">
                  Proceed To Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShoppingCard;
