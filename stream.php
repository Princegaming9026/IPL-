<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/vnd.apple.mpegurl");

$valid_token = "secure123"; // Secure Token
$m3u8_file = "https://jcevents.jiocinema.com/bpk-tv/JC_Sports18_1HD/JCHLS/hdntl=exp=1740378932~acl=%2F*~id=aaf549ec51984c86b32dd7de3e1334c7~data=hdntl~hmac=6029ae6ff841ccbb41d820a46f0a255ad02a678707e7c6ad9a63bd546d3ee24d/JC_Sports18_1HD-audio_108038_eng=108000-video=2297600.m3u8"; // Your secure M3U8 file

// Check if token is provided
if (!isset($_GET['token']) || $_GET['token'] !== $valid_token) {
    http_response_code(403);
    echo "Access Denied!";
    exit;
}

// Stream the M3U8 file securely
echo file_get_contents($m3u8_file);
?>
