$(document).ready(() => {
    const heading = $('.heading');

    const patternList = ["green", "red", "yellow", "blue"];
    let length = 0;
    let pattern = [];
    let level = 1;
    let clickCounterNum = 0;
    let userPattern = [];


    $(document).bind("keypress", start);

    // resets the vars for the to restart
    function gameover() {
        level = 1;
        userPattern = [];
        pattern = [];
        console.log("game restarted");
        heading.text(`Game Over Press A Key to Start`);
        $(document).bind("keypress", start);
    }

    //  starts the game
    function start() {
        $(document).unbind("keypress");
        heading.text(`level :${level}`);
        patternGen();
    }

    // generates a pattern
    function patternGen() {
        length = level + 1;
        for (let i = 0; i < length; i++) {
            pattern[i] = patternList[Math.round(Math.random() * 3)];
        }
        displayPattern(pattern);
    }

    // displays/plays the pattern/audio in order then starts the listeners for clickCounter
    function displayPattern(pattern) {
        let i = 0;
        for (let index = 0; index < pattern.length; index++) {
            let id = `#${pattern[index]}`;
            let delay = Number(`${index}000`);

            setTimeout(() => {
                playAudio(pattern[index]);
                $(id).addClass("activate")
                setTimeout(() => {
                    $(id).removeClass("activate");
                }, 600);

            }, delay);
        }
        console.log(pattern);
        $(".box").bind("click", event => { clickCounter(event); });
    }

    // takes the audio files name and plays it
    function playAudio(name) {
        console.log(name);
        temp = new Audio(`sounds/${name}.mp3`);
        temp.play();
        return "";
    }


    // check if the click is valid then moves to the next
    function clickCounter(event) {
        if (event.target.id === pattern[clickCounterNum]) {
            clickCounterNum++;
            playAudio(event.target.id);
            userPattern.push(event.target.id);
            if (userPattern.length === pattern.length) {
                clickCounterNum = 0;
                level = level + 1;
                heading.text(`level :${level}`);
                userPattern = [];
                $(".box").unbind("click");
                setTimeout(() => { patternGen(); }, 1000);
            }
        } else {
            new Audio('sounds/wrong.mp3').play();
            $(".box").unbind("click");
            gameover();
        }

    }

});
