require('dotenv').config({path: '../.env'});

const MyToken = artifacts.require("MyToken.sol");

const chai = require("./chaisetup.js");
const BN = web3.utils.BN;
const expect = chai.expect;

const INITIAL_TOKENS = process.env.INITIAL_TOKENS;

contract("Token Test", async(accounts)=>{
    const [ initialHolder, recipient, anotherAccount ] = accounts;

    beforeEach(async () => {
        
        this.myToken = await MyToken.new(INITIAL_TOKENS);
    });

    it("all tokens should in manager account", async () => {
        let instance = this.myToken;
        let totalSupply = await instance.totalSupply();
        let balance = await instance.balanceOf(initialHolder);

        expect(balance).to.be.a.bignumber.equal(totalSupply);
        expect(balance.toNumber()).to.be.equal(totalSupply.toNumber());
        return
    });

    it("it is possible to send tokens between accounts", async () => {
        const sendTokens = new BN(1);

        let instance = this.myToken;
        let totalSupply = await instance.totalSupply();
        let balance = await instance.balanceOf(initialHolder);

        expect(balance).to.be.a.bignumber.equal(totalSupply);
        await expect(instance.transfer(recipient, sendTokens)).to.eventually.be.fulfilled;

        balance = await instance.balanceOf(initialHolder);
        let recipientBalance = await instance.balanceOf(recipient);

        expect(balance).to.be.a.bignumber.equal(totalSupply.sub(sendTokens));
        expect(recipientBalance).to.be.a.bignumber.equal(sendTokens);
        return

    });

    it("it is not possible to send more tokens than available in total", async () => {
        const sendTokens = new BN(1);

        let instance = this.myToken;
        let totalSupply = await instance.totalSupply();
       
        await expect(instance.transfer(recipient, totalSupply.add(sendTokens))).to.eventually.be.rejected;
        return

    });
});
