import type { GlassCategory, HandleUpdateMeasureParams, PartData, PartDataSingleValueFields } from "../App"

interface SectionParametersProps {
  measures: PartData;
  onMeasureUpdate: (params: HandleUpdateMeasureParams) => void
  onUpdateSingleValue: (field: PartDataSingleValueFields, value: number) => void
  onGenerateBudget: (params: PartData) => void
  currentCategory: GlassCategory
}

export function SectionParameters({ onGenerateBudget, measures, onMeasureUpdate, onUpdateSingleValue, currentCategory }: SectionParametersProps) {

  return (
    <section className="bg-zinc-900 p-5 rounded-xl border border-zinc-800 shadow-2xl">
      <h2 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
        <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse"></span>
        Parâmetros do Projeto
      </h2>

      <form onSubmit={e => e.preventDefault()}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Altura do Vão (m)</label>
            <input max="6" step="any" required onChange={(e) => onMeasureUpdate({ field: 'spanMeasure', measureField: 'height', value: Number(e.target.value) })} type="number" placeholder="0.00" className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 outline-none focus:border-orange-400 transition-all placeholder:text-zinc-400" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Largura do Vão (m)</label>
            <input max="6" step="any" required onChange={(e) => onMeasureUpdate({ field: 'spanMeasure', measureField: 'width', value: Number(e.target.value) })} type="number" placeholder="0.00" className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 outline-none focus:border-blue-500 transition-all placeholder:text-zinc-400" />
          </div>

          {
            (currentCategory === 'folhas') &&
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Quantidade de Folhas</label>
              <input required max="4" onChange={(e) => onUpdateSingleValue('leafs', Number(e.target.value))} type="number" className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 outline-none focus:border-orange-400 transition-all font-bold placeholder:text-zinc-400" />
            </div>
          }

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Valor do m² (R$)</label>
            <input max="200" min="100" step="any" required onChange={e => onUpdateSingleValue('pricePerMeter', Number(e.target.value))} type="number" placeholder="180.00" className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 outline-none focus:border-blue-500 transition-all placeholder:text-zinc-400" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest italic">Acréscimo Opcional (%)</label>
            <input max="50" onChange={e => onUpdateSingleValue('incrementPercent', Number(e.target.value))} type="number" placeholder="0" className="bg-zinc-800 border border-blue-900/30 rounded-lg px-3 py-2.5 outline-none focus:border-orange-400 transition-all placeholder:text-zinc-400" />
          </div>

          <div className="flex items-end">
            <button type="submit" onClick={() => onGenerateBudget(measures)} className="w-full bg-orange-400 hover:bg-orange-600 text-white font-black py-3.5 rounded-lg transition-all active:scale-95 shadow-lg shadow-orange-900/20 text-xs uppercase tracking-widest cursor-pointer">
              Gerar Orçamento
            </button>
          </div>
        </div>

      </form>
    </section>

  )
}
