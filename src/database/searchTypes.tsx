export type AgoliaSearchResult = {
    content: {
        hits: {
            text: any,
            objectID: string,
            _highlightResult: {
                text: {
                    [field: string]: {
                        value: string,
                        matchLevel: string,
                    }
                }
            }
        }[],
    }
}

export function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
    return value !== null && value !== undefined;
}
