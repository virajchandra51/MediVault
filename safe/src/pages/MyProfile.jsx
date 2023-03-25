import React from "react";
import { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { useCookies } from 'react-cookie';
import Web3 from "web3";
import contract from '../contracts/contract.json';

const MyProfile = () => {
  const web3 = new Web3(window.ethereum);
  const mycontract = new web3.eth.Contract(
    contract["abi"],
    contract["address"]
  );
  const [cookies, setCookie] = useCookies();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  useEffect(() => {
    const hash = cookies['hash'];
    fetch(`http://localhost:8080/ipfs/${hash}`)
      .then(res => res.json())
      .then(res => {
        setName(res.name);
        setEmail(res.mail);
        setPassword(res.password);
      })
  })

  const [auth, setAuth] = useState({
    "type": "user",
    "name": name,
    "mail": email,
    "password": password
  })

  const [disabled1, setDisabled1] = useState(true);

  function handleGameClick1() {
    setDisabled1(!disabled1);
  }
  const [disabled2, setDisabled2] = useState(true);

  function handleGameClick2() {
    setDisabled2(!disabled2);
  }
  const [disabled3, setDisabled3] = useState(true);

  function handleGameClick3() {
    setDisabled3(!disabled3);
  }

  async function save() {

  }

  async function show() {

  }

  return (
    <div className="flex relative dark:bg-main-dark-bg">
      <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
        <Sidebar />
      </div>

      <div
        className={
          "dark:bg-main-dark-bg  bg-main-bg min-h-screen ml-72 w-full  "
        }
      >
        <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
          <Navbar />
        </div>
        <div className="flex justify-center m-10 ">
          <form className=" p-5 bg-slate-100 rounded-lg">
            <h1 className="text-center text-lg">User Profile</h1>


            <div className="py-2">
              <label className="text-black">
                Name:
                <input
                  id="inp"
                  style={{ padding: "10px", margin: "10px", color: "black" }}
                  name="email"
                  type="email"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  disabled={disabled1}
                  required />
              </label>
              <input type="button" value="✎" className="text-2xl hover:text-blue-400 cursor-pointer" onClick={handleGameClick1}></input>
            </div>

            <div className="py-2">
              <label className="text-black">
                Email:
                <input
                  id="inp"
                  style={{ padding: "10px", margin: "10px" }}
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={disabled2}
                  required />
              </label>
              <input type="button" value="✎" className="text-2xl hover:text-blue-400 cursor-pointer" onClick={handleGameClick2}></input>
            </div>



            <div className="py-2">
              <label className="text-black">
                Password:
                <input
                  style={{ padding: "10px", margin: "10px" }}
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={disabled3}
                  required />
              </label >
              <input type="button" value="✎" className="text-2xl hover:text-blue-400 cursor-pointer" onClick={handleGameClick3}></input>
            </div>

            <div className="py-2">
              <input type="button" value="Save" onClick={save} className="bg-cyan-400 text-white font-medium p-3" />
            </div>

          </form>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default MyProfile;
