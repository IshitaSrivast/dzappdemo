import React, { useContext, useState } from "react";

import Header from "../components/Header";
import "./home.css";
import mon from "../assets/mon.png";
import EthereumContext from "../EthereumContext";
import { contractAddress, abi } from ".././contractDetails";
import { ethers } from "ethers";

const Home = () => {
  //const { account, contract } = useContext(EthereumContext);
  const [inputValue, setInputValue] = useState("");

  const callContractFunction = async () => {
    //connectToMetaMask()

    console.log("entered");

    try {
      // Call a function on the contract
      const tokenAddress = "0x64DE202c43c0C2F666222E8bF327eA1f280d9948";

      const provider = new ethers.BrowserProvider(window.ethereum);

      provider.listAccounts().then((accounts) => {
        if (accounts.length === 0) {
          alert("Please connect Metamask first");
          return;
        }
      });

      const signer = await provider.getSigner();
      const amount = parseInt(inputValue);
      const contract = new ethers.Contract(contractAddress, abi, signer);

      const tokenContract = new ethers.Contract(
        tokenAddress,
        [
          "function approve(address spender, uint256 amount) external returns (bool)",
        ],
        signer
      );
      const approveTx = await tokenContract.approve(contractAddress, amount);
      await approveTx.wait();
      console.log(approveTx);

      try {
        // Assuming 'amount' is already defined and correctly formatted
        const emptyPermit = "0x"; // An empty bytes array
        const tx = await contract.stake(amount, emptyPermit);
        console.log("Staking initiated, transaction hash:", tx.hash);
        await tx.wait();
        console.log("Staking confirmed");
      } catch (error) {
        console.error("Error occurred:", error);
      }
    } catch (error) {
      console.error("Error calling contract function:", error);
    }
    console.log("over here");

  };
  const unstakeTokens = async () => {
    // Initialize provider and signer
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = provider.getSigner();
  
    // Initialize contract
    const contract = new ethers.Contract(contractAddress, abi, signer);
  
    try {
      // Call the unstake function on the contract
      const tx = await contract.unstake();
      console.log("Unstaking initiated, transaction hash:", tx.hash);
  
      // Wait for transaction confirmation
      const receipt = await tx.wait();
      console.log("Unstaking confirmed, status:", receipt.status);
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };
  
  

  const claimTokens = async () => {
    // Replace with your staking contract address and ABI

    // Call the unstake function on the contract
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const amount = parseInt(inputValue);
    const contract = new ethers.Contract(contractAddress, abi, signer);

    try {
      const tx = await contract.claimRewards(); // Assuming the function to unstake tokens is named 'unstake' and doesn’t require any parameters
      console.log("Unstaking initiated, transaction hash:", tx.hash);
      await tx.wait();
      console.log("Unstaking confirmed");
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  return (
    <>
      <Header />
      <div style={{ backgroundColor: "black", height: "920px", width: "100" }}>
        <div className="inner-box">
          <div className="inner-box-w">
            <div className="inner-box-1">
              <div className="stack-data">
                <div
                  style={{
                    color: "#white",
                  }}
                >
                  {localStorage.getItem("apy")
                    ? localStorage.getItem("apy")
                    : 0.0}
                </div>
                <div
                  style={{
                    color: "#6e42e5",
                  }}
                >
                  {" "}
                  %APY
                </div>
              </div>
              <div className="stack-data">
                <div
                  style={{
                    color: "#white",
                  }}
                >
                  {localStorage.getItem("stakedTot")
                    ? localStorage.getItem("stakedTot")
                    : 0}
                </div>
                <div
                  style={{
                    color: "#6e42e5",
                  }}
                >
                  {" "}
                  Total WMatic Staked
                </div>
              </div>
              <div className="stack-data">
                <div
                  style={{
                    color: "#white",
                  }}
                >
                  {localStorage.getItem("stakedTot")
                    ? parseInt(localStorage.getItem("stakedTot"))
                    : 0}
                </div>
                <div
                  style={{
                    color: "#6e42e5",
                  }}
                >
                  {" "}
                  Staked Value
                </div>
              </div>
            </div>
            <div className="inner-box-2">
              <div className="inner-box-3">
                <div className="card">
                  <div className="icon">
                    <img style={{ borderRadius: "50%" }} src={mon} alt="icon" />
                  </div>

                  <div className="card-inner">
                    <br />
                    <div style={{ fontSize: "24px" }}>My Funds</div>
                    <br />

                    <div style={{ color: "gray" }}>WMatic Staked</div>
                    <br />
                    <div>
                      {localStorage.getItem("staked")
                        ? localStorage.getItem("staked")
                        : 0}
                    </div>
                  </div>
                  <br />
                  <input
                    type="text"
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      borderRadius: "5px",
                      border: "none",
                      height: "27px",
                      width: "35%",
                    }}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />

                  <br />
                  <br />
                  <br />

                  <p style={{ color: "gray" }}>
                    Available:{" "}
                    {localStorage.getItem("balance")
                      ? localStorage.getItem("balance")
                      : 0}{" "}
                    WMatic
                  </p>

                  <button className="button-sec" onClick={callContractFunction}>
                    Stake
                  </button>
                  <br />
                  <button className="button-sec" onClick={unstakeTokens}>
                    Unstake
                  </button>
                </div>
              </div>
              <div className="inner-box-3">
                <div className="card">
                  <div className="icon">
                    <img style={{ borderRadius: "50%" }} src={mon} alt="icon" />
                  </div>

                  <div className="card-inner">
                    <br />
                    <div>My Rewards</div>
                    <br />
                    <br />
                    <div style={{ color: "gray" }}>Unclaimed Rewards</div>
                    <br />
                    <div>
                      {localStorage.getItem("unclaimed")
                        ? localStorage.getItem("unclaimed")
                        : 0}{" "}
                      WMatic
                    </div>
                  </div>

                  <br />
                  <br />
                  <br />

                  <p style={{ color: "gray" }}>
                    Total Rewards Claimed:{" "}
                    {localStorage.getItem("claimed")
                      ? localStorage.getItem("claimed")
                      : 0}{" "}
                    WMatic
                  </p>

                  <button className="button-sec" onClick={claimTokens}>
                    Claim
                  </button>
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
