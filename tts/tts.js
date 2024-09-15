// import { createWriteStream } from "node:fs";
// import * as PlayHTAPI from "playht";

// PlayHTAPI.init({
//   apiKey: '9c9d42209f6f4e69890198fe12d85cf6',
//   userId: 'eVPjX0peBbUQ2ASzbOPkoWZAWiQ2',
// });

// // PLAYHT_USER_ID='eVPjX0peBbUQ2ASzbOPkoWZAWiQ2'

// // PLAYHT_API_KEY='9c9d42209f6f4e69890198fe12d85cf6'
// // 
// // Warm up the network caching
// let warmupStream = await PlayHTAPI.stream("b", {
//   voiceId:
//     "s3://voice-cloning-zero-shot/d9ff78ba-d016-47f6-b0ef-dd630f59414e/female-cs/manifest.json",
// });

// warmupStream.once("data", () => {
//   const sentences = [
//     "hello, play support speaking?",
//     "Please hold on a sec, uh Let me just, um, pull up your details real quick.",
//     "Can you tell me your account email or, ah your phone number?",
//     "Okay, there you are.",
//     "So, what are you actually looking for in the upgrade? Any, uh, specific features or stuff that you’ve got your eye on?",
//     "I’m sorry for the inconvenience, um, but we’ve had a few system updates lately.",
//     "Is there a, um, particular reason you’re thinking of changing your current plan?",
//     "Uh, just to clarify, you’re looking to upgrade to the premium package, right?",
//     "If you could, um, provide me with the error message you received, I can help you better.",
//     "Thank you for your patience. I’ll, ah, have this sorted out for you in just a moment.",
//     "Were there any other, uh, issues or concerns you wanted to address today?",
//     "Alright, your changes have been, um, saved. You should receive an email confirmation shortly."
//   ];

//   const TTFBs = []; // Array to store TTFB for each sentence

//   const streamAudio = async () => {
//     const grpcFileStream = createWriteStream("hello-play.mp3", {
//       flags: "a", // This ensures that each stream result is appended to the file
//     });

//     for (let [i, sentence] of sentences.entries()) {
//       const startTime = Date.now(); // Start the timer

//       const grpcStream = await PlayHTAPI.stream(sentence, {
//         voiceId:
//           "s3://voice-cloning-zero-shot/d9ff78ba-d016-47f6-b0ef-dd630f59414e/female-cs/manifest.json",
//         outputFormat: 'mp3', // 'mulaw'
//         speed: 1,
//         textGuidance: 2.0,
//         voiceEngine: 'PlayHT2.0-turbo'
//       });

//       let chunkCounter = 0;
//       let firstChunkReceived = false;
//       grpcStream.on("data", (chunk) => {
//         chunkCounter += 1;
//         if (chunkCounter === 2 && !firstChunkReceived) {
//           const TTFB = Date.now() - startTime; // Calculate TTFB
//           console.log(`TTFB for sentence ${i}: ${TTFB}ms`);
//           TTFBs.push(TTFB); // Store the TTFB in the array
//           firstChunkReceived = true;
//         }
//         grpcFileStream.write(chunk);
//       });

//       await new Promise((resolve, reject) => {
//         grpcStream.on("end", resolve);
//         grpcStream.on("error", reject);
//       });
//     }

//     grpcFileStream.end();

//     // Calculate average TTFB
//     const avgTTFB = TTFBs.reduce((sum, value) => sum + value, 0) / TTFBs.length;

//     // Calculate median TTFB
//     const sortedTTFBs = [...TTFBs].sort((a, b) => a - b);
//     const mid = Math.floor(sortedTTFBs.length / 2);
//     const medianTTFB =
//       sortedTTFBs.length % 2 === 0
//         ? (sortedTTFBs[mid - 1] + sortedTTFBs[mid]) / 2
//         : sortedTTFBs[mid];

//     console.log(`Average TTFB: ${avgTTFB.toFixed(2)}ms`);
//     console.log(`Median TTFB: ${medianTTFB}ms`);

//     process.exit(0); // Exit the script
//   };

//   streamAudio().catch((error) => {
//     console.error("Error:", error);
//     process.exit(1);
//   });
// });
