import { Popover } from "@mui/material";
import {
  DotsThreeCircle,
  GlobeHemisphereWest,
  ShareNetwork,
  Trash,
} from "@phosphor-icons/react";
import { useState } from "react";
import { toast } from "react-toastify";

interface CardBoard {
  board: any;
  boardIndex: number;
  handleDeleteBoard: () => void; // Adicione a prop handleDelete

}
const CardBoard = ({ board, boardIndex, handleDeleteBoard }: CardBoard) => {
  const [anchorEl, setAnchorEl] = useState<any>();

  const [open, setOpen] = useState(Boolean(anchorEl));

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };
  const handleCloseAndDelete = () => {
    handleClose(); // Fecha o Popover
    handleDeleteBoard(); // Executa a exclusão do item
  };
  const handleWarn = () => {
    toast.warn('AINDA INDISPONÍVEL')
  };
  return (
    <div key={boardIndex} className="bg-[#E9F1F5] px-2 pb-2">
      <div className="flex items-center  justify-between">
        <h2 className="text-[12px] sm:text-[10px] lg:text-[12px]">
          {board.title}
        </h2>
        <div className="flex items-center gap-0.5">
          <button className="bg-white rounded-full p-0.5" onClick={handleOpen}>
            <DotsThreeCircle weight="fill" className="text-[#707070]" />
          </button>

          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
          >
            <div className="px-2 py-2 flex gap-2">
              <button onClick={handleCloseAndDelete}>
                <Trash className="text-red-400" size={25} weight="fill" />
              </button>
              <button onClick={handleWarn}>
                <ShareNetwork
                  className="text-blue-400"
                  size={25}
                  weight="fill"
                />
              </button>
            </div>
          </Popover>
          <button onClick={handleWarn} className="bg-white rounded-full p-0.5">
            <GlobeHemisphereWest weight="fill" />
          </button>
        </div>
      </div>

      <div className="flex justify-between gap-1">
        {board.resume_files.map((file: any, fileIndex: number) => (
          <div key={fileIndex} className="max-w-[100px] 2xl:max-w-[70px]">
            <img
              className="  w-auto  h-auto"
              src={file.file}
              alt={`File ${fileIndex}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardBoard;
