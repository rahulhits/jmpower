<?php
/*
 * JM Power Green — form handler for the contact and careers forms.
 * Works on BigRock / cPanel shared hosting (uses PHP mail()).
 * Change $to if enquiries should go to a different inbox.
 */
$to   = 'info@jmpowergreen.com';
$from = 'noreply@jmpowergreen.com';   // must be an address on your own domain

$allowedReturns = ['contact.html', 'careers.html', 'hi/contact.html', 'hi/careers.html'];
$return = isset($_POST['return']) && in_array($_POST['return'], $allowedReturns, true) ? $_POST['return'] : 'contact.html';

function back($page, $ok) {
    $anchor = (basename($page) === 'careers.html') ? '#apply' : '#form';
    header('Location: ' . $page . '?sent=' . ($ok ? '1' : '0') . $anchor);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') back($return, false);

// Honeypot: bots fill the hidden "website" field
if (!empty($_POST['website'])) back($return, true);

function clean($v, $max = 1000) {
    $v = trim(strip_tags((string)$v));
    $v = str_replace(["\r", "\n", "%0a", "%0d"], ' ', $v);
    return mb_substr($v, 0, $max);
}

$type    = clean($_POST['form_type'] ?? 'Website Enquiry', 60);
$name    = clean($_POST['name'] ?? '', 100);
$phone   = clean($_POST['phone'] ?? '', 20);
$email   = filter_var(trim($_POST['email'] ?? ''), FILTER_VALIDATE_EMAIL) ?: '';
$service = clean($_POST['service'] ?? '', 120);
$city    = clean($_POST['city'] ?? '', 100);
$message = trim(strip_tags((string)($_POST['message'] ?? '')));
$message = mb_substr($message, 0, 3000);
$lang    = clean($_POST['lang'] ?? 'English', 20);

if ($name === '' || !preg_match('/^[0-9+ ]{10,15}$/', $phone)) back($return, false);

$subject = "New $type from $name";
$body  = "New $type from jmpowergreen.com\n\n";
$body .= "Name:     $name\n";
$body .= "Phone:    $phone\n";
$body .= "Language: $lang\n";
$body .= "Email:    " . ($email ?: '-') . "\n";
$body .= ($type === 'Career Application' ? "Position: " : "Service:  ") . ($service ?: '-') . "\n";
if ($city !== '') $body .= "City:     $city\n";
$body .= "\nMessage:\n" . ($message ?: '-') . "\n\n";
$body .= "Sent: " . date('d M Y, h:i A') . "\n";

$headers  = "From: JM Power Website <$from>\r\n";
if ($email) $headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

$ok = @mail($to, $subject, $body, $headers, '-f' . $from);
back($return, $ok);
