import bcrypt from "bcrypt";


export const hashAdapter = {

    hash: async (code: string): Promise<string> => {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(code, salt);
    },
    compare: async (code: string, codeHash: string): Promise<boolean> => {
        return bcrypt.compare(code, codeHash);
    },

}
