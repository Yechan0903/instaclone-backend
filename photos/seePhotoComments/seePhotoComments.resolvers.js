import client from "../../client"

export default {
    Query: {
        seePhotoComments: (_,{photoId,lastId}) => 
            client.comment.findMany({
                where: {
                    photoId
                },
                orderBy: {
                    createdAt: "asc",
                },
                take: 5,
                skip: lastId ? 1 : 0,
                ...(lastId && {cursor: {id: lastId}}),
            }),
    }
}