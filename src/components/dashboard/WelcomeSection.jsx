import React from "react";
import { useAuth } from "../../hook/useAuth";

function WelcomeSection() {

    const { user } = useAuth()
    return (
        <div className="rounded-xl bg-white p-6 shadow-sm">
            <h1 className="text-3xl font-bold ">
                Welcome back,{user?.name}
            </h1>
            <p className="mt-2 text-gray-500">
Ready to continue learning today?
            </p>
        </div>
    )
}

export default WelcomeSection