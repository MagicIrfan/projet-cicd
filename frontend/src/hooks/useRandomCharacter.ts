import {useFetch} from "./useFetch.ts";
import {useState} from "react";
import {Character} from "../types/character.model.ts";
import {API_URL} from "../config.ts";

export const useRandomCharacter = () => {
    const url = `${API_URL}/characters/random`;
    const [trigger, setTrigger] = useState(false);

    const { data: character, loading, error } = useFetch<Character>(url, trigger);

    const regenerateCharacter = () => setTrigger((prev) => !prev);

    return { character, loading, error, regenerateCharacter };
};
