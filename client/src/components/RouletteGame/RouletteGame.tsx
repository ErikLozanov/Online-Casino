import React, { useEffect, useState } from 'react'
import { Wheel } from 'react-custom-roulette'
import { ImageProps, StyleType } from 'react-custom-roulette/dist/components/Wheel/types';

interface WheelData {
    option?: string;
    image?: ImageProps;
    style?: StyleType; // Optional
    optionSize?: number; // Optional
  }

const data = [
    { option: '1', style: { backgroundColor: 'yellow', textColor: 'black' } },
    { option: '3', style: { backgroundColor: 'green', textColor: 'black' } },
    { option: '1', style: { backgroundColor: 'yellow', textColor: 'black' } },
    { option: '5', style: { backgroundColor: 'blue', textColor: 'black' } },
    { option: '1', style: { backgroundColor: 'yellow', textColor: 'black' } },
    { option: '1', style: { backgroundColor: 'yellow', textColor: 'black' } },
    { option: '3', style: { backgroundColor: 'green', textColor: 'black' } },
    { option: '5', style: { backgroundColor: 'blue', textColor: 'black' } },
    { option: '1', style: { backgroundColor: 'yellow', textColor: 'black' } },
    { option: '10', style: {textColor: 'black' } },
    { option: '1', style: { backgroundColor: 'yellow', textColor: 'black' } },
    { option: '3', style: { backgroundColor: 'green', textColor: 'black' } },
    { option: '1', style: { backgroundColor: 'yellow', textColor: 'black' } },
    { option: '1',src: {}, style: { backgroundColor: 'yellow', textColor: 'black' } },
    { option: '20', style: { backgroundColor: 'red', textColor: 'black' } },
    { option: '1', style: { backgroundColor: 'yellow', textColor: 'black' } },
    { option: '3', style: { backgroundColor: 'green', textColor: 'black' } },
    { option: '1', style: { backgroundColor: 'yellow', textColor: 'black' } },
    { option: '10', style: { backgroundColor: 'purple', textColor: 'black' } },
    { option: '1', style: { backgroundColor: 'yellow', textColor: 'black' } },

  ]

const RouletteGame = () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  }

  useEffect(() => {
    // Open WebSocket connection
    const newSocket = new WebSocket('ws://localhost:8080');
    setSocket(newSocket);

    // Cleanup function
    return () => {
      newSocket.close();
    };
  }, []);

  useEffect(() => {
    // Add event listener for messages
    const handleMessage = (event: MessageEvent) => {
      // Handle incoming messages here
      console.log('Received message:', event.data);
      handleSpinClick();
    };

    if (socket) {
      socket.addEventListener('message', handleMessage);
    }

    // Cleanup function
    return () => {
      if (socket) {
        socket.removeEventListener('message', handleMessage);
      }
    };
  }, [socket]);



  return (
    <div className='roulette-main'>
      <Wheel
        innerRadius={10}
        innerBorderColor='red'
        innerBorderWidth={10}
        radiusLineColor='black'
        radiusLineWidth={4}
        spinDuration={1.5}
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={data}

        onStopSpinning={() => {
          setMustSpin(false);
        }}
      />
    </div>
  )
}

export default RouletteGame;