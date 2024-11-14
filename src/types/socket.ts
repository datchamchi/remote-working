export type DataType = {
    type: 'inform' | 'invite'
    title?: string
    content: string
    from: string
    to: string
    project?: string
}
export type ErrorType = {
    title: string
    content: string
}
