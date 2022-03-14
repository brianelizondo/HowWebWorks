// Part 1: Building the Form
// We’ve provided a starter HTML file, but there’s next to nothing in the body. Start by building a simple form with an input for a search term and a submit button. When the user submits the form, use axios to make a request to GIPHY for information based on that term. After receiving the response, console.log the response data to make sure you’re getting back what you expect.

// For example, here is what the AJAX request URL would look like for search term of “hilarious”: 
// http://api.giphy.com/v1/gifs/search?q=hilarious&api_key=MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym. 
// You can click on this URL and see the JSON you will get back. To view this in a nicer format, we highly recommend using the JSON Viewer chrome extension. This is also the data you should console.log when the form is submitted.

let api_key = 'MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym';
async function getGiphy(search){
    try {
        const url = 'http://api.giphy.com/v1/gifs/search';
        const resp = await axios.get(url, {params: {q: search, api_key }});
        console.log(resp);
    } catch (e) {
        alert("Search term not found for GIPHY");
    }
}

const search_form = document.querySelector('#search_form');
const search_term = document.querySelector('#search');
search_form.addEventListener('submit', function(e){
    e.preventDefault();
    getGiphy(search_term.value);
    search_term.value = '';
});