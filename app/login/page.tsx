"use client";
import React from "react";
import AuthForm from "@/components/AuthForm";

export default function login() {
  // State to manage the loading status
  const [isLoading, setIsLoading] = React.useState(false);
  // State to potentially store error messages from the API
  const [error, setError] = React.useState<string | null>(null);

  const [apiFeedback, setApiFeedback] = React.useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  // The actual function to handle form submission
  const handleSubmit = async (formData: Record<string, any>) => {
    console.log("Form submitted:", formData);
    setApiFeedback(null); // Clear previous feedback
    setIsLoading(true);
    setError(null); // Clear previous error message
    try {
      console.log("Submitting form data:", formData);
      // Simulate API call
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Send form data as JSON
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.meessage || "Login failed");
      }
      setApiFeedback({
        message: result.message || "Login successful",
        type: "success",
      });
      console.log("Login API Successfully:", result);
      // TODO: Redirect user, store session/token, etc.
      // Example: router.push('/dashboard');
    } catch (error: any) {
      console.error("Login Failed:", error);
      setApiFeedback({
        message: error.message || "An unexpected error occurred.",
        type: "error",
      });
      setError(error.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };
  return (
    <div className="flex flex-col items-center justify-center pt-10 gap-4">
      <AuthForm
        formType="login"
        onSubmit={handleSubmit}
        isLoading={isLoading}
        // pass feedback state down
        apiFeedbackMessage={apiFeedback?.message}
        apiFeedbackType={apiFeedback?.type}
      />
      {error && <div className="text-red-500 text-sm">{error}</div>}
    </div>
  );
}
