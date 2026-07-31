import type { ResultPartData } from "../App"

interface TableDetailsProps {
  resultPartDataList: ResultPartData[]
}

export function TableDetails({ resultPartDataList }: TableDetailsProps) {
  const metersFormater = new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 3,
  });

  return (
    <div className='overflow-y-auto max-h-80'>

      <div className="w-full flex flex-col gap-2">
        <div className="flex bg-zinc-950/50 p-3 rounded-lg border border-zinc-800/50 text-xs text-zinc-400 uppercase font-bold tracking-tighter">
          <div className="flex-1">Fixo</div>
          <div className="flex-1 text-center">Móvel</div>
          <div className="flex-1 text-center">Peças</div>
          <div className="w-24 text-right">Valor</div>
        </div>

        <div className="flex flex-col gap-2 max-h-64 overflow-y-auto custom-scrollbar">
          {
            resultPartDataList
              .map((item) => (
                <div key={Math.random()} className="flex items-center bg-zinc-800 p-3 rounded-lg border border-zinc-800/50 font-bold tracking-tighter text-sm text-zinc-300">
                  <div className="flex-1">{metersFormater.format(item.fixed.height)}m x {metersFormater.format(item.fixed.width)}m</div>
                  <div className="flex-1 text-center">{metersFormater.format(item.mobile.height)}m x {metersFormater.format(item.mobile.width)}m</div>
                  {
                    (item.category === 'folhas') && <div className="uppercase w-24 text-center">{item.leafs / 2} Fixo / Móvel</div>
                  }
                  {
                    (item.category === 'box') && <div className="uppercase w-24 text-center">1 Fixo, 1 Móvel</div>
                  }
                  {
                    (!['box', 'folhas'].includes(item.category)) && <div className="uppercase w-24 text-center">1 {item.category}</div>
                  }
                  <div className="flex-1 text-right">{item.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</div>
                </div>
              ))
          }
        </div>
      </div>
    </div>
  )
}
