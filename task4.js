const Web3 = require('web3')

let web3 = new Web3('http://127.0.0.1:7545')// ganache

const readlineSync = require('readline-sync')

async function main() {
    console.log("   --- Создание аккаунта ---   ");

    let accountSender = await web3.eth.personal.newAccount(password)
    console.log(accountSender);

    let key = "0x72b5212bab8a9b9974244f2d7a5d825ec8c411085f0beea5b6623beb51dca88a"
    let account2 = web3.eth.accounts.privateKeyToAccount(key)
    console.log(account2);

    console.log("\n\n\n   --- Пополнение баланса ---   \n");
    let sendBalance = await web3.eth.accounts.signTransaction({
        to: accountSender,
        value: 1_000_000_000_000_000_000,
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

    console.log("\n\n\n   ---  Отправка транзакции без локальной подписи  ---   \n");

    web3.eth.defaultAccount = accountSender

    // Разблокирование аккаунта
    // Разблокирует аккаунт address на duration секунд
    // для подписи транзакции
    let duration = 60
    await web3.eth.personal.unlockAccount(accountSender, password, duration)

    // Отправка транзакции с аккаунта по умолчанию
    // Если аккаунт по умолчанию не будет разблокирован, произойдет ошибка
    await web3.eth.sendTransaction({
        from: accountSender,
        to: adrRecipient,
        value: value,
        gas: 21_000
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

    console.log("\n\n\n   ---  Отправка транзакции без разблокировки  ---   \n");

    // Отправка транзакции с определённого аккаунта
    // Необходимо указать пароль от personalAddress Функция возвращает только хеш транзакции
    await web3.eth.personal.sendTransaction({
        from: accountSender,
        to: adrRecipient,
        value: value,
        gas: 21_0000
    }, password)
    .then(console.log)

    await web3.eth.getBalance(accountSender)
    .then(console.log)
}

let password = readlineSync.question('Укажите пароль: ');
let adrRecipient = readlineSync.question('Укажите адрес получателя: ');
let value = readlineSync.question('Укажите сумму: ');
main()
.then(() => process.exit(0))

.catch((error) => {
    console.error(error);
    process.exit(1);
})

//0x11Ddd844F0727D9b0c22d47c143Aa351E78418b4