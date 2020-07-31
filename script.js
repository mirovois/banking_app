var credit = 300;

var inputController = (function() {

})

// ==TRANSFER CONTROLLER==
var transferController = (function() {
 
  var Transfer = function(sender,destination,value,id) {
    this.id = id;
    this.sender = sender;
    this.value = value;
    this.destination = destination;
  }

  var calculateReceiver = function(acc){
    var sum = 0;
    transfers.allTransfers.forEach(function(cur){
      sum =cur.value;
    })
    transfers.total[acc] = transfers.total[acc] + sum;
  };

  var calculateSender = function(acc){
    var sum = 0;
    transfers.allTransfers.forEach(function(cur){
     sum =cur.value;
    })
    transfers.total[acc] = transfers.total[acc]-sum;
  };

//  Data structure
  var transfers = {
    allTransfers: [],
    total: {
      chk:0,
      crd:0
    }
  };
  

  return {
      addDeposit: function(value){
        transfers.total.chk = value;
        transfers.total.crd = parseInt(value*0.2);
        console.log(transfers);
      },

      addTransfer: function(accFrom,val) {
      var newTransfer,accTo;
      let ID;
      if(transfers.allTransfers.length>0){
        ID = transfers.allTransfers[transfers.allTransfers.length-1].id+1;
      } else {
      ID = 0;
      }
     
      // Create new transfer based on 'chk' or 'crd' type
      if (accFrom==='chk') {
        accTo = 'crd',
        newTransfer = new Transfer(accFrom,accTo,val,ID);
      } else if (accFrom==='crd'){
        accTo = 'chk';
        newTransfer = new Transfer(accFrom,accTo,val,ID)
      }

      //Push it into data structure
        transfers.allTransfers.push(newTransfer);
        
      return transfers.allTransfers;
    },

    deleteTransfer: function(id){
      var ids,index,val,sender,receiver;

        ids = transfers.allTransfers.map(function(cur){
          return cur.id
        });
        index = ids.indexOf(id);

        // Get all the values of the instance which is being deleted
        val = transfers.allTransfers[index].value;
        sender = transfers.allTransfers[index].sender;
        receiver = transfers.allTransfers[index].destination;

        // Update accounts' totals

        transfers.total[receiver] = transfers.total[receiver]-val;
        transfers.total[sender] = transfers.total[sender]+val;

        //Remove transfer from data structure
        if (index !==-1){
          transfers.allTransfers.splice(index,1);
        }
        
    },

    showDelObject:function(id){
      var ids;
      ids = transfers.allTransfers.map(function(cur){
        return cur.id
      });
      return ids.filter(function(cur){
        if (cur.id == id) {
          return cur;
        }
      })
      
     
      // ids.filter(cur =>cur.id === id).map(cur =>cur)
    },
    calculateAccounts: function(accFrom){
      // Calculate total checking and credit accounts
          let accTo;
          if(accFrom === "chk") {
            accTo = "crd";
            calculateReceiver(accTo);
            calculateSender(accFrom);
          }   else if (accFrom =="crd"){
            accTo = "chk"
            calculateReceiver("chk");
            calculateSender("crd")
    }
    },
    
      
    getAccountTotals: function(){
        return{
          chkTotal:transfers.total.chk,
          crdTotal:transfers.total.crd
        }
      },
    
      showData:function(){
        console.log(transfers);
      },

      testing:function() {
        console.log(transfers);
      }
  };
})();

// == UI CONTROLLER

