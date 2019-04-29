/*
Benjamin Noriega, Logan West CSC 337, Spring 2019
FINAL PROJECT
File: baseball.js
Due Date: April 24th, 2019
NetID: noriegab1, westl1
*/

(function() {
	"use strict";
	window.onload = function() {
		let standingButton = document.getElementById("standButton");
		standingButton.onclick = pullStandings;
	};

	/**
		Standings Pull from API
	*/
	function pullStandings() {
		let url = 'https://api.mysportsfeeds.com/v2.1/pull';
		url += '/mlb/2019-regular/standings.json';
		let apikey = "8cb8bd89-32ce-446d-b5f6-714475";
		let h = new Headers();
		h.append("Authorization", "Basic " + btoa(apikey + ":" + "MYSPORTSFEEDS"));

		let req = new Request(url, {
			method: 'GET',
			headers: h,

		});

		fetch(url)
			.then(checkStatus)
			.then(function(responseText){
				let json = JSON.parse(responseText);
 
				displayStandings(json);

			});
	}

	/**
		Display function for standing feature
		@param {json} data - standing data for teams
	*/
	function displayStandings(data) {

		let standingDiv = document.getElementById("standings");
		standingDiv.style.display = "block";
		let standButton = document.getElementById("standButton");
		standButton.style.display = "none";

		let standingTable = document.getElementById("standingtable");
		standingTable.innerHTML = "";


		let dbacks = data["teams"][0];
		let rockies = data["teams"][8];
		let dodgers = data["teams"][13];
		let padres = data["teams"][22];
		let giants = data["teams"][23];

		let division = {};

		division[dbacks["divisionRank"]["rank"]] = dbacks;
		division[rockies["divisionRank"]["rank"]] = rockies;
		division[dodgers["divisionRank"]["rank"]] = dodgers;
		division[padres["divisionRank"]["rank"]] = padres;
		division[giants["divisionRank"]["rank"]] = giants;

		let legend = document.createElement("tr");
		let rankL = document.createElement("th");
		rankL.innerHTML += "Rank";
		let nameL = document.createElement("th");
		nameL.innerHTML += "Team";
		let recordL = document.createElement("th");
		recordL.innerHTML += "W - L";
		legend.appendChild(rankL);
		legend.appendChild(nameL);
		legend.appendChild(recordL);
		standingTable.appendChild(legend);

		let row1 = document.createElement("tr");
		let rank1 = document.createElement("td");
		rank1.innerHTML += 1;
		let name1 = document.createElement("td");
		name1.innerHTML += division[1]["team"]["city"] + " " + division[1]["team"]["name"];
		let record1 = document.createElement("td");
		record1.innerHTML = division[1]["stats"]["standings"]["wins"] + " - ";
		record1.innerHTML += division[1]["stats"]["standings"]["losses"];
		row1.appendChild(rank1);
		row1.appendChild(name1);
		row1.appendChild(record1);
		standingTable.appendChild(row1);

		let row2 = document.createElement("tr");
		let rank2 = document.createElement("td");
		rank2.innerHTML += 2;
		let name2 = document.createElement("td");
		name2.innerHTML += division[2]["team"]["city"] + " " + division[2]["team"]["name"];
		let record2 = document.createElement("td");
		record2.innerHTML = division[2]["stats"]["standings"]["wins"] + " - ";
		record2.innerHTML += division[2]["stats"]["standings"]["losses"];
		row2.appendChild(rank2);
		row2.appendChild(name2);
		row2.appendChild(record2);
		standingTable.appendChild(row2);

		let row3 = document.createElement("tr");
		let rank3 = document.createElement("td");
		rank3.innerHTML += 3;
		let name3 = document.createElement("td");
		name3.innerHTML += division[3]["team"]["city"] + " " + division[3]["team"]["name"];
		let record3 = document.createElement("td");
		record3.innerHTML = division[3]["stats"]["standings"]["wins"] + " - ";
		record3.innerHTML += division[3]["stats"]["standings"]["losses"];
		row3.appendChild(rank3);
		row3.appendChild(name3);
		row3.appendChild(record3);
		standingTable.appendChild(row3);

		let row4 = document.createElement("tr");
		let rank4 = document.createElement("td");
		rank4.innerHTML += 4;
		let name4 = document.createElement("td");
		name4.innerHTML += division[4]["team"]["city"] + " " + division[4]["team"]["name"];
		let record4 = document.createElement("td");
		record4.innerHTML = division[4]["stats"]["standings"]["wins"] + " - ";
		record4.innerHTML += division[4]["stats"]["standings"]["losses"];
		row4.appendChild(rank4);
		row4.appendChild(name4);
		row4.appendChild(record4);
		standingTable.appendChild(row4);

		let row5 = document.createElement("tr");
		let rank5 = document.createElement("td");
		rank5.innerHTML += 5;
		let name5 = document.createElement("td");
		name5.innerHTML += division[5]["team"]["city"] + " " + division[5]["team"]["name"];
		let record5 = document.createElement("td");
		record5.innerHTML = division[5]["stats"]["standings"]["wins"] + " - ";
		record5.innerHTML += division[5]["stats"]["standings"]["losses"];
		row5.appendChild(rank5);
		row5.appendChild(name5);
		row5.appendChild(record5);
		standingTable.appendChild(row5);


		console.log(division);
	}

	/**
		Error checking
		@param {string} response - response text
		@return {string} response text - error status
	*/
	function checkStatus(response) {
		if(response.status >= 200 && response.status < 300) {
			return response.text();
		} else {
			return Promise.reject(new Error(response.status + ": " + response.statusText));
		}
	}

})();