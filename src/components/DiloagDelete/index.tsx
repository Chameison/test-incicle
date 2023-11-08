import { FC, ReactNode, useState } from "react";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { Slot } from "@radix-ui/react-slot";

interface ConfirmProps {
  asChild: boolean;
  children: ReactNode;
  handleDelete: () => void; // Adicione a prop handleDelete
}

const DialogDelete: FC<ConfirmProps> = ({
  asChild,
  handleDelete,
  ...props
}) => {
  const [open, setOpen] = useState(false);
  const Comp = asChild ? Slot : "button";

  const handleDeleteClick = () => {
    handleDelete(); // Chama a função handleDelete passada como prop
    setOpen(false); // Fecha o diálogo após a exclusão
  };

  return (
    <>
      <Comp onClick={() => setOpen(true)} {...props} />

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm">
        <DialogTitle className="flex items-center justify-between gap-4">
          <h2 className="text-center text-2xl font-medium">Deseja excluir?</h2>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="bg-red-400 px-2 text-white rounded-sm"
          >
            x
          </button>
        </DialogTitle>

        <DialogContent className="w-full">
          <div className="flex h-full w-full flex-col items-center justify-center gap-3">
            <p>O evento será deletado!</p>

            <button
              onClick={handleDeleteClick} // Chame a função handleDeleteClick ao clicar em "Excluir"
              className="flex w-2/4 items-center bg-red-400 justify-center text-white"
            >
              Excluir
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DialogDelete;
