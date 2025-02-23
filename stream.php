<?php
session_start();

// Secure Token
$valid_token = "secure123"; // Change this token for better security

// Verify Token
if (!isset($_GET['token']) || $_GET['token'] !== $valid_token) {
    die("Access Denied");
}

// Set Headers
header("Content-Type: application/vnd.apple.mpegurl");
header("Access-Control-Allow-Origin: *");

// M3U8 Stream URL (Update with a working link)
$m3u8_url = "https://jcevents.jiocinema.com/bpk-tv/JC_Sports18_1HD/JCHLS/hdntl=exp=1740378932~acl=%2F*~id=aaf549ec51984c86b32dd7de3e1334c7~data=hdntl~hmac=6029ae6ff841ccbb41d820a46f0a255ad02a678707e7c6ad9a63bd546d3ee24d/JC_Sports18_1HD-audio_108038_eng=108000-video=2297600.m3u8ae6ff841ccbb41d820a46f0a255ad02a678707e7c6ad9a63bd546d3ee24d/JC_Sports18_1HD-audio_108038_eng=108000-video=2297600.m3u8";

// Fetch M3U8 File Using cURL
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $m3u8_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

// Spoof Headers to Bypass Restrictions
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    "Referer: https://www.jiocinema.com/",
    "Origin: https://www.jiocinema.com"
]);

$response = curl_exec($ch);
$error = curl_error($ch);
curl_close($ch);

// Error Handling
if ($response === false) {
    die("Error fetching the stream: " . $error);
}

echo $response;
?>
