let playpause = document.getElementById('play-pause');
let Scroller=document.getElementById('Scroller');
Scroller.value=0;
let curr=document.getElementById('curr');
let gif=document.getElementById('giff');
let left=document.getElementById('left');
let right=document.getElementById('right');
let firstTime=true;
let songs = [
    {
        songName: "Marjanni-Marjanni",
        cover: "covers/1.jpg",
        path: 'songs/1.mp3'
    },
    {
        songName: "Despacito",
        cover: "covers/2.jpg",
        path: 'songs/2.mp3'
    },
    {
        songName: "Let me love you",
        cover: "covers/3.jpg",
        path: 'songs/3.mp3'
    },
    {
        songName: "Love mera hit hit",
        cover: "covers/4.jpg",
        path: 'songs/4.mp3'
    },
    {
        songName: "Same-Beef",
        cover: "covers/5.jpg",
        path: 'songs/5.mp3'
    }
];
let audio = new Audio(`${songs[0].path}`);
let songList = document.getElementsByClassName('music-items');
Array.from(songList).forEach((element, index) => {
    element.children[1].innerText = songs[index].songName;
    element.children[0].src = songs[index].cover;
});
pauseAdder=(currentElement)=>{
    Array.from(songList).forEach((element)=>{
        if(element===currentElement){
            currentElement.children[2].children[0].classList.remove('fa-play');
            currentElement.children[2].children[0].classList.add('fa-pause');
            element.style.backgroundColor='greenyellow';
        }
        else{
            element.children[2].children[0].classList.add('fa-play');
            element.children[2].children[0].classList.remove('fa-pause');
            element.style.backgroundColor='antiquewhite';

        }
    });
}
Array.from(songList).forEach((element,index)=>{
element.addEventListener('click',()=>{    
audio.src=`songs/${index+1}.mp3`;
pauseAdder(element);
playpause.classList.remove('fa-play');
playpause.classList.add('fa-pause');
curr.innerText=songs[index].songName;
audio.play();
gif.style.opacity='1';
});
});
playpause.addEventListener('click', () => {
    if (playpause.classList.contains('fa-play')) {
        playpause.classList.remove('fa-play');
        playpause.classList.add('fa-pause');
        gif.style.opacity='1';
        if(firstTime){
            document.getElementById('1').children[2].children[0].classList.add('fa-pause');
            document.getElementById('1').children[2].children[0].classList.remove('fa-play');
            document.getElementById('1').style.backgroundColor='greenyellow';
            firstTime=false;
        }

        audio.play();
    }
    else {
        playpause.classList.remove('fa-pause');
        playpause.classList.add('fa-play');
        gif.style.opacity='0';
        audio.pause();
    }
});
audio.addEventListener('timeupdate',()=>{
    Scroller.value=parseInt((audio.currentTime/audio.duration)*100);
});
Scroller.addEventListener('change',()=>{
    audio.currentTime=parseInt(Scroller.value*audio.duration/100);
});
left.addEventListener('click',()=>{
    Array.from(songList).forEach((element,index)=>{
        if(index>0){
        if(element.children[2].children[0].classList.contains('fa-pause')){
            element.children[2].children[0].classList.remove('fa-pause');
            element.children[2].children[0].classList.add('fa-play');
            element.style.backgroundColor='antiquewhite';
            document.getElementById(`${index}`).children[2].children[0].classList.add('fa-pause');
            document.getElementById(`${index}`).children[2].children[0].classList.remove('fa-play');
            document.getElementById(`${index}`).style.backgroundColor='greenyellow';
            curr.innerText=`${songs[index-1].songName}`;
            audio.src=`${songs[index-1].path}`;
            audio.play();
        }
    }
    
    });
});
