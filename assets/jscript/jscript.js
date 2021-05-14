var tasks = [];
var tdElId = 0;
var now = moment();

//get the id of the td element being selected
$("td").on("click", function () {
   tdElId = $(this)
      .attr("id");
});

// clear any previous values when modal is triggered
$("#inputModal").on("show.bs.modal", function () {
   // clear values
   $("#taskDescription").val("");
});
//focus the text box on modal popup
$("#inputModal").on("shown.bs.modal", function () {
   $("#taskDescription").focus();
});

// save button in modal was clicked
$("#inputModal .btn-save").click(function () {
   // get form values
   var taskText = $("#taskDescription").val();
   // close modal
   $("#inputModal").modal("hide");

   //parse text data to the create task function
   if (taskText) {
      createTask(taskText, tdElId);
   };

   // save in tasks array
   tasks.push({
      tdElId: tdElId,
      text: taskText
   });
   saveTasks();
});

//save function
function saveTasks() {
   localStorage.setItem("data", JSON.stringify(tasks));
};

//function to create the actual tasks themselves
function createTask(textData, tdElId) {

   //gives the created task's delete button the ability to be identified 
   var deleteTaskHandler = "deleteTask('" + tdElId + "')";

   var cardBody = $("<div>")
      .addClass("card-body")
      .text(textData);

   var deleteBtn = $("<button>")
      .attr("type", "button")
      .attr("onClick", deleteTaskHandler)
      .html("&#10006;")
      .addClass("close text-light delete-btn");

   cardBody.append(deleteBtn);
   $("#" + tdElId).append(cardBody);
};

//delete the task when the "X" button is clicked
function deleteTask(tdElId) {

   var deleteTaskIdHolder = "#" + tdElId;
   //empties the cell where the "X" was clicked
   $(deleteTaskIdHolder).empty();

   //removes the task from the array and then saves the new array
   var index = $.inArray(tdElId, tasks);
   tasks.splice(index, 1);

   saveTasks();
};

//function to load the tasks on refresh
function loadTasks() {
   tasks = JSON.parse(localStorage.getItem("data"));

   //creates am empty task array if one is not present after load
   if (!tasks) {
      tasks = [];
   };

   for (i = 0; i < tasks.length; i++) {
      ;
      textBoxLoad = tasks[i].text;
      tdElIdLoad = tasks[i].tdElId;
      createTask(textBoxLoad, tdElIdLoad);
   };
};

loadTasks();