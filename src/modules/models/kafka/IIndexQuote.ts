import IAutoData from './IAutoData';

export default interface IIndexQuote extends IAutoData {
  refCode: string;
  matchingVolume: number;
  upCount: number;
  ceilingCount: number;
  downCount: number;
  floorCount: number;
  foreignerBidVolume: number;
  foreignerOfferVolume: number;
  sameCount: number;
  sequence: number;
}