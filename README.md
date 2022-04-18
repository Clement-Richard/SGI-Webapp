<div align="center">
    <h3 align="center">SGI-Webapp</h3>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table des Matières</summary>
  <ol>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prérequis">Prérequis</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
  </ol>
</details>

### Prérequis

* Projet local:
<a href="https://getcomposer.org/download/">Composer Downloads</a>
<a href="https://nodejs.org/fr/">Node.js Downloads</a>
<a href="https://www.apachefriends.org/xampp-files/8.1.4/xampp-windows-x64-8.1.4-1-VS16-installer.exe">Xampp 8.1.4</a>

Installation de yarn
```sh
   npm install --global yarn
```
   
### Installation

1. Cloner le repo
   ```sh
   git clone https://github.com/Clement-Richard/SGI-Webapp.git
   ```
2. Installer les packages composer
   ```sh
   composer install
   ```
2. Installer les packages node
   ```sh
   yarn
   ```
3. Configuration de PHPMailer dans le fichier .env
   ```env
    ###> PHPMailer ###
    PHPMAILER_HOST=smtp-mail.outlook.com
    PHPMAILER_USERNAME=sgi-webapp@outlook.com
    PHPMAILER_PASSWORD=N8j6Xn4Yc3Gm
    PHPMAILER_PORT=587
    ###< PHPMailer ###
   ```
   
 4. Effectuer un build npm
   ```sh
    npm run build
   ```

<p align="right">(<a href="#top">back to top</a>)</p>
