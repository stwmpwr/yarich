// Order Block Primitive для lightweight-charts

class OrderBlockPrimitive {
  constructor(blocks) {
    this._blocks = blocks || [];
  }

  updateBlocks(blocks) {
    this._blocks = blocks;
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
    return new OrderBlockRenderer(this._blocks);
  }
}

class OrderBlockRenderer {
  constructor(blocks) {
    this._blocks = blocks;
  }

  draw(target) {
    if (!this._blocks || this._blocks.length === 0) {
      console.log('OrderBlock draw: no blocks');
      return;
    }

    console.log('OrderBlock draw: rendering', this._blocks.length, 'blocks');
    const ctx = target.context;

    this._blocks.forEach((block, idx) => {
      try {
        // Конвертувати time в x координату
        const x1 = target.timeToCoordinate(block.timeFrom);
        const x2 = target.timeToCoordinate(block.timeTo);

        // Конвертувати price в y координату
        const y1 = target.priceToCoordinate(block.high);
        const y2 = target.priceToCoordinate(block.low);

        console.log(`Block ${idx}:`, { x1, x2, y1, y2, timeFrom: block.timeFrom, timeTo: block.timeTo, high: block.high, low: block.low });

        if (x1 === null || x2 === null || y1 === null || y2 === null) {
          console.log(`Block ${idx} skipped: null coordinates`);
          return;
        }

        const width = x2 - x1;
        const height = y2 - y1;

        // Кольори під Electric Matrix
        const colors = block.type === 'bullish'
          ? {
              fill: 'rgba(16, 185, 129, 0.12)',     // #10b981 зелений
              border: 'rgba(16, 185, 129, 0.5)',
              glow: 'rgba(16, 185, 129, 0.3)'
            }
          : {
              fill: 'rgba(239, 68, 68, 0.12)',      // #ef4444 червоний
              border: 'rgba(239, 68, 68, 0.5)',
              glow: 'rgba(239, 68, 68, 0.3)'
            };

        // Малюємо glow ефект
        ctx.shadowColor = colors.glow;
        ctx.shadowBlur = 10;

        // Малюємо заповнення
        ctx.fillStyle = colors.fill;
        ctx.fillRect(x1, y1, width, height);

        // Малюємо рамку
        ctx.strokeStyle = colors.border;
        ctx.lineWidth = 2;
        ctx.strokeRect(x1, y1, width, height);

        // Скидаємо shadow
        ctx.shadowBlur = 0;

        console.log(`Block ${idx} drawn:`, { x1, y1, width, height, fill: colors.fill, border: colors.border });

      } catch (error) {
        // Ігноруємо помилки для поточного блоку
        console.warn('Order Block render error:', error);
      }
    });
  }
}

export default OrderBlockPrimitive;
