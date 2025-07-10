import { Link } from "react-router-dom";
import SubmitButton from "../../components/Buttons/SubmitButton/SubmitButton";

const ManageProfile = () => {
  return (
    <main>
      <section className="flex justify-center items-center w-full py-20">
        <div className="md:w-1/2 xl:w-1/4">
          <div className="flex justify-center items-center mb-4">
            <img
              src="../../../public/unknown.jpg"
              alt="Profile Image"
              className="rounded-full size-2/4"
            />
          </div>
          <h1 className="text-center font-bold text-3xl sm:text-4xl mb-5">
            Edit Profile
          </h1>
          <form>
            <div className="flex gap-x-3 items-center mb-4">
              <label htmlFor="fullname">Fullname:</label>
              <input
                type="text"
                id="fullname"
                value="John Doe"
                className="rounded-md bg-gray-700 py-3 px-5 text-gray-400 focus:text-gray-200 focus:shadow focus:shadow-primary focus:outline focus:outline-primary grow"
                required
              />
            </div>
            <div className="flex gap-x-3 items-center mb-4">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                value="JoDo"
                className="w-full rounded-md bg-gray-700 py-3 px-5 text-gray-400 focus:text-gray-200 focus:shadow focus:shadow-primary focus:outline focus:outline-primary grow"
                required
              />
            </div>
            <div className="flex gap-x-3 items-center mb-4">
              <label htmlFor="old-password">Old Password:</label>
              <input
                type="password"
                id="old-password"
                className="w-full rounded-md bg-gray-700 py-3 px-5 text-gray-400 focus:text-gray-200 focus:shadow focus:shadow-primary focus:outline focus:outline-primary grow"
                required
              />
            </div>
            <div className="flex gap-x-3 items-center mb-4">
              <label htmlFor="new-password">New Password:</label>
              <input
                type="password"
                id="new-password"
                className="w-full rounded-md bg-gray-700 py-3 px-5 text-gray-400 focus:text-gray-200 focus:shadow focus:shadow-primary focus:outline focus:outline-primary grow"
                required
              />
            </div>
            <div className="mb-4">
              <SubmitButton text="Save Changes" />
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default ManageProfile;
