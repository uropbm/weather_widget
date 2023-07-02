const WIDTH = 800
const HEIGHT = 400
const DPI_WIDTH = WIDTH * 2
const DPI_HEIGHT = HEIGHT * 2
const ROWS_COUNT = 5
const PADDING = 50
const ROWS_INDENT = DPI_HEIGHT - PADDING * 2

let data = [
  [0, 6.8],
  [200, 16.1],
  [400, 19],
  [600, -20.9],
  [800, 25.3],
  [1000, 20.7],
  [1200, -2.4],
  [1400, 13],
]

const [yMin, yMax] = minMax(data)

temp(document.getElementById('canvas'), data)

function temp(canvas, data) {

  let ctx = canvas.getContext('2d')

  canvas.style.width = WIDTH + 'px'
  canvas.style.height = HEIGHT + 'px'
  canvas.width = DPI_WIDTH
  canvas.height = DPI_HEIGHT

  const rowsAxis = yMax - yMin
  const kof = (yMax - yMin) / (DPI_HEIGHT - PADDING * 2)
  ctx.beginPath()
  ctx.lineWidth = 4
  ctx.strokeStyle = 'red'
  for (const [x, y] of data) {
      ctx.lineTo(x, (yMax - y) / kof + PADDING)
  }
  ctx.stroke()
  ctx.closePath()

  // y axis

  ctx.beginPath()
  ctx.lineWidth = 2
  ctx.strokeStyle = '#bbb'
  ctx.font = 'normal 25px Comic Sans MS, sans-serif'
  ctx.fillStyle = '#black'
  const STEP = ROWS_INDENT / ROWS_COUNT
  for (let i = 1; i <= ROWS_COUNT; i++) {
    const y = i * STEP
    const textStep = rowsAxis / ROWS_COUNT * i
    ctx.fillText((yMax - textStep).toFixed(1), 0, y + PADDING - 10)
    ctx.moveTo(0, y + PADDING)
    ctx.lineTo(DPI_WIDTH, y + PADDING)
  }

  ctx.fillText(yMax, 0, PADDING - 10)
  ctx.moveTo(0, PADDING)
  ctx.lineTo(DPI_WIDTH, PADDING)
  ctx.stroke()
  ctx.closePath()

  //

  // x legend

  ctx.beginPath()
  ctx.font = 'normal 25px Comic Sans MS, sans-serif'
  ctx.fillStyle = '#black'

  for (const [x,] of data) {
    ctx.moveTo(x, DPI_HEIGHT - PADDING + 10)
    ctx.lineTo(x, PADDING - 10)
    ctx.fillText(x, x - 25, DPI_HEIGHT - 10)
  }

  ctx.stroke()

  //

  canvas.addEventListener('mousemove', function (e) {

      ctx.beginPath()
      ctx.lineWidth = 2
      ctx.strokeStyle = '#bbb'
      ctx.moveTo(e.offsetX * 2, DPI_HEIGHT - PADDING)
      ctx.lineTo(e.offsetX * 2, PADDING)
      ctx.stroke()
      console.log(e)
      // ctx.clearRect(e.layerX * 2 - 140, PADDING, 2, DPI_HEIGHT)
      ctx.closePath()
    })
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

