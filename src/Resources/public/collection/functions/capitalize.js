export default function capitalize(arg) {
    if (typeof arg !== 'string') {
        throw new Error(`Expected string, got ${typeof arg}`);
    }
    return arg.charAt(0).toUpperCase() + arg.slice(1);
}