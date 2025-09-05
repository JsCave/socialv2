import * as zod from "zod"

export const updateSchema=zod.object({
    password:zod.string()
    .nonempty('Password is required')
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,"Minimum 8 characters,At Least: one uppercase letter,one lowercase letter,one digit,one special character "),

    newPassword:zod.string()
    .nonempty('Password is required')
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,"Minimum 8 characters,At Least: one uppercase letter,one lowercase letter,one digit,one special character "),



});