import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ProfileCard from "../components/ProfileCard";
import Api from "../services/api";
import { UserData } from "../types";

import { AiOutlineLoading } from "react-icons/ai";

export default function Profile() {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    async function getUserData() {
      const response = await Api.profile();
      if (response.status === 401) {
        localStorage.removeItem("tokens");
        return navigate("/login");
      }
      setUser(response);
    }
    getUserData();
  }, []);

  function handleLogout() {
    setIsLoading(true);
    localStorage.removeItem("tokens");
    setTimeout(() => {
      setIsLoading(false);
      navigate("/login");
    }, 1200);
  }

  return (
    <div className="w-full h-[100vh] bg-[#F1F5F9]">
      <header className="bg-white h-20 flex items-center justify-end px-4">
        <button
          id="logout"
          className="bg-primary-blue text-white flex items-center justify-center font-bold p-2 w-60 rounded-md hover:brightness-125"
          onClick={handleLogout}
        >
          {isLoading == false ? (
            "Logout"
          ) : (
            <AiOutlineLoading className="animate-spin text-2xl text-primary-yellow" />
          )}
        </button>
      </header>

      <div className="w-full h-full flex justify-center mt-44 p-4">
        {user !== null ? (
          <ProfileCard dataUser={user} />
        ) : (
          <AiOutlineLoading className="animate-spin text-[120px] text-primary-yellow" />
        )}
      </div>
    </div>
  );
}
