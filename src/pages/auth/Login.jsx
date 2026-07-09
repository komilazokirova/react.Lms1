function Login() {
  return (
    <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
      <h1 className="mb-2 text-3xl font-bold">Welcome Back</h1>

      <p className="mb-8 text-gray-500">Login to continue learning.</p>

      <form className="space-y-5">
        <input
          type="email"
          placeholder="Email"
          className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
        />

        <button className="w-full rounded-lg bg-blue-600 py-3 text-white hover:bg-blue-700">
          Login
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        Don't have an account?{" "}
        <span className="cursor-pointer font-semibold text-blue-600">
          Sign up
        </span>
      </p>
    </div>
  );
}

export default Login;