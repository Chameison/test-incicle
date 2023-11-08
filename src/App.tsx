import {
  CaretDown,
  DotsThreeCircle,
  GlobeHemisphereWest,
  Plus,
  ShareNetwork,
  Trash,
} from "@phosphor-icons/react";
import Navbar from "./components/Navbar";
import "./globals.css";
import jsonData from "../json/management.json";
import data from "../json/data.json";
import DialogDelete from "./components/DiloagDelete";
import { useState } from "react";
import DialogInviters from "./components/DialogInviters";
import { toast } from "react-toastify";
import DialogDeleteKanban from "./components/DialogDeleteKanban";
import { Popover, Switch } from "@mui/material";
import React from "react";
import { FolderDashed } from "@phosphor-icons/react/dist/ssr";

type EventType = "publication" | "event" | "release";
type TiposSelecionados = {
  [key in EventType]: boolean;
};

function App() {
  const [dados, setDados] = useState(jsonData);
  const [dadosEventos, setDadosEventos] = useState(data);
  const [mostrarFiltro, setMostrarFiltro] = useState(false);

  const [anchorEl, setAnchorEl] = useState<any>();

  const [open, setOpen] = useState(Boolean(anchorEl));
  const [open2, setOpen2] = useState(Boolean(anchorEl));

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };
  const handleOpen2 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen2(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
    setOpen2(false);
  };

  const id = open ? "simple-popover" : undefined;

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
  const [tiposSelecionados, setTiposSelecionados] = useState<TiposSelecionados>(
    {
      publication: true,
      event: true,
      release: true,
    }
  );
  const toggleTipoSelecionado = (tipo: EventType) => {
    setTiposSelecionados((prev) => ({
      ...prev,
      [tipo]: !prev[tipo as keyof typeof prev],
    }));
  };

  const filtrarPorTipo = () => {
    return dadosEventos.data.filter(
      (item) => tiposSelecionados[item.type as EventType]
    );
  };
  const handleDeleteItem = (id: any) => {
    const updatedData = dadosEventos.data.filter((item) => item.id !== id);
    setDadosEventos({ ...dadosEventos, data: updatedData });
    toast.success("Item apagado com sucesso!");
    setOpen(false);
  };

  const handleDeleteBoard = (boardIndex: any, itemIndex: any) => {
    const updatedData = [...dados.data];
    updatedData[itemIndex].boards.splice(boardIndex, 1);
    setDados({ ...dados, data: updatedData });
    toast.success("Quadro apagado com sucesso!");
  };

  return (
    <main className="w-full">
      <Navbar />
      <section className="px-8 lg:px-16 gap-5 w-full flex flex-col  md:flex-row justify-between mt-7 min-h-[760px] ">
        <div className="w-12/12 md:w-9/12 ">
          <div className="w-full flex flex-col sm:flex-row justify-between mb-2">
            <h2 className="text-2xl md:text-4xl  font-light">Endormarketing</h2>
            <div className="flex gap-3 h-10 my-1">
              <button className="flex p-4 bg-[#ffffff] justify-center gap-2 items-center rounded-lg w-[115px] h-[38px] border-stone-500 border-[1px]">
                TIPO
                <CaretDown
                  size={20}
                  weight="fill"
                  onClick={() => setMostrarFiltro(!mostrarFiltro)}
                />
              </button>
              {mostrarFiltro && (
                <div className="z-10 flex flex-col absolute rounded-md bg-gray-300 p-2">
                  {Object.keys(tiposSelecionados).map((tipo) => (
                    <label key={tipo} className="flex ">
                      <Switch
                        checked={tiposSelecionados[tipo as EventType]}
                        onChange={() =>
                          toggleTipoSelecionado(tipo as EventType)
                        }
                      />

                      {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                    </label>
                  ))}
                  <button
                    className="bg-red-400 text-white font-semibold px-1 rounded-sm text-center"
                    onClick={() => setMostrarFiltro(false)}
                  >
                    Fechar
                  </button>
                </div>
              )}
              <button className="flex p-4 text-white bg-[#3489B1] justify-center gap-2 items-center rounded-lg w-[115px] h-[38px] border-[#3489B1] border-[1px]">
                CRIAR <Plus size={20} weight="bold" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {filtrarPorTipo().length === 0 && (
              <div
                className="flex justify-center gap-2  bg-[#ffffff] shadow-lg h-auto  md:max-h-56 p-2"
              >
                <div className="text-lg text-red-400 flex justify-center gap-2 my-10">
                  Sem dados <FolderDashed size={32} weight="fill" />
                </div>
              </div>
            )}

            {filtrarPorTipo().map((item) => (
              <>
                {/* <CardEvento
                  item={item}
                  handleDeleteItem={() => handleDeleteItem(item.id)}
                /> */}
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
                          className={` text-white ${getBgClass(
                            item.type
                          )} rounded-sm px-1`}
                        >
                          {item.type}
                        </a>
                        <span>{item.info.place}</span>
                        <span>|</span>
                        <span>{item.info.date}</span>
                        <span>|</span>
                        <DialogInviters asChild data={item.invited_people}>
                          <button className="text-blue-600 underline">
                            {item.invited_people &&
                            item.invited_people.length > 0
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
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Fugiat, maxime recusandae ducimus eius nihil eum sint
                      </p>
                    </div>

                    <button className="text-[#DBDBDB]" onClick={handleOpen}>
                      <DotsThreeCircle
                        size={32}
                        weight="fill"
                        className="text-[#707070]"
                      />
                    </button>
                    <Popover
                      id={id}
                      open={open}
                      anchorEl={anchorEl}
                      onClose={handleClose}
                    >
                      <div className="px-2 py-2 flex gap-2">
                        <DialogDelete
                          asChild
                          handleDelete={() => handleDeleteItem(item.id)}
                        >
                          <button>
                            <Trash
                              className="text-red-400"
                              size={25}
                              weight="fill"
                            />
                          </button>
                        </DialogDelete>
                        <button>
                          <ShareNetwork
                            className="text-blue-400"
                            size={25}
                            weight="fill"
                          />
                        </button>
                      </div>
                    </Popover>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
        <div className="w-full md:w-3/12 flex flex-col sm:flex-row md:flex-col gap-4">
          <div className="bg-[#FFF2DE]  sm:w-1/2 md:w-full border-[#DCD1C0] border-2 px-4 pt-5 pb-2">
            <h2 className="text-lg font-bold mb-1">Endormarketing</h2>
            <p className="mb-2 text-[13px] font-light">
              Endomarketing está relacionado às ações de treinamento ou
              qualificação dos colaboradores da empresa visando um melhor
              serviço para o cliente. Marketing interno, devido ao nome, é
              usualmente confundido com Endomarketing mesmo sendo conceitos
              diferentes.
            </p>
            <button className="border-[#707070] uppercase text-[#707070] font-bold text-md mt-5 border-2 px-7 py-2 mb-4 rounded-md">
              Dispensar
            </button>
          </div>
          <div className="bg-[#ffffff]  sm:w-1/2 md:w-full rounded-md border-[#ffffff] 2xl:min-h-[350px] shadow-md border-2 px-2 pb-2 ">
            <h2 className="text-sm my-1 font-bold  text-gray-600">
              Quadros de Gestão à Vista
            </h2>
            <div className="">
              {dados.data.map((item, i) => (
                <div key={i} className="grid grid-cols-1 gap-3 2xl:gap-2">
                  {item.boards.length === 0 && (
                    <div className="text-lg text-red-400 flex justify-center gap-2 my-10">
                      Sem dados <FolderDashed size={32} weight="fill" />
                    </div>
                  )}
                  {item.boards.map((board, boardIndex) => (
                    <>
                      <div key={boardIndex} className="bg-[#E9F1F5] px-2 pb-2">
                        <div className="flex items-center  justify-between">
                          <h2 className="text-[12px] sm:text-[10px] lg:text-[12px]">
                            {board.title}
                          </h2>
                          <div className="flex items-center gap-0.5">
                            <button
                              className="bg-white rounded-full p-0.5"
                              onClick={handleOpen2}
                            >
                              <DotsThreeCircle
                                weight="fill"
                                className="text-[#707070]"
                              />
                            </button>

                            <Popover
                              id={id}
                              open={open2}
                              anchorEl={anchorEl}
                              onClose={handleClose}
                            >
                              <div className="px-2 py-2 flex gap-2">
                                <DialogDeleteKanban
                                  asChild
                                  handleDelete={() =>
                                    handleDeleteBoard(boardIndex, i)
                                  }
                                >
                                  <button>
                                    <Trash
                                      className="text-red-400"
                                      size={25}
                                      weight="fill"
                                    />
                                  </button>
                                </DialogDeleteKanban>
                                <button>
                                  <ShareNetwork
                                    className="text-blue-400"
                                    size={25}
                                    weight="fill"
                                  />
                                </button>
                              </div>
                            </Popover>
                            <button className="bg-white rounded-full p-0.5">
                              <GlobeHemisphereWest weight="fill" />
                            </button>
                          </div>
                        </div>

                        <div className="flex justify-between gap-1">
                          {board.resume_files.map((file, fileIndex) => (
                            <div
                              key={fileIndex}
                              className="max-w-[100px] 2xl:max-w-[70px]"
                            >
                              <img
                                className="  w-auto  h-auto"
                                src={file.file}
                                alt={`File ${fileIndex}`}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
