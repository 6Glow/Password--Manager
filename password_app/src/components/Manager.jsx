import { useEffect,  useState } from "react";

const Manager = () => {
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);
  const [showPassword, setShowPassword] = useState(false); // New state for password visibility management

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const savePassword = () => {
    const updatedPasswordArray = [...passwordArray, form];
    setPasswordArray(updatedPasswordArray); // Status update
    localStorage.setItem("passwords", JSON.stringify(updatedPasswordArray));
    setForm({ site: "", username: "", password: "" }); // Clearing the form after saving
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

      <div className="mycontainer">
        <h1 className="font-bold text-purple-200 text-2xl text-center">PassApp</h1>
        <p className="text-gray-400 text-center">Keep Your Passwords Safe With Our App</p>

        <div className="text-gray-300 flex flex-col p-4 gap-8 justify-center items-center">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter website URL"
            className="rounded-full border border-gray-300 w-full p-4 py-1 bg-gray-800 text-white"
            type="url"
            name="site"
          />
          <div className="flex w-full justify-between gap-8">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              className="rounded-full border border-gray-300 w-full p-4 py-1 bg-gray-800 text-white"
              type="text"
              name="username"
            />
            <div className="relative">
              <input
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="rounded-full border border-gray-300 w-full p-4 py-1 bg-gray-800 text-white"
                type={showPassword ? "text" : "password"} // Change input type depending on the state
                name="password"
              />

              <span className="absolute right-[3px] top-[4px] cursor-pointer" onClick={togglePasswordVisibility}>
                <img
                  className="p-1"
                  width={26}
                  src={showPassword ? "icons/eyecross.png" : "icons/eye.png"} // Change the icon depending on the state
                  alt="eye"
                />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="flex justify-center text-white items-center gap-4 bg-purple-600 hover:bg-purple-500 rounded-full px-8 py-2 w-fit border-1 border-purple-700"
          >
            <lord-icon src="https://cdn.lordicon.com/jgnvfzqg.json" trigger="hover"></lord-icon>
            Add Password
          </button>
        </div>

        <div className="passwords">
          <h2 className="font-bold text-2xl py-4 text-gray-400">Your Passwords:</h2>
          {passwordArray.length === 0 && <div className="text-gray-600">No passwords to show</div>}
          {passwordArray.length !== 0 && (
            <table className="min-w-full divide-y divide-purple-200 bg-purple-900 text-white">
              <thead className="bg-purple-800">
                <tr>
                  <th className="px-6 py-3 text-xs font-medium text-purple-300 text-center w-32 uppercase tracking-wider">Site</th>
                  <th className="px-6 py-3 text-xs font-medium text-center w-32 text-purple-300 uppercase tracking-wider">Username</th>
                  <th className="px-6 py-3 text-xs font-medium text-center w-32 text-purple-300 uppercase tracking-wider">Password</th>
                </tr>
              </thead>
              <tbody className="bg-purple-700 divide-y divide-purple-600">
                {passwordArray.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-center w-32">{item.site}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center w-32">{item.username}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center w-32">{item.password}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
