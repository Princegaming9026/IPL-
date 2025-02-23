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
$m3u8_url = "https://jcevents.jiocinema.com/bpk-tv/JC_Sports18_1HD/JCHLS/hdntl=exp=1740378932~acl=%2F*~id=aaf549ec51984c86b32dd7de3e1334c7~data=hdntl~hmac=6029ae6ff841ccbb41d820a46f0a255ad02a678707e7c6ad9a63bd546d3ee24d/JC_Sports18_1HD-audio_108038_eng=108000-video=2297600.m3u8";

// Fetch Stream & Serve as Proxy
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $m3u8_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
$response = curl_exec($ch);
curl_close($ch);

echo $response;
?>
