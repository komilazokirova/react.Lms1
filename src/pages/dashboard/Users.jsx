

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Users = () => {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     const getPosts = async () => {
//       try {
//         const response = await axios.get(
//           "https://jsonplaceholder.typicode.com/posts"
//         );

//         setPosts(response.data);
//       } catch (error) {
//         console.log(error.message);
//       }
//     };

//     getPosts();
//   }, []);

//   return (
//     <div>
//       <h1>Users</h1>

//       {posts.map((post) => (
//         <div key={post.id}>
//           <h3>{post.title}</h3>
//           <p>{post.body}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Users;


import React, { useEffect, useState } from "react";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "https://i.pravatar.cc/150",
  });

  const getUsers = async () => {
    try {
      setLoading(true);
      const response = await axios(
        "https://api.escuelajs.co/api/v1/users?"
      );
      setUsers(response.data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleCreateUser(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await axios.post("https://api.escuelajs.co/api/v1/users", {
        name: form.name,
        email: form.email,
        password: form.password,
        avatar: form.avatar,
        role: "customer",
      });

      setForm({ name: "", email: "", password: "", avatar: "https://i.pravatar.cc/150" });
      setShowForm(false);
      getUsers();
    } catch (err) {
      setError(
        err.response?.data?.message || "Foydalanuvchi yaratib bo'lmadi"
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="text-gray-500">Yuklanmoqda...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">Foydalanuvchilar</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          {showForm ? "Bekor qilish" : "+ Yangi foydalanuvchi"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleCreateUser}
          className="mb-6 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input
              type="text"
              name="name"
              placeholder="Ism"
              value={form.name}
              onChange={handleChange}
              required
              className="rounded-lg border p-3 outline-none focus:border-blue-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="rounded-lg border p-3 outline-none focus:border-blue-500"
            />
            <input
              type="password"
              name="password"
              placeholder="Parol"
              value={form.password}
              onChange={handleChange}
              required
              className="rounded-lg border p-3 outline-none focus:border-blue-500"
            />
            <input
              type="text"
              name="avatar"
              placeholder="Avatar URL"
              value={form.avatar}
              onChange={handleChange}
              className="rounded-lg border p-3 outline-none focus:border-blue-500"
            />
          </div>

          {error && <p className="mt-3 text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="mt-4 rounded-lg bg-green-600 px-5 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50"
          >
            {submitting ? "Saqlanmoqda..." : "Saqlash"}
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {users.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm border border-slate-100 transition hover:shadow-md"
          >
            <img
              src={item.avatar}
              alt={item.name}
              className="h-14 w-14 flex-shrink-0 rounded-full object-cover"
              onError={(e) => {
                e.target.src = "https://i.pravatar.cc/100";
              }}
            />

            <div>
              <p className="text-base font-semibold text-slate-800">{item.name}</p>
              <span className="mt-1 inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
                {item.role}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;