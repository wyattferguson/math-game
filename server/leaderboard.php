<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

$domain = "http://localhost:1234/";

header('Access-Control-Allow-Origin: '.$domain);
header('Access-Control-Allow-Methods: POST, GET');
header('Access-Control-Allow-Headers: Content-Type, X-Auth-Token, Origin, Authorization');
header('Content-Type: application/x-www-form-urlencoded');

$host = "localhost"; 
$user = "root"; 
$password = "root"; 
$dbname = "smath";

if(isset($_SERVER['HTTP_REFERER']) && $_SERVER['HTTP_REFERER'] == $domain){

  $con = mysqli_connect($host, $user, $password, $dbname);

  if (!$con) {
    die("Connection failed: " . mysqli_connect_error());
  }

  $method = $_SERVER['REQUEST_METHOD'];

  switch ($method) {
    case 'GET':
      if(isset($_GET['c'])){
        if(isset($_GET['s'])){
          $result = get_rank($_GET['c'], $_GET['s']);
          echo json_encode($result);
        }else{
          $result = get_scores($_GET['c']);
          $rows = $result->fetch_all(MYSQLI_ASSOC);
          echo json_encode($rows);
        }
      }
      break;
      
    case 'POST':
      if(isset($_POST['c']) && isset($_POST['t']) && isset($_POST['n'])){
        $result = insert_score($_POST);
        echo json_encode($result);
      }
      break;
  }

  mysqli_close($con);
}


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

  if(!validate_cat($cat) || !validate_time($time) || !validate_name($name)){
    die("Invalid Score");
  }

  $cln_score = clean_time($time);
  $sql = "INSERT INTO leaderboard (name, time, category, score) VALUES ('$name', '$time', '$cat', '$cln_score')"; 
  return run_query($sql);
}


function clean_time($time){
  $score = str_replace(":","",$time);
  $cln_score = ltrim($score, '0');
  return $cln_score;
}


function validate_cat($cat){
  $cats = range(10,50,10);
  return in_array($cat, $cats);
}


function validate_name($name){
  return (ctype_alnum($name) && strlen($name) <= 16);
}


function validate_time($time){
  $format = "i:s:u";
  $d = date_parse_from_format($format, $time);
  return (strlen($time) <= 11);
}


function get_rank($cat=10, $time=0){
  $score = clean_time($time);
  $sql = "SELECT COUNT(*) AS count FROM leaderboard WHERE score < $score AND category = $cat ORDER BY score ASC";
  $result = run_query($sql);
  $rows = $result->fetch_all(MYSQLI_ASSOC);
  $count = $rows[0]['count'] + 1;
  return $count;
}


function get_scores($cat=10, $limit=50){
  if(!validate_cat($cat)){
    die("Invalid Query");
  }
  $sql = "SELECT * FROM leaderboard WHERE category=$cat ORDER BY score ASC LIMIT $limit"; 
  return run_query($sql);
}


// insert random scoes into leaderboard for testing
function make_tests(){
  $cases = range(0, 50);
  $cats = range(10,50,10);
  foreach($cats as $c){
    foreach($cases as $i){
      $score = "0".rand(1,8).":".rand(10,59).":".rand(100,999);
      $row = [
        'n' => rand(10000,99999),
        'c' => $c,
        't' => $score,
      ];
      insert_score($row);
    }
  }
}
