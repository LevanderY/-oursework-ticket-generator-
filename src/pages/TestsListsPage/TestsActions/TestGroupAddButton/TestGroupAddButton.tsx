import React, { FC, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

const TestGroupAddButton: FC = () => {
    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file: File) => {
            const reader = new FileReader()

            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            reader.onload = () => {
                // Do whatever you want with the file contents
                const binaryStr = reader.result
                console.log(binaryStr)
            }
            reader.readAsText(file)
        })
    }, [])

    const { getRootProps, getInputProps } = useDropzone({ onDrop })

    return (
        <div className={'top'}>
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                <Button ghost icon={<UploadOutlined />}>
                    Upload question
                </Button>
            </div>
        </div>
    )
}

export { TestGroupAddButton }
