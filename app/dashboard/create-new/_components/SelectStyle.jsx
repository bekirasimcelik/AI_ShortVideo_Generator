import Image from "next/image";
import React from "react";

function SelectStyle() {
  const styleOptions = [
    {
      name: "Realistic",
      image: "/real.png",
    },
    {
      name: "Cartoon",
      image: "/cartoon.png",
    },
    {
      name: "Comic",
      image: "/cartoon.png",
    },
    {
      name: "WaterColor",
      image: "/cartoon.png",
    },
    {
      name: "GTA",
      image: "/cartoon.png",
    },
  ];
  return (
    <div className="mt-7">
      <h2 className="font-bold text-2xl text-primary">Style</h2>
      <p className="text-gray-500">Select your video style</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {styleOptions.map((item, index) => (
          <div>
            <Image
              src={item.image}
              width={100}
              height={100}
              className="h-48 object-cover rounded-lg w-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelectStyle;
