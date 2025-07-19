export const saveRecommendations = (genres) => {
  const recommendations =
    JSON.parse(localStorage.getItem("recommendations")) || [];

  genres?.forEach((newGenre) => {
    const exist = recommendations.find(
      (existingGenre) => existingGenre.id === newGenre.id
    );

    if (!exist) recommendations.push(newGenre);
  });

  localStorage.setItem("recommendations", JSON.stringify(recommendations));
};
