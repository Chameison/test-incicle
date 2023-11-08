import { FC, ReactNode, useState } from "react";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { Slot } from "@radix-ui/react-slot";
import { FolderDashed } from "@phosphor-icons/react";

interface ConfirmProps {
  asChild: boolean;
  children: ReactNode;
}

const DialogNew: FC<ConfirmProps> = ({
  asChild,
  ...props
}) => {
  const [open, setOpen] = useState(false);
  const Comp = asChild ? Slot : "button";


  return (
    <>
      <Comp onClick={() => setOpen(true)} {...props} />

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm">
        <DialogTitle className="flex items-center justify-between gap-4">
          <h2 className="text-center text-2xl font-medium">Crie um novo: </h2>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="bg-red-400 px-2 text-white rounded-sm"
          >
            x
          </button>
        </DialogTitle>

        <DialogContent className="w-full">
          
          <div className="flex justify-center gap-3 text-xl text-red-400">Em breve <FolderDashed size={32} weight="fill" /> </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DialogNew;
