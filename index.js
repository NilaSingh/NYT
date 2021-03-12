let articles=document.createElement("list")
let titles=document.getElementById("top-stories")
fetch('https://api.nytimes.com/svc/topstories/v2/arts.json?api-key='+key)
    .then(response => response.json())
    .then(data =>{
        for(let i=0; i<5; i++){
            let list=document.createElement('p')
            let t=document.createElement('a')
            t.href=data.results[i].url
            t.innerText=data.results[i].title
            list.appendChild(t)
            titles.appendChild(list)
        }
    })
let list=document.createElement('div')

function search(e){
        e.preventDefault()
        if(list.hasChildNodes){
            list.innerHTML=""
        }
        let keyword=document.getElementById("input").value
        fetch("https://api.nytimes.com/svc/search/v2/articlesearch.json?&fq="+keyword+"&api-key="+key)        
            .then(response => response.json())
            .then(data => {
                for(let i=0; i<10; i++){
                    let node=document.createElement('p')
                    let text=document.createElement('a')
                    text.innerText=data.response.docs[i].headline.main
                    text.href=data.response.docs[i].web_url
                    node.appendChild(text)
                    list.appendChild(node)
                }
            })
        document.getElementById("search-results").appendChild(list)
}
let mostPopular=document.createElement('div')
function popularStories(e){
    e.preventDefault()
    if(mostPopular.hasChildNodes){
        mostPopular.innerHTML=""
    }
    let criteria=document.forms["most-popular-form"]['criteria'].value
    let period=document.forms["most-popular-form"]['period'].value
        fetch("https://api.nytimes.com/svc/mostpopular/v2/"+criteria+"/"+period+".json?api-key="+key)
            .then(response => response.json())
            .then(data=>{
                for(let i=0; i<3; i++){
                    let articleContainer=document.createElement('p')            //creating extra element for formatting
                    let articles=document.createElement('a')
                    articles.innerText=data.results[i].title
                    articles.href=data.results[i].url
                    articleContainer.appendChild(articles)
                    mostPopular.appendChild(articleContainer)
                }
                document.getElementById("most-popular-results").appendChild(mostPopular)
            })
}

document.getElementById("button").addEventListener("click",search)
document.getElementById("submitButton").addEventListener("click",popularStories)

