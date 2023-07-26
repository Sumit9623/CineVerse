function get_movies_on_nav()
{
    let nav_url;
    const top_rated = document.getElementsByClassName("inner_li")[0];
    top_rated.addEventListener("click",(eve)=>{
        nav_url=`${base_url}movie/top_rated?${api_key}`;
        append_cards_in_main(nav_url);
    })
    const popular = document.getElementsByClassName("inner_li")[1];
    popular.addEventListener("click",(eve)=>{
        nav_url=`${base_url}movie/popular?${api_key}`;
        append_cards_in_main(nav_url);
    })
    const latest = document.getElementsByClassName("inner_li")[2];
    latest.addEventListener("click",(eve)=>{
        nav_url=`${base_url}movie/now_playing?${api_key}`;
        append_cards_in_main(nav_url);
    })
}

const toggle = document.getElementById("toggle_sidebar");
toggle.addEventListener("click",(eve)=>{
    const side = document.getElementsByClassName("sidebar")[0];
    if(window.innerWidth<=1000) side.classList.toggle("show_sidebar");
})
get_movies_on_nav();
get_genre_list();