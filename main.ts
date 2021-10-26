radio.onReceivedNumber(function (receivedNumber) {
    bpm_erhalten = receivedNumber
})
function Musik (bpm: number) {
    while (müsig) {
        music.setTempo(bpm)
        for (let index = 0; index < 2; index++) {
            music.playTone(262, music.beat(BeatFraction.Whole))
            music.playTone(262, music.beat(BeatFraction.Whole))
            if (Math.round(Math.map(input.lightLevel(), 0, 255, 0, 2)) == 0) {
                music.playTone(330, music.beat(BeatFraction.Whole))
            } else if (Math.round(Math.map(input.lightLevel(), 0, 255, 0, 2)) == 1) {
                music.playTone(392, music.beat(BeatFraction.Whole))
            } else if (Math.round(Math.map(input.lightLevel(), 0, 255, 0, 2)) == 2) {
                music.playTone(523, music.beat(BeatFraction.Whole))
            }
            music.playTone(262, music.beat(BeatFraction.Whole))
        }
    }
}
input.onButtonPressed(Button.A, function () {
    radio.sendNumber(120)
    basic.pause(1000)
    radio.sendString("S")
    basic.showString("S")
})
input.onButtonPressed(Button.AB, function () {
    debug_mode = true
    müsig = true
    bpm_erhalten = 100
    Musik(bpm_erhalten)
})
radio.onReceivedString(function (receivedString) {
    if (receivedString == "S") {
        müsig = true
        Musik(bpm_erhalten)
    } else if (receivedString == "E") {
        müsig = false
    }
})
input.onButtonPressed(Button.B, function () {
    radio.sendString("E")
    basic.showString("E")
})
let bpm_erhalten = 0
let debug_mode = false
let müsig = false
müsig = false
debug_mode = false
radio.setGroup(28)
radio.setTransmitPower(4)
basic.forever(function () {
    if (debug_mode == false) {
        if (müsig) {
            basic.showNumber(bpm_erhalten)
            basic.showIcon(IconNames.EigthNote)
        } else {
            basic.showIcon(IconNames.Happy)
        }
    } else if (debug_mode == true) {
        basic.showLeds(`
            # . # . #
            . # # # .
            # # # # #
            . # # # .
            # . # . #
            `)
        basic.showNumber(Math.round(Math.map(input.lightLevel(), 0, 255, 0, 2)))
        basic.pause(1000)
    }
})
