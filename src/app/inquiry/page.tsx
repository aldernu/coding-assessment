"use client";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import Select from "react-select";

export default function Form() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    zipCode: "",
    type: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const option = [
    { value: "Assisted Living", label: "Assisted Living" },
    { value: "Home Care", label: "Home Care" },
    { value: "Home Health", label: "Home Health" },
    { value: "Independent Living/Retirement Community", label: "Java" },
  ];

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post("https://webhook.site/740fdce8-1615-4fd1-bfb8-73135667a950", formData);
      console.log("Form data submitted:", response.data);
      setSubmitSuccess(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="bg-white min-h-screen flex flex-row w-full">
      <div className="flex-1/2 w-full">
        <Image className="w-full h-full object-cover" src="/inquiry.png" alt="Inquiry Image" width={1000} height={1000} priority />
      </div>
      <div className="flex-1/2 w-full justify-center items-center flex flex-col">
        <div>
          <Image className=" object-cover" src="/ci-logo.webp" alt="Careindeed Logo" width={170} height={170} priority />
        </div>
        <div className="my-6 font-medium text-xl">Inquiry Form</div>
        <div className="w-[500px] mt-2">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Name</label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div>
              <label htmlFor="zipCode">ZipCode</label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="zipCode" value={formData.zipCode} onChange={handleChange} required />
            </div>
            <div className="inline-block relative items-center">
              <label htmlFor="type">Medical Staffing</label>
              <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="type" name="type" value={formData.type} onChange={handleChange}>
                <option value="" disabled>
                  Select an option
                </option>
                <option value="Assisted Living">Assisted Living</option>
                <option value="Home Care">Home Care</option>
                <option value="Home Health">Home Health</option>
                <option value="Independent Living/Retirement Community">Independent Living/Retirement Community</option>
              </select>
              <div className="pointer-events-none absolute inset-y-11 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
            <div>
              <label htmlFor="message">Message</label>
              <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="message" name="message" value={formData.message} onChange={handleChange} required />
            </div>
            <button className="bg-[#FFBF0F] hover:bg-[#FFF6DD] hover:border-2  hover:border-[#946D00] text-[black] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
