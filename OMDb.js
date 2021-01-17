let result,listNumber, favourites;
let search = document.querySelector('#searchinput')

let addButton = document.querySelector('#addButton')
addButton.style.display = 'none'

let banner = document.querySelector('#banner')



let showSearch = () => {

    let searchDisplayTitle = document.querySelector('#searchDisplayTitle')
    let searchDisplayDirector = document.querySelector('#searchDisplayDirector')
    let searchDisplayActors = document.querySelector('#searchDisplayActors')
    let searchInput = document.querySelector('#searchinput').value
    searchInput=searchInput.replace(' ','+')
    addButton.style.backgroundColor = '#008060'
    favourites=document.querySelectorAll('#favorites')
    let listFull = false

    let thead = document.querySelector('thead')
    thead.innerHTML = 'Results for "'+searchInput+'"'
    fetch('https://www.omdbapi.com/?t='+searchInput+'&apikey=cdc2242').then((response)=>{
    response.json().then((data)=>{
        
        
        for(i=0;i<favourites.length;i++){
            if(favourites[i].innerHTML==data.Title+'('+data.Year+')'){
            addButton.style.backgroundColor = 'lightgrey'
            }}
        if(data==''){
            searchDisplayTitle.innerHTML = '';
            searchDisplayDirector.innerHTML = '';
            searchDisplayActors.innerHTML = '';
            addButton.style.display = 'none'
        }else if(data.Response == 'False'){
            searchDisplayTitle.innerHTML = '';
            searchDisplayDirector.innerHTML = '';
            searchDisplayActors.innerHTML = '';
            addButton.style.display = 'none'
        }else{
            searchDisplayTitle.innerHTML = data.Title+'('+data.Year+')';
            searchDisplayDirector.innerHTML = 'Director: '+data.Director;
            searchDisplayActors.innerHTML = 'Actors: '+data.Actors;
            result = data
            addButton.style.display = 'inline'

       }

    });

    });


}

search.addEventListener('keyup',showSearch)




let addToFavs = () => {
    let addAllowed = true
    favourites=document.querySelectorAll('#favorites')
    let delButton = document.querySelectorAll('#delbutton')
    for(i=0;i<favourites.length;i++){
        if(favourites[i].innerHTML==result.Title+'('+result.Year+')'){
            addAllowed = false
            addButton.style.backgroundColor = 'lightgrey'
            break
        }
    }
    if(addAllowed==true){
        for(i=0;i<favourites.length;i++){
            if(favourites[i].innerHTML==''){
                favourites[i].innerHTML = result.Title+'('+result.Year+')';
                delButton[i].style.display = 'block'
                addButton.style.backgroundColor = 'lightgrey'

                let n=0
                for(i=0;i<favourites.length;i++){
                    if(favourites[i].innerHTML!=''){
                        n+=1
                    }}
                if(n==5){
                banner.style.opacity = '1'
                banner.style.height = '100px'
                }



                break
            }
    }}else{
        addButton.style.backgroundColor = 'lightgrey'

    }
}



addButton.addEventListener('click',addToFavs)



let del=(movie)=>{
    favourites=document.querySelectorAll('#favorites')
    delButton = document.querySelectorAll('#delbutton')
    favourites[movie].innerHTML=''
    delButton[movie].style.display = 'none'

    let n=0
    for(x=0;x<favourites.length;x++){
        if(favourites[x].innerHTML!=''){
            n+=1
        }}
    if(n!=5){
    banner.style.opacity = '0'
    banner.style.height = '0px'
    }
}



