<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(204);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["ok" => false, "error" => "Method not allowed"]);
    exit;
}

$name   = isset($_POST["name"]) ? trim($_POST["name"]) : "";
$email  = isset($_POST["email"]) ? trim($_POST["email"]) : "";
$phone  = isset($_POST["phone"]) ? trim($_POST["phone"]) : "";
$boxes  = isset($_POST["boxes"]) ? (int)$_POST["boxes"] : 0;
$amount = isset($_POST["amount"]) ? (int)$_POST["amount"] : 0;

if ($name === "" || $email === "" || $phone === "" || $boxes <= 0 || $amount <= 0) {
    http_response_code(400);
    echo json_encode(["ok" => false, "error" => "Invalid data"]);
    exit;
}

$logoUrl = "https://alkhalilwelfare.org/logo-white.png";

$screenshotUrl = "Not provided";
if (isset($_FILES["screenshot"]) && $_FILES["screenshot"]["error"] === UPLOAD_ERR_OK) {
    $uploadDir = __DIR__ . "/iftar_uploads/";
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }
    $tmpName = $_FILES["screenshot"]["tmp_name"];
    $originalName = basename($_FILES["screenshot"]["name"]);
    $ext = strtolower(pathinfo($originalName, PATHINFO_EXTENSION));
    $safeName = "ss_" . time() . "_" . bin2hex(random_bytes(4)) . "." . $ext;
    $destPath = $uploadDir . $safeName;
    if (move_uploaded_file($tmpName, $destPath)) {
        $screenshotUrl = "https://alkhalilwelfare.org/iftar_uploads/" . $safeName;
    }
}

$transactionId = "TXN-" . date("YmdHis") . "-" . rand(1000, 9999);

