import type { Item } from './ItemsTableDetails'

interface ItemSelectModalProps {
  onClose: () => void,
  itemListToSearch: Item[]
}

export function ItemSelectModal({ onClose, itemListToSearch }: ItemSelectModalProps) {

  return (
    <div onClick={() => onClose()} className="flex justify-center backdrop-blur-xs items-center fixed inset-0 bg-zinc-900/50 min-h-screen overflow-hidden animate-in fade-in zoom-in-95 duration-200">
      
        <div onClick={e => e.stopPropagation()} className="w-1/2 animate-in transition-all fade-in duration-200 p-4 flex flex-col gap-4 bg-zinc-600 rounded-md">
            <input type="text" placeholder="Pesquise o item..." className="w-full bg-zinc-800/70 border border-zinc-700 rounded-lg px-3 py-2.5 outline-none focus:border-blue-600 transition-all placeholder:text-zinc-400" />
            
	    <div className="flex justify-between text-zinc-200 text-[10px] mt-6 font-black uppercase tracking-widest border-b border-zinc-800 p-2">
	    	<span>Descrição</span>
	    	<span>Valor</span>
	    </div>
        
	    <div className="flex flex-col gap-2 max-h-64 overflow-y-auto pr-1 custom-scrollbar">
          {
            itemListToSearch.slice(0, 5)
              .map((item) => (
                <div key={Math.random()} className="flex bg-zinc-950/50 p-3 gap-2 rounded-lg border border-zinc-800/50">
		  <input type="checkbox" className="cursor-pointer h-5 w-5 rounded border-gray-300 text-blue-500 focus:ring-blue-600" />
                  <div className="flex w-full tracking-tighter font-bold text-sm text-gray-300">
		  	<span className="flex-1 uppercase">{item.name}</span>
                  	<span className="flex-1 text-right">{item.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
               	  </div>

		</div>
              ))
          }
        
	  </div>
     	</div>
    
    </div>
  )
}
