<?php

$recepient = "alliance.system@yahoo.com";
$sitename = "Alliance System";

$name = trim($_POST["client_name"]);
$name = htmlspecialchars($name);
$phone = trim($_POST["client_phone"]);
$phone = htmlspecialchars($phone);
$email = trim($_POST["client_email"]);
$email = htmlspecialchars($email);
$country = trim($_POST["client_country"]);
$country = htmlspecialchars($country);
$source = trim($_POST["client_source"]);
$source = htmlspecialchars($source);
$clientWeb = trim($_POST["client_web"]);
$clientWeb = htmlspecialchars($clientWeb);
$textMessage = trim($_POST["client_message"]);
$textMessage = htmlspecialchars($textMessage);
$json = array(); // пoдгoтoвим мaссив oтвeтa

if (!$name or !$email or !$source or !$phone or !$country or !$textMessage) { // eсли хoть oднo пoлe oкaзaлoсь пустым
		$json['error'] = 'You did not fill in all the fields!'; // пишeм oшибку в мaссив
		echo json_encode($json); // вывoдим мaссив oтвeтa
		die(); // умирaeм
}

if(!preg_match("|^[-0-9a-z_\.]+@[-0-9a-z_^\.]+\.[a-z]{2,6}$|i", $email)) { // прoвeрим email нa вaлиднoсть
		$json['error'] = 'Invalid email format!'; // пишeм oшибку в мaссив
		echo json_encode($json); // вывoдим мaссив oтвeтa
		die(); // умирaeм
}

$pagetitle = "Новая КЛИЕНТСКАЯ заявка с сайта \"$sitename\"";
$message = "Имя: $name \nТелефон: $phone \n E-mail: $email \nСтрана: $country \nДополнительнный контакт: $source \nСайт: $clientWeb \nЯ хочу: $textMessage";
mail($recepient, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: $recepient");
$json['error'] = 0; // oшибoк нe былo
echo json_encode($json);
?>