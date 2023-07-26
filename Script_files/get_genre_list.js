let base_url = "https://api.themoviedb.org/3/";
let api_key = "api_key=1e76a2af6f1170074462dfba026b1be6";
let img_url = "https://image.tmdb.org/t/p/w500/";

//  Adding genre list in sidebar
let tem = document.getElementsByTagName("template")[0];
let ul = document.getElementById("gen-list");
let gen_arr1 = new Map();
let logo= document.getElementById("logo").addEventListener("click",()=>{
    window.location.href="./index.html"
})
function get_genre_list()
{
    let gen_url = "https://api.themoviedb.org/3/genre/movie/list"+"?"+api_key;
    fetch(gen_url)
    .then(response => response.json())
    .then((response) =>{
        response.genres.forEach(ele =>
        {
            gen_arr1.set(ele["id"],ele["name"]);
            const t_node = tem.content.cloneNode(true);
            const li = t_node.querySelector('li');
            const id = ele["id"];
            li.innerText=ele["name"];
            ul.appendChild(li);
            li.addEventListener("click",(eve)=>{
                let genre_event_url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&with_genres=${ele["id"]}&${api_key}`;
                append_cards_in_main(genre_event_url);
                // window.location.href="index.html";
            })
        });
        console.log(gen_arr1);
    })
    .catch(err => console.error(err));
}

