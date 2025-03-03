import React, { useEffect } from 'react';

const TotalCostBreakdown = ({ materialsCost = 0, outsideLaborCost = 0, isCommercial, onMaxPriceCalculated }) => {
  // Fixed percentages
  const INSIDE_LABOR_PERCENTAGE = 0.09; // 9%
  const OVERHEAD_PERCENTAGE = 0.07; // 7%
  const SALES_PERCENTAGE = 0.07; // 7%
  
  // Profit percentages based on commercial/residential
  const MIN_PROFIT_PERCENTAGE = 0.10; // 10% for both commercial and residential
  const MAX_PROFIT_PERCENTAGE = 0.25; // 25% for both

  // Ensure we have numeric values
  const materials = Number(materialsCost) || 0;
  const outsideLabor = Number(outsideLaborCost) || 0;

  const calculateTotalPrice = (profitPercentage) => {
    // Formula: (MaterialCost + OutsideLabor) / (1 - InsideLabor% - Overhead% - Sales% - Profit%)
    const baseCosts = materials + outsideLabor;
    const denominator = 1 - INSIDE_LABOR_PERCENTAGE - OVERHEAD_PERCENTAGE - SALES_PERCENTAGE - profitPercentage;
    const estimatedSellingPrice = baseCosts / denominator;

    // Calculate individual components
    const insideLabor = estimatedSellingPrice * INSIDE_LABOR_PERCENTAGE;
    const overhead = estimatedSellingPrice * OVERHEAD_PERCENTAGE;
    const sales = estimatedSellingPrice * SALES_PERCENTAGE;
    const profit = estimatedSellingPrice * profitPercentage;

    return {
      estimatedSellingPrice,
      materialsCost: materials,
      outsideLaborCost: outsideLabor,
      insideLabor,
      overhead,
      sales,
      profit
    };
  };

  const minPricing = calculateTotalPrice(MIN_PROFIT_PERCENTAGE);
  const maxPricing = calculateTotalPrice(MAX_PROFIT_PERCENTAGE);

  // Send the max price back to the parent component
  useEffect(() => {
    if (onMaxPriceCalculated && maxPricing) {
      onMaxPriceCalculated(maxPricing.estimatedSellingPrice);
    }
  }, [maxPricing, onMaxPriceCalculated]);

  const formatPercentage = (value, total) => {
    if (!value || !total) return '0.00%';
    return ((value / total) * 100).toFixed(2) + '%';
  };

  const formatCurrency = (value) => {
    if (value === undefined || value === null) return '0.00';
    return Number(value).toFixed(2);
  };

  return (
    <div className="total-cost-breakdown">
      <h2>Total Cost Breakdown</h2>
      <table style={{ width: '100%', marginTop: '1rem', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: '0.5rem', borderBottom: '2px solid #E5E7EB' }}>Item</th>
            <th style={{ textAlign: 'right', padding: '0.5rem', borderBottom: '2px solid #E5E7EB' }}>Minimum ($)</th>
            <th style={{ textAlign: 'right', padding: '0.5rem', borderBottom: '2px solid #E5E7EB' }}>Min %</th>
            <th style={{ textAlign: 'right', padding: '0.5rem', borderBottom: '2px solid #E5E7EB' }}>Maximum ($)</th>
            <th style={{ textAlign: 'right', padding: '0.5rem', borderBottom: '2px solid #E5E7EB' }}>Max %</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: '0.5rem', borderBottom: '1px solid #E5E7EB' }}>Material Cost</td>
            <td style={{ textAlign: 'right', padding: '0.5rem', borderBottom: '1px solid #E5E7EB' }}>{formatCurrency(minPricing.materialsCost)}</td>
            <td style={{ textAlign: 'right', padding: '0.5rem', borderBottom: '1px solid #E5E7EB' }}>{formatPercentage(minPricing.materialsCost, minPricing.estimatedSellingPrice)}</td>
            <td style={{ textAlign: 'right', padding: '0.5rem', borderBottom: '1px solid #E5E7EB' }}>{formatCurrency(maxPricing.materialsCost)}</td>
            <td style={{ textAlign: 'right', padding: '0.5rem', borderBottom: '1px solid #E5E7EB' }}>{formatPercentage(maxPricing.materialsCost, maxPricing.estimatedSellingPrice)}</td>
          </tr>
          <tr>
            <td style={{ padding: '0.5rem', borderBottom: '1px solid #E5E7EB' }}>Outside Labor</td>
            <td style={{ textAlign: 'right', padding: '0.5rem', borderBottom: '1px solid #E5E7EB' }}>{formatCurrency(minPricing.outsideLaborCost)}</td>
            <td style={{ textAlign: 'right', padding: '0.5rem', borderBottom: '1px solid #E5E7EB' }}>{formatPercentage(minPricing.outsideLaborCost, minPricing.estimatedSellingPrice)}</td>
            <td style={{ textAlign: 'right', padding: '0.5rem', borderBottom: '1px solid #E5E7EB' }}>{formatCurrency(maxPricing.outsideLaborCost)}</td>
            <td style={{ textAlign: 'right', padding: '0.5rem', borderBottom: '1px solid #E5E7EB' }}>{formatPercentage(maxPricing.outsideLaborCost, maxPricing.estimatedSellingPrice)}</td>
          </tr>
          <tr>
            <td style={{ padding: '0.5rem', borderBottom: '1px solid #E5E7EB' }}>Inside Labor (9%)</td>
            <td style={{ textAlign: 'right', padding: '0.5rem', borderBottom: '1px solid #E5E7EB' }}>{formatCurrency(minPricing.insideLabor)}</td>
            <td style={{ textAlign: 'right', padding: '0.5rem', borderBottom: '1px solid #E5E7EB' }}>9.00%</td>
            <td style={{ textAlign: 'right', padding: '0.5rem', borderBottom: '1px solid #E5E7EB' }}>{formatCurrency(maxPricing.insideLabor)}</td>
            <td style={{ textAlign: 'right', padding: '0.5rem', borderBottom: '1px solid #E5E7EB' }}>9.00%</td>
          </tr>
          <tr>
            <td style={{ padding: '0.5rem', borderBottom: '1px solid #E5E7EB' }}>Overhead (7%)</td>
            <td style={{ textAlign: 'right', padding: '0.5rem', borderBottom: '1px solid #E5E7EB' }}>{formatCurrency(minPricing.overhead)}</td>
            <td style={{ textAlign: 'right', padding: '0.5rem', borderBottom: '1px solid #E5E7EB' }}>7.00%</td>
            <td style={{ textAlign: 'right', padding: '0.5rem', borderBottom: '1px solid #E5E7EB' }}>{formatCurrency(maxPricing.overhead)}</td>
            <td style={{ textAlign: 'right', padding: '0.5rem', borderBottom: '1px solid #E5E7EB' }}>7.00%</td>
          </tr>
          <tr>
            <td style={{ padding: '0.5rem', borderBottom: '1px solid #E5E7EB' }}>Sales (7%)</td>
            <td style={{ textAlign: 'right', padding: '0.5rem', borderBottom: '1px solid #E5E7EB' }}>{formatCurrency(minPricing.sales)}</td>
            <td style={{ textAlign: 'right', padding: '0.5rem', borderBottom: '1px solid #E5E7EB' }}>7.00%</td>
            <td style={{ textAlign: 'right', padding: '0.5rem', borderBottom: '1px solid #E5E7EB' }}>{formatCurrency(maxPricing.sales)}</td>
            <td style={{ textAlign: 'right', padding: '0.5rem', borderBottom: '1px solid #E5E7EB' }}>7.00%</td>
          </tr>
          <tr>
            <td style={{ padding: '0.5rem', borderBottom: '1px solid #E5E7EB' }}>Profit</td>
            <td style={{ textAlign: 'right', padding: '0.5rem', borderBottom: '1px solid #E5E7EB' }}>{formatCurrency(minPricing.profit)}</td>
            <td style={{ textAlign: 'right', padding: '0.5rem', borderBottom: '1px solid #E5E7EB' }}>{(MIN_PROFIT_PERCENTAGE * 100).toFixed(2)}%</td>
            <td style={{ textAlign: 'right', padding: '0.5rem', borderBottom: '1px solid #E5E7EB' }}>{formatCurrency(maxPricing.profit)}</td>
            <td style={{ textAlign: 'right', padding: '0.5rem', borderBottom: '1px solid #E5E7EB' }}>{(MAX_PROFIT_PERCENTAGE * 100).toFixed(2)}%</td>
          </tr>
          <tr>
            <td style={{ padding: '0.5rem', fontWeight: 'bold' }}>Total</td>
            <td style={{ textAlign: 'right', padding: '0.5rem', fontWeight: 'bold' }}>{formatCurrency(minPricing.estimatedSellingPrice)}</td>
            <td style={{ textAlign: 'right', padding: '0.5rem', fontWeight: 'bold' }}>100.00%</td>
            <td style={{ textAlign: 'right', padding: '0.5rem', fontWeight: 'bold' }}>{formatCurrency(maxPricing.estimatedSellingPrice)}</td>
            <td style={{ textAlign: 'right', padding: '0.5rem', fontWeight: 'bold' }}>100.00%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TotalCostBreakdown;
