let speech = new SpeechSynthesisUtterance();

// If unset, the <html lang="en"> lang value will be used, or the user-agent default if the <html lang="en"> lang is unset.
speech.lang = "en";

//Cancel any running speech if page refreshes
window.speechSynthesis.cancel();

// The volume property gets and sets the volume of the utterance. 
// It is a float that represents the volume value, between 0 (lowest) and 1 (highest). 
// The default value is 1 if this property is unset.
document.querySelector("#volume").addEventListener("input", () => {
  // Get volume Value from the input
  const volume = document.querySelector("#volume").value;

  // Set volume property of the SpeechSynthesisUtterance instance
  speech.volume = volume;

  // Update the volume label
  document.querySelector("#volume-label").innerHTML = volume;
});


// The rate property gets and sets the rate of the utterance. 
// It is a float representing the rate value which can range between 0.1 (lowest) and 10 (highest). 
// The default value is 1 if this property is unset.
document.querySelector("#rate").addEventListener("input", () => {
  // Get rate Value from the input
  const rate = document.querySelector("#rate").value;

  // Set rate property of the SpeechSynthesisUtterance instance
  speech.rate = rate;

  // Update the rate label
  document.querySelector("#rate-label").innerHTML = rate;
});


// The pitch property gets and sets the pitch of the utterance. 
// It is a float representing the pitch value that can range between 0 (lowest) and 2 (highest). 
// The default pitch is 1 if this property is unset.
document.querySelector("#pitch").addEventListener("input", () => {
  // Get pitch Value from the input
  const pitch = document.querySelector("#pitch").value;

  // Set pitch property of the SpeechSynthesisUtterance instance
  speech.pitch = pitch;

  // Update the pitch label
  document.querySelector("#pitch-label").innerHTML = pitch;
});

let voices = []; // global array

// To set the voice of the utterance, we need to get the list of available voices in the window object. 
// When the window object loads, the voices will not be available immediately. 
// It's an async operation. An event will be triggered when the voices are loaded.
window.speechSynthesis.onvoiceschanged = () => {
  // On Voices Loaded


  // Get List of Voices
  voices = window.speechSynthesis.getVoices();

  // Initially set the First Voice in the Array.
  speech.voice = voices[0];

  // Set the Voice Select List. (Set the Index as the value, which we'll use later when the user updates the Voice using the Select Menu.)
  let voiceSelect = document.querySelector("#voices");
  voices.forEach((voice, i) => (voiceSelect.options[i] = new Option(voice.name, i)));
};


document.querySelector("#voices").addEventListener("change", () => {
  speech.voice = voices[document.querySelector("#voices").value];
});


document.querySelector("#start").addEventListener("click", () => {
  speech.text = document.querySelector("textarea").value;
  window.speechSynthesis.speak(speech);

  // Show the Status Element
  document.querySelector("#status").style.display = "inline";
  document.querySelector("#status").innerHTML = "Playing ...";

  enableDisableButtons(true, false, false, true);
});

document.querySelector("#pause").addEventListener("click", () => {
  window.speechSynthesis.pause();

  // Show the Status Element
  document.querySelector("#status").style.display = "inline";
  document.querySelector("#status").innerHTML = "Paused ...";

  enableDisableButtons(true, false, true, false);
});

document.querySelector("#resume").addEventListener("click", () => {
  window.speechSynthesis.resume();
  
  // Show the Status Element
  document.querySelector("#status").style.display = "inline";
  document.querySelector("#status").innerHTML = "Playing ...";

  enableDisableButtons(true, false, false, true);
});

document.querySelector("#cancel").addEventListener("click", () => {
  window.speechSynthesis.cancel();
  
  // Hide the Status Element
  document.querySelector("#status").style.display = "none";
  
  document.querySelector("#cancel").disabled = true;

  enableDisableButtons(false, true, true, true);
});


function enableDisableButtons(disableStart, disableCancel, disablePause, disableResume) {
  document.querySelector("#start").disabled = disableStart;
  document.querySelector("#cancel").disabled = disableCancel;
  document.querySelector("#pause").disabled = disablePause;
  document.querySelector("#resume").disabled = disableResume;

  enableDisableSelectors(disableStart);
}

function enableDisableSelectors(disabled) {
  document.querySelector("#pitch").disabled = disabled;
  document.querySelector("#volume").disabled = disabled;
  document.querySelector("#rate").disabled = disabled;
  document.querySelector("#voices").disabled = disabled;
  document.querySelector("#textInput").disabled = disabled;
}

enableDisableButtons(false, true, true, true);

