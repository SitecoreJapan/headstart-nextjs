import { FunctionComponent } from "react";
import { useOcSelector } from "@/ordercloud/redux/ocStore";
import Link from "next/link";
import { Button } from "@nextui-org/button";

const Home: FunctionComponent = () => {
  const user = useOcSelector((s) => s.ocUser.user);

  return (
    <main>
      <h1>React Headstart</h1>

      <p>OrderCloud shopping experience built on React</p>
      <Button as={Link} href="/products/">
        Click me
      </Button>

      {user && (
        <pre>
          <code>{JSON.stringify(user, null, 2)}</code>
        </pre>
      )}
    </main>
  );
};

export default Home;
