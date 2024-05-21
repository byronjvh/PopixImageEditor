export function resizeImage (maxWidth, maxHeight, width, height) {
  let newWidth = width
  let newHeight = height
  let newMaxWidth = 0
  let newMaxHeight = 0

  // Determinar los límites máximos dependiendo de la orientación
  if (newWidth > newHeight) { // horizontal
    newMaxWidth = maxWidth
    newMaxHeight = maxHeight
  } else { // vertical
    newMaxWidth = maxHeight
    newMaxHeight = maxWidth
  }

  // Redimensionar la imagen si excede los límites máximos
  if (newWidth > newMaxWidth || newHeight > newMaxHeight) {
    const aspectRatio = newWidth / newHeight
    if (aspectRatio > 1) { // horizontal
      newWidth = newMaxWidth
      newHeight = Math.floor(newMaxWidth / aspectRatio)
    } else { // vertical
      newHeight = newMaxHeight
      newWidth = Math.floor(newMaxHeight * aspectRatio)
    }
  }

  return { width: newWidth, height: newHeight }
}
