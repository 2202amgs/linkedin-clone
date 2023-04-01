import { connectToDatabase } from '@/util/mongodb';
import { ObjectId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const { db } = await connectToDatabase();

    if(req.method === 'DELETE'){
        try {
            await db.collection("posts").deleteOne({ _id: new ObjectId(req.query.id?.toString()) });
            res.status(200).json({ message: "The post has been deleted!!" });
        } catch (error) {
            res.status(500).json(error);
        }
    }

}