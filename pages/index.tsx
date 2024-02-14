import { FunctionComponent } from "react";
import { useOcSelector } from "@/ordercloud/redux/ocStore";
import { Button } from "@nextui-org/button";

const Home: FunctionComponent = () => {
  const user = useOcSelector((s) => s.ocUser.user);

  return (
    <div>
      <main>
        <h1>React Headstart</h1>

        <p>OrderCloud shopping experience built on React</p>
        <div>
          <Button>Click me</Button>
        </div>

        {user && (
          <pre>
            <code>{JSON.stringify(user, null, 2)}</code>
          </pre>
        )}
      </main>
    </div>
  );
};

export default Home;
