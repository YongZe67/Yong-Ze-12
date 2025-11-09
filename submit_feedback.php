<?php
include 'db_config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $name = htmlspecialchars(trim($_POST['name']));
  $rating = intval($_POST['rating']);
  $comment = htmlspecialchars(trim($_POST['comment']));

  if (!empty($name) && $rating > 0 && $rating <= 5 && !empty($comment)) {
    $conn = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

    if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
    }

    $stmt = $conn->prepare("INSERT INTO feedback (name, rating, comment) VALUES (?, ?, ?)");
    $stmt->bind_param("sis", $name, $rating, $comment);
    $stmt->execute();

    $stmt->close();
    $conn->close();

    header("Location: index.php#feedback");
    exit();
  } else {
    echo "Invalid input. Please provide a name, rating (1-5), and comment.";
  }
} else {
  echo "Invalid request.";
}
?>