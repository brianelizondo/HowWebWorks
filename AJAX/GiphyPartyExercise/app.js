// Part 1: Building the Form
// We’ve provided a starter HTML file, but there’s next to nothing in the body. Start by building a simple form with an input for a search term and a submit button. When the user submits the form, use axios to make a request to GIPHY for information based on that term. After receiving the response, console.log the response data to make sure you’re getting back what you expect.

// For example, here is what the AJAX request URL would look like for search term of “hilarious”: 
// http://api.giphy.com/v1/gifs/search?q=hilarious&api_key=MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym. 
// You can click on this URL and see the JSON you will get back. To view this in a nicer format, we highly recommend using the JSON Viewer chrome extension. This is also the data you should console.log when the form is submitted.

let api_key = 'MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym';
const $giphy_images = $('#giphy_images');

async function getGiphy(search){
    try {
        const url = 'http://api.giphy.com/v1/gifs/search';
        const resp = await axios.get(url, {params: {q: search, api_key }});
        const min = 0;
        const max = resp.data.data.length;
        const randomGIF = Math.floor(Math.random() * (max - min) + min);
        appendGIF(resp.data.data[randomGIF].images.original.url);
    } catch (e) {
        alert("Search term not found for GIPHY");
    }
}

// Part 2: Appending GIFs
// Now that you’re communicating properly with the API, you should do something more interesting with the response data. Instead of logging it, grab a GIF from the response data and append the GIF to the page. Ensure that if you submit the form multiple times, you’ll get multiple GIFs showing up.
function appendGIF(url){
    let $gifImage = $('<img>');
    $gifImage.attr('src', url);
    $giphy_images.append($gifImage);
}

// Part 3: Removing GIFs
// Add a button next to the form which, when clicked, will remove all GIFs from the page.
const $btnRemove = $('#btn_remove');
$btnRemove.on('click', function(){
    let $gifShowing = $('img');
    $gifShowing.remove();
});

const $search_form = $('#search_form');
const $search_term = $('#search');
$search_form.on('submit', function(e){
    e.preventDefault();
    getGiphy($search_term.val());
    $search_term.val('');
});