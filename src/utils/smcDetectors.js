// SMC (Smart Money Concepts) Detection Algorithms

/**
 * Detect Order Blocks - останні свічки перед сильним рухом
 * @param {Array} candles - масив свічок {time, open, high, low, close}
 * @param {Number} lookback - скільки свічок назад дивитись
 * @returns {Array} - масив Order Blocks
 */
export function detectOrderBlocks(candles, lookback = 20) {
  const blocks = [];

  for (let i = lookback; i < candles.length - 2; i++) {
    const prev = candles[i - 1];
    const current = candles[i];
    const next = candles[i + 1];
    const candleSize = current.high - current.low;
    const priceMove = Math.abs(next.close - current.close);

    // Bullish OB: ведмежа свічка перед висхідним рухом
    const isBearishCandle = current.close < current.open;
    const isBullishMove = next.close > current.close;
    const isSignificantMove = priceMove > candleSize * 0.5;

    if (isBearishCandle && isBullishMove && isSignificantMove) {
      blocks.push({
        type: 'bullish',
        timeFrom: current.time,
        timeTo: current.time + 3600 * 15, // Тривалість зони (15 годин)
        high: current.high,
        low: current.low,
        strength: priceMove / candleSize
      });
    }

    // Bearish OB: бича свічка перед низхідним рухом
    const isBullishCandle = current.close > current.open;
    const isBearishMove = next.close < current.close;

    if (isBullishCandle && isBearishMove && isSignificantMove) {
      blocks.push({
        type: 'bearish',
        timeFrom: current.time,
        timeTo: current.time + 3600 * 15,
        high: current.high,
        low: current.low,
        strength: priceMove / candleSize
      });
    }
  }

  // Повернути останні 3 найсильніших Order Blocks
  return blocks
    .sort((a, b) => b.strength - a.strength)
    .slice(0, 3);
}

/**
 * Detect Fair Value Gaps - гепи між свічками
 * @param {Array} candles
 * @returns {Array} - масив FVG зон
 */
export function detectFVG(candles) {
  const gaps = [];

  for (let i = 2; i < candles.length; i++) {
    const prev = candles[i - 2];
    const current = candles[i - 1];
    const next = candles[i];

    // Bullish FVG: гап між prev.high та next.low (ціна не заповнена)
    if (prev.high < next.low) {
      const gapSize = next.low - prev.high;
      gaps.push({
        type: 'bullish',
        timeFrom: current.time,
        timeTo: current.time + 3600 * 8, // 8 годин
        high: next.low,
        low: prev.high,
        size: gapSize
      });
    }

    // Bearish FVG: гап між prev.low та next.high
    if (prev.low > next.high) {
      const gapSize = prev.low - next.high;
      gaps.push({
        type: 'bearish',
        timeFrom: current.time,
        timeTo: current.time + 3600 * 8,
        high: prev.low,
        low: next.high,
        size: gapSize
      });
    }
  }

  // Повернути останні 2 найбільші FVG
  return gaps
    .sort((a, b) => b.size - a.size)
    .slice(0, 2);
}

/**
 * Detect Swing Highs/Lows - точки ліквідності
 * @param {Array} candles
 * @param {Number} period - скільки свічок ліворуч/праворуч
 * @returns {Array} - масив swing points
 */
export function detectSwingPoints(candles, period = 5) {
  const swings = [];

  for (let i = period; i < candles.length - period; i++) {
    const current = candles[i];
    let isSwingHigh = true;
    let isSwingLow = true;

    // Перевірка period свічок ліворуч і праворуч
    for (let j = 1; j <= period; j++) {
      // Swing High: поточний high вищий за всі навколо
      if (candles[i - j].high >= current.high ||
          candles[i + j].high >= current.high) {
        isSwingHigh = false;
      }

      // Swing Low: поточний low нижчий за всі навколо
      if (candles[i - j].low <= current.low ||
          candles[i + j].low <= current.low) {
        isSwingLow = false;
      }
    }

    if (isSwingHigh) {
      swings.push({
        type: 'high',
        timeFrom: current.time,
        timeTo: current.time + 3600 * 15, // 15 годин
        price: current.high
      });
    }

    if (isSwingLow) {
      swings.push({
        type: 'low',
        timeFrom: current.time,
        timeTo: current.time + 3600 * 15,
        price: current.low
      });
    }
  }

  // Повернути останні 5 swing points
  return swings.slice(-5);
}
