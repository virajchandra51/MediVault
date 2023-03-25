const cruds = artifacts.require("./cruds.sol");

module.exports = function (deployer) {
  deployer.deploy(cruds);
};
