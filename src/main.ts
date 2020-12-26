// @ts-ignore
import testFile from '../media/test.mp4'

type Coords = {
  x: number
  y: number
}

let media:Element
let stats:Element

function init () {
  media = createMediaSource(testFile)
  stats = document.getElementById('stats')
  document.getElementById('media').appendChild(media)
}

function createMediaSource (src: string):Element {
  const mediaElement = document.createElement('video')
  mediaElement.src = src
  mediaElement.autoplay = true
  mediaElement.volume = 0
  mediaElement.classList.add('media')

  return mediaElement
}

function setVolume (distance: number, element: Element) {
  const volume = calculateVolume(distance)
  element.volume = volume
  return volume
}

function calculateVolume (distance: number):number {
  if (distance > 300) return 0

  return 1 - (distance / 300)
}

function setStats (distance: number, volume: number):string {
  return `distance: ${distance}, volume: ${volume}`
}

function getDistance (mousePos: Coords, mediaPos: Coords):number {
  // @ts-ignore
  const hypot = Math.hypot(
    Math.abs(mousePos.y) - Math.abs(mediaPos.y),
    Math.abs(mousePos.x) - Math.abs(mediaPos.x)
  )

  return Math.floor(hypot)
}

init()

window.addEventListener('mousemove', e => {
  const bounds = media.getBoundingClientRect()
  const distance = getDistance(
    { x: e.clientX, y: e.clientY },
    { x: bounds.x, y: bounds.y }
  )

  const volume = setVolume(distance, media)
  stats.innerHTML = setStats(distance, volume)
})
