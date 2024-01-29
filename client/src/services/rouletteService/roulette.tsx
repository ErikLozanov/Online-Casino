import { number } from 'yup';
import * as request from '../requester';

const baseUrl: string = 'http://localhost:3030/games/roulette';

type AllNums = {
    numbers: string[];
}


export async function getNumsPassed() {
    const getAllNums:AllNums = await request.get(baseUrl);

    return getAllNums ;
}


export async function addNumberPassed(num: number) {
    
    await request.post(`${baseUrl}/${num}`, num);
}