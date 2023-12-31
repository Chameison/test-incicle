import { CaretDown, Plus } from "@phosphor-icons/react";
import Navbar from "./components/Navbar";
import "./globals.css";
import jsonData from "../json/management.json";
import data from "../json/data.json";
import { useState } from "react";
import { toast } from "react-toastify";
import { Switch } from "@mui/material";
import { FolderDashed } from "@phosphor-icons/react/dist/ssr";
import CardEvento from "./components/CardEvento";
import CardBoard from "./components/CardBoard";
import DialogNew from "./components/DialogNew";
import { DataBoard, DataEvent } from "./types/types";

type EventType = "publication" | "event" | "release";
type TiposSelecionados = {
  [key in EventType]: boolean;
};

function App() {
  const [dadosQuadros, setDadosQuadros] = useState<DataBoard>(jsonData);
  const [dadosEventos, setDadosEventos] = useState<DataEvent>(data);
  const [mostrarFiltro, setMostrarFiltro] = useState(false);

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
      [tipo]: !prev[tipo],
    }));
  };

  const handleDeleteItem = (id: number) => {
    const updatedData = dadosEventos.data.filter((item) => item.id !== id);
    setDadosEventos({ ...dadosEventos, data: updatedData });
    toast.success("Item apagado com sucesso!");
  };

  const handleDeleteBoard = (boardIndex: number, itemIndex: number) => {
    const updatedData = [...dadosQuadros.data];
    updatedData[itemIndex].boards.splice(boardIndex, 1);
    setDadosQuadros({ ...dadosQuadros, data: updatedData });
    toast.success("Quadro apagado com sucesso!");
  };
  const filtrarPorTipo = () => {
    return dadosEventos.data.filter(
      (item) => tiposSelecionados[item.type as EventType]
    );
  };
  console.log()
  return (
    <main className="w-full">
      <Navbar />
      <section className="text-[#707070] px-8 mb-10 gap-5 flex flex-col lg:px-16  md:flex-row mt-7 ">
        <div className="w-12/12 md:w-9/12 ">
          <div className="w-full flex flex-col sm:flex-row justify-between mb-2">
            <h2 className="text-2xl md:text-4xl font-light">Endomarketing</h2>
            <div className="flex gap-3 h-10 my-1">
              <button
                className="flex p-2 text-[14px] bg-[#ffffff] justify-between  items-center rounded-[4px] w-[95px] h-[38px] border-[#b4b4b4] border-[1px]"
                onClick={() => setMostrarFiltro(!mostrarFiltro)}
              >
                TIPO
                <CaretDown size={20} weight="fill" />
              </button>
              {mostrarFiltro && (
                <div className="z-10 flex flex-col absolute rounded-md bg-white shadow-2xl p-2">
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
              <DialogNew asChild>
                <button className="text-white flex p-2 text-[14px] bg-[#3489B1] justify-between  items-center rounded-[4px] w-[95px] h-[38px] border-[#3489B1] border-[1px]">
                  
                  CRIAR <Plus size={15} weight="bold" />
                </button>
              </DialogNew>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {filtrarPorTipo().length === 0 && (
              <div className="flex justify-center gap-2  bg-[#ffffff] shadow-lg h-auto  md:max-h-56 p-2">
                <div className="text-lg text-red-400 flex justify-center gap-2 my-10">
                  Sem dados <FolderDashed size={32} weight="fill" />
                </div>
              </div>
            )}

            {filtrarPorTipo().map((item) => (
              <CardEvento
                key={item.id}
                item={item}
                handleDeleteItem={() => handleDeleteItem(item.id)}
              />
            ))}
          </div>
        </div>
        <div className="w-full md:w-3/12 flex flex-col sm:flex-row md:flex-col gap-4">
          <div className="bg-[#FFF2DE] text-[#707070]  sm:w-1/2 md:w-full border-[#DCD1C0] border-2 px-4 pt-5 pb-2">
            <h2 className="text-lg font-bold mb-1">Endormarketing</h2>
            <p className="mb-2 text-[14px] font-light ">
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
            <div >
              {dadosQuadros.data.map((item, i) => (
                <div key={i} className="grid grid-cols-1 gap-2 2xl:gap-2">
                  {item.boards.length === 0 && (
                    <div className="text-lg text-red-400 flex justify-center gap-2 my-10">
                      Sem dados <FolderDashed size={32} weight="fill" />
                    </div>
                  )}
                  {item.boards.map((board, boardIndex) => (
                    <div key={boardIndex}>
                      <CardBoard
                        board={board}
                        boardIndex={boardIndex}
                        handleDeleteBoard={() =>
                          handleDeleteBoard(boardIndex, i)
                        }
                      />
                    </div>
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
