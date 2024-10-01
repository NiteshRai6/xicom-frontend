import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineFileUpload } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function App() {
  const [fileName, setFileName] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    defaultValues: {
      documents: [{ fileName: "", fileType: "", file: null }],
    },
  });

  const [documents, setDocuments] = useState([{ fileName: "", fileType: "", file: null }]);
  const [sameAsResidential, setSameAsResidential] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleAddDocument = () => {
    setDocuments([...documents, { fileName: "", fileType: "", file: null }]);
  };

  const handleRemoveDocument = (index) => {
    const updatedDocs = documents.filter((_, i) => i !== index);
    setDocuments(updatedDocs);
  };

  const handleSameAsResidentialChange = () => {
    setSameAsResidential(!sameAsResidential);
    if (!sameAsResidential) {
      setValue("permanentStreet1", watch("residentialStreet1"));
      setValue("permanentStreet2", watch("residentialStreet2"));
    }
  };

  return (
    <div className="container mx-auto p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-3xl font-medium mb-6 text-center">Candidate's Document Submission Form</h2>

        {/* Personal Information */}
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/2 px-4 mb-4">
            <label className="mb-1">First Name
              <span className="text-red-500">*</span></label>
            <input
              {...register("firstName", { required: "First Name is required" })}
              type="text"
              placeholder="Enter your first name here.."
              className={`border rounded p-2 w-full ${errors.firstName ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
          </div>

          <div className="w-full md:w-1/2 px-4 mb-4">
            <label className="mb-1">Last Name
              <span className="text-red-500">*</span></label>
            <input
              {...register("lastName", { required: "Last Name is required" })}
              type="text"
              placeholder="Enter your last name here.."
              className={`border rounded p-2 w-full ${errors.lastName ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
          </div>

          <div className="w-full md:w-1/2 px-4 mb-4">
            <label className="mb-1">Email
              <span className="text-red-500">*</span></label>
            <input
              {...register("email", {
                required: "Email is required",
                // pattern: {
                //   value: /^\S+@\S+$/i,
                //   message: "Invalid email format"
                // }
              })}
              type="email"
              placeholder="ex: myname@example.com"
              className={`border rounded p-2 w-full ${errors.email ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div className="w-full md:w-1/2 px-4 mb-4">
            <label className="mb-1">Date Of Birth
              <span className="text-red-500">*</span></label>
            <input
              {...register("dateOfBirth", { required: "Date Of Birth is required" })}
              type="date"
              className={`border rounded p-2 w-full ${errors.dateOfBirth ? "border-red-500" : "border-gray-300"}`}
            />
            <p className="text-sm text-gray-400">&#40;Min. age should be 18 Years&#41;</p>
            {errors.dateOfBirth && <p className="text-red-500 text-sm">{errors.dateOfBirth.message}</p>}
          </div>
        </div>

        {/* Address Information */}
        <h2 className="text-lg mb-1">Residential Address</h2>
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/2 px-4 mb-4">
            <label className="mb-1 text-gray-400">Street 1
              <span className="text-red-500">*</span></label>
            <input
              {...register("residentialStreet1", { required: "Residential Street 1 is required" })}
              type="text"
              className={`border rounded p-2 w-full ${errors.residentialStreet1 ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.residentialStreet1 && <p className="text-red-500 text-sm">{errors.residentialStreet1.message}</p>}
          </div>

          <div className="w-full md:w-1/2 px-4 mb-4">
            <label className="mb-1 text-gray-400">Street 2
              <span className="text-red-500">*</span></label>
            <input
              {...register("residentialStreet2", { required: "Residential Street 2 is required" })}
              type="text"
              className={`border rounded p-2 w-full ${errors.residentialStreet2 ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.residentialStreet2 && <p className="text-red-500 text-sm">{errors.residentialStreet2.message}</p>}
          </div>

          <div className="w-full px-4 mb-4 flex items-center">
            <input type="checkbox" onChange={handleSameAsResidentialChange} className="mr-2 h-5 w-5" />
            <label>Same as Residential Address</label>
          </div>

          {/* Permanent Address */}
          {!sameAsResidential && (
            <>
              <h2 className="mb-1 text-lg w-full px-4">Permanent Address</h2>

              <div className="w-full md:w-1/2 px-4 mb-4">
                <label className="mb-1 text-gray-400">Street 1
                  <span className="text-red-500">*</span></label>
                <input
                  {...register("permanentStreet1", { required: "Permanent Street 1 is required" })}
                  type="text"
                  className={`border rounded p-2 w-full ${errors.permanentStreet1 ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.permanentStreet1 && <p className="text-red-500 text-sm">{errors.permanentStreet1.message}</p>}
              </div>

              <div className="w-full md:w-1/2 px-4 mb-4">
                <label className="mb-1 text-gray-400">Street 2
                  <span className="text-red-500">*</span></label>
                <input
                  {...register("permanentStreet2", { required: "Permanent Street 2 is required" })}
                  type="text"
                  className={`border rounded p-2 w-full ${errors.permanentStreet2 ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.permanentStreet2 && <p className="text-red-500 text-sm">{errors.permanentStreet2.message}</p>}
              </div>
            </>
          )}
        </div>

        {/* Document Uploads */}
        <div className="mb-6">
          <h2 className="mb-1 text-lg">Upload Documents</h2>

          {documents.map((doc, index) => (
            <div key={index} className="flex flex-wrap gap-5 border-b pb-4 mb-4">
              <div className="flex flex-col w-full md:w-1/4">
                <label className="font-semibold mb-1">File Name<span className="text-red-500">*</span></label>
                <input
                  type="text"
                  className="border p-2 rounded w-full"
                  placeholder="Enter file name"
                  {...register(`documents[${index}].fileName`, { required: "File Name is required" })}
                />
                {errors.documents?.[index]?.fileName && (
                  <span className="text-red-500 text-sm">{errors.documents[index].fileName.message}</span>
                )}
              </div>

              <div className="flex flex-col w-full md:w-1/4">
                <label className="font-semibold mb-1">Type of File<span className="text-red-500">*</span></label>
                <select
                  className="border p-2 rounded w-full h-[42px]"
                  {...register(`documents[${index}].fileType`, { required: "File Type is required" })}
                >
                  <option value="">Select Type</option>
                  <option value="image">Image</option>
                  <option value="pdf">PDF</option>
                </select>
                {errors.documents?.[index]?.fileType && (
                  <span className="text-red-500 text-sm">{errors.documents[index].fileType.message}</span>
                )}
              </div>

              <div className="flex flex-col w-64 space-y-1">
                <label className="text-gray-600 font-medium">
                  Upload Document
                  <span className="text-red-500">*</span>
                </label>

                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={fileName}
                    readOnly
                    placeholder="No file selected"
                    className="w-full px-3 py-2 border rounded-md bg-white text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />

                  <label htmlFor="file-upload" className="absolute right-2 cursor-pointer">
                    <MdOutlineFileUpload className="w-8 h-8 text-gray-600" />
                  </label>

                  <input
                    id="file-upload"
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
              </div>

              <div className="flex items-end">
                {index > 0 ? (
                  <button
                    type="button"
                    onClick={() => handleRemoveDocument(index)}
                    className="bg-gray-300 text-2xl p-2 mb-[1px] rounded"
                  >
                    <RiDeleteBin6Line />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleAddDocument}
                    className="bg-gray-700 text-white font-bold text-2xl 
                    p-[7px] mb-[2px] rounded"
                  >
                    <IoMdAdd />
                  </button>
                )}
              </div>
            </div>
          ))}

        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button type="submit" className="bg-gray-800 text-white px-6 py-2 rounded">Submit</button>
        </div>
      </form>
    </div>
  );
};
