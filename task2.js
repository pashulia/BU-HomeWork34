const Web3 = require('web3')

let web3 = new Web3('http://127.0.0.1:7545')// ganache

const readlineSync = require('readline-sync')

async function main() {
    console.log("   --- Создание аккаунта ---   ");

    let accountSender = web3.eth.accounts.create(entropy)
    console.log(accountSender);

    let key = "0x72b5212bab8a9b9974244f2d7a5d825ec8c411085f0beea5b6623beb51dca88a"
    let account2 = web3.eth.accounts.privateKeyToAccount(key)
    console.log(account2);

    // Создание кошелька
    let wallet = web3.eth.accounts.wallet.create()
    // Добавление аккаунта в кошелёк
    web3.eth.accounts.wallet.add(accountSender)
    console.log(wallet);

    console.log("\n\n\n   --- Пополнение баланса ---   \n");
    //создание транзакции
    let transaction = await web3.eth.accounts.signTransaction({
        to: accountSender.address,
        value: 2_000_000_000_000_000_000,
        gas: 21_000,
    }, account2.privateKey)

    console.log(transaction);
    //подпись и отправка в сеть
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

    await web3.eth.getBalance(wallet[0].address)
    .then(console.log)

    console.log("\n\n\n   --- Транзакция с кошелька на адрес получателя  ---   \n");
    
    await web3.eth.sendTransaction({
        from: wallet[0].address,
        to: adrRecipient,
        value: value,
        gas: 31_0000
    })
    .on('transactionHash', function(hash){ 
        console.log("hash: " + hash) 
    }) 
    .on('receipt', function(receipt){ 
        console.log(receipt) 
    })

    await web3.eth.getBalance(accountSender.address)
    .then(console.log)
}
let entropy = readlineSync.question('Укажите 32-битную строку : ');
let adrRecipient = readlineSync.question('Укажите адрес получателя: ');
let value = readlineSync.question('Укажите сумму: ');
main()
.then(() => process.exit(0))

.catch((error) => {
    console.error(error);
    process.exit(1);
})

//12345678901234567890123456789012
//0x0202023Fcb9584bD0eBB44fd4FFA788a2f830273