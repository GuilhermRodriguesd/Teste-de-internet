let startTime, endTime;
let imageSize = "";
let image = new Image();
let bitSpeed = document.getElementById("bits"),
    kbSpeed = document.getElementById("kbs"),
    mbSpeed = document.getElementById("mbs"),
    info = document.getElementById("info");

let totalBitSpeed = 0;
let totalKbSpeed = 0;
let totalMbSpeed = 0;
let numTests = 1;
let testCompleted = 0;

// Imagem aleatoria
let imageApi = "https://source.unsplash.com/random?topic=nature";

////função para calcular a velocidade
image.onload = async function () {
    endTime = new Date().getTime();

    // Get image size
    await fetch(imageApi).then((response) => {
        imageSize = response.headers.get("content-length");
        calculateSpeed();
    });
};

//função para calcular a velocidade
function calculateSpeed() {
    // Time taken in seconds
    let timeDuration = (endTime - startTime) / 1000;
    // Total bits
    let loadedBits = imageSize * 8;
    let speedInBts = loadedBits / timeDuration;
    let speedInKbs = speedInBts / 1024;
    let speedInMbs = speedInKbs / 1024;

    totalBitSpeed += speedInBts;
    totalKbSpeed += speedInKbs;
    totalMbSpeed += speedInMbs;

    testCompleted++;

    // If all tests completed (we get 5 image then calculate average)
    if (testCompleted === numTests) {
        let averageSpeedInBps = (totalBitSpeed / numTests).toFixed(2);
        let averageSpeedInKbps = (totalKbSpeed / numTests).toFixed(2);
        let averageSpeedInMbps = (totalMbSpeed / numTests).toFixed(2);

        // Display average speeds
        bitSpeed.innerHTML += `${averageSpeedInBps}`;
        kbSpeed.innerHTML += `${averageSpeedInKbps}`;
        mbSpeed.innerHTML += `${averageSpeedInMbps}`;
        info.innerHTML = "Teste completo!";
    } else {
        // Run the next test
        startTime = new Date().getTime();
        image.src = imageApi;
    }
}

// funão inicial para iniciar teste
const init = async () => {
    info.innerHTML = "Calculando...";
    startTime = new Date().getTime();
    image.src = imageApi;
};

// exxecutar testes quando a janela for careregada
window.onload = () => {
    for (let i = 0; i < numTests; i++) {
        init();
    }
};

//butão
document.addEventListener('DOMContentLoaded', function() {
    // Selecionando o botão
    var resetButton = document.querySelector('.reset-button');

    // Adicionando um ouvinte de evento de clique ao botão
    resetButton.addEventListener('click', function() {
        // Resetando a página
        location.reload();
    });
});