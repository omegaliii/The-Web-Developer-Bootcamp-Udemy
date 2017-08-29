var todoList = [];

var input = prompt("What would you wanna do?")

while(input !== "quit"){
	//handle input
	if(input === "list") {
		printList();
	} else if(input === "new") {
		addTodo();
	} else if(input === "delete") {
		deleteTodo();
	}
	//ask again for new input
	input = prompt("What would you like to do?");
}

function addTodo(){
	var todo = prompt("Enter to newTodo");
	todoList.push(todo);
	console.log(todo + " add to list.")
}

function printList(){
	console.log("------------")
	todoList.forEach(function(item, index){
		console.log(index +  " : " + item);
	});
	console.log("------------")
}

function deleteTodo() {
	var index = prompt("Whcih todo want to delete?");
	todoList.splice(index, 1);
	console.log("Todo Removed")
}


