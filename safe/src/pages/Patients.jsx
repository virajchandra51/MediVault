import React, { useState, Fragment, useEffect, useRef } from "react";
import Web3 from "web3";
import Navbar from "../components/Navbar";
import Sidebar2 from "../components/Sidebar2";
import contract from "../contracts/cruds.json";
import { useCookies } from "react-cookie";

const Patients = () => {
    const web3 = new Web3(window.ethereum);
    const mycontract = new web3.eth.Contract(
        contract["abi"],
        contract["networks"]["5777"]["address"]
    );
    const [patients, setPatients] = useState([{}]);
    const [cookies, setCookies] = useCookies();

    useEffect(() => {
        const pats = [];
        async function getPatients() {
            await mycontract.methods
                .getdata()
                .call()
                .then(res => {
                    res.map(data => {
                        data = JSON.parse(data);
                        if (data['type'] === 'patient') {
                            let result = data.hasOwnProperty('selectedDoctors');
                            if (result) {
                                var list = data['selectedDoctors'];
                                for (let j = 0; j < list.length; j++) {
                                    if (list[j] === cookies['mail']) {
                                        pats.push(data);
                                        break;
                                    }
                                }
                            }
                        }
                    })
                })
            setPatients(pats);
        }
        getPatients();
        return;
    }, [patients.length])


    function view(mail) {
        const url = `/patientData/${mail}`
        window.location.href = url;
    }

    async function treated(mail) {
        var accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        var currentaddress = accounts[0];

        const web3 = new Web3(window.ethereum);
        const mycontract = new web3.eth.Contract(contract['abi'], contract['networks']['5777']['address']);
        mycontract.methods.getdata().call()
            .then(res => {
                for (let i = 0; i < res.length; i++) {
                    var d = JSON.parse(res[i]);
                    if (d['type'] === 'patient' && d['mail'] === mail) {
                        var list = d['selectedDoctors'];
                        var newList = [];
                        list.map(j => {
                            if (j !== cookies['mail']) {
                                newList.push(j);
                            }
                        })
                        d['selectedDoctors'] = newList;
                        mycontract.methods.updateData(i, JSON.stringify(d)).send({ from: currentaddress }).then(() => {
                            alert("Patient removed");
                            window.location.reload();
                        }).catch((err) => {
                            console.log(err);
                        })
                    }
                }
            })
    }


    function showPatients() {
        return patients.map((patient) => {
            if (patient.hasOwnProperty('name')) {
                return (
                    <tr>
                        <td>{patient.name}</td>
                        <td>{patient.mail}</td>
                        <td>
                            <input type="button" value="View" onClick={() => view(patient.mail)} />
                        </td>
                        <td>
                            <input type="button" value="Treated" onClick={() => treated(patient.mail)} />
                        </td>
                    </tr>
                )
            }
        })
    }

    return (
        <div className="flex relative dark:bg-main-dark-bg">
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
                <Sidebar2 />
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
                    style={{ display: "flex", flexDirection: "column", padding: "1rem" }}
                >
                    <div style={{ display: "flex", flexDirection: "column", padding: "1rem" }}>
                        <table style={{ borderCollapse: "collapse" }}>
                            <thead>
                                <tr>
                                    <th className="">Name</th>
                                    <th className="">Email</th>
                                    <th className="">Details</th>
                                    <th className="">Treated?</th>
                                </tr>
                            </thead>
                            <tbody>
                                {showPatients()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Patients;
