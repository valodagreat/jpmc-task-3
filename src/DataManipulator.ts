import { ServerRespond } from './DataStreamer';

// Setting the schema in response to the generateRow function
export interface Row {
    price_abc: number,
    price_def: number,
    ratio: number,
    timestamp: Date,
    upper_bound: number,
    lower_bound: number,
    trigger_alert: number | undefined,
}


export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]) : Row {
    // Calculations to get the prices, ratio, upper bound and lower bound, trigger alert, and timestamp
    // The first element in the serverResponds array is for stock ABC, while the second element is for stock DEF
    // The trigger alert is the ratio value if it passes the threshold , otherise it is undefined
    const priceABC= (serverResponds[0].top_ask.price + serverResponds[0].top_bid.price)/2
    const priceDEF= (serverResponds[1].top_ask.price + serverResponds[1].top_bid.price)/2
    const ratio= priceDEF === 0 ? 0 : priceABC/priceDEF
    const upperBound= 1 + 0.05
    const lowerBound= 1 - 0.05
      return {
        price_abc: priceABC,
        price_def: priceDEF,
        ratio,
        timestamp: serverResponds[0].timestamp > serverResponds[1].timestamp ? serverResponds[0].timestamp : serverResponds[1].timestamp,
        upper_bound: upperBound,
        lower_bound: lowerBound,
        trigger_alert: (ratio > upperBound || ratio < lowerBound) ? ratio : undefined,
    }
  }
}
