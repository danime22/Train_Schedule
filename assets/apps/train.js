var config = {
    apiKey: "AIzaSyBSEpjYV195KRt2qrjCcOlibUsMjl66VO0",
    authDomain: "train-time-de3aa.firebaseapp.com",
    databaseURL: "https://train-time-de3aa.firebaseio.com",
    projectId: "train-time-de3aa",
    storageBucket: "",
    messagingSenderId: "323048788649"
};
firebase.initializeApp(config);

var database = firebase.database();

var name = "";
var destination = "";
var time = 0;
var min = 0;

$("#submit").on("click", function (event) {
    event.preventDefault();

    name = $("#name-input").val().trim();
    destination = $("#destination-input").val().trim();
    time = $("#time-input").val().trim();
    min = $("#min-input").val().trim();

    database.ref().set({
        name: name,
        destination: destination,
        time: time,
        min: min
    });


});

database.ref().on("value", function (snapshot) {
    console.log(snapshot.val());
    $("#name-display").text(snapshot.val().name);
    $("#destination-display").text(snapshot.val().destination);
    $("#time-display").text(snapshot.val().time);
    $("#min-display").text(snapshot.val().min);

    console.log(snapshot);
})



