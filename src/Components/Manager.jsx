import React, { useRef, useState, useEffect } from "react";
import { Eye, EyeOff, Copy, Edit2, Trash2, Plus, Lock } from "lucide-react";

const Manager = () => {
  const passref = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  // Load passwords from localStorage on component mount
  useEffect(() => {
    try {
      const passwords = localStorage.getItem("passwords");
      if (passwords) {
        setpasswordArray(JSON.parse(passwords));
      }
    } catch (error) {
      console.error("Error loading passwords:", error);
    }
  }, []);

  // Show toast notification
  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "" });
    }, 3000);
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    const newShowState = !showPassword;
    setShowPassword(newShowState);
    if (passref.current) {
      passref.current.type = newShowState ? "text" : "password";
    }
  };

  // Generate unique ID
  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  // Save password
  const SavePassword = () => {
    if (!form.site || !form.username || !form.password) {
      showToast("Please fill all fields", "error");
      return;
    }

    try {
      const updatedPasswords = [...passwordArray, { ...form, id: generateId() }];
      setpasswordArray(updatedPasswords);
      localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
      
      setform({ site: "", username: "", password: "" });
      setShowPassword(false);
      if (passref.current) {
        passref.current.type = "password";
      }
      showToast("Password saved successfully!");
    } catch (error) {
      console.error("Error saving password:", error);
      showToast("Error saving password", "error");
    }
  };

  // Delete password
  const deletePassword = (id) => {
    if (window.confirm("Do you really want to delete this password?")) {
      try {
        const newPasswords = passwordArray.filter(item => item.id !== id);
        setpasswordArray(newPasswords);
        localStorage.setItem("passwords", JSON.stringify(newPasswords));
        showToast("Password deleted successfully!");
      } catch (error) {
        console.error("Error deleting password:", error);
        showToast("Error deleting password", "error");
      }
    }
  };

  // Edit password
  const editPassword = (id) => {
    const passwordToEdit = passwordArray.find(i => i.id === id);
    if (passwordToEdit) {
      setform(passwordToEdit);
      setpasswordArray(passwordArray.filter(item => item.id !== id));
    }
  };

  // Handle form input changes
  const HandleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  // Copy to clipboard
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast("Copied to clipboard!");
    } catch (err) {
      console.error("Copy failed:", err);
      showToast("Failed to copy", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 m-auto h-[310px] w-[310px] rounded-full bg-gradient-to-r from-green-400 to-blue-400 opacity-20 blur-[100px]"></div>
      </div>

      {/* Toast Notification */}
      {toast.show && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg transition-all duration-300 ${
          toast.type === "error" 
            ? "bg-red-500 text-white" 
            : "bg-green-500 text-white"
        }`}>
          {toast.message}
        </div>
      )}

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">
            <span className="text-green-600">&lt;</span>
            <span className="text-gray-800">Pass</span>
            <span className="text-green-600">OP/&gt;</span>
          </h1>
          <p className="text-green-600 text-lg sm:text-xl">
            Your Own Password Manager
          </p>
        </div>

        {/* Form Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8 mb-8">
          <div className="flex flex-col gap-4 sm:gap-6">
            {/* Website URL Input */}
            <input
              value={form.site}
              onChange={HandleChange}
              placeholder="Enter Website URL"
              className="w-full px-4 py-3 rounded-full border-2 border-green-300 focus:border-green-500 focus:outline-none transition-colors"
              type="text"
              name="site"
            />

            {/* Username and Password Row */}
            <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
              <input
                value={form.username}
                onChange={HandleChange}
                placeholder="Enter Username"
                className="flex-1 px-4 py-3 rounded-full border-2 border-green-300 focus:border-green-500 focus:outline-none transition-colors"
                name="username"
                type="text"
              />
              
              <div className="relative flex-1">
                <input
                  ref={passref}
                  value={form.password}
                  onChange={HandleChange}
                  placeholder="Enter Password"
                  className="w-full px-4 py-3 pr-12 rounded-full border-2 border-green-300 focus:border-green-500 focus:outline-none transition-colors"
                  name="password"
                  type={showPassword ? "text" : "password"}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-gray-100"
                  onClick={togglePasswordVisibility}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-center">
              <button
                onClick={SavePassword}
                className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-full font-medium transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform"
              >
                <Plus size={20} />
                Add Password
              </button>
            </div>
          </div>
        </div>

        {/* Passwords Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 flex items-center gap-2">
            <Lock className="text-green-600" />
            Your Passwords
          </h2>

          {passwordArray.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Lock size={48} className="mx-auto mb-4 opacity-50" />
              <p className="text-lg">No passwords saved yet</p>
              <p className="text-sm">Add your first password above to get started!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              {/* Desktop Table View */}
              <div className="hidden lg:block">
                <table className="w-full rounded-xl overflow-hidden shadow-lg">
                  <thead className="bg-green-600 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left font-medium">Site</th>
                      <th className="px-6 py-4 text-left font-medium">Username</th>
                      <th className="px-6 py-4 text-left font-medium">Password</th>
                      <th className="px-6 py-4 text-center font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {passwordArray.map((item, index) => (
                      <tr key={item.id || index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <a 
                              href={item.site.startsWith('http') ? item.site : `https://${item.site}`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 truncate max-w-xs"
                            >
                              {item.site}
                            </a>
                            <button
                              onClick={() => copyToClipboard(item.site)}
                              className="p-1 hover:bg-gray-200 rounded transition-colors"
                            >
                              <Copy size={16} className="text-gray-500" />
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <span className="truncate max-w-xs">{item.username}</span>
                            <button
                              onClick={() => copyToClipboard(item.username)}
                              className="p-1 hover:bg-gray-200 rounded transition-colors"
                            >
                              <Copy size={16} className="text-gray-500" />
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <span className="font-mono">{"•".repeat(item.password.length)}</span>
                            <button
                              onClick={() => copyToClipboard(item.password)}
                              className="p-1 hover:bg-gray-200 rounded transition-colors"
                            >
                              <Copy size={16} className="text-gray-500" />
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => editPassword(item.id)}
                              className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button
                              onClick={() => deletePassword(item.id)}
                              className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="lg:hidden space-y-4">
                {passwordArray.map((item, index) => (
                  <div key={item.id || index} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-500">Site:</span>
                        <div className="flex items-center gap-2">
                          <a 
                            href={item.site.startsWith('http') ? item.site : `https://${item.site}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 truncate max-w-[200px]"
                          >
                            {item.site}
                          </a>
                          <button
                            onClick={() => copyToClipboard(item.site)}
                            className="p-1 hover:bg-gray-200 rounded"
                          >
                            <Copy size={14} />
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-500">Username:</span>
                        <div className="flex items-center gap-2">
                          <span className="truncate max-w-[200px]">{item.username}</span>
                          <button
                            onClick={() => copyToClipboard(item.username)}
                            className="p-1 hover:bg-gray-200 rounded"
                          >
                            <Copy size={14} />
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-500">Password:</span>
                        <div className="flex items-center gap-2">
                          <span className="font-mono">{"•".repeat(item.password.length)}</span>
                          <button
                            onClick={() => copyToClipboard(item.password)}
                            className="p-1 hover:bg-gray-200 rounded"
                          >
                            <Copy size={14} />
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
                        <button
                          onClick={() => editPassword(item.id)}
                          className="flex items-center gap-1 px-3 py-1 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors text-sm"
                        >
                          <Edit2 size={14} />
                          Edit
                        </button>
                        <button
                          onClick={() => deletePassword(item.id)}
                          className="flex items-center gap-1 px-3 py-1 text-red-600 hover:bg-red-100 rounded-lg transition-colors text-sm"
                        >
                          <Trash2 size={14} />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Manager;