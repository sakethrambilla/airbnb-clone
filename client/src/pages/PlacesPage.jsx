import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Perks from "../Perks";

export default function PlacesPage() {
  // state initalizations
  const { action } = useParams();
  // console.log(action);
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);

  // functions
  function inputHeader(text) {
    return <h2 className="mt-4 text-2xl">{text}</h2>;
  }

  function inputDescription(text) {
    return <p className="text-grey-500 text-sm">{text}</p>;
  }

  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  // upload photo by link function
  async function addPhotoByLink(ev) {
    ev.preventDefault();
    try {
      const { data: filename } = await axios.post("/upload-by-link", {
        link: photoLink,
      });
      console.log(filename);
      setAddedPhotos((prev) => {
        return [...prev, filename];
      });
      setPhotoLink("");
      console.log(addedPhotos);
    } catch (err) {
      console.log(err.toJSON());
    }
  }

  return (
    <div className="m-4">
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
            {/*  */}
            {/* Title */}
            {preInput(
              "Title",
              "Title for your place. Should be short and catchy",
            )}
            <input
              type="text"
              value={title}
              onChange={(ev) => setTitle(ev.target.value)}
              placeholder="title, for example: My lovely apt"
            />

            {/* Address */}
            {preInput("Address", "Address to this place ")}
            <input
              type="text"
              value={address}
              onChange={(ev) => setAddress(ev.target.value)}
              placeholder="Address"
            />

            {/* Photots */}
            {preInput("Photos", " More is better")}

            {/* Upload image by link */}
            <div className="flex gap-2">
              <input
                type="text"
                value={photoLink}
                onChange={(ev) => setPhotoLink(ev.target.value)}
                placeholder={"Add using a link...jpg"}
              />
              <button
                onClick={addPhotoByLink}
                className="rounded-2xl bg-gray-200 px-4"
              >
                Add&nbsp;photo
              </button>
            </div>

            <div className="mt-2 grid grid-cols-3 gap-2 md:grid-cols-4 lg:grid-cols-6">
              {/* Uploaded Images */}
              {addedPhotos.length > 0 &&
                addedPhotos.map((link) => (
                  // eslint-disable-next-line react/jsx-key
                  <div>
                    <img
                      className="h-full rounded-2xl"
                      src={"http://localhost:4000/uploads/" + link}
                      alt=""
                    />
                  </div>
                ))}

              {/* Upload image from local machine */}
              <button className=" flex items-center justify-center gap-1 rounded-2xl border bg-transparent p-2 text-2xl text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-8 w-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                  />
                </svg>
                Upload
              </button>
            </div>

            {/* Description */}
            {preInput("Description", "Description of the place ")}
            <textarea
              value={description}
              onChange={(ev) => setDescription(ev.target.value)}
            />

            {/* Perks */}
            {preInput("Perks", "select all the perks of your place")}
            <div className="mt-2grid-cols-2  grid gap-2 md:grid-cols-3 lg:grid-cols-6">
              <Perks selected={perks} onChange={setPerks} />
            </div>
            {preInput("Extra info", "House rules ,etc")}
            <textarea
              value={extraInfo}
              onChange={(ev) => setExtraInfo(ev.target.value)}
            />

            {/* Check in & check out times */}
            {preInput(
              "Check in&out times",
              "Add check in and out times,remember to have some time for cleaning the room between the guests",
            )}
            <div className=" sm: grid grid-cols-3 gap-2">
              <div>
                <h3 className="-mb-1 mt-2">Check in time</h3>
                <input
                  type="text"
                  value={checkIn}
                  onChange={(ev) => setCheckIn(ev.target.value)}
                  placeholder="14:00"
                />
              </div>
              <div>
                <h3 className="-mb-1 mt-2">Check out time</h3>
                <input
                  type="text"
                  value={checkOut}
                  onChange={(ev) => setCheckOut(ev.target.value)}
                  placeholder="11:00"
                />
              </div>

              {/* Max Number of guests */}
              <div>
                <h3 className="-mb-1 mt-2">Max number of guests</h3>
                <input
                  type="number"
                  value={maxGuests}
                  onChange={(ev) => setMaxGuests(ev.target.value)}
                />
              </div>
            </div>
            <div>
              <button className="primary my-4">Save</button>
            </div>
          </form>
        </div>
      )}
      my places
    </div>
  );
}
