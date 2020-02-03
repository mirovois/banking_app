var transferController = (function() {

   var credit = 300;
   var chk = [];

   var a=3;
   return {
     test:function(b){

        console.log(a+b);
   }
 }
})();

var UIContoller = (function(){
  return {
    getInput:function() {
      var amountAdded = document.querySelector('.add_value').value;
      return amountAdded;
    },
    addToChecking: function() {
      var amountTransferedChecking = document.querySelector('.item-value');
    }
  }

})();

var controller = (function(transdCTRL,UICtrl){

var setupEventListeners = function() {

  document.querySelector('.add_btn').addEventListener('click',ctrlAddAmount)
  document.addEventListener('keypress', function(event){
    if(event.keyCode ===13) {
      ctrlAddAmount();

    }
  })
}

  var ctrlAddAmount = function() {
    // 1.Get the field input data.
      var input = UICtrl.getInput();
      console.log(input);
    // console.log("App started");
    // 2.Add the amount to checking account
      }
return  {
  init:function() {
    console.log("Application has started");
    setupEventListeners();
  }
}

})(transferController,UIContoller);

controller.init();
