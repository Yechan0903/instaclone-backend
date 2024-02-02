import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
    Mutation: {
        editComment:protectedResolver(async(_,{id,payload},{loggedInUser}) => {
            const comment = await client.comment.findUnique({
                where: {
                    id,
                    userId: loggedInUser.id,
                },
                select:{
                    userId:true,
                },
            });
            if(!comment){
                return {
                    ok: false,
                    error: "Comment not found",
                };
            }
            await client.comment.update({
                where:{
                    id,
                },
                data: {
                    payload, 
                },
            });
            return {
                ok: true,
            };
        }),
    },
};