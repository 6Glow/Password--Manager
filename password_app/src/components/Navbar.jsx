const Navbar = () => {
  return (
    <nav className="bg-gradient-to-b from-purple-900 via-indigo-900 to-black ">
      <div className="mycontainer flex justify-between items-center px-4 py-5 h-16">
        <div className="logo text-2xl  font-bold text-purple-200">
          PassApp
        </div>

        <ul>
          <li className="flex gap-4">
            <a className="hover:text-purple-300 text-xl text-purple-200" href="/">
              Home
            </a>
            <a className="hover:text-purple-300 text-xl text-purple-200" href="#">
              About
            </a>
            <a className="hover:text-purple-300 text-xl text-purple-200" href="#">
              Contract
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
