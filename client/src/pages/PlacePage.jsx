import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/places/${id}").then((response) => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) return "";

  return (
    <div className="-mx-8 mt-4 bg-gray-100 px-8 py-8">
      <h1 classNmae="text-2xl">{place.title}</h1>
      <a target="_blank" href={"https://maps.google.com/?q=" + place.address}>
        {place.address}
      </a>
    </div>
  );
}
