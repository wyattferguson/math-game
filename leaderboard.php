<?php

header('Access-Control-Allow-Origin: http://localhost:1234');
header('Access-Control-Allow-Methods: POST, GET');
header('Access-Control-Allow-Headers: Content-Type, X-Auth-Token, Origin, Authorization');

echo "Hello";

/*
$host = "localhost"; 
$user = "root"; 
$password = "root"; 
$dbname = "smath"; 

$con = mysqli_connect($host, $user, $password,$dbname);
if (!$con) {
  die("Connection failed: " . mysqli_connect_error());
}

$method = $_SERVER['REQUEST_METHOD'];
$request = explode('/', trim($_SERVER['PATH_INFO'],'/'));

switch ($method) {
  case 'GET':
    $result = get_scores($_GET['category'], 100);

    if (!$id) echo '[';

    for ($i=0 ; $i<mysqli_num_rows($result) ; $i++) {
      echo ($i>0?',':'').json_encode(mysqli_fetch_object($result));
    }

    if (!$id) echo ']';
    
    break;
    
  case 'POST':
    $result = insert_score($_POST);
    echo json_encode($result);
    break;
}

$con->disconnect();


function run_query($sql){
  $con = connect();
  $results = mysqli_query($con,$sql);

  // die if SQL statement failed
  if (!$result) {
    http_response_code(404);
    die(mysqli_error($con));
  }
  return $results;

}


function insert_score($post){
  $name = $post["name"];
  $time = $post["time"];
  $cat = $post["cat"];
  $score = 0;
  $hash = $post["hash"];

  $sql = "insert into leaderboard (name, time, cat, score) values ('$name', '$time', '$cat', '$score')"; 

  return run_query($sql);
}


function get_scores($cat='', $limit=100){
  $sql = "select * from leaderboard where cat=$cat limit 100 orderby score desc"; 
  return run_query($sql);
}


// insert random scoes into leaderboard for testing
function make_tests(){
  $cases = range(0, 250);
  $cats = range(10,50,10);
  foreach($c as $cats){
    foreach($i as $cases){
      $score = rand(100,10000);
      $row = [
        'name' => "test_".$i,
        'cat' => $c,
        'time' => $score,
        'score' => $score,
      ];
    }
  }
}
*/