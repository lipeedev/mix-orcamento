import type { PartData } from "../App";

export function convertToFinalResult({ pricePerMeter, spanMeasure, leafs, incrementPercent, category }: PartData) {
  const increasePercent = 1 + (incrementPercent / 100);
  const passMeasure = 0.05
  let space = {
    fixed: { height: 0, width: 0 },
    mobile: { height: 0, width: 0. }
  }

  let finalResult = {
    fixed: {
      height: 0,
      width: 0,
    },
    mobile: {
      height: 0,
      width: 0,
    },
    price: 0
  }

  if (category === 'pivotante') {
    space = {
      fixed: { height: 0, width: 0 },
      mobile: { height: 0.015, width: 0.01 }
    }

    finalResult.mobile.height = spanMeasure.height - space.mobile.height
    finalResult.mobile.width = spanMeasure.width - space.mobile.width
    finalResult.price = ((spanMeasure.height * spanMeasure.width) * pricePerMeter) * increasePercent
  }

  if (category === 'folhas') {
    space = {
      fixed: { height: 0.06, width: 0 },
      mobile: { height: 0.02, width: 0 }
    }

    finalResult.fixed.height = spanMeasure.height - space.fixed.height
    finalResult.fixed.width = spanMeasure.width / leafs
    finalResult.mobile.height = spanMeasure.height - space.mobile.height
    finalResult.mobile.width = (spanMeasure.width / leafs) + passMeasure
    finalResult.price = (spanMeasure.height * (spanMeasure.width + passMeasure) * pricePerMeter) * increasePercent
  }

  return finalResult

}
