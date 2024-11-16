import React from "react";

const Thankyou = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold text-darkBlue mb-4">Thank You!</h1>
        <p className="text-lg text-darkBlue mb-4">
          Your order has been received and is waiting for payment confirmation.
        </p>
        <p className="text-darkBlue mb-4">
          After completing the payment, please send the payment slip to{" "}
          <a
            href="mailto:order@petfinderfoundation.com"
            className="text-blue-600 underline hover:text-blue-800">
            order@petfinderfoundation.com
          </a>{" "}
          along with your pet's name and the order details.
        </p>
        <p className="text-darkBlue">We appreciate your business!</p>
      </div>
    </div>
  );
};

export default Thankyou;
