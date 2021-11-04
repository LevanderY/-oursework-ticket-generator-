import { QuestionsBankInterface } from '../state/tickets/ticketsStateSlice'
import { TicketsFilterValuesInterface } from '../pages/TicketsPage/TicketsActions'
import { TestsBankInterface } from '../state/tests/testsStateSlice'

interface TicketsListFormInterface {
    title: string
    author: string
    questionsBank: QuestionsBankInterface[]
}

export const ticketGenerator = (values: TicketsFilterValuesInterface, testsBank: TestsBankInterface[]) => {
    const { maxQuestions, name, numOfOptions, author } = values
    const randomArr = () => Math.random() - 0.5

    const ticketsBank: TicketsListFormInterface[] = [
        {
            title: name,
            author: author,
            questionsBank: [],
        },
    ]

    let i = 0
    while (i < numOfOptions) {
        const oldBank = [...testsBank]
        const newBank: QuestionsBankInterface[] = [
            {
                variant: (i + 1).toString(),
                testBank: [],
            },
        ]
        //Filter questions
        oldBank.sort(randomArr)
        oldBank.splice(0, oldBank.length - maxQuestions)
        //Adding questions for test bank
        newBank[0].testBank = [...oldBank]
        // Updating tickets bank with questions
        ticketsBank[0].questionsBank = [...ticketsBank[0].questionsBank, ...newBank]
        i++
    }

    return ticketsBank[0]
}
