import { useState } from "react";

export type Item = {
  id: string,
  name: string,
  price: number,
  count: number
}

interface ItemsTableDetailsProps {
  itemList: Item[];
  onChangePrice: (price: number, itemID: string) => void
}

export function ItemsTableDetails({ itemList, onChangePrice }: ItemsTableDetailsProps) {
  const [updatedPrices, setUpdatedPrices] = useState<Record<string, string>>({})

  const handleInputChange = (itemID: string, value: string) => {
    setUpdatedPrices(prev => ({
      ...prev,
      [itemID]: value
    }));
  }

  const handleBlur = (itemID: string) => {
    const rawValue = updatedPrices[itemID];

    if (rawValue !== undefined && rawValue !== "") {
      const numericPrice = Number(rawValue);
      if (!isNaN(numericPrice)) {
        if (numericPrice >= 1 && numericPrice <= 999)
          onChangePrice(numericPrice, itemID);
      }
    }

    setUpdatedPrices(prev => ({
      ...prev,
      [itemID]: ""
    }));
  }

  return (
    <div className='overflow-y-auto max-h-80'>
      <div className="flex items-center bg-zinc-950/50 p-3 rounded-lg border border-zinc-800/50 text-xs text-zinc-400 uppercase font-bold tracking-tighter">
        <div className="flex-1 text-left">Item</div>
        <div className="w-20 text-right">Quant.</div>
        <div className="w-28 text-right">Valor</div>
      </div>

      <div className="flex flex-col gap-1 mt-2 max-h-64 overflow-y-auto custom-scrollbar">
        {itemList.map((item) => (
          <div key={item.id} className="flex items-center bg-zinc-800 p-3 rounded-lg border border-zinc-800/50 font-bold tracking-tighter text-sm text-zinc-300">
            <div className="flex-1 text-left truncate uppercase">{item.name}</div>

            <div className="w-20 ml-6">{item.count}</div>

            <div className="w-16 flex justify-end">
              <input
                min={1}
                max={999}
                type="number"
                value={updatedPrices[item.id] ?? ""}
                placeholder={item.price.toLocaleString('pt-BR', { style: "currency", currency: "BRL" })}
                onChange={e => handleInputChange(item.id, e.target.value)}
                onBlur={() => handleBlur(item.id)}
                className="w-full bg-zinc-900 py-4 rounded text-center placeholder:text-gray-400 text-zinc-200 focus:outline-none focus:ring-1 focus:ring-zinc-600 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )

}

