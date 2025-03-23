
import { Fragment, useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface TransitionProps {
  show: boolean;
  enter?: string;
  enterFrom?: string;
  enterTo?: string;
  leave?: string;
  leaveFrom?: string;
  leaveTo?: string;
  className?: string;
  children?: React.ReactNode;
  appear?: boolean;
  unmount?: boolean;
  onClick?: () => void;
}

export const Transition = ({
  show = false,
  enter = '',
  enterFrom = '',
  enterTo = '',
  leave = '',
  leaveFrom = '',
  leaveTo = '',
  className,
  children,
  appear = false,
  unmount = true,
  onClick,
  ...props
}: TransitionProps) => {
  const [state, setState] = useState(show ? 'entered' : 'exited');
  const initialRender = useRef(true);
  const enterClasses = enter.split(' ');
  const enterFromClasses = enterFrom.split(' ');
  const enterToClasses = enterTo.split(' ');
  const leaveClasses = leave.split(' ');
  const leaveFromClasses = leaveFrom.split(' ');
  const leaveToClasses = leaveTo.split(' ');

  useEffect(() => {
    const skipInitialTransition = initialRender.current && !appear;
    
    if (skipInitialTransition) {
      initialRender.current = false;
      return;
    }

    let mounted = true;
    
    if (show) {
      setState('entering');
    } else {
      setState('exiting');
    }

    return () => {
      mounted = false;
    };
  }, [show, appear]);

  useEffect(() => {
    if (state === 'entering') {
      const enterTimeout = requestAnimationFrame(() => {
        setState('entered');
      });
      return () => cancelAnimationFrame(enterTimeout);
    } else if (state === 'exiting') {
      const leaveTimeout = requestAnimationFrame(() => {
        const leaveTransitionTime = getTransitionDurationFromElement(document.querySelector('[data-transition]'));
        setTimeout(() => {
          setState('exited');
        }, leaveTransitionTime);
      });
      return () => cancelAnimationFrame(leaveTimeout);
    }
  }, [state]);

  const getTransitionDurationFromElement = (element: Element | null): number => {
    if (!element) return 300;
    // Get transition duration from element
    const { transitionDuration } = getComputedStyle(element);
    const floatTransitionDuration = parseFloat(transitionDuration);
    return floatTransitionDuration * 1000 || 300; // Default to 300ms
  };

  if (unmount && state === 'exited' && !show) {
    return null;
  }

  const transitionClassNames = {
    entering: [...enterClasses, ...enterFromClasses],
    entered: [...enterClasses, ...enterToClasses],
    exiting: [...leaveClasses, ...leaveFromClasses],
    exited: [...leaveClasses, ...leaveToClasses],
  }[state];

  return (
    <div
      data-transition
      className={cn(className, ...transitionClassNames)}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

export default Transition;
