// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Cruds {
    string[] doctors;
    string[] patients;

    function addDoctor(string memory doc_cid) public {
        for (uint i = 0; i < doctors.length; i++) {
            string memory x = doctors[i];
            if (keccak256(bytes(x)) == keccak256(bytes(doc_cid))) return;
        }
        doctors.push(doc_cid);
    }

    function getDoctor() public view returns (string[] memory) {
        return doctors;
    }

    function addPatient(string memory patient_cid) public {
        for (uint i = 0; i < patients.length; i++) {
            string memory x = patients[i];
            if (keccak256(bytes(x)) == keccak256(bytes(patient_cid))) return;
        }
        patients.push(patient_cid);
    }

    function getPatient() public view returns (string[] memory) {
        return patients;
    }
}