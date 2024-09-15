export default function startSpeechRecognition(callback) {
    // Check if the browser supports the Web Speech API
    if (!('webkitSpeechRecognition' in window)) {
        console.error("Your browser does not support the Web Speech API");
        return;
    }

    // Initialize SpeechRecognition object (webkit prefix is for Chrome)
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

    // Set the recognition language (can be customized)
    recognition.lang = 'en-US'; // Example: English (US)

    // Continuous recognition (if you want it to keep listening after the user stops talking)
    recognition.continuous = false;

    // Interim results give real-time updates while speaking (optional)
    recognition.interimResults = false;

    // Event handler when speech recognition has a result
    recognition.onresult = function (event) {
        // event.results contains the recognized words
        const speechToText = event.results[0][0].transcript;
        console.log("Transcribed Text: ", speechToText);

        // Trigger callback with transcribed text
        if (callback && typeof callback === 'function') {
            callback(speechToText);
        }
    };

    // Event handler for errors
    recognition.onerror = function (event) {
        console.error("Speech recognition error: ", event.error);
    };

    // Event handler when recognition ends (either completed or stopped)
    recognition.onend = function () {
        console.log("Speech recognition service disconnected");
    };

    // Start speech recognition
    recognition.start();
    console.log("Speech recognition started. Please speak.");
}

// Example usage of the function
startSpeechRecognition(function (transcription) {
    // Use the transcribed text
    console.log("Final Transcription: ", transcription);
});
