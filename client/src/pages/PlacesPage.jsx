import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import AccountNav from "../AccountNav";
import axios from "axios";

export default function PlacesPage() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/places").then(({ data }) => {
      setPlaces(data);
    });
  }, []);
  return (
    <div className="m-4">
      <AccountNav />
      List of All Places
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
      {/* List of Places */}
      <div className="mt-4">
        {places.length > 0 &&
          places.map((place) => (
            <Link
              to={"/account/places/" + place._id}
              key={place._id}
              className=" flex cursor-pointer gap-4 rounded-2xl bg-gray-200 p-4"
            >
              <div className="flex h-32 w-32 shrink-0 grow rounded-2xl bg-gray-100">
                {place.photos.length > 0 && (
                  <img
                    className=" object-cover"
                    src={"http://localhost:4000/uploads/" + place.photos[0]}
                    alt=""
                  />
                )}
              </div>
              <div className="shrink grow-0">
                <h2 className="text-xl ">{place.title}</h2>
                <p className="mt-2 text-sm ">{place.description}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
