export default interface Issue {
    id: number,
    title: string,
    user: {
        avatarUrl: string,
        url: string,
        login: string
    },
    created_at: string,
    labels: Array<any>,
    body: string
}