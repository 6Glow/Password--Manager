import { useEffect, useRef, useState } from "react";

const Manager = () => {
  const ref = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const showPassword = () => {
    alert("show the password");
    console.log(ref.current.src);
    if (ref.current.src.includes("icons/eyecross.png")) {
      ref.current.src = "icons/eye.png";
    } else {
      ref.current.src = "icons/eyecross.png";
    }
  };

  const savePassword = () => {
    passwordArray.push([...passwordArray, form]);
    localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]))
    console.log([...passwordArray, form]);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

      <div className="mycontainer">
        <h1 className="font-bold text-purple-200 text-2xl text-center">
          PassApp
        </h1>
        <p className="text-gray-400 text-center">
          Keep Your Passwords Safe With Our App
        </p>

        <div className="text-gray-300 flex flex-col p-4 gap-8 justify-center items-center">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter website URL"
            className="rounded-full border border-gray-300 w-full p-4 py-1 bg-gray-800 text-white"
            type="text"
            name="site"
            id=""
          />
          <div className="flex w-full justify-between gap-8">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              className="rounded-full border border-gray-300 w-full p-4 py-1 bg-gray-800 text-white"
              type="text"
              name="username"
              id=""
            />
            <div className="relative">
              <input
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="rounded-full border border-gray-300 w-full p-4 py-1 bg-gray-800 text-white"
                type="text"
                name="password"
                id=""
              />
              <span
                onClick={showPassword}
                className="absolute right-[3px] top-[4px] cursor-pointer"
              >
                <img className="p-1" width={26} src="icons/eye.png" alt="eye" />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="flex justify-center text-white items-center gap-4 bg-purple-600 hover:bg-purple-500 rounded-full px-8 py-2 w-fit border-1 border-purple-700"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Add Password
          </button>
        </div>
      </div>
    </>
  );
};

export default Manager;
