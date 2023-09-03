import React, { useState } from "react";
import axios from "axios";
import { START_APPLICATION } from "../../constants/url";
import { useNavigate } from "react-router-dom";
import Loader from "../../Components/Loader";

const LandingPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const startApplicationHandler = async () => {
    setLoading(true);
    const response = await axios.get(START_APPLICATION);
    if (response.status === 201) {
      const id = response?.data?.applicationId;
      navigate(`/loan-details/${id}`);
    }
  };

  return loading ? (
    <Loader msg="loading..." />
  ) : (
    <div className="landing-wrapper">
      <div className="row">
        <div className="col-md-6 landing-card left d-none d-md-block"></div>
        <div className="col-md-6 landing-card right">
          <h1>Welcome!</h1>
          <p>Please click here to initiate the loan application.</p>
          <button className="btn primary-btn" onClick={startApplicationHandler}>
            Start
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
