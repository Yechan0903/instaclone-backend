import client from "../../client";

export default {
    Query: {
        seePhotoLikes: async (_,{id}) => {
            const likes = await client.photo.findUnique({where:{id}}).likes({select:{user:true}});
            return likes.map(like => like.user);
        }
    }
}