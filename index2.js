import Web3 from 'web3';

class TrnxChecker {
  web3;
  web3ws;
  account;
  subscription;
  constructor(projectId, account) {
    this.web3ws = new Web3(new Web3.providers.WebsocketProvider('wss://polygon-mainnet.infura.io/ws/v3/dde1d1964dc344838e8501341647896b'));
    this.web3 = new Web3(new Web3.providers.HttpProvider('https://polygon-mainnet.infura.io/v3/dde1d1964dc344838e8501341647896b'));
    this.account = account;
  }
  subscribe(topic) {
    this.subscription = this.web3ws.eth
      .subscribe(topic, { address: '0xc21f1d2097f8632cd6613a8ed935395086dcc717', from: 0 }, (err, result) => {
        if (err) console.error('subs--time--', err);
        // else console.log('subs--time--res-----', result);
      })
      .on('connected', (res) => {
        console.log('is--conect-->>>>>', res);
      });
  }
  watchTrnx() {
    console.warn('Watching All Pending Transaction... ');
    this.subscription.on('data', (txHsh) => {
      console.log('txhsh--->>>>->->->>>', txHsh);
      return;
      setTimeout(async () => {
        // let tx = await this.web3.eth.getTransaction(txHsh);
        // if (tx != null) {
        //   console.log('trnx--from--', tx.from);
        //   if (this.account == tx?.to?.toLowerCase()) {
        //     console.log('depost-->>', { address: tx.from, value: this.web3.utils.fromWei(tx.value, 'ether'), timeStamp: new Date() });
        //   }
        //   if (this.account == tx?.from?.toLowerCase()) {
        //     console.log('Sent-->>', { address: tx.to, value: this.web3.utils.fromWei(tx.value, 'ether'), timeStamp: new Date() });
        //   }
        // }
      }, 2000);
    });
  }
}
const trx = new TrnxChecker('3455', '0xc21f1d2097f8632cd6613a8ed935395086dcc717');
trx.subscribe('logs');
trx.watchTrnx();
// const provider = new Web3.providers.WebsocketProvider('wss://mainnet.infura.io/ws/v3/dde1d1964dc344838e8501341647896b');
// let web3 = new Web3(provider);

// const subscription = web3.eth
//   .subscribe(
//     'logs',
//     {
//       address: '0x183A6cF1Fc6504138d92C9d663094EE774f80038',
//     },
//     (error, result) => {
//       if (!error) {
//         console.log(result);
//       } else {
//         console.error(error);
//       }
//     }
//   )
//   .on('connected', function (subscriptionId) {
//     console.log('connect111---', subscriptionId);
//   })
//   .on('data', function (log) {
//     console.log('data--0-000---0-0-0---', log);
//   })
//   .on('changed', function (log) {
//     console.log('data--changed--', log);
//   });