var UIContoller = (function(){
    
  var DOMstrings= {
      depositValue:'.input-deposit',
      checkingValue:".chk-value",
      creditValue:".crd-value",
      transferValue:'.input-transfer',
      debitTransaction:".debit-list",
      creditTransaction:".credit-list",
      transactions:".trans-wrapper",
      senderAccount: '#from',
      destinationAccount: '#to',
      transDebitTitle:".debit-title",
      transCreditTitle:".credit-title",
      depositButton:".btn-deposit",
      transferButton: ".btn-transfer",
      deleteButton:".btn-delete"
    };
    
  return {
    getDeposit:function(){
      return parseInt(document.querySelector(DOMstrings.depositValue).value);
    },

    displayDeposit:function(checkingBalance,creditBalance){
      document.querySelector(DOMstrings.checkingValue).innerText = `$${checkingBalance}`;
      document.querySelector(DOMstrings.creditValue).innerText = `$${creditBalance}`;
    },
    clearDepositField:function(){
      document.querySelector(DOMstrings.depositValue).value = "";
    },

    clearTransferField:function(){
      document.querySelector(DOMstrings.transferValue).value = "";
    },

    addItem:function(obj){
      let element,insertHTML,checkingString,creditString;
      let account;
        if(obj.sender === "chk") {
        element = DOMstrings.debitTransaction;
        insertHTML = `<div class = "debit-trans trans" id = "chk-${obj.id}">
        <h3 class = "trans-item">$${obj.value} was transfered from ${obj.sender} to ${obj.destination} account </h3>
        <button class = "btn-delete">
                <img   src="./images/iconmonstr-x-mark-5.svg" alt="delete button">
        </button>
         </div>`;
      } else if (obj.sender === "crd") {
        element = DOMstrings.creditTransaction;
        insertHTML = `<div class = "credit-trans trans" id = "crd-${obj.id}">
        <h3 class = "trans-isender == "chk"tem">$${obj.value} was transfered from ${obj.sender} to ${obj.destination} account </h3>
        <button class = "btn-delete">
                <img   src="./images/iconmonstr-x-mark-5.svg" alt="delete button">
        </button>
         </div>`;
      }
      
      document.querySelector(element).insertAdjacentHTML("beforeend",insertHTML);
    },

    removeItem:function(id){
      document.getElementById(id).parentNode.removeChild(document.getElementById(id)); 
    },

    getTransfer:function() {
      return {
        
        transferAmount:parseInt(document.querySelector(DOMstrings.transferValue).value),
        accountFrom: document.querySelector(DOMstrings.senderAccount).value,
        accountTo: document.querySelector(DOMstrings.destinationAccount).value
      };            
      },
    
    // Display Account
    // displayAccount: function(obj) {
      
    //   document.querySelector(DOMstrings.checkingValue).textContent = 
    // }

    getDOMstrings: function() {
          return DOMstrings;
    }
  };
})();


// CONTROLLER

