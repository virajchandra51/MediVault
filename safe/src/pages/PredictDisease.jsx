import React, { useState, Fragment } from "react";
import { nanoid } from "nanoid";
import Web3 from "web3";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import { useCookies } from "react-cookie";
import { FaEvernote } from "react-icons/fa";

const Insurance = () => {

    const [itching, setItching] = useState(false)
    const [skinrash, setSkinRash] = useState(false)
    const [shivering, setShivering] = useState(false)
    const [vomiting, setVomiting] = useState(false)
    const [stomachache, setStomachAche] = useState(false)
    const [headache, setHeadAche] = useState(false)
    const [cough, setCough] = useState(false)
    const [fever, setFever] = useState(false)
    const [lethargy, setLethargy] = useState(false)
    const [chestpain, setChestPain] = useState(false)

    const [disease, setDisease] = useState()

    async function check() {
        const data = { 
        "Itching": itching,
        "Skin Rash": skinrash,
        "Shivering": shivering,
        "Vomiting": vomiting,
        "Stomach Pain": stomachache,
        "Headache": headache,
        "Cough": cough,
        "High Fever": fever,
        "Lethargy": lethargy,
        "Chest Pain": chestpain,
     };
        await fetch(`http://192.168.1.20:5000/${JSON.stringify(data)}`, {
            // method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            // body: JSON.stringify(newPerson),
        })
            .then(res => res.json())
            .then(d => {
                setDisease(d);
            })
            .catch(error => {
                window.alert(error);
                return;
            });
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
                    style={{ display: "flex", flexDirection: "column", padding: "4rem", justifyContent: "center", alignItems: "center", gap: "1rem" }}
                >
                    <h1>Not Feeling Well?</h1>
                    <p>Answer the following questions for a quick diagnosis for your health. Yes, MediVault is here.</p>
                    <form style={{ width: '60%', margin: '2rem' , gap:'1rem', display:'flex', flexDirection:'column'}}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', gap: '4px' }}>
                                <h2>1.</h2>
                                <h2>Is there any itching?</h2>
                            </div>
                            <select id="" name="Itching" onChange={(e) => setItching(e.target.value)}>
                                <option value="false">No</option>
                                <option value="true">Yes</option>
                            </select>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', gap: '4px' }}>
                                <h2>2.</h2>
                                <h2>Do you have skin rashes?</h2>
                            </div>
                            <select id="" name="Skin Rash" onChange={(e) => setSkinRash(e.target.value)}>
                                <option value="false">No</option>
                                <option value="true">Yes</option>
                            </select>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', gap: '4px' }}>
                                <h2>3.</h2>
                                <h2>Are you shivering?</h2>
                            </div>
                            <select id="" name="Shivering" onChange={(e) => setShivering(e.target.value)}>
                                <option value="false">No</option>
                                <option value="true">Yes</option>
                            </select>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', gap: '4px' }}>
                                <h2>4.</h2>
                                <h2>Do you feel vomiting?</h2>
                            </div>
                            <select id="" name="Vomiting" onChange={(e) => setVomiting(e.target.value)}>
                                <option value="false">No</option>
                                <option value="true">Yes</option>
                            </select>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', gap: '4px' }}>
                                <h2>5.</h2>
                                <h2>Do you feel stomachache?</h2>
                            </div>
                            <select id="" name="Stomach Pain" onChange={(e) => setStomachAche(e.target.value)}>
                                <option value="false">No</option>
                                <option value="true">Yes</option>
                            </select>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', gap: '4px' }}>
                                <h2>6.</h2>
                                <h2>Do you feel headache?</h2>
                            </div>
                            <select id="" name="Headache" onChange={(e) => setHeadAche(e.target.value)}>
                                <option value="false">No</option>
                                <option value="true">Yes</option>
                            </select>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', gap: '4px' }}>
                                <h2>7.</h2>
                                <h2>Do you have cold, cough and feel like sneezing?</h2>
                            </div>
                            <select id="" name="Cough" onChange={(e) => setCough(e.target.value)}>
                                <option value="false">No</option>
                                <option value="true">Yes</option>
                            </select>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', gap: '4px' }}>
                                <h2>8.</h2>
                                <h2>Do you have fever?</h2>
                            </div>
                            <select id="" name="High Fever" onChange={(e) => setFever(e.target.value)}>
                                <option value="false">No</option>
                                <option value="true">Yes</option>
                            </select>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', gap: '4px' }}>
                                <h2>9.</h2>
                                <h2>Do you feel tired?</h2>
                            </div>
                            <select id="" name="Lethargy" onChange={(e) => setLethargy(e.target.value)}>
                                <option value="false">No</option>
                                <option value="true">Yes</option>
                            </select>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', gap: '4px' }}>
                                <h2>10.</h2>
                                <h2>Do you have chest pain?</h2>
                            </div>
                            <select id="" name="Chest Pain" onChange={(e) => setChestPain(e.target.value)}>
                                <option value="false">No</option>
                                <option value="true">Yes</option>
                            </select>
                        </div>
                        <input style={{marginTop:'1rem', backgroundColor: "rgb(3, 201, 215)", padding: "8px 12px", borderRadius:'4px', color:'white'}} type="button" value="Submit" onClick={check} />
                        <div style={{marginTop:'2rem'}}>
                            Predicted Diagnosis: {disease}
                        </div>
                    </form>
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default Insurance;
