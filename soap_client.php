<?php
// Activer l'affichage des erreurs pour le développement (à désactiver en production)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

try {
    // URL du WSDL
    $wsdl = "http://localhost:8001/soap/countries?wsdl";

    // Options du client SOAP
    $options = [
        'trace' => 1, // Pour afficher les requêtes et réponses SOAP
        'exceptions' => true, // Activer la gestion des exceptions
        'cache_wsdl' => WSDL_CACHE_NONE, // Désactiver le cache WSDL
    ];

    // Créer un client SOAP
    $client = new SoapClient($wsdl, $options);

    // Appeler la méthode ListOfCountryNamesByCode
    $response = $client->__soapCall("ListOfCountryNamesByCode", []);

    // Vérifiez si la réponse contient les données attendues
    if (isset($response->ListOfCountryNamesByCodeResult->tCountryCodeAndName)) {
        echo "<h1>Liste des pays</h1>";
        echo "<ul>";

        // Parcourir la liste des pays
        foreach ($response->ListOfCountryNamesByCodeResult->tCountryCodeAndName as $country) {
            $name = htmlspecialchars($country->sName);
            $code = htmlspecialchars($country->sISOCode);

            echo "<li>";
            echo "<strong>Nom :</strong> $name<br>";
            echo "<strong>Code ISO :</strong> $code";
            echo "</li>";
        }
        echo "</ul>";
    } else {
        echo "<p>Erreur : Aucune donnée reçue ou format inattendu.</p>";
    }

    // Afficher les détails pour le debug
    echo "<h1>Détails de la réponse SOAP brute</h1>";
    echo "<pre>";
    print_r($response);
    echo "</pre>";

} catch (SoapFault $fault) {
    echo "<h1>Erreur SOAP</h1>";
    $code = property_exists($fault, 'faultcode') ? htmlspecialchars($fault->faultcode) : "Code non défini";
    $message = property_exists($fault, 'faultstring') ? htmlspecialchars($fault->faultstring) : "Message non défini";
    echo "<p><strong>Code :</strong> {$code}</p>";
    echo "<p><strong>Message :</strong> {$message}</p>";
} catch (Exception $e) {
    echo "<h1>Erreur Générale</h1>";
    echo "<p><strong>Message :</strong> " . htmlspecialchars($e->getMessage()) . "</p>";
}
?>
