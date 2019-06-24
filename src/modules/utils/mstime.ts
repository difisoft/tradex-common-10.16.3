export function diffMsTime(time: number): number {
  const currentTime = process.hrtime();
  return currentTime[0] * 1000 + currentTime[1] / 1000000 -time;
}