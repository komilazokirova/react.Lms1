import UserRow from "./UserRow";

function UserTable({ users }) {
  if (users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white p-10">
        <h2 className="text-xl font-semibold text-slate-700">No users found</h2>

        <p className="mt-2 text-slate-500">
          Try changing your search or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full">
        <thead className="bg-slate-50">
          <tr className="text-left text-slate-600">
            <th className="px-5 py-4">User</th>

            <th className="px-5 py-4">Role</th>

            <th className="px-5 py-4">Status</th>

            <th className="px-5 py-4">Joined</th>

            <th className="px-5 py-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <UserRow key={user.id} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;