import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const { login, error, isLoading } = useLogin();

  const loginHandler = async () => {
    await login(email, username);
  };

  const autoFillInformation = () => {
    setEmail("Sincere@april.biz");
    setUsername("Bret");
  };

  return (
    <div className="container mx-auto px-4 flex flex-col items-center justify-center">
      <br/><br/>
      <h1 className="text-4xl font-bold mb-8">Login</h1>
      <form className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={isLoading}
            onClick={loginHandler}
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Login
          </button>
          <div className="ml-4">
            <input
              type="checkbox"
              id="autofill"
              onClick={() => autoFillInformation()}
              className="rounded text-blue-600 focus:outline-none focus:ring-blue-500"
            />
            <label htmlFor="autofill" className="ml-2 text-sm text-gray-600">Autofill (For Debug)</label>
          </div>
        </div>
      </form>
      {error && <div className="mt-4 text-red-500">{error}</div>}
    </div>
  );
};

export default LoginPage;
