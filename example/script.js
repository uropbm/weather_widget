const WIDTH = 800
const HEIGHT = 400
const DPI_WIDTH = WIDTH * 2
const DPI_HEIGHT = HEIGHT * 2
const ROWS_COUNT = 5
const PADDING = 50
const ROWS_INDENT = DPI_HEIGHT - PADDING * 2

let data = [
  [0, 0],
  [200, 120],
  [400, 140],
  [600, 508],
  [800, 280],
  [1000, 560],
]

const [yMin, yMax] = minMax(data)

temp(document.getElementById('canvas'), data)

function temp(canvas, data) {
  let ctx = canvas.getContext('2d')

  canvas.style.width = WIDTH + 'px'
  canvas.style.height = HEIGHT + 'px'
  canvas.width = DPI_WIDTH
  canvas.height = DPI_HEIGHT

  const rowsAxis = yMax - yMin + PADDING * 2
  const rowsIndentFact = yMax - yMin
  const kof = (yMax - yMin) / DPI_HEIGHT
  console.log([yMin, yMax], rowsAxis, DPI_HEIGHT, kof, PADDING)

  ctx.beginPath()
  ctx.lineWidth = 4
  ctx.strokeStyle = 'red'
  for (const [x, y] of data) {
    let prom = (rowsIndentFact - y) / kof
    ctx.lineTo(x, prom)
    console.log(prom)
  }
  ctx.stroke()
  ctx.closePath()

  // y axis

  ctx.beginPath()
  ctx.lineWidth = 2
  ctx.strokeStyle = '#bbb'
  ctx.font = 'normal 20px Comic Sans MS, sans-serif'
  ctx.fillStyle = '#000FFF'
  const STEP = ROWS_INDENT / ROWS_COUNT
  for (let i = 1; i <= ROWS_COUNT; i++) {
    const y = i * STEP
    const textStep = rowsAxis / ROWS_COUNT * i
    ctx.fillText(rowsAxis - textStep, 0, y + PADDING - 10)
    ctx.moveTo(0, y + PADDING)
    ctx.lineTo(DPI_WIDTH, y + PADDING)
  }
  ctx.stroke()
  ctx.closePath()

  //
}

function minMax(data) {
  let min, max
  for (const [ , y] of data) {
    if (typeof min !== 'number') min = y
    if (typeof max !== 'number') max = y

    if (min > y) {
      min = y
    }
    if (max < y) {
      max = y
    }
  }

  return [min, max]
}

