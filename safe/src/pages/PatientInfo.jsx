import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";

import Navbar from "../components/Navbar";
import Sidebar2 from "../components/Sidebar2";
import Footer from "../components/Footer";
import contract from "../contracts/contract.json";
import Web3 from "web3";

const PatientInfo = () => {
    const { phash } = useParams();
    const [patient, setPatient] = useState([]);
    const web3 = new Web3(window.ethereum);
    const mycontract = new web3.eth.Contract(
        contract["abi"],
        contract["address"]
    );

    useEffect(() => {
        const pat = [];
        async function getPatient() {
            const data = await (await fetch(`http://localhost:8080/ipfs/${phash}`)).json();
            pat.push(data);
            setPatient(pat);
        }
        getPatient();
        return;
    }, [patient.length])

    function showInsurance() {
        if (patient.length > 0) {
            return patient[0]['insurance'].map((d) => {
                if (d.hasOwnProperty('company')) {
                    return (
                        <tr>
                            <td>{d.company}</td>
                            <td>{d.policyNo}</td>
                            <td>{d.expiry}</td>
                        </tr>
                    )
                }
            })
        }
    }

    function showAllergies() {
        if (patient.length > 0) {
            return patient[0]['allergies'].map((d) => {
                if (d.hasOwnProperty('name')) {
                    return (
                        <tr>
                            <td>{d.name}</td>
                            <td>{d.type}</td>
                            <td>{d.medication}</td>
                        </tr>
                    )
                }
            })
        }
    }

    function showMedHistory() {
        if (patient.length > 0) {
            return patient[0]['medicalhistory'].map((d) => {
                if (d.hasOwnProperty('disease')) {
                    return (
                        <tr>
                            <td>{d.disease}</td>
                            <td>{d.time}</td>
                            <td>{d.solved}</td>
                        </tr>
                    )
                }
            })
        }
    }

    function showHospHistory() {
        if (patient.length > 0) {
            return patient[0]['hospitalizationhistory'].map((d) => {
                if (d.hasOwnProperty('datefrom')) {
                    return (
                        <tr>
                            <td>{d.datefrom}</td>
                            <td>{d.dateto}</td>
                            <td>{d.reason}</td>
                            <td>{d.surgery}</td>
                        </tr>
                    )
                }
            })
        }
    }

    function showCheckUpHistory() {
        if (patient.length > 0) {
            return patient[0]['visit'].map((d) => {
                if (d.hasOwnProperty('name')) {
                    return (
                        <tr>
                            <td>{d.name}</td>
                            <td>{d.date}</td>
                            <td>{d.reason}</td>
                        </tr>
                    )
                }
            })
        }
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
                        <h1 style={{ fontSize: '2rem' }}>Insurance</h1>
                        <table style={{ borderCollapse: "collapse" }}>
                            <thead>
                                <tr>
                                    <th className="">Company</th>
                                    <th className="">Policy No.</th>
                                    <th className="">Expiry</th>
                                </tr>
                            </thead>
                            <tbody>
                                {showInsurance()}
                            </tbody>
                        </table>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", padding: "1rem" }}>
                        <h1 style={{ fontSize: '2rem' }}>Allergies</h1>
                        <table style={{ borderCollapse: "collapse" }}>
                            <thead>
                                <tr>
                                    <th className="">Name</th>
                                    <th className="">Type</th>
                                    <th className="">Medication</th>
                                </tr>
                            </thead>
                            <tbody>
                                {showAllergies()}
                            </tbody>
                        </table>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", padding: "1rem" }}>
                        <h1 style={{ fontSize: '2rem' }}>Medical History</h1>

                        <table style={{ borderCollapse: "collapse" }}>
                            <thead>
                                <tr>
                                    <th className="">Disease</th>
                                    <th className="">Diagnosed Date</th>
                                    <th className="">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {showMedHistory()}
                            </tbody>
                        </table>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", padding: "1rem" }}>
                        <h1 style={{ fontSize: '2rem' }}>Hospitalization History</h1>

                        <table style={{ borderCollapse: "collapse" }}>
                            <thead>
                                <tr>
                                    <th className="">Admitted On</th>
                                    <th className="">Discharged On</th>
                                    <th className="">Reason</th>
                                    <th className="">Surgery</th>
                                </tr>
                            </thead>
                            <tbody>
                                {showHospHistory()}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", padding: "1rem" }}>
                    <h1 style={{ fontSize: '2rem' }}>Checkup History</h1>

                    <table style={{ borderCollapse: "collapse" }}>
                        <thead>
                            <tr>
                                <th className="">Name Of Professional</th>
                                <th className="">Date Of Visit</th>
                                <th className="">Reason?</th>
                            </tr>
                        </thead>
                        <tbody>
                            {showCheckUpHistory()}
                        </tbody>
                    </table>
                </div>
                <Footer />
            </div>
        </div >

    )
}

export default PatientInfo;