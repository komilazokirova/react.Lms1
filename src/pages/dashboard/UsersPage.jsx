import React, { useState } from "react";

import { users } from "../../constant/data/users";
import UserHeader from "../../components/dashboard/users/UserHeader";
import UserFilters from "../../components/dashboard/users/UserFilters";
import UserTable from "../../components/dashboard/users/UserTable";

const UsersPage = () => {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("All");
  const [status, setStatus] = useState("All");

  function handleReset() {
    setRole("All");
    setSearch("");
    setStatus("All");
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());

    const matchesRole = role === "All" || user.role === role;
    const matchesStatus = status === "All" || user.status === status;

    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <>
      <UserHeader/>
      <UserFilters
        search={search}
        setSearch={setSearch}
        role={role}
        setRole={setRole}
        status={status}
        setStatus={setStatus}
        onReset={handleReset}
      />

      <UserTable users={filteredUsers} />
    </>
  );
};

export default UsersPage;