        {/* Post Options Section */}
        <Accordion TransitionProps={{ unmountOnExit: true }}>
          <AccordionSummary 
            expandIcon={<ExpandMoreIcon />}
            aria-controls="post-options-content"
            id="post-options-header"
            sx={{
              backgroundColor: '#f8f8f8',
              '&.Mui-expanded': {
                backgroundColor: '#f0f0f0',
              }
            }}
          >
            <Typography variant="h6" sx={{ color: '#6d2f2c' }}>Post Options</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
                  Number of end/terminal posts
                </label>
                <input
                  type="number"
                  value={numberOfEndTerminals}
                  onChange={(e) => setNumberOfEndTerminals(e.target.value)}
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
                  Number of Corners
                </label>
                <input
                  type="number"
                  value={numberOfCorners}
                  onChange={(e) => setNumberOfCorners(e.target.value)}
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
                  Number of Solitary Hinge/Latch Posts
                </label>
                <input
                  type="number"
                  min="0"
                  value={numberOfSolitaryPosts}
                  onChange={(e) => setNumberOfSolitaryPosts(parseInt(e.target.value) || 0)}
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
                  Number of Flanged Posts Centered
                </label>
                <input
                  type="number"
                  min="0"
                  value={numberOfFlangedPosts}
                  onChange={(e) => setNumberOfFlangedPosts(parseInt(e.target.value) || 0)}
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
                  Number of Flanged Posts Off Centered
                </label>
                <input
                  type="number"
                  min="0"
                  value={numberOfFlangedPostsOffCentered}
                  onChange={(e) => setNumberOfFlangedPostsOffCentered(parseInt(e.target.value) || 0)}
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
                  Diameter of terminal/corner posts
                </label>
                <select
                  value={terminalCornerPostDiameter}
                  onChange={(e) => setTerminalCornerPostDiameter(e.target.value)}
                  style={{
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    padding: '0.5rem',
                    width: '100%'
                  }}
                >
                  <option value="2 3/8">2 3/8"</option>
                  <option value="2 7/8">2 7/8"</option>
                  <option value="4">4"</option>
                </select>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
