import React, { useState, Fragment, useEffect } from "react";
import { nanoid } from "nanoid";
import Web3 from "web3";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import contract from "../contracts/contract.json";
import { useCookies } from "react-cookie";
import { create } from 'ipfs-http-client'

const Allergies = () => {
  const web3 = new Web3(window.ethereum);
  const mycontract = new web3.eth.Contract(
    contract["abi"],
    contract["address"]
  );
  const [cookies, setCookie] = useCookies();
  const [allergies, setallergies] = useState([]);

  useEffect(() => {
    const ins = [];
    async function getIns() {
      await mycontract.methods
        .getPatient()
        .call()
        .then(async (res) => {
          for (let i = res.length - 1; i >= 0; i--) {
            if (res[i] === cookies['hash']) {
              const data = await (await fetch(`http://localhost:8080/ipfs/${res[i]}`)).json();
              ins.push(data.allergies);
              break;
            }
          }
        });
      setallergies(ins);
    }
    getIns();
    return;
  }, [allergies.length]);

  const [addFormData, setAddFormData] = useState({
    name: "",
    type: "",
    medication: "",
  });


  const handleAddFormChange = (event) => {
    const newFormData = { ...addFormData };
    newFormData[event.target.name] = event.target.value;
    setAddFormData(newFormData);
  };



  async function submit() {
    var accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    var currentaddress = accounts[0];

    const web3 = new Web3(window.ethereum);
    const mycontract = new web3.eth.Contract(
      contract["abi"],
      contract["address"]
    );

    mycontract.methods
      .getPatient()
      .call()
      .then(async (res) => {
        for (let i = res.length - 1; i >= 0; i--) {
          if (res[i] === cookies['hash']) {
            const data = await (await fetch(`http://localhost:8080/ipfs/${res[i]}`)).json();
            const ins = data.allergies;
            ins.push(addFormData);
            data.allergies = ins;

            let client = create();
            client = create(new URL('http://127.0.0.1:5001'));
            const { cid } = await client.add(JSON.stringify(data));
            const hash = cid['_baseCache'].get('z');

            await mycontract.methods.addPatient(hash).send({ from: currentaddress }).then(() => {
              setCookie('hash', hash);
              alert("Added");
              window.location.reload();
            }).catch((err) => {
              console.log(err);
            })
          }
        }
      });
  }


  async function del(name) {
    var accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    var currentaddress = accounts[0];

    const web3 = new Web3(window.ethereum);
    const mycontract = new web3.eth.Contract(
      contract["abi"],
      contract["address"]
    );

    mycontract.methods.getPatient().call().then(async (res) => {
      for (let i = res.length - 1; i >= 0; i--) {
        if (res[i] === cookies['hash']) {
          const data = await (await fetch(`http://localhost:8080/ipfs/${res[i]}`)).json();
          const alls = data.allergies;
          const newList = [];
          for (let i = 1; i < alls.length; i++) {
            if (alls[i].name === name) {
              continue;
            }
            else {
              newList.push(alls[[i]]);
            }
          }
          data.allergies = newList;

          let client = create();
          client = create(new URL('http://127.0.0.1:5001'));
          const { cid } = await client.add(JSON.stringify(data));
          const hash = cid['_baseCache'].get('z');

          await mycontract.methods.addPatient(hash).send({ from: currentaddress }).then(() => {
            setCookie('hash', hash);
            alert("Deleted");
            window.location.reload();
          }).catch((err) => {
            console.log(err);
          })
        }
      }
    })
  }

  function showAllergies() {
    if (allergies.length > 0) {
      return allergies[0].map(allergy => {
        return (
          <tr>
            <td>{allergy.name}</td>
            <td>{allergy.type}</td>
            <td>{allergy.medication}</td>
            <td>
              <input type="button" value="Delete" onClick={() => del(allergy.name)} />
            </td>
          </tr>
        )
      })
    }
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
        <div
          style={{ display: "flex", flexDirection: "column", padding: "4rem", justifyContent: "center", alignItems: "flex-end", gap: "4rem" }}
        >
          <form style={{ width: "100%" }}>
            <table style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th className="">Name</th>
                  <th className="">Type</th>
                  <th className="">Medication Required</th>
                  <th className="">Actions</th>
                </tr>
              </thead>
              <tbody>
                {showAllergies()}
              </tbody>
            </table>
          </form>

          <form style={{
            display: 'flex', flexDirection: 'column', gap: '1rem',
            backgroundColor: 'rgb(3, 201, 215)',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '24px',
            borderRadius: '20px',
          }}>
            <h2>Add an Allergy</h2>
            <input
              type="text"
              name="name"
              required="required"
              placeholder="Name"
              onChange={handleAddFormChange}
            />
            <input
              type="text"
              name="type"
              required="required"
              placeholder="Type"
              onChange={handleAddFormChange}
            />
            <input
              type="text"
              name="medication"
              required="required"
              placeholder="Medication Required"
              onChange={handleAddFormChange}
            />
            <input type="button" value="Save" onClick={submit} />
          </form>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Allergies;
