"use strict";

class Pill {
    constructor(xPos, yPos, color, isMoving, isConnected, isCore, pillorientation, scale, pillId) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.color = color;
        this.isMoving = isMoving;
        this.isConnected = isConnected
        this.isCore = isCore
        this.pillorientation = pillorientation
        this.scale = scale
        this.pillId = pillId
        this.onScreen
    };

    deleteHorizontal() {
        for (var v = 0; v <= 8; v++) {
            if (tab[this.yPos][this.xPos + v] != undefined) {
                if (this.color == tab[this.yPos][this.xPos + v].color) {
                    if (tab[this.yPos - 3][this.xPos + v] != undefined) {
                        if (tab[this.yPos][this.xPos + v].color == tab[this.yPos - 3][this.xPos + v].color
                            && tab[this.yPos][this.xPos + v].color == tab[this.yPos - 2][this.xPos + v].color
                            && tab[this.yPos][this.xPos + v].color == tab[this.yPos - 1][this.xPos + v].color) {
                            tabAdditionalHits.push(-3, -2, -1)
                        }
                    }
                    if (tab[this.yPos - 2][this.xPos + v] != undefined && tab[this.yPos + 1][this.xPos + v] != undefined) {
                        if (tab[this.yPos][this.xPos + v].color == tab[this.yPos + 1][this.xPos + v].color
                            && tab[this.yPos][this.xPos + v].color == tab[this.yPos - 2][this.xPos + v].color
                            && tab[this.yPos][this.xPos + v].color == tab[this.yPos - 1][this.xPos + v].color) {
                            tabAdditionalHits.push(1, -2, -1)
                        }
                    }
                    if (tab[this.yPos + 2][this.xPos + v] != undefined && tab[this.yPos - 1][this.xPos + v] != undefined) {
                        if (tab[this.yPos][this.xPos + v].color == tab[this.yPos + 1][this.xPos + v.color]
                            && tab[this.yPos][this.xPos + v].color == tab[this.yPos + 2][this.xPos + v.color]
                            && tab[this.yPos][this.xPos + v].color == tab[this.yPos - 1][this.xPos + v].color) {
                            tabAdditionalHits.push(1, 2, -1)
                        }
                    }
                    if (tab[this.yPos][this.xPos + v].color == tab[this.yPos + 3][this.xPos + v].color) {
                        if (tab[this.yPos][this.xPos + v].color == tab[this.yPos + 1][this.xPos + v].color
                            && tab[this.yPos][this.xPos + v].color == tab[this.yPos + 2][this.xPos + v].color
                            && tab[this.yPos][this.xPos + v].color == tab[this.yPos + 3][this.xPos + v].color) {
                            tabAdditionalHits.push(1, 2, 3)
                        }
                    }
                    tabAdditionalHits.push(0)
                    removeDuplicates(tabAdditionalHits)
                    for (let a = tabAdditionalHits.length - 1; a >= 0; a--) {
                        tab[this.yPos + tabAdditionalHits[a]][this.xPos + v].delete()
                    }
                    tabAdditionalHits = []
                }
                else { break }
            }
        }
        myPosition1 = 5
        myPosition2 = 6
        currentHeight = 1
        checkForViruses()
        fallCheck()
    }
    deleteVertical() {
        for (var v = 0; v <= 8; v++) {
            if (tab[this.yPos + v][this.xPos] != undefined) {
                if (this.color == tab[this.yPos + v][this.xPos].color) {
                    if (tab[this.yPos + v][this.xPos - 3] != undefined) {
                        if (tab[this.yPos + v][this.xPos].color == tab[this.yPos + v][this.xPos - 3].color
                            && tab[this.yPos + v][this.xPos].color == tab[this.yPos + v][this.xPos - 2].color
                            && tab[this.yPos + v][this.xPos].color == tab[this.yPos + v][this.xPos - 1].color) {
                            tabAdditionalHits.push(-3, -2, -1)
                        }
                    }
                    if (tab[this.yPos + v][this.xPos - 2] != undefined && tab[this.yPos + v][this.xPos + 1].color != undefined) {
                        if (tab[this.yPos + v][this.xPos].color == tab[this.yPos + v][this.xPos + 1].color
                            && tab[this.yPos + v][this.xPos].color == tab[this.yPos + v][this.xPos - 2].color
                            && tab[this.yPos + v][this.xPos].color == tab[this.yPos + v][this.xPos - 1].color) {
                            tabAdditionalHits.push(1, -2, -1)
                        }
                    }
                    if (tab[this.yPos + v][this.xPos + 2] != undefined && tab[this.yPos + v][this.xPos - 1].color != undefined) {
                        if (tab[this.yPos + v][this.xPos].color == tab[this.yPos + v][this.xPos + 1].color
                            && tab[this.yPos + v][this.xPos].color == tab[this.yPos + v][this.xPos + 2].color
                            && tab[this.yPos + v][this.xPos].color == tab[this.yPos + v][this.xPos - 1].color) {
                            tabAdditionalHits.push(1, 2, -1)
                        }
                    }
                    if (tab[this.yPos + v][this.xPos + 3] != undefined) {
                        if (tab[this.yPos + v][this.xPos].color == tab[this.yPos + v][this.xPos + 1].color
                            && tab[this.yPos + v][this.xPos].color == tab[this.yPos + v][this.xPos + 2].color
                            && tab[this.yPos + v][this.xPos].color == tab[this.yPos + v][this.xPos + 3].color) {
                            tabAdditionalHits.push(1, 2, 3)
                        }
                    }
                    tabAdditionalHits.push(0)
                    removeDuplicates(tabAdditionalHits)
                    for (let a = tabAdditionalHits.length - 1; a >= 0; a--) {
                        tab[this.yPos + v][this.xPos + tabAdditionalHits[a]].delete()
                    }
                    tabAdditionalHits = []
                }
                else { break }
            }
        }
        myPosition1 = 5
        myPosition2 = 6
        currentHeight = 1
        checkForViruses()
        fallCheck()
    }
    fillAfterDeletion(pill, color, orientation, top, left, backgroundSize, backgroundSize2) {
        pill.style.background = 'url(images/' + color + '_' + orientation + '.png)';
        pill.style.backgroundSize = `${backgroundSize}px ${backgroundSize2}px`
        pill.style.top = `${(top - 2) * this.scale}px`
        pill.style.left = `${(left - 2) * this.scale}px`
        pill.style.position = "absolute"
        pill.style.width = `${backgroundSize}px`
        pill.style.height = `${backgroundSize}px`
        pill.style.zIndex = "10"
        pill.id = fillId
        document.getElementById("gameBoard").appendChild(pill)
        setTimeout(function () {
            pill.remove()
        }, 200)
        fillId++
    }
    delete() {
        let fill = document.createElement("div")
        let orient = "o"
        if (this.pillorientation == "virus") { orient = "x" }
        this.fillAfterDeletion(fill, this.color, orient, this.yPos, this.xPos, this.scale, this.scale)
        this.onScreen.remove()
        tab[this.yPos][this.xPos] = 0
    }
    blockBuddy() {
        if (tab[this.yPos][this.xPos + 1].isConnected == true && tab[this.yPos][this.xPos + 1].isMoving == true) {
            tab[this.yPos][this.xPos + 1].isMoving = false
        }
        if (tab[this.yPos][this.xPos - 1].isConnected == true && tab[this.yPos][this.xPos - 1].isMoving == true) {
            tab[this.yPos][this.xPos - 1].isMoving == false
        }
        if (tab[this.yPos - 1][this.xPos].isConnected == true && tab[this.yPos - 1][this.xPos].isMoving == true) {
            tab[this.yPos - 1][this.xPos].isMoving == false
        }
        if (tab[this.yPos + 1][this.xPos].isConnected == true && tab[this.yPos + 1][this.xPos].isMoving == true) {
            tab[this.yPos + 1][this.xPos].isMoving == false
        }
        tab[this.yPos][this.xPos].isMoving = false
        clearInterval(quickFallInterval)
        clearInterval(fallInterval)
        marioTrow()
        // hitBottom = true
        nowCheck = true
    }
    move(oldY, oldX, newY, newX) {
        tab[oldY][oldX].yPos = newY
        tab[oldY][oldX].xPos = newX
        let buffor = tab[newY][newX]
        tab[newY][newX] = tab[oldY][oldX]
        tab[oldY][oldX] = buffor
    };
    move2(borderY, borderX, direction) {
        switch (direction) {
            case "left":
                this.move(borderY, borderX, borderY, borderX - 1)
                this.move(borderY, borderX + 1, borderY, borderX)
                break;
            case "right":
                this.move(borderY, borderX, borderY, borderX + 1)
                this.move(borderY, borderX - 1, borderY, borderX)
                break;
            case "down":
                this.move(borderY, borderX, borderY + 1, borderX)
                this.move(borderY - 1, borderX, borderY, borderX)
                break;
        }
    }
    spawn() {
        let block = document.createElement("div")
        block.className = "gameBlock"
        block.style.left = `${this.xPos * this.scale - 2 * this.scale}px`
        block.style.top = `${this.yPos * this.scale - 2 * this.scale}px`
        block.style.background = 'url(images/' + this.color + '_' + this.pillorientation + '.png)';
        block.style.backgroundSize = scale + "px" + scale + "px"
        gameboard.append(block)
        this.onScreen = block
    }
    goDown(mainPill) {
        if (tab[this.yPos + 1][this.xPos] == 0) {
            if (mainPill) { currentHeight++ }
            if (tab[this.yPos][this.xPos + 1].isConnected == true && tab[this.yPos][this.xPos + 1].isMoving == true && tab[this.yPos][this.xPos + 1].pillId == this.pillId) {
                if (tab[this.yPos + 1][this.xPos + 1] == 0) {
                    this.move(this.yPos, this.xPos + 1, this.yPos + 1, this.xPos + 1)
                    this.move(this.yPos, this.xPos, this.yPos + 1, this.xPos)
                }
                else {
                    this.blockBuddy()
                }
            }
            if (tab[this.yPos][this.xPos - 1].isConnected == true && tab[this.yPos][this.xPos - 1].isMoving == true && tab[this.yPos][this.xPos - 1].pillId == this.pillId) {
                if (tab[this.yPos + 1][this.xPos - 1] == 0) {
                    this.move(this.yPos, this.xPos - 1, this.yPos + 1, this.xPos - 1)
                    this.move(this.yPos, this.xPos, this.yPos + 1, this.xPos)
                }
                else {
                    this.blockBuddy()
                }
            }
            if (tab[this.yPos - 1][this.xPos].isConnected == true && tab[this.yPos - 1][this.xPos].isMoving == true) {
                this.move2(this.yPos, this.xPos, "down")
            }
        }
        else {
            this.blockBuddy()
        }
    }
    goLeft() {
        if (tab[this.yPos][this.xPos - 1] == 0) {
            if (tab[this.yPos - 1][this.xPos].pillId == this.pillId && tab[this.yPos - 1][this.xPos - 1] == 0) {
                this.move(this.yPos - 1, this.xPos, this.yPos - 1, this.xPos - 1)
                this.move(this.yPos, this.xPos, this.yPos, this.xPos - 1)
                myPosition1--
            }
            if (tab[this.yPos][this.xPos + 1].pillId == this.pillId) {
                this.move2(this.yPos, this.xPos, "left")
                myPosition1--
            }
        }
        else if (tab[this.yPos][this.xPos - 2] == 0 && tab[this.yPos][this.xPos - 1].pillId == this.pillId) {
            this.move2(this.yPos, this.xPos + 1, "left")
            myPosition1--
        }
    }
    goRight() {
        if (tab[this.yPos][this.xPos + 1] == 0) {
            if (tab[this.yPos - 1][this.xPos + 1] == 0 && tab[this.yPos - 1][this.xPos].pillId == this.pillId) {
                this.move(this.yPos - 1, this.xPos, this.yPos - 1, this.xPos + 1)
                this.move(this.yPos, this.xPos, this.yPos, this.xPos + 1)
                myPosition1++
            }
            if (tab[this.yPos][this.xPos - 1].pillId == this.pillId) {
                this.move2(this.yPos, this.xPos, "right")
                myPosition1++
            }
        }
        else if (tab[this.yPos][this.xPos + 2] == 0 && tab[this.yPos][this.xPos + 1].pillId == this.pillId) {
            this.move2(this.yPos, this.xPos + 1, "right")
            myPosition1++
        }
    }
    turnUp() {
        if (tab[this.yPos][this.xPos].pillorientation == "left" && tab[this.yPos - 1][this.xPos] == 0) {
            this.move(this.yPos, this.xPos + 1, this.yPos - 1, this.xPos)
            tab[this.yPos - 1][this.xPos].pillorientation = "up"
            this.pillorientation = "down"
        }
        else if (tab[this.yPos][this.xPos].pillorientation == "down" && tab[this.yPos - 1][this.xPos].pillorientation == "up") {
            if (tab[this.yPos][this.xPos + 1] != 0 && tab[this.yPos][this.xPos - 1] == 0) {
                tab[this.yPos - 1][this.xPos].pillorientation = "left"
                tab[this.yPos - 1][this.xPos].isCore = true
                this.pillorientation = "right"
                this.isCore = false
                this.move(this.yPos - 1, this.xPos, this.yPos, this.xPos - 1)
                myPosition1--
            }
            if (tab[this.yPos][this.xPos + 1] == 0) {
                tab[this.yPos - 1][this.xPos].pillorientation = "left"
                tab[this.yPos - 1][this.xPos].isCore = true
                this.pillorientation = "right"
                this.isCore = false
                this.move(this.yPos, this.xPos, this.yPos, this.xPos + 1)
                this.move(this.yPos - 1, this.xPos - 1, this.yPos, this.xPos - 1)
            }
        }
    }
    turnShift() {
        if (tab[this.yPos][this.xPos].pillorientation == "left" && tab[this.yPos - 1][this.xPos] == 0) {
            this.pillorientation = "up"
            this.isCore = false
            tab[this.yPos][this.xPos + 1].pillorientation = "down"
            tab[this.yPos][this.xPos + 1].isCore = true
            this.move(this.yPos, this.xPos, this.yPos - 1, this.xPos)
            this.move(this.yPos + 1, this.xPos + 1, this.yPos + 1, this.xPos)

        }
        else if (tab[this.yPos][this.xPos].pillorientation == "down" && tab[this.yPos - 1][this.xPos].pillorientation == "up") {
            if (tab[this.yPos][this.xPos + 1] != 0 && tab[this.yPos][this.xPos - 1] == 0) {
                tab[this.yPos - 1][this.xPos].pillorientation = "right"
                tab[this.yPos - 1][this.xPos].isCore = true
                this.pillorientation = "left"
                this.isCore = false
                this.move(this.yPos, this.xPos, this.yPos, this.xPos - 1)
                this.move(this.yPos - 1, this.xPos + 1, this.yPos, this.xPos + 1)
                myPosition1--
            }
            if (tab[this.yPos][this.xPos + 1] == 0) {
                tab[this.yPos - 1][this.xPos].pillorientation = "right"
                this.pillorientation = "left"
                this.move(this.yPos - 1, this.xPos, this.yPos, this.xPos + 1)
            }
        }
    }
}