import React, { useContext, useState } from "react";

import Header from "../components/Header";
import "./home.css";
import mon from "../assets/mon.png";
import EthereumContext from "../EthereumContext";
import { contractAddress, abi } from ".././contractDetails";
import { ethers } from "ethers";

const Home = () => {
  const { account, contract } = useContext(EthereumContext);
  const [inputValue, setInputValue] = useState("");

  const callContractFunction = async () => {
    //connectToMetaMask()

    if (contract) {
      console.log("entered");

      try {
        // Call a function on the contract
        const tokenAddress = "0x64DE202c43c0C2F666222E8bF327eA1f280d9948";

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const amount = parseInt(inputValue);

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
          const tx = await contract.stake(amount); // Assuming the function to stake tokens is named 'stake' and takes the amount as a parameter
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
    }
    // else{

    //   if (window.ethereum) {
    //     try {

    //       const provider = new ethers.BrowserProvider(window.ethereum);

    //       const acc = await provider.listAccounts();

    //       const signer = await provider.getSigner();
    //       console.log(signer);
    //       console.log(abi);
    //       console.log(contractAddress)
    //       // Create a contract instance
    //       const contrac = new ethers.Contract(contractAddress, abi, signer);
    //       console.log(contrac)

    //       try {
    //         // Call a function on the contract
    //         console.log(contrac)
    //         console.log(account)
    //         const result = await contrac.getStakerInfo(acc[0]);

    //        // const result = await contract.functionName(); // Replace with your contract's function name
    //         console.log("Function Result:", result);
    //       } catch (error) {
    //         console.error("Error calling contract function:", error);
    //       }
    //       console.log("over here")

    //       alert("connected to the metamask");
    //     } catch (error) {
    //       console.error("Error connecting to MetaMask:", error);
    //     }
    //   } else {
    //     console.error("MetaMask not found");
    //   }

    // }
  };
  const unstakeTokens = async () => {
    if (contract) {
      // Replace with your staking contract address and ABI

      // Call the unstake function on the contract
      try {
        const tx = await contract.unstake(); // Assuming the function to unstake tokens is named 'unstake' and doesn’t require any parameters
        console.log("Unstaking initiated, transaction hash:", tx.hash);
        await tx.wait();
        console.log("Unstaking confirmed");
      } catch (error) {
        console.error("Error occurred:", error);
      }
    } else {
      console.error("Please connect to MetaMask");
    }
  };

  const claimTokens = async () => {
    if (contract) {
      // Replace with your staking contract address and ABI

      // Call the unstake function on the contract
      try {
        const tx = await contract.claimRewards(); // Assuming the function to unstake tokens is named 'unstake' and doesn’t require any parameters
        console.log("Unstaking initiated, transaction hash:", tx.hash);
        await tx.wait();
        console.log("Unstaking confirmed");
      } catch (error) {
        console.error("Error occurred:", error);
      }
    } else {
      console.error("Please connect to MetaMask");
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
                    <div>My Funds</div>
                    <br />
                    <br />
                    <div>WMatic Staked</div>
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
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />

                  <br />
                  <br />
                  <br />

                  <p>
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
                    <div>Unclaimed Rewards</div>
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

                  <p>
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

{
  /* <div className="">
       
      <div className="card">
        <h2>109.32%</h2>
        <p>%APY</p>
        <div className="icon"><img src="path_to_your_icon.png" alt="icon" /></div>
        <h3>My Funds</h3>
        <p>WMatic Staked</p>
        <h4>0.0000 WMatic</h4>
        <p>Available: 55.762366 WMatic</p>
        <button>Stake</button>
        <button>Unstake</button>
      </div>

      <div className="card">
        <h2>4,486,272 WMatic</h2>
        <p>Total WMatic Staked</p>
        <h2>$328,000.00</h2>
        <p>Staked Value</p>
        <div className="icon"><img src="path_to_your_icon.png" alt="icon" /></div>
        <h3>My Rewards</h3>
        <p>Unclaimed Rewards</p>
        <h4>0.0000 WMatic</h4>
        <p>Total Rewards Claimed: 1.9803 WMatic 🚀</p>
        <button>Claim Rewards</button>
      </div>
    </div> */
}
