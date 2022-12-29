import React from 'react';
export type DropdownData = Array<{ id: number | string; name: string }>;

export function itemAction(e: React.KeyboardEvent<HTMLDivElement>) {
  const target = e.currentTarget as HTMLElement;
  if (target !== null) {
    if (e.key === 'ArrowDown' && target.nextSibling !== null) {
      (target.nextSibling as HTMLDivElement)?.focus();
    } else if (e.key === 'ArrowUp' && target.previousSibling !== null) {
      const prevEl = target.previousSibling;
      (prevEl as HTMLElement).focus();
      setTimeout(() => {
        if (prevEl instanceof HTMLInputElement) {
          const end = prevEl.value.length;
          prevEl.setSelectionRange(end, end);
        }
      }, 1);
    } else if (e.key === 'Enter') {
      target.click();
    }
  }
}

export function inputKeyDownAction(
  e: React.KeyboardEvent<HTMLInputElement>,
  filteredData: DropdownData
) {
  if (e.key === 'ArrowDown' && filteredData.length > 0) {
    (e.currentTarget.nextSibling as HTMLDivElement)?.focus();
  }
}
