let str = window.location.search;
let id= str.split('=')[1];
let poster_url = 'https://image.tmdb.org/t/p/w500';
let movie_url = `https://api.themoviedb.org/3/movie/${id}?${api_key}`;

fetch(movie_url)
    .then(response => response.json())
    .then((response) =>{
        console.log(response);
        let poster_back = document.getElementsByClassName("main_movie_detail")[0];
        let movie_title = document.getElementById("movie-title");
        let movie_tag_line = document.getElementById("movie-tag-line");
        let movie_gen_list = document.getElementById("movie-gen-list");
        let movie_release_date = document.getElementById("movie-release-date");
        let movie_rating = document.getElementById("movie-rating");
        let movie_watch_time = document.getElementById("movie-watch-time");
        // let movie_overview_head = document.getElementById("movie-overview-head");
        let movie_overview = document.getElementById("movie-overview");
        let movie_watch_now = document.getElementById("movie-watch-now");
        // let movie_videos_head = document.getElementById("movie-videos-head");
        let movie_videos = document.getElementById("movie-videos");

        poster_back.style.backgroundImage=`url('https://image.tmdb.org/t/p/original${response["backdrop_path"]}')`
        movie_title.innerText=response["original_title"];
        movie_tag_line.innerText=response["tagline"];

        let gen_list = response["genres"];
        gen_list.forEach((val1)=>{

            let temp = document.getElementById("temp");
            let cln = temp.content.cloneNode(true);
            let li = cln.querySelector('li');
            li.innerText=val1["name"];
            movie_gen_list.appendChild(li);
        })

        movie_release_date.innerText="Release date : "+response["release_date"];
        movie_watch_time.innerText= "Watch Time : "+response["runtime"]+" Mins";
        movie_rating.innerText="Rating : "+(response["vote_average"]+"/10");

        movie_overview.innerText=response["overview"];
        movie_watch_now.setAttribute("href",response["homepage"]);

        let video_url =`https://api.themoviedb.org/3/movie/${response["id"]}/videos?${api_key}`;
        fetch(video_url)
        .then(val => val.json())
        .then((val) =>{
            val["results"].forEach((val2)=>{
                // console.log("I am here",val2["type"]);
                if(val2["type"]=="Trailer"){
                    let video_temp= document.getElementById("video_temp");
                    let video_clone = video_temp.content.cloneNode(true);
                    let video = video_clone.querySelector("#video_frame");
                    video.setAttribute("src",`https://www.youtube.com/embed/${val2["key"]}?rel=0`);
                    movie_videos.appendChild(video);
                }
            })
        })
        .catch(err => console.error(err));
    })
    .catch(err => console.error(err));
