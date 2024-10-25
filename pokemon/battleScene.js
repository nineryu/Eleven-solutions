const battleBackgroundImage = new Image();
battleBackgroundImage.src = "./IMG/battleBackground.png";

const battleBackground = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  image: battleBackgroundImage,
});

// Ajuste para as dimensões da imagem de fundo
battleBackground.width = canvas.width;
battleBackground.height = canvas.height;

let lapras;
let charmeleon;
let renderedSprites;
let battleAnimationId;
let queue;

const pokeball = document.getElementById("pokeball");

// Variável para garantir que a animação do mapa não seja chamada múltiplas vezes
let returningToMap = false;

// Função para gerar uma chance de captura
function captureChance() {
  const chance = Math.random();
  const captureRate = 0.5;
  return chance <= captureRate;
}

// Função para iniciar a animação de captura
function startCaptureAnimation() {
  pokeball.style.display = "block"; // Mostra a Pokébola

  // Exibe a mensagem "Aguarde..." enquanto a captura acontece
  showMessageAndFade("Aguarde...", () => {
    // Usa GSAP para animar o movimento da Pokébola
    gsap.fromTo(
      pokeball,
      { x: 0, y: 300 }, // Ponto inicial
      {
        x: 300, // Movimento horizontal
        y: -100, // Movimento vertical
        duration: 1.5, // Duração da animação
        ease: "power2.inOut", // Suaviza o movimento
        onComplete: () => {
          // Determina se a captura foi bem-sucedida
          const captured = captureChance();

          if (captured) {
            // Se a captura for bem-sucedida, encerra a luta e retorna ao mapa
            gsap.to(pokeball, {
              opacity: 0,
              duration: 0.5,
              onComplete: () => {
                pokeball.style.display = "none";
                pokeball.style.opacity = 1;
                removeLapras(); // Lapras desaparece
                endBattleWithCapture(); // Encerra a luta e volta ao mapa
              },
            });
          } else {
            // Se a captura falhar, exibe "A captura falhou! Tente novamente."
            showMessageAndFade("A captura falhou! Tente novamente.", () => {
              gsap.to(pokeball, {
                x: 0,
                y: 300,
                opacity: 0,
                duration: 0.5,
                onComplete: () => {
                  pokeball.style.display = "none";
                  pokeball.style.opacity = 1;
                },
              });
            });
          }
        },
      }
    );
  });
}

// Função para fazer Lapras desaparecer após a captura bem-sucedida
function removeLapras() {
  // Remove Lapras do array de sprites renderizados
  renderedSprites = renderedSprites.filter(sprite => sprite !== lapras);
  // Exibe a mensagem de captura bem-sucedida com fade
  showMessageAndFade("Você capturou o Pokémon!", () => {
    // Após o fade e a mensagem, volta ao mapa
    endBattleWithCapture();
  });
}

// Função para exibir mensagens e escurecer a tela temporariamente
function showMessageAndFade(message, callback) {
  // Escurece a tela
  gsap.to("#overlappingDiv", {
    opacity: 1,
    duration: 0.5,
    onComplete: () => {
      displayBattleMessage(message);
      setTimeout(() => {
        // Retorna a tela ao normal após 1 segundo
        gsap.to("#overlappingDiv", {
          opacity: 0,
          duration: 0.5,
          onComplete: callback || (() => {}),
        });
      }, 1000); // Pausa de 1 segundo antes de continuar
    },
  });
}

// Função para exibir a mensagem no log de batalha
function displayBattleMessage(message) {
  const battleLog = document.querySelector("#battleLog");
  battleLog.style.display = "block";
  battleLog.innerHTML = message;
}

