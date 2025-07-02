import React, { useState } from 'react';
import { Coffee, Lock, Delete, Check } from 'lucide-react';

interface WelcomeScreenProps {
  onAuthenticate: (staffId: string) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onAuthenticate }) => {
  const [pin, setPin] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Mock staff database - in production, this would be from a secure backend
  const staffPins = {
    '1234': { id: '1', name: 'Sarah Johnson', role: 'cashier' },
    '5678': { id: '2', name: 'Mike Chen', role: 'manager' },
    '9999': { id: '3', name: 'Hadi Latip', role: 'barista' },
  };

  const handleNumberPress = (number: string) => {
    if (pin.length < 6) {
      setPin(prev => prev + number);
      setError('');
    }
  };

  const handleDelete = () => {
    setPin(prev => prev.slice(0, -1));
    setError('');
  };

  const handleClear = () => {
    setPin('');
    setError('');
  };

  const handleSubmit = async () => {
    if (pin.length < 4) {
      setError('PIN must be at least 4 digits');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const staff = staffPins[pin as keyof typeof staffPins];
    if (staff) {
      onAuthenticate(staff.id);
    } else {
      setError('Invalid PIN. Please try again.');
      setPin('');
    }

    setIsLoading(false);
  };

  const keypadNumbers = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['C', '0', '⌫']
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary-dark to-accent flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-12">
          <div className="bg-white p-6 rounded-2xl shadow-2xl mx-auto w-24 h-24 flex items-center justify-center mb-6">
            <Coffee className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Dosz Coffee</h1>
          <p className="text-primary-light text-lg">Point of Sale System</p>
        </div>

        {/* PIN Entry Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6">
          <div className="text-center mb-8">
            <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Lock className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-2xl font-semibold text-accent mb-2">Enter PIN</h2>
            <p className="text-warm-gray-600">Please enter your PIN to access the system</p>
          </div>

          {/* PIN Display */}
          <div className="mb-8">
            <div className="flex justify-center space-x-3 mb-4">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${
                    index < pin.length
                      ? 'bg-primary border-primary'
                      : 'border-warm-gray-300'
                  }`}
                />
              ))}
            </div>
            {error && (
              <p className="text-red-500 text-center text-sm font-medium">{error}</p>
            )}
          </div>

          {/* Keypad */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {keypadNumbers.flat().map((key, index) => (
              <button
                key={index}
                onClick={() => {
                  if (key === 'C') {
                    handleClear();
                  } else if (key === '⌫') {
                    handleDelete();
                  } else {
                    handleNumberPress(key);
                  }
                }}
                disabled={isLoading}
                className={`h-16 rounded-xl font-semibold text-xl transition-all duration-200 touch-manipulation active:scale-95 ${
                  key === 'C'
                    ? 'bg-red-100 text-red-600 hover:bg-red-200'
                    : key === '⌫'
                    ? 'bg-warm-gray-100 text-warm-gray-600 hover:bg-warm-gray-200'
                    : 'bg-warm-gray-50 text-accent hover:bg-warm-gray-100 border border-warm-gray-200'
                } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'shadow-sm hover:shadow-md'}`}
              >
                {key === '⌫' ? <Delete className="h-6 w-6 mx-auto" /> : key}
              </button>
            ))}
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={pin.length < 4 || isLoading}
            className={`w-full h-14 rounded-xl font-semibold text-lg transition-all duration-200 touch-manipulation active:scale-95 ${
              pin.length >= 4 && !isLoading
                ? 'bg-primary text-white hover:bg-primary-dark shadow-lg hover:shadow-xl'
                : 'bg-warm-gray-200 text-warm-gray-500 cursor-not-allowed'
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Authenticating...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <Check className="h-5 w-5" />
                <span>Enter</span>
              </div>
            )}
          </button>
        </div>

        {/* Demo Credentials */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
          <p className="text-white/80 text-sm mb-2 font-medium">Demo Credentials:</p>
          <div className="space-y-1 text-xs text-white/70">
            <p><span className="font-mono bg-white/20 px-2 py-1 rounded">1234</span> - Sarah (Cashier)</p>
            <p><span className="font-mono bg-white/20 px-2 py-1 rounded">5678</span> - Mike (Manager)</p>
            <p><span className="font-mono bg-white/20 px-2 py-1 rounded">9999</span> - Hadi (Barista)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;