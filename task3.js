const Web3 = require('web3')

let web3 = new Web3('http://127.0.0.1:7545')// ganache

const readlineSync = require('readline-sync')

async function main() {
    console.log("   --- Создание аккаунта ---   ");

    let accountSender = await web3.eth.personal.importRawKey(entropy, password)
    console.log(accountSender);

    let key = "0x72b5212bab8a9b9974244f2d7a5d825ec8c411085f0beea5b6623beb51dca88a"
    let account2 = web3.eth.accounts.privateKeyToAccount(key)
    console.log(account2);

    console.log("   --- Пополнение баланса ---   ");
    let sendBalance = await web3.eth.accounts.signTransaction({
        to: accountSender,
        value: 1_000_000_000_000_000,
        gas: 60_000,
    }, account2.privateKey)

    console.log(sendBalance);

    await web3.eth.sendSignedTransaction(sendBalance.rawTransaction)
    .on('transactionHash', function(hash){ 
        console.log('transactionHash: ' + hash) 
    })
    .on('receipt', function(receipt){ 
        console.log(receipt) 
    })
    .on('confirmation', function(confNumber, receipt, latestBlockHash){
        console.log('confirmation: ' + confNumber, receipt, latestBlockHash)
    })

    await web3.eth.getBalance(accountSender)
    .then(console.log)

    console.log("   --- Подпись и отправка в сеть  ---   ");

    web3.eth.defaultAccount = accountSender

    // Разблокирование аккаунта
    // Разблокирует аккаунт address на duration секунд
    // для подписи транзакции
    let duration = 60
    await web3.eth.personal.unlockAccount(accountSender, password, duration)

    // Отправка транзакции с аккаунта по умолчанию
    // Если аккаунт по умолчанию не будет разблокирован, произойдет ошибка
    await web3.eth.sendTransaction({
        to: adrRecipient,
        value: value,
        gas: 50_000
    }, function(error, result) {
        if (error) {
            console.log(error);
        } else {
            console.log(result);
        }
    })
    
    // Заблокирует аккаунт address
    await web3.eth.personal.lockAccount(accountSender)

    await web3.eth.getBalance(accountSender)
    .then(console.log)
}

let entropy = readlineSync.question('Укажите 32-битную строку : ');
let password = readlineSync.question('Укажите пароль: ');
let adrRecipient = readlineSync.question('Укажите адрес получателя: ');
let value = readlineSync.question('Укажите сумму: ');
main()
.then(() => process.exit(0))

.catch((error) => {
    console.error(error);
    process.exit(1);
})

//0xc2ee825ffd44cb0550df01ab89ea96253bf417c84d7232d4641f96bbcf58c4fe
//0x11Ddd844F0727D9b0c22d47c143Aa351E78418b4