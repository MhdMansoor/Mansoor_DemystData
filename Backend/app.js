const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { fetchBalanceSheet } = require("./services/accountingProvider");
const { decisionEngine } = require("./services/decisionEngine");
const { v1: uuidv1 } = require("uuid");
const app = express();

app.use(cors());

app.use(bodyParser.json());

const totalBusinessApplications = [];

app.get("/api/initiate", (req, res) => {
  try {
    const applicationId = uuidv1();

    totalBusinessApplications.push({ applicationId: applicationId });

    console.log("check");

    res.status(201).json({
      msg: "Loan Application initiated successfully",
      applicationId: applicationId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal servor error" });
  }
});

app.post("/api/balanceSheet/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { name, yearEstablished, loanAmount, type, accountingProvider } =
      req.body;

    const businessApplication = totalBusinessApplications.find(
      (item) => item.applicationId == id
    );

    if (!businessApplication) {
      return res.status(404).json({ msg: "Business not found" });
    }

    const balanceSheet = await fetchBalanceSheet();

    businessApplication.name = name;
    businessApplication.yearEstablished = yearEstablished;
    businessApplication.loanAmount = loanAmount;
    businessApplication.type = type;
    businessApplication.accountingProvider = accountingProvider;
    businessApplication.balanceSheet = balanceSheet;

    res.status(200).json({
      ...businessApplication,
      msg: "Balance Sheet Fetched Successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/request_decision", async (req, res) => {
  try {
    const { name, yearEstablished, loanAmount, balanceSheet } = req.body;

    const last12Months = balanceSheet.slice(0, 12);

    const totalAssetValue = last12Months.reduce(
      (total, entry) => total + entry.assetsValue,
      0
    );
    const averageAssetValue = totalAssetValue / last12Months.length;

    const totalProfitOrLoss = last12Months.reduce(
      (total, entry) => total + entry.profitOrLoss,
      0
    );

    const hasProfit = totalProfitOrLoss > 0;
    let preAssessment = "20";
    if (hasProfit) {
      if (averageAssetValue > loanAmount) {
        preAssessment = "100";
      } else {
        preAssessment = "60";
      }
    }
    let params = {
      name,
      yearEstablished,
      loanAmount,
      preAssessment: preAssessment,
    };
    const decisionResponse = await decisionEngine(params);
    return res.status(200).json({
      approvedLoan: decisionResponse,
      msg: "Loan approved successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
