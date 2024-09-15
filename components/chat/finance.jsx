import React from 'react';
import { DollarSign, CreditCard, Wallet } from 'lucide-react';

const EnhancedVisualFinancialWidget = () => {
  // Dummy data - replace with real data in a production environment
  const financialData = {
    expense: 2500,
    savings: 1500,
    withdrawal: 500
  };

  const maxValue = Math.max(...Object.values(financialData));

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  const FinancialItem = ({ icon, label, amount, color, max }) => {
    const percentage = (amount / max) * 100;
    
    return (
        <div>
            <div className="flex items-center bg-white rounded-lg shadow-sm p-4 w-full">
                <div className={`p-2 rounded-full ${color} text-white mr-3`}>
                {icon}
                </div>
                <div className="flex-grow">
                <p className="text-sm text-gray-500 font-medium">{label}</p>
                <p className="text-lg font-semibold text-gray-700">{formatCurrency(amount)}</p>
                <div className="mt-2 bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div 
                    className={`h-full ${color} w-[${percentage}%]`} 
                    // style={`width: ${percentage}% `}
                    ></div>
                </div>
                </div>
            </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Financial Summary</h2>
      <div className="flex flex-col space-y-4">
        <FinancialItem 
          icon={<CreditCard size={24} />}
          label="Expense"
          amount={financialData.expense}
          color="bg-red-500"
          max={maxValue}
        />
        <FinancialItem 
          icon={<Wallet size={24} />}
          label="Savings"
          amount={financialData.savings}
          color="bg-green-500"
          max={maxValue}
        />
        <FinancialItem 
          icon={<DollarSign size={24} />}
          label="Withdrawal"
          amount={financialData.withdrawal}
          color="bg-blue-500"
          max={maxValue}
        />
      </div>
    </div>
  );
};

export default EnhancedVisualFinancialWidget;