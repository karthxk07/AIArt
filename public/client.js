function setImg(url){
    document.querySelector("#loadtext").style.display= 'none';
    let AIimg = document.getElementById('AIimg');
    AIimg.src = url;
    AIimg.style.visibility = 'visible';
};

function textDisappear(){
    let rndmtext  = document.querySelector("#rndmtext");
    rndmtext.style.opacity = "0%";
    rndmtext.style.transition = "0.4s ease";
    setTimeout(()=>{rndmtext.style.display ="none"},400);
};

function boxAppear(){
    let imagecont = document.querySelector('.imageContainer');
    imagecont.style.display ="flex";
    imagecont.style.transition ='0.5s ease';
    setTimeout(()=>{imagecont.style.scale = '100%';},50);
};

function blinkText(){
    let loadtext = document.querySelector("#loadtext");
    loadtext.style.display = 'block';
    loadtext.style.transition = '1s ease';
    setInterval(()=>{loadtext.style.opacity='100%'},1000);
    setTimeout(()=>{setInterval(()=>{loadtext.style.opacity = '0%'},2000)},1000)
}







document.getElementById('prompt').addEventListener('submit', (event)=>{
    event.preventDefault();
    textDisappear();
    setTimeout(()=>{boxAppear()},450);
    setTimeout(()=>{blinkText()},1000);







    let data = {
        'textPrompt' : document.getElementById('prompt')[0].value,
    };
    console.log(data);
    fetch("/submit",{
        method : "POST",
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(data)
    }).then(response => {response.json()}) // parse response as JSON
    .then(data => {setImg(data.image_url)})
    .catch(error => {console.log(error)});
})

