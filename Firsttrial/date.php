<?php
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');

$time = date();
echo "data: The server time is: {$time}\n";
flush();
?>