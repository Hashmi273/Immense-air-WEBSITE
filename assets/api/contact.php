<?php
/**
 * ============================================
 * CONTACT FORM HANDLER - Immense Air Pvt. Ltd.
 * ============================================
 * Uses PHPMailer for reliable email delivery
 */

// ===== Error Reporting =====
error_reporting(E_ALL);
ini_set('display_errors', 1);

// ===== Include PHPMailer =====
require_once 'PHPMailer-master/src/Exception.php';
require_once 'PHPMailer-master/src/PHPMailer.php';
require_once 'PHPMailer-master/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// ============================================
// CONFIGURATION - YAHAN APNI DETAILS DAALO
// ============================================

$config = [
    // 👇 Company Email (Jahan form submission aayegi)
    'to_email' => 'support@immensesmartsolutions.com',
    'to_name' => 'Immense Air Support',
    
    // 👇 SMTP Settings (Gmail ya hosting provider ke)
    'smtp_host' => 'smtp.gmail.com',        // Gmail: smtp.gmail.com
    'smtp_port' => 587,                      // Gmail: 587 (TLS)
    'smtp_secure' => 'tls',                  // Gmail: tls
    'smtp_auth' => true,
    'smtp_username' => 'your-email@gmail.com',  // 👈 Apna email
    'smtp_password' => 'your-app-password',     // 👈 App password
    
    // Company Name
    'company_name' => 'Immense Air Pvt. Ltd.',
    
    // Success Message
    'success_message' => 'Thank you! Your message has been sent successfully. Our team will get back to you within 24 hours.',
    
    // Error Message
    'error_message' => 'Oops! Something went wrong. Please try again later.',
];

