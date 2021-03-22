const DRealEstate = artifacts.require("DRealEstate");

module.exports = function(deployer) {
  deployer.deploy(DRealEstate);
};
