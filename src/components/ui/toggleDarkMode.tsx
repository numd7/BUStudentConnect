import * as React from 'react';
import * as TogglePrimitive from '@radix-ui/react-toggle';
import { cva, VariantProps } from 'class-variance-authority';

// Helper function for classnames
const cn = (...classes: string[]) => classes.filter(Boolean).join(' ');

const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors hover:bg-slate-100 hover:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-400 dark:focus-visible:ring-slate-300 dark:data-state-on:bg-slate-800 dark:data-state-on:text-slate-50",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border border-slate-200 bg-transparent hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:hover:bg-slate-800 dark:hover:text-slate-50",
      },
      size: {
        default: "h-10 px-3",
        sm: "h-9 px-2.5",
        lg: "h-11 px-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface ToggleProps
  extends React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root>,
    VariantProps<typeof toggleVariants> {
  // No need for onContent and offContent anymore since we are directly toggling dark mode
}

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,  
  ToggleProps
>(
  ({ className, variant, size, ...props }, ref) => {
  // Function to toggle the dark mode
  const toggleDarkMode = () => {
    // Simplify the previous approach by directly toggling and using a coherent approach
    const currentTheme = localStorage.getItem('color-theme');
    if (currentTheme === 'dark') {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('color-theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('color-theme', 'dark');
    }
  };

  return (
    <TogglePrimitive.Root
      ref={ref}
      className={cn(toggleVariants({ variant, size }), className || '')}
      onPressedChange={toggleDarkMode}
      {...props}
    >
      {/* You can conditionally render the icon or text based on the current theme */}
      {/*document.documentElement.classList.contains('dark') ? '🌞' : '🌙'*/}
    </TogglePrimitive.Root>
  );
});

Toggle.displayName = 'Toggle';

export { Toggle, toggleVariants };