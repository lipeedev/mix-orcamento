type FinalCostProps = {
  cost: number
}

export function FinalCost({ cost }: FinalCostProps) {
  return (
    <div className="justify-center items-center md:col-span-5 flex flex-col gap-4">
      <div className="bg-blue-800/50 p-8 rounded-xl flex flex-col justify-center shadow-2xl shadow-blue-900/30 border border-blue-500 group overflow-hidden relative">
        <span className="text-blue-100 text-[10px] font-black uppercase tracking-[0.2em] mb-4">Total do Orçamento</span>
        <p className="text-center text-4xl font-black text-white tracking-tighter leading-none">{cost.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
      </div>
    </div>
  )
}
