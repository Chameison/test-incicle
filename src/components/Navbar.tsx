import logo from "../assets/logo.png";
const Navbar = () => {
  return (
    <nav className="bg-white h-[55px] flex items-center px-10">
      <div>
        <img src={logo} />
      </div>
    </nav>
  );
};

export default Navbar;
