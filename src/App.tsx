import { useState } from 'react'
import { FinalCost, Header, SectionParameters, TableDetails } from './components'
import './styles/global.css'
import { convertToFinalResult } from './utils'

type Measure = {
	height: number,
	width: number
}

export type PartData = {
	spanMeasure: Measure,
	fixed: Measure,
	mobile: Measure,
	leafs: number
	pricePerMeter: number;
	incrementPercent: number;
}

export type ResultPartData = PartData & {
	price: number
}

export type HandleUpdateMeasureParams = {
	field: PartDataFields,
	measureField: PartDataMeasureFields,
	value: number
}

type PartDataFields = Exclude<keyof PartData, 'leafs' | 'pricePerMeter' | 'incrementPercent'>
type PartDataMeasureFields = keyof Measure
export type PartDataSingleValueFields = Exclude<keyof PartData, PartDataFields>

export function App() {
	const [partData, setPartData] = useState<PartData>({
		spanMeasure: { height: 0, width: 0 },
		fixed: { height: 0, width: 0 },
		mobile: { height: 0, width: 0 },
		leafs: 0,
		pricePerMeter: 0,
		incrementPercent: 0
	})

	const [resultPartDataList, setResultPartDataList] = useState<ResultPartData[]>([])

	const handleUpdateMeasure = ({ field, measureField, value }: HandleUpdateMeasureParams) => {
		setPartData(prev => ({
			...prev,
			[field]: {
				...prev[field],
				[measureField]: value
			}
		}))
	}

	const handleUpdateSingleValue = (field: PartDataSingleValueFields, value: number) => {
		setPartData(prev => ({ ...prev, [field]: value }))
	}

	const handleGenerateBudget = ({ fixed, leafs, mobile, spanMeasure, pricePerMeter, incrementPercent }: PartData) => {
		if (!spanMeasure.height || !spanMeasure.width) return
		if (spanMeasure.height > 6 || spanMeasure.width > 6) return
		if (!leafs) return
		if (leafs > 6) return
		if (pricePerMeter > 200 || pricePerMeter < 100) return

		const result = convertToFinalResult({
			fixed,
			leafs,
			mobile,
			pricePerMeter,
			spanMeasure,
			incrementPercent
		})

		setResultPartDataList(
			prev => [...new Set([...prev, {
				fixed: result.fixed,
				mobile: result.mobile,
				leafs,
				spanMeasure,
				pricePerMeter,
				incrementPercent,
				price: result.price
			}])]
		)
	}

	const getFinalCost = () => {
		return resultPartDataList
			.reduce(
				(sum, item) => sum + item.price, 0
			)
	}

	return (
		<div className="min-h-screen w-full bg-zinc-950 text-zinc-100 flex flex-col items-center py-6 px-4 font-sans antialiased">

			<Header />
			<main className="w-full max-w-4xl flex flex-col gap-6">
				<SectionParameters
					measures={partData}
					onGenerateBudget={handleGenerateBudget}
					onMeasureUpdate={handleUpdateMeasure}
					onUpdateSingleValue={handleUpdateSingleValue}
				/>

				<section className="grid grid-cols-1 md:grid-cols-12 gap-5">
					<div className="md:col-span-7 bg-zinc-900 border border-zinc-800 p-5 rounded-xl flex flex-col gap-4 shadow-xl">
						<h3 className="text-blue-500 text-[10px] font-black uppercase tracking-widest border-b border-zinc-800 pb-2">Medidas de Corte e Peças</h3>
						<TableDetails resultPartDataList={resultPartDataList} />

						<div className='my-2 flex gap-2'>
							<h3 className="text-zinc-200 font-bold tracking-widest uppercase text-xs bg-zinc-700 rounded-lg p-3">
								itens: {resultPartDataList.length}
							</h3>

							<button className='font-bold text-xs tracking-widest uppercase p-3 rounded-lg bg-orange-400 hover:bg-orange-500 cursor-pointer' onClick={() => setResultPartDataList([])}>
								Limpar
							</button>
						</div>
					</div>

					<FinalCost cost={getFinalCost()} />
				</section>

			</main>

			<footer className="mt-auto py-6 text-zinc-800 text-[9px] font-bold tracking-[0.4em] uppercase">
				VidroMix // Calculadora // Orçamento
			</footer>

		</div >
	)
}

