const DopeToken = artifacts.require("DopeToken");

contract('DopeToken', function (accounts){

    it('set the total supply upon deployment',function(){

        return DopeToken.deployed().then((instance) => {
            totalInstance = instance;
            return totalInstance.totalSupply();
        }).then((totalSupply) => {
            assert.equal(totalSupply.toNumber(),1000000,'set the total supply to 1000000');
        })
    })
})