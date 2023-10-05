import { Link, useParams } from "react-router-dom";

export default function PlacesPage() {
  const { action } = useParams();
  console.log(action);
  return (
    <div>
      {action !== "new" && (
        <div className="text-center">
          <Link
            className="bg-primary inline-flex gap-1 rounded-full px-6 py-2 text-white"
            to={"/account/places/new"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add new Place
          </Link>
        </div>
      )}
      {action === "new" && (
        <div>
          <form action="">
            <h2 className="mt-4 text-2xl">Title</h2>
            <p className="text-grey-500 text-sm">
              Title for your place. Should be short and catchy
            </p>
            <input
              type="text"
              placeholder="title, for example: My lovely apt"
            />
            <p className="text-grey-500 text-sm">Address to this place </p>
            <h2 className="mt-4 text-2xl">Address</h2>
            <input type="text" placeholder="Address" />
            <h2 className="mt-4 text-2xl">Photos</h2>
            <p className="text-grey-500 text-sm">More is better</p>
            <div className="mt-2 grid grid-cols-3 lg:grid-cols-6">
              <button className="rounded-2xl border bg-transparent p-8 text-2xl text-gray-500">
                +
              </button>
            </div>
          </form>
        </div>
      )}
      my places
    </div>
  );
}
