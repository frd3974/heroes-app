import {describe, expect, test} from "vitest";
import {getHeroAction} from "@/heroes/actions/get-hero-action.ts";

describe('getHeroAction', () => {
    test('debe recuperar data del heroe y retornar con la imagen', async () => {
        const result = await getHeroAction('clark-kent');
        const resultImage = result.image;

        expect(resultImage).toContain('http');
        expect(result).toStrictEqual({
            "id": "1",
            "name": "Clark Kent",
            "slug": "clark-kent",
            "alias": "Superman",
            "powers": [
                "Súper fuerza",
                "Vuelo",
                "Visión de calor",
                "Visión de rayos X",
                "Invulnerabilidad",
                "Súper velocidad"
            ],
            "description": "El Último Hijo de Krypton, protector de la Tierra y símbolo de esperanza para toda la humanidad.",
            "strength": 10,
            "intelligence": 8,
            "speed": 9,
            "durability": 10,
            "team": "Liga de la Justicia",
            "image": "http://localhost:3001/images/1.jpeg",
            "firstAppearance": "1938",
            "status": "Active",
            "category": "Hero",
            "universe": "DC"
        })
    });

    test('debe lanzar un error si el heroe no se encuentra', async () => {
        const idSlug = 'batman2';
        await getHeroAction(idSlug).catch(error => {
            expect(error).toBeDefined();
            expect(error.message).toBe('Request failed with status code 404')
        })
    });
})