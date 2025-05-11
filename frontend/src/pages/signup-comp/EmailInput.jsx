import React, { useState } from "react";

const EmailInput = ({ email, setEmail, onValidationChange }) => {
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState(null);
  const [validationError, setValidationError] = useState("");

  const validateEmail = async (emailToValidate) => {
    if (!emailToValidate) return;

    // Only validate when there's an actual email to check
    if (emailToValidate.includes("@") && emailToValidate.includes(".")) {
      setIsValidating(true);
      setValidationError("");

      try {

        // Use environment variable instead of hardcoded API key
        // const apiKey = process.env.REACT_APP_ABSTRACT_API_KEY;
        const apiKey = import.meta.env.VITE_ABSTRACT_API_KEY;
        const response = await fetch(
          `https://emailvalidation.abstractapi.com/v1/?api_key=${apiKey}&email=${encodeURIComponent(
            emailToValidate
          )}`
        );

        const data = await response.json();
        setValidationResult(data);

        // Check validation results
        if (!data.is_valid_format) {
          setValidationError("Invalid email format");
          onValidationChange(false);
        } else if (data.is_disposable_email && data.is_disposable_email.value) {
          setValidationError("Please don't use a disposable email");
          onValidationChange(false);
        } else if (data.deliverability === "UNDELIVERABLE") {
          setValidationError("This email appears to be undeliverable");
          onValidationChange(false);
        } else {
          setValidationError("");
          onValidationChange(true);
        }
      } catch (error) {
        console.error("Email validation error:", error);
        setValidationError("Couldn't validate email at this time");
        // Don't block submission on API failure
        onValidationChange(true);
      } finally {
        setIsValidating(false);
      }
    }
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    // Clear validation when typing
    if (validationResult) {
      setValidationResult(null);
      setValidationError("");
    }
  };

  const handleBlur = () => {
    validateEmail(email);
  };

  return (
    <div>
      <label className="block text-gray-700 text-sm font-medium mb-1">
        Email Address
      </label>
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
        </span>
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={handleEmailChange}
          onBlur={handleBlur}
          required
          className={`w-full pl-10 pr-10 py-3 border ${
            validationError ? "border-red-500" : "border-gray-300"
          } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-white`}
        />
        {isValidating && (
          <span className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <svg
              className="animate-spin h-5 w-5 text-indigo-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </span>
        )}
        {validationResult && !validationError && !isValidating && (
          <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-green-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        )}
      </div>
      {validationError && (
        <p className="text-xs text-red-500 mt-1">{validationError}</p>
      )}
    </div>
  );
};

export default EmailInput;
