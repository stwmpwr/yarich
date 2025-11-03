// Liquidity Lines Primitive для lightweight-charts

class LiquidityPrimitive {
  constructor(zones) {
    this._zones = zones || [];
  }

  updateZones(zones) {
    this._zones = zones;
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
    return new LiquidityRenderer(this._zones);
  }
}

class LiquidityRenderer {
  constructor(zones) {
    this._zones = zones;
  }

  draw(target) {
    if (!this._zones || this._zones.length === 0) return;

    const ctx = target.context;

    this._zones.forEach(zone => {
      try {
        // Конвертувати time в x координату
        const x1 = target.timeToCoordinate(zone.timeFrom);
        const x2 = target.timeToCoordinate(zone.timeTo);

        // Конвертувати price в y координату
        const y = target.priceToCoordinate(zone.price);

        if (x1 === null || x2 === null || y === null) return;

        const width = x2 - x1;

        // Кольори для Liquidity (помаранчевий/синій)
        const colors = zone.type === 'high'
          ? {
              line: 'rgba(245, 158, 11, 0.7)',     // #f59e0b помаранчевий
              glow: 'rgba(245, 158, 11, 0.3)'
            }
          : {
              line: 'rgba(59, 130, 246, 0.7)',     // #3b82f6 синій
              glow: 'rgba(59, 130, 246, 0.3)'
            };

        // Малюємо пунктирну лінію вправо
        ctx.strokeStyle = colors.line;
        ctx.lineWidth = 1.5 * target.horizontalPixelRatio;
        ctx.setLineDash([5, 5]); // Пунктир

        ctx.beginPath();
        ctx.moveTo(x1, y);
        ctx.lineTo(x2, y);
        ctx.stroke();

        ctx.setLineDash([]); // Скидаємо пунктир

      } catch (error) {
        console.warn('Liquidity render error:', error);
      }
    });
  }
}

export default LiquidityPrimitive;
