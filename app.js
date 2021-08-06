
//BUDGET CONTROLLER
var budgetController = (function() {
	
})();//We are involking htis function right away variable get executed

//UI CONTROLLER 
var UIController = (function(){
	
	//some code
	
})();

//GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl) {
	
	var ctrlAddItem = function() {
		//1. Get the filed input  data
		
		//2. add the item to budget controller
		
		//3.Add the item to the UI
		
		//4.calculate the budget
		
		//5. Display the budget on the UI
		
		console.log("It's Work");
	}
	
	
	document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);
	
	
	//this run when we press ENTER KEY
	document.addEventListener('keypress', function(event) {
		
		if(event.keyCode === 13 || event.which === 13){
			ctrlAddItem();
		}
		
	})
	
	
})(budgetController, UIController  );

