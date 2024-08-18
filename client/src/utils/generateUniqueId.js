export default function generateUniqueId() {
    return Date.now() + Math.random().toString(36).substring(2);
}