import React, { useState } from "react";
import axios from "axios";

const PhotosUploader = ({ addedPhotos, onChange }) => {
  const [photoLink, setPhotoLink] = useState("");

  // upload photo by link function
  async function addPhotoByLink(ev) {
    ev.preventDefault();
    try {
      const { data: filename } = await axios.post("/upload-by-link", {
        link: photoLink,
      });
      console.log(filename);
      onChange((prev) => {
        return [...prev, filename];
      });
      setPhotoLink("");
      console.log(addedPhotos);
    } catch (err) {
      console.log(err.toJSON());
    }
  }

  //upload photo function
  function uploadPhoto(ev) {
    const files = ev.target.files;
    // console.log(files);
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    console.log(data);
    axios
      .post("/upload", data, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then((response) => {
        const { data: filenames } = response;
        onChange((prev) => {
          return [...prev, ...filenames];
        });
      });
  }

  return (
    <>
      {" "}
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
            <div className="flex h-32">
              <img
                className="w-full rounded-2xl object-cover "
                src={"http://localhost:4000/uploads/" + link}
                alt=""
              />
            </div>
          ))}

        {/* Upload image from local machine */}
        <label className=" flex h-32 cursor-pointer items-center justify-center gap-1 rounded-2xl border bg-transparent p-2 text-2xl text-gray-500">
          <input
            type="file"
            multiple
            className="hidden"
            onChange={uploadPhoto}
          />
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
        </label>
      </div>
    </>
  );
};

export default PhotosUploader;
