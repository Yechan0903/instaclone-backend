import { __Type } from "graphql";
import client from "../../client";

export default {
    Query: {
        seeHashtag: (_, {hashtag}) => client.hashtag.findUnique({where: {hashtag,},}),
    },
};