import { ModeToggle } from "./ModeToggle";

const Navbar = () => {
  return (
    <header className="flex items-center justify-center w-full sm:px-0 md:px-2 px-3 py-4 border-b border-primary shadow-md shadow-primary">
      <nav className="container">
        <section className="flex w-full justify-between items-center">
          <h1 className=" font-bold text-primary">Table Filter</h1>
          <ModeToggle />
        </section>
      </nav>
    </header>
  );
};

export default Navbar;
