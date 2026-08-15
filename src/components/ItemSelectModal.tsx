import { useState } from 'react';
import type { Item } from './ItemsTableDetails'

interface ItemSelectModalProps {
  onClose: () => void;
  onSelectItems: (items: Item[]) => void;
  itemListToSearch: Item[];
  className?: string;
}

export function ItemSelectModal({ onClose, itemListToSearch, onSelectItems, className }: ItemSelectModalProps) {
  const [choosedItems, setChoosedItems] = useState<Item[]>([])
  const [itemDescription, setItemDescription] = useState<string>("")

  const handleChooseItem = (itemID: string) => {
    setChoosedItems(prev => {
      if (prev.some(i => i.id === itemID)) {
        return prev.filter(i => i.id !== itemID)
      }
      else {
        return [...prev, { ...itemListToSearch.find(i => i.id === itemID)! }]
      }
    })
  }

  const handleAddButton = () => {
    if (!choosedItems.length) return;

    onSelectItems(choosedItems)
    setChoosedItems([])
    setItemDescription("")
    onClose()
  }

  return (
    <div onClick={() => onClose()} className={`${className} flex justify-center backdrop-blur-sm items-center fixed bg-zinc-900/50 min-h-screen`}>

      <div onClick={e => e.stopPropagation()} className={"md:w-1/2 p-4 flex flex-col gap-4 bg-zinc-600 rounded-md"}>
        <input onChange={e => setItemDescription(e.target.value)} value={itemDescription} type="text" placeholder="Pesquise o item..." className="w-full bg-zinc-800/70 border border-zinc-700 rounded-lg px-3 py-2.5 outline-none focus:border-blue-600 transition-all placeholder:text-zinc-400" />

        <div className="flex justify-between text-zinc-200 text-[10px] mt-6 font-black uppercase tracking-widest border-b border-zinc-800 p-2">
          <span>Descrição</span>
          <span>Valor</span>
        </div>

        <div className="flex flex-col gap-2 max-h-64 overflow-y-auto pr-1 custom-scrollbar">
          {
            itemListToSearch.filter(i => i.name.toLowerCase().includes(itemDescription.toLowerCase())).slice(0, 5)
              .map((item) => (
                <div key={item.id} className="flex bg-zinc-950/50 p-3 gap-2 rounded-lg border border-zinc-800/50 items-center justify-center">
                  <input
                    type="checkbox"
                    checked={choosedItems.some(i => i.id === item.id)}
                    onChange={() => handleChooseItem(item.id)}
                    className="cursor-pointer h-5 w-5 rounded border-gray-300 text-blue-500 focus:ring-blue-600"
                  />

                  <div onClick={() => handleChooseItem(item.id)} className="cursor-pointer flex w-full tracking-tighter font-bold text-sm text-gray-300">
                    <span className="flex-1 uppercase">{item.name}</span>
                    <span className="flex-1 text-right">{item.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
                  </div>
                </div>
              ))
          }
        </div>

        <button
          onClick={() => handleAddButton()}
          className='font-bold text-xs tracking-widest uppercase p-3 rounded-lg bg-blue-700 hover:bg-blue-800 cursor-pointer'>
          Adicionar
        </button>
      </div>

    </div>
  )
}
