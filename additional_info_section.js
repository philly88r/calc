{/* Additional Information Section */}
<Accordion TransitionProps={{ unmountOnExit: true }} defaultExpanded>
  <AccordionSummary
    expandIcon={<ExpandMoreIcon />}
    aria-controls="additional-info-content"
    id="additional-info-header"
    sx={{
      backgroundColor: '#f8f8f8',
      '&.Mui-expanded': {
        backgroundColor: '#f0f0f0',
      }
    }}
  >
    <Typography variant="h6" sx={{ color: '#6d2f2c' }}>Additional Information</Typography>
  </AccordionSummary>
  <AccordionDetails>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
          Width of holes
        </label>
        <input
          type="number"
          min="0"
          value={widthOfHoles || ''}
          onChange={(e) => setWidthOfHoles(parseInt(e.target.value) || 0)}
          style={{
            border: '1px solid #d1d5db',
            borderRadius: '0.375rem',
            padding: '0.5rem',
            width: '100%'
          }}
        />
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
          Type of concrete
        </label>
        <select
          value={typeOfConcrete || ''}
          onChange={(e) => setTypeOfConcrete(e.target.value)}
          style={{
            border: '1px solid #d1d5db',
            borderRadius: '0.375rem',
            padding: '0.5rem',
            width: '100%'
          }}
        >
          <option value="">Select...</option>
          <option value="Regular">Regular</option>
          <option value="Fast Setting">Fast Setting</option>
        </select>
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
          Spacing of posts
        </label>
        <input
          type="number"
          min="0"
          value={postSpacing}
          onChange={(e) => setPostSpacing(parseInt(e.target.value) || 0)}
          style={{
            border: '1px solid #d1d5db',
            borderRadius: '0.375rem',
            padding: '0.5rem',
            width: '100%'
          }}
        />
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
          Have extra rail?
        </label>
        <select
          value={extraRail}
          onChange={(e) => setExtraRail(e.target.value)}
          style={{
            border: '1px solid #d1d5db',
            borderRadius: '0.375rem',
            padding: '0.5rem',
            width: '100%'
          }}
        >
          <option value="none">None</option>
          <option value="top">Top</option>
          <option value="middle">Middle</option>
          <option value="bottom">Bottom</option>
          <option value="both">Both Top and Bottom</option>
        </select>
      </div>

      <div>
        <FormControlLabel
          control={
            <Checkbox
              checked={hasHBrace}
              onChange={(e) => setHasHBrace(e.target.checked)}
            />
          }
          label="With H braces?"
        />
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
          With truss rods?
        </label>
        <select
          value={hasTrussRods}
          onChange={(e) => setHasTrussRods(e.target.value)}
          style={{
            border: '1px solid #d1d5db',
            borderRadius: '0.375rem',
            padding: '0.5rem',
            width: '100%'
          }}
        >
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
          3 strand barbed wire?
        </label>
        <select
          value={threeStrandBarbedWire}
          onChange={(e) => setThreeStrandBarbedWire(e.target.value)}
          style={{
            border: '1px solid #d1d5db',
            borderRadius: '0.375rem',
            padding: '0.5rem',
            width: '100%'
          }}
        >
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
          Fence slats?
        </label>
        <select
          value={hasFenceSlats}
          onChange={(e) => setHasFenceSlats(e.target.value)}
          style={{
            border: '1px solid #d1d5db',
            borderRadius: '0.375rem',
            padding: '0.5rem',
            width: '100%'
          }}
        >
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </div>
    </div>
  </AccordionDetails>
</Accordion>
