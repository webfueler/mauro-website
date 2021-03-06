import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface PostData {
    id: string;
    title: string;
    description: string;
    content: string;
    date: Date;
    image?: string;
};

const postsDirectory = path.join(process.cwd(), 'posts');

export const getPost = (id: string, includeContent = false): PostData => {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    return getPostFromFile(fullPath, id, includeContent);
};

export const getSortedPostsData = (): PostData[] => {
    // Get file names under /posts
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData: PostData[] = fileNames.map((fileName) => {
        // Remove ".md" from file name to get id
        const id = fileName.replace(/\.md$/, '');

        // Read markdown file as string
        const fullPath = path.join(postsDirectory, fileName);
        return getPostFromFile(fullPath, id);
    });
    // Sort posts by date
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        }
        return -1;
    });
};

const getPostFromFile = (
    fullPath: string,
    id: string,
    includeContent = false
): PostData => {
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);
    // Combine the data with the id
    return {
        id,
        ...matterResult.data,
        content: includeContent ? matterResult.content : null,
    } as PostData;
};
