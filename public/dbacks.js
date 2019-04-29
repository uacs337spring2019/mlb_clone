/*
Benjamin Noriega, Logan West CSC 337, Spring 2019
FINAL PROJECT
File: dbacks.js
Due Date: April 24th, 2019
NetID: noriegab1, westl1
*/

(function() {
	"use strict";
	window.onload = pullRecord;

	/**
		Pulls record json from API
	*/
	function pullRecord() {
		let url = 'https://api.mysportsfeeds.com/v2.1/pull/mlb';
		url += '/2019-regular/team_stats_totals.json?team=ari';
		let apikey = "8cb8bd89-32ce-446d-b5f6-714475";
		let h = new Headers();
		h.append("Authorization", "Basic " + btoa(apikey + ":" + "MYSPORTSFEEDS"));

		let req = new Request(url, {
			method: 'GET',
			headers: h,

		});

		fetch(req)
			.then(checkStatus)
			.then(function(responseText){
				let json = JSON.parse(responseText);

				displayRecord(json);
				teamStats(json);

			});
	}

	/**
		Displays record for DBACKS
		@param {json} data - json for team data
	*/
	function displayRecord(data){
		let recordDiv = document.getElementById("record");

		let team = data["teamStatsTotals"][0];
		let wins = team["stats"]["standings"]["wins"];
		let loss = team["stats"]["standings"]["losses"];

		let recordStatement = document.createElement("p");

		recordStatement.innerHTML += wins + " - " + loss + "<br />";

		let runsF = team["stats"]["standings"]["runsFor"];
		let runsA= team["stats"]["standings"]["runsAgainst"];

		recordStatement.innerHTML += "<hr />Runs Scored: " + runsF + "<br />";
		recordStatement.innerHTML += "Runs Allowed: " + runsA + "<br />";

		recordDiv.appendChild(recordStatement);

	}

	/**
		Handles statistics for DBACKS
		@param {json} data - json for team data
	*/
	function teamStats(data) {
		let stats = data["teamStatsTotals"][0]["stats"];
		console.log(stats);
		
		let batStats = document.getElementById("batstats");

		let batting = stats["batting"];

		let avg = batting["battingAvg"];
		let homers = batting["homeruns"];
		let rbi = batting["runsBattedIn"];
		let obp = batting["batterOnBasePct"];
		let slg = batting["batterSluggingPct"];
		let ops = batting["batterOnBasePlusSluggingPct"];
		let sb = batting["stolenBases"];

		batStats.innerHTML = "AVG: " + avg + "<br />";
		batStats.innerHTML += "HR: " + homers + "<br />";
		batStats.innerHTML += "RBI: " + rbi + "<br />";
		batStats.innerHTML += "OBP: " + obp + "<br />";
		batStats.innerHTML += "SLG: " + slg + "<br />";
		batStats.innerHTML += "OPS: " + ops + "<br />";
		batStats.innerHTML += "Stolen Bases: " + sb + "<br />";

		let pitchStats = document.getElementById("pitchstats");

		let pitching = stats["pitching"];

		let era = pitching["earnedRunAvg"];
		let strikeouts = pitching["pitcherStrikeouts"];
		let pitchesThrown = pitching["pitchesThrown"];
		let whip = pitching["walksAndHitsPerInningPitched"];
		let ppi = pitching["pitchesPerInning"];

		pitchStats.innerHTML = "ERA: " + era + "<br />";
		pitchStats.innerHTML += "Strikeouts: " + strikeouts + "<br />";
		pitchStats.innerHTML += "Pitches Thrown: " + pitchesThrown + "<br />";
		pitchStats.innerHTML += "WHIP: " + whip + "<br />";
		pitchStats.innerHTML += "Pitches Per Inning: " + ppi + "<br />";

		let fieldStats = document.getElementById("fieldstats");

		let fielding = stats["fielding"];

		let fpct = fielding["fieldingPct"];
		let errors = fielding["errors"];
		let assists = fielding["assists"];

		fieldStats.innerHTML = "Fielding PCT: " + fpct + "%<br />";
		fieldStats.innerHTML += "Errors: " + errors + "<br />";
		fieldStats.innerHTML += "Assists: " + assists + "<br />";

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