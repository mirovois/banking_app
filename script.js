var credit = 300;

var inputController = (function() {

})

var transferController = (function() {
 
  var Transfer = function(sender,destination,value,) {
    this.sender = sender;
    this.value = value;
    this.destination = destination;
  }

  var transfers = {
    allTransfers: {
      chk:[],
      crd:[]
  },
    total: {
      chk:500,
      crd:300
    }
  };
  // var chkValue;

  return {
      addTransfer: function(accFrom,accTo,val) {
      var newTransfer;
      
      // Create new item based on 'chk' or 'crd' type
      if (acc==='chk') {
        newTransfer = new Transfer(val);
      } else if (acc==='crd')
        newTransfer = new Transfer(val)
      //Push it into data structure
        transfers.allTransfers[acc].push(newTransfer);
      return newTransfer;
    },
      testing:function() {
        console.log(transfers);
      }
  };
})();


var UIContoller = (function(){
    
  var DOMstrings= {
      inputValue:'.add_value',
      inputValue:'.transfer_value',
      senderAccount: '.account_sender',
      destinatioAccount: '.account_destination',
      inputButton:'.add_btn'
    };
    
  return {
    getInput:function() {
      return {
        
        amount:parseFloat(document.querySelector(DOMstrings.inputValue).value),
        accountFrom: document.querySelector(DOMstrings.senderAccount).value,
        accountTo: document.querySelector(DOMstrings.destinatioAccount).value
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


var controller = (function(transfCTRL,UICtrl){
var DOM;
var setupEventListeners = function() {

  document.querySelector('.add_btn').addEventListener('click',ctrlAddAmount)
  document.addEventListener('keypress', function(event){
    if(event.keyCode ===13) {
      ctrlAddAmount();
    }
  });
};
  DOM = UICtrl.getDOMstrings();
  
  var ctrlAddAmount = function() {
    var input;
    // 1.Get the field input data.
      input = UICtrl.getInput();
      console.log(input);
       
      }
      return {
      init:function() {
        console.log("Application has started");
        setupEventListeners();
      }
    };
        })(transferController,UIContoller);

controller.init();
