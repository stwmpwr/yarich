import { useEffect, useRef } from 'react';
import { createChart, CandlestickSeries } from 'lightweight-charts';

export default function TradingChart() {
  const chartContainerRef = useRef(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { color: 'transparent' },
        textColor: 'rgba(255, 255, 255, 0.4)',
      },
      grid: {
        vertLines: { color: 'rgba(255, 255, 255, 0.05)' },
        horzLines: { color: 'rgba(255, 255, 255, 0.05)' },
      },
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      timeScale: {
        borderColor: 'rgba(255, 255, 255, 0.1)',
        timeVisible: true,
      },
      rightPriceScale: {
        borderColor: 'rgba(255, 255, 255, 0.1)',
      },
      crosshair: {
        vertLine: {
          color: 'rgba(139, 92, 246, 0.5)',
          labelBackgroundColor: '#8b5cf6',
        },
        horzLine: {
          color: 'rgba(139, 92, 246, 0.5)',
          labelBackgroundColor: '#8b5cf6',
        },
      },
    });

    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor: '#10b981',
      downColor: '#ef4444',
      borderUpColor: '#10b981',
      borderDownColor: '#ef4444',
      wickUpColor: '#10b981',
      wickDownColor: '#ef4444',
    });

    // Генерація Bitcoin-подібних даних
    const generateData = (count) => {
      const data = [];
      let time = Math.floor(Date.now() / 1000) - count * 3600; // hourly candles
      let price = 95000; // BTC starting price
      let trend = 1; // uptrend

      for (let i = 0; i < count; i++) {
        // Simulate realistic BTC movement
        const volatility = price * 0.015; // 1.5% volatility
        const trendChange = Math.random() > 0.95 ? -trend : trend;
        trend = trendChange;

        const open = price;
        const movement = (Math.random() - 0.4) * volatility * trend;
        const close = open + movement;
        const high = Math.max(open, close) + Math.random() * volatility * 0.5;
        const low = Math.min(open, close) - Math.random() * volatility * 0.5;

        data.push({
          time,
          open: Math.round(open * 100) / 100,
          high: Math.round(high * 100) / 100,
          low: Math.round(low * 100) / 100,
          close: Math.round(close * 100) / 100,
        });

        time += 3600; // 1 hour
        price = close;
      }

      return data;
    };

    const initialData = generateData(200);
    candlestickSeries.setData(initialData);

    // Автоматичне додавання нових свічок (BTC-like)
    const addNewCandle = () => {
      const lastCandle = initialData[initialData.length - 1];
      const open = lastCandle.close;
      const volatility = open * 0.003; // 0.3% movement per update
      const movement = (Math.random() - 0.5) * volatility;
      const close = open + movement;
      const high = Math.max(open, close) + Math.random() * volatility * 0.3;
      const low = Math.min(open, close) - Math.random() * volatility * 0.3;

      const newCandle = {
        time: lastCandle.time + 3600,
        open: Math.round(open * 100) / 100,
        high: Math.round(high * 100) / 100,
        low: Math.round(low * 100) / 100,
        close: Math.round(close * 100) / 100,
      };

      initialData.push(newCandle);
      if (initialData.length > 250) {
        initialData.shift();
      }

      candlestickSeries.update(newCandle);
    };

    const interval = setInterval(addNewCandle, 1000);

    // Resize handler
    const handleResize = () => {
      chart.applyOptions({
        width: chartContainerRef.current.clientWidth,
        height: chartContainerRef.current.clientHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    chart.timeScale().fitContent();

    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(interval);
      chart.remove();
    };
  }, []);

  return (
    <div
      ref={chartContainerRef}
      className="w-full h-screen min-h-[100vh]"
    />
  );
}
