const express = require("express");
const soap = require("soap");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const PORT = 8001;

// Charger le fichier WSDL
const wsdlPath = __dirname + "/CountryInfoService.xml";
const wsdl = fs.readFileSync(wsdlPath, "utf8");

// Service SOAP
const service = {
  CountryInfoService: {
    CountryInfoServiceSoap: {
      ListOfCountryNamesByCode: async () => {
        try {
          console.log("Méthode ListOfCountryNamesByCode appelée !");
          // Exemple de liste de pays
          const countries = [
            { sISOCode: "FR", sName: "France" },
            { sISOCode: "US", sName: "United States" },
            { sISOCode: "JP", sName: "Japan" },
          ];
          return {
            ListOfCountryNamesByCodeResult: {
              tCountryCodeAndName: countries,
            },
          };
        } catch (error) {
          console.error("Erreur lors de la récupération des pays :", error.message);
          throw {
            faultcode: "Server",
            faultstring: "Erreur lors de la récupération des pays : " + error.message,
          };
        }
      },
    },
  },
};

// Middleware pour traiter les requêtes SOAP
app.use(bodyParser.raw({ type: () => true, limit: "5mb" }));

// Configurer le service SOAP
soap.listen(app, "/soap/countries", service, wsdl, () => {
  console.log("Service SOAP démarré avec les méthodes suivantes :");
  console.log(Object.keys(service.CountryInfoService.CountryInfoServiceSoap));
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Service SOAP démarré sur http://localhost:${PORT}/soap/countries`);
});
 