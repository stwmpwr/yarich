// Fair Value Gap Primitive для lightweight-charts

class FVGPrimitive {
  constructor(gaps) {
    this._gaps = gaps || [];
  }

  updateZones(gaps) {
    this._gaps = gaps;
  }

  updateAllViews() {
    // Викликається при оновленні графіка
  }

  priceValueBuilder(plotRow) {
    return [plotRow];
  }

  isWhitespace(data) {
    return data === null;
  }

  renderer() {
    return new FVGRenderer(this._gaps);
  }
}

class FVGRenderer {
  constructor(gaps) {
    this._gaps = gaps;
  }

  draw(target) {
    if (!this._gaps || this._gaps.length === 0) return;

    const ctx = target.context;

    this._gaps.forEach(gap => {
      try {
        // Конвертувати time в x координату
        const x1 = target.timeToCoordinate(gap.timeFrom);
        const x2 = target.timeToCoordinate(gap.timeTo);

        // Конвертувати price в y координату
        const y1 = target.priceToCoordinate(gap.high);
        const y2 = target.priceToCoordinate(gap.low);

        if (x1 === null || x2 === null || y1 === null || y2 === null) return;

        const width = x2 - x1;
        const height = y2 - y1;

        // Кольори для FVG (фіолетовий/рожевий)
        const colors = gap.type === 'bullish'
          ? {
              fill: 'rgba(139, 92, 246, 0.08)',     // #8b5cf6 фіолетовий
              border: 'rgba(139, 92, 246, 0.4)',
              glow: 'rgba(139, 92, 246, 0.2)'
            }
          : {
              fill: 'rgba(236, 72, 153, 0.08)',     // #ec4899 рожевий
              border: 'rgba(236, 72, 153, 0.4)',
              glow: 'rgba(236, 72, 153, 0.2)'
            };

        // Малюємо заповнення
        ctx.fillStyle = colors.fill;
        ctx.fillRect(x1, y1, width, height);

        // Малюємо пунктирну рамку
        ctx.strokeStyle = colors.border;
        ctx.lineWidth = 1 * target.horizontalPixelRatio;
        ctx.setLineDash([5, 3]); // Пунктир
        ctx.strokeRect(x1, y1, width, height);
        ctx.setLineDash([]); // Скидаємо пунктир

      } catch (error) {
        console.warn('FVG render error:', error);
      }
    });
  }
}

export default FVGPrimitive;
