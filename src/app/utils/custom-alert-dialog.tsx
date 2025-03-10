import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CSSProperties } from "react";

interface CustomAlertDialogProps {
  onContinueClick: () => void;
  triggerText: string;
  title: string;
  description: string;
  isTriggerDisabled?: boolean;
  customTriggerClassName?: string;
  triggerStyle?: CSSProperties;
}

export default function CustomAlertDialog({
  onContinueClick,
  triggerText,
  title,
  description,
  triggerStyle,
  isTriggerDisabled = false,
  customTriggerClassName,
}: CustomAlertDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger
        className={cn(
          customTriggerClassName ? customTriggerClassName : buttonVariants()
        )}
        disabled={isTriggerDisabled}
        style={triggerStyle}
      >
        {triggerText}
      </AlertDialogTrigger>
      <AlertDialogContent className="dark text-white">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onContinueClick}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
