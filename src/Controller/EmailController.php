<?php

namespace App\Controller;

use Exception as GlobalException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mailer\Exception\ExceptionInterface;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;
use Symfony\Component\Mime\Email;

class EmailController extends AbstractController
{
    #[Route('/sendEmail', name: 'app_send_email', methods:["POST"])]
    public function sendEmail(MailerInterface $mailer): Response
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $mail = new PHPMailer(true);
        $recipient = '';
        switch($data['formation']){
            case 1:
                $recipient = 'informatique@sgi-groupe.fr';
                break;
            case 2:
                $recipient = 'extranet@sgi-groupe.fr';
                break;
            case 3:
                $recipient = 'christian.sorace@sgi-groupe.fr';
                break;
            case 4:
                $recipient = 'florian.bouchez@sgi-groupe.fr';
                break;
        }
        
        try {
            //Server settings
            $mail->SMTPDebug = SMTP::DEBUG_SERVER;
            $mail->isSMTP();
            $mail->Host       = $_ENV['PHPMAILER_HOST'];
            $mail->SMTPAuth   = true;
            $mail->Username   = $_ENV['PHPMAILER_USERNAME'];
            $mail->Password   = $_ENV['PHPMAILER_PASSWORD'];
            $mail->SMTPSecure = 'tls';
            $mail->Port       = $_ENV['PHPMAILER_PORT'];

            //Recipients
            $mail->setFrom($_ENV['PHPMAILER_USERNAME']);
            $mail->addAddress($recipient);

            //Content
            $mail->isHTML(true);
            $mail->Subject = 'Here is the subject';
            $mail->Body    = 'This is the HTML message body <b>in bold!</b>';
            $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

            //$mail->send();
            return new Response(
                "Email envoyé à $recipient", 200
            );
        }
        catch(GlobalException $e) {
            echo $e;
            return new Response(
                "L'email n'a pas pu être envoyé", 502
            );
        }
    }
}
