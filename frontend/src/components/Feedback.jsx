import React, { useState } from "react";

const Feedback = () => {
  // State for form fields
  const [feedbackType, setFeedbackType] = useState("");
  const [feedback, setFeedback] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      feedbackType,
      feedback,
      firstName,
      lastName,
      email,
    };
    console.log("Feedback Submitted: ", formData);
    // Reset the form
    setFeedbackType("");
    setFeedback("");
    setFirstName("");
    setLastName("");
    setEmail("");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full  max-w-lg mx-auto bg-gray-50 p-8 rounded-lg shadow-md space-y-6">
      <h2 className="text-2xl font-bold text-center">Feedback</h2>

      {/* Feedback Type */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">Feedback Type</label>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="feedbackType"
              value="Comments"
              checked={feedbackType === "Comments"}
              onChange={(e) => setFeedbackType(e.target.value)}
              className="form-radio h-4 w-4 text-indigo-600"
            />
            <span className="ml-2">Comments</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="feedbackType"
              value="Suggestions"
              checked={feedbackType === "Suggestions"}
              onChange={(e) => setFeedbackType(e.target.value)}
              className="form-radio h-4 w-4 text-indigo-600"
            />
            <span className="ml-2">Suggestions</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="feedbackType"
              value="Questions"
              checked={feedbackType === "Questions"}
              onChange={(e) => setFeedbackType(e.target.value)}
              className="form-radio h-4 w-4 text-indigo-600"
            />
            <span className="ml-2">Questions</span>
          </label>
        </div>
      </div>

      {/* Feedback Description */}
      <div>
        <label htmlFor="feedback" className="block text-sm font-medium text-gray-900 mb-2">
          Describe Your Feedback
        </label>
        <textarea
          name="feedback"
          id="feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          rows="4"
          className="block w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Your feedback"
          required
        />
      </div>

      {/* Name Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-900 mb-2">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="block w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="First Name"
            required
          />
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-900 mb-2">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="block w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Last Name"
            required
          />
        </div>
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
          E-mail
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="example@example.com"
          required
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-center">
        <button
          type="submit"
          className="w-full sm:w-auto bg-green-600 hover:bg-green-500 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default Feedback;
