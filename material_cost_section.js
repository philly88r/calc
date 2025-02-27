{/* Material Cost Section */}
<Accordion TransitionProps={{ unmountOnExit: true }} defaultExpanded>
  <AccordionSummary
    expandIcon={<ExpandMoreIcon />}
    aria-controls="material-cost-content"
    id="material-cost-header"
    sx={{
      backgroundColor: '#f8f8f8',
      '&.Mui-expanded': {
        backgroundColor: '#f0f0f0',
      }
    }}
  >
    <Typography variant="h6" sx={{ color: '#6d2f2c' }}>Material Cost</Typography>
  </AccordionSummary>
  <AccordionDetails>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: '0.5rem', borderBottom: '2px solid #E5E7EB' }}>Item</th>
            <th style={{ textAlign: 'right', padding: '0.5rem', borderBottom: '2px solid #E5E7EB' }}>Quantity</th>
            <th style={{ textAlign: 'right', padding: '0.5rem', borderBottom: '2px solid #E5E7EB' }}>Unit Cost</th>
            <th style={{ textAlign: 'right', padding: '0.5rem', borderBottom: '2px solid #E5E7EB' }}>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(costs).map(([item, details]) => (
            <tr key={item}>
              <td style={{ padding: '0.5rem', borderBottom: '1px solid #E5E7EB' }}>{item}</td>
              <td style={{ textAlign: 'right', padding: '0.5rem', borderBottom: '1px solid #E5E7EB' }}>
                {details.quantity}
              </td>
              <td style={{ textAlign: 'right', padding: '0.5rem', borderBottom: '1px solid #E5E7EB' }}>
                {details.unitCost ? `$${details.unitCost.toFixed(2)}` : 
                 details.meshCost ? `$${details.meshCost.toFixed(2)}` :
                 details.fenceTiesCost ? `$${details.fenceTiesCost.toFixed(2)}` :
                 details.hogRingsCost ? `$${details.hogRingsCost.toFixed(2)}` :
                 details.domeCapsCost ? `$${details.domeCapsCost.toFixed(2)}` :
                 details.wedgeAnchorsCost ? `$${details.wedgeAnchorsCost.toFixed(2)}` :
                 details.eyeTopsCost ? `$${details.eyeTopsCost.toFixed(2)}` :
                 details.trussRodsCost ? `$${details.trussRodsCost.toFixed(2)}` :
                 details.tearOutCost ? `$${details.tearOutCost.toFixed(2)}` :
                 details.lineClearingCost ? `$${details.lineClearingCost.toFixed(2)}` :
                 details.estimatedDaysCost ? `$${details.estimatedDaysCost.toFixed(2)}` : '-'}
              </td>
              <td style={{ textAlign: 'right', padding: '0.5rem', borderBottom: '1px solid #E5E7EB' }}>
                ${details.subtotal.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3" style={{ textAlign: 'right', padding: '0.5rem', fontWeight: 'bold' }}>Total Material Cost:</td>
            <td style={{ textAlign: 'right', padding: '0.5rem', fontWeight: 'bold' }}>
              ${Object.values(costs).reduce((total, item) => total + item.subtotal, 0).toFixed(2)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </AccordionDetails>
</Accordion>

{/* Total Cost Breakdown Section */}
<Accordion TransitionProps={{ unmountOnExit: true }} defaultExpanded>
  <AccordionSummary
    expandIcon={<ExpandMoreIcon />}
    aria-controls="total-cost-breakdown-content"
    id="total-cost-breakdown-header"
    sx={{
      backgroundColor: '#f8f8f8',
      '&.Mui-expanded': {
        backgroundColor: '#f0f0f0',
      }
    }}
  >
    <Typography variant="h6" sx={{ color: '#6d2f2c' }}>Total Cost Breakdown</Typography>
  </AccordionSummary>
  <AccordionDetails>
    <TotalCostBreakdown 
      materialsCost={Object.values(costs).reduce((total, item) => total + item.subtotal, 0)} 
      outsideLaborCost={outsideLaborTotal}
      isCommercial={commercialOrResidential === "Commercial"}
    />
  </AccordionDetails>
</Accordion>
