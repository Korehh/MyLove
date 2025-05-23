document.addEventListener("DOMContentLoaded", function () {
    const cake = document.querySelector(".cake");
    const candleCountDisplay = document.getElementById("candleCount");
    let candles = [];
    let audioContext;
    let analyser;
    let microphone;
    let audio = new Audio('fools.mp3');
  
  
    function updateCandleCount() {
      const activeCandles = candles.filter(
        (candle) => !candle.classList.contains("out")
      ).length;
      candleCountDisplay.textContent = activeCandles;
    }
  
    function addCandle(left, top) {
      const candle = document.createElement("div");
      candle.className = "candle";
      candle.style.left = left + "px";
      candle.style.top = top + "px";
  
      const flame = document.createElement("div");
      flame.className = "flame";
      candle.appendChild(flame);
  
      cake.appendChild(candle);
      candles.push(candle);
      updateCandleCount();
    }
  
    cake.addEventListener("click", function (event) {
        // Attempt to unlock audio on first user click
        if (audio.paused) {
            audio.play().then(() => {
            audio.pause();
            audio.currentTime = 0;
            console.log("Audio unlocked");
            }).catch(err => {
            console.log("Audio unlock failed:", err);
            });
        }
  
      const rect = cake.getBoundingClientRect();
      const left = event.clientX - rect.left;
      const top = event.clientY - rect.top;
      addCandle(left, top);
      // 💬 Update the speech bubble
       onCakeTap();
    });
  
    function isBlowing() {
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyser.getByteFrequencyData(dataArray);
  
      let sum = 0;
      for (let i = 0; i < bufferLength; i++) {
        sum += dataArray[i];
      }
      let average = sum / bufferLength;
  
      return average > 50; //ETO CHANGEEEEEE
    }
  
    function blowOutCandles() {
        let blownOut = 0;
      
        // Only check for blowing if there are candles and at least one is not blown out
        if (candles.length > 0 && candles.some((candle) => !candle.classList.contains("out"))) {
          if (isBlowing()) {
            cakeMessage.classList.add("hidden");
            candles.forEach((candle) => {
              if (!candle.classList.contains("out") && Math.random() > 0.5) {
                candle.classList.add("out");
                blownOut++;
              }
            });
          }
      
          if (blownOut > 0) {
            updateCandleCount();
          }
      
          // If all candles are blown out, trigger confetti after a small delay
          if (candles.every((candle) => candle.classList.contains("out"))) {
            setTimeout(function() {
              triggerConfetti();
              endlessConfetti(); // Start the endless confetti

          
              // Redirect to the second page after 2 seconds
              setTimeout(function() {
                window.location.href = "happybirthdaylove.html"; // Replace with the actual URL of your second page
              }, 5000);
            }, 200);
            
          }
        }
      }
  
  
  
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(function (stream) {
          audioContext = new (window.AudioContext || window.webkitAudioContext)();
          analyser = audioContext.createAnalyser();
          microphone = audioContext.createMediaStreamSource(stream);
          microphone.connect(analyser);
          analyser.fftSize = 256;
          setInterval(blowOutCandles, 200);
        })
        .catch(function (err) {
          console.log("Unable to access microphone: " + err);
        });
    } else {
      console.log("getUserMedia not supported on your browser!");
    }
  });
  
  function triggerConfetti() {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }
  
  function endlessConfetti() {
    setInterval(function() {
      confetti({
        particleCount: 200,
        spread: 90,
        origin: { y: 0 }
      });
    }, 1000);
  }
  
  // Initial state
const cakeMessage = document.getElementById("cake-message");

// When user taps the cake
function onCakeTap() {
  cakeMessage.textContent = "Blow the candles, love!";
}
const button = document.getElementById("show-btn");
const image = document.getElementById("image");

button.addEventListener("click", () => {
    image.style.display = "block";  // This will show the image when the button is clicked
});
