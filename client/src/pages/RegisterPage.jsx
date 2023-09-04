import { Link } from "react-router-dom";

export default function Registerpage() {
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-32">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto">
          <input type="text" placeholder="John" />
          <input type="email" placeholder="your@email.com" />
          <input type="password" placeholder="password" />
          <button className="primary">Login</button>
          <div className="text-center py-2 text-gray-500">
            Already a member?
            <Link className="underline text-black" to={"/login"}>
              <br />
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
