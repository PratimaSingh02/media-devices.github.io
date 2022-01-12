window.onload=()=>{
    const start=document.querySelector('.start-btn');
    const texts=document.querySelector('.texts');
    const clear=document.querySelector('.clear');
    const audio=document.querySelector('.audio');

    window.SpeechRecognition=window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition=new window.SpeechRecognition();
    window.SpeechGrammarList=window.SpeechGrammarList || window.webkitSpeechGrammarList;
    let speechRecognitionList=new SpeechGrammarList();
    recognition.interimResults=true;
    recognition.lang='en-US';

    let p=document.createElement('p');
    texts.appendChild(p);
    let str='';
    recognition.addEventListener('result',(e)=>{
        p.innerText=str+Array.from(e.results).map(result=>result[0]).map(result=> result.transcript).join('');

        if(e.results[0].isFinal){
            str=p.innerText+" ";//saving previous input
        }
    });

    recognition.addEventListener('end',()=> {
        if(start.disabled==true)
            recognition.start();
    });

    start.addEventListener('click',(e)=>{
        e.target.disabled=true;
        stop.disabled=false;
        recognition.start();
        navigator.mediaDevices.getUserMedia({audio:true,video:false})
        .then(function(stream) {
            
             audio.srcObj=stream;
             audio.load();
             audio.onloadedmetadata=function(e){
                console.log('audio playing');
                 audio.play();
             }   
             console.log(stream);
        })
        .catch(function(err) {
        console.log('Unable to get stream'+err);
        });
        console.log('started');
    });

    clear.addEventListener('click',()=>{
            p.innerText='';
            str='';
    })

    recognition.onaudiostart = function() {
        console.log('Audio capturing started');
    }

    recognition.onaudioend = function() {
        console.log('Audio capturing ended');
    }

}





