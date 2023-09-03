import React from "react";
import "./success.css";

const Success = () => {
  const numberWithCommas = (x) => {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
    return x;
  };

  const amount = localStorage.getItem("amount");
  return (
    <div className="success">
      <h1>Congratulations!</h1>
      <p>
        Loan amount of <strong>Rs. {numberWithCommas(amount)}</strong> has been
        approved.{" "}
      </p>
    </div>
  );
};

export default Success;
