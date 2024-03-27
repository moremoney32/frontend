export function checkCookie(name) {
    // Sépare la chaîne de cookies en paires clé-valeur
    const cookies = document.cookie.split(';');
  
    // Parcourt chaque paire clé-valeur
    for (let cookie of cookies) {
      // Supprime les espaces en début et en fin de la chaîne
      cookie = cookie.trim();
      // Vérifie si le nom du cookie correspond à celui recherché
      if (cookie.startsWith(name + '=')) {
        // Si oui, le cookie existe
        return true;
      }
    }
    // Si le cookie n'est pas trouvé, il n'existe pas
    return false;
  }