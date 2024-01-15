import { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function BookingWidget({ place }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberofGuests, setNumberofGuests] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [redirect, setRedirect] = useState("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  let nubmerOfNights = 0;
  if (checkIn && checkOut) {
    nubmerOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn),
    );
  }
  async function bookThisPlace() {
    const response = await axios.post("/bookings", {
      place: place._id,
      checkIn,
      checkOut,
      numberofGuests,
      name,
      phone,
      price: nubmerOfNights * place.price,
    });
    const bookingId = response.data._id;
    setRedirect(`/account/bookings/${bookingId}`);
  }
  if (redirect) {
    return <Navigate to={redirect} />;
  }
  return (
    <div className="rounded-2xl bg-white p-4 shadow">
      <div className="text-center text-2xl">Price:₹{place.price}/per night</div>
      <div className="mt-4 rounded-2xl border">
        <div className="flex">
          <div className=" px-4 py-3">
            <label>Check in:</label>
            <input
              type="date"
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
            />
          </div>
          <div className=" border-l px-4 py-3">
            <label>Check out:</label>
            <input
              type="date"
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
            />
          </div>
        </div>
        <div className=" border-t px-4 py-3">
          <label>Number of guests:</label>
          <input
            type="number"
            value={numberofGuests}
            onChange={(ev) => setNumberofGuests(ev.target.value)}
          />
        </div>
        {nubmerOfNights > 0 && (
          <div className="border-t px-4 py-3">
            <label>Your Full Name: </label>
            <input
              type="text"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
            />
            <label>Phone Number: </label>
            <input
              type="tel"
              value={phone}
              onChange={(ev) => setPhone(ev.target.value)}
            />
          </div>
        )}
      </div>
      <button className="primary mt-4" onClick={bookThisPlace}>
        Book this place
        {nubmerOfNights > 0 && <span> ₹{nubmerOfNights * place.price}</span>}
      </button>
    </div>
  );
}
