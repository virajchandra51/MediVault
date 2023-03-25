import React, { useState, Fragment, useEffect, useRef } from "react";
import Web3 from "web3";
import Navbar from "../components/Navbar";
import Sidebar2 from "../components/Sidebar2";
import contract from "../contracts/contract.json";
import { useCookies } from "react-cookie";
import { create } from 'ipfs-http-client'

const Patients = () => {
    const web3 = new Web3(window.ethereum);
    const mycontract = new web3.eth.Contract(
        contract["abi"],
        contract["address"]
    );
    const [patients, setPatients] = useState([]);
    const [cookies, setCookies] = useCookies();

    useEffect(() => {
        async function getPatients() {
            const pat = [];
            const vis = [];
            await mycontract.methods
                .getPatient()
                .call()
                .then(async (res) => {
                    console.log(res);
                    for (let i = res.length - 1; i >= 0; i--) {
                        const data = await (await fetch(`http://localhost:8080/ipfs/${res[i]}`)).json()
                        const selected = data.selectedDoctors;
                        if (!vis.includes(data.mail)) {
                            vis.push(data.mail);
                            for (let j = 1; j < selected.length; j++) {
                                if (selected[j] === cookies['hash']) {
                                    let flag = 0;
                                    for (let k = 0; k < pat.length; k++) {
                                        if (pat[k].mail === data.mail) {
                                            flag = 1;
                                            break;
                                        }
                                    }
                                    if (flag === 0) {
                                        data['hash'] = res[i];
                                        pat.push(data);
                                    }
                                }
                            }
                        }
                    }
                })
            setPatients(pat);
        }
        getPatients();
        return;
    }, [patients.length]);


    function view(phash) {
        const url = `/patientData/${phash}`
        window.location.href = url;
    }

    async function treated(phash) {
        var accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        var currentaddress = accounts[0];

        const web3 = new Web3(window.ethereum);
        const mycontract = new web3.eth.Contract(contract['abi'], contract['address']);

        const data = await (await fetch(`http://localhost:8080/ipfs/${phash}`)).json();
        const drs = data.selectedDoctors;
        const newList = [];

        for (let i = 1; i < drs.length; i++) {
            if (drs[i] === cookies['hash']) {
                continue;
            }
            else {
                newList.push(drs[i]);
            }
        }

        data.selectedDoctors = newList;

        let client = create();
        client = create(new URL('http://127.0.0.1:5001'));
        const { cid } = await client.add(JSON.stringify(data));
        const hash = cid['_baseCache'].get('z');

        await mycontract.methods.addPatient(hash).send({ from: currentaddress }).then(() => {
            alert("Patient Removed");
            window.location.reload();
        }).catch((err) => {
            console.log(err);
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
                            <input type="button" value="View" onClick={() => view(patient.hash)} />
                        </td>
                        <td>
                            <input type="button" value="Treated" onClick={() => treated(patient.hash)} />
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
