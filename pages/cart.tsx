import Link from "next/link";
import { FunctionComponent } from "react";
import OcLineItemList from "@/ordercloud/components/OcLineItemList";
import { deleteCurrentOrder } from "@/ordercloud/redux/ocCurrentOrder";
import { useOcDispatch } from "@/ordercloud/redux/ocStore";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { Button } from "@nextui-org/button";
import Script from "next/script";
import { IoBagCheckOutline } from "react-icons/io5";

const CartPage: FunctionComponent = () => {
  const dispatch = useOcDispatch();

  return (
    <div>
      <div className="flex justify-between m-5">
        <Button
          className="ml-auto"
          color="danger"
          onPress={() => dispatch(deleteCurrentOrder())}
          endContent={<MdOutlineRemoveShoppingCart />}
        >
          Clear Cart
        </Button>
      </div>
      <div className="flex justify-between m-5">
        <OcLineItemList emptyMessage="Your shopping cart is empty" editable />
      </div>
      <div className="flex justify-between m-5">
        <Button
          className="ml-auto"
          color="success"
          as={Link}
          endContent={<IoBagCheckOutline />}
          href="/checkout/"
        >
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default CartPage;
