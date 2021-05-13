var tasks = [];
var tdElId = 0;
//get the id of the td element being selected

$("td").on("click", function(){
   tdElId=$(this)
   .attr("id");
   console.log(tdElId);
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
   if (taskText){
      createTask(taskText);
      console.log(taskText);
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
function createTask(textData){
   var cardBody = $("<div>")
   .addClass("card-body")
   .text(textData);

   $("#" + tdElId).append(cardBody);

};