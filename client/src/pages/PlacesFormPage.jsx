import axios from "axios";
import { useEffect, useState } from "react";
import Perks from "../Perks";
import PhotosUploader from "../PhotosUploader";
import AccountNav from "../AccountNav";
import { Navigate, useParams } from "react-router-dom";

const PlacesFormPage = () => {
  const { id } = useParams();
  console.log({ id });
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/places/" + id).then((response) => {
      const { data } = response;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
    });
  }, [id]);

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

  async function savePlace(ev) {
    ev.preventDefault();
    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    };

    if (id) {
      //updating existing place
      await axios.put("/places", {
        id,
        ...placeData,
      });
      setRedirect(true);
    } else {
      //creating New Place
      await axios.post("/places", placeData);
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }

  return (
    <div>
      <AccountNav />
      <form onSubmit={savePlace} className="m-2">
        {/*  */}
        {/* Title */}
        {preInput("Title", "Title for your place. Should be short and catchy")}
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

        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

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
  );
};

export default PlacesFormPage;
