// worker.js
onmessage = function (e) {
  const setResults = () => {
    const result = applyFilters(e.data)

    postMessage(result)
  }

  setResults()
}

const applyFilters = ({ filters, data, width, height }) => {
  if (filters.sharpen !== 0) {
    return sharpenFilter(data, filters.sharpen, width, height)
  } else if (filters.contrast !== 0) {
    return contrastFilter(data, filters.contrast, width, height)
  } else if (filters.saturation !== 0) {
    return saturationFilter(data, filters.saturation, width, height)
  } else if (filters.brightness !== 0) {
    return brightnessFilter(data, filters.brightness, width, height)
  } else if (filters.temperature !== 0) {
    return temperatureFilter(data, filters.temperature, width, height)
  } else if (filters.grayscale !== null) {
    return grayscaleFilter(data, filters.grayscale, width, height)
  } else if (filters.noise !== 0) {
    return noiseFilter(data, filters.noise, width, height)
  } else if (filters.aberration.intensity !== 0) {
    return aberrationFilter(data, filters.aberration.intensity, filters.aberration.redangle, filters.aberration.greenangle, filters.aberration.blueangle, width, height)
  } else {
    return data
  }
}

function sharpenFilter (imageData, amount, width, height) {
  const mix = amount / 50
  const outputImageData = new ImageData(width, height)
  const pixels = imageData.data
  const outputPixels = outputImageData.data

  // Iteramos sobre cada píxel de la imagen
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4
      const r = pixels[idx]
      const g = pixels[idx + 1]
      const b = pixels[idx + 2]

      // Calculamos la diferencia entre el píxel actual y los píxeles adyacentes
      let diffR = 0; let diffG = 0; let diffB = 0
      if (x > 0 && x < width - 1 && y > 0 && y < height - 1) {
        diffR = pixels[idx] - (pixels[idx - 4] + pixels[idx + 4] + pixels[idx - width * 4] + pixels[idx + width * 4]) / 4
        diffG = pixels[idx + 1] - (pixels[idx - 3] + pixels[idx + 5] + pixels[idx - width * 4 + 1] + pixels[idx + width * 4 + 1]) / 4
        diffB = pixels[idx + 2] - (pixels[idx - 2] + pixels[idx + 6] + pixels[idx - width * 4 + 2] + pixels[idx + width * 4 + 2]) / 4
      }

      // Aplicamos el efecto de nitidez sumando la diferencia multiplicada por la intensidad (strength)
      outputPixels[idx] = r + diffR * mix
      outputPixels[idx + 1] = g + diffG * mix
      outputPixels[idx + 2] = b + diffB * mix
      outputPixels[idx + 3] = pixels[idx + 3] // Mantenemos el canal alfa
    }
  }

  return outputImageData
}
function saturationFilter (imageData, amount, width, height) {
  const outputImageData = new ImageData(width, height)
  const pixels = imageData.data
  const outputPixels = outputImageData.data

  const lumR = 0.3086
  const lumG = 0.6094
  const lumB = 0.0820

  const s = amount / 100 + 1

  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i]
    const g = pixels[i + 1]
    const b = pixels[i + 2]

    const gray = r * lumR + g * lumG + b * lumB

    outputPixels[i] = Math.round(s * (r - gray) + gray)
    outputPixels[i + 1] = Math.round(s * (g - gray) + gray)
    outputPixels[i + 2] = Math.round(s * (b - gray) + gray)
    outputPixels[i + 3] = pixels[i + 3] // Mantener el valor alfa
  }

  return outputImageData
}

function contrastFilter (imageData, amount, width, height) {
  const mix = amount / 255
  const outputImageData = new ImageData(width, height)
  const pixels = imageData.data
  const outputPixels = outputImageData.data

  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i]
    const g = pixels[i + 1]
    const b = pixels[i + 2]

    // Aplicar el efecto de nitidez
    outputPixels[i] = r + (r - 127) * mix
    outputPixels[i + 1] = g + (g - 127) * mix
    outputPixels[i + 2] = b + (b - 127) * mix
    outputPixels[i + 3] = pixels[i + 3] // Mantener el valor alfa
  }

  return outputImageData
}

function brightnessFilter (imageData, amount, width, height) {
  const mix = amount
  const outputImageData = new ImageData(width, height)
  const pixels = imageData.data
  const outputPixels = outputImageData.data

  for (let i = 0; i < pixels.length; i += 4) {
    outputPixels[i] = pixels[i] + mix // R
    outputPixels[i + 1] = pixels[i + 1] + mix // G
    outputPixels[i + 2] = pixels[i + 2] + mix // B
    outputPixels[i + 3] = pixels[i + 3] // Mantener el valor alfa
  }

  return outputImageData
}

