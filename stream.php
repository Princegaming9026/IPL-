<?php
header("Content-Type: application/vnd.apple.mpegurl");

// Token for Secure Access
$valid_token = "secure123";
$user_token = isset($_GET['token']) ? $_GET['token'] : '';

if ($user_token !== $valid_token) {
    header("HTTP/1.1 403 Forbidden");
    die("Access Denied");
}

// Original M3U8 Stream URL (HIDDEN from Frontend)
$m3u8_url = "http://link.luckonline.eu/live/0c:89:10:e8:1c:d4/869/505.m3u8";

// Fetch Stream & Serve as Proxy
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $m3u8_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
$response = curl_exec($ch);
curl_close($ch);

echo $response;
?>
