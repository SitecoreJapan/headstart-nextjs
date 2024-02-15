import { isEqual } from "lodash";
import { BuyerAddress } from "ordercloud-javascript-sdk";
import {
  ChangeEvent,
  FormEvent,
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { EMPTY_ADDRESS } from "@/ordercloud/redux/ocAddressBook";
import { Button, ButtonGroup, Input } from "@nextui-org/react";

interface OcAddressFormProps {
  id: string;
  onSubmit: (address: BuyerAddress) => void;
  onDelete?: (addressId: string) => void;
  address?: BuyerAddress;
}

const OcAddressForm: FunctionComponent<OcAddressFormProps> = ({
  id,
  onSubmit,
  onDelete,
  address,
}) => {
  const [formValues, setFormValues] = useState(address || EMPTY_ADDRESS);

  useEffect(() => {
    setFormValues(address || EMPTY_ADDRESS);
  }, [address]);

  const handleFormSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      onSubmit(formValues);
    },
    [onSubmit, formValues]
  );

  const handleDeleteAddress = useCallback(() => {
    onDelete(address.ID);
  }, [onDelete, address]);

  const handleInputChange =
    (field: keyof BuyerAddress) => (e: ChangeEvent<HTMLInputElement>) => {
      setFormValues((s) => ({ ...s, [field]: e.target.value }));
    };

  const handleDiscardChanges = useCallback(() => {
    setFormValues(address || EMPTY_ADDRESS);
  }, [address]);

  const hasChanges = useMemo(() => {
    return !isEqual(address, formValues);
  }, [address, formValues]);

  return (
    <div className="m-10">
      <form onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <Input
            type="text"
            id={`${id}_address_addressName`}
            name="address_addressName"
            labelPlacement="outside"
            label="Address Name"
            placeholder="Enter a name for your address"
            value={formValues.AddressName}
            onChange={handleInputChange("AddressName")}
          />
        </div>
        <div className="md:flex mb-3">
          <div className="md:w-1/2 mb-4 md:mb-0 mr-3">
            <Input
              type="text"
              id={`${id}_address_firstName`}
              name="address_firstName"
              labelPlacement="outside"
              label="First Name"
              placeholder="Enter first name"
              value={formValues.FirstName}
              onChange={handleInputChange("FirstName")}
              isRequired
            />
          </div>
          <div className="md:w-1/2">
            <Input
              type="text"
              id={`${id}_address_lastName`}
              name="address_lastName"
              labelPlacement="outside"
              label="Last Name"
              placeholder="Enter last name"
              value={formValues.LastName}
              onChange={handleInputChange("LastName")}
              isRequired
            />
          </div>
        </div>
        <div className="mb-3 mt-3">
          <Input
            type="text"
            id={`${id}_address_companyName`}
            name="address_companyName"
            labelPlacement="outside"
            label="Company Name"
            placeholder="Enter company name"
            value={formValues.CompanyName}
            onChange={handleInputChange("CompanyName")}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-1">
            <Input
              type="text"
              id={`${id}_address_zip`}
              name="address_zip"
              labelPlacement="outside"
              label="Zip"
              placeholder="Enter zip code"
              value={formValues.Zip}
              onChange={handleInputChange("Zip")}
            />
          </div>
          <div className="md:col-span-1">
            <Input
              type="text"
              id={`${id}_address_country`}
              name="address_country"
              labelPlacement="outside"
              label="Country"
              placeholder="Enter two-digit country code"
              value={formValues.Country}
              onChange={handleInputChange("Country")}
            />
          </div>
          <div className="md:col-span-2">
            <Input
              type="text"
              id={`${id}_address_state`}
              name="address_state"
              labelPlacement="outside"
              label="State"
              placeholder="Enter state"
              value={formValues.State}
              onChange={handleInputChange("State")}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-3">
          <div className="md:col-span-1">
            <Input
              type="text"
              id={`${id}_address_city`}
              name="address_city"
              labelPlacement="outside"
              label="City"
              placeholder="Enter city"
              value={formValues.City}
              onChange={handleInputChange("City")}
            />
          </div>
          <div className="md:col-span-3">
            <Input
              type="text"
              id={`${id}_address_street1`}
              name="address_street1"
              labelPlacement="outside"
              label="Street Address"
              placeholder="Enter street address"
              value={formValues.Street1}
              onChange={handleInputChange("Street1")}
            />
          </div>
        </div>

        <div className="mb-3 mt-3">
          <Input
            type="text"
            id={`${id}_address_street2`}
            name="address_street2"
            labelPlacement="outside"
            label="Address Line 2"
            placeholder="Floor, suite, apartment #"
            value={formValues.Street2}
            onChange={handleInputChange("Street2")}
          />
        </div>
        <div className="mb-3">
          <Input
            type="text"
            id={`${id}_address_phone`}
            name="address_phone"
            labelPlacement="outside"
            label="Phone Number"
            placeholder="Enter 10 digit phone number"
            value={formValues.Phone}
            onChange={handleInputChange("Phone")}
          />
        </div>
        <div className="m-10">
          <ButtonGroup>
            <Button
              onClick={handleDeleteAddress}
              disabled={hasChanges || !address.ID}
            >
              Delete Address
            </Button>
            <Button onClick={handleDiscardChanges} disabled={!hasChanges}>
              Discard Changes
            </Button>
            <Button type="submit" disabled={!hasChanges}>
              {address && address.ID ? "Update Address" : "Save Address"}
            </Button>
          </ButtonGroup>
        </div>
      </form>
    </div>
  );
};

export default OcAddressForm;
