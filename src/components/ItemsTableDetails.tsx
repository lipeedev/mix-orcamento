
export type Item = {
    name: string,
    price: number
}

interface ItemsTableDetailsProps {
  itemList: Item[]  
}

export function ItemsTableDetails({ itemList }: ItemsTableDetailsProps) {

  return (
    <div className='overflow-y-auto max-h-80'>
        <div className="flex bg-zinc-950/50 p-3 rounded-lg border border-zinc-800/50 text-xs text-zinc-400 uppercase font-bold tracking-tighter">
          <div className="flex-1">Item</div>
          <div className="flex-1 text-center">Quant.</div>
          <div className="flex-1 text-right">Valor</div>
        </div>

        <div className="flex flex-col gap-2 max-h-64 overflow-y-auto pr-1 custom-scrollbar">
          {
            itemList
              .map((item) => (
                <div key={Math.random()} className="flex items-center bg-zinc-950/50 p-3 rounded-lg border border-zinc-800/50 font-bold tracking-tighter text-sm text-zinc-300">
                  <div className="flex-1">{item.name}</div>
                  <div className="flex-1 text-center">05</div>
                  <div className="flex-1 text-right">{item.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</div>
                </div>
              ))
          }
        </div>
    </div>
  )
}
