const Web3 = require('web3')

let web3 = new Web3('http://127.0.0.1:7545')// ganache

const readlineSync = require('readline-sync')

async function main() {
    console.log("   --- Создание аккаунта ---   ");

    let accountSender = web3.eth.accounts.privateKeyToAccount(privateKey)
    console.log(accountSender);

    let key = "0xbb019fcd09f6935fd8f66e79befe552e85b8c3f227872ccae0a4f1d693931ec8"
    let account2 = web3.eth.accounts.privateKeyToAccount(key)
    console.log(account2);

    console.log("   --- Пополнение баланса ---   ");
    let sendBalance = await web3.eth.accounts.signTransaction({
        to: accountSender.address,
        value: 1_000_000_000_000_000,
        gas: 31_000,
    }, account2.privateKey)

    console.log(sendBalance);

    console.log("   --- Подпись и отправка в сеть  ---   ");
    let transaction = await web3.eth.accounts.signTransaction({
        to: adrRecipient,
        value: value,
        gas: 31000,
    }, accountSender.privateKey)

    console.log(transaction);

    await web3.eth.sendSignedTransaction(transaction.rawTransaction)
    .on('transactionHash', function(hash){ 
        console.log('transactionHash: ' + hash) 
    })
    .on('receipt', function(receipt){ 
        console.log(receipt) 
    })
    .on('confirmation', function(confNumber, receipt, latestBlockHash){
        console.log('confirmation: ' + confNumber, receipt, latestBlockHash)
    })

    await web3.eth.getBalance(accountSender.address)
    .then(console.log)
}
let privateKey = readlineSync.question('Укажите закрытый ключь: ');
let adrRecipient = readlineSync.question('Укажите адрес получателя: ');
let value = readlineSync.question('Укажите сумму: ');
main()
.then(() => process.exit(0))

.catch((error) => {
    console.error(error);
    process.exit(1);
})

//0xc2ee825ffd44cb0550df01ab89ea96253bf417c84d7232d4641f96bbcf58c4fe
//0x0202023Fcb9584bD0eBB44fd4FFA788a2f830273