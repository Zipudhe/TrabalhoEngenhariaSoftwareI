import chalk from 'chalk'

export class OutputHandler {
  static SuccessOutput(text: string) {
    console.log(chalk.green(text))
  }

  static ErrorOutput(text: string) {
    console.log(chalk.red(text))
  }

  static NormalOutput(text: string) {
    console.log(text)
  }
}