// ============================================
// PROCESS FORM
// ============================================

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    // Sanitize Inputs
    $name = trim(filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING));
    $company = trim(filter_input(INPUT_POST, 'company', FILTER_SANITIZE_STRING));
    $mobile = trim(filter_input(INPUT_POST, 'mobile', FILTER_SANITIZE_STRING));
    $email = trim(filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL));
    $service = trim(filter_input(INPUT_POST, 'service', FILTER_SANITIZE_STRING));
    $message = trim(filter_input(INPUT_POST, 'message', FILTER_SANITIZE_STRING));
    $optin = isset($_POST['optin']) ? 'Yes' : 'No';
    
    // ===== Validation =====
    $errors = [];
    
    if (empty($name) || strlen($name) < 2) {
        $errors[] = 'Please enter your full name.';
    }
    if (empty($mobile) || !preg_match('/^[0-9+\-\s]{10,15}$/', $mobile)) {
        $errors[] = 'Please enter a valid mobile number.';
    }
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'Please enter a valid email address.';
    }
    if (empty($service)) {
        $errors[] = 'Please select a service.';
    }
    if (empty($message) || strlen($message) < 10) {
        $errors[] = 'Please enter a message (minimum 10 characters).';
    }
    if ($optin === 'No') {
        $errors[] = 'Please agree to receive communications.';
    }
    
    // ============================================
    // SEND EMAIL USING PHPMailer
    // ============================================
    
    if (empty($errors)) {
        
        try {
            $mail = new PHPMailer(true);
            
            // SMTP Configuration
            $mail->isSMTP();
            $mail->Host = $config['smtp_host'];
            $mail->SMTPAuth = $config['smtp_auth'];
            $mail->Username = $config['smtp_username'];
            $mail->Password = $config['smtp_password'];
            $mail->SMTPSecure = $config['smtp_secure'];
            $mail->Port = $config['smtp_port'];
            
            // Sender & Recipient
            $mail->setFrom($email, $name);
            $mail->addReplyTo($email, $name);
            $mail->addAddress($config['to_email'], $config['to_name']);
            
            // Email Content
            $mail->isHTML(true);
            $mail->Subject = '[Immense Air] New Enquiry From ' . $name;
            
            // Email Body
            $mail->Body = '
            <!DOCTYPE html>
            <html>
            <head><meta charset="UTF-8"></head>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                    <div style="background: #0B1732; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
                        <h2 style="color: #FF6A00; margin: 0;">📩 New Enquiry Received</h2>
                        <p style="color: #fff;">' . $config['company_name'] . '</p>
                    </div>
                    <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px;">
                        <p><strong>👤 Name:</strong> ' . htmlspecialchars($name) . '</p>
                        <p><strong>🏢 Company:</strong> ' . htmlspecialchars($company ?: 'Not provided') . '</p>
                        <p><strong>📱 Mobile:</strong> ' . htmlspecialchars($mobile) . '</p>
                        <p><strong>📧 Email:</strong> <a href="mailto:' . htmlspecialchars($email) . '">' . htmlspecialchars($email) . '</a></p>
                        <p><strong>📦 Service:</strong> <span style="background: #FF6A00; color: #fff; padding: 2px 10px; border-radius: 4px; font-size: 12px;">' . htmlspecialchars(ucfirst(str_replace('-', ' ', $service))) . '</span></p>
                        <p><strong>✅ Opt-in:</strong> ' . $optin . '</p>
                        <p><strong>💬 Message:</strong></p>
                        <div style="background: #fff; padding: 15px; border-radius: 8px; border-left: 3px solid #FF6A00;">' . nl2br(htmlspecialchars($message)) . '</div>
                    </div>
                    <div style="text-align: center; padding: 20px; color: #888; font-size: 12px;">
                        <p>This enquiry was sent from the Immense Air website contact form.</p>
                        <p>&copy; ' . date('Y') . ' ' . $config['company_name'] . '</p>
                    </div>
                </div>
            </body>
            </html>
            ';
            
            // Send email to company
            $mail->send();
            
            // ============================================
            // SEND AUTO-REPLY TO USER
            // ============================================
            
            $replyMail = new PHPMailer(true);
            $replyMail->isSMTP();
            $replyMail->Host = $config['smtp_host'];
            $replyMail->SMTPAuth = $config['smtp_auth'];
            $replyMail->Username = $config['smtp_username'];
            $replyMail->Password = $config['smtp_password'];
            $replyMail->SMTPSecure = $config['smtp_secure'];
            $replyMail->Port = $config['smtp_port'];
            
            $replyMail->setFrom($config['to_email'], $config['to_name']);
            $replyMail->addAddress($email, $name);
            
            $replyMail->isHTML(true);
            $replyMail->Subject = 'Thank you for contacting Immense Air!';
            
            $replyMail->Body = '
            <!DOCTYPE html>
            <html>
            <head><meta charset="UTF-8"></head>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <div style="max-width: 500px; margin: 0 auto; padding: 20px;">
                    <div style="background: #0B1732; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
                        <h2 style="color: #FF6A00; margin: 0;">🙏 Thank You!</h2>
                    </div>
                    <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px;">
                        <p>Dear ' . htmlspecialchars($name) . ',</p>
                        <p>Thank you for contacting <strong>' . $config['company_name'] . '</strong></p>
                        <p>We have received your enquiry regarding <strong>' . htmlspecialchars(ucfirst(str_replace('-', ' ', $service))) . '</strong>.</p>
                        <p>Our team will get back to you within <strong>24 hours</strong>.</p>
                        <hr style="border: none; border-top: 1px solid #e9ecef; margin: 20px 0;">
                        <p style="font-size: 14px; color: #888;">
                            <strong>Your enquiry details:</strong><br>
                            📱 Mobile: ' . htmlspecialchars($mobile) . '<br>
                            📧 Email: ' . htmlspecialchars($email) . '
                        </p>
                        <p style="font-size: 14px; color: #888;">
                            If you have any urgent queries, please call us at:<br>
                            <strong style="color: #FF6A00; font-size: 18px;">+91 9372 38222</strong>
                        </p>
                        <p style="font-size: 12px; color: #aaa; margin-top: 20px;">
                            ⚡ This is an auto-generated email. Please do not reply.
                        </p>
                    </div>
                    <div style="text-align: center; padding: 20px; color: #888; font-size: 12px;">
                        <p>&copy; ' . date('Y') . ' ' . $config['company_name'] . '</p>
                    </div>
                </div>
            </body>
            </html>
            ';
            
            $replyMail->send();
            
            // ===== Success Response =====
            echo json_encode([
                'success' => true,
                'message' => $config['success_message']
            ]);
            
        } catch (Exception $e) {
            // ===== Mail Error =====
            echo json_encode([
                'success' => false,
                'message' => 'Mail Error: ' . $mail->ErrorInfo
            ]);
        }
        
    } else {
        // ===== Validation Error =====
        echo json_encode([
            'success' => false,
            'message' => implode(' ', $errors)
        ]);
    }
    
} else {
    header('Location: ../../contact.html');
    exit;
}
?>