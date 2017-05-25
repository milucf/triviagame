$(document).ready(function(){
  //===========intials
var timer,timeCounter,rightAnswer,wrongAnswer,unAnswer;
var quizNumber=0;
rightAnswer=0;wrongAnswer=0;unAnswer=0;
var answerList=[];
$(".alert").hide();
restart();
//============Button & answers Click
$(".btn-lg").on("click",function(){
  if(this.innerHTML=="Play Again")
  restart();

  $(".btn-lg").hide();
  getNextQuestion();
})
$("ol li").on("click",function(){
      clearInterval(timer);
    if(this.innerHTML== answerList[quizNumber-1]){
      $("#question"+quizNumber).hide();
      $(".alert").removeClass(".alert alert-danger halert").addClass(".alert alert-success halert").show();
      $(".alert").html("<span class=\"glyphicon glyphicon-thumbs-up\"></span><strong> Correct!</strong>")
      rightAnswer++;
    }
    else{
      $("#question"+quizNumber).hide();
      $(".alert").removeClass(".alert alert-success halert").addClass(".alert alert-danger halert").show();
      $(".alert").html("<span class=\"glyphicon glyphicon-thumbs-down\"></span> Nope! answer is:<strong> "+answerList[quizNumber-1]+"</strong>");
      wrongAnswer++;
    }
    setTimeout(function() {
      getNextQuestion();
    }, 2000);
});
//============Genrals
function myTimer(){
  $("#quizTimer").html("00:30");
  timeCounter=30;
  timer=setInterval(countDown,1000);
}

function countDown(){
    var s;
  if(timeCounter>0){
    timeCounter--;
    if(timeCounter<10) {s="0"+timeCounter} else{s=timeCounter;}
    $("#quizTimer").html("00:"+s);
  }
  else{
    clearInterval(timer);
    $("#quizTimer").html("00:00");
    timesOut();
  }
}

function timesOut(){   
      $("#question"+quizNumber).hide();
      $(".alert").removeClass(".alert alert-success halert").addClass(".alert alert-danger halert").show();
      $(".alert").html("<span class=\"glyphicon glyphicon-thumbs-down\"></span> Time Out! answer is:<strong> "+answerList[quizNumber-1]+"</strong>");
      unAnswer++;
      setTimeout(function() {
      getNextQuestion();
    }, 2000);
}

function getNextQuestion(){
  if(quizNumber<8){
      $(".alert").hide();
      quizNumber++;
      $("#question"+quizNumber).show();
      myTimer();
  }
  else{
      $("#question"+quizNumber).hide();
      $(".alert").removeClass(".alert alert-success halert").removeClass(".alert alert-danger halert");
      $(".alert").addClass(".alert alert-info halert").show();
      $(".alert").html("<strong>Correct Answers:</strong> "+rightAnswer+
                       "<br><strong>Incorrect Answers: </strong>"+wrongAnswer+
                       "<br><strong>Unanswers: </strong>"+unAnswer);
      $(".btn-lg").show().html("Play Again");
  }
}

function restart(){
  while(answerList.length){answerList.pop();}
  quizNumber=0;
  rightAnswer=0;wrongAnswer=0;unAnswer=0;
  $(".alert").removeClass(".alert alert-info halert").removeClass(".alert alert-danger halert");
  $(".alert").addClass(".alert alert-success").hide();
  for(i=1;i<=8;i++){
     $("#question"+i).hide();
     $("#q"+i).empty();
     $("#q"+i+"1").empty();
     $("#q"+i+"2").empty();
     $("#q"+i+"3").empty();
     $("#q"+i+"4").empty();
}
  questionGenerator();
  $(".btn-lg").show().html("Start");
  $("#quizTimer").html("00:00");
}

function questionGenerator(){
   var title,ansewers,a,b,c,d;
   var randOrder,incorrecIndex;
    var queryURL = "https://opentdb.com/api.php?amount=8&type=multiple";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
      for(i=0;i<8;i++){

        $("#q"+(i+1)).html(response.results[i].question)
        incorrecIndex=0
        randOrder=Math.floor(Math.random()*4)+1;
        console.log(randOrder);
        for(j=1;j<=4;j++){     
          if(randOrder==j){
          $("#q"+(i+1)+j).html(response.results[i].correct_answer);
          answerList.push(response.results[i].correct_answer);
        }
        else{
           $("#q"+(i+1)+j).html(response.results[i].incorrect_answers[incorrecIndex]);
           incorrecIndex++;
        }
      }
      
    }
    });
}



});
