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
    });


    it('transfers ownership',function(){
        return DopeToken.deployed().then((instance)=>{
            tokenInstance = instance;
            return tokenInstance.tranfer.call(accounts[1],99999999999999999999999);
        }).then(assert.fail).catch((error)=>{
            assert(error.message, 'error message must contain revert');
            return tokenInstance.transfer.call(accounts[1],250000,{from : accounts[0]});
        }).then((success)=>{
            assert.equal(success,true,'it returns true');
            return tokenInstance.transfer(accounts[1],250000,{from : accounts[0]})
        }).then((receipt)=>{
            assert.equal(receipt.logs.length,1,'triggers one event');
            assert.equal(receipt.logs[0].event,'Transfer','Should be the tranfer event');
            assert.equal(receipt.logs[0].args._from,accounts[0],'logs the account the tokens are transferred from');
            assert.equal(receipt.logs[0].args._to,accounts[1],'logs the account the tokens are transferred to');
            assert.equal(receipt.logs[0].args._value,250000,'logs the tranfer amount');
            return tokenInstance.balanceOf(accounts[1]);
        }).then((balance)=>{
            assert.equal(balance.toNumber(),250000,'adds the amount to recieving account');
            return tokenInstance.balanceOf(accounts[0]);
        }).then((balance)=>{
            assert.equal(balance.toNumber(),750000,'deducts tha amount from  sending account')
        })
    })
})