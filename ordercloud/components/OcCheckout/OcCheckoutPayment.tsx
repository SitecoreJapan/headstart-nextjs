import { Payment } from "ordercloud-javascript-sdk";
import {
  ChangeEvent,
  FormEvent,
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { OcCheckoutStepProps } from ".";
import useOcCurrentOrder from "@/ordercloud/hooks/useOcCurrentOrder";
import { addPayment, removePayment } from "@/ordercloud/redux/ocCurrentOrder";
import { useOcDispatch } from "@/ordercloud/redux/ocStore";
import formatPrice from "@/ordercloud/utils/formatPrice";
import { Button, ButtonGroup } from "@nextui-org/button";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";

const OcCheckoutPayment: FunctionComponent<OcCheckoutStepProps> = ({
  onNext,
  onPrev,
}) => {
  const dispatch = useOcDispatch();
  const { order, payments } = useOcCurrentOrder();

  const amountDue = useMemo(() => {
    if (!order) return 0;
    if (!payments || (payments && !payments.length)) return order.Total;
    return (
      order.Total - payments.map((p) => p.Amount).reduceRight((p, c) => p + c)
    );
  }, [order, payments]);

  const [pendingPayment, setPendingPayment] = useState(amountDue);

  const handleAddPayment = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      dispatch(addPayment({ Type: "PurchaseOrder", Amount: pendingPayment }));
    },
    [dispatch, pendingPayment]
  );

  const handleRemovePayment = useCallback(
    (paymentId: string) => () => {
      dispatch(removePayment(paymentId));
    },
    [dispatch]
  );

  useEffect(() => {
    setPendingPayment(amountDue);
  }, [amountDue]);

  const handlePendingPaymentChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPendingPayment(Number(e.target.value));
  };

  return (
    <div>
      <h2 className="m-10 text-2xl">Payment</h2>
      <p className="m-10">{`Amount Due ${formatPrice(amountDue)}`}</p>
      {payments &&
        payments.map((p) => (
          <div key={p.ID}>
            <div className="m-10">
              <p>
                {p.Type}
                <b>{` ${formatPrice(p.Amount)}`}</b>
              </p>
              <button type="button" onClick={handleRemovePayment(p.ID)}>
                Remove Payment
              </button>
            </div>
          </div>
        ))}
      <div className="m-10">
        <form id="checkout_payment" onSubmit={handleAddPayment}>
          <label htmlFor="checkout_pending_payment">
            Payment Amount :{" "}
            <input
              id="checkout_pending_payment"
              type="number"
              max={amountDue}
              min="1"
              value={pendingPayment}
              step="0.01"
              onChange={handlePendingPaymentChange}
            />
          </label>
          <br />
          <button type="submit" disabled={!amountDue}>
            Add Payment
          </button>
        </form>
      </div>
      <hr />
      <div className="m-10">
        <ButtonGroup>
          <Button>Shipping</Button>
          <Button onClick={onPrev} startContent={<MdNavigateBefore />}>
            Billing
          </Button>
          <Button color="primary">Payment</Button>
          <Button
            endContent={<MdNavigateNext />}
            onClick={onNext}
            disabled={!!amountDue}
          >
            Review
          </Button>
          <Button isDisabled>Submit Order</Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default OcCheckoutPayment;
