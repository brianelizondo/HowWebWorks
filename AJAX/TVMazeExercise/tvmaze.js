/** 
* Given a query string, return array of matching shows:
*  { id, name, summary, episodesUrl }

* Search Shows
*   - given a search term, search for tv shows that match that query.  The function is async show it will be returning a promise.
*   - Returns an array of objects. Each object should include following show information:
*       {
          id: <show id>,
          name: <show name>,
          summary: <show summary>,
          image: <an image from the show data, or a default imege if no image exists, (image isn't needed until later)>
        }
*/
async function searchShows(query) {
  // TODO: Make an ajax request to the searchShows api.  
  // Remove hard coded data.
  try {
    const resp = await axios.get('https://api.tvmaze.com/search/shows', {params: {q: query }});
    // set a new array with the shows info (id, name, summary, image, url)
    let showsArr = [];
    for(let showData of resp.data) {
      let showInfo = {};
      showInfo.id = showData.show.id;
      showInfo.name = showData.show.name;
      showInfo.summary = showData.show.summary;
      showInfo.image = showData.show.image;
      showInfo.url = showData.show.url;
      showsArr.push(showInfo);
    }
    return showsArr;
  } catch (e) {
    alert("Search term not found in TVmaze");
  }
}

/*
* Populate episodes list:
*   - given list of episodes, add episodes to DOM
*/
function populateEpisodes(episodes){
  // show the EPISODES-AREA
  $("#episodes-area").show();
  // empty the area if it is filled with information
  const $episodesList = $("#episodes-list");
  $episodesList.empty();
  // show the info of all episodes to DOM
  for (let episode of episodes) {
    let $episodeInfo = $(`<li>${episode.name} (season ${episode.season}, number ${episode.number})</li>`);
    $episodesList.append($episodeInfo);
  }
}


/*
* Populate shows list:
*   - given list of shows, add shows to DOM
*/
async function getEpisodesByID(showID){
  // return the episodes list by ID show
  const episodesList = await getEpisodes(showID);
  // show the episodes to DOM
  populateEpisodes(episodesList);
}

function populateShows(shows) {
  const $showsList = $("#shows-list");
  $showsList.empty();
  let showImage = 'generic_image.png';

  for (let show of shows) {
    if(show.image != null){ showImage = show.image.medium; }

    let $item = $(`
      <div class="col-md-6 col-lg-3 Show" data-show-id="${show.id}">
        <div class="card" data-show-id="${show.id}">
          <img class="card-img-top" src="${showImage}">  
          <div class="card-body">
            <h5 class="card-title">${show.name}</h5>
            <p class="card-text">${show.summary}</p>
            <button class="btn btn-info getEpisodes">Episodes</button>
          </div>
        </div>
      </div>
    `);
    $showsList.append($item);
  }

  // Find all episodes buttons to assign eventlistener to this
  let $episodesButtons = $('.getEpisodes');
  $episodesButtons.on('click', function(){
    // get the SHOW-ID of each card
    const showID = $(this).parent().parent().data('show-id');
    getEpisodesByID(showID);
  });
}


/*
* Handle search form submission:
*   - hide episodes area
*   - get list of matching shows and show in shows list
*/
$("#search-form").on("submit", async function handleSearch (evt) {
  evt.preventDefault();

  let query = $("#search-query").val();
  if (!query) return;

  $("#episodes-area").hide();

  let shows = await searchShows(query);

  populateShows(shows);
});


/*
* Given a show ID, return list of episodes:
*   { id, name, season, number }
*/
async function getEpisodes(id) {
  // TODO: get episodes from tvmaze you can get this by making GET request to
  //    http://api.tvmaze.com/shows/SHOW-ID-HERE/episodes
  try {
    const resp = await axios.get(`http://api.tvmaze.com/shows/${id}/episodes`);
    // set a new array with the episodes info (id, name, season, number)
    let episodesArr = [];
    for(let episodeData of resp.data) {
      let episodeInfo = {};
      episodeInfo.id = episodeData.id;
      episodeInfo.name = episodeData.name;
      episodeInfo.season = episodeData.season;
      episodeInfo.number = episodeData.number;
      episodesArr.push(episodeInfo);
    }
    // TODO: return array-of-episode-info, as described in docstring above
    return episodesArr;
  } catch (e) {
    alert("ID Show is not found in TVmaze");
  }
}
