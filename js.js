$(document).ready(function () {
 
    //Provides the date using moment js and then displays it
   $("#currentDay").text(moment().format("MMMM Do YYYY"));
   var currentHour = parseInt(moment().format('HH'));
   //List of the global variables
   var varTime = " AM";
   var textTime = 8;
   var realTime = 8;
   var day;
   var storedDay = [];
   
   init();
     
   function init(){
   //Creates an empty local storage
       if (localStorage.getItem("day") === null) {
           day = ["","","","","","","","",""];
           localStorage.setItem("day", JSON.stringify(day));
        }
   //Places variable into local storage
        storedDay = JSON.parse(localStorage.getItem("day"));
       
    createPage();
   
   }
   //Changes the color of the hour block depending on the time
   $("textarea").each(function () {
       var name = parseInt($(this).attr("value"));   
    //Gray color if it is past that hour
       if (name < currentHour) {
           $(this).addClass("past");      
       }
    //Green color if the time hasn't happened yet
       if (name > currentHour) {
           $(this).addClass("future")      
       }
    //Red color if it is that specific hour block
       if (name === currentHour) {
           $(this).addClass("present")     
       }
   })
   
   //Creates the display page 
   function createPage(){
   
     for (i = 0; i < 9; i++) {
       
       textTime++;
       realTime++;
   
       if (i >= 3) varTime = " PM";
       if (i === 4) textTime = 1;
       //All of the elements that will be on the page including their class and attributes that they will have
       var divRow = $("<div>");
       divRow.addClass("row time-block");
       divRow.attr("id", "hour-" + realTime);
       var divHour = $("<div>");
       divHour.addClass("col-md-1 hour p-1");
       divHour.text(textTime + varTime);
       var textHour = $("<textarea>");
       textHour.attr("value", realTime);
       textHour.addClass("col-md-10 description");
       textHour.text(storedDay[i]);
       var btnHour = $("<button>");
       btnHour.addClass("btn saveBtn col-md-1");
       btnHour.attr("value", realTime);
       var btnIcon =$("<i>");
       btnIcon.addClass("fas fa-save");
   
       //Adds the elements to the page
       $(divRow).appendTo(".container");
       $(divHour).appendTo("#hour-" + realTime);
       $(textHour).appendTo("#hour-" + realTime);
       $(btnHour).appendTo("#hour-" + realTime);
       $(btnIcon).appendTo(btnHour);
   
     }
   }
   //When you hit the save button, your value is added to local storage
    $(".saveBtn").on("click", function() {
          
        var btnText = ($(this).siblings("textarea").val());
        console.log(btnText);
        var hourTest = $(this).val();
        console.log(hourTest);
        storedDay[hourTest-9] = btnText;
        localStorage.setItem("day", JSON.stringify(storedDay));
   
    });
   
});