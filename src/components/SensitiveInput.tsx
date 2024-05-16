import { useState } from "react";

import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";

type SensitiveInputTypes = {
  error: boolean;
};

export default function SensitiveInput({ error }: SensitiveInputTypes) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className={`input h-[54px] flex items-center justify-between bg-primary-gray p-4 rounded-lg outline-0 border  ${
        error ? "border-red-500" : "border-primary-gray"
      }`}
    >
      <input
        type={showPassword == true ? "text" : "password"}
        placeholder="***********"
        className="bg-transparent border-none outline-0 flex items-center"
      />
      {showPassword == true ? (
        <FaEye onClick={() => setShowPassword(false)} />
      ) : (
        <FaEyeSlash onClick={() => setShowPassword(true)} />
      )}
    </div>
  );
}
