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
  var firstTrain = "";
  var firstTrainUnix = "";

  $("#submit-button").on("click", function() {
    //Prevent page from refreshing
    event.preventDefault();


 // Code in the logic for storing and retrieving the most recent user.   
 trainName = $("#train-input").val().trim();
 destination = $("#destination-input").val().trim();
 frequency = $("#frequency-input").val().trim();
 firstTrain = $("#time-input").val().trim();

 //Change time from user input to Unix time
 firstTrainUnix = moment(moment(firstTrain, "hh:mm")).format("X");    

 //Code for the push
 database.ref().push({

     trainName: trainName,
     destination: destination,
     frequency: frequency,
     firstTrainUnix: firstTrainUnix,
     dateAdded: firebase.database.ServerValue.TIMESTAMP //Unix Timestamp

  });
  $("#train-form").reset();
});