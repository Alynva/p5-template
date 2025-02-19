var canvas, gui, stats, gifJs, showStats = false, isRecording = false

function setup() {
    stats = createStats()
    gui = createGUI()
    gifJs = createGifJs()
    canvas = createCanvas(windowWidth, windowHeight)
}

function draw() {
    drawBegin()
    draw_()
    drawEnd()
}

function drawBegin() {
    stats.begin()
}

function drawEnd() {
    if(isRecording)
        gifJs.addFrame(canvas.elt, {delay: 1, copy: true})
    stats.end()
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight)
}

function downloadScreenshot() {
    const a = document.createElement('a')
    a.download = `${document.title}.png`
    a.href = canvas.elt.toDataURL("image/png")
    a.click()
}

function abortRendering() {
    isRecording = false
    gifJs.abort()
    gifJs.frames = []
    gui.abortRenderingController.__li.hidden = true
    gui.recordingLabel.setText(`Status: Rendering Aborted`)
}