$("td").on("click", function(){
   $(this).replaceWith("<textarea>");
   $(this).trigger("focus");
});