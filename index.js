"use strict";
/**
 * @author EngAhmedAbdelfatah
 * @description fetch Data from API
 * @returns JSON object of films information
 */
const filmsURL = "https://swapi.co/api/films";
$(document).ready(() => {
  $("#result").hide();
});
const APICall = url => {
  //fetch get request
  return fetch(url)
    .then(res => {
      return res.json();
    })
    .then(data => {
      return data;
    })
    .catch(err => {
      console.log(err);
      return [];
    });
};
const results = async () => {
  let filmsResponse = await APICall(filmsURL);
  let resultRes = filmsResponse.results;
  //1st answer
  let max_opening_crawl_movie = [maxOpening_crawl(resultRes).title];
  showAnswer("one", max_opening_crawl_movie);
  //2nd answer
  let max_character_movie_api = maxCharacter(resultRes);
  let max_character_api_res = await APICall(max_character_movie_api);
  let character_name = [max_character_api_res.name];
  showAnswer("two", character_name);
  //3rd answer
  let max_species_movie_api = maxSpecies(resultRes);
  let max_species_movie_res = await APICall(max_species_movie_api);
  let species_name = [max_species_movie_res.name];
  showAnswer("three", species_name);
  //4th answer
  let plant_movie_api = planet(resultRes);
  console.log(plant_movie_api);
  let names = [];
  for (let index = 0; index < plant_movie_api.length; index++) {
    let apiRes = await APICall(plant_movie_api[index]);
    names.push(apiRes.name);
  }
  showAnswer("four", names);
  $("#result").show();
};

//get max opening_crawl
const maxOpening_crawl = resultsArr => {
  const maxObj = resultsArr.reduce((pre, cur) => {
    return (pre.opening_crawl
    ? pre.opening_crawl.length
    : 0 > cur.opening_crawl.length)
      ? pre
      : cur;
  });
  return maxObj;
};
//get most character person appeared
const maxCharacter = resultsArr => {
  //collecting character from arry
  const char = resultsArr.map(element => {
    return [...element.characters];
  });
  //add arrays in only one array
  const joinedArr = [];
  char.forEach(char => {
    joinedArr.push(...char);
  });
  //filter to get most repeated character api
  let result = joinedArr.reduce(
    (prev, curr, index, arr) =>
      arr.filter(element => element === prev).length >=
      arr.filter(element => element === curr).length
        ? prev
        : curr,
    null
  );
  return result;
};
//get species
const maxSpecies = resultsArr => {
  //collecting character from arry
  const char = resultsArr.map(element => {
    return [...element.species];
  });
  //add arrays in only one array
  const joinedArr = [];
  char.forEach(char => {
    joinedArr.push(...char);
  });
  let result = joinedArr.reduce(
    (prev, curr, index, arr) =>
      arr.filter(element => element === prev).length >=
      arr.filter(element => element === curr).length
        ? prev
        : curr,
    null
  );
  return result;
};
//get planet
const planet = resultsArr => {
  const maxObj = resultsArr.reduce((pre, cur) => {
    return pre.vehicles.length > cur.vehicles.length ? pre : cur;
  });
  return maxObj.planets;
};
//show answer
const showAnswer = (id, data) => {
  let htmlData = "";
  data.forEach(element => {
    htmlData += `${element} <br>`;
  });
  $(`#${id}`).html(htmlData);
};
