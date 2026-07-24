import { Plus } from "lucide-react";
import { useState } from "react";
import Modal from "../../Modal";


function UserHeader() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Users Management
          </h1>

          <p className="mt-2 text-slate-500">
            Manage all academy users from one place.
          </p>
        </div>

        <button
          onClick={() => {
            setOpen(true)
            console.log("CLicked");
            
          }}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700"
        >
          <Plus size={20} />
          Create User
        </button>
      </div>
       <Modal IsOpen={open} onClose={() => setOpen(false)} title="Create User" /> 
    </>
  );
}

export default UserHeader;