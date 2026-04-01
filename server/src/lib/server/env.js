export const getEnvValue = (...names) => {
    for (const name of names) {
        const value = process.env[name];
        if (value) {
            return value;
        }
    }

    throw new Error(`Missing environment variable. Checked: ${names.join(', ')}`);
};
