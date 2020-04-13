<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Access-Control-Allow-Origin: http://localhost:1234');
header('Access-Control-Allow-Methods: POST, GET');
header('Access-Control-Allow-Headers: Content-Type, X-Auth-Token, Origin, Authorization');

$host = "localhost"; 
$user = "root"; 
$password = "root"; 
$dbname = "smath";

$con = mysqli_connect($host, $user, $password, $dbname);

if (!$con) {
  die("Connection failed: " . mysqli_connect_error());
}


/*
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
  case 'GET':
    if(isset($_GET['c'])){
      $result = get_scores($_GET['c'], 100);

      if (!$id) echo '[';

      for ($i=0 ; $i<mysqli_num_rows($result) ; $i++) {
        echo ($i>0?',':'').json_encode(mysqli_fetch_object($result));
      }

      if (!$id) echo ']';
    }
    break;
    
  case 'POST':
    $result = insert_score($_POST);
    echo json_encode($result);
    break;
}
*/
mysqli_close($con);


function run_query($sql){
  global $con;
  $result = mysqli_query($con,$sql);

  // die if SQL statement failed
  if (!$result) {
    http_response_code(404);
    die(mysqli_error($con));
  }
  return $result;
}


function insert_score($post){
  $name = $post["n"];
  $time = $post["t"];
  $cat = $post["c"];

  print_r($post);

  if(!validate_cat($cat) || !validate_time($time) || !validate_name($name)){
    die("Invalid Score");
  }

  $score = str_replace(":","",$time);

  $sql = "INSERT INTO leaderboard (name, time, category, score) VALUES ('$name', '$time', '$cat', '$score')"; 
  echo $sql;
  return run_query($sql);
}


function validate_cat($cat){
  $cats = range(10,50,10);
  return in_array($cat, $cats);
}


function validate_name($name){
  return (ctype_alnum($name) && strlen($name) <= 10);
}


function validate_time($time){
  echo $time;
  $format = "i:s:u";
  $d = date_parse_from_format($format, $time);
  return (strlen($time) <= 10);
}


function get_rank($cat=10, $score=0){
  $sql ="SELECT id, name, score, time,
    1+(SELECT count(*) from leaderboard a WHERE a.score > b.score) as RNK,
    FROM leaderboard b;";
  return run_query($sql);
}


function get_scores($cat=10, $limit=100){
  if(!validate_cat($cat)){
    die("Invalid Query");
  }
  $sql = "SELECT * FROM leaderboard WHERE category=$cat LIMIT 50 ORDER BY score DESC"; 
  return run_query($sql);
}


// insert random scoes into leaderboard for testing
function make_tests(){
  $cases = range(0, 50);
  $cats = range(10,50,10);
  foreach($cats as $c){
    foreach($cases as $i){
      $score = rand(1,8).":".rand(10,59).":".rand(10,59);
      $row = [
        'n' => rand(10000,99999),
        'c' => $c,
        't' => $score,
      ];
      insert_score($row);
    }
  }
}
