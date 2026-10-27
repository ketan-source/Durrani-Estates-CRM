import * as React from 'react';
import { ChevronDownIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

function NativeSelect({ className, style, ...props }) {
  return (
    <div className={cn('group/native-select relative w-full has-[select:disabled]:opacity-50', className)} style={style} data-slot="native-select-wrapper">
      <select
        data-slot="native-select"
        className="border-input placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground h-9 w-full min-w-0 appearance-none rounded-md border bg-background px-3 py-1 pr-9 text-sm shadow-xs transition-[color,box-shadow] outline-none cursor-pointer disabled:pointer-events-none disabled:cursor-not-allowed focus-visible:border-ring focus-visible:ring-ring/40 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 aria-invalid:border-destructive"
        {...props}
      />
      <ChevronDownIcon className="text-muted-foreground pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 opacity-60 select-none" aria-hidden="true" />
    </div>
  );
}
export { NativeSelect };
