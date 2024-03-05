input.onLogoEvent(TouchButtonEvent.Touched, function () {
    control.reset()
})
input.onButtonPressed(Button.AB, function() {
    if (result == -1) {
        result=0;
        basic.clearScreen();
    }
})
function checkCatch () {
    for (let j = 0; j <= apples.length - 1; j++) {
        if (!(apples[j].caught) && !(apples[j].missed) && apples[j].x == playerX && apples[j].y == 4) {
            apples[j].caught = true;
            catches += 1
            music.play(music.stringPlayable("G - - - - - - - ", 120), music.PlaybackMode.InBackground)
        }
    }
}
input.onButtonPressed(Button.A, function () {
    if (result == 0) {
        led.unplot(playerX, 4)
        if (playerX > 0) {
            playerX += -1
        }
    }
})
function checkMiss () {
    for (let k = 0; k <= apples.length - 1; k++) {
        if (!(apples[k].caught) && !(apples[k].missed) && apples[k].y > 4) {
            apples[k].missed = true;
            misses += 1
            music.play(music.stringPlayable("C - - - - - - - ", 120), music.PlaybackMode.InBackground)
        }
    }
}
input.onButtonPressed(Button.B, function () {
    if (result == 0) {
        led.unplot(playerX, 4)
        if (playerX < 4) {
            playerX += 1
        }
    }
})
function spawnApple () {
    apples.push(new Apple(randint(0,4), -1, false, false))
}
function updateApples () {
    for (let i = 0; i <= apples.length - 1; i++) {
        led.unplot(apples[i].x, apples[i].y)
        apples[i].y += 1;
    }
    apples = apples.filter(apple => apple.y<8)
}
function evaluateResult () {
    if (catches >= 15) {
        result = 1
    } else if (misses > 2) {
        result = 2
    }
}
let result = -1
let misses = 0
let catches = 0
let playerX = 0
let finishSoundPlayed = false;
let apples: any[] = []
playerX = 2
basic.showIcon(IconNames.Diamond)
class Apple {
    constructor(public x: number, public y: number, public caught: boolean, public missed: boolean) {}
}
basic.forever(function () {
    if (result == 0) {
        checkCatch()
        checkMiss()
        evaluateResult()
        led.plot(playerX, 4)
        for (let l = 0; l <= apples.length - 1; l++) {
            if (!(apples[l].caught)) {
                led.plot(apples[l].x, apples[l].y)
            }
        }
    } else if (result == 1) {
        basic.showIcon(IconNames.Yes)
        if (!(finishSoundPlayed)) {
            finishSoundPlayed = true;
            music.play(music.stringPlayable("G B D G A - B A ", 120), music.PlaybackMode.LoopingInBackground)
        }
    } else if (result == 2) {
        basic.showIcon(IconNames.No)
        if (!(finishSoundPlayed)) {
            finishSoundPlayed=true;
            music.play(music.stringPlayable("C E D F C D E G ", 120), music.PlaybackMode.LoopingInBackground)
        }
    }
})
loops.everyInterval(900, function () {
    if (result == 0) {
        spawnApple()
    }
})
loops.everyInterval(400, function () {
    if (result == 0) {
        updateApples()
    }
})

function resetGame() {
    finishSoundPlayed = false;
    music.stopAllSounds()
    basic.clearScreen();
    result =0;
    catches = 0;
    misses = 0;
    playerX = 2;
    while (apples.length > 0) {
        apples.pop();
    }
}