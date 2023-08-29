const fs = require('fs');
const path = require('path');

function loadModels() {
	const modelsDir = path.join(__dirname, "../models");
	fs.readdirSync(modelsDir).forEach(file => {
		const modelPath = path.join(modelsDir, file);
		require(modelPath);
		console.log(`Loaded model: ${modelPath}`);
	});
}

module.exports = loadModels;
