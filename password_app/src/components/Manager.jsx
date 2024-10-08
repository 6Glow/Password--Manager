import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const [form, setForm] = useState({
    id: null,
    site: "",
    username: "",
    password: "",
  });
  const [passwordArray, setPasswordArray] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    });
  };

  const savePassword = () => {
    if (form.site && form.username && form.password) {
      if (isEditing) {
        // Update existing password
        const updatedPasswords = passwordArray.map((item) =>
          item.id === form.id ? form : item
        );
        setPasswordArray(updatedPasswords);
        localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
        toast.success("Password updated successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
      } else {
        // Add new password
        const newPassword = { ...form, id: uuidv4() };
        const updatedPasswordArray = [...passwordArray, newPassword];
        setPasswordArray(updatedPasswordArray);
        localStorage.setItem("passwords", JSON.stringify(updatedPasswordArray));
        toast.success("Password saved successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
      }
      resetForm();
    } else {
      toast.error("Please fill out all fields before saving.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }
  };

  const resetForm = () => {
    setForm({ id: null, site: "", username: "", password: "" });
    setIsEditing(false);
  };

  const editPassword = (id) => {
    const passwordToEdit = passwordArray.find((item) => item.id === id);
    setForm(passwordToEdit);
    setIsEditing(true);
    toast.info("Editing password...", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
  };

  const deletePassword = (id) => {
    let isConfirmed = confirm("Do you really want to delete this password?");
    if (isConfirmed) {
      const updatedPasswords = passwordArray.filter((item) => item.id !== id);
      setPasswordArray(updatedPasswords);
      localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
      toast.success("Password deleted successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer />
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

      <div className="mycontainer">
        <h1 className="font-bold text-purple-200 text-4xl mb-2 text-center">
          PassApp
        </h1>
        <p className="text-gray-400 text-lg mb-4 text-center">
          Keep Your Passwords Safe With Our App
        </p>

        <div className="text-gray-300 flex flex-col p-4 gap-8 justify-center items-center">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter website URL"
            className="rounded-full border border-gray-300 w-full p-4 py-1 bg-gray-800 text-white"
            type="url"
            name="site"
            id="site"
          />
          <div className="flex w-full justify-between gap-8">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              className="rounded-full border border-gray-300 w-full p-4 py-1 bg-gray-800 text-white"
              type="text"
              name="username"
              id="username"
            />
            <div className="relative">
              <input
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="rounded-full border border-gray-300 w-full p-4 py-1 bg-gray-800 text-white"
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
              />
              <span
                className="absolute right-[2px] top-[4px] cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                <img
                  className="p-1"
                  width={26}
                  src={showPassword ? "icons/eyecross.png" : "icons/eye.png"}
                  alt="eye"
                />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="flex justify-center text-blond text-lg text-white items-center gap-4 bg-purple-600 hover:bg-purple-500 rounded-full px-8 py-2 w-fit border-1 border-purple-700"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            {isEditing ? "Update" : "Save"}
          </button>
        </div>

        <div className="passwords">
          <h2 className="font-bold text-2xl py-4 text-gray-400">
            Your Passwords:
          </h2>
          {passwordArray.length === 0 && (
            <div className="text-gray-600">No passwords to show</div>
          )}
          {passwordArray.length !== 0 && (
            <table className="min-w-full divide-y divide-purple-200 bg-purple-900 text-white rounded-md overflow-hidden mb-10">
              <thead className="bg-purple-800">
                <tr>
                  <th className="px-6 py-3 text-base font-medium text-purple-300 text-center w-32 uppercase tracking-wider">
                    Site
                  </th>
                  <th className="px-6 py-3 text-base font-medium text-center w-32 text-purple-300 uppercase tracking-wider">
                    Username
                  </th>
                  <th className="px-6 py-3 text-base font-medium text-center w-32 text-purple-300 uppercase tracking-wider">
                    Password
                  </th>
                  <th
                    className="px-6 py-3 text-base font-medium text-center w-32 text-purple-300 uppercase tracking-wider"
                    style={{ paddingLeft: "16px" }}
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-purple-700 divide-y divide-purple-600">
                {passwordArray.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 justify-center py-2 border-t-2 border-r-2 border-b-2 border-purple-400 text-center w-32">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexWrap: "wrap",
                          wordBreak: "break-word",
                        }}
                      >
                        <a
                          href={item.site}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ marginRight: "6px" }}
                        >
                          <span>{item.site}</span>
                        </a>
                        <div
                          className="lordiconcopy size-7 cursor-pointer"
                          onClick={() => copyText(item.site)}
                        >
                          <lord-icon
                            style={{
                              width: "25px",
                              height: "25px",
                              marginLeft: "10px",
                            }}
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover"
                          ></lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4   justify-center  border  border-purple-400 text-center w-32">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexWrap: "wrap",
                          wordBreak: "break-word",
                        }}
                      >
                        <span>{item.username}</span>
                        <div
                          className="lordiconcopy size-7 cursor-pointer"
                          onClick={() => copyText(item.username)}
                        >
                          <lord-icon
                            style={{
                              width: "25px",
                              height: "25px",
                              marginLeft: "16px",
                            }}
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover"
                          ></lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 justify-center border  border-purple-400 text-center w-32">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexWrap: "wrap",
                          wordBreak: "break-word",
                        }}
                      >
                        <span>{item.password}</span>
                        <div
                          className="lordiconcopy size-7 cursor-pointer"
                          onClick={() => copyText(item.password)}
                        >
                          <lord-icon
                            style={{
                              width: "25px",
                              height: "25px",
                              marginLeft: "16px",
                            }}
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover"
                          ></lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className="justify-center py-2 border-t border-l border-b border-purple-400 text-center">
                      <span
                        className="cursor-pointer mx-1"
                        onClick={() => editPassword(item.id)}
                      >
                        <lord-icon
                          src="https://cdn.lordicon.com/gwlusjdu.json"
                          trigger="hover"
                          style={{ width: "25px", height: "25px" }}
                        ></lord-icon>
                      </span>
                      <span
                        className="cursor-pointer mx-1"
                        onClick={() => deletePassword(item.id)}
                      >
                        <lord-icon
                          src="https://cdn.lordicon.com/skkahier.json"
                          trigger="hover"
                          style={{ width: "25px", height: "25px" }}
                        ></lord-icon>
                      </span>
                    </td>
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
