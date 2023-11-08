import { FC, ReactNode, useState } from "react";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { Slot } from "@radix-ui/react-slot";
import photono from "../../assets/no-photo.png";
interface dados {
  avatar: string;
  confirmed_presence: boolean;
  id: number;
  name: string;
  username: string;
}
interface ConfirmProps {
  asChild: boolean;
  children: ReactNode;
  data?: dados[];
}

const DialogInviters: FC<ConfirmProps> = ({ asChild, data, ...props }) => {
  const [open, setOpen] = useState(false);
  const Comp = asChild ? Slot : "button";
  return (
    <>
      <Comp onClick={() => setOpen(true)} {...props} />

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm">
        <DialogTitle className="flex items-center justify-between gap-4">
          <h2 className="text-center text-xl font-medium">
            Visualize os convidados
          </h2>

          <button
            type="button"
            onClick={() => setOpen(false)}
            className="bg-red-400 px-2 text-white rounded-sm"
          >
            x
          </button>
        </DialogTitle>

        <DialogContent className="w-full">
          <div className="flex h-full w-full  justify-center gap-3">
            {data?.map((item, i) => (
              <div key={i} className="w-full border-2  bg-gray-300 flex flex-col justify-between items-center p-2 rounded-sm">
                <div>
                  <img
                    src={item.avatar ? item.avatar : photono}
                    alt="Avatar image people"
                    className="w-20 rounded-full"
                  />
                </div>
                <div className="flex flex-col mt-2 gap-2 text-sm">
                  <span className="bg-gray-200 shadow-md p-2 rounded-md font-light "> <span className="font-semibold">Nome:</span> {item.name}</span>
                  <span className="bg-gray-200 shadow-md p-2 rounded-md"> <span className="font-semibold">Usuário:</span> {item.username}</span>
                  <a className={`text-center font-semibold text-white p-2 shadow-md rounded-md ${item.confirmed_presence ? 'bg-emerald-500': 'bg-rose-400'}`}>
                    {item.confirmed_presence ? "Confirmado" : "Pendente"}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DialogInviters;
