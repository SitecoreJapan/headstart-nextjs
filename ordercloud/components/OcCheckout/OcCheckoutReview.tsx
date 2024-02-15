import { FunctionComponent, useCallback } from "react";
import { OcCheckoutStepProps } from ".";
import {
  OcCurrentOrderState,
  submitOrder,
} from "@/ordercloud/redux/ocCurrentOrder";
import { useOcDispatch } from "@/ordercloud/redux/ocStore";
import OcLineItemList from "../OcLineItemList";
import OcCheckoutSummary from "./OcCheckoutSummary";
import { Button, ButtonGroup } from "@nextui-org/button";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";

interface OcCheckoutReviewProps extends OcCheckoutStepProps {
  onOrderSubmitted: (orderId: string) => void;
}

const OcCheckoutReview: FunctionComponent<OcCheckoutReviewProps> = ({
  onPrev,
  onOrderSubmitted,
}) => {
  const dispatch = useOcDispatch();
  const handleSubmitOrder = useCallback(async () => {
    await dispatch(submitOrder(onOrderSubmitted));
  }, [dispatch, onOrderSubmitted]);

  return (
    <div>
      <h2 className="m-10 text-2xl">Review Order</h2>
      <div className="m-10">
        <OcLineItemList />
        <OcCheckoutSummary />
      </div>
      <div className="m-10">
        <ButtonGroup>
          <Button>Shipping</Button>
          <Button>Billing</Button>
          <Button onClick={onPrev} startContent={<MdNavigateBefore />}>
            Payment
          </Button>
          <Button color="primary">Review</Button>
          <Button onClick={handleSubmitOrder} endContent={<MdNavigateNext />}>
            Submit Order
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default OcCheckoutReview;
