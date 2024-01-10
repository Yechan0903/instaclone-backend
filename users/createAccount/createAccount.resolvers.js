import bcrypt from "bcrypt";
import client from "../../client";

export default {
    Mutation: {
        createAccount: async (_, {
            firstName,
            lastName,
            username,
            email,
            password,
        }) => {
            try {
                const existingUser = await client.user.findFirst({
                    where: {
                        OR: [
                            {
                                username
                            },
                            {
                                email,
                            },
                        ],
                    },
                });
                if (existingUser) {
                    return {
                        ok: false,
                        error: "This username/email is already taken."
                    }
                }
                const uglyPassword = await bcrypt.hash(password, 10);
                return {
                    ok: true,
                    user: client.user.create ({
                        data: {
                            username,
                            email,
                            firstName,
                            lastName,
                            password: uglyPassword,
                        },
                    })
                }
            } catch(e) {
                return {
                    ok: false,
                    error: e
                }
            }
        },
    },
};