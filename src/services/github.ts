import { Octokit } from "@octokit/rest";
import Issue from "../models/issue";


const TOKEN = process.env.GITHUB_TOKEN || "";
const octokit = new Octokit({
    auth: TOKEN
});

export const searchIssues = async (terms: String): Promise<Issue[]> => {
    const q = `${terms}+repo:react+org:facebook+is:issue`;

    return await octokit.rest.search.issuesAndPullRequests({q})
                                    .then(response => {
                                        const data = response.data.items;
                                        return data.map((issue): Issue => {
                                            return {
                                                id: issue.id,
                                                title: issue.title,
                                                user: {
                                                    login: issue.user.login,
                                                    avatarUrl: issue.user.avatar_url,
                                                    url: issue.user.url
                                                },
                                                created_at: issue.created_at,
                                                labels: issue.labels,
                                                body: issue.body
                                            };
                                        });
                                    });
}