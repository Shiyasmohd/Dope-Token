const DopeToken = artifacts.require("DopeToken");

module.exports = function (deployer) {
  deployer.deploy(DopeToken,1000000);
};
