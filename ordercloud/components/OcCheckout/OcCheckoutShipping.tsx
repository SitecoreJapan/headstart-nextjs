import { BuyerAddress } from "ordercloud-javascript-sdk";
import { FunctionComponent, useMemo } from "react";
import { saveShippingAddress } from "@/ordercloud/redux/ocCurrentOrder";
import { useOcDispatch, useOcSelector } from "@/ordercloud/redux/ocStore";
import OcAddressBook from "../OcAddressBook";
import OcAddressForm from "../OcAddressForm";
import OcShipEstimates from "./OcShipEstimates";
import { OcCheckoutStepProps } from "./index";
import { Button, ButtonGroup } from "@nextui-org/react";
import { MdNavigateNext } from "react-icons/md";

const OcCheckoutShipping: FunctionComponent<OcCheckoutStepProps> = ({
  onNext,
  onPrev,
}) => {
  const dispatch = useOcDispatch();

  const { initialized, order, lineItems, user } = useOcSelector((s) => ({
    initialized: s.ocCurrentOrder.initialized,
    order: s.ocCurrentOrder.order,
    lineItems: s.ocCurrentOrder.lineItems,
    user: s.ocUser.user,
  }));

  const handleSetShippingAddress = (address: Partial<BuyerAddress>) => {
    console.log("address", address);
    dispatch(saveShippingAddress(address));
  };

  const currentShippingAddress = useMemo(() => {
    if (initialized && lineItems && lineItems.length) {
      return lineItems[0].ShippingAddress;
    }
    return {};
  }, [initialized, lineItems]);

  const showAddressBook = useMemo(() => {
    return (
      user &&
      user.AvailableRoles &&
      user.AvailableRoles.includes("MeAddressAdmin")
    );
  }, [user]);

  return initialized && order ? (
    <div>
      <h2 className="m-10 text-2xl">Shipping</h2>
      {showAddressBook ? (
        <OcAddressBook
          id="shipping"
          listOptions={{ pageSize: 100 }}
          selected={order.ShippingAddressID}
          onChange={handleSetShippingAddress}
        />
      ) : (
        <OcAddressForm
          id="shipping"
          address={currentShippingAddress}
          onSubmit={handleSetShippingAddress}
        />
      )}
      <OcShipEstimates />

      <hr />
      <div className="m-10">
        <ButtonGroup>
          <Button color="primary">Shipping</Button>
          <Button endContent={<MdNavigateNext />} onClick={onNext}>
            Billing
          </Button>
          <Button isDisabled>Payment</Button>
          <Button isDisabled>Review</Button>
          <Button isDisabled>Submit Order</Button>
        </ButtonGroup>
      </div>
    </div>
  ) : null;
};

export default OcCheckoutShipping;
