import React, { forwardRef, useImperativeHandle, useEffect } from 'react';

const OutsideLabor = forwardRef(({ 
  totalLinearLength, 
  heightOfFence,
  needsTearOut,
  tearOutFootage,
  needsLineClearing,
  lineClearingFootage,
  numberOfSingleGates,
  numberOfDoubleGates,
  slidingGatesWidth = 0,
  estimatedDays,
  onTotalChange
}, ref) => {
  // Calculate labor costs
  const calculateLaborCosts = () => {
    const costs = {};
    
    // Total footage calculation
    const footageUnitPrice = heightOfFence <= 5 ? 5 : 7;
    const footageSubtotal = totalLinearLength * footageUnitPrice;
    costs["Total Footage"] = {
      quantity: totalLinearLength,
      unitPrice: footageUnitPrice,
      subtotal: footageSubtotal
    };

    // Tear out calculation
    const tearOutUnitPrice = 2;
    const tearOutSubtotal = needsTearOut === "Yes" ? tearOutFootage * tearOutUnitPrice : 0;
    costs["Tear Out"] = {
      quantity: needsTearOut === "Yes" ? tearOutFootage : 0,
      unitPrice: tearOutUnitPrice,
      subtotal: tearOutSubtotal
    };

    // Line clearing calculation
    const lineClearingUnitPrice = 2;
    const lineClearingSubtotal = needsLineClearing === "Yes" ? lineClearingFootage * lineClearingUnitPrice : 0;
    costs["Line Clearing"] = {
      quantity: needsLineClearing === "Yes" ? lineClearingFootage : 0,
      unitPrice: lineClearingUnitPrice,
      subtotal: lineClearingSubtotal
    };

    // Single gates calculation
    const singleGateUnitPrice = 75;
    const singleGateSubtotal = numberOfSingleGates * singleGateUnitPrice;
    costs["Single Gates"] = {
      quantity: numberOfSingleGates,
      unitPrice: singleGateUnitPrice,
      subtotal: singleGateSubtotal
    };

    // Double gates calculation
    const doubleGateUnitPrice = 150;
    const doubleGateSubtotal = numberOfDoubleGates * doubleGateUnitPrice;
    costs["Double Gates"] = {
      quantity: numberOfDoubleGates,
      unitPrice: doubleGateUnitPrice,
      subtotal: doubleGateSubtotal
    };

    // Traveling cost calculation
    const travelingUnitPrice = 50;
    const travelingSubtotal = estimatedDays * travelingUnitPrice;
    costs["Traveling Cost"] = {
      quantity: estimatedDays,
      unitPrice: travelingUnitPrice,
      subtotal: travelingSubtotal
    };

    // Calculate total
    let total = 0;
    for (const key in costs) {
      total += costs[key].subtotal;
    }
    
    return { costs, total };
  };

  const { costs, total } = calculateLaborCosts();

  // Notify parent component when total changes
  useEffect(() => {
    if (onTotalChange) {
      onTotalChange(total);
    }
  }, [total, onTotalChange]);

  return (
    <div className="outside-labor">
      <h2>Outside Labor Costs</h2>
      <table style={{ width: '100%', marginTop: '1rem', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: '0.5rem', borderBottom: '2px solid #E5E7EB' }}>Item</th>
            <th style={{ textAlign: 'right', padding: '0.5rem', borderBottom: '2px solid #E5E7EB' }}>Quantity</th>
            <th style={{ textAlign: 'right', padding: '0.5rem', borderBottom: '2px solid #E5E7EB' }}>Unit Price ($)</th>
            <th style={{ textAlign: 'right', padding: '0.5rem', borderBottom: '2px solid #E5E7EB' }}>Subtotal ($)</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(costs).map(([item, { quantity, unitPrice, subtotal }]) => (
            <tr key={item}>
              <td style={{ padding: '0.5rem', borderBottom: '1px solid #E5E7EB' }}>{item}</td>
              <td style={{ textAlign: 'right', padding: '0.5rem', borderBottom: '1px solid #E5E7EB' }}>{quantity}</td>
              <td style={{ textAlign: 'right', padding: '0.5rem', borderBottom: '1px solid #E5E7EB' }}>{unitPrice.toFixed(2)}</td>
              <td style={{ textAlign: 'right', padding: '0.5rem', borderBottom: '1px solid #E5E7EB' }}>{subtotal.toFixed(2)}</td>
            </tr>
          ))}
          <tr>
            <td colSpan="3" style={{ textAlign: 'right', padding: '0.5rem', fontWeight: 'bold' }}>Total ($)</td>
            <td style={{ textAlign: 'right', padding: '0.5rem', fontWeight: 'bold' }}>{total.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
});

export default OutsideLabor;
