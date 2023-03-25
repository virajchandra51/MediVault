import React, { useState, Fragment, useEffect } from "react";
import { nanoid } from "nanoid";
import Web3 from "web3";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import contract from "../contracts/contract.json";
import { useCookies } from "react-cookie";

const Allergies = () => {
  const web3 = new Web3(window.ethereum);
  const mycontract = new web3.eth.Contract(
    contract["abi"],
    contract["networks"]["5777"]["address"]
  );
  const [cookies, setCookie] = useCookies();
  const [allergies, setallergies] = useState([{}]);

  useEffect(() => {
    const all = [];
    async function getallergies() {
      await mycontract.methods
        .getdata()
        .call()
        .then(res => {
          for (let i = 0; i < res.length; i++) {
            var data = JSON.parse(res[i]);
            if (data["type"] === "patient" && data['mail'] === cookies['mail']) {
              if (data.hasOwnProperty('allergies')) {
                console.log(data['allergies']);
                for (let i = 0; i < data['allergies'].length; i++) {
                  if (data['allergies'][i].hasOwnProperty('name')) {
                    all.push(data['allergies'][i]);
                  }
                }
                break;
              }
            }
          }
        })
        setallergies(all);
    }
    getallergies();
    return;
  }, [allergies.length])

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
      contract["networks"]["5777"]["address"]
    );

    mycontract.methods
      .getdata()
      .call()
      .then((res) => {
        for (let i = 0; i < res.length; i++) {
          var data = JSON.parse(res[i]);
          if (data["mail"] === cookies["mail"]) {
            data["allergies"].push(addFormData);

            mycontract.methods
              .updateData(parseInt(cookies["index"]), JSON.stringify(data))
              .send({ from: currentaddress })
              .then(() => {
                alert("Allgery Saved");
                window.location.reload();
              })
              .catch((err) => {
                console.log(err);
              });

            break;
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
      contract["networks"]["5777"]["address"]
    );

    mycontract.methods.getdata().call().then(res => {
      res.map(data => {
        data = JSON.parse(data);
        if (data['type'] === 'patient' && data['mail'] === cookies['mail']) {
          var list = data['allergies'];
          var updateList = []

          for (let i = 0; i < list.length; i++) {
            if (list[i]['name'] !== name) {
              updateList.push(list[i]);
            }
          }

          data['allergies'] = updateList;

          mycontract.methods.updateData(cookies['index'], JSON.stringify(data))
            .send({ from: currentaddress })
            .then(() => {
              alert("Removed");
              window.location.reload();
            })
            .catch((err) => {
              console.log(err);
            });
          return;
        }
      })
    })
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
                {allergies.map((allergy) => (
                  <tr>
                    <td>{allergy.name}</td>
                    <td>{allergy.type}</td>
                    <td>{allergy.medication}</td>
                    <td>
                      <input type="button" value="Delete" onClick={() => del(allergy.name)} />
                    </td>
                  </tr>
                ))}
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
