var config = {
    apiKey: "AIzaSyC43R4ih2toZ8BV9Mo-AZe4nk4U926YcpA",
    authDomain: "traintime-1112d.firebaseapp.com",
    databaseURL: "https://traintime-1112d.firebaseio.com",
    projectId: "traintime-1112d",
    storageBucket: "traintime-1112d.appspot.com",
    messagingSenderId: "79489177878"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  //Local firebase variables
  var trainName = "";
  var destination = "";
  var frequency = "";
  var initialTime = "";
  var trainArray = [];

  function clearForm() {
    $("#train-input").val("");
    $("#destination-input").val("");
    $("#frequency-input").val("");
    $("#time-input").val("");
}

  function clearTable() {
    $("#tableBody").empty();
};


  $("#submit-button").on("click", function() {
    //Prevent page from refreshing
    event.preventDefault();


 // Code in the logic for storing and retrieving the most recent user.   
 trainName = $("#train-input").val().trim();
 destination = $("#destination-input").val().trim();
 frequency = $("#frequency-input").val().trim();
 initialTime = moment($("#time-input").val().trim(),['h:m A']).toISOString();    

 //Code for the push
 database.ref().push({

     trainName: trainName,
     destination: destination,
     frequency: frequency,
     initialTime: initialTime

  });
  clearForm();
});

database.ref().on('child_added', function(snapshot) {
  trainArray.push(snapshot.val());
  addTrainSched(trainArray);
});

//Display Train Schedule Function
function addTrainSched(train) {
  clearTable();
  console.log(train);

  for (var i = 0; i < train.length; i++) {
      var trainRow = $("<tr>");
      var trainListName = $("<td>");
      var trainListDest = $("<td>");
      var trainListFreq = $("<td>");
      var trainListNextArrival = $("<td>");
      var trainListMinAway = $("<td>");

      //calculate when the next run time will occur
      var diffTime = moment().diff(moment(train[i].initialTime),"minutes");
      var timesRun = Math.ceil(diffTime/train[i].frequency);
      var nextTime = moment(train[i].initialTime).add(timesRun*train[i].frequency,"minutes");
      var timeTillNext = moment(nextTime).diff(moment(), "minutes");

      //Get Train Information
      trainListName.text(train[i].trainName);
      trainListDest.text(train[i].destination);
      trainListFreq.text(train[i].frequency);
      trainListNextArrival.text(nextTime.format("HH:mm"));
      trainListMinAway.text(timeTillNext);

      //Append Train Information to Table
      trainRow.append(trainListName);
      trainRow.append(trainListDest);
      trainRow.append(trainListFreq);
      trainRow.append(trainListNextArrival);
      trainRow.append(trainListMinAway);

      //Display Train Schedule
      $("#tableBody").append(trainRow);

  }
}
