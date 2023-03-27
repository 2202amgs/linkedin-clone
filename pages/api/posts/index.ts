import { connectToDatabase } from '@/util/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const { body, method } = req;
    const { db } = await connectToDatabase();

    switch (method) {
        case "GET":
            try {
                const posts = await db.collection('posts').find().toArray();
                return res.status(200).json(posts);
            } catch (error) {
                res.status(500).json(error);
            }
            break;
        case "POST":
            try {
                const post = await db.collection('posts').insertOne({...body});
                return res.status(201).json(post);
            } catch (error) {
                res.status(500).json(error)
            }

            break;
        default:
            break;
    }

}