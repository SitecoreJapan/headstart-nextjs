import { FunctionComponent } from "react";
import { useOcSelector } from "@/ordercloud/redux/ocStore";
import Link from "next/link";

const Home: FunctionComponent = () => {
  const user = useOcSelector((s) => s.ocUser.user);

  return (
    <main>
      <div className="m-10">
        <h1 className="text-2xl">React Headstart</h1>

        <p>OrderCloud shopping experience built on React</p>

        {user && (
          <pre>
            <code>{JSON.stringify(user, null, 2)}</code>
          </pre>
        )}
      </div>
    </main>
  );
};

export default Home;
