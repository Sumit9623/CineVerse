

let searchbar = document.getElementById("search");
searchbar.addEventListener("search",(eve)=>{
    add_elements_on_search();
});


function add_elements_on_search()
{
    let mini = document.getElementsByClassName("minicontainer")[0];
    main = document.getElementsByClassName("main")[0];
    main.innerHTML = "";
    let search_val = searchbar.value;
    fetch(`https://api.themoviedb.org/3/search/movie?query=${search_val}&${api_key}`)
    .then(response => response.json())
    .then((response) =>{
        response.results.forEach((val)=>
        {
            if(val["poster_path"]===null){}
            else{
                const card = document.getElementsByTagName("template")[1];
                const crd = card.content.cloneNode(true);
                fill_card(main,crd,val);
            }
        })
    })
    .catch(err => console.error(err));
}

function append_cards_in_main(nav_url)
{
    let main = document.getElementsByClassName("main")[0];
    main.innerHTML="";
    fetch(nav_url)
    .then(response => response.json())
    .then((response) =>{
        response.results.forEach((val)=>
        {
            if(val["poster_path"]===null){}
            else{
                const card = document.getElementsByTagName("template")[1];
                const crd = card.content.cloneNode(true);
                fill_card(main,crd,val);
            }
        })
    })
}
function fill_card(main,crd,val)
{
    const crd_title = crd.querySelector('.movie-title');
    const crd_gen_list = crd.querySelector('.movie-gen-list');
    const crd_body = crd.querySelector('.card');
    const movie_id = val["id"];

    crd_body.style.backgroundImage=`url('https://image.tmdb.org/t/p/w500${val["poster_path"]}')`;
    crd_body.setAttribute("id",val["id"]);
    crd_title.innerText=val["title"];
    val["genre_ids"].forEach((val1)=>
    {
        const clone_temp = document.getElementsByTagName("template")[0];
        const clone = clone_temp.content.cloneNode(true);
        const li = clone.querySelector('li');
        li.innerText=gen_arr1.get(val1);
        crd_gen_list.appendChild(clone);
    })

    main.appendChild(crd);
    crd_body.addEventListener("click",(crd_event)=>{
        fetch(`${base_url}movie/${movie_id}?${api_key}`)
        .then(response => response.json())
        .then((response) =>{
            window.location.href=`./movie_details.html?movie_id=${movie_id}`;
        })
        .catch(err => console.error(err));
    })
}