export function deepClone(obj:any, hash = new WeakMap()) {
    if (Object(obj) !== obj || obj instanceof Function) return obj; // Handle primitives and functions
    if (hash.has(obj)) return hash.get(obj); // Handle circular references

    const result = obj instanceof Date ? new Date(obj) // Handle Date objects
        : obj instanceof RegExp ? new RegExp(obj.source, obj.flags) // Handle RegExp
            : obj.constructor ? new obj.constructor() // Handle objects like arrays
                : Object.create(null);

    hash.set(obj, result); // Store the reference to handle circular references

    return Object.keys(obj).reduce((acc, key) => {
        acc[key] = deepClone(obj[key], hash);
        return acc;
    }, result);
}
