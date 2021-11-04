import React, { FC } from 'react'
import { useLocation } from 'react-router-dom'
import { Page, Text, Document, StyleSheet, Font } from '@react-pdf/renderer'
import { PDFViewer } from '@react-pdf/renderer'
import { QuestionsBankInterface, TicketsListInterface } from '../../state/tickets/ticketsStateSlice'
import { TestsBankInterface } from '../../state/tests/testsStateSlice'

Font.register({
    family: 'Roboto',
    src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf',
})

const styles = StyleSheet.create({
    title: {
        fontFamily: 'Roboto',
        fontSize: 18,
        textAlign: 'center',
    },
    author: {
        fontFamily: 'Roboto',
        fontSize: 12,
        position: 'absolute',
        bottom: 25,
        right: 15,
    },
    subtitle: {
        fontFamily: 'Roboto',
        fontSize: 14,
        margin: 12,
        textAlign: 'center',
    },
    text: {
        fontFamily: 'Roboto',
        margin: 12,
        fontSize: 14,
        textAlign: 'justify',
    },
    pageNumber: {
        position: 'absolute',
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'grey',
    },
})

const PdfTicketPage: FC = () => {
    const location = useLocation<TicketsListInterface>()
    const { id, title, questionsBank, author } = location.state

    return (
        <div style={{ width: '100%', height: '80vh' }}>
            <PDFViewer style={{ width: '100%', height: '90vh' }} key={id}>
                <Document>
                    {questionsBank.map(({ variant, testBank }: QuestionsBankInterface) => (
                        <Page size={'A4'}>
                            <Text style={styles.title}>{title}</Text>
                            <Text style={styles.subtitle}>Варіант: {variant}</Text>
                            {testBank.map(({ test }: TestsBankInterface, i: number) => (
                                <Text key={test} style={styles.text}>
                                    {`${i + 1}) ${test}`}
                                </Text>
                            ))}
                            <Text style={styles.author}>{`Викладач: ${author}`}</Text>
                        </Page>
                    ))}
                </Document>
            </PDFViewer>
        </div>
    )
}

export { PdfTicketPage }
