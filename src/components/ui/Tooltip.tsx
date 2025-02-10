import { ReactNode, useState } from 'react';

export interface TooltipProps {
  content: string;
  children: ReactNode;
  position?: 'top' | 'right' | 'bottom' | 'left';
  delay?: number;
  maxWidth?: string;
}

export const Tooltip = ({
  content,
  children,
  position = 'top',
  delay = 200,
  maxWidth = '200px',
}: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();

  const handleMouseEnter = () => {
    const id = setTimeout(() => setIsVisible(true), delay);
    setTimeoutId(id);
  };

  const handleMouseLeave = () => {
    if (timeoutId) clearTimeout(timeoutId);
    setIsVisible(false);
  };

  const positionStyles = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  };

  const arrowPositions = {
    top: 'bottom-[-4px] left-1/2 -translate-x-1/2 border-t-gray-800',
    right: 'left-[-4px] top-1/2 -translate-y-1/2 border-r-gray-800',
    bottom: 'top-[-4px] left-1/2 -translate-x-1/2 border-b-gray-800',
    left: 'right-[-4px] top-1/2 -translate-y-1/2 border-l-gray-800',
  };

  const arrowBorderStyles = {
    top: 'border-t-[4px] border-x-[4px] border-x-transparent',
    right: 'border-r-[4px] border-y-[4px] border-y-transparent',
    bottom: 'border-b-[4px] border-x-[4px] border-x-transparent',
    left: 'border-l-[4px] border-y-[4px] border-y-transparent',
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {isVisible && (
        <div
          role="tooltip"
          className={`
            absolute z-50 ${positionStyles[position]}
            whitespace-normal break-words rounded bg-gray-800 px-2 py-1
            text-sm text-white
          `}
          style={{ maxWidth }}
        >
          {content}
          <span
            className={`
              absolute h-0 w-0
              ${arrowPositions[position]}
              ${arrowBorderStyles[position]}
            `}
          />
        </div>
      )}
    </div>
  );
};

export default Tooltip;
