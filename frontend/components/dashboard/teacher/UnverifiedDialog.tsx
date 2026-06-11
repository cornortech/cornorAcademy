"use client"

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog"

interface UnverifiedDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function UnverifiedDialog({ open, onOpenChange }: UnverifiedDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Account Not Verified</AlertDialogTitle>
          <AlertDialogDescription className="text-base font-semibold text-foreground pt-2">
            CONTACT ADMINISTRATION TO VERIFY YOUR ACCOUNT CORNOR ACADEMY
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>OK</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
