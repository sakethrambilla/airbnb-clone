import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import AccountNav from "../AccountNav";

export default function PlacesPage() {
  return (
    <div className="m-4">
      <AccountNav />
      List of All Places Batman
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
      my places
    </div>
  );
}
