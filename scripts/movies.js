
async function searchmovies(){
    try{
        const search=document.getElementById("search").ariaValueMax;

        let res=await fetch(`https://www.omdbapi.com/?s=${search}&apikey=bf10365b`);

        let data=await res.json();
        console.log("data is :",data);

        const movies=data.Search;

        return movies;
    }catch(err){
        console.log("err is:",err)
    }

}

function appendmovies(data){

    movies_div.innerText=null;

    data.map(function(el){
        let p=document.createElement("p")

            p.innerText=el.Titll;
            p.addEventListener("click",(event)=>{
                document.querySelector("#movies").value=p.innerText;

                const url=`https://www.omdbapi.com/?apikey=bf10365b&t=${p.innerText}`;

                fetch(url)
                .then(function(res){
                    return res.json();
                })
                .then(function(res){
                    append(res)
                    console.log(res)
                })
                .catch(function(err){
                    console.log("err is:",err);
                })
            });
            movies_div.append(p)

    });

}

async function main(){
    let data=await searchmovies();
    if(data==undefined){
        return false;

    }
    appendmovies(data)
}


let id;

function debounce(func,delay){
    if(id){
        clearTimeout(id);
    }
    id=setTimeout(function(){
        func();
    },delay);
}


function append(data){
    document.querySelector("#movies").innerHTML=null;

    //console.log(data);

    let box=document.createElement("div");
    box.setAttribute("id","box1");

    let image=document.createElement(img);
    image.src=data.Poster;

    box.append(image);

    document.querySelector("#movies").append(box)

}