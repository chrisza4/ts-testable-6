type CalcSuccessResult = {
  result: number;
}

type ErrorResult = {
  error: string;
}

export type CalcResult = ErrorResult | CalcSuccessResult

export function calcResultView(result: number): CalcResult {
  return { result }
}
