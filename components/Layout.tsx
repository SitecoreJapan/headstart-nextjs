import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { FunctionComponent } from "react";
import logout from "@/ordercloud/redux/ocAuth/logout";
import { useOcDispatch, useOcSelector } from "@/ordercloud/redux/ocStore";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { CiShoppingCart } from "react-icons/ci";

const Layout: FunctionComponent = ({ children }) => {
  const dispatch = useOcDispatch();

  const { user, isAnonymous, loading, lineItemCount } = useOcSelector((s) => ({
    user: s.ocUser.user,
    loading: s.ocAuth.loading,
    isAnonymous: s.ocAuth.isAnonymous,
    lineItemCount: s.ocCurrentOrder.order
      ? s.ocCurrentOrder.order.LineItemCount
      : 0,
  }));

  return (
    <>
      <Head>
        <title>React Headstart</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <header>
        <Navbar position="static">
          <NavbarBrand>
            <Image
              src="/ordercloud-logo.png"
              width={40}
              height={40}
              alt="OrderCloud Sample"
            />
          </NavbarBrand>
          <NavbarContent className="hidden sm:flex gap-4" justify="center">
            <NavbarItem>
              <Link color="foreground" href="/">
                Home
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link href="/products" aria-current="page">
                Products
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link href="/developer">Developer</Link>
            </NavbarItem>
          </NavbarContent>
          <NavbarContent justify="end">
            <NavbarItem className="hidden lg:flex">
              {isAnonymous ? (
                <Link href="/login">Login</Link>
              ) : (
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => dispatch(logout())}
                >
                  Logout
                </button>
              )}
            </NavbarItem>
            <NavbarItem>
              <Link href="/cart/">
                <CiShoppingCart /> {`${lineItemCount}`}
              </Link>
            </NavbarItem>
          </NavbarContent>
        </Navbar>
        {!isAnonymous && user && (
          <Navbar>
            <NavbarItem>
              <p>Welcome - {`${user.FirstName} ${user.LastName}`}</p>
            </NavbarItem>
          </Navbar>
        )}
      </header>
      <main>{children}</main>
      <footer className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
          <div className="mt-8 md:order-1 md:mt-0">
            <p className="text-center text-xs leading-5 text-gray-500">
              &copy; 2024 Sitecore OrderCloud Sample
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Layout;
