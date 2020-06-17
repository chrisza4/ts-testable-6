export enum Operator {
  Plus = '+',
  Minus = '-',
  Multiply = '*',
  Divide = '/'
}

export type CalculateModel = {
  firstNumber: number;
  secondNumber: number;
  operator: Operator;
}

export function calculate(input: CalculateModel): number {
  const { operator, firstNumber, secondNumber } = input
  switch (operator) {
    case '+':
      return firstNumber + secondNumber
    case '-':
      return firstNumber - secondNumber
    case '*':
      return firstNumber * secondNumber
    case '/':
      return firstNumber / secondNumber
  }
  return 0
}
