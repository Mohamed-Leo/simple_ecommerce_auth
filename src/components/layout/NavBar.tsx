import { Link } from "@tanstack/react-router";
import { UserAvatarMenu } from "../features/UserAvatarMenu";
import { authClient } from "@/lib/auth-client";
import { buttonVariants } from "../ui/button";

const NavBar = () => {
  const { data } = authClient.useSession();

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
  ];

  return (
    <nav className="flex justify-between items-center gap-10">
      <div className="text-3xl font-bold">E-Logo</div>

      <ul className="flex gap-5 text-lg font-medium">
        {navLinks.map((link) => (
          <Link
            to={link.href}
            key={link.href}
            className="relative px-2 py-1 transition-colors duration-300 hover:text-primary/80
              after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 
              after:bg-primary after:transition-all after:duration-300 after:ease-in-out"
            activeProps={{
              className:
                "text-primary font-bold drop-shadow-[0_0_8px_var(--color-primary)] after:w-full after:shadow-[0_0_8px_var(--color-primary)]",
            }}
          >
            {link.label}
          </Link>
        ))}
      </ul>

      {data ? (
        <UserAvatarMenu />
      ) : (
        <Link
          className={`${buttonVariants({ variant: "default" })}`}
          to="/login"
        >
          Login
        </Link>
      )}
    </nav>
  );
};

export default NavBar;
