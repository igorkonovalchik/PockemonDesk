import { pokemons } from './pokemons.js'
import { rundom } from './functions.js'
import Pockemon from "./pockemon.js";

export default (player) => {
    return new Pockemon({
        ...pokemons[rundom(0, pokemons.length - 1)],
        selectors: player
    });
}