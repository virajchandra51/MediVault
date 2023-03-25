import React, { useState, Fragment, useEffect } from "react";
import { nanoid } from "nanoid";
import Web3 from "web3";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import contract from "../contracts/cruds.json";
import { useCookies } from "react-cookie";

const Insurance = () => {
  const web3 = new Web3(window.ethereum);
  const mycontract = new web3.eth.Contract(
    contract["abi"],
    contract["networks"]["5777"]["address"]
  );
  const [cookies, setCookie] = useCookies();
  const [insurances, setInsurance] = useState([{}]);

  useEffect(() => {
    const ins = [];
    async function getInsurances() {
      await mycontract.methods
        .getdata()
        .call()
        .then(res => {
          for (let i = 0; i < res.length; i++) {
            var data = JSON.parse(res[i]);
            if (data["type"] === "patient" && data['mail'] === cookies['mail']) {
              if (data.hasOwnProperty('insurance')) {
                for (let i = 0; i < data['insurance'].length; i++) {
                  // console.log(data['insurance'][i]);
                  if (data['insurance'][i].hasOwnProperty('company')) {
                    ins.push(data['insurance'][i]);
                  }
                }
                break;
              }
            }
          }
        })
        setInsurance(ins);
    }
    getInsurances();
    return;
  }, [insurances.length])


  const [addFormData, setAddFormData] = useState({
    company: "",
    policyNo: "",
    expiry: "",
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
    mycontract.methods
      .getdata()
      .call()
      .then((res) => {
        for (let i = 0; i < res.length; i++) {
          var data = JSON.parse(res[i]);
          if (data["mail"] === cookies["mail"]) {
            data["insurance"].push(addFormData);

            mycontract.methods
              .updateData(parseInt(cookies["index"]), JSON.stringify(data))
              .send({ from: currentaddress })
              .then(() => {
                alert("Insurance Saved");
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


  async function del(policy) {
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
          var list = data['insurance'];
          var updateList = []

          for (let i = 0; i < list.length; i++) {
            if (list[i]['policyNo'] !== policy) {
              updateList.push(list[i]);
            }
          }

          data['insurance'] = updateList;

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
                  <th className="">Policy Number</th>
                  <th className="">Company</th>
                  <th className="">Expiry</th>
                  <th className="">Actions</th>
                </tr>
              </thead>
              <tbody>
                {insurances.map((ins) => (
                  <tr>
                    <td>{ins.policyNo}</td>
                    <td>{ins.company}</td>
                    <td>{ins.expiry}</td>
                    <td>
                      <input type="button" value="Delete" onClick={() => del(ins.policyNo)} />
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
            <h2>Add an Insurance</h2>
            <input
              type="text"
              name="company"
              required="required"
              placeholder="Company"
              onChange={handleAddFormChange}
            />
            <input
              type="text"
              name="policyNo"
              required="required"
              placeholder="Policy No."
              onChange={handleAddFormChange}
            />
            <input
              type="text"
              name="expiry"
              required="required"
              placeholder="Expiry Date"
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

export default Insurance;
