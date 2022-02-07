const DopeToken = artifacts.require("DopeToken");

contract('DopeToken', function (accounts){

    it('initializes the contract with the correct values',function(){
        DopeToken.deployed().then((instance)=>{
            tokenInstance = instance;
            return tokenInstance.name();
        }).then((name)=>{
            assert.equal(name , 'Dope Token','has correct name');
            return tokenInstance.symbol();
        }).then((symbol)=>{
            assert.equal(symbol , 'DOP', 'has correct symbol');
            return tokenInstance.standard();
        }).then((standard)=>{
            assert.equal(standard, 'Dope Token v1.0', 'has correct standard')
        })
    })

    it('allocates the initial supply upon deployment',function(){

        var tokenInstance;
        return DopeToken.deployed().then((instance) => {
            tokenInstance = instance;
            return tokenInstance.totalSupply();
        }).then((totalSupply) => {
            assert.equal(totalSupply.toNumber(),1000000,'set the total supply to 1000000');
            return tokenInstance.balanceOf(accounts[0])
        }).then((adminBalance)=>{
            assert.equal(adminBalance.toNumber(),1000000,'it allocates the initial supply to the admin')
        })
    })
})