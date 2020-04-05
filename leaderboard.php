<?php
$host = "localhost"; 
$user = "root"; 
$password = "root"; 
$dbname = "smath"; 

$con = mysqli_connect($host, $user, $password,$dbname);

$method = $_SERVER['REQUEST_METHOD'];
$request = explode('/', trim($_SERVER['PATH_INFO'],'/'));
//$input = json_decode(file_get_contents('php://input'),true);


if (!$con) {
  die("Connection failed: " . mysqli_connect_error());
}


switch ($method) {
    case 'GET':
      $cat = $_GET['category'];
      $sql = "select * from leaderboard where cat=$cat limit 100 orderby score desc"; 
      break;
    case 'POST':
      $name = $_POST["name"];
      $time = $_POST["time"];
      $cat = $_POST["cat"];
      $score = 0;
      $hash = $_POST["hash"];

      $sql = "insert into leaderboard (name, time, cat, score) values ('$name', '$time', '$cat', '$score')"; 
      break;
}

// run SQL statement
$result = mysqli_query($con,$sql);

// die if SQL statement failed
if (!$result) {
  http_response_code(404);
  die(mysqli_error($con));
}

if ($method == 'GET') {
    if (!$id) echo '[';

    for ($i=0 ; $i<mysqli_num_rows($result) ; $i++) {
      echo ($i>0?',':'').json_encode(mysqli_fetch_object($result));
    }

    if (!$id) echo ']';

} elseif ($method == 'POST') {
  echo json_encode($result);
} else {
  echo mysqli_affected_rows($con);
}


$con->close();