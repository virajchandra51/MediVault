import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Web3 from "web3";
import contract from "../contracts/cruds.json";
import { useCookies } from "react-cookie";
import "./Login.css";

const Login = () => {
    const [doctors, setDoc] = useState([]);
    const [patients, setPatient] = useState([]);

    const [log, setLog] = useState({
        type: "patient",
        mail: "",
        password: "",
    });

    const [cookies, setCookie] = useCookies();

    function handle(e) {
        const newData = { ...log };
        newData[e.target.name] = e.target.value;
        setLog(newData);
    }

    async function loadDoctors() {
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
            .then(res => {
                res.map(data => {
                    data = JSON.parse(data);
                    if (data['type'] === 'doctor') {
                        doctors.push(data);
                    }
                })
                setCookie('doctors', doctors);
            })
    }

    function resetCook(val, data) {
        var list = [];
        for (let j = 1; j < data.length; j++) {
            list.push(data[j]);
        }
        setCookie(val, list);
    }

    async function login() {
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
                let flag = 0;
                for (let i = 0; i < res.length; i++) {
                    const d = JSON.parse(res[i]);

                    if (d['mail'] === log['mail']) {
                        flag = 1;
                        if (d['password'] === log['password']) {
                            if (d['type'] === 'patient' && d['type'] === log['type']) {
                                setCookie("mail", d["mail"]);
                                setCookie("name", d["name"]);
                                setCookie("type", d["type"]);
                                setCookie("password", d["password"]);
                                setCookie('index', i);

                                window.location.href = "/myprofile";
                            }
                            else if (d['type'] === 'doctor' && d['type'] === log['type']) {
                                setCookie("mail", d["mail"]);
                                setCookie("name", d["name"]);
                                setCookie("type", d["type"]);

                                window.location.href = "/myprofiledoc";
                            }
                        }
                        else {
                            alert("wrong password");
                            break;
                        }
                    }
                }

                if (flag == 0) {
                    alert("Please create your account first");
                }
            });
    }

    async function show() {
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
            .then(res => {
                res.map(d => {
                    console.log(JSON.parse(d));
                })
            })

    }



    return (
        <div className="login-container bg-gradient-to-r from-cyan-500 to-blue-500 via-teal-200 ">
            <form className="login-form backdrop-blur-lg
               [ p-8 md:p-10 lg:p-10 ]
               [ bg-gradient-to-b from-white/60 to-white/30 ]
               [ border-[1px] border-solid border-white border-opacity-30 ]
               [ shadow-black/70 shadow-2xl ]">
                <h2 className="login-form-title">Log In</h2>
                <div className="input-container">
                    <div className="input-div">
                        <div className="input-heading">
                            <i className="fas fa-user"></i>
                            <h5>Email</h5>
                        </div>
                        <input
                            onChange={(e) => handle(e)}
                            type="email"
                            placeholder="youremail@gmail.com"
                            id="email"
                            name="mail"
                        />
                    </div>
                    <div className="input-div">
                        <div className="input-heading">
                            <i className="fas fa-lock"></i>
                            <h5>Password</h5>
                        </div>
                        <input
                            onChange={(e) => handle(e)}
                            type="password"
                            placeholder="********"
                            id="password"
                            name="password"
                        />
                    </div>
                    <div className="input-div">
                        <div className="input-heading" style={{ margin: "1rem 0", }}>
                            <i className="fas fa-key"></i>
                            <h5>User Type</h5>
                            <select id="user-type" name="type" onChange={(e) => handle(e)}>
                                <option value="patient">Patient</option>
                                <option value="doctor">Doctor</option>
                            </select>
                        </div>

                    </div>

                    <p style={{ textAlign: "right" }}>Forgot password?</p>
                </div>

                <input
                    type="button"
                    className="btn"
                    value="Log In"
                    onClick={login}
                />
                <p style={{ textAlign: "right" }}>Don't have an account?
                    <Link style={{ marginLeft: "4px", color: "black", textDecoration: "underline" }} to='/signup'>Sign Up.</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
