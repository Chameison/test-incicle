import { DotsThreeCircle, ShareNetwork, Trash } from "@phosphor-icons/react";
import DialogInviters from "./DialogInviters";
import { Popover } from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface CardEventoProps {
  item: any;
  handleDeleteItem: () => void; 
}
const CardEvento = ({ item, handleDeleteItem }: CardEventoProps) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [open, setOpen] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {

    setAnchorEl(null);

    setOpen(false);
  };

  const handleCloseAndDelete = () => {
    handleClose(); 
    handleDeleteItem(); 
  };

  const getBgClass = (type: string) => {
    switch (type) {
      case "publication":
        return "bg-[#707070]";
      case "event":
        return "bg-[#EE8686]";
      case "release":
        return "bg-[#3489B1]";
      default:
        return "";
    }
  };
  const handleWarn = () => {
    toast.warn('AINDA INDISPONÍVEL')
  };
  return (
    <div
      key={item?.id}
      className="flex items-center gap-2  bg-[#ffffff] shadow-lg h-auto  md:max-h-56 p-2"
    >
      <div>
        <img
          className="relative max-w-[75px] h-auto"
          src={item.file.url}
          alt=""
        />
      </div>
      <div className="flex justify-between px-2 w-full h-auto md:h-[75px]">
        <div className="flex flex-col ">
          <h2 className="text-[12px] md:text-[16px] text-[#707070] font-bold mb-[1px]">
            {item.title}
          </h2>
          <div className="flex items-center gap-2 mb-1 text-[6px] md:text-[8px] font-light uppercase ">
            <a
              href=""
              className={` text-white ${getBgClass(item.type)} rounded-sm px-1`}
            >
              {item.type}
            </a>
            <span>{item.info.place}</span>
            <span>|</span>
            <span>{item.info.date}</span>
            <span>|</span>
            <DialogInviters asChild data={item.invited_people}>
              <button className="text-blue-600 underline">
                {item.invited_people && item.invited_people.length > 0
                  ? `${item.invited_people.length} ${
                      item.invited_people.length === 1
                        ? "Confirmação"
                        : "Confirmações"
                    } de 15`
                  : "0 Confirmações"}
              </button>
            </DialogInviters>
          </div>
          <p className="text-[10px] md:text-[12px] font-thin ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat,
            maxime recusandae ducimus eius nihil eum sint
          </p>
        </div>

        <button className="text-[#DBDBDB]" onClick={handleClick}>
          <DotsThreeCircle size={32} weight="fill" className="text-[#707070]" />
        </button>
        <Popover  open={open} anchorEl={anchorEl} onClose={handleClose}>
          <div className="px-2 py-2 flex gap-2">
            <button onClick={handleCloseAndDelete}>
              <Trash className="text-red-400" size={25} weight="fill" />
            </button>

            <button onClick={handleWarn}>
              <ShareNetwork className="text-blue-400" size={25} weight="fill" />
            </button>
          </div>
        </Popover>
      </div>
    </div>
  );
};

export default CardEvento;