var controller = (function(transfCTRL,UICtrl){
var DOM = UICtrl.getDOMstrings();;
var chkBalance,crdBalance;
var setupEventListeners = function(e) {
  
//  == Handle deposit entry
  document.querySelector(DOM.depositButton).addEventListener('click',ctrlAddDeposit)
  document.addEventListener('keypress', function(event){
    if(event.keyCode ===13) {
      ctrlAddDeposit();
    }
  });

  //  ==Handle adding transfers
  document.querySelector(DOM.transferButton).addEventListener("click", ctrlAddTransfer);

  // == Handle deleting trasfers
  document.querySelector(DOM.transactions).addEventListener("click",ctrlDeleteTransfer);

};
  
  
  // ==GET deposit
  
  var ctrlAddDeposit = function() {
    var input;
    // 1.Get the field input data.
    input = UICtrl.getDeposit();
    console.log(input);
    

      //2. Add deposit to the data structure
      transfCTRL.addDeposit(input);
      // 3.Account balance
      console.log(transfCTRL.getAccountTotals())
      
      // 4. Add deposit to UI
      // UIContoller.displayDeposit(chkBalance,crdBalance);
      UIContoller.displayDeposit(transfCTRL.getAccountTotals().chkTotal,transfCTRL.getAccountTotals().crdTotal);
  
      // CLear amount deposit from UI
      UIContoller.clearDepositField();
      }
  
      var updateAccountTotals = function(){
         // 4. Get accounts' totals from data structure
         var totals = {
          totalCHK:transfCTRL.getAccountTotals().chkTotal,
          totalCRD:transfCTRL.getAccountTotals().crdTotal
        }
        // 5. Update UI for accounts
        document.querySelector(DOM.checkingValue).innerText = totals.totalCHK;
        document.querySelector(DOM.creditValue).innerText = totals.totalCRD;
      }

      var updateData = function(sender){

        transferController.calculateAccounts(sender);
        console.log(transfCTRL.getAccountTotals());
         // 4. Get accounts' totals from data structure
         // 4. Get accounts' totals from data structure
        updateAccountTotals();
      };
  
  var ctrlAddTransfer = function() {
    console.log("Ready for transfer");
    // 1. Get transfer data from User
    var transfer = UIContoller.getTransfer();
    var transferData = {
      sender:transfer.accountFrom,
      amountTransfered:transfer.transferAmount,
      receiver:transfer.accountTo
    }
     
      // 2. Add transfer data to data structure
      var transfer = transferController.addTransfer(transferData.sender,transferData.amountTransfered);
      transferController.showData();
      
      var transfObj = transfer[transfer.length-1]
      console.log(transfObj);
      // 3. Clear transfer amount field
      UIContoller.clearTransferField();
      
      // 4. Add item to UI in transactactions;
      // UIContoller.addItem(transferData.sender,transferData.receiver,transferData.amountTransfered);
      if(transfObj.sender  == "chk"){
        UIContoller.addItem(transfObj);
        document.querySelector(DOM.transDebitTitle).classList.add("show");
      } else if (transfObj.sender == "crd") {
        UIContoller.addItem(transfObj);
        document.querySelector(DOM.transCreditTitle).classList.add("show");
      }

      // // 5. Calculate and update accounts
      updateData(transferData.sender);
      // console.log(getSelectors("chk")[0]);

      }

      var getSelectors = function(type){
        var dbtArr = [];
        var crdArr = [];
        // var idArr = [];
        var id;
        var newArr = Array.from(document.querySelectorAll(".trans"));

        newArr.forEach(arg => {
          id = arg.attributes.id.value;
          type = id.split("-")[0];
          if (type == "chk"){
            dbtArr.push(type)
          } else if(type =="crd"){
            crdArr.push(type);
          }
        })
        return [dbtArr.length,crdArr.length];
        
        
      }

      // ==DELETE TRANSACTION
      var ctrlDeleteTransfer = function(e){
        var transferID,splitID,type,ID,arr;

        // 1.Get ID of element which is to be removed
        transferID = (e.target.parentNode.parentNode.id)
        console.log(transferID);
        if(transferID){
          
          splitID = transferID.split('-');
          type = splitID[0];
          ID = parseInt(splitID[1]);
          var tr = transfCTRL.showDelObject(ID);
          console.log(tr);

          // arr = Array.document.querySelectorAll('trans');

          // 2. Delete transfer from data structure
          transfCTRL.deleteTransfer(ID);
          transfCTRL.showData();
          
          // 3. Remove transfer from UI
          var arrLength = getSelectors(type)[0];
          
          if (type == "chk"){
            arrLength = getSelectors()[0];
            if(arrLength>1){
              UIContoller.removeItem(transferID);
            } else {
              UIContoller.removeItem(transferID);
            document.querySelector(DOM.transDebitTitle).classList.remove("show");
            }
          }
          if (type == "crd"){
            arrLength = getSelectors()[1];
            if(arrLength>1){
              UIContoller.removeItem(transferID);
            } else {
              UIContoller.removeItem(transferID);
            document.querySelector(DOM.transCreditTitle).classList.remove("show");
            }
          }         
          // Update account totals 
          updateAccountTotals();               
        }        
      };
      return {
      init:function() {
        console.log("Application has started");
        setupEventListeners();
      }
    };
        })(transferController,UIContoller);

controller.init();
