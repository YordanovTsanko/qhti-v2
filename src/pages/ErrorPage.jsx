import React from "react";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <img src="404-error-image.png" className="h-44 w-auto" alt="404Error" />
      <h2 className="text-2xl font-bold text-cyan-600 text-center">404 - Страницата не е намерена</h2>
      <p className="mt-1 text-gray-600 text-center">
        Съжаляваме, страницата, която търсите, не съществува или е преместена.
      </p>
    </div>
  );
};

export default ErrorPage;
