
//BUDGET CONTROLLER
var budgetController = (function() {
	
	var Expense = function(id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	};

	
	var Income = function(id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	};
	
	var data = {
		allItems:{
			exp:[],
			inc:[]
		},
		
		totals:{
			exp: 0,
			inc:0
		}
	};
	
	return{
		addItem: function(type, des, val){
			var newItem, ID;
			
			//here one problem with "ID" that is we have to use uniqueID.
			//so we can use length of the array plus one(length + 1)
			//but if we delete in between item there con be a repeating of some id
			//example [1,2,4, 5] if this is situation then next id "5"(length(4)+1) 
			
			//so we create this logic for creating new ID
			if(data.allItems[type].length > 0){
				ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
			} else {
				ID = 0;
			}
			
			//create new item based on 'inc' or 'exp' type
			if (type === 'exp'){
				newItem = new Expense(ID, des, val);
			} else if (type === 'inc'){
				newItem = new Income(ID, des, val);
			} 
			
			//push it into our data structure
			data.allItems[type].push(newItem);
			
			//return the new element
			return newItem;    
		},
		
		/*testing: function() {
			console.log(data);
		}*/
	}
	
	
})();//We are involking htis function right away variable get executed


//UI CONTROLLER 
var UIController = (function(){
	//we creating this object only becouse we are geting hardcore string into object from there we use this object items
	//this one is help full when user change the class name in html then we have a centeralized place for all the class name
	var DOMstrings = {
		inputType: '.add__type',
		inputDescription:'.add__description',
		inputValue: '.add__value',
		inputBtn:'.add__btn',
		incomeContainer:'.income__list',
		expenseContainer:'.expenses__list'
		
	}
	
	
	//some code
	return {
		getInput: function() {
			return {
				type : document.querySelector(DOMstrings.inputType).value,//will either  
				description : document.querySelector(DOMstrings.inputDescription).value,
				value : document.querySelector(DOMstrings.inputValue).value
			};
		},
		
		addListItem: function(obj, type){
			var html, newHtml, element;
			
			//Create HTML string with placeholder text
			if (type === 'inc'){
				element = DOMstrings.incomeContainer;
				
				html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
			}else if (type === 'exp'){
				element = DOMstrings.expenseContainer;
				
				html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
			}
			
			//Replace the placeholder text with some actual data
			newHtml = html.replace('%id%', obj.id);//string manipulation
			
			newHtml = newHtml.replace('%description%', obj.description);
			
			newHtml = newHtml.replace('%value%', obj.value);
			
			
			//Insert the HTML into the DOM
			document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
			
		},
		
		clearFields: function() {
			var fields, fieldsArr;
			
			fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);
			
			fieldsArr = Array.prototype.slice.call(fields);
			
			fieldsArr.forEach(function(current, index, array){
				current.value = "";
			});
			
			fieldsArr[0].focus();
			
		},
		
		
		
		getDOMstrings: function() {
			return DOMstrings; 
		}
		
	}
	
})();

//GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl) {
	
	//function for make event Listeners to run
	var setupEventListeners = function() {
		var DOM = UICtrl.getDOMstrings();
		
		document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
		
		//this run when we press ENTER KEY
		document.addEventListener('keypress', function(event) {
			
			if(event.keyCode === 13 || event.which === 13){
				ctrlAddItem();
			}
			
		})
	}
	
	
	var ctrlAddItem = function() {
		var input, newItem;
		
		//1. Get the filed input  data
		input = UICtrl.getInput();
		
		
			
		//2. add the item to budget controller
		newItem = budgetCtrl.addItem(input.type, input.description, input.value);
					
		//3.Add the item to the UI
		UICtrl.addListItem(newItem, input.type); 
		
		
		//4. clear the Fields
		UICtrl.clearFields();
		
		//4.calculate the budget
		
		//5. Display the budget on the UI
		
	}
	
	return {
		init: function() {
			console.log('Application has started.');
			setupEventListeners();
		}
	}
	
	
	
})(budgetController, UIController  );

controller.init();