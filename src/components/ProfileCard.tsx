import { UserData } from "../types";

export default function ProfileCard({ dataUser }: { dataUser: UserData }) {
  console.log(dataUser);
  return (
    <div className="max-w-lg max-h-[402px] w-full h-full bg-white shadow-profile rounded-2xl overflow-hidden p-2">
      <div className="p-4 text-center">
        <h2 className="mt-4 text-lg font-semibold">Profile picture</h2>

        <img
          className="w-24 h-16 rounded-lg mx-auto mt-2"
          src={`${
            dataUser.avatar !== null
              ? dataUser.avatar.high
              : "/avatar-anonymous.webp"
          }`}
          alt="Profile"
        />
      </div>
      <div className="px-6 py-4 max-[280px]:px-0">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-[#313131]">
            Your <span className="font-bold text-[#1a1a1a]">Name</span>
          </h3>
          <div className="field flex items-center h-[50px] bg-primary-gray p-4 rounded-lg outline-0 ">
            <p className=" text-primary-black">{dataUser.name}</p>
          </div>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-[#313131]">
            Your <span className="font-bold text-[#1a1a1a]">E-mail</span>
          </h3>
          <div className="field flex items-center h-[50px] bg-primary-gray p-4 rounded-lg outline-0 ">
            <p className=" text-primary-black">{dataUser.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
