export const playSound = () => {
	const audio = new Audio("/audio_2.mp3");
	audio.currentTime = 0;
	audio.play().catch(err => {
		console.error("Sound error:", err);
	});
};
