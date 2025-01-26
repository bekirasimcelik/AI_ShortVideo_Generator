"use client";
import React, { useState } from "react";
import SelectTopic from "./_components/SelectTopic";

function CreateNew() {
  const [formData, setFormData] = useState([]);
  const onHandleInputChange = (fieldName, fieldValue) => {
    console.log(fieldName, fieldValue);
  };

  return (
    <div className="md:px-29">
      <h2 className="font-bold text-4xl text-primary text-center">
        Create New
      </h2>

      <div className="mt-10 shadow-md p-10">
        {/* Select Topic */}
        <SelectTopic onUserSelet={onHandleInputChange} />

        {/* Select Style */}

        {/* Duration */}

        {/* Create */}
      </div>
    </div>
  );
}

export default CreateNew;
