<?php

namespace App\Controller;

use Exception as GlobalException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Mailer\MailerInterface;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;

class EmailController extends AbstractController
{
    #[Route('/sendEmail', name: 'app_send_email', methods:["POST"])]
    public function sendEmail(MailerInterface $mailer): Response
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $mail = new PHPMailer(true);
        $recipient = '';
        $nom = $data['name'];
        $prenom = $data['firstname'];
        $adresse = $data['address'];
        $formation = $data['formation'];
        $formationLabel = '';
        switch($formation){
            case 1:
                $recipient = 'informatique@sgi-groupe.fr';
                $formationLabel = 'Informatique';
                break;
            case 2:
                $recipient = 'extranet@sgi-groupe.fr';
                $formationLabel = 'Développement';
                break;
            case 3:
                $recipient = 'christian.sorace@sgi-groupe.fr';
                $formationLabel = 'Systèmes et réseaux';
                break;
            case 4:
                $recipient = 'florian.bouchez@sgi-groupe.fr';
                $formationLabel = 'Autre';
                break;
        }
        
        try {
            //Server settings
            $mail->SMTPDebug = SMTP::DEBUG_SERVER;
            $mail->CharSet = 'UTF-8';
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
            $mail->Subject = 'Formation';
            $mail->Body    = "<p>Nom: $nom<br>Prénom: $prenom<br>Adresse: $adresse<br>Formation: $formationLabel</p>";

            $mail->send();
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
