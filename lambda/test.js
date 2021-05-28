const index = require('./index.js');

main();

async function main(){
	try {
		await index.handler(
            {
				"awslogs": {
				  "data": "H4sIAAAAAAAAADVQXXOiMBT9K0xeV50QPkJ4WqpoV7tIK1htcRjQQHEN0BDQruN/b9TpTB5uzjn33nPuGTDaNElOg6+aAhuMnMCJ/7qLhTNxQQ9Ux5JyCUPD0KChmyqBqoQPVT7hVVtLJivKnPKaF6WQ1Z1bCE4TJsnmVkCJNm3abHlRi6Iqx8VBUN4A+x2EDeWjRCR3CGxu7W5HS3Glz6DYySmaqWIdIpVougaJRpD8IqRjAk2saRaGhCCTIIhMKYIGtEwLasS05FpRyHgiYdKpaiJ0Veq6hmDvJ7Yc/y471T40+ggHENvyIX0gNaqGf0FoQ7hR/EdfearyXCYcePPgz9C1lat15erdVpRzBIS8XwTsCLQS7+8kHoFeBLItC6p/tLxRmXu0dquT/sC3KWLDJUfThp1sx3eImrqPcRivRdj48dcRLZ+PmRquZ+uHJlvgSWuqb1nA9/PPF0Ta/6vwKd1j36t91p2Mug1cny13JMPpKg0nXbzaj6eWl+PXGXtFU8wOH2S27PoL7I1yEburz9T7yHxszAnuXCcYb8djmAzftt7LzTRlSXG4O6ZlnvyuOM2rUt5R0AHdtRG4KFEJLpvLNyUPOxc+AgAA"
				}
			}
		);
	} catch(e) {
		console.log(e);
	}
}