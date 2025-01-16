const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());

// Fichier contenant la liste des pays
const countriesFile = "./all_countries_list.json";

// Charger la liste des pays depuis le fichier JSON
const loadCountries = () => {
  if (fs.existsSync(countriesFile)) {
    const data = fs.readFileSync(countriesFile, "utf8");
    return JSON.parse(data);
  }
  return [];
};

// Sauvegarder les pays dans le fichier JSON
const saveCountries = (countries) => {
  fs.writeFileSync(countriesFile, JSON.stringify(countries, null, 2), "utf8");
};

// GET /api/pays : Récupérer toutes les informations de tous les pays
app.get("/api/pays", (req, res) => {
  try {
    const countries = loadCountries();
    res.json(countries);
  } catch (error) {
    console.error("Erreur lors de la récupération des pays :", error.message);
    res.status(500).json({ message: "Erreur lors de la récupération des pays" });
  }
});

// GET /api/pays/:name : Récupérer les informations d'un pays spécifique par son nom
app.get("/api/pays/:name", (req, res) => {
  const countryName = req.params.name.toLowerCase();
  try {
    const countries = loadCountries();
    const country = countries.find(
      (c) => c.name.common.toLowerCase() === countryName
    );

    if (!country) {
      return res.status(404).json({ message: `Pays "${req.params.name}" introuvable` });
    }

    res.json(country);
  } catch (error) {
    console.error(`Erreur lors de la récupération du pays "${req.params.name}" :`, error.message);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
});

// POST /api/pays : Ajouter un pays fictif
app.post("/api/pays", (req, res) => {
  const { name, capital, region, population, area } = req.body;

  if (!name || !capital || !region || !population || !area) {
    return res
      .status(400)
      .json({ message: "Tous les champs sont requis : name, capital, region, population, area" });
  }

  try {
    const countries = loadCountries();

    // Vérifier si le pays existe déjà
    const countryExists = countries.some((country) => country.name.common.toLowerCase() === name.toLowerCase());
    if (countryExists) {
      return res.status(409).json({ message: `Le pays "${name}" existe déjà` });
    }

    const newCountry = {
      name: { common: name },
      capital: [capital],
      region,
      population,
      area,
    };

    countries.push(newCountry);
    saveCountries(countries);

    res.status(201).json({ message: "Pays ajouté avec succès", country: newCountry });
  } catch (error) {
    console.error("Erreur lors de l'ajout du pays fictif :", error.message);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
});

// DELETE /api/pays/:name : Supprimer un pays par son nom
app.delete("/api/pays/:name", (req, res) => {
  const countryName = req.params.name.toLowerCase();

  try {
    let countries = loadCountries();
    const initialLength = countries.length;

    countries = countries.filter(
      (country) => country.name.common.toLowerCase() !== countryName
    );

    if (countries.length === initialLength) {
      return res.status(404).json({ message: `Le pays "${req.params.name}" n'existe pas` });
    }

    saveCountries(countries);
    res.json({ message: `Le pays "${req.params.name}" a été supprimé avec succès` });
  } catch (error) {
    console.error(`Erreur lors de la suppression du pays "${req.params.name}" :`, error.message);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
});

// Démarrer le serveur
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
  console.log("Namespace utilisé :", "http://www.oorsprong.org/websamples.countryinfo");
});


