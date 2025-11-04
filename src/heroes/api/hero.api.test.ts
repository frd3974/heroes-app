import {describe, expect, test} from "vitest";
import {heroApi} from "@/heroes/api/hero.api.ts";

const BASE_URL = import.meta.env.VITE_API_URL;

describe('heroApi', () => {
    test('debe ser configurado apuntando al servidor de prueba', () => {
        expect(heroApi).toBeDefined();
        expect(heroApi.defaults.baseURL).toBe(`${BASE_URL}/api/heroes`);
        expect(BASE_URL).toContain('3001');
        // console.log(heroApi.defaults.baseURL);
    });
});