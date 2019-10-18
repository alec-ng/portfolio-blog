import React from "react";
import Headroom from 'react-headroom';

/**
 * dynamic show/hide header using react-headroom
 */
export default function ContentHeader(props) {
  
  return (
    <Headroom wrapperStyle={{ marginBottom: '20px' }}
              style={{
                background: 'rgb(57, 111, 176)',
                boxShadow: '1px 1px 1px rgba(0,0,0,0.25)',
              }}>
        <div style={{ padding: '20px' }}>
          <h1>My Header</h1>
        </div>
    </Headroom>
  );

}
