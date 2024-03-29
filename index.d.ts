declare module "local-storage" {
    export function set<T>(key: string, value: T): void;
    export function get<T>(key: string): T;
    export function remove(key: string): void;
    export function clear(): void;

    export function on<T>(key: string, cb: (value: T) => void): void;
    export function on<T>(key: string, cb: (value: T, old: T) => void): void;
    export function on<T>(key: string, cb: (value: T, old: T, url: string) => void): void;

    export function off<T>(key: string, cb: (value: T) => void): void;
    export function off<T>(key: string, cb: (value: T, old: T) => void): void;
    export function off<T>(key: string, cb: (value: T, old: T, url: string) => void): void;
    export const enabled: boolean;
    export default function <T>(key: string, value?: T): void;
}
