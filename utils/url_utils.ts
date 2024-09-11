export const getSlugRegEx = (): RegExp => /^[a-z0-9]+(?:-[a-z0-9]+)*$|^$/

export const slugify =
    (text: string): string =>
        text
            .toString() // Convert to string
            .trim() // Trim leading and trailing whitespace
            .toLowerCase() // Convert to lowercase
            .replace(/[^a-z0-9\s-]/g, '') // Remove all non-alphanumeric characters except spaces and hyphens
            .replace(/\s+/g, '-') // Replace spaces with hyphens
            .replace(/-+/g, '-'); // Replace multiple hyphens with a single hyphen