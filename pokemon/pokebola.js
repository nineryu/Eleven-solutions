// Adiciona a função da Pokébola no final ou dentro do fluxo de batalha
const pokeball = document.getElementById("pokeball");

// Função para iniciar a animação de captura
function startCaptureAnimation() {
  pokeball.style.display = "block"; // Mostra a Pokébola

  // Usa GSAP para animar o movimento da Pokébola
  gsap.fromTo(
    pokeball,
    { x: 0, y: 300 }, // Ponto inicial (fora da tela)
    {
      x: 300, // Movimento horizontal
      y: -100, // Movimento vertical (lance)
      duration: 1.5, // Duração da animação
      ease: "power2.inOut", // Suaviza o movimento
      onComplete: () => {
        // Ao completar o movimento de captura, oculta a Pokébola novamente
        gsap.to(pokeball, {
          opacity: 0,
          duration: 0.5,
          onComplete: () => {
            pokeball.style.display = "none"; // Oculta após a captura
            pokeball.style.opacity = 1; // Reseta opacidade
          },
        });
      },
    }
  );
}

// Função de captura durante a batalha
function capturePokemon() {
  if (battle.started) {
    startCaptureAnimation();
  }
}