$template = '<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="x-apple-disable-message-reformatting">
    <title>Donation Confirmation - Al-Khalil Welfare</title>
    <!--[if mso]>
    <noscript>
        <xml>
            <o:OfficeDocumentSettings>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
    </noscript>
    <![endif]-->
    <style>
        @import url(\'https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Roboto:wght@300;400;500&display=swap\');
        
        /* Website Color Palette */
        /* Teal: #0d467e (Primary) */
        /* Gold: #f8a81a (Accent) */
        /* Cream: #fdfbf7 (Background) */
        
        table, td, div, h1, p {font-family: \'Roboto\', Arial, sans-serif;}
        .urdu-text { font-family: \'Amiri\', \'Traditional Arabic\', serif; direction: rtl; }
        .serif-text { font-family: \'Playfair Display\', Georgia, serif; }
        
        @media screen and (max-width: 530px) {
            .col-lge {max-width: 100% !important;}
            .mobile-padding {padding: 20px 15px !important;}
            .urdu-text {font-size: 18px !important; line-height: 30px !important;}
            h1.urdu-text {font-size: 28px !important; line-height: 38px !important;}
        }
        @media screen and (min-width: 531px) {
            .col-sml {max-width: 27% !important;}
            .col-lge {max-width: 73% !important;}
        }
    </style>
</head>
<body style="margin:0;padding:0;word-spacing:normal;background-color:#fdfbf7;">
    <div role="article" aria-roledescription="email" lang="en" style="text-size-adjust:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;background-color:#fdfbf7;">
        <table role="presentation" style="width:100%;border:none;border-spacing:0;">
            <tr>
                <td align="center" style="padding:20px 0;">
                    <!--[if mso]>
                    <table role="presentation" align="center" style="width:600px;">
                    <tr>
                    <td>
                    <![endif]-->
                    <table role="presentation" style="width:94%;max-width:600px;border:none;border-spacing:0;text-align:left;font-family:\'Roboto\',Arial,sans-serif;font-size:16px;line-height:22px;color:#333333;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow: 0 10px 25px rgba(13, 70, 126, 0.15);border: 1px solid rgba(13, 70, 126, 0.1);">
                        
                        <!-- Header with Logo -->
                        <tr>
                            <td class="mobile-padding" style="padding:40px 30px;text-align:center;background-color:#0d467e;background: linear-gradient(135deg, #0d467e 0%, #0a3560 100%);position:relative;">
                                <div style="position:absolute;top:0;left:0;width:100%;height:100%;background-image:url(\'https://alkhalilwelfare.org/wp-content/uploads/2023/03/pattern.png\');opacity:0.05;"></div>
                                <!-- Note: Use a white/transparent logo for best results on this dark background -->
                                <!-- Responsive Logo Container -->
                                <div style="width:100%;text-align:center;">
                                    <img src="{{logo_url}}" alt="Al-Khalil Welfare" width="220" style="width:100%;max-width:220px;height:auto;border:none;text-decoration:none;color:#ffffff;margin-bottom: 25px;position:relative;z-index:10;display:inline-block;">
                                </div>
                                <h1 class="urdu-text" style="margin:0;font-size:36px;line-height:46px;font-weight:700;color:#ffffff;text-shadow: 0 2px 4px rgba(0,0,0,0.2);position:relative;z-index:10;">جَزَاكُمُ اللّٰهُ خَيْرًا</h1>
                                <p class="serif-text" style="margin:8px 0 0;font-size:18px;color:#f8a81a;font-style:italic;position:relative;z-index:10;letter-spacing:0.5px;">May Allah Reward You With Goodness</p>
                            </td>
                        </tr>

                        <!-- Greeting & Confirmation -->
                        <tr>
                            <td class="mobile-padding" style="padding:40px 30px;">
                                <p style="margin:0 0 15px;color:#0d467e;font-size:18px;">Assalam-o-Alaikum <strong>{{name}}</strong>,</p>
                                <p style="margin:0 0 20px;color:#4a5568;">
                                    Thank you for your generous contribution to our <strong>Eid Package Campaign</strong>. Your support helps us provide Eid packages to orphans and widows, bringing joy to their lives.
                                </p>
                                <p class="urdu-text" style="margin:0 0 25px;font-size:20px;line-height:34px;text-align:right;color:#0d467e;border-right: 3px solid #f8a81a;padding-right: 15px;word-break:break-word;">
                                    ہماری عید مہم میں آپ کے تعاون کا بہت شکریہ۔ آپ کا یہ عطیہ یتیموں اور بیواؤں کی عید کی خوشیوں میں شامل ہونے میں ہماری مدد کرے گا۔
                                </p>
                                
                                <!-- Donation Details Box -->
                                <div style="background-color:#f8f9fa;border:1px solid #e2e8f0;border-radius:8px;padding:0;margin-bottom:30px;overflow:hidden;">
                                    <div style="background-color:#edf2f7;padding:12px 20px;border-bottom:1px solid #e2e8f0;">
                                        <h2 class="serif-text" style="margin:0;font-size:18px;color:#0d467e;font-weight:600;">Donation Summary</h2>
                                    </div>
                                    <div style="padding:20px;">
                                        <table role="presentation" style="width:100%;border:none;border-spacing:0;">
                                            <tr>
                                                <td style="padding:8px 0;font-size:15px;color:#718096;">Amount / <span class="urdu-text">رقم</span></td>
                                                <td style="padding:8px 0;font-weight:bold;text-align:right;color:#0d467e;font-size:16px;">PKR {{amount}}</td>
                                            </tr>
                                            <tr>
                                                <td style="padding:8px 0;border-top:1px dashed #e2e8f0;font-size:15px;color:#718096;">No. of Packages / <span class="urdu-text">پیکج</span></td>
                                                <td style="padding:8px 0;border-top:1px dashed #e2e8f0;font-weight:bold;text-align:right;color:#0d467e;font-size:16px;">{{boxes}}</td>
                                            </tr>
                                            <tr>
                                                <td style="padding:8px 0;border-top:1px dashed #e2e8f0;font-size:15px;color:#718096;">Transaction ID</td>
                                                <td style="padding:8px 0;border-top:1px dashed #e2e8f0;font-weight:bold;text-align:right;color:#4a5568;font-family:monospace;">#{{transaction_id}}</td>
                                            </tr>
                                            <tr>
                                                <td style="padding:8px 0;border-top:1px dashed #e2e8f0;font-size:15px;color:#718096;">Screenshot / <span class="urdu-text">اسکرین شاٹ</span></td>
                                                <td style="padding:8px 0;border-top:1px dashed #e2e8f0;font-weight:bold;text-align:right;color:#0d467e;font-size:16px;"><a href="{{screenshot_url}}" style="color:#085c97; text-decoration:underline;">View Image</a></td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>

                                <!-- Hadith Quote -->
                                <div style="text-align:center;padding:30px 20px;background-color:#fffbf2;border-radius:8px;border:1px solid #ffeeba;margin-bottom:25px;position:relative;">
                                    <span style="position:absolute;top:-12px;left:50%;transform:translateX(-50%);background-color:#f8a81a;color:#fff;padding:2px 12px;border-radius:12px;font-size:12px;font-weight:bold;text-transform:uppercase;letter-spacing:1px;">Hadith</span>
                                    <p class="serif-text" style="margin:0 0 15px;font-size:18px;line-height:28px;color:#555;font-style:italic;">
                                        "I and the one who looks after an orphan will be like this in Paradise," showing his middle and index fingers and separating them.
                                    </p>
                                    <p class="urdu-text" style="margin:0 0 10px;font-size:22px;line-height:36px;color:#0d467e;">
                                        "میں اور یتیم کی کفالت کرنے والا جنت میں اس طرح ہوں گے (اور آپ نے اپنی شہادت اور درمیانی انگلی کی طرف اشارہ کیا)۔"
                                    </p>
                                    <p style="margin:10px 0 0;font-size:12px;color:#a0aec0;text-transform:uppercase;letter-spacing:1px;font-weight:600;">— Sahih al-Bukhari</p>
                                </div>

                                <p style="margin:0 0 10px;color:#4a5568;font-size:15px;line-height:24px;">
                                    We will update you once your contribution has been utilized. If you have any questions, feel free to reply to this email or contact us on WhatsApp.
                                </p>
                            </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                            <td style="padding:30px;text-align:center;font-size:13px;background-color:#0d467e;color:#cbd5e0;border-top: 4px solid #f8a81a;">
                                <p style="margin:0 0 15px;">
                                    <a href="https://alkhalilwelfare.org" style="color:#ffffff;text-decoration:none;font-weight:bold;font-size:16px;">Al-Khalil Welfare</a>
                                </p>
                                <p style="margin:0 0 15px;">
                                    Karachi, Pakistan • +92 333 7299566
                                </p>
                                <div style="margin:0;">
                                    <a href="#" style="color:#cbd5e0;text-decoration:none;margin:0 8px;border-bottom:1px dotted #cbd5e0;">Unsubscribe</a>
                                    <span style="color:#4a5568;">|</span>
                                    <a href="#" style="color:#cbd5e0;text-decoration:none;margin:0 8px;border-bottom:1px dotted #cbd5e0;">Privacy Policy</a>
                                </div>
                                <p style="margin:20px 0 0;font-size:11px;opacity:0.6;">
                                    &copy; 2025 Al-Khalil Welfare. All rights reserved.
                                </p>
                            </td>
                        </tr>
                    </table>
                    <!--[if mso]>
                    </td>
                    </tr>
                    </table>
                    <![endif]-->
                </td>
            </tr>
        </table>
    </div>
</body>
</html>';

$template = str_replace("{{logo_url}}", $logoUrl, $template);
$template = str_replace("{{name}}", htmlspecialchars($name, ENT_QUOTES, 'UTF-8'), $template);
$template = str_replace("{{amount}}", number_format($amount), $template);
$template = str_replace("{{boxes}}", number_format($boxes), $template);
$template = str_replace("{{transaction_id}}", $transactionId, $template);
$template = str_replace("{{screenshot_url}}", $screenshotUrl, $template);

$userHtml = $template;
$adminHtml = $template;

$headers = [];
$headers[] = "From: Eid Package Campaign <info@alkhalilwelfare.org>";
$headers[] = "Reply-To: " . $email;
$headers[] = "MIME-Version: 1.0";
$headers[] = "Content-Type: text/html; charset=UTF-8";
$headers[] = "X-Mailer: PHP/" . phpversion();
$headersStr = implode("\r\n", $headers);

$adminTo = "info@alkhalilwelfare.org";
$adminSubject = "New Eid Package Donation Form Submission";
$sentAdmin = mail($adminTo, $adminSubject, $adminHtml, $headersStr);

$userTo = $email;
$userSubject = "Thank you for your Eid Package donation";
$sentUser = mail($userTo, $userSubject, $userHtml, $headersStr);

if ($sentAdmin) {
    echo json_encode([
        "ok" => true,
        "admin" => $sentAdmin,
        "user" => $sentUser,
        "screenshot" => $screenshotUrl,
    ]);
} else {
    http_response_code(500);
    echo json_encode(["ok" => false, "error" => "Mail send failed"]);
}