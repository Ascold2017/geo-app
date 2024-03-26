import { base64decode } from "nodejs-base64";
import { UserDTO } from "../dto/user.dto";
import { DI } from "../config/data-source";


export async function signIn(login: string, password: string) {
    const user = await DI.user
        .findOneOrFail({
            select: {
                currentSection: {
                    id: true
                }
            },
            where: {
                username: login,
                password: password,
            },
            relations: {
                currentSection: true
            }
        });

    return new UserDTO(user)
}

export async function signUp(login: string, password: string) {
    await DI.user.findOneByOrFail({ username: login, })

    const user = DI.user.create({
        username: login,
        password: password,
    });
    await DI.user.save(user)
    return new UserDTO(user);
}

export async function authByToken(token: string) {
    const decodedToken = base64decode(token);
    const [username, password] = decodedToken.split(":");
    const user = await DI.user
        .findOneOrFail({
            select: {
                currentSection: {
                    id: true
                }
            },
            where: {
                username,
                password,
            },
            relations: {
                currentSection: true
            }
        });

    return new UserDTO(user);
}