import {
  ChangeEvent,
  FormEvent,
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";
import login from "@/ordercloud/redux/ocAuth/login";
import { useOcDispatch, useOcSelector } from "@/ordercloud/redux/ocStore";
import { Input } from "@nextui-org/input";
import { Checkbox } from "@nextui-org/checkbox";
import { Button } from "@nextui-org/button";

interface OcLoginFormProps {
  title?: string;
  onLoggedIn: () => void;
}

const OcLoginForm: FunctionComponent<OcLoginFormProps> = ({
  title = "Sign into your account",
  onLoggedIn,
}) => {
  const dispatch = useOcDispatch();

  const { loading, error, isAnonymous } = useOcSelector((s) => ({
    isAnonymous: s.ocAuth.isAnonymous,
    error: s.ocAuth.error,
    loading: s.ocAuth.loading,
  }));

  const [formValues, setFormValues] = useState({
    identifier: "",
    password: "",
    remember: false,
  });

  const handleInputChange =
    (fieldKey: string) => (e: ChangeEvent<HTMLInputElement>) => {
      setFormValues((v) => ({ ...v, [fieldKey]: e.target.value }));
    };

  const handleCheckboxChange =
    (fieldKey: string) => (e: ChangeEvent<HTMLInputElement>) => {
      setFormValues((v) => ({ ...v, [fieldKey]: !!e.target.checked }));
    };

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      dispatch(
        login({
          username: formValues.identifier,
          password: formValues.password,
          remember: formValues.remember,
        })
      );
    },
    [formValues, dispatch]
  );

  useEffect(() => {
    if (!isAnonymous) {
      onLoggedIn();
    }
  }, [isAnonymous, onLoggedIn]);

  return (
    <div className="m-10">
      <form name="ocLoginForm" onSubmit={handleSubmit}>
        <h1 className="text-2xl">{title}</h1>
        {error && <p>{error.message}</p>}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-5">
          <div className="md:col-start-2 md:col-span-2">
            <Input
              type="text"
              id="identifier"
              name="identifier"
              labelPlacement="outside"
              label="Username"
              placeholder="Enter username"
              value={formValues.identifier}
              onChange={handleInputChange("identifier")}
              isRequired
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-5">
          <div className="md:col-start-2 md:col-span-2">
            <Input
              type="password"
              id="password"
              name="password"
              labelPlacement="outside"
              label="Password"
              placeholder="Enter password"
              value={formValues.password}
              onChange={handleInputChange("password")}
              isRequired
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-5">
          <div className="md:col-start-2 md:col-span-2">
            <Checkbox
              id="remember"
              name="remember"
              checked={formValues.remember}
              onChange={handleCheckboxChange("remember")}
            >
              Keep me logged in
            </Checkbox>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-start-2 md:col-span-2 flex justify-center items-center">
            <Button color="primary" disabled={loading} type="submit">
              Submit
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default OcLoginForm;
