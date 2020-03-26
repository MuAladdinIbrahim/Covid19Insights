const unirest = require("unirest");

const covid19_statics = (country, callback) => {
	var req = unirest("GET", "https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php");

	req.headers({
		"x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
		"x-rapidapi-key": "6b621c143fmsh1ed16a67b37ca5cp103437jsnfe3f8aa7a4ba"
	});


	req.end((res) => {
		if (res.error) throw new Error(res.error);
		let countriesData = []
		let countriesNames = []
		for (const i of res.raw_body.split('{')) {
			countriesData.push(i.split(',"'))
			countriesNames.push(i.split(',"')[0].split(':')[1])
		}
		for (const i of countriesData) {
			if (i[0].split(':')[1] == '"' + country + '"') {
				callback({
					//split string and send it 
					//there's another method to deal with buffer res
					countriesNames:countriesNames,
					country: i[0].split(':')[1].split('"')[1],
					cases: i[1].split(':')[1].split('"')[1],
					deaths: i[2].split(':')[1].split('"')[1],
					total_recovered: i[4].split(':')[1].split('"')[1],
					new_deaths: i[5].split(':')[1].split('"')[1],
					new_cases: i[6].split(':')[1].split('"')[1],
					active_cases: i[8].split(':')[1].split('"')[1]
				})
			}
		}
	 });
}
module.exports = covid19_statics