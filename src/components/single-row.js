import React from 'react';
import styled from 'styled-components';

/**
 * Wraps content in bootstrap row/col divs with defaults that can be overwritten
 */
export default function SingleRow(props) {
  let rowClass = props.rowClass || 'row';
  let colClass = props.colClass || 'col';
  return (
    <div className={rowClass}>
      <div className={colClass}>
        {props.content}
      </div>
    </div>
  )
}