// Função para finalizar a batalha e retornar ao mapa após captura bem-sucedida
function endBattleWithCapture() {
  if (returningToMap) return;
  returningToMap = true;

  // Finaliza a batalha imediatamente após a captura
  cancelAnimationFrame(battleAnimationId);
  document.querySelector("#userInterface").style.display = "none";
  animate(); // Retorna ao mapa
  battle.started = false;
  audio.Map.play();

  gsap.to("#overlappingDiv", {
    opacity: 1,
    duration: 0.5,
    onComplete: () => {
      showMessageAndFade("Você capturou o Pokémon!", () => {
        returningToMap = false;
        gsap.to("#overlappingDiv", {
          opacity: 0,
          duration: 0.5,
        });
      });
    },
  });
}

function initBattle() {
  document.querySelector("#userInterface").style.display = "block";
  document.querySelector("#battleLog").style.display = "none";
  document.querySelector("#barraDeVidaInimiga").style.width = "100%";
  document.querySelector("#barraDeVidaPlayer").style.width = "100%";
  document.querySelector("#attacksBox").replaceChildren();

  lapras = new Monster(monsters.Lapras);
  charmeleon = new Monster(monsters.Charmeleon);
  renderedSprites = [lapras, charmeleon];
  queue = [];

  charmeleon.attacks.forEach((attack) => {
    const button = document.createElement("button");
    button.innerHTML = attack.name;
    document.querySelector("#attacksBox").append(button);
  });

  document.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", (e) => {
      const selectedSkill = attacks[e.currentTarget.innerHTML];
      charmeleon.attack({
        attack: selectedSkill,
        atacado: lapras,
        renderedSprites,
      });

      if (lapras.health <= 0) {
        queue.push(() => {
          lapras.faint();
        });

        // Adiciona a pausa antes de Lapras desaparecer
        queue.push(() => {
          setTimeout(() => {
            showMessageAndFade("Você capturou o Pokémon!", () => {
              removeLapras(); // Remove Lapras da tela após a mensagem
            });
          }, 2000); // Pausa de 2 segundos
        });

        queue.push(() => {
          gsap.to("#overlappingDiv", {
            opacity: 1,
            onComplete: () => {
              cancelAnimationFrame(battleAnimationId);
              animate(); // Volta ao mapa após a pausa e a mensagem
              document.querySelector("#userInterface").style.display = "none";
              gsap.to("#overlappingDiv", {
                opacity: 0,
              });
              battle.started = false;
              audio.Map.play();
            },
          });
        });
      }

      const randomAttack = lapras.attacks[Math.floor(Math.random() * lapras.attacks.length)];
      queue.push(() => {
        lapras.attack({
          attack: randomAttack,
          atacado: charmeleon,
          renderedSprites,
        });

        if (charmeleon.health <= 0) {
          queue.push(() => {
            charmeleon.faint();
          });
          queue.push(() => {
            gsap.to("#overlappingDiv", {
              opacity: 1,
              onComplete: () => {
                cancelAnimationFrame(battleAnimationId);
                animate();
                document.querySelector("#userInterface").style.display = "none";
                gsap.to("#overlappingDiv", {
                  opacity: 0,
                });
                battle.started = false;
                audio.Map.play();
              },
            });
          });
        }
      });
    });

    button.addEventListener("mouseenter", (e) => {
      const attackType = attacks[e.currentTarget.innerHTML];
      document.querySelector("#attackType").innerHTML = attackType.type;
      document.querySelector("#attackType").style.color = attackType.color;
    });

    button.addEventListener("mouseleave", (e) => {
      document.querySelector("#attackType").innerHTML = "";
    });
  });

  const captureButton = document.createElement("button");
  captureButton.innerHTML = "Capturar";
  document.querySelector("#attacksBox").append(captureButton);

  captureButton.addEventListener("click", () => {
    startCaptureAnimation();
  });
}

function animateBattle() {
  battleAnimationId = window.requestAnimationFrame(animateBattle);

  k.drawImage(battleBackgroundImage, 0, 0, canvas.width, canvas.height);

  renderedSprites.forEach((sprite) => {
    sprite.draw();
  });
}

document.querySelector("#battleLog").addEventListener("click", (e) => {
  if (queue.length > 0) {
    queue[0]();
    queue.shift();
  } else e.currentTarget.style.display = "none";
});
