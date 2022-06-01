"use strict";

var scale = 16
var tab = []
var colorTab = ["blue", "red", "yellow"]
var exisingVirusesTab = []
var preddictionBar = document.getElementById("preddictionBar")
var gameboard = document.getElementById("gameBoard")
var myPosition1 = 6
var myPosition2 = 7
var currentHeight = 1
var hitBottom = true
var fallInterval
var quickFallInterval
var core
var tabAdditionalHits = []
var allreadyDeleted = false
var nowCheck = false
var pillId = 1
var detectedMove = false
var otherBlockFalling = false
var startingViruses = 4
var virusDanceCounter = 0
var virusDanceInterval
var randomx
var randomy
var iAmThrowing = false
var virusDancePossitions = [{ x: 40, y: 60 }, { x: 48, y: 32 }, { x: 112, y: 32 }, { x: 128, y: 48 }, { x: 112, y: 112 }, { x: 80, y: 112 }]
var gameIsReady = false
var nextColor1
var nextColor2
var fillId = 0
function randomColor() {
    var color = colorTab[Math.floor(Math.random() * colorTab.length)]
    return color
}

function removeDuplicates(arrray) {
    return arrray.filter((value, index) => arrray.indexOf(value) === index)
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function deleteAllPills() {
    for (let j = 18; j >= 0; j--) {
        for (let i = 2; i < 10; i++) {
            if (tab[j][i] != 0 && tab[j][i] != 1) {
                tab[j][i].onScreen.remove()
            }
        }
    }
}

function startGame() {
    tab = []
    for (let j = 0; j <= 20; j++) {
        tab.push([])
        for (let i = 0; i <= 12; i++) {
            if (j <= 1 || j >= 18 || i <= 1 || i >= 10) {
                tab[j].push(1)
            }
            else {
                tab[j].push(0)
            }
        }
    }
    for (var ammountOfViruses = startingViruses; ammountOfViruses > 0; ammountOfViruses--) {
        do {
            randomx = getRandomInt(2, 9)
            randomy = getRandomInt(8, 17)
        } while (tab[randomy][randomx] != 0)
        let wirus = new Pill(randomx, randomy, colorTab[ammountOfViruses % 3], false, false, false, "virus", scale, "virus")
        tab[randomy][randomx] = wirus
        wirus.spawn()
    }
    console.log(tab)
    gameIsReady = true
    preparePill()
    marioTrow()
    checkForViruses()
    document.getElementById("marioBar").style.background = 'url(images/mario1.png)';
    document.getElementById("marioBar").style.backgroundSize = "96px 96px";
    virusDance()
}
localStorage.setItem('topScore', 0)
startGame()
function preparePill() {
    let randomColor1 = randomColor()
    let randomColor2 = randomColor()
    let trowPill1 = document.createElement("div")
    let trowPill2 = document.createElement("div")
    trowPill1.className = "gameBlock"
    trowPill2.className = "gameBlock"
    trowPill1.id = "prepared1"
    trowPill2.id = "prepared2"
    positionPreparePill(trowPill1, randomColor1, "left", 48, 144, 16, 16)
    positionPreparePill(trowPill2, randomColor2, "right", 48, 128, 16, 16)
    document.getElementById("wholeGame").append(trowPill1)
    document.getElementById("wholeGame").append(trowPill2)
    nextColor1 = randomColor1
    nextColor2 = randomColor2
}
function positionPreparePill(pill, color, orientation, top, right, backgroundSize, backgroundSize2) {
    pill.style.background = 'url(images/' + color + '_' + orientation + '.png)';
    pill.style.backgroundSize = `${backgroundSize}px ${backgroundSize2}px`
    pill.style.top = `${top}px`
    pill.style.right = `${right}px`
}
function marioTrow() {
    let marioTrowAnimation = document.createElement("div")
    let trowPill1 = document.getElementById("prepared1")
    let trowPill2 = document.getElementById("prepared2")
    marioTrowAnimation.className = "marioBar"
    marioTrowAnimation.id = "marioBar2"
    marioTrowAnimation.style.background = 'url(images/mario1.png)';
    marioTrowAnimation.style.backgroundSize = "96px 96px";
    document.getElementById("wholeGame").append(marioTrowAnimation)
    setTimeout(function () {
        positionPreparePill(trowPill1, nextColor1, "down", 48, 144, 16, 16)
        positionPreparePill(trowPill2, nextColor2, "up", 32, 144, 16, 16)
        setTimeout(function () {
            positionPreparePill(trowPill1, nextColor1, "right", 32, 144, 16, 16)
            positionPreparePill(trowPill2, nextColor2, "left", 32, 160, 16, 16)
            setTimeout(function () {
                positionPreparePill(trowPill1, nextColor1, "up", 16, 160, 16, 16)
                positionPreparePill(trowPill2, nextColor2, "down", 32, 160, 16, 16)
                setTimeout(function () {
                    positionPreparePill(trowPill1, nextColor1, "left", 16, 176, 16, 16)
                    positionPreparePill(trowPill2, nextColor2, "right", 16, 160, 16, 16)
                }, 20)
            }, 20)
        }, 20)
    }, 20)
    setTimeout(function () {
        marioTrowAnimation.style.background = 'url(images/mario2.png)';
        marioTrowAnimation.style.backgroundSize = "96px 96px";
        setTimeout(function () {
            positionPreparePill(trowPill1, nextColor1, "down", 16, 176, 16, 16)
            positionPreparePill(trowPill2, nextColor2, "up", 0, 176, 16, 16)
            setTimeout(function () {
                positionPreparePill(trowPill1, nextColor1, "right", 32, 176, 16, 16)
                positionPreparePill(trowPill2, nextColor2, "left", 32, 192, 16, 16)
                setTimeout(function () {
                    positionPreparePill(trowPill1, nextColor1, "up", 0, 192, 16, 16)
                    positionPreparePill(trowPill2, nextColor2, "down", 16, 192, 16, 16)
                    setTimeout(function () {
                        positionPreparePill(trowPill1, nextColor1, "left", 16, 208, 16, 16)
                        positionPreparePill(trowPill2, nextColor2, "right", 16, 192, 16, 16)
                    }, 20)
                }, 20)
            }, 20)
        }, 20)
        setTimeout(function () {
            marioTrowAnimation.style.background = 'url(images/mario3.png)';
            marioTrowAnimation.style.backgroundSize = "96px 96px";
            setTimeout(function () {
                positionPreparePill(trowPill1, nextColor1, "down", 16, 208, 16, 16)
                positionPreparePill(trowPill2, nextColor2, "up", 0, 208, 16, 16)
                setTimeout(function () {
                    positionPreparePill(trowPill1, nextColor1, "right", 16, 208, 16, 16)
                    positionPreparePill(trowPill2, nextColor2, "left", 16, 224, 16, 16)
                    setTimeout(function () {
                        positionPreparePill(trowPill1, nextColor1, "up", 0, 224, 16, 16)
                        positionPreparePill(trowPill2, nextColor2, "down", 16, 224, 16, 16)
                        setTimeout(function () {
                            positionPreparePill(trowPill1, nextColor1, "left", 16, 240, 16, 16)
                            positionPreparePill(trowPill2, nextColor2, "right", 16, 224, 16, 16)
                        }, 20)
                    }, 20)
                }, 20)
            }, 20)
            setTimeout(function () {
                marioTrowAnimation.style.background = 'url(images/mario2.png)';
                marioTrowAnimation.style.backgroundSize = "96px 96px";
                setTimeout(function () {
                    positionPreparePill(trowPill1, nextColor1, "down", 16, 240, 16, 16)
                    positionPreparePill(trowPill2, nextColor2, "up", 0, 240, 16, 16)
                    setTimeout(function () {
                        positionPreparePill(trowPill1, nextColor1, "right", 16, 240, 16, 16)
                        positionPreparePill(trowPill2, nextColor2, "left", 16, 256, 16, 16)
                        setTimeout(function () {
                            positionPreparePill(trowPill1, nextColor1, "up", 0, 256, 16, 16)
                            positionPreparePill(trowPill2, nextColor2, "down", 16, 256, 16, 16)
                            setTimeout(function () {
                                positionPreparePill(trowPill1, nextColor1, "left", 16, 272, 16, 16)
                                positionPreparePill(trowPill2, nextColor2, "right", 16, 256, 16, 16)
                            }, 20)
                        }, 20)
                    }, 20)
                }, 20)
                setTimeout(function () {
                    marioTrowAnimation.style.background = 'url(images/mario1.png)';
                    marioTrowAnimation.style.backgroundSize = "96px 96px";
                    setTimeout(function () {
                        positionPreparePill(trowPill1, nextColor1, "down", 32, 272, 16, 16)
                        positionPreparePill(trowPill2, nextColor2, "up", 16, 272, 16, 16)
                        setTimeout(function () {
                            positionPreparePill(trowPill1, nextColor1, "right", 32, 272, 16, 16)
                            positionPreparePill(trowPill2, nextColor2, "left", 32, 288, 16, 16)
                            setTimeout(function () {
                                positionPreparePill(trowPill1, nextColor1, "up", 32, 288, 16, 16)
                                positionPreparePill(trowPill2, nextColor2, "down", 48, 288, 16, 16)
                                setTimeout(function () {
                                    positionPreparePill(trowPill1, nextColor1, "left", 48, 304, 16, 16)
                                    positionPreparePill(trowPill2, nextColor2, "right", 48, 288, 16, 16)
                                    setTimeout(function () {
                                        positionPreparePill(trowPill1, nextColor1, "left", 64, 304, 16, 16)
                                        positionPreparePill(trowPill2, nextColor2, "right", 64, 288, 16, 16)
                                    }, 20)
                                }, 20)
                            }, 20)
                        }, 20)
                    }, 20)
                }, 100)
            }, 100)
        }, 100)
    }, 100)
    iAmThrowing = true
    setTimeout(function () {
        iAmThrowing = false
        document.getElementById("marioBar2").remove()
        clearInterval(fallInterval)
        document.getElementById("prepared1").remove()
        document.getElementById("prepared2").remove()
        if (gameIsReady == true) {
            createPill(nextColor1, nextColor2)
            preparePill()
            hitBottom = true
        }
    }, 500)
}

function createPill(randomColor1, randomColor2) {
    myPosition1 = 5
    myPosition2 = 6
    currentHeight = 1
    let pill = new Pill(myPosition1, currentHeight, randomColor1, true, true, true, "left", scale, pillId)
    tab[currentHeight][myPosition1] = pill
    pill.spawn()
    let pill2 = new Pill(myPosition2, currentHeight, randomColor2, true, true, false, "right", scale, pillId)
    tab[currentHeight][myPosition2] = pill2
    pill2.spawn()
    pillId++
    gameClock()
}

function gameClock() {
    fallInterval = setInterval(function () {
        if (gameIsReady == false) {
            clearInterval(fallInterval)
        }
        if (tab[1][5] != 0 && tab[1][6] != 0 && (tab[2][5] != 0 || tab[2][6] != 0)) {
            gameOver()
        }
        else if (gameIsReady == true) {
            tab[currentHeight][myPosition1].goDown(true)
        }
    }, 500)
}

setInterval(function () {
    for (let j = 1; j < 18; j++) {
        for (let i = 2; i < 10; i++) {
            if (tab[j][i] != 0 && tab[j][i] != 1) {
                tab[j][i].onScreen.style.left = `${tab[j][i].xPos * tab[j][i].scale - 2 * tab[j][i].scale}px`
                tab[j][i].onScreen.style.top = `${tab[j][i].yPos * tab[j][i].scale - 2 * tab[j][i].scale}px`
                searchForSolo()
                if (tab[j][i].pillorientation != undefined) { tab[j][i].onScreen.style.background = 'url(images/' + tab[j][i].color + '_' + tab[j][i].pillorientation + '.png)'; }
                tab[j][i].onScreen.style.backgroundSize = scale + "px" + scale + "px"
                if (nowCheck) {
                    if (tab[j][i].color == tab[j + 1][i].color && tab[j][i].color == tab[j + 2][i].color && tab[j][i].color == tab[j + 3][i].color) { tab[j][i].deleteVertical() }
                    else if (tab[j][i].color == tab[j][i + 1].color && tab[j][i].color == tab[j][i + 2].color && tab[j][i].color == tab[j][i + 3].color) { tab[j][i].deleteHorizontal() }
                }
                if (tab[j][i].isCore == true) {
                }
            }
        }
    }
    nowCheck = false
}, 50)

document.onkeydown = function (event) {
    if (otherBlockFalling == false && hitBottom == true) {
        if (event.shiftKey) {
            tab[currentHeight][myPosition1].turnShift()
        }

        switch (event.keyCode) {
            case 37:
                tab[currentHeight][myPosition1].goLeft()
                break;
            case 38:
                tab[currentHeight][myPosition1].turnUp();

                break;
            case 39:
                tab[currentHeight][myPosition1].goRight()
                break;
            case 40:
                if (hitBottom == true && iAmThrowing == false && gameIsReady == true) {
                    hitBottom = false
                    quickFallInterval = setInterval(function () {
                        tab[currentHeight][myPosition1].goDown(true);
                        if (tab[2][5] != 0 && tab[2][6] != 0 && (tab[1][5] != 0 || tab[1][6] != 0)) {
                            gameOver()
                        }
                    }, 10)
                }
                break;
        }
    }
};
function fallCheck() {
    otherBlockFalling = true
    searchForSolo()
    clearInterval(fallInterval)
    detectedMove = false
    for (let j = 18; j > 2; j--) {
        for (let i = 2; i < 10; i++) {
            if (tab[j][i] != 0 && tab[j][i] != 1 && tab[j + 1][i] == 0) {
                if (tab[j][i].pillorientation == "solo" || tab[j][i].pillorientation == "up" || tab[j][i].pillorientation == "down") {
                    tab[j][i].move(j, i, j + 1, i)
                    detectedMove = true
                }
                else if (tab[j][i].pillorientation == "left" && tab[j][i + 1].pillId == tab[j][i].pillId && tab[j + 1][i + 1] == 0) {
                    tab[j][i].move(j, i, j + 1, i)
                    tab[j][i + 1].move(j, i + 1, j + 1, i + 1)
                    detectedMove = true
                }
                else if (tab[j][i].pillorientation == "right" && tab[j][i - 1].pillId == tab[j][i].pillId && tab[j + 1][i - 1] == 0) {
                    tab[j][i].move(j, i, j + 1, i)
                    tab[j][i - 1].move(j, i - 1, j + 1, i - 1)
                    detectedMove = true
                }
                else {
                    nowCheck = true;
                }
            }
        }
    }
    if (detectedMove == true) { detectedMove = false; setTimeout(function () { fallCheck(); }, 150) }
    else { otherBlockFalling = false }
    gameClock()
}
function searchForSolo() {
    for (let e = 2; e < 18; e++) {
        for (let r = 2; r < 10; r++) {
            if (tab[e][r].pillorientation == "up" && tab[e + 1][r].pillId != tab[e][r].pillId) {
                tab[e][r].isConnected = false
            }
            if (tab[e][r].pillorientation == "down" && tab[e - 1][r].pillId != tab[e][r].pillId) {
                tab[e][r].isConnected = false
            }
            if (tab[e][r].pillorientation == "left" && tab[e][r + 1].pillId != tab[e][r].pillId) {
                tab[e][r].isConnected = false
            }
            if (tab[e][r].pillorientation == "right" && tab[e][r - 1].pillId != tab[e][r].pillId) {
                tab[e][r].isConnected = false
            }
            if (tab[e][r].isConnected == false && tab[e][r].pillorientation != "solo" && tab[e][r].pillorientation != "virus") { tab[e][r].pillorientation = "solo" }
        }
    }
}

function checkForViruses() {
    let countedViruses = 0
    exisingVirusesTab = []
    for (let j = 0; j <= 20; j++) {
        for (let i = 0; i <= 12; i++) {
            if (tab[j][i].pillorientation == "virus") {
                exisingVirusesTab.push(tab[j][i].color)
                countedViruses++
            }
        }
    }
    removeDuplicates(exisingVirusesTab)
    exisingVirusesTab.sort()
    if (exisingVirusesTab.includes("blue") != true) { document.getElementById("virusBoxBlue").style.background = "black" }
    if (exisingVirusesTab.includes("yellow") != true) { document.getElementById("virusBoxYellow").style.background = "black" }
    if (exisingVirusesTab.includes("red") != true) { document.getElementById("virusBoxRed").style.background = "black" }
    document.getElementById("score5").style.background = 'url(images/cyfry/' + (startingViruses - countedViruses) + '.png)';
    document.getElementById("score5").style.backgroundSize = scale + "px"
    document.getElementById("virusCount").style.background = 'url(images/cyfry/' + countedViruses + '.png)';
    document.getElementById("virusCount").style.backgroundSize = scale + "px"
    if (startingViruses - countedViruses > localStorage.getItem("topScore")) {
        localStorage.setItem('topScore', (startingViruses - countedViruses))
        document.getElementById("topScore5").style.background = 'url(images/cyfry/' + (startingViruses - countedViruses) + '.png)';
        document.getElementById("topScore5").style.backgroundSize = scale + "px"
    }
    if (countedViruses == 0) {
        gameIsReady = false
        clearInterval(fallInterval)
        clearInterval(virusDanceInterval)
        let winGame = document.createElement("div")
        winGame.id = "winGame"
        winGame.addEventListener("click", function () {
            deleteAllPills()
            startGame()
            document.getElementById("winGame").remove()
        })
        winGame.style.height = `80px`
        winGame.style.width = `288px`
        winGame.style.left = `192px`
        winGame.style.top = `128px`
        winGame.style.position = "absolute"
        winGame.style.background = 'url(images/sc.png)';
        winGame.style.backgroundSize = "288px 80px"
        document.getElementById("wholeGame").append(winGame)
    }
}
function virusDance() {
    document.getElementById("virusBoxRed").style.background = "url(images/lupa/br/default.png)"
    document.getElementById("virusBoxRed").style.backgroundSize = "64px 48px"
    document.getElementById("virusBoxYellow").style.background = "url(images/lupa/yl/default.png)"
    document.getElementById("virusBoxYellow").style.backgroundSize = "64px 48px"
    document.getElementById("virusBoxBlue").style.background = "url(images/lupa/bl/default.png)"
    document.getElementById("virusBoxBlue").style.backgroundSize = "64px 48px"
    virusDanceInterval = setInterval(function () {
        let buffor = virusDancePossitions[0]
        virusDancePossitions.splice(0, 1)
        virusDancePossitions.push(buffor)
        document.getElementById("virusBoxRed").style.left = virusDancePossitions[0].x + "px"
        document.getElementById("virusBoxRed").style.bottom = virusDancePossitions[0].y + "px"
        document.getElementById("virusBoxYellow").style.left = virusDancePossitions[2].x + "px"
        document.getElementById("virusBoxYellow").style.bottom = virusDancePossitions[2].y + "px"
        document.getElementById("virusBoxBlue").style.left = virusDancePossitions[4].x + "px"
        document.getElementById("virusBoxBlue").style.bottom = virusDancePossitions[4].y + "px"
    }, 1600)
}

function gameOver() {
    document.getElementById("prepared1").remove()
    document.getElementById("prepared2").remove()
    gameIsReady = false
    clearInterval(fallInterval)
    let gameOver = document.createElement("div")
    gameOver.id = "gameOver"
    gameOver.addEventListener("click", function () {
        deleteAllPills()
        startGame()
        document.getElementById("gameOver").remove()
    })
    clearInterval(virusDanceInterval)
    if (document.getElementById("virusBoxRed").style.background != "black") {
        document.getElementById("virusBoxRed").style.background = 'url(images/lupa/br/bothered.png)'
        document.getElementById("virusBoxRed").style.backgroundSize = "64px 48px"
    }
    if (document.getElementById("virusBoxYellow").style.background != "black") {
        document.getElementById("virusBoxYellow").style.background = 'url(images/lupa/yl/bothered.png)'
        document.getElementById("virusBoxYellow").style.backgroundSize = "64px 48px"
    }
    if (document.getElementById("virusBoxBlue").style.background != "black") {
        document.getElementById("virusBoxBlue").style.background = 'url(images/lupa/bl/bothered.png)'
        document.getElementById("virusBoxBlue").style.backgroundSize = "64px 48px"
    }
    gameOver.style.height = `80px`
    gameOver.style.width = `288px`
    gameOver.style.left = `192px`
    gameOver.style.top = `128px`
    gameOver.style.position = "absolute"
    gameOver.style.background = 'url(images/go.png)';
    gameOver.style.backgroundSize = "288px 80px"
    document.getElementById("marioBar").style.background = 'url(images/go_dr.png)';
    document.getElementById("marioBar").style.backgroundSize = "96px 96px";
    document.getElementById("wholeGame").append(gameOver)
}