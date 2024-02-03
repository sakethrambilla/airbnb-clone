import { useState } from "react";

export default function PlaceGallery({ place }) {
  const [showAllPhotos, setshowAllPhotos] = useState(false);

  if (showAllPhotos) {
    return (
      <div className="absolute inset-0  min-h-screen bg-black text-white">
        <div className=" grid gap-4 bg-black p-8">
          <div>
            <h2 className="mr-44 text-3xl">Photos of {place.title}</h2>
            <button
              onClick={() => setshowAllPhotos(false)}
              className=" fixed right-12 top-8 flex gap-1 rounded-2xl bg-white px-4 py-2 text-black shadow shadow-black "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-6 w-6"
              >
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
              Close photos
            </button>
          </div>
          {place?.photos?.length > 0 &&
            place.photos.map((photo) => (
              <div key={photo.id}>
                <img src={"http://localhost:4000/uploads/" + photo} alt="" />
              </div>
            ))}
        </div>
      </div>
    );
  }
  return (
    <div className="relative">
      <div className="grid grid-cols-[2fr_1fr] gap-2 overflow-hidden rounded-3xl">
        <div>
          {place.photos?.[0] && (
            <div>
              <img
                onClick={() => setshowAllPhotos(true)}
                className="aspect-square cursor-pointer object-cover"
                src={"http://localhost:4000/uploads/" + place.photos[0]}
                alt=""
              />
            </div>
          )}
        </div>
        <div className="grid">
          {place.photos?.[1] && (
            <img
              onClick={() => setshowAllPhotos(true)}
              className="aspect-square cursor-pointer object-cover"
              src={"http://localhost:4000/uploads/" + place.photos[1]}
              alt=""
            />
          )}
          <div className="overflow-hidden">
            {place.photos?.[2] && (
              <img
                onClick={() => setshowAllPhotos(true)}
                className="relative top-2 aspect-square cursor-pointer object-cover"
                src={"http://localhost:4000/uploads/" + place.photos[2]}
                alt=""
              />
            )}
          </div>
        </div>
      </div>
      <button
        onClick={() => setshowAllPhotos(true)}
        className="absolute bottom-2 right-2 flex gap-1 rounded-2xl bg-white px-4 py-2 shadow shadow-md shadow-gray-500"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
          />
        </svg>
        Show more photos
      </button>
    </div>
  );
}
