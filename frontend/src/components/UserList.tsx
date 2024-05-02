import axios from "axios";
import { useNavigate } from "react-router-dom";

type dataProps = {
  email: string;
  phone: string;
  name: string;
  _id: number;
};

export const UserList = ({ data }: { data: dataProps[] }) => {
  const navigate = useNavigate();

  const handleDelete = async (userID: number) => {
    try {
      await axios.delete(`http://localhost:5000/delete-post/${userID}`);
      setTimeout(() => {
        navigate("");
      }, 1000);
    } catch (error) {
      console.log("Couldn't delete", error);
    }
  };

  return (
    <div>
      <h1 className="font-extrabold flex justify-center my-8 text-4xl">
        User List
      </h1>
      {data?.map((userData) => (
        <div
          key={userData._id}
          className="p-2 border-gray-200 border-b-2 text-left mx-4 flex justify-between"
        >
          <div className="w-4/12">
            <div className="py-2 ">
              <span className="font-semibold text-lg">
                Name: {userData.name}
              </span>
            </div>
          </div>
          <div className="w-6/12 flex justify-between py-2">
            <p className=" font-semibold text-lg ">
              <span className="text-base">Email: {userData.email}</span>
            </p>
            <p className=" ">
              <span className="text-base">
                Contact Number: {userData.phone}
              </span>
            </p>
            <p className="  ">
              <span className="text-base">UserID: {userData._id}</span>
            </p>
          </div>
          <div className="w-1/12 flex ">
            <button
              className=" p-2 m-2 text-black  rounded-md "
              onClick={() => {
                navigate(`/edit-form/${userData._id}`);
              }}
            >
              Edit
            </button>

            <button
              className=" p-2 m-2 text-black  rounded-md"
              onClick={() => handleDelete(userData._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
