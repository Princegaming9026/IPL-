<?php
// Start session for security
session_start();

// Secure token (Change this dynamically)
$valid_token = "secure123"; // Change this token as needed

// Check if token is provided
if (!isset($_GET['token']) || $_GET['token'] !== $valid_token) {
    die("Access Denied"); // Stop unauthorized access
}

// Set headers for streaming
header("Content-Type: application/vnd.apple.mpegurl");
header("Access-Control-Allow-Origin: *");

// Secure M3U8 link (Replace with your actual link)
$m3u8_url = "https://hocdn.news/live/starhindi.m3u8";

// Stream the M3U8 file
echo file_get_contents($m3u8_url);
?>
