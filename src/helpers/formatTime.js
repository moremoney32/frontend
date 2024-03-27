export function formatTime(timeCode) {
    const date = new Date(timeCode);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Les mois sont indexés à partir de 0
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    // Formatage de la date et de l'heure
    const formattedDate = `${day}/${month}/${year}`;
    const formattedTime = `${hours}:${minutes}:${seconds}`;

    // date et l'heure formatées
    return { date: formattedDate, time: formattedTime };
}