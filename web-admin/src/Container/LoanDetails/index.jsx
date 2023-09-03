import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FETCH_BALANCE_SHEET, REQUEST_DECISION } from "../../constants/url";
import Loader from "../../Components/Loader";

const LoanDetails = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    yearEstablished: "",
    loanAmount: 0,
    type: "",
    accountingProvider: "",
  });
  const [showError, setShowError] = useState({
    name: "",
    yearEstablished: "",
    loanAmount: "",
    type: "",
    accountingProvider: "",
  });
  const [loading, setLoading] = useState(false);
  const [balanceSheet, setBalanceSheet] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setShowError({ ...showError, [name]: "" });
    setFormValues({ ...formValues, [name]: value });
  };

  const submitHandler = () => {
    if (formValues.name === "") {
      setShowError({ ...showError, name: "Business Name Required" });
    } else if (formValues.yearEstablished === "") {
      setShowError({
        ...showError,
        yearEstablished: "Year of Establishment Required",
      });
    } else if (formValues.loanAmount === "") {
      setShowError({
        ...showError,
        loanAmount: "Loan Amount Required",
      });
    } else if (+formValues.loanAmount === 0) {
      setShowError({
        ...showError,
        loanAmount: "Loan amount must be greater than 0",
      });
    } else if (formValues.type === "") {
      setShowError({
        ...showError,
        type: "Business Type Required",
      });
    } else if (formValues.accountingProvider === "") {
      setShowError({
        ...showError,
        accountingProvider: "Accounting Provider Required",
      });
    } else {
      setLoading(true);
      fetchBalanceSheet();
    }
  };

  const fetchBalanceSheet = async () => {
    const response = await axios.post(
      `${FETCH_BALANCE_SHEET}/${id}`,
      formValues
    );
    if (response.status === 200) {
      const { data } = response;
      const {
        name,
        yearEstablished,
        loanAmount,
        type,
        accountingProvider,
        balanceSheet,
      } = data;
      setFormValues({
        name,
        yearEstablished,
        loanAmount,
        type,
        accountingProvider,
      });
      setBalanceSheet(balanceSheet);
      setLoading(false);
    }
  };

  const requestDecisionHandler = async () => {
    const payload = {
      name: formValues?.name,
      yearEstablished: formValues?.yearEstablished,
      loanAmount: formValues?.loanAmount,
      balanceSheet,
    };
    const response = await axios.post(REQUEST_DECISION, payload);
    if (response.status === 200) {
      const { data } = response;
      localStorage.setItem("amount", data?.approvedLoan);
      navigate("/success");
    }
  };

  return loading ? (
    <Loader msg="Fetching balance sheet..." />
  ) : (
    <div className="loan-details-wrapper">
      <div className="container">
        <div className="business-details">
          <h2>Business Details</h2>
          <h4>
            Please fill all the details and submit to fetch the balance sheet
            for the last 12 months
          </h4>
          <div className="row">
            <div className="col-md-4">
              <div class="form-group">
                <label for="name">
                  Name <span>*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  className={
                    showError?.name !== ""
                      ? "form-control border-red"
                      : "form-control"
                  }
                  value={formValues?.name}
                  name="name"
                  onChange={handleChange}
                />
                {showError?.name !== "" && <p>{showError?.name}</p>}
              </div>
            </div>
            <div className="col-md-4">
              <div class="form-group">
                <label for="year">
                  Year of Establishment <span>*</span>
                </label>
                <select
                  id="year"
                  className={
                    showError?.yearEstablished !== ""
                      ? "form-select border-red"
                      : "form-select"
                  }
                  value={formValues?.yearEstablished}
                  name="yearEstablished"
                  onChange={handleChange}
                >
                  <option value="">Select Year</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                </select>
                {showError?.yearEstablished !== "" && (
                  <p>{showError?.yearEstablished}</p>
                )}
              </div>
            </div>
            <div className="col-md-4">
              <div class="form-group">
                <label for="loanAmount">
                  Loan Amount <span>*</span>
                </label>
                <input
                  type="number"
                  id="loanAmount"
                  className={
                    showError?.loanAmount !== ""
                      ? "form-control border-red"
                      : "form-control"
                  }
                  value={formValues?.loanAmount}
                  name="loanAmount"
                  onChange={handleChange}
                />
                {showError?.loanAmount !== "" && <p>{showError?.loanAmount}</p>}
              </div>
            </div>
            <div className="col-md-4">
              <div class="form-group">
                <label for="type">
                  Type of Business <span>*</span>
                </label>
                <select
                  id="type"
                  className={
                    showError?.type !== ""
                      ? "form-select border-red"
                      : "form-select"
                  }
                  value={formValues?.type}
                  name="type"
                  onChange={handleChange}
                >
                  <option value="">Select Type of Business</option>
                  <option value="Agriculture">Agriculture</option>
                  <option value="FinTech">FinTech</option>
                  <option value="Retail">Retail</option>
                  <option value="Wholesale">Wholesale</option>
                </select>
                {showError?.type !== "" && <p>{showError?.type}</p>}
              </div>
            </div>
            <div className="col-md-4">
              <div class="form-group">
                <label for="provider">
                  Accounting Provider <span>*</span>
                </label>
                <select
                  id="provider"
                  className={
                    showError?.accountingProvider !== ""
                      ? "form-select border-red"
                      : "form-select"
                  }
                  value={formValues?.accountingProvider}
                  name="accountingProvider"
                  onChange={handleChange}
                >
                  <option value="">Select Provider</option>
                  <option value="Xero">Xero</option>
                  <option value="MYOB">MYOB</option>
                </select>
                {showError?.accountingProvider !== "" && (
                  <p>{showError?.accountingProvider}</p>
                )}
              </div>
            </div>
          </div>

          <button
            className="btn primary-btn submit-btn"
            onClick={submitHandler}
          >
            Submit
          </button>
        </div>
        {balanceSheet && (
          <div className="balance-sheet-wrapper">
            <h2>Balance Sheet</h2>
            <table className="table table-striped">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Serial No</th>
                  <th scope="col">Year</th>
                  <th scope="col">Month</th>
                  <th scope="col">Profit Or Loss</th>
                  <th scope="col">Assets Value</th>
                </tr>
              </thead>
              <tbody>
                {balanceSheet.map((item, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{item.year}</td>
                      <td>{item.month}</td>
                      <td>{item.profitOrLoss}</td>
                      <td>{item.assetsValue}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <button
              className="btn primary-btn decision-btn"
              onClick={requestDecisionHandler}
            >
              Request Decision
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoanDetails;
