
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

    $("#submit").on("click", function(event){
        event.preventDefault();
        console.log("hey");

        var trainName = $("#name-input").val().trim();
        var trainDestination = $("#destination-input").val().trim();

        var firstTime = moment($("#time-input").val().trim(), "hh:mm").subtract(1, "years").format("X");
        var frequency = $("#min-input").val().trim();

        var currentTime= moment();
        console.log("current time: " + moment(currentTime).format("hh:mm"));

        var newTrain = {
            train: trainName,
            trainGoing: trainDestination,
            trainComing: firstTime,
            everyMin: frequency
        };

        database.ref().push(newTrain);

        $("#name-input").val();
        $("#destination-input").val();
        $("#time-input").val();
        $("#min-input").val();

        // return false;

    });

    database.ref().on("child_added", function(childSnapshot){
        console.log(childSnapshot.val());

        var trainName = childSnapshot.val().train;
        var destination = childSnapshot.val().trainGoing;
        var firstTime = childSnapshot.val().trainComing;
        var frequency = childSnapshot.val().everyMin;

        console.log(frequency);

        var trainTime = moment.unix(firstTime).format("hh:mm");
        console.log(trainTime);
        var difference = moment().diff(moment(firstTime,"X"), "minutes");
        console.log(difference);
        var trainRemain = difference % frequency;
        var minUntil = frequency - trainRemain;
        var nextArrival = moment().add(minUntil).format("hh:mm " + " A");

        $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextArrival + "</td><td>" + minUntil + "</td></tr>");

    });




