import { BuyerProduct } from "ordercloud-javascript-sdk";
import { FunctionComponent } from "react";

interface OcProductCardProps {
  product: BuyerProduct;
}

const OcProductCard: FunctionComponent<OcProductCardProps> = ({ product }) => {
  return (
    <div className="px-6 py-4">
      <p>
        <b>{product.Name}</b>
      </p>
      <p>{product.Description}</p>
    </div>
  );
};

export default OcProductCard;