function temperatureFilter (imageData, amount, width, height) {
  const mix = amount / 720
  const outputImageData = new ImageData(width, height)
  const pixels = imageData.data
  const outputPixels = outputImageData.data

  // Valores para tonos más cálidos
  const warmR = 255
  const warmG = 150
  const warmB = 50

  // Valores para tonos más fríos
  const coolR = 50
  const coolG = 50
  const coolB = 255

  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i]
    const g = pixels[i + 1]
    const b = pixels[i + 2]

    // Calcular la mezcla de colores cálidos y fríos basada en el valor de "amount"
    outputPixels[i] = Math.min(255, r + -mix * (warmR - coolR)) // R
    outputPixels[i + 1] = Math.min(255, g + -mix * (warmG - coolG)) // G
    outputPixels[i + 2] = Math.min(255, b + -mix * (warmB - coolB)) // B
    outputPixels[i + 3] = pixels[i + 3] // Mantener el valor alfa
  }

  return outputImageData
}

function grayscaleFilter (imageData, amount, width, height) {
  const mix = amount / 100
  const outputImageData = new ImageData(width, height)
  const pixels = imageData.data
  const outputPixels = outputImageData.data

  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i]
    const g = pixels[i + 1]
    const b = pixels[i + 2]

    // Calcular el valor promedio
    const average = (r + g + b) / 6

    // Interpolar entre el valor promedio (gris) y el valor original basado en el valor de cantidad
    const grayValue = Math.round((1 - mix) * average + mix * (r + g + b) / 2)

    // Asignar el mismo valor de escala de grises a cada componente de color
    outputPixels[i] = grayValue // R
    outputPixels[i + 1] = grayValue // G
    outputPixels[i + 2] = grayValue // B
    outputPixels[i + 3] = pixels[i + 3] // Mantener el valor alfa
  }

  return outputImageData
}

// function blurFilter (imageData, amount, width, height) {
//   const radius = amount
//   const data = imageData.data
//   const newData = new Uint8ClampedArray(data.length)

//   // Aplicar efecto de desenfoque
//   for (let y = 0; y < height; y++) {
//     for (let x = 0; x < width; x++) {
//       const index = (y * width + x) * 4
//       let r = 0; let g = 0; let b = 0; let a = 0
//       let count = 0
//       for (let dy = -radius; dy <= radius; dy += 1) {
//         for (let dx = -radius; dx <= radius; dx += 1) {
//           const nx = x + dx
//           const ny = y + dy
//           if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
//             const nIndex = (ny * width + nx) * 4
//             r += data[nIndex]
//             g += data[nIndex + 1]
//             b += data[nIndex + 2]
//             a += data[nIndex + 3]
//             count++
//           }
//         }
//       }
//       newData[index] = r / count
//       newData[index + 1] = g / count
//       newData[index + 2] = b / count
//       newData[index + 3] = a / count
//     }
//   }

//   return new ImageData(newData, width, height)
// }

function noiseFilter (imageData, amount, width, height) {
  const intensity = amount
  const data = imageData.data
  const newData = new Uint8ClampedArray(data.length)

  for (let i = 0; i < data.length; i += 4) {
    // Calculate random noise for each color channel
    const noiseR = (Math.random() * intensity * 2) - intensity
    const noiseG = (Math.random() * intensity * 2) - intensity
    const noiseB = (Math.random() * intensity * 2) - intensity

    // Add noise to each color channel
    newData[i] = data[i] + noiseR
    newData[i + 1] = data[i + 1] + noiseG
    newData[i + 2] = data[i + 2] + noiseB
    newData[i + 3] = data[i + 3]
  }

  return new ImageData(newData, width, height)
}

function aberrationFilter (imageData, intensity, redAngle, greenAngle, blueAngle, width, height) {
  const redRad = redAngle * (Math.PI / 180)
  const greenRad = greenAngle * (Math.PI / 180)
  const blueRad = blueAngle * (Math.PI / 180)
  const data = new Uint8ClampedArray(imageData.data)

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const index = (y * width + x) * 4

      // Red channel
      const redIndex = index
      const redX = x + Math.cos(redRad) * intensity
      const redY = y + Math.sin(redRad) * intensity
      const redPixelIndex = (Math.round(redY) * width + Math.round(redX)) * 4
      if (redX >= 0 && redX < width && redY >= 0 && redY < height) {
        data[redIndex] = imageData.data[redPixelIndex]
      }

      // Green channel
      const greenIndex = index + 1
      const greenX = x + Math.cos(greenRad) * intensity
      const greenY = y + Math.sin(greenRad) * intensity
      const greenPixelIndex = (Math.round(greenY) * width + Math.round(greenX)) * 4 + 1
      if (greenX >= 0 && greenX < width && greenY >= 0 && greenY < height) {
        data[greenIndex] = imageData.data[greenPixelIndex]
      }

      // Blue channel
      const blueIndex = index + 2
      const blueX = x + Math.cos(blueRad) * intensity
      const blueY = y + Math.sin(blueRad) * intensity
      const bluePixelIndex = (Math.round(blueY) * width + Math.round(blueX)) * 4 + 2
      if (blueX >= 0 && blueX < width && blueY >= 0 && blueY < height) {
        data[blueIndex] = imageData.data[bluePixelIndex]
      }
    }
  }

  return new ImageData(data, width, height)
}
