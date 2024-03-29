const { parse } = require("csv-parse");
const fs = require("fs");

const planets = [];

// Filtering Planets
const isHabitablePlanet = (planet) => {
	return (
		planet["koi_disposition"] === "CONFIRMED" &&
		planet["koi_insol"] > 0.36 &&
		planet["koi_insol"] < 1.11 &&
		planet["koi_prad"] < 1.6
	);
};

fs.createReadStream("kepler_data.csv")
	.pipe(
		parse({
			comment: "#",
			columns: true,
		})
	)
	.on("data", (data) => {
		if (isHabitablePlanet(data)) planets.push(data);
	})
	.on("error", (err) => {
		console.log(err);
	})
	.on("end", () => {
		console.log("Done reading file");
		console.log(`${planets.length} habitable planets found!`);
		console.log(planets.map((planet) => planet["kepler_name"]));
	});
