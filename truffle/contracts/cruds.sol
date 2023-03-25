// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract cruds{
    string[] data;

    function addData(string memory userData) public {
      data.push(userData);
  }

  function updateData(uint index, string memory newData) public returns (bool) {
      if(data.length > index){
          data[index] = newData;
          return true;
      }
      return false;
  }

  // function deleteBook(uint index) public returns (bool) {
  //     if(data.length > index){
  //         for(uint i=index; i < data.length-1; i++){
  //             data[i] = data[i+1];
  //         }

  //         data.pop();

  //         return true;
  //     }
  //     return false;
  // }

  function getdata() public view returns (string[] memory) {
      return data;
  }
}
