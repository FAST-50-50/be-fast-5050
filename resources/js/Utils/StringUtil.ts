export const parseJSONB = (data: string[]) => {
    if (typeof data === 'string') {
        try {
            return JSON.parse(data);
        } catch (e) {
            console.error('Failed to parse JSON', e);
            return null;
        }
    }
    return data;
};
