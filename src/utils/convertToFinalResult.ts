import type { PartData } from "../App";

export function convertToFinalResult({ pricePerMeter, spanMeasure, leafs, incrementPercent }: PartData) {
  const increasePercent = 1 + (incrementPercent / 100);
  const passMeasure = 0.05
  const space = {
    fixed: { height: 0.06 },
    mobile: { height: 0.02 }
  }

  const price = (spanMeasure.height * (spanMeasure.width + passMeasure) * pricePerMeter) * increasePercent

  return {
    fixed: {
      height: spanMeasure.height - space.fixed.height,
      width: spanMeasure.width / leafs,
    },
    mobile: {
      height: spanMeasure.height - space.mobile.height,
      width: (spanMeasure.width / leafs) + passMeasure,
    },
    price
  }

}
